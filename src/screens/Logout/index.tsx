import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { logout } from "../../utils/logout";

const Logout = () => {
  const { user } = useAuth();

  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    if (user) {
      logout();
      setLoggedOut(true);
    }
  });
  return <>{loggedOut && <Navigate to="/" />}</>;
};

export default Logout;
