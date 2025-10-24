import React from "react";
import { motion } from "framer-motion";

const Specialist = ({
   specialist,
   selectedSpecialist,
   setSelectedSpecialist,
   theme,
}) => {
   return (
      <div>
         <motion.div
            whileHover={{
               backgroundColor: theme === "dark" ? "#374151" : "#f8fafc",
            }}
            onClick={() => setSelectedSpecialist(specialist)}
            className={`p-4 border-b cursor-pointer transition-colors ${
               theme === "dark" ? "border-gray-600" : "border-gray-100"
            } ${
               selectedSpecialist?.firebaseUid === specialist.firebaseUid
                  ? theme === "dark"
                     ? "bg-green-900 border-l-4 border-l-green-400"
                     : "bg-green-50 border-l-4 border-l-green-500"
                  : ""
            }`}
         >
            <div className="flex items-center gap-4">
               <div className="relative">
                  <img
                     src={specialist.userPhoto}
                     alt={specialist.userName}
                     className="w-12 h-12 rounded-full object-cover"
                  />
                  <div
                     className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        specialist.status === "online"
                           ? "bg-green-500"
                           : specialist.status === "away"
                           ? "bg-yellow-500"
                           : "bg-gray-400"
                     }`}
                  />
               </div>
               <div className="flex-1 min-w-0">
                  <h4
                     className={`font-semibold truncate ${
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                     }`}
                  >
                     {specialist.userName}
                  </h4>
                  <p
                     className={`text-sm truncate ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                     }`}
                  >
                     {specialist.specialty}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                     <span
                        className={`text-xs ${
                           theme === "dark" ? "fg-dark" : "text-gray-500"
                        }`}
                     >
                        {specialist.experience ?? ""}
                     </span>
                  </div>
                  {specialist.status === "online" ? (
                     <span
                        className={`text-xs ${
                           theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                        }`}
                     >
                        Online now
                     </span>
                  ) : (
                     <span
                        className={`text-xs ${
                           theme === "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                     >
                        Last seen{" "}
                        {specialist.lastSeen
                           ? new Date(specialist.lastSeen).toLocaleString()
                           : "unknown"}
                     </span>
                  )}
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export default Specialist;
