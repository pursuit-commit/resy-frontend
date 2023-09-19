import { AxiosResponse } from "axios";

export type ApiServiceFunction<T> = () => Promise<AxiosResponse<T>>;

export enum Price {
    "p1" = "$",
    "p2" = "$$",
    "p3" = "$$$",
    "p4" = "$$$$"
}

export interface IUser {
    id: string;
    name: string;
    username: string;
 };

export interface IRestaurant {
    id: string;
    name: string;
    description: string;
    phoneNumber?: string;
    openingTime: string; // time of day
    closingTime: string; // time of day
    price:  keyof typeof Price;
    cuisine: string;
    location: string;
    diningRestriction?: 'Takeout Only' | 'Delivery Only';
    tables?: ITableConfig;
    reservations?: IReservation[];
}

export interface IRestaurantSearchFilters {
    diningRestriction?: 'Delivery Only' | 'Takeout Only';
    price?: Price | Price[];
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
    createdBy?: string; // user id
    name: string;
    phoneNumber: string; // phone number of the primary guest
    email?: string; // email of the primary guest
    time: string; // time of day
    numGuests: number;
    restaurantId: string;
    restaurant: IRestaurant;
}

export type ReservationDTO = Omit<IReservation, 'id' | 'createdAt' | 'restaurant'>;
