import { NextResponse } from "next/server";

export async function GET() {
  const telierBooks = [
    {
      id: 1,
      title: "VELVET CITRUS",
      heading: "The Art of Essence",
      description:
        "A curated sensory journey crafted for the modern individual. Experience the harmony of fresh, radiant, and uplifting citrus notes, seamlessly blending luxury with nature.",
      coverSrc: "/images/telier/bookOne.png", // বাম পাশের মেইন কভার বই
    },
    {
      id: 2,
      title: "EARTH NOIR",
      heading: "Timeless Rituals",
      description:
        "An immersive editorial experience capturing the warm, sensual, and mystical elements of organic textures. Designed to evoke deep tranquility and timeless sophistication.",
      coverSrc: "/images/telier/bookTwo.png", // ডান পাশের মেইন কভার বই
    },
  ];

  return NextResponse.json(telierBooks);
}
