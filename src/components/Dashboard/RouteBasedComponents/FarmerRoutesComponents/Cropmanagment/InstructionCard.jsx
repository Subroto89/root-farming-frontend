import React from "react";
import { Eye, Calendar, Clock, Layers } from "lucide-react";
import { useTheme } from "../../../../../hooks/useTheme";

const InstructionCard = ({ instruction, onViewDetails }) => {
   const { theme } = useTheme();
   const isDark = theme === "dark";

   // normalize createdAt: support { $date: string } or ISO string / Date
   const getCreatedAtDate = () => {
      if (!instruction) return null;
      const created = instruction.createdAt;
      if (!created) return null;

      // Mongo export style: { $date: "..." }
      if (created.$date) return new Date(created.$date);

      // sometimes stored as ISO string
      if (typeof created === "string") return new Date(created);

      // sometimes stored as Date object
      if (created instanceof Date) return created;

      // sometimes top-level createdAt may be an object containing value
      try {
         return new Date(created);
      } catch {
         return null;
      }
   };

   const createdAtDate = getCreatedAtDate();
   const createdAtDisplay = createdAtDate
      ? createdAtDate.toLocaleDateString("en-US", {
           year: "numeric",
           month: "short",
           day: "numeric",
        })
      : "";

   const phases = Array.isArray(instruction.phases) ? instruction.phases : [];

   return (
      <div
         className={`rounded-lg border transition-all duration-200 hover:shadow-lg ${
            isDark
               ? "bg-gray-800 border-gray-700 hover:border-green-500/50"
               : "bg-white border-gray-200 hover:border-green-500/50"
         }`}
      >
         <div className="p-5">
            <div className="flex items-start justify-between mb-4">
               <div className="flex-1">
                  <h3
                     className={`text-lg font-bold mb-2 line-clamp-2 ${
                        isDark ? "text-gray-100" : "text-gray-900"
                     }`}
                  >
                     {instruction.title}
                  </h3>
                  <p
                     className={`text-sm line-clamp-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                     }`}
                  >
                     {instruction.description}
                  </p>
               </div>
            </div>

            <div className="space-y-2 mb-4">
               <div className="flex items-center gap-2">
                  <Layers
                     className={`w-4 h-4 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                     }`}
                  />
                  <span
                     className={`text-xs font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                     }`}
                  >
                     {phases.length} Phase{phases.length !== 1 ? "s" : ""}
                  </span>
               </div>

               {phases.length > 0 && (
                  <div
                     className={`pl-6 space-y-1 text-xs ${
                        isDark ? "text-gray-500" : "text-gray-500"
                     }`}
                  >
                     <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Start: Day {phases[0].dayOffset}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Duration: {phases[0].duration} days</span>
                     </div>
                  </div>
               )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
               <span
                  className={`text-xs ${
                     isDark ? "text-gray-500" : "text-gray-500"
                  }`}
               >
                  {createdAtDisplay}
               </span>

               <button
                  onClick={() => onViewDetails(instruction)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                     isDark
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                        : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                  }`}
               >
                  <Eye className="w-4 h-4" />
                  View Details
               </button>
            </div>
         </div>
      </div>
   );
};

export default InstructionCard;
