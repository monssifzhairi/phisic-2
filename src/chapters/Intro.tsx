import { FigIntroMap } from "../components/Figures";
import { Figure } from "../components/svg";
import { Callout, ChapterHeader, Check, Enrich, M, Step, Tag } from "../components/ui";

export default function Intro({ go }: { go: (id: string) => void }) {
  const plan = [
    { id: "travail", t: "Travail d'une force", d: "W = F·d·cos α : moteur, résistant ou nul." },
    { id: "poids", t: "Travail du poids", d: "Montée, descente, déplacement horizontal." },
    { id: "puissance", t: "Puissance d'une force", d: "P = W/Δt et P = F·v·cos α." },
    { id: "cinetique", t: "Énergie cinétique", d: "Ec = ½·m·v² : masse, vitesse, unités." },
    { id: "theoreme", t: "Théorème de l'énergie cinétique", d: "ΔEc = ΣW des forces extérieures." },
    { id: "exercices", t: "Exercices corrigés", d: "Sept exercices progressifs avec solution détaillée." },
    { id: "quiz", t: "Quiz interactif", d: "Douze questions avec correction immédiate." },
    { id: "synthese", t: "Synthèse et formulaire", d: "Tout l'essentiel sur une page." },
  ];
  return (
    <article>
      <ChapterHeader
        num="0"
        title="Introduction générale"
        subtitle="Pourquoi parler de travail et d'énergie cinétique ? Voici la carte du cours et la manière de t'en servir."
      />

      <Step n={1} kind="idea" title="Une question de tous les jours">
        <p>
          Pourquoi est-il plus difficile d'arrêter un camion qu'une bicyclette lancés à la même vitesse ? Pourquoi une voiture roulant à 130 km/h a-t-elle besoin de bien plus de
          distance pour freiner qu'à 90 km/h ? Pourquoi porter un sac à dos en marchant sur un sol plat « ne fournit » aucun travail au sens de la physique, alors que cela fatigue ?
        </p>
        <p>
          Pour répondre, la physique a inventé deux grandeurs qui mesurent des <strong className="text-white">échanges d'énergie</strong> : le <strong className="text-white">travail</strong> d'une
          force, qui décrit l'énergie transférée à un solide pendant son déplacement, et l'<strong className="text-white">énergie cinétique</strong>, qui décrit l'énergie liée à sa vitesse.
          Le <strong className="text-white">théorème de l'énergie cinétique</strong> relie ces deux idées.
        </p>
      </Step>

      <Step n={2} kind="def" title="Les grandeurs du chapitre">
        <p>
          Le <strong className="text-white">travail</strong> <M>W</M> d'une force constante est le produit scalaire de cette force par le déplacement de son point d'application. La{" "}
          <strong className="text-white">puissance</strong> <M>P</M> mesure la rapidité de ce transfert d'énergie. L'<strong className="text-white">énergie cinétique</strong> <M>E<sub>c</sub></M> d'un solide
          en translation de masse <M>m</M> et de vitesse <M>v</M> vaut <M>½·m·v²</M>.
        </p>
      </Step>

      <Step n={3} kind="fig" title="Carte des notions">
        <Figure num="Figure 0.1" caption="Les trois grandeurs du cours et leurs liens : le travail se calcule à partir de la force et du déplacement ; la puissance divise le travail par la durée ; le théorème de l'énergie cinétique relie la somme des travaux à la variation de Ec.">
          <FigIntroMap />
        </Figure>
      </Step>

      <Step n={4} kind="plain" title="Plan du cours">
        <div className="grid gap-3 sm:grid-cols-2">
          {plan.map((p, i) => (
            <button
              key={p.id}
              onClick={() => go(p.id)}
              className="group flex items-start gap-3 rounded-xl border border-sky-400/15 bg-ink-800/70 p-3 text-left transition hover:border-sky-400/60 hover:bg-ink-700"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 font-mono text-sm font-bold text-sky-200">{i + 1}</span>
              <span>
                <span className="block font-semibold text-white group-hover:text-sky-200">{p.t}</span>
                <span className="block text-sm text-slate-400">{p.d}</span>
              </span>
            </button>
          ))}
        </div>
      </Step>

      <Step n={5} kind="plain" title="Cœur du cours et enrichissement">
        <p>
          Pour éviter toute confusion, chaque contenu est clairement étiqueté. Rien n'est ajouté « en cachette » au programme :
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-3">
            <Tag kind="core" />
            <p className="mt-2 text-sm">
              Définitions, formules, démonstrations simples, expériences et exercices : c'est le socle à maîtriser pour le contrôle et l'examen.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 p-3">
            <Tag kind="enrich" />
            <p className="mt-2 text-sm">
              Encadrés repliables « Enrichissement » : approfondissements facultatifs (forces variables, rotation, cheval-vapeur…). À consulter si tu es curieux ou si ton professeur les aborde.
            </p>
          </div>
        </div>
        <Callout kind="info" title="Remarque sur le programme">
          <p>
            L'ordre et le détail exacts peuvent varier d'un établissement à l'autre. Ce cours se concentre sur le travail et la puissance de forces constantes, le travail du poids,
            l'énergie cinétique de translation et le théorème de l'énergie cinétique. Suis toujours en priorité les consignes de ton professeur.
          </p>
        </Callout>
      </Step>

      <Step n={6} kind="plain" title="Rappels indispensables">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Un <strong className="text-white">vecteur</strong> possède une direction, un sens et une norme : <M><span className="vec">F</span></M> a pour norme <M>F</M> (en newtons).
          </li>
          <li>
            La <strong className="text-white">deuxième loi de Newton</strong> : <M>ΣF⃗ = m·a⃗</M> dans un référentiel galiléen.
          </li>
          <li>
            Le <strong className="text-white">cosinus</strong> : cos 0° = 1, cos 60° = 0,5, cos 90° = 0, cos 120° = −0,5, cos 180° = −1.
          </li>
          <li>
            Le <strong className="text-white">newton</strong> : 1 N = 1 kg·m·s⁻². Le <strong className="text-white">joule</strong> : 1 J = 1 N·m = 1 kg·m²·s⁻².
          </li>
          <li>
            Conversion de vitesse : 1 m/s = 3,6 km/h. Intensité de la pesanteur : <M>g</M> ≈ 9,8 N/kg (on prend parfois 10 N/kg).
          </li>
        </ul>
      </Step>

      <Step n={7} kind="plain" title="Comment utiliser ce laboratoire">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Chaque chapitre suit le même schéma : idée simple, définition, symboles et unités, figure, exemple réel, exemple chiffré, vérification.</li>
          <li>
            Cinq <strong className="text-white">expériences interactives</strong> sont intégrées aux chapitres : utilise les curseurs, puis ▶ Lecture, ❚❚ Pause et ↺ Réinitialiser.
          </li>
          <li>Le bouton « Formulaire » (en haut) ouvre à tout moment la fiche des formules.</li>
          <li>Ta progression est suivie dans le menu : marque un chapitre comme terminé quand tu l'as compris.</li>
        </ul>
      </Step>

      <Step n={8} kind="check" title="Vérifie ta compréhension">
        <Check
          question="Quelle est l'unité SI du travail d'une force ?"
          options={["Le newton (N)", "Le joule (J)", "Le watt (W)", "Le kilogramme (kg)"]}
          answer={1}
          explain="Le travail est une énergie transférée : il s'exprime en joules (1 J = 1 N·m). Le newton mesure une force, le watt une puissance."
        />
      </Step>

      <Enrich title="Pourquoi parler d'énergie plutôt que seulement de forces ?">
        <p>
          La deuxième loi de Newton suffit en principe pour prévoir un mouvement, mais elle demande de connaître l'évolution de la vitesse instant par instant. L'approche énergétique
          permet souvent de relier directement l'état initial et l'état final (vitesse en B connaissant la vitesse en A) sans résoudre toute la dynamique : c'est ce que fait le théorème de l'énergie cinétique.
        </p>
      </Enrich>

      <div className="mt-10 flex justify-end">
        <button onClick={() => go("travail")} className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
          Commencer : Travail d'une force →
        </button>
      </div>
    </article>
  );
}
