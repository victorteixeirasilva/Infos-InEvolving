"use client";

import { useCallback, useRef } from "react";

const MASTER_VOLUME = 0.9;

type HapticKind = "light" | "medium" | "success";

const HAPTIC_PATTERNS: Record<HapticKind, number | number[]> = {
  light: 45,
  medium: 50,
  success: [55, 70, 55],
};

const IOS_PULSES: Record<HapticKind, number> = {
  light: 1,
  medium: 1,
  success: 3,
};

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
  const effectiveVolume = Math.min(volume * MASTER_VOLUME, 1);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(effectiveVolume, 0.0001), start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(end + 0.02);
}

function triggerIosHaptic(pulses: number) {
  const label = document.createElement("label");
  label.setAttribute("aria-hidden", "true");
  label.style.cssText = "position:fixed;opacity:0;pointer-events:none;";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("switch", "");
  label.appendChild(input);
  document.body.appendChild(label);

  for (let i = 0; i < pulses; i++) {
    input.checked = !input.checked;
    label.click();
  }

  document.body.removeChild(label);
}

export function triggerHaptic(kind: HapticKind) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(HAPTIC_PATTERNS[kind]);
    return;
  }

  if (typeof document !== "undefined") {
    triggerIosHaptic(IOS_PULSES[kind]);
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

  const hapticOnSelect = useCallback((isLastStep: boolean) => {
    triggerHaptic(isLastStep ? "success" : "medium");
  }, []);

  const hapticOnBack = useCallback(() => {
    triggerHaptic("light");
  }, []);

  const playSelect = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 523.25, 0, 72, 0.55);
      playNote(ctx, 659.25, 48, 96, 0.42, "triangle");
    })();
  }, [ensureContext]);

  const playAdvance = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 440, 0, 55, 0.38, "triangle");
      playNote(ctx, 554.37, 38, 85, 0.32);
      playNote(ctx, 698.46, 72, 110, 0.28, "sine");
    })();
  }, [ensureContext]);

  const playBack = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 392, 0, 90, 0.34);
      playNote(ctx, 329.63, 55, 100, 0.26, "triangle");
    })();
  }, [ensureContext]);

  const playComplete = useCallback(() => {
    void (async () => {
      const ctx = await ensureContext();
      if (!ctx) return;
      playNote(ctx, 523.25, 0, 85, 0.5);
      playNote(ctx, 659.25, 65, 95, 0.44);
      playNote(ctx, 783.99, 130, 130, 0.38, "triangle");
      playNote(ctx, 987.77, 200, 150, 0.3);
    })();
  }, [ensureContext]);

  return {
    playSelect,
    playAdvance,
    playBack,
    playComplete,
    hapticOnSelect,
    hapticOnBack,
  };
}
