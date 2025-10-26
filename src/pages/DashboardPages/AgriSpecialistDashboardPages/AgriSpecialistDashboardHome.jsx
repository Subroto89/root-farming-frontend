import React from "react";
import { useTheme } from "../../../hooks/useTheme";

const AgriSpecialistDashboardHome = () => {
   const { theme } = useTheme();

   // Theme styles
   const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
   const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
   const themeFgOfFgStyle =
      theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

   return (
      <div className={`min-h-screen ${themeBackgroundStyle}`}>
         <div className="container mx-auto px-4 py-8">
            <div className={`${themeForegroundStyle} rounded-xl shadow-lg p-8`}>
               <h1
                  className={`text-4xl font-bold mb-4 ${themeForegroundStyle}`}
               >
                  Agriculture Specialist Dashboard
               </h1>
               <p className={`text-lg mb-6 ${themeForegroundStyle}`}>
                  Welcome to your specialist dashboard. Here you can manage your
                  consultations with farmers and provide expert agricultural
                  guidance.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                     className={`${themeFgOfFgStyle} rounded-lg p-6 shadow-md`}
                  >
                     <h3
                        className={`text-xl font-semibold mb-3 ${themeForegroundStyle}`}
                     >
                        Active Conversations
                     </h3>
                     <p
                        className={`text-3xl font-bold ${
                           theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }`}
                     >
                        12
                     </p>
                     <p className={`text-sm mt-2 ${themeForegroundStyle}`}>
                        Ongoing consultations
                     </p>
                  </div>

                  <div
                     className={`${themeFgOfFgStyle} rounded-lg p-6 shadow-md`}
                  >
                     <h3
                        className={`text-xl font-semibold mb-3 ${themeForegroundStyle}`}
                     >
                        Farmers Helped
                     </h3>
                     <p
                        className={`text-3xl font-bold ${
                           theme === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                        }`}
                     >
                        45
                     </p>
                     <p className={`text-sm mt-2 ${themeForegroundStyle}`}>
                        This month
                     </p>
                  </div>

                  <div
                     className={`${themeFgOfFgStyle} rounded-lg p-6 shadow-md`}
                  >
                     <h3
                        className={`text-xl font-semibold mb-3 ${themeForegroundStyle}`}
                     >
                        Response Time
                     </h3>
                     <p
                        className={`text-3xl font-bold ${
                           theme === "dark"
                              ? "text-yellow-400"
                              : "text-yellow-600"
                        }`}
                     >
                        2.5m
                     </p>
                     <p className={`text-sm mt-2 ${themeForegroundStyle}`}>
                        Average response
                     </p>
                  </div>
               </div>

               <div
                  className={`mt-8 ${themeFgOfFgStyle} rounded-lg p-6 shadow-md`}
               >
                  <h3
                     className={`text-xl font-semibold mb-4 ${themeForegroundStyle}`}
                  >
                     Quick Actions
                  </h3>
                  <div className="flex flex-wrap gap-4">
                     <button
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                           theme === "dark"
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                     >
                        View All Conversations
                     </button>
                     <button
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                           theme === "dark"
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                     >
                        Update Profile
                     </button>
                     <button
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                           theme === "dark"
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : "bg-purple-500 hover:bg-purple-600 text-white"
                        }`}
                     >
                        View Analytics
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AgriSpecialistDashboardHome;
