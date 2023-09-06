import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Restaurants from './components/restaurants/Restaurants';
import Reservations from './components/reservations/Reservations';
import Restaurant from './components/restaurant/Restaurant';
import NewRestaurant from './components/newRestaurant/NewRestaurant';
import { ApolloProvider } from '@apollo/client';
import { client } from './gql/apollo-client';
import { UserAuthProvider, getLoggedInUser } from './auth/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserAuthProvider user={getLoggedInUser()}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />}>
              <Route path="new-restaurant" element={<NewRestaurant />} />
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="restaurants/:restaurantId" element={<Restaurant />} />
              <Route path="reservations" element={<Reservations />} />
              <Route
                path="*"
                element={<Navigate to="/restaurants" replace />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserAuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
