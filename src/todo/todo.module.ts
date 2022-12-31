import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Todo } from './typeorm/todo.entity';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => UserModule)],
  providers: [TodoService, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}
