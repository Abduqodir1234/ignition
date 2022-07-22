import { Field, InputType } from '@nestjs/graphql';
import { IsHexadecimal, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateTaskCommentInput {
  @Field(() => String, { description: 'Task id' })
  @IsNotEmpty()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  taskId: string;
  @Field(() => String, { description: 'Comment text' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
