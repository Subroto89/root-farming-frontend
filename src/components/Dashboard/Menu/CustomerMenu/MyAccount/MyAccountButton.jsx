import React, { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import MyAccountDropdown from "./MyAccountDropdown";
import { ChevronDown, ChevronRight, Wallet } from "lucide-react";
import Button from "../../../../shared/Buttons/Button";

const MyAccountButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleIsDropdown = () => {
        setIsMenuOpen(prev => !prev)
    }
  return (
    <>
      {/* My Account Button ------------------------- */}
      <div onClick={toggleIsDropdown}  className="flex justify-between items-center space-x-1">
        <Button
            label="My Account"
            icon={ Wallet }
        />
        {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
      </div>
      

      {/* My Account Dropdown ----------------------- */}
      <div>

        {
            isMenuOpen && (
                <MyAccountDropdown/>
            )
        }

      </div>
    </>
  );
};

export default MyAccountButton;
