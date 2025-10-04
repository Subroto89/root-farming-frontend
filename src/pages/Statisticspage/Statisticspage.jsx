import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const FarmerDashboardHome = () => {
  // Static Pie Chart Data (Crop Distribution)
  const pieData = {
    labels: ['Wheat', 'Corn', 'Rice', 'Soybean'],
    datasets: [
      {
        label: 'Crop Distribution',
        data: [30, 25, 20, 25],
        backgroundColor: ['#4ade80', '#fbbf24', '#60a5fa', '#f87171'],
        borderWidth: 1,
      },
    ],
  };

  // Static Bar Chart Data (Monthly Yield)
  const barData = {
    labels: ['June', 'July', 'August', 'September'],
    datasets: [
      {
        label: 'Yield (tons)',
        data: [12, 19, 14, 17],
        backgroundColor: '#34d399',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Monthly Crop Yield',
      },
    },
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-800">Welcome, Farmer!</h1>
        <p className="text-green-600">Here’s an overview of your farm status.</p>
      </header>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
          Add New Crop
        </button>
        <button className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition">
          View Reports
        </button>
        <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
          Manage Equipment
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow rounded w-96 h-96 p-10">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Crop Distribution</h2>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Monthly Yield</h2>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardHome;
