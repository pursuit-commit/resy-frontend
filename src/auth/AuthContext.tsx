import { useContext, createContext, useState } from "react";
import { IUser } from "../util/types";
import jwt_decode from "jwt-decode";

// step 1: create a context
export const UserAuthContext = createContext<[IUser | undefined, React.Dispatch<React.SetStateAction<IUser | undefined>>]>(
  [undefined, () => { }]
);

// step 2: create a provider (this will share the context with all children)
export function UserAuthProvider({ user: defaultUser, children }: { user: IUser | undefined, children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>();

  return (
    <UserAuthContext.Provider value={[user, setUser]}>
      {children}
    </UserAuthContext.Provider>
  )
}


// step 3: create a hook to use the context
export const useUserContext = () => {
  const [user, setUser] = useContext(UserAuthContext);

  const setUserFromToken = (access_token: string | null) => {
    if (!access_token) {
      setUser(undefined);
      localStorage.removeItem('token');
      return;
    }

    localStorage.setItem('token', access_token);
    
    const decodedToken: { name: string, username: string, id: string, [key: string]: string } = jwt_decode(access_token);
    const user: IUser = {
      id: decodedToken.id,
      name: decodedToken.name,
      username: decodedToken.username,
    }

    setUser(user);
  }

  return { user, setUserFromToken };
}

export const getLoggedInUser = (): IUser | undefined => {
  const token = localStorage.getItem('token');

  if (!token) return undefined;

  const decodedToken: { name: string, username: string, id: string, [key: string]: string } = jwt_decode(token);
  return {
    id: decodedToken.id,
    name: decodedToken.name,
    username: decodedToken.username,
  }
}