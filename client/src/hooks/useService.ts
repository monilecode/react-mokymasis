import { Service } from "../types/ServiceType";
import { useQuery } from "react-query";
import { getServiceById } from "../api/ServicesApi";

export const useService = (id: string) => {
  return useQuery<Service, Error>(["service", id], () => getServiceById(id));
};
