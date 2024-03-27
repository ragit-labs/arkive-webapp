import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IUserInfo } from "../types/user";
import { getUser } from "../utils/auth";
import { ReactFCWithChildren } from "../types";

interface AuthContextType {
  user: IUserInfo | null;
  isAuthenticated: boolean;
  setUser: (user: IUserInfo | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      getUser()
        .then(setUser)
        .catch(() => Cookies.remove("accessToken"));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
