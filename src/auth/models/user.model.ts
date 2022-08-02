import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  email: string
}
