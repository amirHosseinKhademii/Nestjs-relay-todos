import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CardService } from 'src/card';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard, GetUser, User } from 'src/user';
import { UserService } from 'src/user/user.service';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './types/todo.input';
import { Todo, TodoConnection } from './types/todo.types';
import { AddTodoPayload, UpdateTodoPayload } from './types/tood.response';

@Resolver(() => Todo)
@UseGuards(new AuthGraphGuard())
export class TodoResolver {
  constructor(
    private service: TodoService,
    private cardService: CardService,
    private userService: UserService,
  ) {}

  @Query(() => TodoConnection, { name: 'todos' })
  todos(
    @GetUser() user: User,
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<TodoConnection> {
    return this.service.findAllTodos(args, user.id);
  }

  @Query(() => Todo, { name: 'todo' })
  todo(@Args({ type: () => ID, name: 'id' }) id: string): Promise<Todo> {
    return this.service.findTodoById(id);
  }

  @RelayMutation(() => AddTodoPayload)
  addTodo(
    @GetUser() user: User,
    @InputArg(() => CreateTodoInput) input: CreateTodoInput,
  ) {
    return this.service.addTodo(input, user.id);
  }

  @RelayMutation(() => UpdateTodoPayload)
  updateTodo(@InputArg(() => UpdateTodoInput) input: UpdateTodoInput) {
    return this.service.updateTodo(input);
  }

  @ResolveField()
  cards(
    @Parent() todo: Todo,
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<TodoConnection> {
    return this.cardService.findCardsByIds(args, todo.cards);
  }

  @ResolveField()
  user(@Parent() todo: Todo): Promise<User> {
    return this.userService.finduserById(todo.user);
  }
}
