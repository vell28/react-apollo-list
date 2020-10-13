import { GraphQLModule } from '@graphql-modules/core';

import { UserModule } from './users';

export const RootModule = new GraphQLModule({
  imports: [UserModule],
});