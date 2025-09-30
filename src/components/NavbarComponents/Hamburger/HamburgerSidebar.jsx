import AuthenticationButton from "../AuthenticationButton";
import NavButton from "../../shared/Buttons/NavButton";
import LanguageButton from "../NavLanguage/LanguageButton";
import RFLogo from "../RFLogo";
import ThemeSwitcher from "../ThemeSwitcher";

const HamburgerSidebar = () => {
  return (
    <>
      <div className="flex flex-col items-start pl-2 pt-6 bg-gray-200 h-screen">
        {/* 1. Logo Section------------ */}
        <RFLogo />
        
        <hr className="w-2/3 my-4 flex justify-center border-gray-400" />

         {/* 2. Links Section------------ */}
        <NavButton label="Home" address="/" />
        <NavButton label="About Us" address="/about" />
        <NavButton label="Contact Us" address="/contact" />
        <NavButton label="Shop" address="/shop" />
        <NavButton label="Cart" address="/cart" />
        <NavButton label="Blog" address="/blog" />

        <hr className="w-2/3 border-gray-400 my-4"/>

         {/* 3. Dashboard & Profile Section------------ */}
        <NavButton label="Dashboard" address="/dashboard" />
        <NavButton label="Profile" address="/profile" />

        <hr className="w-2/3 border-gray-400 my-4"/>

         {/* 4. Settings Section------------ */}
        <LanguageButton />
        <div className="pl-3"><ThemeSwitcher /></div>
        <AuthenticationButton />
      </div>
    </>
  );
};

export default HamburgerSidebar;
