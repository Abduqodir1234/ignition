import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: "User's email" })
  email: string;
}

@ObjectType()
export class UserWithId {
  @Field(() => String)
  _id: string;
  @Field(() => String, { description: "User's email" })
  email: string;
}
