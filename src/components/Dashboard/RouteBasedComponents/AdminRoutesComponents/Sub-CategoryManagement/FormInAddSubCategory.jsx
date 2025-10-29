import { useEffect, useState } from "react";
import {useAuth} from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../../utils/utilities";
import Swal from "sweetalert2";
import { CloudUpload, FileType, Shapes } from "lucide-react";
import { PuffLoader } from "react-spinners";
import InputField from "../../../../shared/InputField/InputField";

const FormInAddSubCategory = ({ handleModalToggle, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //--------------------------------------------------------------
  //  Necessary State Variables
  // --------------------------------------------------------------
  const [uploadedSubCategoryPhoto, setUploadedSubCategoryPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const subCategoryPhoto = watch("subCategoryPhoto");

  useEffect(() => {
    const uploadFile = async () => {
      if (subCategoryPhoto && subCategoryPhoto.length > 0) {
        setUploadedSubCategoryPhoto(null);
        setPhotoUploadError(null);
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(subCategoryPhoto[0]);
          setUploadedSubCategoryPhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedSubCategoryPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [subCategoryPhoto]);

  const onSubmit = async (data) => {
    data.subCategoryPhoto = uploadedSubCategoryPhoto;
    data.createdBy = user?.email;

    try {
      // 1. Send the POST request
      const { data: info } = await axiosSecure.post(
        "/subcategories/save-subcategory",
        data
      );

      // 2. Check for successful insertion (backend sends 201 Created and insertedId)
      if (info.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product Sub-category Added Successfully",
          timer: 1500,
        });
        // Refresh list and close modal
        refetch();
        handleModalToggle();
      }
    } catch (error) {
      let errorMessage = "Product sub-category addition failed due to a server error.";

      if (error.response) {
        if (error.response.status === 409 || error.response.status === 400) {
          errorMessage =
            error.response.data.error ||
            "A product sub-category with this name already exists.";
        } else {
          errorMessage = `Request failed with status ${error.response.status}.`;
        }
      } else if (error.request) {
        errorMessage =
          "No response received from the server. Check your connection.";
      }

      console.error("API Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="mx-8">
      <form
        className="flex flex-col gap-3 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-3">
          <div className=" space-y-3">
            <InputField
              label="Product Sub-Category Name"
              name="subCategoryName"
              type="text"
              placeholder="Enter the product sub-category name"
              icon={FileType}
              register={register}
              errors={errors}
              validationRules={{
                required: "Product sub-category Name is Required",
                minLength: {
                  value: 3,
                  message:
                    "Product sub=category Name must be at least 3 characters long",
                },
              }}
            />

            <InputField
              label=""
              name="subCategoryPhoto"
              type="file"
              placeholder="Select the product sub-category photo"
              icon={CloudUpload}
              register={register}
              errors={errors}
              validationRules={{
                required: "Product sub-category photo is required",
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
            {photoUploadError && (
              <p className="text-red-500 text-sm">{photoUploadError}</p>
            )}
          </div>

          <div className="w-28 h-24 rounded-md overflow-hidden border-2 border-gray-300 mb-1 mt-5 flex items-center justify-end">
            {uploadedSubCategoryPhoto ? (
              <img
                src={uploadedSubCategoryPhoto}
                alt="Product Sub-Category Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-2">
                {uploadingPhoto ? (
                  <PuffLoader size={56} />
                ) : (
                  <FileType size={40} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------------
                Action Button For Adding Product Sub-Category & Cancel Button
        -------------------------------------------------------------- */}

        <div>
          <button
            disabled={isSubmitting || uploadingPhoto}
            type="submit"
            className="btn bg-green-500 rounded-lg w-full"
          >
            {uploadingPhoto ? (
              <h2 className="text-green-500">Photo Uploading ...</h2>
            ) : (
              "Add Product Sub-Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInAddSubCategory;
