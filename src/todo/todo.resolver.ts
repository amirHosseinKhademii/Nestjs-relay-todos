import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CardService } from 'src/card';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard, GetUser, User } from 'src/user';
import { UserService } from 'src/user/user.service';
import { TodoService } from './todo.service';
import {
  CreateTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from './types/todo.input';
import { Todo, TodoConnection } from './types/todo.types';
import {
  AddTodoPayload,
  DeleteTodoPayload,
  UpdateTodoPayload,
} from './types/tood.response';

const pubSub = new PubSub();
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
  ): Promise<AddTodoPayload> {
    return this.service.addTodo(input, user.id);
  }

  @RelayMutation(() => UpdateTodoPayload)
  async updateTodo(@InputArg(() => UpdateTodoInput) input: UpdateTodoInput) {
    const todo = this.service.updateTodo(input);
    pubSub.publish('todoUpdated', {
      todoUpdated: (await todo).todo,
    });
    return todo;
  }

  @RelayMutation(() => DeleteTodoPayload)
  async deleteTodo(@InputArg(() => DeleteTodoInput) id: string) {
    await this.service.deleteTodoById(id);
    return id;
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

  @Subscription(() => Todo, { name: 'todoUpdated' })
  todoUpdated() {
    return pubSub.asyncIterator('todoUpdated');
  }
}
