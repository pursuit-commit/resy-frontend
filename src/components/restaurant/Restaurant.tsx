import { gql, useQuery } from "@apollo/client";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { GET_RESTAURANT } from "../../gql/queries";
import { IRestaurant } from "../../util/types"
import QueryResult from "../queryResult/QueryResult"
import { ReservationList } from "./reservation-list/ReservationList";
import { RestaurantHeader } from "./restaurant-header/RestaurantHeader";
import './Restaurant.css'

export default function Restaurant(): JSX.Element {
    const { restaurantId } = useParams();

    const { data, loading, error } = useQuery<{ restaurant: IRestaurant }>(GET_RESTAURANT, {
        variables: {
            id: restaurantId
        }
    });

    return (
        <QueryResult data={data} loading={loading} error={error}>
            <Container maxWidth="lg">
            <RestaurantHeader restaurant={data?.restaurant} />
                <div className="sub-heading">Description</div>
                <p>{data?.restaurant.description}</p>
                <div className="content-for-restaurant-hours-info">Hours: { data?.restaurant.openingTime } - { data?.restaurant.closingTime }</div>
                <ReservationList restaurantId={data?.restaurant.id} />
            </Container>
        </QueryResult>
    )
}