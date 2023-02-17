import { UseGuards } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard, GetUser, User } from 'src/user';
import { UserService } from 'src/user/user.service';
import { MessageService } from './message.service';
import {
  CreateMessageInput,
  Message,
  MessageConnection,
  MessagesQuery,
  AddMessagePayload,
  AddMessageSubPayload,
} from './types';

const pubSub = new PubSub();

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
  async addMessage(
    @GetUser() user: User,
    @InputArg(() => CreateMessageInput) input: CreateMessageInput,
  ): Promise<AddMessagePayload> {
    const message = this.service.addMessage(input, user.id);
    pubSub.publish('messageAdded', {
      messageAdded: await message,
    });
    return message;
  }

  @ResolveField()
  receiver(@Parent() message: Message): Promise<User> {
    return this.userService.finduserById(message.receiver);
  }

  @Subscription(() => AddMessageSubPayload, {
    name: 'messageAdded',
    filter: (
      payload: { messageAdded: AddMessageSubPayload },
      variables: { chatId: string },
    ) => payload.messageAdded.addMessageEdge.node.chatId === variables.chatId,
  })
  messageAdded(@Args('chatId') chatId: string) {
    return pubSub.asyncIterator('messageAdded');
  }
}
