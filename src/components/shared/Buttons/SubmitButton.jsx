import { useTheme } from "../../../hooks/useTheme";
import { Link } from "react-router";


const SubmitButton = ({ label, icon: Icon, type, onClick, status, spread }) => {
    const { theme } = useTheme();
    const isSpread = spread === 'yes' ? 'flex-1' : ''

    let btnStyle;
    switch (status) {
      case 'success':
        btnStyle = 'btn-success';
        break;
      case 'danger':
        btnStyle = theme === 'light' ? 'btn-danger-light' : 'btn-danger-dark';
        break;
      default:
        btnStyle = 'bg-transparent';
    }


  const style =
            theme === "dark"
                ? `text-white ${btnStyle} hover:text-gray-200`
                : `text-white ${btnStyle} hover:text-gray-900`;
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`btn ${isSpread} border-0 font-bold btn-color shadow-none ${style}`} 
      >
        {Icon && <Icon size={20} />}
        {label}
      </button>
    </>
  );
};

export default SubmitButton;
