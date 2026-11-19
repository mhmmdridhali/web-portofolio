import fs from "fs/promises";
import path from "path";
import * as cheerio from "cheerio";
import RssParser from "rss-parser";

export interface MediumItem {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
    description: string;
}

export interface MediumFeedData {
    recent: MediumItem[];
    library: MediumItem[];
}

// Module-level caches so dev & serverless warm instances don't re-parse files or wait on Medium RSS every request
let cachedLibrary: MediumItem[] | null = null;
let cachedRecent: { items: MediumItem[]; timestamp: number } | null = null;
const RECENT_TTL_MS = 1000 * 60 * 30; // 30 minutes
const MAX_EXCERPT_LENGTH = 180;

function extractThumbnailFromHtml(thumbnail: string, html: string): string {
    if (thumbnail) return thumbnail;
    if (!html) return "";
    const $ = cheerio.load(html);
    return $("img").first().attr("src") || "";
}

function extractPlainExcerpt(html: string): string {
    if (!html) return "";
    const $ = cheerio.load(html);
    const text = $.text().replace(/\s+/g, " ").trim();
    if (text.length <= MAX_EXCERPT_LENGTH) return text;
    return `${text.slice(0, MAX_EXCERPT_LENGTH - 1).trimEnd()}…`;
}

export async function getLibraryFromDisk(): Promise<MediumItem[]> {
    if (cachedLibrary) return cachedLibrary;

    const library: MediumItem[] = [];
    const postsDir = path.join(process.cwd(), "posts");

    let files: string[];
    try {
        files = await fs.readdir(postsDir);
    } catch {
        cachedLibrary = library;
        return library;
    }

    const htmlFiles = files.filter(
        (file) => file.endsWith(".html") && !file.startsWith("draft_")
    );

    const parsedItems = await Promise.all(
        htmlFiles.map(async (file): Promise<MediumItem | null> => {
            try {
                const filePath = path.join(postsDir, file);
                const htmlContent = await fs.readFile(filePath, "utf-8");
                const $ = cheerio.load(htmlContent);

                const title =
                    $("h1.p-name").text().trim() || $("title").text().trim();
                const pubDate = $("time.dt-published").attr("datetime") || "";
                const link = $("a.p-canonical").attr("href") || "";
                const thumbnail = $("img.graf-image").first().attr("src") || "";

                const extractedCategories: string[] = [];
                $("a.p-category, ul.tags li, .tags a, a[href*='/tag/']").each(
                    (_, el) => {
                        const text = $(el).text().trim();
                        if (text && !extractedCategories.includes(text)) {
                            extractedCategories.push(text);
                        }
                    }
                );

                if (extractedCategories.length === 0) {
                    const lowerTitle = title.toLowerCase();
                    if (
                        lowerTitle.includes("data") ||
                        lowerTitle.includes("excel") ||
                        lowerTitle.includes("app script") ||
                        lowerTitle.includes("n8n")
                    ) {
                        extractedCategories.push("Data & Tech");
                    } else if (
                        lowerTitle.includes("pendidikan") ||
                        lowerTitle.includes("guru") ||
                        lowerTitle.includes("sekolah") ||
                        lowerTitle.includes("kurikulum")
                    ) {
                        extractedCategories.push("Education");
                    } else if (
                        lowerTitle.includes("love") ||
                        lowerTitle.includes("time") ||
                        lowerTitle.includes("life") ||
                        lowerTitle.includes("divorce") ||
                        lowerTitle.includes("hidup")
                    ) {
                        extractedCategories.push("Life & Thoughts");
                    } else {
                        extractedCategories.push("Archive");
                    }
                }

                if (title && pubDate && link) {
                    return {
                        title,
                        link,
                        thumbnail,
                        pubDate,
                        categories: extractedCategories,
                        description: "",
                    };
                }
                return null;
            } catch (err) {
                console.error(`Error parsing local file ${file}:`, err);
                return null;
            }
        })
    );

    for (const item of parsedItems) {
        if (item) library.push(item);
    }

    library.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    cachedLibrary = library;
    return library;
}

export async function getRecentFromRss(): Promise<MediumItem[]> {
    if (cachedRecent && Date.now() - cachedRecent.timestamp < RECENT_TTL_MS) {
        return cachedRecent.items;
    }

    try {
        const parser = new RssParser({ timeout: 4000 });
        const feed = await parser.parseURL(
            "https://medium.com/feed/@mhmmdaliridh"
        );

        const recent: MediumItem[] = (feed.items || []).map((item) => {
            const rawHtml = item["content:encoded"] || item.content || "";
            return {
                title: item.title || "",
                link: item.link || "",
                thumbnail: extractThumbnailFromHtml(
                    (item as Record<string, string>).thumbnail || "",
                    rawHtml
                ),
                pubDate: item.pubDate || item.isoDate || "",
                categories: (item.categories || []) as string[],
                description: extractPlainExcerpt(rawHtml),
            };
        });

        recent.sort(
            (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        cachedRecent = { items: recent, timestamp: Date.now() };
        return recent;
    } catch (rssError) {
        console.error("RSS fetch error:", rssError);
        return cachedRecent ? cachedRecent.items : [];
    }
}

export async function getMediumArticles(): Promise<MediumFeedData> {
    const [recent, library] = await Promise.all([
        getRecentFromRss(),
        getLibraryFromDisk(),
    ]);
    return { recent, library };
}
