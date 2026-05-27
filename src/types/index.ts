// ১. নেভিগেশন বা ন্যাববারের জন্য টাইপ
export interface NavLink {
  label: string;
  href: string;
}

// ২. প্রোডাক্ট বা কসমেটিকস আইটেমের জন্য কমপ্লিট টাইপ
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number; // যদি কোনো অফার বা ডিসকাউন্ট থাকে
  images: string[];       // প্রোডাক্টের একাধিক ছবি থাকতে পারে
  category: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  ingredients?: string[]; // কসমেটিকস সাইটের জন্য গুরুত্বপূর্ণ (যেমন: 100% Organic)
  isFeatured?: boolean;
  createdAt: string;
}

// ৩. রিডাক্স কার্ট (Cart) আইটেমের জন্য টাইপ
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string; // কসমেটিকস বা লিপস্টিকের শেড/কালার থাকলে
  selectedSize?: string;  // ভলিউম বা সাইজ (যেমন: 335ml, 50ml)
}

// ৪. ইউজার বা অথেনটিকেশনের জন্য টাইপ
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  token?: string; // JWT Token এর জন্য
}

// ৫. এপিআই রেসপন্সের গ্লোবাল স্ট্রাকচার টাইপ
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}