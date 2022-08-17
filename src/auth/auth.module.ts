import { PrismaService } from '@/db/prisma.service'
import { UserModule } from '@/user/user.module'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebase-auth.strategy'

@Module({
  imports: [PassportModule, UserModule],
  providers: [FirebaseAuthStrategy, PrismaService],
})
export class AuthModule {}
