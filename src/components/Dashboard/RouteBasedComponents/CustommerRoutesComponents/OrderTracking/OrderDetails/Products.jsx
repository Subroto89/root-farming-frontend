import React from "react";
import { motion } from "framer-motion";

const Products = ({ product, index }) => {
   return (
      <div>
         <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
         >
            <img
               src={product?.image}
               alt={product?.name}
               className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
               <h5 className="font-medium text-gray-800">{product.name}</h5>
               <p className="text-sm text-gray-600">
                  Quantity: {product?.quantity}
               </p>
            </div>
            <div className="text-right">
               <p className="font-semibold text-gray-800">
                  ${(product?.price * product?.quantity).toFixed(2)}
               </p>
               <p className="text-sm text-gray-500">
                  ${product?.price.toFixed(2)} each
               </p>
            </div>
         </motion.div>
      </div>
   );
};

export default Products;
