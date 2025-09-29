import AuthenticationButton from "../AuthenticationButton";
import NavMenuButton from "../NavButton";
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
        <NavMenuButton label="Home" address="/" />
        <NavMenuButton label="About Us" address="/about" />
        <NavMenuButton label="Contact Us" address="/contact" />
        <NavMenuButton label="Shop" address="/shop" />
        <NavMenuButton label="Cart" address="/cart" />
        <NavMenuButton label="Blog" address="/blog" />

        <hr className="w-2/3 border-gray-400 my-4"/>

         {/* 3. Dashboard & Profile Section------------ */}
        <NavMenuButton label="Dashboard" address="/dashboard" />
        <NavMenuButton label="Profile" address="/profile" />

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
