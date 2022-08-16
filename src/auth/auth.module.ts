import { PrismaService } from '@/db/prisma.service'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebase-auth.strategy'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { ProfileService } from './profile.service'
import { ProfileResolver } from './profile.resolver'

@Module({
  imports: [PassportModule],
  providers: [
    FirebaseAuthStrategy,
    UserResolver,
    UserService,
    PrismaService,
    ProfileService,
    ProfileResolver,
  ],
})
export class AuthModule {}
