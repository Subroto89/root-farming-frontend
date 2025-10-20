import React, { useState } from "react";
import FinancialsAndCommissionsDropdown from "./FinancialsAndCommissionsDropdown";
import { ChevronDown, ChevronRight, ReceiptText } from "lucide-react";
import Button from "../../../../shared/Buttons/Button";

const FinancialAndCommissionsButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      {/*  Financials and Commissions Button --------------*/}
      <div onClick={toggleMenu} className="flex items-center justify-between space-x-1">
        <Button label="Financials Details" icon={ ReceiptText } />
        {!isMenuOpen ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Financials and Commisions Dropdown ------------- */}
      <div>
        {isMenuOpen && <FinancialsAndCommissionsDropdown />}
      </div>
    </>
  );
};

export default FinancialAndCommissionsButton;
