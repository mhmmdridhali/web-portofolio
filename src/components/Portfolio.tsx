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
        <section className="py-24 px-6 relative">
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
                    className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6"
                >
                    {/* Main Featured Project (Span 2 Cols, 2 Rows) */}
                    <motion.div
                        variants={fadeUp}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-2xl hover:shadow-black/40 transition-shadow duration-300"
                    >
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 block">
                                    Work Project
                                </span>
                                <h4 className="text-3xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                                    Data Automation System
                                </h4>
                                <p className="text-gray-300 max-w-md text-lg">
                                    Automated reporting workflows using Google Apps Script and
                                    database-driven solutions to minimize cost and maximize
                                    efficiency.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium mt-6 group-hover:text-gray-300">
                                Explore Project{" "}
                                <span className="group-hover:translate-x-2 transition-transform">
                                    →
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Project 1 */}
                    <motion.div
                        variants={fadeUp}
                        className="md:col-span-1 md:row-span-1 bg-white p-8 rounded-[2rem] border border-gray-200 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                Work Project
                            </span>
                            <h4 className="text-xl font-bold mb-2">Statistical Dashboard</h4>
                            <p className="text-gray-600 text-sm">
                                Database architecture and visualization for tracking key
                                metrics.
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors mt-4">
                            ↗
                        </div>
                    </motion.div>

                    {/* Vibe Coding 1 */}
                    <motion.div
                        variants={fadeUp}
                        className="md:col-span-1 md:row-span-1 bg-gray-200 p-8 rounded-[2rem] group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3 block">
                                Vibe Coding
                            </span>
                            <h4 className="text-xl font-bold mb-2">
                                Minimalist Task Manager
                            </h4>
                            <p className="text-gray-700 text-sm">
                                Functional web app built for state management exploration.
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors mt-4">
                            ↗
                        </div>
                    </motion.div>

                    {/* Vibe Coding 2 (Full Width) */}
                    <motion.div
                        variants={fadeUp}
                        className="md:col-span-3 md:row-span-1 bg-white p-8 rounded-[2rem] border border-gray-200 group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-end"
                    >
                        <div className="max-w-2xl">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                Vibe Coding
                            </span>
                            <h4 className="text-2xl font-bold mb-3">API Data Visualizer</h4>
                            <p className="text-gray-600">
                                Frontend prototype designed to fetch, parse, and beautifully
                                display public dataset endpoints in real-time.
                            </p>
                        </div>
                        <button className="mt-6 md:mt-0 px-6 py-3 bg-gray-100 text-black font-medium rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                            View Details
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
