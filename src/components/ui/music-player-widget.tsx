"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ChevronDown,
  Disc3,
  ExternalLink,
  ListMusic,
  Pause,
  Play,
} from "lucide-react";
import { CURATED_PLAYLISTS, type CuratedPlaylist } from "@/data/playlists";

/* ----------------------------------------------------------------- types */

export interface Track {
  title: string;
  artist: string;
  cover: string;
  src: string;
  spotifyUrl?: string;
}
export type LoopMode = "off" | "all" | "one";
export type Direction = "next" | "prev" | null;
type AudioCtor = typeof AudioContext;

export const DEFAULT_DEMO_TRACKS: Track[] = CURATED_PLAYLISTS[0].tracks;

/** Expanded Music Corner minimizes after this long without interaction. */
const IDLE_CLOSE_MS = 8000;

/* ------------------------------------------------------------- useRafLoop */

function useRafLoop(cb: (now: number, dt: number) => void, enabled = true) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      cbRef.current(now, dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);
}

/* -------------------------------------------------- useTransitionSound */

function useTransitionSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, []);
  return useCallback((bassEnergy = 0.5) => {
    try {
      if (!ctxRef.current) {
        const Ctor: AudioCtor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: AudioCtor })
            .webkitAudioContext;
        if (!Ctor) return;
        ctxRef.current = new Ctor();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startFreq = 440 + bassEnergy * 440;
      const endFreq = startFreq * (2 / 3);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.09);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      /* Web Audio unavailable */
    }
  }, []);
}

/* --------------------------------------------------- useAudioAnalyser */

const FFT_SIZE = 256;

function useAudioAnalyser(
  audioRef: React.RefObject<HTMLAudioElement | null>
) {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer>>(
    new Uint8Array(new ArrayBuffer(FFT_SIZE / 2))
  );
  const connectedRef = useRef(false);

  const connect = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || connectedRef.current) return;
    try {
      const Ctor: AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: AudioCtor })
          .webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = 0.8;
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(
        new ArrayBuffer(analyser.frequencyBinCount)
      );
      connectedRef.current = true;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
    } catch {
      /* unavailable or already connected */
    }
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("play", connect, { once: true });
    return () => audio.removeEventListener("play", connect);
  }, [audioRef, connect]);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, []);

  const getFrequencyData = useCallback((): Uint8Array | null => {
    const analyser = analyserRef.current;
    if (!analyser) return null;
    if (ctxRef.current?.state === "suspended")
      ctxRef.current.resume().catch(() => {});
    analyser.getByteFrequencyData(dataRef.current);
    return dataRef.current;
  }, []);

  const getBandEnergy = useCallback(
    (startBin: number, endBin: number): number => {
      if (!analyserRef.current) return 0;
      const data = dataRef.current;
      const count = endBin - startBin;
      if (count <= 0) return 0;
      let sum = 0;
      for (let i = startBin; i < endBin && i < data.length; i++)
        sum += data[i];
      return sum / count / 255;
    },
    []
  );

  return { getFrequencyData, getBandEnergy };
}

/* ------------------------------------------------------ useAudioPlayer */

interface State {
  currentIndex: number;
  order: number[];
  shuffled: boolean;
  loopMode: LoopMode;
  isPlaying: boolean;
  direction: Direction;
}
type Action =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_TRACK"; index: number; direction: Direction }
  | { type: "TOGGLE_SHUFFLE"; trackCount: number }
  | { type: "CYCLE_LOOP" }
  | { type: "RESET_TRACKS"; trackCount: number; startIndex: number };

function shuffleOrder(pinFirst: number, count: number): number[] {
  const rest = Array.from({ length: count }, (_, i) => i).filter(
    (x) => x !== pinFirst
  );
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [pinFirst, ...rest];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_TRACK":
      return {
        ...state,
        currentIndex: action.index,
        direction: action.direction,
      };
    case "TOGGLE_SHUFFLE": {
      const shuffled = !state.shuffled;
      const order = shuffled
        ? shuffleOrder(state.currentIndex, action.trackCount)
        : Array.from({ length: action.trackCount }, (_, i) => i);
      return { ...state, shuffled, order };
    }
    case "CYCLE_LOOP": {
      const next: LoopMode =
        state.loopMode === "off"
          ? "all"
          : state.loopMode === "all"
          ? "one"
          : "off";
      return { ...state, loopMode: next };
    }
    case "RESET_TRACKS": {
      const startIndex = action.startIndex;
      return {
        ...state,
        currentIndex: startIndex,
        order: state.shuffled
          ? shuffleOrder(startIndex, action.trackCount)
          : Array.from({ length: action.trackCount }, (_, i) => i),
        direction: null,
      };
    }
    default:
      return state;
  }
}

function useAudioPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    order: Array.from({ length: tracks.length }, (_, i) => i),
    shuffled: true,
    loopMode: "all",
    isPlaying: false,
    direction: null,
  });

  const { getFrequencyData, getBandEnergy } = useAudioAnalyser(audioRef);
  const playTransitionSound = useTransitionSound();

  const loadTrack = useCallback(
    (index: number, autoplay: boolean, direction: Direction) => {
      const audio = audioRef.current;
      const target = tracks[index];
      if (!audio || !target) return;
      const bassEnergy = getBandEnergy(0, 4);
      playTransitionSound(bassEnergy);
      dispatch({ type: "SET_TRACK", index, direction });
      audio.src = target.src;
      audio.load();
      if (autoplay) audio.play().catch(() => {});
    },
    [tracks, playTransitionSound, getBandEnergy]
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  // `autoplay` is explicit because once a track ends the browser marks the
  // audio as paused, so `!audio.paused` would wrongly stop the queue.
  const advance = useCallback(
    (autoplay: boolean) => {
      const audio = audioRef.current;
      if (!audio) return;
      const pos = state.order.indexOf(state.currentIndex);
      const np = pos + 1;
      if (np >= state.order.length) {
        if (state.loopMode === "all")
          loadTrack(state.order[0], autoplay, "next");
        else {
          audio.pause();
          audio.currentTime = 0;
        }
        return;
      }
      loadTrack(state.order[np], autoplay, "next");
    },
    [state.order, state.currentIndex, state.loopMode, loadTrack]
  );

  const next = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    advance(!audio.paused);
  }, [advance]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    const pos = state.order.indexOf(state.currentIndex);
    const pp = pos - 1;
    if (pp < 0) {
      if (state.loopMode === "all")
        loadTrack(state.order[state.order.length - 1], !audio.paused, "prev");
      else audio.currentTime = 0;
      return;
    }
    loadTrack(state.order[pp], !audio.paused, "prev");
  }, [state.order, state.currentIndex, state.loopMode, loadTrack]);

  const selectTrack = useCallback(
    (index: number) => {
      if (index === state.currentIndex) {
        toggle();
        return;
      }
      const dir: Direction = index > state.currentIndex ? "next" : "prev";
      loadTrack(index, true, dir);
    },
    [state.currentIndex, loadTrack, toggle]
  );

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = pct * audio.duration;
  }, []);

  const seekForward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
  }, []);

  const seekBackward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  }, []);

  const toggleShuffle = useCallback(() => {
    dispatch({ type: "TOGGLE_SHUFFLE", trackCount: tracks.length });
  }, [tracks.length]);

  const cycleLoop = useCallback(() => {
    dispatch({ type: "CYCLE_LOOP" });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => dispatch({ type: "PLAY" });
    const onPause = () => dispatch({ type: "PAUSE" });
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setDuration(audio.duration);
    };
    const onEnded = () => {
      if (state.loopMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else advance(true);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [state.loopMode, advance]);

  const prevFirstSrcRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    const firstSrc = tracks[0]?.src;
    const isSamePlaylist =
      prevFirstSrcRef.current !== undefined &&
      prevFirstSrcRef.current === firstSrc &&
      state.currentIndex < tracks.length;
    prevFirstSrcRef.current = firstSrc;

    if (isSamePlaylist) {
      // Background sync added/updated tracks in the current playlist: update order without interrupting playback
      dispatch({
        type: "RESET_TRACKS",
        trackCount: tracks.length,
        startIndex: state.currentIndex,
      });
      return;
    }

    const wasPlaying = !audio.paused;
    const startIndex = state.shuffled
      ? Math.floor(Math.random() * tracks.length)
      : 0;
    dispatch({
      type: "RESET_TRACKS",
      trackCount: tracks.length,
      startIndex,
    });
    audio.src = tracks[startIndex].src;
    audio.load();
    if (wasPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  return {
    audioRef,
    state,
    currentTime,
    duration,
    currentTrack: tracks[state.currentIndex] || tracks[0],
    toggle,
    next,
    prev,
    selectTrack,
    seek,
    seekForward,
    seekBackward,
    toggleShuffle,
    cycleLoop,
    getFrequencyData,
  };
}

/* ------------------------------------------------ useKeyboardShortcuts */

interface ShortcutActions {
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seekForward: () => void;
  seekBackward: () => void;
  toggleShuffle: () => void;
  cycleLoop: () => void;
}
function useKeyboardShortcuts(actions: ShortcutActions, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      switch (e.key) {
        case " ":
          e.preventDefault();
          actions.toggle();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (e.shiftKey) actions.next();
          else actions.seekForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (e.shiftKey) actions.prev();
          else actions.seekBackward();
          break;
        case "s":
        case "S":
          actions.toggleShuffle();
          break;
        case "l":
        case "L":
          actions.cycleLoop();
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [actions, enabled]);
}

/* --------------------------------------------------------- ScalesMixer */

const COLS = 10;
const ROWS = 10;
const BAND_RANGES: [number, number][] = [
  [0, 1],
  [1, 3],
  [3, 6],
  [6, 10],
  [10, 16],
  [16, 24],
  [24, 36],
  [36, 52],
  [52, 74],
  [74, 100],
];
const sineOut = (x: number) => Math.sin((x * Math.PI) / 2);
const sineIn = (x: number) => 1 - Math.cos((x * Math.PI) / 2);
const sineInOut = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const PART_A_DUR = 1.5;
const PART_A_TO = 11;
const PART_A_STEP = 3 / (COLS - 1);
const PART_B_DUR = 1;
const SCALE_FROM = 0.133;
const SCALE_TO = 0.8;

function partAColumnY(time: number, col: number): number {
  const local = time - col * PART_A_STEP;
  const period = PART_A_DUR * 2;
  const cyc = ((local % period) + period) % period;
  if (cyc < PART_A_DUR) return PART_A_TO * sineInOut(cyc / PART_A_DUR);
  return PART_A_TO * sineInOut(1 - (cyc - PART_A_DUR) / PART_A_DUR);
}
function partBCircle(
  time: number,
  col: number,
  row: number
): [number, number] {
  const frac = row / ROWS;
  const yFrom = lerp(77, -77, frac);
  const yTo = lerp(col, -col, frac);
  const local = time - col / COLS;
  const period = PART_B_DUR * 2;
  const cyc = ((local % period) + period) % period;
  let e: number;
  if (cyc < PART_B_DUR) e = sineOut(cyc / PART_B_DUR);
  else e = sineIn(1 - (cyc - PART_B_DUR) / PART_B_DUR);
  return [lerp(yFrom, yTo, e), lerp(SCALE_FROM, SCALE_TO, e)];
}

function ScalesMixer({
  isPlaying,
  getFrequencyData,
  active = true,
}: {
  isPlaying: boolean;
  getFrequencyData?: () => Uint8Array | null;
  active?: boolean;
}) {
  const maskId = useId().replace(/:/g, "_");
  const colRefs = useRef<(SVGGElement | null)[]>([]);
  const circleRefs = useRef<(SVGCircleElement | null)[][]>(
    Array.from({ length: COLS }, () => [])
  );
  const tRef = useRef(50);

  useRafLoop((_, dt) => {
    if (isPlaying) tRef.current += dt / 1000;
    const time = tRef.current;
    const freqData = getFrequencyData?.();
    for (let c = 0; c < COLS; c++) {
      let energy = 1.0;
      if (freqData) {
        const [binStart, binEnd] = BAND_RANGES[c];
        let sum = 0;
        for (let b = binStart; b < binEnd; b++) sum += freqData[b] ?? 0;
        energy = Math.sqrt(sum / (binEnd - binStart) / 255);
      }
      const bobGain = freqData ? 0.4 + energy : 1;
      const scaleGain = freqData ? 0.5 + energy : 1;
      const colEl = colRefs.current[c];
      if (colEl) {
        const ay = partAColumnY(time, c) * bobGain;
        colEl.style.transform = `translate(${c * 10}px, ${ay}px)`;
      }
      for (let r = 0; r < ROWS; r++) {
        const circle = circleRefs.current[c][r];
        if (!circle) continue;
        const [ty, s] = partBCircle(time, c, r);
        circle.style.transform = `translateY(${ty}px) scale(${
          s * scaleGain
        })`;
      }
    }
  }, active);

  return (
    <svg className="scales" viewBox="0 0 98 108" aria-hidden="true">
      <mask id={maskId}>
        <rect width="10" height="10" fill="#fff" />
      </mask>
      {Array.from({ length: COLS }, (_, c) => (
        <g
          key={c}
          ref={(el) => {
            colRefs.current[c] = el;
          }}
          style={{ transform: `translate(${c * 10}px, 0px)` }}
        >
          {Array.from({ length: ROWS }, (_, r) => (
            <g
              key={r}
              mask={`url(#${maskId})`}
              transform={`translate(0 ${r * 10})`}
            >
              <circle
                ref={(el) => {
                  circleRefs.current[c][r] = el;
                }}
                cx="5"
                cy="5"
                r="5"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------- Disc + layers */

const SPIN_MAX = 0.4375;
const BURST_DURATION = 620;

interface Layer {
  id: number;
  track: Track;
  dir: Direction;
}

function Disc({
  layers,
  isPlaying,
  isZoomed,
  trackKey,
  direction,
  onZoomToggle,
  active = true,
}: {
  layers: Layer[];
  isPlaying: boolean;
  isZoomed: boolean;
  trackKey: number;
  direction: Direction;
  onZoomToggle: () => void;
  active?: boolean;
}) {
  const spinRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef(0);
  const velRef = useRef(0);
  const burstRef = useRef({ from: 0, start: 0, active: false, pending: false });
  const lastKey = useRef(trackKey);

  useEffect(() => {
    if (trackKey !== lastKey.current) {
      lastKey.current = trackKey;
      if (direction) {
        burstRef.current.from = direction === "prev" ? 360 : -360;
        burstRef.current.pending = true;
      }
    }
  }, [trackKey, direction]);

  useRafLoop((now) => {
    const el = spinRef.current;
    if (!el) return;
    if (isPlaying) velRef.current += (SPIN_MAX - velRef.current) * 0.2;
    else {
      velRef.current *= 0.96;
      if (velRef.current < 0.001) velRef.current = 0;
    }
    if (isZoomed) {
      const target = Math.round(rotRef.current / 360) * 360;
      const nx = rotRef.current + (target - rotRef.current) * 0.08;
      rotRef.current = Math.abs(target - nx) < 0.1 ? target : nx;
    } else {
      rotRef.current += velRef.current;
    }
    const burst = burstRef.current;
    if (burst.pending) {
      burst.start = now;
      burst.pending = false;
      burst.active = true;
    }
    let b = 0;
    if (burst.active) {
      const t = (now - burst.start) / BURST_DURATION;
      if (t >= 1) burst.active = false;
      else b = burst.from * (1 - (1 - Math.pow(1 - t, 3)));
    }
    el.style.transform = `scale(1.01) rotate(${rotRef.current + b}deg)`;
  }, active);

  return (
    <div
      className={`mask ${isZoomed ? "is-zoomed" : ""}`}
      title={isZoomed ? "Click to return to vinyl" : "Click to zoom cover art"}
      onClick={(e) => {
        e.stopPropagation();
        onZoomToggle();
      }}
    >
      <div className="spin" ref={spinRef}>
        {layers.map((l, i) => {
          const isNewest = i === layers.length - 1;
          const cls = isNewest
            ? l.dir
              ? "cover cover-enter"
              : "cover"
            : "cover cover-exit";
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={l.id}
              src={l.track.cover}
              alt={`${l.track.title} — ${l.track.artist}`}
              className={cls}
              draggable={false}
            />
          );
        })}
      </div>
      <div className="hole">
        <div className="hole-inner" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ TrackInfo */

function TrackInfo({ layers }: { layers: Layer[] }) {
  return (
    <div className="track-info">
      {layers.map((l, i) => {
        const isNewest = i === layers.length - 1;
        const dx = l.dir === "next" ? 14 : l.dir === "prev" ? -14 : 0;
        const exitDx = -dx;
        const state = isNewest ? (l.dir ? "ti-enter" : "") : "ti-exit";
        const style = {
          ["--dx" as string]: `${isNewest ? dx : exitDx}px`,
        } as React.CSSProperties;
        return (
          <div
            key={l.id}
            className={`ti-layer ${isNewest ? "" : "ti-abs"}`}
          >
            <p className={`artist ${state}`} style={style}>
              {l.track.artist}
            </p>
            <h2 className={`track ${state}`} style={style}>
              {l.track.title}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------- ProgressBar */

function fmt(s: number): string {
  if (!isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(
    2,
    "0"
  )}`;
}
function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  onSeek: (pct: number) => void;
}) {
  const pct = duration ? (currentTime / duration) * 100 : 0;
  return (
    <>
      <div
        className="bar"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          onSeek(
            Math.max(
              0,
              Math.min(1, (e.clientX - rect.left) / rect.width)
            )
          );
        }}
      >
        <div className="bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="time">
        <span className="current">{fmt(currentTime)}</span>
        <span className="sep">/</span>
        <span className="total">{fmt(duration)}</span>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- Controls */

function Controls({
  isPlaying,
  shuffled,
  loopMode,
  onToggle,
  onNext,
  onPrev,
  onShuffle,
  onLoop,
}: {
  isPlaying: boolean;
  shuffled: boolean;
  loopMode: LoopMode;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onShuffle: () => void;
  onLoop: () => void;
}) {
  return (
    <div className="controls">
      <button
        type="button"
        className={`ctrl ctrl-toggle ${shuffled ? "is-active" : ""}`}
        onClick={onShuffle}
        aria-label="Shuffle"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 3h5v5" />
          <path d="M21 3l-7 7" />
          <path d="M3 21l7-7" />
          <path d="M16 21h5v-5" />
          <path d="M21 21l-7-7" />
          <path d="M3 3l7 7" />
        </svg>
      </button>
      <button
        type="button"
        className="ctrl"
        onClick={onPrev}
        aria-label="Previous"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M19 5L8 12l11 7zM5 5h2v14H5z" />
        </svg>
      </button>
      <button
        type="button"
        className="ctrl ctrl-play"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M6 5h3v14H6zM15 5h3v14h-3z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7 5v14l11-7z" />
          </svg>
        )}
      </button>
      <button
        type="button"
        className="ctrl"
        onClick={onNext}
        aria-label="Next"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M5 5l11 7L5 19zM17 5h2v14h-2z" />
        </svg>
      </button>
      <button
        type="button"
        className={`ctrl ctrl-toggle ctrl-loop ${
          loopMode !== "off" ? "is-active" : ""
        } ${loopMode === "one" ? "mode-one" : ""}`}
        onClick={onLoop}
        aria-label="Loop"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12V8a2 2 0 0 1 2-2h12" />
          <path d="M16 3l4 3l-4 3" />
          <path d="M20 12v4a2 2 0 0 1-2 2H6" />
          <path d="M8 21l-4-3l4-3" />
        </svg>
        <span className="loop-one">1</span>
      </button>
    </div>
  );
}

/* ----------------------------------------------------- MusicPlayer root */

interface MusicPlayerBodyProps {
  tracks: Track[];
  state: State;
  currentTrack: Track;
  currentTime: number;
  duration: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (pct: number) => void;
  seekForward: () => void;
  seekBackward: () => void;
  toggleShuffle: () => void;
  cycleLoop: () => void;
  getFrequencyData: () => Uint8Array | null;
  shortcutsEnabled?: boolean;
  active?: boolean;
  children?: React.ReactNode;
}

function MusicPlayerBody({
  tracks,
  state,
  currentTrack,
  currentTime,
  duration,
  toggle,
  next,
  prev,
  seek,
  seekForward,
  seekBackward,
  toggleShuffle,
  cycleLoop,
  getFrequencyData,
  shortcutsEnabled = true,
  active = true,
  children,
}: MusicPlayerBodyProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const [layers, setLayers] = useState<Layer[]>(() => [
    { id: 0, track: tracks[0], dir: null },
  ]);
  const lastIndex = useRef(0);
  const lastTrackTitle = useRef(tracks[0]?.title);
  const idRef = useRef(1);

  useEffect(() => {
    if (!currentTrack) return;
    if (
      state.currentIndex === lastIndex.current &&
      currentTrack.title === lastTrackTitle.current
    ) {
      return;
    }
    lastIndex.current = state.currentIndex;
    lastTrackTitle.current = currentTrack.title;
    const id = idRef.current++;
    setLayers((prevLayers) => [
      ...prevLayers,
      { id, track: currentTrack, dir: state.direction },
    ]);
    const t = setTimeout(() => {
      setLayers((prevLayers) => prevLayers.filter((l) => l.id === id));
    }, 760);
    return () => clearTimeout(t);
  }, [state.currentIndex, currentTrack, state.direction]);

  const shortcuts = useMemo(
    () => ({
      toggle,
      next,
      prev,
      seekForward,
      seekBackward,
      toggleShuffle,
      cycleLoop,
    }),
    [toggle, next, prev, seekForward, seekBackward, toggleShuffle, cycleLoop]
  );
  useKeyboardShortcuts(shortcuts, shortcutsEnabled);

  return (
    <div className="mp-widget">
      <div
        className={`card ${state.isPlaying ? "is-playing" : ""} ${
          isZoomed ? "is-zoomed" : ""
        }`}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest(".mask"))
            setIsZoomed(false);
        }}
      >
        {children}
        <Disc
          layers={layers}
          isPlaying={state.isPlaying}
          isZoomed={isZoomed}
          trackKey={state.currentIndex}
          direction={state.direction}
          onZoomToggle={() => setIsZoomed((z) => !z)}
          active={active}
        />
        <div className="info">
          <ScalesMixer
            isPlaying={state.isPlaying}
            getFrequencyData={getFrequencyData}
            active={active}
          />
          <TrackInfo layers={layers} />
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />
          <Controls
            isPlaying={state.isPlaying}
            shuffled={state.shuffled}
            loopMode={state.loopMode}
            onToggle={toggle}
            onNext={next}
            onPrev={prev}
            onShuffle={toggleShuffle}
            onLoop={cycleLoop}
          />
        </div>
      </div>
    </div>
  );
}

export interface MusicPlayerProps {
  tracks: Track[];
  crossOrigin?: "anonymous" | "use-credentials";
  shortcutsEnabled?: boolean;
  active?: boolean;
}

export function MusicPlayer({
  tracks,
  crossOrigin = "anonymous",
  shortcutsEnabled = true,
  active = true,
}: MusicPlayerProps) {
  const {
    audioRef,
    state,
    currentTime,
    duration,
    currentTrack,
    toggle,
    next,
    prev,
    seek,
    seekForward,
    seekBackward,
    toggleShuffle,
    cycleLoop,
    getFrequencyData,
  } = useAudioPlayer(tracks);

  return (
    <MusicPlayerBody
      tracks={tracks}
      state={state}
      currentTrack={currentTrack}
      currentTime={currentTime}
      duration={duration}
      toggle={toggle}
      next={next}
      prev={prev}
      seek={seek}
      seekForward={seekForward}
      seekBackward={seekBackward}
      toggleShuffle={toggleShuffle}
      cycleLoop={cycleLoop}
      getFrequencyData={getFrequencyData}
      shortcutsEnabled={shortcutsEnabled}
      active={active}
    >
      <audio ref={audioRef} preload="metadata" crossOrigin={crossOrigin} />
    </MusicPlayerBody>
  );
}

/* ------------------------------------------ Collapsible MusicCornerWidget */

export interface MusicCornerWidgetProps {
  /**
   * Optional Spotify Playlist URL or ID to auto-sync tracks & covers.
   * Defaults to /api/spotify-playlist configured value or demo tracks.
   */
  playlistUrl?: string;
}

export function MusicCornerWidget({ playlistUrl }: MusicCornerWidgetProps) {
  const [activeKey, setActiveKey] = useState<CuratedPlaylist["key"]>("seoul");
  const activePlaylist = useMemo(
    () =>
      CURATED_PLAYLISTS.find((p) => p.key === activeKey) ||
      CURATED_PLAYLISTS[0],
    [activeKey]
  );

  const [tracksByPlaylist, setTracksByPlaylist] = useState<
    Record<string, Track[]>
  >(() => ({
    seoul: CURATED_PLAYLISTS[0].tracks,
    ranum: CURATED_PLAYLISTS[1].tracks,
  }));
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const tracks = tracksByPlaylist[activePlaylist.key] || activePlaylist.tracks;
  const {
    audioRef,
    state,
    currentTime,
    duration,
    currentTrack: rawCurrentTrack,
    toggle,
    next,
    prev,
    selectTrack,
    seek,
    seekForward,
    seekBackward,
    toggleShuffle,
    cycleLoop,
    getFrequencyData,
  } = useAudioPlayer(tracks);

  useEffect(() => {
    let cancelled = false;
    const targetId = playlistUrl || activePlaylist.id;
    const endpoint = `/api/spotify-playlist?id=${encodeURIComponent(targetId)}`;

    fetch(endpoint)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        if (Array.isArray(data.tracks) && data.tracks.length > 0) {
          setTracksByPlaylist((prevTracks) => {
            const existing = prevTracks[activePlaylist.key];
            const existingSig = existing?.map((t) => t.title).join("|");
            const nextSig = data.tracks
              .map((t: Track) => t.title)
              .join("|");
            if (existingSig === nextSig) {
              return prevTracks;
            }
            return {
              ...prevTracks,
              [activePlaylist.key]: data.tracks,
            };
          });
        }
      })
      .catch(() => {
        /* Keep pre-seeded curated tracks */
      });

    return () => {
      cancelled = true;
    };
  }, [playlistUrl, activePlaylist.id, activePlaylist.key]);

  const currentTrack = rawCurrentTrack || tracks[0];
  const activeSpotifyUrl = activePlaylist.spotifyUrl;

  // Idle auto-close: minimize after IDLE_CLOSE_MS without interaction.
  // The timer is paused while the pointer is over the card, focus is inside it,
  // or the queue is open; any click, scroll, or keypress inside restarts it.
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!isExpanded || showQueue || !card) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let hovering = card.matches(":hover");
    let focused = card.contains(document.activeElement);

    const clear = () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
    };
    const restart = () => {
      clear();
      if (hovering || focused) return;
      timer = setTimeout(() => setIsExpanded(false), IDLE_CLOSE_MS);
    };
    const onEnter = (e: PointerEvent) => {
      // Touch pointers fire enter/leave per tap; treat them as activity only.
      if (e.pointerType === "touch") return restart();
      hovering = true;
      clear();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "touch") hovering = false;
      restart();
    };
    const onFocusIn = () => {
      focused = true;
      clear();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (card.contains(e.relatedTarget as Node | null)) return;
      focused = false;
      restart();
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("focusin", onFocusIn);
    card.addEventListener("focusout", onFocusOut);
    card.addEventListener("pointerdown", restart);
    card.addEventListener("keydown", restart);
    card.addEventListener("wheel", restart, { passive: true });
    card.addEventListener("scroll", restart, { passive: true, capture: true });
    restart();

    return () => {
      clear();
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("focusin", onFocusIn);
      card.removeEventListener("focusout", onFocusOut);
      card.removeEventListener("pointerdown", restart);
      card.removeEventListener("keydown", restart);
      card.removeEventListener("wheel", restart);
      card.removeEventListener("scroll", restart, { capture: true });
    };
  }, [isExpanded, showQueue]);

  return (
    <aside
      aria-label="Music Corner Player"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none"
    >
      {/* Persistent Audio Element so playback never interrupts on collapse/expand */}
      <audio
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Expanded Full Widget Card */}
      <div
        ref={cardRef}
        aria-hidden={!isExpanded}
        className={`absolute bottom-0 right-0 w-[calc(100vw-2.5rem)] max-w-[384px] rounded-3xl bg-white border border-neutral-200 shadow-2xl overflow-hidden origin-bottom-right transition-[transform,opacity] duration-300 ease-out ${
          isExpanded
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-3 pointer-events-none"
        }`}
      >
        {/* Top Editorial Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center gap-2 min-w-0">
            <Disc3
              className={`w-4 h-4 text-black shrink-0 ${
                state.isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "4s" }}
            />
            <span className="text-xs font-bold tracking-tight text-black truncate">
              Music Corner
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setShowQueue((q) => !q)}
              aria-label="Toggle playlist queue"
              title="Playlist Queue"
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                showQueue
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:text-black hover:bg-neutral-200/60"
              }`}
            >
              <ListMusic className="w-3.5 h-3.5" />
              <span className="tabular-nums">{tracks.length}</span>
            </button>

            <a
              href={activeSpotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${activePlaylist.name} on Spotify`}
              title={`Open ${activePlaylist.name} on Spotify`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-neutral-600 hover:text-black hover:bg-neutral-200/60 transition-colors"
            >
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Minimize Music Corner"
              title="Minimize"
              className="p-1.5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Curated Playlist Switcher */}
        <div className="px-4 py-2.5 border-b border-neutral-200/70 bg-white">
          <div className="flex items-center gap-1.5">
            {CURATED_PLAYLISTS.map((pl) => {
              const isSelected = pl.key === activePlaylist.key;
              return (
                <button
                  key={pl.key}
                  type="button"
                  onClick={() => setActiveKey(pl.key)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-black text-white shadow-sm"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-black"
                  }`}
                >
                  {pl.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 21st.dev Vinyl & ScalesMixer Audio Player */}
        <MusicPlayerBody
          tracks={tracks}
          state={state}
          currentTrack={currentTrack}
          currentTime={currentTime}
          duration={duration}
          toggle={toggle}
          next={next}
          prev={prev}
          seek={seek}
          seekForward={seekForward}
          seekBackward={seekBackward}
          toggleShuffle={toggleShuffle}
          cycleLoop={cycleLoop}
          getFrequencyData={getFrequencyData}
          shortcutsEnabled={isExpanded}
          active={isExpanded}
        />

        {/* Collapsible Playlist Queue Drawer */}
        {showQueue && (
          <div className="border-t border-neutral-200 max-h-44 overflow-y-auto px-2 py-2 bg-neutral-50/60 space-y-1">
            {tracks.map((t, idx) => {
              const isCurrent = idx === state.currentIndex;
              return (
                <button
                  key={`${t.title}-${idx}`}
                  type="button"
                  onClick={() => selectTrack(idx)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-black text-white"
                      : "hover:bg-neutral-200/70 text-black"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.cover}
                    alt={t.title}
                    className="w-8 h-8 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-bold truncate ${
                        isCurrent ? "text-white" : "text-black"
                      }`}
                    >
                      {t.title}
                    </p>
                    <p
                      className={`text-[11px] truncate ${
                        isCurrent ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      {t.artist}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold tabular-nums shrink-0 ${
                      isCurrent ? "text-neutral-300" : "text-neutral-500"
                    }`}
                  >
                    {isCurrent && state.isPlaying ? "Playing" : `#${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Collapsed Floating Mini-Vinyl Pill */}
      <div
        role="button"
        tabIndex={isExpanded ? -1 : 0}
        aria-hidden={isExpanded}
        aria-label="Expand Music Corner player"
        onClick={() => setIsExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
        className={`w-[244px] flex items-center gap-2.5 p-1.5 pr-2 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 shadow-xl origin-bottom-right cursor-pointer transition-[transform,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
          isExpanded
            ? "opacity-0 scale-90 translate-y-2 pointer-events-none"
            : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
        }`}
      >
        {/* Spinning Mini Vinyl Thumbnail */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black shrink-0 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className={`w-full h-full object-cover ${
              state.isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "6s" }}
          />
          <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-white border border-black/40" />
        </div>

        {/* Track Meta */}
        <div className="text-left min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 truncate leading-tight">
            {activePlaylist.name}
          </p>
          <p className="text-xs font-bold text-black truncate leading-tight">
            {currentTrack.title}
          </p>
        </div>

        {/* Quick Play / Pause Button */}
        <button
          type="button"
          tabIndex={isExpanded ? -1 : 0}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
            }
          }}
          aria-label={state.isPlaying ? "Pause music" : "Play music"}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          {state.isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </aside>
  );
}

export default MusicPlayer;
