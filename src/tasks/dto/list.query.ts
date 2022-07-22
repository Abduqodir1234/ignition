import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsHexadecimal,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Schema } from 'mongoose';
import { Status } from '../schema/task.schema';

@InputType()
export class TaskListQuery {
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
  @Field(() => Status, { description: 'Task status', nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  @Field(() => String, {
    description: 'user that task assigned to ',
    nullable: true,
  })
  assignedTo?: Schema.Types.ObjectId;
}
