import React, { useState } from "react";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Buttons/Button";
import { Plus } from "lucide-react";
import ModalFormat from "../../../../components/shared/ModalFormat";
import FormInAddVariant from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/VariantManagement/FormInAddVariant";
import { TabTitle } from "../../../../utils/utilities";
import { useTheme } from "../../../../hooks/useTheme";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import VariantRow from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/VariantManagement/VariantRow";
import DataNotFound from "../../../../components/shared/DataNotFound";
import { FaTools } from "react-icons/fa";

const ProductVariantManagement = () => {
   TabTitle("Category Management");
   const { theme } = useTheme();
   const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   const themeFgOfFgStyle =
      theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

   const axiosSecure = useAxiosSecure();

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isUpdateVariantModal, setIsUpdateVariantModal] = useState(false);
   const [vairantToEdit, setVariantToEdit] = useState(null);

   const handleModalToggle = () => {
      setIsModalOpen((prev) => !prev);
   };

   const handleUpdateVariantModal = () => {
      setIsUpdateVariantModal((prev) => !prev);
   };

   // --------------------------------------------------------------------
   // Fetching All Variant Using Tanstack Query
   // --------------------------------------------------------------------
   const {
      data: variants = [],
      isLoading: variantLoading,
      refetch,
   } = useQuery({
      queryKey: ["variants"],
      queryFn: async () => {
         const { data } = await axiosSecure("/variants/get-variants");
         return data;
      },
   });

   //   ----------------------------------------------------------------------------
   // Variant Delete Function
   // ------------------------------------------------------------------------------
   const handleVariantDelete = async (id) => {
      try {
         const { data } = await axiosSecure.delete(
            `/variants/delete-variant/${id}`
         );
         if (data.deletedCount) {
            Swal.fire({
               icon: "success",
               title: "Success",
               text: "Variant Deleted!",
               timer: 1500,
            });
            refetch();
         }
      } catch (error) {
         console.log(error);
      }
   };

   if (variantLoading) return <LoadingSpinner />;

   return (
      <div className={`${themeBackgroundStyle} min-h-screen`}>
         <Container>
            {/* Header Section with Button -------------------------------------  */}
            <div className="flex justify-between items-center">
               <h2>Product Variant Management</h2>
               <Button
                  icon={Plus}
                  label="Add Product Variant"
                  status="success"
                  onClick={handleModalToggle}
               />
            </div>

            {/* --------------------------------------------------------------
                  Variants Table
              ---------------------------------------------------------------*/}
            <div>
               {variants.length > 0 ? (
                  <div
                     className={`${themeForegroundStyle} w-full min-h-[calc(100vh-120px)] overflow-auto rounded-lg mt-10 shadow-lg`}
                  >
                     <table className={`w-full divider-y divider-gray-500`}>
                        <thead
                           className={`${themeFgOfFgStyle} shadow-lg h-4 bg-gray-200 uppercase text-sm font-semibold sticky top-0 `}
                        >
                           <tr className="text-left">
                              <th className="py-2 px-8">Photo</th>
                              <th className="py-2 px-8">Variant Name</th>
                              <th className="py-2 px-8">Total Products</th>
                              <th className="py-2 px-8">Created On</th>
                              <th className="py-2 px-8">Status</th>
                              <th className="py-2 px-8 text-center flex items-center gap-2">
                                 <FaTools size={16} />
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {variants.map((variant) => (
                              <VariantRow
                                 key={variant._id}
                                 variant={variant}
                                 handleVariantDelete={handleVariantDelete}
                                 handleUpdateVariantModal={
                                    handleUpdateVariantModal
                                 }
                                 setVariantToEdit={setVariantToEdit}
                                 refetch={refetch}
                              />
                           ))}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <DataNotFound
                     message={"No Variant Added Yet. Please, Add First."}
                  />
               )}
            </div>

            {/* --------------------------------------------------------------------
                        Add New Variant Modal Section 
        ---------------------------------------------------------------------*/}
            <div>
               {isModalOpen && (
                  <div>
                     <ModalFormat
                        width="w-[580px]"
                        height="h-[680px]"
                        headerText="Add New Variant"
                        modalClosingFunction={handleModalToggle}
                        form={
                           <FormInAddVariant
                              handleUpdateVariantModal={
                                 handleUpdateVariantModal
                              }
                              handleModalToggle={handleModalToggle}
                              refetch={refetch}
                           />
                        }
                     />
                  </div>
               )}
            </div>
         </Container>
      </div>
   );
};

export default ProductVariantManagement;
