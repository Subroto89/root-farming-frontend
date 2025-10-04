
import RFLogo from "../shared/RFLogo";
import NavMenuGeneral from "./NavMenuGeneral";
import NavAvatar from "./NavAvatar/NavAvatar";
import HamburgerButton from "./Hamburger/HamburgerButton";

const Navbar = () => {
  
  return (
    <>
      <div className="w-11/12 flex justify-between items-center mx-auto py-2">
        {/*Logo Section ------------------- */}
        <div>
          <RFLogo />
        </div>

        {/*Nav Links In Large Screen ----------------------- */}
        <div className="hidden lg:flex items-center gap-2">
          <NavMenuGeneral/>
          <NavAvatar/>
        </div>

        {/*Hamburger Menu In Small Screen ----------------------- */}
        <div className="flex lg:hidden">
          <HamburgerButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;
