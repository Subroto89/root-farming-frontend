import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuth } from "../../../../hooks/useAuth";
import { useTheme } from "../../../../hooks/useTheme";
import axios from "axios";
import InputField from "../../../../components/shared/InputField/InputField";
import LoadingPage from "../../../../components/shared/LoadingSpinner";
import { Plus, X, Package, Calendar, Image as ImageIcon } from "lucide-react";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import Container from "../../../../components/shared/Container";

const StartNewCrop = () => {
   const queryClient = useQueryClient();
   const axiosSecure = useAxiosSecure();
   const [isModalOpen, setIsModalOpen] = useState(false);
   // local preview and file error state for image input
   const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
   const [photoUploadError, setPhotoUploadError] = useState("");
   const { user } = useAuth();
   const { theme } = useTheme();
   const farmerEmail = user?.email;

   const {
      register,
      handleSubmit,
      control,
      watch,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         name: "",
         image: "",
         field: "",
         expectedHarvest: "",
         growthStage: null,
         healthStatus: null,
         yieldPredictionKg: "",
         productType: null,
         categoryId: null,
         subCategoryId: null,
         variantId: null,
         startDate: "",
      },
   });

   const selectedProductType = watch("productType");
   const selectedCategory = watch("categoryId");
   const selectedSubCategory = watch("subCategoryId");

   // watch file input to create preview and validate
   const watchedImage = watch("image");

   // fetch crops for table
   const { data: crops = [], isLoading } = useQuery({
      queryKey: ["crops", farmerEmail],
      queryFn: async () => {
         const res = await axiosSecure.get(`/crops?email=${farmerEmail}`);
         return res.data;
      },
      enabled: !!farmerEmail,
   });

   // product types
   const { data: productTypes = [], isLoading: typesLoading } = useQuery({
      queryKey: ["productTypes"],
      queryFn: async () => {
         const res = await axiosSecure.get("/types/get-types");
         return (res.data || []).map((t) => ({
            value: t._id || t.id,
            label: t.typeName || t.name || t.label || t.value,
         }));
      },
      retry: false,
   });

   // dependent dropdown state
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [variants, setVariants] = useState([]);
   const [loadingCategories, setLoadingCategories] = useState(false);
   const [loadingSubCategories, setLoadingSubCategories] = useState(false);
   const [loadingVariants, setLoadingVariants] = useState(false);

   useEffect(() => {
      const typeId = selectedProductType?.value || selectedProductType;
      if (!typeId) {
         setCategories([]);
         setSubCategories([]);
         setVariants([]);
         return;
      }
      let mounted = true;
      (async () => {
         try {
            setLoadingCategories(true);
            const res = await axiosSecure.get(
               `/categories/get-by-type/${typeId}`
            );
            if (!mounted) return;
            setCategories(
               (res.data || []).map((c) => ({
                  value: c._id || c.id,
                  label: c.categoryName || c.name || "Unnamed",
               }))
            );
         } catch (err) {
            console.error(err);
            Swal.fire({
               icon: "error",
               title: "Error",
               text: "Failed to load categories",
            });
            setCategories([]);
         } finally {
            setLoadingCategories(false);
         }
      })();
      return () => {
         mounted = false;
      };
   }, [selectedProductType]);

   useEffect(() => {
      const categoryId = selectedCategory?.value || selectedCategory;
      if (!categoryId) {
         setSubCategories([]);
         setVariants([]);
         return;
      }
      let mounted = true;
      (async () => {
         try {
            setLoadingSubCategories(true);
            const res = await axiosSecure.get(
               `/subCategories/get-by-category/${categoryId}`
            );
            if (!mounted) return;
            setSubCategories(
               (res.data || []).map((s) => ({
                  value: s._id || s.id,
                  label: s.subCategoryName || s.name || "Unnamed",
               }))
            );
         } catch (err) {
            console.error(err);
            Swal.fire({
               icon: "error",
               title: "Error",
               text: "Failed to load sub-categories",
            });
            setSubCategories([]);
         } finally {
            setLoadingSubCategories(false);
         }
      })();
      return () => {
         mounted = false;
      };
   }, [selectedCategory]);

   useEffect(() => {
      const subCategoryId = selectedSubCategory?.value || selectedSubCategory;
      if (!subCategoryId) {
         setVariants([]);
         return;
      }
      let mounted = true;
      (async () => {
         try {
            setLoadingVariants(true);
            const res = await axiosSecure.get(
               `/variants/get-by-subcategory/${subCategoryId}`
            );
            if (!mounted) return;
            setVariants(
               (res.data || []).map((v) => ({
                  value: v._id || v.id,
                  label: v.variantName || v.name || "Unnamed",
               }))
            );
         } catch (err) {
            console.error(err);
            Swal.fire({
               icon: "error",
               title: "Error",
               text: "Failed to load variants",
            });
            setVariants([]);
         } finally {
            setLoadingVariants(false);
         }
      })();
      return () => {
         mounted = false;
      };
   }, [selectedSubCategory]);

   // create preview & validate selected file when watchedImage changes
   useEffect(() => {
      setPhotoUploadError("");
      // watchedImage can be FileList or something wrapped; handle defensively
      const fileList = watchedImage;
      if (!fileList || fileList.length === 0) {
         // clear preview
         if (uploadedImagePreview) {
            URL.revokeObjectURL(uploadedImagePreview);
         }
         setUploadedImagePreview(null);
         return;
      }
      const file = fileList[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
         setPhotoUploadError("Only JPEG, PNG, and GIF files are allowed");
         if (uploadedImagePreview) {
            URL.revokeObjectURL(uploadedImagePreview);
         }
         setUploadedImagePreview(null);
         return;
      }
      if (file.size > 2 * 1024 * 1024) {
         setPhotoUploadError("File size must be less than 2MB");
         if (uploadedImagePreview) {
            URL.revokeObjectURL(uploadedImagePreview);
         }
         setUploadedImagePreview(null);
         return;
      }

      // create preview URL
      const url = URL.createObjectURL(file);
      // revoke previous if exists
      if (uploadedImagePreview) {
         URL.revokeObjectURL(uploadedImagePreview);
      }
      setUploadedImagePreview(url);

      // cleanup on unmount will be handled below
      return () => {
         // keep url until changed/cleared; revocation handled above/new changes
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [watchedImage]);

   // cleanup objectURL on unmount
   useEffect(() => {
      return () => {
         if (uploadedImagePreview) URL.revokeObjectURL(uploadedImagePreview);
      };
   }, [uploadedImagePreview]);

   // react-select theme-aware styles
   const selectStyles = (theme) => ({
      control: (base) => ({
         ...base,
         backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
         color: theme === "dark" ? "#fff" : "#111",
         borderColor: theme === "dark" ? "#374151" : "#d1d5db",
         borderRadius: "0.5rem",
         padding: "0.25rem",
         boxShadow: "none",
         "&:hover": {
            borderColor: theme === "dark" ? "#4b5563" : "#9ca3af",
         },
      }),
      menu: (base) => ({
         ...base,
         backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
         color: theme === "dark" ? "#fff" : "#111",
         borderRadius: "0.5rem",
         boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }),
      option: (base, state) => ({
         ...base,
         backgroundColor: state.isFocused
            ? theme === "dark"
               ? "#374151"
               : "#f3f4f6"
            : theme === "dark"
            ? "#1f2937"
            : "#fff",
         color: theme === "dark" ? "#fff" : "#111",
         cursor: "pointer",
      }),
      singleValue: (base) => ({
         ...base,
         color: theme === "dark" ? "#fff" : "#111",
      }),
   });

   const deleteCropMutation = useMutation({
      mutationFn: async (cropId) => {
         await axiosSecure.delete(`/crops/${cropId}`);
         return cropId;
      },
      onSuccess: (cropId) => {
         queryClient.invalidateQueries(["crops", farmerEmail]);
         Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Crop deleted successfully!",
         });
      },
      onError: (err) => {
         console.error(err);
         Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete crop",
         });
      },
   });

   // Add crop mutation (payload updated to include new fields)
   const addCropMutation = useMutation({
      mutationFn: async (formData) => {
         let imageUrl = "";
         if (formData.image?.[0]) {
            const imgForm = new FormData();
            imgForm.append("image", formData.image[0]);
            const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
            const imgRes = await axios.post(
               `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
               imgForm
            );
            imageUrl = imgRes.data.data.url;
         }

         const payload = {
            name: formData.name,
            // removed: description, measurement fields, pricing, quality
            field: formData.field || null,
            expectedHarvest: formData.expectedHarvest || null,
            growthStage:
               formData.growthStage?.value || formData.growthStage || null,
            healthStatus:
               formData.healthStatus?.value || formData.healthStatus || null,
            yieldPredictionKg: formData.yieldPredictionKg || null,
            // classification selections kept:
            image: imageUrl,
            productType: formData.productType?.value || formData.productType,
            categoryId: formData.categoryId?.value || formData.categoryId,
            subCategoryId:
               formData.subCategoryId?.value || formData.subCategoryId,
            variantId: formData.variantId?.value || formData.variantId,
            startDate: formData.startDate || null,
            createdBy: farmerEmail,
         };

         const res = await axiosSecure.post("/crops", payload);
         return res.data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries(["crops", farmerEmail]);
         reset();
         // clear preview after successful save
         if (uploadedImagePreview) {
            URL.revokeObjectURL(uploadedImagePreview);
            setUploadedImagePreview(null);
         }
         setIsModalOpen(false);
         Swal.fire({
            icon: "success",
            title: "Crop Added",
            text: `Crop "${data.name || "New Crop"}" added successfully!`,
         });
      },
      onError: (err) => {
         console.error(err);
         Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add crop",
         });
      },
   });

   const onSubmit = (data) => {
      // ensure product classification selections present (unchanged requirement)
      if (
         !data.productType ||
         !data.categoryId ||
         !data.subCategoryId ||
         !data.variantId
      ) {
         Swal.fire({
            icon: "warning",
            title: "Missing selection",
            text: "Please select product type, category, sub-category and variant.",
         });
         return;
      }

      // optional: require new fields (you can relax as needed)
      if (
         !data.field ||
         !data.expectedHarvest ||
         !data.growthStage ||
         !data.healthStatus
      ) {
         Swal.fire({
            icon: "warning",
            title: "Missing info",
            text: "Please fill Field, Expected Harvest, Growth Stage and Health Status.",
         });
         return;
      }

      addCropMutation.mutate(data);
   };

   if (isLoading) return <LoadingPage />;

   const containerBg = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
   const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
   const textColor = theme === "dark" ? "text-white" : "text-gray-900";
   const textMuted = theme === "dark" ? "text-gray-200" : "text-gray-600";
   const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
   const modalBg = theme === "dark" ? "bg-gray-800" : "bg-white";

   const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   const themeFgOfFgStyle =
      theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
   // options for new selects
   const growthStageOptions = [
      { value: "germination", label: "Germination" },
      { value: "vegetative", label: "Vegetative" },
      { value: "reproductive", label: "Reproductive" },
      { value: "maturation", label: "Maturation" },
   ];

   const healthStatusOptions = [
      { value: "healthy", label: "Healthy" },
      { value: "needs_attention", label: "Needs Attention" },
      { value: "critical", label: "Critical" },
   ];

   return (
      <div className={`min-h-screen ${themeBackgroundStyle} py-8 `}>
         <Container>
            <div>
               <div className={` px-8 py-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                     <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                           Crop Management
                        </h1>
                        <p className="text-green-100 text-sm">
                           Manage your crop inventory and track production
                        </p>
                     </div>
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                     >
                        <Plus size={20} />
                        <span>Add New Crop</span>
                     </button>
                  </div>
               </div>

               <div className="p-8">
                  {crops.length > 0 ? (
                     <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full">
                           <thead className={`${themeFgOfFgStyle}`}>
                              <tr>
                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    <div className="flex items-center gap-2">
                                       <ImageIcon size={16} /> Image
                                    </div>
                                 </th>
                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    <div className="flex items-center gap-2">
                                       <Package size={16} /> Name
                                    </div>
                                 </th>

                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    Field
                                 </th>

                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    Expected Harvest
                                 </th>

                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    Growth Stage
                                 </th>

                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    Health Status
                                 </th>

                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    Yield Prediction (kg)
                                 </th>
                                 <th
                                    className={`px-6 py-4 text-left text-xs font-semibold ${textMuted} uppercase tracking-wider`}
                                 >
                                    Action
                                 </th>
                              </tr>
                           </thead>
                           <tbody
                              className={`divide-y ${themeForegroundStyle}`}
                           >
                              {crops.map((crop) => (
                                 <tr
                                    key={crop._id}
                                    className={`${
                                       theme === "dark"
                                          ? "bg-gray-800 hover:bg-gray-700"
                                          : "bg-white hover:bg-gray-50"
                                    } transition-colors duration-150`}
                                 >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       {crop.image ? (
                                          <img
                                             src={crop.image}
                                             alt={crop.name}
                                             className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                          />
                                       ) : (
                                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                             <ImageIcon
                                                size={24}
                                                className="text-gray-400"
                                             />
                                          </div>
                                       )}
                                    </td>

                                    <td
                                       className={`px-6 py-4 whitespace-nowrap font-medium ${textColor}`}
                                    >
                                       {crop.name}
                                    </td>

                                    <td className={`px-6 py-4 ${textMuted}`}>
                                       {crop.field || "—"}
                                    </td>

                                    <td className={`px-6 py-4 ${textMuted}`}>
                                       {crop.expectedHarvest
                                          ? new Date(
                                               crop.expectedHarvest
                                            ).toLocaleDateString()
                                          : "—"}
                                    </td>

                                    <td className={`px-6 py-4 ${textMuted}`}>
                                       {crop.growthStage
                                          ? crop.growthStage
                                          : "—"}
                                    </td>

                                    <td className={`px-6 py-4 ${textMuted}`}>
                                       {crop.healthStatus
                                          ? crop.healthStatus
                                          : "—"}
                                    </td>

                                    <td className={`px-6 py-4 ${textMuted}`}>
                                       {crop.yieldPredictionKg
                                          ? `${crop.yieldPredictionKg} kg`
                                          : "—"}
                                    </td>
                                    {/* DELETE BUTTON COLUMN */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <button
                                          onClick={() => {
                                             Swal.fire({
                                                title: "Are you sure?",
                                                text: `Delete crop "${crop.name}"?`,
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#d33",
                                                cancelButtonColor: "#3085d6",
                                                confirmButtonText:
                                                   "Yes, delete it!",
                                             }).then((result) => {
                                                if (result.isConfirmed) {
                                                   deleteCropMutation.mutate(
                                                      crop._id
                                                   );
                                                }
                                             });
                                          }}
                                          className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
                                       >
                                          Delete
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <div
                        className={`text-center py-16 ${cardBg} rounded-lg border-2 border-dashed ${borderColor}`}
                     >
                        <Package
                           size={64}
                           className={`mx-auto ${textMuted} mb-4`}
                        />
                        <p className={`${textColor} text-lg font-medium mb-2`}>
                           No crops in inventory
                        </p>
                        <p className={`${textMuted} mb-6`}>
                           Get started by adding your first crop
                        </p>
                        <button
                           onClick={() => setIsModalOpen(true)}
                           className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                        >
                           <Plus size={20} />
                           <span>Add Your First Crop</span>
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </Container>

         {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
               <div
                  className={`${modalBg} rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col`}
               >
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 flex items-center justify-between">
                     <div>
                        <h3 className="text-2xl font-bold text-white">
                           Add New Crop
                        </h3>
                        <p className="text-green-100 text-sm mt-1">
                           Fill in the details to add a crop to your inventory
                        </p>
                     </div>
                     <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
                     >
                        <X size={24} />
                     </button>
                  </div>

                  <div className="overflow-y-auto flex-1 p-8">
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="md:col-span-2">
                              <h4
                                 className={`text-lg font-semibold ${textColor} mb-4 pb-2 border-b ${borderColor}`}
                              >
                                 Basic Information
                              </h4>
                           </div>

                           {/* --- UPDATED Image Upload + Preview Block --- */}
                           <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                              <div>
                                 <div className="mb-5">
                                    <InputField
                                       name="name"
                                       label="Crop Name"
                                       placeholder="Enter crop name"
                                       type="text"
                                       register={register}
                                       validationRules={{
                                          required: "Name is required",
                                       }}
                                       errors={errors}
                                    />
                                 </div>
                                 <InputField
                                    name="image"
                                    label="Crop Image"
                                    placeholder="Upload Image"
                                    type="file"
                                    register={register}
                                    // disable file input until category selected
                                    disabled={!selectedCategory}
                                    // conditional validation: required only if category is selected
                                    validationRules={{
                                       required: selectedCategory
                                          ? "Image is required"
                                          : false,
                                       validate: (value) => {
                                          // if disabled or not provided, skip validation
                                          if (!selectedCategory) return true;
                                          if (!value || value.length === 0)
                                             return "Please upload an image";
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
                                    errors={errors}
                                 />

                                 {/* inline error from preview validation */}
                                 {photoUploadError && (
                                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                       <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                                       {photoUploadError}
                                    </p>
                                 )}
                              </div>

                              {/* Preview Column */}
                              <div className="space-y-2">
                                 <div className="w-full h-44 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                    {uploadedImagePreview ? (
                                       <img
                                          src={uploadedImagePreview}
                                          alt="Crop preview"
                                          className="w-full h-full object-contain"
                                       />
                                    ) : (
                                       <div className="flex flex-col items-center justify-center gap-3 px-4 text-center">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             className="h-10 w-10 text-gray-400"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor"
                                          >
                                             <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3l-4 4-4-4"
                                             />
                                          </svg>
                                          <p className="text-sm text-gray-500">
                                             Photo preview will appear here
                                          </p>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                           {/* --- END updated block --- */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="md:col-span-2">
                              <h4
                                 className={`text-lg font-semibold ${textColor} mb-4 pb-2 border-b ${borderColor}`}
                              >
                                 Crop Details
                              </h4>
                           </div>

                           <InputField
                              name="field"
                              label="Field / Plot"
                              placeholder="Enter field or plot name"
                              type="text"
                              register={register}
                              validationRules={{
                                 required: "Field is required",
                              }}
                              errors={errors}
                           />

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 <div className="flex items-center gap-2">
                                    <Calendar size={16} /> Expected Harvest
                                 </div>
                              </label>
                              <input
                                 type="date"
                                 {...register("expectedHarvest")}
                                 className={`w-full px-4 py-3 rounded-lg border ${
                                    theme === "dark"
                                       ? "bg-gray-700 border-gray-600 text-white"
                                       : "bg-white border-gray-300 text-gray-900"
                                 } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                              />
                           </div>

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 Growth Stage
                              </label>
                              <Controller
                                 name="growthStage"
                                 control={control}
                                 render={({ field }) => (
                                    <Select
                                       {...field}
                                       options={growthStageOptions}
                                       placeholder="Select growth stage"
                                       styles={selectStyles(theme)}
                                    />
                                 )}
                              />
                           </div>

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 Health Status
                              </label>
                              <Controller
                                 name="healthStatus"
                                 control={control}
                                 render={({ field }) => (
                                    <Select
                                       {...field}
                                       options={healthStatusOptions}
                                       placeholder="Select health status"
                                       styles={selectStyles(theme)}
                                    />
                                 )}
                              />
                           </div>

                           <div>
                              <InputField
                                 name="yieldPredictionKg"
                                 label="Yield Prediction (kg)"
                                 placeholder="e.g. 1200"
                                 type="number"
                                 register={register}
                                 validationRules={{
                                    required: "Yield prediction is required",
                                 }}
                                 errors={errors}
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="md:col-span-2">
                              <h4
                                 className={`text-lg font-semibold ${textColor} mb-4 pb-2 border-b ${borderColor}`}
                              >
                                 Product Classification
                              </h4>
                           </div>

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 Product Type
                              </label>
                              <Controller
                                 name="productType"
                                 control={control}
                                 render={({ field }) => (
                                    <Select
                                       {...field}
                                       options={productTypes}
                                       isLoading={typesLoading}
                                       placeholder="Select product type"
                                       styles={selectStyles(theme)}
                                    />
                                 )}
                              />
                           </div>

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 Category
                              </label>
                              <Controller
                                 name="categoryId"
                                 control={control}
                                 render={({ field }) => (
                                    <Select
                                       {...field}
                                       options={categories}
                                       isLoading={loadingCategories}
                                       placeholder="Select category"
                                       isDisabled={!selectedProductType}
                                       styles={selectStyles(theme)}
                                    />
                                 )}
                              />
                           </div>

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 Sub-Category
                              </label>
                              <Controller
                                 name="subCategoryId"
                                 control={control}
                                 render={({ field }) => (
                                    <Select
                                       {...field}
                                       options={subCategories}
                                       isLoading={loadingSubCategories}
                                       placeholder="Select sub-category"
                                       isDisabled={!selectedCategory}
                                       styles={selectStyles(theme)}
                                    />
                                 )}
                              />
                           </div>

                           <div>
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 Variant
                              </label>
                              <Controller
                                 name="variantId"
                                 control={control}
                                 render={({ field }) => (
                                    <Select
                                       {...field}
                                       options={variants}
                                       isLoading={loadingVariants}
                                       placeholder="Select variant"
                                       isDisabled={!selectedSubCategory}
                                       styles={selectStyles(theme)}
                                    />
                                 )}
                              />
                           </div>

                           <div className="md:col-span-2">
                              <label
                                 className={`block text-sm font-medium ${textColor} mb-2`}
                              >
                                 <div className="flex items-center gap-2">
                                    <Calendar size={16} /> Start Date
                                 </div>
                              </label>
                              <input
                                 type="date"
                                 {...register("startDate")}
                                 className={`w-full px-4 py-3 rounded-lg border ${
                                    theme === "dark"
                                       ? "bg-gray-700 border-gray-600 text-white"
                                       : "bg-white border-gray-300 text-gray-900"
                                 } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                              />
                           </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                           <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                                 theme === "dark"
                                    ? "bg-gray-700 text-white hover:bg-gray-600"
                                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                              }`}
                           >
                              Cancel
                           </button>
                           <button
                              type="submit"
                              disabled={addCropMutation.isLoading}
                              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                           >
                              {addCropMutation.isLoading ? (
                                 <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                                    Saving...
                                 </>
                              ) : (
                                 <>
                                    <Plus size={20} /> Save Crop
                                 </>
                              )}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default StartNewCrop;
