import { useState } from "react";
import NavButton from "../../../../shared/Buttons/NavButton";
import OrderManagementDropdown from "./OrderManagementDropdown";
import { ChevronDown, ChevronRight, SquareMenu } from "lucide-react";

const OrderManagementButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }
  return (
    <>
       {/* Order Management Button -----------------  */}
      <div onClick={toggleMenu} className="flex justify-between items-center space-x-1">
        <NavButton
            label="Order Management"
            icon={SquareMenu}
        />
        {!isMenuOpen ? <ChevronRight size={18}/> : <ChevronDown size={18}/>}
      </div>

      {/* Order Management Dropdown ----------------- */}
      <div>
       {
        isMenuOpen && (
          <OrderManagementDropdown/>
        )
       }
      </div>
    </>
  );
};

export default OrderManagementButton;
