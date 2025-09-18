import React from "react";
import { Users, Award, TrendingUp } from "lucide-react";

const OurGrowingImpactSection = () => {
  const stats = [
    {
      icon: <Users className="w-10 h-10 text-white" />,
      image: "https://cdn-icons-png.flaticon.com/128/13558/13558477.png",
      value: "15,000+",
      label: "Happy Farmers",
      desc: "Farmers trust our solutions",
      bg: "from-green-500 to-green-600",
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      image: "https://cdn-icons-png.flaticon.com/128/3137/3137941.png",
      value: "50,000+",
      label: "Satisfied Customers",
      desc: "Customers served nationwide",
      bg: "from-blue-500 to-blue-600",
    },
    {
      icon: <Award className="w-10 h-10 text-white" />,
      image: "https://cdn-icons-png.flaticon.com/128/17387/17387837.png",
      value: "200+",
      label: "Agricultural Specialists",
      desc: "Expert consultants available",
      bg: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-white" />,
      image: "https://cdn-icons-png.flaticon.com/128/10112/10112502.png",
      value: "2,500,000+",
      label: "Products Sold",
      desc: "Quality products delivered",
      bg: "from-green-600 to-green-700",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-green-600 to-blue-600">
      <section className="max-w-7xl mx-auto py-16 px-6 text-white">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Growing Impact</h2>
          <p className="mt-2 text-lg">
            Join a thriving community that's revolutionizing agriculture
            worldwide
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl transition-transform duration-300 
           hover:scale-105 hover:shadow-xl cursor-pointer p-6 text-center bg-gradient-to-r bg-white/10 shadow-lg`}
            >
              <div className="flex mx-auto mb-4 p-4 rounded-full bg-white/10 w-fit">
                <img src={stat.image} width={50} alt="" />
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="font-semibold">{stat.label}</p>
              <p className="text-sm text-gray-200">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-2">
            Ready to Join Our Success Story?
          </h3>
          <p className="mb-6 text-gray-200">
            Become part of the farming revolution that's changing lives and
            communities
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700  transition duration-500 ease-in-out transform active:scale-95 active:rotate-2 cursor-pointer text-white px-6 py-3 rounded-full shadow-md">
              Start Your Journey
            </button>
            <button className="border border-white text-white  duration-500 ease-in-out cursor-pointer transform active:scale-95 active:rotate-2 px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurGrowingImpactSection;
