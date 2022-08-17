import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { ProfileService } from './profile.service'
import { CreateProfileInput, Profile } from './entity/profile.entity'
import { GqlFirebaseAuthGuard } from '@/guards/gql-firebase-auth.guard'

@Resolver(() => Profile)
@UseGuards(GqlFirebaseAuthGuard)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('input') input: CreateProfileInput,
    @CurrentUser() user,
  ) {
    return this.profileService.createProfile(user.id, input)
  }
}
