import { ApiCategory, mapCategory } from "../types/CategoryType";
import { AxiosInstance } from "./AxiosInstance";

export const getCategories = async () => {
  const { data } = await AxiosInstance.get<ApiCategory[]>("categories");

  return data.map(mapCategory);
};
