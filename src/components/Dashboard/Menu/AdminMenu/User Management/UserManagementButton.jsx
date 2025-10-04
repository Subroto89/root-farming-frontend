import React, { useState } from "react";
import UserManagementDropdown from "./UserManagementDropdown";
import NavButton from "../../../../shared/Buttons/NavButton";
import { ChevronDown, ChevronRight, UserCog } from "lucide-react";

const UserManagementButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/* User Management Button ----------------------- */}
      <div onClick={toggleMenu} className="flex justify-between items-center space-x-1">
        <NavButton label="User Management" icon={ UserCog }/>
        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* User Management Dropdown --------------------  */}
      <div>{isMenuOpen && <UserManagementDropdown />}</div>
    </>
  );
};

export default UserManagementButton;
