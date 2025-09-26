import { FaGithub } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { saveUserToDatabase } from "../../../utils/utilities";

const GithubLogin = () => {
  const { gitHubSignInUser } = useAuth();
  const navigate = useNavigate();

  const handleGithubSignIn = async () => {
    try {
      // Step 1: SignIn With Github --------------------------------
      const { user } = await gitHubSignInUser;
      if (user.uid) {
        Swal.fire({
          icon: "success",
          title: "You are signedIn successfully!",
          text: `Welcome, ${user.displayName}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        // Step 2: Save/Update User Data To Database ---------------
        const userData = {
        userName: user?.displayName,
        userEmail: user?.email,
        userPhoto: user?.photoURL,
        userRole: "user"
        };
        saveUserToDatabase(userData);
      } else {
        throw new Error("Signing In failed!");
      }
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
      });
    }
  };
  return (
    <div className="w-full">
      <button
        onClick={handleGithubSignIn}
        className="btn bg-white text-black border-[#e5e5e5] shadow-lg w-full"
      >
        <FaGithub className="text-blue-800" />
        Continue with Github
      </button>
    </div>
  );
};

export default GithubLogin;