"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    { name: "Google Apps Script", icon: "⚡" },
    { name: "Looker Studio", icon: "📊" },
    { name: "n8n", icon: "🔄" },
    { name: "MySQL", icon: "🗄️" },
    { name: "Google Workspace", icon: "☁️" },
    { name: "Next JS", icon: "▲" },
    { name: "Tailwind CSS", icon: "🎨" },
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

export default function AboutPage() {
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
                        className="text-3xl font-bold tracking-tight mb-3"
                    >
                        Tech Stack
                    </motion.h2>
                    <motion.div
                        variants={fadeUp}
                        className="w-12 h-1 bg-black mb-10"
                    ></motion.div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {techStack.map((tool) => (
                            <motion.div
                                key={tool.name}
                                variants={fadeUp}
                                className="bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-5 rounded-2xl text-center hover:bg-black hover:text-white transition-all duration-300 cursor-default shadow-sm group"
                            >
                                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {tool.icon}
                                </span>
                                <span className="text-xs font-semibold text-gray-700 group-hover:text-white transition-colors">
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
