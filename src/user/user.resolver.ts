import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { GqlFirebaseAuthGuard } from '@/guards/gql-firebase-auth.guard'
import { User } from './entity/user.entity'
import { PrismaTypes } from '@/db'

@Resolver(() => User)
@UseGuards(GqlFirebaseAuthGuard)
export class UserResolver {
  @Query(() => User)
  async user(@CurrentUser() user: PrismaTypes.User) {
    return user
  }
}
