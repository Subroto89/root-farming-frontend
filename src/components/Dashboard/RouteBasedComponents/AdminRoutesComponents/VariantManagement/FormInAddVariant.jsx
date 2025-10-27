import { useEffect, useState } from "react";
import {useAuth} from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../../utils/utilities";
import Swal from "sweetalert2";
import { CloudUpload, FileType, Shapes } from "lucide-react";
import { PuffLoader } from "react-spinners";
import InputField from "../../../../shared/InputField/InputField";

const FormInAddVariant = ({ handleModalToggle, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //--------------------------------------------------------------
  //  Necessary State Variables
  // --------------------------------------------------------------
  const [uploadedVariantPhoto, setUploadedVariantPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const variantPhoto = watch("variantPhoto");

  useEffect(() => {
    const uploadFile = async () => {
      if (variantPhoto && variantPhoto.length > 0) {
        setUploadedVariantPhoto(null);
        setPhotoUploadError(null);
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(variantPhoto[0]);
          setUploadedVariantPhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedVariantPhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [variantPhoto]);

  const onSubmit = async (data) => {
      data.variantPhoto = uploadedVariantPhoto;
      data.createdBy = user?.email;
      
      try {
          // 1. Send the POST request
          const { data: info } = await axiosSecure.post(
              "/variants/save-variant",
              data
            );
       

      // 2. Check for successful insertion (backend sends 201 Created and insertedId)
      if (info.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product Variant Added Successfully",
          timer: 1500,
        });
        // Refetch list and close modal
        refetch();
        handleModalToggle();
      }
    } catch (error) {
      let errorMessage = "Product variant addition failed due to a server error.";

      if (error.response) {
        if (error.response.status === 409 || error.response.status === 400) {
          errorMessage =
            error.response.data.error ||
            "A product variant with this name already exists.";
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
              label="Product Variant Name"
              name="variantName"
              type="text"
              placeholder="Enter the product variant name"
              icon={FileType}
              register={register}
              errors={errors}
              validationRules={{
                required: "Product Variant Name is required",
                minLength: {
                  value: 3,
                  message:
                    "Product variant name must be at least 3 characters long",
                },
              }}
            />

            <InputField
              label=""
              name="variantPhoto"
              type="file"
              placeholder="Select the product variant photo"
              icon={CloudUpload}
              register={register}
              errors={errors}
              validationRules={{
                required: "Product variant photo is required",
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
            {uploadedVariantPhoto ? (
              <img
                src={uploadedVariantPhoto}
                alt="Product Variant Photo"
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
                Action Button For Adding Product Type & Cancel Button
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
              "Add Product Variant"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInAddVariant;
