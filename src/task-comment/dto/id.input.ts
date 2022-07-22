import { Field, InputType } from '@nestjs/graphql';
import { IsHexadecimal, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class TaskCommentIdInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  id: string;
}
