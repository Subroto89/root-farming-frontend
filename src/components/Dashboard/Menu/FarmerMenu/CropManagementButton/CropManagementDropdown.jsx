import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import { useTheme } from "../../../../../hooks/useTheme";

const CropManagementDropdown = () => {
   const { theme } = useTheme();
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   return (
      <>
         <div
            className={`${themeForegroundStyle} pl-6 flex flex-col items-start px-1 rounded-lg bg-green-200`}
         >
            <NavButton
               label="Start New Crop"
               address="/dashboard/new-crop"
               textSize="xs"
            />

            {/* <NavButton
                    label="Active Crops Progress"
                    address="/dashboard/active-crops-progress"
                    textSize="xs"
                /> */}

            <NavButton
               label="Agri Specialist Instructions"
               address="/dashboard/all-instructions"
               textSize="xs"
            />

            {/*  <NavButton
                    label="Set Upcoming Activities"
                    address="/dashboard/set-upcoming-activities"
                    textSize="xs"
                /> */}
         </div>
      </>
   );
};

export default CropManagementDropdown;
