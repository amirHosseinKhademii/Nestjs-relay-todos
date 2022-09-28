import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  getAll(): Task[] {
    return this.service.getAllTasks();
  }

  @Post()
  create(
    @Body() { title, description }: { title: string; description: string },
  ) {
    return this.service.createTask(title, description);
  }
}
