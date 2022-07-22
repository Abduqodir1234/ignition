import { TaskListQuery } from '../dto/list.query';
import { ObjectId } from 'mongodb';
export function TaskListQueryGenerator(data: TaskListQuery) {
  const { assignedTo, status } = data;
  let query = {};
  if (assignedTo) query = { assignedTo };
  if (status) query = { ...query, status };
  return query;
}
