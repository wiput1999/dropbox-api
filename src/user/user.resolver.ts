import { UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PrismaTypes } from '@/db'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { GqlFirebaseAuthGuard } from '@/guards/gql-firebase-auth.guard'
import { User } from './entity/user.entity'
import { Profile } from './entity/profile.entity'
import { ProfileService } from './profile.service'

@Resolver(() => User)
@UseGuards(GqlFirebaseAuthGuard)
export class UserResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => User)
  async user(@CurrentUser() user: PrismaTypes.User) {
    return user
  }

  @ResolveField('profile', () => Profile, { nullable: true })
  async getProfile(@Parent() user: User) {
    const { id } = user

    return this.profileService.findUnique(id)
  }
}
