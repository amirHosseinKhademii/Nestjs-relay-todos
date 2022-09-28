import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
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

  updateById(id: string, body: Partial<CreateTaskDto>) {
    this.tasks = this.tasks.map((item) =>
      item.id === id ? { ...item, ...body } : item,
    );
  }
}
