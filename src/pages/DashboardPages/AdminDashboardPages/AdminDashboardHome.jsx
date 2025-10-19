import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaSeedling,
} from "react-icons/fa";
import Container from "../../../components/shared/Container";
// import './Dashboard.css'; // Assume you'll add some CSS here

// --- Sample Data ---

const userDistributionData = [
  { name: "Farmer", value: 4500, color: "#3f51b5" },
  { name: "Seller", value: 2500, color: "#ff9800" },
  { name: "Customer", value: 5000, color: "#4caf50" },
  { name: "Agri-Specialist", value: 400, color: "#f44336" },
];

const salesData = [
  { crop: "Corn", sales: 12000 },
  { crop: "Wheat", sales: 9800 },
  { crop: "Rice", sales: 8500 },
  { crop: "Soybeans", sales: 6500 },
  { crop: "Tomatoes", sales: 4000 },
];

const activityData = [
  { day: "Day 1", logins: 150, transactions: 50 },
  { day: "Day 5", logins: 180, transactions: 65 },
  { day: "Day 10", logins: 220, transactions: 80 },
  { day: "Day 15", logins: 200, transactions: 75 },
  { day: "Day 20", logins: 250, transactions: 90 },
  { day: "Day 25", logins: 280, transactions: 110 },
  { day: "Day 30", logins: 300, transactions: 125 },
];

// --- Component for KPI Card ---
const KPICard = ({ title, value, icon: Icon, color }) => (
  <div className="kpi-card" style={{ borderLeft: `5px solid ${color}` }}>
    <div className="kpi-info">
      <h3 className="kpi-title">{title}</h3>
      <p className="kpi-value">{value}</p>
    </div>
    <div className="kpi-icon-container" style={{ color: color }}>
      <Icon size={30} />
    </div>
  </div>
);

// --- Main Dashboard Component ---
const AdminDashboardHome = () => {
  return (
    <Container>
      <div className="dashboard-container">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard Overview</h1>

        {/* Row 1: KPI Cards */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-8">
          {/* KPI Card 1 */}
          <div
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl transform hover:scale-[1.02]"
            style={{ borderLeft: `4px solid #3f51b5` }} // Total Users Color
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-gray-800">12,400</p>
            </div>
            <div
              className="p-3 rounded-full bg-opacity-10"
              style={{ color: "#3f51b5", backgroundColor: `#3f51b51A` }}
            >
              {/* Replace with your FaUsers icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>

          {/* KPI Card 2 */}
          <div
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl transform hover:scale-[1.02]"
            style={{ borderLeft: `4px solid #ff9800` }} // Total Revenue Color
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">
                Total Revenue
              </h3>
              <p className="text-3xl font-bold text-gray-800">$54,821</p>
            </div>
            <div
              className="p-3 rounded-full bg-opacity-10"
              style={{ color: "#ff9800", backgroundColor: `#ff98001A` }}
            >
              {/* Replace with your FaShoppingCart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
          </div>

          {/* KPI Card 3 */}
          <div
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl transform hover:scale-[1.02]"
            style={{ borderLeft: `4px solid #4caf50` }} // New Orders Color
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">
                New Orders
              </h3>
              <p className="text-3xl font-bold text-gray-800">45</p>
            </div>
            <div
              className="p-3 rounded-full bg-opacity-10"
              style={{ color: "#4caf50", backgroundColor: `#4caf501A` }}
            >
              {/* Replace with your FaChartLine icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 18v-6h3v6h3v-4h3v4h3v-2h3v2h3V6" />
              </svg>
            </div>
          </div>

          {/* KPI Card 4 */}
          <div
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl transform hover:scale-[1.02]"
            style={{ borderLeft: `4px solid #f44336` }} // Crops Listed Color
          >
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-1">
                Crops Listed
              </h3>
              <p className="text-3xl font-bold text-gray-800">250</p>
            </div>
            <div
              className="p-3 rounded-full bg-opacity-10"
              style={{ color: "#f44336", backgroundColor: `#f443361A` }}
            >
              {/* Replace with your FaSeedling icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21a9 9 0 0 0 9-9c0-3-2-6-5-8" />
                <path d="M12 21v-4" />
                <path d="M10 17l4-2" />
                <path d="M12 17l0 0" />
              </svg>
            </div>
          </div>
        </div>
        {/* Row 2: User Distribution & Sales Bar Graph */}
        <div className="charts-row">
          {/* Pie Chart: User Distribution */}
          <div className="chart-box">
            <h2>User Composition</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Graph: Crop Sales */}
          <div className="chart-box">
            <h2>Sales by Crop (Units Sold)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3: Activity Trend */}
        <div className="charts-row">
          <div className="chart-box full-width">
            <h2>Platform Activity (Last 30 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={activityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="logins"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="transactions"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboardHome;
