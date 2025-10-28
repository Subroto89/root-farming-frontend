import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Plus,
   Trash2,
   BookOpen,
   Calendar,
   Clock,
   FileText,
   ChevronDown,
   Sun,
   Moon,
} from "lucide-react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useTheme } from "../../hooks/useTheme";

const InstructionEditor = ({ onSave, initialData = null }) => {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   // theme use
   const { theme } = useTheme();
   const [loading, setLoading] = useState(false);
   const [cropCategories, setCropCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);
   const [variants, setVariants] = useState([]);
   const [isDarkMode, setIsDarkMode] = useState(false);

   const [instruction, setInstruction] = useState({
      title: "",
      categoryId: "",
      subCategoryId: "",
      variantId: "",
      description: "",
      phases: [
         {
            name: "Land Preparation",
            dayOffset: 0,
            duration: 7,
            description: "",
            tasks: [],
         },
      ],
   });

   // load theme mode
   useEffect(() => {
      if (theme === "dark") {
         setIsDarkMode(true);
      } else {
         setIsDarkMode(false);
      }
   }, [theme]);

   // Load crop categories
   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await axiosSecure.get(
               "/categories/get-categories"
            );
            setCropCategories(response.data);
            console.log(response.data);
         } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load crop categories");
         }
      };

      fetchCategories();
   }, [axiosSecure]);

   // Load sub-categories when category changes
   useEffect(() => {
      if (!instruction.categoryId) return;

      const fetchSubCategories = async () => {
         try {
            console.log(instruction.categoryId);
            const response = await axiosSecure.get(
               `/subCategories/get-subCategory/${instruction.categoryId}`
            );
            setSubCategories(response.data);
            console.log(response);
         } catch (error) {
            console.error("Error fetching sub-categories:", error);
            toast.error("Failed to load sub-categories");
         }
      };

      fetchSubCategories();
   }, [instruction.categoryId, axiosSecure]);

   // Load variants when sub-category changes
   useEffect(() => {
      if (!instruction.subCategoryId) return;

      const fetchVariants = async () => {
         try {
            const response = await axiosSecure.get(
               `/api/crops/variants/${instruction.subCategoryId}`
            );
            setVariants(response.data);
         } catch (error) {
            console.error("Error fetching variants:", error);
            toast.error("Failed to load variants");
         }
      };

      fetchVariants();
   }, [instruction.subCategoryId, axiosSecure]);

   // Load existing data if editing
   useEffect(() => {
      if (initialData) {
         setInstruction(initialData);
      }
   }, [initialData]);

   const handlePhaseChange = (index, field, value) => {
      const newPhases = [...instruction.phases];
      newPhases[index] = {
         ...newPhases[index],
         [field]: value,
      };
      setInstruction({ ...instruction, phases: newPhases });
   };

   const addPhase = () => {
      const lastPhase = instruction.phases[instruction.phases.length - 1];
      const newDayOffset = lastPhase.dayOffset + lastPhase.duration;

      setInstruction({
         ...instruction,
         phases: [
            ...instruction.phases,
            {
               name: "",
               dayOffset: newDayOffset,
               duration: 7,
               description: "",
               tasks: [],
            },
         ],
      });
   };

   const removePhase = (index) => {
      if (instruction.phases.length <= 1) {
         toast.error("Cannot remove the last phase");
         return;
      }

      const newPhases = instruction.phases.filter((_, i) => i !== index);
      setInstruction({ ...instruction, phases: newPhases });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const payload = {
            ...instruction,
            authorId: user.uid,
            createdAt: new Date().toISOString(),
         };

         await onSave(payload);
         toast.success("Instruction saved successfully");
      } catch (error) {
         console.error("Error saving instruction:", error);
         toast.error("Failed to save instruction");
      } finally {
         setLoading(false);
      }
   };

   const themeClasses = {
      container: isDarkMode
         ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900"
         : "min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50",
      card: isDarkMode
         ? "bg-gray-800 border-gray-700 shadow-2xl"
         : "bg-white border-gray-200 shadow-xl",
      input: isDarkMode
         ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400"
         : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500",
      text: isDarkMode ? "text-white" : "text-gray-900",
      textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
      phaseCard: isDarkMode
         ? "bg-gray-700 border-gray-600"
         : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
   };

   return (
      <div className={themeClasses.container}>
         <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header with Theme Toggle */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex justify-between items-center mb-8"
            >
               <div className="flex items-center gap-4">
                  <div
                     className={`p-3 rounded-xl ${
                        isDarkMode ? "bg-green-800" : "bg-green-100"
                     }`}
                  >
                     <BookOpen
                        className={`w-8 h-8 ${
                           isDarkMode ? "text-green-300" : "text-green-600"
                        }`}
                     />
                  </div>
                  <div>
                     <h1 className={`text-3xl font-bold ${themeClasses.text}`}>
                        {initialData
                           ? "Edit Instruction"
                           : "Create New Instruction"}
                     </h1>
                     <p className={themeClasses.textSecondary}>
                        Design comprehensive cultivation guidelines for farmers
                     </p>
                  </div>
               </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
               {/* Basic Information Card */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`${themeClasses.card} rounded-2xl p-8 mb-8 border`}
               >
                  <div className="flex items-center gap-3 mb-6">
                     <FileText
                        className={`w-6 h-6 ${
                           isDarkMode ? "text-green-400" : "text-green-600"
                        }`}
                     />
                     <h2
                        className={`text-xl font-semibold ${themeClasses.text}`}
                     >
                        Basic Information
                     </h2>
                  </div>

                  <div className="space-y-6">
                     {/* Title */}
                     <div>
                        <label
                           className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                        >
                           Instruction Title
                        </label>
                        <input
                           type="text"
                           value={instruction.title}
                           onChange={(e) =>
                              setInstruction({
                                 ...instruction,
                                 title: e.target.value,
                              })
                           }
                           className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${themeClasses.input}`}
                           placeholder="Enter a descriptive title for your instruction"
                           required
                        />
                     </div>

                     {/* Category Selection */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                           <label
                              className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                           >
                              Category
                           </label>
                           <div className="relative">
                              <select
                                 value={instruction.categoryId}
                                 onChange={(e) =>
                                    setInstruction({
                                       ...instruction,
                                       categoryId: e.target.value,
                                    })
                                 }
                                 className={`w-full px-4 py-3 rounded-xl border-2 appearance-none transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${themeClasses.input}`}
                                 required
                              >
                                 <option value="">Select Category</option>
                                 {cropCategories.map((category) => (
                                    <option
                                       key={category._id}
                                       value={category._id}
                                    >
                                       {category.categoryName}
                                    </option>
                                 ))}
                              </select>
                              <ChevronDown
                                 className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textSecondary} pointer-events-none`}
                              />
                           </div>
                        </div>

                        <div>
                           <label
                              className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                           >
                              Sub Category
                           </label>
                           <div className="relative">
                              <select
                                 value={instruction.subCategoryId}
                                 onChange={(e) =>
                                    setInstruction({
                                       ...instruction,
                                       subCategoryId: e.target.value,
                                    })
                                 }
                                 className={`w-full px-4 py-3 rounded-xl border-2 appearance-none transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${
                                    themeClasses.input
                                 } ${
                                    !instruction.categoryId
                                       ? "opacity-50 cursor-not-allowed"
                                       : ""
                                 }`}
                                 required
                                 disabled={!instruction.categoryId}
                              >
                                 <option value="">Select Sub Category</option>
                                 {subCategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                       {sub.name}
                                    </option>
                                 ))}
                              </select>
                              <ChevronDown
                                 className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textSecondary} pointer-events-none`}
                              />
                           </div>
                        </div>

                        <div>
                           <label
                              className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                           >
                              Variant
                           </label>
                           <div className="relative">
                              <select
                                 value={instruction.variantId}
                                 onChange={(e) =>
                                    setInstruction({
                                       ...instruction,
                                       variantId: e.target.value,
                                    })
                                 }
                                 className={`w-full px-4 py-3 rounded-xl border-2 appearance-none transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${
                                    themeClasses.input
                                 } ${
                                    !instruction.subCategoryId
                                       ? "opacity-50 cursor-not-allowed"
                                       : ""
                                 }`}
                                 required
                                 disabled={!instruction.subCategoryId}
                              >
                                 <option value="">Select Variant</option>
                                 {variants.map((variant) => (
                                    <option
                                       key={variant._id}
                                       value={variant._id}
                                    >
                                       {variant.name}
                                    </option>
                                 ))}
                              </select>
                              <ChevronDown
                                 className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.textSecondary} pointer-events-none`}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Description */}
                     <div>
                        <label
                           className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                        >
                           Description
                        </label>
                        <textarea
                           value={instruction.description}
                           onChange={(e) =>
                              setInstruction({
                                 ...instruction,
                                 description: e.target.value,
                              })
                           }
                           className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-opacity-50 resize-none ${themeClasses.input}`}
                           rows="4"
                           placeholder="Provide a detailed description of the cultivation process"
                           required
                        />
                     </div>
                  </div>
               </motion.div>

               {/* Cultivation Phases Card */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`${themeClasses.card} rounded-2xl p-8 mb-8 border`}
               >
                  <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-3">
                        <Calendar
                           className={`w-6 h-6 ${
                              isDarkMode ? "text-green-400" : "text-green-600"
                           }`}
                        />
                        <h2
                           className={`text-xl font-semibold ${themeClasses.text}`}
                        >
                           Cultivation Phases
                        </h2>
                        <span
                           className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isDarkMode
                                 ? "bg-green-800 text-green-300"
                                 : "bg-green-100 text-green-700"
                           }`}
                        >
                           {instruction.phases.length} Phase
                           {instruction.phases.length !== 1 ? "s" : ""}
                        </span>
                     </div>

                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={addPhase}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                           isDarkMode
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        }`}
                     >
                        <Plus className="w-5 h-5" />
                        Add Phase
                     </motion.button>
                  </div>

                  <div className="space-y-6">
                     <AnimatePresence>
                        {instruction.phases.map((phase, index) => (
                           <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              className={`${themeClasses.phaseCard} rounded-xl p-6 border-2 relative overflow-hidden`}
                           >
                              {/* Phase Number Badge */}
                              <div
                                 className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    isDarkMode
                                       ? "bg-green-700 text-green-300"
                                       : "bg-green-500 text-white"
                                 }`}
                              >
                                 {index + 1}
                              </div>

                              <div className="space-y-6">
                                 {/* Phase Name and Remove Button */}
                                 <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                       <label
                                          className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                                       >
                                          Phase Name
                                       </label>
                                       <input
                                          type="text"
                                          value={phase.name}
                                          onChange={(e) =>
                                             handlePhaseChange(
                                                index,
                                                "name",
                                                e.target.value
                                             )
                                          }
                                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${themeClasses.input}`}
                                          placeholder="e.g., Land Preparation, Sowing, Harvesting"
                                          required
                                       />
                                    </div>

                                    {instruction.phases.length > 1 && (
                                       <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          type="button"
                                          onClick={() => removePhase(index)}
                                          className={`mt-8 p-3 rounded-xl transition-all duration-300 ${
                                             isDarkMode
                                                ? "text-red-400 hover:bg-red-900 hover:text-red-300"
                                                : "text-red-500 hover:bg-red-50 hover:text-red-600"
                                          }`}
                                       >
                                          <Trash2 className="w-5 h-5" />
                                       </motion.button>
                                    )}
                                 </div>

                                 {/* Timing Information */}
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                       <label
                                          className={`block mb-3 text-sm font-semibold ${themeClasses.text} flex items-center gap-2`}
                                       >
                                          <Calendar className="w-4 h-4" />
                                          Start Day
                                       </label>
                                       <input
                                          type="number"
                                          value={phase.dayOffset}
                                          onChange={(e) =>
                                             handlePhaseChange(
                                                index,
                                                "dayOffset",
                                                parseInt(e.target.value)
                                             )
                                          }
                                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${themeClasses.input}`}
                                          min="0"
                                          required
                                       />
                                    </div>

                                    <div>
                                       <label
                                          className={`block mb-3 text-sm font-semibold ${themeClasses.text} flex items-center gap-2`}
                                       >
                                          <Clock className="w-4 h-4" />
                                          Duration (days)
                                       </label>
                                       <input
                                          type="number"
                                          value={phase.duration}
                                          onChange={(e) =>
                                             handlePhaseChange(
                                                index,
                                                "duration",
                                                parseInt(e.target.value)
                                             )
                                          }
                                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-opacity-50 ${themeClasses.input}`}
                                          min="1"
                                          required
                                       />
                                    </div>
                                 </div>

                                 {/* Phase Description */}
                                 <div>
                                    <label
                                       className={`block mb-3 text-sm font-semibold ${themeClasses.text}`}
                                    >
                                       Phase Description
                                    </label>
                                    <textarea
                                       value={phase.description}
                                       onChange={(e) =>
                                          handlePhaseChange(
                                             index,
                                             "description",
                                             e.target.value
                                          )
                                       }
                                       className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-opacity-50 resize-none ${themeClasses.input}`}
                                       rows="3"
                                       placeholder="Describe the activities and requirements for this phase"
                                       required
                                    />
                                 </div>

                                 {/* Phase Timeline Indicator */}
                                 <div
                                    className={`flex items-center gap-2 text-sm ${themeClasses.textSecondary}`}
                                 >
                                    <span
                                       className={`px-3 py-1 rounded-full ${
                                          isDarkMode
                                             ? "bg-gray-700"
                                             : "bg-gray-100"
                                       }`}
                                    >
                                       Days {phase.dayOffset} -{" "}
                                       {phase.dayOffset + phase.duration}
                                    </span>
                                    <span>•</span>
                                    <span>{phase.duration} days duration</span>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>
               </motion.div>

               {/* Action Buttons */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row justify-end gap-4"
               >
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     type="button"
                     onClick={() => window.history.back()}
                     className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                        isDarkMode
                           ? "bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600"
                           : "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400"
                     }`}
                  >
                     Cancel
                  </motion.button>

                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     type="submit"
                     disabled={loading}
                     className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                        isDarkMode
                           ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                           : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                     }`}
                  >
                     {loading ? (
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                           Saving...
                        </div>
                     ) : (
                        "Save Instruction"
                     )}
                  </motion.button>
               </motion.div>
            </form>
         </div>
      </div>
   );
};

export default InstructionEditor;
