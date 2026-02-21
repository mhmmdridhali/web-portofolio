"use client";

import { motion } from "framer-motion";
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

const slideIn = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7 },
    },
} as const;

const experiences = [
    {
        period: "Present",
        isCurrent: true,
        title: "Statistician",
        org: "Government Sector",
        type: "Professional",
        description:
            "Handling and analyzing Islamic education data for the government. Specializing in data problem-solving, Google Apps Script automation, and database architecture to deliver efficient, high-impact solutions with minimal cost.",
        achievements: [
            "Built automated reporting systems reducing manual work by 80%",
            "Designed scalable database architectures for multi-department data",
            "Streamlined data collection and validation workflows across institutions",
            "Developed Google Apps Script solutions for workflow automation",
        ],
        tech: ["Google Apps Script", "SQL", "Data Management", "Data Visualization"],
    },
    {
        period: "Feb 2023 — Jun 2023",
        isCurrent: false,
        title: "Project Officer Intern",
        org: "Yayasan Hasnur Centre — HAFECS",
        type: "Internship",
        description:
            "Assisted in managing 5 educational programs, handled schedules and work plans, and communicated effectively with over 600 participants and stakeholders.",
        achievements: [
            "Managed logistics and scheduling for 5 concurrent educational programs",
            "Coordinated with 600+ participants and multiple institutional stakeholders",
            "Developed structured work plans and progress tracking systems",
            "Facilitated smooth inter-departmental communication workflows",
        ],
        tech: ["Project Management", "Stakeholder Communication", "Scheduling", "Reporting"],
    },
    {
        period: "2022 — 2023",
        isCurrent: false,
        title: "Online Tutor",
        org: "Marbelika",
        type: "Teaching",
        description:
            "Provided online mathematics tutoring sessions, developed structured learning materials, and helped students improve their problem-solving and analytical skills.",
        achievements: [
            "Delivered engaging online mathematics tutoring to diverse student groups",
            "Created structured, progressive learning materials and exercises",
            "Improved student performance through adaptive teaching methodologies",
            "Developed patience and communication skills through one-on-one mentoring",
        ],
        tech: ["Mathematics", "Online Teaching", "Curriculum Design", "Student Assessment"],
    },
    {
        period: "Mar 2022 — Feb 2023",
        isCurrent: false,
        title: "Head / Leader",
        org: "KSI Ulul Albab",
        type: "Organization",
        description:
            "Led over 50 active members across multiple divisions, developed strategic programs, and established collaborations with 10+ Islamic organizations.",
        achievements: [
            "Led 50+ active members across 6 operational divisions",
            "Developed and executed 12+ strategic programs throughout the year",
            "Established partnerships with 10+ Islamic organizations and communities",
            "Mentored division heads and fostered collaborative team culture",
        ],
        tech: ["Leadership", "Strategic Planning", "Team Management", "Partnership Development"],
    },
];

const stats = [
    { value: "4+", label: "Roles Held" },
    { value: "600+", label: "People Managed" },
    { value: "50+", label: "Team Members Led" },
    { value: "80%", label: "Time Saved via Automation" },
];

export default function ExperiencePage() {
    return (
        <div className="pt-28 pb-24">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.div
                        variants={fadeUp}
                        className="inline-block px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 text-xs font-semibold tracking-widest uppercase mb-6 text-gray-600"
                    >
                        Career Journey
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                    >
                        Experience &{" "}
                        <span className="text-gray-400">Leadership</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                    >
                        From academic organizations to professional data roles — a journey
                        of continuous growth, leadership, and technical mastery.
                    </motion.p>
                </motion.div>
            </section>

            {/* Stats Bar */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((s) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-extrabold text-black mb-1">
                                {s.value}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Interactive Timeline */}
            <section className="max-w-5xl mx-auto px-6 mb-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={stagger}
                    className="relative"
                >
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={slideIn}
                                className="relative pl-14 md:pl-20"
                            >
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute left-2 md:left-6 top-8 w-5 h-5 rounded-full border-4 border-white shadow-md ${exp.isCurrent
                                        ? "bg-black"
                                        : "bg-gray-300"
                                        }`}
                                ></div>
                                {/* Connector line from dot */}
                                <div className="absolute left-7 md:left-11 top-[2.35rem] w-5 md:w-7 h-0.5 bg-gray-200"></div>

                                {/* Card */}
                                <div
                                    className={`rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${exp.isCurrent
                                        ? "bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl hover:shadow-black/30"
                                        : "bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl"
                                        }`}
                                >
                                    {/* Card Header */}
                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            {exp.isCurrent ? (
                                                <span className="text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                                    {exp.period}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-semibold text-gray-500">
                                                    {exp.period}
                                                </span>
                                            )}
                                            <span
                                                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${exp.isCurrent
                                                    ? "bg-white/10 text-gray-300"
                                                    : "bg-gray-100 text-gray-500"
                                                    }`}
                                            >
                                                {exp.type}
                                            </span>
                                        </div>
                                        <h3
                                            className={`text-2xl md:text-3xl font-bold mb-2 ${exp.isCurrent ? "text-white" : "text-black"
                                                }`}
                                        >
                                            {exp.title}
                                        </h3>
                                        <p
                                            className={`text-lg font-medium mb-4 ${exp.isCurrent ? "text-gray-300" : "text-gray-500"
                                                }`}
                                        >
                                            {exp.org}
                                        </p>
                                        <p
                                            className={`leading-relaxed mb-6 ${exp.isCurrent ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            {exp.description}
                                        </p>

                                        {/* Achievements */}
                                        <div className="space-y-3 mb-6">
                                            {exp.achievements.map((a, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span
                                                        className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${exp.isCurrent ? "bg-white/50" : "bg-black"
                                                            }`}
                                                    ></span>
                                                    <span
                                                        className={`text-sm leading-relaxed ${exp.isCurrent
                                                            ? "text-gray-300"
                                                            : "text-gray-600"
                                                            }`}
                                                    >
                                                        {a}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${exp.isCurrent
                                                        ? "bg-white/10 text-gray-300 border border-white/10"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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
                        Interested in working together?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/portfolio"
                            className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            See My Work →
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-8 py-3 bg-white border border-gray-300 text-black font-medium rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
