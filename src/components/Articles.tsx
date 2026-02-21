"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

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

interface MediumArticle {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
}

/** Extract the first <img src="..."> from HTML if thumbnail is empty */
function extractThumbnail(thumbnail: string, descriptionHtml: string): string {
    if (thumbnail) return thumbnail;
    const match = descriptionHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : "";
}

const CARD_WIDTH = 300;
const CARD_GAP = 24;

/* ─── Article Card ─── */
function ArticleCard({ article }: { article: MediumArticle }) {
    return (
        <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col cursor-pointer bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex-shrink-0"
            style={{ width: `${CARD_WIDTH}px`, minWidth: `${CARD_WIDTH}px` }}
        >
            <div className="h-44 relative overflow-hidden bg-gray-100">
                {article.thumbnail ? (
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-3xl">✍️</span>
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-bold text-sm leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 mb-3">
                    {article.title}
                </h4>
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{article.pubDate}</span>
                    {article.categories.length > 0 && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 truncate max-w-[120px]">
                            {article.categories[0]}
                        </span>
                    )}
                </div>
            </div>
        </a>
    );
}

/* ─── Marquee Track ─── */
function MarqueeTrack({ articles }: { articles: MediumArticle[] }) {
    const x = useMotionValue(0);
    const isPaused = useRef(false);
    const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const totalWidth = articles.length * (CARD_WIDTH + CARD_GAP);

    // Triple for seamless loop
    const tripled = [...articles, ...articles, ...articles];

    useAnimationFrame(() => {
        if (isPaused.current) return;
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
            className="relative overflow-hidden"
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => {
                if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
                isPaused.current = false;
            }}
        >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

            {/* Arrow buttons */}
            <button
                onClick={() => manualScroll(1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200"
                aria-label="Scroll left"
            >
                ←
            </button>
            <button
                onClick={() => manualScroll(-1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-200"
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
                if (data.status === "ok" && data.items) {
                    const mapped: MediumArticle[] = data.items
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
        <section className="py-24 px-6 max-w-6xl mx-auto overflow-hidden">
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
                    <p className="text-gray-500 mt-2 max-w-xl">
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
                            className="min-w-[300px] bg-white p-5 rounded-2xl border border-gray-100 animate-pulse"
                        >
                            <div className="h-40 bg-gray-100 mb-4 rounded-xl"></div>
                            <div className="h-4 bg-gray-100 rounded mb-2 w-3/4"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
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
                    className="bg-white/60 backdrop-blur-xl border border-white/40 p-12 rounded-[2rem] shadow-lg text-center"
                >
                    <span className="text-4xl block mb-4">✍️</span>
                    <h4 className="text-xl font-bold mb-3">
                        Read my articles on Medium
                    </h4>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Visit my Medium profile to explore insights on data,
                        automation, and efficiency.
                    </p>
                    <a
                        href="https://medium.com/@mhmmdaliridh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Visit Medium Profile →
                    </a>
                </motion.div>
            )}

            {/* Infinite Marquee with Arrow Controls */}
            {!loading && !error && articles.length > 0 && (
                <MarqueeTrack articles={articles} />
            )}
        </section>
    );
}
