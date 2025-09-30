import NavButton from '../../../shared/Buttons/NavButton';
import LandManagementButton from './LandManagementButton/LandManagementButton';
import CropManagementButton from './CropManagementButton/CropManagementButton';
import GuidanceAndSupportButton from './GuidanceAndSupportButton/GuidanceAndSupportButton';

const FarmerMenu = () => {
    return (
        <>
            <div>
                <NavButton
                    label="Dashboard Home"
                    address="/dashboard/farmer-dashboard-home"
                />

                <LandManagementButton/>

                
                <NavButton
                    label="Resource Management"
                    address="/dashboard/resource-management"
                />

                <CropManagementButton/>

                <GuidanceAndSupportButton/>

                <NavButton
                    label="Government Info"
                    address="/dashboard/government-info"
                />
                
            </div>
        </>
    );
};

export default FarmerMenu;