"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        period: "Present",
        isCurrent: true,
        title: "Statistician",
        org: "Government Sector",
        description:
            "Handling and analyzing Islamic education data for the government. Specializing in data problem-solving, Google Apps Script automation, and database architecture to deliver efficient, high-impact solutions with minimal cost.",
    },
    {
        period: "Feb 2023 - Jun 2023",
        isCurrent: false,
        title: "Project Officer Intern",
        org: "Yayasan Hasnur Centre - HAFECS",
        description:
            "Assisted in managing 5 educational programs, handled schedules and work plans, and communicated effectively with over 600 participants and stakeholders.",
    },
    {
        period: "2022 - 2023",
        isCurrent: false,
        title: "Online Tutor",
        org: "Marbelika",
        description:
            "Provided online mathematics tutoring sessions, developed structured learning materials, and helped students improve their problem-solving and analytical skills.",
    },
    {
        period: "Mar 2022 - Feb 2023",
        isCurrent: false,
        title: "Head / Leader",
        org: "KSI Ulul Albab",
        description:
            "Led over 50 active members across multiple divisions, developed strategic programs, and established collaborations with 10+ Islamic organizations.",
    },
];

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
            staggerChildren: 0.15,
        },
    },
} as const;

export default function Experience() {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto">
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
                <motion.p variants={fadeUp} className="text-gray-500 mt-4">
                    My professional and organizational journey
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="relative border-l-2 border-gray-200 ml-4 md:ml-0 space-y-16"
            >
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        className="relative pl-10 md:pl-12"
                    >
                        <div
                            className={`absolute w-5 h-5 ${exp.isCurrent ? "bg-black shadow-md" : "bg-gray-300"
                                } rounded-full -left-[11px] top-1.5 border-4 border-white`}
                        ></div>
                        <div
                            className={`${exp.isCurrent
                                ? "bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl"
                                : "bg-white/50 p-8 rounded-2xl border border-gray-200 hover:bg-white hover:shadow-lg"
                                } hover:-translate-y-1 transition-all duration-300 group`}
                        >
                            {exp.isCurrent ? (
                                <span className="inline-block mb-3 text-xs font-bold text-white bg-black px-3 py-1 rounded-full">
                                    {exp.period}
                                </span>
                            ) : (
                                <span className="inline-block mb-3 text-sm font-semibold text-gray-500">
                                    {exp.period}
                                </span>
                            )}
                            <h4 className="text-2xl font-bold text-black group-hover:text-gray-600 transition-colors">
                                {exp.title}
                            </h4>
                            <p className="text-gray-500 font-medium mb-4">{exp.org}</p>
                            <p className="text-gray-600 leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
