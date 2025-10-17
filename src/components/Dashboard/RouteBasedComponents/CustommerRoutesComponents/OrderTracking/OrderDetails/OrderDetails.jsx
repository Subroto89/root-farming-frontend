import React from "react";
import { motion } from "framer-motion";
import { Package, MapPin, User, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import Products from "./Products";

const OrderDetails = ({ order }) => {
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="text-green-600" size={24} />
            Order Details
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Customer Information */}
            <div>
               <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="text-blue-600" size={18} />
                  Customer Information
               </h4>
               <div className="space-y-2 text-sm">
                  <p>
                     <span className="font-medium">Name:</span>{" "}
                     {order.customerName}
                  </p>
                  <p>
                     <span className="font-medium">Phone:</span>{" "}
                     {order.customerPhone}
                  </p>
                  <p>
                     <span className="font-medium">Email:</span>{" "}
                     {order.customerEmail}
                  </p>
               </div>
            </div>

            {/* Order Information */}
            <div>
               <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Calendar className="text-purple-600" size={18} />
                  Order Information
               </h4>
               <div className="space-y-2 text-sm">
                  <p>
                     <span className="font-medium">Order ID:</span> {order.id}
                  </p>
                  <p>
                     <span className="font-medium">Order Date:</span>{" "}
                     {format(order.orderDate, "MMM dd, yyyy HH:mm")}
                  </p>
                  <p>
                     <span className="font-medium">Total Amount:</span>{" "}
                     <span className="font-bold text-green-600">
                        ${order.totalAmount.toFixed(2)}
                     </span>
                  </p>
               </div>
            </div>
         </div>

         {/* Shipping Address */}
         <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
               <MapPin className="text-red-600" size={18} />
               Shipping Address
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
               <p className="text-sm text-gray-700">
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                  <br />
                  {order.shippingAddress.country}
               </p>
            </div>
         </div>

         {/* Products */}
         <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
               <DollarSign className="text-green-600" size={18} />
               Products ({order.products.length} items)
            </h4>
            <div className="space-y-3">
               {order.products.map((product, index) => (
                  <Products key={product.id} product={product} index={index} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default OrderDetails;
