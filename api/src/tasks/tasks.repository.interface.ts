import { Task } from './task.entity';

export interface TasksRepositoryInterface {
  createTask(title: string, userId: number): Promise<Task>;
  getAllTasks(
    userId: number,
    completed?: boolean,
    page?: number,
    limit?: number,
  ): Promise<{
    data: Task[];
    metadata: {
      total: number;
      page: number;
      limit: number;
    };
  }>;
  getTaskById(id: number, userId: number): Promise<Task | null>;
  updateTask(
    id: number,
    userId: number,
    updateData: Partial<Task>,
  ): Promise<Task>;
  deleteTask(id: number, userId: number): Promise<void>;
}
