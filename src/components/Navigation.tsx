"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/articles", label: "Articles" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isFloating, setIsFloating] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFloating(window.scrollY > 80);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
            <motion.div
                initial={false}
                animate={{
                    maxWidth: isFloating ? 1024 : 1152,
                    minHeight: isFloating ? 64 : 76,
                    y: isFloating ? 14 : 0,
                    borderRadius: isFloating ? 9999 : 0,
                }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 px-4 md:px-6 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
                    isFloating
                        ? "bg-white/85 border border-neutral-200/80 shadow-xl backdrop-blur-xl"
                        : "bg-transparent border border-transparent shadow-none backdrop-blur-none"
                }`}
            >
                <Link
                    href="/"
                    className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black shrink-0"
                >
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            rotate: 5,
                            filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.2))",
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Image
                            src="/logo-mar.webp"
                            alt="MAR."
                            width={40}
                            height={40}
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    aria-label="Main navigation"
                    className="hidden md:flex items-center gap-1"
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative h-10 px-4 rounded-full inline-flex items-center justify-center text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                                    isActive
                                        ? "text-black font-semibold"
                                        : "text-neutral-600 hover:bg-black/[0.04] hover:text-black"
                                }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNavPill"
                                        className="absolute inset-0 rounded-full bg-black/[0.08]"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Contact */}
                <Link
                    href="/#contact"
                    className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shrink-0"
                >
                    Contact
                </Link>

                {/* Mobile Hamburger (44x44px touch target) */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black shrink-0"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                            mobileOpen ? "translate-y-2 rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
                            mobileOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
                            mobileOpen ? "-translate-y-2 -rotate-45" : ""
                        }`}
                    />
                </button>
            </motion.div>

            {/* Mobile Dropdown */}
            <div className="pointer-events-auto mx-auto max-w-[calc(100vw-2rem)] md:hidden">
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{
                                opacity: 1,
                                y: isFloating ? 18 : 6,
                                scale: 1,
                            }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{
                                duration: 0.18,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-xl p-3"
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-base font-medium transition-colors px-3 py-2.5 rounded-xl ${
                                            pathname === link.href
                                                ? "text-black font-bold bg-black/[0.06]"
                                                : "text-neutral-600 hover:text-black hover:bg-black/[0.03]"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/#contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="min-h-[44px] flex items-center justify-center text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full text-center hover:bg-neutral-800 transition-colors mt-2"
                                >
                                    Contact
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
