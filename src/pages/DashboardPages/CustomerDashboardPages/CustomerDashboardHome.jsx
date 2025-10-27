import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useAuth} from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";

const CustomerDashboardHome = () => {
    const {theme} = useTheme();
    console.log(theme)
    // State to track order filter
    const [filter, setFilter] = useState("All");

    // Custom Hooks (Uncomment when backend is ready)
    // const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Tanstack Query Fetch (will be used later)
    // const { data: orders = [], isLoading } = useQuery({
    //   queryKey: ["customerData", user?.email],
    //   queryFn: async () => {
    //     const res = await axiosSecure.get(`/customer?email=${user?.email}`);
    //     return res.data;
    //   },
    //   enabled: !!user?.email,
    // });

    // Dummy data (temporary display)
    const orders = [
        { id: "#589945", product: "Premium Basmati Rice (5kg)", date: "10 Jan 2025", status: "Completed", payment: "COD", price: "$25.00" },
        { id: "#589946", product: "Organic Fertilizer (10kg Bag)", date: "12 Feb 2025", status: "Cancelled", payment: "COD", price: "$18.00" },
        { id: "#589947", product: "Hand Weeding Tool", date: "27 Feb 2025", status: "Processing", payment: "COD", price: "$12.50" },
        { id: "#589948", product: "Irrigation Water Pipe (50m Roll)", date: "19 June 2025", status: "Completed", payment: "BT", price: "$65.00" },
        { id: "#589949", product: "Organic Vegetable Seeds Pack", date: "21 July 2025", status: "Cancelled", payment: "BT", price: "$9.75" },
    ];

    // Filter orders based on status
    const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);
 
    const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"

    // Summary Card component
    const SummaryCard = ({ title, value, subtitle, color }) => (
    <div className={`${themeForegroundStyle} p-5 rounded-2xl shadow-sm`}>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className={`text-2xl font-semibold ${color}`}>{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
    )
    return (
        <div className= {`${themeBackgroundStyle} px-6  space-y-6 pt-4`}>

            {/* Header Section */}
            <div className={`${themeBackgroundStyle} flex flex-col sm:flex-row sm:items-center sm:justify-betwee`}>
                <h2 className="text-2xl font-semibold">
                    Welcome: <span className="text-2xl font-semibold">{user?.displayName}</span>
                </h2>
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="mt-3 sm:mt-0 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64"
                />
            </div>

            {/* Summary Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard className={`${themeForegroundStyle}`} title="Total Cost" value="$10440.2k" subtitle="Total cost last 365 days" color="text-blue-600" />
                <SummaryCard title="Total Order" value="127" subtitle="Total order last 365 days" color="text-yellow-500" />
                <SummaryCard title="Completed" value="100" subtitle="Completed order last 365 days" color="text-green-600" />
                <SummaryCard title="Cancelled" value="27" subtitle="Cancelled order last 365 days" color="text-red-500" />
            </div>

            {/* Main Grid: Customer Info + Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-[19px]">

                {/* Customer Information */}
                <div className={`${themeForegroundStyle} p-5 rounded-lg shadow-sm `}>
                    <h3 className="font-semibold text-lg mb-4">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {user?.displayName}</p>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Phone:</span> +880123456789</p>
                        <p><span className="font-medium">Shipping address:</span> 1600 Amphitheatre Parkway, CA, USA 94043</p>
                        <p><span className="font-medium">Billing address:</span> Same as shipping address</p>
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Recent Activity</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Live chat with support - 6 Sept 2025</li>
                            <li>Given Rating - 9 Sept 2025</li>
                        </ul>
                    </div>
                </div>

                {/* Orders Section */}
                <div className={`${themeForegroundStyle} lg:col-span-2 p-5 rounded-lg shadow-sm`}>
                    <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                        <h3 className="font-semibold text-lg">Orders</h3>
                        <div className="flex flex-wrap gap-2">
                            {["All", "Processing", "Completed", "Cancelled"].map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => setFilter(btn)}
                                    className={`${themeForegroundStyle} px-4 py-1.5 rounded-full text-sm border border-gray-300 transition ${filter === btn
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto h-[280px]">
                        <table className="w-full text-sm text-left border-t border-gray-300">
                            <thead className={`${themeFgOfFgStyle} bg-gray-100 uppercase text-xs`}>
                                <tr>
                                    <th className="p-3 border-b border-gray-300">ID</th>
                                    <th className="p-3 border-b border-gray-300">Product name</th>
                                    <th className="p-3 border-b border-gray-300">Date</th>
                                    <th className="p-3 border-b border-gray-300">Status</th>
                                    <th className="p-3 border-b border-gray-300">Payment</th>
                                    <th className="p-3 text-right border-b border-gray-300">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, i) => (
                                    <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                                        <td className="p-3">{order.id}</td>
                                        <td className="p-3">{order.product}</td>
                                        <td className="p-3">{order.date}</td>
                                        <td
                                            className={`p-3 font-medium ${order.status === "Completed"
                                                ? "text-green-600"
                                                : order.status === "Processing"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {order.status}
                                        </td>
                                        <td className="p-3">{order.payment}</td>
                                        <td className="p-3 text-right">{order.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default CustomerDashboardHome;
