import type { Metadata } from "next";
import { Syne, DM_Sans, Geist } from "next/font/google";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import CursorEffects from "@/components/ui/CursorEffects";
import CursorParallax from "@/components/ui/CursorParallax";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolioyashraj.vercel.app"),
  title: "Yashraj Singh | Full-Stack Developer",
  description:
    "Full-Stack Developer portfolio — projects, services, and experience.",
  icons: {
    icon: [{ url: "/assets/image.png", type: "image/png" }],
    shortcut: "/assets/image.png",
    apple: "/assets/image.png",
  },
  appleWebApp: {
    title: "Yashraj Singh",
  },
  verification: {
    google: "36mbH4hO3_WuyLRlo8XkOxUqVzAU_QC4Cfvqk-_ItNY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(syne.variable, dmSans.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <CursorEffects />
        <SiteNav />
        <CursorParallax className="flex-1">{children}</CursorParallax>
        <Footer />
      </body>
    </html>
  );
}
