import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CardModule } from 'src/card/card.module';
import { Card } from 'src/card/types/card.types';
import { TodoModule } from 'src/todo/todo.module';
import { Todo } from 'src/todo/types/todo.types';
import { NodeResolver } from 'src/relay/node.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/todos',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Card, Todo],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TodoModule,
    CardModule,
  ],
  providers: [NodeResolver],
})
export class AppModule {}
