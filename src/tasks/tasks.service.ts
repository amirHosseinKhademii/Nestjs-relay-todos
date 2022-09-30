import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async getById(id: string): Promise<Task> | undefined {
    const task = await this.repo.findOneBy({ id });
    if (task) return task;
    throw new NotFoundException('No task by this id.');
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getFilterTasks({ search, status }: GetTaskFilterDto) {
  //   return this.tasks.filter(
  //     (item) => item.status === status && item.title === search,
  //   );
  // }
  async createTask(body: CreateTaskDto): Promise<Task> {
    const task = await this.repo.create({
      ...body,
      status: TaskStatus.OPEN,
    });
    return await this.repo.save(task);
  }
  // getById(id: string): Task | undefined {
  //   const task = this.tasks.find((item) => item.id === id);
  //   if (task) return task;
  //   throw new NotFoundException('No task by this id');
  // }
  // removeById(id: string): void {
  //   this.tasks = this.tasks.filter((item) => item.id !== id);
  // }
  // updateById(id: string, status: TaskStatus) {
  //   this.tasks = this.tasks.map((item) =>
  //     item.id === id ? { ...item, status } : item,
  //   );
  // }
}
