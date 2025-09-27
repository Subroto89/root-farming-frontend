import { useState } from "react";
import RFLogo from "./RFLogo";
import NavMenuGeneral from "./NavMenuGeneral";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthenticationButton from "./AuthenticationButton";
import NavAvatar from "./NavAvatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Avata Dropdown Functionality ----------------------------

  const toggleAvatarDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeAvatarDropdown = () => {
    setIsMenuOpen(false);
  };

  // Menu Toggle Functionality
  // ---------------------------------------------------------
  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };
  const closeLanguageDropdown = () => {
    setIsLanguageOpen(false);
  };

  return (
    <>
      <div className="w-11/12 mx-auto flex justify-between items-center py-4">
        {/*Logo Section ------------------- */}
        <RFLogo />

        {/*Nav Links In Large Screen ----------------------- */}
        <div className="hidden md:flex gap-4">
          <NavMenuGeneral
            toggleLanguage={toggleLanguage}
            closeAvatarDropdown={closeAvatarDropdown}
          />
          
          <ThemeSwitcher />

          <AuthenticationButton />

          <NavAvatar
            toggleAvatarDropdown={toggleAvatarDropdown}
            closeLanguageDropdown={closeLanguageDropdown}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
