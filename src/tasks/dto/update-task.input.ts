import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsHexadecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';
import { Status } from '../schema/task.schema';

@InputType()
export class UpdateTaskInput {
  @Field(() => String, { description: 'id of document' })
  @IsNotEmpty()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  id: string;
  @Field(() => String, { description: 'Task Name', nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
  @Field(() => Status, { description: 'Task status', nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
  @Field(() => String, {
    description: 'User that task assigned to ',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  assignedTo?: Types.ObjectId;
  @Field(() => String, {
    description: 'head task id',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  headTaskId?: Types.ObjectId;
}
