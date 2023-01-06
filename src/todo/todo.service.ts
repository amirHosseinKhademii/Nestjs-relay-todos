import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice, toGlobalId } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay';
import { Repository } from 'typeorm';
import { CreateTodoInput, UpdateTodoInput } from './types/todo.input';
import { Todo, TodoConnection } from './types/todo.types';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async findAllTodos(args: ConnectionArgs): Promise<TodoConnection> {
    const { limit, offset } = getPagingParameters(args);
    const [results, count] = await this.repo.findAndCount({
      take: limit,
      skip: offset,
    });

    return connectionFromArraySlice(results, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
  }

  async findTodoById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async addTodo(args: CreateTodoInput): Promise<Todo> {
    const guid = uuid();
    const id = toGlobalId('Todo', guid);
    const todo = await this.repo.create({ ...args, id });
    return await this.repo.save(todo);
  }

  async updateTodo(args: UpdateTodoInput) {
    const { id, ...body } = args;
    const updated_at = new Date();
    Object.keys(body).forEach((key) => body[key] === null && delete body[key]);
    const todo = await this.repo.findOneByOrFail({ id });
    const updatedTodo: Todo = { ...todo, ...body, updated_at };
    return await this.repo.save(updatedTodo);
  }

  async updateCardsInTodoById({
    todoId,
    cardId,
  }: {
    todoId: string;
    cardId: string;
  }) {
    const updated_at = new Date();
    const todo = await this.repo.findOneByOrFail({ id: todoId });
    const cards = todo.cards ? [...todo.cards, cardId] : [cardId];
    const updatedTodo: Todo = { ...todo, cards, updated_at };
    return await this.repo.save(updatedTodo);
  }
}
