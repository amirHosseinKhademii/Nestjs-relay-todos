import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionFromArraySlice, toGlobalId } from 'graphql-relay';
import { ConnectionArgs, getPagingParameters } from 'src/relay/connection.args';
import { Repository } from 'typeorm';
import { TodoCreateArgs } from './types/todo.create.args';
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

  async addTodo(args: TodoCreateArgs): Promise<Todo> {
    const guid = uuid();
    const id = toGlobalId('Todo', guid);
    const todo = await this.repo.create({ ...args, id });
    return await this.repo.save(todo);
  }
}
