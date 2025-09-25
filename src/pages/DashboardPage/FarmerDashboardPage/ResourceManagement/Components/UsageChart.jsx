import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3 } from "lucide-react";

const UsageChart = ({ resources }) => {
   const chartData = React.useMemo(() => {
      const categoryData = resources.reduce((acc, resource) => {
         if (!acc[resource.category]) {
            acc[resource.category] = { total: 0, items: 0 };
         }
         acc[resource.category].total += resource.currentStock;
         acc[resource.category].items += 1;
         return acc;
      }, {});

      return Object.entries(categoryData)
         .map(([category, data]) => ({
            category,
            value: data.total,
            items: data.items,
            percentage: 0, // Will be calculated after we know the total
         }))
         .sort((a, b) => b.value - a.value);
   }, [resources]);

   const total = chartData.reduce((sum, item) => sum + item.value, 0);
   const chartDataWithPercentages = chartData.map((item) => ({
      ...item,
      percentage: total > 0 ? (item.value / total) * 100 : 0,
   }));

   const getCategoryColor = (category) => {
      switch (category) {
         case "seeds":
            return "bg-green-500";
         case "fertilizers":
            return "bg-blue-500";
         case "pesticides":
            return "bg-red-500";
         case "tools":
            return "bg-gray-500";
         default:
            return "bg-purple-500";
      }
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-50 rounded-lg">
               <BarChart3 className="text-primary-500" size={24} />
            </div>
            <div>
               <h3 className="text-xl font-semibold text-gray-800">
                  Resource Distribution
               </h3>
               <p className="text-gray-600">Current inventory by category</p>
            </div>
         </div>

         {chartDataWithPercentages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
               <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
               <p>No data available</p>
            </div>
         ) : (
            <div className="space-y-4">
               {chartDataWithPercentages.map((item, index) => (
                  <motion.div
                     key={item.category}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1 }}
                     className="flex items-center gap-4"
                  >
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-2">
                              <div
                                 className={`w-3 h-3 rounded-full ${getCategoryColor(
                                    item.category
                                 )}`}
                              />
                              <span className="font-medium text-gray-700 capitalize">
                                 {item.category}
                              </span>
                              <span className="text-sm text-gray-500">
                                 ({item.items} items)
                              </span>
                           </div>
                           <div className="text-right">
                              <span className="font-semibold text-gray-800">
                                 {item.value.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                 {item.percentage.toFixed(1)}%
                              </span>
                           </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                           <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-2 rounded-full ${getCategoryColor(
                                 item.category
                              )}`}
                           />
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         )}

         {total > 0 && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="mt-6 pt-6 border-t border-gray-100"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <TrendingUp className="text-primary-500" size={20} />
                     <span className="font-medium text-gray-700">
                        Total Inventory
                     </span>
                  </div>
                  <span className="text-2xl font-bold text-primary-600">
                     {total.toLocaleString()} units
                  </span>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
};

export default UsageChart;
