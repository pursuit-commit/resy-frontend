import Restaurant from './Restaurant';
import { MockedProvider } from '@apollo/client/testing';
import { shallow, configure, mount, ReactWrapper } from 'enzyme';
import { ReactNode } from 'react';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import React from 'react';
import { GET_RESTAURANT } from '../../gql/queries';
import { Button, CircularProgress } from '@mui/material';
import { InMemoryCache } from '@apollo/client';
import { act } from 'react-dom/test-utils';
import { IRestaurant } from '../../util/types';
const waitForExpect = require("wait-for-expect")
import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';

configure({ adapter: new Adapter() });

const mockWithoutReservations = (id: string) => ({
    request: {
        query: GET_RESTAURANT,
        variables: {
            id,
        }
    },
    result: {
        data: {
            restaurant: {
                id,
                name: "Fake Restaurant",
                description: "Fake Description",
                openingTime: "10:00",
                closingTime: "22:00",
                location: 'some location',
                cuisine: 'Some',
                price: '$',
                reservations: [],
            } as IRestaurant
        }
    }
});


// Testing a component that uses a custom hook is a bit tricky but heres an example
describe('Restaurant component', () => {
    let wrapper: () => ReactWrapper;


    beforeEach(() => {
        const reactRouter = { useParams };
        const fakeId = uuidv4();
        const mocks = [mockWithoutReservations(fakeId)];
        jest.spyOn(reactRouter, 'useParams').mockReturnValue({ restaurantId: fakeId })


        // creating a wrapper so that we dont get mad at useQuery when testing
        wrapper = () => {
            return mount(
                <MockedProvider mocks={mocks} addTypename={true} cache={new InMemoryCache()}>
                    <Restaurant />
                </MockedProvider>
            )
        };

    });

    // using the wrapper instead of shallow/mount
    test('renders Restaurant component', () => {
        wrapper();
    });

    // testing that the result of a button click occurs (in this case, the button click makes the NewReservation component appear)
    test('button click toggles showReservationForm state', async () => {
        const component = wrapper();

        await waitForExpect(() => {
            act(() => {
                component.update();
                const button = component.find('Button');
                button.simulate('click');
                expect(component.find('NewReservation')).toBe(true);
            }) 
        });

    });


    // Picture a test that you have like this
    // test('function call toggles abuseType state', () => {
    //     const component = wrapper(<Restaurant />);

    //     (component as any).callSomeFunction();
    //     expect(component.state<any>('showReservationForm')).toBe('some value');

    // (component as any).callSomeFunction();
    // expect(component.state.abuseType).toBe('some other value');

    // (component as any).callSomeFunction();
    // expect(component.state.abuseType).toBe('some value');
    // });
});

describe('all new fkae tests', () => {
    it('should render and expect no props?', () => {
        const componenet = render(<Restaurant />);
        expect(componenet).toBeTruthy();
    });
});