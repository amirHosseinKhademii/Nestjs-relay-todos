import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NodeResolver } from './node.resolver';
import { User, UserModule } from 'src/user';
import { Card, CardModule } from 'src/card';
import { Todo, TodoModule } from 'src/todo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/todos',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Card, Todo],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    UserModule,
    TodoModule,
    CardModule,
  ],
  providers: [NodeResolver],
})
export class AppModule {}
