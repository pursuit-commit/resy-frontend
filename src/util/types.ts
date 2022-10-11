import { AxiosResponse } from "axios";

export type ApiServiceFunction<T> = () => Promise<AxiosResponse<T>>;

export interface Restaurant {
    id: string;
    name: string;
    description: string;
    phoneNumber?: string;
    openingTime: string; // time of day
    closingTime: string; // time of day
    price: '$' | '$$' | '$$$' | '$$$$';
    cuisine: string;
    location: string;
    diningRestriction?: 'Takeout Only' | 'Delivery Only';
    tables?: TableConfig;
    reservations?: Reservation[];
}

export interface RestaurantSearchFilters {
    diningRestriction?: 'Delivery Only' | 'Takeout Only';
    price?: ('$' | '$$' | '$$$' | '$$$$') | ('$' | '$$' | '$$$' | '$$$$')[];
    cuisine?: string | string[];
    location?: string | string[];
}

export interface TableConfig {
    twoPersonTables: number;
    fourPersonTables: number;
    eightPersonTables: number;
}

export interface Reservation {
    id: string;
    createdAt: string; // timestamp
    firstName: string;
    lastName: string;
    phoneNumber: string; // phone number of the primary guest
    email?: string; // email of the primary guest
    time: string; // time of day
    numGuests: number;
    restaurantId: string;
}