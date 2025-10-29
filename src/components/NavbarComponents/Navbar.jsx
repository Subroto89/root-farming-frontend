import RFLogo from "../shared/RFLogo";
import NavMenuGeneral from "./NavMenuGeneral";
import NavAvatar from "./NavAvatar/NavAvatar";
import HamburgerButton from "./Hamburger/HamburgerButton";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const { theme } = useTheme();
 const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"
  const navStyle =
    theme === "dark"
      ? "w-full  bg-white/10 backdrop-blur-lg text-white  border-b border-white/20 shadow-lg "
      : "w-full  bg-white/10 backdrop-blur-lg text-gray-900 border-b border-white/20 shadow-lg ";
  return (
    <>
      <div className={` ${navStyle}`}>
        <div className="w-11/12 flex justify-between items-center mx-auto py-2">
          {/*Logo Section ------------------- */}
          <div>
            <RFLogo />
          </div>

          {/*Nav Links In Large Screen ----------------------- */}
          <div className="hidden lg:flex items-center gap-2">
            <NavMenuGeneral />
            <NavAvatar />
          </div>

          {/*Hamburger Menu In Small Screen ----------------------- */}
          <div className="flex lg:hidden">
            <HamburgerButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
