import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateTodoInput } from './inputs/create-todo.input';
import { Todo } from './todo.entity';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { GetTodosQuery } from './inputs/get-todos.query';
@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async getAllTodos(query: GetTodosQuery) {
    const options: any = query
      ? {
          where: {
            created_at: {
              $gte: new Date(query?.from),
              $lt: new Date(query?.until),
            },
          },
        }
      : {};
    return this.repo.find(options);
  }

  async getTodosByIds(ids: string[]) {
    const options: any = { id: { $in: ids } };
    return await this.repo.find(options);
  }

  async createTodo(body: CreateTodoInput, user: User) {
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
