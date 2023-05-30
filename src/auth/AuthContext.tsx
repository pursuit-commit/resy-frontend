import { useContext, createContext, useState } from "react";
import { IUser } from "../util/types";
import jwt_decode from "jwt-decode";

export const UserAuthContext = createContext<[IUser | undefined, React.Dispatch<React.SetStateAction<IUser | undefined>>]>(
  [undefined, () => { }]);

export function UserAuthProvider({ user: defaultUser, children }: { user: IUser | undefined, children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | undefined>(defaultUser)

  return (
    <UserAuthContext.Provider value={[user, setUser]}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserContext = () => {
  const [user, setUser] = useContext(UserAuthContext);

  const setUserFromToken = (access_token: string | null) => {
    if (!access_token) {
      setUser(undefined);
      return;
    }
    
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