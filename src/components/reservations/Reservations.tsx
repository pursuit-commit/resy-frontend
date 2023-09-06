import { useQuery } from "@apollo/client";
import { IReservation, IUser } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";
import { format, parseISO } from "date-fns";
import { GET_ALL_RESERVATIONS } from "../../gql/queries";
import { useMemo, useState } from "react";

export default function Reservations() {
    const { data, loading, error } = useQuery<{ reservations: IReservation[] }>(GET_ALL_RESERVATIONS);

    return (
        <QueryResult data={data} loading={loading} error={error}>
            {
                data?.reservations.map(d => (
                    <p key={d.id}>{format(parseISO(d.time), 'MMM do @ h:mm')} reservation for {d.name}  at {d.restaurant.name}</p>
                ))
            }
        </QueryResult>
    )
}