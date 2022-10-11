import { useEffect, useState } from "react";
import { getAllReservations } from "../../services/ReservationService";
import { Reservation } from "../../util/types";

export default function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        getAllReservations().then(res => {
            const reservations = res.data.reservations;
            setReservations(reservations);
        }).catch(err => {
            console.error(err);
        })
    }, [])

    return (
        <div>
            {
                reservations.map(d => (
                    <span key={d.id}>{d.firstName} {d.lastName}: {d.numGuests} guests</span>
                ))
            }
        </div>
    )
}