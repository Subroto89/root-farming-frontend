// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
    return (
        <section className="bg-white py-16 px-5 md:px-10 lg:px-16">
            <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left Content */}
                <div className="space-y-6">

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Grow Your <span className="text-green-600">Future</span> <br /> with{" "}
                        <span className="text-yellow-500">Smart Farming</span>
                    </h1>
                    <p className="text-gray-600">
                        Transform your agricultural journey with our innovative farming <br />
                        solutions. From seeds to harvest, we provide everything you need <br /> for
                        sustainable, profitable farming.
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

                </div>

                {/* Right Image */}
                <div className="flex justify-center md:justify-end">

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
