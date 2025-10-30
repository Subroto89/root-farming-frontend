import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../../utils/utilities";
import Swal from "sweetalert2";
import { CloudUpload, FileType, Shapes, Package, Layers } from "lucide-react";
import { PuffLoader } from "react-spinners";
import InputField from "../../../../shared/InputField/InputField";

const FormInAddSubCategory = ({ handleModalToggle, refetch }) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   // --------------------------------------------------------------
   //  State
   // --------------------------------------------------------------
   const [uploadedSubCategoryPhoto, setUploadedSubCategoryPhoto] =
      useState(null);
   const [uploadingPhoto, setUploadingPhoto] = useState(false);
   const [photoUploadError, setPhotoUploadError] = useState(null);

   const [productTypes, setProductTypes] = useState([]);
   const [typesLoading, setTypesLoading] = useState(false);
   const [typesError, setTypesError] = useState(null);

   const [allCategories, setAllCategories] = useState([]);
   const [filteredCategories, setFilteredCategories] = useState([]);
   const [categoriesLoading, setCategoriesLoading] = useState(false);
   const [categoriesError, setCategoriesError] = useState(null);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
   } = useForm();

   const selectedType = watch("productType"); // will hold _id of type
   const selectedCategory = watch("categoryId"); // will hold _id of category
   const subCategoryPhoto = watch("subCategoryPhoto");

   // --------------------------------------------------------------
   // Fetch product types on mount
   // --------------------------------------------------------------
   useEffect(() => {
      let mounted = true;
      const fetchTypes = async () => {
         setTypesLoading(true);
         setTypesError(null);
         try {
            const { data } = await axiosSecure.get("/types/get-types");
            if (!mounted) return;

            // Normalize to { _id, name } for InputField
            const normalized = (data || []).map((t) => ({
               _id: t._id || t.insertedId || t.id,
               name: t.typeName || t.name || "",
            }));
            setProductTypes(normalized);
         } catch (err) {
            console.error("Failed to fetch types:", err);
            if (mounted) setTypesError("Failed to load types.");
         } finally {
            if (mounted) setTypesLoading(false);
         }
      };

      fetchTypes();
      return () => {
         mounted = false;
      };
   }, [axiosSecure]);

   // --------------------------------------------------------------
   // When a type is selected fetch categories (or ensure we have them)
   // then filter by type id to show only matching categories.
   // --------------------------------------------------------------
   useEffect(() => {
      if (!selectedType) {
         setFilteredCategories([]);
         return;
      }

      let mounted = true;
      const fetchAndFilterCategories = async () => {
         setCategoriesLoading(true);
         setCategoriesError(null);

         try {
            // fetch all categories then filter client-side by typeId (to avoid touching backend)
            const { data } = await axiosSecure.get(
               "/categories/get-categories"
            );
            if (!mounted) return;

            setAllCategories(data || []);

            // try common keys for linking: typeId, type_id, type, typeRef
            const matchKeys = [
               "typeId",
               "type_id",
               "type",
               "typeRef",
               "typeIdRef",
            ];
            const filtered = (data || []).filter((cat) => {
               // category id type may be string or object; normalize to string
               const catTypeId =
                  cat.typeId ||
                  cat.type ||
                  cat.type_id ||
                  cat.typeRef ||
                  cat.typeIdRef ||
                  cat.type?._id ||
                  (cat.type && (cat.type._id || cat.type.id));
               if (!catTypeId) return false;
               return String(catTypeId) === String(selectedType);
            });

            // Normalize filtered categories to { _id, name }
            const normalized = filtered.map((c) => ({
               _id: c._id || c.insertedId || c.id,
               name: c.categoryName || c.name || c.category || "",
            }));

            setFilteredCategories(normalized);
         } catch (err) {
            console.error("Failed to fetch categories:", err);
            if (mounted) setCategoriesError("Failed to load categories.");
         } finally {
            if (mounted) setCategoriesLoading(false);
         }
      };

      fetchAndFilterCategories();

      return () => {
         mounted = false;
      };
   }, [selectedType, axiosSecure]);

   // --------------------------------------------------------------
   // Auto-upload subcategory photo when user picks a file
   // --------------------------------------------------------------
   useEffect(() => {
      let mounted = true;
      const uploadFile = async () => {
         if (subCategoryPhoto && subCategoryPhoto.length > 0) {
            // reset previous
            if (mounted) {
               setUploadedSubCategoryPhoto(null);
               setPhotoUploadError(null);
               setUploadingPhoto(true);
            }
            try {
               const imageUrl = await imageUpload(subCategoryPhoto[0]);
               if (mounted) setUploadedSubCategoryPhoto(imageUrl);
            } catch (error) {
               console.error("Image upload failed:", error);
               if (mounted) {
                  setPhotoUploadError("Image upload failed. Please try again.");
                  setUploadedSubCategoryPhoto(null);
               }
            } finally {
               if (mounted) setUploadingPhoto(false);
            }
         }
      };
      uploadFile();

      return () => {
         mounted = false;
      };
   }, [subCategoryPhoto]);

   // --------------------------------------------------------------
   // Submit handler
   // --------------------------------------------------------------
   const onSubmit = async (data) => {
      // attach uploaded photo and created by
      data.subCategoryPhoto = uploadedSubCategoryPhoto;
      data.createdBy = user?.email;
      // attach relations
      data.typeId = selectedType;
      data.categoryId = selectedCategory;

      try {
         const { data: info } = await axiosSecure.post(
            "/subCategories/save-subcategory",
            data
         );

         if (info.insertedId) {
            Swal.fire({
               icon: "success",
               title: "Success",
               text: "Product Sub-category Added Successfully",
               timer: 1500,
            });
            refetch();
            handleModalToggle();
         }
      } catch (error) {
         let errorMessage =
            "Product sub-category addition failed due to a server error.";

         if (error.response) {
            if (
               error.response.status === 409 ||
               error.response.status === 400
            ) {
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

   // --------------------------------------------------------------
   // Render
   // --------------------------------------------------------------
   return (
      <div className="px-8 py-6">
         <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Left column: selects + inputs */}
               <div className="space-y-5">
                  {/* Type select - always enabled */}
                  <InputField
                     label="Product Type"
                     name="productType"
                     type="select"
                     placeholder={
                        typesLoading
                           ? "Loading types..."
                           : "Select product type"
                     }
                     icon={Package}
                     options={productTypes}
                     register={register}
                     errors={errors}
                     validationRules={{ required: "Product type is required" }}
                  />
                  {typesLoading && (
                     <p className="text-sm text-gray-500 flex items-center gap-2">
                        <PuffLoader size={14} /> Loading types...
                     </p>
                  )}
                  {typesError && (
                     <p className="text-sm text-red-500">{typesError}</p>
                  )}

                  {/* Category select - disabled until type selected */}
                  <InputField
                     label="Category"
                     name="categoryId"
                     type="select"
                     placeholder={
                        !selectedType
                           ? "Select a type first"
                           : categoriesLoading
                           ? "Loading categories..."
                           : filteredCategories.length === 0
                           ? "No categories for this type"
                           : "Select category"
                     }
                     icon={Layers}
                     options={filteredCategories}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: selectedType
                           ? "Category is required for the selected type"
                           : false,
                     }}
                     disabled={
                        !selectedType ||
                        categoriesLoading ||
                        filteredCategories.length === 0
                     }
                  />
                  {categoriesLoading && (
                     <p className="text-sm text-gray-500 flex items-center gap-2">
                        <PuffLoader size={14} /> Loading categories...
                     </p>
                  )}
                  {categoriesError && (
                     <p className="text-sm text-red-500">{categoriesError}</p>
                  )}

                  {/* Sub-category name - disabled until category selected */}
                  <InputField
                     label="Product Sub-Category Name"
                     name="subCategoryName"
                     type="text"
                     placeholder="Enter the product sub-category name"
                     icon={FileType}
                     register={register}
                     errors={errors}
                     disabled={!selectedCategory}
                     validationRules={{
                        required: selectedCategory
                           ? "Product sub-category Name is Required"
                           : false,
                        minLength: {
                           value: 3,
                           message:
                              "Product sub-category Name must be at least 3 characters long",
                        },
                     }}
                  />

                  {/* file input - disabled until category selected */}
                  <InputField
                     label="Product Sub-Category Photo"
                     name="subCategoryPhoto"
                     type="file"
                     placeholder="Select the product sub-category photo"
                     icon={CloudUpload}
                     register={register}
                     errors={errors}
                     disabled={!selectedCategory}
                     validationRules={{
                        required: selectedCategory
                           ? "Product sub-category photo is required"
                           : false,
                        validate: (value) => {
                           // if disabled or not provided, skip validation
                           if (!selectedCategory) return true;
                           if (!value || value.length === 0)
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
               </div>

               {/* Right column: Image preview */}
               <div className="space-y-5">
                  <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                     {uploadedSubCategoryPhoto ? (
                        <img
                           src={uploadedSubCategoryPhoto}
                           alt="Product Sub-Category Photo"
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
                                 <Shapes size={48} className="text-gray-400" />
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

            {/* Submit */}
            <div className="pt-4">
               <button
                  disabled={isSubmitting || uploadingPhoto || !selectedCategory}
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-lg font-semibold text-white text-sm transition-all duration-200
              ${
                 isSubmitting || uploadingPhoto || !selectedCategory
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
                        Adding Sub-Category...
                     </span>
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
