import { ShoppingCart } from "lucide-react";
import React from "react";

const OurProductsSection = () => {
   const products = [
      {
         _id: 1,
         title: "Smart Irrigation Kit",
         description:
            "Automated watering system with smartphone control for efficient water management.",
         price: 89.99,
         image: "https://i.ibb.co.com/23DSv1cs/2149409969.jpg",
         badge: { text: "Popular", color: "bg-blue-500" },
         rating: 4.8,
         reviewCount: 890,
         isFavorite: false,
      },
      {
         _id: 2,
         title: "Solar Garden Lights",
         description:
            "Energy-efficient LED lights powered by solar panels, perfect for outdoor decoration.",
         price: 39.99,
         image: "https://i.ibb.co.com/QvjcbzyV/2149409996.jpg",
         badge: { text: "Best Seller", color: "bg-green-500" },
         rating: 4.6,
         reviewCount: 1200,
         isFavorite: false,
      },
      {
         _id: 3,
         title: "Bluetooth Plant Sensor",
         description:
            "Track soil moisture, light, and temperature to keep your plants healthy.",
         price: 49.5,
         image: "https://i.ibb.co.com/7xfzrt1h/planting-trees-as-part-reforestation-process-1.jpg",
         badge: { text: "Trending", color: "bg-purple-500" },
         rating: 4.7,
         reviewCount: 640,
         isFavorite: false,
      },
      {
         _id: 4,
         title: "Drip Irrigation Kit",
         description:
            "Water-saving drip irrigation system for gardens and flower beds.",
         price: 59.99,
         image: "https://i.ibb.co.com/XrqX4NCP/planting-trees-as-part-reforestation-process-23-2149409958.jpg",
         badge: { text: "Eco Friendly", color: "bg-teal-500" },
         rating: 4.5,
         reviewCount: 410,
         isFavorite: false,
      },
      {
         _id: 5,
         title: "Garden Tool Set",
         description:
            "Durable and ergonomic tools for easy planting, weeding, and pruning.",
         price: 29.99,
         image: "https://i.ibb.co.com/ZRTz3pCF/planting-trees-as-part-reforestation-process-23-2149409970.jpg",
         badge: { text: "Hot", color: "bg-red-500" },
         rating: 4.4,
         reviewCount: 560,
         isFavorite: false,
      },
      {
         _id: 6,
         title: "Automatic Fertilizer Dispenser",
         description:
            "Smart fertilizer dispenser that syncs with your watering schedule.",
         price: 75.0,
         image: "https://i.ibb.co.com/JWkdkJKs/planting-trees-as-part-reforestation-process-23-2149409981.jpg",
         badge: { text: "New", color: "bg-yellow-500" },
         rating: 4.3,
         reviewCount: 300,
         isFavorite: false,
      },
      {
         _id: 7,
         title: "Rainwater Harvesting Barrel",
         description:
            "Eco-friendly rainwater collection barrel with tap for reuse in gardening.",
         price: 120.99,
         image: "https://i.ibb.co.com/S2FDLmx/planting-trees-as-part-reforestation-process-23-2149409987.jpg",
         badge: { text: "Limited", color: "bg-orange-500" },
         rating: 4.9,
         reviewCount: 210,
         isFavorite: false,
      },
      {
         _id: 8,
         title: "Indoor Hydroponic Kit",
         description:
            "Grow fresh herbs indoors with a compact, self-watering hydroponic system.",
         price: 99.99,
         image: "https://i.ibb.co.com/yFNPbv0j/planting-trees-as-part-reforestation-process-23-2149409995.jpg",
         badge: { text: "Editor's Choice", color: "bg-indigo-500" },
         rating: 4.8,
         reviewCount: 780,
         isFavorite: false,
      },
   ];

   const handleAddToCart = (product) => {};

   return (
      <section className="py-16 px-4 bg-green-50">
         <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Best Selling Products
               </h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our most popular farming solutions trusted by thousands of
                  successful farmers
               </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
               {products.map((product) => (
                  <div
                     key={product._id}
                     className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                     {/* Product Image Container */}
                     <div className="relative h-48 overflow-hidden">
                        <img
                           src={product.image}
                           alt={product.title}
                           className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                     </div>

                     {/* Product Content */}
                     <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                           {product.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                           {product.description}
                        </p>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between">
                           <span className="text-2xl font-bold text-green-600">
                              ${product.price}
                           </span>
                           <button
                              onClick={() => handleAddToCart(product)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                           >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            {/* View All Products Button */}
            <div className="text-center">
               <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                  Learn more product
               </button>
            </div>
         </div>
      </section>
   );
};

export default OurProductsSection;
