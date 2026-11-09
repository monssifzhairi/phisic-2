import { FigEcOrders } from "../components/Figures";
import { Figure } from "../components/svg";
import Exp4Kinetic from "../sims/Exp4Kinetic";
import { Callout, ChapterHeader, Check, Enrich, Eq, Ln, M, Step, SymbolTable, Worked } from "../components/ui";

export default function Kinetic() {
  return (
    <article>
      <ChapterHeader
        num="4"
        title="Énergie cinétique"
        subtitle="L'énergie que possède un solide du fait de sa vitesse : elle augmente avec la masse et, surtout, avec le carré de la vitesse."
      />

      <Step n={1} kind="idea" title="L'idée simple">
        <p>
          Un solide en mouvement peut agir sur ce qu'il rencontre : une balle de tennis bouscule une raquette, un camion déforme une barrière. Plus il est lourd et plus il va vite, plus
          l'effet est important. Cette capacité « liée à la vitesse » s'appelle l'<strong className="text-white">énergie cinétique</strong>. Un solide immobile n'en possède pas.
        </p>
      </Step>

      <Step n={2} kind="def" title="Définition rigoureuse">
        <Callout kind="def" title="Énergie cinétique d'un solide en translation">
          <p>
            Dans un référentiel donné, un solide de masse <M>m</M> animé d'un mouvement de <strong className="text-white">translation</strong> (tous ses points ont la même vitesse <M>v</M>) possède l'énergie cinétique :
          </p>
        </Callout>
        <Eq label="Énergie cinétique de translation">
          E<sub>c</sub> = ½ × m × v²
        </Eq>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <M>E<sub>c</sub> ≥ 0</M> toujours (la masse est positive et <M>v²</M> aussi) ; <M>E<sub>c</sub> = 0</M> si le solide est immobile.
          </li>
          <li>
            <M>E<sub>c</sub></M> dépend du <strong className="text-white">référentiel</strong> : elle est calculée avec la vitesse mesurée dans le référentiel d'étude (souvent le référentiel terrestre).
          </li>
          <li>
            <M>E<sub>c</sub></M> est proportionnelle à <M>m</M> et au <strong className="text-white">carré</strong> de <M>v</M> : doubler la masse double <M>E<sub>c</sub></M>, doubler la vitesse la multiplie par 4.
          </li>
        </ul>
      </Step>

      <Step n={3} kind="sym" title="Symboles et unités SI">
        <SymbolTable
          rows={[
            [<M>E<sub>c</sub></M>, "énergie cinétique", "joule (J)"],
            [<M>m</M>, "masse du solide", "kilogramme (kg)"],
            [<M>v</M>, "valeur de la vitesse (dans le référentiel)", "mètre par seconde (m/s)"],
          ]}
        />
        <Callout kind="rule" title="Cohérence des unités">
          <p>
            <M>kg × (m/s)² = kg·m²·s⁻² = (kg·m·s⁻²) × m = N × m = J</M> ✓.
          </p>
          <p>
            <strong>Attention :</strong> convertis toujours en unités SI avant de calculer : une vitesse en km/h se divise par 3,6 pour obtenir des m/s ; une masse en tonnes se multiplie par 1 000 pour obtenir des kg.
          </p>
        </Callout>
      </Step>

      <Step n={4} kind="fig" title="Figure scientifique : ordres de grandeur">
        <Figure num="Figure 4.1" caption="Énergies cinétiques de quelques objets courants (échelle logarithmique : chaque graduation vaut dix fois la précédente). Entre une balle de tennis et un camion, l'énergie cinétique varie d'un facteur 240 000 environ.">
          <FigEcOrders />
        </Figure>
      </Step>

      <Step n={5} kind="exp" title="Expérience 4 — Énergie cinétique d'un chariot">
        <Exp4Kinetic />
        <p className="text-sm text-slate-400">
          Pistes : (1) fixe m = 10 kg et passe v de 5 à 10 m/s : lis Ec. Par quel facteur est-elle multipliée ? (2) Fixe v et double m. (3) Mets v = 0 : que devient Ec ? (4) Compare les deux graphiques : parabole pour v, droite pour m.
        </p>
      </Step>

      <Step n={6} kind="real" title="Dans la vie réelle">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Sécurité routière</strong> : passer de 90 à 130 km/h multiplie l'énergie cinétique du véhicule par environ 2,1, donc aussi l'énergie à dissiper lors d'un freinage ou d'un choc.
          </li>
          <li>
            <strong className="text-white">Casque et ceinture</strong> : ils augmentent la distance et la durée sur lesquelles l'énergie cinétique du corps est dissipée.
          </li>
          <li>
            <strong className="text-white">Sport</strong> : l'énergie d'une balle de tennis frappée est transférée à la raquette ; un ballon lourd lancé vite est plus difficile à arrêter.
          </li>
        </ul>
      </Step>

      <Step n={7} kind="calc" title="Exemples numériques">
        <Worked title="Exemple 1 — Cycliste">
          <p>Un cycliste (avec son vélo) de masse 80 kg roule à 36 km/h.</p>
          <Ln>v = 36 / 3,6 = 10 m/s</Ln>
          <Ln>E<sub>c</sub> = ½ × 80 × 10² = 4 000 J</Ln>
        </Worked>
        <Worked title="Exemple 2 — Voiture à deux vitesses">
          <p>Une voiture de masse 1 200 kg roule à 90 km/h puis à 130 km/h.</p>
          <Ln>90 km/h = 25 m/s → E<sub>c1</sub> = ½ × 1 200 × 25² = 375 000 J = 3,75 × 10⁵ J</Ln>
          <Ln>130 km/h ≈ 36,11 m/s → E<sub>c2</sub> = ½ × 1 200 × 36,11² ≈ 782 000 J ≈ 7,82 × 10⁵ J</Ln>
          <Ln>E<sub>c2</sub> / E<sub>c1</sub> ≈ 2,09 ≈ (130/90)² ✓</Ln>
        </Worked>
        <Worked title="Exemple 3 — Retrouver la vitesse">
          <p>Un solide de 2 kg a une énergie cinétique de 100 J.</p>
          <Ln>v = √(2·E<sub>c</sub> / m) = √(2 × 100 / 2) = √100 = 10 m/s</Ln>
        </Worked>
      </Step>

      <Enrich title="Énergie cinétique de rotation">
        <p>
          Pour un solide en rotation autour d'un axe fixe Δ à la vitesse angulaire <M>ω</M> (en rad/s), l'énergie cinétique s'écrit <M>E<sub>c</sub> = ½ × J<sub>Δ</sub> × ω²</M>, où <M>J<sub>Δ</sub></M> est le moment d'inertie (en kg·m²). Par exemple, un volant d'inertie avec <M>J<sub>Δ</sub> = 0,5 kg·m²</M> tournant à <M>ω = 20 rad/s</M> a <M>E<sub>c</sub> = ½ × 0,5 × 20² = 100 J</M>. La structure de la formule est la même que pour la translation : <M>m ↔ J<sub>Δ</sub></M> et <M>v ↔ ω</M>.
        </p>
      </Enrich>

      <Step n={8} kind="check" title="Vérifie ta compréhension">
        <div className="space-y-4">
          <Check
            question="La vitesse d'un solide est multipliée par 3 (masse inchangée). Son énergie cinétique est multipliée par :"
            options={["3", "6", "9", "27"]}
            answer={2}
            explain="Ec ∝ v², donc Ec est multipliée par 3² = 9."
          />
          <Check
            question="Quelle est l'énergie cinétique d'un solide de 2 kg à 3 m/s ?"
            options={["3 J", "9 J", "18 J", "6 J"]}
            answer={1}
            explain="Ec = ½ × 2 × 3² = 9 J."
          />
          <Check
            question="Une masse de 1 000 kg roule à 36 km/h. Son énergie cinétique est :"
            options={["18 000 J", "500 000 J", "50 000 J", "648 000 J"]}
            answer={2}
            explain="v = 36/3,6 = 10 m/s ; Ec = ½ × 1 000 × 10² = 50 000 J. L'erreur classique (648 000 J) consiste à oublier de convertir km/h en m/s."
          />
        </div>
      </Step>
    </article>
  );
}
