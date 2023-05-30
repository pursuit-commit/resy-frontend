import { ApolloLink } from '@apollo/client';

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => ({ headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`, // however you get your token
    ...headers
  }}));
  return forward(operation);
});