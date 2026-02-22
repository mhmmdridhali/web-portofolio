"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const QUOTE_TEXT =
    '"Solving problems with maximum efficiency and minimal cost."';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
} as const;

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
} as const;

const imageVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: "easeOut" as const, delay: 0.3 },
    },
} as const;

export default function Hero() {
    const [displayedText, setDisplayedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);

    useEffect(() => {
        let i = 0;
        let intervalId: ReturnType<typeof setInterval>;

        const startTimeout = setTimeout(() => {
            intervalId = setInterval(() => {
                if (i < QUOTE_TEXT.length) {
                    setDisplayedText(QUOTE_TEXT.slice(0, i + 1));
                    i++;
                } else {
                    setTypingDone(true);
                    clearInterval(intervalId);
                }
            }, 40);
        }, 1000);

        return () => {
            clearTimeout(startTimeout);
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-24 max-w-6xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    className="order-2 md:order-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Role Badge — Framer Motion hover */}
                    <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                    >
                        <motion.div
                            variants={fadeUpVariants}
                            className="inline-block px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 text-xs font-semibold tracking-widest uppercase mb-6 text-gray-600 shadow-sm"
                        >
                            Statistician | Tech Enthusiast | Writer
                        </motion.div>
                    </motion.div>

                    {/* Main Name — subtle opacity breathing */}
                    <motion.h1
                        variants={fadeUpVariants}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut",
                        }}
                        className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
                    >
                        Muhammad <br />
                        <span className="text-gray-400">Ali Ridho</span>
                    </motion.h1>

                    <motion.blockquote variants={fadeUpVariants} className="my-8 h-24 md:h-16">
                        <p
                            className={`text-lg md:text-xl lg:text-2xl font-medium italic text-gray-700 leading-relaxed border-l-4 border-black pl-6 md:pl-10${!typingDone ? " cursor" : ""
                                }`}
                        >
                            {displayedText}
                        </p>
                    </motion.blockquote>
                </motion.div>

                {/* Profile Picture Frame */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center md:justify-end relative"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 bg-gray-300 rounded-[2rem] rotate-6 opacity-50 blur-sm mix-blend-multiply transition-transform group-hover:rotate-12"></div>
                        <div className="absolute inset-0 bg-black rounded-[2rem] -rotate-3 transition-transform group-hover:rotate-0"></div>

                        {/* Image Container */}
                        <div className="absolute inset-0 bg-gray-100 rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center cursor-pointer transition-transform hover:scale-105 duration-300">
                            <Image
                                src="/profile.jpg"
                                alt="Muhammad Ali Ridho"
                                width={400}
                                height={400}
                                priority
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
