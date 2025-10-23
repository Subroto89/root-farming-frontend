import React, { useState } from "react";
import { CalendarCog, ChevronDown, ChevronRight } from "lucide-react";
import ContentManagementDropdown from "./ContentManagementDropdown";
import Button from "../../../../shared/Buttons/Button";

const ContentManagementButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/* Content Management Button ------------------------------- */}
      <div onClick={toggleMenu} className="flex justify-between items-center space-x-1">
        <Button label="Content Management" icon={ CalendarCog }/>

        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Content Management Dropdown ------------------------------ */}
      <div>{isMenuOpen && <ContentManagementDropdown />}</div>
    </>
  );
};

export default ContentManagementButton;
