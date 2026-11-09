import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { ChapterHeader } from "../components/ui";

type Q = { topic: string; q: ReactNode; options: string[]; answer: number; explain: string };

const QUESTIONS: Q[] = [
  {
    topic: "Puissance",
    q: "Quelle est l'unité SI de la puissance ?",
    options: ["Le joule (J)", "Le watt (W)", "Le newton (N)", "Le kilowattheure (kWh)"],
    answer: 1,
    explain: "La puissance se mesure en watts : 1 W = 1 J/s. Le kWh est une unité d'énergie.",
  },
  {
    topic: "Travail",
    q: "Une force de 10 N fait un angle de 60° avec un déplacement rectiligne de 4 m. Son travail est :",
    options: ["40 J", "34,6 J", "20 J", "−20 J"],
    answer: 2,
    explain: "W = F·d·cos α = 10 × 4 × cos 60° = 40 × 0,5 = 20 J.",
  },
  {
    topic: "Travail",
    q: "Pour α = 120° entre la force et le déplacement, le travail est :",
    options: ["moteur", "résistant", "nul", "égal à F·d"],
    answer: 1,
    explain: "cos 120° = −0,5 < 0 : le travail est négatif, donc résistant.",
  },
  {
    topic: "Poids",
    q: "Un objet de 3 kg monte de 2 m (g = 10 N/kg). Le travail de son poids vaut :",
    options: ["+60 J", "−60 J", "+6 J", "0 J"],
    answer: 1,
    explain: "W = m·g·(zA − zB) = 3 × 10 × (0 − 2) = −60 J : le poids est résistant à la montée.",
  },
  {
    topic: "Poids",
    q: "Pendant un déplacement horizontal, le travail du poids est :",
    options: ["positif", "négatif", "nul", "égal à m·g·d"],
    answer: 2,
    explain: "Le poids est vertical, donc perpendiculaire au déplacement horizontal : cos 90° = 0, W = 0.",
  },
  {
    topic: "Puissance",
    q: "Une force fournit 1 500 J en 30 s. Sa puissance moyenne est :",
    options: ["45 000 W", "50 W", "1 530 W", "0,02 W"],
    answer: 1,
    explain: "Pm = W / Δt = 1 500 / 30 = 50 W.",
  },
  {
    topic: "Énergie cinétique",
    q: "Quelle est l'énergie cinétique d'un solide de 4 kg se déplaçant à 5 m/s ?",
    options: ["10 J", "20 J", "50 J", "100 J"],
    answer: 2,
    explain: "Ec = ½ × 4 × 5² = 2 × 25 = 50 J.",
  },
  {
    topic: "Énergie cinétique",
    q: "Quand la vitesse d'un solide est doublée (masse constante), son énergie cinétique est :",
    options: ["doublée", "multipliée par 4", "multipliée par 8", "inchangée"],
    answer: 1,
    explain: "Ec = ½·m·v² est proportionnelle à v² : doubler v multiplie Ec par 2² = 4.",
  },
  {
    topic: "Énergie cinétique",
    q: "Un véhicule de 500 kg roule à 72 km/h. Son énergie cinétique est :",
    options: ["100 000 J", "18 000 J", "1 296 000 J", "250 000 J"],
    answer: 0,
    explain: "72 km/h = 20 m/s ; Ec = ½ × 500 × 20² = 100 000 J.",
  },
  {
    topic: "Théorème",
    q: "Ec(A) = 50 J et la somme des travaux des forces extérieures entre A et B vaut +30 J. Ec(B) vaut :",
    options: ["20 J", "30 J", "80 J", "1 500 J"],
    answer: 2,
    explain: "ΔEc = ΣW donc Ec(B) = Ec(A) + ΣW = 50 + 30 = 80 J.",
  },
  {
    topic: "Théorème",
    q: "Un solide de 2 kg, lancé à 4 m/s sur un plan horizontal, est freiné par un frottement constant de 4 N. Il s'arrête après :",
    options: ["2 m", "4 m", "8 m", "16 m"],
    answer: 1,
    explain: "0 − ½·m·v² = −f·d ⇒ d = ½ × 2 × 16 / 4 = 4 m.",
  },
  {
    topic: "Théorème",
    q: "Un solide se déplace en ligne droite à vitesse constante sous l'action d'une force motrice F et d'un frottement f. On a :",
    options: ["W(F) = W(f)", "W(F) = −W(f)", "W(F) = 0", "W(f) = 0"],
    answer: 1,
    explain: "Vitesse constante ⇒ ΔEc = 0 ⇒ ΣW = 0 ⇒ W(F) + W(f) = 0 (poids et réaction ne travaillent pas), soit W(F) = −W(f).",
  },
];

export default function Quiz({ onFinish, best }: { onFinish: (score: number) => void; best: number | null }) {
  const [i, setI] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [done, setDone] = useState(false);
  const q = QUESTIONS[i];
  const score = answers.filter((a, k) => a === QUESTIONS[k].answer).length;

  const choose = (k: number) => {
    if (sel !== null) return;
    setSel(k);
    setAnswers((a) => a.map((x, j) => (j === i ? k : x)));
  };
  const next = () => {
    if (i + 1 < QUESTIONS.length) {
      setI(i + 1);
      setSel(null);
    } else {
      setDone(true);
      onFinish(answers.filter((a, k) => a === QUESTIONS[k].answer).length);
    }
  };
  const restart = () => {
    setI(0);
    setSel(null);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const topics = Array.from(new Set(QUESTIONS.map((x) => x.topic)));
    return (
      <article>
        <ChapterHeader num="7" title="Quiz interactif" subtitle="Résultats de ton évaluation." />
        <div className="fade-up rounded-2xl border border-sky-400/25 bg-ink-800/70 p-6 text-center">
          <div className="text-sm uppercase tracking-widest text-slate-400">Ton score</div>
          <div className="my-2 font-mono text-6xl font-bold text-white">
            {score}
            <span className="text-3xl text-slate-500">/{QUESTIONS.length}</span>
          </div>
          <div className="mx-auto h-3 max-w-md overflow-hidden rounded-full bg-ink-600">
            <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-700" style={{ width: pct + "%" }} />
          </div>
          <p className="mt-4 text-slate-300">
            {pct >= 90 && "Excellent ! Tu maîtrises le chapitre. Essaie maintenant de refaire les exercices sans la correction."}
            {pct >= 70 && pct < 90 && "Très bien ! Relis les explications des questions manquées pour consolider."}
            {pct >= 50 && pct < 70 && "Bon début. Reprends les chapitres concernés et refais les expériences interactives."}
            {pct < 50 && "Pas de panique : relis le cours calmement, manipule les expériences, puis retente le quiz."}
          </p>
          <button onClick={restart} className="mt-5 rounded-xl bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-400">
            ↺ Refaire le quiz
          </button>
        </div>

        <h3 className="mb-3 mt-8 font-semibold text-white">Résultat par thème</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => {
            const idx = QUESTIONS.map((x, k) => (x.topic === t ? k : -1)).filter((k) => k >= 0);
            const ok = idx.filter((k) => answers[k] === QUESTIONS[k].answer).length;
            return (
              <div key={t} className="rounded-xl border border-sky-400/15 bg-ink-800/70 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{t}</span>
                  <span className="font-mono text-sky-300">
                    {ok}/{idx.length}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-600">
                  <div className={cn("h-full rounded-full", ok === idx.length ? "bg-emerald-400" : "bg-amber-400")} style={{ width: (ok / idx.length) * 100 + "%" }} />
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="mb-3 mt-8 font-semibold text-white">Correction détaillée</h3>
        <div className="space-y-2">
          {QUESTIONS.map((x, k) => {
            const good = answers[k] === x.answer;
            return (
              <div key={k} className={cn("rounded-xl border p-3 text-sm", good ? "border-emerald-400/30 bg-emerald-400/5" : "border-rose-400/30 bg-rose-400/5")}>
                <div className="font-medium text-white">
                  {good ? "✓" : "✗"} {k + 1}. {x.q}
                </div>
                <div className="mt-1 text-slate-300">
                  {!good && answers[k] !== null && <span className="text-rose-300">Ta réponse : {x.options[answers[k] as number]}. </span>}
                  <span className="text-emerald-300">Bonne réponse : {x.options[x.answer]}.</span> {x.explain}
                </div>
              </div>
            );
          })}
        </div>
      </article>
    );
  }

  return (
    <article>
      <ChapterHeader num="7" title="Quiz interactif" subtitle="Douze questions sur l'ensemble du cours. Correction immédiate après chaque réponse." />
      {best !== null && <div className="mb-4 text-sm text-emerald-300">Meilleur score enregistré : {best}/{QUESTIONS.length}</div>}
      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
        <span>
          Question {i + 1} sur {QUESTIONS.length} · <span className="text-sky-300">{q.topic}</span>
        </span>
        <span className="font-mono">Score : {score}</span>
      </div>
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-ink-600">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-500" style={{ width: ((i + (sel !== null ? 1 : 0)) / QUESTIONS.length) * 100 + "%" }} />
      </div>

      <div key={i} className="fade-up rounded-2xl border border-sky-400/25 bg-ink-800/70 p-4 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">{q.q}</h3>
        <div className="grid gap-2.5">
          {q.options.map((o, k) => {
            const good = sel !== null && k === q.answer;
            const bad = sel === k && k !== q.answer;
            return (
              <button
                key={k}
                onClick={() => choose(k)}
                disabled={sel !== null}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                  sel === null && "border-sky-400/20 bg-ink-900 hover:border-sky-400/70 hover:bg-ink-700",
                  good && "border-emerald-400 bg-emerald-400/15 text-emerald-100",
                  bad && "border-rose-400 bg-rose-400/15 text-rose-100",
                  sel !== null && !good && !bad && "border-slate-700/40 bg-ink-900/60 opacity-55"
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-sm font-bold">
                  {good ? "✓" : bad ? "✗" : String.fromCharCode(65 + k)}
                </span>
                {o}
              </button>
            );
          })}
        </div>
        {sel !== null && (
          <div className={cn("fade-up mt-4 rounded-xl px-4 py-3 text-sm", sel === q.answer ? "bg-emerald-400/10 text-emerald-100" : "bg-rose-400/10 text-rose-100")}>
            <strong>{sel === q.answer ? "Correct ! " : "Incorrect. "}</strong>
            {q.explain}
          </div>
        )}
        <div className="mt-5 flex justify-end">
          <button
            onClick={next}
            disabled={sel === null}
            className="rounded-xl bg-sky-500 px-5 py-2.5 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {i + 1 < QUESTIONS.length ? "Question suivante →" : "Voir mon résultat"}
          </button>
        </div>
      </div>
    </article>
  );
}
