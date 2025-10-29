import React from "react";
import {useAuth} from "../../../hooks/useAuth";
import { UserRound } from "lucide-react";
import NavAvatarDropdown from "./NavAvatarDropdown";

{
  /*Avatar/User Photo on Desktop Mode Section-----------------------------*/
}
const NavAvatar = () => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleAvatarDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleAvatarDropdown}
        className="relative border-1 border-blue-400 rounded-full hidden md:block"
      >
        {user?.photoURL ? (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user?.photoURL}
              alt="user photo"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <UserRound size={32} />
        )}
      </div>

      <div className="absolute top-14 right-0 z-100">
        {isDropdownOpen && <NavAvatarDropdown />}
      </div>
    </>
  );
};

export default NavAvatar;
