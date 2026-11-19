import { NextResponse } from "next/server";
import { getMediumArticles } from "@/lib/medium";

export const revalidate = 3600; // Cache for 1 hour (ISR)

const FULL_CACHE_HEADER = "public, s-maxage=3600, stale-while-revalidate=86400";
const DEGRADED_CACHE_HEADER = "public, s-maxage=300";

export async function GET() {
    try {
        const { recent, library } = await getMediumArticles();

        return NextResponse.json(
            {
                status: "ok",
                recent,
                library,
            },
            {
                headers: {
                    "Cache-Control":
                        recent.length > 0
                            ? FULL_CACHE_HEADER
                            : DEGRADED_CACHE_HEADER,
                },
            }
        );
    } catch (error) {
        console.error("Medium API route error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500, headers: { "Cache-Control": "no-store" } }
        );
    }
}
