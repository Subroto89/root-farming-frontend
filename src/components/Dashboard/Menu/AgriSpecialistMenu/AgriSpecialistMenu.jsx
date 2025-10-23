import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";
import { House, MessageCircleMore, Users } from "lucide-react";

const AgriSpecialistMenu = () => {
   return (
      <>
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
      </>
   );
};

export default AgriSpecialistMenu;
