import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./utils/cn";
import Intro from "./chapters/Intro";
import Work from "./chapters/Work";
import Weight from "./chapters/Weight";
import Power from "./chapters/Power";
import Kinetic from "./chapters/Kinetic";
import Theorem from "./chapters/Theorem";
import Exercises from "./chapters/Exercises";
import Quiz from "./chapters/Quiz";
import Summary from "./chapters/Summary";
import { CONVERSIONS, FormulaList } from "./chapters/formulas";

type Chap = { id: string; num: string; title: string; tag: string };
const CHAPTERS: Chap[] = [
  { id: "intro", num: "0", title: "Introduction générale", tag: "Cours" },
  { id: "travail", num: "1", title: "Travail d'une force", tag: "Exp. 1" },
  { id: "poids", num: "2", title: "Travail du poids", tag: "Exp. 2" },
  { id: "puissance", num: "3", title: "Puissance d'une force", tag: "Exp. 3" },
  { id: "cinetique", num: "4", title: "Énergie cinétique", tag: "Exp. 4" },
  { id: "theoreme", num: "5", title: "Théorème de l'Ec", tag: "Exp. 5" },
  { id: "exercices", num: "6", title: "Exercices corrigés", tag: "7 ex." },
  { id: "quiz", num: "7", title: "Quiz interactif", tag: "12 Q" },
  { id: "synthese", num: "8", title: "Synthèse et formulaire", tag: "Fiche" },
];

const LS_KEY = "physics-lab-progress-v1";
type Saved = { done: string[]; quiz: number | null };
function load(): Saved {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s) return JSON.parse(s) as Saved;
  } catch {
    /* stockage indisponible */
  }
  return { done: [], quiz: null };
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="#0f1d3b" stroke="#38bdf8" strokeOpacity="0.6" />
        <path d="M8 29 L8 11" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 29 L32 29" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 27 Q 16 26 21 18 T 32 10" stroke="#34d399" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="10" r="3" fill="#fb923c" />
      </svg>
      <div className="leading-tight">
        <div className="font-bold tracking-wide text-white">PHYSICS LAB</div>
        <div className="text-[11px] uppercase tracking-widest text-sky-300/80">Travail & énergie cinétique</div>
      </div>
    </div>
  );
}

function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  return (
    <>
      <div onClick={onClose} className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity", open ? "opacity-100" : "pointer-events-none opacity-0")} />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(440px,100vw)] flex-col border-l border-sky-400/25 bg-ink-900 shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        {children}
      </aside>
    </>
  );
}

export default function App() {
  const initial = () => {
    const h = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    return CHAPTERS.some((c) => c.id === h) ? h : "intro";
  };
  const [cur, setCur] = useState<string>(initial);
  const [saved, setSaved] = useState<Saved>(load);
  const [menu, setMenu] = useState(false);
  const [formulas, setFormulas] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(saved));
    } catch {
      /* ignore */
    }
  }, [saved]);

  const go = useCallback((id: string) => {
    setCur(id);
    setMenu(false);
    try {
      window.history.replaceState(null, "", "#" + id);
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const h = () => {
      const id = window.location.hash.replace("#", "");
      if (CHAPTERS.some((c) => c.id === id)) setCur(id);
    };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  const idx = CHAPTERS.findIndex((c) => c.id === cur);
  const chap = CHAPTERS[idx];
  const isDone = (id: string) => saved.done.includes(id);
  const toggleDone = (id: string) => setSaved((s) => ({ ...s, done: s.done.includes(id) ? s.done.filter((x) => x !== id) : [...s.done, id] }));
  const pct = Math.round((saved.done.length / CHAPTERS.length) * 100);

  const body = (() => {
    switch (cur) {
      case "intro":
        return <Intro go={go} />;
      case "travail":
        return <Work />;
      case "poids":
        return <Weight />;
      case "puissance":
        return <Power />;
      case "cinetique":
        return <Kinetic />;
      case "theoreme":
        return <Theorem />;
      case "exercices":
        return <Exercises />;
      case "quiz":
        return (
          <Quiz
            best={saved.quiz}
            onFinish={(score) =>
              setSaved((s) => ({
                done: s.done.includes("quiz") ? s.done : [...s.done, "quiz"],
                quiz: s.quiz === null ? score : Math.max(s.quiz, score),
              }))
            }
          />
        );
      default:
        return <Summary />;
    }
  })();

  return (
    <div className="min-h-screen text-slate-300 lg:flex">
      {/* Fond assombri mobile */}
      <div onClick={() => setMenu(false)} className={cn("fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden", menu ? "opacity-100" : "pointer-events-none opacity-0")} />

      {/* Barre latérale */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-sky-400/15 bg-ink-900/95 backdrop-blur transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          menu ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="border-b border-sky-400/10 p-4">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Chapitres">
          {CHAPTERS.map((c) => {
            const active = c.id === cur;
            return (
              <button
                key={c.id}
                onClick={() => go(c.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                  active ? "bg-sky-500/15 text-white ring-1 ring-sky-400/40" : "text-slate-400 hover:bg-ink-700/60 hover:text-slate-100"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold",
                    isDone(c.id) ? "bg-emerald-400 text-ink-950" : active ? "bg-sky-500 text-white" : "bg-ink-700 text-slate-300"
                  )}
                >
                  {isDone(c.id) ? "✓" : c.num}
                </span>
                <span className="flex-1 text-sm font-medium leading-tight">{c.title}</span>
                <span className="rounded bg-ink-700/80 px-1.5 py-0.5 text-[10px] text-slate-400">{c.tag}</span>
              </button>
            );
          })}
        </nav>
        <div className="space-y-3 border-t border-sky-400/10 p-4">
          <div>
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>Progression</span>
              <span className="font-mono text-sky-300">
                {saved.done.length}/{CHAPTERS.length} · {pct}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink-600">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500" style={{ width: pct + "%" }} />
            </div>
            {saved.quiz !== null && <div className="mt-1.5 text-xs text-slate-400">Meilleur score au quiz : {saved.quiz}/12</div>}
          </div>
          <button
            onClick={() => setFormulas(true)}
            className="w-full rounded-xl border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
          >
            ƒ Formulaire
          </button>
          {saved.done.length > 0 && (
            <button onClick={() => setSaved({ done: [], quiz: null })} className="w-full text-center text-xs text-slate-500 underline underline-offset-2 hover:text-slate-300">
              Réinitialiser la progression
            </button>
          )}
        </div>
      </aside>

      {/* Contenu */}
      <div className="min-w-0 flex-1" ref={topRef}>
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-sky-400/10 bg-ink-950/85 px-4 py-3 backdrop-blur-md">
          <button onClick={() => setMenu(true)} className="rounded-lg border border-sky-400/30 p-2 text-sky-200 lg:hidden" aria-label="Ouvrir le menu">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs uppercase tracking-widest text-slate-500">1ère BAC Sciences Expérimentales · Physique</div>
            <div className="truncate font-semibold text-white">
              {chap.num}. {chap.title}
            </div>
          </div>
          <div className="hidden w-32 sm:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-600">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500" style={{ width: pct + "%" }} />
            </div>
            <div className="mt-0.5 text-right font-mono text-[10px] text-slate-500">{pct}%</div>
          </div>
          <button onClick={() => setFormulas(true)} className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20">
            ƒ<span className="hidden sm:inline"> Formulaire</span>
          </button>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10">
          <div key={cur} className="fade-up">
            {body}
          </div>

          {/* Navigation entre chapitres */}
          <footer className="mt-14 border-t border-sky-400/15 pt-6">
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => toggleDone(cur)}
                className={cn(
                  "rounded-xl border px-5 py-2.5 text-sm font-semibold transition",
                  isDone(cur) ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-200" : "border-sky-400/40 bg-ink-800 text-sky-100 hover:bg-ink-700"
                )}
              >
                {isDone(cur) ? "✓ Chapitre terminé (cliquer pour annuler)" : "Marquer ce chapitre comme terminé"}
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              {idx > 0 ? (
                <button onClick={() => go(CHAPTERS[idx - 1].id)} className="min-w-0 rounded-xl border border-sky-400/20 bg-ink-800/70 px-4 py-3 text-left transition hover:border-sky-400/60">
                  <div className="text-[11px] uppercase tracking-widest text-slate-500">← Précédent</div>
                  <div className="truncate text-sm font-semibold text-white">{CHAPTERS[idx - 1].title}</div>
                </button>
              ) : (
                <span />
              )}
              {idx < CHAPTERS.length - 1 ? (
                <button onClick={() => go(CHAPTERS[idx + 1].id)} className="min-w-0 rounded-xl border border-sky-400/40 bg-sky-500/10 px-4 py-3 text-right transition hover:bg-sky-500/20">
                  <div className="text-[11px] uppercase tracking-widest text-sky-300">Suivant →</div>
                  <div className="truncate text-sm font-semibold text-white">{CHAPTERS[idx + 1].title}</div>
                </button>
              ) : (
                <button onClick={() => go("intro")} className="rounded-xl border border-sky-400/40 bg-sky-500/10 px-4 py-3 text-right transition hover:bg-sky-500/20">
                  <div className="text-[11px] uppercase tracking-widest text-sky-300">Recommencer</div>
                  <div className="text-sm font-semibold text-white">Retour à l'introduction</div>
                </button>
              )}
            </div>
            <p className="mt-8 text-center text-xs text-slate-600">PHYSICS LAB · Travail et énergie cinétique · 1ère BAC Sciences Expérimentales · g = 9,8 N/kg</p>
          </footer>
        </main>
      </div>

      {/* Panneau de formules */}
      <Drawer open={formulas} onClose={() => setFormulas(false)}>
        <div className="flex items-center justify-between border-b border-sky-400/15 p-4">
          <div>
            <div className="font-bold text-white">Formulaire</div>
            <div className="text-xs text-slate-400">Toutes les formules du chapitre</div>
          </div>
          <button onClick={() => setFormulas(false)} className="rounded-lg border border-sky-400/30 px-3 py-1.5 text-sm text-sky-200 hover:bg-ink-700" aria-label="Fermer le formulaire">
            ✕
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <FormulaList />
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-300">Conversions</div>
            <ul className="space-y-2 text-sm">
              {CONVERSIONS.map((c, i) => (
                <li key={i} className="rounded-lg border border-sky-400/10 bg-ink-800/60 px-3 py-2">
                  <span className="text-sky-200">{c[0]}</span>
                  <div className="text-xs text-slate-400">{c[1]}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
