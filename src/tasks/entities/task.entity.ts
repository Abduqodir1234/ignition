import { Field, ObjectType } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { Status } from '../schema/task.schema';
import { User } from '../../user/entities/user.entity';
import { TaskComment } from 'src/task-comment/entities/task-comment.entity';
import { TaskCommentPopulated } from 'src/task-comment/entities/task-populated.entity';

@ObjectType()
export class Task {
  @Field(() => String, { description: 'id of document' })
  _id: string;
  @Field(() => String, { description: 'Task Name' })
  name: string;
  @Field(() => Status, { description: 'Task status' })
  status: Status;
  @Field(() => String, {
    description: 'user that task assigned to ',
    nullable: true,
  })
  assignedTo?: Schema.Types.ObjectId;
  @Field(() => String, {
    description: 'head task id',
    nullable: true,
  })
  headTaskId?: Schema.Types.ObjectId;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class TaskPopulated {
  @Field(() => String, { description: 'id of document' })
  _id: string;
  @Field(() => String, { description: 'Task Name' })
  name: string;
  @Field(() => Status, { description: 'Task status' })
  status: Status;
  @Field(() => User, {
    description: 'user that task assigned to ',
    nullable: true,
  })
  assignedTo?: User;
  @Field(() => String, {
    description: 'head task id',
    nullable: true,
  })
  headTaskId?: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class OneTask {
  @Field(() => String, { description: 'id of document' })
  _id: string;
  @Field(() => String, { description: 'Task Name' })
  name: string;
  @Field(() => Status, { description: 'Task status' })
  status: Status;
  @Field(() => User, {
    description: 'user that task assigned to ',
    nullable: true,
  })
  assignedTo?: User;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => [Task])
  childTasks: Task[];
  @Field(() => [TaskCommentPopulated], { nullable: true })
  comments: TaskCommentPopulated[];
}
