import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#FFFCF9]">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-primary tracking-wide">Welcome back, Beautiful!</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">Manage your premium orders and profile settings here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(116,39,9,0.02)] border border-[#742709]/5">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-400">Total Orders</p>
          <h3 className="font-serif text-2xl text-brand-primary mt-2">02</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(116,39,9,0.02)] border border-[#742709]/5">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-400">Wishlist Items</p>
          <h3 className="font-serif text-2xl text-brand-primary mt-2">05</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(116,39,9,0.02)] border border-[#742709]/5">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-400">Alina Rewards Points</p>
          <h3 className="font-serif text-2xl text-brand-primary mt-2">120 XP</h3>
        </div>
      </div>
    </div>
  );
}