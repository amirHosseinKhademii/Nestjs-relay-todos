import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './typeorm/todo.entity';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/typeorm/user.entity';
import { UserService } from 'src/user/user.service';
import { paginateResponse } from 'src/utils/pagination';
import { GetTodosArgs } from './args/get-todos.args';
import { CreateTodoArgs } from './args/create-todo.args';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async getAllTodos(args: GetTodosArgs) {
    const { start_date, end_date, page, limit } = args || {};
    const take = limit || 10;
    const pages = page || 1;
    const skip = (pages - 1) * take;
    const where =
      start_date && end_date
        ? {
            created_at: {
              $gte: new Date(start_date),
              $lt: new Date(end_date),
            },
          }
        : {};
    const order = {
      created_at: 'DESC',
    };
    const options: any = args
      ? {
          where,
          take,
          skip,
          order,
        }
      : {};
    const data = await this.repo.findAndCount(options);
    return paginateResponse(data, page, limit);
  }

  async getTodosByIds(ids: string[]) {
    const options: any = { id: { $in: ids } };
    return await this.repo.find(options);
  }

  async createTodo(body: CreateTodoArgs, user: User) {
    const id = uuid();
    const todo = await this.repo.create({
      ...body,
      user: user.id,
      id,
    });
    this.userService.addTodo(user.id, id);
    return await this.repo.save(todo);
  }
}
