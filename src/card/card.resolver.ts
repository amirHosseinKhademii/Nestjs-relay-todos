import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard } from 'src/user';
import { PubSub } from 'graphql-subscriptions';
import { CardService } from './card.service';
import {
  CreateCardInput,
  DeleteCardInput,
  UpdateCardInput,
} from './types/card.input';
import {
  AddCardPayload,
  DeleteCardPayload,
  UpdateCardPayload,
} from './types/card.response';
import { Card, CardConnection } from './types/card.types';
import { CommentService } from 'src/comment';

const pubSub = new PubSub();
@Resolver(() => Card)
@UseGuards(new AuthGraphGuard())
export class CardResolver {
  constructor(
    private service: CardService,
    private CommentService: CommentService,
  ) {}

  @Query(() => CardConnection, { name: 'cards' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CardConnection> {
    return this.service.findAllCards(args);
  }

  @RelayMutation(() => AddCardPayload)
  async addCard(
    @InputArg(() => CreateCardInput) input: CreateCardInput,
  ): Promise<AddCardPayload> {
    const card = this.service.addCard(input);
    pubSub.publish('cardAdded', {
      cardAdded: await card,
    });
    return card;
  }

  @RelayMutation(() => UpdateCardPayload)
  async updateCard(@InputArg(() => UpdateCardInput) input: UpdateCardInput) {
    const card = this.service.updateCard(input);
    pubSub.publish('cardUpdated', {
      cardUpdated: (await card).card,
    });
    return card;
  }

  @RelayMutation(() => DeleteCardPayload)
  async deleteCard(@InputArg(() => DeleteCardInput) id: string) {
    await this.service.deleteCardById(id);
    return id;
  }

  @ResolveField()
  comments(
    @Parent() card: Card,
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ) {
    return this.CommentService.findCommentsByIds(args, card.comments);
  }

  @Subscription(() => Card, { name: 'cardAdded' })
  cardAdded() {
    return pubSub.asyncIterator('cardAdded');
  }

  @Subscription(() => Card, { name: 'cardUpdated' })
  cardUpdated() {
    return pubSub.asyncIterator('cardUpdated');
  }
}
