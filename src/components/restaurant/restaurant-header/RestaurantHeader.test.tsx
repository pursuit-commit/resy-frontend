import { render } from '@testing-library/react';
import { RestaurantHeader } from './RestaurantHeader';
import { mockRestaurant } from '../../../util/mocks';

test('renders RestaurantHeader component', () => {
    render(<RestaurantHeader restaurant={mockRestaurant}/>);
});
