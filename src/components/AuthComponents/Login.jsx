import InputField from "../shared/InputField/InputField";
import { useForm } from "react-hook-form";
import { GoPasskeyFill } from "react-icons/go";
import { FaEnvelope, FaGoogle, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { BounceLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Icon } from "lucide-react";
import { useRef } from "react";
import { auth } from "../../firebase/firebase.confiq";
import GoogleLogin from "../shared/SocialLogin/GoogleLogin";
import GithubLogin from "../shared/SocialLogin/GithubLogin";
// import {saveUserToDatabase, TabTitle} from "../../utils/utilities";

const Login = () => {
  // TabTitle('JoinUs');
  const { signInUser, userPasswordReset } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  
  const destination = location.state || '/'
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Step 1: SignIn -----------------------------------------------
      const { user } = await signInUser(data.userEmail, data.password);
      
      if (user?.uid) {
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user?.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        // Step 2: Update User Data In The Database --------------------
        // const userData = {
        //   userEmail : user?.email
        // }
        // saveUserToDatabase(userData);


        // Step 3: Redirect after confirmation -------------------------
        navigate(destination);
      } else {
        throw new Error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error.message || error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Please check your credentials.",
      });
    }
  };

  const handleForgetPassword = (e) => {
      e.preventDefault();
      // Step 1: Get the email from the input field
      const email = emailRef.current.value;
      // Step 2: Validate the email
      if(!email){
        Swal.fire({
          icon: "error",
          title: "Email Required",
          text: "Please enter your email address to reset your password.",
        });
        return;
      } 
      // Step 3: Send password reset email
      userPasswordReset(auth, email)
      .then(() => {
          Swal.fire({
            icon: "success",
            title: "Email Sent",
            text: "Password reset email has been sent. Please check your inbox.",
          });
      }).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Reset Failed",
            text: error.message || "Failed to send password reset email.",
          });
      })
    }

  return (
    <div>
      <div className="border border-white rounded-lg shadowlg m-4 p-4 bg-gradient-to-bl from-[#1F5591] to-[#80A5AB] opacity-70">
        {/*-----------------------------------------------------------------------------------
            Login Text and Symbol
            ----------------------------------------------------------------------------------- */}
        <div className="flex items-center gap-4">
          <GoPasskeyFill size={60} />
          <h2 className="text-4xl font-bold mb-8 pt-6">Login</h2>
        </div>
        {/*-----------------------------------------------------------------------------------
            Login Form Section
            ----------------------------------------------------------------------------------- */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/*-----------------------------------------------------------------------------------
            User Email Field
            ----------------------------------------------------------------------------------- */}

            <InputField
              label="User Email"
              name="userEmail"
              type="email"
              placeholder="xyz@gmail.com"
              icon={FaEnvelope}
              register={register}
              errors={errors}
              validationRules={{
                required: "User Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
               ref={emailRef}
            />

            {/*-----------------------------------------------------------------------------------
            Password Field
            ----------------------------------------------------------------------------------- */}

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={FaLock}
              register={register}
              errors={errors}
              validationRules={{
                required: "Password is required",
                minLength: {
                  value: 8, // Increased for better security
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
          </div>

           {/*-----------------------------------------------------------------------------------
            Forgot Password Section
            ----------------------------------------------------------------------------------- */}
          <div className="text-right mb-4">
            <button onClick={handleForgetPassword}>
              <span className="text-white text-xs link"> Forgot Password?</span>
            </button>
          </div>
          {/* -----------------------------------------------------------
            SignIn Button Section
            ----------------------------------------------------------- */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`border border-gray-300 rounded-lg ${
                Icon ? "pl-10" : "pl-4"
                } p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors[name] ? "border-red-500" : "border-gray-300 mt-4 hover:bg-green-300 hover:text-blue-600 flex justify-center"
                }`}          >
            {isSubmitting ? (
              <BounceLoader size={20} />
            ) : (
              <span className="flex items-center gap-4">
                <FaSignInAlt size={20} /> SignIn
              </span>
            )}
          </button>
        </form>
        <div className="divider px-20 flex justify-center">OR</div>

        {/* -----------------------------------------------------------
        Google Sign In Section
        ----------------------------------------------------------- */}
        <div className="flex justify-between gap-4">
          <GoogleLogin />
          <GithubLogin />
        </div>
        
        {/* -----------------------------------------------------------
        Don't Have Account Suggestion Section
        ----------------------------------------------------------- */}
        <p className="text-center mt-1">
          Don't have an account?
          <Link to="/auth/register">
            <span className="font-medium link text-white"> Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
