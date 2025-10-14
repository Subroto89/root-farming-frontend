import { X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ModalFormat = ({
  width,
  height,
  headerText,
  modalClosingFunction,
  form,
}) => {
  const { theme } = useTheme();
  const headerStyle =
    theme === "light" ? "modal-header-light" : "modal-header-dark";
  const modalStyle = theme === "light" ? "modal-light" : "modal-dark";

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
        <div className={`${modalStyle} ${width} ${height}`}>
          {/* Header Part */}
          <div className={`${headerStyle}`}>
            <h3>{headerText}</h3>
            <X
              size={24}
              onClick={modalClosingFunction}
              className="border border-white rounded-md p-1 hover:bg-red-600 hover:text-white "
            />
          </div>
          {/* Form Part */}
          <div>{form}</div>
        </div>
      </div>
    </>
  );
};

export default ModalFormat;
