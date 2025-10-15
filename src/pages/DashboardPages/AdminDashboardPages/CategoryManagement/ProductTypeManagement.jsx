import { useState } from "react";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Buttons/Button";
import { Plus } from "lucide-react";
import ModalFormat from "../../../../components/shared/ModalFormat";
import FormInAddType from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/TypeManagement/FormInAddType";
import { TabTitle } from "../../../../utils/utilities";
import { useTheme } from "../../../../hooks/useTheme";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataNotFound from "../../../../components/shared/DataNotFound";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { FaTools } from "react-icons/fa";
import TypeRow from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/TypeManagement/TypeRow";
import Form_UpdateType from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/TypeManagement/Form_UpdateType";

const ProductTypeManagement = () => {
  TabTitle("Category Management");
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateTypeModal, setIsUpdateTypeModal] = useState(false);
  const [typeToEdit, setTypeToEdit] = useState(null);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleUpdateTypeModal = () => {
    setIsUpdateTypeModal(prev => !prev);
  }


  // --------------------------------------------------------------------
  // Fetching All Types Using Tanstack Query
  // --------------------------------------------------------------------
  const {
    data: types = [],
    isLoading: typeLoading,
    refetch,
  } = useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const { data } = await axiosSecure("/types/get-types");
      return data;
    },
  });


   //   ----------------------------------------------------------------------------
    // Type Delete Function
    // ------------------------------------------------------------------------------
    const handleTypeDelete = async (id) => {
      try {
        const { data } = await axiosSecure.delete(
          `/types/delete-type/${id}`
        );
        if (data.deletedCount) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Type Deleted!",
            timer: 1500,
          });
          refetch();
        }
      } catch (error) {
        console.log(error);

      }
    };


  if(typeLoading) return <LoadingSpinner/>

  return (
    <>
      <Container>
        {/* -----------------------------------------------------------------
            Header Section with Add Type Button 
        ----------------------------------------------------------------  */}
        <div className="flex justify-between items-center">
          <h2>Product Type Management</h2>
          <Button
            icon={Plus}
            label="Add Product Type"
            status="success"
            onClick={handleModalToggle}
          />
        </div>

        {/* --------------------------------------------------------------
            Types Table
        ---------------------------------------------------------------*/}
        <div>
          {types.length > 0 ? (
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
                  {types.map((type) => (
                    <TypeRow
                      key={type._id}
                      type={type}
                      handleTypeDelete={handleTypeDelete}
                      handleUpdateTypeModal={handleUpdateTypeModal}
                      setTypeToEdit={setTypeToEdit}
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
                    Modal For Adding New Type
        -------------------------------------------------------------- */}
        <div>
          {isModalOpen && (
            <ModalFormat
              width="w-[400px]"
              height="h-[300px]"
              headerText="Add New Type"
              modalClosingFunction={handleModalToggle}
              form={<FormInAddType handleModalToggle={handleModalToggle} refetch={refetch}/>}
            />
          )}
        </div>

           {/* --------------------------------------------------------------
                    Modal for Type Update
        -------------------------------------------------------------- */}
          <div>
            {isUpdateTypeModal && (
              <ModalFormat
                width="w-[500px]"
                height="h-[350px]"
                headerText="Update Type"
                modalClosingFunction={handleUpdateTypeModal}
                handleUpdateTypeModal={handleUpdateTypeModal}
                typeToEdit={typeToEdit}
                refetch={refetch}
                form={<Form_UpdateType handleUpdateTypeModal={handleUpdateTypeModal} typeToEdit={typeToEdit} refetch={refetch}/>}
              />
            )}
          </div>
      </Container>
    </>
  );
};

export default ProductTypeManagement;
