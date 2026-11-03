"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { experiences } from "@/data/experience";

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
            staggerChildren: 0.12,
        },
    },
} as const;

export default function Experience() {
    return (
        <section className="py-24 px-4 md:px-6 max-w-4xl mx-auto">
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
                    Experience
                </motion.h3>
                <motion.p variants={fadeUp} className="text-neutral-600 mt-4">
                    My professional and organizational journey
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="relative border-l-2 border-neutral-200 ml-4 md:ml-0 space-y-16"
            >
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        className="relative pl-10 md:pl-12"
                    >
                        <div
                            className={`absolute w-5 h-5 ${
                                exp.isCurrent ? "bg-black shadow-md" : "bg-neutral-300"
                            } rounded-full -left-[11px] top-1.5 border-4 border-white`}
                        ></div>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className={`${
                                exp.isCurrent
                                    ? "bg-white p-8 rounded-2xl shadow-lg border border-neutral-200/80 hover:shadow-xl"
                                    : "bg-white/75 p-8 rounded-2xl border border-neutral-200 hover:bg-white hover:shadow-lg"
                            } transition-all duration-300 group`}
                        >
                            {exp.isCurrent ? (
                                <span className="inline-block mb-3 text-xs font-bold text-white bg-black px-3 py-1 rounded-full tabular-nums">
                                    {exp.period}
                                </span>
                            ) : (
                                <span className="inline-block mb-3 text-sm font-semibold text-neutral-500 tabular-nums">
                                    {exp.period}
                                </span>
                            )}
                            <h4 className="text-2xl font-bold text-black group-hover:text-neutral-700 transition-colors">
                                {exp.title}
                            </h4>
                            <p className="text-neutral-500 font-medium mb-4">{exp.org}</p>
                            <p className="text-neutral-600 leading-relaxed text-left md:text-justify">
                                {exp.description}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mt-16 text-center"
            >
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-block"
                >
                    <Link
                        href="/experience"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        View Full Experience
                        <span>→</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
