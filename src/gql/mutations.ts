import { gql } from "@apollo/client";

export const MAKE_RESERVATION = gql`
  mutation MakeReservation($reservation: JSON!) {
    makeReservation(reservationData: $reservation) {
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