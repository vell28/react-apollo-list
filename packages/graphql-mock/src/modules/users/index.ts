import { GraphQLModule } from '@graphql-modules/core';

import { UsersProvider } from './users.provider'

// @ts-ignore
import * as typeDefs from './schema.graphql';
import resolvers from './resolvers';

export const UserModule = new GraphQLModule({
  typeDefs,
  resolvers,
  providers: [UsersProvider],
});
