import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/schema/task.schema';
import { User, UserDocument } from 'src/user/schema/user';
import { CreateTaskCommentInput } from './dto/create-task-comment.input';
import { TaskCommentListQuery } from './dto/list-task-comment.input';
import { UpdateTaskCommentInput } from './dto/update-task-comment.input';
import { TaskComment, TaskCommentDocument } from './schema/task-comment';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskCommentService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(TaskComment.name)
    private readonly taskCommentModel: Model<TaskCommentDocument>,
  ) {}
  async create(userId: string, createTaskCommentInput: CreateTaskCommentInput) {
    if (!(await this.taskModel.exists({ _id: createTaskCommentInput.taskId })))
      throw new Error('Task not found');

    const newTaskComment = new this.taskCommentModel({
      ...createTaskCommentInput,
      taskId: new ObjectId(createTaskCommentInput.taskId),
      userId,
    });

    return newTaskComment.save();
  }

  async findAll(taskCommentListInput: TaskCommentListQuery) {
    const data = await this.taskCommentModel.aggregate([
      { $skip: taskCommentListInput?.offset || 0 },
      { $limit: taskCommentListInput?.limit || 10 },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'taskId',
          foreignField: '_id',
          as: 'task',
        },
      },
      { $unwind: { path: '$task', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    ]);

    return data;
  }

  async findOne(id: string) {
    const data = await this.taskCommentModel.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'taskId',
          foreignField: '_id',
          as: 'task',
        },
      },
      { $unwind: { path: '$task', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    ]);

    if (data.length === 0) throw new Error('Not found');

    return data[0];
  }

  async update(userId: string, updateTaskCommentInput: UpdateTaskCommentInput) {
    if (
      updateTaskCommentInput.taskId &&
      !(await this.taskModel.exists({ _id: updateTaskCommentInput.taskId }))
    )
      throw new Error('Task not found');

    return await this.taskCommentModel.findOneAndUpdate(
      { _id: updateTaskCommentInput.id, userId },
      {
        ...updateTaskCommentInput,
        taskId: new ObjectId(updateTaskCommentInput.taskId),
      },
      {
        runValidators: true,
      },
    );
  }
}
