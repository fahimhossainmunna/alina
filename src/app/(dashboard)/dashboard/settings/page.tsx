"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Save } from "lucide-react";

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

export default function SettingsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-4xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-[#1C1B1B] tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-[#1C1B1B]/60 mt-1">
          Manage your account and store preferences.
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-8 rounded-2xl border border-[#742709]/6 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#742709]/10 flex items-center justify-center text-[#742709] text-2xl font-bold">
            A
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1C1B1B]">Admin User</h3>
            <p className="text-sm text-[#1C1B1B]/50">admin@alina.com</p>
            <button className="text-sm text-[#742709] font-medium hover:underline mt-1">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1C1B1B] mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#742709]/10 rounded-xl text-sm focus:outline-none focus:border-[#742709]/40 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1B1B] mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@alina.com"
              className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#742709]/10 rounded-xl text-sm focus:outline-none focus:border-[#742709]/40 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1B1B] mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+880 1712-345678"
              className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#742709]/10 rounded-xl text-sm focus:outline-none focus:border-[#742709]/40 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1B1B] mb-2">
              Role
            </label>
            <select className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#742709]/10 rounded-xl text-sm focus:outline-none focus:border-[#742709]/40 transition-colors">
              <option>Administrator</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-8 rounded-2xl border border-[#742709]/6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-[#1C1B1B] mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#742709]" /> Notifications
        </h3>
        <div className="space-y-4">
          {[
            {
              label: "New Order Notifications",
              desc: "Receive an email when a new order is placed.",
              active: true,
            },
            {
              label: "Low Stock Alerts",
              desc: "Get notified when products are running low.",
              active: true,
            },
            {
              label: "Customer Reviews",
              desc: "Be notified when customers leave reviews.",
              active: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-[#742709]/6 last:border-0"
            >
              <div>
                <p className="font-medium text-[#1C1B1B]">{item.label}</p>
                <p className="text-xs text-[#1C1B1B]/50">{item.desc}</p>
              </div>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${item.active ? "bg-[#742709]" : "bg-[#1C1B1B]/20"}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${item.active ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#742709] text-[#FFFCF9] rounded-xl text-sm font-medium hover:bg-[#5A1E07] transition-all shadow-lg shadow-[#742709]/20">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </motion.div>
    </motion.div>
  );
}
