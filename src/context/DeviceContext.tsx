import React, { createContext, useContext } from "react";
import { ReactFCWithChildren } from "../types";

enum DeviceType {
  Mobile = "Mobile",
  Desktop = "Desktop",
}

const DeviceContext = createContext<DeviceType>(DeviceType.Desktop);

export const DeviceContextProvider: React.FC<ReactFCWithChildren> = ({
  children,
}) => {
  const deviceType =
    window.innerWidth > 1200 ? DeviceType.Desktop : DeviceType.Mobile;
  return (
    <DeviceContext.Provider value={deviceType}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceType = () => {
  const context = useContext(DeviceContext);
  return context;
};
