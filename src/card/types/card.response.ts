import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Card } from './card.types';
import { Edge, ConnectionCursor } from 'graphql-relay';
import { NodeInterface } from 'src/relay';
@ObjectType()
export class UpdateCardPayload {
  @Field(() => Card)
  card: Card;

  @Field(() => String)
  clientMutationId: string;
}
@ObjectType(`CardResponseEdge`, { isAbstract: true })
export class CardResponseEdge implements Edge<Card> {
  @Field({ nullable: true })
  public cursor: ConnectionCursor;

  @Field(() => Card, { nullable: true })
  public node!: Card;
}

@ObjectType()
export class AddCardPayload {
  @Field(() => CardResponseEdge)
  addCardEdge: CardResponseEdge;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType()
export class DeleteCardPayload {
  @Field(() => ID)
  id: NodeInterface;

  @Field(() => String)
  clientMutationId: string;
}
