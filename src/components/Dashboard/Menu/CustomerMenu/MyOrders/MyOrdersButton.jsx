import React, { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import MyOrdersDropdown from "./MyOrdersDropdown";
import { ChevronDown, ChevronRight, Handbag } from "lucide-react";

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
        <NavButton label="My Orders" icon={Handbag} />
        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* My Orders Dropdown ------------------------- */}
      <div>{isMenuOpen && <MyOrdersDropdown />}</div>
    </>
  );
};

export default MyOrdersButton;
