import './App.css';
import { Link, Outlet } from 'react-router-dom';
import AppNavBar from './components/navbar/AppNavBar';

function App() {
  return (
    <div>
      <AppNavBar />
      <Outlet />
    </div>
  );
}

export default App;
