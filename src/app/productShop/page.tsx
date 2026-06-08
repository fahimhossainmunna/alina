"use client";

import { useStoreCategories } from "@/hooks/useStoreCategories";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Tag variant per category
const CATEGORY_TAGS: Record<
  string,
  { label: string; variant: "bestseller" | "new" | "limited" }
> = {
  serums: { label: "Bestseller", variant: "bestseller" },
  oils: { label: "New", variant: "new" },
  masks: { label: "Limited", variant: "limited" },
  tonics: { label: "New", variant: "new" },
  eye: { label: "Bestseller", variant: "bestseller" },
  body: { label: "Limited", variant: "limited" },
};

const TAG_STYLES = {
  bestseller: { bg: "#742709", color: "rgba(255,255,255,.9)" },
  new: { bg: "rgba(255,255,255,.92)", color: "#742709" },
  limited: { bg: "rgba(26,20,16,.68)", color: "rgba(255,255,255,.85)" },
};

const POPULARITY: Record<string, number> = {
  serums: 65,
  oils: 40,
  masks: 80,
  tonics: 55,
  eye: 72,
  body: 30,
};

export default function ProductShopPage() {
  const router = useRouter();
  const { categories, loading } = useStoreCategories();

  return (
    <main
      className="w-full min-h-screen pb-32 mt-10"
      style={{
        backgroundColor: "#FDFAF6",
        fontFamily: "'Jost','Inter',sans-serif",
        color: "#1A1410",
      }}
    >
      {/* ═══════════════════════════════════════
          PREMIUM HERO WITH BACKGROUND IMAGE
      ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/catagoryCover.jpg"
            alt="Alina Apothecary Collections"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,20,16,0.85) 0%, rgba(116,39,9,0.65) 50%, rgba(26,20,16,0.85) 100%)",
            }}
          />
          {/* Animated Glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#742709]/20 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full backdrop-blur-md"
              style={{
                border: "0.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.08)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
              Alina Apothecary
              <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Curated Collections
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond','Georgia',serif",
              fontSize: "clamp(3.5rem,10vw,7rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#FFFCF9",
              margin: 0,
            }}
          >
            Shop By{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#C9A961",
                fontWeight: 400,
              }}
            >
              Category
            </em>
          </motion.h1>

          {/* Ornamental Divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              maxWidth: 300,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 0.5,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,169,97,0.6), transparent)",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                border: "0.5px solid rgba(201,169,97,0.6)",
                transform: "rotate(45deg)",
                flexShrink: 0,
                background: "rgba(201,169,97,0.2)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 0.5,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,169,97,0.6), transparent)",
              }}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: 13,
              fontWeight: 300,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.9,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Select a tailored beauty line to explore our specialized scientific
            formulations.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2"
            >
              <div
                className="w-1 h-2 rounded-full bg-white/60"
                style={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PREMIUM GRID SECTION
      ═══════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-20">
        {/* Grid Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "2rem",
            borderBottom: "0.5px solid rgba(116,39,9,0.15)",
            marginBottom: "4rem",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 3,
                height: 24,
                background: "#742709",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(26,20,16,0.4)",
              }}
            >
              Our Collections
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 14,
              fontWeight: 300,
              color: "rgba(26,20,16,0.4)",
              letterSpacing: "0.05em",
            }}
          >
            {loading ? "—" : `${categories.length} lines available`}
          </span>
        </div>

        {loading ? (
          /* Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 animate-pulse">
                <div
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: 24,
                    background: "rgba(116,39,9,0.08)",
                  }}
                />
                <div
                  style={{
                    height: 28,
                    width: "60%",
                    borderRadius: 6,
                    background: "rgba(116,39,9,0.08)",
                  }}
                />
                <div
                  style={{
                    height: 14,
                    width: "80%",
                    borderRadius: 4,
                    background: "rgba(116,39,9,0.05)",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Live Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {categories.map((item, index) => {
              const tag = CATEGORY_TAGS[item.slug];
              const tagStyle = tag ? TAG_STYLES[tag.variant] : null;
              const pop = POPULARITY[item.slug] ?? 50;
              const serial = String(index + 1).padStart(2, "0");
              const productCount = (item as { productCount?: number })
                .productCount;
              const shortDescription = (
                item as {
                  shortDescription?: string;
                }
              ).shortDescription;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  onClick={() => router.push(`/productShop/${item.slug}`)}
                  className="group cursor-pointer flex flex-col"
                >
                  {/* Image Frame */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "3/4",
                      borderRadius: 24,
                      background: "#EDE5DB",
                      marginBottom: "1.2rem",
                      boxShadow: "0 8px 32px rgba(116,39,9,0.08)",
                      transition: "box-shadow .6s ease, transform .6s ease",
                    }}
                  >
                    <Image
                      src={item.coverImage}
                      alt={item.name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(116,39,9,0.35) 0%, transparent 60%)",
                      }}
                    />

                    {/* Serial */}
                    <span
                      className="absolute top-5 left-5 z-20"
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 11,
                        fontWeight: 300,
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.6)",
                        background: "rgba(0,0,0,0.2)",
                        padding: "4px 10px",
                        borderRadius: 100,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {serial}
                    </span>

                    {/* Wishlist Pill */}
                    <button
                      className="absolute z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        top: 16,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(255,255,255,0.95)",
                        border: "none",
                        borderRadius: 100,
                        padding: "6px 14px",
                        cursor: "pointer",
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#742709",
                        transitionDelay: "0.05s",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="w-3 h-3" />
                      Wishlist
                    </button>

                    {/* Tag Badge */}
                    {tag && tagStyle && (
                      <span
                        className="absolute z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          top: 16,
                          right: 16,
                          padding: "5px 12px",
                          borderRadius: 100,
                          fontSize: 8.5,
                          fontWeight: 600,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          background: tagStyle.bg,
                          color: tagStyle.color,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      >
                        {tag.label}
                      </span>
                    )}

                    {/* Popularity Bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        padding: "20px 18px 16px",
                        background:
                          "linear-gradient(to top, rgba(26,20,16,0.65) 0%, transparent 100%)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 8.5,
                          fontWeight: 500,
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.65)",
                          marginBottom: 6,
                        }}
                      >
                        Popularity
                      </p>
                      <div
                        style={{
                          height: 2.5,
                          background: "rgba(255,255,255,0.25)",
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${pop}%`,
                            background: "rgba(201,169,97,0.8)",
                            borderRadius: 3,
                            transition: "width .8s ease",
                          }}
                        />
                      </div>
                    </div>

                    {/* Arrow CTA */}
                    <div
                      className="absolute z-30 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                      style={{
                        bottom: 56,
                        right: 16,
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.95)",
                        border: "0.5px solid rgba(255,255,255,0.4)",
                        color: "#742709",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                      }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "0 4px" }}>
                    {/* Meta Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 600,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "rgba(116,39,9,0.5)",
                        }}
                      >
                        Collection
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 12,
                          fontWeight: 300,
                          color: "rgba(26,20,16,0.35)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {productCount
                          ? `${productCount} products`
                          : `${serial} / ${String(categories.length).padStart(2, "0")}`}
                      </span>
                    </div>

                    {/* Name */}
                    <h3
                      className="group-hover:!text-[#742709] transition-colors duration-300"
                      style={{
                        fontFamily: "'Cormorant Garamond','Georgia',serif",
                        fontSize: "clamp(1.5rem,2.6vw,1.8rem)",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: "-0.01em",
                        color: "#1A1410",
                        margin: "0 0 10px",
                      }}
                    >
                      {item.name}
                    </h3>

                    {/* Description */}
                    {shortDescription && (
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 300,
                          letterSpacing: "0.04em",
                          lineHeight: 1.8,
                          color: "rgba(26,20,16,0.45)",
                          marginBottom: 14,
                          maxWidth: "95%",
                        }}
                      >
                        {shortDescription}
                      </p>
                    )}

                    {/* Footer Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 12,
                        borderTop: "0.5px solid rgba(116,39,9,0.1)",
                      }}
                    >
                      <span
                        className="inline-flex items-center gap-2.5 group-hover:gap-4 transition-all duration-300"
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(116,39,9,0.45)",
                        }}
                      >
                        <span
                          className="group-hover:!w-8 transition-all duration-300"
                          style={{
                            display: "inline-block",
                            width: 20,
                            height: 0.5,
                            background: "#742709",
                            opacity: 0.6,
                          }}
                        />
                        Explore
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: 12,
                          fontWeight: 300,
                          color: "rgba(26,20,16,0.25)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {serial} / {String(categories.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════
          PREMIUM FOOTER STRIP
      ═══════════════════════════════════════ */}
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-14 py-10"
        style={{
          borderTop: "0.5px solid rgba(116,39,9,0.15)",
          background: "linear-gradient(to bottom, transparent, rgba(116,39,9,0.02))",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 12.5,
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(26,20,16,0.3)",
          }}
        >
          Alina Apothecary © 2025
        </span>
        <div className="flex gap-2">
          {[0.4, 0.2, 0.1].map((op, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#742709",
                opacity: op,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}