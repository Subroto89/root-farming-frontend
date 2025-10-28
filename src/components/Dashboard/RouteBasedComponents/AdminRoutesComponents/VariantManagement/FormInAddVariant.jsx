import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../../utils/utilities";
import Swal from "sweetalert2";
import {
   CloudUpload,
   FileType,
   Shapes,
   Package,
   Layers,
   Grid,
} from "lucide-react";
import { PuffLoader } from "react-spinners";
import InputField from "../../../../shared/InputField/InputField";

// Dummy data for dropdowns
const PRODUCT_TYPES = [
   { _id: "type_001", name: "Electronics" },
   { _id: "type_002", name: "Clothing" },
   { _id: "type_003", name: "Home & Garden" },
   { _id: "type_004", name: "Sports & Outdoors" },
   { _id: "type_005", name: "Books & Media" },
];

const PRODUCT_CATEGORIES = [
   { _id: "cat_001", name: "Smartphones" },
   { _id: "cat_002", name: "Laptops" },
   { _id: "cat_003", name: "Tablets" },
   { _id: "cat_004", name: "Accessories" },
   { _id: "cat_005", name: "Wearables" },
];

const PRODUCT_SUBCATEGORIES = [
   { _id: "sub_001", name: "Android Phones" },
   { _id: "sub_002", name: "iOS Devices" },
   { _id: "sub_003", name: "Gaming Laptops" },
   { _id: "sub_004", name: "Business Laptops" },
   { _id: "sub_005", name: "Tablet Cases" },
   { _id: "sub_006", name: "Screen Protectors" },
   { _id: "sub_007", name: "Chargers & Cables" },
   { _id: "sub_008", name: "Smartwatches" },
];

const FormInAddVariant = ({ handleModalToggle, refetch }) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

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
         const { data: info } = await axiosSecure.post(
            "/variants/save-variant",
            data
         );

         if (info.insertedId) {
            Swal.fire({
               icon: "success",
               title: "Success",
               text: "Product Variant Added Successfully",
               timer: 1500,
            });
            refetch();
            handleModalToggle();
         }
      } catch (error) {
         let errorMessage =
            "Product variant addition failed due to a server error.";

         if (error.response) {
            if (
               error.response.status === 409 ||
               error.response.status === 400
            ) {
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
      <div className="px-8 py-6">
         <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="space-y-5">
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
                     label="Product Type"
                     name="productType"
                     type="select"
                     placeholder="Select product type"
                     icon={Package}
                     options={PRODUCT_TYPES}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: "Product type is required",
                     }}
                  />

                  <InputField
                     label="Product Category"
                     name="productCategory"
                     type="select"
                     placeholder="Select product category"
                     icon={Layers}
                     options={PRODUCT_CATEGORIES}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: "Product category is required",
                     }}
                  />

                  <InputField
                     label="Product Sub-Category"
                     name="productSubCategory"
                     type="select"
                     placeholder="Select product sub-category"
                     icon={Grid}
                     options={PRODUCT_SUBCATEGORIES}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: "Product sub-category is required",
                     }}
                  />
               </div>

               <div className="space-y-5">
                  <InputField
                     label="Product Variant Photo"
                     name="variantPhoto"
                     type="file"
                     placeholder="Select the product variant photo"
                     icon={CloudUpload}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: "Product variant photo is required",
                        validate: (value) => {
                           if (value.length === 0)
                              return "Please upload a photo";
                           const file = value[0];
                           const validTypes = [
                              "image/jpeg",
                              "image/png",
                              "image/gif",
                           ];
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
                     <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                        {photoUploadError}
                     </p>
                  )}

                  <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                     {uploadedVariantPhoto ? (
                        <img
                           src={uploadedVariantPhoto}
                           alt="Product Variant Photo"
                           className="w-full h-full object-contain"
                        />
                     ) : (
                        <div className="flex flex-col items-center justify-center gap-3">
                           {uploadingPhoto ? (
                              <>
                                 <PuffLoader size={60} color="#3B82F6" />
                                 <p className="text-sm text-gray-500 font-medium">
                                    Uploading...
                                 </p>
                              </>
                           ) : (
                              <>
                                 <FileType
                                    size={48}
                                    className="text-gray-400"
                                 />
                                 <p className="text-sm text-gray-500">
                                    Photo preview will appear here
                                 </p>
                              </>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="pt-4">
               <button
                  disabled={isSubmitting || uploadingPhoto}
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-lg font-semibold text-white text-sm transition-all duration-200
              ${
                 isSubmitting || uploadingPhoto
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg"
              }
            `}
               >
                  {uploadingPhoto ? (
                     <span className="flex items-center justify-center gap-2">
                        <PuffLoader size={20} color="#ffffff" />
                        Photo Uploading...
                     </span>
                  ) : isSubmitting ? (
                     <span className="flex items-center justify-center gap-2">
                        <PuffLoader size={20} color="#ffffff" />
                        Adding Variant...
                     </span>
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
