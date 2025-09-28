
import RFLogo from "./RFLogo";
import NavMenuGeneral from "./NavMenuGeneral";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthenticationButton from "./AuthenticationButton";
import NavAvatar from "./NavAvatar/NavAvatar";

const Navbar = () => {
  
  return (
    <>
      <div className="w-11/12 flex justify-between items-center mx-auto py-2">
        {/*Logo Section ------------------- */}
        <div>
          <RFLogo />
        </div>

        {/*Nav Links In Large Screen ----------------------- */}
        <div className="hidden md:flex items-center gap-2">
          <NavMenuGeneral/>
          <ThemeSwitcher />
          <AuthenticationButton />
          <NavAvatar/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
