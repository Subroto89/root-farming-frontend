import React, { useState } from "react";
import UserManagementDropdown from "./UserManagementDropdown";
import { ChevronDown, ChevronRight, UserCog } from "lucide-react";
import Button from "../../../../shared/Buttons/Button";

const UserManagementButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/* User Management Button ----------------------- */}
      <div onClick={toggleMenu} className="flex justify-between items-center space-x-1">
        <Button label="User Management" icon={ UserCog }/>
        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* User Management Dropdown --------------------  */}
      <div>{isMenuOpen && <UserManagementDropdown />}</div>
    </>
  );
};

export default UserManagementButton;
