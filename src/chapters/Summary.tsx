import { useState } from "react";
import { Callout, ChapterHeader, M, Step, Tag } from "../components/ui";
import { CONVERSIONS, FormulaList } from "./formulas";
import { cn } from "../utils/cn";

const CHECKLIST = [
  "Je sais définir le travail d'une force constante et calculer W = F·d·cos α.",
  "Je distingue travail moteur, résistant et nul d'après l'angle α.",
  "Je sais calculer le travail du poids avec les altitudes zA et zB.",
  "Je connais la puissance moyenne (W/Δt) et la puissance instantanée (F·v·cos α).",
  "Je sais calculer une énergie cinétique en convertissant correctement les unités.",
  "J'énonce le théorème de l'énergie cinétique et je l'applique en 5 étapes.",
  "Je sais vérifier l'homogénéité d'une formule avec les unités SI.",
];

export default function Summary() {
  const [done, setDone] = useState<boolean[]>(CHECKLIST.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <article>
      <ChapterHeader num="8" title="Synthèse et fiche de formules" subtitle="L'essentiel du cours sur une page : à relire avant un contrôle." />

      <Step n={1} kind="plain" title="Résumé en cinq idées">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Travail", "Énergie transférée par une force constante sur un déplacement : W = F·d·cos α, en joules.", "#34d399"],
            ["Poids", "W(P) = m·g·(zA − zB) : seule la différence d'altitude compte, pas le chemin.", "#a78bfa"],
            ["Puissance", "Rapidité du transfert : Pm = W/Δt ; P = F·v·cos α. Unité : le watt.", "#facc15"],
            ["Énergie cinétique", "Ec = ½·m·v² ≥ 0, en joules ; doubler v multiplie Ec par 4.", "#22d3ee"],
            ["Théorème", "ΔEc = ΣW(forces extérieures) dans un référentiel galiléen.", "#38bdf8"],
          ].map(([t, d, c]) => (
            <div key={t} className="rounded-xl border bg-ink-800/70 p-3" style={{ borderColor: c + "66" }}>
              <div className="font-semibold" style={{ color: c }}>
                {t}
              </div>
              <div className="mt-1 text-sm text-slate-300">{d}</div>
            </div>
          ))}
        </div>
      </Step>

      <Step n={2} kind="plain" title="Fiche de formules">
        <div className="flex items-center gap-3">
          <Tag kind="core" />
          <button onClick={() => window.print()} className="ml-auto rounded-lg border border-sky-400/30 px-3 py-1.5 text-xs text-sky-200 hover:bg-ink-700 print:hidden">
            🖨 Imprimer / enregistrer en PDF
          </button>
        </div>
        <FormulaList />
        <div className="mt-5 overflow-x-auto rounded-xl border border-sky-400/15">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="bg-ink-700/60 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 py-2">Conversions utiles</th>
                <th className="px-3 py-2">Remarque</th>
              </tr>
            </thead>
            <tbody>
              {CONVERSIONS.map((c, i) => (
                <tr key={i} className="border-t border-sky-400/10">
                  <td className="px-3 py-2 text-sky-200">{c[0]}</td>
                  <td className="px-3 py-2">{c[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Step>

      <Step n={3} kind="plain" title="Tableau des signes">
        <div className="overflow-x-auto rounded-xl border border-sky-400/15">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-ink-700/60 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 py-2">Situation</th>
                <th className="px-3 py-2">Angle</th>
                <th className="px-3 py-2">Travail</th>
                <th className="px-3 py-2">Effet sur Ec</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-sky-400/10">
                <td className="px-3 py-2">Force dans le sens du mouvement ; poids à la descente</td>
                <td className="px-3 py-2">α &lt; 90°</td>
                <td className="px-3 py-2 text-emerald-300">W &gt; 0 (moteur)</td>
                <td className="px-3 py-2">augmente</td>
              </tr>
              <tr className="border-t border-sky-400/10">
                <td className="px-3 py-2">Réaction normale ; poids en trajet horizontal</td>
                <td className="px-3 py-2">α = 90°</td>
                <td className="px-3 py-2 text-slate-300">W = 0</td>
                <td className="px-3 py-2">inchangée</td>
              </tr>
              <tr className="border-t border-sky-400/10">
                <td className="px-3 py-2">Frottement ; poids à la montée</td>
                <td className="px-3 py-2">α &gt; 90°</td>
                <td className="px-3 py-2 text-rose-300">W &lt; 0 (résistant)</td>
                <td className="px-3 py-2">diminue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Step>

      <Step n={4} kind="plain" title="Méthode et erreurs fréquentes">
        <Callout kind="rule" title="Méthode du théorème de l'énergie cinétique">
          <ol className="list-decimal space-y-1 pl-5">
            <li>Définir le système et le référentiel (galiléen).</li>
            <li>Faire le bilan des forces extérieures et un schéma.</li>
            <li>Calculer le travail de chaque force entre A et B (signe !).</li>
            <li>
              Écrire <M>½·m·v<sub>B</sub>² − ½·m·v<sub>A</sub>² = ΣW</M>.
            </li>
            <li>Résoudre, vérifier l'ordre de grandeur et les unités.</li>
          </ol>
        </Callout>
        <Callout kind="warn" title="Erreurs fréquentes à éviter">
          <ul className="list-disc space-y-1 pl-5">
            <li>Oublier de convertir km/h en m/s (÷ 3,6) ou tonnes en kg.</li>
            <li>Confondre l'angle α (force ; déplacement) avec l'angle d'inclinaison du plan.</li>
            <li>Oublier le signe moins du travail d'un frottement ou du poids à la montée.</li>
            <li>Écrire v au lieu de v² dans Ec, ou oublier le facteur ½.</li>
            <li>Compter le travail de forces perpendiculaires au déplacement (il est nul).</li>
            <li>Confondre énergie (J) et puissance (W).</li>
          </ul>
        </Callout>
        <Callout kind="info" title="Cœur du cours et enrichissement">
          <p>
            Les contenus étiquetés <Tag kind="enrich" /> (force variable, énergie potentielle, rendement, rotation, démonstration générale) sont facultatifs. Tout le reste constitue le socle du chapitre.
          </p>
        </Callout>
      </Step>

      <Step n={5} kind="plain" title="Auto-évaluation">
        <p className="text-sm text-slate-400">Coche ce que tu maîtrises ({count}/{CHECKLIST.length}).</p>
        <div className="mb-2 h-2 overflow-hidden rounded-full bg-ink-600">
          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all" style={{ width: (count / CHECKLIST.length) * 100 + "%" }} />
        </div>
        <div className="space-y-2">
          {CHECKLIST.map((c, i) => (
            <button
              key={i}
              onClick={() => setDone(done.map((d, j) => (j === i ? !d : d)))}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition",
                done[i] ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-100" : "border-sky-400/15 bg-ink-800/70 hover:border-sky-400/40"
              )}
            >
              <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs", done[i] ? "border-emerald-400 bg-emerald-400 text-ink-950" : "border-slate-500")}>
                {done[i] ? "✓" : ""}
              </span>
              {c}
            </button>
          ))}
        </div>
      </Step>
    </article>
  );
}
