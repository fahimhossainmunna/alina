import { NextResponse } from "next/server";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number; // minutes
  featured: boolean;
}

// ── 📸 MOCK DATA WITH YOUR REAL IMAGE PATHS (✅ FIXED: ক্যামেলকেস নাম এখানে লক করা হলো) ──
const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "the-art-of-organic-skincare",
    title: "The Art of Organic Skincare",
    excerpt: "Discover how ancient botanical wisdom merges with modern dermatology to create rituals that truly transform your skin.",
    content: "",
    coverImage: "/images/blog/blogOne.jpg", // ✅ ফিক্সড ইমেজ পাথ
    category: "Skincare",
    tags: ["organic", "botanical", "ritual"],
    author: { name: "Alina Reeves", avatar: "/images/team/alina.jpg", role: "Founder & Formulator" },
    publishedAt: "2025-05-12",
    readTime: 6,
    featured: true,
  },
  {
    id: 2,
    slug: "ingredients-that-heal",
    title: "Ingredients That Heal",
    excerpt: "From rosehip to bakuchiol — a deep dive into the power-packed botanicals behind our bestselling serums.",
    content: "",
    coverImage: "/images/blog/blogTwo.jpg", // ✅ ফিক্সড ইমেজ পাথ
    category: "Ingredients",
    tags: ["rosehip", "bakuchiol", "serum"],
    author: { name: "Dr. Mira Sen", avatar: "/images/team/mira.jpg", role: "Head Dermatologist" },
    publishedAt: "2025-04-28",
    readTime: 8,
    featured: false,
  },
  {
    id: 3,
    slug: "morning-ritual-guide",
    title: "The Perfect Morning Ritual",
    excerpt: "Seven mindful steps to build a skincare morning routine that energises your skin and grounds your spirit.",
    content: "",
    coverImage: "/images/blog/blogThree.jpg", // ✅ ফিক্সড ইমেজ পাথ
    category: "Rituals",
    tags: ["morning", "routine", "mindfulness"],
    author: { name: "Alina Reeves", avatar: "/images/team/alina.jpg", role: "Founder & Formulator" },
    publishedAt: "2025-04-10",
    readTime: 5,
    featured: false,
  },
  {
    id: 4,
    slug: "sustainable-beauty-future",
    title: "Sustainable Beauty: Our Future",
    excerpt: "How Alina is pioneering zero-waste packaging and carbon-neutral sourcing without compromising on luxury.",
    content: "",
    coverImage: "/images/blog/blogFour.jpg", // ✅ ফিক্সড ইমেজ পাথ
    category: "Sustainability",
    tags: ["eco", "packaging", "zero-waste"],
    author: { name: "Lena Marsh", avatar: "/images/team/lena.jpg", role: "Sustainability Director" },
    publishedAt: "2025-03-22",
    readTime: 7,
    featured: false,
  },
  {
    id: 5,
    slug: "understanding-your-skin-type",
    title: "Understanding Your Skin Type",
    excerpt: "Oily, dry, combination or sensitive? A dermatologist's guide to reading your skin and feeding it exactly what it needs.",
    content: "",
    coverImage: "/images/blog/blogFive.jpg", // ✅ ফিক্সড ইমেজ পাথ
    category: "Skincare",
    tags: ["skin-type", "tips", "dermatology"],
    author: { name: "Dr. Mira Sen", avatar: "/images/team/mira.jpg", role: "Head Dermatologist" },
    publishedAt: "2025-03-05",
    readTime: 9,
    featured: false,
  },
  {
    id: 6,
    slug: "night-recovery-secrets",
    title: "Night Recovery Secrets",
    excerpt: "Your skin repairs itself while you sleep. These evening formulations work with your body's natural rhythms.",
    content: "",
    coverImage: "/images/blog/blogSix.jpg", // ✅ ফিক্সড ইমেজ পাথ
    category: "Rituals",
    tags: ["night-cream", "recovery", "sleep"],
    author: { name: "Alina Reeves", avatar: "/images/team/alina.jpg", role: "Founder & Formulator" },
    publishedAt: "2025-02-18",
    readTime: 6,
    featured: false,
  },
];

export const CATEGORIES = ["All", "Skincare", "Ingredients", "Rituals", "Sustainability"];

// ── GET API Request Handler ──
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    let posts = [...MOCK_POSTS];

    // ফিল্টারিং লজিক
    if (category && category !== "All") {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    const start = (page - 1) * limit;
    const paginatedPosts = posts.slice(start, start + limit);

    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      page,
      totalPages: Math.ceil(posts.length / limit),
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error in Blog API Route" },
      { status: 500 }
    );
  }
}