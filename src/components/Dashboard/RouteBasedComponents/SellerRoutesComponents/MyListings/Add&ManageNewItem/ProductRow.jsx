  import { useQuery } from "@tanstack/react-query";
  import useAxiosSecure from "../../../../../../hooks/UseAxiosSecure";
  import LoadingSpinner from "../../../../../shared/LoadingSpinner";
  import { Edit, Trash } from "lucide-react";

  export const ProductRow = ({ product }) => {
    const axiosSecure = useAxiosSecure();
    const { variantId, quality, createdAt, accountStatus, isApproved } =
      product;

    // Fetch for Sub-Category/ Product Name --------------------------------------
    const {
      data: variantData = [],
      isLoading: variantLoading,
      refetch,
    } = useQuery({
      queryKey: ["variant", variantId],
      queryFn: async () => {
        const { data } = await axiosSecure(
          `/variants/get-variant/${variantId}`
        );
        return data;
      },
      enabled: !!variantId,
    });
    if (variantLoading) return <LoadingSpinner />;

    return (
      
        <tr className="border-b border-gray-500">
          <td className="py-2 w-12 h-12 overflow-hidden">
            <img
              src={variantData.variantPhoto}
              alt="Variant photo"
              className="w-8 h-8 object-cover mx-auto"
            />
          </td>
          <td className="py-2 px-8">{variantData.variantName}</td>
          <td className="py-2 px-8">{quality}</td>
          <td className="py-2 px-8">{new Date(createdAt).toLocaleDateString()}</td>
          <td className="py-2 px-8">{accountStatus}</td>
          <td className="py-2 px-8">{isApproved ? "Approved" : "Not-Approved"}</td>
          <td className="py-2 px-8">
          { <div className="flex items-center gap-4">
              <Edit/>
              <Trash/>
            </div>}
            
          </td>
        </tr>
    
    );
  };

  export default ProductRow;
