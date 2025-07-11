import { Inject, Injectable } from '@nestjs/common';
import { TasksRepositoryInterface } from './tasks.repository.interface';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepositoryInterface')
    private readonly tasksRepository: TasksRepositoryInterface,
  ) {}

  create(title: string, userId: number): Promise<Task> {
    return this.tasksRepository.createTask(title, userId);
  }

  findAll(
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
  }> {
    return this.tasksRepository.getAllTasks(userId, completed, page, limit);
  }

  findOne(id: number, userId: number): Promise<Task | null> {
    return this.tasksRepository.getTaskById(id, userId);
  }

  update(
    id: number,
    title: string,
    completed: boolean,
    userId: number,
  ): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.completed = completed;
    task.userId = userId;
    return this.tasksRepository.updateTask(id, userId, task);
  }

  remove(id: number, userId: number): Promise<void> {
    return this.tasksRepository.deleteTask(id, userId);
  }
}
