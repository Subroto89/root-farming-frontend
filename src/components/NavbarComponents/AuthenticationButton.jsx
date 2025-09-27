import useAuth from "../../hooks/useAuth";
import NavMenuButton from "./NavButton";

const AuthenticationButton = () => {
    const { user, logOutUser } = useAuth();
    return (
    <>
      <div>
        {user ? (
          <NavMenuButton label="Logout" onClick={logOutUser} />
        ) : (
          <NavMenuButton label="Sign In" address="/auth" />
        )}
      </div>
    </>
  );
};

export default AuthenticationButton;
