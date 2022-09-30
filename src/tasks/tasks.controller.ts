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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
  create(@Body() body: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.service.createTask(body, user);
  }

  @Get('/:id')
  get(@Param('id') id: string): Promise<Task> | undefined {
    return this.service.getById(id);
  }

  @Get()
  getAll(
    @Query() query: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.service.getAll(query, user);
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
