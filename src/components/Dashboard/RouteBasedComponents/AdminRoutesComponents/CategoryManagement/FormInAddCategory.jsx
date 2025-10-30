import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../../utils/utilities";
import Swal from "sweetalert2";
import { CloudUpload, Shapes, Package } from "lucide-react";
import { PuffLoader } from "react-spinners";
import InputField from "../../../../shared/InputField/InputField";

const AddCategoryForm = ({ handleCategoryModal, refetch }) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   //--------------------------------------------------------------
   //  Necessary State Variables
   // --------------------------------------------------------------
   const [uploadedCategoryPhoto, setUploadedCategoryPhoto] = useState(null);
   const [uploadingPhoto, setUploadingPhoto] = useState(false);
   const [photoUploadError, setPhotoUploadError] = useState(null);

   // dynamic types fetched from backend
   const [productTypes, setProductTypes] = useState([]);
   const [loadingTypes, setLoadingTypes] = useState(false);
   const [typesError, setTypesError] = useState(null);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
   } = useForm();

   const categoryPhoto = watch("categoryPhoto");
   const selectedType = watch("productType"); // will be the selected type _id

   // fetch types on mount
   useEffect(() => {
      let mounted = true;
      const fetchTypes = async () => {
         setLoadingTypes(true);
         setTypesError(null);
         try {
            const { data } = await axiosSecure.get("/types/get-types");
            if (!mounted) return;
            // backend returns array of types with _id and typeName/typeName?
            // normalize to objects with _id and name to match InputField expectation
            const normalized = data.map((t) => {
               // support both typeName and name keys from backend
               return {
                  _id: t._id || t.insertedId || t.id,
                  name: t.typeName || t.name || "",
               };
            });
            setProductTypes(normalized);
         } catch (err) {
            console.error("Failed to fetch types:", err);
            if (mounted)
               setTypesError("Failed to load types. Try again later.");
         } finally {
            if (mounted) setLoadingTypes(false);
         }
      };

      fetchTypes();

      return () => {
         mounted = false;
      };
   }, [axiosSecure]);

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
      // attach uploaded photo and selected type id
      data.categoryPhoto = uploadedCategoryPhoto;
      data.createdBy = user?.email;
      data.typeId = selectedType; // connect category to type by _id

      try {
         // 1. Send the POST request
         const { data: info } = await axiosSecure.post(
            "/categories/save-category",
            data
         );

         // 2. Check for successful insertion (backend sends 201 Created and insertedId)
         if (info.insertedId) {
            Swal.fire({
               icon: "success",
               title: "Success",
               text: "Category Added Successfully",
               timer: 1500,
            });
            // Refresh list and close modal
            refetch();
            handleCategoryModal();
         }
      } catch (error) {
         let errorMessage = "Category addition failed due to a server error.";

         if (error.response) {
            if (
               error.response.status === 409 ||
               error.response.status === 400
            ) {
               errorMessage =
                  error.response.data.error ||
                  "A category with this name already exists.";
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
               {/* Left column: Type select + (conditionally rendered) Category inputs */}
               <div className="space-y-5">
                  {/* Type select always visible */}
                  <InputField
                     label="Type"
                     name="productType"
                     type="select"
                     placeholder={
                        loadingTypes
                           ? "Loading types..."
                           : "Select product type"
                     }
                     icon={Package}
                     options={productTypes}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: "Product type is required",
                     }}
                  />

                  {loadingTypes && (
                     <p className="text-sm text-gray-500 flex items-center gap-2">
                        <PuffLoader size={14} /> Loading types...
                     </p>
                  )}

                  {typesError && (
                     <p className="text-sm text-red-500">{typesError}</p>
                  )}

                  {/* Render category inputs only when a type is selected */}
                  {selectedType ? (
                     <>
                        <InputField
                           label="Category Name"
                           name="categoryName"
                           type="text"
                           placeholder="Enter the category name"
                           icon={Shapes}
                           register={register}
                           errors={errors}
                           validationRules={{
                              required: "Category Name is required",
                              minLength: {
                                 value: 5,
                                 message:
                                    "Category Name must be at least 5 characters long",
                              },
                           }}
                        />

                        <InputField
                           label=""
                           name="categoryPhoto"
                           type="file"
                           placeholder="Select the category photo"
                           icon={CloudUpload}
                           register={register}
                           errors={errors}
                           validationRules={{
                              required: "category photo is required",
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
                     </>
                  ) : (
                     <p className="text-sm text-gray-500">
                        Select a Type to add a Category for it.
                     </p>
                  )}
               </div>

               {/* Right column: Image preview area (visible only when type selected) */}
               <div className="space-y-5">
                  {selectedType ? (
                     <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        {uploadedCategoryPhoto ? (
                           <img
                              src={uploadedCategoryPhoto}
                              alt="Category Photo"
                              className="w-full h-full object-contain"
                           />
                        ) : (
                           <div className="flex flex-col items-center justify-center gap-3">
                              {uploadingPhoto ? (
                                 <>
                                    <PuffLoader size={60} />
                                    <p className="text-sm text-gray-500 font-medium">
                                       Uploading...
                                    </p>
                                 </>
                              ) : (
                                 <>
                                    <Shapes
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
                  ) : (
                     <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-100 flex items-center justify-center bg-gray-50">
                        <p className="text-sm text-gray-400">
                           Category preview will appear after selecting a Type.
                        </p>
                     </div>
                  )}
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
                        Adding Category...
                     </span>
                  ) : (
                     "Add Category"
                  )}
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddCategoryForm;
