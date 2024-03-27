import React, { createContext, useContext, useState } from "react";
import { ReactFCWithChildren } from "../types";

type ICurrentUser = {
  token: string;
  firstName: string;
  lastName?: string;
  name: string;
  email: string;
  profilePicture: string;
};

type IAuth = {
  user?: ICurrentUser;
  login: (userInfo: ICurrentUser) => void;
  logout: () => void;
};

const UserContext = createContext<IAuth | undefined>(undefined);

const UserProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [user, setUser] = useState<ICurrentUser | undefined>(undefined);

  const login = async () => {
    setUser({
      token: "",
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: "",
    });
  };
  const logout = () => setUser(undefined);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { useUser, UserProvider };
