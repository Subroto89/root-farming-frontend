import NavButton from '../../../shared/Buttons/NavButton';
import LandManagementButton from './LandManagementButton/LandManagementButton';
import CropManagementButton from './CropManagementButton/CropManagementButton';
import GuidanceAndSupportButton from './GuidanceAndSupportButton/GuidanceAndSupportButton';
import { Boxes, House, MessageCircleQuestionMark } from 'lucide-react';

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
          label="Resource Management"
          address="/dashboard/resource-management"
          icon={Boxes}
        />

        <CropManagementButton />

        <GuidanceAndSupportButton />

        <NavButton
          label="Government Info"
          address="/dashboard/government-info"
          icon={MessageCircleQuestionMark}
        />
      </div>
    </>
  );
};

export default FarmerMenu;
