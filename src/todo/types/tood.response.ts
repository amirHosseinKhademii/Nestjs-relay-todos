import { Field, ObjectType } from '@nestjs/graphql';

import { Todo } from './todo.types';

@ObjectType()
export class UpdateTodoPayload {
  @Field(() => Todo)
  todo: Todo;

  @Field(() => String)
  clientMutationId: string;
}

@ObjectType()
export class AddTodoPayload {
  @Field(() => Todo)
  todo: Todo;

  @Field(() => String)
  clientMutationId: string;
}
