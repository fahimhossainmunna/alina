import ReduxProvider from "@/providers/ReduxProvider";
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/common/ScrollToTop";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alina | Premium Cosmetics & Beauty Products",
  description:
    "Discover true elegance with Alina's luxury cosmetic collections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-[#FFFCF9] text-[#1C1B1B]">
        <ReduxProvider>
          <NavbarWrapper />
          
          <main className="flex-grow">{children}</main>
          <ScrollToTop />
          <FooterWrapper/>
        </ReduxProvider>
      </body>
    </html>
  );
}