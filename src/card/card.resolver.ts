import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs } from 'src/relay/connection.args';
import { CardService } from './card.service';
import { CardCreateArgs } from './types/card.create.args';
import { Card, CardConnection } from './types/card.types';

@Resolver(() => Card)
export class CardResolver {
  constructor(private service: CardService) {}

  @Query(() => CardConnection, { name: 'cards' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CardConnection> {
    return this.service.findAllCards(args);
  }

  @Mutation(() => Card)
  addCard(@Args() args: CardCreateArgs) {
    return this.service.addCard(args);
  }

  // @Query(() => Card)
  // node(@Args('id') id: string): Promise<Card> {
  //   console.log(id);

  //   return this.service.findCardById(id);
  // }
}
