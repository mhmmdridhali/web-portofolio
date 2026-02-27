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

function extractThumbnail(thumbnail: string, html: string): string {
    if (thumbnail) return thumbnail;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : "";
}

export async function GET() {
    try {
        const parser = new RssParser();
        let recent: MediumItem[] = [];
        let library: MediumItem[] = [];

        // 1. Fetch live Medium RSS feed for "recent"
        try {
            const feed = await parser.parseURL(
                "https://medium.com/feed/@mhmmdaliridh"
            );

            recent = (feed.items || []).map((item) => ({
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
        } catch (rssError) {
            console.error("RSS fetch error:", rssError);
        }

        // 2. Parse local HTML files from "posts" directory for "library"
        const postsDir = path.join(process.cwd(), "posts");

        if (fs.existsSync(postsDir)) {
            const files = fs.readdirSync(postsDir);
            for (const file of files) {
                // Only process non-draft HTML files
                if (file.endsWith(".html") && !file.startsWith("draft_")) {
                    try {
                        const filePath = path.join(postsDir, file);
                        const htmlContent = fs.readFileSync(filePath, "utf-8");
                        const $ = cheerio.load(htmlContent);

                        const title = $("h1.p-name").text().trim() || $("title").text().trim();
                        const pubDate = $("time.dt-published").attr("datetime") || "";
                        const link = $("a.p-canonical").attr("href") || "";
                        const thumbnail = $("img.graf-image").first().attr("src") || "";

                        let extractedCategories: string[] = [];
                        // Attempt to extract categories from various possible Medium export structures
                        $("a.p-category, ul.tags li, .tags a, a[href*='/tag/']").each((_, el) => {
                            const text = $(el).text().trim();
                            if (text && !extractedCategories.includes(text)) {
                                extractedCategories.push(text);
                            }
                        });

                        // Fallback logic if no categories found
                        if (extractedCategories.length === 0) {
                            const lowerTitle = title.toLowerCase();
                            if (lowerTitle.includes("data") || lowerTitle.includes("excel") || lowerTitle.includes("app script") || lowerTitle.includes("n8n")) {
                                extractedCategories.push("Data & Tech");
                            } else if (lowerTitle.includes("pendidikan") || lowerTitle.includes("guru") || lowerTitle.includes("sekolah") || lowerTitle.includes("kurikulum")) {
                                extractedCategories.push("Education");
                            } else if (lowerTitle.includes("love") || lowerTitle.includes("time") || lowerTitle.includes("life") || lowerTitle.includes("divorce") || lowerTitle.includes("hidup")) {
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

        // Sort "library" by date descending just to be safe, though not strictly requested for the array itself in the prompt, 
        // the prompt said "Sort the final array in descending order based on the published date." for Task 5 previously,
        // and now says "Ensure the objects in both arrays share the exact same schema".
        // Let's sort both arrays so the most recent is first.
        recent.sort(
            (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        library.sort(
            (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        return NextResponse.json({
            status: "ok",
            recent,
            library
        });

    } catch (error) {
        console.error("Medium API route error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
