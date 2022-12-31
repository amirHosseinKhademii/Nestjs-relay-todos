import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './typeorm';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/typeorm/user.entity';
import { UserService } from 'src/user/user.service';
import { mdbPaginationOptionCreator, paginateResponse } from 'src/utils';
import { GetTodosArgs, CreateTodoArgs } from './args';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async getAllTodos(args: GetTodosArgs) {
    const options = mdbPaginationOptionCreator(args);
    const data = await this.repo.findAndCount(options);
    return paginateResponse(data, args.page, args.limit);
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
