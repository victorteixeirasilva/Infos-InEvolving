"use client";

import { useCallback, useRef } from "react";

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  return new Ctor();
}

function playNote(
  ctx: AudioContext,
  frequency: number,
  startOffsetMs: number,
  durationMs: number,
  volume: number,
  type: OscillatorType = "sine",
) {
  const start = ctx.currentTime + startOffsetMs / 1000;
  const end = start + durationMs / 1000;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0001), start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(end + 0.02);
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

export function useQuizFeedback(reducedMotion: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensureContext = useCallback(async () => {
    if (reducedMotion) return null;
    if (!ctxRef.current) ctxRef.current = getAudioContext();
    const ctx = ctxRef.current;
    if (!ctx) return null;
    if (ctx.state === "suspended") await ctx.resume();
    return ctx;
  }, [reducedMotion]);

  const playSelect = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 523.25, 0, 72, 0.055);
      playNote(ctx, 659.25, 48, 96, 0.042, "triangle");
      vibrate(14);
    })();
  }, [ensureContext]);

  const playAdvance = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 440, 0, 55, 0.038, "triangle");
      playNote(ctx, 554.37, 38, 85, 0.032);
      playNote(ctx, 698.46, 72, 110, 0.028, "sine");
    })();
  }, [ensureContext]);

  const playBack = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 392, 0, 90, 0.034);
      playNote(ctx, 329.63, 55, 100, 0.026, "triangle");
      vibrate(10);
    })();
  }, [ensureContext]);

  const playComplete = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 523.25, 0, 85, 0.05);
      playNote(ctx, 659.25, 65, 95, 0.044);
      playNote(ctx, 783.99, 130, 130, 0.038, "triangle");
      playNote(ctx, 987.77, 200, 150, 0.03);
      vibrate([12, 45, 18]);
    })();
  }, [ensureContext]);

  return { playSelect, playAdvance, playBack, playComplete };
}
