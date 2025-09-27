import React from "react";
import useAuth from "../../hooks/useAuth";
import { UserRound } from "lucide-react";

{/*Avatar/User Photo on Desktop Mode Section-----------------------------*/}
const NavAvatar = (closeLanguageDropdown, toggleAvatarDropdown) => {
    const {user} = useAuth();
  return (
    <>
      <div
        onClick={() => {
          closeLanguageDropdown(), toggleAvatarDropdown();
        }}
        className="border-1 border-blue-400 rounded-full hidden md:block"
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
          <UserRound size={32}/>
        )}
      </div>
    </>
  );
};

export default NavAvatar;
