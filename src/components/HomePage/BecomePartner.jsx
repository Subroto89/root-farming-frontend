import React from 'react';
import { Mail, Download, Users, Globe, Zap } from 'lucide-react';

const partnerBenefits = [
  {
    icon: Globe,
    title: 'Global Network',
    description:
      'Access to our worldwide network of farmers and agricultural experts',
  },
  {
    icon: Users,
    title: 'Premium Support',
    description: 'Dedicated support team and priority technical assistance',
  },
  {
    icon: Zap,
    title: 'Co-Innovation',
    description:
      'Collaborate on developing cutting-edge agricultural solutions',
  },
];

const BecomePartner = () => {
  return (
    <div className=" max-w-11/12 mx-auto relative bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl shadow-2xl p-10 lg:p-16 text-white my-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>

      <div className="relative text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Become a Partner
        </h2>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          Join our ecosystem of innovative partners and help us transform
          agriculture for a sustainable future.
        </p>
      </div>

      <div className="relative grid md:grid-cols-3 gap-8 mb-14">
        {partnerBenefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center 
                         hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center 
                                bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg"
                >
                  <IconComponent className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-base opacity-90">{benefit.description}</p>
            </div>
          );
        })}
      </div>

      <div className="relative flex flex-col sm:flex-row gap-5 justify-center">
        <button className="inline-flex items-center bg-white text-green-700 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
          <Mail className="h-5 w-5 mr-2" />
          Partner With Us
        </button>
        <button className="inline-flex items-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300">
          <Download className="h-5 w-5 mr-2" />
          Partnership Guide
        </button>
      </div>
    </div>
  );
};

export default BecomePartner;
