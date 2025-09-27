import { NavLink } from "react-router";
// import { useTheme } from "../../context/ThemeContext";

const NavMenuButton = ({ label, icon: Icon, address, onClick }) => {
  //   const { theme } = useTheme();
  const theme = "light";
  const style =
            theme === "dark"
                ? "text-white hover:text-gray-200"
                : "text-gray-700 hover:text-gray-900";
  return (
    <>
      <NavLink
        to={address}
        onClick={onClick}
        className={`btn bg-transparent border-0 w-full font-semibold btn-color shadow-none ${style}`} 
      >
        {label}
        {Icon && <Icon size={20} />}
      </NavLink>
    </>
  );
};

export default NavMenuButton;
