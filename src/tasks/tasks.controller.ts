import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  get(@Param('id') id: string): Task | Promise<Task> | undefined {
    return this.service.getById(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): void {
    this.service.removeById(id);
  }
}
