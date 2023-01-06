import { Args, ID, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CardService } from 'src/card/card.service';
import { ConnectionArgs } from 'src/relay/connection.args';
import { InputArg } from 'src/relay/input-arg.decorator';
import { RelayMutation } from 'src/relay/reply-mutation.decorator';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './types/todo.input';
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

  @RelayMutation(() => Todo)
  addTodo(@InputArg(() => CreateTodoInput) input: CreateTodoInput) {
    return this.service.addTodo(input);
  }

  @RelayMutation(() => Todo)
  updateTodo(@InputArg(() => UpdateTodoInput) input: UpdateTodoInput) {
    return this.service.updateTodo(input);
  }

  @ResolveField()
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<TodoConnection> {
    return this.cardService.findAllCards(args);
  }
}
