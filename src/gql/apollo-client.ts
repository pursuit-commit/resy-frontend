import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { authLink } from '../auth/AuthLink';
import { errorLink } from '../util/errorHandler';

export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  ]),
  cache: new InMemoryCache(),
});