import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  // @Get()
  // getAll(@Query() query: GetTaskFilterDto): Task[] | Promise<Task[]> {
  //   if (query) this.service.getFilterTasks(query);
  //   return this.service.getAllTasks();
  // }

  @Post()
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.service.createTask(body);
  }

  @Get('/:id')
  get(@Param('id') id: string): Promise<Task> | undefined {
    return this.service.getById(id);
  }

  // @Delete('/:id')
  // remove(@Param('id') id: string): void {
  //   this.service.removeById(id);
  // }

  // @Patch('/:id')
  // update(
  //   @Param('id') id: string,
  //   @Body() { status }: { status: TaskStatus },
  // ): void {
  //   this.service.updateById(id, status);
  // }
}
