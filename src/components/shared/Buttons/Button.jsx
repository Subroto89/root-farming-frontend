import { useTheme } from "../../../hooks/useTheme";
import { Link } from "react-router";


const Button = ({ label, icon: Icon, address, type, onClick, status, spread, textSize }) => {
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
      <Link
        type={type}
        onClick={onClick}
        to={address}
        className={`btn ${isSpread} border-0 font-bold btn-color tracking-wider shadow-none ${style} text-${textSize}`} 
      >
        {Icon && <Icon size={20} />}
        {label}
      </Link>
    </>
  );
};

export default Button;
