import { gql } from "@apollo/client";

export const GET_ALL_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      description
    }
  }
`;

export const GET_ALL_RESERVATIONS = gql`
query GetReservations {
    reservations {
      id
      firstName
      time
      restaurant {
        name
      }
    }
  }
`