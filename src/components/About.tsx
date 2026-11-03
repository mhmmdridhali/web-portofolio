"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { techStack } from "@/data/techStack";

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

export default function About() {
    return (
        <section className="py-24 px-4 md:px-6 relative">
            {/* Main About Card */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 bg-white/85 backdrop-blur-md border border-white/60 p-8 md:p-16 rounded-[3rem] shadow-xl"
            >
                <motion.div variants={fadeUp} className="md:col-span-4">
                    <h3 className="text-3xl font-bold tracking-tight">About Me</h3>
                    <div className="w-12 h-1 bg-black mt-6"></div>
                </motion.div>
                <div className="md:col-span-8 text-lg text-neutral-600 leading-relaxed space-y-6">
                    <motion.p variants={fadeUp} className="text-left md:text-justify">
                        I studied{" "}
                        <span className="font-semibold text-black">
                            Mathematics Education
                        </span>{" "}
                        at{" "}
                        <span className="font-semibold text-black">
                            Universitas Lambung Mangkurat
                        </span>
                        , which mostly means I spent four years learning how to stare at
                        messy problems until they start making sense. Now I work as a{" "}
                        <span className="font-semibold text-black">Statistician</span>{" "}
                        in the{" "}
                        <span className="font-semibold text-black">
                            Government Sector
                        </span>
                        , wrangling education data for hundreds of madrasahs.
                    </motion.p>
                    <motion.p variants={fadeUp} className="text-left md:text-justify">
                        Most problems in my office don&apos;t need fancy cloud servers or
                        heavy tech stacks. I use{" "}
                        <span className="font-semibold text-black">
                            Google Apps Script
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-black">
                            Google Workspace
                        </span>{" "}
                        almost every day because they are free, quick to set up, and run
                        right inside the spreadsheets and docs everyone at work already
                        has open.
                    </motion.p>
                    <motion.p variants={fadeUp} className="text-left md:text-justify">
                        When a task refuses to stay inside a spreadsheet, I write{" "}
                        <span className="font-semibold text-black">Python</span> bots to
                        do the boring browser clicking for me, run{" "}
                        <span className="font-semibold text-black">Hermes Agent</span>{" "}
                        cron jobs for daily routines, and dump my notes into{" "}
                        <span className="font-semibold text-black">Obsidian</span> so
                        neither I nor my AI agents forget what we did yesterday. Whenever
                        I want to slow down, I write on{" "}
                        <span className="font-semibold text-black">Medium</span>.
                    </motion.p>
                </div>
            </motion.div>

            {/* MBTI Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="max-w-6xl mx-auto mt-12 grid md:grid-cols-12 gap-12 bg-white/85 backdrop-blur-md border border-white/60 p-8 md:p-16 rounded-[3rem] shadow-xl"
            >
                <div className="md:col-span-8 text-lg text-neutral-600 leading-relaxed space-y-6 flex flex-col justify-center order-last md:order-first">
                    <motion.div variants={fadeUp}>
                        <h4 className="text-2xl font-bold text-black mb-4">
                            ISTJ-A{" "}
                            <span className="text-neutral-500 font-normal">
                                | The Logistician
                            </span>
                        </h4>
                        <p className="text-left md:text-justify mb-4">
                            Hand me a chaotic folder of mismatched files and I will probably
                            have a great afternoon sorting it out. I genuinely enjoy turning
                            cluttered spreadsheets and repetitive admin chores into neat,
                            predictable systems.
                        </p>
                        <p className="text-left md:text-justify">
                            People sometimes think I look too serious at my desk, though
                            half the time I&apos;m just figuring out how to automate a
                            five-minute task so I never have to do it by hand again.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    variants={fadeUp}
                    className="md:col-span-4 flex flex-col items-center justify-center order-first md:order-last"
                >
                    <h3 className="text-3xl font-bold tracking-tight md:hidden mb-6 self-start">
                        My Personality
                    </h3>
                    <div className="w-12 h-1 bg-black mb-8 md:hidden self-start"></div>
                    <motion.img
                        src="/mbti_character.webp"
                        alt="ISTJ-A Character"
                        width={256}
                        height={256}
                        loading="lazy"
                        className="w-48 md:w-64 h-auto drop-shadow-2xl cursor-pointer"
                        animate={{ y: [0, -14, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05, rotate: 3 }}
                        whileTap={{ scale: 0.95 }}
                    />
                </motion.div>
            </motion.div>

            {/* Tech Stack Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="max-w-6xl mx-auto mt-20"
            >
                <motion.h3
                    variants={fadeUp}
                    className="text-3xl font-bold tracking-tight mb-3 text-center md:text-left"
                >
                    Tech Stack
                </motion.h3>
                <motion.div
                    variants={fadeUp}
                    className="w-12 h-1 bg-black mb-10 mx-auto md:mx-0"
                ></motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {techStack.map((tool) => (
                        <motion.div
                            key={tool.name}
                            variants={fadeUp}
                            whileHover={{ y: -6, scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="bg-white/85 backdrop-blur-md border border-white/60 px-5 py-5 rounded-2xl text-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer shadow-sm group flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                        >
                            <div className="w-16 h-16 flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={tool.iconUrl}
                                    alt={tool.name}
                                    width={42}
                                    height={42}
                                    loading="lazy"
                                    className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6 group-hover:invert"
                                />
                            </div>
                            <span className="text-xs font-semibold text-neutral-700 group-hover:text-white transition-colors relative z-10">
                                {tool.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
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
                        href="/about"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        More About Me
                        <span>→</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
