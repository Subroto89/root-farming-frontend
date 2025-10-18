import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../../../../shared/InputField/InputField";
import { CloudUpload, Shapes } from "lucide-react";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { imageUpload } from "../../../../../utils/utilities";
import { FaListAlt, FaTags } from "react-icons/fa";
import LoadingSpinner from "../../../../shared/LoadingSpinner";

const UpdateTypeModal = ({
  handleUpdateTypeModal,
  refetch,
  typeToEdit,
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

  const [uploadedTypePhoto, setUploadedTypePhoto] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const typePhoto = watch("typePhoto");

  //-------------------------------------------------------------------------
  //   Image Upload Function - Depends on the typePhotoFile
  //------------------------------------------------------------------------

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
        `/product-types/update-product-type/${typeToEdit._id}`,
        typeData
      );
      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: "Product Type Info Updated!",
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

  if (isSubmitting) return <LoadingSpinner />;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg w-[400px] md:w-[500px] p-6 text-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Product Type: {typeToEdit.typeName}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type Name Field ----------------*/}
          <InputField
            label="Product Type Name"
            name="typeName"
            type="text"
            icon={FaTags}
            placeholder="Enter product type name"
            setValue={"newName"}
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

          {/* Status Field ---------------- */}
          <InputField
            label="Status"
            name="status"
            type="select"
            icon={FaListAlt}
            placeholder="---Select product type status"
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
            placeholder="Select your product type photo"
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
                "Update Product Type"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTypeModal;
