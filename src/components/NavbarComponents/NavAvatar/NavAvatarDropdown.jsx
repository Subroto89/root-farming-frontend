import useAuth from "../../../hooks/useAuth";
// import NavButton from "../NavButton";
import NavButton2 from "../../shared/Buttons/NavButton2";

const NavAvatarDropdown = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col bg-gray-200 rounded-lg">
        <NavButton2
          label="My Profile"
          address={`/update-profile/${user?.email}`}
        />
        <NavButton2 label="Dashboard"  address="/dashboard" />
      </div>
    </>
  );
};

export default NavAvatarDropdown;
