import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../../../../shared/InputField/InputField";
import { CloudUpload, Shapes } from "lucide-react";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { imageUpload } from "../../../../../utils/utilities";
import { FaListAlt, FaTags } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";

// import { FaImage, FaTag, FaListAlt } from "react-icons/fa";

const UpdateCategoryModal = ({
  handleUpdateCategoryModal,
  refetch,
  categoryToEdit,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [uploadedCategoryPhoto, setUploadedCategoryPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const categoryPhoto = watch("categoryPhoto");

  //-------------------------------------------------------------------------
  //   Image Uploade Function - Depends on the profilePhotoFile
  //------------------------------------------------------------------------

  useEffect(() => {
    const uploadFile = async () => {
      if (categoryPhoto && categoryPhoto.length > 0) {
        setUploadedCategoryPhoto(null);
        setPhotoUploadError(null);
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(categoryPhoto[0]);
          setUploadedCategoryPhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedCategoryPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [categoryPhoto]);

  const onSubmit = async (data) => {
    const categoryData = {
      categoryName: data.categoryName,
      categoryImage: uploadedCategoryPhoto,
      categoryStatus: data.status,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/categories/update-category/${categoryToEdit._id}`,
        categoryData
      );
      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: "Category Info Updated!",
          timer: 1000,
        });
        refetch();
        handleUpdateCategoryModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Error Occured, Not Updated!",
          timer: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isSubmitting) return <LoadingSpinner />;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg w-[400px] md:w-[500px] p-6 text-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Category: {categoryToEdit.categoryName}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Name Field ----------------*/}
          <InputField
            label="Category Name"
            name="categoryName"
            type="text"
            icon={FaTags}
            placeholder="Enter category name"
            setValue={"newName"}
            register={register}
            errors={errors}
            validationRules={{
              required: "Category Name is required",
              minLength: {
                value: 3,
                message: "Category Name must be at least 3 characters long",
              },
            }}
          />

          {/* Status Field ---------------- */}
          <InputField
            label="Status"
            name="status"
            type="select"
            icon={FaListAlt}
            placeholder="---Select category status"
            register={register}
            errors={errors}
            validationRules={{
              required: "Status is required",
            }}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />

          {/* Category Image Field ---------------- */}
          <InputField
            label=""
            name="categoryPhoto"
            type="file"
            placeholder="Select your category photo"
            icon={CloudUpload}
            register={register}
            errors={errors}
            validationRules={{
              required: "Category photo is required",
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
          <p className="text-red-500 text-sm">{photoUploadError}</p>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleUpdateCategoryModal}
              className="btn btn-outline hover:bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success text-white">
              {uploadingPhoto ? (
                <h2>Photo uploading ...</h2>
              ) : (
                "Update Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
