import React, { useState } from "react";
import Modal_AddNewItem from "../../../components/Dashboard/RouteBasedComponents/SellerRoutesComponents/MyListings/Add&ManageNewItem/Modal_AddNewItem";
import NavButton2 from "../../../components/shared/Buttons/NavButton2";
import { Plus } from "lucide-react";
import Container from "../../../components/shared/Container";

const AddNewItem = () => {
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
            <h2>Add & Manage New Item</h2>
            <NavButton2
              label="Add New Item"
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
              <Modal_AddNewItem handleModalToggle={handleModalToggle} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddNewItem;
