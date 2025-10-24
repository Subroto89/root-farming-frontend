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
import { FaUsers, FaShoppingCart, FaChartLine, FaSeedling } from "react-icons/fa";
import Container from "../../../components/shared/Container";
import { useTheme } from "../../../hooks/useTheme";

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



export default function AdminDashboardHome() {
  const {theme} = useTheme();
 const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"


    const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`${themeFgOfFgStyle} flex items-center justify-between p-6 rounded-2xl shadow transition hover:shadow-xl hover:scale-[1.02] `} style={{ borderColor: color }}>
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold uppercase mb-1">{title}</h3>
      <p className="text-3xl font-bold ">{value}</p>
    </div>
    <div className="p-3 rounded-full bg-opacity-10" style={{ color, backgroundColor: `${color}1A` }}>
      <Icon size={28} />
    </div>
  </div>
);
  return (
    
      <div className={`${themeBackgroundStyle} space-y-10`}>
        <Container>
        <div className="space-y-10">
          <h1 className="text-3xl font-bold text-center">Admin Dashboard Overview</h1>

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          <StatCard title="Total Users" value="12,400" icon={FaUsers} color="#3f51b5" />
          <StatCard title="Total Revenue" value="$54,821" icon={FaShoppingCart} color="#ff9800" />
          <StatCard title="New Orders" value="45" icon={FaChartLine} color="#4caf50" />
          <StatCard title="Crops Listed" value="250" icon={FaSeedling} color="#f44336" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`${themeFgOfFgStyle} p-6 rounded-2xl shadow`}>
            <h2 className="text-lg font-semibold mb-4">User Composition</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={userDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {userDistributionData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={`${themeForegroundStyle} p-6 rounded-2xl shadow`}>
            <h2 className="text-lg font-semibold mb-4">Sales by Crop (Units Sold)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Bar dataKey="sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${themeForegroundStyle} p-6 rounded-2xl shadow`}>
          <h2 className="text-lg font-semibold mb-4">Platform Activity (Last 30 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="logins" />
              <Line yAxisId="right" type="monotone" dataKey="transactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>
          </div>
        </Container>
      </div>
    
  );
}
