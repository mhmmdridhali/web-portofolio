"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
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

export default function Portfolio() {
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
                    <motion.p variants={fadeUp} className="text-gray-500 mt-4">
                        A collection of my professional and experimental work
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
                    <motion.a
                        href="https://penmadbanjar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUp}
                        whileHover={{ scale: 1.015, y: -3 }}
                        className="md:col-span-3 md:row-span-2 bg-neutral-950 text-white rounded-3xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col border border-white/5"
                    >
                        <div className="relative h-64 md:h-[340px] w-full overflow-hidden flex-shrink-0 bg-neutral-900 border-b border-neutral-800">
                            <Image
                                src="/projects/penmadbanjar-thumb.png"
                                alt="Penmadbanjar.com"
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                        </div>
                        <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 block">
                                    Team Project
                                </span>
                                <h4 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:translate-x-1 transition-transform">
                                    Penmadbanjar.com
                                </h4>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-5 text-justify">
                                    Designed and developed the official web portal for the Madrasah Education Section of the Ministry of Religious Affairs in Banjar Regency. This robust platform centralizes all manual information dissemination and administrative services into a unified digital system, dramatically maximizing operational efficiency and minimizing costs for the local government.
                                </p>
                                <ul className="mb-6 space-y-2.5 hidden md:block">
                                    {[
                                        "Comprehensive responsive public interface & securely authenticated modern admin panel",
                                        "Performance optimized with Pure CSS animations & First Load JS kept remarkably under 130kB",
                                        "Automated technical SEO infrastructure & integrated rich text editor for content management",
                                        "Robust internal architecture designed for seamless future scalability and data integrations",
                                    ].map((f) => (
                                        <li key={f} className="flex items-start text-xs text-neutral-500 leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-3 mt-1 flex-shrink-0"></span> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <div className="flex gap-1.5 flex-wrap">
                                    {["Next.js 14", "TypeScript", "Tailwind CSS"].map((tech) => (
                                        <span key={tech} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1">
                                    View <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                            </div>
                        </div>
                    </motion.a>

                    {/* ============================================= */}
                    {/* RIGHT TOP: SI-PELITA (2 cols, row 1) */}
                    {/* ============================================= */}
                    <motion.a
                        href="https://s.id/SIPELITA"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="md:col-span-2 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
                    >
                        <div className="relative h-36 md:h-40 w-full overflow-hidden flex-shrink-0 bg-neutral-50 border-b border-neutral-100">
                            <Image
                                src="/projects/sipelita-thumb.png"
                                alt="SI-PELITA"
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
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
                                    Individual
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black">SI-PELITA</h4>
                                <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                    Web-based helpdesk centralizing student data correction requests. Built on Google Workspace with serverless architecture.
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {["Apps Script", "Bootstrap"].map((tech) => (
                                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.a>

                    {/* ============================================= */}
                    {/* RIGHT BOTTOM: SI-PERKAS (2 cols, row 2) */}
                    {/* ============================================= */}
                    <motion.a
                        href="https://s.id/SIPERKAS"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="md:col-span-2 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
                    >
                        <div className="relative h-36 md:h-40 w-full overflow-hidden flex-shrink-0 bg-neutral-50 border-b border-neutral-100">
                            <Image
                                src="/projects/siperkas-thumb.png"
                                alt="SI-PERKAS"
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
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
                                    Individual
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black">SI-PERKAS</h4>
                                <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                    Integrated digital system for collecting & verifying teacher professional allowance documents.
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {["Apps Script", "Drive API", "Bootstrap 5"].map((tech) => (
                                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.a>

                    {/* ============================================= */}
                    {/* BOTTOM LEFT: Taskly (3 cols, horizontal) */}
                    {/* ============================================= */}
                    <motion.a
                        href="https://taskly.muhammadaliridho.my.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUp}
                        whileHover={{ scale: 1.015, y: -3 }}
                        className="md:col-span-3 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative"
                    >
                        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow sm:w-1/2">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
                                    Individual
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black">Taskly</h4>
                                <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                    Full-stack personal to-do list app with Neobrutalism design, real-time task management, live user counter, and Google OAuth PKCE flow.
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {["Next.js", "Supabase", "Tailwind"].map((tech) => (
                                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-48 sm:h-auto sm:w-1/2 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center">
                            <Image
                                src="/projects/taskly-thumb.png"
                                alt="Taskly"
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                                ↗
                            </div>
                        </div>
                    </motion.a>

                    {/* ============================================= */}
                    {/* BOTTOM RIGHT: Pojok Statistik (2 cols, horizontal) */}
                    {/* ============================================= */}
                    <motion.a
                        href="https://lookerstudio.google.com/u/0/reporting/0ea71311-8249-426c-9d96-067c1c282713/page/YOWYF"
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="md:col-span-2 bg-white rounded-3xl border border-neutral-200 group cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative"
                    >
                        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow sm:w-1/2">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
                                    Individual
                                </span>
                                <h4 className="text-lg font-bold mb-1.5 text-black">Pojok Statistik Madrasah</h4>
                                <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                    Interactive data dashboard for Banjar Regency madrasah education statistics. Replaced static reports with real-time public insights powered by EMIS data.
                                </p>
                            </div>
                            <div className="flex gap-1.5 flex-wrap mt-auto">
                                {["Looker Studio", "Google Sheets"].map((tech) => (
                                    <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-48 sm:h-auto sm:w-1/2 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center">
                            <Image
                                src="/projects/pojokstatistik-thumb.png"
                                alt="Pojok Statistik Madrasah Kab. Banjar"
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-black flex items-center justify-center opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium">
                                ↗
                            </div>
                        </div>
                    </motion.a>
                </motion.div>

                {/* View All Projects Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-10 text-center"
                >
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        View All Projects
                        <span>→</span>
                    </a>
                </motion.div>
            </div>
        </section >
    );
}
