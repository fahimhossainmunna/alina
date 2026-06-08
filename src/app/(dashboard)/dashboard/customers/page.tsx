"use client";

import { motion } from "framer-motion";
import { Search, Mail, Phone, MapPin, MoreVertical } from "lucide-react";

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

const customers = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah@email.com",
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
    orders: 12,
    spent: "$245.00",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahim Khan",
    email: "rahim@email.com",
    phone: "+880 1912-345678",
    location: "Chattogram, Bangladesh",
    orders: 5,
    spent: "$89.50",
    status: "Active",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat@email.com",
    phone: "+880 1512-345678",
    location: "Sylhet, Bangladesh",
    orders: 8,
    spent: "$156.00",
    status: "Inactive",
  },
];

export default function CustomersPage() {
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
            Customers
          </h1>
          <p className="text-sm text-[#1C1B1B]/60 mt-1">
            View and manage your customer database.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#742709] text-[#FFFCF9] rounded-xl text-sm font-medium hover:bg-[#5A1E07] transition-all shadow-lg shadow-[#742709]/20">
          Add Customer
        </button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1B1B]/40" />
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#742709]/10 rounded-xl text-sm focus:outline-none focus:border-[#742709]/40 transition-colors shadow-sm"
        />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer, i) => (
          <motion.div
            key={customer.id}
            variants={itemVariants}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 24px -8px rgba(116,39,9,0.12)",
            }}
            className="bg-white p-6 rounded-2xl border border-[#742709]/6 shadow-sm transition-all duration-300 relative"
          >
            <button className="absolute top-6 right-6 p-1.5 rounded-lg hover:bg-[#742709]/5 text-[#1C1B1B]/40 hover:text-[#742709] transition-all">
              <MoreVertical className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#742709]/10 flex items-center justify-center text-[#742709] font-semibold text-lg">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-[#1C1B1B]">
                  {customer.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${customer.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-600 border-gray-200"}`}
                >
                  {customer.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#1C1B1B]/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#742709]/60" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#742709]/60" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#742709]/60" />
                <span>{customer.location}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#742709]/8 flex items-center justify-between text-sm">
              <div>
                <p className="text-[#1C1B1B]/50 text-xs">Total Orders</p>
                <p className="font-semibold text-[#1C1B1B]">
                  {customer.orders}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#1C1B1B]/50 text-xs">Total Spent</p>
                <p className="font-semibold text-[#742709]">{customer.spent}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
