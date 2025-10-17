import { useState } from "react";
import NavButton2 from "../../shared/Buttons/NavButton2";
import { Languages } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";

const LanguageButton = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Dropdown Toggle Functionality
  // ---------------------------------------------------------
  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };
 

  return (
    <div className="relative">
      <NavButton2
        icon={Languages}
        onClick={toggleLanguage}
        onBlur={() => setIsLanguageOpen(false)}
      />

      <div className="absolute top-0 left-18  md:top-12  md:left-0 z-100 ">
        {isLanguageOpen && (
            <LanguageDropdown/>
        )}
      </div>
    </div>
  );
};

export default LanguageButton;
