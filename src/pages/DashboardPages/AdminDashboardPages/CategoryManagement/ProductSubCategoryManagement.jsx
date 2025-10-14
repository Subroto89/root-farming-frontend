import { Plus } from "lucide-react";
import React, { useState } from "react";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Buttons/Button";
import ModalFormat from "../../../../components/shared/ModalFormat";

const ProductSubCategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
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

        {/* Add New Type Section -------------------------------------------- */}
        <div>
          {isModalOpen && (
            <div>
              <ModalFormat
                width="w-[400px]"
                height="h-[300px]"
                headerText="Add New Sub-Category"
                modalClosingFunction={handleModalToggle}
                form=""
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductSubCategoryManagement;
