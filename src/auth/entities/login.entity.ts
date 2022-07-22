import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Login {
  @Field(() => String, { description: 'token' })
  access_token: string;
}
