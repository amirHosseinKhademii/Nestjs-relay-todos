import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs } from 'src/relay/connection.args';
import { CardService } from './card.service';
import { CardCreateArgs } from './types/card.create.args';
import { CardResponse } from './types/card.response';
import { Card } from './types/card.types';

@Resolver(() => CardResponse)
export class CardResolver {
  constructor(private service: CardService) {}

  @Query(() => CardResponse, { name: 'cards' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CardResponse> {
    return this.service.findAllCards(args);
  }

  @Mutation(() => Card)
  addCard(@Args() args: CardCreateArgs): Promise<Card> {
    return this.service.addCard(args);
  }
}
