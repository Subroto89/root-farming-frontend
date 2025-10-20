import React from 'react';
import { Leaf, ShoppingCart, Sprout, BarChart2 } from 'lucide-react';

const steps = [
  {
    step: 1,
    icon: Leaf,
    title: 'Register Your Farm',
    description:
      'Create your account and register your farmland details in minutes.',
  },
  {
    step: 2,
    icon: Sprout,
    title: 'Get Smart Insights',
    description:
      'Receive tailored recommendations for crops, fertilizers, and irrigation.',
  },
  {
    step: 3,
    icon: BarChart2,
    title: 'Track & Manage',
    description:
      'Monitor your crops, expenses, and resources with real-time analytics.',
  },
  {
    step: 4,
    icon: ShoppingCart,
    title: 'Sell with Ease',
    description:
      'Access the marketplace to sell your harvest directly to buyers.',
  },
];

const HowItWorks = () => {
  
  return (
    <div id="how-it-works" className="bg-gray-50 md:py-24 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-snug">
            How RootFarming Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to smarter farming in four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Connecting Lines for Desktop */}
          {steps.map((_, i) => {
            if (i < steps.length - 1) {
              return (
                <div
                  key={`line-${i}`}
                  className="hidden lg:block absolute top-24 h-0.5 bg-gray-300"
                  style={{
                    left: `${25 * i}%`,
                    width: `${25}%`,
                  }}
                />
              );
            }
            return null;
          })}

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Step Number */}
                <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F59F0A] flex items-center justify-center text-xl sm:text-2xl font-extrabold text-[#2C2621] shadow-md group-hover:scale-110 transition-transform duration-300 z-10">
                  {step.step}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-between w-full h-full">
                  {/* Icon */}
                  <div className="mt-8 mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl bg-gray-50 border-2 border-green-700 shadow-md group-hover:bg-green-700 transition-colors duration-300">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-green-700 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base md:text-base leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
