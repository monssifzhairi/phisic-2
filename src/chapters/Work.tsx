import { FigThreeCases, FigWorkGeometry } from "../components/Figures";
import { Figure } from "../components/svg";
import Exp1Work from "../sims/Exp1Work";
import { Callout, ChapterHeader, Check, Enrich, Eq, Frac, Ln, M, Step, SymbolTable, U, Vec, Worked } from "../components/ui";

export default function Work() {
  return (
    <article>
      <ChapterHeader
        num="1"
        title="Travail d'une force"
        subtitle="Comment mesurer l'énergie qu'une force transfère à un solide qui se déplace ? Définition, signe et calcul."
      />

      <Step n={1} kind="idea" title="L'idée simple">
        <p>
          Quand tu pousses un chariot de supermarché, ton effort « sert » à le faire avancer : plus la force est grande et plus la distance est longue, plus tu transfères d'énergie au chariot.
          Mais seule compte la part de la force qui agit <em>dans la direction du mouvement</em>. Si tu portes une valise en marchant sur un sol horizontal, ta main pousse la valise vers
          le haut alors qu'elle avance horizontalement : la force est perpendiculaire au déplacement, et son travail est nul.
        </p>
      </Step>

      <Step n={2} kind="def" title="Définition rigoureuse">
        <Callout kind="def" title="Travail d'une force constante">
          <p>
            Lorsque le point d'application d'une force constante <Vec>F</Vec> se déplace d'un point A à un point B, le <strong className="text-white">travail</strong> de cette force est le{" "}
            <strong className="text-white">produit scalaire</strong> de la force par le vecteur déplacement :
          </p>
        </Callout>
        <Eq label="Travail d'une force constante">
          W<sub>AB</sub>(<Vec>F</Vec>) = <Vec>F</Vec> · <Vec>AB</Vec> = F × AB × cos α
        </Eq>
        <p>
          Le <strong className="text-white">produit scalaire</strong> de deux vecteurs est un nombre (un scalaire). Si l'on connaît leurs coordonnées dans un repère orthonormé :
        </p>
        <Eq>
          <Vec>F</Vec> · <Vec>AB</Vec> = F<sub>x</sub>·AB<sub>x</sub> + F<sub>y</sub>·AB<sub>y</sub>
        </Eq>
        <p>
          Pour une force constante, le travail ne dépend que des points A et B (pas de la forme de la trajectoire). Dans ce cours, on étudie surtout le cas d'un déplacement
          rectiligne, avec <M>AB = d</M>.
        </p>
      </Step>

      <Step n={3} kind="sym" title="Symboles et unités SI">
        <SymbolTable
          rows={[
            [<M>W<sub>AB</sub></M>, "travail de la force entre A et B", "joule (J)"],
            [<M>F</M>, "intensité (norme) de la force", "newton (N)"],
            [<M>AB</M>, "distance parcourue par le point d'application (ou d)", "mètre (m)"],
            [<M>α</M>, "angle entre le vecteur force et le vecteur déplacement", "degré (°) ou radian (rad)"],
            [<M>cos α</M>, "facteur sans dimension compris entre −1 et 1", "aucune"],
          ]}
        />
        <Callout kind="rule" title="Le joule">
          <p>
            1 joule est le travail d'une force de 1 newton dont le point d'application se déplace de 1 mètre dans la direction et le sens de la force : <M>1 J = 1 N × 1 m</M>.
          </p>
        </Callout>
      </Step>

      <Step n={4} kind="fig" title="Figure scientifique : F, d et α">
        <Figure num="Figure 1.1" caption="Le bloc glisse de A vers B. La force F⃗ (orange) fait l'angle α avec le déplacement AB⃗ (bleu). Seule la composante F·cos α (verte) travaille ; la composante F·sin α, perpendiculaire au déplacement, ne travaille pas.">
          <FigWorkGeometry />
        </Figure>
        <p>
          On décompose la force en deux composantes : <M>F<sub>∥</sub> = F·cos α</M> le long du déplacement, et <M>F<sub>⊥</sub> = F·sin α</M> perpendiculaire. Le travail vaut donc{" "}
          <M>W = F<sub>∥</sub> × d</M>.
        </p>
      </Step>

      <Step n={5} kind="def" title="Travail moteur, résistant ou nul">
        <p>Le signe du travail est celui de <M>cos α</M> :</p>
        <div className="overflow-x-auto rounded-xl border border-sky-400/15">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-ink-700/60 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 py-2">Angle α</th>
                <th className="px-3 py-2">cos α</th>
                <th className="px-3 py-2">Travail</th>
                <th className="px-3 py-2">Effet de la force</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-sky-400/10">
                <td className="px-3 py-2">0° ≤ α &lt; 90°</td>
                <td className="px-3 py-2">positif</td>
                <td className="px-3 py-2 font-semibold text-emerald-300">W &gt; 0 : moteur</td>
                <td className="px-3 py-2">favorise le mouvement</td>
              </tr>
              <tr className="border-t border-sky-400/10">
                <td className="px-3 py-2">α = 90°</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2 font-semibold text-slate-300">W = 0 : nul</td>
                <td className="px-3 py-2">sans effet sur la vitesse</td>
              </tr>
              <tr className="border-t border-sky-400/10">
                <td className="px-3 py-2">90° &lt; α ≤ 180°</td>
                <td className="px-3 py-2">négatif</td>
                <td className="px-3 py-2 font-semibold text-rose-300">W &lt; 0 : résistant</td>
                <td className="px-3 py-2">s'oppose au mouvement</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Figure num="Figure 1.2" caption="Les trois situations. Une force de frottement, opposée au déplacement (α = 180°, cos α = −1), a un travail résistant : W(f) = −f·d. Une force perpendiculaire au déplacement, comme la réaction normale d'un support horizontal ou le poids pendant un déplacement horizontal, a un travail nul.">
          <FigThreeCases />
        </Figure>
        <Callout kind="warn" title="Erreurs fréquentes">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              L'angle <M>α</M> est l'angle entre la <em>force</em> et le <em>déplacement</em>, pas l'angle avec l'horizontale ou avec le sol (sauf si le déplacement est horizontal).
            </li>
            <li>Un travail négatif n'est pas « impossible » : il signifie que la force freine le solide.</li>
            <li>Calculatrice en mode degrés pour α en degrés !</li>
          </ul>
        </Callout>
      </Step>

      <Step n={6} kind="exp" title="Expérience 1 — Travail d'une force">
        <Exp1Work />
        <p className="text-sm text-slate-400">
          Pistes d'exploration : (1) mets α = 0° puis 60° : que devient W ? (2) Cherche l'angle pour lequel W = 0. (3) Fixe α = 180° et lis le signe de W. (4) Doubles-tu W en doublant d ? en doublant F ?
        </p>
      </Step>

      <Step n={7} kind="real" title="Dans la vie réelle">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Pousser un meuble</strong> : la force de poussée est dans le sens du déplacement (travail moteur) ; le frottement du sol s'y oppose (travail résistant).
          </li>
          <li>
            <strong className="text-white">Tirer une valise à roulettes</strong> par la poignée inclinée : seule la composante horizontale <M>F·cos α</M> travaille.
          </li>
          <li>
            <strong className="text-white">Freiner en vélo</strong> : la force exercée par les patins sur la roue s'oppose au mouvement, donc son travail est résistant.
          </li>
          <li>
            <strong className="text-white">Porter un sac en marchant à plat</strong> : la force verticale de ta main est perpendiculaire au déplacement, donc son travail est nul.
          </li>
        </ul>
      </Step>

      <Step n={8} kind="calc" title="Exemples numériques">
        <Worked title="Exemple 1 — Force inclinée">
          <p>
            Un enfant tire un traîneau avec une corde exerçant une force constante d'intensité <M>F = 40 N</M>, inclinée de <M>α = 30°</M> par rapport au déplacement horizontal. Le traîneau avance de <M>d = 5 m</M>.
            Calcule le travail de la force.
          </p>
          <Ln>W = F × d × cos α = 40 × 5 × cos 30°</Ln>
          <Ln>W = 200 × 0,866 ≈ 173,2 J &gt; 0 (travail moteur)</Ln>
          <p className="text-sm text-slate-400">
            Avec α = 150° (force dirigée « vers l'arrière »), cos 150° = −0,866 et W ≈ −173,2 J ; avec α = 90°, W = 0.
          </p>
        </Worked>
        <Worked title="Exemple 2 — Avec les coordonnées (produit scalaire)">
          <p>
            Dans un repère (O ; <M>i</M>, <M>j</M>), une force <M><Vec>F</Vec> = (30 <span className="rm">i</span> + 40 <span className="rm">j</span>)</M> N s'exerce sur un solide qui subit le déplacement{" "}
            <M><Vec>AB</Vec> = 4 <span className="rm">i</span></M> m.
          </p>
          <Ln>W = F<sub>x</sub>·AB<sub>x</sub> + F<sub>y</sub>·AB<sub>y</sub> = 30 × 4 + 40 × 0 = 120 J</Ln>
          <p className="text-sm text-slate-400">
            Vérification : <M>F = √(30² + 40²) = 50 N</M>, <M>cos α = 30/50 = 0,6</M>, donc <M>W = 50 × 4 × 0,6 = 120 J</M> ✓.
          </p>
        </Worked>
        <Worked title="Exemple 3 — Force de frottement">
          <p>
            Une caisse glisse sur 8 m sur un sol horizontal ; la force de frottement, constante, a pour intensité <M>f = 15 N</M> et est opposée au déplacement.
          </p>
          <Ln>W(f) = f × d × cos 180° = 15 × 8 × (−1) = −120 J</Ln>
        </Worked>
      </Step>

      <Enrich title="Force variable : le travail comme aire sous la courbe F(x)">
        <p>
          Si la force n'est pas constante mais reste dirigée selon le déplacement rectiligne, le travail entre <M>x<sub>A</sub></M> et <M>x<sub>B</sub></M> est l'aire comprise entre la courbe{" "}
          <M>F(x)</M> et l'axe des abscisses. En analyse, il s'écrit <M>W = ∫ F(x) dx</M>.
        </p>
        <p>
          Exemple : une force passe linéairement de 0 à 20 N sur 5 m. L'aire du triangle vaut <M>½ × 20 × 5 = 50 J</M>.
        </p>
      </Enrich>

      <Step n={9} kind="check" title="Vérifie ta compréhension">
        <div className="space-y-4">
          <Check
            question={<>Une force de 20 N est perpendiculaire au déplacement de 3 m de son point d'application. Son travail vaut :</>}
            options={["60 J", "0 J", "−60 J", "20 J"]}
            answer={1}
            explain="cos 90° = 0, donc W = 20 × 3 × 0 = 0 J : une force perpendiculaire au déplacement ne travaille pas."
          />
          <Check
            question={<>Pour α = 120°, le travail de la force est :</>}
            options={["positif (moteur)", "nul", "négatif (résistant)", "impossible à savoir"]}
            answer={2}
            explain="cos 120° = −0,5 < 0 : le travail est négatif, la force a une composante opposée au déplacement."
          />
          <Check
            question={<>On double l'intensité de F sans changer d ni α. Le travail :</>}
            options={["est doublé", "est multiplié par 4", "est divisé par 2", "ne change pas"]}
            answer={0}
            explain={<>W = F·d·cos α est proportionnel à F : si F double, W double (voir le curseur de l'expérience 1).</>}
          />
        </div>
      </Step>

      <Callout kind="rule" title="À retenir">
        <p>
          <M>W = <Vec>F</Vec> · <Vec>AB</Vec> = F·d·cos α</M> (en J). Signe de <M>cos α</M> : moteur si α &lt; 90°, nul si α = 90°, résistant si α &gt; 90°. Un déplacement{" "}
          <U>nul</U> donne un travail nul. Pour une force de frottement opposée au mouvement : <M>W = −f·d</M>. Sous forme de fraction, l'énergie transférée par mètre est{" "}
          <M><Frac n="W" d="d" /> = F·cos α</M>.
        </p>
      </Callout>
    </article>
  );
}
