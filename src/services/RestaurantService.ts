import { stringify } from 'qs';
import axios, { AxiosResponse } from 'axios';
import { Restaurant, ApiServiceFunction } from '../util/types';
import { BASE_HEROKU_URL } from '../util/constants';
import { gql, useQuery } from '@apollo/client';

export interface RestaurantSearchFilters {
    diningRestriction?: 'Delivery Only' | 'Takeout Only';
    price?: ('$' | '$$' | '$$$' | '$$$$') | ('$' | '$$' | '$$$' | '$$$$')[];
    cuisine?: string | string[];
    location?: string | string[];
}

const RESTAURANT_BASE_URL = `${BASE_HEROKU_URL}/restaurants`;

export const getRestaurants: ApiServiceFunction<{ restaurants: Restaurant[] }> = async (search?: string, filters?: RestaurantSearchFilters) => {
    return await axios.get<{ restaurants: Restaurant[] }>(`${RESTAURANT_BASE_URL}?${stringify({ filters, search })}`);
}

export async function getRestaurantById(id: string): Promise<AxiosResponse<Restaurant, any>> {
    return await axios.get(`${RESTAURANT_BASE_URL}/${id}`);
}

export async function createRestaurant(input: Omit<Restaurant, 'id'>) {
    return await axios.post<Restaurant>(`${RESTAURANT_BASE_URL}`, input)
}