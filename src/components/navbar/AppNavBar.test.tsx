import { render } from '@testing-library/react';
import AppNavBar from './AppNavBar';

test('renders app navbar', () => {
    render(<AppNavBar currentUser={undefined} setCurrentUser={() => {}} />);
});
