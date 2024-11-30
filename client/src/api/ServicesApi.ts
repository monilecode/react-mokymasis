import { Service, mapService } from "../types/ServiceType";
import { AxiosInstance } from "./AxiosInstance";

export const getServices = async (): Promise<Service[]> => {
  const { data } = await AxiosInstance.get<Service[]>("services");
  return data.map(mapService);
};

export const getServiceById = async (id: string): Promise<Service> => {
  const { data } = await AxiosInstance.get<Service>(`/services/${id}`);
  return mapService(data);
};
