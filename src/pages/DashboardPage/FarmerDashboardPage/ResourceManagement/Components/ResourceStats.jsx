import React from "react";
import { motion } from "framer-motion";
import { Package, TrendingDown, AlertTriangle, DollarSign } from "lucide-react";
import CountUp from "react-countup";

const ResourceStats = ({ resources }) => {
   const stats = React.useMemo(() => {
      const totalResources = resources.length;
      const lowStockCount = resources.filter(
         (r) => r.currentStock / r.maxStock <= 0.2
      ).length;
      const expiringSoonCount = resources.filter((r) => {
         if (!r.expiryDate) return false;
         const daysUntilExpiry = Math.ceil(
            (new Date(r.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
         );
         return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
      }).length;
      const totalValue = resources.reduce(
         (sum, r) => sum + r.currentStock * r.pricePerUnit,
         0
      );

      return {
         totalResources,
         lowStockCount,
         expiringSoonCount,
         totalValue,
      };
   }, [resources]);

   const statCards = [
      {
         title: "Total Resources",
         value: stats.totalResources,
         icon: Package,
         color: "text-blue-600",
         bgColor: "bg-blue-50",
         borderColor: "border-blue-200",
      },
      {
         title: "Low Stock Items",
         value: stats.lowStockCount,
         icon: TrendingDown,
         color: "text-red-600",
         bgColor: "bg-red-50",
         borderColor: "border-red-200",
      },
      {
         title: "Expiring Soon",
         value: stats.expiringSoonCount,
         icon: AlertTriangle,
         color: "text-yellow-600",
         bgColor: "bg-yellow-50",
         borderColor: "border-yellow-200",
      },
      {
         title: "Total Value",
         value: stats.totalValue,
         icon: DollarSign,
         color: "text-green-600",
         bgColor: "bg-green-50",
         borderColor: "border-green-200",
         prefix: "$",
         decimals: 2,
      },
   ];

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {statCards.map((stat, index) => (
            <motion.div
               key={stat.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               whileHover={{ y: -5 }}
               className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                     </p>
                     <p className={`text-3xl font-bold ${stat.color}`}>
                        {stat.prefix && stat.prefix}
                        <CountUp
                           end={stat.value}
                           duration={2}
                           decimals={stat.decimals || 0}
                           separator=","
                        />
                     </p>
                  </div>
                  <div
                     className={`p-3 rounded-lg ${stat.bgColor.replace(
                        "50",
                        "100"
                     )}`}
                  >
                     <stat.icon className={stat.color} size={24} />
                  </div>
               </div>
            </motion.div>
         ))}
      </div>
   );
};

export default ResourceStats;
