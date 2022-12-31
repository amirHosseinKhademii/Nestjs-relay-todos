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
import { User } from 'src/user/typeorm/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateTodoArgs } from './args/create-todo.args';
import { GetTodosArgs } from './args/get-todos.args';

import { Todo } from './typeorm/todo.entity';
import { TodoResponseGQL } from './graphql/todo.response';

import { TodoService } from './todo.service';
import { TodoGQL } from './graphql/todo.type';

@Resolver((of) => TodoGQL)
@UseGuards(new AuthGraphGuard())
export class TodoResolver {
  constructor(private service: TodoService, private userService: UserService) {}

  @Query((returns) => TodoResponseGQL)
  todos(@Args() args: GetTodosArgs) {
    return this.service.getAllTodos(args);
  }

  @Mutation((returns) => TodoGQL)
  addTodo(@Args() body: CreateTodoArgs, @GetUser() user: User) {
    return this.service.createTodo(body, user);
  }

  @ResolveField()
  user(@Parent() todo: Todo) {
    return this.userService.getUser(todo.user);
  }
}
