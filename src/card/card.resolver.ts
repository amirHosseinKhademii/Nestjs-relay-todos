import {
  Args,
  ArgsOptions,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ResolvedGlobalId } from 'nestjs-relay';

import { ConnectionArgs } from 'src/relay/connection.args';
import {
  GlobalIdFieldResolver,
  typeResolvedGlobalId,
} from 'src/relay/global-id-field.resolver';
import { User } from 'src/user/typeorm';
import { CardService } from './card.service';
import { CardCreateArgs } from './types/card.create.args';
import { Card, CardResponse } from './types/card.types';

@Resolver(() => Card)
export class CardResolver {
  constructor(private service: CardService) {}

  @Query(() => CardResponse, { name: 'cards' })
  cards(
    @Args() args: ConnectionArgs,
    @Args('query', { nullable: true }) query?: string,
  ): Promise<CardResponse> {
    return this.service.findAllCards(args);
  }

  // @Mutation(() => Card)
  // addCard(@Args() args: CardCreateArgs) {
  //   return this.service.addCard(args);
  // }

  // @Query(() => Card)
  // node(@Args('id') id: string): Promise<Card> {
  //   console.log(id);

  //   return this.service.findCardById(id);
  // }
}
