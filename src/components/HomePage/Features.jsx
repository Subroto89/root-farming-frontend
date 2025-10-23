import React, { useEffect } from 'react';
import {
  Cloud,
  MessageSquare,
  Calendar,
  LineChart,
  Package,
  ShieldCheck,
  UserPlus,
  Star,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: UserPlus,
    path: '/dashboard/field-registration',
    title: 'Field Registration',
    desc: 'Digitally register your land with detailed information about field size, soil type, and location for personalized farming guidance.',
  },
  {
    icon: Calendar,
    path: '/dashboard/activity-scheduling',
    title: 'Activity Scheduling',
    desc: 'Plan and track your farming activities from planting to harvesting with smart calendar reminders.',
  },
  {
    icon: Cloud,
    path: '/dashboard/weather-forecast',
    title: 'Weather Forecasting',
    desc: 'Get real-time weather updates and alerts specific to your field location for better decision making.',
  },
  {
    icon: MessageSquare,
    path: '/dashboard/chat-specialist',
    title: 'Expert Consultation',
    desc: 'Chat directly with certified agri-specialists for personalized advice on crops, pests, and diseases.',
  },
  {
    icon: LineChart,
    path: '/dashboard/resource-management',
    title: 'Resource Management',
    desc: 'Track seeds, fertilizers, and pesticides usage with our digital inventory management system.',
  },
  {
    icon: Package,
    path: 'shop',
    title: 'Crop Marketplace',
    desc: 'List and sell your harvested crops directly to consumers with transparent pricing and quality ratings.',
  },
  {
    icon: ShieldCheck,
    path: '/dashboard/govt-news-facilites',
    title: 'Government Schemes',
    desc: 'Stay updated with latest agricultural schemes, subsidies, and policies in one central hub.',
  },
  {
    icon: Star,
    path: 'reviews',
    title: 'Review System',
    desc: 'Two-way rating system between farmers and consumers to build trust and ensure quality transactions.',
  },
];

const Features = () => {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-in-out' });
  }, []);

  const bg =
    theme === 'dark' ? 'bg-dark text-gray-100' : 'bg-light text-gray-900';
  const card =
    theme === 'dark'
      ? 'fg-dark border border-gray-500'
      : 'fg-light border border-gray-200';

  const handleClick = (path, e) => {
    e.preventDefault();
    if (path === 'reviews') {
      const section = document.getElementById('Latest-reviews');
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className={`${bg} py-16 md:py-24 min-h-screen flex items-center`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Everything You Need to Farm Smart
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            From field registration to marketplace selling — we cover every
            aspect of modern farming.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {features.map(({ icon: Icon, title, desc, path }, i) => (
            <div
              key={i}
              onClick={e => handleClick(path, e)}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              className={`${card} cursor-pointer rounded-2xl p-6 sm:p-8 shadow-sm 
              hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-green-700 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-green-700 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm md:text-base flex-grow">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
