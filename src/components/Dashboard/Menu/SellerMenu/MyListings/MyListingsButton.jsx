import React, { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import MyListingsDropdown from "./MyListingsDropdown";
import { ChevronDown, ChevronRight, Vegan } from "lucide-react";
import Button from "../../../../shared/Buttons/Button";

const MyListingsButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/* My Listings Button ----------------- */}
      <div onClick={toggleMenu} className="w-60 flex justify-between items-center space-x-1">
        <Button label="My Listings" icon={Vegan}/>
        {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
      </div>

      {/* My Listings Dropdown --------------- */}
      <div className="">
        {isMenuOpen && <MyListingsDropdown />}
      </div>
    </>
  );
};

export default MyListingsButton;
