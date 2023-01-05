import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs } from 'src/relay/connection.args';
import { InputArg } from 'src/relay/input-arg.decorator';
import { RelayMutation } from 'src/relay/reply-mutation.decorator';
import { CardService } from './card.service';
import { CreateCardInput } from './types/card-create.input';
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

  @RelayMutation(() => Card)
  addCard(@InputArg(() => CreateCardInput) input: CreateCardInput) {
    return this.service.addCard(input);
  }

  // @Query(() => Card)
  // node(@Args('id') id: string): Promise<Card> {
  //   console.log(id);

  //   return this.service.findCardById(id);
  // }
}
