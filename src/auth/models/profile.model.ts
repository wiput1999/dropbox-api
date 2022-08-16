import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Profile {
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  lastName?: string
}

@InputType()
export class CreateProfileInput {
  @Field()
  firstName: string

  @Field()
  lastName: string
}
