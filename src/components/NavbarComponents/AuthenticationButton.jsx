import useAuth from "../../hooks/useAuth";
import NavButton2 from "../shared/Buttons/NavButton2";

const AuthenticationButton = () => {
    const { user, logOutUser } = useAuth();
    return (
    <>
      <div>
        {user ? (
          <NavButton2 label="Logout" onClick={logOutUser} />
        ) : (
          <NavButton2 label="Sign In" address="/auth" />
        )}
      </div>
    </>
  );
};

export default AuthenticationButton;
