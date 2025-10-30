import NavButton from "../../../shared/Buttons/NavButton";
import LandManagementButton from "./LandManagementButton/LandManagementButton";
import CropManagementButton from "./CropManagementButton/CropManagementButton";
import GuidanceAndSupportButton from "./GuidanceAndSupportButton/GuidanceAndSupportButton";
import {
   Boxes,
   House,
   MessageCircle,
   MessageCircleDashedIcon,
   MessageCircleIcon,
   MessageCircleQuestionMark,
} from "lucide-react";

const FarmerMenu = () => {
  return (
    <>
      <div>
        <NavButton
          label="Dashboard Home"
          address="/dashboard/farmer-dashboard-home"
          icon={House}
        />

        <LandManagementButton />

        <NavButton
          label="Activity Route"
          address="/dashboard/ActivityRoute"
          icon={Boxes}
        />


        <NavButton
          label="Resource Management"
          address="/dashboard/resource-management"
          icon={Boxes}
        />


        <CropManagementButton />

        <NavButton
          label="My Cultivations"
          address="/dashboard/my-cultivations"
          icon={Boxes}
        />

        <NavButton
          label="New Cultivation"
          address="/dashboard/new-cultivation-request"
          icon={Boxes}
        />

        <GuidanceAndSupportButton />

        <NavButton
          label="Government Info"
          address="/dashboard/government-info"
          icon={MessageCircleQuestionMark}
        />

        <NavButton
          label="Chat Bot"
          address="/dashboard/chat-bot"
          icon={MessageCircleDashedIcon}
        />
      </div>
    </>
  );
};

export default FarmerMenu;
