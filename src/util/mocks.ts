import { IRestaurant, IUser } from "./types";

export const mockUser: IUser = {
  id: '1',
  name: 'John Doe',
  username: 'jdoe',
};

export const getMockRestaurant = (restaurant: Partial<IRestaurant>) => ({
  id: restaurant.id || mockRestaurant.id,
  name: restaurant.name || mockRestaurant.name,
  description: restaurant.description || mockRestaurant.description,
  phoneNumber: restaurant.phoneNumber || mockRestaurant.phoneNumber,
  openingTime: restaurant.openingTime || mockRestaurant.openingTime,
  closingTime: restaurant.closingTime || mockRestaurant.closingTime,
  price: restaurant.price || mockRestaurant.price,
  cuisine: restaurant.cuisine || mockRestaurant.cuisine,
  location: restaurant.location || mockRestaurant.location,
  diningRestriction: restaurant.diningRestriction || mockRestaurant.diningRestriction,
  tables: restaurant.tables || mockRestaurant.tables,
  reservations: restaurant.reservations || mockRestaurant.reservations,
});

export const mockRestaurant: IRestaurant = {
  id: '1',
  name: 'Test Restaurant',
  description: 'This is a test restaurant',
  phoneNumber: '1234567890',
  openingTime: '10:00',
  closingTime: '22:00',
  price: 'p1',
  cuisine: 'American',
  location: 'Test Location',
  diningRestriction: 'Takeout Only',
  tables: {
    twoPersonTables: 5,
    fourPersonTables: 5,
    eightPersonTables: 5,
  },
  reservations: [],
};