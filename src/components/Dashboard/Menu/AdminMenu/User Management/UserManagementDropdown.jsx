import React from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import { useTheme } from "../../../../../hooks/useTheme";

const UserManagementDropdown = () => {
  const { theme } = useTheme();
  const dropDownStyle = theme === "dark" ? "navbar-dark" : "navbar-light";
  return (
    <>
      <div
        className={`${dropDownStyle} flex flex-col items-start border-t border-b border-gray-300`}
      >
        <NavButton label="Manage Farmers" address="/dashboard/manage-farmers" />

        <NavButton label="Manage Sellers" address="/dashboard/manage-sellers" />

        <NavButton
          label="Manage Customers"
          address="/dashboard/manage-customers"
        />

        <NavButton
          label="Manage Agri Specialists"
          address="/dashboard/manage-agri-specialists"
        />
      </div>
    </>
  );
};

export default UserManagementDropdown;
