import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, Layers, CheckSquare } from "lucide-react";
import { useTheme } from "../../../../../hooks/useTheme";
import ModalFormat from "../../../../shared/ModalFormat";
import useAxiosSecure from "../../../../../hooks/UseAxiosSecure";

const InstructionDetailsModal = ({ instructionId, onClose }) => {
   const { theme } = useTheme();
   const isDark = theme === "dark";
   const axiosSecure = useAxiosSecure();

   const [instruction, setInstruction] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const fetchInstruction = async (id) => {
      try {
         setLoading(true);
         setError(null);
         const res = await axiosSecure.get(`/instructions/${id}`, {
            protected: true,
         });
         setInstruction(res.data);
      } catch (err) {
         console.error("Error fetching instruction:", err);
         setError(
            err?.response?.data?.message ||
               err.message ||
               "Failed to fetch instruction"
         );
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (instructionId) fetchInstruction(instructionId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [instructionId]);

   if (loading) {
      return (
         <ModalFormat
            width="max-w-3xl w-full"
            height="max-h-[90vh]"
            headerText="Loading..."
            modalClosingFunction={onClose}
            form={
               <div className="p-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600" />
                  <p
                     className={`mt-4 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                     }`}
                  >
                     Loading instruction...
                  </p>
               </div>
            }
         />
      );
   }

   if (error) {
      return (
         <ModalFormat
            width="max-w-3xl w-full"
            height="max-h-[90vh]"
            headerText="Error"
            modalClosingFunction={onClose}
            form={
               <div className="p-6 text-center">
                  <p
                     className={`text-red-500 font-medium ${
                        isDark ? "text-red-400" : "text-red-600"
                     }`}
                  >
                     {error}
                  </p>
               </div>
            }
         />
      );
   }

   if (!instruction) return null;

   return (
      <ModalFormat
         width="max-w-3xl w-full"
         height="max-h-[90vh]"
         headerText={instruction.title}
         modalClosingFunction={onClose}
         form={
            <div className="p-6 space-y-6">
               <div>
                  <h4
                     className={`text-sm font-semibold mb-2 uppercase tracking-wide ${
                        isDark ? "text-gray-400" : "text-gray-600"
                     }`}
                  >
                     Description
                  </h4>
                  <p
                     className={`text-base leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-700"
                     }`}
                  >
                     {instruction.description}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div
                     className={`p-4 rounded-lg border ${
                        isDark
                           ? "bg-gray-800 border-gray-700"
                           : "bg-gray-50 border-gray-200"
                     }`}
                  >
                     <div className="flex items-center gap-2 mb-1">
                        <Layers
                           className={`w-4 h-4 ${
                              isDark ? "text-green-400" : "text-green-600"
                           }`}
                        />
                        <span
                           className={`text-xs font-semibold uppercase tracking-wide ${
                              isDark ? "text-gray-400" : "text-gray-600"
                           }`}
                        >
                           Total Phases
                        </span>
                     </div>
                     <p
                        className={`text-2xl font-bold ${
                           isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                     >
                        {instruction.phases?.length || 0}
                     </p>
                  </div>

                  <div
                     className={`p-4 rounded-lg border ${
                        isDark
                           ? "bg-gray-800 border-gray-700"
                           : "bg-gray-50 border-gray-200"
                     }`}
                  >
                     <div className="flex items-center gap-2 mb-1">
                        <FileText
                           className={`w-4 h-4 ${
                              isDark ? "text-green-400" : "text-green-600"
                           }`}
                        />
                        <span
                           className={`text-xs font-semibold uppercase tracking-wide ${
                              isDark ? "text-gray-400" : "text-gray-600"
                           }`}
                        >
                           Created Date
                        </span>
                     </div>
                     <p
                        className={`text-sm font-semibold ${
                           isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                     >
                        {instruction.createdAt?.$date
                           ? new Date(
                                instruction.createdAt.$date
                             ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                             })
                           : ""}
                     </p>
                  </div>
               </div>

               <div>
                  <h4
                     className={`text-sm font-semibold mb-3 uppercase tracking-wide flex items-center gap-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                     }`}
                  >
                     <Layers className="w-4 h-4" />
                     Phases
                  </h4>

                  <div className="space-y-3">
                     {instruction.phases?.map((phase, index) => (
                        <div
                           key={index}
                           className={`rounded-lg border p-4 transition-all duration-200 ${
                              isDark
                                 ? "bg-gray-800 border-gray-700 hover:border-green-500/50"
                                 : "bg-white border-gray-200 hover:border-green-500/50"
                           }`}
                        >
                           <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3">
                                 <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                       isDark
                                          ? "bg-green-500/20 text-green-400"
                                          : "bg-green-100 text-green-600"
                                    }`}
                                 >
                                    {index + 1}
                                 </div>
                                 <div>
                                    <h5
                                       className={`font-bold text-base mb-1 ${
                                          isDark
                                             ? "text-gray-100"
                                             : "text-gray-900"
                                       }`}
                                    >
                                       {phase.name}
                                    </h5>
                                    <p
                                       className={`text-sm ${
                                          isDark
                                             ? "text-gray-400"
                                             : "text-gray-600"
                                       }`}
                                    >
                                       {phase.description}
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-1.5">
                                 <Calendar
                                    className={`w-3.5 h-3.5 ${
                                       isDark
                                          ? "text-gray-500"
                                          : "text-gray-500"
                                    }`}
                                 />
                                 <span
                                    className={
                                       isDark
                                          ? "text-gray-400"
                                          : "text-gray-600"
                                    }
                                 >
                                    Day {phase.dayOffset}
                                 </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <Clock
                                    className={`w-3.5 h-3.5 ${
                                       isDark
                                          ? "text-gray-500"
                                          : "text-gray-500"
                                    }`}
                                 />
                                 <span
                                    className={
                                       isDark
                                          ? "text-gray-400"
                                          : "text-gray-600"
                                    }
                                 >
                                    {phase.duration} days
                                 </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <CheckSquare
                                    className={`w-3.5 h-3.5 ${
                                       isDark
                                          ? "text-gray-500"
                                          : "text-gray-500"
                                    }`}
                                 />
                                 <span
                                    className={
                                       isDark
                                          ? "text-gray-400"
                                          : "text-gray-600"
                                    }
                                 >
                                    {phase.tasks?.length || 0} task
                                    {(phase.tasks?.length || 0) !== 1
                                       ? "s"
                                       : ""}
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         }
      />
   );
};

export default InstructionDetailsModal;
