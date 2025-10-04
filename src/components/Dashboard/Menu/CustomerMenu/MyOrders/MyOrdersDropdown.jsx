import NavButton from "../../../../shared/Buttons/NavButton";

const MyOrdersDropdown = () => {
  return (
    <>
      <div className='flex flex-col items-start px-1 rounded-lg bg-green-200 ml-8 border border-white'>
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
