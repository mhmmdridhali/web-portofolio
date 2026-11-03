"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, type ProjectItem } from "@/data/projects";
import ProjectDetailModal from "@/components/ProjectDetailModal";

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

function getProjectById(id: string): ProjectItem {
    const found = projects.find((p) => p.id === id);
    if (!found) {
        throw new Error(`Project with id "${id}" not found in projects.ts`);
    }
    return found;
}

export default function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
        null
    );

    const featuredMain = getProjectById("penmadbanjar");
    const rightTop = getProjectById("si-prima");
    const rightBottom = getProjectById("si-pelita");
    const bottomLeft = getProjectById("hermes-multi-agent");
    const bottomRight = getProjectById("monitor-bap-emis");

    return (
        <section className="py-24 px-4 md:px-6 relative">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="mb-16 text-center"
                >
                    <motion.h3
                        variants={fadeUp}
                        className="text-3xl font-bold tracking-tight"
                    >
                        Portfolio Gallery
                    </motion.h3>
                    <motion.p variants={fadeUp} className="text-neutral-600 mt-4">
                        Click any project card to explore its architecture, workflow &amp; impact
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-5 auto-rows-auto gap-4"
                >
                    {/* ============================================= */}
                    {/* LEFT FEATURED: Penmadbanjar.com (3 cols, 2 rows) */}
                    {/* ============================================= */}
                    <motion.div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedProject(featuredMain)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedProject(featuredMain);
                            }
                        }}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="md:col-span-3 md:row-span-2 bg-neutral-950 text-white rounded-3xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col border border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <div className="relative h-64 md:h-[340px] w-full overflow-hidden flex-shrink-0 bg-neutral-900 border-b border-neutral-800">
                            <Image
                                src={featuredMain.image}
                                alt={featuredMain.shortTitle}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                        </div>
                        <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-3 block">
                                    {featuredMain.category} Project
                                </span>
                                <h4 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:translate-x-1 transition-transform">
                                    {featuredMain.shortTitle}
                                </h4>
                                <p className="text-neutral-300 text-sm leading-relaxed mb-5 text-left md:text-justify">
                                    {featuredMain.description}
                                </p>
                                <ul className="mb-6 space-y-2.5 hidden md:block">
                                    {featuredMain.features.slice(0, 4).map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start text-xs text-neutral-300 leading-relaxed"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mr-3 mt-1.5 flex-shrink-0"></span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                <div className="flex gap-1.5 flex-wrap">
                                    {featuredMain.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/10 text-neutral-200 border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1">
                                    Details{" "}
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ============================================= */}
                    {/* RIGHT TOP: SI-PRIMA (2 cols, row 1) */}
                    {/* ============================================= */}
                    <motion.div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedProject(rightTop)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedProject(rightTop);
                            }
                        }}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="md:col-span-2 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <div className="relative h-36 md:h-40 w-full overflow-hidden flex-shrink-0 bg-neutral-50 border-b border-neutral-100">
                            <Image
                                src={rightTop.image}
                                alt={rightTop.shortTitle}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                                ↗
                            </div>
                        </div>
                        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                                    {rightTop.category}
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black group-hover:translate-x-0.5 transition-transform">
                                    {rightTop.shortTitle}
                                </h4>
                                <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                                    {rightTop.bentoSummary}
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {rightTop.tech.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ============================================= */}
                    {/* RIGHT BOTTOM: SI-PELITA (2 cols, row 2) */}
                    {/* ============================================= */}
                    <motion.div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedProject(rightBottom)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedProject(rightBottom);
                            }
                        }}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="md:col-span-2 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <div className="relative h-36 md:h-40 w-full overflow-hidden flex-shrink-0 bg-neutral-50 border-b border-neutral-100">
                            <Image
                                src={rightBottom.image}
                                alt={rightBottom.shortTitle}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                                ↗
                            </div>
                        </div>
                        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                                    {rightBottom.category}
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black group-hover:translate-x-0.5 transition-transform">
                                    {rightBottom.shortTitle}
                                </h4>
                                <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                                    {rightBottom.bentoSummary}
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {rightBottom.tech.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ============================================= */}
                    {/* BOTTOM LEFT: Hermes Multi-Agent Ecosystem (3 cols, horizontal) */}
                    {/* ============================================= */}
                    <motion.div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedProject(bottomLeft)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedProject(bottomLeft);
                            }
                        }}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="md:col-span-3 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow sm:w-1/2">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                                    {bottomLeft.category}
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black group-hover:translate-x-0.5 transition-transform">
                                    {bottomLeft.shortTitle}
                                </h4>
                                <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                                    {bottomLeft.bentoSummary}
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {bottomLeft.tech.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-48 sm:h-auto sm:w-1/2 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-neutral-200 bg-neutral-900 overflow-hidden flex items-center justify-center">
                            <Image
                                src={bottomLeft.image}
                                alt={bottomLeft.shortTitle}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                                ↗
                            </div>
                        </div>
                    </motion.div>

                    {/* ============================================= */}
                    {/* BOTTOM RIGHT: Monitor BAP EMIS (2 cols, horizontal) */}
                    {/* ============================================= */}
                    <motion.div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedProject(bottomRight)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedProject(bottomRight);
                            }
                        }}
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="md:col-span-2 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow sm:w-1/2">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
                                    {bottomRight.category}
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black group-hover:translate-x-0.5 transition-transform">
                                    {bottomRight.shortTitle}
                                </h4>
                                <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                                    {bottomRight.bentoSummary}
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {bottomRight.tech.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-48 sm:h-auto sm:w-1/2 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center">
                            <Image
                                src={bottomRight.image}
                                alt={bottomRight.shortTitle}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                                ↗
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* View All Projects Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-10 text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-block"
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-lg tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            View All {projects.length} Projects
                            <span>→</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
