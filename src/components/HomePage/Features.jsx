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
    <div className=" py-20 min-h-screen  bg-gray-50 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Farm Smart
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From field registration to marketplace selling, we've got every
            aspect of modern farming covered
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link to={feature.path}>
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl bg-green-700 flex items-center justify-center mb-4 
                         shadow-md transform transition-transform duration-300 
                         group-hover:scale-110"
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-2 
                         transition-colors duration-300 group-hover:text-green-700"
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-600 line-clamp-2">
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
