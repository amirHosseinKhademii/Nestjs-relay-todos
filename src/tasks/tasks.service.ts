import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = ['hi'];

  getAllTasks() {
    return this.tasks;
  }
}
