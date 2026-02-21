"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        transition: { staggerChildren: 0.1 },
    },
} as const;

type Category = "All" | "Work Project" | "Vibe Coding";

const projects = [
    {
        title: "Data Automation System",
        category: "Work Project" as const,
        description:
            "End-to-end automated reporting pipeline using Google Apps Script. Connects multiple data sources via custom APIs, processes and validates records, then generates formatted reports — reducing manual work by 80% and saving 15+ hours weekly.",
        tech: ["Google Apps Script", "REST API", "Google Sheets", "Apps Script Triggers"],
        featured: true,
        size: "large",
    },
    {
        title: "Statistical Dashboard",
        category: "Work Project" as const,
        description:
            "Interactive data visualization dashboard built on robust database architecture. Tracks key performance metrics across departments with real-time filtering, drill-down analysis, and automated data sync.",
        tech: ["Database Design", "Data Viz", "SQL", "Automated Reporting"],
        featured: false,
        size: "medium",
    },
    {
        title: "Inventory Management Script",
        category: "Work Project" as const,
        description:
            "Custom Google Apps Script solution for tracking inventory across multiple locations. Features barcode scanning integration, low-stock alerts, and automated purchase order generation.",
        tech: ["Google Apps Script", "Google Forms", "Triggers", "Email Automation"],
        featured: false,
        size: "medium",
    },
    {
        title: "Minimalist Task Manager",
        category: "Vibe Coding" as const,
        description:
            "Clean, functional task management web app built to explore modern state management patterns. Features drag-and-drop reordering, priority tagging, and local persistence with a minimalist UI.",
        tech: ["React", "TypeScript", "Zustand", "Tailwind CSS"],
        featured: false,
        size: "medium",
    },
    {
        title: "API Data Visualizer",
        category: "Vibe Coding" as const,
        description:
            "Frontend prototype that fetches, parses, and beautifully displays public dataset endpoints in real-time. Supports multiple chart types, responsive tables, and data export functionality.",
        tech: ["Next.js", "Chart.js", "Tailwind CSS", "REST API"],
        featured: true,
        size: "large",
    },
    {
        title: "Markdown Note App",
        category: "Vibe Coding" as const,
        description:
            "A sleek markdown editor with live preview, syntax highlighting, and automatic local backup. Built as a personal utility for capturing ideas and technical notes.",
        tech: ["React", "Markdown", "LocalStorage", "CSS Grid"],
        featured: false,
        size: "small",
    },
];

const categories: Category[] = ["All", "Work Project", "Vibe Coding"];

export default function PortfolioPage() {
    const [active, setActive] = useState<Category>("All");

    const filtered =
        active === "All"
            ? projects
            : projects.filter((p) => p.category === active);

    return (
        <div className="pt-28 pb-24">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 mb-12">
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.div
                        variants={fadeUp}
                        className="inline-block px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 text-xs font-semibold tracking-widest uppercase mb-6 text-gray-600"
                    >
                        Selected Work
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                    >
                        Portfolio{" "}
                        <span className="text-gray-400">Gallery</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                    >
                        A curated collection of professional solutions and creative
                        experiments — from production automation to passion projects.
                    </motion.p>
                </motion.div>
            </section>

            {/* Category Filters */}
            <section className="max-w-6xl mx-auto px-6 mb-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex gap-3"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${active === cat
                                    ? "bg-black text-white shadow-lg"
                                    : "bg-white/60 backdrop-blur-xl border border-white/40 text-gray-600 hover:bg-black hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Project Grid */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {filtered.map((project) => (
                            <motion.div
                                key={project.title}
                                variants={fadeUp}
                                layout
                                className={`group cursor-pointer rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 ${project.featured
                                        ? "md:col-span-2 md:row-span-2"
                                        : "md:col-span-1"
                                    } ${project.featured
                                        ? "bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl hover:shadow-black/40"
                                        : "bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                {/* Project Visual Area */}
                                <div
                                    className={`relative overflow-hidden ${project.featured ? "h-48 md:h-64" : "h-40"
                                        }`}
                                >
                                    <div
                                        className={`absolute inset-0 ${project.featured
                                                ? "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"
                                                : project.category === "Work Project"
                                                    ? "bg-gray-100"
                                                    : "bg-gray-200"
                                            }`}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span
                                            className={`text-6xl ${project.featured ? "opacity-20" : "opacity-10"
                                                } group-hover:scale-125 transition-transform duration-700`}
                                        >
                                            {project.category === "Work Project" ? "📊" : "⚡"}
                                        </span>
                                    </div>
                                    {/* Category Badge */}
                                    <span
                                        className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${project.featured
                                                ? "bg-white/10 text-gray-300 backdrop-blur-sm"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h3
                                        className={`font-bold mb-3 group-hover:translate-x-1 transition-transform ${project.featured
                                                ? "text-2xl md:text-3xl"
                                                : "text-xl"
                                            }`}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        className={`mb-6 leading-relaxed ${project.featured
                                                ? "text-gray-300 text-base"
                                                : "text-gray-600 text-sm"
                                            }`}
                                    >
                                        {project.description}
                                    </p>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className={`text-xs font-medium px-3 py-1.5 rounded-full ${project.featured
                                                        ? "bg-white/10 text-gray-300 border border-white/10"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div
                                        className={`flex items-center gap-2 text-sm font-medium ${project.featured
                                                ? "text-white/70"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        View Details
                                        <span className="group-hover:translate-x-2 transition-transform">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
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
                        Read my thoughts on building these solutions.
                    </p>
                    <Link
                        href="/articles"
                        className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-block"
                    >
                        Read Articles →
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
