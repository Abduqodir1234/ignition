import { Field, InputType } from '@nestjs/graphql';
import { IsHexadecimal, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateTaskCommentInput {
  @Field(() => String)
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  id: number;
  @Field(() => String, { description: 'Task id', nullable: true })
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  taskId: string;
  @Field(() => String, { description: 'Comment text', nullable: true })
  @IsOptional()
  @IsString()
  comment: string;
}
