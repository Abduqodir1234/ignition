import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';

@InputType()
export class RegisterUserInput {
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
