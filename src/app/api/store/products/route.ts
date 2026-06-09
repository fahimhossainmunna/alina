import { NextResponse } from "next/server";
import { CATEGORY_DIRECT_PRODUCTS } from "@/lib/brandData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCategory = searchParams.get("category");
    const rawBrand = searchParams.get("brand"); // সাব-ব্র্যান্ড (যেমন: mac, maybe, nars, ysl)

    if (!rawCategory) {
      return NextResponse.json({ success: true, products: [] }, { status: 200 });
    }

    // ক্যাটাগরি কেস-সেন্সিটিভিটি চেক
    const categoryKey = Object.keys(CATEGORY_DIRECT_PRODUCTS).find(
      (key) => key.toLowerCase() === rawCategory.toLowerCase()
    );

    if (!categoryKey || !CATEGORY_DIRECT_PRODUCTS[categoryKey]) {
      return NextResponse.json({ success: true, products: [] }, { status: 200 });
    }

    const categoryData = CATEGORY_DIRECT_PRODUCTS[categoryKey];

    // 🎯 মূল ফিক্স: যদি ইউজার ফেসওয়াশ বা লিপস্টিকের কোনো সুনির্দিষ্ট ব্র্যান্ডে ক্লিক করে
    if ((categoryKey === "facewash" || categoryKey === "lipstik") && rawBrand) {
      const targetBrand = categoryData.find(
        (brandOption) => brandOption.slug?.toLowerCase() === rawBrand.toLowerCase()
      );

      // শুধু ওই স্পেসিফিক ব্র্যান্ডের ভেতরের ৪টি প্রোডাক্ট রিটার্ন করবে
      return NextResponse.json({
        success: true,
        products: targetBrand && targetBrand.subProducts ? targetBrand.subProducts : []
      }, { status: 200 });
    }

    // ডিফল্ট অবস্থায় মেইন ব্র্যান্ড কভার কার্ডগুলো পাঠাবে
    return NextResponse.json({
      success: true,
      products: categoryData
    }, { status: 200 });

  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}