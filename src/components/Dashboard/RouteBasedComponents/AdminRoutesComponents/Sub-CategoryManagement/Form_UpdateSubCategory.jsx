import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../../../../shared/InputField/InputField";
import { CloudUpload, Shapes } from "lucide-react";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { imageUpload } from "../../../../../utils/utilities";
import { FaListAlt, FaTags } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";


const Form_UpdateSubCategory = ({
  handleUpdateSubCategoryModal,
  refetch,
  subCategoryToEdit,
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

  const [uploadedSubCategoryPhoto, setUploadedSubCategoryPhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const subCategoryPhoto = watch("subCategoryPhoto");

   useEffect(() => {
    // This check ensures we only try to set values once the data is available
    if (subCategoryToEdit) {
      // Set value for Type Name (text input)
      setValue('subCategoryName', subCategoryToEdit.subCategoryName || '', {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Set value for Status (select input)
      setValue('subCategoryStatus', subCategoryToEdit.subCategoryStatus || 'inactive', {
        shouldValidate: true,
        shouldDirty: true,
      });

      setUploadedSubCategoryPhoto(subCategoryToEdit.subCategoryPhoto || null);
    }
  }, [subCategoryToEdit, setValue]);


 

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
    const subCategoryData = {
      subCategoryName: data.subCategoryName,
      subCategoryPhoto: uploadedSubCategoryPhoto,
      subCategoryStatus: data.subCategoryStatus,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/subCategories/update-subCategories/${subCategoryToEdit._id}`,
        subCategoryData
      );
      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: "Type Info Updated!",
          timer: 1000,
        });
        refetch();
        handleUpdateSubCategoryModal();
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
       <>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type Name Field ----------------*/}
          <InputField
            label="Sub-Category Name"
            name="subCategoryName"
            type="text"
            icon={FaTags}
            placeholder="Enter sub-category name"           
            register={register}
            errors={errors}
            validationRules={{
              required: "Sub-Category Name is required",
              minLength: {
                value: 3,
                message: "Sub-Category Name must be at least 3 characters long",
              },
            }}
          />

          {/* Status Field ---------------- */}
          <InputField
            label="Status"
            name="subCategoryStatus"
            type="select"
            icon={FaListAlt}
            placeholder="---Select sub-category status"
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
            name="subCategoryPhoto"
            type="file"
            placeholder="Select your sub-category photo"
            icon={CloudUpload}
            register={register}
            errors={errors}
            validationRules={{
              required: "Sub-Category photo is required",
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
              onClick={handleUpdateSubCategoryModal}
              className="btn btn-outline hover:bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success text-white">
              {uploadingPhoto ? (
                <h2>Photo uploading ...</h2>
              ) : (
                "Update Sub-Category"
              )}
            </button>
          </div>
        </form>
       </>
  );
};

export default Form_UpdateSubCategory;
