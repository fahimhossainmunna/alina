import { NextResponse } from "next/server";

export async function GET() {
  try {
    const aboutData = {
      heading: "Crafting Beauty With Nature",
      subtitle: "Where luxury meets purity",
      description: "At Alina, we believe that true beauty comes from nature's finest ingredients. Founded with a passion for organic skincare and premium beauty, we've dedicated ourselves to creating luxurious products that nurture your skin, elevate your daily rituals, and protect the environment.",
      stats: [
        { value: "50K+", label: "Happy Clients", icon: "users" },
        { value: "100%", label: "Organic Purity", icon: "leaf" },
        { value: "4.9★", label: "Customer Rating", icon: "star" },
        { value: "24/7", label: "Atelier Support", icon: "clock" }
      ],
      features: [
        { 
          title: "Natural Ingredients", 
          description: "100% certified organic components and pure botanical extras sourced from sustainable farms.", 
          icon: "sparkles" 
        },
        { 
          title: "Expert Formulation", 
          description: "Meticulously balanced mixtures engineered by top dermatologists for ultimate skin health.", 
          icon: "award" 
        },
        { 
          title: "Cruelty Free", 
          description: "Our products are ethically produced, dermatologically tested, and never harmed on animals.", 
          icon: "heart" 
        },
        { 
          title: "Bespoke Rituals", 
          description: "Tailored luxury beauty essentials designed to enhance and fit your modern lifestyle.", 
          icon: "leaf" 
        }
      ],
      // ✅ FIXED: আপনার দেওয়া ৪টি রিয়েল ইমেজ এবং থিম অনুযায়ী লাক্সারি ক্যাপশন ম্যাপিং
      images: [
        { 
          src: "/images/about/aboutOne.jpg", 
          alt: "Alina Luxury Palette", 
          caption: "Minimalist Design & Premium Aesthetic" 
        },
        { 
          src: "/images/about/aboutTwo.jpg", 
          alt: "Pure Botanical Extract", 
          caption: "Nature Merged with Modern Lab Science" 
        },
        { 
          src: "/images/about/aboutThree.jpg", 
          alt: "Atelier Presentation", 
          caption: "The Ultimate Premium Dressing Counter" 
        },
        { 
          src: "/images/about/aboutFour.jpg", 
          alt: "Bespoke Nail Rituals", 
          caption: "Endless Palette of Organic Care & Colors" 
        }
      ],
      team: {
        heading: "Our Uncompromising Standard",
        text: "Every single formulation that leaves our atelier is crafted with an uncompromising dedication to high quality. We marry top-tier scientific innovation with ancient botanical wisdom to give your skin a timeless cellular defense and a weightless raw glow."
      }
    };

    return NextResponse.json(aboutData, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error in About API Route" },
      { status: 500 }
    );
  }
}