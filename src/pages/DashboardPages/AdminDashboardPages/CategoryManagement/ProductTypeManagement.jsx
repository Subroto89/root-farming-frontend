import { useState } from "react";
import Container from "../../../../components/shared/Container";
import Button from "../../../../components/shared/Buttons/Button";
import { Plus } from "lucide-react";
import Modal_AddNewType from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/TypeManagement/Modal_AddNewType";
import ModalFormat from "../../../../components/shared/ModalFormat";

const ProductTypeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <Container>
        {/* Header Section with Button -------------------------------------  */}
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
                    Modal For Adding New Category
        -------------------------------------------------------------- */}
        <div>
          {isModalOpen && (
            <ModalFormat
              width="w-[400px]"
              height="h-[300px]"
              headerText="Add New Type"
              modalClosingFunction={handleModalToggle}
              form=""
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductTypeManagement;
