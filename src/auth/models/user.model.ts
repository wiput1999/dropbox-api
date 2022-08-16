import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
})

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String, { nullable: true })
  firstName?: string

  @Field(() => String, { nullable: true })
  lastName?: string

  @Field(() => UserRole)
  role: UserRole
}

@InputType()
export class VerifyUserInput {
  @Field()
  firstName: string

  @Field()
  lastName: string
}
