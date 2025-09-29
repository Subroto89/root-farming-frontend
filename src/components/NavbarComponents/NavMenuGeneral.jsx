import NavMenuButton from "./NavButton";
import LanguageButton from "./NavLanguage/LanguageButton";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthenticationButton from "./AuthenticationButton";

const NavMenuGeneral = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <NavMenuButton label="Home" address="/" />
        <NavMenuButton label="About Us" address="/about" />
        <NavMenuButton label="Contact Us" address="/contact" />
        <NavMenuButton label="Shop" address="/shop" />
        <NavMenuButton label="Cart" address="/cart" />
        <NavMenuButton label="Blog" address="/blog" />
        <LanguageButton/>
        <ThemeSwitcher />
        <AuthenticationButton />
      </div>
    </>
  );
};

export default NavMenuGeneral;
