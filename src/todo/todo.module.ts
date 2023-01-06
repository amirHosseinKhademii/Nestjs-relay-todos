import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './types/todo.types';
import { CardModule } from 'src/card';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => CardModule)],
  providers: [TodoService, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}
