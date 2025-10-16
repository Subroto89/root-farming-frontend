import {
  ArrowRight,
  Leaf,
  Sun,
  UserCheck,
  BarChart2,
  ShoppingCart,
} from 'lucide-react';
import heroImage from '../../assets/Logo/hero-farmer.jpg';
import QuickStats from './QuickStats';

const HeroSection = () => {
  const features = [
    {
      title: 'Weather Alerts',
      desc: 'Real-time forecasts',
      icon: <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
    },
    {
      title: 'Expert Advice',
      desc: '24/7 specialist chat',
      icon: <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
    },
    {
      title: 'Resource Tracking',
      desc: 'Manage inventory',
      icon: <BarChart2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
    },
    {
      title: 'Direct Selling',
      desc: 'Your marketplace',
      icon: <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
    },
  ];

  return (
    <div className="relative flex items-center overflow-hidden transition-all duration-500 bg-white dark:bg-[#0F172A] min-h-[calc(100vh-70px)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern farming with technology"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,92,40,0.95),rgba(30,92,40,0.85),rgba(30,92,40,0.7))] dark:bg-[linear-gradient(90deg,rgba(10,30,15,0.95),rgba(10,30,15,0.85),rgba(10,30,15,0.7))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="text-white text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-5 border border-white/20">
              <Leaf className="w-4 h-4 text-[#F59F0A]" />
              <span className="text-xs sm:text-sm font-medium">
                Smart Agriculture Platform
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 leading-snug sm:leading-tight">
              Farm Smarter,
              <br />
              <span className="text-[#F59F0A]">Grow Better</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 text-white/90 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Complete guidance from planting to harvesting. Get expert advice,
              weather alerts, and sell directly to consumers on our marketplace.
            </p>

            {/* Buttons */}
            <div className="flex flex-col xs:flex-row sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button className="flex items-center justify-center gap-2 text-white text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-[#F59F0A] hover:bg-[#e09a0b] rounded-lg font-medium transition-all duration-300">
                Start Farming Smart
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="text-white text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-[#F59F0A] hover:text-white rounded-lg transition-all duration-300">
                Browse Marketplace
              </button>
            </div>

            {/* Quick Stats */}
            <div className="max-w-md mx-auto lg:mx-0">
              <QuickStats />
            </div>
          </div>

          {/* RIGHT SIDE (Features) */}
          <div className="mt-8 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-[0_16px_48px_rgba(30,92,40,0.16)] flex flex-col items-start"
                >
                  <div className="mb-2 sm:mb-3">{feature.icon}</div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/80 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-28 lg:h-32 bg-gradient-to-t from-[#F0F3F9] dark:from-[#0F172A] to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
