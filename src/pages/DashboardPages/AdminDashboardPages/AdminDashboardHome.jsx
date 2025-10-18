import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { Users, DollarSign, TrendingUp, Briefcase, LineChart as LineChartIcon, Trophy } from "lucide-react";

const AdminDashboardHome = () => {
  // Dummy data
  const salesData = useMemo(
    () => [
      { day: "1", sales: 120 },
      { day: "5", sales: 300 },
      { day: "10", sales: 220 },
      { day: "15", sales: 280 },
      { day: "20", sales: 350 },
      { day: "25", sales: 400 },
      { day: "30", sales: 450 },
    ],
    []
  );

  const subscriptionData = useMemo(
    () => [
      { month: "May", subs: 120 },
      { month: "Jun", subs: 180 },
      { month: "Jul", subs: 210 },
      { month: "Aug", subs: 260 },
      { month: "Sep", subs: 290 },
      { month: "Oct", subs: 340 },
    ],
    []
  );

  const incomeData = [
    { name: "Sellers", value: 54000 },
    { name: "Subscriptions", value: 23000 },
    { name: "Ads", value: 12000 },
  ];

  const revenueExpenseData = [
    { month: "May", revenue: 50000, expense: 30000 },
    { month: "Jun", revenue: 55000, expense: 34000 },
    { month: "Jul", revenue: 62000, expense: 37000 },
    { month: "Aug", revenue: 71000, expense: 42000 },
    { month: "Sep", revenue: 78000, expense: 46000 },
    { month: "Oct", revenue: 89000, expense: 50000 },
  ];

  const topSellers = [
    { name: "Green Harvest", sales: "$12,400", orders: 320 },
    { name: "AgriZone", sales: "$10,200", orders: 280 },
    { name: "FarmFresh BD", sales: "$9,500", orders: 250 },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  // Dummy stats
  const totalSubscriptions = 340;
  const totalUsers = 1250;
  const userGrowth = 12.5; // %
  const totalIncome = 89000; // USD
  const profitFromSellers = 35; // %
  const agriSpecialistSalary = 15000; // USD this month

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Website Overview */}
      <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Welcome to Admin Dashboard </h2>
        <p className="text-gray-700">
          This panel provides a complete insight into the platform’s activities — including
          revenue growth, subscriptions, sellers’ performance, and specialists’ payroll data.
          Keep track of trends and make informed business decisions with the visual analytics below.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <DollarSign className="text-blue-600" size={28} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Income</h3>
            <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <Users className="text-green-600" size={28} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-sm text-green-500">+{userGrowth}% this month</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <TrendingUp className="text-yellow-600" size={28} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Profit from Sellers</h3>
            <p className="text-2xl font-bold">{profitFromSellers}%</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Briefcase className="text-purple-600" size={28} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Agri Specialists Salary</h3>
            <p className="text-2xl font-bold">${agriSpecialistSalary}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Monthly Sales */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h3 className="font-semibold text-lg mb-3">Sales This Month</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-gray-500 text-sm mt-2">
            Daily sales performance shows a steady increase after mid-month.
          </p>
        </div>

        {/* Bar Chart - Last 6 Month Subscriptions */}
        <div className="bg-white shadow rounded-2xl p-5">
          <h3 className="font-semibold text-lg mb-3">Last 6 Months Subscriptions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subscriptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="subs" fill="#82ca9d" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-gray-500 text-sm mt-2">
            Subscription count continues to grow with strong engagement over the last two months.
          </p>
        </div>
      </div>

      {/* Additional Area Chart - Revenue vs Expense */}
      <div className="bg-white shadow rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <LineChartIcon className="text-blue-500" size={22} />
          <h3 className="font-semibold text-lg">Revenue vs Expenses (Last 6 Months)</h3>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueExpenseData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRev)" />
            <Area type="monotone" dataKey="expense" stroke="#8884d8" fillOpacity={1} fill="url(#colorExp)" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-gray-500 text-sm mt-2">
          Revenue is consistently outperforming expenses, ensuring a stable profit margin.
        </p>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h3 className="font-semibold text-lg mb-3">Income Breakdown</h3>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={incomeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {incomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 lg:mt-0 lg:ml-10 space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Total Income/User:</span> $
              {(totalIncome / totalUsers).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Total Subscriptions:</span>{" "}
              {totalSubscriptions}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Avg Monthly Growth:</span>{" "}
              {userGrowth}%
            </p>
          </div>
        </div>
      </div>

      {/* Top Sellers Section */}
      <div className="bg-white shadow rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="text-yellow-500" size={22} />
          <h3 className="font-semibold text-lg">Top Performing Sellers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Seller</th>
                <th className="p-3">Total Sales</th>
                <th className="p-3">Orders</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((seller, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{seller.name}</td>
                  <td className="p-3">{seller.sales}</td>
                  <td className="p-3">{seller.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-sm mt-3">
          Sellers continue to perform strongly, contributing significantly to the revenue stream.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
