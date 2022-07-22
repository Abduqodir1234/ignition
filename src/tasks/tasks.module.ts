import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TaskComment,
  TaskCommentSchema,
} from 'src/task-comment/schema/task-comment';
import { User, UserSchema } from 'src/user/schema/user';
import { Task, TaskSchema } from './schema/task.schema';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: TaskComment.name, schema: TaskCommentSchema },
    ]),
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
