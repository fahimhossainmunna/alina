import { NextResponse } from "next/server";
import { STATIC_CATEGORIES } from "@/lib/categoryData";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      categories: STATIC_CATEGORIES
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to load categories from database"
    }, { status: 500 });
  }
}