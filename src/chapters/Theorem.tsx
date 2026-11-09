import { FigTheoremSystem } from "../components/Figures";
import { Figure } from "../components/svg";
import Exp5Theorem from "../sims/Exp5Theorem";
import { Callout, ChapterHeader, Check, Enrich, Eq, Ln, M, Step, Vec, Worked } from "../components/ui";

export default function Theorem() {
  return (
    <article>
      <ChapterHeader
        num="5"
        title="Théorème de l'énergie cinétique"
        subtitle="Le lien entre le travail des forces et la variation de vitesse d'un solide : l'outil central du cours."
      />

      <Step n={1} kind="idea" title="L'idée simple">
        <p>
          Imagine l'énergie cinétique comme le solde d'un compte bancaire. Le travail d'une force <em>moteur</em> est un dépôt : le solde augmente et le solide accélère. Le travail d'une force <em>résistante</em> est un retrait : le solde diminue et le solide ralentit. Une force qui ne travaille pas (perpendiculaire au déplacement) ne change pas le solde.
        </p>
      </Step>

      <Step n={2} kind="def" title="Énoncé rigoureux">
        <Callout kind="def" title="Théorème de l'énergie cinétique">
          <p>
            Dans un <strong className="text-white">référentiel galiléen</strong>, la variation de l'énergie cinétique d'un solide en translation entre deux positions A et B est égale à la <strong className="text-white">somme des travaux des forces extérieures</strong> appliquées au solide entre A et B.
          </p>
        </Callout>
        <Eq label="Théorème de l'énergie cinétique">
          ΔE<sub>c</sub> = E<sub>c</sub>(B) − E<sub>c</sub>(A) = Σ W<sub>AB</sub>(<Vec>F</Vec><sub>ext</sub>)
        </Eq>
        <Eq>½ m v<sub>B</sub>² − ½ m v<sub>A</sub>² = W<sub>AB</sub>(<Vec>F</Vec><sub>1</sub>) + W<sub>AB</sub>(<Vec>F</Vec><sub>2</sub>) + …</Eq>
        <p>
          Symboles : <M>m</M> masse (kg) ; <M>v<sub>A</sub></M>, <M>v<sub>B</sub></M> vitesses en A et B (m/s) ; <M>W<sub>AB</sub>(F<sub>i</sub>)</M> travail de chaque force extérieure (J) ; <M>ΔE<sub>c</sub></M> en joules (J).
        </p>
      </Step>

      <Step n={3} kind="def" title="Démonstration (cas d'une force résultante constante, mouvement rectiligne)">
        <div className="rounded-xl border border-sky-400/20 bg-ink-800/60 p-4">
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              Deuxième loi de Newton dans un référentiel galiléen : <M>Σ<Vec>F</Vec><sub>ext</sub> = m·<Vec>a</Vec></M>. Si la résultante est constante et colinéaire au mouvement, l'accélération <M>a</M> est constante.
            </li>
            <li>
              Le mouvement est rectiligne uniformément varié. Entre A et B, avec <M>AB = d</M> : <M>v<sub>B</sub>² − v<sub>A</sub>² = 2·a·d</M>.
            </li>
            <li>
              Multiplions par <M>m/2</M> : <M>½ m v<sub>B</sub>² − ½ m v<sub>A</sub>² = m·a·d</M>.
            </li>
            <li>
              Or <M>m·a</M> est l'intensité de la résultante <M>ΣF</M> (dans le sens du mouvement), donc <M>m·a·d = (Σ<Vec>F</Vec><sub>ext</sub>) · <Vec>AB</Vec></M>.
            </li>
            <li>
              Le produit scalaire est linéaire : <M>(Σ<Vec>F</Vec><sub>i</sub>) · <Vec>AB</Vec> = Σ (<Vec>F</Vec><sub>i</sub> · <Vec>AB</Vec>) = Σ W<sub>AB</sub>(<Vec>F</Vec><sub>i</sub>)</M>.
            </li>
          </ol>
          <Ln>⇒ E<sub>c</sub>(B) − E<sub>c</sub>(A) = Σ W<sub>AB</sub>(F<sub>ext</sub>) ∎</Ln>
        </div>
        <p className="text-sm text-slate-400">
          Le théorème reste vrai pour toute trajectoire et pour des forces non constantes ; la démonstration générale utilise l'intégration (voir l'encadré d'enrichissement).
        </p>
      </Step>

      <Step n={4} kind="plain" title="Méthode d'application en 5 étapes">
        <div className="grid gap-3 sm:grid-cols-5">
          {[
            ["1", "Système", "Choisir le solide étudié."],
            ["2", "Référentiel", "Terrestre, supposé galiléen."],
            ["3", "Bilan des forces", "P, R, F, f… faire un schéma."],
            ["4", "Travaux", "Calculer chaque W entre A et B."],
            ["5", "Théorème", "ΔEc = ΣW, puis résoudre."],
          ].map((s) => (
            <div key={s[0]} className="rounded-xl border border-sky-400/20 bg-ink-800/70 p-3">
              <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">{s[0]}</div>
              <div className="font-semibold text-white">{s[1]}</div>
              <div className="text-sm text-slate-400">{s[2]}</div>
            </div>
          ))}
        </div>
      </Step>

      <Step n={5} kind="fig" title="Figure scientifique : le système et son bilan">
        <Figure num="Figure 5.1" caption="Un solide glisse de A vers B. Quatre forces extérieures agissent : le poids P⃗, la réaction normale R⃗, la force motrice F⃗ et le frottement f⃗. Les travaux de P⃗ et R⃗ sont nuls (perpendiculaires au déplacement horizontal) ; F⃗ est moteur, f⃗ est résistant.">
          <FigTheoremSystem />
        </Figure>
      </Step>

      <Step n={6} kind="exp" title="Expérience 5 — Vérification du théorème">
        <Exp5Theorem />
        <p className="text-sm text-slate-400">
          Pistes : (1) mets F = 0 et f &gt; 0 : le solide ralentit puis s'arrête (cherche la distance d'arrêt). (2) Fixe F cos α = f : la vitesse reste constante, ΣW = 0. (3) Incline le plan (θ &gt; 0) : le poids devient résistant à la montée. (4) Vérifie que la ligne ΔEc est toujours égale à la ligne ΣW.
        </p>
      </Step>

      <Step n={7} kind="real" title="Dans la vie réelle">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Distance de freinage</strong> : le travail des frottements doit annuler l'énergie cinétique initiale, <M>f·d = ½ m v²</M>, donc <M>d ∝ v²</M>.
          </li>
          <li>
            <strong className="text-white">Chute d'un objet</strong> : le travail du poids augmente l'énergie cinétique (et la vitesse) pendant la chute.
          </li>
          <li>
            <strong className="text-white">Marteau et clou</strong> : l'énergie cinétique du marteau est dissipée par le travail résistant de la force du bois sur le clou.
          </li>
        </ul>
      </Step>

      <Step n={8} kind="calc" title="Exemples numériques">
        <Worked title="Exemple 1 — Distance de freinage">
          <p>
            Une voiture de masse 1 000 kg roule à 20 m/s et freine jusqu'à l'arrêt sur route horizontale. La force de frottement constante vaut 4 000 N. Calcule la distance d'arrêt <M>d</M>.
          </p>
          <Ln>Forces : P et R (travail nul), f (résistante) : W(f) = −f·d</Ln>
          <Ln>Théorème : 0 − ½ m v² = −f·d</Ln>
          <Ln>d = ½ m v² / f = 0,5 × 1 000 × 400 / 4 000 = 50 m</Ln>
          <p className="text-sm text-slate-400">À 40 m/s (vitesse doublée), d = 0,5 × 1 000 × 1 600 / 4 000 = 200 m : quatre fois plus.</p>
        </Worked>
        <Worked title="Exemple 2 — Vitesse finale d'un solide tracté">
          <p>
            Un solide de 2 kg part de A avec <M>v<sub>A</sub> = 3 m/s</M>. Une force horizontale de 10 N dans le sens du mouvement agit sur 4 m, avec un frottement de 2 N. Calcule <M>v<sub>B</sub></M>.
          </p>
          <Ln>ΣW = 10 × 4 − 2 × 4 = 32 J (P et R : 0)</Ln>
          <Ln>E<sub>c</sub>(B) = E<sub>c</sub>(A) + ΣW = ½ × 2 × 3² + 32 = 9 + 32 = 41 J</Ln>
          <Ln>v<sub>B</sub> = √(2 × 41 / 2) = √41 ≈ 6,40 m/s</Ln>
        </Worked>
      </Step>

      <Enrich title="Démonstration générale avec une force variable">
        <p>
          Pour un point matériel de masse <M>m</M> soumis à la résultante <M>Σ<Vec>F</Vec></M>, on écrit <M>Σ<Vec>F</Vec> = m·d<Vec>v</Vec>/dt</M>. En multipliant scalairement par <M>d<Vec>r</Vec> = <Vec>v</Vec>·dt</M> : <M>Σ<Vec>F</Vec> · d<Vec>r</Vec> = m <Vec>v</Vec> · d<Vec>v</Vec> = d(½ m v²)</M>. Le membre de gauche est le travail élémentaire <M>δW</M>. En intégrant de A à B on obtient <M>ΔE<sub>c</sub> = ΣW<sub>AB</sub></M>, quelle que soit la nature de la force.
        </p>
      </Enrich>

      <Step n={9} kind="check" title="Vérifie ta compréhension">
        <div className="space-y-4">
          <Check
            question="Un solide a Ec(A) = 36 J. La somme des travaux entre A et B est −12 J. L'énergie cinétique en B vaut :"
            options={["48 J", "24 J", "−12 J", "36 J"]}
            answer={1}
            explain="Ec(B) = Ec(A) + ΣW = 36 − 12 = 24 J. Le travail résistant fait diminuer l'énergie cinétique."
          />
          <Check
            question="Sur un sol horizontal, quelles forces ont un travail nul pendant le glissement d'un solide ?"
            options={["Le poids et la réaction normale", "Le frottement", "La force motrice", "Aucune"]}
            answer={0}
            explain="Le poids et la réaction normale sont perpendiculaires au déplacement horizontal : cos 90° = 0. Le frottement a un travail résistant."
          />
          <Check
            question="Si ΣW = 0 entre A et B, alors :"
            options={["le solide s'arrête", "la vitesse en B est égale à la vitesse en A", "la vitesse est nulle en A", "le solide accélère"]}
            answer={1}
            explain="ΔEc = 0, donc Ec(B) = Ec(A), c'est-à-dire vB = vA (en valeur)."
          />
        </div>
      </Step>
    </article>
  );
}
