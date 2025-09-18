import React from "react";
import aboutUsBg from "../../assets/aboutUsBg.avif";

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
    </div>
  );
};

export default AboutUs;
