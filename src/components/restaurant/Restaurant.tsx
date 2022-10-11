import { gql, useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantById } from "../../services/RestaurantService";
import { Restaurant as RestaurantType } from "../../util/types";
import { QueryResult } from "../queryResult/QueryResult";

const GET_RESTAURANT = gql`
query GetRestaurant($id: UUID!) {
    restaurant(id: $id) {
      __typename
      id
      name
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

export default function Restaurant(): JSX.Element {
    const { restaurantId } = useParams();

    const { data, loading, error } = useQuery<
        { restaurant: RestaurantType }
    >(GET_RESTAURANT, {
        variables: {
            id: restaurantId
        }
    });

    return (
        <QueryResult data={data} loading={loading} error={error}>
            <span>{data?.restaurant ? data?.restaurant.name : 'Loading...'}</span>
        </QueryResult>
    )
}