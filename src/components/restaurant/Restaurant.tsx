import { gql, useQuery } from "@apollo/client";
import { Box, Button, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { GET_RESTAURANT } from "../../gql/queries";
import { IRestaurant, IUser } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";
import { useState } from "react";
import { NewReservation } from "./new-reservation/NewReservation";
import { ReservationList } from "./reservation-list/ReservationList";
import { RestaurantHeader } from "./restaurant-header/RestaurantHeader";

export default function Restaurant({ currentUser }: { currentUser: IUser | undefined }): JSX.Element {
    const { restaurantId } = useParams();
    const [showReservationForm, setShowReservationForm] = useState(false);
    
    const { data, loading, error } = useQuery<{ restaurant: IRestaurant }>(GET_RESTAURANT, {
        variables: {
            id: restaurantId
        }
    });

    // add a cache
    if (data) {
        console.log(data.restaurant);
    }

    return (
        <QueryResult data={data} loading={loading} error={error}>
            <Container id="container" maxWidth="lg" sx={{ 'paddingBottom': '100px'}}>
                <RestaurantHeader restaurant={data?.restaurant} />
                <div className="sub-heading">Description</div>
                <p>{data?.restaurant.description || 'No Description'}</p>
                <div className="content-for-restaurant-hours-info">Hours: {data?.restaurant.openingTime} - {data?.restaurant.closingTime}</div>
                <ReservationList restaurantId={data?.restaurant.id} />
                <Button variant="contained" color="primary" className="button" onClick={() => setShowReservationForm(!showReservationForm)}>Make a Reservation</Button>
                {data && showReservationForm && <NewReservation restaurantId={data.restaurant.id} currentUser={currentUser}/>}
            </Container>
        </QueryResult>
    )
}

// withGoogleAnalytics(Restaurant);