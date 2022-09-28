import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks = [...this.tasks, task];
    return task;
  }
}
