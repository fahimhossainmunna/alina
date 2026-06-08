"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award, Heart, Leaf, Sparkles, Users, Clock } from "lucide-react";

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Award, value: "100%", label: "Organic Products" },
    { icon: Heart, value: "4.9", label: "Customer Rating" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Pure organic ingredients sourced from sustainable farms",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Luxury formulations crafted by expert aestheticians",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in natural beauty products",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#FFFCF9] via-[#FCF6F2] to-[#FFFCF9] py-28 sm:py-36 lg:py-44 px-6 sm:px-8 lg:px-12 overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#742709]/[0.02] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C9A961]/[0.02] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ──  TWO COLUMN LAYOUT ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ──  LEFT SIDE - Content ─ */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#742709]/5 border border-[#742709]/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#742709]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#742709]">
                About Alina
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1B1B] tracking-tight leading-[1.1] mb-6">
              Crafting <span className="font-normal text-[#742709]">Beauty</span> With Nature
            </h2>

            {/* Subtitle */}
            <p className="font-serif text-lg sm:text-xl text-[#742709] font-light italic mb-8">
              Where luxury meets purity
            </p>

            {/* Description */}
            <div className="space-y-5 mb-10">
              <p className="font-sans text-[14px] sm:text-[15px] text-[#1C1B1B]/70 leading-relaxed">
                At Alina, we believe that true beauty comes from nature's finest ingredients. 
                Founded with a passion for organic skincare, we've dedicated ourselves to 
                creating luxurious products that nurture both your skin and the environment.
              </p>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#1C1B1B]/70 leading-relaxed">
                Each formulation is carefully crafted using sustainably sourced botanicals, 
                ensuring that every product delivers exceptional results while maintaining 
                our commitment to environmental responsibility.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="flex flex-col items-start"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#742709]/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-[#742709]" />
                  </div>
                  <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-[#1C1B1B] mb-2">
                    {feature.title}
                  </h4>
                  <p className="font-sans text-[12px] text-[#1C1B1B]/60 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#742709]/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-[#742709] mr-2" />
                    <span className="text-2xl sm:text-3xl font-bold text-[#742709]">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.15em] text-[#1C1B1B]/50">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ──  RIGHT SIDE - Image ─ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
              {/* Decorative frame */}
              <div className="absolute -inset-4 sm:-inset-6 border-2 border-[#742709]/10 rounded-3xl" />
              
              {/* Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-[#742709]/10">
                <Image
                  src="/images/aboutPic.jpg"
                  alt="About Alina - Premium Organic Beauty"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#742709]/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#742709]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#742709] mb-1">
                        Est. 2020
                      </p>
                      <p className="text-[13px] text-[#1C1B1B]/70">
                        Trusted by thousands worldwide
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-[#C9A961]/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1 
                }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#742709]/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;