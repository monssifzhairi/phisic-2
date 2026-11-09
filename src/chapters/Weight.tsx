import { FigWeightCases, FigWeightPaths } from "../components/Figures";
import { Figure } from "../components/svg";
import Exp2Weight from "../sims/Exp2Weight";
import { Callout, ChapterHeader, Check, Enrich, Eq, Ln, M, Step, SymbolTable, Vec, Worked } from "../components/ui";

export default function Weight() {
  return (
    <article>
      <ChapterHeader
        num="2"
        title="Travail du poids d'un corps"
        subtitle="Le poids est une force constante et verticale : son travail ne dépend que de la différence d'altitude."
      />

      <Step n={1} kind="idea" title="L'idée simple">
        <p>
          Quand tu descends un escalier, la pesanteur t'« aide » : elle fournit de l'énergie. Quand tu le montes, elle te freine : tu dois lutter contre elle. Quand tu marches sur
          un couloir plat, la pesanteur n'intervient ni pour t'aider ni pour te freiner. Le travail du poids traduit exactement cela, et il ne dépend que de la <strong className="text-white">hauteur gagnée ou perdue</strong>.
        </p>
      </Step>

      <Step n={2} kind="def" title="Définition rigoureuse">
        <p>
          Au voisinage de la Terre, le poids d'un solide de masse <M>m</M> est la force constante <M><Vec>P</Vec> = m·<Vec>g</Vec></M>, verticale, dirigée vers le bas, de norme <M>P = m·g</M>.
          Le travail de cette force constante entre A et B est donc :
        </p>
        <Eq label="Travail du poids (axe z orienté vers le haut)">
          W<sub>AB</sub>(<Vec>P</Vec>) = <Vec>P</Vec> · <Vec>AB</Vec> = m · g · (z<sub>A</sub> − z<sub>B</sub>)
        </Eq>
        <Callout kind="def" title="Démonstration (niveau lycée)">
          <p>Dans un repère (O ; x, z) avec z vertical vers le haut : <M><Vec>P</Vec> = (0 ; −m·g)</M> et <M><Vec>AB</Vec> = (x<sub>B</sub> − x<sub>A</sub> ; z<sub>B</sub> − z<sub>A</sub>)</M>.</p>
          <Ln>W = 0 × (x<sub>B</sub> − x<sub>A</sub>) + (−m·g) × (z<sub>B</sub> − z<sub>A</sub>) = m·g·(z<sub>A</sub> − z<sub>B</sub>)</Ln>
          <p>Le résultat ne dépend ni de x, ni de la trajectoire : seulement de z<sub>A</sub> et z<sub>B</sub>.</p>
        </Callout>
        <Callout kind="rule" title="Les trois cas">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Descente</strong> (z<sub>B</sub> &lt; z<sub>A</sub>) : <M>W &gt; 0</M>, le poids est <span className="text-emerald-300">moteur</span>.
            </li>
            <li>
              <strong>Montée</strong> (z<sub>B</sub> &gt; z<sub>A</sub>) : <M>W &lt; 0</M>, le poids est <span className="text-rose-300">résistant</span>.
            </li>
            <li>
              <strong>Déplacement horizontal</strong> (z<sub>A</sub> = z<sub>B</sub>) : <M>W = 0</M>, le poids est perpendiculaire au déplacement.
            </li>
          </ul>
        </Callout>
        <p>
          En notant <M>h</M> la hauteur dont on monte ou descend : <M>W = +m·g·h</M> à la descente et <M>W = −m·g·h</M> à la montée.
        </p>
      </Step>

      <Step n={3} kind="sym" title="Symboles et unités SI">
        <SymbolTable
          rows={[
            [<M>W<sub>AB</sub>(P)</M>, "travail du poids entre A et B", "joule (J)"],
            [<M>m</M>, "masse du solide", "kilogramme (kg)"],
            [<M>g</M>, "intensité de la pesanteur (≈ 9,8 sur Terre)", "N/kg ou m/s²"],
            [<M>z<sub>A</sub></M>, <>altitude du point de départ (axe z vers le haut)</>, "mètre (m)"],
            [<M>z<sub>B</sub></M>, "altitude du point d'arrivée", "mètre (m)"],
          ]}
        />
      </Step>

      <Step n={4} kind="fig" title="Figures scientifiques">
        <Figure num="Figure 2.1" caption="Le poids P⃗ (violet) est toujours vertical vers le bas. Selon que le déplacement AB⃗ (bleu pointillé) monte, descend ou reste horizontal, le travail est résistant, moteur ou nul.">
          <FigWeightCases />
        </Figure>
        <Figure num="Figure 2.2" caption="Que le solide suive le plan incliné, un chemin sinueux ou la verticale, le travail du poids est le même entre A et B : il vaut −m·g·h car seule la différence d'altitude compte.">
          <FigWeightPaths />
        </Figure>
      </Step>

      <Step n={5} kind="exp" title="Expérience 2 — Travail du poids">
        <Exp2Weight />
        <p className="text-sm text-slate-400">
          Pistes : (1) mets z<sub>A</sub> &gt; z<sub>B</sub>, puis l'inverse : le signe change. (2) Mets z<sub>A</sub> = z<sub>B</sub> et déplace l'objet sur 10 m : W = 0. (3) Compare les trois chemins :
          la valeur finale de W ne change pas. (4) Passe de g = 9,8 à g = 10 : l'écart est faible.
        </p>
      </Step>

      <Step n={6} kind="real" title="Dans la vie réelle">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Montagnes russes</strong> : à la descente, le poids est moteur et la vitesse augmente ; à la remontée, il est résistant.
          </li>
          <li>
            <strong className="text-white">Cycliste</strong> : en col, son poids travaille négativement ; en descente, positivement (sans pédaler il accélère).
          </li>
          <li>
            <strong className="text-white">Grue de chantier</strong> : pour hisser une charge à vitesse constante, la grue fournit un travail moteur égal à l'opposé du travail du poids.
          </li>
          <li>
            <strong className="text-white">Parachutiste</strong> : pendant la chute, le travail du poids est positif et proportionnel à l'altitude perdue.
          </li>
        </ul>
      </Step>

      <Step n={7} kind="calc" title="Exemples numériques">
        <Worked title="Exemple — Montée, descente, trajet horizontal (m = 2 kg, g = 9,8 N/kg)">
          <p>
            <M>P = m·g = 2 × 9,8 = 19,6 N</M>.
          </p>
          <Ln>Montée de 0 à 3 m : W = 2 × 9,8 × (0 − 3) = −58,8 J</Ln>
          <Ln>Descente de 3 m à 0 : W = 2 × 9,8 × (3 − 0) = +58,8 J</Ln>
          <Ln>Parcours horizontal de 10 m : W = 2 × 9,8 × (z − z) = 0 J</Ln>
        </Worked>
        <Worked title="Exemple — Plan incliné (vérification par la définition)">
          <p>
            Le même solide monte le long d'un plan incliné de 30° sur une longueur <M>AB = 6 m</M> (dénivelé h = 6 × sin 30° = 3 m).
          </p>
          <Ln>Par les altitudes : W = −m·g·h = −2 × 9,8 × 3 = −58,8 J</Ln>
          <Ln>Par le produit scalaire : l'angle entre P⃗ (vers le bas) et AB⃗ (vers le haut du plan) est α = 90° + 30° = 120°</Ln>
          <Ln>W = P × AB × cos 120° = 19,6 × 6 × (−0,5) = −58,8 J ✓</Ln>
        </Worked>
      </Step>

      <Enrich title="Lien avec l'énergie potentielle de pesanteur">
        <p>
          Comme <M>W(P) = m·g·z<sub>A</sub> − m·g·z<sub>B</sub></M>, on peut introduire la grandeur <M>E<sub>pp</sub> = m·g·z</M> (à une constante près). On a alors{" "}
          <M>W<sub>AB</sub>(P) = −ΔE<sub>pp</sub></M>. Cette énergie potentielle est étudiée dans un cadre différent : elle n'est pas nécessaire pour appliquer le théorème de l'énergie cinétique, dans lequel on utilise directement le travail du poids.
        </p>
      </Enrich>

      <Step n={8} kind="check" title="Vérifie ta compréhension">
        <div className="space-y-4">
          <Check
            question="Un objet de 10 kg descend de 5 m (g = 9,8 N/kg). Le travail de son poids vaut :"
            options={["−490 J", "+490 J", "+50 J", "0 J"]}
            answer={1}
            explain="W = m·g·(zA − zB) = 10 × 9,8 × 5 = +490 J : travail moteur à la descente."
          />
          <Check
            question="Un skieur part d'une altitude de 1 800 m et revient à la même altitude après un long parcours sinueux. Le travail total de son poids est :"
            options={["positif", "négatif", "nul", "dépend de la longueur du parcours"]}
            answer={2}
            explain="zA = zB donc W = m·g·(zA − zB) = 0. Le travail du poids ne dépend pas du chemin suivi."
          />
        </div>
      </Step>
    </article>
  );
}
