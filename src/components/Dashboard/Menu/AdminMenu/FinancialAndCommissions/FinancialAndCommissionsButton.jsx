import React, { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import FinancialsAndCommissionsDropdown from "./FinancialsAndCommissionsDropdown";
import { ChevronDown, ChevronRight, ReceiptText } from "lucide-react";

const FinancialAndCommissionsButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/*  Financials and Commissions Button --------------*/}
      <div onClick={toggleMenu} className="flex items-center justify-between space-x-1">
        <NavButton label="Financials & Commissions" icon={ ReceiptText } />

        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Financials and Commisions Dropdown ------------- */}
      <div>{isMenuOpen && <FinancialsAndCommissionsDropdown />}</div>
    </>
  );
};

export default FinancialAndCommissionsButton;
