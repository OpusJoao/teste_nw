import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepositoryInterface } from './tasks.repository.interface';

@Injectable()
export class TasksRepository implements TasksRepositoryInterface {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repository: Repository<Task>,
  ) {}
  async createTask(title: string, userId: number): Promise<Task> {
    const task = this.repository.create({ title, userId, completed: false });
    return await this.repository.save(task);
  }

  async getAllTasks(
    userId: number,
    completed?: boolean,
    page = 1,
    limit = 10,
  ): Promise<{
    data: Task[];
    metadata: {
      total: number;
      page: number;
      limit: number;
    };
  }> {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [data, total] = await this.repository.findAndCount({
      where: { userId: userId, completed },
      skip,
      take,
      order: { id: 'DESC' },
    });

    return {
      data,
      metadata: {
        total,
        page: Number(page),
        limit: take,
      },
    };
  }

  async getTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.repository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async updateTask(
    id: number,
    userId: number,
    updateData: Partial<Task>,
  ): Promise<Task> {
    const task = await this.getTaskById(id, userId);

    if (updateData.title !== undefined) {
      task.title = updateData.title;
    }
    if (updateData.completed !== undefined) {
      task.completed = updateData.completed;
    }
    if (updateData.description !== undefined) {
      task.description = updateData.description;
    }

    return await this.repository.save(task);
  }

  async deleteTask(id: number, userId: number): Promise<void> {
    const result = await this.repository.delete({ id, userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
