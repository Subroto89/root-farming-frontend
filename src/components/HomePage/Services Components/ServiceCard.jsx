import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  color,
  themeForegroundStyle,
}) => (
  <div
    className={`${themeForegroundStyle} group rounded-2xl p-6 sm:p-8 shadow-sm 
                hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full`}
    data-aos="fade-up"
  >
    {/* Icon */}
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl ${color} flex items-center justify-center mb-4 
                  shadow-md transform transition-transform duration-300 group-hover:scale-110`}
    >
      <Icon className="w-7 h-7 sm:w-8 sm:h-10 md:w-12 md:h-12 text-white" />
    </div>

    {/* Title */}
    <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-green-700">
      {title}
    </h3>

    {/* Description */}
    <p className="text-sm sm:text-base md:text-base leading-relaxed max-w-xs line-clamp-2 mb-2 flex-grow">
      {description}
    </p>

    {/* Features List */}
    <ul className="space-y-2 text-sm">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center">
          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
          {feature}
        </li>
      ))}
    </ul>

    {/* Learn More Button */}
    <button className="mt-6 flex items-center justify-center gap-2 font-semibold hover:text-green-800 transition-colors">
      Learn More
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);

export default ServiceCard;
