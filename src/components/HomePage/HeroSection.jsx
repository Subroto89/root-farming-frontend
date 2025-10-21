import React, { useEffect } from 'react';
import {
  ArrowRight,
  Leaf,
  Sun,
  UserCheck,
  BarChart2,
  ShoppingCart,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroImage from '../../assets/Logo/hero-farmer.jpg';
import QuickStats from './QuickStats';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router';

const HeroSection = () => {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 80,
      easing: 'ease-in-out',
    });
  }, []);

  const overlayColor =
    theme === 'dark'
      ? 'bg-[linear-gradient(90deg,rgba(10,30,15,0.9),rgba(10,30,15,0.85),rgba(10,30,15,0.8))]'
      : 'bg-[linear-gradient(90deg,rgba(30,92,40,0.9),rgba(30,92,40,0.85),rgba(30,92,40,0.8))]';

  const textColor = 'text-gray-100';
  const subTextColor = 'text-gray-300';

  const features = [
    {
      title: 'Weather Alerts',
      desc: 'Real-time forecasts',
      icon: <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
      path: '/dashboard/weather-forecast',
    },
    {
      title: 'Expert Advice',
      desc: '24/7 specialist chat',
      icon: <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
      path: '/dashboard/chat-specialist',
    },
    {
      title: 'Resource Tracking',
      desc: 'Manage inventory',
      icon: <BarChart2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
      path: '/dashboard/resource-management',
    },
    {
      title: 'Direct Selling',
      desc: 'Your marketplace',
      icon: <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59F0A]" />,
      path: '/shop',
    },
  ];

  return (
    <section
      className={`relative flex items-center overflow-hidden transition-all duration-500 min-h-[calc(100vh-70px)] ${overlayColor}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Modern farming with technology"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className={`absolute inset-0 ${overlayColor}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* LEFT SIDE */}
          <div
            className={`text-center lg:text-left ${textColor}`}
            data-aos="fade-up"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-white/20">
              <Leaf className="w-4 h-4 text-[#F59F0A]" />
              <span className="text-sm font-medium">
                Smart Agriculture Platform
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-snug sm:leading-tight"
              data-aos="fade-right"
            >
              Farm Smarter, <br />
              <span className="text-[#F59F0A]">Grow Better</span>
            </h1>

            {/* Description */}
            <p
              className={`text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 ${subTextColor}`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Complete guidance from planting to harvesting. Get expert advice,
              weather alerts, and sell directly to consumers on our marketplace.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Link to="/dashboard/farmer">
                <button className="flex items-center justify-center gap-2 text-white text-lg px-8 py-4 bg-[#F59F0A] hover:bg-[#e09a0b] rounded-lg font-semibold transition-all duration-300">
                  Start Farming Smart
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/shop">
                <button className="text-white text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-[#F59F0A] hover:text-white rounded-lg transition-all duration-300">
                  Browse Marketplace
                </button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="max-w-md mx-auto lg:mx-0" data-aos="fade-up">
              <QuickStats />
            </div>
          </div>

          {/* RIGHT SIDE (Features) */}
          <div
            className="mt-10 lg:mt-0"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 lg:gap-6">
              {features.map((feature, idx) => (
                <Link
                  key={idx}
                  to={feature.path}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 100}
                >
                  <div
                    className={`rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_48px_rgba(30,92,40,0.25)] flex flex-col items-start ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300">{feature.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${
          theme === 'dark'
            ? 'from-[#0F172A] to-transparent'
            : 'from-[#F0F3F9] to-transparent'
        } z-10`}
      />
    </section>
  );
};

export default HeroSection;
