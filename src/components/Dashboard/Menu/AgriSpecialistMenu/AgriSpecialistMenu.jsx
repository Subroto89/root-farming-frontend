import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import { House, MessageCircleMore, Users } from "lucide-react";
import { useTheme } from "../../../../hooks/useTheme";

const AgriSpecialistMenu = () => {
   const { theme } = useTheme();
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";

   return (
      <>
         <div
            className={`${themeForegroundStyle} pl-6 flex flex-col items-start px-1 rounded-lg ${
               theme === "dark" ? "bg-blue-900" : "bg-blue-200"
            }`}
         >
            <NavButton
               label="Dashboard Overview"
               address="/dashboard"
               icon={House}
            />
            <NavButton
               label="Chat with Farmers"
               address="/dashboard/chat-with-farmers"
               icon={MessageCircleMore}
            />
            <NavButton
               label="Farmer Profiles"
               address="/dashboard/farmers-profiles"
               icon={Users}
            />
         </div>
      </>
   );
};

export default AgriSpecialistMenu;
