import { useState } from "react";
import OrderManagementDropdown from "./OrderManagementDropdown";
import { ChevronDown, ChevronRight, SquareMenu } from "lucide-react";
import Button from "../../../../shared/Buttons/Button";

const OrderManagementButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }
  return (
    <>
       {/* Order Management Button -----------------  */}
      <div onClick={toggleMenu} className="w-60 flex justify-between items-center">
        <Button
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
