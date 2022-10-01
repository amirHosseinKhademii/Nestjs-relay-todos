import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
