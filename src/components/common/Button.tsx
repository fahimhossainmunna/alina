import React from 'react';

// বাটনের কাস্টমাইজেশনের জন্য প্রপস টাইপ ডিফাইন করা
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  
  // বেস স্টাইল (সব বাটনের জন্য কমন)
  // image_25937d.jpg এর মতো কাস্টমাইজড কোণা দিতে rounded-[12px] বা rounded-xl ব্যবহার করা হয়েছে
  const baseStyles = 'font-sans font-medium uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  // ভ্যারিয়েন্ট অনুযায়ী স্টাইল (যা আমরা globals.css এর কালার দিয়ে ম্যাচ করেছি)
  const variants = {
    // image_25937d.jpg এর "Buy Now" বাটনের ডিজাইন (ডিপ ব্রাউন ব্যাকগ্রাউন্ড, হালকা শ্যাডো)
    primary: 'bg-brand-primary text-[#FFFCF9] shadow-[0_10px_20px_rgba(116,39,9,0.15)] hover:shadow-[0_12px_24px_rgba(116,39,9,0.25)] hover:opacity-95',
    
    // image_25937d.jpg এর "Discover" বাটনের ডিজাইন (হোয়াইট ব্যাকগ্রাউন্ড, ব্রাউন টেক্সট, সফট শ্যাডো)
    outline: 'bg-white text-brand-primary shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:bg-[#FFFCF9]/50 border border-transparent',
    
    // শুধু নরমাল টেক্সট বাটন
    text: 'bg-transparent text-brand-primary hover:underline px-0 py-0',
  };

  // সাইজ অনুযায়ী প্যাডিং এবং ফন্ট সাইজ
  const sizes = {
    sm: 'text-xs px-4 py-2 rounded-lg',
    md: 'text-sm px-8 py-3.5 rounded-[12px]', // image_25937d.jpg এর পারফেক্ট সাইজ
    lg: 'text-base px-10 py-4 rounded-[14px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};