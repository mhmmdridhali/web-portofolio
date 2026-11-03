"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { experiences, experienceStats as stats } from "@/data/experience";

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
        transition: { staggerChildren: 0.1 },
    },
} as const;

const slideIn = {
    hidden: { opacity: 0, x: -32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
} as const;

export default function ExperiencePageClient() {
    return (
        <div className="pt-28 pb-24">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.div
                        variants={fadeUp}
                        className="inline-block px-4 py-1.5 rounded-full border border-neutral-300 bg-white/85 text-xs font-semibold tracking-widest uppercase mb-6 text-neutral-600"
                    >
                        Career Journey
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                    >
                        Experience &{" "}
                        <span className="text-neutral-400">Leadership</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-neutral-600 leading-relaxed max-w-2xl"
                    >
                        My path from campus organizations and math tutoring to building
                        data tools and workflow automations in the public sector.
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
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group bg-white/85 backdrop-blur-md border border-white/60 p-6 rounded-2xl text-center shadow-sm hover:bg-black hover:text-white hover:shadow-xl transition-colors duration-300 cursor-default"
                        >
                            <div className="text-3xl md:text-4xl font-extrabold text-black group-hover:text-white mb-1 tabular-nums transition-colors">
                                {s.value}
                            </div>
                            <div className="text-sm text-neutral-600 group-hover:text-neutral-300 font-medium transition-colors">
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
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-neutral-200"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={slideIn}
                                className="relative pl-14 md:pl-20"
                            >
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute left-2 md:left-6 top-8 w-5 h-5 rounded-full border-4 border-white shadow-md ${
                                        exp.isCurrent ? "bg-black" : "bg-neutral-300"
                                    }`}
                                ></div>
                                {/* Connector line from dot */}
                                <div className="absolute left-7 md:left-11 top-[2.35rem] w-5 md:w-7 h-0.5 bg-neutral-200"></div>

                                {/* Card */}
                                <div
                                    className={`rounded-[2rem] overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                                        exp.isCurrent
                                            ? "bg-gradient-to-br from-neutral-900 to-black text-white shadow-2xl border border-white/10"
                                            : "bg-white/85 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl"
                                    }`}
                                >
                                    {/* Card Header */}
                                    <div className="p-8 md:p-10">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            {exp.isCurrent ? (
                                                <span className="text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm tabular-nums">
                                                    {exp.period}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                                                    {exp.period}
                                                </span>
                                            )}
                                            <span
                                                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                                    exp.isCurrent
                                                        ? "bg-white/10 text-neutral-300"
                                                        : "bg-neutral-100 text-neutral-600"
                                                }`}
                                            >
                                                {exp.type}
                                            </span>
                                        </div>
                                        <h3
                                            className={`text-2xl md:text-3xl font-bold mb-2 ${
                                                exp.isCurrent ? "text-white" : "text-black"
                                            }`}
                                        >
                                            {exp.title}
                                        </h3>
                                        <p
                                            className={`text-lg font-medium mb-4 ${
                                                exp.isCurrent ? "text-neutral-300" : "text-neutral-500"
                                            }`}
                                        >
                                            {exp.org}
                                        </p>
                                        <p
                                            className={`leading-relaxed mb-6 text-left md:text-justify ${
                                                exp.isCurrent ? "text-neutral-300" : "text-neutral-600"
                                            }`}
                                        >
                                            {exp.description}
                                        </p>

                                        {/* Achievements */}
                                        <div className="space-y-3 mb-6">
                                            {exp.achievements.map((a, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span
                                                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                            exp.isCurrent ? "bg-white/60" : "bg-black"
                                                        }`}
                                                    ></span>
                                                    <span
                                                        className={`text-sm leading-relaxed ${
                                                            exp.isCurrent
                                                                ? "text-neutral-300"
                                                                : "text-neutral-600"
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
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                                        exp.isCurrent
                                                            ? "bg-white/10 text-neutral-200 border border-white/10"
                                                            : "bg-neutral-100 text-neutral-700"
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
                    <p className="text-neutral-600 mb-6">
                        Interested in working together?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/portfolio"
                            className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            See My Work →
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-8 py-3 bg-white border border-neutral-300 text-black font-medium rounded-full hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
