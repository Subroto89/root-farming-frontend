import React from "react";
import { motion } from "framer-motion";
import {
   Package,
   Clock,
   Truck,
   CircleCheck as CheckCircle,
} from "lucide-react";
import CountUp from "react-countup";

const OrderStats = ({ orders }) => {
   const stats = React.useMemo(() => {
      const totalOrders = orders.length;
      const pendingOrders = orders.filter((order) =>
         ["pending", "confirmed"].includes(order.currentStatus)
      ).length;
      const inTransitOrders = orders.filter((order) =>
         ["collected", "in_transit_hub", "out_for_delivery"].includes(
            order.currentStatus
         )
      ).length;
      const deliveredOrders = orders.filter(
         (order) => order.currentStatus === "delivered"
      ).length;

      return {
         totalOrders,
         pendingOrders,
         inTransitOrders,
         deliveredOrders,
      };
   }, [orders]);

   const statCards = [
      {
         title: "Total Orders",
         value: stats.totalOrders,
         icon: Package,
         color: "text-blue-600",
         bgColor: "bg-blue-50",
         borderColor: "border-blue-200",
      },
      {
         title: "Pending Orders",
         value: stats.pendingOrders,
         icon: Clock,
         color: "text-yellow-600",
         bgColor: "bg-yellow-50",
         borderColor: "border-yellow-200",
      },
      {
         title: "In Transit",
         value: stats.inTransitOrders,
         icon: Truck,
         color: "text-orange-600",
         bgColor: "bg-orange-50",
         borderColor: "border-orange-200",
      },
      {
         title: "Delivered",
         value: stats.deliveredOrders,
         icon: CheckCircle,
         color: "text-green-600",
         bgColor: "bg-green-50",
         borderColor: "border-green-200",
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
                        <CountUp end={stat.value} duration={2} separator="," />
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

export default OrderStats;
