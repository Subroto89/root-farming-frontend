import { NavLink } from "react-router";

const NavButton = ({ label, icon: Icon, address, onClick, textSize }) => {

 
  return (
    <>
      <NavLink
        to={address}
        onClick={onClick}
        className={`flex items-center gap-2 bg-transparent border-0  shadow-none tracking-wider text-${textSize} `}
      >
        {Icon && <Icon size={20} />}
        {label}
      </NavLink>
    </>
  );
};

export default NavButton;
