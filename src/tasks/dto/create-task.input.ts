import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsHexadecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Schema } from 'mongoose';
import { Status } from '../schema/task.schema';

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'Task Name' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @Field(() => Status, { description: 'Task status', nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status: Status;
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  @Field(() => String, {
    description: 'user that task assigned to ',
    nullable: true,
  })
  assignedTo?: Schema.Types.ObjectId;
  @Field(() => String, {
    description: 'head task id',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  @IsHexadecimal()
  @Length(24, 24)
  headTaskId?: Schema.Types.ObjectId;
}
