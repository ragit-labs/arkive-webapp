import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("accessToken", { path: "/", domain: "localhost" });
    googleLogout();
    navigate("/login");
  }, [navigate]);
  return null;
};

export default Logout;
