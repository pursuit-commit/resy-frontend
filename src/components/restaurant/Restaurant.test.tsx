import { render } from '@testing-library/react';
import Restaurant from './Restaurant';

test('renders learn react link', () => {
    render(<Restaurant />);
});

describe('all new fkae tests', () => {
    it('should render and expect no props?', () => {
        const componenet = render(<Restaurant />);
        expect(componenet).toBeTruthy();
    });
});