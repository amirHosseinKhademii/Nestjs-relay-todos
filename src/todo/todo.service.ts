import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './inputs/create-todo.input';
import { Todo } from './todo.entity';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/user.entity';
@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async getAllTodos() {
    return this.repo.find({ relations: { user: true } });
  }

  async createTodo(body: CreateTodoInput, user: User) {
    const todo = await this.repo.create({ ...body, user: user.id, id: uuid() });
    return await this.repo.save(todo);
  }
}
