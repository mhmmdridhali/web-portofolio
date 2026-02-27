"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IconCloud } from "@/components/ui/icon-cloud";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
    },
} as const;

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
} as const;

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 },
    },
} as const;

const techStack = [
    { name: "Google Apps Script", slug: "google" },
    { name: "Looker Studio", slug: "looker" },
    { name: "n8n", slug: "n8n" },
    { name: "MySQL", slug: "mysql" },
    { name: "Google Workspace", slug: "googledrive" },
    { name: "Next JS", slug: "nextdotjs" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
];

const education = {
    degree: "Bachelor of Mathematics Education",
    university: "Universitas Lambung Mangkurat",
    location: "Banjarmasin, South Kalimantan",
    period: "2019 — 2024",
    highlights: [
        "Specialized in mathematical statistics and probability theory",
        "Active in organizational leadership and program management",
        "Developed analytical thinking and structured problem-solving skills",
        "Built foundational expertise in data-driven decision making",
    ],
};

const values = [
    {
        title: "Efficiency First",
        desc: "Every solution I build prioritizes maximum impact with minimal overhead.",
        icon: "🎯",
    },
    {
        title: "Data-Driven",
        desc: "Decisions grounded in data and statistical evidence, not assumptions.",
        icon: "📐",
    },
    {
        title: "Cost-Effective",
        desc: "Delivering enterprise-grade solutions without enterprise-grade budgets.",
        icon: "💡",
    },
    {
        title: "Continuous Growth",
        desc: "Always learning — from mathematics to code, from theory to practice.",
        icon: "🌱",
    },
];

interface TraitBarProps {
    leftLabel: string;
    rightLabel: string;
    percent: number;
    color: string;
}

const TraitBar = ({ leftLabel, rightLabel, percent, color }: TraitBarProps) => {
    return (
        <motion.div variants={fadeUp} className="w-full">
            <div className="flex justify-between text-xs font-bold mb-1.5 tracking-wider uppercase">
                <span className={percent >= 50 ? "text-black" : "text-gray-400 font-normal"}>{leftLabel}</span>
                <span className={percent < 50 ? "text-black" : "text-gray-400 font-normal"}>{rightLabel}</span>
            </div>
            <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className={`absolute left-0 top-0 h-full ${color}`}
                ></motion.div>
            </div>
            <div className="flex justify-between text-[10px] mt-1 font-mono text-gray-400">
                <span className={percent >= 50 ? "text-gray-600 font-bold" : ""}>{percent}%</span>
                <span className={percent < 50 ? "text-gray-600 font-bold" : ""}>{100 - percent}%</span>
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
                        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 text-xs font-semibold tracking-widest uppercase mb-6 text-gray-600">
                            About Me
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            Where Mathematics{" "}
                            <span className="text-gray-400">Meets Technology</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                            I combine the precision of mathematical thinking with the
                            versatility of modern technology to transform data challenges into
                            elegant, cost-effective solutions.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={scaleIn}
                        className="md:col-span-5 flex justify-center"
                    >
                        <div className="relative w-64 h-64 md:w-72 md:h-72">
                            <div className="absolute inset-0 bg-gray-300 rounded-[2rem] rotate-6 opacity-50 blur-sm"></div>
                            <div className="absolute inset-0 bg-black rounded-[2rem] -rotate-3"></div>
                            <div className="absolute inset-0 bg-gray-100 rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden">
                                <Image
                                    src="/profile.jpg"
                                    alt="Muhammad Ali Ridho"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
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
                    whileHover={{ scale: 1.02, y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 md:p-16 rounded-[3rem] shadow-xl"
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
                    <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-600 leading-relaxed">
                        <motion.div variants={fadeUp} className="space-y-6">
                            <p className="text-justify">
                                I studied{" "}
                                <span className="font-semibold text-black">
                                    Mathematics Education
                                </span>{" "}
                                at{" "}
                                <span className="font-semibold text-black">
                                    Universitas Lambung Mangkurat
                                </span>
                                . More than formulas and equations, my time there taught me
                                how to think logically and break down complex problems into
                                simple, manageable steps. That shift in thinking is what
                                eventually led me into the world of data and technology.
                            </p>
                            <p className="text-justify">
                                Right now, I work as a{" "}
                                <span className="font-semibold text-black">
                                    Statistician
                                </span>{" "}
                                in the{" "}
                                <span className="font-semibold text-black">
                                    Government Sector
                                </span>
                                . My day-to-day job is pretty straightforward — I analyze
                                data to help government operations run smoother. I build
                                tools using{" "}
                                <span className="font-semibold text-black">
                                    Google Apps Script
                                </span>{" "}
                                that automate repetitive tasks, so people can focus on what
                                actually matters instead of doing things manually.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="space-y-6">
                            <p className="text-justify">
                                Outside of work, I enjoy writing on{" "}
                                <span className="font-semibold text-black">Medium</span>.
                                It&apos;s my way of reflecting on things — sometimes about
                                tech, sometimes just random thoughts and life experiences.
                                Writing helps me organize my ideas and share what I&apos;ve
                                learned along the way. It&apos;s like a quiet corner where
                                I can think out loud.
                            </p>
                            <p className="text-justify">
                                My philosophy is simple:{" "}
                                <span className="italic font-medium text-black">
                                    &quot;Solving problems with maximum efficiency and minimal
                                    cost.&quot;
                                </span>{" "}
                                Every project I take on reflects this — finding the most
                                elegant way to create the most value, without overcomplicating
                                things.
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
                    whileHover={{ scale: 1.01, y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 md:p-16 rounded-[3rem] shadow-xl"
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
                        <div className="md:col-span-8 text-lg text-gray-600 leading-relaxed space-y-6 flex flex-col justify-center order-last md:order-first">
                            <motion.div variants={fadeUp}>
                                <h4 className="text-2xl font-bold text-black mb-4">ISTJ-A <span className="text-gray-400 font-normal">| The Logistician</span></h4>
                                <p className="text-justify mb-4">
                                    If there&apos;s one thing I love, it&apos;s taking a chaotic, messy problem and organizing it into a clean, logical system. I thrive on order and getting things done efficiently — basically, I&apos;m the person who actually enjoys building complex spreadsheets and automated workflows.
                                </p>
                                <p className="text-justify">
                                    While I might seem a bit serious at first glance, I&apos;m usually just internally calculating the most optimal way to approach whatever is in front of me. I believe in consistency, reliability, and letting the data speak for itself.
                                </p>
                            </motion.div>
                        </div>
                        <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col items-center justify-center order-first md:order-last">
                            <motion.img
                                src="/mbti_character.png"
                                alt="ISTJ-A Character"
                                className="w-48 md:w-64 h-auto drop-shadow-2xl cursor-pointer"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                whileTap={{ scale: 0.95 }}
                            />
                        </motion.div>
                    </div>

                    {/* Traits Bars */}
                    <motion.div variants={fadeUp} className="mb-16">
                        <h3 className="text-xl font-bold text-black mb-8 border-l-4 border-black pl-4">Personality Traits</h3>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            <TraitBar leftLabel="Introverted" rightLabel="Extroverted" percent={86} color="bg-gray-800" />
                            <TraitBar leftLabel="Sensing" rightLabel="Intuition" percent={58} color="bg-gray-700" />
                            <TraitBar leftLabel="Thinking" rightLabel="Feeling" percent={64} color="bg-gray-600" />
                            <TraitBar leftLabel="Judging" rightLabel="Perceiving" percent={67} color="bg-gray-500" />
                            <TraitBar leftLabel="Assertive" rightLabel="Turbulent" percent={61} color="bg-gray-400" />
                        </div>
                    </motion.div>

                    {/* Strengths Grid */}
                    <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-600 leading-relaxed">
                        <motion.div variants={fadeUp} className="space-y-4">
                            <h4 className="text-xl font-bold text-black border-l-4 border-black pl-4">Career Strengths</h4>
                            <p className="text-justify">
                                Think of me as the Marie Kondo of your workspace. If a project is a tangled mess of spaghetti data and chaotic workflows, I&apos;m the one who will happily sit down, untangle it, and organize it into beautifully structured, automated systems. I get things done, and I like doing them right the first time.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="space-y-4">
                            <h4 className="text-xl font-bold text-black border-l-4 border-black pl-4">Personal Growth</h4>
                            <p className="text-justify">
                                I&apos;ll admit, my default setting is &quot;if it ain&apos;t broke, don&apos;t fix it... just optimize it a little.&quot; I love a good proven method! But working in tech means I&apos;m constantly learning to embrace the chaos (just a little bit!) and balance my love for rigid structure with the flexibility to try new, slightly terrifying things.
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
                    whileHover={{ scale: 1.02, y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)" }}
                    className="bg-gradient-to-br from-gray-900 to-black text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-3 mb-2"
                        >
                            <span className="text-2xl">🎓</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
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
                            className="text-xl text-gray-300 mb-1 text-justify"
                        >
                            {education.university}
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-gray-500 mb-8 text-justify">
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
                                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm px-5 py-4 rounded-2xl border border-white/10"
                                >
                                    <span className="text-white/50 mt-0.5">✦</span>
                                    <span className="text-gray-300 text-sm leading-relaxed text-justify">
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
                                className="bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-5 rounded-2xl text-center hover:bg-black hover:text-white transition-all duration-300 cursor-default shadow-sm group flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                            >
                                <div className="w-16 h-16 group-hover:scale-110 group-hover:invert transition-all duration-300 flex items-center justify-center pointer-events-auto">
                                    <IconCloud
                                        images={[`https://cdn.simpleicons.org/${tool.slug}/black`]}
                                        className="w-full h-full object-contain cursor-pointer"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-gray-700 group-hover:text-white transition-colors relative z-10">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {values.map((v) => (
                            <motion.div
                                key={v.title}
                                variants={fadeUp}
                                className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-sm text-center hover:bg-black hover:text-white transition-all duration-500 group cursor-default"
                            >
                                <span className="text-3xl block mb-4 group-hover:scale-125 transition-transform duration-300">
                                    {v.icon}
                                </span>
                                <h4 className="font-bold text-sm mb-2">{v.title}</h4>
                                <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">
                                    {v.desc}
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
                    <p className="text-gray-500 mb-6">
                        Want to see what I&apos;ve built?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/experience"
                            className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            View Experience →
                        </Link>
                        <Link
                            href="/portfolio"
                            className="px-8 py-3 bg-white border border-gray-300 text-black font-medium rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            See Portfolio
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
