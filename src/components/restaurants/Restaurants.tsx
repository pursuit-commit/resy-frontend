import { gql, useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
// import { getRestaurants } from '../../services/RestaurantService';
import { Restaurant } from "../../util/types";
import { QueryResult } from "../queryResult/QueryResult";
import RestaurantCard from "./restaurantCard/RestaurantCard";
import './Restaurants.css';

export const GET_ALL_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      description
    }
  }
`;

function Restaurants() {
    const { data, loading, error } = useQuery<{ restaurants: Restaurant[] }>(GET_ALL_RESTAURANTS);

    return (
        <Container className="restaurant-list">
            {/* {
                data?.restaurants?.map(d => {
                    return (<RestaurantCard key={d.id} restaurant={d} />)
                })
            } */}
            <QueryResult data={data} error={error} loading={loading}>
                <React.Fragment>
                    {
                        data?.restaurants?.map(d => {
                            return (<RestaurantCard key={d.id} restaurant={d} />)
                        })
                    }
                </React.Fragment>
            </QueryResult>

            <Outlet />

        </Container>

    );
}

export default Restaurants;
