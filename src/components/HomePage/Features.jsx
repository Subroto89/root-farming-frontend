import React from 'react';
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
import { Link } from 'react-router';

const features = [
  {
    icon: UserPlus,
    path: '/dashboard/field-registration',
    title: 'Field Registration',
    description:
      'Digitally register your land with detailed information about field size, soil type, and location for personalized farming guidance.',
  },
  {
    icon: Calendar,
    path: '/dashboard/activity-scheduling',
    title: 'Activity Scheduling',
    description:
      'Plan and track your farming activities from planting to harvesting with smart calendar reminders.',
  },
  {
    icon: Cloud,
    path: '/dashboard/weather-forecast',
    title: 'Weather Forecasting',
    description:
      'Get real-time weather updates and alerts specific to your field location for better decision making.',
  },
  {
    icon: MessageSquare,
    path: '/dashboard/chat-specialist',
    title: 'Expert Consultation',
    description:
      'Chat directly with certified agri-specialists for personalized advice on crops, pests, and diseases.',
  },
  {
    icon: LineChart,
    path: '/dashboard/resource-management',
    title: 'Resource Management',
    description:
      'Track seeds, fertilizers, and pesticides usage with our digital inventory management system.',
  },
  {
    icon: Package,
    path: 'shop',
    title: 'Crop Marketplace',
    description:
      'List and sell your harvested crops directly to consumers with transparent pricing and quality ratings.',
  },
  {
    icon: ShieldCheck,
    path: '/dashboard/govt-news-facilites',
    title: 'Government Schemes',
    description:
      'Stay updated with latest agricultural schemes, subsidies, and policies in one central hub.',
  },
  {
    icon: Star,
    title: 'Review System',
    description:
      'Two-way rating system between farmers and consumers to build trust and ensure quality transactions',
  },
];

const Features = () => {
  return (
    <div className="bg-gray-50 md:py-24 py-16 min-h-screen flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-snug">
            Everything You Need to Farm Smart
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            From field registration to marketplace selling — we cover every
            aspect of modern farming.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link to={feature.path}>
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm 
                hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-green-700 flex items-center justify-center mb-5 shadow-md transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base md:text-base flex-grow ">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
