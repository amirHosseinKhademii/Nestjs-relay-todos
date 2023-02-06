import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toGlobalId } from 'graphql-relay';
import { ConnectionArgs, nextId } from 'src/relay';
import { Repository } from 'typeorm';
import { CreateTodoInput, UpdateTodoInput } from './types/todo.input';
import { Todo, TodoConnection } from './types/todo.types';
import { v4 as uuid } from 'uuid';
import { AddTodoPayload } from './types/tood.response';
import { findAll } from 'src/services';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async findAllTodos(
    args: ConnectionArgs,
    user: string,
  ): Promise<TodoConnection> {
    return await findAll(args, this.repo);
    // return await findAll(args, this.repo, { user: user });
  }

  async findTodoById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async addTodo(args: CreateTodoInput, user: string): Promise<AddTodoPayload> {
    const guid = uuid();
    const id = toGlobalId('Todo', guid);
    const todo = await this.repo.create({ ...args, id, user });
    const result = await this.repo.save(todo);
    return {
      addTodoEdge: {
        node: result,
        cursor: nextId(id).toString(),
      },
    } as any;
  }

  async updateTodo(args: UpdateTodoInput) {
    const { id, ...body } = args;
    const updated_at = new Date();
    Object.keys(body).forEach((key) => body[key] === null && delete body[key]);
    const todo = await this.repo.findOneByOrFail({ id });
    const updatedTodo: Todo = { ...todo, ...body, updated_at };
    const result = await this.repo.save(updatedTodo);
    return { todo: result };
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

  async deleteTodoById(id: string) {
    return await this.repo.delete(id);
  }
}
