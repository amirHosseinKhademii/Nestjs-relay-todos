import { Field, ObjectType } from '@nestjs/graphql';
import { Card } from './card.types';

@ObjectType()
export class AddCardPayload {
  @Field(() => Card)
  card: Card;

  @Field(() => String)
  clientMutationId: string;
}
