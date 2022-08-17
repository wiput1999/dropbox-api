import { Module } from '@nestjs/common'
import { PrismaService } from '@/db'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { ProfileService } from './profile.service'
import { ProfileResolver } from './profile.resolver'

@Module({
  providers: [
    PrismaService,
    UserResolver,
    UserService,
    ProfileResolver,
    ProfileService,
  ],
  exports: [UserService, ProfileService],
})
export class UserModule {}
