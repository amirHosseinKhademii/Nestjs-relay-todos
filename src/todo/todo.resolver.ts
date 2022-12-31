import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { AuthGraphGuard } from 'src/user/guards/auth-graph.guard';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTodoInput } from './inputs/create-todo.input';
import { GetTodosQuery } from './inputs/get-todos.query';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { TodoType } from './todo.type';

@Resolver((of) => TodoType)
@UseGuards(new AuthGraphGuard())
export class TodoResolver {
  constructor(private service: TodoService, private userService: UserService) {}

  @Query((returns) => [TodoType])
  todos(@Args('getTodosQuery', { nullable: true }) query: GetTodosQuery) {
    return this.service.getAllTodos(query);
  }

  @Mutation((returns) => TodoType)
  createTodo(
    @Args('createTodoInput') body: CreateTodoInput,
    @GetUser() user: User,
  ) {
    return this.service.createTodo(body, user);
  }

  @ResolveField()
  user(@Parent() todo: Todo) {
    return this.userService.getUser(todo.user);
  }
}
