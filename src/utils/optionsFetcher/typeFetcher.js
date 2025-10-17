import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

export const useFetchTypes = () => {
    const axiosSecure = useAxiosSecure();
    
     const {
    data: types = [],
    // fetch,
    isLoading: isLoadingTypes,
    error: typesError,
  } = useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/types/get-types");
      return data;
    },
  });
  

  const typeOptions = types.map((type) => ({
    value: type._id,
    label: type.variantName,
  }));
  
  return {typeOptions, isLoadingTypes, typesError};
}
