"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { experienceStats as stats } from "@/data/experience";
import ExperienceTimeline from "@/components/ui/timeline";

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
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <ExperienceTimeline variant="full" headingLevel="h2" />
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
                            className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-transform transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            See My Work →
                        </Link>
                        <Link
                            href="/#contact"
                            className="px-8 py-3 bg-white border border-neutral-300 text-black font-medium rounded-full hover:bg-neutral-50 transition-transform transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
