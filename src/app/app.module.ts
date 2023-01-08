import { Module } from '@nestjs/common';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NodeResolver } from './node.resolver';
import { User, UserModule } from 'src/user';
import { Card, CardModule } from 'src/card';
import { Todo, TodoModule } from 'src/todo';
import { Context } from 'graphql-ws';

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
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
          onConnect: (contextSocket: Context<any>) => {
            const context = contextSocket?.connectionParams;

            return context;
          },
        },
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: (connectionParams: { [key: string]: any }) => {
            const context = {
              websocket: true,
              headers: { authorization: connectionParams['Authorization'] },
            };

            return context;
          },
        },
      },
      context: (context) => {
        const { req, res, connection } = context;
        return connection
          ? {
              req: {
                ...req,
                ...connection.context,
              },
              res,
            }
          : context;
      },
    }),
    UserModule,
    TodoModule,
    CardModule,
  ],
  providers: [NodeResolver],
})
export class AppModule {}
