import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskListQuery } from './dto/list.query';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task, TaskDocument } from './schema/task.schema';
import { TaskListQueryGenerator } from './components/queryGenerator';
import { ObjectId } from 'mongodb';
import {
  TaskComment,
  TaskCommentDocument,
} from 'src/task-comment/schema/task-comment';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(TaskComment.name)
    private taskCommentModel: Model<TaskCommentDocument>,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    if (
      createTaskInput.headTaskId &&
      !this.taskModel.exists({ _id: createTaskInput.headTaskId })
    )
      throw new Error(
        'Task that you want your task to be connected is not exist',
      );

    if (
      createTaskInput.assignedTo &&
      !this.userModel.exists({ _id: createTaskInput.assignedTo })
    )
      throw new Error('User is not exist');

    const newTask = new this.taskModel(createTaskInput);

    return newTask.save();
  }

  async findAll(taskListQuery: TaskListQuery) {
    const query = TaskListQueryGenerator(taskListQuery);

    return this.taskModel
      .find({ ...query, headTaskId: null })
      .skip(taskListQuery.offset)
      .limit(taskListQuery.limit)
      .populate('assignedTo');
  }

  async findOne(id: string) {
    const task = await this.taskModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'assignedTo',
          foreignField: '_id',
          as: 'assignedTo',
        },
      },
      {
        $lookup: {
          from: 'taskcomments',
          localField: '_id',
          foreignField: 'taskId',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
              },
            },
            { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
          ],
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'headTaskId',
          as: 'childTasks',
        },
      },
      { $unwind: { path: '$assignedTo', preserveNullAndEmptyArrays: true } },
    ]);

    if (!task[0] || '_id' in task[0] === false) throw new Error('Not found');

    return task[0];
  }

  async update(updateTaskInput: UpdateTaskInput) {
    if (
      updateTaskInput.headTaskId &&
      !(await this.taskModel.exists({ _id: updateTaskInput.headTaskId }))
    )
      throw new Error(
        'Task that you want your task to be connected is not exist',
      );

    if (
      updateTaskInput.assignedTo &&
      !(await this.userModel.exists({ _id: updateTaskInput.assignedTo }))
    )
      throw new Error('User is not exist');

    const updated = await this.taskModel
      .findOneAndUpdate(
        { _id: new ObjectId(updateTaskInput.id) },
        updateTaskInput,
        {
          runValidators: true,
        },
      )
      .lean();

    if (!updated) throw new Error('Not found');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.taskModel.findByIdAndDelete(id).lean();

    if (!deleted) throw new Error('Not found');

    return deleted;
  }
}
