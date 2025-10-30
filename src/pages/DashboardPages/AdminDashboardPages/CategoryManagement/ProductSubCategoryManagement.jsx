import { Plus } from "lucide-react";
import React, { useState } from "react";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Buttons/Button";
import ModalFormat from "../../../../components/shared/ModalFormat";
import FormInAddSubCategory from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/Sub-CategoryManagement/FormInAddSubCategory";
import { TabTitle } from "../../../../utils/utilities";
import { useTheme } from "../../../../hooks/useTheme";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import DataNotFound from "../../../../components/shared/DataNotFound";
import { FaTools } from "react-icons/fa";
import SubCategoryRow from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/Sub-CategoryManagement/SubCategoryRow";
import Form_UpdateSubCategory from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/Sub-CategoryManagement/Form_UpdateSubCategory";

const ProductSubCategoryManagement = () => {
   TabTitle("Category Management");
   const { theme } = useTheme();

   const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   const themeFgOfFgStyle =
      theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

   const axiosSecure = useAxiosSecure();

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isUpdateSubCategoryModal, setIsUpdateSubCategoryModal] =
      useState(false);
   const [subCategoryToEdit, setSubCategoryToEdit] = useState(null);

   const handleModalToggle = () => {
      setIsModalOpen((prev) => !prev);
   };

   const handleUpdateSubCategoryModal = () => {
      setIsUpdateSubCategoryModal((prev) => !prev);
   };

   // --------------------------------------------------------------------
   // Fetching All Sub-Categories Using Tanstack Query
   // --------------------------------------------------------------------
   const {
      data: subCategories = [],
      isLoading: subCategoryLoading,
      refetch,
   } = useQuery({
      queryKey: ["subCategories"],
      queryFn: async () => {
         const { data } = await axiosSecure("/subCategories/get-subCategories");
         return data;
      },
   });

   //   ----------------------------------------------------------------------------
   // Sub-Categories Delete Function
   // ------------------------------------------------------------------------------
   const handleSubCategoryDelete = async (id) => {
      try {
         const { data } = await axiosSecure.delete(
            `/subCategories/delete-subCategory/${id}`
         );
         if (data.deletedCount) {
            Swal.fire({
               icon: "success",
               title: "Success",
               text: "Sub-Category Deleted!",
               timer: 1500,
            });
            refetch();
         }
      } catch (error) {
         console.log(error);
      }
   };

   if (subCategoryLoading) return <LoadingSpinner />;

   return (
      <div className={`${themeBackgroundStyle} min-h-screen`}>
         <Container>
            {/* Header Section with Button -------------------------------------  */}
            <div className="flex justify-between items-center">
               <h2>Product Sub-Category Management</h2>
               <Button
                  icon={Plus}
                  label="Add Product Sub Category"
                  status="success"
                  onClick={handleModalToggle}
               />
            </div>

            {/* ------------------------------------------------------------------------- 
          Header & Add New Sub-Category Section 
        ---------------------------------------------------------------------------*/}
            <div>
               {isModalOpen && (
                  <div>
                     <ModalFormat
                        width="w-[600px]"
                        height="h-[600px]"
                        headerText="Add New Sub-Category"
                        modalClosingFunction={handleModalToggle}
                        form={
                           <FormInAddSubCategory
                              handleModalToggle={handleModalToggle}
                              refetch={refetch}
                           />
                        }
                     />
                  </div>
               )}
            </div>

            {/* ------------------------------------------------------------------------- 
          Sub-Categories In Table Section 
        ---------------------------------------------------------------------------*/}
            <div className={`${themeForegroundStyle}`}>
               {subCategories.length > 0 ? (
                  <div className="w-full min-h-[calc(100vh-120px)] overflow-hidden rounded-lg mt-10 shadow-lg">
                     <table
                        className={`w-full divider-y divider-gray-500 rounded-lg`}
                     >
                        <thead
                           className={`${themeFgOfFgStyle} shadow-lg h-4 bg-gray-200 uppercase text-sm font-semibold sticky top-0 `}
                        >
                           <tr className="text-left">
                              <th className="py-2 px-8">Photo</th>
                              <th className="py-2 px-8">Sub-Category Name</th>
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
                           {subCategories.map((subCat) => (
                              <SubCategoryRow
                                 key={subCat._id}
                                 subCat={subCat}
                                 handleSubCategoryDelete={
                                    handleSubCategoryDelete
                                 }
                                 handleUpdateSubCategoryModal={
                                    handleUpdateSubCategoryModal
                                 }
                                 setSubCategoryToEdit={setSubCategoryToEdit}
                                 refetch={refetch}
                              />
                           ))}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <DataNotFound
                     message={"No Sub-Category Added Yet. Please, Add First."}
                  />
               )}
            </div>

            {/* --------------------------------------------------------------
                    Modal for Type Update
        -------------------------------------------------------------- */}
            <div>
               {isUpdateSubCategoryModal && (
                  <ModalFormat
                     width="w-[680px]"
                     height="h-[520px]"
                     headerText="Update Sub-Category"
                     modalClosingFunction={handleUpdateSubCategoryModal}
                     handleUpdateSubCategoryModal={handleUpdateSubCategoryModal}
                     typeToEdit={subCategoryToEdit}
                     refetch={refetch}
                     form={
                        <Form_UpdateSubCategory
                           handleUpdateSubCategoryModal={
                              handleUpdateSubCategoryModal
                           }
                           subCategoryToEdit={subCategoryToEdit}
                           refetch={refetch}
                        />
                     }
                  />
               )}
            </div>
         </Container>
      </div>
   );
};

export default ProductSubCategoryManagement;
