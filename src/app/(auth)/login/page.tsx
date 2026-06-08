"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add authentication logic
    setTimeout(() => setIsLoading(false), 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="min-h-screen bg-[#FFFCF9] flex items-center justify-center px-4 pb-4 pt-5 mt-25 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Premium Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#742709]/5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#742709]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#742709]">
              Premium Access
            </span>
          </div>

          <h2 className="text-3xl font-bold text-[#1C1B1B] tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-[13px] text-[#1C1B1B]/60 leading-relaxed">
            Sign in to access your exclusive perks and continue your sweet
            journey.
          </p>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={itemVariants} className="space-y-3 mb-7">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-[#742709]/15 rounded-xl text-[13px] font-medium text-[#1C1B1B] hover:bg-[#742709]/5 hover:border-[#742709]/30 transition-all duration-300 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="relative mb-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#742709]/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
            <span className="bg-[#FFFCF9] px-4 text-[#1C1B1B]/40">
              Or sign in with email
            </span>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email Field */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.2 }}
          >
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#1C1B1B]/50 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1C1B1B]/30 transition-colors duration-300 group-focus-within:text-[#742709]" />
              <motion.input
                whileFocus={{ scale: 1.005 }}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#742709]/15 rounded-xl text-[13px] text-[#1C1B1B] placeholder:text-[#1C1B1B]/30 outline-none focus:border-[#742709] focus:ring-4 focus:ring-[#742709]/5 transition-all duration-300"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#1C1B1B]/50">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-medium text-[#742709] hover:text-[#5A1E07] uppercase tracking-wider transition-colors duration-300"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1C1B1B]/30 transition-colors duration-300 group-focus-within:text-[#742709]" />
              <motion.input
                whileFocus={{ scale: 1.005 }}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3.5 bg-white border border-[#742709]/15 rounded-xl text-[13px] text-[#1C1B1B] placeholder:text-[#1C1B1B]/30 outline-none focus:border-[#742709] focus:ring-4 focus:ring-[#742709]/5 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1C1B1B]/30 hover:text-[#742709] transition-colors duration-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showPassword ? (
                    <motion.span
                      key="hide"
                      initial={{ opacity: 0, rotate: -15 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 15 }}
                      transition={{ duration: 0.15 }}
                    >
                      <EyeOff className="w-4.5 h-4.5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="show"
                      initial={{ opacity: 0, rotate: 15 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -15 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>

          {/* Remember Me */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-1"
          >
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="peer w-4 h-4 appearance-none rounded border border-[#742709]/20 bg-white checked:bg-[#742709] checked:border-[#742709] transition-all duration-300 cursor-pointer"
                />
                <svg
                  className="absolute left-1 top-1 w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-[12px] text-[#1C1B1B]/60 group-hover:text-[#1C1B1B] transition-colors">
                Remember me
              </span>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.015,
              boxShadow: "0 20px 40px -10px rgba(116, 39, 9, 0.3)",
            }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#742709] text-[#FFFCF9] py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.22em] hover:bg-[#5A1E07] transition-all duration-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 group relative overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-4.5 h-4.5 border-2 border-[#FFFCF9]/30 border-t-[#FFFCF9] rounded-full animate-spin"
                />
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2.5"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Sign Up Link */}
        <motion.div
          variants={itemVariants}
          className="mt-10 pt-7 border-t border-[#742709]/10 text-center"
        >
          <p className="text-[12px] text-[#1C1B1B]/50">
            New to Alina?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#742709] hover:text-[#5A1E07] inline-flex items-center gap-1 transition-colors duration-300 group"
            >
              Create Account
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-6 text-[#1C1B1B]/30"
        >
          <div className="flex items-center gap-1.5 text-[10px]">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            Secure
          </div>
          <div className="w-px h-3 bg-[#1C1B1B]/15"></div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
            Encrypted
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
