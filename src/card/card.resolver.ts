import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConnectionArgs, InputArg, RelayMutation } from 'src/relay';
import { AuthGraphGuard } from 'src/user/guards';
import { CardService } from './card.service';
import { CreateCardInput } from './types/card.input';
import { Card, CardConnection } from './types/card.types';

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

  @RelayMutation(() => Card)
  addCard(@InputArg(() => CreateCardInput) input: CreateCardInput) {
    return this.service.addCard(input);
  }
}
