import type { ReactNode } from "react";
import { C, rad } from "../lib/phys";

/** Flèche vectorielle SVG (tête calculée, sans marqueur) */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  w = 3,
  dash,
  opacity = 1,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  w?: number;
  dash?: string;
  opacity?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy);
  if (L < 2) return null;
  const ux = dx / L;
  const uy = dy / L;
  const hl = Math.min(11 + w * 1.2, L * 0.7);
  const hw = hl * 0.42;
  const bx = x2 - ux * hl;
  const by = y2 - uy * hl;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={bx + ux} y2={by + uy} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
      <polygon points={`${x2},${y2} ${bx - uy * hw},${by + ux * hw} ${bx + uy * hw},${by - ux * hw}`} fill={color} />
    </g>
  );
}

/** Étiquette vectorielle : lettre italique surmontée d'une flèche, avec indice optionnel */
export function VText({
  x,
  y,
  t,
  sub,
  color = C.text,
  size = 17,
}: {
  x: number;
  y: number;
  t: string;
  sub?: string;
  color?: string;
  size?: number;
}) {
  const ax = x - size * 0.05;
  const ay = y - size * 0.92;
  const s = size * 0.3;
  return (
    <g>
      <text x={x} y={y} fill={color} fontSize={size} textAnchor="middle" className="mt">
        {t}
        {sub && (
          <tspan dy={size * 0.22} fontSize={size * 0.68} fontStyle="normal">
            {sub}
          </tspan>
        )}
      </text>
      <path
        d={`M${ax - s},${ay} L${ax + s},${ay} M${ax + s - 3},${ay - 2.6} L${ax + s},${ay} L${ax + s - 3},${ay + 2.6}`}
        stroke={color}
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** Texte scalaire italique (grandeur) avec indice optionnel */
export function MText({
  x,
  y,
  t,
  sub,
  color = C.text,
  size = 16,
  anchor = "middle",
}: {
  x: number;
  y: number;
  t: string;
  sub?: string;
  color?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor} className="mt" paintOrder="stroke" stroke={C.bg} strokeWidth={3}>
      {t}
      {sub && (
        <tspan dy={size * 0.22} fontSize={size * 0.68} fontStyle="normal">
          {sub}
        </tspan>
      )}
    </text>
  );
}

/** Texte standard avec contour sombre pour la lisibilité */
export function Label({
  x,
  y,
  children,
  color = C.text,
  size = 13,
  anchor = "middle",
  weight = 400,
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor} fontWeight={weight} paintOrder="stroke" stroke={C.bg} strokeWidth={3.5} strokeLinejoin="round">
      {children}
    </text>
  );
}

/** Sol hachuré */
export function Ground({ x1, x2, y, depth = 14, step = 14 }: { x1: number; x2: number; y: number; depth?: number; step?: number }) {
  const lines = [];
  for (let x = x1; x <= x2 + depth; x += step) {
    lines.push(<line key={x} x1={x} y1={y} x2={x - depth} y2={y + depth} stroke="#2a4274" strokeWidth={1.2} />);
  }
  return (
    <g>
      {lines}
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="#5b7bb5" strokeWidth={2} />
    </g>
  );
}

/** Arc d'angle de 0 à alpha (degrés, sens trigonométrique, y vers le bas dans l'écran) */
export function AngleArc({ cx, cy, r, deg, color }: { cx: number; cy: number; r: number; deg: number; color: string }) {
  if (deg < 0.5) return null;
  const ex = cx + r * Math.cos(rad(deg));
  const ey = cy - r * Math.sin(rad(deg));
  const large = deg > 180 ? 1 : 0;
  return <path d={`M${cx + r},${cy} A${r},${r} 0 ${large} 0 ${ex},${ey}`} stroke={color} strokeWidth={2} fill="none" />;
}

/** Roue avec rayons */
export function Wheel({ cx, cy, r, angle }: { cx: number; cy: number; r: number; angle: number }) {
  const a = (angle * 180) / Math.PI;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${a})`}>
      <circle r={r} fill="#0b1730" stroke="#8fb4ff" strokeWidth={2.2} />
      <line x1={-r + 2} y1={0} x2={r - 2} y2={0} stroke="#8fb4ff" strokeWidth={1.5} />
      <line x1={0} y1={-r + 2} x2={0} y2={r - 2} stroke="#8fb4ff" strokeWidth={1.5} />
      <circle r={2.5} fill="#8fb4ff" />
    </g>
  );
}

/** Axe orienté avec graduations (vertical vers le haut) */
export function ZAxis({ x, y0, y1, label }: { x: number; y0: number; y1: number; label: string }) {
  return (
    <g>
      <Arrow x1={x} y1={y0} x2={x} y2={y1} color="#8fa6d4" w={1.8} />
      <MText x={x + 4} y={y1 - 6} t={label} color="#bcd0f5" size={15} anchor="start" />
    </g>
  );
}

/** Conteneur d'une figure scientifique avec légende */
export function Figure({ children, caption, num }: { children: ReactNode; caption: ReactNode; num?: string }) {
  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-sky-400/15 bg-ink-900/80">
      <div className="p-2 sm:p-4">{children}</div>
      <figcaption className="border-t border-sky-400/10 bg-ink-850/80 px-4 py-2.5 text-sm text-slate-400">
        {num && <span className="mr-2 font-semibold text-sky-300">{num}</span>}
        {caption}
      </figcaption>
    </figure>
  );
}
