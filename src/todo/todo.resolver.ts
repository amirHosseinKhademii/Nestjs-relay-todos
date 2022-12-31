import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetUser } from 'src/user/decorators';
import { AuthGraphGuard } from 'src/user/guards';
import { User } from 'src/user/typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTodoArgs, GetTodosArgs } from './args';
import { Todo } from './typeorm';
import { TodoResponseGQL, TodoGQL } from './graphql';
import { TodoService } from './todo.service';

@Resolver((of) => TodoGQL)
@UseGuards(new AuthGraphGuard())
export class TodoResolver {
  constructor(private service: TodoService, private userService: UserService) {}

  @Query((returns) => TodoResponseGQL)
  todos(@Args() args: GetTodosArgs, @GetUser() user: User) {
    return this.service.getAllTodos(args, user);
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
