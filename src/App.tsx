import './App.css';
import { Outlet } from 'react-router-dom';
import AppNavBar from './components/navbar/AppNavBar';
import { IUser } from './util/types';

function App({ currentUser, setCurrentUser }: { currentUser: IUser | undefined, setCurrentUser: React.Dispatch<React.SetStateAction<IUser | undefined>> }) {
  return (
    <div>
      <AppNavBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <Outlet />
    </div>
  );
}

export default App;
