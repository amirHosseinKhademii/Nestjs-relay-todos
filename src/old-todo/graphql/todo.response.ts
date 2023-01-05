import { Field, ObjectType } from '@nestjs/graphql';
import { Todo } from '../typeorm/todo.entity';

import { TodoGQL } from './todo.type';

@ObjectType('TodoResponse')
export class TodoResponseGQL {
  @Field((type) => [TodoGQL])
  data: Todo[];
  @Field({ nullable: true })
  count: number;
  @Field({ nullable: true })
  currentPage: number;
  @Field({ nullable: true })
  nextPage: number;
  @Field({ nullable: true })
  prevPage: number;
  @Field({ nullable: true })
  lastPage: number;
}
