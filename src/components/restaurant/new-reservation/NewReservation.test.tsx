import React from 'react';
import { fireEvent, getByLabelText, getByRole, render, RenderResult, screen } from '@testing-library/react';
import { NewReservation } from './NewReservation';
import { v4 as uuidv4 } from 'uuid';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DocumentNode, GraphQLError } from 'graphql';
import { IReservation } from '../../../util/types';
import { InMemoryCache } from '@apollo/client';
import { NEW_RESERVATION } from '../../../gql/mutations';

const defaultMocks: {
  request: {
    query: DocumentNode;
    variables: {
      reservation: any;
    };
  };
  result: {
    data: {
      newReservation: { id: string, name: string, restaurant: { id: string, name: string } };
    };
  };
}[] = [{
  request: {
    query: NEW_RESERVATION,
    variables: {
      reservation: {
        name: "Restaurant Goer",
        time: "2021-10-10T20:00:00.000Z",
        numGuests: 2,
        email: "",
        phoneNumber: "1234567890",
      },
    }
  },
  result: {
    data: {
      newReservation: {
        id: "1",
        name: "Restaurant Goer",
        restaurant: {
          id: "1",
          name: "Restaurant Name"
        }
      }
    }
  }
}];

describe('NewReservation Component', () => {
  let wrapper: (mocks: ReadonlyArray<MockedResponse>) => RenderResult;

  // setup for each test
  beforeAll(() => {
    const restaurantId = uuidv4();

    wrapper = (mocks) => {
      return render(
        <MockedProvider mocks={mocks} addTypename={true} cache={new InMemoryCache()}>
          <NewReservation restaurantId={restaurantId} />
        </MockedProvider>
      )
    };
  });

  it('renders component initial', () => {
    wrapper(defaultMocks);
  });

  it('successfully adds test input', () => {
    const { getByTestId, getByRole } = wrapper(defaultMocks);

    const nameForm = getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    const phoneForm = getByTestId('res-phone-form') as HTMLInputElement;
    const timeForm = getByRole('textbox', { name: /time/i }) as HTMLInputElement;

    fireEvent.change(nameForm, { target: { value: "Restaurant Goer" } });
    fireEvent.change(phoneForm, { target: { value: "1234567890" } });
    fireEvent.change(timeForm, { target: { value: "2021-05-05T12:00" } });

    expect(nameForm.value).toBe("Restaurant Goer");
    expect(phoneForm.value).toBe("+1234567890");
    expect(timeForm.value).toBe("2021-05-05T12:00");

  });

  // this is meant to be a sample of a conditional field and how to test it
  it('should have disabled email field on render', () => {
    // How do we test if a field is disabled?
  });

  it('should enable email field when time is filled in', () => {
    // How do we test if a field is now enabled? 
  });

  it('should show error message when form is invalid', () => {
  });

  it('should call mutation when form is valid', () => {

  });

  it('should show success message when mutation is successful', () => {
    // result is lingering
  });

  it('should show error message when mutation is unsuccessful', () => {
    // ARRANGE
    const failureMocks = [{
      request: {
        query: NEW_RESERVATION,
        variables: {
          reservation: {
            name: "Restaurant Goer",
            time: "2021-10-10T20:00:00.000Z",
            numGuests: 2,
            email: "",
            phoneNumber: "1234567890",
          },
        }
      },
      result: {
        errors: [new GraphQLError('Failure')]
      }  
    }];
    
    const { getByTestId } = wrapper(failureMocks);

    expect(() => getByTestId('error-container')).toThrowError();

    const nameForm = getByTestId('res-name-form') as HTMLInputElement;
    const phoneForm = getByTestId('res-phone-form') as HTMLInputElement;
    const timeForm = getByTestId('res-time-form') as HTMLInputElement;

    // ACT
    fireEvent.change(nameForm, { target: { value: "Restaurant Goer" } });
    fireEvent.change(phoneForm, { target: { value: "1234567890" } });
    fireEvent.change(timeForm, { target: { value: "2021-05-05T12:00" } });

    const submitButton = getByTestId('res-submit-button') as HTMLButtonElement;
    fireEvent.click(submitButton);

    // ASSERT
    expect(getByTestId('error-container')).toBeInTheDocument();
  });
});

