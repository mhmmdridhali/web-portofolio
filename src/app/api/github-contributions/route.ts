import { NextResponse } from "next/server";
import {
    buildFallbackContributionData,
    CONTRIBUTION_WEEKS,
    GITHUB_USERNAME,
    groupContributionsIntoWeeks,
    type GithubContributionsPayload,
} from "@/lib/github-contributions";

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour
let cachedEntry: { data: GithubContributionsPayload; timestamp: number } | null = null;

interface ExternalContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ExternalContributionsResponse {
    total?: {
        lastYear?: number;
        [key: string]: number | undefined;
    };
    contributions?: ExternalContributionDay[];
}

export async function GET() {
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL_MS) {
        return NextResponse.json(cachedEntry.data);
    }

    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
            {
                next: { revalidate: 3600 },
                signal: AbortSignal.timeout(5000),
            }
        );

        if (!res.ok) {
            throw new Error(`GitHub contributions upstream returned ${res.status}`);
        }

        const json = (await res.json()) as ExternalContributionsResponse;
        const rawDays = Array.isArray(json?.contributions) ? json.contributions : [];

        if (rawDays.length === 0) {
            throw new Error("Empty GitHub contributions payload");
        }

        const weeks = groupContributionsIntoWeeks(rawDays, CONTRIBUTION_WEEKS);
        const total =
            typeof json?.total?.lastYear === "number"
                ? json.total.lastYear
                : rawDays.reduce((acc, d) => acc + (Number(d.count) || 0), 0);

        const payload: GithubContributionsPayload = {
            username: GITHUB_USERNAME,
            total,
            weeks,
            isFallback: false,
        };

        cachedEntry = {
            data: payload,
            timestamp: Date.now(),
        };

        return NextResponse.json(payload);
    } catch {
        return NextResponse.json(buildFallbackContributionData());
    }
}
