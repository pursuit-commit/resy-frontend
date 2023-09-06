import { Alert, AlertColor, Button, Container, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IRestaurant, IUser, Price } from "../../util/types";
import { MuiTelInput } from 'mui-tel-input'
import Joi, { ValidationErrorItem } from "joi";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './NewRestaurant.css';
import { Box } from "@mui/system";
import { format } from "date-fns";
import PriceRadioButtons from "./PriceRadioButtons/PriceRadioButtons";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";

const emptyRestaurantForm: Omit<IRestaurant, 'id'> = {
    name: '',
    description: '',
    phoneNumber: '',
    openingTime: '',
    closingTime: '',
    price: Price.p1,
    cuisine: '',
    location: '',
}

const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($restaurantData: JSON!) {
    newRestaurant(restaurantData: $restaurantData) {
      id
      name
    }
  }
`;

const NewRestaurant = () => {
    const [restaurantData, setRestaurantData] = useState<Omit<IRestaurant, 'id'>>(emptyRestaurantForm);
    const [errors, setErrors] = useState<ValidationErrorItem[]>([]);
    const [snackbarState, setSnackbarState] = useState<{
        open: boolean,
        message: string,
        severity: AlertColor
    }>({
        open: false,
        message: '',
        severity: 'success'
    });
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);

    window.scrollTo(formRef.current!.offsetTop, 0);

    const [createRestaurant, { loading, error }] = useMutation<
        { newRestaurant: { id: string, name: string } }
    >(CREATE_RESTAURANT);

    const handleSnackbarClose = () => {
        setSnackbarState({
            open: false,
            message: '',
            severity: 'success'
        })
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target;

        setRestaurantData({
            ...restaurantData,
            [target.name]: target.value
        });
    }

    const handleChange = (newValue: any, field: string) => {
        setRestaurantData({
            ...restaurantData,
            [field]: newValue
        })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const form = formRef.current;
        if (form) {
            const formData = new FormData(form);
            console.log(form.checkValidity())
            console.log(Array.from(formData.entries()))
        }

        let restaurantDataWithConvertedTimes;
        // convert times to correct format
        try {
            restaurantDataWithConvertedTimes = {
                ...restaurantData,
                openingTime: format(new Date(restaurantData.openingTime), 'hh:mm:ss'),
                closingTime: format(new Date(restaurantData.closingTime), 'hh:mm:ss')
            }
        } catch (err) {
            console.error('Timepicker unable to convert to Date Object -- please check the time in the form');
            restaurantDataWithConvertedTimes = {
                ...restaurantData
            }
        }

        // validate formData 
        const validationResult: Joi.ValidationResult<Omit<IRestaurant, 'id'>> = checkFormValidity(restaurantDataWithConvertedTimes);

        // call createRestaurant
        if (validationResult.error) {
            // show errors on page
            setErrors(validationResult.error.details)
        } else {
            setSubmitDisabled(true);
            setErrors([]);
            createRestaurant({
                variables: {
                    restaurantData: restaurantDataWithConvertedTimes
                },
                onError: (error) => {
                    setSnackbarState({
                        open: true,
                        message: `${error.message}`,
                        severity: 'error',
                    });
                    setSubmitDisabled(false);
                },
                onCompleted: ({ newRestaurant }) => {
                    const restaurantName = newRestaurant.name;
                    setSnackbarState({
                        open: true,
                        message: `Successfully added new restaurant: ${restaurantName}`,
                        severity: 'success'
                    });
                    setRestaurantData(emptyRestaurantForm);
                    setSubmitDisabled(false);
                }
            });
        }
    }

    const checkFormValidity = (restaurantDataWithConvertedTimes: Omit<IRestaurant, 'id'>) => {
        // validate object with Joi

        const expectedData = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            phoneNumber: Joi.string().pattern(/^\+[1-9]{1}[0-9]{3,14}$/).allow(null, ''),
            openingTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/).required(),
            closingTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/).required(),
            location: Joi.string().required(),
            diningRestriction: Joi.string().valid('Delivery Only', 'Takeout Only').allow(null, ''),
            price: Joi.string().valid('$', '$$', '$$$', '$$$$'),
            cuisine: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
            tables: Joi.object({
                twoPersonTables: Joi.number().required(),
                fourPersonTables: Joi.number().required(),
                eightPersonTables: Joi.number().required(),
            }).allow(null)
        });

        return expectedData.validate(restaurantDataWithConvertedTimes);
    }

    return (
        <Container maxWidth="sm" sx={{ my: '16px' }}>
            <Typography
                align="center"
                variant="h4"
                color={'#303f9f'}
                gutterBottom
            >
                New Restaurant
            </Typography>
            <form onSubmit={handleSubmit} ref={formRef}>
                <TextField
                    required
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={restaurantData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                    inputProps={{ "data-testid": 'name-form-input' }}
                />

                <TextField
                    required
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={restaurantData.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                    inputProps={{ "data-testid": 'description-form-input' }}
                />

                <MuiTelInput
                    preferredCountries={['US']}
                    value={restaurantData.phoneNumber || '+1'}
                    onChange={(newValue) => handleChange(newValue, 'phoneNumber')}
                    fullWidth
                    required
                    disableFormatting
                    margin="dense" />

                <Box sx={{ display: 'flex', my: '8px' }}>
                    <Box sx={{ flexGrow: 0.5, pr: '8px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <TimePicker
                                label="Opening Time"
                                value={restaurantData.openingTime}
                                onChange={(newValue) => handleChange(newValue, 'openingTime')}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ flexGrow: 0.5 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker

                                label="Closing Time"
                                value={restaurantData.closingTime}
                                onChange={(newValue) => handleChange(newValue, 'closingTime')}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>

                <TextField
                    required
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={restaurantData.location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense" />

                <TextField
                    name="cuisine"
                    label="Cuisine"
                    variant="outlined"
                    value={restaurantData.cuisine}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense" />

                <PriceRadioButtons onChange={handleInputChange} value={restaurantData.price} />

                {errors && errors.length ? errors.map(error => (
                    <div className="error-message" key={error.message}>{error.message}</div>
                )) : <span></span>}


                <Button type="submit" value="submit" variant="contained" disabled={submitDisabled} fullWidth>Create Restaurant</Button>
            </form>

            <Snackbar
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default NewRestaurant;