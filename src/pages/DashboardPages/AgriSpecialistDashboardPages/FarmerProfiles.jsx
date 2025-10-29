import React, { useState, useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { User, MapPin, Phone, Mail, Calendar } from "lucide-react";

const FarmerProfiles = () => {
   const { theme } = useTheme();

   // Theme styles
   const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   const themeFgOfFgStyle =
      theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

   // Mock data for demonstration
   const [farmers] = useState([
      {
         id: 1,
         name: "John Smith",
         email: "john.smith@email.com",
         phone: "+1 234-567-8900",
         location: "California, USA",
         joinDate: "2024-01-15",
         fields: 3,
         crops: ["Wheat", "Corn", "Tomatoes"],
         avatar: "https://via.placeholder.com/150",
      },
      {
         id: 2,
         name: "Maria Garcia",
         email: "maria.garcia@email.com",
         phone: "+1 234-567-8901",
         location: "Texas, USA",
         joinDate: "2024-02-20",
         fields: 5,
         crops: ["Rice", "Soybeans", "Cotton"],
         avatar: "https://via.placeholder.com/150",
      },
      {
         id: 3,
         name: "Ahmed Hassan",
         email: "ahmed.hassan@email.com",
         phone: "+1 234-567-8902",
         location: "Florida, USA",
         joinDate: "2024-03-10",
         fields: 2,
         crops: ["Citrus", "Vegetables"],
         avatar: "https://via.placeholder.com/150",
      },
   ]);

   return (
      <div className={`min-h-screen ${themeBackgroundStyle}`}>
         <div className="container mx-auto px-4 py-8">
            <div className={`${themeForegroundStyle} rounded-xl shadow-lg p-8`}>
               <h1
                  className={`text-4xl font-bold mb-4 ${themeForegroundStyle}`}
               >
                  Farmer Profiles
               </h1>
               <p className={`text-lg mb-6 ${themeForegroundStyle}`}>
                  View and manage farmer profiles who have consulted with you.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {farmers.map((farmer) => (
                     <div
                        key={farmer.id}
                        className={`${themeFgOfFgStyle} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow`}
                     >
                        <div className="flex items-center mb-4">
                           <img
                              src={farmer.avatar}
                              alt={farmer.name}
                              className="w-16 h-16 rounded-full object-cover mr-4"
                           />
                           <div>
                              <h3
                                 className={`text-xl font-semibold ${themeForegroundStyle}`}
                              >
                                 {farmer.name}
                              </h3>
                              <p
                                 className={`text-sm ${
                                    theme === "dark"
                                       ? "text-gray-400"
                                       : "text-gray-600"
                                 }`}
                              >
                                 {farmer.location}
                              </p>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <div className="flex items-center">
                              <Mail
                                 size={16}
                                 className={`mr-2 ${
                                    theme === "dark"
                                       ? "text-blue-400"
                                       : "text-blue-600"
                                 }`}
                              />
                              <span
                                 className={`text-sm ${themeForegroundStyle}`}
                              >
                                 {farmer.email}
                              </span>
                           </div>

                           <div className="flex items-center">
                              <Phone
                                 size={16}
                                 className={`mr-2 ${
                                    theme === "dark"
                                       ? "text-green-400"
                                       : "text-green-600"
                                 }`}
                              />
                              <span
                                 className={`text-sm ${themeForegroundStyle}`}
                              >
                                 {farmer.phone}
                              </span>
                           </div>

                           <div className="flex items-center">
                              <MapPin
                                 size={16}
                                 className={`mr-2 ${
                                    theme === "dark"
                                       ? "text-red-400"
                                       : "text-red-600"
                                 }`}
                              />
                              <span
                                 className={`text-sm ${themeForegroundStyle}`}
                              >
                                 {farmer.location}
                              </span>
                           </div>

                           <div className="flex items-center">
                              <Calendar
                                 size={16}
                                 className={`mr-2 ${
                                    theme === "dark"
                                       ? "text-yellow-400"
                                       : "text-yellow-600"
                                 }`}
                              />
                              <span
                                 className={`text-sm ${themeForegroundStyle}`}
                              >
                                 Joined:{" "}
                                 {new Date(
                                    farmer.joinDate
                                 ).toLocaleDateString()}
                              </span>
                           </div>
                        </div>

                        <div
                           className={`mt-4 pt-4 border-t ${
                              theme === "dark"
                                 ? "border-gray-600"
                                 : "border-gray-200"
                           }`}
                        >
                           <div className="flex justify-between items-center mb-2">
                              <span
                                 className={`text-sm font-medium ${themeForegroundStyle}`}
                              >
                                 Fields:
                              </span>
                              <span
                                 className={`text-sm ${
                                    theme === "dark"
                                       ? "text-blue-400"
                                       : "text-blue-600"
                                 }`}
                              >
                                 {farmer.fields}
                              </span>
                           </div>

                           <div>
                              <span
                                 className={`text-sm font-medium ${themeForegroundStyle}`}
                              >
                                 Crops:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                 {farmer.crops.map((crop, index) => (
                                    <span
                                       key={index}
                                       className={`px-2 py-1 text-xs rounded-full ${
                                          theme === "dark"
                                             ? "bg-green-800 text-green-200"
                                             : "bg-green-100 text-green-800"
                                       }`}
                                    >
                                       {crop}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                           <button
                              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                                 theme === "dark"
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-blue-500 hover:bg-blue-600 text-white"
                              }`}
                           >
                              View Details
                           </button>
                           <button
                              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                                 theme === "dark"
                                    ? "bg-green-600 hover:bg-green-700 text-white"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                           >
                              Start Chat
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {farmers.length === 0 && (
                  <div className="text-center py-12">
                     <User
                        size={64}
                        className={`mx-auto mb-4 ${
                           theme === "dark" ? "text-gray-400" : "text-gray-400"
                        }`}
                     />
                     <h3
                        className={`text-xl font-semibold mb-2 ${themeForegroundStyle}`}
                     >
                        No Farmers Found
                     </h3>
                     <p className={themeForegroundStyle}>
                        No farmers have consulted with you yet.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default FarmerProfiles;
