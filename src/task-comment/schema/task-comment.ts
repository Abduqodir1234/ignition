import { Document, Types, Schema as Schema_Mongoose } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TaskComment {
  @Prop({ required: true, ref: 'User', type: Schema_Mongoose.Types.ObjectId })
  userId: Types.ObjectId;
  @Prop({ required: true, ref: 'Task', type: Schema_Mongoose.Types.ObjectId })
  taskId: Types.ObjectId;
  @Prop({ type: String })
  comment: string;
}

export type TaskCommentDocument = TaskComment & Document;

export const TaskCommentSchema = SchemaFactory.createForClass(TaskComment);
