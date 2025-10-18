import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, features, color }) => (
  <div
    className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm 
                  hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
  >
    <div
      className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-4 
                     shadow-md transform transition-transform duration-300 group-hover:scale-110`}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>

    <h3
      className="text-2xl font-semibold text-gray-900 mb-2 
                   transition-colors duration-300 group-hover:text-green-700"
    >
      {title}
    </h3>

    <p className="text-base text-gray-600 line-clamp-2 mb-4">{description}</p>

    <ul className="space-y-2 text-sm text-gray-600">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center">
          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
          {feature}
        </li>
      ))}
    </ul>

    <button
      className="mt-6 flex items-center justify-center gap-2 text-green-700 font-semibold 
                       hover:text-green-800 transition-colors"
    >
      Learn More
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);

export default ServiceCard;
