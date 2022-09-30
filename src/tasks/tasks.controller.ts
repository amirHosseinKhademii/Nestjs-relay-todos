import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.service.createTask(body);
  }

  @Get('/:id')
  get(@Param('id') id: string): Promise<Task> | undefined {
    return this.service.getById(id);
  }

  @Get()
  getAll(@Query() query: GetTaskFilterDto): Promise<Task[]> {
    return this.service.getAll(query);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): void {
    this.service.removeById(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() { status }: { status: TaskStatus },
  ): Promise<Task> {
    return this.service.updateById(id, status);
  }
}
