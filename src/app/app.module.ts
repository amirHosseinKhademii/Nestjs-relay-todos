import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/typeorm/user.entity';
import { TodoModule } from 'src/todo/todo.module';
import { Todo } from 'src/todo/typeorm/todo.entity';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/todos',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Todo],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    UserModule,
    TodoModule,
  ],
})
export class AppModule {}
