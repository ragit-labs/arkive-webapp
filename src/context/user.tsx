import React, { createContext, useContext, useEffect, useState } from "react";
import { ReactFCWithChildren } from "../types";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVICE_URI } from "../config";

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
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    axios
      .post(`${SERVICE_URI}/google/getUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUser({
          token: accessToken ?? "",
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          name: response.data.name,
          email: response.data.email,
          profilePicture: response.data.picture,
        });
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
