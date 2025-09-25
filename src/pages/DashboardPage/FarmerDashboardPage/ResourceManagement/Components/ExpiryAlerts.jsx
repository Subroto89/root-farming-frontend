import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertTriangle, Calendar, Clock } from "lucide-react";
import axios from "axios";

const fetchExpiringResources = async (days = 30) => {
   const response = await axios.get(
      `${import.meta.env.VITE_Server_API_KEY}/resources/expiring?days=${days}`
   );
   return response.data; // Axios returns data in response.data
};

const ExpiryAlerts = ({ days = 30 }) => {
   const {
      data: resources = [],
      isLoading,
      isError,
      error,
   } = useQuery({
      queryKey: ["expiring-resources", days],
      queryFn: () => fetchExpiringResources(days),
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
      refetchOnWindowFocus: true,
   });

   if (isLoading) {
      return <p className="text-gray-500">Loading expiry alerts...</p>;
   }

   if (isError) {
      return (
         <p className="text-red-500">
            Failed to load expiry alerts: {error.message}
         </p>
      );
   }

   if (resources.length === 0) {
      return null;
   }

   const getUrgencyStyles = (urgency) => {
      switch (urgency) {
         case "expired":
            return {
               bg: "bg-red-50",
               border: "border-red-200",
               text: "text-red-800",
               icon: "text-red-500",
            };
         case "critical":
            return {
               bg: "bg-red-50",
               border: "border-red-200",
               text: "text-red-800",
               icon: "text-red-500",
            };
         case "warning":
            return {
               bg: "bg-yellow-50",
               border: "border-yellow-200",
               text: "text-yellow-800",
               icon: "text-yellow-500",
            };
         default:
            return {
               bg: "bg-gray-50",
               border: "border-gray-200",
               text: "text-gray-800",
               icon: "text-gray-500",
            };
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
               <AlertTriangle className="text-red-500" size={24} />
            </div>
            <div>
               <h3 className="text-xl font-semibold text-gray-800">
                  Expiry Alerts
               </h3>
               <p className="text-gray-600">
                  Resources expiring within {days} days
               </p>
            </div>
         </div>

         <div className="space-y-3">
            {resources.map((resource, index) => {
               const styles = getUrgencyStyles(resource.urgency);
               return (
                  <motion.div
                     key={resource.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className={`${styles.bg} ${styles.border} border rounded-lg p-4`}
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <AlertTriangle className={styles.icon} size={20} />
                           <div>
                              <h4 className={`font-semibold ${styles.text}`}>
                                 {resource.name}
                              </h4>
                              <p className="text-sm text-gray-600 capitalize">
                                 {resource.category} • {resource.currentStock}{" "}
                                 {resource.unit}
                              </p>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="flex items-center gap-2 mb-1">
                              <Calendar className={styles.icon} size={16} />
                              <span
                                 className={`text-sm font-medium ${styles.text}`}
                              >
                                 {new Date(
                                    resource.expiryDate
                                 ).toLocaleDateString()}
                              </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <Clock className={styles.icon} size={16} />
                              <span
                                 className={`text-sm font-semibold ${styles.text}`}
                              >
                                 {resource.daysUntilExpiry <= 0
                                    ? "Expired"
                                    : `${resource.daysUntilExpiry} days left`}
                              </span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               );
            })}
         </div>

         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-100"
         >
            <div className="flex items-center justify-center">
               <p className="text-sm text-gray-600">
                  {resources.length} resource
                  {resources.length !== 1 ? "s" : ""} require
                  {resources.length === 1 ? "s" : ""} attention
               </p>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default ExpiryAlerts;
