import axios from "axios";
import Cookies from "js-cookie";
import { IUserInfo } from "../types/user";

const API_URL = "http://localhost:8000";

export const authenticate = async (
  googleAccessToken: string,
): Promise<string> => {
  const response = await axios.post(`${API_URL}/authenticate/google`, {
    google_access_token: googleAccessToken,
  });
  const { access_token: accessToken } = response.data;
  Cookies.set("accessToken", accessToken, { expires: 1 }); // Expires in 1 day
  return accessToken;
};

export const getUser = async (): Promise<IUserInfo> => {
  const response = await axios.get(`${API_URL}/users/me`);
  return response.data;
};
