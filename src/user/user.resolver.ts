import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, SigninUserInput } from './types/user.input';
import { User } from './types';
import { UsersConnection } from './types/user.response';
import { ConnectionArgs } from 'src/relay';

@Resolver(() => User)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => [User])
  users() {
    return this.service.findAllUsers();
  }

  @Query(() => UsersConnection, { name: 'usersByIds' })
  usersByIds(
    @Args() args: ConnectionArgs,
    @Args('ids', { type: () => [ID] }) ids: string[],
    @Args('query', { nullable: true }) query?: string,
  ) {
    return this.service.findUsersByIds(args, ids);
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
