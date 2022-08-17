import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { FirebaseError } from 'firebase-admin'
import * as firebaseAdmin from 'firebase-admin'
import { Strategy } from 'passport-http-bearer'
import { FirebaseService } from '@/firebase/firebase.service'
import { UserService } from '@/user/user.service'
import { User } from '@prisma/client'

type DecodedIdToken = firebaseAdmin.auth.DecodedIdToken
export type FirebaseAuthDecodedUser = Readonly<
  Pick<DecodedIdToken, 'uid' | 'email' | 'email_verified'>
>

export const StrategyName = 'firebase-auth'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  StrategyName,
) {
  private readonly checkRevoked = false
  private readonly logger = new Logger(FirebaseAuthStrategy.name)

  constructor(
    private readonly firebase: FirebaseService,
    private readonly userService: UserService,
  ) {
    super()
  }

  async validate(jwtToken: string): Promise<User> {
    const payload = await this.authorize(jwtToken)
    const firebaseUser = await this.firebase.getAuth().getUser(payload.uid)

    if (firebaseUser.disabled) {
      throw new ForbiddenException('User disabled')
    }

    const user = await this.userService.findByFirebaseUid(firebaseUser.uid)

    if (!user) {
      return this.userService.createFromFirebase(firebaseUser)
    }

    return user
  }

  private async authorize(jwtToken: string): Promise<DecodedIdToken> {
    try {
      return await this.firebase
        .getAuth()
        .verifyIdToken(jwtToken, this.checkRevoked)
    } catch (err: unknown) {
      const e = err as FirebaseError
      if (e.code === 'auth/id-token-expired') {
        this.logger.warn('auth/id-token-expired')
        throw new UnauthorizedException('Token Expired')
      } else if (e.code === 'auth/id-token-revoked') {
        this.logger.warn('auth/id-token-revoked')
        throw new UnauthorizedException('Token Revoked')
      }

      throw new UnauthorizedException()
    }
  }
}
