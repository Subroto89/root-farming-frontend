import React, { useState } from "react";
import Modal_AddNewProduct from "../../../components/Dashboard/RouteBasedComponents/SellerRoutesComponents/MyListings/Add&ManageNewItem/Modal_AddNewProduct";
import NavButton2 from "../../../components/shared/Buttons/NavButton2";
import { Plus } from "lucide-react";
import Container from "../../../components/shared/Container";

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
              <Modal_AddNewProduct handleModalToggle={handleModalToggle} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddNewProduct;
