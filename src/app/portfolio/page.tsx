"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

type Category = "All" | "Team" | "Individual";

const projects = [
    {
        title: "Penmadbanjar.com (Madrasah Education Web Portal)",
        category: "Team" as const,
        description:
            "Designed and developed the official web portal for the Madrasah Education Section of the Ministry of Religious Affairs in Banjar Regency. Transitioned manual information dissemination and administrative services into a centralized digital system, focusing on maximizing efficiency and minimizing costs.",
        features: [
            "Responsive public interface",
            "Modern admin panel",
            "Pure CSS animations",
            "First Load JS under 130kB",
            "Automated SEO",
            "Integrated text editor",
        ],
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS"],
        liveUrl: "https://penmadbanjar.com",
        image: "/projects/penmadbanjar-thumb.png",
    },
    {
        title: "Taskly (Personal To-Do List App)",
        category: "Individual" as const,
        description:
            "A full-stack, interactive, and secure personal to-do list app built with a playful Neobrutalism design. Features real-time task management, a live user counter, and Google OAuth with PKCE flow for enhanced security.",
        features: [
            "Google OAuth & Supabase SSR Auth",
            "Real-time task management (List & Kanban)",
            "Live user presence counter",
            "Playful Neobrutalism UI with toast notifications",
        ],
        tech: ["Next.js", "Supabase", "Tailwind CSS"],
        liveUrl: "https://taskly.muhammadaliridho.my.id",
        image: "/projects/taskly-thumb.png",
    },
    {
        title: "EMIS Student Data Automation",
        category: "Individual" as const,
        description:
            "Built an automation script using Google Apps Script to extract student data directly from the Ministry's EMIS system. Replaced manual recapitulation by processing dozens of institutional records simultaneously and automatically organizing them into Google Sheets.",
        features: [
            "Mass extraction",
            "Auto-sheet creation",
            "Targeted data filtering (14 columns)",
            "Full-page server navigation",
        ],
        tech: ["Google Apps Script", "Google Sheets"],
        liveUrl: "",
        image: "/projects/emis-thumb.png",
    },
    {
        title: "SI-PELITA (Information and Data Reporting System)",
        category: "Individual" as const,
        description:
            "Developed a web-based helpdesk application centralizing all student data correction requests into a single portal. Built entirely on the Google Workspace ecosystem using Apps Script, Sheets, and Drive with a serverless architecture to eliminate third-party hosting costs.",
        features: [
            "Real-time ticket tracking",
            "Smart revision system",
            "Analytics dashboard",
            "Mass processing",
            "Duplication prevention",
        ],
        tech: ["Google Apps Script", "Google Sheets", "HTML/CSS", "Bootstrap"],
        liveUrl: "https://s.id/SIPELITA",
        image: "/projects/sipelita-thumb.png",
    },
    {
        title: "ICU RSISA Leave Monitoring System",
        category: "Individual" as const,
        description:
            "Created a real-time web application to manage and monitor employee leave schedules. Digitized manual data collection into an automated workflow, preventing staff shortages due to overlapping leave schedules using pure Google Workspace tools.",
        features: [
            "Leave submission form",
            "Dynamic calendar dashboard",
            "Conflict detection",
            "Auto-balance calculation",
            "Activity logging",
        ],
        tech: ["Google Apps Script", "Google Sheets", "HTML/CSS/JS", "SweetAlert2"],
        liveUrl: "https://s.id/Cuti2026",
        image: "/projects/cuti-thumb.png",
    },
    {
        title: "Pojok Statistik Madrasah Kab. Banjar",
        category: "Individual" as const,
        description:
            "Developed an interactive digital dashboard replacing static and manual data reports for madrasah education in Banjar Regency. The platform provides transparent, real-time information to the public and stakeholders, enabling faster and more accurate decisions based on current education metrics sourced from the EMIS system.",
        features: [
            "Institutional overview across 18 districts",
            "Personnel & student statistics by gender and status",
            "Searchable data by madrasah name or NSM code",
            "Downloadable raw data for offline use",
            "Accreditation status & curriculum tracking",
        ],
        tech: ["Google Looker Studio", "Google Sheets", "Google Connectors", "EMIS Data"],
        liveUrl: "https://lookerstudio.google.com/u/0/reporting/0ea71311-8249-426c-9d96-067c1c282713/page/YOWYF",
        image: "/projects/pojokstatistik-thumb.png",
    },
    {
        title: "Madrasah Profile Data System",
        category: "Individual" as const,
        description:
            "Built a web application facilitating rapid profile data updates for Islamic education institutions using Google Apps Script and Sheets. Features integrated NPSN search, smart auto-fill, and automated report generation to ensure data integrity without additional server costs.",
        features: [
            "Integrated NPSN search",
            "Smart form auto-fill",
            "Strict client/server validation",
            "Automated report generator",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Bootstrap 5"],
        liveUrl: "https://s.id/ProfilLembagaKabBanjar",
        image: "/projects/profilmadrasah-thumb.png",
    },
    {
        title: "SI-PERKAS (Teacher Allowance Filing System)",
        category: "Individual" as const,
        description:
            "Developed an integrated digital system for collecting and verifying document files for teacher and supervisor professional allowances. Transformed manual data collection into a digital workflow using Apps Script, Sheets, and Drive API, completely eliminating physical storage needs.",
        features: [
            "10MB PDF validation",
            "Admin dashboard with caching",
            "Auto-archiving",
            "Automated folder management",
            "Excel export",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Google Drive API", "Bootstrap 5", "Chart.js"],
        liveUrl: "https://s.id/SIPERKAS",
        image: "/projects/siperkas-thumb.png",
    },
];

const categories: Category[] = ["All", "Team", "Individual"];

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
            <section className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filtered.map((project, idx) => {
                            const isDark = idx % 2 === 0;
                            return (
                                <motion.div
                                    key={project.title}
                                    variants={fadeUp}
                                    layout
                                    className={`group cursor-pointer rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col ${isDark
                                        ? "bg-gradient-to-br from-gray-900 to-black text-white shadow-xl hover:shadow-black/40"
                                        : "bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl text-gray-900"
                                        }`}
                                >
                                    {/* Project Visual Area */}
                                    <div className="relative overflow-hidden h-48 md:h-56 flex-shrink-0">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                        {/* Category Badge */}
                                        <span
                                            className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isDark
                                                ? "bg-black text-white border border-white/20"
                                                : "bg-white/80 text-gray-600 shadow-sm"
                                                }`}
                                        >
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                                        <h3
                                            className={`font-bold mb-3 group-hover:translate-x-1 transition-transform text-xl md:text-2xl leading-tight ${isDark ? "text-white" : "text-black"
                                                }`}
                                        >
                                            {project.title}
                                        </h3>
                                        <p
                                            className={`mb-4 leading-relaxed text-sm md:text-base ${isDark ? "text-gray-300" : "text-gray-600"
                                                }`}
                                        >
                                            {project.description}
                                        </p>

                                        {/* Features List */}
                                        <ul className="mb-6 space-y-2 flex-grow">
                                            {project.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start text-sm">
                                                    <span className={`mr-2 mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                                        •
                                                    </span>
                                                    <span className={`${isDark ? "text-gray-400" : "text-gray-700"}`}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${isDark
                                                        ? "bg-white/10 text-gray-300 border border-white/10"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div
                                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider mt-auto ${isDark ? "text-white/70" : "text-black"
                                                }`}
                                        >
                                            {project.liveUrl ? (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                                >
                                                    Visit Project
                                                    <span className="group-hover:translate-x-2 transition-transform">
                                                        →
                                                    </span>
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
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
