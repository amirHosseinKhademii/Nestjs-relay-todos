import { Field, ObjectType } from '@nestjs/graphql';
import { relayTypes } from 'src/relay/relay.types';
import { Card } from './card.types';

@ObjectType()
export class CardResponse extends relayTypes<Card>(Card) {}

@ObjectType()
export class UserResponse {
  @Field()
  name: string;

  @Field(() => relayTypes<Card>(Card))
  userCards: any[];
}
