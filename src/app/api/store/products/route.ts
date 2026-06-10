import { NextResponse } from "next/server";
import { CATEGORY_DIRECT_PRODUCTS } from "@/lib/brandData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCategory = searchParams.get("category");
    const rawBrand = searchParams.get("brand");
    const productId = searchParams.get("productId"); // 🎯 নতুন প্যারামিটার একক প্রোডাক্ট আইডি খোঁজার জন্য

    // ── 🎯 স্পেসিফিক একটি প্রোডাক্টের ডিটেইলস ডাটা লাগলে ──
    if (productId) {
      const targetId = parseInt(productId);
      
      // সব ক্যাটাগরির ভেতর লুপ চালিয়ে ওই আইডি ওয়ালা সিঙ্গেল প্রোডাক্টটা খুঁজে বের করবে
      for (const cat in CATEGORY_DIRECT_PRODUCTS) {
        const items = CATEGORY_DIRECT_PRODUCTS[cat];
        for (const item of items) {
          // যদি মেইন কার্ডেরই আইডি মিলে যায়
          if (item.id === targetId) {
            return NextResponse.json({ success: true, product: item }, { status: 200 });
          }
          // যদি সাব-প্রোডাক্টের ভেতরের আইডি মিলে যায়
          if (item.subProducts) {
            const subProduct = item.subProducts.find((p) => p.id === targetId);
            if (subProduct) {
              return NextResponse.json({ success: true, product: subProduct }, { status: 200 });
            }
          }
        }
      }
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    if (!rawCategory) {
      return NextResponse.json({ success: true, products: [] }, { status: 200 });
    }

    const categoryKey = Object.keys(CATEGORY_DIRECT_PRODUCTS).find(
      (key) => key.toLowerCase() === rawCategory.toLowerCase()
    );

    if (!categoryKey || !CATEGORY_DIRECT_PRODUCTS[categoryKey]) {
      return NextResponse.json({ success: true, products: [] }, { status: 200 });
    }

    const categoryData = CATEGORY_DIRECT_PRODUCTS[categoryKey];
    const subProductCategories = ["facewash", "lipstik", "moisturizers", "serum"];

    if (subProductCategories.includes(categoryKey) && rawBrand) {
      const targetBrand = categoryData.find(
        (brandOption) => brandOption.slug?.toLowerCase() === rawBrand.toLowerCase()
      );

      return NextResponse.json({
        success: true,
        products: targetBrand && targetBrand.subProducts ? targetBrand.subProducts : []
      }, { status: 200 });
    }

    return NextResponse.json({ success: true, products: categoryData }, { status: 200 });

  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}