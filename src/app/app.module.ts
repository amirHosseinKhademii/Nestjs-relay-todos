import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NodeResolver } from './node.resolver';
import { User, UserModule } from 'src/user';
import { Card, CardModule } from 'src/card';
import { Todo, TodoModule } from 'src/todo';
import { mainContext, subscriptionsConfig, typeormConfig } from 'src/utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...typeormConfig,
      entities: [User, Card, Todo],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: subscriptionsConfig,
      context: mainContext,
    }),
    UserModule,
    TodoModule,
    CardModule,
  ],
  providers: [NodeResolver],
})
export class AppModule {}
