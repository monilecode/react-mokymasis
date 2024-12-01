import { useQuery } from "react-query";
import { getCategories } from "../api/CategoriesApi";

export const CATEGORY_KEY = "CATEGORY_KEY";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: getCategories,
  });
};
