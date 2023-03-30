import './App.css';
import { Outlet } from 'react-router-dom';
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
