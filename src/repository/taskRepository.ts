import { AppDataSource } from '../config/dbConfig';
import { Task } from '../models/task';

export const TaskRepository = AppDataSource.getRepository(Task);
