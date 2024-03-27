import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactFCWithChildren } from "../types";
import useCookie from "../utils/cookie";
import axios from "axios";

type ICurrentUser = {
  token: string;
  firstName: string;
  lastName?: string;
  name: string;
  email: string;
  profilePicture: string;
};

const UserContext = createContext<ICurrentUser | undefined>(undefined);

const UserProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [user, setUser] = useState<ICurrentUser | undefined>(undefined);
  const [accessToken, setAccessToken, deleteAccessToken] =
    useCookie("accessToken");

  useEffect(() => {
    axios
      .post("http://localhost:8000/google/getUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser(response);
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { useUser, UserProvider };
