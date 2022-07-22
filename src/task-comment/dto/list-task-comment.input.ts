import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class TaskCommentListQuery {
  @Field(() => Number, { description: 'How many do you want to take' })
  @IsOptional()
  @IsNumber()
  limit?: number;
  @IsOptional()
  @IsNumber()
  @Field(() => Number, {
    description: 'How many do you want to skip',
    nullable: true,
  })
  offset?: number;
}
