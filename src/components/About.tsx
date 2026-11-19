"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TechStackCloud from "@/components/ui/tech-stack-cloud";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
} as const;

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
} as const;

const ISTJ_MONOLOGUES = [
    "I'm not glaring at you, I'm debugging a formula in my head.",
    "Do it by hand in 5 minutes? No, I'll spend 2 hours automating it.",
    "Whoever merged these spreadsheet cells owes me an apology.",
    "Please stop typing phone numbers with spaces and dashes.",
    "Hold on, there's definitely a script for this.",
] as const;

const ISTJ_TRAITS = [
    { label: "Introverted", percent: 86 },
    { label: "Sensing", percent: 58 },
    { label: "Thinking", percent: 64 },
    { label: "Judging", percent: 67 },
    { label: "Assertive", percent: 61, fullWidthOnMobile: true },
] as const;

export default function About() {
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [quoteIndex, setQuoteIndex] = React.useState(0);
    const reduceMotion = useReducedMotion();

    const handleCardFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const handleCycleQuote = () => {
        setQuoteIndex((prev) => (prev + 1) % ISTJ_MONOLOGUES.length);
    };

    return (
        <section className="py-24 px-4 md:px-6 relative">
            {/* Single 3D Flippable Card: About Me (Front) <-> ISTJ-A (Back) */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="max-w-6xl mx-auto"
            >
                <div style={{ perspective: "1600px" }}>
                    <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.45, 0.05, 0.25, 1] }}
                        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                        className="relative grid grid-cols-1 w-full rounded-[3rem]"
                    >
                        {/* FRONT FACE: About Me (Light Surface + Graph-Paper Accent) */}
                        <div
                            aria-hidden={isFlipped}
                            inert={isFlipped}
                            style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(0deg)",
                            }}
                            className={`col-start-1 row-start-1 w-full relative overflow-hidden bg-white/90 border border-white/60 p-8 md:p-14 rounded-[3rem] shadow-xl grid md:grid-cols-12 gap-8 md:gap-12 items-start ${
                                isFlipped ? "pointer-events-none" : "pointer-events-auto"
                            }`}
                        >
                            {/* Subtle Math Graph-Paper Texture */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_75%)]"
                            />

                            {/* Fixed Top-Right Flip Button */}
                            <button
                                type="button"
                                onClick={handleCardFlip}
                                aria-label="Flip card to ISTJ-A personality side"
                                tabIndex={isFlipped ? -1 : 0}
                                className="group/flip absolute top-6 right-6 md:top-8 md:right-8 z-30 w-11 h-11 rounded-full bg-neutral-100 hover:bg-black text-neutral-700 hover:text-white border border-neutral-200/80 hover:border-black flex items-center justify-center transition-colors duration-200 cursor-pointer touch-manipulation shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                            >
                                <RotateCw
                                    className="w-4 h-4 transition-transform duration-500 group-hover/flip:rotate-180"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Left Column: Heading + 3 Minimalist Factual Metadata Rows */}
                            <div className="md:col-span-4 relative z-10 pr-14 md:pr-0">
                                <h2 className="text-3xl font-bold tracking-tight text-black">
                                    About Me
                                </h2>
                                <div className="w-12 h-1 bg-black mt-4" />

                                <dl className="mt-8 pt-6 border-t border-neutral-200/80 space-y-5">
                                    <div>
                                        <dt className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                                            Education
                                        </dt>
                                        <dd className="text-sm font-semibold text-black mt-0.5">
                                            B.Ed. in Mathematics
                                        </dd>
                                        <dd className="text-xs text-neutral-600 mt-0.5">
                                            Universitas Lambung Mangkurat
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                                            Location
                                        </dt>
                                        <dd className="text-sm font-semibold text-black mt-0.5">
                                            South Kalimantan, Indonesia
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                                            Writing
                                        </dt>
                                        <dd className="mt-0.5">
                                            <a
                                                href="https://medium.com/@mhmmdaliridh"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                tabIndex={isFlipped ? -1 : 0}
                                                className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:text-neutral-600 underline underline-offset-4 decoration-neutral-300 hover:decoration-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:rounded-sm"
                                            >
                                                <span>medium.com/@mhmmdaliridh</span>
                                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Right Column: Exact 3 Existing Paragraphs */}
                            <div className="md:col-span-8 md:pr-10 relative z-10 text-base md:text-lg text-neutral-600 leading-relaxed space-y-6">
                                <p className="text-left md:text-justify">
                                    I studied{" "}
                                    <span className="font-semibold text-black">
                                        Mathematics Education
                                    </span>{" "}
                                    at{" "}
                                    <span className="font-semibold text-black">
                                        Universitas Lambung Mangkurat
                                    </span>
                                    , which mostly means I spent four years learning how to stare at
                                    messy problems until they start making sense. Now I work as a{" "}
                                    <span className="font-semibold text-black">Statistician</span>{" "}
                                    in the{" "}
                                    <span className="font-semibold text-black">
                                        Government Sector
                                    </span>
                                    , wrangling education data for hundreds of madrasahs.
                                </p>
                                <p className="text-left md:text-justify">
                                    Most problems in my office don&apos;t need fancy cloud servers or
                                    heavy tech stacks. I use{" "}
                                    <span className="font-semibold text-black">
                                        Google Apps Script
                                    </span>{" "}
                                    and{" "}
                                    <span className="font-semibold text-black">
                                        Google Workspace
                                    </span>{" "}
                                    almost every day because they are free, quick to set up, and run
                                    right inside the spreadsheets and docs everyone at work already
                                    has open.
                                </p>
                                <p className="text-left md:text-justify">
                                    When a task refuses to stay inside a spreadsheet, I write{" "}
                                    <span className="font-semibold text-black">Python</span> bots to
                                    do the boring browser clicking for me, run{" "}
                                    <span className="font-semibold text-black">Hermes Agent</span>{" "}
                                    cron jobs for daily routines, and dump my notes into{" "}
                                    <span className="font-semibold text-black">Obsidian</span> so
                                    neither I nor my AI agents forget what we did yesterday. Whenever
                                    I want to slow down, I write on{" "}
                                    <span className="font-semibold text-black">Medium</span>.
                                </p>
                            </div>
                        </div>

                        {/* BACK FACE: ISTJ-A | The Logistician (Dark Editorial) */}
                        <div
                            aria-hidden={!isFlipped}
                            inert={!isFlipped}
                            style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                            }}
                            className={`col-start-1 row-start-1 w-full relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black text-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-white/10 grid md:grid-cols-12 gap-8 md:gap-12 items-center ${
                                isFlipped ? "pointer-events-auto" : "pointer-events-none"
                            }`}
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"
                            />

                            {/* Fixed Top-Right Flip Button */}
                            <button
                                type="button"
                                onClick={handleCardFlip}
                                aria-label="Flip card back to About Me side"
                                tabIndex={isFlipped ? 0 : -1}
                                className="group/flip absolute top-6 right-6 md:top-8 md:right-8 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white text-neutral-200 hover:text-black border border-white/15 hover:border-white flex items-center justify-center transition-colors duration-200 cursor-pointer touch-manipulation shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                                <RotateCw
                                    className="w-4 h-4 transition-transform duration-500 group-hover/flip:rotate-180"
                                    aria-hidden="true"
                                />
                            </button>

                            {/* Left Column: Header + Exact Copy + Compact Trait Bars */}
                            <div className="md:col-span-7 lg:col-span-8 relative z-10 flex flex-col justify-center order-last md:order-first">
                                <div className="mb-5">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        ISTJ-A{" "}
                                        <span className="text-neutral-400 font-normal">
                                            | The Logistician
                                        </span>
                                    </h3>
                                    <div className="w-12 h-1 bg-white mt-3" />
                                </div>

                                <div className="text-sm md:text-base text-neutral-300 leading-relaxed space-y-4 text-left md:text-justify">
                                    <p>
                                        Hand me a chaotic folder of mismatched files and I will
                                        probably have a great afternoon sorting it out. I genuinely
                                        enjoy turning cluttered spreadsheets and repetitive admin
                                        chores into neat, predictable systems.
                                    </p>
                                    <p>
                                        People sometimes think I look too serious at my desk, though
                                        half the time I&apos;m just figuring out how to automate a
                                        five-minute task so I never have to do it by hand again.
                                    </p>
                                </div>

                                {/* Compact 5-Trait Breakdown */}
                                <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-4">
                                    {ISTJ_TRAITS.map((trait) => (
                                        <div
                                            key={trait.label}
                                            className={
                                                "fullWidthOnMobile" in trait &&
                                                trait.fullWidthOnMobile
                                                    ? "col-span-2 sm:col-span-1"
                                                    : ""
                                            }
                                        >
                                            <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                                                <span className="text-neutral-300">
                                                    {trait.label}
                                                </span>
                                                <span className="text-white font-mono tabular-nums">
                                                    {trait.percent}%
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{
                                                        scaleX: isFlipped
                                                            ? trait.percent / 100
                                                            : 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.85,
                                                        delay: isFlipped ? 0.25 : 0,
                                                        ease: [0.16, 1, 0.3, 1],
                                                    }}
                                                    className="h-full w-full origin-left rounded-full bg-white"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Interactive ISTJ-A Character + Deadpan Monologue */}
                            <div className="md:col-span-5 lg:col-span-4 relative z-10 flex flex-col items-center justify-center order-first md:order-last pt-10 md:pt-4">
                                <div className="min-h-[60px] flex items-end justify-center mb-3">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={quoteIndex}
                                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -4, scale: 0.96 }}
                                            transition={{
                                                duration: 0.22,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="relative bg-white text-black text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg max-w-[260px] text-center leading-snug"
                                        >
                                            &ldquo;{ISTJ_MONOLOGUES[quoteIndex]}&rdquo;
                                            <span
                                                aria-hidden="true"
                                                className="w-2.5 h-2.5 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <motion.button
                                    type="button"
                                    tabIndex={isFlipped ? 0 : -1}
                                    onClick={handleCycleQuote}
                                    aria-label="Cycle ISTJ-A character inner monologue"
                                    whileHover={reduceMotion ? undefined : { scale: 1.05, rotate: 3 }}
                                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                                    className="relative rounded-3xl cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                                >
                                    <motion.div
                                        animate={
                                            isFlipped && !reduceMotion ? { y: [0, -10, 0] } : { y: 0 }
                                        }
                                        transition={
                                            isFlipped && !reduceMotion
                                                ? {
                                                      repeat: Infinity,
                                                      duration: 4,
                                                      ease: "easeInOut",
                                                  }
                                                : { duration: 0 }
                                        }
                                    >
                                        <Image
                                            src="/mbti_character.webp"
                                            alt="ISTJ-A Character"
                                            width={208}
                                            height={208}
                                            sizes="(max-width: 768px) 160px, 208px"
                                            className="w-40 md:w-52 h-auto drop-shadow-2xl select-none"
                                        />
                                    </motion.div>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Tech Stack Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="max-w-6xl mx-auto mt-20"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-3xl font-bold tracking-tight mb-3 text-center md:text-left"
                >
                    Tech Stack
                </motion.h2>
                <motion.div
                    variants={fadeUp}
                    className="w-12 h-1 bg-black mb-10 mx-auto md:mx-0"
                ></motion.div>

                <motion.div variants={fadeUp}>
                    <TechStackCloud />
                </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-16 text-center"
            >
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-block"
                >
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        More About Me
                        <span>→</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
