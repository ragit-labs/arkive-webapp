import { googleLogout } from "@react-oauth/google";
import Cookies from "js-cookie";

export const logout = () => {
  Cookies.remove("accessToken", { path: "/", domain: "localhost" });
  googleLogout();
};
