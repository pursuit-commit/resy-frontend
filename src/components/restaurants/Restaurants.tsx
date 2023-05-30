import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { GET_ALL_RESTAURANTS } from "../../gql/queries";
import { IRestaurant, IUser } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";
import RestaurantCard from "./restaurantCard/RestaurantCard";
import './Restaurants.css';

function Restaurants({ currentUser }: { currentUser: IUser | undefined}) {
    const { data, loading, error } = useQuery<{ restaurants: IRestaurant[] }>(GET_ALL_RESTAURANTS);
        
    return (
        <QueryResult data={data} error={error} loading={loading}>
            <Container className="restaurant-list">
                <React.Fragment>
                    {
                        data?.restaurants?.map(d => {
                            return (<RestaurantCard key={d.id} restaurant={d} />)
                        })
                    }
                </React.Fragment>
            </Container>
            <Outlet />
        </QueryResult>
    );
}

export default Restaurants;
