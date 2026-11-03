import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Particles } from "@/components/AerosolBackground";
import { MusicCornerWidget } from "@/components/ui/music-player-widget";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadaliridho.my.id"),
  title: "Muhammad Ali Ridho | Portfolio",
  description:
    "Portfolio of Muhammad Ali Ridho: Statistician, Tech Enthusiast, and Writer.",
  openGraph: {
    title: "Muhammad Ali Ridho | Portfolio",
    description:
      "Statistician, Tech Enthusiast, and Writer. Less manual work, zero server bills, and tools people actually use.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x32', type: 'image/png' }
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
          quantity={50}
          ease={80}
          color="#000000"
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <MusicCornerWidget />
      </body>
    </html>
  );
}
