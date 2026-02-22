"use client";

import { motion } from "framer-motion";

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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {/* Main Featured Project: Penmadbanjar.com */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="md:col-span-2 md:row-span-1 lg:row-span-2 bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-2xl hover:shadow-black/40 transition-shadow duration-300 flex flex-col justify-between"
                    >
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 block">
                                    Work Project
                                </span>
                                <h4 className="text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                                    Penmadbanjar.com (Madrasah Education Web Portal)
                                </h4>
                                <p className="text-gray-300 max-w-xl text-lg mb-6 text-justify">
                                    Official web portal centralizing information and administrative services for the government education sector.
                                </p>
                                {/* Features list for featured project */}
                                <ul className="mb-6 space-y-2 hidden md:block">
                                    {[
                                        "Responsive public interface & modern admin panel",
                                        "Pure CSS animations & First Load JS under 130kB",
                                        "Automated SEO & integrated text editor",
                                    ].map((f) => (
                                        <li key={f} className="flex items-center text-sm text-gray-400">
                                            <span className="mr-2">•</span> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
                                <div className="flex gap-2 flex-wrap mb-4 sm:mb-0">
                                    {["Next.js 14", "TypeScript", "Tailwind CSS"].map((tech) => (
                                        <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:text-gray-300">
                                    Explore Project{" "}
                                    <span className="group-hover:translate-x-2 transition-transform">
                                        →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Project 1: SI-PELITA */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="md:col-span-1 md:row-span-1 bg-white p-8 rounded-[2rem] border border-gray-200 group cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                Work Project
                            </span>
                            <h4 className="text-xl font-bold mb-2">SI-PELITA</h4>
                            <p className="text-gray-600 text-sm mb-4 text-justify">
                                Centralized web-based helpdesk application for student data correction requests.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {["Google Apps Script", "Bootstrap"].map((tech) => (
                                    <span key={tech} className="text-xs font-medium px-2 py-1 flex-shrink-0 rounded-full bg-gray-100 text-gray-600">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors mt-6">
                            ↗
                        </div>
                    </motion.div>

                    {/* Secondary Project 2: SI-PERKAS */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="md:col-span-1 md:row-span-1 bg-gray-100 p-8 rounded-[2rem] group cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                Work Project
                            </span>
                            <h4 className="text-xl font-bold mb-2">SI-PERKAS</h4>
                            <p className="text-gray-600 text-sm mb-4 text-justify">
                                Integrated digital system for collecting and verifying document files for teacher allowances.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {["Google Apps Script", "Chart.js"].map((tech) => (
                                    <span key={tech} className="text-xs font-medium px-2 py-1 flex-shrink-0 rounded-full bg-white text-gray-600 border border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors mt-6">
                            ↗
                        </div>
                    </motion.div>
                </motion.div>

                {/* View All Projects Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-12 text-center"
                >
                    <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        View All Projects
                        <span>→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
