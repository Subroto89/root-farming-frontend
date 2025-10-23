import React, { useEffect } from 'react';
import { ShoppingBag, Package2, Truck, Sprout } from 'lucide-react';
import marketplaceImage from '../../assets/Logo/marketplace.jpg';
import farmersImage from '../../assets/Logo/farmers-success.jpg';
import ServiceCard from './Services Components/ServiceCard';
import FeaturedShowcase from './Services Components/FeaturedShowcase';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: ShoppingBag,
    title: 'Retail Marketplace',
    description:
      'Direct-to-consumer sales with competitive pricing and fresh produce delivery.',
    features: [
      'Fresh Produce',
      'Competitive Pricing',
      'Quality Assured',
      'Home Delivery',
    ],
    color: 'bg-green-700',
  },
  {
    icon: Package2,
    title: 'Wholesale Trading',
    description:
      'Bulk purchasing for restaurants, distributors, and businesses with special rates.',
    features: [
      'Bulk Orders',
      'Business Rates',
      'Contract Farming',
      'Supply Chain',
    ],
    color: 'bg-amber-600',
  },
  {
    icon: Truck,
    title: 'Logistics Support',
    description:
      'End-to-end logistics from farm to market with cold chain management and tracking.',
    features: ['Cold Storage', 'Transportation', 'Packaging', 'Tracking'],
    color: 'bg-blue-700',
  },
  {
    icon: Sprout,
    title: 'Smart Farming',
    description:
      'Data-driven crop management powered by IoT and AI to increase efficiency and yield.',
    features: [
      'Soil Analysis',
      'Pest Alerts',
      'AI Insights',
      'Yield Prediction',
    ],
    color: 'bg-emerald-600',
  },
];

const Services = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle =
    theme === 'dark'
      ? 'fg-dark border border-gray-500'
      : 'fg-light border border-gray-200';

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-in-out', offset: 100 });
    AOS.refresh();
  }, []);

  return (
    <div
      id="services"
      className={`${themeBackgroundStyle} md:py-24 py-16 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
            Empowering Every Step of Agriculture
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            From marketplace to smart farming — discover our complete ecosystem
            built for modern agriculture.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-20">
          {services.map((service, idx) => (
            <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 150}>
              <ServiceCard
                {...service}
                themeForegroundStyle={themeForegroundStyle}
              />
            </div>
          ))}
        </div>

        {/* Showcase Section */}
        <div data-aos="fade-up" data-aos-delay={100}>
          <FeaturedShowcase
            marketplaceImage={marketplaceImage}
            farmersImage={farmersImage}
            themeForegroundStyle={themeForegroundStyle}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
