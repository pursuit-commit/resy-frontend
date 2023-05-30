import { useQuery } from "@apollo/client";
import { Box, Container } from "@mui/material";
import { format, parseISO } from "date-fns";
import React from "react";
import { GET_ALL_RESERVATIONS } from "../../../gql/queries";
import { IReservation, IUser } from "../../../util/types";

export const ReservationList = ({ restaurantId, currentUser }: { restaurantId: string | undefined, currentUser: IUser | undefined}) => {
    // if no reservations or reservations == undefined, show a no Reservations message
    const { data, loading, error } = useQuery<{ reservations: IReservation[] }>(GET_ALL_RESERVATIONS);
    const reservations = data?.reservations.filter(d => d.restaurant.id === restaurantId);
    const reservationsByUser = reservations?.filter(d => d.createdBy === currentUser?.id);

    return (
        <Container maxWidth="lg" disableGutters>
            <div className="reservation-list-header"></div>
            <h3>Reservations</h3>
            <React.Fragment>{
                reservationsByUser?.map(d => (
                    <Box sx={{ borderRadius: 1, border: 1, margin: 1, padding:1 }}>
                        <p style={{ marginTop: '0' }}>{d.name}</p>
                        <div style={{ display: 'flex', alignItems:"center" }}>
                            <span style={{ fontSize: '1em', opacity: '0.9' }}>{d.numGuests} Guests</span><div className="separator"></div><span>{format(parseISO(d.time), 'MMM dd @ HH:mm')}</span>
                        </div>
                    </Box>
                ))
            }</React.Fragment>
        </Container>
    );
}