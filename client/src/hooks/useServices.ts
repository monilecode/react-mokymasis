import { useQuery } from "react-query";
import { getServices } from "../api/ServicesApi";

export const SERVICE_KEY = "SERVICE_KEY";

export const useServices = () => {
  return useQuery({
    queryKey: [SERVICE_KEY],
    queryFn: getServices,
  });
};
