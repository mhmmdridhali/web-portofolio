import RssParser from "rss-parser";
import { NextResponse } from "next/server";

interface MediumItem {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
    description: string;
}

// Static fallback for articles older than the RSS limit (10 items).
// Add older articles here manually when they fall off the live feed.
const STATIC_FALLBACK: MediumItem[] = [
    // Example:
    // {
    //     title: "My First Article",
    //     link: "https://medium.com/@mhmmdaliridh/my-first-article-abc123",
    //     thumbnail: "",
    //     pubDate: "2024-01-15T00:00:00.000Z",
    //     categories: ["Writing"],
    //     description: "",
    // },
];

function extractThumbnail(thumbnail: string, html: string): string {
    if (thumbnail) return thumbnail;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : "";
}

export async function GET() {
    try {
        const parser = new RssParser();
        const feed = await parser.parseURL(
            "https://medium.com/feed/@mhmmdaliridh"
        );

        const liveArticles: MediumItem[] = (feed.items || []).map((item) => ({
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

        // Merge live + static, deduplicate by link
        const seenLinks = new Set(liveArticles.map((a) => a.link));
        const merged = [
            ...liveArticles,
            ...STATIC_FALLBACK.filter((a) => !seenLinks.has(a.link)),
        ];

        // Sort newest first
        merged.sort(
            (a, b) =>
                new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        return NextResponse.json({ status: "ok", items: merged });
    } catch (error) {
        console.error("Medium API error:", error);
        // Return static fallback if live fetch fails
        return NextResponse.json({
            status: "ok",
            items: STATIC_FALLBACK,
        });
    }
}
