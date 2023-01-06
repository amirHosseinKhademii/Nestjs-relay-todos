import { forwardRef, Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
//import { TodoService } from 'src/todo/todo.service';

import { UserService } from './user.service';

import { CreateUserInput, SigninUserInput } from './types/user.input';
import { User } from './types';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private service: UserService, // @Inject(forwardRef(() => TodoService)) private todoService: TodoService,
  ) {}

  @Query((returns) => [User])
  users() {
    return this.service.getUsers();
  }

  @Query((returns) => User)
  user(@Args('userId') id: string) {
    return this.service.getUser(id);
  }

  @Mutation((returns) => String)
  signUp(@Args() body: CreateUserInput) {
    return this.service.createUser(body);
  }

  @Mutation((returns) => String)
  signIn(@Args() body: SigninUserInput) {
    return this.service.signin(body);
  }
}
