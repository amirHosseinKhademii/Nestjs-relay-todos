import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CardService } from 'src/card/card.service';
import { ConnectionArgs } from 'src/relay/connection.args';
import { TodoService } from './todo.service';
import { TodoCreateArgs } from './types/todo.create.args';
import { Todo, TodoConnection } from './types/todo.types';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private service: TodoService, private cardService: CardService) {}

  @Query(() => TodoConnection, { name: 'todos' })
  todos(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<TodoConnection> {
    return this.service.findAllTodos(args);
  }

  @Query(() => Todo, { name: 'todo' })
  todo(@Args({ type: () => ID, name: 'id' }) id: string): Promise<Todo> {
    return this.service.findTodoById(id);
  }

  @Mutation(() => Todo)
  addTodo(@Args() args: TodoCreateArgs) {
    return this.service.addTodo(args);
  }

  @ResolveField()
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<TodoConnection> {
    return this.cardService.findAllCards(args);
  }
}
