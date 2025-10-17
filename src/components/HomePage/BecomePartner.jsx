import React from 'react';
import { Mail, Download, Users, Globe, Zap } from 'lucide-react';

const partnerBenefits = [
  {
    icon: Globe,
    title: 'Global Network',
    description:
      'Access our worldwide community of farmers, agri-tech innovators, and experts for growth and learning.',
  },
  {
    icon: Users,
    title: 'Premium Support',
    description:
      'Enjoy dedicated partner support and priority technical assistance from our expert team.',
  },
  {
    icon: Zap,
    title: 'Co-Innovation',
    description:
      'Collaborate with us on pioneering agricultural technologies and data-driven solutions.',
  },
  {
    icon: Mail,
    title: 'Sustainable Practices',
    description:
      'Be part of initiatives promoting eco-friendly and sustainable farming methods worldwide.',
  },
];

const BecomePartner = () => {
  return (
    <div className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Become a Partner
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Join our global ecosystem of innovators, organizations, and experts
            dedicated to transforming modern agriculture sustainably.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {partnerBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm 
                           hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl bg-green-700 flex items-center justify-center mb-5 
                                shadow-md transform transition-transform duration-300 group-hover:scale-110"
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 
                               transition-colors duration-300 group-hover:text-green-700"
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button className="inline-flex items-center justify-center bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-green-800 transition-all duration-300">
            <Mail className="h-5 w-5 mr-2" />
            Partner With Us
          </button>
          <button className="inline-flex items-center justify-center bg-transparent border-2 border-green-700 text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition-all duration-300">
            <Download className="h-5 w-5 mr-2" />
            Partnership Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomePartner;
