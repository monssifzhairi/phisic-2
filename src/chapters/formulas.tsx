import type { ReactNode } from "react";
import { Frac, M, Vec } from "../components/ui";

export type FormulaItem = { group: string; title: string; formula: ReactNode; note: ReactNode; color: string };

export const FORMULAS: FormulaItem[] = [
  {
    group: "Travail",
    title: "Travail d'une force constante",
    formula: (
      <>
        W<sub>AB</sub>(<Vec>F</Vec>) = <Vec>F</Vec>·<Vec>AB</Vec> = F·d·cos α
      </>
    ),
    note: "W en J ; F en N ; d en m ; α = angle (F⃗ ; AB⃗). Moteur si α < 90°, nul si α = 90°, résistant si α > 90°.",
    color: "#34d399",
  },
  {
    group: "Travail",
    title: "Produit scalaire en coordonnées",
    formula: (
      <>
        <Vec>F</Vec>·<Vec>AB</Vec> = F<sub>x</sub>·AB<sub>x</sub> + F<sub>y</sub>·AB<sub>y</sub>
      </>
    ),
    note: "Repère orthonormé ; résultat scalaire en joules.",
    color: "#34d399",
  },
  {
    group: "Travail",
    title: "Travail d'une force de frottement",
    formula: <>W(f) = −f·d</>,
    note: "Frottement constant opposé au déplacement (α = 180°) : toujours résistant.",
    color: "#f87171",
  },
  {
    group: "Travail",
    title: "Travail du poids",
    formula: <>W<sub>AB</sub>(P) = m·g·(z<sub>A</sub> − z<sub>B</sub>)</>,
    note: "z orienté vers le haut. Descente : > 0 ; montée : < 0 ; horizontal : 0. Indépendant du chemin. g ≈ 9,8 N/kg.",
    color: "#a78bfa",
  },
  {
    group: "Puissance",
    title: "Puissance moyenne",
    formula: (
      <>
        P<sub>m</sub> = <Frac n="W" d="Δt" />
      </>
    ),
    note: "P en watts (1 W = 1 J/s) ; Δt en secondes.",
    color: "#facc15",
  },
  {
    group: "Puissance",
    title: "Puissance instantanée",
    formula: (
      <>
        P = <Vec>F</Vec>·<Vec>v</Vec> = F·v·cos α
      </>
    ),
    note: "α = angle entre la force et la vitesse ; v en m/s. À F et v constantes : W = P·Δt.",
    color: "#facc15",
  },
  {
    group: "Énergie cinétique",
    title: "Énergie cinétique de translation",
    formula: (
      <>
        E<sub>c</sub> = <Frac n="1" d="2" />·m·v²
      </>
    ),
    note: "Ec en J ; m en kg ; v en m/s. Ec ≥ 0. v × 2 ⇒ Ec × 4 ; m × 2 ⇒ Ec × 2.",
    color: "#22d3ee",
  },
  {
    group: "Énergie cinétique",
    title: "Théorème de l'énergie cinétique",
    formula: (
      <>
        ΔE<sub>c</sub> = E<sub>c</sub>(B) − E<sub>c</sub>(A) = Σ W<sub>AB</sub>(<Vec>F</Vec><sub>ext</sub>)
      </>
    ),
    note: "Référentiel galiléen. Équivaut à ½·m·v_B² − ½·m·v_A² = ΣW.",
    color: "#38bdf8",
  },
];

export const CONVERSIONS: [ReactNode, ReactNode][] = [
  [<M>1 m/s = 3,6 km/h</M>, "pour passer de km/h à m/s, on divise par 3,6"],
  [<M>1 J = 1 N·m = 1 kg·m²·s⁻²</M>, "unité de travail et d'énergie"],
  [<M>1 W = 1 J/s</M>, "unité de puissance ; 1 kW = 1 000 W"],
  [<M>1 kWh = 3,6 × 10⁶ J</M>, "unité pratique d'énergie"],
  [<M>1 t = 1 000 kg</M>, "conversion de masse"],
  [<M>g ≈ 9,8 N/kg</M>, "souvent arrondi à 10 N/kg dans les exercices (si l'énoncé le précise)"],
];

export function FormulaList({ compact }: { compact?: boolean }) {
  const groups = Array.from(new Set(FORMULAS.map((f) => f.group)));
  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <div key={g}>
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-300">{g}</div>
          <div className="space-y-2">
            {FORMULAS.filter((f) => f.group === g).map((f) => (
              <div key={f.title} className="rounded-xl border bg-ink-900/70 p-3" style={{ borderColor: f.color + "55" }}>
                <div className="text-xs font-semibold text-slate-400">{f.title}</div>
                <div className="math my-1 overflow-x-auto text-lg" style={{ color: f.color }}>
                  {f.formula}
                </div>
                {!compact && <div className="text-xs leading-relaxed text-slate-400">{f.note}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
