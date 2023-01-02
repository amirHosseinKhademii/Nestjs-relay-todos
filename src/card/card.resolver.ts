import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ConnectionArgs } from 'src/relay/connection.args';
import { User } from 'src/user/typeorm';
import { CardService } from './card.service';
import { CardCreateArgs } from './types/card.create.args';
import { CardResponse, UserResponse } from './types/card.response';
import { Card } from './types/card.types';

@Resolver(() => UserResponse)
export class CardResolver {
  constructor(private service: CardService) {}

  // @Query(() => CardResponse, { name: 'cards' })
  // cards(
  //   @Args() args: ConnectionArgs,
  //   @Args('query', { nullable: true }) query?: string,
  // ): Promise<CardResponse> {
  //   return this.service.findAllCards(args);
  // }

  @Mutation(() => Card)
  addCard(@Args() args: CardCreateArgs): Promise<Card> {
    return this.service.addCard(args);
  }

  @Query(() => UserResponse, { name: 'users' })
  users(@Args() args: ConnectionArgs) {
    return this.service.findUser(args);
  }

  @ResolveField(() => UserResponse, { name: 'userCards' })
  userCards(@Parent() user: User, @Args() args: ConnectionArgs) {
    return this.service.findAllCards(args);
  }
}
