"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Target,
    Compass,
    Wallet,
    Sprout,
    GraduationCap,
    CheckCircle2,
} from "lucide-react";
import { techStack } from "@/data/techStack";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
} as const;

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
} as const;

const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
} as const;

const education = {
    degree: "Bachelor of Mathematics Education",
    university: "Universitas Lambung Mangkurat",
    location: "Banjarmasin, South Kalimantan",
    period: "2019 - 2024",
    highlights: [
        "Focused on mathematical statistics and probability",
        "Ran campus organization programs and cross-division teams",
        "Learned how to break big, confusing problems into small steps",
        "Picked up the habit of checking numbers before jumping to conclusions",
    ],
};

const values = [
    {
        title: "Keep It Simple",
        desc: "If a Google Sheet and a 50-line script can solve the problem today, I won't overcomplicate it.",
        Icon: Target,
    },
    {
        title: "Check the Numbers",
        desc: "I like decisions backed by clean data and actual records.",
        Icon: Compass,
    },
    {
        title: "Zero Server Bills",
        desc: "Building useful internal tools using the workspace apps our office already has.",
        Icon: Wallet,
    },
    {
        title: "Always Tinkering",
        desc: "Whether it is Apps Script, Python bots, or AI agents, I like testing new ways to save time.",
        Icon: Sprout,
    },
];

interface TraitBarProps {
    leftLabel: string;
    rightLabel: string;
    percent: number;
    color: string;
}

const TraitBar = ({ leftLabel, rightLabel, percent, color }: TraitBarProps) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(rowRef, { once: true, margin: "-20px" });
    const [displayPercent, setDisplayPercent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, percent, {
            duration: 1.15,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplayPercent(Math.round(latest)),
        });
        return () => controls.stop();
    }, [isInView, percent]);

    const leftDominant = percent >= 50;
    const activeWidth = isInView
        ? isHovered
            ? Math.min(96, percent + 2)
            : percent
        : 0;

    return (
        <motion.div
            ref={rowRef}
            variants={fadeUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group w-full select-none"
        >
            {/* Labels */}
            <div className="flex justify-between text-xs font-bold mb-2 tracking-wider uppercase">
                <span
                    className={`transition-all duration-300 ${
                        leftDominant
                            ? "text-black group-hover:translate-x-0.5"
                            : "text-neutral-500 font-medium group-hover:opacity-45"
                    }`}
                >
                    {leftLabel}
                </span>
                <span
                    className={`transition-all duration-300 ${
                        !leftDominant
                            ? "text-black group-hover:-translate-x-0.5"
                            : "text-neutral-500 font-medium group-hover:opacity-45"
                    }`}
                >
                    {rightLabel}
                </span>
            </div>

            {/* Split-Pole Tug Track */}
            <div className="flex items-center gap-1 w-full h-2 group-hover:h-3 transition-all duration-300">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${activeWidth}%` }}
                    transition={{ duration: isHovered ? 0.25 : 1.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full transition-colors duration-300 ${color} group-hover:bg-black`}
                />
                <div className="h-full flex-grow bg-neutral-200 group-hover:bg-neutral-200/70 rounded-full transition-colors duration-300" />
            </div>

            {/* Count-Up Percentages */}
            <div className="flex justify-between text-xs mt-1.5 font-mono tabular-nums">
                <span
                    className={`transition-opacity duration-300 ${
                        leftDominant
                            ? "text-neutral-900 font-bold"
                            : "text-neutral-500 group-hover:opacity-45"
                    }`}
                >
                    {displayPercent}%
                </span>
                <span
                    className={`transition-opacity duration-300 ${
                        !leftDominant
                            ? "text-neutral-900 font-bold"
                            : "text-neutral-500 group-hover:opacity-45"
                    }`}
                >
                    {isInView ? 100 - displayPercent : 0}%
                </span>
            </div>
        </motion.div>
    );
};

export default function AboutPageClient() {
    return (
        <div className="pt-28 pb-24">
            {/* Hero Banner */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="grid md:grid-cols-12 gap-12 items-center"
                >
                    <motion.div variants={fadeUp} className="md:col-span-7">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-neutral-300 bg-white/85 text-xs font-semibold tracking-widest uppercase mb-6 text-neutral-600">
                            About Me
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            Math Brain,{" "}
                            <span className="text-neutral-400">Lazy Automator</span>
                        </h1>
                        <p className="text-xl text-neutral-600 leading-relaxed max-w-xl">
                            I studied math education, ended up working in government
                            statistics, and now spend my days building small scripts and AI
                            workflows so nobody in my office has to copy-paste 200 rows by
                            hand.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={scaleIn}
                        className="md:col-span-5 flex justify-center"
                    >
                        <div className="group relative w-64 h-64 md:w-72 md:h-72">
                            <div className="absolute inset-0 bg-neutral-300 rounded-[2rem] rotate-6 opacity-50 blur-sm transition-transform duration-500 group-hover:rotate-12"></div>
                            <div className="absolute inset-0 bg-black rounded-[2rem] -rotate-3 transition-transform duration-500 group-hover:rotate-0"></div>
                            <div className="absolute inset-0 bg-neutral-100 rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden">
                                <Image
                                    src="/profile.webp"
                                    alt="Muhammad Ali Ridho"
                                    width={400}
                                    height={400}
                                    sizes="(max-width: 768px) 256px, 288px"
                                    priority
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* My Story */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white/85 backdrop-blur-md border border-white/60 p-8 md:p-16 rounded-[3rem] shadow-xl"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl font-bold tracking-tight mb-3"
                    >
                        My Story
                    </motion.h2>
                    <motion.div
                        variants={fadeUp}
                        className="w-12 h-1 bg-black mb-8"
                    ></motion.div>
                    <div className="grid md:grid-cols-2 gap-12 text-lg text-neutral-600 leading-relaxed">
                        <motion.div variants={fadeUp} className="space-y-6">
                            <p className="text-left md:text-justify">
                                I got my degree in{" "}
                                <span className="font-semibold text-black">
                                    Mathematics Education
                                </span>{" "}
                                at{" "}
                                <span className="font-semibold text-black">
                                    Universitas Lambung Mangkurat
                                </span>
                                . College taught me how to untangle messy logic and explain
                                things step by step, a habit that turned out to be super
                                handy once I started working with data and code.
                            </p>
                            <p className="text-left md:text-justify">
                                Today, I work as a{" "}
                                <span className="font-semibold text-black">
                                    Statistician
                                </span>{" "}
                                in the{" "}
                                <span className="font-semibold text-black">
                                    Government Sector
                                </span>
                                . In my line of work, you don&apos;t need a complicated cloud
                                setup to fix daily bottlenecks.{" "}
                                <span className="font-semibold text-black">
                                    Google Apps Script (GAS)
                                </span>{" "}
                                is my go-to tool because it is free, quick to ship, and runs
                                right inside the{" "}
                                <span className="font-semibold text-black">
                                    Google Workspace
                                </span>{" "}
                                sheets and folders that coworkers and school operators already
                                use every day.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="space-y-6">
                            <p className="text-left md:text-justify">
                                For tasks outside Google Workspace, I write{" "}
                                <span className="font-semibold text-black">Python</span>{" "}
                                browser scripts to handle repetitive portal uploads, run
                                scheduled jobs with{" "}
                                <span className="font-semibold text-black">
                                    Hermes Agent
                                </span>
                                , and keep an{" "}
                                <span className="font-semibold text-black">Obsidian</span>{" "}
                                vault as a second brain for both me and my AI agents. When I
                                step away from spreadsheets, I like writing on{" "}
                                <span className="font-semibold text-black">Medium</span>{" "}
                                about tech, work, and whatever else is on my mind.
                            </p>
                            <p className="text-left md:text-justify">
                                My rule of thumb is simple:{" "}
                                <span className="italic font-medium text-black">
                                    &quot;Less manual work, zero server bills, and tools
                                    people actually use.&quot;
                                </span>{" "}
                                If a tool saves my team hours of clicking without costing the
                                office a single rupiah, I&apos;m happy.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* MBTI Section */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white/85 backdrop-blur-md border border-white/60 p-8 md:p-16 rounded-[3rem] shadow-xl"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl font-bold tracking-tight mb-3"
                    >
                        Personality Profile
                    </motion.h2>
                    <motion.div
                        variants={fadeUp}
                        className="w-12 h-1 bg-black mb-12"
                    ></motion.div>

                    {/* Character and Text */}
                    <div className="grid md:grid-cols-12 gap-12 mb-16">
                        <div className="md:col-span-8 text-lg text-neutral-600 leading-relaxed space-y-6 flex flex-col justify-center order-last md:order-first">
                            <motion.div variants={fadeUp}>
                                <h4 className="text-2xl font-bold text-black mb-4">
                                    ISTJ-A{" "}
                                    <span className="text-neutral-500 font-normal">
                                        | The Logistician
                                    </span>
                                </h4>
                                <p className="text-left md:text-justify mb-4">
                                    Hand me a chaotic folder of mismatched files and I will
                                    probably have a great afternoon sorting it out. I genuinely
                                    enjoy turning cluttered spreadsheets and repetitive admin
                                    chores into neat, predictable systems.
                                </p>
                                <p className="text-left md:text-justify">
                                    People sometimes think I look too serious at my desk,
                                    though half the time I&apos;m just figuring out how to
                                    automate a five-minute task so I never have to do it by
                                    hand again.
                                </p>
                            </motion.div>
                        </div>
                        <motion.div
                            variants={fadeUp}
                            className="md:col-span-4 flex flex-col items-center justify-center order-first md:order-last"
                        >
                            <motion.img
                                src="/mbti_character.webp"
                                alt="ISTJ-A Character"
                                width={256}
                                height={256}
                                loading="lazy"
                                className="w-48 md:w-64 h-auto drop-shadow-2xl cursor-pointer"
                                animate={{ y: [0, -14, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut",
                                }}
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        </motion.div>
                    </div>

                    {/* Traits Bars (Option A: Signature Short Underline + Split-Pole Tug Bars) */}
                    <motion.div variants={fadeUp} className="mb-16">
                        <h3 className="text-xl font-bold tracking-tight text-black">
                            Personality Traits
                        </h3>
                        <div className="w-8 h-0.5 bg-black mt-2 mb-8"></div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            <TraitBar
                                leftLabel="Introverted"
                                rightLabel="Extroverted"
                                percent={86}
                                color="bg-neutral-900"
                            />
                            <TraitBar
                                leftLabel="Sensing"
                                rightLabel="Intuition"
                                percent={58}
                                color="bg-neutral-800"
                            />
                            <TraitBar
                                leftLabel="Thinking"
                                rightLabel="Feeling"
                                percent={64}
                                color="bg-neutral-700"
                            />
                            <TraitBar
                                leftLabel="Judging"
                                rightLabel="Perceiving"
                                percent={67}
                                color="bg-neutral-600"
                            />
                            <TraitBar
                                leftLabel="Assertive"
                                rightLabel="Turbulent"
                                percent={61}
                                color="bg-neutral-500"
                            />
                        </div>
                    </motion.div>

                    {/* Strengths Grid (Option A: Signature Short Underline, Open Minimalist Layout) */}
                    <div className="grid md:grid-cols-2 gap-12 text-lg text-neutral-600 leading-relaxed">
                        <motion.div variants={fadeUp}>
                            <h4 className="text-xl font-bold tracking-tight text-black">
                                How I Work
                            </h4>
                            <div className="w-8 h-0.5 bg-black mt-2 mb-4"></div>
                            <p className="text-left md:text-justify">
                                If a workflow is a tangle of mismatched phone numbers,
                                duplicate rows, and manual WhatsApp recaps, I&apos;m the guy
                                who will happily sit down with a cup of coffee and write a
                                script to clean it up. I like systems that are predictable,
                                easy for coworkers to use, and boringly reliable.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <h4 className="text-xl font-bold tracking-tight text-black">
                                What I&apos;m Learning
                            </h4>
                            <div className="w-8 h-0.5 bg-black mt-2 mb-4"></div>
                            <p className="text-left md:text-justify">
                                My default instinct is &quot;if it works, don&apos;t touch
                                it, maybe just make the formula faster.&quot; Lately though,
                                experimenting with AI agents and browser automation has
                                pushed me to try new workflows instead of sticking only to
                                what I already know.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Education Card */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="bg-gradient-to-br from-neutral-900 to-black text-white p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-3 mb-3"
                        >
                            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                                Education
                            </span>
                        </motion.div>
                        <motion.h3
                            variants={fadeUp}
                            className="text-3xl md:text-4xl font-bold mb-2"
                        >
                            {education.degree}
                        </motion.h3>
                        <motion.p
                            variants={fadeUp}
                            className="text-xl text-neutral-300 mb-1"
                        >
                            {education.university}
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="text-neutral-400 mb-8 tabular-nums"
                        >
                            {education.location} · {education.period}
                        </motion.p>
                        <motion.div
                            variants={stagger}
                            className="grid md:grid-cols-2 gap-4"
                        >
                            {education.highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    whileHover={{ y: -2 }}
                                    className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors px-5 py-4 rounded-2xl border border-white/10"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-neutral-200 text-sm leading-relaxed">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {techStack.map((tool) => (
                            <motion.div
                                key={tool.name}
                                variants={fadeUp}
                                whileHover={{ y: -6, scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-white/85 backdrop-blur-md border border-white/60 px-5 py-5 rounded-2xl text-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer shadow-sm group flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                            >
                                <div className="w-16 h-16 flex items-center justify-center">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={tool.iconUrl}
                                        alt={tool.name}
                                        width={42}
                                        height={42}
                                        loading="lazy"
                                        className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6 group-hover:invert"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-neutral-700 group-hover:text-white transition-colors relative z-10">
                                    {tool.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Values */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl font-bold tracking-tight mb-3"
                    >
                        What Drives Me
                    </motion.h2>
                    <motion.div
                        variants={fadeUp}
                        className="w-12 h-1 bg-black mb-10"
                    ></motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {values.map(({ title, desc, Icon }) => (
                            <motion.div
                                key={title}
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                                className="bg-white/85 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-sm text-center hover:bg-black hover:text-white transition-colors duration-300 group cursor-default flex flex-col items-center"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-neutral-100 group-hover:bg-white/15 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                                    <Icon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                                </div>
                                <h4 className="font-bold text-sm mb-2">{title}</h4>
                                <p className="text-xs text-neutral-600 group-hover:text-neutral-300 leading-relaxed transition-colors">
                                    {desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-center"
                >
                    <p className="text-neutral-600 mb-6">
                        Want to see what I&apos;ve built?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/experience"
                            className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            View Experience →
                        </Link>
                        <Link
                            href="/portfolio"
                            className="px-8 py-3 bg-white border border-neutral-300 text-black font-medium rounded-full hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            See Portfolio
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
