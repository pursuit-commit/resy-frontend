import { AxiosResponse } from "axios";

export type ApiServiceFunction<T> = () => Promise<AxiosResponse<T>>;

export interface IRestaurant {
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
    tables?: ITableConfig;
    reservations?: IReservation[];
}

export interface IRestaurantSearchFilters {
    diningRestriction?: 'Delivery Only' | 'Takeout Only';
    price?: ('$' | '$$' | '$$$' | '$$$$') | ('$' | '$$' | '$$$' | '$$$$')[];
    cuisine?: string | string[];
    location?: string | string[];
}

export interface ITableConfig {
    twoPersonTables: number;
    fourPersonTables: number;
    eightPersonTables: number;
}

export interface IReservation {
    id: string;
    createdAt: string; // timestamp
    firstName: string;
    lastName: string;
    phoneNumber: string; // phone number of the primary guest
    email?: string; // email of the primary guest
    time: string; // time of day
    numGuests: number;
    restaurantId: string;
    restaurant: IRestaurant;
}