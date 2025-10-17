import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

// Sub-Category Fetcher --------------------------------------------------------------
export const useFetchSubCategories = () => {
    const axiosSecure = useAxiosSecure();
    
     const {
    data: subCategories = [],
    // fetch,
    isLoading: isLoadingSubCategories,
    error: subCategoryError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/subCategories/get-subCategories");
      return data;
    },
  });
  

  const subCategoryOptions = subCategories.map((subCategory) => ({
    value: subCategory._id,
    label: subCategory.variantName,
  }));
  
  return {subCategoryOptions, isLoadingSubCategories, subCategoryError};
}