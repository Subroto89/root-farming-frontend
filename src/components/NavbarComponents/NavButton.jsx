import { NavLink } from "react-router";
import { useTheme } from "../../hooks/useTheme";

const NavMenuButton = ({ label, icon: Icon, address, onClick }) => {
    const { theme } = useTheme();
  const style =
            theme === "dark"
                ? "text-white hover:text-gray-200"
                : "text-gray-700 hover:text-gray-900";
  return (
    <>
      <NavLink
        to={address}
        onClick={onClick}
        className={`btn bg-transparent border-0 font-bold btn-color shadow-none ${style}`} 
      >
        {label}
        {Icon && <Icon size={20} />}
      </NavLink>
    </>
  );
};

export default NavMenuButton;
