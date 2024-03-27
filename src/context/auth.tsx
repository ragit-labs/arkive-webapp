import React, { createContext, useContext } from "react";
import { ReactFCWithChildren } from "../types";
import useCookie from "../utils/cookie";

type IAuth = {
  accessToken?: string;
};

const AuthContext = createContext<IAuth | undefined>(undefined);

const AuthProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken, deleteAccessToken] =
    useCookie("accessToken");

  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
