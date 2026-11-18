export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
    date: string;
    count: number;
    level: ContributionLevel;
}

export interface GithubContributionsPayload {
    username: string;
    total: number;
    /** Array of up to 39 week columns, each with up to 7 Sun-Sat day cells (null for padding). */
    weeks: Array<Array<ContributionDay | null>>;
    isFallback: boolean;
}

export const GITHUB_USERNAME = "mhmmdridhali";
export const CONTRIBUTION_WEEKS = 39;
export const CONTRIBUTION_ROWS = 7;

const FALLBACK_WEIGHTS = [52, 20, 14, 9, 5] as const;
const FALLBACK_COUNTS = [0, 1, 2, 4, 7] as const;

// Fixed reference date (Wednesday) so SSR and client initial state never mismatch
const FALLBACK_END_UTC = Date.UTC(2026, 10, 18);

function createSeededRandom(seed: number) {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

function clampLevel(raw: unknown): ContributionLevel {
    const n = Number(raw);
    if (n <= 0 || Number.isNaN(n)) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 3;
    return 4;
}

function formatUtcDate(ms: number): string {
    return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Organizes a chronological list of daily contributions into Sun-Sat week columns,
 * returning the most recent `weekCount` columns for the heatmap grid.
 */
export function groupContributionsIntoWeeks(
    days: Array<{ date: string; count: number; level: unknown }>,
    weekCount = CONTRIBUTION_WEEKS
): Array<Array<ContributionDay | null>> {
    if (days.length === 0) return [];

    const weeks: Array<Array<ContributionDay | null>> = [];
    let currentWeek: Array<ContributionDay | null> = Array(CONTRIBUTION_ROWS).fill(null);

    for (const entry of days) {
        if (!entry?.date) continue;
        const parsed = new Date(`${entry.date}T00:00:00Z`);
        if (Number.isNaN(parsed.getTime())) continue;

        const dayOfWeek = parsed.getUTCDay(); // 0 = Sun ... 6 = Sat
        if (dayOfWeek === 0 && currentWeek.some((cell) => cell !== null)) {
            weeks.push(currentWeek);
            currentWeek = Array(CONTRIBUTION_ROWS).fill(null);
        }

        currentWeek[dayOfWeek] = {
            date: entry.date,
            count: Math.max(0, Math.round(Number(entry.count) || 0)),
            level: clampLevel(entry.level),
        };
    }

    if (currentWeek.some((cell) => cell !== null)) {
        weeks.push(currentWeek);
    }

    return weeks.slice(-weekCount);
}

/**
 * Deterministic seeded contribution grid matching the expected total silhouette,
 * used during SSR hydration and as an offline/API fallback.
 */
export function buildFallbackContributionData(): GithubContributionsPayload {
    const random = createSeededRandom(202611);
    const totalDays = (CONTRIBUTION_WEEKS - 1) * CONTRIBUTION_ROWS + 4; // ends Wednesday
    const startMs = FALLBACK_END_UTC - (totalDays - 1) * 86_400_000;

    const days: ContributionDay[] = [];
    let total = 0;

    for (let i = 0; i < totalDays; i++) {
        const roll = random() * 100;
        let cumulative = 0;
        let level: ContributionLevel = 0;

        for (let lv = 0; lv < FALLBACK_WEIGHTS.length; lv++) {
            cumulative += FALLBACK_WEIGHTS[lv];
            if (roll < cumulative) {
                level = lv as ContributionLevel;
                break;
            }
        }

        const count = FALLBACK_COUNTS[level];
        total += count;
        days.push({
            date: formatUtcDate(startMs + i * 86_400_000),
            count,
            level,
        });
    }

    return {
        username: GITHUB_USERNAME,
        total,
        weeks: groupContributionsIntoWeeks(days, CONTRIBUTION_WEEKS),
        isFallback: true,
    };
}
