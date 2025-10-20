import React from 'react';
import CountUp from 'react-countup';

const StatsCounter = ({ themeForegroundStyle }) => {
  const stats = [
    { value: 85, label: 'Increased Revenue', suffix: '%' },
    { value: 40, label: 'Better Yields', suffix: '%' },
    { value: 95, label: 'Customer Satisfaction', suffix: '%' },
    { value: 24, label: 'Expert Support', suffix: '/7' },
  ];

  return (
    <div
      className={`${themeForegroundStyle} border border-gray-200 rounded-2xl shadow-md p-6`}
      data-aos="fade-up"
      data-aos-duration="900"
    >
      <div className="grid grid-cols-2 gap-6 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            data-aos="zoom-in"
            data-aos-delay={idx * 150}
            data-aos-duration="900"
          >
            {/* Counter */}
            <div className="text-2xl font-bold mb-1">
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
            <div className="text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;
