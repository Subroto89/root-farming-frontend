import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CloudRain } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

const WeatherChart = ({ data }) => {
  const { theme } = useTheme();
  const themeCard =
    theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-700'
      : 'bg-white text-gray-900 border-gray-200';

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className={`p-6 rounded-2xl border shadow-md ${themeCard}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CloudRain className="w-5 h-5" /> Weather Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              border: '1px solid',
              borderColor: theme === 'dark' ? '#555' : '#e2e8f0',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
