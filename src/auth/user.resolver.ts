import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '@/decorators/current-user.decorator'
import { GqlFirebaseAuthGuard } from '@/guards/gql-firebase-auth.guard'
import { FirebaseAuthDecodedUser } from './firebase-auth.strategy'
import { User } from './models/user.model'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @UseGuards(GqlFirebaseAuthGuard)
  async user(@CurrentUser() user: FirebaseAuthDecodedUser) {
    return { id: user.uid }
  }
}
