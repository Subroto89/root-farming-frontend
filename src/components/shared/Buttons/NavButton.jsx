import { NavLink } from "react-router";
import { useTheme } from "../../../hooks/useTheme";

const NavButton = ({ label, icon: Icon, address, onClick, textSize }) => {
  const { theme } = useTheme();
  const style =
    theme === "dark" ? "fg-dark " : "fg-light ";
  return (
    <>
      <NavLink
        to={address}
        onClick={onClick}
        className={` bg-transparent border-0  shadow-none tracking-wider text-${textSize} `}
      >
        {Icon && <Icon size={20} />}
        {label}
      </NavLink>
    </>
  );
};

export default NavButton;
