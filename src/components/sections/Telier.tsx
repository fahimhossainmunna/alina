"use client";

import { useTelier } from "@/hooks/useTelier";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Telier = () => {
  const { books, loading, error } = useTelier();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (error) {
    return (
      <div className="w-full py-12 text-center text-[13px] text-red-500 font-medium">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400&display=swap');
      `}</style>

      <section
        className="w-full py-24 px-6 sm:px-8 lg:px-12 overflow-hidden select-none relative"
        style={{ background: "#FCF6F2", fontFamily: "'Jost', sans-serif" }}
      >
        {/* ── NOISE TEXTURE OVERLAY ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          {/* ── UPPER HEADER ── */}
          <div className="text-center mb-16 max-w-3xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-3 mb-5"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.35em",
                color: "#742709",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "32px",
                  height: "0.5px",
                  background: "#742709",
                  opacity: 0.5,
                }}
              />
              Collection No. I
              <span
                style={{
                  display: "block",
                  width: "32px",
                  height: "0.5px",
                  background: "#742709",
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Main Title */}
            <h2
              className="mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(52px, 8vw, 76px)",
                fontWeight: 300,
                color: "#1C1B1B",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              <span style={{ position: "relative", display: "inline-block" }}>
                Atelier
                {/* Underline accent */}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: "-4px",
                    height: "0.5px",
                    background:
                      "linear-gradient(90deg, transparent, #742709 40%, #742709 60%, transparent)",
                  }}
                />
              </span>
            </h2>

            {/* Subtitle with ornaments */}
            <p
              className="flex items-center justify-center gap-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "17px",
                fontWeight: 300,
                color: "rgba(28,27,27,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  color: "#742709",
                  opacity: 0.5,
                  fontStyle: "normal",
                  fontSize: "13px",
                }}
              >
                ✦
              </span>
              offering pieces people love to wear
              <span
                style={{
                  color: "#742709",
                  opacity: 0.5,
                  fontStyle: "normal",
                  fontSize: "13px",
                }}
              >
                ✦
              </span>
            </p>
          </div>

          {/* ── DECORATIVE RULE ── */}
          <div className="flex items-center gap-4 mb-16 w-full max-w-xs">
            <div
              style={{
                flex: 1,
                height: "0.5px",
                background: "rgba(28,27,27,0.12)",
              }}
            />
            <div
              style={{
                width: "5px",
                height: "5px",
                background: "#742709",
                opacity: 0.4,
                transform: "rotate(45deg)",
              }}
            />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#742709",
                opacity: 0.55,
                whiteSpace: "nowrap",
              }}
            >
              Editorial Selection
            </span>
            <div
              style={{
                width: "5px",
                height: "5px",
                background: "#742709",
                opacity: 0.4,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: "0.5px",
                background: "rgba(28,27,27,0.12)",
              }}
            />
          </div>

          {/* ── BOOKS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 lg:gap-36 w-full max-w-4xl justify-center items-start">
            {loading
              ? [...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-[440px] animate-pulse rounded-2xl mx-auto"
                    style={{ background: "#FAF7F2" }}
                  />
                ))
              : books.map((book, index) => {
                  const isCurrentHovered = hoveredIndex === index;

                  return (
                    <div
                      key={book.id}
                      className="w-full flex flex-col items-center"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* 3D Perspective Container */}
                      <div
                        className="relative w-[240px] sm:w-[280px] h-[320px] sm:h-[370px] group"
                        style={{ perspective: "2000px" }}
                      >
                        {/* ── INSIDE CONTENT (back page) ── */}
                        <div
                          className="absolute inset-0 w-full h-full rounded-r-[24px] p-8 flex flex-col justify-between items-start z-0"
                          style={{
                            background: "#FDFBF9",
                            border: "0.5px solid rgba(116,39,9,0.10)",
                            boxShadow: "inset 0 4px 20px rgba(0,0,0,0.02)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "9px",
                              fontWeight: 300,
                              letterSpacing: "0.25em",
                              color: "rgba(116,39,9,0.5)",
                              textTransform: "uppercase",
                            }}
                          >
                            Alina Editorial / {book.title.split(" ")[0]}
                          </span>

                          <div
                            style={{ margin: "auto 0", paddingRight: "8px" }}
                          >
                            <h4
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "20px",
                                fontWeight: 400,
                                color: "#1C1B1B",
                                letterSpacing: "0.05em",
                                marginBottom: "12px",
                              }}
                            >
                              {book.heading}
                            </h4>
                            <p
                              style={{
                                fontFamily: "'Jost', sans-serif",
                                fontSize: "12px",
                                fontWeight: 200,
                                color: "rgba(28,27,27,0.55)",
                                lineHeight: 1.7,
                                letterSpacing: "0.02em",
                              }}
                            >
                              {book.description}
                            </p>
                          </div>

                          <span
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "9px",
                              fontWeight: 300,
                              letterSpacing: "0.3em",
                              color: "rgba(28,27,27,0.45)",
                              textTransform: "uppercase",
                              borderBottom: "0.5px solid rgba(28,27,27,0.12)",
                              paddingBottom: "3px",
                            }}
                          >
                            Discover More
                          </span>
                        </div>

                        {/* ── FRONT BOOK COVER ── */}
                        <motion.div
                          animate={{
                            rotateY: isCurrentHovered ? -100 : 0,
                            z: isCurrentHovered ? 20 : 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 65,
                            damping: 15,
                            mass: 0.9,
                          }}
                          className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none"
                          style={{
                            transformOrigin: "left center",
                            transformStyle: "preserve-3d",
                            borderRadius: "2px 24px 24px 2px",
                            boxShadow: isCurrentHovered
                              ? "20px 25px 50px rgba(116,39,9,0.15)"
                              : "4px 12px 40px rgba(0,0,0,0.08)",
                            border: "0.5px solid rgba(116,39,9,0.10)",
                            background: "#fff",
                            transition: "box-shadow 0.5s ease",
                          }}
                        >
                          {/* Cover Image */}
                          <Image
                            src={book.coverSrc}
                            alt={`${book.title} Cover`}
                            fill
                            sizes="280px"
                            className="object-cover"
                            priority
                          />

                          {/* Gradient overlay */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(28,27,27,0.68) 0%, rgba(28,27,27,0.12) 45%, transparent 70%)",
                            }}
                          />

                          {/* Badge */}
                          <div
                            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-75"
                            style={{
                              background: "rgba(255,255,255,0.10)",
                              backdropFilter: "blur(8px)",
                              border: "0.5px solid rgba(255,255,255,0.2)",
                            }}
                          >
                            <Bookmark
                              className="w-3.5 h-3.5"
                              style={{ color: "rgba(255,255,255,0.85)" }}
                            />
                          </div>

                          {/* Cover label */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                            <h3
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "18px",
                                fontWeight: 400,
                                color: "#fff",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                marginBottom: "4px",
                              }}
                            >
                              {book.title}
                            </h3>
                            <p
                              style={{
                                fontFamily: "'Jost', sans-serif",
                                fontSize: "9px",
                                fontWeight: 200,
                                color: "rgba(255,255,255,0.65)",
                                letterSpacing: "0.28em",
                                textTransform: "uppercase",
                              }}
                            >
                              fresh · radiant · uplifting
                            </p>
                          </div>

                          {/* Spine groove */}
                          <div
                            className="absolute left-0 top-0 bottom-0 z-20"
                            style={{
                              width: "14px",
                              background:
                                "linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0.04) 60%, transparent)",
                            }}
                          />
                          <div
                            className="absolute top-0 bottom-0 z-20"
                            style={{
                              left: "14px",
                              width: "1px",
                              background: "rgba(255,255,255,0.18)",
                            }}
                          />
                          <div
                            className="absolute top-0 bottom-0 z-20"
                            style={{
                              left: "15px",
                              width: "1px",
                              background: "rgba(0,0,0,0.10)",
                            }}
                          />
                        </motion.div>

                        {/* Floor shadow */}
                        <div
                          className={`absolute -bottom-8 left-4 right-4 h-4 rounded-full blur-xl transition-all duration-500 ${
                            isCurrentHovered ? "opacity-40" : "opacity-15"
                          }`}
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(116,39,9,0.12), rgba(0,0,0,0.15))",
                          }}
                        />
                      </div>

                      {/* ── BOOK CAPTION ── */}
                      <div
                        className="mt-10 text-center w-[240px] sm:w-[280px]"
                        style={{
                          borderTop: "0.5px solid rgba(28,27,27,0.10)",
                          paddingTop: "20px",
                        }}
                      >
                        {/* Volume mark */}
                        <span
                          style={{
                            display: "block",
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "8.5px",
                            fontWeight: 300,
                            letterSpacing: "0.32em",
                            textTransform: "uppercase",
                            color: "#742709",
                            opacity: 0.6,
                            marginBottom: "8px",
                          }}
                        >
                          Alina Editorial / {book.title}
                        </span>

                       

                        
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* ── LOWER DIVIDER ── */}
          <div className="w-full max-w-xl flex items-center justify-center gap-5 mt-24">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(18px, 3vw, 26px)",
                color: "#1C1B1B",
                whiteSpace: "nowrap",
              }}
            >
              best style for
            </span>
            <div
              style={{
                flex: 1,
                height: "0.5px",
                background: "rgba(28,27,27,0.18)",
                minWidth: "40px",
              }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(18px, 3vw, 26px)",
                color: "#1C1B1B",
                whiteSpace: "nowrap",
              }}
            >
              and live with.
            </span>
          </div>

          {/* ── WATERMARK SIGNATURE ── */}
          <div className="flex items-center gap-2.5 mt-8">
            <div
              style={{
                width: "4px",
                height: "4px",
                background: "#742709",
                borderRadius: "50%",
                opacity: 0.8,
              }}
            />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "8.5px",
                fontWeight: 500,
                letterSpacing: "0.65em",
                textTransform: "uppercase",
                color: "rgba(28,27,27,0.28)",
                 opacity: 1.8,
              }}
            >
              Alina · Maison Éditoriale · Est. MMXXIII
            </span>
            <div
              style={{
                width: "4px",
                height: "4px",
                background: "#742709",
                borderRadius: "50%",
                opacity: 0.3,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Telier;
