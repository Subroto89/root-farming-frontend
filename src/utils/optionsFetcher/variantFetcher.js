import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";


// Variant Fetcher --------------------------------------------------------------
export const useFetchVariant = () => {
    const axiosSecure = useAxiosSecure();
    
     const {
    data: variants = [],
    // fetch,
    isLoading: isLoadingVariants,
    error: variantError,
  } = useQuery({
    queryKey: ["variants"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/variants/get-variants");
      return data;
    },
  });
  

  const variantOptions = variants.map((variant) => ({
    value: variant._id,
    label: variant.variantName,
  }));
  
  return {variantOptions, isLoadingVariants, variantError};
}

