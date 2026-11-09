import { useEffect, useRef } from "react";

/** Couleurs conventionnelles utilisées dans tout le laboratoire */
export const C = {
  force: "#fb923c", // force appliquée F
  disp: "#38bdf8", // déplacement d
  weight: "#a78bfa", // poids P
  reaction: "#2dd4bf", // réaction normale R
  friction: "#f87171", // frottement f
  velocity: "#facc15", // vitesse v
  motor: "#34d399", // travail moteur
  resist: "#fb7185", // travail résistant
  zero: "#94a3b8", // travail nul
  energy: "#22d3ee", // énergie cinétique
  grid: "#1b2c52",
  text: "#cbd5e1",
  mute: "#7c8db0",
  bg: "#081126",
};

export const rad = (deg: number) => (deg * Math.PI) / 180;
export const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

/** Formatage à la française (virgule décimale, espace fine pour les milliers, vrai signe moins) */
export function fmt(x: number, d = 2): string {
  if (!isFinite(x)) return "—";
  if (Math.abs(x) < Math.pow(10, -d) / 2) x = 0;
  const s = Math.abs(x).toFixed(d);
  const [i, f] = s.split(".");
  const ip = i.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  return (x < 0 ? "−" : "") + ip + (f ? "," + f : "");
}

/** Format compact pour les graduations des axes */
export function short(v: number): string {
  const a = Math.abs(v);
  if (a >= 1e6) return fmt(v / 1e6, a % 1e6 === 0 ? 0 : 1) + " M";
  if (a >= 1e4) return fmt(v / 1e3, a % 1e3 === 0 ? 0 : 1) + " k";
  if (a >= 100) return fmt(v, 0);
  if (a >= 10) return fmt(v, Number.isInteger(v) ? 0 : 1);
  return fmt(v, Number.isInteger(v) ? 0 : 2);
}

/** Graduations « propres » pour un axe */
export function niceTicks(min: number, max: number, count = 5): number[] {
  if (!(max > min)) return [min];
  const span = max - min;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const out: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-6; v += step) {
    out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  }
  return out;
}

/** Nettoie les cos(90°) ≈ 6e-17 */
export const cosd = (deg: number) => {
  const c = Math.cos(rad(deg));
  return Math.abs(c) < 1e-12 ? 0 : c;
};
export const sind = (deg: number) => {
  const s = Math.sin(rad(deg));
  return Math.abs(s) < 1e-12 ? 0 : s;
};

export type WorkKind = "motor" | "resist" | "zero";
export const workKind = (w: number): WorkKind => (Math.abs(w) < 1e-9 ? "zero" : w > 0 ? "motor" : "resist");
export const workColor = (k: WorkKind) => (k === "motor" ? C.motor : k === "resist" ? C.resist : C.zero);

/** Boucle d'animation requestAnimationFrame (dt en secondes, plafonné) */
export function useRaf(running: boolean, cb: (dt: number) => void) {
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  });
  useEffect(() => {
    if (!running) return;
    let id = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ref.current(dt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [running]);
}
