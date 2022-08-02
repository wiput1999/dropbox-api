import { Args, Query, Resolver } from '@nestjs/graphql'
import { User } from './models/user.model'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return { id }
  }
}
