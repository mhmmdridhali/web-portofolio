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

const techStack = [
    { name: "Google Apps Script", icon: "⚡" },
    { name: "Looker Studio", icon: "📊" },
    { name: "n8n", icon: "🔄" },
    { name: "MySQL", icon: "🗄️" },
    { name: "Google Workspace", icon: "☁️" },
    { name: "Next JS", icon: "▲" },
    { name: "Tailwind CSS", icon: "🎨" },
];

export default function About() {
    return (
        <section className="py-24 px-6 relative">
            {/* Main About Card */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 bg-white/60 backdrop-blur-xl border border-white/40 p-10 md:p-16 rounded-[3rem] shadow-xl"
            >
                <motion.div variants={fadeUp} className="md:col-span-4">
                    <h3 className="text-3xl font-bold tracking-tight">About Me</h3>
                    <div className="w-12 h-1 bg-black mt-6"></div>
                </motion.div>
                <div className="md:col-span-8 text-lg text-gray-600 leading-relaxed space-y-6">
                    <motion.p variants={fadeUp}>
                        I studied{" "}
                        <span className="font-semibold text-black">
                            Mathematics Education
                        </span>{" "}
                        at{" "}
                        <span className="font-semibold text-black">
                            Universitas Lambung Mangkurat
                        </span>
                        . That background taught me how to think logically and break
                        down complex problems into simple steps.
                    </motion.p>
                    <motion.p variants={fadeUp}>
                        Right now, I work as a{" "}
                        <span className="font-semibold text-black">Statistician</span>{" "}
                        in the{" "}
                        <span className="font-semibold text-black">
                            Government Sector
                        </span>
                        . My day-to-day job is pretty straightforward — I analyze data
                        to help government operations run smoother. I build tools using{" "}
                        <span className="font-semibold text-black">
                            Google Apps Script
                        </span>{" "}
                        that automate repetitive tasks, so people can focus on what
                        actually matters.
                    </motion.p>
                    <motion.p variants={fadeUp}>
                        Outside of work, I enjoy writing on{" "}
                        <span className="font-semibold text-black">Medium</span>.
                        It&apos;s my way of reflecting on things — sometimes about tech,
                        sometimes just random thoughts and life experiences. Writing
                        helps me organize my ideas and share what I&apos;ve learned
                        along the way.
                    </motion.p>
                </div>
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
                    className="text-3xl font-bold tracking-tight mb-3"
                >
                    Tech Stack
                </motion.h3>
                <motion.div
                    variants={fadeUp}
                    className="w-12 h-1 bg-black mb-10"
                ></motion.div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {techStack.map((tool) => (
                        <motion.div
                            key={tool.name}
                            variants={fadeUp}
                            className="bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-5 rounded-2xl text-center hover:bg-black hover:text-white transition-all duration-300 cursor-default shadow-sm group"
                        >
                            <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform duration-300">
                                {tool.icon}
                            </span>
                            <span className="text-xs font-semibold text-gray-700 group-hover:text-white transition-colors">
                                {tool.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
