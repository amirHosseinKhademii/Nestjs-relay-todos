import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard, GetUser, User } from 'src/user';
import { UserService } from 'src/user/user.service';
import { MessageService } from './message.service';
import {
  CreateMessageInput,
  Message,
  MessageConnection,
  MessagesQuery,
} from './types';
import { AddMessagePayload } from './types/message.response';

@Resolver(() => Message)
@UseGuards(new AuthGraphGuard())
export class MessageResolver {
  constructor(
    private service: MessageService,
    private userService: UserService,
  ) {}

  @Query(() => MessageConnection, { name: 'messages' })
  todos(
    @Args() args: ConnectionArgs,
    @Args('query') query: MessagesQuery,
  ): Promise<MessageConnection> {
    return this.service.findAllMessages(args, query);
  }

  @RelayMutation(() => AddMessagePayload)
  addMessage(
    @GetUser() user: User,
    @InputArg(() => CreateMessageInput) input: CreateMessageInput,
  ): Promise<AddMessagePayload> {
    return this.service.addMessage(input, user.id);
  }

  @ResolveField()
  receiver(@Parent() message: Message): Promise<User> {
    return this.userService.finduserById(message.receiver);
  }
}
