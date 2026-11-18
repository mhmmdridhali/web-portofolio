"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    X,
    ExternalLink,
    Lock,
    CheckCircle2,
    AlertCircle,
    Sparkles,
} from "lucide-react";
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
                        {/* Compact Sticky Header */}
                        <div className="flex-shrink-0 px-6 py-4 border-b border-neutral-200 bg-white flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black text-white">
                                        {project.category} Project
                                    </span>
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <h2
                                    id="modal-project-title"
                                    className="text-xl sm:text-2xl font-extrabold tracking-tight text-black leading-snug"
                                >
                                    {project.title}
                                </h2>
                            </div>

                            <button
                                ref={closeBtnRef}
                                type="button"
                                onClick={onClose}
                                aria-label="Close project details"
                                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-black text-neutral-700 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Editorial Body */}
                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
                            {/* Uncovered 16:9 Thumbnail Frame (scrolls away cleanly) */}
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 896px) 100vw, 832px"
                                />
                            </div>

                            {/* Plain-English Overview */}
                            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed text-left">
                                {project.description}
                            </p>

                            {/* The Problem & How It Helps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2.5">
                                        <AlertCircle className="w-4 h-4 text-neutral-800" />
                                        <span>The Problem</span>
                                    </div>
                                    <p className="text-neutral-700 text-sm leading-relaxed text-left">
                                        {project.challenge}
                                    </p>
                                </div>

                                <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-md">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                                        <Sparkles className="w-4 h-4 text-white" />
                                        <span>How It Helps</span>
                                    </div>
                                    <p className="text-neutral-200 text-sm leading-relaxed text-left">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>

                            {/* What It Does */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-5 h-5 text-black" />
                                    <h3 className="text-base sm:text-lg font-bold text-black">
                                        What It Does
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

                        {/* Compact Sticky Footer */}
                        <div className="px-6 py-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                            {project.liveUrl ? (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-sm font-semibold transition-colors shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
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
