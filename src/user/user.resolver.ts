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
import { CreateUserArgs } from './args/signup-user.args';
import { SigninUserArgs } from './args/signin-user.args';
import { UserService } from './user.service';
import { UserGQL } from './graphql/user.type';

@Resolver((of) => UserGQL)
export class UserResolver {
  constructor(
    private service: UserService,
    @Inject(forwardRef(() => TodoService)) private todoService: TodoService,
  ) {}

  @Query((returns) => [UserGQL])
  users() {
    return this.service.getUsers();
  }

  @Query((returns) => UserGQL)
  user(@Args('userId') id: string) {
    return this.service.getUser(id);
  }

  @Mutation((returns) => String)
  signUp(@Args() body: CreateUserArgs) {
    return this.service.createUser(body);
  }

  @Mutation((returns) => String)
  signIn(@Args() body: SigninUserArgs) {
    return this.service.signin(body);
  }

  @ResolveField()
  todos(@Parent() user: UserGQL) {
    return this.todoService.getTodosByIds(user.todos);
  }
}
