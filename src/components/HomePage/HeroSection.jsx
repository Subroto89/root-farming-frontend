// src/components/HeroSection.jsx
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router";

const HeroSection = () => {
   return (
      <section className="bg-white py-28 px-5 md:px-10 lg:px-16 ">
         <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-7xl">
            {/* Left Content */}
            <div className="space-y-6">
               <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Grow Your <span className="text-green-600">Future</span>{" "}
                  <br /> with{" "}
                  <span className="text-yellow-500">Smart Farming</span>
               </h1>
               <p className="text-gray-600">
                  Transform your agricultural journey with our innovative
                  farming <br />
                  solutions. From seeds to harvest, we provide everything you
                  need <br /> for sustainable, profitable farming.
               </p>
               <div className="flex flex-wrap gap-4">
                  <Link to="/start">
                     <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition">
                        Start Growing Today →
                     </button>
                  </Link>
                  <Link to="/demo">
                     <button className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition">
                        ▶ Watch Demo
                     </button>
                  </Link>
               </div>
               <div className="flex flex-wrap gap-8 pt-6">
                  <div>
                     <p className="text-2xl font-bold text-green-600">
                        <CountUp end={10000} duration={2} separator="," />+
                     </p>
                     <p className="text-sm text-gray-600">Happy Farmers</p>
                  </div>

                  <div>
                     <p className="text-2xl font-bold text-yellow-500">
                        <CountUp end={500} duration={2} />+
                     </p>
                     <p className="text-sm text-gray-600">Products</p>
                  </div>

                  <div>
                     <p className="text-2xl font-bold text-green-600">
                        <CountUp end={99} duration={2} />%
                     </p>
                     <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
               </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end">
               <img
                  src="https://agrisa.org.za/wp-content/uploads/2024/07/pexels-tomfisk-4784072-1024x855.jpg"
                  alt="Smart Farming"
                  className="rounded-2xl shadow-xl aspect-[16/10]"
               />
            </div>
         </div>
      </section>
   );
};

export default HeroSection;
