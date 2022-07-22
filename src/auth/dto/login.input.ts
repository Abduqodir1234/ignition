import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: "User's email" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field(() => String, { description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
