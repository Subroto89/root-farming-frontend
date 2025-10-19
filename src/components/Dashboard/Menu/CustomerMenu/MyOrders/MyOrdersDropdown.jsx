import { useTheme } from "../../../../../hooks/useTheme";
import NavButton from "../../../../shared/Buttons/NavButton";

const MyOrdersDropdown = () => {
  const {theme} = useTheme();
  const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  return (
    <>
      <div className={`${themeForegroundStyle} pl-6 flex flex-col items-start border-t border-b border-gray-300 bg-green-100`}>
        <NavButton
            label="Track Current Orders"
            address="track-current-orders"
            textSize="xs"
        />

        <NavButton
            label="Order History & Receipts"
            address="order-hisotry-receipts"
            textSize="xs"
        />

        <NavButton
            label="Initiate Returns"
            address="initiate-returns"
            textSize="xs"
        />
      </div>
    </>
  );
};

export default MyOrdersDropdown;
