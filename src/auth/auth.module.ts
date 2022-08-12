import { PrismaService } from '@/db/prisma.service'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebase-auth.strategy'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
  imports: [PassportModule],
  providers: [FirebaseAuthStrategy, UserResolver, UserService, PrismaService],
})
export class AuthModule {}
