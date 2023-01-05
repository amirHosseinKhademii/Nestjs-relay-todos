import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './types/todo.types';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), CardModule],
  providers: [TodoService, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}
