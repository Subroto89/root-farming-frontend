import React, { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import MyOrdersDropdown from "./MyOrdersDropdown";
import { ChevronDown, ChevronRight, Handbag } from "lucide-react";
import NavButton2 from "../../../../shared/Buttons/NavButton2";
import Button from "../../../../shared/Buttons/Button";

const MyOrdersButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/* My Orders Button -------------------------- */}
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center space-x-1"
      >
        <Button label="My Orders" icon={Handbag}/>
        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown  />}
      </div>

      {/* My Orders Dropdown ------------------------- */}
      <div>{isMenuOpen && <MyOrdersDropdown />}</div>
    </>
  );
};

export default MyOrdersButton;
