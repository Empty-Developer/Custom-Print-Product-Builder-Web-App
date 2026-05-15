import { createContext, Dispatch, SetStateAction } from "react";

interface UserDetailContextType {
  userDetail: any;
  setUserDetail: Dispatch<SetStateAction<any>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null);