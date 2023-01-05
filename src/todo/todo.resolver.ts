import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs } from 'src/relay/connection.args';
import { TodoService } from './todo.service';
import { TodoCreateArgs } from './types/todo.create.args';
import { Todo, TodoConnection } from './types/todo.types';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private service: TodoService) {}

  @Query(() => TodoConnection, { name: 'todos' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<TodoConnection> {
    return this.service.findAllTodos(args);
  }

  @Mutation(() => Todo)
  addTodo(@Args() args: TodoCreateArgs) {
    return this.service.addTodo(args);
  }
}
