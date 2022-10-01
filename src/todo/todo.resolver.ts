import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthGraphGuard } from 'src/user/guards/auth-graph.guard';
import { TodoType } from './todo.type';

@Resolver((of) => TodoType)
@UseGuards(new AuthGraphGuard())
export class TodoResolver {
  @Query((returns) => [TodoType])
  todos() {
    return [];
  }
}
