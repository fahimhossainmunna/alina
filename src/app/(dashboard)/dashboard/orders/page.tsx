"use client";

import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";

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

const orders = [
  {
    id: "#ORD-7842",
    customer: "Sarah Ahmed",
    email: "sarah@email.com",
    product: "Rose & Saffron Set",
    amount: "$24.00",
    status: "Completed",
    date: "May 26, 2026",
  },
  {
    id: "#ORD-7841",
    customer: "Rahim Khan",
    email: "rahim@email.com",
    product: "Dark Truffle Box",
    amount: "$18.50",
    status: "Processing",
    date: "May 26, 2026",
  },
  {
    id: "#ORD-7840",
    customer: "Nusrat Jahan",
    email: "nusrat@email.com",
    product: "Premium Gift Pack",
    amount: "$32.00",
    status: "Shipped",
    date: "May 25, 2026",
  },
  {
    id: "#ORD-7839",
    customer: "Ayesha Siddiqui",
    email: "ayesha@email.com",
    product: "Classic Collection",
    amount: "$15.00",
    status: "Pending",
    date: "May 25, 2026",
  },
  {
    id: "#ORD-7838",
    customer: "Karim Uddin",
    email: "karim@email.com",
    product: "Alina Noir",
    amount: "$15.00",
    status: "Cancelled",
    date: "May 24, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-purple-50 text-purple-700 border-purple-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function OrdersPage() {
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
            Orders
          </h1>
          <p className="text-sm text-[#1C1B1B]/60 mt-1">
            Manage and track all customer orders.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#742709] text-[#FFFCF9] rounded-xl text-sm font-medium hover:bg-[#5A1E07] transition-all shadow-lg shadow-[#742709]/20">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-4 rounded-xl border border-[#742709]/6 shadow-sm flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1B1B]/40" />
          <input
            type="text"
            placeholder="Search orders by ID or customer..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#742709]/10 rounded-lg text-sm focus:outline-none focus:border-[#742709]/40 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#742709]/10 rounded-lg text-sm font-medium text-[#1C1B1B] hover:border-[#742709]/30 transition-all">
            <Filter className="w-4 h-4" /> Status
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#742709]/10 rounded-lg text-sm font-medium text-[#1C1B1B] hover:border-[#742709]/30 transition-all">
            <Filter className="w-4 h-4" /> Date Range
          </button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-[#742709]/6 shadow-sm overflow-hidden"
      >
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
              {orders.map((order, i) => (
                <motion.tr
                  key={i}
                  whileHover={{ backgroundColor: "rgba(116,39,9,0.015)" }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#742709]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#1C1B1B]">
                      {order.customer}
                    </div>
                    <div className="text-xs text-[#1C1B1B]/50">
                      {order.email}
                    </div>
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
        {/* Pagination */}
        <div className="p-4 border-t border-[#742709]/8 flex items-center justify-between text-sm text-[#1C1B1B]/60">
          <span>Showing 1-5 of 48 orders</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-[#742709]/10 rounded-lg hover:bg-[#742709]/5 disabled:opacity-50"
              disabled
            >
              Prev
            </button>
            <button className="px-3 py-1.5 border border-[#742709]/10 rounded-lg hover:bg-[#742709]/5">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
