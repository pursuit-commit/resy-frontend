import jwt_decode from "jwt-decode";
import { IUser } from "../util/types";

export const getDefaultUser = (): IUser | undefined => {
  const token = localStorage.getItem('token');
  if (!token) return undefined;
  const decodedToken: { name: string, username: string, id: string, [key: string]: string } = jwt_decode(token);
  return {
    id: decodedToken.id,
    name: decodedToken.name,
    username: decodedToken.username,
  }
}