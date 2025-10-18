import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

// Category Fetcher --------------------------------------------------------------
export const useFetchCategories = () => {
    const axiosSecure = useAxiosSecure();
    
     const {
    data: categories = [],
    // fetch,
    isLoading: isLoadingCategories,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/categories/get-categories");
      return data;
    },
  });
  

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.variantName,
  }));
  
  return {categoryOptions, isLoadingCategories, categoryError};
}
