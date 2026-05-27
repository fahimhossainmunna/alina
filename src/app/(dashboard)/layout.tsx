import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const sidebarLinks = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'My Orders', href: '/dashboard/orders' },
    { label: 'Profile Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF9] flex flex-col md:flex-row">
      
      {/* ১. ড্যাশবোর্ড সাইডবার (বামপাশে) */}
      <aside className="w-full md:w-64 bg-white border-r border-[#742709]/5 p-6 flex flex-col justify-between">
        <div>
          {/* ব্র্যান্ড লোগো বা টেক্সট */}
          <div className="mb-8 px-2">
            <Link href="/" className="font-serif text-xl text-brand-primary tracking-widest uppercase font-bold">
              Alina
            </Link>
            <p className="text-[10px] font-sans tracking-wider text-gray-400 uppercase mt-0.5">Customer Portal</p>
          </div>

          {/* সাইডবার মেনু লিঙ্কসমূহ */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-3 rounded-lg text-xs font-semibold tracking-wider font-sans text-[#1C1B1B] hover:bg-brand-primary/5 hover:text-brand-primary transition-all duration-200 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* বটম অ্যাকশন (যেমন: লগআউট বা হোমপেজে ফিরে যাওয়া) */}
        <div className="pt-6 border-t border-gray-100 mt-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-500 hover:text-brand-primary transition-colors font-sans uppercase tracking-wider"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* ২. মেইন কন্টেন্ট এরিয়া (ডানপাশে) */}
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}