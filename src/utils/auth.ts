import axios from "axios";
import Cookies from "js-cookie";
import { IUserInfo } from "../types/user";
import { SERVICE_URI } from "../config";

export const authenticate = async (
  googleAccessToken: string,
): Promise<string> => {
  const response = await axios.post(`${SERVICE_URI}/authenticate/google`, {
    google_access_token: googleAccessToken,
  });
  const { access_token: accessToken } = response.data;
  Cookies.set("accessToken", accessToken, { expires: 59 });
  return accessToken;
};

export const getUser = async (): Promise<IUserInfo> => {
  const response = await axios.get(`${SERVICE_URI}/users/me`);
  return response.data;
};
