// ----------------------------------------------------------------------------------
// React Icons, Puffloader, Input Fields Imported - Used In the Register Form Fields
// ----------------------------------------------------------------------------------
import {
  FaEnvelope,
  FaLock,
  FaUpload,
  FaUser,
  FaUserTag,
} from "react-icons/fa";

import { PuffLoader, BounceLoader } from "react-spinners";
import { GiArchiveRegister } from "react-icons/gi";
import InputField from "../InputField/InputField";

// ---------------------------------------------------------------------------
// RegisterForm Component - Used In the Register Page
// ---------------------------------------------------------------------------
const RegisterForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  password,
  uploadedUserPhoto,
  uploadingPhoto,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-1">
          {/*-----------------------------------------------------------------------------------
            User Photo Viewer Field
         ----------------------------------------------------------------------------------- */}
          <div className="absolute right-2 top-6 w-20 h-24  rounded-md overflow-hidden border-2 border-gray-300 mb-1 flex items-center justify-end ">
            {uploadedUserPhoto ? (
              <img
                src={uploadedUserPhoto}
                alt="User Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-2">
                {uploadingPhoto ? (
                  <PuffLoader size={56} />
                ) : (
                  <FaUser size={56} />
                )}
              </div>
            )}
          </div>

          <div className="w-9/12 md:w-10/12  ">
            {/*-----------------------------------------------------------------------------------
            User Name Field
            ----------------------------------------------------------------------------------- */}
            <div className="mb-2 mr-4">
              <InputField
                label="User Name"
                name="userName"
                type="text"
                placeholder="Enter your user name"
                icon={FaUser}
                register={register}
                errors={errors}
                validationRules={{
                  required: "User Name is required",
                  minLength: {
                    value: 3,
                    message: "User Name must be at least 3 characters long",
                  },
                }}
              />
            </div>
            {/*-----------------------------------------------------------------------------------
            User Email Field
            ----------------------------------------------------------------------------------- */}
            <div className="mr-4">
              
  
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
            />
          </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            {/*-----------------------------------------------------------------------------------
            Password Field
            ----------------------------------------------------------------------------------- */}
            <div className="flex-1">
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]).{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                  },
                }}
              />
            </div>

            {/*-----------------------------------------------------------------------------------
            Re-Type Password Field
            ----------------------------------------------------------------------------------- */}

            <div className="flex-1">
              <InputField
                label="Confirm Password"
                name="reTypePassword"
                type="password"
                placeholder="Confirm Password"
                icon={FaLock}
                register={register}
                errors={errors}
                validationRules={{
                  required: "Please re-type your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
              />
            </div>
          </div>

          {/*-----------------------------------------------------------------------------------
            Role Selection Field
            ----------------------------------------------------------------------------------- */}
          <div className="flex justify-between gap-4 mt-2">
            <div className="w-[50%]">
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Role
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserTag className="h-5 w-5" aria-hidden="true" />
                </div>
                <select
                  id="role"
                  {...register("role", {
                    required: "Role is required",
                  })}
                  className={`
                block w-full pl-10 pr-3 py-2 border rounded-md bg-[#536258] cursor-pointer text-white
                focus:outline-none 
                sm:text-sm
                ${errors.role ? "border-red-500" : "border-gray-300"}
            `}
                  aria-invalid={errors.role ? "true" : "false"}
                  aria-describedby="role-error"
                >
                  <option value="">Select a role</option>
                  <option value="farmer">Farmer</option>
                  <option value="Agri-Specialist">Agri-Specialist</option>
                  <option value="seller">Seller</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              {errors.role && (
                <p id="role-error" className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="w-[50%]">
              <InputField
                label="Upload Photo"
                name="profilePhoto"
                type="file"
                placeholder="Select your profile photo"
                icon={FaUpload}
                register={register}
                errors={errors}
                validationRules={{
                  required: "Profile photo is required",
                  validate: (value) => {
                    if (value.length === 0) return "Please upload a photo";
                    const file = value[0];
                    const validTypes = ["image/jpeg", "image/png", "image/gif"];
                    if (!validTypes.includes(file.type)) {
                      return "Only JPEG, PNG, and GIF files are allowed";
                    }
                    if (file.size > 2 * 1024 * 1024) {
                      return "File size must be less than 2MB";
                    }
                    return true;
                  },
                }}
              />
            </div>
          </div>

          {/*-----------------------------------------------------------------------------------
            User Photo Upload Field
            ----------------------------------------------------------------------------------- */}

          <div className="flex items-center gap-4 mt-2">
            {/*-----------------------------------------------------------------------------------
            Submit Button
            ----------------------------------------------------------------------------------- */}
            <button
              type="submit"
              disabled={isSubmitting || uploadingPhoto}
              className="group w-full p-2 cursor-pointer rounded-lg  border border-white/40 bg-white/10 text-white
               hover:bg-[#3E4B24]/60 hover:text-white flex justify-center  transition-colors duration-300 backdrop-blur-md"
            >
              {isSubmitting ? (
                <BounceLoader size={24} />
              ) : (
                <p className="flex items-center gap-2">
                  Register{" "}
                  <GiArchiveRegister
                    className="transition-transform duration-300 group-hover:translate-x-2"
                    size={26}
                  />{" "}
                </p>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
