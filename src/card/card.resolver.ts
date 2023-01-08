import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard } from 'src/user';
import { PubSub } from 'graphql-subscriptions';
import { CardService } from './card.service';
import { CreateCardInput, UpdateCardInput } from './types/card.input';
import { AddCardPayload } from './types/card.response';
import { Card, CardConnection } from './types/card.types';

const pubSub = new PubSub();
@Resolver(() => Card)
@UseGuards(new AuthGraphGuard())
export class CardResolver {
  constructor(private service: CardService) {}

  @Query(() => CardConnection, { name: 'cards' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CardConnection> {
    return this.service.findAllCards(args);
  }

  @RelayMutation(() => AddCardPayload)
  async addCard(@InputArg(() => CreateCardInput) input: CreateCardInput) {
    const card = this.service.addCard(input);
    pubSub.publish('cardAdded', {
      cardAdded: (await card).card,
    });
    return card;
  }

  @RelayMutation(() => AddCardPayload)
  async updateCard(@InputArg(() => UpdateCardInput) input: UpdateCardInput) {
    const card = this.service.updateCard(input);
    pubSub.publish('cardUpdated', {
      cardUpdated: (await card).card,
    });
    return card;
  }

  @Subscription(() => Card, { name: 'cardAdded' })
  cardAdded() {
    return pubSub.asyncIterator('cardAdded');
  }

  @Subscription(() => Card, { name: 'cardUpdated' })
  todoUpdated() {
    return pubSub.asyncIterator('cardUpdated');
  }
}
