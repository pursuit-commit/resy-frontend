import { gql, useQuery } from "@apollo/client";
import { IReservation } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";
import { format, parseISO } from "date-fns";
import { GET_ALL_RESERVATIONS } from "../../gql/queries";

export default function Reservations() {
    const { data, loading, error } = useQuery<{ reservations: IReservation[] }>(GET_ALL_RESERVATIONS);
    

    return (
        <QueryResult data={data} loading={loading} error={error}>
            {
                data?.reservations.map(d => (
                    <p key={d.id}>{format(parseISO(d.time), 'MMM do @ h:mm')} reservation for {d.firstName}  at {d.restaurant.name}</p>
                ))
            }
        </QueryResult>
    )
}