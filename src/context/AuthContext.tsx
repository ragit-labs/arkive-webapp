import React, { createContext, useContext, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { IUserInfo } from "../types/user";
import { ReactFCWithChildren } from "../types";
import axios from "axios";
import { SERVICE_URI } from "../config";

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
  const token = Cookies.get("accessToken");

  useMemo(() => {
    if (token) {
      !user && axios.get(`${SERVICE_URI}/users/me`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          Cookies.remove("accessToken")
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

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
