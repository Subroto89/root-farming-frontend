import React from 'react';
import CountUp from 'react-countup';

const StatsCounter = () => {
  const stats = [
    { value: 85, label: 'Increased Revenue', suffix: '%' },
    { value: 40, label: 'Better Yields', suffix: '%' },
    { value: 95, label: 'Customer Satisfaction', suffix: '%' },
    { value: 24, label: 'Expert Support', suffix: '/7' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
      <div className="grid grid-cols-2 gap-6 text-center">
        {stats.map((stat, idx) => (
          <div key={idx}>
            {/* Counter */}
            <div className="text-2xl font-bold text-green-700 mb-1">
              <CountUp
                start={0}
                end={stat.value}
                duration={2}
                suffix={stat.suffix}
                enableScrollSpy
                scrollSpyOnce
              />
            </div>

            {/* Label */}
            <div className="text-sm  text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
