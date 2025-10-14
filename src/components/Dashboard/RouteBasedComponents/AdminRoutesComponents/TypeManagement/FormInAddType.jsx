import { useEffect, useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../../utils/utilities";
import Swal from "sweetalert2";
import { CloudUpload, Shapes } from "lucide-react";
import { PuffLoader } from "react-spinners";
import InputField from "../../../../shared/InputField/InputField";


const FormInAddType = ({ handleTypeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //--------------------------------------------------------------
  //  Necessary State Variables
  // --------------------------------------------------------------
  const [uploadedTypePhoto, setUploadedTypePhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const typePhoto = watch("typePhoto");

  useEffect(() => {
    const uploadFile = async () => {
      if (typePhoto && typePhoto.length > 0) {
        setUploadedTypePhoto(null);
        setPhotoUploadError(null);
        setUploadingPhoto(true);
        try {
          const imageUrl = await imageUpload(typePhoto[0]);
          setUploadedTypePhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedTypePhoto(null);
        } finally {
          setUploadingPhoto(false);
        }
      }
    };
    uploadFile();
  }, [typePhoto]);

const onSubmit = async (data) => {
    data.typePhoto = uploadedTypePhoto;
    data.createdBy = user?.email;

    try {
        // 1. Send the POST request
        const { data: info } = await axiosSecure.post("/product-types/save-product-type", data);

        // 2. Check for successful insertion (backend sends 201 Created and insertedId)
        if (info.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Type Added Successfully",
                timer: 1500,
            });
            // Refresh list and close modal
            refetch();
            handleTypeModal();
        } 
        
    } catch (error) {
        // Axios error handling block
        let errorMessage = "Product type addition failed due to a server error.";
        
        // Check if the error has a response object (meaning it's an HTTP error, not a network error)
        if (error.response) {
            // Check for 409 Conflict or 400 Bad Request statuses
            if (error.response.status === 409 || error.response.status === 400) {
                // The backend sends the specific error message in error.response.data.error
                errorMessage = error.response.data.error || "A product type with this name already exists.";
            } else {
                // Handle other client/server errors (401, 403, 500, etc.)
                errorMessage = `Request failed with status ${error.response.status}.`;
            }
        } else if (error.request) {
            // The request was made but no response was received (e.g., network timeout)
            errorMessage = "No response received from the server. Check your connection.";
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
              label="Product Type Name"
              name="typeName"
              type="text"
              placeholder="Enter the product type name"
              icon={Shapes}
              register={register}
              errors={errors}
              validationRules={{
                required: "Product Type Name is required",
                minLength: {
                  value: 3,
                  message: "Product Type Name must be at least 3 characters long",
                },
              }}
            />

            <InputField
              label=""
              name="typePhoto"
              type="file"
              placeholder="Select the product type photo"
              icon={CloudUpload}
              register={register}
              errors={errors}
              validationRules={{
                required: "Product type photo is required",
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
            {uploadedTypePhoto ? (
              <img
                src={uploadedTypePhoto}
                alt="Product Type Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-2">
                {uploadingPhoto ? (
                  <PuffLoader size={56} />
                ) : (
                  <Shapes size={40} />
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
              "Add Product Type"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInAddType;
