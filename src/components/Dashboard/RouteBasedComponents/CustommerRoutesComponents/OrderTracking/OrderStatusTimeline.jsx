import React from "react";
import { motion } from "framer-motion";
import {
   CircleCheck as CheckCircle,
   Clock,
   Package,
   Truck,
   MapPin,
   Hop as Home,
   User,
} from "lucide-react";
import { format } from "date-fns";

const OrderStatusTimeline = ({ order }) => {
   const getStatusIcon = (status) => {
      switch (status) {
         case "pending":
            return Clock;
         case "confirmed":
            return CheckCircle;
         case "collected":
            return User;
         case "in_transit_hub":
            return Truck;
         case "out_for_delivery":
            return MapPin;
         case "delivered":
            return Home;
         default:
            return Package;
      }
   };

   const getStatusColor = (status, completed) => {
      if (!completed) return "text-gray-400 bg-gray-100 border-gray-200";

      switch (status) {
         case "pending":
            return "text-yellow-600 bg-yellow-100 border-yellow-200";
         case "confirmed":
            return "text-blue-600 bg-blue-100 border-blue-200";
         case "collected":
            return "text-purple-600 bg-purple-100 border-purple-200";
         case "in_transit_hub":
            return "text-orange-600 bg-orange-100 border-orange-200";
         case "out_for_delivery":
            return "text-indigo-600 bg-indigo-100 border-indigo-200";
         case "delivered":
            return "text-green-600 bg-green-100 border-green-200";
         default:
            return "text-gray-600 bg-gray-100 border-gray-200";
      }
   };

   const getStatusTitle = (status) => {
      switch (status) {
         case "pending":
            return "Order Pending";
         case "confirmed":
            return "Order Confirmed";
         case "collected":
            return "Collected by Rider";
         case "in_transit_hub":
            return "In Transit Hub";
         case "out_for_delivery":
            return "Out for Delivery";
         case "delivered":
            return "Delivered";
         default:
            return "Unknown Status";
      }
   };

   // Calculate progress percentage
   const completedSteps = order.trackingHistory.filter(
      (item) => item.completed
   ).length;
   const totalSteps = order.trackingHistory.length;
   const progressPercentage = (completedSteps / totalSteps) * 100;

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Truck className="text-green-600" size={24} />
            Delivery Timeline
         </h3>

         {/* Progress Line Bar */}
         <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-medium text-gray-600">
                  Order Progress
               </span>
               <span className="text-sm font-semibold text-green-600">
                  {Math.round(progressPercentage)}% Complete
               </span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative">
               {/* Background Line */}
               <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  {/* Progress Fill */}
                  <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${progressPercentage}%` }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full relative"
                  >
                     {/* Animated Shine Effect */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </motion.div>
               </div>

               {/* Status Points on Progress Bar */}
               <div className="absolute top-0 left-0 w-full h-2 flex justify-between items-center">
                  {order.trackingHistory.map((item, index) => {
                     const position = (index / (totalSteps - 1)) * 100;
                     return (
                        <motion.div
                           key={item.status}
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ delay: index * 0.2 }}
                           className={`absolute w-4 h-4 rounded-full border-2 ${
                              item.completed
                                 ? "bg-green-500 border-green-500"
                                 : "bg-white border-gray-300"
                           } shadow-sm`}
                           style={{
                              left: `${position}%`,
                              transform: "translateX(-50%) translateY(-25%)",
                           }}
                        >
                           {item.completed && (
                              <CheckCircle
                                 size={10}
                                 className="text-white absolute top-0.5 left-0.5"
                              />
                           )}
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </div>

         {/* Detailed Timeline */}
         <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {order.trackingHistory.map((item, index) => {
               const StatusIcon = getStatusIcon(item.status);
               const statusColors = getStatusColor(item.status, item.completed);

               return (
                  <motion.div
                     key={item.status}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.15 }}
                     className="relative flex items-start gap-4 pb-8 last:pb-0"
                  >
                     {/* Status Icon Circle */}
                     <div
                        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${statusColors} shadow-sm`}
                     >
                        <StatusIcon size={20} />

                        {/* Completion Checkmark */}
                        {item.completed && (
                           <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.15 + 0.3 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                           >
                              <CheckCircle size={12} className="text-white" />
                           </motion.div>
                        )}

                        {/* Current Status Pulse */}
                        {!item.completed &&
                           item.status === order.currentStatus && (
                              <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
                           )}
                     </div>

                     {/* Status Content */}
                     <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center justify-between mb-2">
                           <h4
                              className={`font-semibold text-lg ${
                                 item.completed
                                    ? "text-gray-800"
                                    : "text-gray-500"
                              }`}
                           >
                              {getStatusTitle(item.status)}
                           </h4>
                           {item.timestamp && (
                              <span className="text-sm text-gray-500 font-medium">
                                 {format(item.timestamp, "MMM dd, HH:mm")}
                              </span>
                           )}
                        </div>

                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                           <MapPin size={14} />
                           {item.location}
                        </p>

                        {/* Additional Information Cards */}
                        {item.rider && (
                           <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.15 + 0.5 }}
                              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-3"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="text-blue-600" size={18} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-semibold text-blue-800">
                                       Rider Information
                                    </p>
                                    <p className="text-sm text-blue-600">
                                       {item.rider.name} • {item.rider.vehicle}
                                    </p>
                                    <p className="text-sm text-blue-600">
                                       {item.rider.phone}
                                    </p>
                                 </div>
                              </div>
                           </motion.div>
                        )}

                        {item.deliveredBy && (
                           <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.15 + 0.5 }}
                              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-3"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle
                                       className="text-green-600"
                                       size={18}
                                    />
                                 </div>
                                 <div>
                                    <p className="text-sm font-semibold text-green-800">
                                       Delivery Confirmation
                                    </p>
                                    <p className="text-sm text-green-600">
                                       Delivered by: {item.deliveredBy}
                                    </p>
                                    <p className="text-sm text-green-600">
                                       {item.signature}
                                    </p>
                                 </div>
                              </div>
                           </motion.div>
                        )}

                        {/* Current Status Indicator */}
                        {!item.completed &&
                           item.status === order.currentStatus && (
                              <motion.div
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: index * 0.15 + 0.3 }}
                                 className="flex items-center gap-2 mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg"
                              >
                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                 <span className="text-sm font-semibold text-blue-600">
                                    Current Status
                                 </span>
                              </motion.div>
                           )}
                     </div>
                  </motion.div>
               );
            })}
         </div>

         {/* Estimated Delivery Card */}
         {order.currentStatus !== "delivered" && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
               className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
            >
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                     <Clock className="text-green-600" size={24} />
                  </div>
                  <div>
                     <p className="font-semibold text-green-800 text-lg">
                        Estimated Delivery
                     </p>
                     <p className="text-green-600 font-medium">
                        {format(
                           order.estimatedDelivery,
                           "EEEE, MMMM dd, yyyy 'at' HH:mm"
                        )}
                     </p>
                  </div>
               </div>
            </motion.div>
         )}
      </div>
   );
};

export default OrderStatusTimeline;
