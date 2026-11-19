"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ExperienceTimeline from "@/components/ui/timeline";

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
        <section className="py-24 px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="mb-16 text-center"
            >
                <motion.h2
                    variants={fadeUp}
                    className="text-3xl font-bold tracking-tight"
                >
                    Experience
                </motion.h2>
                <motion.p variants={fadeUp} className="text-neutral-600 mt-4">
                    My professional and organizational journey
                </motion.p>
            </motion.div>

            <ExperienceTimeline variant="compact" />

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
