import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { fmt } from "../lib/phys";

/* ---------- Notation mathématique ---------- */
export const M = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("math", className)}>{children}</span>
);
export const Vec = ({ children }: { children: ReactNode }) => <span className="vec math">{children}</span>;
export const Frac = ({ n, d }: { n: ReactNode; d: ReactNode }) => (
  <span className="frac">
    <span>{n}</span>
    <span>{d}</span>
  </span>
);
export const U = ({ children }: { children: ReactNode }) => <span className="rm whitespace-nowrap text-slate-300">{children}</span>;

/** Équation mise en valeur */
export function Eq({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="my-4 rounded-xl border border-sky-400/25 bg-gradient-to-r from-sky-500/10 via-ink-800 to-sky-500/10 px-4 py-4 text-center shadow-[0_0_30px_-12px_rgba(56,189,248,0.5)]">
      {label && <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sky-300/80">{label}</div>}
      <div className="math overflow-x-auto text-xl text-sky-50 sm:text-2xl">{children}</div>
    </div>
  );
}

/* ---------- Étiquettes cœur / enrichissement ---------- */
export function Tag({ kind }: { kind: "core" | "enrich" }) {
  return kind === "core" ? (
    <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
      Cœur du cours
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-300">
      Enrichissement
    </span>
  );
}

export function Enrich({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group my-5 rounded-xl border border-dashed border-amber-400/35 bg-amber-400/[0.04]">
      <summary className="flex items-center gap-3 px-4 py-3">
        <Tag kind="enrich" />
        <span className="flex-1 text-sm font-medium text-amber-100">{title}</span>
        <span className="text-xs text-amber-300/70 transition group-open:rotate-90">▶</span>
      </summary>
      <div className="space-y-3 border-t border-dashed border-amber-400/20 px-4 py-4 text-[15px] leading-relaxed">
        <p className="text-xs italic text-amber-200/70">
          Contenu facultatif : il approfondit le sujet mais ne fait pas partie du noyau du cours. Vérifie avec ton professeur s'il est demandé.
        </p>
        {children}
      </div>
    </details>
  );
}

/* ---------- Encadrés ---------- */
const calloutStyles = {
  def: { c: "border-sky-400/40 bg-sky-400/[0.07]", t: "text-sky-300", l: "Définition" },
  rule: { c: "border-emerald-400/40 bg-emerald-400/[0.07]", t: "text-emerald-300", l: "À retenir" },
  warn: { c: "border-rose-400/40 bg-rose-400/[0.07]", t: "text-rose-300", l: "Attention" },
  info: { c: "border-violet-400/40 bg-violet-400/[0.07]", t: "text-violet-300", l: "Remarque" },
} as const;

export function Callout({ kind, title, children }: { kind: keyof typeof calloutStyles; title?: string; children: ReactNode }) {
  const s = calloutStyles[kind];
  return (
    <div className={cn("my-4 rounded-xl border-l-4 px-4 py-3 text-[15px] leading-relaxed", s.c)}>
      <div className={cn("mb-1 text-xs font-bold uppercase tracking-widest", s.t)}>{title ?? s.l}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* ---------- Structure pédagogique ---------- */
const stepKinds = {
  idea: { l: "L'idée simple", c: "bg-amber-400/15 text-amber-300 border-amber-400/30" },
  def: { l: "Définition rigoureuse", c: "bg-sky-400/15 text-sky-300 border-sky-400/30" },
  sym: { l: "Symboles et unités SI", c: "bg-violet-400/15 text-violet-300 border-violet-400/30" },
  fig: { l: "Figure scientifique", c: "bg-cyan-400/15 text-cyan-300 border-cyan-400/30" },
  real: { l: "Dans la vie réelle", c: "bg-teal-400/15 text-teal-300 border-teal-400/30" },
  calc: { l: "Exemple numérique", c: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30" },
  exp: { l: "Expérience interactive", c: "bg-fuchsia-400/15 text-fuchsia-300 border-fuchsia-400/30" },
  check: { l: "Vérifie ta compréhension", c: "bg-rose-400/15 text-rose-300 border-rose-400/30" },
  plain: { l: "", c: "" },
} as const;

export function Step({ n, kind, title, children }: { n?: number; kind: keyof typeof stepKinds; title?: string; children: ReactNode }) {
  const s = stepKinds[kind];
  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        {n !== undefined && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 font-mono text-sm font-bold text-sky-200">{n}</span>
        )}
        {s.l && <span className={cn("rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-wider", s.c)}>{s.l}</span>}
        {title && <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>}
      </div>
      <div className="space-y-3 text-[15px] leading-relaxed text-slate-300 sm:text-base">{children}</div>
    </section>
  );
}

export function ChapterHeader({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return (
    <header className="fade-up mb-8 border-b border-sky-400/15 pb-6">
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm tracking-widest text-sky-400">CHAPITRE {num}</span>
        <Tag kind="core" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-3xl text-slate-400">{subtitle}</p>
    </header>
  );
}

export function SymbolTable({ rows }: { rows: [ReactNode, ReactNode, ReactNode][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-sky-400/15">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead className="bg-ink-700/60 text-xs uppercase tracking-wider text-slate-400">
          <tr>
            <th className="px-3 py-2">Symbole</th>
            <th className="px-3 py-2">Signification</th>
            <th className="px-3 py-2">Unité SI</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-sky-400/10">
              <td className="px-3 py-2 text-lg text-sky-200">{r[0]}</td>
              <td className="px-3 py-2">{r[1]}</td>
              <td className="px-3 py-2 text-emerald-300">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Worked({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-emerald-400/25 bg-emerald-400/[0.04]">
      <div className="border-b border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">{title}</div>
      <div className="space-y-2 px-4 py-3 text-[15px]">{children}</div>
    </div>
  );
}
/** Ligne de calcul */
export const Ln = ({ children }: { children: ReactNode }) => <div className="math overflow-x-auto py-0.5 text-base text-slate-100">{children}</div>;

export function Check({ question, options, answer, explain }: { question: ReactNode; options: ReactNode[]; answer: number; explain: ReactNode }) {
  const [sel, setSel] = useState<number | null>(null);
  const done = sel !== null;
  return (
    <div className="rounded-xl border border-rose-400/25 bg-rose-400/[0.04] p-4">
      <div className="mb-3 font-medium text-white">{question}</div>
      <div className="grid gap-2">
        {options.map((o, i) => {
          const isSel = sel === i;
          const good = done && i === answer;
          const bad = done && isSel && i !== answer;
          return (
            <button
              key={i}
              disabled={done}
              onClick={() => setSel(i)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-[15px] transition",
                !done && "border-sky-400/20 bg-ink-800 hover:border-sky-400/60 hover:bg-ink-700",
                good && "border-emerald-400 bg-emerald-400/15 text-emerald-100",
                bad && "border-rose-400 bg-rose-400/15 text-rose-100",
                done && !good && !bad && "border-slate-700/40 bg-ink-800/50 opacity-60"
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                {good ? "✓" : bad ? "✗" : String.fromCharCode(65 + i)}
              </span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className={cn("fade-up mt-3 rounded-lg px-3 py-2 text-sm", sel === answer ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200")}>
          <strong>{sel === answer ? "Bravo ! " : "Pas tout à fait. "}</strong>
          {explain}
          <div>
            <button onClick={() => setSel(null)} className="mt-2 text-xs underline underline-offset-2 opacity-80 hover:opacity-100">
              Réessayer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Reveal({ label = "Voir la correction", children }: { label?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-200 transition hover:bg-sky-400/20"
      >
        {open ? "Masquer la correction" : label}
      </button>
      {open && <div className="fade-up mt-3 space-y-2 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.05] p-4 text-[15px]">{children}</div>}
    </div>
  );
}

/* ---------- Éléments de simulation ---------- */
export function SimShell({ n, title, goal, children }: { n: number; title: string; goal: string; children: ReactNode }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-sky-400/25 bg-gradient-to-b from-ink-800 to-ink-900 shadow-[0_10px_60px_-20px_rgba(14,116,244,0.45)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-sky-400/15 bg-ink-700/40 px-4 py-3">
        <span className="rounded-md bg-sky-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">Expérience {n}</span>
        <h4 className="font-semibold text-white">{title}</h4>
        <span className="ml-auto hidden items-center gap-1.5 text-xs text-emerald-300 sm:flex">
          <span className="pulse-glow h-2 w-2 rounded-full bg-emerald-400" /> Simulation en direct
        </span>
      </div>
      <p className="px-4 pt-3 text-sm text-slate-400">
        <strong className="text-slate-200">Objectif : </strong>
        {goal}
      </p>
      <div className="space-y-4 p-3 sm:p-4">{children}</div>
    </div>
  );
}

export function Slider({
  label,
  symbol,
  unit,
  value,
  min,
  max,
  step,
  onChange,
  digits = 1,
  color = "#38bdf8",
}: {
  label: string;
  symbol?: ReactNode;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  digits?: number;
  color?: string;
}) {
  const p = ((value - min) / (max - min)) * 100;
  const style = { "--p": `${p}%`, "--c": color } as CSSProperties;
  return (
    <label className="block rounded-xl border border-sky-400/10 bg-ink-900/70 px-3 py-2.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-slate-300">
          {label} {symbol && <M className="text-sky-200">{symbol}</M>}
        </span>
        <span className="font-mono text-[15px] font-semibold tabular-nums text-white">
          {fmt(value, digits)} <span className="text-xs font-normal text-slate-400">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        className="lab mt-2.5 block w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        style={style}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={`${label} (${unit})`}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
        <span>{fmt(min, digits)}</span>
        <span>{fmt(max, digits)}</span>
      </div>
    </label>
  );
}

export function SimControls({
  running,
  onToggle,
  onReset,
  children,
}: {
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onToggle}
        className={cn(
          "flex min-w-[110px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow transition",
          running ? "bg-amber-500 hover:bg-amber-400" : "bg-sky-500 hover:bg-sky-400"
        )}
      >
        {running ? "❚❚ Pause" : "▶ Lecture"}
      </button>
      <button
        onClick={onReset}
        className="rounded-lg border border-sky-400/30 bg-ink-800 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-ink-700"
      >
        ↺ Réinitialiser
      </button>
      {children}
    </div>
  );
}

type Tone = "neutral" | "motor" | "resist" | "zero" | "accent" | "energy";
const toneCls: Record<Tone, string> = {
  neutral: "text-white",
  motor: "text-emerald-300",
  resist: "text-rose-300",
  zero: "text-slate-300",
  accent: "text-sky-300",
  energy: "text-cyan-300",
};
export function Readout({ label, value, unit, tone = "neutral", big }: { label: ReactNode; value: string; unit?: string; tone?: Tone; big?: boolean }) {
  return (
    <div className="rounded-xl border border-sky-400/10 bg-ink-900/80 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className={cn("font-mono font-semibold tabular-nums", big ? "text-2xl" : "text-lg", toneCls[tone])}>
        {value} {unit && <span className="text-xs font-normal text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}

export function Banner({ kind, children }: { kind: "motor" | "resist" | "zero" | "info"; children: ReactNode }) {
  const s = {
    motor: "border-emerald-400/50 bg-emerald-400/10 text-emerald-100",
    resist: "border-rose-400/50 bg-rose-400/10 text-rose-100",
    zero: "border-slate-400/40 bg-slate-400/10 text-slate-200",
    info: "border-sky-400/40 bg-sky-400/10 text-sky-100",
  }[kind];
  return <div className={cn("rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors duration-300", s)}>{children}</div>;
}

export function Seg<T extends string | number>({ value, options, onChange }: { value: T; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-sky-400/30">
      {options.map((o) => (
        <button
          key={String(o.v)}
          onClick={() => onChange(o.v)}
          className={cn("px-3 py-2 text-sm font-medium transition", value === o.v ? "bg-sky-500 text-white" : "bg-ink-800 text-slate-300 hover:bg-ink-700")}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

export const SvgBox = ({ children, viewBox }: { children: ReactNode; viewBox: string }) => (
  <div className="overflow-hidden rounded-xl border border-sky-400/15 bg-ink-950/80">
    <svg viewBox={viewBox} className="block h-auto w-full" role="img">
      {children}
    </svg>
  </div>
);
