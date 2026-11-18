"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences, type ExperienceItem } from "@/data/experience";

export interface ExperienceTimelineProps {
    items?: ExperienceItem[];
    variant?: "compact" | "full";
    className?: string;
}

const cardFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
} as const;

export default function ExperienceTimeline({
    items = experiences,
    variant = "full",
    className = "",
}: ExperienceTimelineProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "end 60%"],
    });

    const beamScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const beamOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            {/* Vertical Track + Scroll-Driven Monochrome Ink Beam */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-5 md:left-6 -translate-x-1/2 top-4 bottom-4 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-200 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
            >
                <motion.div
                    style={{
                        scaleY: beamScaleY,
                        opacity: beamOpacity,
                    }}
                    className="w-full h-full origin-top bg-gradient-to-t from-black via-neutral-700 to-transparent rounded-full will-change-transform"
                />
            </div>

            <div className="space-y-10 md:space-y-16">
                {items.map((exp) => (
                    <div
                        key={`${exp.org}-${exp.title}`}
                        className="relative flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-12"
                    >
                        {/* Left Column: Node Indicator + Sticky Period Header */}
                        <div className="relative md:sticky md:top-32 z-20 flex flex-col md:w-60 lg:w-68 shrink-0 self-start">
                            {/* Node Indicator aligned on the track centerline */}
                            <div
                                aria-hidden="true"
                                className="absolute left-5 md:left-6 -translate-x-1/2 top-0 md:top-1 w-10 h-10 rounded-full bg-white border border-neutral-200/90 shadow-sm flex items-center justify-center"
                            >
                                <div
                                    className={
                                        exp.isCurrent
                                            ? "w-3.5 h-3.5 rounded-full bg-black ring-4 ring-black/15"
                                            : "w-3 h-3 rounded-full bg-neutral-300 border border-neutral-400"
                                    }
                                />
                            </div>

                            {/* Desktop Sticky Header */}
                            <div className="hidden md:flex flex-col pl-16">
                                <span
                                    className={`text-3xl lg:text-4xl font-extrabold tracking-tight tabular-nums leading-none ${
                                        exp.isCurrent ? "text-black" : "text-neutral-500"
                                    }`}
                                >
                                    {exp.yearLabel}
                                </span>
                                <span className="text-xs font-semibold text-neutral-500 tabular-nums mt-2">
                                    {exp.subPeriod}
                                </span>
                                <span
                                    className={`inline-flex self-start mt-3 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                        exp.isCurrent
                                            ? "bg-black text-white"
                                            : "bg-neutral-200/80 text-neutral-700"
                                    }`}
                                >
                                    {exp.type}
                                </span>
                            </div>

                            {/* Mobile Header */}
                            <div className="flex md:hidden flex-col pl-14 mb-4">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="text-2xl font-extrabold tracking-tight tabular-nums text-black leading-none">
                                        {exp.yearLabel}
                                    </span>
                                    <span
                                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                            exp.isCurrent
                                                ? "bg-black text-white"
                                                : "bg-neutral-200/80 text-neutral-700"
                                        }`}
                                    >
                                        {exp.type}
                                    </span>
                                </div>
                                <span className="text-xs font-semibold text-neutral-500 tabular-nums mt-1.5">
                                    {exp.subPeriod}
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Monochrome Bento Card */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={cardFadeUp}
                            className="flex-1 pl-14 md:pl-0 min-w-0"
                        >
                            <div
                                className={`rounded-[2rem] transition-transform transition-shadow duration-300 hover:-translate-y-1 ${
                                    variant === "compact" ? "p-7 md:p-8" : "p-7 md:p-10"
                                } ${
                                    exp.isCurrent
                                        ? "bg-gradient-to-br from-neutral-900 to-black text-white shadow-2xl border border-white/10"
                                        : "bg-white/85 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl"
                                }`}
                            >
                                <h4
                                    className={`font-bold mb-1.5 ${
                                        variant === "compact"
                                            ? "text-xl md:text-2xl"
                                            : "text-2xl md:text-3xl mb-2"
                                    } ${exp.isCurrent ? "text-white" : "text-black"}`}
                                >
                                    {exp.title}
                                </h4>
                                <p
                                    className={`font-medium mb-4 ${
                                        variant === "compact"
                                            ? "text-sm md:text-base"
                                            : "text-base md:text-lg"
                                    } ${exp.isCurrent ? "text-neutral-300" : "text-neutral-500"}`}
                                >
                                    {exp.org}
                                </p>
                                <p
                                    className={`leading-relaxed text-left md:text-justify ${
                                        variant === "full" ? "mb-6" : ""
                                    } ${exp.isCurrent ? "text-neutral-300" : "text-neutral-600"}`}
                                >
                                    {exp.description}
                                </p>

                                {variant === "full" && (
                                    <>
                                        {/* Achievements */}
                                        <div className="space-y-3 mb-6">
                                            {exp.achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span
                                                        aria-hidden="true"
                                                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                                            exp.isCurrent
                                                                ? "bg-white/60"
                                                                : "bg-black"
                                                        }`}
                                                    />
                                                    <span
                                                        className={`text-sm leading-relaxed ${
                                                            exp.isCurrent
                                                                ? "text-neutral-300"
                                                                : "text-neutral-600"
                                                        }`}
                                                    >
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                                        exp.isCurrent
                                                            ? "bg-white/10 text-neutral-200 border border-white/10"
                                                            : "bg-neutral-100 text-neutral-700"
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
