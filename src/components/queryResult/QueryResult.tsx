import { ApolloError } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import es from "date-fns/esm/locale/es/index.js";

interface QueryResultProps<T> {
    loading: boolean;
    error: ApolloError | undefined;
    data: T | undefined;
    children: JSX.Element | undefined;
}
export const QueryResult = <T extends object>({ loading, error, data, children }: QueryResultProps<T>) => {
    if (error) {
        return <p>ERROR: {error.message}</p>;
    }
    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (data && children) {
        return children;
    } else {
        return <p>Nothing to show...</p>;
    }
};