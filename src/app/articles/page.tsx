"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

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

export default function ArticlesPage() {
    const [articles, setArticles] = useState<MediumArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Filters & sorting
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("/api/medium")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok" && data.items) {
                    const mapped: MediumArticle[] = data.items.map(
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
                                { month: "short", day: "numeric", year: "numeric" }
                            ),
                            pubDateRaw: new Date(item.pubDate).getTime(),
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

    // Collect all unique categories
    const allCategories = useMemo(() => {
        const cats = new Set<string>();
        articles.forEach((a) => a.categories.forEach((c) => cats.add(c)));
        return ["All", ...Array.from(cats)];
    }, [articles]);

    // Filter, sort, paginate
    const processed = useMemo(() => {
        let result = [...articles];

        if (selectedCategory !== "All") {
            result = result.filter((a) =>
                a.categories.includes(selectedCategory)
            );
        }

        result.sort((a, b) =>
            sortOrder === "newest"
                ? b.pubDateRaw - a.pubDateRaw
                : a.pubDateRaw - b.pubDateRaw
        );

        return result;
    }, [articles, selectedCategory, sortOrder]);

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
            {!loading && (error || articles.length === 0) && (
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

            {/* Filters & Sort Bar */}
            {!loading && !error && articles.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 mb-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${selectedCategory === cat
                                            ? "bg-black text-white border-black"
                                            : "bg-white/60 text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-white"
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
                            className="px-4 py-2 rounded-full border border-gray-200 bg-white/60 text-sm font-medium text-gray-600 focus:outline-none focus:border-black transition-colors cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </motion.div>
                </section>
            )}

            {/* Articles Grid */}
            {!loading && !error && (
                <section className="max-w-6xl mx-auto px-6 mb-10">
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
                                <motion.a
                                    key={article.link}
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={fadeUp}
                                    className="group cursor-pointer bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-44 relative overflow-hidden">
                                        {article.thumbnail ? (
                                            <img
                                                src={article.thumbnail}
                                                alt={article.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                                <span className="text-gray-400 text-3xl">✍️</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg mb-4 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>

                                        {article.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {article.categories.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-xs text-gray-400">
                                                {article.pubDate}
                                            </span>
                                            <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1">
                                                Read More
                                                <span className="group-hover:translate-x-1 transition-transform">
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.a>
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
                </section>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <section className="max-w-6xl mx-auto px-6 mb-16">
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
                </section>
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
                        I regularly write about data solutions, coding patterns, and
                        lessons learned from real-world projects. Subscribe for updates.
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
