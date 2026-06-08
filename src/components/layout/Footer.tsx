"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone, 
  Sparkles,
  CreditCard,
  Truck,
  Shield,
  Gift
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const footerLinks = {
    shop: [
      { label: "All Products", href: "/store" },
      { label: "New Arrivals", href: "/store?filter=new" },
      { label: "Best Sellers", href: "/store?filter=best" },
      { label: "Gift Sets", href: "/gift-sets" },
      { label: "Sale", href: "/sale" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/story" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Track Order", href: "/track" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  const features = [
    { icon: Truck, text: "Free Shipping" },
    { icon: Shield, text: "Secure Payment" },
    { icon: Gift, text: "Gift Wrapping" },
    { icon: CreditCard, text: "Easy Returns" },
  ];

  return (
    <footer className="relative w-full bg-[#1C1B1B] text-[#FFFCF9] overflow-hidden">
      
      {/* ──  FEATURES BAR (Compact) ─ */}
      <div className="relative border-b border-[#FFFCF9]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.text}
                className="flex items-center justify-center gap-2 group"
              >
                <feature.icon className="w-4 h-4 text-[#C9A961]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFFCF9]/80">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──  MAIN FOOTER CONTENT ─ */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="inline-block mx-auto lg:mx-0">
              <Image
                src="/images/alinaLogoo.png"
                alt="Alina"
                width={120}
                height={40}
                className="object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="font-sans text-[12px] text-[#FFFCF9]/60 leading-relaxed mb-4 max-w-sm mt-3">
              Crafting premium organic beauty products that celebrate the harmony between nature and luxury.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col items-center lg:items-start space-y-2 mb-4 w-full">
              <a href="mailto:hello@alina.com" className="flex items-center justify-center lg:justify-start gap-2 text-[11px] text-[#FFFCF9]/60 hover:text-[#C9A961] transition-colors w-full lg:w-auto">
                <Mail className="w-3.5 h-3.5 text-[#C9A961]/60 shrink-0" />
                hello@alina.com
              </a>
              <a href="tel:+1234567890" className="flex items-center justify-center lg:justify-start gap-2 text-[11px] text-[#FFFCF9]/60 hover:text-[#C9A961] transition-colors w-full lg:w-auto">
                <Phone className="w-3.5 h-3.5 text-[#C9A961]/60 shrink-0" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[11px] text-[#FFFCF9]/60 w-full lg:w-auto">
                <MapPin className="w-3.5 h-3.5 text-[#C9A961]/60 shrink-0" />
                123 Beauty Lane, New York
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-[#FFFCF9]/5 border border-[#FFFCF9]/10 flex items-center justify-center text-[#FFFCF9]/60 hover:text-[#C9A961] hover:border-[#C9A961]/30 transition-all duration-300"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

    
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-15">
            
            {/* Shop Links */}
            <div className="text-center lg:text-left">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A961] mb-3">
                Shop
              </h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-[#FFFCF9]/60 hover:text-[#FFFCF9] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="text-center lg:text-left ">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A961] mb-3">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-[#FFFCF9]/60 hover:text-[#FFFCF9] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
          
            <div className="col-span-2 lg:col-span-1 text-center lg:text-left mt-4 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/[0.03]">
              <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A961] mb-3">
                Support
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] text-[#FFFCF9]/60 hover:text-[#FFFCF9] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* ──  BOTTOM BAR (Compact) ─ */}
      <div className="relative border-t border-[#FFFCF9]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Copyright */}
            <p className="text-[10px] text-[#FFFCF9]/40 tracking-wide text-center md:text-left">
              © {new Date().getFullYear()} Alina. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[10px] text-[#FFFCF9]/40 hover:text-[#FFFCF9]/70 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center justify-center gap-1.5">
              {['visa', 'mastercard', 'amex', 'paypal'].map((method) => (
                <div
                  key={method}
                  className="w-9 h-5 bg-[#FFFCF9]/5 border border-[#FFFCF9]/10 rounded flex items-center justify-center"
                >
                  <CreditCard className="w-3 h-3 text-[#FFFCF9]/40" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;