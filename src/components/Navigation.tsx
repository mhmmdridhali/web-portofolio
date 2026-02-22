"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

    return (
        <nav className="fixed w-full bg-white/70 backdrop-blur-md z-50 border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            rotate: 5,
                            filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.2))",
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Image
                            src="/Logo MAR.png"
                            alt="MAR."
                            width={40}
                            height={40}
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative py-1 transition-colors hover:text-black"
                        >
                            <span
                                className={
                                    pathname === link.href
                                        ? "text-black font-semibold"
                                        : ""
                                }
                            >
                                {link.label}
                            </span>
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Desktop Contact */}
                <Link
                    href="/#contact"
                    className="hidden md:inline-block text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Contact
                </Link>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`text-lg font-medium transition-colors py-2 border-b border-gray-100 last:border-0 ${pathname === link.href
                                        ? "text-black font-bold"
                                        : "text-gray-500 hover:text-black"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                onClick={() => setMobileOpen(false)}
                                className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full text-center hover:bg-gray-800 transition-all mt-2"
                            >
                                Contact
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
