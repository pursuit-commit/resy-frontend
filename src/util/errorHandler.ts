import { GraphQLError } from "graphql";

import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((error) =>
      handleError(error)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const handleError = (error: GraphQLError) => {
  if (error.message === 'Unauthorized') {
    localStorage.removeItem('token');
  }
  console.error(error);
};