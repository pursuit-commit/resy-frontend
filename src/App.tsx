import './App.css';
import { Outlet } from 'react-router-dom';
import AppNavBar from './components/navbar/AppNavBar';
import { useState } from 'react';

function App() {

  return (
    <div>
      <AppNavBar />
      <Outlet />
    </div>
  );
}

export default App;
