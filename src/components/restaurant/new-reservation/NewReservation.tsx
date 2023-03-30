import { useMutation } from "@apollo/client";
import { Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { Box, Container } from "@mui/system";
import { DateTimePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Joi, { ValidationErrorItem } from "joi";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";
import { MAKE_RESERVATION } from "../../../gql/queries";
import { ReservationDTO } from "../../../util/types";

const emptyReservationForm: ReservationDTO = {
    name: '',
    phoneNumber: '',
    time: '',
    email: '',
    numGuests: 0,
    restaurantId: '',
}

interface NewReservationProps {
    restaurantId: string;
}

// I want a form that 
export function NewReservation({ restaurantId }: NewReservationProps) {
    const [reservationData, setReservationData] = useState<ReservationDTO>(emptyReservationForm);
    const [errors, setErrors] = useState<ValidationErrorItem[]>([]);

    const [createReservation, { loading, error }] = useMutation<
        { newReservation: { id: string, name: string, restaurant: { id: string, name: string } } }
    >(MAKE_RESERVATION);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target;

        setReservationData({
            ...reservationData,
            [target.name]: target.value
        });
    }

    const handleChange = (newValue: any, field: string) => {
        setReservationData({
            ...reservationData,
            [field]: newValue
        })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        setReservationData({
            ...reservationData,
            restaurantId
        });

        const validationResult: Joi.ValidationResult<ReservationDTO> = checkFormValidity(reservationData);

        if (validationResult.error) {
            // show errors on page
            setErrors(validationResult.error.details)
        } else {
            setErrors([]);
            createReservation({
                variables: {
                    reservationData: reservationData
                },
                onError: (error) => {
                    console.error(error)
                },
                onCompleted: ({ newReservation }) => {
                    const reservationName = newReservation.name;
                    console.log(`reservation created for ${reservationName} successfully`)
                    setReservationData(emptyReservationForm);
                }
            });
        }
    }

    const checkFormValidity = (resData: ReservationDTO) => {
        // validate object with Joi

        const expectedData = Joi.object({
            name: Joi.string().required(),
            phoneNumber: Joi.string().pattern(/^\+[1-9]{1}[0-9]{3,14}$/).required(),
            time: Joi.date().iso().required(),
            email: Joi.string().email().allow(null, ''),
            numGuests: Joi.number().integer().min(1).max(10).required(),
            restaurantId: Joi.string().guid({ version: 'uuidv4' }).required(),
        });

        return expectedData.validate(resData);
    }

    


    return (
        <Container maxWidth="sm" sx={{ my: '16px' }}>
            <Typography
                align="center"
                variant="subtitle2"
                color={'#303f9f'}
                gutterBottom
            >
                New Reservation
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={reservationData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense" />

                <MuiTelInput
                    preferredCountries={['US']}
                    value={reservationData.phoneNumber || '+1'}
                    onChange={(newValue) => handleChange(newValue, 'phoneNumber')}
                    fullWidth
                    required
                    disableFormatting
                    margin="dense" />

                <Box sx={{ flexGrow: 0.5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date&Time picker"
                            value={reservationData.time}
                            onChange={(newValue) => handleChange(newValue, 'time')}
                            renderInput={(params) => <TextField {...params} fullWidth/>}
                        />
                    </LocalizationProvider>
                </Box>

                {errors && errors.length ? errors.map(error => (
                    <div className="error-message" key={error.message}>{error.message}</div>
                )) : <span></span>}


                <Button type="submit" value="submit" variant="contained" disabled={loading} fullWidth>Create Reservation</Button>
            </form>

            {/* <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar> */}
        </Container>
    )
}