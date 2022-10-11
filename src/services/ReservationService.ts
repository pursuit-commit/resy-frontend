import axios, { AxiosResponse } from 'axios';
import { BASE_HEROKU_URL } from '../util/constants';
import { Reservation } from '../util/types';

const RESERVATION_BASE_URL = `${BASE_HEROKU_URL}/reservations`;

export async function getAllReservations(): Promise<AxiosResponse<{ reservations: Reservation[] }, any>> {
    return await axios.get(RESERVATION_BASE_URL);
}