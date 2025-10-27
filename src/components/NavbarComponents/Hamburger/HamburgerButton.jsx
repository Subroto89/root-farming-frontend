import { useState } from "react";
import {useAuth} from "../../../hooks/useAuth";
import { Menu, UserRound, X } from "lucide-react";
import HamburgerSidebar from "./HamburgerSidebar";

const HamburgerButton = () => {
  const { user } = useAuth();
  const [isSideBar, setIsSideBar] = useState(false);
  const toggleSidebar = () => {
    setIsSideBar((prev) => !prev);
  };
  return (
    <>
      <div
        className="flex items-center justify-around w-24 border border-gray-200 p-2 rounded-full md:hidden"
        onClick={toggleSidebar}
      >
        {isSideBar ? <X size={24} /> : <Menu size={24} />}

        {user?.photoURL ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={user?.photoURL}
              alt="user photo"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <UserRound size={24} />
        )}
      </div>
      <div className="absolute left-0 top-0 w-5/12 h-screen"> 
        {isSideBar && <HamburgerSidebar />}
      </div>
    </>
  );
};

export default HamburgerButton;
