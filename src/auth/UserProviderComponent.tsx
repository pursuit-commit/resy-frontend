import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import NewRestaurant from "../components/newRestaurant/NewRestaurant";
import Reservations from "../components/reservations/Reservations";
import Restaurants from "../components/restaurants/Restaurants";
import { getDefaultUser } from "./defaultUser";
import { useState } from "react";
import Restaurant from "../components/restaurant/Restaurant";
import { IUser } from "../util/types";

export function UserProviderComponent() {
  const [user, setUser] = useState<IUser | undefined>(getDefaultUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App currentUser={user} setCurrentUser={setUser}/>}>
          <Route path="new-restaurant" element={<NewRestaurant currentUser={user}/>} />
          <Route path="restaurants" element={<Restaurants currentUser={user} />} />
          <Route path="restaurants/:restaurantId" element={<Restaurant currentUser={user} />} />
          <Route path="reservations" element={<Reservations currentUser={user}/>} />
          <Route
            path="*"
            element={<Navigate to="/restaurants" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}