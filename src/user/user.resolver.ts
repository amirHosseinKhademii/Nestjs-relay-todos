import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateUserInput,
  FollowInput,
  SigninUserInput,
} from './types/user.input';
import { User } from './types';
import { FollowPayload, UsersConnection } from './types/user.response';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { GetUser } from './decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGraphGuard } from './guards';

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

  @UseGuards(new AuthGraphGuard())
  @RelayMutation(() => FollowPayload)
  async followOrUnfollow(
    @GetUser() user: User,
    @InputArg(() => FollowInput) input: FollowInput,
  ): Promise<FollowPayload> {
    return await this.service.followOrUnfollowUser(input, user.id);
  }
}
