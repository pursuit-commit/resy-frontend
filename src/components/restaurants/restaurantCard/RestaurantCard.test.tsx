import React from 'react';
import { render, screen } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';
import { IRestaurant } from '../../../util/types';

const defaultRestaurant: IRestaurant = {
    "id": "0409c661-25f5-466d-b457-de7a315a1fc3",
    "name": "Roberta's Pizza",
    "description": "French restaurant with beautfiul desserts in a cozy setting. This restaurant's french cuisine brings Paris right to your city.",
    "phoneNumber": "6436082714",
    "openingTime": "10:00:00",
    "closingTime": "22:00:00",
    "location": "New York City",
    "cuisine": "Pizza",
    "price": '$$',
    "tables": {
        "twoPersonTables": 5,
        "fourPersonTables": 5,
        "eightPersonTables": 5
    },
};

test('renders learn react link', () => {
    render(<RestaurantCard restaurant={defaultRestaurant} />);

});
