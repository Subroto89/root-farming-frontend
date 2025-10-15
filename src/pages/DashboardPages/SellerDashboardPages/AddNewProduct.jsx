import { useState } from "react";
import NavButton2 from "../../../components/shared/Buttons/NavButton2";
import { Plus } from "lucide-react";
import Container from "../../../components/shared/Container";
import ModalFormat from "../../../components/shared/ModalFormat";
import Form_AddNewItem from "../../../components/Dashboard/RouteBasedComponents/SellerRoutesComponents/MyListings/Add&ManageNewItem/Form_AddNewProduct"
const AddNewProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
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
          <div></div>

          {/* Modal for Add New Item Section ------------------------------------ */}
          <div>
            {isModalOpen && (
              <ModalFormat
                width="w-[800px]"
                height="h-[500px]"
                headerText="Add New Product"
                modalClosingFunction={handleModalToggle}
                form={<Form_AddNewItem/>}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddNewProduct;
