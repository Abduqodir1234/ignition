import { registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schema_Mongoose, Types } from 'mongoose';
import { UserDocument } from 'src/user/schema/user';

export type TaskDocument = Task & Document;

export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  DONE,
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Task status',
});

@Schema({ discriminatorKey: 'status', timestamps: true })
export class Task {
  @Prop({ required: true })
  name: string;
  @Prop({
    required: false,
    enum: [Status.DONE, Status.IN_PROGRESS, Status.NOT_STARTED],
    default: Status.NOT_STARTED,
  })
  status: Status;
  @Prop({
    ref: 'User',
    type: Schema_Mongoose.Types.ObjectId,
  })
  assignedTo: UserDocument['_id'];
  @Prop({
    required: false,
    ref: 'Tasks',
    type: Types.ObjectId,
    default: null,
  })
  headTaskId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
