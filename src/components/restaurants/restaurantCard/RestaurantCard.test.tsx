import { render } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';
import { mockRestaurant } from '../../../util/mocks';

test('renders learn react link', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
});
