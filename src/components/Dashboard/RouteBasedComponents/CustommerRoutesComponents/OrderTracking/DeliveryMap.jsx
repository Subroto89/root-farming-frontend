import React from "react";
import { motion } from "framer-motion";
import {
   MapPin,
   Navigation,
   Truck,
   Hop as Home,
   Clock,
   Route,
} from "lucide-react";

const DeliveryMap = ({ order }) => {
   // Mock map data - in real implementation, you'd use actual map service
   const mapLocations = [
      {
         name: "Root Farming Store",
         lat: 34.0522,
         lng: -118.2437,
         type: "store",
      },
      { name: "Distribution Hub", lat: 34.0622, lng: -118.2337, type: "hub" },
      { name: "Local Hub", lat: 34.0722, lng: -118.2237, type: "local" },
      {
         name: "Your Address",
         lat: 34.0822,
         lng: -118.2137,
         type: "destination",
      },
   ];

   const getCurrentLocationIndex = () => {
      switch (order.currentStatus) {
         case "pending":
         case "confirmed":
            return 0;
         case "collected":
         case "in_transit_hub":
            return 1;
         case "out_for_delivery":
            return 2;
         case "delivered":
            return 3;
         default:
            return 0;
      }
   };

   const currentLocationIndex = getCurrentLocationIndex();

   const getLocationIcon = (type, isActive) => {
      const iconClass = isActive ? "text-green-600" : "text-gray-400";

      switch (type) {
         case "store":
            return <Home className={iconClass} size={18} />;
         case "hub":
         case "local":
            return <Truck className={iconClass} size={18} />;
         case "destination":
            return <MapPin className={iconClass} size={18} />;
         default:
            return <MapPin className={iconClass} size={18} />;
      }
   };

   const getLocationColor = (index) => {
      if (index <= currentLocationIndex) {
         return "bg-green-500 border-green-400 shadow-green-200";
      }
      return "bg-gray-300 border-gray-200 shadow-gray-100";
   };

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Navigation className="text-green-600" size={20} />
            Delivery Route
         </h3>

         {/* Enhanced Map Container */}
         <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-50 rounded-xl h-72 mb-6 overflow-hidden border border-gray-100">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10">
               <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <defs>
                     <pattern
                        id="grid"
                        width="30"
                        height="30"
                        patternUnits="userSpaceOnUse"
                     >
                        <path
                           d="M 30 0 L 0 0 0 30"
                           fill="none"
                           stroke="#10b981"
                           strokeWidth="1"
                        />
                     </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
               </svg>
            </div>

            {/* Animated Route Line */}
            <svg className="absolute inset-0 w-full h-full">
               <defs>
                  <linearGradient
                     id="routeGradient"
                     x1="0%"
                     y1="0%"
                     x2="100%"
                     y2="0%"
                  >
                     <stop offset="0%" stopColor="#10b981" />
                     <stop
                        offset={`${(currentLocationIndex / 3) * 100}%`}
                        stopColor="#10b981"
                     />
                     <stop
                        offset={`${(currentLocationIndex / 3) * 100 + 10}%`}
                        stopColor="#d1d5db"
                     />
                     <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
               </defs>
               <path
                  d="M 60 220 Q 120 180 180 200 Q 240 170 300 190 Q 360 160 420 180"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="8,4"
                  className="drop-shadow-sm"
               />
            </svg>

            {/* Location Markers */}
            {mapLocations.map((location, index) => (
               <motion.div
                  key={location.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                     delay: index * 0.3,
                     type: "spring",
                     stiffness: 200,
                  }}
                  className={`absolute w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg ${getLocationColor(
                     index
                  )}`}
                  style={{
                     left: `${15 + index * 22}%`,
                     top: `${55 + (index % 2) * 15}%`,
                  }}
               >
                  {getLocationIcon(
                     location.type,
                     index <= currentLocationIndex
                  )}

                  {/* Active Location Pulse */}
                  {index === currentLocationIndex &&
                     order.currentStatus !== "delivered" && (
                        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40"></div>
                     )}

                  {/* Location Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                     <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                           index <= currentLocationIndex
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                     >
                        {location.name.split(" ")[0]}
                     </span>
                  </div>
               </motion.div>
            ))}

            {/* Animated Delivery Vehicle */}
            {order.currentStatus !== "delivered" && (
               <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: `${currentLocationIndex * 22}%` }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{ left: "10%" }}
               >
                  <motion.div
                     animate={{ y: [0, -3, 0] }}
                     transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                     }}
                     className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                  >
                     <Truck className="text-white" size={16} />
                  </motion.div>
               </motion.div>
            )}

            {/* Delivered Celebration */}
            {order.currentStatus === "delivered" && (
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  className="absolute top-1/2 right-[15%] transform -translate-y-1/2"
               >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                     <Home className="text-white" size={24} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></div>
               </motion.div>
            )}
         </div>

         {/* Enhanced Location List */}
         <div className="space-y-3">
            {mapLocations.map((location, index) => (
               <motion.div
                  key={location.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                     index <= currentLocationIndex
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm"
                        : "bg-gray-50 border-gray-200"
                  }`}
               >
                  <div
                     className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getLocationColor(
                        index
                     )}`}
                  >
                     {getLocationIcon(
                        location.type,
                        index <= currentLocationIndex
                     )}
                  </div>

                  <div className="flex-1">
                     <span
                        className={`font-medium ${
                           index <= currentLocationIndex
                              ? "text-green-800"
                              : "text-gray-600"
                        }`}
                     >
                        {location.name}
                     </span>
                  </div>

                  {index === currentLocationIndex &&
                     order.currentStatus !== "delivered" && (
                        <motion.span
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                        >
                           Current
                        </motion.span>
                     )}

                  {index < currentLocationIndex && (
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                     >
                        <motion.div
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 0.5 }}
                        >
                           <svg width="12" height="12" viewBox="0 0 12 12">
                              <path
                                 d="M2 6l3 3 5-5"
                                 stroke="white"
                                 strokeWidth="2"
                                 fill="none"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              />
                           </svg>
                        </motion.div>
                     </motion.div>
                  )}
               </motion.div>
            ))}
         </div>

         {/* Enhanced Distance & Time Info */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl"
         >
            <div className="flex items-center gap-3 mb-3">
               <Route className="text-blue-600" size={20} />
               <span className="font-semibold text-blue-800">
                  Route Information
               </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex justify-between items-center">
                  <span className="text-blue-700 text-sm">Total Distance:</span>
                  <span className="font-semibold text-blue-800">12.5 km</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-blue-700 text-sm">Est. Time:</span>
                  <span className="font-semibold text-blue-800">2-3 hours</span>
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export default DeliveryMap;
