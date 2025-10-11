import useAuth from "../../../hooks/useAuth";
import NavButton from "../../shared/Buttons/NavButton";


const NavAvatarDropdown = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col bg-gray-200 rounded-lg">
        <NavButton
          label="My Profile"
          address={`/update-profile/${user?.email}`}
        />
        <NavButton label="Dashboard"  address="/dashboard" />
      </div>
    </>
  );
};

export default NavAvatarDropdown;
