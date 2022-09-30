import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async createTask(body: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.repo.create({
      ...body,
      user,
      status: TaskStatus.OPEN,
    });
    return await this.repo.save(task);
  }

  async getById(id: string): Promise<Task> | undefined {
    const task = await this.repo.findOneBy({ id });
    if (task) return task;
    throw new NotFoundException('No task by this id.');
  }

  async removeById(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async updateById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getById(id);
    task.status = status;
    await this.repo.save(task);
    return task;
  }

  async getAll({ search, status }: GetTaskFilterDto): Promise<Task[]> {
    const query = this.repo.createQueryBuilder('task');
    if (status) query.andWhere('task.status = :status', { status });
    if (search)
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) lIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    return query.getMany();
  }
}
