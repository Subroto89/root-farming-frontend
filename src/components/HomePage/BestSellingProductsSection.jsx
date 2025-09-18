import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const BestSellingProductsSection = () => {
   const products = [
      {
         id: 1,
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
         id: 2,
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
         id: 3,
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
         id: 4,
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
         </div>
      </section>
   );
};

export default BestSellingProductsSection;
