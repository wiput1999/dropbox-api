import { Injectable } from '@nestjs/common'
import { FirebaseAuthDecodedUser } from '@/auth/firebase-auth.strategy'
import { PrismaService, PrismaTypes } from '@/db'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findByFirebaseUid(firebaseUid: string): Promise<PrismaTypes.User | null> {
    return this.prisma.user.findUnique({
      where: {
        firebaseUid,
      },
    })
  }

  createFromFirebase(
    firebaseUser: FirebaseAuthDecodedUser,
  ): Promise<PrismaTypes.User> {
    return this.prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
      },
    })
  }
}
