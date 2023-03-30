import { ApolloError, gql, useQuery } from "@apollo/client";
import { client } from '../../index'
import { IReservation } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";
import { format, parseISO } from "date-fns";
import { GET_ALL_RESERVATIONS } from "../../gql/queries";
import { useState } from "react";

export default function Reservations() {
    const [data, setData] = useState<{ reservations: IReservation[] }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApolloError>();

    const cacheData = client.readQuery<{ reservations: IReservation[] }>({
        query: GET_ALL_RESERVATIONS
    })

    if (cacheData) {
        setData(cacheData);
        setLoading(false);
        setError(undefined);
    } else {
        const { data, loading, error } = useQuery<{ reservations: IReservation[] }>(GET_ALL_RESERVATIONS);
        setData(data);
        setLoading(loading);
        setError(error);
    }

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