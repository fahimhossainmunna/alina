import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#FFFCF9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* একটি সেন্ট্রাল কন্টেইনার যা লগইন ও রেজিস্টার ফর্মকে সুন্দর লুক দেবে */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_4px_30px_rgba(116,39,9,0.02)] border border-[#742709]/5 sm:rounded-xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}