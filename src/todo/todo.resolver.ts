import { Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './todo.type';

@Resolver((of) => TodoType)
export class TodoResolver {
  @Query((returns) => [TodoType])
  todos() {
    return [];
  }
}
