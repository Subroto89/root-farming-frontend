import {useAuth} from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";
import NavButton from "../../shared/Buttons/NavButton";

const NavAvatarDropdown = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
  const { user } = useAuth();

  return (
    <>
      <div
        className={`${themeForegroundStyle} flex flex-col  absolute right-15 px-2 py-2  rounded-md`}
      >
        <div className="py-2 px-2 hover:bg-green-400 cursor-pointer mb-2">
          <NavButton
            label="My Profile"
            address={`/update-profile/${user?.email}`}
          />
        </div>
        <div className="py-2 px-2 hover:bg-green-400 cursor-pointer ">
          <NavButton label="Dashboard" address="/dashboard" />
        </div>
      </div>
    </>
  );
};

export default NavAvatarDropdown;
