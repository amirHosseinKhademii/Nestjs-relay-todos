import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  getAll(): Task[] | Promise<Task[]> {
    return this.service.getAllTasks();
  }

  @Post()
  create(@Body() body: CreateTaskDto): Task | Promise<Task> {
    return this.service.createTask(body);
  }
}
