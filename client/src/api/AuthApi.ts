import { AxiosInstance } from "./AxiosInstance";
import { RegistrationValues, LoginValues } from "../types/AuthType";
import { ApiUser, mapUser } from "../types/UserType";
import { AxiosError, isAxiosError } from "axios";

type RegistrationResponse = {
  message: string;
};

const RegistrationErrorMessage = "Registration failed";

export const register = async (values: RegistrationValues) => {
  try {
    const response = await AxiosInstance.post<RegistrationResponse>(
      "/register",
      values
    );

    return response.data;
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message) ?? RegistrationErrorMessage;
    }
    throw new Error(RegistrationErrorMessage);
  }
};

type LoginResponse = {
  status: string;
  token: string;
  user: ApiUser;
};

const LoginErrorMessage = "Login failed";

export const login = async (values: LoginValues) => {
  try {
    const { data } = await AxiosInstance.post<LoginResponse>("/login", values);
    console.log("loginuos");

    return {
      token: data.token,
      user: mapUser(data.user),
    };
  } catch (error: unknown | AxiosError) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message) ?? LoginErrorMessage;
    }
    throw new Error(LoginErrorMessage);
  }
};
