import { Award, Medal, Star, Trophy } from "lucide-react";
import React from "react";

const IndustryRecognitionAndAchievenent = () => {
    const achievements = [
      {
        icon: Award,
        title: 'Best AgriTech 2023',
        description: 'Recognized as the leading AgriTech innovation of the year.',
      },
      {
        icon: Trophy,
        title: 'Global Innovation Award',
        description: 'Awarded for outstanding contribution to sustainable farming.',
      },
      {
        icon: Star,
        title: 'Top 100 Startups',
        description: 'Listed among the top 100 most impactful startups worldwide.',
      },
      {
        icon: Medal,
        title: 'Excellence in Technology',
        description: 'Honored for cutting-edge agricultural technology solutions.',
      },
    ];
  return (
    <div className="my-16">
      {/* Heading Section ------------------------------------------------- */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Industry Recognition & Achievements
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our excellence in agricultural technology has been recognized by
          leading industry organizations
        </p>
      </div>

      {/* Achievements Grid ------------------------------------*/}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center border border-gray-100"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconComponent className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {achievement.title}
              </h3>
              <p className="text-gray-600 text-sm">{achievement.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryRecognitionAndAchievenent;
