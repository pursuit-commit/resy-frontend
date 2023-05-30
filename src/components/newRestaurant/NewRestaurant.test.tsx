import React from 'react';
import { render, screen } from '@testing-library/react';
import NewRestaurant from './NewRestaurant';

test('renders learn react link', () => {
  render(<NewRestaurant currentUser={undefined}/>);
});
