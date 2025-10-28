import { X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ModalFormat = ({
   width,
   height,
   headerText,
   modalClosingFunction,
   form,
}) => {
   const { theme } = useTheme();
   const isDark = theme === "dark";

   return (
      <>
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
               className={`${width} ${height} rounded-xl shadow-2xl overflow-hidden transform transition-all
            ${
               isDark
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
            }
          `}
            >
               <div
                  className={`flex items-center justify-between px-6 py-4 border-b
              ${
                 isDark
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700"
                    : "bg-gradient-to-r from-green-400 to-green-200 border-gray-200"
              }
            `}
               >
                  <h3
                     className={`text-lg font-bold
                ${isDark ? "text-gray-100" : "text-gray-900"}
              `}
                  >
                     {headerText}
                  </h3>
                  <button
                     onClick={modalClosingFunction}
                     className={`p-1.5 rounded-lg transition-all duration-200 group
                ${
                   isDark
                      ? "hover:bg-red-500/20 border border-gray-700 hover:border-red-500"
                      : "hover:bg-red-50 border border-gray-300 hover:border-red-500"
                }
              `}
                     aria-label="Close modal"
                  >
                     <X
                        size={20}
                        className={`transition-colors duration-200
                  ${
                     isDark
                        ? "text-gray-400 group-hover:text-red-400"
                        : "text-gray-600 group-hover:text-red-600"
                  }
                `}
                     />
                  </button>
               </div>
               <div
                  className={`overflow-y-auto
              ${isDark ? "bg-gray-900" : "bg-white"}
            `}
                  style={{ maxHeight: "calc(90vh - 80px)" }}
               >
                  {form}
               </div>
            </div>
         </div>
      </>
   );
};

export default ModalFormat;
