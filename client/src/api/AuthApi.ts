import { AxiosInstance } from "./AxiosInstance";
import { RegistrationValues, LoginValues } from "../types/AuthType";
import { ApiUser, mapUser } from "../types/UserType";

type RegistrationResponse = {
  message: string;
};

export const register = async (values: RegistrationValues) => {
  const { data } = await AxiosInstance.post<RegistrationResponse>(
    "/register",
    values
  );

  // TODO: Handle errors
  return data;
};

type LoginResponse = {
  status: string;
  token: string;
  user: ApiUser;
};

export const login = async (values: LoginValues) => {
  const { data } = await AxiosInstance.post<LoginResponse>("/login", values);

  // TODO: Handle errors
  return {
    token: data.token,
    user: mapUser(data.user),
  };
};
