"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LanyardBadge from "@/components/ui/lanyard-badge";

const QUOTE_TEXT =
    '"Less manual work, zero server bills, and tools people actually use."';

const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
} as const;

const imageVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
} as const;

function TypewriterQuote() {
    const prefersReducedMotion = useReducedMotion();
    const [displayedText, setDisplayedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion !== false) return;

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
            }, 32);
        }, 550);

        return () => {
            clearTimeout(startTimeout);
            if (intervalId) clearInterval(intervalId);
        };
    }, [prefersReducedMotion]);

    const textToRender = prefersReducedMotion ? QUOTE_TEXT : displayedText;
    const isDone = Boolean(prefersReducedMotion) || typingDone;

    return (
        <p
            className="relative text-lg md:text-xl lg:text-2xl font-medium italic text-neutral-700 leading-relaxed pl-6 md:pl-8 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-black before:rounded-full"
        >
            <span className="sr-only">{QUOTE_TEXT}</span>
            <span aria-hidden="true" className={!isDone ? "cursor" : undefined}>
                {textToRender}
            </span>
        </p>
    );
}

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-24 max-w-6xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="order-2 md:order-1">
                    {/* Role Badge */}
                    <motion.div whileHover={{ scale: 1.02, y: -3 }}>
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-block px-4 py-1.5 rounded-full border border-neutral-300 bg-white/85 backdrop-blur-md text-xs font-semibold tracking-widest uppercase mb-6 text-neutral-600 shadow-sm"
                        >
                            Statistician | Tech Enthusiast | Writer
                        </motion.div>
                    </motion.div>

                    {/* Main Name */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        Muhammad <br />
                        <span className="text-neutral-400">Ali Ridho</span>
                    </h1>

                    <motion.blockquote
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="my-8 h-24 md:h-16"
                    >
                        <TypewriterQuote />
                    </motion.blockquote>
                </div>

                {/* Ditjen Pendis & Kartu ASN Virtual Lanyard */}
                <motion.div
                    className="order-1 md:order-2 flex flex-col items-center relative -mt-24 md:-mt-28"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <LanyardBadge cardWidth={236} height="540px" />
                </motion.div>
            </div>
        </section>
    );
}
