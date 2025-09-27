import useAuth from "../../hooks/useAuth";
import NavMenuButton from "./NavButton";

const NavAvatarDropdown = () => {
  const { user } = useAuth();

  return (
    <>
      <div>
        <NavMenuButton
          label="Update Profile"
          address={`/update-profile/${user?.email}`}
        />
        <NavMenuButton label="Dashboard"  address="/dashboard" />
      </div>
    </>
  );
};

export default NavAvatarDropdown;
