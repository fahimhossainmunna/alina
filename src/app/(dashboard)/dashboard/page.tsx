"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ✅ Currency changed to $ and values updated for USD
const stats = [
  {
    label: "Total Revenue",
    value: "$28,450",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
  },
  {
    label: "Total Orders",
    value: "1,482",
    change: "+8.2%",
    up: true,
    icon: ShoppingBag,
  },
  {
    label: "New Customers",
    value: "384",
    change: "-2.4%",
    up: false,
    icon: Users,
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    change: "+1.2%",
    up: true,
    icon: TrendingUp,
  },
];

// ✅ Order amounts updated to $
const recentOrders = [
  {
    id: "#ORD-7842",
    customer: "Sarah Ahmed",
    product: "Rose & Saffron Set",
    amount: "$24.00",
    status: "Completed",
    date: "May 26, 2026",
  },
  {
    id: "#ORD-7841",
    customer: "Rahim Khan",
    product: "Dark Truffle Box",
    amount: "$18.50",
    status: "Processing",
    date: "May 26, 2026",
  },
  {
    id: "#ORD-7840",
    customer: "Nusrat Jahan",
    product: "Premium Gift Pack",
    amount: "$32.00",
    status: "Shipped",
    date: "May 25, 2026",
  },
  {
    id: "#ORD-7839",
    customer: "Ayesha Siddiqui",
    product: "Classic Collection",
    amount: "$15.00",
    status: "Pending",
    date: "May 25, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-purple-50 text-purple-700 border-purple-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold text-[#1C1B1B] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#1C1B1B]/60 mt-1">
            Welcome back, here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#742709]/10 rounded-xl text-sm font-medium text-[#1C1B1B] hover:border-[#742709]/30 transition-all shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#742709] text-[#FFFCF9] rounded-xl text-sm font-medium hover:bg-[#5A1E07] transition-all shadow-lg shadow-[#742709]/20">
            <Search className="w-4 h-4" /> Export Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 24px -8px rgba(116,39,9,0.12)",
            }}
            className="bg-white p-6 rounded-2xl border border-[#742709]/6 shadow-sm transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#742709]/8 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#742709]" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${
                  stat.up
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {stat.up ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-semibold text-[#1C1B1B]">
              {stat.value}
            </p>
            <p className="text-sm text-[#1C1B1B]/50 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-[#742709]/6 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-[#742709]/8 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1C1B1B]">
            Recent Orders
          </h2>
          <button className="text-sm text-[#742709] font-medium hover:underline flex items-center gap-1 group">
            View All{" "}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAF7F2]">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Amount",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#1C1B1B]/50"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#742709]/6">
              {recentOrders.map((order, i) => (
                <motion.tr
                  key={i}
                  whileHover={{ backgroundColor: "rgba(116,39,9,0.015)" }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#742709]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1C1B1B]">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1C1B1B]/70">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1C1B1B]">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1C1B1B]/50">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-[#742709]/5 text-[#1C1B1B]/40 hover:text-[#742709] transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#742709]/5 text-[#1C1B1B]/40 hover:text-[#742709] transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-[#C43B3B]/5 text-[#1C1B1B]/40 hover:text-[#C43B3B] transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
