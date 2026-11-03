"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Lock, Layers, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import type { ProjectItem } from "@/data/projects";

interface ProjectDetailModalProps {
    project: ProjectItem | null;
    onClose: () => void;
}

export default function ProjectDetailModal({
    project,
    onClose,
}: ProjectDetailModalProps) {
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!project) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        // Move focus into the dialog close button for keyboard users
        const focusTimer = setTimeout(() => {
            closeBtnRef.current?.focus();
        }, 50);

        return () => {
            clearTimeout(focusTimer);
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/65 backdrop-blur-md"
                        aria-hidden="true"
                    />

                    {/* Modal Dialog */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-project-title"
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl border border-neutral-200 overflow-hidden flex flex-col"
                    >
                        {/* Top Image Header */}
                        <div className="relative h-52 sm:h-72 w-full bg-neutral-900 flex-shrink-0 border-b border-neutral-200 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 896px) 100vw, 896px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                            {/* Category Pill */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/15">
                                    {project.category} Project
                                </span>
                            </div>

                            {/* Close Button */}
                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={onClose}
                                aria-label="Close project details"
                                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-transform hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Title Overlay */}
                            <div className="absolute bottom-4 left-6 right-6 text-white">
                                <h2
                                    id="modal-project-title"
                                    className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight drop-shadow-sm"
                                >
                                    {project.title}
                                </h2>
                            </div>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Overview */}
                            <div>
                                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed text-left md:text-justify">
                                    {project.description}
                                </p>
                            </div>

                            {/* The Challenge & The Solution */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 sm:p-6">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2.5">
                                        <AlertCircle className="w-4 h-4 text-neutral-800" />
                                        <span>The Challenge</span>
                                    </div>
                                    <p className="text-neutral-700 text-sm leading-relaxed text-left md:text-justify">
                                        {project.challenge}
                                    </p>
                                </div>

                                <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                                        <Sparkles className="w-4 h-4 text-white" />
                                        <span>The Solution</span>
                                    </div>
                                    <p className="text-neutral-200 text-sm leading-relaxed text-left md:text-justify">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>

                            {/* Architecture & Workflow */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Layers className="w-5 h-5 text-black" />
                                    <h3 className="text-lg font-bold text-black">
                                        System Architecture & Workflow
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {project.architecture.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                delay: 0.05 * index,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            whileHover={{ y: -2 }}
                                            className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200 hover:border-black/40 transition-colors shadow-2xs"
                                        >
                                            <span className="w-7 h-7 rounded-full bg-black text-white text-xs font-bold tabular-nums flex items-center justify-center flex-shrink-0 mt-0.5">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                                                {step}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-black" />
                                    <h3 className="text-lg font-bold text-black">
                                        Key Features & Capabilities
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {project.features.map((feat, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2.5 text-sm text-neutral-700 bg-neutral-50 hover:bg-neutral-100/80 transition-colors px-4 py-3 rounded-xl border border-neutral-200/60"
                                        >
                                            <span className="text-black font-bold mt-0.5">•</span>
                                            <span className="leading-snug">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                            {project.liveUrl ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                >
                                    <span>Visit Live Project</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            ) : (
                                <div className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-neutral-200/80 text-neutral-700 text-xs sm:text-sm font-medium">
                                    <Lock className="w-4 h-4 text-neutral-600" />
                                    <span>Internal / Private Automation System</span>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={onClose}
                                className="min-h-[44px] px-5 py-2.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-800 text-sm font-semibold transition-colors cursor-pointer ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
