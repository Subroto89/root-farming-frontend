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

// NOTE: UI design and general logic preserved — only added fetching/selects for type/category/subcategory and wiring IDs on submit.

const FormInAddVariant = ({ handleModalToggle, refetch }) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   const [uploadedVariantPhoto, setUploadedVariantPhoto] = useState(null);
   const [uploadingPhoto, setUploadingPhoto] = useState(false);
   const [photoUploadError, setPhotoUploadError] = useState(null);

   // lists and loaders
   const [productTypes, setProductTypes] = useState([]);
   const [typesLoading, setTypesLoading] = useState(false);
   const [typesError, setTypesError] = useState(null);

   const [allCategories, setAllCategories] = useState([]);
   const [filteredCategories, setFilteredCategories] = useState([]);
   const [categoriesLoading, setCategoriesLoading] = useState(false);
   const [categoriesError, setCategoriesError] = useState(null);

   const [allSubCategories, setAllSubCategories] = useState([]);
   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
   const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
   const [subCategoriesError, setSubCategoriesError] = useState(null);

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
   } = useForm();

   // watches
   const selectedType = watch("productType"); // _id of type
   const selectedCategory = watch("productCategory"); // _id of category
   const selectedSubCategory = watch("productSubCategory"); // _id of subcategory
   const variantPhoto = watch("variantPhoto");

   // ---------------- fetch types on mount ----------------
   useEffect(() => {
      let mounted = true;
      const fetchTypes = async () => {
         setTypesLoading(true);
         setTypesError(null);
         try {
            const { data } = await axiosSecure.get("/types/get-types");
            if (!mounted) return;
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

   // ---------------- fetch categories (all) once (or on demand) ----------------
   // We'll fetch categories once to filter client-side when type changes.
   useEffect(() => {
      let mounted = true;
      const fetchCategories = async () => {
         setCategoriesLoading(true);
         setCategoriesError(null);
         try {
            const { data } = await axiosSecure.get(
               "/categories/get-categories"
            );
            if (!mounted) return;
            setAllCategories(data || []);
         } catch (err) {
            console.error("Failed to fetch categories:", err);
            if (mounted) setCategoriesError("Failed to load categories.");
         } finally {
            if (mounted) setCategoriesLoading(false);
         }
      };

      fetchCategories();
      return () => {
         mounted = false;
      };
   }, [axiosSecure]);

   // ---------------- filter categories when type changes ----------------
   useEffect(() => {
      if (!selectedType) {
         setFilteredCategories([]);
         return;
      }
      // try common keys for linking in category doc: typeId, type, type_id, typeRef
      const filtered = (allCategories || []).filter((cat) => {
         const catTypeId =
            cat.typeId ||
            cat.type ||
            cat.type_id ||
            cat.typeRef ||
            (cat.type && (cat.type._id || cat.type.id));
         if (!catTypeId) return false;
         return String(catTypeId) === String(selectedType);
      });

      const normalized = filtered.map((c) => ({
         _id: c._id || c.insertedId || c.id,
         name: c.categoryName || c.name || c.category || "",
      }));
      setFilteredCategories(normalized);

      // reset downstream selection when type changes
      // (we intentionally do not manipulate react-hook-form values here,
      // but disabling UI prevents submission until user re-selects).
      setFilteredSubCategories([]);
   }, [selectedType, allCategories]);

   // ---------------- fetch subcategories (all) once ----------------
   useEffect(() => {
      let mounted = true;
      const fetchSubCategories = async () => {
         setSubCategoriesLoading(true);
         setSubCategoriesError(null);
         try {
            const { data } = await axiosSecure.get(
               "/subCategories/get-subCategories"
            );
            if (!mounted) return;
            setAllSubCategories(data || []);
         } catch (err) {
            console.error("Failed to fetch subcategories:", err);
            if (mounted) setSubCategoriesError("Failed to load subcategories.");
         } finally {
            if (mounted) setSubCategoriesLoading(false);
         }
      };

      fetchSubCategories();
      return () => {
         mounted = false;
      };
   }, [axiosSecure]);

   // ---------------- filter subcategories when category changes ----------------
   useEffect(() => {
      if (!selectedCategory) {
         setFilteredSubCategories([]);
         return;
      }
      // try common keys for linking in subcategory doc: categoryId, category, category_id, categoryRef
      const filtered = (allSubCategories || []).filter((sc) => {
         const scCatId =
            sc.categoryId ||
            sc.category ||
            sc.category_id ||
            sc.categoryRef ||
            (sc.category && (sc.category._id || sc.category.id));
         if (!scCatId) return false;
         return String(scCatId) === String(selectedCategory);
      });

      const normalized = filtered.map((s) => ({
         _id: s._id || s.insertedId || s.id,
         name: s.subCategoryName || s.name || s.subCategory || "",
      }));
      setFilteredSubCategories(normalized);
   }, [selectedCategory, allSubCategories]);

   // ---------------- upload variant photo when user selects ----------------
   useEffect(() => {
      let mounted = true;
      const uploadFile = async () => {
         if (variantPhoto && variantPhoto.length > 0) {
            if (mounted) {
               setUploadedVariantPhoto(null);
               setPhotoUploadError(null);
               setUploadingPhoto(true);
            }
            try {
               const imageUrl = await imageUpload(variantPhoto[0]);
               if (mounted) setUploadedVariantPhoto(imageUrl);
            } catch (error) {
               console.error("Image upload failed:", error);
               if (mounted) {
                  setPhotoUploadError("Image upload failed. Please try again.");
                  setUploadedVariantPhoto(null);
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
   }, [variantPhoto]);

   // ---------------- submit handler ----------------
   const onSubmit = async (data) => {
      // preserve original behavior: attach photo and createdBy
      data.variantPhoto = uploadedVariantPhoto;
      data.createdBy = user?.email;

      // attach relational IDs so server can connect
      data.typeId = selectedType;
      data.categoryId = selectedCategory;
      data.subCategoryId = selectedSubCategory;

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

   // ---------------- render ----------------
   return (
      <div className="px-8 py-6">
         <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="space-y-5">
                  {/* Type select */}
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
                     validationRules={{
                        required: "Product type is required",
                     }}
                  />

                  {typesLoading && (
                     <p className="text-sm text-gray-500 flex items-center gap-2">
                        <PuffLoader size={14} /> Loading types...
                     </p>
                  )}
                  {typesError && (
                     <p className="text-sm text-red-500">{typesError}</p>
                  )}

                  {/* Category select — disabled until type selected */}
                  <InputField
                     label="Product Category"
                     name="productCategory"
                     type="select"
                     placeholder={
                        !selectedType
                           ? "Select a type first"
                           : categoriesLoading
                           ? "Loading categories..."
                           : filteredCategories.length === 0
                           ? "No categories for this type"
                           : "Select product category"
                     }
                     icon={Layers}
                     options={filteredCategories}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: selectedType
                           ? "Product category is required"
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

                  {/* Sub-category select — disabled until category selected */}
                  <InputField
                     label="Product Sub-Category"
                     name="productSubCategory"
                     type="select"
                     placeholder={
                        !selectedCategory
                           ? "Select a category first"
                           : subCategoriesLoading
                           ? "Loading sub-categories..."
                           : filteredSubCategories.length === 0
                           ? "No sub-categories for this category"
                           : "Select product sub-category"
                     }
                     icon={Grid}
                     options={filteredSubCategories}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: selectedCategory
                           ? "Product sub-category is required"
                           : false,
                     }}
                     disabled={
                        !selectedCategory ||
                        subCategoriesLoading ||
                        filteredSubCategories.length === 0
                     }
                  />
                  {subCategoriesLoading && (
                     <p className="text-sm text-gray-500 flex items-center gap-2">
                        <PuffLoader size={14} /> Loading sub-categories...
                     </p>
                  )}
                  {subCategoriesError && (
                     <p className="text-sm text-red-500">
                        {subCategoriesError}
                     </p>
                  )}

                  {/* Variant name - disabled until subcategory selected */}
                  <InputField
                     label="Product Variant Name"
                     name="variantName"
                     type="text"
                     placeholder="Enter the product variant name"
                     icon={FileType}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: selectedSubCategory
                           ? "Product Variant Name is required"
                           : false,
                        minLength: {
                           value: 3,
                           message:
                              "Product variant name must be at least 3 characters long",
                        },
                     }}
                     disabled={!selectedSubCategory}
                  />

                  {/* Variant photo - disabled until subcategory selected */}
                  <InputField
                     label="Product Variant Photo"
                     name="variantPhoto"
                     type="file"
                     placeholder="Select the product variant photo"
                     icon={CloudUpload}
                     register={register}
                     errors={errors}
                     validationRules={{
                        required: selectedSubCategory
                           ? "Product variant photo is required"
                           : false,
                        validate: (value) => {
                           if (!selectedSubCategory) return true;
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
                     disabled={!selectedSubCategory}
                  />

                  {photoUploadError && (
                     <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                        {photoUploadError}
                     </p>
                  )}
               </div>

               <div className="space-y-5">
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
                  disabled={
                     isSubmitting || uploadingPhoto || !selectedSubCategory
                  }
                  type="submit"
                  className={`w-full py-3.5 px-6 rounded-lg font-semibold text-white text-sm transition-all duration-200
              ${
                 isSubmitting || uploadingPhoto || !selectedSubCategory
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
