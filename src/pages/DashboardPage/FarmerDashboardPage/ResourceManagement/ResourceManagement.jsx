import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Filter, Package } from "lucide-react";
import ResourceCard from "./Components/ResourceCard";
import AddResourceModal from "./Components/AddResourceModal";
import UsageChart from "./Components/UsageChart";
import ResourceStats from "./Components/ResourceStats";
import ExpiryAlerts from "./Components/ExpiryAlerts";
import axios from "axios";
import LoadingSpinner from "../../../../components/shared/LoadingSpinner";
import { useTheme } from "../../../../hooks/useTheme";

const ResourceManagement = () => {
   const {theme} = useTheme();

    const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light";

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [filterCategory, setFilterCategory] = useState("all");
   const [selectedResource, setSelectedResource] = useState(null);

   // Fetch resources
   const { data: resources, isLoading } = useQuery({
      queryKey: ["resources"],
      queryFn: async () => {
         const res = await axios.get(
            `${import.meta.env.VITE_Server_API_KEY}/resources`
         );
         console.log(res.data);
         return res.data;
      },
   });

   const handleAddResource = (data) => {};

   const handleEditResource = (resource) => {
      setSelectedResource(resource);
      setIsModalOpen(true);
   };

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
      },
   };

   if (!resources || isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <div className={` min-h-screen bg-gradient-to-br from-green-50 to-yellow-50`}>
         <div className={`${themeBackgroundStyle} container mx-auto px-4 py-8`}>
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                     <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                        <Package className="text-primary-500" size={40} />
                        Resource Management
                     </h1>
                     <p className="text-gray-600 text-lg">
                        Track and optimize your farming resources efficiently
                     </p>
                  </div>
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => {
                        setSelectedResource(null);
                        setIsModalOpen(true);
                     }}
                     className="bg-green-500 text-white hover:bg-primary-600  px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all duration-200"
                  >
                     <Plus size={20} />
                     Add Resource
                  </motion.button>
               </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="mb-8"
            >
               <ResourceStats resources={resources} />
            </motion.div>

            {/* Expiry Alerts */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="mb-8"
            >
               <ExpiryAlerts />
            </motion.div>

            {/* Usage Chart */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="mb-8"
            >
               <UsageChart resources={resources} />
            </motion.div>

            {/* Search and Filter */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="mb-6"
            >
               <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                     <div className="relative flex-1">
                        <Search
                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                           size={20}
                        />
                        <input
                           type="text"
                           placeholder="Search resources..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                     </div>
                     <div className="relative">
                        <Filter
                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                           size={20}
                        />
                        <select
                           value={filterCategory}
                           onChange={(e) => setFilterCategory(e.target.value)}
                           className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                        >
                           <option value="all">All Categories</option>
                           <option value="seeds">Seeds</option>
                           <option value="fertilizers">Fertilizers</option>
                           <option value="pesticides">Pesticides</option>
                           <option value="tools">Tools</option>
                        </select>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Resources Grid */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
               {isLoading ? (
                  // Loading skeletons
                  Array.from({ length: 8 }).map((_, index) => (
                     <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse"
                     >
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                     </motion.div>
                  ))
               ) : resources.length === 0 ? (
                  <motion.div
                     variants={itemVariants}
                     className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500"
                  >
                     <Package size={64} className="mb-4 opacity-50" />
                     <h3 className="text-xl font-semibold mb-2">
                        No resources found
                     </h3>
                     <p>
                        Start by adding your first resource to track inventory
                     </p>
                  </motion.div>
               ) : (
                  resources.map((resource) => (
                     <motion.div key={resource._id} variants={itemVariants}>
                        <ResourceCard
                           resource={resource}
                           onEdit={handleEditResource}
                        />
                     </motion.div>
                  ))
               )}
            </motion.div>

            {/* Add Resource Modal */}
            <AddResourceModal
               isOpen={isModalOpen}
               onClose={() => {
                  setIsModalOpen(false);
                  setSelectedResource(null);
               }}
               onSubmit={handleAddResource}
               resource={selectedResource}
               isLoading={
                  isLoading
               }
            />
         </div>
      </div>
   );
};

export default ResourceManagement;
