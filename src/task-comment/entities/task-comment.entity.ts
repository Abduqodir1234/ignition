import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskComment {
  @Field(() => String, { description: '_id' })
  _id: string;
  @Field(() => String, { description: 'User id' })
  userId: string;
  @Field(() => String, { description: 'Task id' })
  taskId: string;
  @Field(() => String, { description: 'Comment Text' })
  comment: string;
  @Field(() => Date, { description: 'when this comment created' })
  createdAt: string;
  @Field(() => Date, { description: 'when this comment updated last time' })
  updatedAt: string;
}
