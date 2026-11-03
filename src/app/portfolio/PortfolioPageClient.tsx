"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects, type ProjectItem, type ProjectCategory } from "@/data/projects";
import ProjectDetailModal from "@/components/ProjectDetailModal";

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
        transition: { staggerChildren: 0.08 },
    },
} as const;

type FilterCategory = "All" | ProjectCategory;

const categories: FilterCategory[] = ["All", "Team", "Individual"];

export default function PortfolioPageClient() {
    const [active, setActive] = useState<FilterCategory>("All");
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
        null
    );

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
                        className="inline-block px-4 py-1.5 rounded-full border border-neutral-300 bg-white/85 text-xs font-semibold tracking-widest uppercase mb-6 text-neutral-600 tabular-nums"
                    >
                        Selected Work ({projects.length} Projects)
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                    >
                        Portfolio{" "}
                        <span className="text-neutral-400">Gallery</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-neutral-600 leading-relaxed max-w-2xl"
                    >
                        Google Apps Script web apps, Python browser bots, and AI agent
                        workflows I built for daily work and personal projects. Click any
                        card to see the problem, solution, and how it works under the hood.
                    </motion.p>
                </motion.div>
            </section>

            {/* Category Filters */}
            <section className="max-w-6xl mx-auto px-6 mb-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex flex-wrap gap-3"
                >
                    {categories.map((cat) => {
                        const count =
                            cat === "All"
                                ? projects.length
                                : projects.filter((p) => p.category === cat).length;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActive(cat)}
                                className={`relative min-h-[44px] px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                                    active === cat
                                        ? "bg-black text-white shadow-lg"
                                        : "bg-white/85 backdrop-blur-md border border-neutral-200/80 text-neutral-600 hover:bg-black hover:text-white"
                                }`}
                            >
                                <span>{cat}</span>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full tabular-nums ${
                                        active === cat
                                            ? "bg-white/20 text-white"
                                            : "bg-neutral-100 text-neutral-600"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
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
                                    key={project.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedProject(project)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedProject(project);
                                        }
                                    }}
                                    variants={fadeUp}
                                    whileHover={{ y: -6 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={`group cursor-pointer rounded-[2rem] overflow-hidden transition-shadow duration-300 flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                                        isDark
                                            ? "bg-gradient-to-br from-neutral-900 to-black text-white shadow-xl hover:shadow-2xl border border-white/10"
                                            : "bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-lg hover:shadow-xl text-neutral-900"
                                    }`}
                                >
                                    {/* Project Visual Area */}
                                    <div className="relative overflow-hidden h-48 md:h-56 flex-shrink-0">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            priority={idx < 3}
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                        {/* Category Badge */}
                                        <span
                                            className={`absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                                isDark
                                                    ? "bg-black/85 text-white border border-white/20"
                                                    : "bg-white/95 text-neutral-700 shadow-sm"
                                            }`}
                                        >
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                                        <h3
                                            className={`font-bold mb-3 group-hover:translate-x-1 transition-transform text-xl md:text-2xl leading-tight ${
                                                isDark ? "text-white" : "text-black"
                                            }`}
                                        >
                                            {project.title}
                                        </h3>
                                        <p
                                            className={`mb-4 leading-relaxed text-sm md:text-base line-clamp-3 ${
                                                isDark ? "text-neutral-300" : "text-neutral-600"
                                            }`}
                                        >
                                            {project.description}
                                        </p>

                                        {/* Features List */}
                                        <ul className="mb-6 space-y-2 flex-grow">
                                            {project.features.slice(0, 4).map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start text-sm">
                                                    <span
                                                        className={`mr-2 mt-0.5 ${
                                                            isDark
                                                                ? "text-neutral-400"
                                                                : "text-neutral-400"
                                                        }`}
                                                    >
                                                        •
                                                    </span>
                                                    <span
                                                        className={`${
                                                            isDark
                                                                ? "text-neutral-300"
                                                                : "text-neutral-700"
                                                        }`}
                                                    >
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
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                                        isDark
                                                            ? "bg-white/10 text-neutral-200 border border-white/10"
                                                            : "bg-neutral-100 text-neutral-700"
                                                    }`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer Actions */}
                                        <div
                                            className={`flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider mt-auto pt-4 border-t ${
                                                isDark
                                                    ? "border-white/10 text-white/90"
                                                    : "border-neutral-200/80 text-black"
                                            }`}
                                        >
                                            <span className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                                                View Details <span>→</span>
                                            </span>

                                            {project.liveUrl ? (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={`px-3 py-1 rounded-full text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${
                                                        isDark
                                                            ? "bg-white/15 hover:bg-white/25 text-white"
                                                            : "bg-black/5 hover:bg-black/15 text-black"
                                                    }`}
                                                >
                                                    Live ↗
                                                </a>
                                            ) : (
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                                        isDark
                                                            ? "bg-white/10 text-neutral-300"
                                                            : "bg-neutral-100 text-neutral-600"
                                                    }`}
                                                >
                                                    Internal
                                                </span>
                                            )}
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
                    <p className="text-neutral-600 mb-6">
                        Read my thoughts on building these tools.
                    </p>
                    <Link
                        href="/articles"
                        className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Read Articles →
                    </Link>
                </motion.div>
            </section>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}
