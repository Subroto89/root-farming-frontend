import { useTheme } from "../../../../../hooks/useTheme";
import NavButton from "../../../../shared/Buttons/NavButton";

const MyOrdersDropdown = () => {
  const {theme} = useTheme();
  const dropDownStyle = theme === 'dark' ? 'navbar-dark' : 'navbar-light';
  return (
    <>
      <div className={`${dropDownStyle} flex flex-col items-start border-t border-b border-gray-300 bg-green-100`}>
        <NavButton
            label="Track Current Orders"
            address="track-current-orders"
        />

        <NavButton
            label="Order History & Receipts"
            address="order-hisotry-receipts"
        />

        <NavButton
            label="Initiate Returns"
            address="initiate-returns"
        />
      </div>
    </>
  );
};

export default MyOrdersDropdown;
