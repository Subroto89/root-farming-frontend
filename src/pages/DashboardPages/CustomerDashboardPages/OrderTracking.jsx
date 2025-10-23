import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Search,
   Package,
   Truck,
   MapPin,
   CircleCheck as CheckCircle,
   Clock,
   Phone,
   MessageCircle,
   Star,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import DeliveryMap from "../../../components/Dashboard/RouteBasedComponents/CustommerRoutesComponents/OrderTracking/DeliveryMap";
import OrderDetails from "../../../components/Dashboard/RouteBasedComponents/CustommerRoutesComponents/OrderTracking/OrderDetails/OrderDetails";
import OrderStats from "../../../components/Dashboard/RouteBasedComponents/CustommerRoutesComponents/OrderTracking/OrderStats";
import OrderStatusTimeline from "../../../components/Dashboard/RouteBasedComponents/CustommerRoutesComponents/OrderTracking/OrderStatusTimeline";
import { useTheme } from "../../../hooks/useTheme";

// Mock order data
const mockOrders = [
   {
      id: "ORD-2024-001",
      customerId: "CUST-001",
      customerName: "John Smith",
      customerPhone: "+1 (555) 123-4567",
      customerEmail: "john.smith@email.com",
      products: [
         {
            id: "PROD-001",
            name: "Organic Tomato Seeds",
            quantity: 5,
            price: 12.5,
            image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
         },
         {
            id: "PROD-002",
            name: "Natural Fertilizer",
            quantity: 2,
            price: 25.0,
            image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
         },
      ],
      totalAmount: 112.5,
      orderDate: new Date("2024-12-20T10:30:00"),
      estimatedDelivery: new Date("2024-12-25T15:00:00"),
      currentStatus: "in_transit_hub",
      shippingAddress: {
         street: "123 Farm Road",
         city: "Green Valley",
         state: "CA",
         zipCode: "90210",
         country: "USA",
      },
      trackingHistory: [
         {
            status: "pending",
            timestamp: new Date("2024-12-20T10:30:00"),
            location: "Root Farming Store",
            description: "Order placed successfully",
            completed: true,
         },
         {
            status: "confirmed",
            timestamp: new Date("2024-12-20T11:15:00"),
            location: "Root Farming Store",
            description: "Payment confirmed and order processed",
            completed: true,
         },
         {
            status: "collected",
            timestamp: new Date("2024-12-20T14:30:00"),
            location: "Root Farming Store",
            description: "Package collected by delivery partner",
            rider: {
               name: "Mike Johnson",
               phone: "+1 (555) 987-6543",
               vehicle: "Bike - RF001",
            },
            completed: true,
         },
         {
            status: "in_transit_hub",
            timestamp: new Date("2024-12-21T09:00:00"),
            location: "Central Distribution Hub",
            description: "Package arrived at distribution center",
            completed: true,
         },
         {
            status: "out_for_delivery",
            timestamp: null,
            location: "Local Delivery Hub",
            description: "Out for delivery to your address",
            completed: false,
         },
         {
            status: "delivered",
            timestamp: null,
            location: "Customer Address",
            description: "Package delivered successfully",
            completed: false,
         },
      ],
   },
   {
      id: "ORD-2024-002",
      customerId: "CUST-002",
      customerName: "Sarah Wilson",
      customerPhone: "+1 (555) 456-7890",
      customerEmail: "sarah.wilson@email.com",
      products: [
         {
            id: "PROD-003",
            name: "Potato Seed Tubers",
            quantity: 10,
            price: 3.2,
            image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
         },
      ],
      totalAmount: 32.0,
      orderDate: new Date("2024-12-21T14:20:00"),
      estimatedDelivery: new Date("2024-12-26T12:00:00"),
      currentStatus: "delivered",
      shippingAddress: {
         street: "456 Harvest Lane",
         city: "Farmington",
         state: "TX",
         zipCode: "75001",
         country: "USA",
      },
      trackingHistory: [
         {
            status: "pending",
            timestamp: new Date("2024-12-21T14:20:00"),
            location: "Root Farming Store",
            description: "Order placed successfully",
            completed: true,
         },
         {
            status: "confirmed",
            timestamp: new Date("2024-12-21T14:45:00"),
            location: "Root Farming Store",
            description: "Payment confirmed and order processed",
            completed: true,
         },
         {
            status: "collected",
            timestamp: new Date("2024-12-21T16:30:00"),
            location: "Root Farming Store",
            description: "Package collected by delivery partner",
            rider: {
               name: "David Brown",
               phone: "+1 (555) 234-5678",
               vehicle: "Van - RF002",
            },
            completed: true,
         },
         {
            status: "in_transit_hub",
            timestamp: new Date("2024-12-22T08:15:00"),
            location: "Regional Distribution Hub",
            description: "Package processed at regional hub",
            completed: true,
         },
         {
            status: "out_for_delivery",
            timestamp: new Date("2024-12-22T10:30:00"),
            location: "Local Delivery Hub",
            description: "Out for delivery to your address",
            completed: true,
         },
         {
            status: "delivered",
            timestamp: new Date("2024-12-22T15:45:00"),
            location: "Customer Address",
            description: "Package delivered successfully",
            deliveredBy: "David Brown",
            signature: "Customer Signature Received",
            completed: true,
         },
      ],
   },
];

const OrderTracking = () => {
   const {theme} = useTheme();
    const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"

   const [searchQuery, setSearchQuery] = useState("");
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [orders, setOrders] = useState(mockOrders);
   const [isLoading, setIsLoading] = useState(false);

   // Auto-select first order on load
   useEffect(() => {
      if (orders.length > 0 && !selectedOrder) {
         setSelectedOrder(orders[0]);
      }
   }, [orders, selectedOrder]);

   const handleSearch = async () => {
      if (!searchQuery.trim()) {
         toast.error("Please enter an order ID");
         return;
      }

      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
         const foundOrder = orders.find((order) =>
            order.id.toLowerCase().includes(searchQuery.toLowerCase())
         );

         if (foundOrder) {
            setSelectedOrder(foundOrder);
            toast.success("Order found!");
         } else {
            toast.error("Order not found. Please check your order ID.");
         }
         setIsLoading(false);
      }, 1000);
   };

   const getStatusColor = (status) => {
      switch (status) {
         case "pending":
            return "text-yellow-600 bg-yellow-50";
         case "confirmed":
            return "text-blue-600 bg-blue-50";
         case "collected":
            return "text-purple-600 bg-purple-50";
         case "in_transit_hub":
            return "text-orange-600 bg-orange-50";
         case "out_for_delivery":
            return "text-indigo-600 bg-indigo-50";
         case "delivered":
            return "text-green-600 bg-green-50";
         default:
            return "text-gray-600 bg-gray-50";
      }
   };

   const getStatusText = (status) => {
      switch (status) {
         case "pending":
            return "Order Pending";
         case "confirmed":
            return "Order Confirmed";
         case "collected":
            return "Collected by Rider";
         case "in_transit_hub":
            return "In Transit Hub";
         case "out_for_delivery":
            return "Out for Delivery";
         case "delivered":
            return "Delivered";
         default:
            return "Unknown Status";
      }
   };

   return (
      <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50`}>
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                     <Package className="text-green-600" size={32} />
                  </div>
                  Order Tracking
               </h1>
               <p className="text-gray-600 text-lg">
                  Track your farming supplies and equipment deliveries in
                  real-time
               </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
               <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enter Order ID
                     </label>
                     <div className="relative">
                        <Search
                           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                           size={20}
                        />
                        <input
                           type="text"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           onKeyPress={(e) =>
                              e.key === "Enter" && handleSearch()
                           }
                           placeholder="e.g., ORD-2024-001"
                           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                     </div>
                  </div>
                  <div className="flex items-end">
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                     >
                        {isLoading ? (
                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                           <Search size={20} />
                        )}
                        Track Order
                     </motion.button>
                  </div>
               </div>
            </motion.div>

            {/* Order Stats */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="mb-8"
            >
               <OrderStats orders={orders} />
            </motion.div>

            {/* Main Content */}
            {selectedOrder && (
               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Left Column - Order Details & Timeline */}
                  <div className="xl:col-span-2 space-y-8">
                     {/* Order Details */}
                     <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                     >
                        <OrderDetails order={selectedOrder} />
                     </motion.div>

                     {/* Status Timeline */}
                     <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                     >
                        <OrderStatusTimeline order={selectedOrder} />
                     </motion.div>
                  </div>

                  {/* Right Column - Map & Quick Actions */}
                  <div className="space-y-8">
                     {/* Delivery Map */}
                     <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                     >
                        <DeliveryMap order={selectedOrder} />
                     </motion.div>

                     {/* Quick Actions */}
                     <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-200 p-6"
                     >
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                           Quick Actions
                        </h3>
                        <div className="space-y-3">
                           <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center gap-4 p-4 text-left hover:bg-green-50 rounded-xl transition-all duration-200 border border-transparent hover:border-green-200 hover:shadow-sm"
                           >
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                 <Phone className="text-green-600" size={18} />
                              </div>
                              <div>
                                 <p className="font-medium text-gray-800">
                                    Contact Support
                                 </p>
                                 <p className="text-sm text-gray-500">
                                    Get help with your order
                                 </p>
                              </div>
                           </motion.button>

                           <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center gap-4 p-4 text-left hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm"
                           >
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                 <MessageCircle
                                    className="text-blue-600"
                                    size={18}
                                 />
                              </div>
                              <div>
                                 <p className="font-medium text-gray-800">
                                    Live Chat
                                 </p>
                                 <p className="text-sm text-gray-500">
                                    Chat with our team
                                 </p>
                              </div>
                           </motion.button>

                           {selectedOrder.currentStatus === "delivered" && (
                              <motion.button
                                 whileHover={{ scale: 1.02 }}
                                 whileTap={{ scale: 0.98 }}
                                 className="w-full flex items-center gap-4 p-4 text-left hover:bg-yellow-50 rounded-xl transition-all duration-200 border border-transparent hover:border-yellow-200 hover:shadow-sm"
                              >
                                 <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <Star
                                       className="text-yellow-600"
                                       size={18}
                                    />
                                 </div>
                                 <div>
                                    <p className="font-medium text-gray-800">
                                       Rate & Review
                                    </p>
                                    <p className="text-sm text-gray-500">
                                       Share your experience
                                    </p>
                                 </div>
                              </motion.button>
                           )}
                        </div>
                     </motion.div>

                     {/* Order Summary */}
                     <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-200 p-6"
                     >
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                           Order Summary
                        </h3>
                        <div className="space-y-4">
                           <div className="flex justify-between">
                              <span className="text-gray-600">Order ID</span>
                              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                                 {selectedOrder.id}
                              </span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-gray-600">Order Date</span>
                              <span className="font-medium text-gray-800">
                                 {format(
                                    selectedOrder.orderDate,
                                    "MMM dd, yyyy"
                                 )}
                              </span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-gray-600">
                                 Total Amount
                              </span>
                              <span className="font-bold text-green-600 text-lg">
                                 ${selectedOrder.totalAmount.toFixed(2)}
                              </span>
                           </div>
                           <div className="border-t border-gray-200 pt-3">
                              <div className="flex justify-between">
                                 <span className="text-gray-600">Status</span>
                                 <span
                                    className={`px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                       selectedOrder.currentStatus
                                    )}`}
                                 >
                                    {getStatusText(selectedOrder.currentStatus)}
                                 </span>
                              </div>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-gray-600">
                                 Est. Delivery
                              </span>
                              <span className="font-semibold text-gray-800">
                                 {format(
                                    selectedOrder.estimatedDelivery,
                                    "MMM dd, yyyy"
                                 )}
                              </span>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            )}

            {/* No Order Selected */}
            {!selectedOrder && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
               >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Package size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                     No Order Selected
                  </h3>
                  <p className="text-gray-600">
                     Enter your order ID above to track your delivery
                  </p>
               </motion.div>
            )}
         </div>
      </div>
   );
};

export default OrderTracking;
