import React, { useEffect } from 'react';
import { Leaf, ShoppingCart, Sprout, BarChart2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
      'Receive tailored recommendations for crops, fertilizers, & irrigation.',
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

  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);

  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle = theme === 'dark' ? 'fg-dark' : 'fg-light';

  return (
    <div
      id="how-it-works"
      className={`${themeBackgroundStyle} md:py-24 py-16 min-h-screen flex items-center overflow-hidden`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
            How RootFarming Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Your journey to smarter farming in four simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-32 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                data-aos="zoom-in-up"
                data-aos-delay={index * 150}
                className="relative z-10 group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F59F0A] flex items-center justify-center text-xl sm:text-2xl font-extrabold text-[#2C2621] shadow-md group-hover:scale-110 transition-transform duration-300 z-20">
                  {step.step}
                </div>

                {/* Card */}
                <div
                  className={`${themeForegroundStyle} rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between border border-gray-200`}
                >
                  {/* Icon */}
                  <div className="mt-8 mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl border-2 border-green-700 shadow-md group-hover:bg-green-700 transition-colors duration-300">
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-green-700 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-xl font-bold mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-base leading-relaxed max-w-xs flex-grow">
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
