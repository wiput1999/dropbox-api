import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Profile } from './profile.entity'

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

  @Field(() => UserRole)
  role: UserRole

  @Field(() => Profile, { nullable: true })
  profile?: Profile
}
