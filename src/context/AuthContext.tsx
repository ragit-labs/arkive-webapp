import React, { createContext, useContext, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { IUserInfo } from "../types/user";
import { ReactFCWithChildren } from "../types";
import { SERVICE_URI } from "../config";
import { useAxios } from "../hooks/fetch";

interface AuthContextType {
  user: IUserInfo | null;
  isAuthenticated: boolean;
  setUser: (user: IUserInfo | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const isAuthenticated = !!user;
  const [loading, setLoading] = useState(true);
  const {
    response,
    error,
    loading: axiosLoading,
  } = useAxios({ url: `${SERVICE_URI}/users/me`, method: "GET" });
  const token = Cookies.get("accessToken");

  useMemo(() => {
    if (token) {
      if (!user) {
        if (!axiosLoading) {
          if (response) {
            setUser(response);
            setLoading(false);
          } else {
            console.log("Remove....");
            Cookies.remove("accessToken");
            setLoading(false);
          }
        }
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token, response, error, axiosLoading]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, loading }}>
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
