import { useState } from "react";
import NavButton2 from "../../../components/shared/Buttons/NavButton2";
import { Plus } from "lucide-react";
import Container from "../../../components/shared/Container";
import ModalFormat from "../../../components/shared/ModalFormat";
import Form_AddNewItem from "../../../components/Dashboard/RouteBasedComponents/SellerRoutesComponents/MyListings/Add&ManageNewItem/Form_AddNewProduct";
import { useTheme } from "../../../hooks/useTheme";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { FaTools } from "react-icons/fa";
import DataNotFound from "../../../components/shared/DataNotFound";
import { ProductRow } from "../../../components/Dashboard/RouteBasedComponents/SellerRoutesComponents/MyListings/Add&ManageNewItem/ProductRow";

const AddNewProduct = () => {
  const axiosSecure = useAxiosSecure();

  // Theme Implementation -----------------------------------------------------
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle = theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  // State Management ---------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Fetch All Products --------------------------------------------------------
  const {
    data: products = [],
    isLoading: isProductsLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure("/products/all-products");
      return data;
    },
  });
  if (isProductsLoading) return <LoadingSpinner />;

  console.log(products) 
  return (
    <div className={`${themeBackgroundStyle} min-h-screen`}>
      <Container>
        <div>
          {/* Button for Add New Item Section ----------------------------------- */}
          <div className="flex justify-between items-center">
            <h2>Add & Manage New Product</h2>
            <NavButton2
              label="Add New Product"
              onClick={handleModalToggle}
              icon={Plus}
              status="success"
              spread="No"
            />
          </div>

          {/* Table of Added Item Section --------------------------------------- */}
          <div>
             {products.length > 0 ? (
              <div className={`${themeForegroundStyle} min-h-[calc(100vh-116px)] w-full overflow-auto rounded-lg mt-10 shadow-lg`}>
                <table className={`${themeForegroundStyle} w-full divider-y divider-gray-500`}>
                  <thead
                    className={`${themeFgOfFgStyle} h-4 bg-gray-200 uppercase text-sm font-semibold sticky top-0 shadow-xl `}
                  >
                    <tr className="text-left">
                      <th className="py-2 px-8">Photo</th>
                      <th className="py-2 px-8">Product Name</th>
                      <th className="py-2 px-8">Quality</th>
                      <th className="py-2 px-8">Created on</th>
                      <th className="py-2 px-8">Activity</th>
                      <th className="py-2 px-8">Status</th>
                      <th className="py-2 px-8 text-center flex items-center gap-2">
                        <FaTools size={16} />
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <ProductRow
                        key={product._id}
                        product={product}
                        // handleCategoryDelete={handleCategoryDelete}
                        // handleUpdateCategoryModal={handleUpdateCategoryModal}
                        // setCategoryToEdit={setCategoryToEdit}
                        // refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <DataNotFound
                message={"No Product Added Yet. Please, Add First."}
              />
            )}
          </div>

          {/* Modal for Add New Item Section ------------------------------------ */}
          <div>
            {isModalOpen && (
              <ModalFormat
                width="w-[800px]"
                height="h-[500px]"
                headerText="Add New Product"
                modalClosingFunction={handleModalToggle}
                form={<Form_AddNewItem />}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddNewProduct;
