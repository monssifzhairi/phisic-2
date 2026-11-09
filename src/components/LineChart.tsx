import { C, niceTicks, short } from "../lib/phys";
import { MText } from "./svg";

export type Series = {
  pts: [number, number][];
  color: string;
  dash?: string;
  width?: number;
  label?: string;
};
export type Marker = { x: number; y: number; color: string; label?: string };

/** Graphique SVG responsive (viewBox) pour courbes y(x) */
export function LineChart({
  xmin,
  xmax,
  ymin,
  ymax,
  series,
  markers = [],
  xlabel,
  ylabel,
  xticks,
  yticks,
  title,
  height = 270,
}: {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  series: Series[];
  markers?: Marker[];
  xlabel: string;
  ylabel: string;
  xticks?: number[];
  yticks?: number[];
  title?: string;
  height?: number;
}) {
  const W = 460;
  const H = height;
  const L = 66;
  const R = 22;
  const T = title ? 34 : 20;
  const B = 50;
  if (ymax <= ymin) ymax = ymin + 1;
  if (xmax <= xmin) xmax = xmin + 1;
  const px = (x: number) => L + ((x - xmin) / (xmax - xmin)) * (W - L - R);
  const py = (y: number) => H - B - ((y - ymin) / (ymax - ymin)) * (H - T - B);
  const xt = xticks ?? niceTicks(xmin, xmax, 5);
  const yt = yticks ?? niceTicks(ymin, ymax, 5);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={title ?? `${ylabel} en fonction de ${xlabel}`}>
      {title && (
        <text x={W / 2} y={18} fill="#e2e8f0" fontSize={13} fontWeight={600} textAnchor="middle">
          {title}
        </text>
      )}
      {yt.map((v) => (
        <g key={"y" + v}>
          <line x1={L} y1={py(v)} x2={W - R} y2={py(v)} stroke={v === 0 ? "#4a6498" : C.grid} strokeWidth={v === 0 ? 1.5 : 1} />
          <text x={L - 8} y={py(v) + 4} fill={C.mute} fontSize={11} textAnchor="end">
            {short(v)}
          </text>
        </g>
      ))}
      {xt.map((v) => (
        <g key={"x" + v}>
          <line x1={px(v)} y1={T} x2={px(v)} y2={H - B} stroke={v === 0 ? "#4a6498" : C.grid} strokeWidth={v === 0 ? 1.5 : 1} />
          <text x={px(v)} y={H - B + 16} fill={C.mute} fontSize={11} textAnchor="middle">
            {short(v)}
          </text>
        </g>
      ))}
      <rect x={L} y={T} width={W - L - R} height={H - T - B} fill="none" stroke="#2a4274" />
      <text x={(L + W - R) / 2} y={H - 8} fill="#aab9d8" fontSize={12} textAnchor="middle">
        {xlabel}
      </text>
      <text transform={`translate(14 ${(T + H - B) / 2}) rotate(-90)`} fill="#aab9d8" fontSize={12} textAnchor="middle">
        {ylabel}
      </text>
      {series.map((s, i) => (
        <path
          key={i}
          d={s.pts.map((p, j) => `${j === 0 ? "M" : "L"}${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(" ")}
          fill="none"
          stroke={s.color}
          strokeWidth={s.width ?? 2.6}
          strokeDasharray={s.dash}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {markers.map((m, i) => (
        <g key={i}>
          <line x1={px(m.x)} y1={py(m.y)} x2={px(m.x)} y2={H - B} stroke={m.color} strokeDasharray="4 4" strokeWidth={1.2} opacity={0.8} />
          <line x1={px(m.x)} y1={py(m.y)} x2={L} y2={py(m.y)} stroke={m.color} strokeDasharray="4 4" strokeWidth={1.2} opacity={0.8} />
          <circle cx={px(m.x)} cy={py(m.y)} r={6} fill={m.color} stroke="#fff" strokeWidth={1.5} />
          {m.label && (
            <MText x={Math.min(px(m.x) + 10, W - 70)} y={Math.max(py(m.y) - 10, T + 12)} t={m.label} color={m.color} size={13} anchor="start" />
          )}
        </g>
      ))}
      {series.some((s) => s.label) && (
        <g>
          {series
            .filter((s) => s.label)
            .map((s, i) => (
              <g key={i} transform={`translate(${L + 10} ${T + 14 + i * 16})`}>
                <line x1={0} y1={-4} x2={18} y2={-4} stroke={s.color} strokeWidth={2.5} strokeDasharray={s.dash} />
                <text x={24} y={0} fill="#cbd5e1" fontSize={11}>
                  {s.label}
                </text>
              </g>
            ))}
        </g>
      )}
    </svg>
  );
}
