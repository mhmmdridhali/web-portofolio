import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Particles } from "@/components/AerosolBackground";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muhammad Ali Ridho | Portfolio",
  description:
    "Portfolio of Muhammad Ali Ridho — Statistician, Tech Enthusiast, and Writer.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased selection:bg-black selection:text-white min-h-screen relative`}
        suppressHydrationWarning
      >
        <Particles
          className="fixed inset-0 z-[-1]"
          quantity={80}
          ease={80}
          color="#000000"
          refresh
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
