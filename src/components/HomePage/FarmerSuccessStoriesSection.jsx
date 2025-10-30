import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Droplets,
  DollarSign,
  Zap,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FarmerSuccessStoriesSection = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle =
    theme === 'dark'
      ? 'fg-dark '
      : 'fg-light ';
  const [currentStory, setCurrentStory] = useState(0);

  const stories = [
    {
      name: 'Sarah Johnson',
      location: 'Iowa, USA',
      specialty: 'Corn & Soybeans Farmer',
      photo:
        'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=300',
      quote:
        'AgriConnect transformed my farming business. The direct market access increased my profits by 40%.',
      results: [
        { metric: 'Yield Increase', value: '35%', icon: TrendingUp },
        { metric: 'Water Saving', value: '25%', icon: Droplets },
        { metric: 'Profit Growth', value: '40%', icon: DollarSign },
        { metric: 'Time Saved', value: '20 hrs/week', icon: Zap },
      ],
    },
    {
      name: 'Miguel Rodriguez',
      location: 'California, USA',
      specialty: 'Organic Vegetables Farmer',
      photo:
        'https://images.pexels.com/photos/1484799/pexels-photo-1484799.jpeg?auto=compress&cs=tinysrgb&w=300',
      quote:
        'The weather alerts and farming guidance helped me prevent crop loss worth $15,000 last season.',
      results: [
        { metric: 'Crop Loss Prevention', value: '85%', icon: TrendingUp },
        { metric: 'Resource Efficiency', value: '30%', icon: Droplets },
        { metric: 'Revenue Increase', value: '55%', icon: DollarSign },
        { metric: 'Market Reach', value: '5x wider', icon: Zap },
      ],
    },
    {
      name: 'Emily Chen',
      location: 'Oregon, USA',
      specialty: 'Berry Farm Owner',
      photo:
        'https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=300',
      quote:
        "The platform's customer base helped me sell my entire berry harvest directly, eliminating middleman costs.",
      results: [
        { metric: 'Direct Sales', value: '90%', icon: TrendingUp },
        { metric: 'Cost Reduction', value: '30%', icon: Droplets },
        { metric: 'Profit Margin', value: '45%', icon: DollarSign },
        { metric: 'Customer Base', value: '300% growth', icon: Zap },
      ],
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
    AOS.refresh();
  }, []);

  const nextStory = () => setCurrentStory(prev => (prev + 1) % stories.length);
  const prevStory = () =>
    setCurrentStory(prev => (prev - 1 + stories.length) % stories.length);

  const currentFarmer = stories[currentStory];

  return (
    <div
      id="farmer-stories"
      className={`${themeBackgroundStyle} py-20 md:py-24 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Farmer Success Stories
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            Real farmers, real results. Discover how Root Farming is
            transforming agricultural businesses across the country.
          </p>
        </div>

        {/* Story Card */}
        <div
          className={`rounded-2xl shadow-sm hover:shadow-lg p-6 md:p-12 ${themeForegroundStyle}`}
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Farmer Info */}
            <div
              className="text-center lg:text-left"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start mb-6">
                <img
                  src={currentFarmer.photo}
                  alt={currentFarmer.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0 lg:mr-6 border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {currentFarmer.name}
                  </h3>
                  <p className="mb-1">{currentFarmer.location}</p>
                  <p className="text-green-600 font-semibold">
                    {currentFarmer.specialty}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm">5.0 Rating</span>
                  </div>
                </div>
              </div>

              <blockquote className="text-lg sm:text-xl italic mb-8 leading-relaxed">
                "{currentFarmer.quote}"
              </blockquote>

              <div className="flex justify-center lg:justify-start space-x-4">
                <button
                  onClick={prevStory}
                  className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextStory}
                  className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {currentFarmer.results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <div
                    key={index}
                     className={`${themeForegroundStyle} rounded-xl  shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)]
 p-4 sm:p-6 text-center border border-gray-700  transition-shadow duration-300`}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    data-aos-duration="900"
                  >
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{result.value}</p>
                    <p className="text-sm">{result.metric}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Navigation */}
          <div
            className="flex justify-center mt-8"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 mx-1 ${
                  index === currentStory ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSuccessStoriesSection;
