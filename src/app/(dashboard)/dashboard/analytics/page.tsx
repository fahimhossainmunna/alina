"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

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

// Mock data for simple bar chart
const salesData = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 1900 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 2200 },
  { day: "Fri", amount: 2800 },
  { day: "Sat", amount: 3100 },
  { day: "Sun", amount: 2400 },
];

const maxAmount = Math.max(...salesData.map((d) => d.amount));

export default function AnalyticsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-[#1C1B1B] tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-[#1C1B1B]/60 mt-1">
          Track your store's performance and trends.
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            value: "$28,450",
            icon: DollarSign,
            trend: "+12.5%",
          },
          {
            label: "Total Orders",
            value: "1,482",
            icon: ShoppingBag,
            trend: "+8.2%",
          },
          { label: "New Customers", value: "384", icon: Users, trend: "-2.4%" },
          {
            label: "Conversion Rate",
            value: "4.8%",
            icon: TrendingUp,
            trend: "+1.2%",
          },
        ].map((stat, i) => (
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
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${stat.trend.startsWith("+") ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-semibold text-[#1C1B1B]">
              {stat.value}
            </p>
            <p className="text-sm text-[#1C1B1B]/50 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-2xl border border-[#742709]/6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-[#1C1B1B]">Weekly Sales</h2>
          <select className="bg-[#FAF7F2] border border-[#742709]/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        {/* Simple CSS Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-4 px-2">
          {salesData.map((data, i) => {
            const height = (data.amount / maxAmount) * 100;
            return (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full flex justify-center mb-2">
                  <div className="absolute bottom-full mb-2 bg-[#1C1B1B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${data.amount}
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full max-w-[40px] bg-[#742709]/20 rounded-t-lg group-hover:bg-[#742709]/40 transition-colors cursor-pointer"
                  >
                    <div className="w-full h-2 bg-[#742709] rounded-t-lg"></div>
                  </motion.div>
                </div>
                <span className="text-xs text-[#1C1B1B]/50 mt-2">
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
