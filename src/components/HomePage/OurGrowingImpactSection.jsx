import React from "react";
import { Users, Award, TrendingUp } from "lucide-react";

const OurGrowingImpactSection = () => {
  const stats = [
    {
      icon: <Users className="w-10 h-10 text-white" />,
      value: "15,000+",
      label: "Happy Farmers",
      desc: "Farmers trust our solutions",
      bg: "from-green-500 to-green-600",
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      value: "50,000+",
      label: "Satisfied Customers",
      desc: "Customers served nationwide",
      bg: "from-blue-500 to-blue-600",
    },
    {
      icon: <Award className="w-10 h-10 text-white" />,
      value: "200+",
      label: "Agricultural Specialists",
      desc: "Expert consultants available",
      bg: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      value: "2,500,000+",
      label: "Products Sold",
      desc: "Quality products delivered",
      bg: "from-green-600 to-green-700",
    },
  ];
  return <div className="bg-gradient-to-br from-green-600 to-blue-600">
    <section className="max-w-7xl mx-auto py-16 px-6 text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Growing Impact</h2>
        <p className="mt-2 text-lg">
          Join a thriving community that's revolutionizing agriculture worldwide
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 text-center bg-gradient-to-r ${stat.bg} shadow-lg`}
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="font-semibold">{stat.label}</p>
            <p className="text-sm text-gray-100">{stat.desc}</p>
          </div>
        ))}
      </div>

      
    </section>
  </div>;
};

export default OurGrowingImpactSection;
