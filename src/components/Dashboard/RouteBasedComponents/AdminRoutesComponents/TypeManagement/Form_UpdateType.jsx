import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../../../../shared/InputField/InputField";
import { CloudUpload, Shapes } from "lucide-react";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { imageUpload } from "../../../../../utils/utilities";
import { FaListAlt, FaTags } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";



const Form_UpdateType = ({
  handleUpdateTypeModal,
  refetch,
  typeToEdit,
}) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    // reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [uploadedTypePhoto, setUploadedTypePhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const typePhoto = watch("typePhoto");

   useEffect(() => {
    // This check ensures we only try to set values once the data is available
    if (typeToEdit) {
      // Set value for Type Name (text input)
      setValue('typeName', typeToEdit.typeName || '', {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Set value for Status (select input)
      setValue('status', typeToEdit.status || 'inactive', {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Set the existing photo URL for state management (optional, for preview/logic)
      setUploadedTypePhoto(typeToEdit.typeImage || null);
    }
  }, [typeToEdit, setValue]); // Dependencies ensure this runs when data is ready


 

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
    const typeData = {
      typeName: data.typeName,
      typeImage: uploadedTypePhoto,
      typeStatus: data.status,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/types/update-type/${typeToEdit._id}`,
        typeData
      );
      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: "Type Info Updated!",
          timer: 1000,
        });
        refetch();
        handleUpdateTypeModal();
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

  if (isSubmitting || !typeToEdit) return <LoadingSpinner />;
  console.log(typeToEdit.typeName)

  return (
       <>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type Name Field ----------------*/}
          <InputField
            label="Type Name"
            name="typeName"
            type="text"
            icon={FaTags}
            placeholder="Enter type name"           
            register={register}
            errors={errors}
            validationRules={{
              required: "Type Name is required",
              minLength: {
                value: 3,
                message: "Type Name must be at least 3 characters long",
              },
            }}
          />

          {/* Status Field ---------------- */}
          <InputField
            label="Status"
            name="status"
            type="select"
            icon={FaListAlt}
            placeholder="---Select type status"
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

          {/* Type Image Field ---------------- */}
          <InputField
            label=""
            name="typePhoto"
            type="file"
            placeholder="Select your type photo"
            icon={CloudUpload}
            register={register}
            errors={errors}
            validationRules={{
              required: "Type photo is required",
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
              onClick={handleUpdateTypeModal}
              className="btn btn-outline hover:bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success text-white">
              {uploadingPhoto ? (
                <h2>Photo uploading ...</h2>
              ) : (
                "Update Type"
              )}
            </button>
          </div>
        </form>
       </>
  );
};

export default Form_UpdateType;
