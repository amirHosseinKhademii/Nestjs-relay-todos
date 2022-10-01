import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { AuthGraphGuard } from 'src/user/guards/auth-graph.guard';
import { User } from 'src/user/user.entity';
import { CreateTodoInput } from './inputs/create-todo.input';
import { TodoService } from './todo.service';
import { TodoType } from './todo.type';

@Resolver((of) => TodoType)
@UseGuards(new AuthGraphGuard())
export class TodoResolver {
  constructor(private service: TodoService) {}

  @Query((returns) => [TodoType])
  todos() {
    return this.service.getAllTodos();
  }

  @Mutation((returns) => TodoType)
  createTodo(
    @Args('createTodoInput') body: CreateTodoInput,
    @GetUser() user: User,
  ) {
    return this.service.createTodo(body, user);
  }
}
