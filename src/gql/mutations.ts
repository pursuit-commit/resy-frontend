import { gql } from "@apollo/client";

export const NEW_RESERVATION = gql`
  mutation NewReservation($reservation: JSON!) {
    newReservation(reservationData: $reservation) {
      id
      name
      restaurant {
        id
        name
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`;