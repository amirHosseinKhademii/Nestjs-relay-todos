import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './inputs/create-user.input';
import { SigninUserInput } from './inputs/signin-user.input';
import { UserService } from './user.service';
import { UserType } from './user.type';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query((returns) => [UserType])
  users() {
    return this.service.getUsers();
  }

  @Mutation((returns) => String)
  signUp(@Args('signupInput') body: CreateUserInput) {
    return this.service.createUser(body);
  }

  @Mutation((returns) => String)
  signIn(@Args('signinInput') body: SigninUserInput) {
    return this.service.signin(body);
  }
}
