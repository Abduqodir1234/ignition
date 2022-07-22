import { Module } from '@nestjs/common';
import { TaskCommentService } from './task-comment.service';
import { TaskCommentResolver } from './task-comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/tasks/schema/task.schema';
import { User, UserSchema } from 'src/user/schema/user';
import { TaskComment, TaskCommentSchema } from './schema/task-comment';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TaskComment.name, schema: TaskCommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [TaskCommentResolver, TaskCommentService],
})
export class TaskCommentModule {}
