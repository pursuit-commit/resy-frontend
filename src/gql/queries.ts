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

export const GET_RESTAURANT = gql`
query GetRestaurant($id: UUID!) {
    restaurant(id: $id) {
      __typename
      id
      name
      description
      openingTime
      closingTime
      location
      cuisine
      reservations {
        id
        firstName
        lastName
        numGuests
        time
        phoneNumber
      }
    }
  }
`