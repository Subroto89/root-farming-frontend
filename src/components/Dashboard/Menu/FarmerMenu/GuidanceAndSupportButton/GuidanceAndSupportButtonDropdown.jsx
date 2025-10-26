import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import { useTheme } from "../../../../../hooks/useTheme";

const GuidanceAndSupportButtonDropdown = () => {
   const {theme} = useTheme();
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
   return (
      <>
         <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start px-1 rounded-lg bg-green-200`}>
            <NavButton
               label="Weather Forecast"
               address="/dashboard/weather-forecast"
               textSize="xs"
            />

            <NavButton
               label="Instructional Guides"
               address="/dashboard/instructional-guides"
               textSize="xs"
            />

            <NavButton 
               label="live-chat" 
               address="/dashboard/live-chat" 
               textSize="xs"
            />
         </div>
      </>
   );
};

export default GuidanceAndSupportButtonDropdown;
