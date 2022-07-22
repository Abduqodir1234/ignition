import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class TaskCommentPopulated {
  @Field(() => String, { description: 'id' })
  _id: string;
  @Field(() => User, { description: 'User' })
  user: User;
  @Field(() => Task, { description: 'Task' })
  task: Task;
  @Field(() => String, { description: 'Comment Text' })
  comment: string;
  @Field(() => Date, { description: 'when this comment created' })
  createdAt: string;
  @Field(() => Date, { description: 'when this comment updated last time' })
  updatedAt: string;
}
