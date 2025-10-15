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
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateSubCategoryModal, setIsUpdateSubCategoryModal] = useState(false);
  const [subCategoryToEdit, setSubCategoryToEdit] = useState(null);
  
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

   const handleUpdateSubCategoryModal = () => {
    setIsUpdateSubCategoryModal(prev => !prev);
  }

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
          `/subCategories/delete-subCategories/${id}`
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

  if(subCategoryLoading) return <LoadingSpinner/>

  return (
    <>
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
                width="w-[400px]"
                height="h-[300px]"
                headerText="Add New Sub-Category"
                modalClosingFunction={handleModalToggle}
                form={<FormInAddSubCategory handleModalToggle={handleModalToggle} refetch={refetch}/>}
              />
            </div>
          )}
        </div>

          {/* ------------------------------------------------------------------------- 
          Sub-Categories In Table Section 
        ---------------------------------------------------------------------------*/}
          <div>
                  {subCategories.length > 0 ? (
                    <div className="w-full max-h-[calc(100vh-150px)] overflow-auto rounded-lg mt-10 shadow-lg">
                      <table className={`w-full divider-y divider-gray-500`}>
                        <thead
                          className={`h-4 bg-gray-200 uppercase text-sm font-semibold sticky top-0 ${
                            theme === "dark" ? "category-card" : ""
                          }`}
                        >
                          <tr className="text-left">
                            <th className="py-2 px-20">Photo</th>
                            <th className="py-2 px-8">Category Name</th>
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
                              handleSubCategoryDelete={handleSubCategoryDelete}
                              handleUpdateSubCategoryModal={handleUpdateSubCategoryModal}
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
                width="w-[500px]"
                height="h-[350px]"
                headerText="Update Sub-Category"
                modalClosingFunction={handleUpdateSubCategoryModal}
                handleUpdateSubCategoryModal={handleUpdateSubCategoryModal}
                typeToEdit={subCategoryToEdit}
                refetch={refetch}
                form={<Form_UpdateSubCategory handleUpdateSubCategoryModal={handleUpdateSubCategoryModal} subCategoryToEdit={subCategoryToEdit} refetch={refetch}/>}
              />
            )}
          </div>
      </Container>
    </>
  );
};

export default ProductSubCategoryManagement;
