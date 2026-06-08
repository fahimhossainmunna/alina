import { NextResponse } from "next/server";

export async function GET() {
  const splitScrollData = [
    {
      id: 1,
      title: "SKIN CARE",
      subtitle: "Smooth body",
      description: "A deep dive into cellular hydration. Crafted meticulously with organic botanicals to soothe, restore balance, and sculpt a flawless velvet skin texture.",
      imageKey: "imgOne",
      rightBg: "bg-[#B9F2A1]", 
      isRightText: true,
      thumbKey: "imgOneOne"
    },
    {
      id: 2,
      title: "COSMETICS",
      subtitle: "Stay beautiful",
      description: "Where modern aesthetics meet raw definition. High-performance formulas designed to amplify your authentic contours with a weightless, radiant finish.",
      imageKey: "imgTwoTwo", 
      rightBg: "bg-[#E9E7BB]", 
      isRightText: false, 
      thumbKey: "imgTwo"
    },
    {
      id: 3,
      title: "FACE HEALTH",
      subtitle: "Close-up smiles",
      description: "Timeless ritualistic defense against environmental stress. Infused with potent antioxidants to support natural cell renewal and lock in lasting vitality.",
      imageKey: "imgThree",
      rightBg: "bg-[#D1E0D1]", 
      isRightText: true,
      thumbKey: "imgThreeThree"
    }
  ];

  return NextResponse.json(splitScrollData);
}