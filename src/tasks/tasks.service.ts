import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'test', description: 'desc', status: TaskStatus.DONE },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      title,
      description,
      id: Math.random().toString(),
      status: TaskStatus.OPEN,
    };
    this.tasks = [...this.tasks, task];
    return task;
  }
}
