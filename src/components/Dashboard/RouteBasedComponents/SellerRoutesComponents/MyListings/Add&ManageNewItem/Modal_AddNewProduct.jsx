import { X } from "lucide-react";
import { useTheme } from "../../../../../../hooks/useTheme";
import Form_AddNewItem from "./Form_AddNewProduct";

const Modal_AddNewProduct = ({ handleModalToggle }) => {
  const { theme } = useTheme();
  const headerStyle = theme === "light" ? "modal-header-light" : "modal-header-dark";
  const modalStyle = theme === "light" ? "modal-light" : "modal-dark";

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
        <div className={`${modalStyle} w-[700px] h-[400px]`}>
          {/* Header Part */}
          <div className={`${headerStyle}`}>
            <h3>Add New Product</h3>
            <X size={24} onClick={handleModalToggle} />
          </div>
          {/* Form Part */}
          <div>
            <Form_AddNewItem handleModalToggle={handleModalToggle}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal_AddNewProduct;
