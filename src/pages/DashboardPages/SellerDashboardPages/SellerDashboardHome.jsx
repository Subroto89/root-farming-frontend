 import React from "react";
import { stats, customers } from "./data";
import { useTheme } from "../../../hooks/useTheme";
import Container from "../../../components/shared/Container";

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Blocked: "bg-red-100 text-red-700",
};


const SellerDashboardHome = () => {
  const { theme } = useTheme();
  const backgroundThemeClass = theme === "dark" ? "bg-dark" : "bg-light";
  const foregroundThemeClass = theme === "dark" ? "fg-dark" : "fg-light";
  const subForegroundThemeClass = theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
  return (
    <div className={`${backgroundThemeClass} min-h-screen`}>
      <Container>
        {/* Stats Section */}
        <h2 className="text-3xl font-bold">Seller</h2>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className={`${subForegroundThemeClass} p-4 rounded-lg shadow`}>
            <h2 className="text-gray-500 text-sm">Total Customers</h2>
            <p className="text-2xl font-bold">{stats.totalCustomers.value.toLocaleString()}</p>
            <p className={`text-sm ${stats.totalCustomers.change > 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.totalCustomers.change > 0 ? `+${stats.totalCustomers.change}%` : `${stats.totalCustomers.change}%`} this week
            </p>
          </div>
          <div className={`${subForegroundThemeClass} p-4 rounded-lg shadow`}>
            <h2 className="text-gray-500 text-sm">New Customers</h2>
            <p className="text-2xl font-bold">{stats.newCustomers.value.toLocaleString()}</p>
            <p className={`text-sm ${stats.newCustomers.change > 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.newCustomers.change > 0 ? `+${stats.newCustomers.change}%` : `${stats.newCustomers.change}%`} this week
            </p>
          </div>
          <div className={`${subForegroundThemeClass} p-4 rounded-lg shadow`}>
            <h2 className="text-gray-500 text-sm">Avg Order Value</h2>
            <p className="text-2xl font-bold">${stats.avgOrderValue.value.toFixed(2)}</p>
            <p className={`text-sm ${stats.avgOrderValue.change > 0 ? "text-green-500" : "text-red-500"}`}>
              {stats.avgOrderValue.change > 0 ? `+${stats.avgOrderValue.change}%` : `${stats.avgOrderValue.change}%`} this week
            </p>
          </div>
          <div className={`${subForegroundThemeClass} p-4 rounded-lg shadow`}>
            <h2 className="text-gray-500 text-sm">Customer Satisfaction</h2>
            <p className="text-2xl font-bold">{stats.customerSatisfaction.value}/5</p>
            <p className="text-green-500 text-sm">+{stats.customerSatisfaction.change}% this week</p>
          </div>
        </div>

        {/* Customer Table */}
        <div className={`${foregroundThemeClass} bg-white p-6 rounded-lg shadow`}>
          <h2 className="text-lg font-bold mb-4">Customer List</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className={`${subForegroundThemeClass}`}>
                <th className="px-4 py-2 text-left">Customer ID</th>
                <th className="px-4 py-2 text-left">Customer Name</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Marketplace</th>
                <th className="px-4 py-2 text-left">Orders</th>
                <th className="px-4 py-2 text-left">Total Spent</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`px-4 py-2 rounded-lg shadow-sm mb-2 ${foregroundThemeClass} ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <td className="px-4 py-2">{c.id}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">
                    {c.contact} <br /> {c.phone}
                  </td>
                  <td className="px-4 py-2">{c.marketplace}</td>
                  <td className="px-4 py-2">{c.orders}</td>
                  <td className="px-4 py-2">{c.totalSpent}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${statusColors[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </Container>
    </div>
  );
};

export default SellerDashboardHome;
