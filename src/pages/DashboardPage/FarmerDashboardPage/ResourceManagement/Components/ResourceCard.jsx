import React from "react";
import { motion } from "framer-motion";
import {
   Edit,
   AlertTriangle,
   Calendar,
   Package,
   Droplets,
   Trash2,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ResourceCard = ({ resource, onEdit }) => {
   const deleteResourceMutation = useMutation({});

   const handleDelete = async () => {
      const result = await Swal.fire({
         title: "Are you sure?",
         text: `Delete ${resource.name}? This action cannot be undone.`,
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#ef4444",
         cancelButtonColor: "#6b7280",
         confirmButtonText: "Yes, delete it!",
         cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
         deleteResourceMutation.mutate(resource.id);
      }
   };

   const getCategoryIcon = (category) => {
      switch (category) {
         case "seeds":
            return <Package className="text-green-600" size={20} />;
         case "fertilizers":
            return <Droplets className="text-blue-600" size={20} />;
         case "pesticides":
            return <AlertTriangle className="text-red-600" size={20} />;
         default:
            return <Package className="text-gray-600" size={20} />;
      }
   };

   const getStockStatus = () => {
      const percentage = (resource.currentStock / resource.maxStock) * 100;
      if (percentage <= 20)
         return {
            color: "bg-red-500",
            text: "Critical",
            textColor: "text-red-600",
         };
      if (percentage <= 50)
         return {
            color: "bg-yellow-500",
            text: "Low",
            textColor: "text-yellow-600",
         };
      return {
         color: "bg-green-500",
         text: "Good",
         textColor: "text-green-600",
      };
   };

   const getDaysUntilExpiry = () => {
      if (!resource.expiryDate) return null;
      const today = new Date();
      const expiry = new Date(resource.expiryDate);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
   };

   const stockStatus = getStockStatus();
   const daysUntilExpiry = getDaysUntilExpiry();
   const stockPercentage = (resource.currentStock / resource.maxStock) * 100;

   return (
      <motion.div
         whileHover={{ y: -5, shadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
         className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 h-full"
      >
         {/* Header */}
         <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
               {getCategoryIcon(resource.category)}
               <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                     {resource.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                     {resource.category}
                  </p>
               </div>
            </div>
            <div className="flex gap-2">
               <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(resource)}
                  className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
               >
                  <Edit size={16} />
               </motion.button>
               <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDelete}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
               >
                  <Trash2 size={16} />
               </motion.button>
            </div>
         </div>

         {/* Stock Level */}
         <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-gray-600">
                  Stock Level
               </span>
               <span
                  className={`text-sm font-semibold ${stockStatus.textColor}`}
               >
                  {stockStatus.text}
               </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
               <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-3 rounded-full ${stockStatus.color}`}
               />
            </div>
            <div className="flex justify-between items-center mt-2">
               <span className="text-sm text-gray-500">
                  {resource.currentStock} {resource.unit}
               </span>
               <span className="text-sm text-gray-500">
                  Max: {resource.maxStock} {resource.unit}
               </span>
            </div>
         </div>

         {/* Price and Location */}
         <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-600">
                  Price per {resource.unit}
               </span>
               <span className="font-semibold text-primary-600">
                  ${resource.pricePerUnit}
               </span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-600">Location</span>
               <span className="text-sm text-gray-800">
                  {resource.location}
               </span>
            </div>
         </div>

         {/* Expiry Alert */}
         {daysUntilExpiry !== null && daysUntilExpiry <= 30 && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`flex items-center gap-2 p-3 rounded-lg ${
                  daysUntilExpiry <= 7
                     ? "bg-red-50 border border-red-200"
                     : "bg-yellow-50 border border-yellow-200"
               }`}
            >
               <AlertTriangle
                  size={16}
                  className={
                     daysUntilExpiry <= 7 ? "text-red-500" : "text-yellow-500"
                  }
               />
               <span
                  className={`text-sm font-medium ${
                     daysUntilExpiry <= 7 ? "text-red-700" : "text-yellow-700"
                  }`}
               >
                  {daysUntilExpiry <= 0
                     ? "Expired"
                     : `Expires in ${daysUntilExpiry} days`}
               </span>
            </motion.div>
         )}

         {/* Supplier Info */}
         {resource.supplier && (
            <div className="mt-4 pt-4 border-t border-gray-100">
               <div className="text-sm text-gray-600">
                  <strong>Supplier:</strong> {resource.supplier}
               </div>
            </div>
         )}

         {/* Last Updated */}
         <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
            <Calendar size={12} />
            <span>
               Updated {new Date(resource.updatedAt).toLocaleDateString()}
            </span>
         </div>
      </motion.div>
   );
};

export default ResourceCard;
