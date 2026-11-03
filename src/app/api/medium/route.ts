import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import RssParser from "rss-parser";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour (ISR)

interface MediumItem {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
    description: string;
}

// Module-level caches so dev & serverless warm instances don't re-parse files or wait on Medium RSS every request
let cachedLibrary: MediumItem[] | null = null;
let cachedRecent: { items: MediumItem[]; timestamp: number } | null = null;
const RECENT_TTL_MS = 1000 * 60 * 30; // 30 minutes

function extractThumbnail(thumbnail: string, html: string): string {
    if (thumbnail) return thumbnail;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : "";
}

function getLibraryFromDisk(): MediumItem[] {
    if (cachedLibrary) return cachedLibrary;

    const library: MediumItem[] = [];
    const postsDir = path.join(process.cwd(), "posts");

    if (fs.existsSync(postsDir)) {
        const files = fs.readdirSync(postsDir);
        for (const file of files) {
            if (file.endsWith(".html") && !file.startsWith("draft_")) {
                try {
                    const filePath = path.join(postsDir, file);
                    const htmlContent = fs.readFileSync(filePath, "utf-8");
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
                        library.push({
                            title,
                            link,
                            thumbnail,
                            pubDate,
                            categories: extractedCategories,
                            description: "",
                        });
                    }
                } catch (err) {
                    console.error(`Error parsing local file ${file}:`, err);
                }
            }
        }
    }

    library.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    cachedLibrary = library;
    return library;
}

async function getRecentFromRss(): Promise<MediumItem[]> {
    if (cachedRecent && Date.now() - cachedRecent.timestamp < RECENT_TTL_MS) {
        return cachedRecent.items;
    }

    try {
        const parser = new RssParser({ timeout: 4000 });
        const feed = await parser.parseURL(
            "https://medium.com/feed/@mhmmdaliridh"
        );

        const recent: MediumItem[] = (feed.items || []).map((item) => ({
            title: item.title || "",
            link: item.link || "",
            thumbnail: extractThumbnail(
                (item as Record<string, string>).thumbnail || "",
                item["content:encoded"] || item.content || ""
            ),
            pubDate: item.pubDate || item.isoDate || "",
            categories: (item.categories || []) as string[],
            description: item["content:encoded"] || item.content || "",
        }));

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

export async function GET() {
    try {
        const [recent, library] = await Promise.all([
            getRecentFromRss(),
            Promise.resolve(getLibraryFromDisk()),
        ]);

        return NextResponse.json(
            {
                status: "ok",
                recent,
                library,
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch (error) {
        console.error("Medium API route error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
