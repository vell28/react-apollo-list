import 'reflect-metadata';
import 'graphql-import-node';
import { ApolloServer } from 'apollo-server';
import { addMocksToSchema } from '@graphql-tools/mock';

import { RootModule } from './modules';

const server = new ApolloServer({
  schema: addMocksToSchema({ schema: RootModule.schema, preserveResolvers: true }),
  context: session => session,
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀  Websocket ready at ${subscriptionsUrl}`);
});