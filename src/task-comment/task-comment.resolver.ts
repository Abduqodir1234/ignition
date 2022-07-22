import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskCommentService } from './task-comment.service';
import { CreateTaskCommentInput } from './dto/create-task-comment.input';
import { UpdateTaskCommentInput } from './dto/update-task-comment.input';
import { TaskComment } from './entities/task-comment.entity';
import { TaskCommentListQuery } from './dto/list-task-comment.input';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { TaskCommentPopulated } from './entities/task-populated.entity';
import { TaskCommentIdInput } from './dto/id.input';

@Resolver(() => TaskComment)
@UseGuards(JwtAuthGuard)
export class TaskCommentResolver {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  @Mutation(() => TaskComment, { name: 'createTaskComment' })
  create(
    @Args('createTaskCommentInput')
    createTaskCommentInput: CreateTaskCommentInput,
    @GetUser('_id') userId: string,
  ) {
    return this.taskCommentService.create(userId, createTaskCommentInput);
  }

  @Mutation(() => [TaskCommentPopulated], { name: 'taskComments' })
  findAll(
    @Args('taskCommentListInput') taskCommentListInput: TaskCommentListQuery,
  ) {
    return this.taskCommentService.findAll(taskCommentListInput);
  }

  @Query(() => TaskCommentPopulated, { name: 'taskComment' })
  findOne(@Args('taskCommentInput') taskCommentInput: TaskCommentIdInput) {
    return this.taskCommentService.findOne(taskCommentInput.id);
  }

  @Mutation(() => TaskComment, { name: 'updateTaskComment' })
  update(
    @Args('updateTaskCommentInput')
    updateTaskCommentInput: UpdateTaskCommentInput,
    @GetUser('_id') userId: string,
  ) {
    return this.taskCommentService.update(userId, updateTaskCommentInput);
  }
}
