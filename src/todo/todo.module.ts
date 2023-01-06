import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './types/todo.types';
import { CardModule } from 'src/card';
import { UserModule } from 'src/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    forwardRef(() => CardModule),
    UserModule,
  ],
  providers: [TodoService, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}
