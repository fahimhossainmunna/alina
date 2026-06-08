// ─────────────────────────────────────────────
// app/blog/page.tsx
// Blog listing page — premium editorial design
// ─────────────────────────────────────────────

"use client";

import { useBlog } from "@/hooks/useBlog";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { BlogPost } from "../api/blog/route"; 

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function BlogPage() {
  const {
    posts,
    featuredPost,
    total,
    totalPages,
    currentPage,
    activeCategory,
    categories,
    loading,
    featuredLoading,
    error,
    setCategory,
    setPage,
    refresh,
  } = useBlog();

  return (
    <main className="w-full min-h-screen" style={{ background: "#FFFCF9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

        .blog-display { font-family: 'Playfair Display', Georgia, serif; }
        .blog-sans    { font-family: 'DM Sans', sans-serif; }

        .cat-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .card-hover-line::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #742709;
          transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .card-hover-line:hover::after { width: 100%; }

        .post-card:hover .post-img { transform: scale(1.04); }
        .post-img { transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1); }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .loading-dot { animation: blink 1.2s ease infinite; }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }

        .vertical-rl {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>

      {/* ── HEADER ── */}
      <BlogHeader />

      {/* ── FEATURED HERO POST ── */}
      {featuredLoading ? (
        <FeaturedSkeleton />
      ) : featuredPost ? (
        <FeaturedPost post={featuredPost} />
      ) : null}

      {/* ── CATEGORY FILTER + LIST ── */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
        {/* Category filter bar */}
        <CategoryBar
          categories={categories}
          active={activeCategory}
          total={total}
          onSelect={setCategory}
        />

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="blog-sans text-[13px] text-[#742709]/70">{error}</p>
            <button
              onClick={refresh}
              className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase blog-sans text-[#742709] border border-[#742709]/30 px-6 py-2.5 hover:bg-[#742709] hover:text-[#FFFCF9] transition-all duration-300"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* Post grid */}
        {!error && (
          <AnimatePresence mode="wait">
            {loading ? (
              <PostGridSkeleton key="skeleton" />
            ) : posts.length === 0 ? (
              <EmptyState key="empty" category={activeCategory} />
            ) : (
              <PostGrid
                key={`${activeCategory}-${currentPage}`}
                posts={posts}
              />
            )}
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            onPage={setPage}
          />
        )}
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════
   BLOG HEADER
═══════════════════════════════════════════ */
function BlogHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <header
      ref={ref}
      className="w-full border-b border-[#742709]/10 pt-40 pb-0 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-6 h-[1.5px] bg-[#742709]/40" />
              <span className="blog-sans text-[9px] tracking-[0.4em] uppercase text-[#742709]/60 font-medium">
                Alina Journal
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="blog-display font-black text-[#1C1B1B] leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
              >
                Stories &
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="blog-display font-black italic text-[#742709] leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.22,
                }}
              >
                Rituals
              </motion.h1>
            </div>
          </div>

          {/* Right descriptor */}
          <motion.p
            className="blog-sans text-[13px] leading-[1.9] text-[#1C1B1B]/50 font-light max-w-sm lg:text-right"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Insights on organic formulation, skincare science, and the botanical
            philosophies that guide every drop we create.
          </motion.p>
        </div>

        {/* Bottom ruled line with issue number */}
        <div className="flex items-center gap-6">
          <div className="flex-1 h-[1px] bg-[#742709]/10" />
          <span className="blog-sans text-[8px] tracking-[0.3em] uppercase text-[#742709]/25">
            Vol. I
          </span>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   FEATURED POST
═══════════════════════════════════════════ */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.section
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#742709]/8 overflow-hidden">
          {/* Image — 7 cols */}
          <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover post-img"
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, #FFFCF9)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(28,27,27,0.5) 0%, transparent 40%)",
              }}
            />
            {/* Featured badge */}
            <div className="absolute top-6 left-6 bg-[#742709] text-[#FFFCF9] px-3 py-1">
              <span className="blog-sans text-[8px] tracking-[0.35em] uppercase font-medium">
                Featured
              </span>
            </div>
          </div>

          {/* Content — 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-[#742709]/8">
            <div>
              {/* Category + read time */}
              <div className="flex items-center gap-3 mb-7">
                <span className="blog-sans text-[9px] tracking-[0.32em] uppercase text-[#742709] font-medium">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#742709]/25 inline-block" />
                <span className="blog-sans text-[9px] tracking-[0.2em] text-[#1C1B1B]/40 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {post.readTime} min read
                </span>
              </div>

              {/* Title */}
              <h2
                className="blog-display font-bold text-[#1C1B1B] leading-[1.12] mb-5 tracking-tight group-hover:text-[#742709] transition-colors duration-400"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="blog-sans text-[13px] text-[#1C1B1B]/55 leading-[1.85] font-light mb-8">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="blog-sans text-[8px] tracking-[0.25em] uppercase text-[#742709]/60 border border-[#742709]/15 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between border-t border-[#742709]/8 pt-7">
              <div>
                <p className="blog-sans text-[11px] font-medium text-[#1C1B1B] tracking-wide">
                  {post.author.name}
                </p>
                <p className="blog-sans text-[10px] text-[#1C1B1B]/35 tracking-wide mt-0.5">
                  {post.author.role}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#742709] group-hover:gap-3 transition-all duration-300">
                <span className="blog-sans text-[9px] tracking-[0.3em] uppercase font-medium">
                  Read More
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   CATEGORY BAR
═══════════════════════════════════════════ */
function CategoryBar({
  categories,
  active,
  total,
  onSelect,
}: {
  categories: string[];
  active: string;
  total: number;
  onSelect: (c: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-10 border-b border-[#742709]/8 mb-12">
      {/* Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`cat-pill px-4 py-2 border transition-all duration-300 ${
                isActive
                  ? "bg-[#742709] text-[#FFFCF9] border-[#742709]"
                  : "text-[#1C1B1B]/50 border-[#742709]/15 hover:border-[#742709]/40 hover:text-[#742709]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Post count */}
      <span className="blog-sans text-[10px] tracking-[0.25em] uppercase text-[#1C1B1B]/30 shrink-0">
        {total} {total === 1 ? "article" : "articles"}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   POST GRID
═══════════════════════════════════════════ */
function PostGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   POST CARD
═══════════════════════════════════════════ */
function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="post-card group flex flex-col"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#FCF6F2]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover post-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category chip on image */}
          <div className="absolute top-4 left-4 bg-[#FFFCF9]/90 backdrop-blur-sm px-3 py-1 border border-[#742709]/10">
            <span className="blog-sans text-[8px] tracking-[0.3em] uppercase text-[#742709] font-medium">
              {post.category}
            </span>
          </div>
          {/* Arrow on hover */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-[#742709] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFFCF9]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <time className="blog-sans text-[9px] tracking-[0.2em] text-[#1C1B1B]/35">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <span className="w-[1px] h-3 bg-[#742709]/15" />
            <span className="blog-sans text-[9px] tracking-[0.2em] text-[#1C1B1B]/35 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {post.readTime}m
            </span>
          </div>

          {/* Title */}
          <h3
            className="blog-display font-bold text-[#1C1B1B] leading-[1.2] mb-3 tracking-tight group-hover:text-[#742709] transition-colors duration-400 card-hover-line relative"
            style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)" }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="blog-sans text-[12px] text-[#1C1B1B]/50 leading-[1.8] font-light flex-1 mb-5">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#742709]/8">
            <div className="w-7 h-7 rounded-full bg-[#742709]/10 overflow-hidden relative shrink-0">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="blog-sans text-[8px] text-[#742709] font-bold">
                    {post.author.name[0]}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="blog-sans text-[10px] font-medium text-[#1C1B1B]">
                {post.author.name}
              </p>
              <p className="blog-sans text-[9px] text-[#1C1B1B]/35">
                {post.author.role}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════
   PAGINATION
═══════════════════════════════════════════ */
function Pagination({
  current,
  total,
  onPage,
}: {
  current: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-16 pt-12 border-t border-[#742709]/8">
      {/* Prev */}
      <button
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
        className="w-10 h-10 flex items-center justify-center border border-[#742709]/15 text-[#742709]/50 hover:border-[#742709] hover:text-[#742709] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-10 h-10 blog-sans text-[11px] tracking-[0.1em] border transition-all duration-300 ${
            p === current
              ? "bg-[#742709] text-[#FFFCF9] border-[#742709]"
              : "border-[#742709]/15 text-[#1C1B1B]/50 hover:border-[#742709]/40 hover:text-[#742709]"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPage(current + 1)}
        disabled={current === total}
        className="w-10 h-10 flex items-center justify-center border border-[#742709]/15 text-[#742709]/50 hover:border-[#742709] hover:text-[#742709] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SKELETONS
═══════════════════════════════════════════ */
function FeaturedSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#742709]/8 overflow-hidden animate-pulse">
        <div className="lg:col-span-7 aspect-[16/9] lg:min-h-[520px] bg-[#742709]/5" />
        <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col gap-5 border-l border-[#742709]/8">
          <div className="h-2.5 w-24 rounded bg-[#742709]/8" />
          <div className="h-8 w-4/5 rounded bg-[#742709]/6" />
          <div className="h-8 w-3/5 rounded bg-[#742709]/6" />
          <div className="space-y-2 mt-2">
            <div className="h-2.5 w-full rounded bg-[#742709]/5" />
            <div className="h-2.5 w-full rounded bg-[#742709]/5" />
            <div className="h-2.5 w-4/5 rounded bg-[#742709]/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PostGridSkeleton() {
  return (
    <motion.div
      key="skeleton"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col gap-4 animate-pulse">
          <div className="aspect-[4/3] bg-[#742709]/5 rounded-sm" />
          <div className="h-2 w-1/3 bg-[#742709]/8 rounded" />
          <div className="h-5 w-4/5 bg-[#742709]/6 rounded" />
          <div className="h-5 w-3/5 bg-[#742709]/6 rounded" />
          <div className="space-y-1.5 mt-1">
            <div className="h-2 w-full bg-[#742709]/5 rounded" />
            <div className="h-2 w-full bg-[#742709]/5 rounded" />
            <div className="h-2 w-2/3 bg-[#742709]/5 rounded" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════════ */
function EmptyState({ category }: { category: string }) {
  return (
    <motion.div
      key="empty"
      className="flex flex-col items-center justify-center py-28 gap-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-14 h-14 rounded-full border border-[#742709]/15 flex items-center justify-center mb-2">
        <span className="blog-display italic text-[#742709]/30 text-xl">∅</span>
      </div>
      <p className="blog-display italic text-[#1C1B1B]/40 text-xl">
        No articles in "{category}"
      </p>
      <p className="blog-sans text-[12px] text-[#1C1B1B]/30 font-light">
        More stories coming soon.
      </p>
    </motion.div>
  );
}
