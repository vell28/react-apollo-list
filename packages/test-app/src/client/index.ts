import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});