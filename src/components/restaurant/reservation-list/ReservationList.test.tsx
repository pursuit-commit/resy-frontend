import { render } from '@testing-library/react';
import { ReservationList } from './ReservationList';

test('renders ReservaitonList component', () => {
    render(<ReservationList restaurantId='' />);
});
