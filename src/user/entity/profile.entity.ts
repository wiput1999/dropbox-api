import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Profile {
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  lastName?: string

  @Field(() => String, { nullable: true })
  facebook?: string

  @Field(() => String, { nullable: true })
  instagram?: string

  @Field(() => String, { nullable: true })
  twitter?: string

  @Field(() => String, { nullable: true })
  line?: string
}

@InputType()
export class CreateProfileInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  facebook: string

  @Field()
  instagram: string

  @Field()
  twitter: string

  @Field()
  line: string
}
