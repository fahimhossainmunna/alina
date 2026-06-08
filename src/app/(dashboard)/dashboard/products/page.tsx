"use client";

import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";

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

const products = [
  {
    id: 1,
    name: "Rose & Saffron Set",
    category: "Gift Sets",
    price: "$24.00",
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Dark Truffle Box",
    category: "Chocolates",
    price: "$18.50",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Premium Gift Pack",
    category: "Gift Sets",
    price: "$32.00",
    stock: 0,
    status: "Out of Stock",
  },
];

export default function ProductsPage() {
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
            Products
          </h1>
          <p className="text-sm text-[#1C1B1B]/60 mt-1">
            Manage your product catalog and inventory.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#742709] text-[#FFFCF9] rounded-xl text-sm font-medium hover:bg-[#5A1E07] transition-all shadow-lg shadow-[#742709]/20">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1B1B]/40" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#742709]/10 rounded-xl text-sm focus:outline-none focus:border-[#742709]/40 transition-colors shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#742709]/10 rounded-xl text-sm font-medium text-[#1C1B1B] hover:border-[#742709]/30 transition-all shadow-sm">
          <Filter className="w-4 h-4" /> Category
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 24px -8px rgba(116,39,9,0.12)",
            }}
            className="bg-white rounded-2xl border border-[#742709]/6 shadow-sm overflow-hidden transition-all duration-300"
          >
            {/* Image Placeholder */}
            <div className="h-48 bg-[#FAF7F2] flex items-center justify-center relative">
              <span className="text-[#742709]/20 font-bold text-xl tracking-widest uppercase">
                Alina
              </span>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg text-[#1C1B1B]/60 hover:text-[#742709] transition-all shadow-sm">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs text-[#742709] font-semibold uppercase tracking-wider">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-[#1C1B1B] mt-0.5">
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold text-[#742709]">
                  {product.price}
                </p>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                    product.status === "In Stock"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : product.status === "Low Stock"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {product.stock} in stock
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[#742709]/8 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#742709] text-[#FFFCF9] rounded-xl text-sm font-medium hover:bg-[#5A1E07] transition-all">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center justify-center p-2.5 bg-white border border-[#742709]/10 rounded-xl text-[#1C1B1B]/60 hover:text-[#C43B3B] hover:border-[#C43B3B]/20 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
