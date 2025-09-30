import React, { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import MyAccountDropdown from "./MyAccountDropdown";

const MyAccountButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleIsDropdown = () => {
        setIsDropdownOpen(prev => !prev)
    }
  return (
    <>
      {/* My Account Button ------------------------- */}
      <div onClick={toggleIsDropdown} className="relative">
        <NavButton
            label="My Account"
        />
      </div>
      

      {/* My Account Dropdown ----------------------- */}
      <div className="absolute top-0 -right-2">

        {
            isDropdownOpen && (
                <MyAccountDropdown/>
            )
        }

      </div>
    </>
  );
};

export default MyAccountButton;
