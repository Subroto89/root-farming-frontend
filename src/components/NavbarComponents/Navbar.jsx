import RFLogo from "../shared/RFLogo";
import NavMenuGeneral from "./NavMenuGeneral";
import NavAvatar from "./NavAvatar/NavAvatar";
import HamburgerButton from "./Hamburger/HamburgerButton";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const { theme } = useTheme();
  const navStyle =
    theme === "dark"
      ? "w-full fg-dark border-b border-white"
      : "w-full navbar-light border-b border-white";
  return (
    <>
      <div className={`${navStyle}`}>
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
