import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { GET_RESTAURANT } from "../../gql/queries";
import { IRestaurant } from "../../util/types";
import QueryResult from "../queryResult/QueryResult";


// empty change
export default function Restaurant(): JSX.Element {
    const { restaurantId } = useParams();

    const { data, loading, error } = useQuery<{ restaurant: IRestaurant }>(GET_RESTAURANT, {
        variables: {
            id: restaurantId
        }
    });

    return (
        <QueryResult data={data} loading={loading} error={error}>
            <Box>
                <h2>{data?.restaurant.name}</h2>
                <h3>{data?.restaurant.description}</h3>
                <p>Hours: { data?.restaurant.openingTime } - { data?.restaurant.closingTime }</p>
                <p>Location: { data?.restaurant.location }</p>
                <p>Cuisine: { data?.restaurant.cuisine }</p>
            </Box>
        </QueryResult>
    )
}