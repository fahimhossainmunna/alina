"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  User,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { label: "Customers", href: "/dashboard/customers", icon: Users },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex">
      {/* ══════════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════════ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#FFFCF9] border-r border-[#742709]/8 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#742709]/8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.25em] text-[#742709] hover:opacity-80 transition-opacity"
          >
            ALINA
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100%-8rem)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? "bg-[#742709] text-[#FFFCF9] shadow-lg shadow-[#742709]/20"
                    : "text-[#1C1B1B]/70 hover:bg-[#742709]/5 hover:text-[#742709]"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                {item.label}
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#742709]/8 bg-[#FFFCF9]">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-[#1C1B1B]/70 hover:bg-[#C43B3B]/5 hover:text-[#C43B3B] transition-all duration-300">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═════════════════════════════════════════
          MAIN AREA
      ══════════════════════════════════════════ */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-[#FFFCF9]/80 backdrop-blur-md border-b border-[#742709]/8 flex items-center justify-between px-6 sticky top-0 z-40">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#742709]/5 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5 text-[#1C1B1B]" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-[#742709]/5 transition-colors group">
              <Bell className="w-5 h-5 text-[#1C1B1B]/60 group-hover:text-[#742709] transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#742709] rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#742709]/10">
              <div className="w-9 h-9 rounded-full bg-[#742709]/10 flex items-center justify-center">
                <User className="w-4 h-4 text-[#742709]" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#1C1B1B]">Admin User</p>
                <p className="text-xs text-[#1C1B1B]/50">admin@alina.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#1C1B1B]/30 backdrop-blur-[2px] z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
