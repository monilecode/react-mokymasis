import { ApiService, mapService } from "../types/ServiceType";
import { AxiosInstance } from "./AxiosInstance";

export const getServices = async () => {
  const { data } = await AxiosInstance.get<ApiService[]>("services");

  return data.map(mapService);
};
