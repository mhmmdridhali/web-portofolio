"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { techStack, type TechStackItem } from "@/data/techStack";
import {
    buildFallbackContributionData,
    GITHUB_USERNAME,
    type ContributionDay,
    type ContributionLevel,
    type GithubContributionsPayload,
} from "@/lib/github-contributions";

export interface TechStackCloudProps {
    tools?: TechStackItem[];
    username?: string;
    /** Seconds for one full marquee loop */
    duration?: number;
    className?: string;
}

const CONTRIBUTION_LEVEL_STYLES: Record<ContributionLevel, string> = {
    0: "bg-neutral-200/75 hover:bg-neutral-300",
    1: "bg-neutral-300 hover:bg-neutral-400",
    2: "bg-neutral-500 hover:bg-neutral-600",
    3: "bg-neutral-700 hover:bg-neutral-800",
    4: "bg-black hover:bg-neutral-900",
};

const LEGEND_LEVELS: ContributionLevel[] = [0, 1, 2, 3, 4];

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
});

const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

function formatContributionDate(isoDate: string): string {
    const parsed = new Date(`${isoDate}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return isoDate;
    return FULL_DATE_FORMATTER.format(parsed);
}

function formatContributionLabel(day: ContributionDay): string {
    const formattedDate = formatContributionDate(day.date);
    if (day.count === 0) return `No contributions on ${formattedDate}`;
    const noun = day.count === 1 ? "contribution" : "contributions";
    return `${day.count} ${noun} on ${formattedDate}`;
}

function getMonthHeaderLabels(
    weeks: Array<Array<ContributionDay | null>>
): Map<number, string> {
    const labels = new Map<number, string>();
    let prevMonth = -1;

    weeks.forEach((week, idx) => {
        const firstDay = week.find((d) => d !== null);
        if (!firstDay) return;
        const parsed = new Date(`${firstDay.date}T00:00:00Z`);
        if (Number.isNaN(parsed.getTime())) return;

        const month = parsed.getUTCMonth();
        if (month !== prevMonth) {
            // Skip placing a label right on col 0 if col 1-2 will immediately overwrite,
            // or simply avoid crowding adjacent month starts.
            const prevIdx = Array.from(labels.keys()).pop();
            if (prevIdx === undefined || idx - prevIdx >= 2) {
                labels.set(idx, MONTH_FORMATTER.format(parsed));
            }
            prevMonth = month;
        }
    });

    return labels;
}

interface TooltipState {
    day: ContributionDay;
    x: number;
    y: number;
    cellHeight: number;
    placeBelow: boolean;
    align: "left" | "center" | "right";
}

interface MarqueeRowProps {
    tools: TechStackItem[];
    duration: number;
    reverse?: boolean;
    label: string;
}

function MarqueeRow({
    tools,
    duration,
    reverse = false,
    label,
}: MarqueeRowProps) {
    return (
        <div
            role="group"
            aria-label={label}
            style={
                {
                    "--marquee-duration": `${duration}s`,
                    "--marquee-gap": "0.875rem",
                } as React.CSSProperties
            }
            className="logo-cloud-10-marquee flex gap-(--marquee-gap) overflow-hidden py-1 mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        >
            {Array.from({ length: 4 }, (_, copy) => (
                <div
                    key={copy}
                    aria-hidden={copy > 0 ? true : undefined}
                    data-reverse={reverse}
                    className="logo-cloud-10-track flex shrink-0 items-center gap-(--marquee-gap)"
                >
                    {tools.map((tool, toolIdx) => (
                        <div
                            key={`${tool.name}-${toolIdx}`}
                            className="bg-neutral-50/90 border border-neutral-200/80 px-5 py-3.5 rounded-2xl flex items-center gap-3.5 shrink-0 hover:bg-black hover:text-white hover:border-black transition-colors duration-300 group cursor-default shadow-xs"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={tool.iconUrl}
                                alt={copy > 0 ? "" : tool.name}
                                width={24}
                                height={24}
                                loading="lazy"
                                className="w-6 h-6 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:invert"
                            />
                            <span className="text-sm font-semibold tracking-tight text-neutral-800 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

const INITIAL_DATA: GithubContributionsPayload = buildFallbackContributionData();

export default function TechStackCloud({
    tools = techStack,
    username = GITHUB_USERNAME,
    duration = 34,
    className = "",
}: TechStackCloudProps) {
    const [data, setData] = React.useState<GithubContributionsPayload>(INITIAL_DATA);
    const [tooltip, setTooltip] = React.useState<TooltipState | null>(null);

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const cellRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const [activeCell, setActiveCell] = React.useState<string | null>(null);

    React.useEffect(() => {
        const controller = new AbortController();

        async function loadContributions() {
            try {
                const res = await fetch("/api/github-contributions", {
                    signal: controller.signal,
                });
                if (!res.ok) return;
                const json = (await res.json()) as GithubContributionsPayload;
                if (Array.isArray(json?.weeks) && json.weeks.length > 0) {
                    setData(json);
                }
            } catch {
                // Retain deterministic seeded grid if network is unavailable
            }
        }

        void loadContributions();
        return () => controller.abort();
    }, []);

    // On mobile viewports, start scrolled to the latest contribution weeks
    React.useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            const el = scrollRef.current;
            if (el && el.scrollWidth > el.clientWidth) {
                el.scrollLeft = el.scrollWidth;
            }
        });
        return () => cancelAnimationFrame(rafId);
    }, [data.weeks]);

    const half = Math.ceil(tools.length / 2);
    const rowOne = tools.slice(0, half);
    const rowTwo = tools.slice(half);
    const monthLabels = React.useMemo(
        () => getMonthHeaderLabels(data.weeks),
        [data.weeks]
    );

    // Roving tabindex: exactly one cell is tabbable (default: most recent day)
    const tabbableKey = React.useMemo(() => {
        if (activeCell && data.weeks.some((w, c) => w.some((d, r) => d && `${c},${r}` === activeCell))) {
            return activeCell;
        }
        for (let c = data.weeks.length - 1; c >= 0; c--) {
            for (let r = data.weeks[c].length - 1; r >= 0; r--) {
                if (data.weeks[c][r]) return `${c},${r}`;
            }
        }
        return null;
    }, [activeCell, data.weeks]);

    const moveFocus = (e: React.KeyboardEvent<HTMLButtonElement>, col: number, row: number) => {
        const weeks = data.weeks;
        const has = (c: number, r: number) => !!weeks[c]?.[r];
        let nc = col;
        let nr = row;
        switch (e.key) {
            case "ArrowRight": {
                let c = col + 1;
                while (c < weeks.length && !has(c, row)) c++;
                if (c < weeks.length) nc = c;
                break;
            }
            case "ArrowLeft": {
                let c = col - 1;
                while (c >= 0 && !has(c, row)) c--;
                if (c >= 0) nc = c;
                break;
            }
            case "ArrowDown": {
                let r = row + 1;
                while (r < weeks[col].length && !has(col, r)) r++;
                if (r < weeks[col].length) nr = r;
                break;
            }
            case "ArrowUp": {
                let r = row - 1;
                while (r >= 0 && !has(col, r)) r--;
                if (r >= 0) nr = r;
                break;
            }
            case "Home": {
                let c = 0;
                while (c < col && !has(c, row)) c++;
                nc = c;
                break;
            }
            case "End": {
                let c = weeks.length - 1;
                while (c > col && !has(c, row)) c--;
                nc = c;
                break;
            }
            default:
                return;
        }
        e.preventDefault();
        const key = `${nc},${nr}`;
        setActiveCell(key);
        cellRefs.current.get(key)?.focus();
    };

    const handleCellActivate = (
        e: React.SyntheticEvent<HTMLButtonElement>,
        day: ContributionDay,
        rowIdx: number
    ) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const cellRect = e.currentTarget.getBoundingClientRect();
        const x = cellRect.left - wrapperRect.left + cellRect.width / 2;
        const y = cellRect.top - wrapperRect.top;

        let align: TooltipState["align"] = "center";
        if (x < 96) align = "left";
        else if (x > wrapperRect.width - 96) align = "right";

        setTooltip({
            day,
            x,
            y,
            cellHeight: cellRect.height,
            placeBelow: rowIdx <= 1,
            align,
        });
    };

    const tooltipTransform =
        tooltip?.align === "left"
            ? "translateX(0)"
            : tooltip?.align === "right"
              ? "translateX(-100%)"
              : "translateX(-50%)";

    return (
        <div
            className={`bg-white/85 backdrop-blur-md border border-white/60 rounded-[2.5rem] shadow-xl ${className}`}
        >
            {/* Top Half: Live GitHub Contribution Heatmap */}
            <div className="px-6 pt-7 pb-6 md:px-10 md:pt-9 md:pb-8">
                {/* Header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-neutral-100/90 hover:bg-black text-neutral-900 hover:text-white border border-neutral-200/80 hover:border-black transition-colors duration-200 text-xs sm:text-sm font-semibold group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-4 h-4 fill-current shrink-0"
                        >
                            <path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.67.07-.67 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.39.11-2.89 0 0 .92-.29 3 1.12a10.42 10.42 0 0 1 5.46 0c2.08-1.41 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.76 1.12 1.73 1.12 2.92 0 4.18-2.55 5.1-4.98 5.37.39.34.74 1.01.74 2.04v3.02c0 .29.18.63.74.53A11 11 0 0 0 12 1.27Z" />
                        </svg>
                        <span>@{username}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4">
                        <span className="text-xs sm:text-sm font-medium text-neutral-600 tabular-nums">
                            {data.total} contributions in the last year
                        </span>

                        <div
                            className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-600"
                            aria-label="Contribution intensity legend"
                        >
                            <span>Less</span>
                            <div className="flex items-center gap-1">
                                {LEGEND_LEVELS.map((lv) => (
                                    <span
                                        key={lv}
                                        className={`w-2.5 h-2.5 rounded-[3px] ${
                                            lv === 0
                                                ? "bg-neutral-200/75"
                                                : lv === 1
                                                  ? "bg-neutral-300"
                                                  : lv === 2
                                                    ? "bg-neutral-500"
                                                    : lv === 3
                                                      ? "bg-neutral-700"
                                                      : "bg-black"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

                {/* Contribution Grid Wrapper (kept free of overflow-hidden so tooltips never clip) */}
                <div ref={wrapperRef} className="relative">
                    <div
                        ref={scrollRef}
                        onScroll={() => setTooltip(null)}
                        tabIndex={0}
                        role="group"
                        aria-label="Contribution heatmap, scrollable"
                        className="overflow-x-auto no-scrollbar pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-lg"
                    >
                        <div className="min-w-[660px] md:min-w-0 w-full">
                            {/* Month Labels */}
                            <div
                                className="grid gap-1 mb-1.5"
                                style={{
                                    gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))`,
                                }}
                                aria-hidden="true"
                            >
                                {data.weeks.map((_, colIdx) => (
                                    <div
                                        key={colIdx}
                                        className="text-[11px] font-medium text-neutral-600 leading-none select-none overflow-visible whitespace-nowrap"
                                    >
                                        {monthLabels.get(colIdx) ?? ""}
                                    </div>
                                ))}
                            </div>

                            {/* 39 Weeks x 7 Days Grid */}
                            <div
                                role="region"
                                aria-label="GitHub contribution activity heatmap"
                                className="grid gap-1"
                                style={{
                                    gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))`,
                                }}
                            >
                                {data.weeks.map((week, colIdx) => (
                                    <div
                                        key={colIdx}
                                        className="flex flex-col gap-1"
                                    >
                                        {week.map((day, rowIdx) => {
                                            if (!day) {
                                                return (
                                                    <span
                                                        key={rowIdx}
                                                        aria-hidden="true"
                                                        className="w-full aspect-square rounded-[3px] sm:rounded-[4px] bg-transparent"
                                                    />
                                                );
                                            }

                                            const ariaText = formatContributionLabel(day);
                                            return (
                                                <button
                                                    key={day.date}
                                                    type="button"
                                                    aria-label={ariaText}
                                                    ref={(el) => {
                                                        const k = `${colIdx},${rowIdx}`;
                                                        if (el) cellRefs.current.set(k, el);
                                                        else cellRefs.current.delete(k);
                                                    }}
                                                    tabIndex={tabbableKey === `${colIdx},${rowIdx}` ? 0 : -1}
                                                    onKeyDown={(e) => moveFocus(e, colIdx, rowIdx)}
                                                    onMouseEnter={(e) =>
                                                        handleCellActivate(e, day, rowIdx)
                                                    }
                                                    onMouseLeave={() => setTooltip(null)}
                                                    onFocus={(e) => {
                                                        setActiveCell(`${colIdx},${rowIdx}`);
                                                        handleCellActivate(e, day, rowIdx);
                                                    }}
                                                    onBlur={() => setTooltip(null)}
                                                    onClick={(e) =>
                                                        handleCellActivate(e, day, rowIdx)
                                                    }
                                                    className={`w-full aspect-square rounded-[3px] sm:rounded-[4px] ${CONTRIBUTION_LEVEL_STYLES[day.level]} transition-transform duration-150 hover:scale-125 focus-visible:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black touch-manipulation cursor-pointer`}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="md:hidden mt-2 text-[11px] font-medium text-neutral-600">
                        Swipe to see more weeks
                    </p>
                    <div aria-live="polite" className="sr-only">
                        {tooltip ? formatContributionLabel(tooltip.day) : ""}
                    </div>

                    {/* Floating Native React/Tailwind Tooltip */}
                    {tooltip && (
                        <div
                            role="tooltip"
                            style={{
                                left: `${tooltip.x}px`,
                                top: tooltip.placeBelow
                                    ? `${tooltip.y + tooltip.cellHeight + 8}px`
                                    : `${tooltip.y - 8}px`,
                                transform: tooltip.placeBelow
                                    ? tooltipTransform
                                    : `${tooltipTransform} translateY(-100%)`,
                            }}
                            className="absolute z-30 bg-neutral-950 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none tabular-nums"
                        >
                            {formatContributionLabel(tooltip.day)}
                        </div>
                    )}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200/80" />

            {/* Bottom Half: Dual-Row Counter-Scrolling Tech Stack Marquee */}
            <div className="px-6 py-7 md:px-10 md:py-8 space-y-3.5 overflow-hidden rounded-b-[2.5rem]">
                <MarqueeRow
                    tools={rowOne}
                    duration={duration}
                    label="Core automation, data and infrastructure tools"
                />
                <MarqueeRow
                    tools={rowTwo}
                    duration={duration}
                    reverse
                    label="Web development, API and cloud deployment tools"
                />
            </div>
        </div>
    );
}
