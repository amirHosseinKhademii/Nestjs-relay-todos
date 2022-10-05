import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TodoService } from 'src/todo/todo.service';
import { CreateUserInput } from './inputs/create-user.input';
import { SigninUserInput } from './inputs/signin-user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    private service: UserService,
    @Inject(forwardRef(() => TodoService)) private todoService: TodoService,
  ) {}

  @Query((returns) => [UserType])
  users() {
    return this.service.getUsers();
  }

  @Query((returns) => UserType)
  user(@Args('userId') id: string) {
    return this.service.getUser(id);
  }

  @Mutation((returns) => String)
  signUp(@Args('signupInput') body: CreateUserInput) {
    return this.service.createUser(body);
  }

  @Mutation((returns) => String)
  signIn(@Args('signinInput') body: SigninUserInput) {
    return this.service.signin(body);
  }

  @ResolveField()
  todos(@Parent() user: UserType) {
    return this.todoService.getTodosByIds(user.todos);
  }
}
