import { NextResponse } from "next/server";
import { CATEGORY_DIRECT_PRODUCTS } from "@/lib/brandData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCategory = searchParams.get("category");

    if (!rawCategory) {
      return NextResponse.json({ success: true, products: [] }, { status: 200 });
    }

    // ── 🛠️ CASE-SENSITIVITY SAFE GUARD ──
    // ইউআরএল থেকে যদি ভুল করে 'facemask' বা 'Facemask' আসে, সেটিকে আপনার ডাটা সোর্সের 'faceMask' এর সাথে ম্যাচ করানোর মেকানিজম:
    const categoryKey = Object.keys(CATEGORY_DIRECT_PRODUCTS).find(
      (key) => key.toLowerCase() === rawCategory.toLowerCase()
    );

    // যদি ডাটা সোর্সে ওই ক্যাটাগরি না থাকে
    if (!categoryKey || !CATEGORY_DIRECT_PRODUCTS[categoryKey]) {
      return NextResponse.json({ success: true, products: [] }, { status: 200 });
    }

    // ✅ একদম পারফেক্ট ক্যাটাগরির প্রোডাক্ট লিস্ট রিটার্ন করবে
    return NextResponse.json({
      success: true,
      products: CATEGORY_DIRECT_PRODUCTS[categoryKey]
    }, { status: 200 });

  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}