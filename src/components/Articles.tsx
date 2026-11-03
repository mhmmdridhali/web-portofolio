"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import { PenLine } from "lucide-react";

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

interface MediumArticle {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
}

const IMG_SRC_PATTERN = new RegExp("<" + "img[^>]+src=[\"']([^\"']+)[\"']", "i");

function extractThumbnail(thumbnail: string, descriptionHtml: string): string {
    if (thumbnail) return thumbnail;
    const match = descriptionHtml.match(IMG_SRC_PATTERN);
    return match ? match[1] : "";
}

const CARD_WIDTH = 300;
const CARD_GAP = 24;

/* ─── Article Card ─── */
function ArticleCard({ article }: { article: MediumArticle }) {
    return (
        <motion.a
            href={article.link}
            whileHover={{ y: -5 }}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col cursor-pointer bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            style={{ width: `${CARD_WIDTH}px`, minWidth: `${CARD_WIDTH}px` }}
        >
            <div className="h-44 relative overflow-hidden bg-neutral-100">
                {article.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center">
                        <PenLine className="w-8 h-8 text-neutral-400" />
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-bold text-sm leading-snug group-hover:text-neutral-600 transition-colors line-clamp-2 mb-3">
                    {article.title}
                </h4>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span className="text-xs text-neutral-500 tabular-nums">
                        {article.pubDate}
                    </span>
                    {article.categories.length > 0 && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 truncate max-w-[120px]">
                            {article.categories[0]}
                        </span>
                    )}
                </div>
            </div>
        </motion.a>
    );
}

/* ─── Marquee Track ─── */
function MarqueeTrack({ articles }: { articles: MediumArticle[] }) {
    const x = useMotionValue(0);
    const isPaused = useRef(false);
    const prefersReducedMotion = useRef(false);
    const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const totalWidth = articles.length * (CARD_WIDTH + CARD_GAP);

    useEffect(() => {
        if (typeof window !== "undefined") {
            prefersReducedMotion.current = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
        }
    }, []);

    // Triple for seamless loop
    const tripled = [...articles, ...articles, ...articles];

    useAnimationFrame(() => {
        if (isPaused.current || prefersReducedMotion.current) return;
        const current = x.get();
        const next = current - 0.5;
        x.set(next <= -totalWidth ? 0 : next);
    });

    const manualScroll = (direction: number) => {
        isPaused.current = true;
        if (pauseTimeout.current) clearTimeout(pauseTimeout.current);

        const current = x.get();
        let next = current + direction * (CARD_WIDTH + CARD_GAP);
        if (next > 0) next = -totalWidth + (CARD_WIDTH + CARD_GAP);
        if (next <= -totalWidth) next = 0;
        x.set(next);

        pauseTimeout.current = setTimeout(() => {
            isPaused.current = false;
        }, 2000);
    };

    return (
        <div
            className="relative overflow-hidden py-2"
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => {
                if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
                isPaused.current = false;
            }}
        >
            {/* Fade edges matching #f8fafc canvas */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>

            {/* Arrow buttons (44x44px touch target) */}
            <button
                type="button"
                onClick={() => manualScroll(1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200 shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Scroll left"
            >
                ←
            </button>
            <button
                type="button"
                onClick={() => manualScroll(-1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200 shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Scroll right"
            >
                →
            </button>

            <motion.div
                className="flex w-max"
                style={{ x, gap: `${CARD_GAP}px` }}
            >
                {tripled.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </motion.div>
        </div>
    );
}

/* ─── Main Articles Component ─── */
export default function Articles() {
    const [articles, setArticles] = useState<MediumArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/medium")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok" && data.recent) {
                    const mapped: MediumArticle[] = data.recent
                        .slice(0, 8)
                        .map(
                            (item: {
                                title: string;
                                link: string;
                                thumbnail: string;
                                description: string;
                                pubDate: string;
                                categories: string[];
                            }) => ({
                                title: item.title,
                                link: item.link,
                                thumbnail: extractThumbnail(
                                    item.thumbnail,
                                    item.description || ""
                                ),
                                pubDate: new Date(item.pubDate).toLocaleDateString(
                                    "en-US",
                                    { month: "short", year: "numeric" }
                                ),
                                categories: item.categories || [],
                            })
                        );
                    setArticles(mapped);
                } else {
                    setError(true);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-24 px-4 md:px-6 max-w-6xl mx-auto overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="mb-12"
            >
                <motion.div variants={fadeUp}>
                    <h3 className="text-3xl font-bold tracking-tight">
                        Medium Articles
                    </h3>
                    <p className="text-neutral-600 mt-2 max-w-xl text-left md:text-justify">
                        A quiet corner for my thoughts, where complaints, memories, and
                        random musings find their voice in words.
                    </p>
                </motion.div>
            </motion.div>

            {/* Loading */}
            {loading && (
                <div className="flex gap-6 overflow-hidden pb-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="min-w-[300px] bg-white p-5 rounded-2xl border border-neutral-100 animate-pulse"
                        >
                            <div className="h-40 bg-neutral-100 mb-4 rounded-xl"></div>
                            <div className="h-4 bg-neutral-100 rounded mb-2 w-3/4"></div>
                            <div className="h-3 bg-neutral-100 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error / Fallback */}
            {!loading && (error || articles.length === 0) && (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-white/85 backdrop-blur-md border border-white/60 p-12 rounded-[2rem] shadow-lg text-center flex flex-col items-center"
                >
                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                        <PenLine className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="text-xl font-bold mb-3">
                        Read my articles on Medium
                    </h4>
                    <p className="text-neutral-600 max-w-md mx-auto mb-6">
                        Visit my Medium profile to explore insights on data,
                        automation, and efficiency.
                    </p>
                    <a
                        href="https://medium.com/@mhmmdaliridh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Visit Medium Profile →
                    </a>
                </motion.div>
            )}

            {/* Infinite Marquee with Arrow Controls */}
            {!loading && !error && articles.length > 0 && (
                <MarqueeTrack articles={articles} />
            )}

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
                        href="/articles"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Explore All Articles
                        <span>→</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
