import axios from "axios";
import { PROD } from "../consts/environment";

export const AxiosInstance = axios.create({
  baseURL: PROD ? import.meta.env.VITE_SERVER_URL : "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
