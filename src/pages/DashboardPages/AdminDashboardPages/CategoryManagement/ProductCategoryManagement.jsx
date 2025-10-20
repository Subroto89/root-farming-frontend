import { useState } from "react";
import { TabTitle } from "../../../../utils/utilities";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useTheme } from "../../../../hooks/useTheme";
import CategoryRow from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/CategoryManagement/CategoryRow";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { FaTools } from "react-icons/fa";
import UpdateCategoryModal from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/CategoryManagement/UpdateCategoryModal";
import Container from "../../../../components/shared/Container";
import ModalFormat from "../../../../components/shared/ModalFormat";
import FormInAddCategory from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/CategoryManagement/FormInAddCategory";

const ProductCategoryManagement = () => {
  TabTitle("Category Management");
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"

  const axiosSecure = useAxiosSecure();

  // --------------------------------------------------------------------
  // Add Category Modal Opening/Closing State & Function
  // --------------------------------------------------------------------
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [isUpdateCategoryModal, setIsUpdateCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleCategoryModal = () => {
    setIsCategoryModal(!isCategoryModal);
  };

  const handleUpdateCategoryModal = () => {
    setIsUpdateCategoryModal(!isUpdateCategoryModal);
  };

  // --------------------------------------------------------------------
  // Fetching All Categories Using Tanstack
  // --------------------------------------------------------------------
  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure("/categories/get-categories");
      return data;
    },
  });

  //   ----------------------------------------------------------------------------
  // Category Delete Function
  // ------------------------------------------------------------------------------
  const handleCategoryDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(
        `/categories/delete-category/${id}`
      );
      if (data.deletedCount) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category Deleted!",
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className={`${themeBackgroundStyle} min-h-screen`}>
      <Container>
        <div>
          {/* --------------------------------------------------------------
                     Page Title & Button For Adding New Category
        -------------------------------------------------------------- */}
          <div className={`flex items-center justify-between`}>
            <h2 className="text-lg md:text-xl font-bold my-10 md:my-2">
              Manage Product Categories
            </h2>
            <button
              onClick={handleCategoryModal}
              className="flex items-center gap-2 btn btn-outline hover:bg-green-500 hover:text-white"
            >
              <Plus />
              Add New Category
            </button>
          </div>

          {/* --------------------------------------------------------------
                     Category Based products/Crops Information Table
        ---------------------------------------------------------------*/}
          <div>
            {categories.length > 0 ? (
              <div className={`${themeForegroundStyle} min-h-[calc(100vh-116px)] w-full overflow-auto rounded-lg mt-10 shadow-lg`}>
                <table className={`${themeForegroundStyle} w-full divider-y divider-gray-500`}>
                  <thead
                    className={`${themeFgOfFgStyle} h-4 bg-gray-200 uppercase text-sm font-semibold sticky top-0 shadow-xl `}
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
                    {categories.map((category) => (
                      <CategoryRow
                        key={category._id}
                        category={category}
                        handleCategoryDelete={handleCategoryDelete}
                        handleUpdateCategoryModal={handleUpdateCategoryModal}
                        setCategoryToEdit={setCategoryToEdit}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <DataNotFound
                message={"No Category Added Yet. Please, Add First."}
              />
            )}
          </div>

          {/* --------------------------------------------------------------
                    Modal For Adding New Category
        -------------------------------------------------------------- */}
          <div>
            {isCategoryModal && (
              <ModalFormat
                width="w-[400px]"
                height="h-[300px]"
                headerText="Add New Category"
                modalClosingFunction={handleCategoryModal}
                form={
                  <FormInAddCategory
                    handleCategoryModal={handleCategoryModal}
                    refetch={refetch}
                  />
                }
              />
            )}
          </div>

          {/* --------------------------------------------------------------
                    Modal for Category Update
        -------------------------------------------------------------- */}
          <div>
            {isUpdateCategoryModal && (
              <UpdateCategoryModal
                handleUpdateCategoryModal={handleUpdateCategoryModal}
                categoryToEdit={categoryToEdit}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductCategoryManagement;
