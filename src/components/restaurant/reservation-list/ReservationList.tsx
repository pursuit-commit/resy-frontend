import { Box, Container } from "@mui/material";
import { format, parseISO } from "date-fns";
import React, { memo } from "react";
import { IReservation } from "../../../util/types";
import { UserAuthContext, useUserContext } from "../../../auth/AuthContext";
import { useContextSelector } from "use-context-selector";

export const ReservationList = memo(({ reservations }: { reservations: IReservation[] | undefined }) => {
    // const [user, setUser] = useContext(UserAuthContext);

    // const username = useContextSelector(UserAuthContext, ([user, _]) => user?.name);

    // const { user } = useUserContext();

    // const filteredReservations = reservations?.filter(r => r.createdBy === user?.id);

    return (
        <Container maxWidth="lg" disableGutters>
            <div className="reservation-list-header"></div>
            <h3>Reservations</h3>
            <React.Fragment>{
                reservations?.map(d => (
                    <Box key={d.id} sx={{ borderRadius: 1, border: 1, margin: 1, padding:1 }}>
                        <p style={{ marginTop: '0' }}>{d.name}</p>
                        <div style={{ display: 'flex', alignItems:"center" }}>
                            <span style={{ fontSize: '1em', opacity: '0.9' }}>{d.numGuests} Guests</span><div className="separator"></div><span>{format(parseISO(d.time), 'MMM dd @ HH:mm')}</span>
                        </div>
                    </Box>
                ))
            }</React.Fragment>
        </Container>
    );
});

// export default memo(ReservationList);