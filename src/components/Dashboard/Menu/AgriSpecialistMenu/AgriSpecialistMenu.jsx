import NavButton from "../../../shared/Buttons/NavButton";
import { BluetoothSearching, DollarSign, House, MessageCircleMore, Milestone, Rss, Users } from "lucide-react";


const AgriSpecialistMenu = () => {
   
   return (
      <>
         <NavButton
            label="Dashboard Home"
            address="/dashboard"
            icon={House}
         />

         <NavButton
            label="Crop Wise Instruction"
            address="/dashboard/crop-wise-instruction"
            icon={Milestone}
         />
                

         <NavButton
            label="Blogs Management"
            address="/dashboard/blogs-management-byAS"
            icon={Rss}
         />

         <NavButton
            label="Farmer Profiles"
            address="/dashboard/farmers-profiles"
            icon={Users}
         />

          <NavButton
            label="Chat with Farmers"
            address="/dashboard/chat-with-farmers"
            icon={MessageCircleMore}
         />
         

         <NavButton
            label="My Earnings"
            address="/dashboard/my-earnings"
            icon={DollarSign}

         />

</>
   );
};

export default AgriSpecialistMenu;
