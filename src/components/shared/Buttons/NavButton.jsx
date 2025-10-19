import { NavLink } from "react-router";
import { useTheme } from "../../../hooks/useTheme";

const NavButton = ({ label, icon: Icon, address, onClick }) => {
  const { theme } = useTheme();
  const style =
    theme === "dark" ? "fg-dark hover:text-white" : "fg-light hover:text-white";
  return (
    <>
      <NavLink
        to={address}
        onClick={onClick}
        className={`btn bg-transparent border-0 font-bold btn-color shadow-none ${style}`}
      >
        {Icon && <Icon size={20} />}
        {label}
      </NavLink>
    </>
  );
};

export default NavButton;
