import { LineChart } from "../components/LineChart";
import { Figure } from "../components/svg";
import Exp3Power from "../sims/Exp3Power";
import { Callout, ChapterHeader, Check, Enrich, Eq, Frac, Ln, M, Step, SymbolTable, Vec, Worked } from "../components/ui";

export default function Power() {
  const pts = (P: number): [number, number][] => [
    [0, 0],
    [10, P * 10],
  ];
  return (
    <article>
      <ChapterHeader
        num="3"
        title="Puissance d'une force"
        subtitle="Deux forces peuvent fournir le même travail, mais pas à la même vitesse : la puissance mesure la rapidité du transfert d'énergie."
      />

      <Step n={1} kind="idea" title="L'idée simple">
        <p>
          Deux personnes montent le même escalier : l'une marche, l'autre court. Elles fournissent le même travail contre la pesanteur, mais celle qui court le fait en moins de temps :
          elle développe une puissance plus grande. Un moteur puissant n'est pas un moteur qui fournit « plus d'énergie » en tout, c'est un moteur qui la fournit <strong className="text-white">plus vite</strong>.
        </p>
      </Step>

      <Step n={2} kind="def" title="Définition rigoureuse">
        <Callout kind="def" title="Puissance moyenne">
          <p>
            La <strong className="text-white">puissance moyenne</strong> d'une force pendant la durée <M>Δt</M> est le quotient du travail de cette force par la durée :
          </p>
        </Callout>
        <Eq label="Puissance moyenne">
          P<sub>m</sub> = <Frac n={<>W<sub>AB</sub>(<Vec>F</Vec>)</>} d="Δt" />
        </Eq>
        <Callout kind="def" title="Puissance instantanée (solide en translation)">
          <p>
            À un instant donné, la puissance d'une force <Vec>F</Vec> appliquée à un point animé de la vitesse <Vec>v</Vec> est :
          </p>
        </Callout>
        <Eq label="Puissance instantanée">
          P = <Vec>F</Vec> · <Vec>v</Vec> = F × v × cos α
        </Eq>
        <p>
          <strong className="text-white">Justification :</strong> pendant une très courte durée <M>Δt</M>, le point d'application se déplace de <M>Δ<Vec>r</Vec> = <Vec>v</Vec>·Δt</M>. Le travail est{" "}
          <M>ΔW = <Vec>F</Vec> · <Vec>v</Vec> Δt</M>, donc <M>ΔW/Δt = <Vec>F</Vec> · <Vec>v</Vec></M>. Ici <M>α</M> est l'angle entre la force et la vitesse.
        </p>
        <Callout kind="rule" title="Cas simple">
          <p>
            Si la force et la vitesse sont constantes, la puissance est constante et la puissance moyenne est égale à la puissance instantanée : <M>W = P × Δt</M>.
          </p>
        </Callout>
      </Step>

      <Step n={3} kind="sym" title="Symboles et unités SI">
        <SymbolTable
          rows={[
            [<M>P</M>, "puissance (moyenne ou instantanée)", "watt (W)"],
            [<M>W</M>, "travail de la force", "joule (J)"],
            [<M>Δt</M>, "durée de l'intervalle de temps", "seconde (s)"],
            [<M>F</M>, "intensité de la force", "newton (N)"],
            [<M>v</M>, "vitesse du point d'application", "mètre par seconde (m/s)"],
            [<M>α</M>, "angle entre force et vitesse", "degré (°)"],
          ]}
        />
        <Callout kind="rule" title="Unités et conversions">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              1 watt = 1 joule par seconde : <M>1 W = 1 J/s</M>.
            </li>
            <li>Multiples : 1 kW = 10³ W ; 1 MW = 10⁶ W.</li>
            <li>
              Cohérence : <M>N × m/s = (N·m)/s = J/s = W</M> ✓.
            </li>
            <li>
              L'énergie se mesure aussi en kilowattheures : <M>1 kWh = 3,6 × 10⁶ J</M> (puissance de 1 kW pendant 1 h = 3 600 s).
            </li>
          </ul>
        </Callout>
      </Step>

      <Step n={4} kind="fig" title="Figure scientifique : W en fonction du temps">
        <Figure num="Figure 3.1" caption="Pour une puissance constante, le travail est proportionnel à la durée : W = P·t. La pente de la droite est la puissance. La droite orange (400 W) fournit quatre fois plus de travail que la bleue (100 W) pendant les mêmes 10 s.">
          <div className="mx-auto max-w-xl">
            <LineChart
              xmin={0}
              xmax={10}
              ymin={0}
              ymax={4400}
              xlabel="t (s)"
              ylabel="W (J)"
              series={[
                { pts: pts(400), color: "#fb923c", width: 3, label: "P = 400 W" },
                { pts: pts(100), color: "#38bdf8", width: 3, label: "P = 100 W" },
              ]}
              markers={[
                { x: 10, y: 4000, color: "#fb923c", label: "4 000 J" },
                { x: 10, y: 1000, color: "#38bdf8", label: "1 000 J" },
              ]}
            />
          </div>
        </Figure>
      </Step>

      <Step n={5} kind="exp" title="Expérience 3 — Puissance">
        <Exp3Power />
        <p className="text-sm text-slate-400">
          Pistes : (1) lance la lecture avec F = 80 N et v = 4 m/s : comment évolue W(t) ? (2) Double v : la puissance double. (3) Mets α = 90° : la puissance est nulle même si F et v ne le sont pas. (4) Mets α &gt; 90° : puissance résistante.
        </p>
      </Step>

      <Step n={6} kind="real" title="Dans la vie réelle">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Ascenseur</strong> : son moteur doit fournir une puissance <M>P = F·v</M> pour monter la cabine à vitesse constante.
          </li>
          <li>
            <strong className="text-white">Voiture</strong> : à vitesse égale, il faut une puissance motrice plus grande pour vaincre des frottements plus importants (<M>P = f·v</M> à vitesse constante).
          </li>
          <li>
            <strong className="text-white">Cycliste</strong> : un entraîné peut maintenir quelques centaines de watts pendant plusieurs minutes.
          </li>
        </ul>
      </Step>

      <Step n={7} kind="calc" title="Exemples numériques">
        <Worked title="Exemple 1 — Monte-charge">
          <p>
            Un monte-charge soulève une charge de 500 kg à vitesse constante sur 10 m en 25 s (g = 9,8 N/kg). Quelle puissance moyenne le moteur fournit-il à la charge ?
          </p>
          <Ln>La force du câble compense le poids : F = m·g = 500 × 9,8 = 4 900 N</Ln>
          <Ln>W(F) = F × h = 4 900 × 10 = 49 000 J</Ln>
          <Ln>P<sub>m</sub> = W / Δt = 49 000 / 25 = 1 960 W ≈ 1,96 kW</Ln>
        </Worked>
        <Worked title="Exemple 2 — Voiture à vitesse constante">
          <p>
            Une voiture roule à 20 m/s (72 km/h) en ligne droite. La force motrice horizontale est de 900 N dans le sens du mouvement.
          </p>
          <Ln>P = F × v × cos 0° = 900 × 20 × 1 = 18 000 W = 18 kW</Ln>
          <Ln>Travail fourni en 1 min : W = P × Δt = 18 000 × 60 = 1,08 × 10⁶ J</Ln>
        </Worked>
      </Step>

      <Enrich title="Rendement et puissance de rotation">
        <p>
          Le <strong>rendement</strong> d'une machine est le rapport <M>η = P<sub>utile</sub> / P<sub>absorbée</sub></M> (nombre sans unité, inférieur à 1). Pour un solide en rotation à vitesse angulaire <M>ω</M> (en rad/s) sous l'effet d'un moment <M>M</M> (en N·m), la puissance vaut <M>P = M·ω</M>. Le cheval-vapeur est une ancienne unité : 1 ch ≈ 736 W.
        </p>
      </Enrich>

      <Step n={8} kind="check" title="Vérifie ta compréhension">
        <div className="space-y-4">
          <Check
            question="Une force fournit un travail de 600 J en 5 s. Sa puissance moyenne est :"
            options={["3 000 W", "120 W", "605 W", "0,0083 W"]}
            answer={1}
            explain="Pm = W/Δt = 600 / 5 = 120 W."
          />
          <Check
            question="Une force de 50 N perpendiculaire à la vitesse d'un solide a une puissance :"
            options={["égale à 50 × v", "négative", "nulle", "égale à la moitié de F·v"]}
            answer={2}
            explain="P = F·v·cos 90° = 0 : cette force ne fournit aucune énergie au solide."
          />
          <Check
            question="À force constante dans le sens du mouvement, si la vitesse double, la puissance :"
            options={["double", "est multipliée par 4", "reste identique", "est divisée par 2"]}
            answer={0}
            explain="P = F·v est proportionnelle à v."
          />
        </div>
      </Step>
    </article>
  );
}
