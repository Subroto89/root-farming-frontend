import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '../../../hooks/useTheme';

const CropGrowthChart = ({ data }) => {
  const { theme } = useTheme();
  const themeCard =
    theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-700'
      : 'bg-white text-gray-900 border-gray-200';

  return (
    <div className={`p-6 rounded-2xl border shadow-md ${themeCard}`}>
      <h2 className="text-xl font-bold mb-4">Crop Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === 'dark' ? '#555' : '#e2e8f0'}
          />
          <XAxis
            dataKey="name"
            stroke={theme === 'dark' ? '#ddd' : '#64748b'}
          />
          <YAxis stroke={theme === 'dark' ? '#ddd' : '#64748b'} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              border: '1px solid',
              borderColor: theme === 'dark' ? '#555' : '#e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Progress (%)"
          />
          <Line
            type="monotone"
            dataKey="health"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Health Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropGrowthChart;
