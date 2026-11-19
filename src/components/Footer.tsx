"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Pure Geometry, Gaze, Physics & Storyboard Timing                           */
/* -------------------------------------------------------------------------- */

const hash = (n: number): number => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
};

const clamp = (v: number, lo: number, hi: number): number =>
    v < lo ? lo : v > hi ? hi : v;

type Seat = "front" | "top" | "behind";
type CrewKind = "bird" | "kid" | "ghost" | "cat";
type DoodleKind = "star" | "sparkle" | "bolt" | "plane" | "spiral";

interface CrewMember {
    kind: CrewKind;
    letter: number;
    seat?: Seat;
    offset?: number;
    scale?: number;
    flip?: boolean;
    name: string;
    says: string;
}

interface Floater {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    vr: number;
    fall: number;
    phase: number;
    pop: number;
}

const layoutWord = (
    advances: number[],
    tracking: number,
    fontSize: number
): { x: number[]; w: number[]; width: number } => {
    const x: number[] = [];
    const w: number[] = [];
    let at = 0;
    const gap = (Number.isFinite(tracking) ? tracking : 0) * fontSize;
    for (let i = 0; i < advances.length; i++) {
        const a = Number.isFinite(advances[i]) && advances[i] > 0 ? advances[i] : 0;
        x.push(at);
        w.push(a);
        at += a + (i < advances.length - 1 ? gap : 0);
    }
    return { x, w, width: Math.max(0, at) };
};

const seatPoint = (
    seat: Seat,
    letterX: number,
    letterW: number,
    cap: number,
    offset: number,
    scale: number
): { x: number; y: number } => {
    const x = letterX + letterW * (0.5 + (Number.isFinite(offset) ? offset : 0));
    if (seat === "top") return { x, y: -cap };
    if (seat === "behind") return { x, y: -cap + 30 * scale };
    return { x, y: 0 };
};

const lookAt = (
    ex: number,
    ey: number,
    tx: number,
    ty: number,
    max: number,
    reach: number
): { x: number; y: number } => {
    const dx = tx - ex;
    const dy = ty - ey;
    const d = Math.hypot(dx, dy);
    if (!Number.isFinite(d) || d < 1e-6 || max <= 0) return { x: 0, y: 0 };
    const k = (max * Math.min(1, d / Math.max(1e-6, reach))) / d;
    return { x: dx * k, y: dy * k };
};

const stepFloater = (
    f: Floater,
    dt: number,
    t: number,
    w: number,
    h: number,
    px: number,
    py: number,
    radius: number,
    rand: () => number
): Floater => {
    const step = clamp(Number.isFinite(dt) ? dt : 0, 0, 0.05);
    const m = 40;
    if (f.pop > 0) {
        f.pop -= step;
        if (f.pop <= 0) {
            f.pop = 0;
            f.x = rand() * w;
            f.y = -m;
            f.vx = 0;
            f.vy = f.fall;
        }
        return f;
    }
    const sway = Math.sin(t * 0.7 + f.phase) * 14;
    if (Number.isFinite(px) && Number.isFinite(py) && radius > 0) {
        const dx = f.x - px;
        const dy = f.y - py;
        const d = Math.hypot(dx, dy);
        if (d < radius && d > 0.01) {
            const k = (1 - d / radius) * (1 - d / radius) * 2400;
            f.vx += (dx / d) * k * step;
            f.vy += (dy / d) * k * step;
            f.vr += (dx > 0 ? 1 : -1) * k * 0.004 * step;
        }
    }
    const ease = Math.min(1, step * 2.4);
    f.vx += (sway - f.vx) * ease;
    f.vy += (f.fall - f.vy) * ease;
    f.vr += (Math.sin(f.phase * 3) * 18 - f.vr) * Math.min(1, step * 0.8);
    f.x += f.vx * step;
    f.y += f.vy * step;
    f.rot = (f.rot + f.vr * step) % 360;
    if (f.y > h + m) {
        f.y = -m;
        f.x = rand() * w;
    } else if (f.y < -m * 3) {
        f.y = h + m;
    }
    if (f.x < -m) f.x = w + m;
    else if (f.x > w + m) f.x = -m;
    return f;
};

const timeline = (letters: number, crewCount: number) => {
    const L = Math.max(0, Math.floor(letters) || 0);
    const C = Math.max(0, Math.floor(crewCount) || 0);
    const letter = (i: number) => 160 + i * 80;
    const crewStart = letter(Math.max(0, L - 1)) + 420;
    const member = (j: number) => crewStart + j * 130;
    const doodles = crewStart + Math.max(0, C - 1) * 130 * 0.5;
    return { ground: 60, letter, crewStart, member, doodles };
};

/* -------------------------------------------------------------------------- */
/* Portfolio Configuration & Monochrome Chalk-on-Black Artwork                */
/* -------------------------------------------------------------------------- */

const WORDMARK = "RIDHO.";
const EMAIL = "ridhoali1922@gmail.com";
const FONT_SIZE = 200;
const TRACKING = -0.02;
const FONT_FAMILY =
    'Inter, "Arial Black", "Helvetica Neue", Helvetica, Arial, sans-serif';

const CREW: CrewMember[] = [
    {
        kind: "bird",
        letter: 0,
        seat: "top",
        offset: 0.02,
        name: "Minerva",
        says: "Minerva is watching the cron jobs.",
    },
    {
        kind: "kid",
        letter: 2,
        seat: "top",
        offset: -0.05,
        name: "Ridho",
        says: "Zero server bills up here!",
    },
    {
        kind: "ghost",
        letter: 3,
        seat: "behind",
        offset: 0,
        name: "Phantom",
        says: "Still automating spreadsheets...",
    },
    {
        kind: "cat",
        letter: 5,
        seat: "front",
        offset: 0.25,
        flip: true,
        name: "Kuro",
        says: "Meow. Nice cursor.",
    },
];

const DOODLES: DoodleKind[] = [
    "star",
    "sparkle",
    "bolt",
    "plane",
    "spiral",
    "star",
    "sparkle",
];

const PAGE_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Articles", href: "/articles" },
];

const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/mhmmdridhali" },
    { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-ali-ridho" },
    {
        label: "Instagram",
        href: "https://www.instagram.com/mhmmdridhali",
    },
    { label: "Medium", href: "https://medium.com/@mhmmdaliridh" },
];

type Eye = { x: number; y: number; r: number; pupil: number; max: number };
type Art = {
    k: number;
    box: { l: number; r: number; t: number; b: number };
    eyes: Eye[];
    seat: Seat;
    body: (hatch: string) => React.ReactNode;
    front?: () => React.ReactNode;
    idle?: string;
};

const ART: Record<CrewKind, Art> = {
    bird: {
        k: 1.22,
        box: { l: -34, r: 30, t: -62, b: 2 },
        seat: "top",
        eyes: [
            { x: 3, y: -30, r: 4.6, pupil: 2.3, max: 2 },
            { x: 12, y: -31, r: 4.6, pupil: 2.3, max: 2 },
        ],
        idle: "dcf-peck",
        body: (hatch) => (
            <>
                <path
                    className="n"
                    d="M-5 0 L-5 -7 M-9 0 L-1 0 M5 0 L5 -7 M1 0 L9 0"
                />
                <path d="M-17 -16 C-26 -18 -31 -14 -33 -9 C-26 -10 -20 -8 -15 -10 Z" />
                <path d="M-18 -14 C-20 -30 -10 -40 2 -40 C16 -40 22 -28 20 -16 C18 -6 8 -4 0 -4 C-10 -4 -17 -8 -18 -14 Z" />
                <path
                    d="M-11 -25 C-3 -26 1 -18 -3 -13 C-9 -12 -15 -17 -11 -25 Z"
                    fill={hatch}
                />
                <path className="o" d="M19 -30 L29 -27 L19 -23 Z" />
                <path className="a" d="M-3 -38 L4 -59 L12 -37 Z" />
                <path className="n thin" d="M-1 -44 L10 -46 M1 -51 L8 -52" />
                <circle cx="4" cy="-60" r="2.8" />
            </>
        ),
    },
    kid: {
        k: 1.28,
        box: { l: -30, r: 30, t: -88, b: 42 },
        seat: "top",
        eyes: [
            { x: -6, y: -58, r: 0, pupil: 2.5, max: 1.8 },
            { x: 6.5, y: -58, r: 0, pupil: 2.5, max: 1.8 },
        ],
        body: (hatch) => (
            <>
                <path d="M-15 -6 L-3 -6 C-3 8 -5 20 -6 30 L-15 30 C-15 18 -16 6 -15 -6 Z" />
                <path d="M3 -6 L15 -6 C17 6 19 16 22 27 L12 30 C10 18 6 6 3 -6 Z" />
                <path
                    d="M3 -6 L15 -6 C17 6 19 16 22 27 L12 30 C10 18 6 6 3 -6 Z"
                    fill={hatch}
                    stroke="none"
                />
                <path
                    className="k"
                    d="M-17 30 C-20 34 -20 40 -14 41 L-2 41 C2 40 0 34 -5 30 Z"
                />
                <path
                    className="k"
                    d="M11 29 C8 34 10 40 16 40 L26 38 C29 36 27 30 22 27 Z"
                />
                <path d="M-20 -4 C-22 -20 -18 -38 -10 -44 L10 -44 C18 -38 22 -20 20 -4 Z" />
                <path
                    className="n thick"
                    d="M-19.5 -14 L19.5 -14 M-18.5 -26 L18.5 -26 M-14 -36 L14 -36"
                />
                <path className="n" d="M-18 -36 C-28 -28 -30 -14 -26 -5" />
                <circle cx="-26" cy="-3" r="4" />
                <path className="n" d="M18 -36 C27 -30 30 -18 28 -7" />
                <circle cx="28" cy="-4" r="4" />
                <circle cx="-17" cy="-58" r="4" />
                <circle cx="17" cy="-58" r="4" />
                <circle cx="0" cy="-60" r="17" />
                <path
                    className="n thin"
                    d="M-11 -52 l2 -2 M-8 -52 l2 -2 M8 -52 l2 -2 M11 -52 l2 -2"
                />
                <path className="n" d="M-5 -50 C-2 -47 2 -47 5 -50" />
                <path d="M-15 -70 C-14 -87 14 -87 15 -70 Z" />
                <path d="M-27 -68 C-16 -75 16 -75 27 -68 C18 -63 -18 -63 -27 -68 Z" />
                <path
                    className="n thick"
                    d="M-14.5 -74 C-6 -77 6 -77 14.5 -74"
                />
            </>
        ),
    },
    ghost: {
        k: 1.3,
        box: { l: -26, r: 26, t: -70, b: 0 },
        seat: "behind",
        eyes: [
            { x: -8, y: -44, r: 6.5, pupil: 3.2, max: 3 },
            { x: 9, y: -44, r: 6.5, pupil: 3.2, max: 3 },
        ],
        idle: "dcf-bob",
        body: (hatch) => (
            <>
                <path d="M-23 -14 L-23 -40 C-23 -59 -12 -67 0 -67 C12 -67 23 -59 23 -40 L23 -14 C12 -10 -12 -10 -23 -14 Z" />
                <path
                    d="M13 -61 C21 -54 23 -46 23 -36 L23 -15 L15 -13 L15 -36 C15 -46 15 -54 13 -61 Z"
                    fill={hatch}
                    stroke="none"
                />
                <path className="n thin" d="M-16 -56 C-12 -61 -6 -63 -2 -63" />
                <path className="k" d="M-5 -33 C-3 -27 4 -27 6 -33 Z" />
                <path
                    className="n thin"
                    d="M-17 -35 l3 -2 M-14 -34 l3 -2 M14 -35 l3 -2 M17 -34 l3 -2"
                />
            </>
        ),
        front: () => (
            <>
                <path d="M-25 -32 C-27 -38 -21 -42 -17 -38 C-15 -42 -10 -41 -10 -36 L-11 -30 C-15 -28 -22 -28 -25 -32 Z" />
                <path d="M25 -32 C27 -38 21 -42 17 -38 C15 -42 10 -41 10 -36 L11 -30 C15 -28 22 -28 25 -32 Z" />
            </>
        ),
    },
    cat: {
        k: 1.06,
        box: { l: -30, r: 52, t: -110, b: 4 },
        seat: "front",
        eyes: [{ x: 10, y: -76, r: 6, pupil: 2.8, max: 2.6 }],
        body: (hatch) => (
            <>
                <ellipse className="dcf-shadow" cx="4" cy="2" rx="32" ry="4" />
                <g className="dcf-tail">
                    <path d="M18 -4 C42 -4 52 -24 46 -44 C44 -51 36 -53 34 -46 C40 -30 34 -16 16 -14 Z" />
                    <path
                        className="n thin"
                        d="M40 -16 l5 4 M45 -30 l6 1 M43 -42 l6 -3"
                    />
                </g>
                <path d="M-22 0 C-28 -18 -24 -42 -14 -52 L14 -52 C24 -42 28 -18 22 0 C10 3 -10 3 -22 0 Z" />
                <path
                    d="M14 -46 C24 -36 26 -16 22 0 C18 1 14 2 12 2 C16 -14 16 -32 10 -46 Z"
                    fill={hatch}
                    stroke="none"
                />
                <path className="n" d="M-8 -30 L-9 -1 M8 -30 L9 -1" />
                <path d="M-16 1 C-16 -5 -3 -5 -3 1 Z M3 1 C3 -5 16 -5 16 1 Z" />
                <path
                    className="a"
                    d="M-18 -55 C-6 -49 6 -49 18 -55 L17 -46 C6 -40 -6 -40 -17 -46 Z"
                />
                <path className="a" d="M9 -45 L18 -32 L6 -37 Z" />
                <path d="M-22 -86 L-25 -107 L-7 -96 Z" />
                <path d="M8 -96 L23 -108 L22 -86 Z" />
                <path
                    className="n thin"
                    d="M-20 -92 L-21 -101 M18 -101 L18 -92"
                />
                <path d="M-26 -70 C-28 -88 -16 -98 0 -98 C16 -98 28 -88 26 -70 C24 -56 12 -50 0 -50 C-12 -50 -24 -56 -26 -70 Z" />
                <path className="n thin" d="M-4 -97 L-3 -90 M3 -97 L3 -91" />
                <path
                    className="n"
                    d="M-26 -80 C-14 -83 4 -87 25 -93"
                />
                <ellipse className="k" cx="-10" cy="-76" rx="7.5" ry="6.5" />
                <path className="k" d="M-2.5 -68 L2.5 -68 L0 -64.5 Z" />
                <path
                    className="n"
                    d="M0 -64.5 C-1 -60.5 -5 -60.5 -6 -62.5 M0 -64.5 C1 -60.5 5 -60.5 6 -62.5"
                />
                <path
                    className="n thin"
                    d="M-15 -66 L-29 -68 M-15 -63 L-28 -59 M15 -66 L29 -68 M15 -63 L28 -59"
                />
            </>
        ),
    },
};

function DoodleGraphic({ kind }: { kind: DoodleKind }) {
    switch (kind) {
        case "star":
            return (
                <path
                    fill="#a3a3a3"
                    d="M0 -13 L3.6 -4.4 L13 -4 L5.8 2.2 L8.2 12 L0 6.6 L-8.2 12 L-5.8 2.2 L-13 -4 L-3.6 -4.4 Z"
                />
            );
        case "sparkle":
            return (
                <path
                    fill="#f8fafc"
                    d="M0 -13 C1 -4 4 -1 13 0 C4 1 1 4 0 13 C-1 4 -4 1 -13 0 C-4 -1 -1 -4 0 -13 Z"
                />
            );
        case "bolt":
            return (
                <path
                    fill="#e5e5e5"
                    d="M3 -14 L-8 2 L-1 2 L-4 14 L8 -3 L1 -3 Z"
                />
            );
        case "spiral":
            return (
                <path
                    fill="none"
                    d="M0 0 C2 -2 4 0 3 3 C1 6 -4 5 -5 1 C-6 -4 -1 -8 4 -7 C9 -5 10 2 7 6"
                />
            );
        case "plane":
            return (
                <>
                    <path
                        className="dcf-paperfill"
                        d="M-13 -1 L13 -10 L4 12 L0 3 Z"
                    />
                    <path fill="none" d="M0 3 L13 -10 M0 3 L-2 9 L2 5" />
                </>
            );
    }
}

type Metrics = { advances: number[]; cap: number };

const estimateMetrics = (word: string): Metrics => ({
    advances: Array.from(word).map(
        (c) =>
            (c === " "
                ? 0.3
                : /[IJ1.]/.test(c)
                ? 0.42
                : /[MW]/.test(c)
                ? 0.98
                : 0.76) * FONT_SIZE
    ),
    cap: 0.73 * FONT_SIZE,
});

const measureMetrics = (word: string, family: string): Metrics | null => {
    if (typeof document === "undefined") return null;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return null;
    ctx.font = `900 ${FONT_SIZE}px ${family}`;
    const chars = Array.from(word);
    const advances: number[] = [];
    let prev = 0;
    for (let i = 0; i < chars.length; i++) {
        const wNow = ctx.measureText(chars.slice(0, i + 1).join("")).width;
        advances.push(wNow - prev);
        prev = wNow;
    }
    const m = ctx.measureText(word.replace(/\s/g, "") || "H");
    const cap =
        m.actualBoundingBoxAscent > 0
            ? m.actualBoundingBoxAscent
            : 0.73 * FONT_SIZE;
    return { advances, cap };
};

const SquiggleSvg = () => (
    <svg
        className="dcf-squiggle"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        aria-hidden="true"
    >
        <path
            pathLength={1}
            d="M1 5 C10 1 16 7 25 4 S40 1 50 4 S66 7 75 4 S90 1 99 4"
        />
    </svg>
);

export default function Footer() {
    const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const chars = React.useMemo(() => Array.from(WORDMARK), []);

    const [copied, setCopied] = React.useState(false);
    const [metrics, setMetrics] = React.useState(() =>
        estimateMetrics(WORDMARK)
    );
    const [play, setPlay] = React.useState(false);
    const [reduced, setReduced] = React.useState(false);
    const [talking, setTalking] = React.useState(-1);
    const [crewFocus, setCrewFocus] = React.useState(0);
    const [hopping, setHopping] = React.useState(-1);

    const rootRef = React.useRef<HTMLElement | null>(null);
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const worldRef = React.useRef<HTMLDivElement | null>(null);
    const talkTimerRef = React.useRef(0);

    const simRef = React.useRef({
        floaters: [] as Floater[],
        w: 0,
        h: 0,
        px: NaN,
        py: NaN,
        inside: false,
        visible: false,
        gaze: [] as {
            x: number;
            y: number;
            tx: number;
            ty: number;
            next: number;
            blinkAt: number;
            blink: number;
            offsets: Record<number, { x: number; y: number }>;
        }[],
        seed: 1,
        start: 0,
    });

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2200);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    // Measure actual font glyphs after mount and when web fonts settle
    React.useEffect(() => {
        let alive = true;
        const run = () => {
            const m = measureMetrics(WORDMARK, FONT_FAMILY);
            if (alive && m) setMetrics(m);
        };
        const rafId = requestAnimationFrame(run);
        const fonts = typeof document !== "undefined" ? document.fonts : undefined;
        if (fonts) {
            fonts.ready.then(() => alive && run());
            fonts.addEventListener?.("loadingdone", run);
        }
        return () => {
            alive = false;
            cancelAnimationFrame(rafId);
            fonts?.removeEventListener?.("loadingdone", run);
        };
    }, []);

    const layout = React.useMemo(
        () => layoutWord(metrics.advances, TRACKING, FONT_SIZE),
        [metrics]
    );
    const cap = metrics.cap;

    const placed = React.useMemo(
        () =>
            CREW.map((m, i) => {
                const art = ART[m.kind];
                const li = clamp(Math.floor(m.letter) || 0, 0, chars.length - 1);
                const scale = (cap / 144) * art.k * (m.scale ?? 1);
                const seat = m.seat || art.seat;
                const p = seatPoint(
                    seat,
                    layout.x[li],
                    layout.w[li],
                    cap,
                    m.offset ?? 0,
                    scale
                );
                return {
                    i,
                    m,
                    art,
                    seat,
                    scale,
                    ...p,
                    flip: m.flip ? -1 : 1,
                };
            }),
        [chars.length, layout, cap]
    );

    const view = React.useMemo(() => {
        let l = 0;
        let r = layout.width;
        let t = -cap;
        let b = 30;
        for (const p of placed) {
            const bx =
                p.flip > 0
                    ? [p.art.box.l, p.art.box.r]
                    : [-p.art.box.r, -p.art.box.l];
            l = Math.min(l, p.x + bx[0] * p.scale);
            r = Math.max(r, p.x + bx[1] * p.scale);
            t = Math.min(t, p.y + p.art.box.t * p.scale);
            b = Math.max(b, p.y + p.art.box.b * p.scale);
        }
        const pad = 24;
        return {
            x: l - pad,
            y: t - pad,
            w: r - l + pad * 2,
            h: b - t + pad * 2,
        };
    }, [layout, placed, cap]);

    const tl = React.useMemo(
        () => timeline(chars.length, placed.length),
        [chars.length, placed.length]
    );

    const ground = React.useMemo(() => {
        const x0 = view.x + 6;
        const x1 = view.x + view.w - 6;
        let d = `M${x0.toFixed(1)} 6`;
        const n = 14;
        for (let k = 1; k <= n; k++) {
            const x = x0 + ((x1 - x0) * k) / n;
            const cx = x - (x1 - x0) / n / 2;
            const cy = 6 + (hash(k * 3.1) - 0.5) * 5;
            const ey = 6 + (hash(k * 7.7) - 0.5) * 2;
            d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(
                1
            )} ${ey.toFixed(1)}`;
        }
        let tufts = "";
        for (let k = 0; k < 20; k++) {
            const x = x0 + 20 + hash(k * 11.3) * (x1 - x0 - 40);
            const s = 0.7 + hash(k * 5.9) * 0.6;
            tufts += `M${x.toFixed(1)} 6 l${(2 * s).toFixed(1)} ${(
                -9 * s
            ).toFixed(1)} M${(x + 3 * s).toFixed(1)} 6 l${(1 * s).toFixed(
                1
            )} ${(-12 * s).toFixed(1)} M${(x + 6 * s).toFixed(1)} 6 l${(
                -1 * s
            ).toFixed(1)} ${(-7 * s).toFixed(1)} `;
        }
        const pebbles = Array.from({ length: 8 }, (_, k) => ({
            x: x0 + 40 + hash(k * 17.1) * (x1 - x0 - 80),
            y: 14 + hash(k * 2.3) * 8,
            r: 2 + hash(k * 9.4) * 2.5,
        }));
        return { d, tufts, pebbles };
    }, [view]);

    const doodleList = React.useMemo(
        () =>
            DOODLES.map((kind, k) => ({
                kind,
                size: 20 + hash(k * 4.7) * 12,
                seed: k,
            })),
        []
    );

    const paintDoodles = React.useCallback(() => {
        const world = worldRef.current;
        if (!world) return;
        const s = simRef.current;
        const k = clamp(s.w / 1100, 0.52, 1);
        const nodes = world.querySelectorAll<HTMLDivElement>("[data-doodle-idx]");
        nodes.forEach((el) => {
            const idx = Number(el.dataset.doodleIdx);
            const f = s.floaters[idx];
            if (!f) return;
            let sc = k;
            let op = 0.85;
            if (f.pop > 0) {
                const age = 1.4 - f.pop;
                sc = k * (1 + Math.min(1, age / 0.3) * 0.7);
                op = Math.max(0, 0.85 - (age / 0.3) * 0.85);
            }
            el.style.transform = `translate3d(${f.x.toFixed(1)}px,${f.y.toFixed(
                1
            )}px,0) rotate(${f.rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
            el.style.opacity = String(op);
        });
    }, []);

    // Respect prefers-reduced-motion
    React.useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const rafId = requestAnimationFrame(() => setReduced(mq.matches));
        const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
        mq.addEventListener?.("change", onChange);
        return () => {
            cancelAnimationFrame(rafId);
            mq.removeEventListener?.("change", onChange);
        };
    }, []);

    // Initialize floating doodles & resize tracking
    React.useEffect(() => {
        const el = worldRef.current;
        if (!el) return;
        const s = simRef.current;

        const updateSize = () => {
            const r = el.getBoundingClientRect();
            const ow = s.w;
            const oh = s.h;
            s.w = r.width;
            s.h = r.height;
            if (s.floaters.length !== doodleList.length || !ow) {
                s.floaters = doodleList.map((_, k) => ({
                    x:
                        (0.05 +
                            0.9 *
                                ((k + hash(k * 9.1) * 0.8) /
                                    Math.max(1, doodleList.length))) *
                        r.width,
                    y: (0.04 + hash(k * 3.3) * 0.6) * r.height,
                    vx: 0,
                    vy: 0,
                    rot: (hash(k * 1.7) - 0.5) * 50,
                    vr: (hash(k * 6.1) - 0.5) * 30,
                    fall: 9 + hash(k * 2.9) * 14,
                    phase: hash(k * 8.3) * Math.PI * 2,
                    pop: 0,
                }));
            } else if (ow && oh) {
                for (const f of s.floaters) {
                    f.x *= r.width / ow;
                    f.y *= r.height / oh;
                }
            }
            paintDoodles();
        };

        const rafId = requestAnimationFrame(updateSize);
        if (typeof ResizeObserver === "undefined") {
            return () => cancelAnimationFrame(rafId);
        }
        const ro = new ResizeObserver(updateSize);
        ro.observe(el);
        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, [doodleList, paintDoodles]);

    // Trigger storyboard when footer scrolls into view; pause loop when off-screen
    React.useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const s = simRef.current;
        if (typeof IntersectionObserver === "undefined") {
            s.visible = true;
            const rafId = requestAnimationFrame(() => setPlay(true));
            return () => cancelAnimationFrame(rafId);
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    s.visible = e.isIntersecting;
                    if (e.isIntersecting && e.intersectionRatio > 0.12) {
                        setPlay(true);
                    }
                }
            },
            { threshold: [0, 0.12, 0.3] }
        );
        io.observe(root);
        return () => io.disconnect();
    }, []);

    React.useEffect(() => {
        if (play && !simRef.current.start) {
            simRef.current.start = performance.now();
        }
    }, [play]);

    // Living animation loop: eyes track cursor/taps, blink, doodles drift, line boil
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const s = simRef.current;
        const svg = svgRef.current;
        if (!svg) return;

        // Cache DOM nodes outside the render cycle (0 ref mutations during render)
        const blinkNodes = new Map<string, SVGGElement>();
        const pupilNodes = new Map<string, SVGGElement>();
        svg.querySelectorAll<SVGGElement>("[data-eye-blink]").forEach((el) => {
            if (el.dataset.eyeBlink) blinkNodes.set(el.dataset.eyeBlink, el);
        });
        svg.querySelectorAll<SVGGElement>("[data-eye-pupil]").forEach((el) => {
            if (el.dataset.eyePupil) pupilNodes.set(el.dataset.eyePupil, el);
        });
        const boilLayers = Array.from(
            svg.querySelectorAll<SVGGElement>("[data-crew-layer]")
        );

        let raf = 0;
        let last = performance.now();
        let boilAt = 0;
        let boil = 0;

        const rand = () => {
            s.seed = (s.seed * 16807) % 2147483647;
            return s.seed / 2147483647;
        };

        const svgPoint = (cx: number, cy: number) => {
            const m = svg.getScreenCTM();
            if (!m) return null;
            const inv = m.inverse();
            return {
                x: inv.a * cx + inv.c * cy + inv.e,
                y: inv.b * cx + inv.d * cy + inv.f,
            };
        };

        const frame = (now: number) => {
            raf = requestAnimationFrame(frame);
            if (!s.visible || document.hidden) {
                last = now;
                return;
            }
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const t = now / 1000;

            const target = s.inside ? svgPoint(s.px, s.py) : null;

            for (let c = 0; c < placed.length; c++) {
                const p = placed[c];
                const g = (s.gaze[c] ||= {
                    x: 0,
                    y: 0,
                    tx: 0,
                    ty: 0,
                    next: 0,
                    blinkAt: t + 1 + hash(c * 3.7) * 3,
                    blink: 0,
                    offsets: {},
                });
                if (!target && t > g.next) {
                    const other =
                        placed[
                            (c +
                                1 +
                                Math.floor(
                                    rand() * Math.max(1, placed.length - 1)
                                )) %
                                placed.length
                        ];
                    if (other && rand() < 0.45) {
                        g.tx = other.x;
                        g.ty = other.y - 60 * other.scale;
                    } else {
                        g.tx = p.x + (rand() - 0.5) * 900;
                        g.ty =
                            p.y - 80 * p.scale + (rand() - 0.5) * 500;
                    }
                    g.next = t + 1.4 + rand() * 2.6;
                }
                if (t > g.blinkAt) {
                    g.blink = 0.16;
                    g.blinkAt = t + 2.2 + rand() * 4;
                }
                g.blink = Math.max(0, g.blink - dt);
                const lid =
                    g.blink > 0
                        ? 0.12 + (Math.abs(g.blink - 0.08) / 0.08) * 0.88
                        : 1;

                for (let e = 0; e < p.art.eyes.length; e++) {
                    const eye = p.art.eyes[e];
                    const ex = p.x + eye.x * p.scale * p.flip;
                    const ey = p.y + eye.y * p.scale;
                    const tx = target ? target.x : g.tx;
                    const ty = target ? target.y : g.ty;
                    const o = lookAt(ex, ey, tx, ty, eye.max, 220);

                    const prev = g.offsets[e] || { x: 0, y: 0 };
                    const ease = Math.min(1, dt * (target ? 14 : 6));
                    const nx = prev.x + (o.x * p.flip - prev.x) * ease;
                    const ny = prev.y + (o.y - prev.y) * ease;
                    g.offsets[e] = { x: nx, y: ny };

                    const pupilEl = pupilNodes.get(`${p.i}-${e}`);
                    if (pupilEl) {
                        pupilEl.setAttribute(
                            "transform",
                            `translate(${nx.toFixed(2)} ${ny.toFixed(2)})`
                        );
                    }
                    const blinkEl = blinkNodes.get(`${p.i}-${e}`);
                    if (blinkEl) {
                        blinkEl.setAttribute(
                            "transform",
                            `translate(0 ${(eye.y * (1 - lid)).toFixed(
                                2
                            )}) scale(1 ${lid.toFixed(3)})`
                        );
                    }
                }
            }

            const world = worldRef.current;
            if (world && s.floaters.length) {
                const started =
                    play && s.start
                        ? now - s.start > tl.doodles || reduced
                        : false;
                if (started) {
                    const r = world.getBoundingClientRect();
                    const px = s.inside ? s.px - r.left : NaN;
                    const py = s.inside ? s.py - r.top : NaN;
                    if (!reduced) {
                        for (const f of s.floaters) {
                            stepFloater(f, dt, t, s.w, s.h, px, py, 100, rand);
                        }
                    }
                    paintDoodles();
                }
            }

            if (!reduced && now - boilAt > 125) {
                boilAt = now;
                boil = (boil + 1) % 3;
                const fUrl = `url(#${uid}-boil${boil})`;
                for (const layerEl of boilLayers) {
                    layerEl.setAttribute("filter", fUrl);
                }
            }
        };

        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
    }, [placed, play, reduced, uid, tl.doodles, paintDoodles]);

    React.useEffect(() => () => window.clearTimeout(talkTimerRef.current), []);

    const onPointerMove = (e: React.PointerEvent) => {
        const s = simRef.current;
        s.px = e.clientX;
        s.py = e.clientY;
        s.inside = true;
    };

    const onPointerLeave = () => {
        simRef.current.inside = false;
    };

    const poke = (c: number) => {
        setTalking(c);
        setHopping(-1);
        requestAnimationFrame(() => setHopping(c));
        window.clearTimeout(talkTimerRef.current);
        talkTimerRef.current = window.setTimeout(() => {
            setTalking(-1);
            setHopping(-1);
        }, 2600);
    };

    const popDoodle = (k: number) => {
        const f = simRef.current.floaters[k];
        if (f && f.pop <= 0) {
            f.pop = 1.4;
            paintDoodles();
        }
    };

    const scrollToTop = () => {
        if (typeof window === "undefined") return;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    };

    const hatch = `url(#${uid}-hatch)`;
    const pct = (v: number, base: number, span: number) =>
        `${(((v - base) / span) * 100).toFixed(3)}%`;

    const renderCrew = (p: (typeof placed)[number], part: "body" | "front") => (
        <g
            key={p.i + part}
            transform={`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) scale(${(
                p.scale * p.flip
            ).toFixed(4)} ${p.scale.toFixed(4)})`}
        >
            <g
                className={`dcf-arrive dcf-arrive-${p.seat}`}
                style={{ "--d": `${tl.member(p.i)}ms` } as React.CSSProperties}
            >
                <g className={`dcf-hopper${hopping === p.i ? " is-hop" : ""}`}>
                    <g
                        className={`dcf-art${
                            p.art.idle ? ` ${p.art.idle}` : ""
                        }`}
                        style={{ "--i": p.i } as React.CSSProperties}
                    >
                        {part === "body" ? (
                            <>
                                {p.art.body(hatch)}
                                {p.art.eyes.map((eye, e) => (
                                    <g key={e} data-eye-blink={`${p.i}-${e}`}>
                                        {eye.r > 0 && (
                                            <circle
                                                cx={eye.x}
                                                cy={eye.y}
                                                r={eye.r}
                                            />
                                        )}
                                        <g data-eye-pupil={`${p.i}-${e}`}>
                                            <circle
                                                className="k"
                                                cx={eye.x}
                                                cy={eye.y}
                                                r={eye.pupil}
                                            />
                                            <circle
                                                className="dcf-glint"
                                                cx={eye.x + eye.pupil * 0.35}
                                                cy={eye.y - eye.pupil * 0.4}
                                                r={eye.pupil * 0.32}
                                            />
                                        </g>
                                    </g>
                                ))}
                            </>
                        ) : (
                            p.art.front?.()
                        )}
                    </g>
                </g>
            </g>
        </g>
    );

    return (
        <footer
            id="contact"
            ref={rootRef}
            className="dcf bg-[#0a0a0a] text-[#f8fafc] pt-16 md:pt-20 pb-24 md:pb-10 px-4 md:px-6 rounded-t-[3rem] mt-12 relative overflow-hidden"
            data-play={play || reduced ? "1" : "0"}
            data-interactive="1"
            onPointerMove={onPointerMove}
            onPointerDown={onPointerMove}
            onPointerLeave={onPointerLeave}
        >
            {/* Subtle background ambient shape */}
            <div
                className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
                aria-hidden="true"
            />

            {/* Top Band: Let's Connect + Quick Links */}
            <div
                className="dcf-rise max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 relative z-10"
                style={{ "--d": "0ms" } as React.CSSProperties}
            >
                {/* Left Column */}
                <div className="md:col-span-7">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-neutral-400 text-base sm:text-lg max-w-md leading-relaxed">
                        Open for opportunities, collaborations, or a simple chat
                        about data and technology.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                            href={`mailto:${EMAIL}`}
                            className="dcf-link text-base sm:text-xl font-medium text-white hover:text-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xs"
                        >
                            <span>{EMAIL}</span>
                            <SquiggleSvg />
                        </a>
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            aria-label="Copy email address"
                            className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">
                                        Copied
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Columns: Pages & Connect */}
                <nav
                    aria-label="Footer navigation"
                    className="md:col-span-5 grid grid-cols-2 gap-8 md:justify-items-end"
                >
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                            Pages
                        </h3>
                        <ul className="space-y-2">
                            {PAGE_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="dcf-link text-sm font-medium text-neutral-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xs"
                                    >
                                        <span>{link.label}</span>
                                        <SquiggleSvg />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                            Connect
                        </h3>
                        <ul className="space-y-2">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dcf-link text-sm font-medium text-neutral-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xs"
                                    >
                                        <span>{link.label}</span>
                                        <SquiggleSvg />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Center Stage: Giant Ink Wordmark "RIDHO." + Doodle Crew */}
            <div
                className="relative max-w-6xl mx-auto pt-10 md:pt-14"
                ref={worldRef}
            >
                <div className="relative z-10">
                    <span className="sr-only">{WORDMARK}</span>
                    <svg
                        ref={svgRef}
                        className="dcf-svg"
                        viewBox={`${view.x.toFixed(1)} ${view.y.toFixed(
                            1
                        )} ${view.w.toFixed(1)} ${view.h.toFixed(1)}`}
                        role="group"
                        aria-label={`${WORDMARK} interactive chalk crew`}
                    >
                        <defs>
                            <pattern
                                id={`${uid}-hatch`}
                                width="4.6"
                                height="4.6"
                                patternUnits="userSpaceOnUse"
                                patternTransform="rotate(38)"
                            >
                                <line
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="4.6"
                                    stroke="#f8fafc"
                                    strokeWidth="1.25"
                                />
                            </pattern>
                            {[0, 1, 2].map((k) => (
                                <filter
                                    key={k}
                                    id={`${uid}-boil${k}`}
                                    x="-10%"
                                    y="-10%"
                                    width="120%"
                                    height="120%"
                                >
                                    <feTurbulence
                                        type="fractalNoise"
                                        baseFrequency="0.035"
                                        numOctaves="2"
                                        seed={k * 7 + 3}
                                        result="n"
                                    />
                                    <feDisplacementMap
                                        in="SourceGraphic"
                                        in2="n"
                                        scale="2.6"
                                        xChannelSelector="R"
                                        yChannelSelector="G"
                                    />
                                </filter>
                            ))}
                            <filter
                                id={`${uid}-ink`}
                                x="-4%"
                                y="-6%"
                                width="108%"
                                height="112%"
                            >
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.045"
                                    numOctaves="3"
                                    seed="11"
                                    result="edge"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="edge"
                                    scale="5"
                                    xChannelSelector="R"
                                    yChannelSelector="G"
                                    result="rough"
                                />
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.018 0.32"
                                    numOctaves="2"
                                    seed="4"
                                    result="streak"
                                />
                                <feColorMatrix
                                    in="streak"
                                    type="matrix"
                                    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -16 5.6"
                                    result="streakA"
                                />
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.7"
                                    numOctaves="1"
                                    seed="9"
                                    result="speck"
                                />
                                <feColorMatrix
                                    in="speck"
                                    type="matrix"
                                    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -24 7.0"
                                    result="speckA"
                                />
                                <feComposite
                                    in="streakA"
                                    in2="speckA"
                                    operator="arithmetic"
                                    k1="0"
                                    k2="1"
                                    k3="1"
                                    k4="0"
                                    result="holes"
                                />
                                <feComposite
                                    in="rough"
                                    in2="holes"
                                    operator="out"
                                />
                            </filter>
                        </defs>

                        {/* Ground + Behind-letter Crew Layer */}
                        <g data-crew-layer="0">
                            <g className="dcf-ground">
                                <path
                                    className="dcf-draw"
                                    pathLength={1}
                                    d={ground.d}
                                    style={
                                        {
                                            "--d": `${tl.ground}ms`,
                                        } as React.CSSProperties
                                    }
                                />
                                <path
                                    className="dcf-tufts dcf-fade"
                                    d={ground.tufts}
                                    style={
                                        {
                                            "--d": `${tl.ground + 500}ms`,
                                        } as React.CSSProperties
                                    }
                                />
                                {ground.pebbles.map((pb, k) => (
                                    <ellipse
                                        key={k}
                                        className="dcf-pebble dcf-fade"
                                        cx={pb.x}
                                        cy={pb.y}
                                        rx={pb.r * 1.5}
                                        ry={pb.r}
                                        style={
                                            {
                                                "--d": `${tl.ground + 600}ms`,
                                            } as React.CSSProperties
                                        }
                                    />
                                ))}
                            </g>
                            {placed
                                .filter((p) => p.seat === "behind")
                                .map((p) => renderCrew(p, "body"))}
                        </g>

                        {/* Wordmark Letters ("RIDHO.") */}
                        {chars.map((c, i) =>
                            c === " " ? null : (
                                <g
                                    key={i}
                                    className="dcf-letter"
                                    style={
                                        {
                                            "--d": `${tl.letter(i)}ms`,
                                            "--r": `${(
                                                (hash(i * 2.3) - 0.5) *
                                                9
                                            ).toFixed(2)}deg`,
                                        } as React.CSSProperties
                                    }
                                >
                                    <g className="dcf-glyph">
                                        <text
                                            x={layout.x[i]}
                                            y={0}
                                            fontSize={FONT_SIZE}
                                            fontWeight={900}
                                            style={{ fontFamily: FONT_FAMILY }}
                                            filter={`url(#${uid}-ink)`}
                                        >
                                            {c}
                                        </text>
                                    </g>
                                    <path
                                        className="dcf-dust"
                                        d={`M${layout.x[i] - 6} -6 l-16 -6 M${
                                            layout.x[i] - 4
                                        } -16 l-12 -12 M${
                                            layout.x[i] + layout.w[i] + 6
                                        } -6 l16 -6 M${
                                            layout.x[i] + layout.w[i] + 4
                                        } -16 l12 -12`}
                                    />
                                </g>
                            )
                        )}

                        {/* Foreground Crew Layer */}
                        <g data-crew-layer="1">
                            {placed
                                .filter((p) => p.seat === "behind")
                                .map((p) => renderCrew(p, "front"))}
                            {placed
                                .filter((p) => p.seat !== "behind")
                                .map((p) => renderCrew(p, "body"))}
                        </g>

                        {/* Interactive Click/Keyboard Hit Targets */}
                        {placed.map((p) => {
                            const bx =
                                p.flip > 0
                                    ? [p.art.box.l, p.art.box.r]
                                    : [-p.art.box.r, -p.art.box.l];
                            const top = p.art.box.t;
                            const bottom =
                                p.seat === "behind" ? -30 : p.art.box.b;
                            return (
                                <rect
                                    key={`hit-${p.i}`}
                                    className="dcf-hit"
                                    x={p.x + bx[0] * p.scale}
                                    y={p.y + top * p.scale}
                                    width={(bx[1] - bx[0]) * p.scale}
                                    height={(bottom - top) * p.scale}
                                    rx={12}
                                    role="button"
                                    tabIndex={p.i === crewFocus ? 0 : -1}
                                    aria-label={`${p.m.name}, press to make them talk`}
                                    onFocus={() => setCrewFocus(p.i)}
                                    onClick={() => poke(p.i)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "ArrowLeft" ||
                                            e.key === "ArrowRight"
                                        ) {
                                            e.preventDefault();
                                            const hits = Array.from(
                                                e.currentTarget.parentElement?.querySelectorAll<SVGRectElement>(
                                                    "rect.dcf-hit"
                                                ) ?? []
                                            );
                                            const at = hits.indexOf(e.currentTarget);
                                            const step =
                                                e.key === "ArrowRight"
                                                    ? 1
                                                    : hits.length - 1;
                                            hits[(at + step) % hits.length]?.focus();
                                            return;
                                        }
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            poke(p.i);
                                        }
                                    }}
                                />
                            );
                        })}
                    </svg>

                    {/* Speech Bubbles */}
                    <div
                        className="absolute inset-0 pointer-events-none z-20"
                        aria-live="polite"
                    >
                        {placed.map((p) => {
                            if (talking !== p.i) return null;
                            const alignClass =
                                p.x > view.x + view.w * 0.72
                                    ? " is-left"
                                    : p.x < view.x + view.w * 0.28
                                    ? " is-right"
                                    : "";
                            return (
                                <div
                                    key={p.i}
                                    className={`dcf-bubble text-xs font-bold leading-snug${alignClass}`}
                                    style={{
                                        left: pct(p.x, view.x, view.w),
                                        top: pct(
                                            p.y + p.art.box.t * p.scale - 6,
                                            view.y,
                                            view.h
                                        ),
                                    }}
                                >
                                    {p.m.says}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Minimalist Monochrome Floating Doodles */}
                <div
                    className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                    aria-hidden="true"
                >
                    {doodleList.map((d, k) => (
                        <div
                            key={k}
                            data-doodle-idx={k}
                            className="dcf-doodle"
                            style={{
                                width: d.size,
                                height: d.size,
                                marginLeft: -d.size / 2,
                                marginTop: -d.size / 2,
                            }}
                            onPointerDown={() => popDoodle(k)}
                        >
                            <span
                                className="dcf-doodle-in"
                                style={
                                    {
                                        "--d": `${tl.doodles + k * 70}ms`,
                                    } as React.CSSProperties
                                }
                            >
                                <svg
                                    viewBox="-16 -16 32 32"
                                    width={d.size}
                                    height={d.size}
                                >
                                    <DoodleGraphic kind={d.kind} />
                                </svg>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar (safe right padding on desktop & bottom padding on mobile for Music Corner) */}
            <div
                className="dcf-rise max-w-6xl mx-auto mt-8 pt-6 border-t border-dashed border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-neutral-400 relative z-10 md:pr-64"
                style={{ "--d": "120ms" } as React.CSSProperties}
            >
                <p>
                    © 2026 Muhammad Ali Ridho. Designed with minimalist
                    principles.
                </p>

                <button
                    type="button"
                    onClick={scrollToTop}
                    className="dcf-totop inline-flex items-center gap-2 min-h-[44px] px-4 py-1.5 rounded-full border border-neutral-700 hover:border-white text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                    <span>Back to top</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <path d="M12 20 C11 14 12.5 9 12 4 M6 10 C8 8 10 6 12 4 C14 6 16 8 18.5 9.5" />
                    </svg>
                </button>
            </div>
        </footer>
    );
}
