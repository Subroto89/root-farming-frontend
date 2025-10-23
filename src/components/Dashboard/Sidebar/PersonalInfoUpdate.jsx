import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils/utilities";
import { FaEnvelope, FaUpload, FaUser, FaUserEdit } from "react-icons/fa";
import { BounceLoader, PuffLoader } from "react-spinners";
import InputField from "../../shared/InputField/InputField";

const PersonalInfoUpdateForm = () => {
  const { user, loading, setLoading, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadedUserPhoto, setUploadedUserPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const profilePhotoFile = watch("profilePhoto");

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/users/get-user-profile/${user.email}`
        );
        setUploadedUserPhoto(data.profilePhotoUrl || user.photoURL || null);
        reset({
          fullName: data.userName || user.displayName || "",
          userEmail: data.userEmail || user.email || "",
          phoneNumber: data.userPhone || "",
        });
      } catch {
        Swal.fire("Error", "Failed to load profile data.", "error");
      } finally {
        setIsFetchingInitialData(false);
      }
    };
    if (user?.email && !loading) fetchAndSetUserData();
  }, ["user?.email"]);

  useEffect(() => {
    const uploadFile = async () => {
      if (profilePhotoFile && profilePhotoFile.length > 0) {
        const file = profilePhotoFile[0];
        setPhotoUploadError(null);
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type))
          return setPhotoUploadError(
            "Only JPEG, PNG, and GIF files are allowed."
          );
        if (file.size > 2 * 1024 * 1024)
          return setPhotoUploadError("File size must be less than 2MB.");
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(file);
          setUploadedUserPhoto(imageUrl);
          Swal.fire({
            icon: "success",
            title: "Photo Uploaded!",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch {
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedUserPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [profilePhotoFile]);

  const onSubmit = async (data) => {
    if (uploadingPhoto)
      return Swal.fire(
        "Please Wait",
        "Profile photo is still uploading.",
        "info"
      );
    if (photoUploadError)
      return Swal.fire(
        "Error",
        "Fix the photo upload error before saving.",
        "error"
      );
    try {
      const res = await axiosSecure.patch(
        `/users/update-user-profile/${user.email}`,
        {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          profilePhotoUrl: uploadedUserPhoto,
        }
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
        await updateUserProfile({
          displayName: data.fullName,
          photoURL: uploadedUserPhoto,
        });
        setLoading(false);
      } else Swal.fire({ icon: "info", title: "No Changes" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  if (loading || isFetchingInitialData)
    return (
      <div className="flex justify-center items-center h-40">
        <BounceLoader />
      </div>
    );

  return (
    <div>
      <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 border-b pb-2">
        <FaUserEdit className="text-blue-500" />
        Personal Information
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              icon={FaUser}
              register={register}
              errors={errors}
              validationRules={{
                required: "Full Name is required",
                minLength: { value: 3, message: "At least 3 characters" },
              }}
            />
            <InputField
              label="User Email"
              name="userEmail"
              type="email"
              readOnly
              placeholder="xyz@gmail.com"
              icon={FaEnvelope}
              register={register}
              errors={errors}
            />
          </div>
          <div className="w-26 h-26 flex items-center justify-center border rounded-md mt-5">
            <div className="w-24 h-24 rounded-md overflow-hidden border-2 flex items-center justify-center">
              {uploadedUserPhoto ? (
                <img
                  src={uploadedUserPhoto}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : uploadingPhoto ? (
                <PuffLoader />
              ) : (
                <FaUser size={50} />
              )}
            </div>
          </div>
        </div>
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          placeholder="e.g., +1234567890"
          icon={FaEnvelope}
          register={register}
          errors={errors}
        />
        <InputField
          label="Profile Photo"
          name="profilePhoto"
          type="file"
          icon={FaUpload}
          register={register}
          errors={errors}
        />
        {photoUploadError && (
          <p className="text-red-500 text-xs mt-1">{photoUploadError}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || uploadingPhoto}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold"
        >
          {isSubmitting ? <BounceLoader size={24} /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoUpdateForm;
