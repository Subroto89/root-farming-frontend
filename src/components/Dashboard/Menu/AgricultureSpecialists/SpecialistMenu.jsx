import { MessageCircleMore } from "lucide-react";
import React from "react";
import NavButton from "../../../shared/Buttons/NavButton";

const SpecialistMenu = () => {
   return (
      <>
         <div>
            <NavButton
               label="Farmers Messaging"
               address="/dashboard/specialist-chat"
               icon={MessageCircleMore}
            />
         </div>
      </>
   );
};

export default SpecialistMenu;
