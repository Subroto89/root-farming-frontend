import React from "react";
import aboutUsBg from "../../assets/aboutUsBg.avif";
import { Leaf, MessageCircle, ShoppingCart, Target } from "lucide-react";

// Main About Us Component
const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${aboutUsBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              About Us
            </h1>
            <p className="text-white text-xl mt-4">
              Growing the Future of Agriculture, Together.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-100 p-4 rounded-full mb-4">
            <Target className="text-green-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Root Farming, our mission is to empower farmers through
            technology. We've built a platform that provides farmers with the
            right information, tools, and guidance at every step—from planting
            seeds to selling crops. We dream of making agriculture more
            profitable, sustainable, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800">What We Do</h2>
            <p className="text-lg text-gray-600 mt-2">
              Our Integrated Services for Farmers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow border border-gray-100">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Direct Marketplace</h3>
              <p className="text-gray-600">
                Farmers can sell their produce directly to buyers, ensuring
                better prices without middlemen.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow border border-gray-100">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">
                Smart Farming Guidance
              </h3>
              <p className="text-gray-600">
                Get weather alerts, crop disease diagnosis, and fertilizer
                information to make farming smarter.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow border border-gray-100">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Connect directly with agricultural experts to get reliable
                solutions for any farming challenge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
