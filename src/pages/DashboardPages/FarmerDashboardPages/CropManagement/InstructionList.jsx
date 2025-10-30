import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import { useTheme } from "../../../../hooks/useTheme";
import InstructionCard from "../../../../components/Dashboard/RouteBasedComponents/FarmerRoutesComponents/Cropmanagment/InstructionCard";
import InstructionDetailsModal from "../../../../components/Dashboard/RouteBasedComponents/FarmerRoutesComponents/Cropmanagment/InstructionDetailsModal";
import { BookOpen, Moon, Sun } from "lucide-react";
import Container from "../../../../components/shared/Container";

const InstructionList = () => {
   const { theme } = useTheme();
   const isDark = theme === "dark";

   const axiosSecure = useAxiosSecure();
   const [instructions, setInstructions] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedInstruction, setSelectedInstruction] = useState(null);

   const fetchInstructions = async () => {
      try {
         setLoading(true);
         setError(null);
         // GET /instructions is protected in your backend — use protected flag
         const res = await axiosSecure.get("/instructions/all");
         setInstructions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
         console.error("Failed to load instructions:", err);
         setError(
            err?.response?.data?.message || err.message || "Failed to fetch"
         );
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchInstructions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleViewDetails = (instruction) => {
      setSelectedInstruction(instruction);
   };

   const handleCloseModal = () => {
      setSelectedInstruction(null);
   };

   return (
      <div
         className={`min-h-screen transition-colors duration-200 py-8 ${
            isDark ? "bg-gray-900" : "bg-gray-50"
         }`}
      >
         <Container>
            <div className="flex items-center justify-between mb-8 px-2">
               <div className="flex items-center gap-3">
                  <div
                     className={`p-3 rounded-lg ${
                        isDark
                           ? "bg-green-500/20 text-green-400"
                           : "bg-green-100 text-green-600"
                     }`}
                  >
                     <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                     <h1
                        className={`text-2xl font-bold ${
                           isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                     >
                        Instructions
                     </h1>
                     <p
                        className={`text-sm mt-1 ${
                           isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                     >
                        {instructions.length} instruction
                        {instructions.length !== 1 ? "s" : ""} available
                     </p>
                  </div>
               </div>
            </div>

            {loading ? (
               <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600" />
                  <p
                     className={`mt-4 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                     }`}
                  >
                     Loading instructions…
                  </p>
               </div>
            ) : error ? (
               <div
                  className={`text-center py-12 rounded-lg border ${
                     isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                  }`}
               >
                  <p
                     className={`${
                        isDark ? "text-red-400" : "text-red-600"
                     } font-medium`}
                  >
                     Error
                  </p>
                  <p
                     className={`${
                        isDark ? "text-gray-300" : "text-gray-600"
                     } mt-2`}
                  >
                     {error}
                  </p>
                  <button
                     onClick={fetchInstructions}
                     className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                     Reload
                  </button>
               </div>
            ) : instructions.length === 0 ? (
               <div
                  className={`text-center py-16 rounded-lg border ${
                     isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                  }`}
               >
                  <BookOpen
                     className={`w-16 h-16 mx-auto mb-4 ${
                        isDark ? "text-gray-600" : "text-gray-400"
                     }`}
                  />
                  <p
                     className={`text-lg font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                     }`}
                  >
                     No instructions available
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructions.map((instruction) => (
                     <InstructionCard
                        key={
                           instruction._id?.$oid ??
                           instruction._id ??
                           Math.random()
                        }
                        instruction={instruction}
                        onViewDetails={handleViewDetails}
                     />
                  ))}
               </div>
            )}
         </Container>

         {selectedInstruction && (
            <InstructionDetailsModal
               instructionId={selectedInstruction._id}
               onClose={handleCloseModal}
            />
         )}
      </div>
   );
};

export default InstructionList;
