"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
    },
} as const;

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
} as const;

interface MediumArticle {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    pubDateRaw: number;
    categories: string[];
}

/** Extract the first <img src="..."> from HTML if thumbnail is empty */
function extractThumbnail(thumbnail: string, descriptionHtml: string): string {
    if (thumbnail) return thumbnail;
    const match = descriptionHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : "";
}

const ARTICLES_PER_PAGE = 6;
const CARD_WIDTH = 300;
const CARD_GAP = 24;

/* ─── Article Card ─── */
function ArticleCard({ article, isLibrary = false }: { article: MediumArticle; isLibrary?: boolean }) {
    return (
        <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex cursor-pointer bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${isLibrary
                ? "flex-row md:flex-col items-center md:items-stretch h-32 md:h-auto"
                : "flex-col flex-shrink-0"
                }`}
            style={!isLibrary ? { width: `${CARD_WIDTH}px`, minWidth: `${CARD_WIDTH}px` } : undefined}
        >
            <div
                className={`relative overflow-hidden bg-gray-100 flex-shrink-0 ${isLibrary
                    ? "w-28 h-28 md:w-full md:h-44 rounded-xl md:rounded-none ml-2 md:ml-0 order-2 md:order-1"
                    : "h-44 w-full"
                    }`}
            >
                {article.thumbnail ? (
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${!isLibrary ? "grayscale group-hover:grayscale-0" : ""
                            }`}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-3xl">✍️</span>
                    </div>
                )}
            </div>
            <div className={`flex flex-col flex-grow ${isLibrary ? "p-4 md:p-6 order-1 md:order-2 w-full" : "p-6"}`}>
                <h3 className={`font-bold mb-2 md:mb-4 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2 ${isLibrary ? "text-base md:text-lg" : "text-lg"}`}>
                    {article.title}
                </h3>
                {article.categories && article.categories.length > 0 && (
                    <div className="hidden md:flex flex-wrap gap-2 mb-4">
                        {article.categories.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 truncate max-w-[120px]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className={`mt-auto flex items-center justify-between ${isLibrary ? "pt-2 md:pt-4 border-t-0 md:border-t" : "pt-4 border-t"} border-gray-100`}>
                    <span className="text-xs text-gray-400">{article.pubDate}</span>
                    <span className="hidden md:flex text-xs font-bold text-black uppercase tracking-wider items-center gap-1">
                        Read More
                        <span className="group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </span>
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
            className="relative overflow-hidden py-4 -mx-6 px-6"
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => {
                if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
                isPaused.current = false;
            }}
        >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none"></div>

            {/* Arrow buttons */}
            <button
                onClick={() => manualScroll(1)}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Scroll left"
            >
                ←
            </button>
            <button
                onClick={() => manualScroll(-1)}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300"
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

export default function ArticlesPage() {
    const [recentArticles, setRecentArticles] = useState<MediumArticle[]>([]);
    const [libraryArticles, setLibraryArticles] = useState<MediumArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Filters & sorting for Library section
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("/api/medium")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    const mapArticles = (items: any[]) =>
                        items.map((item) => ({
                            title: item.title,
                            link: item.link,
                            thumbnail: extractThumbnail(
                                item.thumbnail || "",
                                item.description || ""
                            ),
                            pubDate: new Date(item.pubDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric", year: "numeric" }
                            ),
                            pubDateRaw: new Date(item.pubDate).getTime(),
                            categories: item.categories || [],
                        }));

                    if (data.recent) setRecentArticles(mapArticles(data.recent));
                    if (data.library) setLibraryArticles(mapArticles(data.library));
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

    // Collect all unique categories from library
    const allCategories = useMemo(() => {
        const cats = new Set<string>();
        libraryArticles.forEach((a) => {
            if (a.categories) {
                a.categories.forEach((c) => cats.add(c));
            }
        });
        return ["All", ...Array.from(cats)];
    }, [libraryArticles]);

    // Filter, sort, paginate library articles
    const processed = useMemo(() => {
        let result = [...libraryArticles];

        if (selectedCategory !== "All") {
            result = result.filter((a) =>
                a.categories && a.categories.includes(selectedCategory)
            );
        }

        result.sort((a, b) =>
            sortOrder === "newest"
                ? b.pubDateRaw - a.pubDateRaw
                : a.pubDateRaw - b.pubDateRaw
        );

        return result;
    }, [libraryArticles, selectedCategory, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(processed.length / ARTICLES_PER_PAGE));
    const paginated = processed.slice(
        (currentPage - 1) * ARTICLES_PER_PAGE,
        currentPage * ARTICLES_PER_PAGE
    );

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, sortOrder]);

    return (
        <div className="pt-28 pb-24">
            {/* Header */}
            <section className="max-w-6xl mx-auto px-6 mb-12">
                <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.div
                        variants={fadeUp}
                        className="inline-block px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 text-xs font-semibold tracking-widest uppercase mb-6 text-gray-600"
                    >
                        Writing
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                    >
                        Medium{" "}
                        <span className="text-gray-400">Articles</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                    >
                        A quiet corner for my thoughts, where complaints, memories,
                        and random musings find their voice in words.
                    </motion.p>
                </motion.div>
            </section>

            {/* Loading State */}
            {loading && (
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] overflow-hidden animate-pulse"
                            >
                                <div className="h-44 bg-gray-100"></div>
                                <div className="p-6">
                                    <div className="h-5 bg-gray-100 rounded w-3/4 mb-3"></div>
                                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Error / Fallback State */}
            {!loading && (error || (recentArticles.length === 0 && libraryArticles.length === 0)) && (
                <section className="max-w-6xl mx-auto px-6 mb-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="bg-white/60 backdrop-blur-xl border border-white/40 p-16 rounded-[3rem] shadow-xl text-center"
                    >
                        <span className="text-5xl block mb-6">✍️</span>
                        <h2 className="text-3xl font-bold mb-4">
                            Read my articles on Medium
                        </h2>
                        <p className="text-gray-500 max-w-lg mx-auto mb-8 text-lg">
                            Visit my Medium profile to explore insights on data
                            management, Google Apps Script automation, and efficiency
                            optimization.
                        </p>
                        <a
                            href="https://medium.com/@mhmmdaliridh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Visit Medium Profile →
                        </a>
                    </motion.div>
                </section>
            )}

            {/* Recent Updates Section Carousel */}
            {!loading && !error && recentArticles.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 mb-24 overflow-hidden">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl font-bold tracking-tight mb-3"
                        >
                            Recent Updates
                        </motion.h2>
                        <motion.div
                            variants={fadeUp}
                            className="w-12 h-1 bg-black mb-10"
                        ></motion.div>

                        <motion.div variants={fadeUp}>
                            <MarqueeTrack articles={recentArticles} />
                        </motion.div>
                    </motion.div>
                </section>
            )}

            {/* Library Section */}
            {!loading && !error && libraryArticles.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 mb-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-3xl font-bold tracking-tight mb-3"
                        >
                            Library
                        </motion.h2>
                        <motion.div
                            variants={fadeUp}
                            className="w-12 h-1 bg-black mb-10"
                        ></motion.div>
                    </motion.div>

                    {/* Filters & Sort Bar */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10"
                    >
                        {/* Category Pills wrapper - updated for mobile scrolling */}
                        <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap w-full md:flex-wrap gap-2 max-w-4xl pb-2 md:pb-0 hide-scrollbar-css relative">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setCurrentPage(1); // Task 3 explicitly demands this reset
                                    }}
                                    className={`px-5 py-2 rounded-full flex-shrink-0 text-xs font-semibold tracking-wide border transition-all duration-300 ${selectedCategory === cat
                                        ? "bg-black text-white border-black shadow-md"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-black hover:bg-gray-50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value as "newest" | "oldest")
                            }
                            className="px-4 py-2 flex-shrink-0 rounded-full border border-gray-200 bg-white/60 text-sm font-medium text-gray-600 focus:outline-none focus:border-black transition-colors cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </motion.div>

                    {/* Articles Grid */}
                    {paginated.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={stagger}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            key={`${selectedCategory}-${sortOrder}-${currentPage}`}
                        >
                            {paginated.map((article) => (
                                <ArticleCard key={article.link} article={article} isLibrary={true} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-16">
                            <span className="text-4xl block mb-4">🔍</span>
                            <p className="text-gray-500 text-lg">
                                No articles found for &quot;{selectedCategory}&quot;
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col mt-16 pb-10">
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
                                >
                                    ←
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${currentPage === page
                                                ? "bg-black text-white"
                                                : "bg-white/60 text-gray-600 border border-gray-200 hover:bg-black hover:text-white hover:border-black"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200"
                                >
                                    →
                                </button>
                            </div>
                            <p className="text-center text-xs text-gray-400 mt-3">
                                Showing {(currentPage - 1) * ARTICLES_PER_PAGE + 1}–
                                {Math.min(currentPage * ARTICLES_PER_PAGE, processed.length)}{" "}
                                of {processed.length} articles
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Medium CTA */}
            <section className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 md:p-16 rounded-[3rem] shadow-xl text-center"
                >
                    <span className="text-4xl mb-4 block">✍️</span>
                    <h3 className="text-2xl font-bold mb-3">
                        Follow me on Medium
                    </h3>
                    <p className="text-gray-500 max-w-lg mx-auto mb-8">
                        I regularly write about education, thoughts, and quiet philosophies — one reflection at a time. Subscribe for updates.
                    </p>
                    <a
                        href="https://medium.com/@mhmmdaliridh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Visit Medium Profile →
                    </a>
                </motion.div>
            </section>
        </div>
    );
}
