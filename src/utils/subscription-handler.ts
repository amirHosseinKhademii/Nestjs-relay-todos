import { Context } from 'graphql-ws';

export const graphqlWsContext = (contextSocket: Context<any>) => {
  const context = contextSocket?.connectionParams;
  return context;
};

export const subscriptionTransportContext = (connectionParams: {
  [key: string]: any;
}) => {
  const context = {
    websocket: true,
    headers: { authorization: connectionParams['Authorization'] },
  };
  return context;
};

export const subscriptionsConfig = {
  'graphql-ws': {
    path: '/graphql',
    onConnect: graphqlWsContext,
  },
  'subscriptions-transport-ws': {
    path: '/graphql',
    onConnect: subscriptionTransportContext,
  },
};
