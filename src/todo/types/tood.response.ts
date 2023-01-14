import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Todo } from './todo.types';

import { Edge, ConnectionCursor } from 'graphql-relay';
import { NodeInterface } from 'src/relay';

@ObjectType()
export class UpdateTodoPayload {
  @Field(() => Todo)
  todo: Todo;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType(`TodoResponseEdge`, { isAbstract: true })
export class TodoResponseEdge implements Edge<Todo> {
  @Field({ nullable: true })
  public cursor: ConnectionCursor;

  @Field(() => Todo, { nullable: true })
  public node!: Todo;
}

@ObjectType()
export class AddTodoPayload {
  @Field(() => TodoResponseEdge)
  addTodoEdge: TodoResponseEdge;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType()
export class DeleteTodoPayload {
  @Field(() => ID)
  id: NodeInterface;

  @Field(() => String)
  clientMutationId: string;
}
