import { ApolloError, gql, useQuery } from "@apollo/client";
import { Box, Button, Container } from "@mui/material";
import { ReactNode, useState } from "react";

import { useParams } from "react-router-dom";
import { GET_RESTAURANT } from "../../gql/queries";
import { IRestaurant } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";
import { ReservationList } from "./reservation-list/ReservationList";
import { RestaurantHeader } from "./restaurant-header/RestaurantHeader";
import './Restaurant.css';
import { NewReservation } from "./new-reservation/NewReservation";

export default function Restaurant(): JSX.Element {
    const { restaurantId } = useParams();
    const [showReservationForm, setShowReservationForm] = useState(false);

    // this.state.showReservationForm = false;
    
    const { data, loading, error } = useQuery<{ restaurant: IRestaurant }>(GET_RESTAURANT, {
        variables: {
            id: restaurantId
        }
    });

    return (
        <QueryResult data={data} loading={loading} error={error}>
            <Container id="container" maxWidth="lg">
                <RestaurantHeader restaurant={data?.restaurant} />
                <div className="sub-heading">Description</div>
                <p>{data?.restaurant.description || 'No Description'}</p>
                <div className="content-for-restaurant-hours-info">Hours: {data?.restaurant.openingTime} - {data?.restaurant.closingTime}</div>
                <ReservationList restaurantId={data?.restaurant.id} />
                <Button variant="contained" color="primary" className="button" onClick={() => setShowReservationForm(!showReservationForm)}>Make a Reservation</Button>
                {data && showReservationForm && <NewReservation restaurantId={data.restaurant.id} />}
            </Container>
        </QueryResult>
    )
}

// withGoogleAnalytics(Restaurant);