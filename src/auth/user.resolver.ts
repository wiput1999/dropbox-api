import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { GqlFirebaseAuthGuard } from '@/guards/gql-firebase-auth.guard'
import { User } from './models/user.model'
import { PrismaTypes } from '@/db'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @UseGuards(GqlFirebaseAuthGuard)
  async user(@CurrentUser() user: PrismaTypes.User) {
    return user
  }
}
