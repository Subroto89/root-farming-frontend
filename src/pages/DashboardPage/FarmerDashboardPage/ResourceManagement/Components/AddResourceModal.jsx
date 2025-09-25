import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, Package, Droplets, AlertTriangle, Wrench } from "lucide-react";

const AddResourceModal = ({
   isOpen,
   onClose,
   onSubmit,
   resource,
   isLoading,
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
   } = useForm({
      defaultValues: {
         name: "",
         category: "seeds",
         currentStock: 0,
         maxStock: 100,
         unit: "kg",
         pricePerUnit: 0,
         location: "",
         supplier: "",
         expiryDate: "",
         description: "",
      },
   });

   const selectedCategory = watch("category");

   useEffect(() => {
      if (resource) {
         reset({
            name: resource.name || "",
            category: resource.category || "seeds",
            currentStock: resource.currentStock || 0,
            maxStock: resource.maxStock || 100,
            unit: resource.unit || "kg",
            pricePerUnit: resource.pricePerUnit || 0,
            location: resource.location || "",
            supplier: resource.supplier || "",
            expiryDate: resource.expiryDate
               ? resource.expiryDate.split("T")[0]
               : "",
            description: resource.description || "",
         });
      } else {
         reset({
            name: "",
            category: "seeds",
            currentStock: 0,
            maxStock: 100,
            unit: "kg",
            pricePerUnit: 0,
            location: "",
            supplier: "",
            expiryDate: "",
            description: "",
         });
      }
   }, [resource, reset, isOpen]);

   const onSubmitForm = (data) => {
      const formattedData = {
         ...data,
         currentStock: Number(data.currentStock),
         maxStock: Number(data.maxStock),
         pricePerUnit: Number(data.pricePerUnit),
         createdAt: resource?.createdAt || new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      };
      onSubmit(formattedData);
   };

   const getCategoryIcon = (category) => {
      switch (category) {
         case "seeds":
            return <Package className="text-green-600" size={24} />;
         case "fertilizers":
            return <Droplets className="text-blue-600" size={24} />;
         case "pesticides":
            return <AlertTriangle className="text-red-600" size={24} />;
         case "tools":
            return <Wrench className="text-gray-600" size={24} />;
         default:
            return <Package className="text-gray-600" size={24} />;
      }
   };

   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
               onClick={onClose}
            >
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                     <div className="flex items-center gap-3">
                        {getCategoryIcon(selectedCategory)}
                        <h2 className="text-2xl font-bold text-gray-800">
                           {resource ? "Edit Resource" : "Add New Resource"}
                        </h2>
                     </div>
                     <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                     >
                        <X size={24} />
                     </motion.button>
                  </div>

                  {/* Form */}
                  <form
                     onSubmit={handleSubmit(onSubmitForm)}
                     className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Resource Name */}
                        <div className="md:col-span-2">
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Resource Name *
                           </label>
                           <input
                              type="text"
                              {...register("name", {
                                 required: "Resource name is required",
                              })}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Enter resource name"
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.name.message}
                              </p>
                           )}
                        </div>

                        {/* Category */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Category *
                           </label>
                           <select
                              {...register("category", {
                                 required: "Category is required",
                              })}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                           >
                              <option value="seeds">Seeds</option>
                              <option value="fertilizers">Fertilizers</option>
                              <option value="pesticides">Pesticides</option>
                              <option value="tools">Tools</option>
                           </select>
                           {errors.category && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.category.message}
                              </p>
                           )}
                        </div>

                        {/* Unit */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Unit *
                           </label>
                           <select
                              {...register("unit", {
                                 required: "Unit is required",
                              })}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                           >
                              <option value="kg">Kilograms (kg)</option>
                              <option value="liters">Liters</option>
                              <option value="packets">Packets</option>
                              <option value="bags">Bags</option>
                              <option value="pieces">Pieces</option>
                              <option value="tons">Tons</option>
                           </select>
                        </div>

                        {/* quantity */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Quantity *
                           </label>
                           <input
                              type="number"
                              min="0"
                              step="0.01"
                              {...register("currentStock", {
                                 required: "Current stock is required",
                                 min: {
                                    value: 0,
                                    message: "Stock cannot be negative",
                                 },
                              })}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="0"
                           />
                           {errors.currentStock && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.currentStock.message}
                              </p>
                           )}
                        </div>

                        {/* Price per Unit */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Price per Unit ($)
                           </label>
                           <input
                              type="number"
                              min="0"
                              step="0.01"
                              {...register("pricePerUnit", {
                                 min: {
                                    value: 0,
                                    message: "Price cannot be negative",
                                 },
                              })}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="0.00"
                           />
                           {errors.pricePerUnit && (
                              <p className="text-red-500 text-sm mt-1">
                                 {errors.pricePerUnit.message}
                              </p>
                           )}
                        </div>

                        {/* Location */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Storage Location
                           </label>
                           <input
                              type="text"
                              {...register("location")}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="e.g., Warehouse A, Shelf 3"
                           />
                        </div>

                        {/* Supplier */}
                        <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Supplier
                           </label>
                           <input
                              type="text"
                              {...register("supplier")}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Supplier name"
                           />
                        </div>

                        {/* Expiry Date */}
                        <div className="md:col-span-2">
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Expiry Date
                           </label>
                           <input
                              type="date"
                              {...register("expiryDate")}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                           />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Description
                           </label>
                           <textarea
                              {...register("description")}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                              placeholder="Additional notes about this resource"
                           />
                        </div>
                     </div>

                     {/* Footer */}
                     <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           type="button"
                           onClick={onClose}
                           className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                        >
                           Cancel
                        </motion.button>
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           type="submit"
                           disabled={isLoading}
                           className="flex-1 px-6 py-3 bg-green-500 hover:bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                           {isLoading
                              ? "Saving..."
                              : resource
                              ? "Update Resource"
                              : "Add Resource"}
                        </motion.button>
                     </div>
                  </form>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default AddResourceModal;
