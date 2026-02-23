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
        <section className="py-24 px-4 md:px-6 relative">
            {/* Main About Card */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                whileHover={{ scale: 1.02, y: -5 }}
                className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 bg-white/60 backdrop-blur-xl border border-white/40 p-8 md:p-16 rounded-[3rem] shadow-xl"
            >
                <motion.div variants={fadeUp} className="md:col-span-4">
                    <h3 className="text-3xl font-bold tracking-tight">About Me</h3>
                    <div className="w-12 h-1 bg-black mt-6"></div>
                </motion.div>
                <div className="md:col-span-8 text-lg text-gray-600 leading-relaxed space-y-6">
                    <motion.p variants={fadeUp} className="text-justify">
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
                    <motion.p variants={fadeUp} className="text-justify">
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
                    <motion.p variants={fadeUp} className="text-justify">
                        Outside of work, I enjoy writing on{" "}
                        <span className="font-semibold text-black">Medium</span>.
                        It&apos;s my way of reflecting on things — sometimes about tech,
                        sometimes just random thoughts and life experiences. Writing
                        helps me organize my ideas and share what I&apos;ve learned
                        along the way.
                    </motion.p>
                </div>
            </motion.div>

            {/* MBTI Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                whileHover={{ scale: 1.02, y: -5 }}
                className="max-w-6xl mx-auto mt-12 grid md:grid-cols-12 gap-12 bg-white/60 backdrop-blur-xl border border-white/40 p-8 md:p-16 rounded-[3rem] shadow-xl"
            >
                <div className="md:col-span-8 text-lg text-gray-600 leading-relaxed space-y-6 flex flex-col justify-center order-last md:order-first">
                    <motion.div variants={fadeUp}>
                        <h4 className="text-2xl font-bold text-black mb-4">ISTJ-A <span className="text-gray-400 font-normal">| The Logistician</span></h4>
                        <p className="text-justify mb-4">
                            If there&apos;s one thing I love, it&apos;s taking a chaotic, messy problem and organizing it into a clean, logical system. I thrive on order and getting things done efficiently — basically, I&apos;m the person who actually enjoys building complex spreadsheets and automated workflows.
                        </p>
                        <p className="text-justify">
                            While I might seem a bit serious at first glance, I&apos;m usually just internally calculating the most optimal way to approach whatever is in front of me. I believe in consistency, reliability, and letting the data speak for itself.
                        </p>
                    </motion.div>
                </div>
                <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col items-center justify-center order-first md:order-last">
                    <h3 className="text-3xl font-bold tracking-tight md:hidden mb-6 self-start">My Personality</h3>
                    <div className="w-12 h-1 bg-black mb-8 md:hidden self-start"></div>
                    <motion.img
                        src="/mbti_character.png"
                        alt="ISTJ-A Character"
                        className="w-48 md:w-64 h-auto drop-shadow-2xl cursor-pointer"
                        animate={{ y: [0, -15, 0] }}
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
