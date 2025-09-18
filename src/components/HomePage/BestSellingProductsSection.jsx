import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const BestSellingProductsSection = () => {
   const products = [
      {
         _id: 1,
         title: "Organic Tomato Seeds",
         description:
            "High-yield organic tomato seeds perfect for home gardens and commercial farming.",
         price: 24.99,
         image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800",
         badge: {
            text: "Best Seller",
            color: "bg-red-500",
         },
         rating: 4.9,
         reviewCount: 1250,
         isFavorite: false,
      },
      {
         _id: 2,
         title: "Smart Irrigation Kit",
         description:
            "Automated watering system with smartphone control for efficient water management.",
         price: 89.99,
         image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
         badge: {
            text: "Popular",
            color: "bg-blue-500",
         },
         rating: 4.8,
         reviewCount: 890,
         isFavorite: false,
      },
      {
         _id: 3,
         title: "Premium Fertilizer",
         description:
            "All-natural organic fertilizer that boosts plant growth and soil health.",
         price: 39.99,
         image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800",
         badge: {
            text: "Eco-Friendly",
            color: "bg-green-500",
         },
         rating: 4.7,
         reviewCount: 2100,
         isFavorite: false,
      },
      {
         _id: 4,
         title: "Garden Tool Set",
         description:
            "Complete set of professional-grade gardening tools for serious gardening.",
         price: 159.99,
         image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
         badge: {
            text: "Professional",
            color: "bg-purple-500",
         },
         rating: 4.9,
         reviewCount: 450,
         isFavorite: false,
      },
   ];

   const toggleFavorite = (productId) => {};

   const handleAddToCart = (product) => {};

   const renderStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
         stars.push(
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
         );
      }

      if (hasHalfStar) {
         stars.push(
            <Star
               key="half"
               className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50"
            />
         );
      }

      const emptyStars = 5 - Math.ceil(rating);
      for (let i = 0; i < emptyStars; i++) {
         stars.push(
            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
         );
      }

      return stars;
   };

   return (
      <section className="py-16 px-4 bg-gray-50">
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

                        {/* Badge */}
                        <div
                           className={`absolute top-3 left-3 ${product.badge.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                        >
                           {product.badge.text}
                        </div>

                        {/* Favorite Button */}
                        <button
                           onClick={() => toggleFavorite(product._id)}
                           className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                        >
                           <Heart
                              className={`w-5 h-5 transition-colors duration-200 ${
                                 product.isFavorite === true
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-400 hover:text-red-500"
                              }`}
                           />
                        </button>
                     </div>

                     {/* Product Content */}
                     <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                           {product.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                           {product.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                           <div className="flex items-center mr-2">
                              {renderStars(product.rating)}
                           </div>
                           <span className="text-sm font-medium text-gray-700">
                              {product.rating}
                           </span>
                           <span className="text-sm text-gray-500 ml-1">
                              ({product.reviewCount} reviews)
                           </span>
                        </div>

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
         </div>
      </section>
   );
};

export default BestSellingProductsSection;
