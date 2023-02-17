import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor, Edge } from 'graphql-relay';
import { Message } from './message.types';

@ObjectType(`MessageResponseEdge`, { isAbstract: true })
export class MessageResponseEdge implements Edge<Message> {
  @Field({ nullable: true })
  public cursor: ConnectionCursor;

  @Field(() => Message, { nullable: true })
  public node!: Message;
}

@ObjectType()
export class AddMessagePayload {
  @Field(() => MessageResponseEdge)
  addMessageEdge: MessageResponseEdge;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType()
export class AddMessageSubPayload {
  @Field(() => MessageResponseEdge)
  addMessageEdge: MessageResponseEdge;

  @Field(() => String)
  clientMutationId: string;
}
