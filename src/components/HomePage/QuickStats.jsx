import React from 'react';
import { Users, TrendingUp, Leaf } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  {
    icon: <Users className="w-5 h-5 text-[#F59F0A]" />,
    value: 10000,
    suffix: '+',
    label: 'Active Farmers',
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-[#F59F0A]" />,
    value: 500,
    suffix: '+',
    label: 'Crop Varieties',
  },
  {
    icon: <Leaf className="w-5 h-5 text-[#F59F0A]" />,
    value: 98,
    suffix: '%',
    label: 'Success Rate',
  },
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center lg:text-left">
          <div className="flex items-center gap-2 mb-1">
            {stat.icon}
            <p className="text-3xl font-bold">
              <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
            </p>
          </div>
          <p className="text-sm text-white/80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
