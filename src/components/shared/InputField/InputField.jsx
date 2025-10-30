import { useTheme } from "../../../hooks/useTheme";

const InputField = ({
   name,
   label,
   icon: Icon,
   type,
   placeholder,
   defaultValue,
   validationRules,
   register,
   errors,
   rows = 3,
   options = [],
}) => {
   const { theme } = useTheme();
   const isDark = theme === "dark";

   const isTextArea = type === "textarea";
   const isSelect = type === "select";
   const isFile = type === "file";

   return (
      <div className="w-full">
         {label && (
            <label
               htmlFor={name}
               className={`block text-sm font-semibold mb-2 ${
                  isDark ? "text-gray-200" : "text-gray-700"
               }`}
            >
               {label}
            </label>
         )}

         <div className="relative">
            {Icon && !isFile && (
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Icon
                     className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                     }`}
                  />
               </div>
            )}

            {isTextArea ? (
               <textarea
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  rows={rows}
                  {...register(name, validationRules)}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm
              ${
                 isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }
              ${
                 errors[name]
                    ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              focus:outline-none
            `}
               ></textarea>
            ) : isSelect ? (
               <select
                  id={name}
                  name={name}
                  {...register(name, validationRules)}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm appearance-none cursor-pointer
              ${Icon ? "pl-10" : "pl-4"}
              ${
                 isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
              }
              ${
                 errors[name]
                    ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              focus:outline-none
            `}
               >
                  <option
                     value=""
                     className={isDark ? "bg-gray-800" : "bg-white"}
                  >
                     {placeholder ||
                        `Select ${label?.toLowerCase() || "option"}`}
                  </option>
                  {options.map((option) => (
                     <option
                        key={option._id || option.value}
                        value={option._id || option.value}
                        className={isDark ? "bg-gray-800" : "bg-white"}
                     >
                        {option.name || option.label}
                     </option>
                  ))}
               </select>
            ) : isFile ? (
               <div className="relative">
                  <input
                     type="file"
                     id={name}
                     name={name}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                     {...register(name, validationRules)}
                  />
                  <div
                     className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200
              ${
                 isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
              }
              ${
                 errors[name]
                    ? "border-2 border-red-500"
                    : "border hover:border-blue-400"
              }
            `}
                  >
                     {Icon && (
                        <Icon
                           className={`w-5 h-5 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                           }`}
                        />
                     )}
                     <span
                        className={`text-sm ${
                           isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                     >
                        {placeholder || "Choose file..."}
                     </span>
                  </div>
               </div>
            ) : (
               <input
                  type={type}
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  defaultValue={defaultValue}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm
              ${Icon ? "pl-10" : "pl-4"}
              ${
                 isDark
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }
              ${
                 errors[name]
                    ? "border-2 border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              focus:outline-none
            `}
                  {...register(name, validationRules)}
               />
            )}
         </div>

         {errors[name] && (
            <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
               <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
               {errors[name].message}
            </p>
         )}
      </div>
   );
};

export default InputField;
