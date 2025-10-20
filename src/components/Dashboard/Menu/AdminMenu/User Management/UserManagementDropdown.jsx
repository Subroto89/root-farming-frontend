import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import { useTheme } from "../../../../../hooks/useTheme";

const UserManagementDropdown = () => {
  const { theme } = useTheme();
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  return (
    <>
      <div
        className={`${themeForegroundStyle} pl-6 flex flex-col items-start border-t border-b border-gray-300`}
      >
        <NavButton 
          label="Manage Farmers" 
          address="/dashboard/manage-farmers"
          textSize="xs"
        />

        <NavButton 
          label="Manage Sellers" 
          address="/dashboard/manage-sellers" 
          textSize="xs"
        />

        <NavButton
          label="Manage Customers"
          address="/dashboard/manage-customers"
          textSize="xs"
        />

        <NavButton
          label="Manage Agri Specialists"
          address="/dashboard/manage-agri-specialists"
          textSize="xs"
        />
      </div>
    </>
  );
};

export default UserManagementDropdown;
