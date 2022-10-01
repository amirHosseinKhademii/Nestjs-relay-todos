import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './inputs/create-user.input';
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
  signUp(@Args('SignUp') body: CreateUserInput) {
    return this.service.createUser(body);
  }
}
