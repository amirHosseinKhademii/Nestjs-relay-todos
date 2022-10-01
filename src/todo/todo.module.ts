import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [UserModule],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
