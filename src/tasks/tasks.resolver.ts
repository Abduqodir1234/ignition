import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskDeleteQuery } from './dto/delete.query';
import { TaskListQuery } from './dto/list.query';
import { UpdateTaskInput } from './dto/update-task.input';
import { OneTask, Task, TaskPopulated } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task, { name: 'createTask' })
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Mutation(() => [TaskPopulated], { name: 'tasks' })
  findAll(@Args('taskListQuery') taskListQuery: TaskListQuery) {
    return this.tasksService.findAll(taskListQuery);
  }

  @Query(() => OneTask, { name: 'task' })
  findOne(@Args('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task, { name: 'updateTask' })
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput);
  }

  @Mutation(() => Task, { name: 'deleteTask' })
  removeTask(@Args('deleteTaskInput') deleteTaskInput: TaskDeleteQuery) {
    return this.tasksService.remove(deleteTaskInput.id);
  }
}
