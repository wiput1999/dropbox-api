import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebase-auth.strategy'
import { UserResolver } from './user.resolver'

@Module({
  imports: [PassportModule],
  providers: [FirebaseAuthStrategy, UserResolver],
})
export class AuthModule {}
