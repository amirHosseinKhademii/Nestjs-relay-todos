import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, SigninUserInput } from './types/user.input';
import { User } from './types';

@Resolver(() => User)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => [User])
  users() {
    return this.service.findAllUsers();
  }

  @Query(() => User)
  user(@Args('userId') id: string) {
    return this.service.finduserById(id);
  }

  @Mutation(() => String)
  signUp(@Args() body: CreateUserInput) {
    return this.service.signupUser(body);
  }

  @Mutation(() => String)
  signIn(@Args() body: SigninUserInput) {
    return this.service.signinUser(body);
  }
}
