import React, { useState } from "react";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Buttons/Button";
import { Plus } from "lucide-react";
import ModalFormat from "../../../../components/shared/ModalFormat";

const ProductVariantManagement = () => {
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
          <Button icon={Plus} label="Add Product Variant" status="success" onClick={handleModalToggle}/>
        </div>

        {/* --------------------------------------------------------------------
                        Add New Variant Modal Section 
                        ---------------------------------------------------------------------*/}
        <div>
          {isModalOpen && (
            <div>
              <ModalFormat
                width= "w-[400px]"
                height= "h-[300px]"
                headerText="Add New Variant"
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

export default ProductVariantManagement;
