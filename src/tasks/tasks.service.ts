import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTasks({ search, status }: GetTaskFilterDto) {
    return this.tasks.filter(
      (item) => item.status === status && item.title === search,
    );
  }

  createTask(body: CreateTaskDto): Task {
    const task: Task = {
      ...body,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks = [...this.tasks, task];
    return task;
  }

  getById(id: string): Task | undefined {
    return this.tasks.find((item) => item.id === id);
  }

  removeById(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  updateById(id: string, status: TaskStatus) {
    this.tasks = this.tasks.map((item) =>
      item.id === id ? { ...item, status } : item,
    );
  }
}
