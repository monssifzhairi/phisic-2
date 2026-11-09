import type { ReactNode } from "react";
import { Arrow, Figure, Ground, Label, MText, VText } from "../components/svg";
import { C } from "../lib/phys";
import { ChapterHeader, Ln, M, Reveal, Vec } from "../components/ui";

function Ex({ n, level, title, children, solution }: { n: number; level: 1 | 2 | 3; title: string; children: ReactNode; solution: ReactNode }) {
  return (
    <section className="rounded-2xl border border-sky-400/20 bg-ink-800/60 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="rounded-lg bg-sky-500 px-2.5 py-1 text-sm font-bold text-white">Exercice {n}</span>
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="ml-auto text-xs text-amber-300" title="Niveau de difficulté">
          {"★".repeat(level)}
          <span className="text-slate-600">{"★".repeat(3 - level)}</span>
        </span>
      </div>
      <div className="space-y-2 text-[15px] leading-relaxed">{children}</div>
      <Reveal>{solution}</Reveal>
    </section>
  );
}

function InclineFig() {
  const th = 30;
  const O = { x: 90, y: 200 };
  const Lp = 330;
  const cos = Math.cos((th * Math.PI) / 180);
  const sin = Math.sin((th * Math.PI) / 180);
  const B = { x: O.x + Lp * cos, y: O.y - Lp * sin };
  return (
    <Figure num="Figure E6" caption="Caisse lancée vers le haut d'un plan incliné de 30° sans frottement. Seul le poids travaille (la réaction R⃗ est perpendiculaire au déplacement).">
      <svg viewBox="0 0 560 240" className="block h-auto w-full" role="img" aria-label="Plan incliné de 30 degrés">
        <Ground x1={30} x2={540} y={O.y} />
        <polygon points={`${O.x},${O.y} ${B.x},${O.y} ${B.x},${B.y}`} fill="#0f1d3b" stroke="#5b7bb5" strokeWidth={2.5} />
        <path d={`M${O.x + 60},${O.y} A60,60 0 0 0 ${O.x + 60 * cos},${O.y - 60 * sin}`} stroke={C.velocity} fill="none" strokeWidth={2} />
        <MText x={O.x + 80} y={O.y - 8} t="θ = 30°" color={C.velocity} size={14} />
        {/* caisse */}
        <g transform={`translate(${O.x + 60 * cos} ${O.y - 60 * sin}) rotate(-${th})`}>
          <rect x={-22} y={-30} width={44} height={30} rx={3} fill="#183463" stroke="#8fb4ff" strokeWidth={2} />
          <Arrow x1={0} y1={-15} x2={50} y2={-15} color={C.velocity} w={3} />
        </g>
        <VText x={O.x + 60 * cos + 62} y={O.y - 60 * sin - 52} t="v" sub="A" color={C.velocity} size={14} />
        <Arrow x1={O.x + 60 * cos - 7.5} y1={O.y - 60 * sin - 13} x2={O.x + 60 * cos - 7.5} y2={O.y - 60 * sin + 42} color={C.weight} w={3} />
        <VText x={O.x + 60 * cos + 6} y={O.y - 60 * sin + 42} t="P" color={C.weight} size={14} />
        <line x1={B.x} y1={B.y} x2={B.x} y2={O.y} stroke={C.velocity} strokeDasharray="4 4" />
        <MText x={B.x + 8} y={(B.y + O.y) / 2} t="h" color={C.velocity} size={16} anchor="start" />
        <Label x={B.x - 10} y={B.y - 10} color={C.disp} weight={700}>arrêt</Label>
      </svg>
    </Figure>
  );
}

export default function Exercises() {
  return (
    <article>
      <ChapterHeader
        num="6"
        title="Exercices corrigés"
        subtitle="Sept exercices progressifs. Essaie de les résoudre sur papier avant d'afficher la correction. Sauf indication contraire, g = 9,8 N/kg."
      />
      <div className="space-y-6">
        <Ex
          n={1}
          level={1}
          title="Travail d'une force inclinée"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> W = F·d·cos α = 50 × 12 × cos 60°
              </p>
              <Ln>W = 600 × 0,5 = 300 J (travail moteur)</Ln>
              <p>
                <strong className="text-white">2.</strong> cos 120° = −0,5 donc
              </p>
              <Ln>W = 600 × (−0,5) = −300 J (travail résistant)</Ln>
            </>
          }
        >
          <p>
            Une force constante <M>F = 50 N</M> tire un chariot sur une distance <M>d = 12 m</M> en ligne droite. Calcule son travail : <strong>1.</strong> si l'angle avec le déplacement est <M>α = 60°</M> ; <strong>2.</strong> si <M>α = 120°</M>. Commente les signes.
          </p>
        </Ex>

        <Ex
          n={2}
          level={1}
          title="Grue et travail du poids"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> Montée : z<sub>B</sub> − z<sub>A</sub> = +12 m.
              </p>
              <Ln>W(P) = −m·g·h = −250 × 9,8 × 12 = −29 400 J (résistant)</Ln>
              <p>
                <strong className="text-white">2.</strong> Vitesse constante ⇒ ΣF = 0 ⇒ F = P = 250 × 9,8 = 2 450 N, vers le haut dans le sens du mouvement :
              </p>
              <Ln>W(F) = F·h·cos 0° = 2 450 × 12 = +29 400 J (moteur)</Ln>
              <p>
                <strong className="text-white">3.</strong> P<sub>m</sub> = W(F)/Δt = 29 400 / 20 = 1 470 W ≈ 1,5 kW.
              </p>
            </>
          }
        >
          <p>
            Une grue soulève à vitesse constante une charge de masse <M>m = 250 kg</M> sur une hauteur <M>h = 12 m</M> en <M>20 s</M>.
          </p>
          <ol className="list-decimal pl-5">
            <li>Calcule le travail du poids de la charge.</li>
            <li>Calcule le travail de la force exercée par le câble. Justifie son intensité.</li>
            <li>Déduis la puissance moyenne de la force du câble.</li>
          </ol>
        </Ex>

        <Ex
          n={3}
          level={2}
          title="Puissance d'une force inclinée"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> L'angle entre la force et la vitesse est α = 30°.
              </p>
              <Ln>P = F·v·cos α = 150 × 2 × cos 30° = 300 × 0,866 ≈ 259,8 W ≈ 260 W</Ln>
              <p>
                <strong className="text-white">2.</strong> Force et vitesse constantes ⇒ P constante :
              </p>
              <Ln>W = P·Δt = 259,8 × 60 ≈ 15 588 J ≈ 1,56 × 10⁴ J</Ln>
              <p>
                <strong className="text-white">3.</strong> Vérification : distance s = v·Δt = 120 m ; W = F·s·cos α = 150 × 120 × 0,866 ≈ 15 588 J ✓.
              </p>
            </>
          }
        >
          <p>
            Un câble exerce sur une caisse une force constante <M>F = 150 N</M> inclinée de <M>30°</M> par rapport à la direction horizontale du mouvement. La caisse glisse à vitesse constante <M>v = 2 m/s</M>.
          </p>
          <ol className="list-decimal pl-5">
            <li>Calcule la puissance de cette force.</li>
            <li>Calcule le travail fourni en une minute.</li>
            <li>Vérifie le résultat en calculant la distance parcourue.</li>
          </ol>
        </Ex>

        <Ex
          n={4}
          level={1}
          title="Énergie cinétique et vitesse"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> 90 km/h = 90/3,6 = 25 m/s.
              </p>
              <Ln>E<sub>c</sub> = ½ × 1 200 × 25² = 600 × 625 = 375 000 J</Ln>
              <p>
                <strong className="text-white">2.</strong> 130 km/h = 36,11 m/s.
              </p>
              <Ln>E<sub>c</sub> = 600 × 36,11² ≈ 600 × 1 304 ≈ 782 000 J</Ln>
              <p>
                <strong className="text-white">3.</strong> Rapport ≈ 782 000 / 375 000 ≈ 2,09. La vitesse est multipliée par 130/90 ≈ 1,44 et Ec par (1,44)² ≈ 2,09 : Ec ∝ v².
              </p>
            </>
          }
        >
          <p>
            Une voiture de masse <M>m = 1 200 kg</M> roule à <M>90 km/h</M>, puis à <M>130 km/h</M>.
          </p>
          <ol className="list-decimal pl-5">
            <li>Calcule son énergie cinétique à 90 km/h.</li>
            <li>Calcule-la à 130 km/h.</li>
            <li>Compare les deux valeurs (rapport) et interprète.</li>
          </ol>
        </Ex>

        <Ex
          n={5}
          level={2}
          title="Théorème de l'énergie cinétique : frottement"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> Forces : poids P⃗, réaction normale R⃗ (perpendiculaires au déplacement : travail nul) et frottement f⃗ (résistant).
              </p>
              <Ln>ΣW = 0 + 0 − f·AB = −4 × 3 = −12 J</Ln>
              <p>
                <strong className="text-white">2.</strong> E<sub>c</sub>(A) = ½ × 2 × 6² = 36 J. Théorème :
              </p>
              <Ln>E<sub>c</sub>(B) = E<sub>c</sub>(A) + ΣW = 36 − 12 = 24 J</Ln>
              <Ln>v<sub>B</sub> = √(2 × 24 / 2) = √24 ≈ 4,90 m/s</Ln>
              <p>
                <strong className="text-white">3.</strong> À l'arrêt : 0 − 36 = −f·d′ ⇒ d′ = 36 / 4 = 9 m depuis A.
              </p>
            </>
          }
        >
          <p>
            Un solide de masse <M>m = 2 kg</M> glisse sur un plan horizontal. Il passe en A à la vitesse <M>v<sub>A</sub> = 6 m/s</M>. Une force de frottement constante <M>f = 4 N</M>, opposée au mouvement, s'exerce pendant tout le trajet. On donne <M>AB = 3 m</M>.
          </p>
          <ol className="list-decimal pl-5">
            <li>Fais le bilan des forces et calcule la somme de leurs travaux entre A et B.</li>
            <li>Déduis la vitesse en B par le théorème de l'énergie cinétique.</li>
            <li>À quelle distance de A le solide s'arrête-t-il ?</li>
          </ol>
        </Ex>

        <Ex
          n={6}
          level={2}
          title="Plan incliné sans frottement"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> La réaction R⃗ est perpendiculaire au plan (travail nul). Seul le poids travaille. Le solide monte d'une hauteur h = d·sin θ : W(P) = −m·g·d·sin θ.
              </p>
              <p>
                <strong className="text-white">2.</strong> Théorème entre A (v<sub>A</sub> = 8 m/s) et l'arrêt (v = 0) :
              </p>
              <Ln>0 − ½ m v<sub>A</sub>² = −m·g·d·sin θ</Ln>
              <Ln>d = v<sub>A</sub>² / (2·g·sin θ) = 64 / (2 × 9,8 × 0,5) = 64 / 9,8 ≈ 6,53 m</Ln>
              <p>
                <strong className="text-white">3.</strong> h = d·sin θ = 6,53 × 0,5 ≈ 3,27 m. On retrouve h = v<sub>A</sub>²/(2g) = 64/19,6 ≈ 3,27 m. La masse (20 kg) se simplifie : le résultat est indépendant de m.
              </p>
            </>
          }
        >
          <p>
            Une caisse de masse <M>m = 20 kg</M> est lancée vers le haut d'un plan incliné de <M>θ = 30°</M> avec la vitesse <M>v<sub>A</sub> = 8 m/s</M>. Les frottements sont négligés.
          </p>
          <InclineFig />
          <ol className="list-decimal pl-5">
            <li>Quelles forces travaillent ? Exprime le travail du poids en fonction de la distance d parcourue sur le plan.</li>
            <li>Calcule la distance d parcourue jusqu'à l'arrêt.</li>
            <li>Déduis la hauteur atteinte. Dépend-elle de la masse ?</li>
          </ol>
        </Ex>

        <Ex
          n={7}
          level={3}
          title="Problème complet : traction avec frottement"
          solution={
            <>
              <p>
                <strong className="text-white">1.</strong> Poids et réaction normale : perpendiculaires au déplacement horizontal, travail nul.
              </p>
              <Ln>W(F) = F·d·cos α = 1 500 × 50 × cos 20° = 75 000 × 0,9397 ≈ 70 477 J</Ln>
              <Ln>W(f) = −f·d = −400 × 50 = −20 000 J</Ln>
              <p>
                <strong className="text-white">2.</strong> ΣW = 70 477 − 20 000 ≈ 50 477 J.
              </p>
              <p>
                <strong className="text-white">3.</strong> Départ du repos : E<sub>c</sub>(A) = 0. Donc E<sub>c</sub>(B) = ΣW ≈ 50 477 J.
              </p>
              <Ln>v<sub>B</sub> = √(2 × 50 477 / 500) = √201,9 ≈ 14,2 m/s ≈ 51 km/h</Ln>
              <p>
                <strong className="text-white">4.</strong> La résultante est constante : le mouvement est uniformément accéléré depuis le repos, avec v<sub>B</sub>² = 2·a·d, donc a = 201,9 / 100 ≈ 2,02 m/s² et t = v<sub>B</sub>/a ≈ 7,0 s.
                La puissance moyenne de F est P<sub>m</sub> = W(F)/t ≈ 70 477 / 7,04 ≈ 1,0 × 10⁴ W (10 kW).
              </p>
            </>
          }
        >
          <p>
            Un chariot de masse <M>m = 500 kg</M>, initialement au repos, est tiré sur une piste horizontale par une force constante <M>F = 1 500 N</M> dont la direction fait <M>α = 20°</M> avec le déplacement. Une force de frottement constante <M>f = 400 N</M> s'oppose au mouvement. Le chariot parcourt <M>d = 50 m</M>.
          </p>
          <ol className="list-decimal pl-5">
            <li>Calcule le travail de chacune des forces extérieures.</li>
            <li>Calcule la somme des travaux.</li>
            <li>Déduis la vitesse finale du chariot en B.</li>
            <li>Calcule la durée du trajet (accélération constante) puis la puissance moyenne de <Vec>F</Vec>.</li>
          </ol>
        </Ex>
      </div>
    </article>
  );
}
