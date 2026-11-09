import { C, cosd, fmt, sind } from "../lib/phys";
import { AngleArc, Arrow, Ground, Label, MText, VText } from "./svg";

const wrap = "overflow-hidden rounded-xl bg-ink-950/80";

/* ------------------------------------------------------------------ */
/* Carte conceptuelle du chapitre d'introduction                       */
/* ------------------------------------------------------------------ */
function Box({ x, y, w, h, color, title, lines }: { x: number; y: number; w: number; h: number; color: string; title: string; lines: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#0f1d3b" stroke={color} strokeWidth={2} />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fill={color} fontSize={14} fontWeight={700}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 48 + i * 18} textAnchor="middle" fill="#dbe7ff" fontSize={13} className={i === 0 ? "mt" : undefined}>
          {l}
        </text>
      ))}
    </g>
  );
}

export function FigIntroMap() {
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 310" className="block h-auto w-full" role="img" aria-label="Carte des notions du chapitre">
        <Box x={14} y={105} w={190} h={92} color={C.force} title="Force + déplacement" lines={["F⃗ et AB⃗", "(α = angle entre les deux)"]} />
        <Box x={285} y={105} w={190} h={92} color={C.motor} title="Travail d'une force" lines={["W = F·d·cos α", "unité : joule (J)"]} />
        <Box x={540} y={14} w={206} h={92} color={C.velocity} title="Puissance" lines={["P = W / Δt", "unité : watt (W)"]} />
        <Box x={540} y={204} w={206} h={92} color={C.energy} title="Énergie cinétique" lines={["Ec = ½·m·v²", "unité : joule (J)"]} />
        <Arrow x1={206} y1={151} x2={283} y2={151} color="#8fb4ff" w={3} />
        <Arrow x1={477} y1={125} x2={538} y2={80} color="#8fb4ff" w={3} />
        <Arrow x1={477} y1={178} x2={538} y2={228} color="#8fb4ff" w={3} />
        <Label x={244} y={138} size={11} color="#aab9d8">calcul</Label>
        <Label x={500} y={92} size={11} color="#aab9d8" anchor="end">÷ durée</Label>
        <Label x={420} y={236} size={12} color={C.energy} weight={700}>théorème</Label>
        <Label x={420} y={252} size={12} color={C.energy}>ΔEc = ΣW</Label>
        <rect x={14} y={236} width={250} height={60} rx={10} fill="none" stroke="#2a4274" strokeDasharray="4 4" />
        <text x={139} y={260} textAnchor="middle" fill="#aab9d8" fontSize={12}>
          Le travail mesure l'énergie
        </text>
        <text x={139} y={278} textAnchor="middle" fill="#aab9d8" fontSize={12}>
          transférée par une force.
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Géométrie du travail : F, d, α, composantes (bloc animé)            */
/* ------------------------------------------------------------------ */
export function FigWorkGeometry() {
  const gy = 232;
  const cx = 150;
  const cy = gy - 28;
  const L = 150;
  const a = 35;
  const tx = cx + L * cosd(a);
  const ty = cy - L * sind(a);
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 300" className="block h-auto w-full" role="img" aria-label="Force, déplacement et angle alpha">
        <Ground x1={20} x2={740} y={gy} />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; 150 0; 0 0" keyTimes="0; 0.5; 1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" />
          <rect x={cx - 45} y={gy - 56} width={90} height={56} rx={6} fill="#183463" stroke="#8fb4ff" strokeWidth={2} />
          <line x1={cx} y1={cy} x2={cx + 200} y2={cy} stroke={C.disp} strokeDasharray="5 4" />
          <line x1={tx} y1={ty} x2={tx} y2={cy} stroke={C.force} strokeDasharray="3 4" />
          <line x1={cx} y1={cy + 2} x2={tx} y2={cy + 2} stroke={C.motor} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
          <AngleArc cx={cx} cy={cy} r={48} deg={a} color={C.velocity} />
          <MText x={cx + 72} y={cy - 18} t="α" color={C.velocity} size={19} />
          <Arrow x1={cx} y1={cy} x2={tx} y2={ty} color={C.force} w={4.5} />
          <VText x={tx + 16} y={ty - 6} t="F" color={C.force} size={20} />
          <circle cx={cx} cy={cy} r={4.5} fill="#fff" />
          <MText x={(cx + tx) / 2} y={cy + 24} t="F cos α" color={C.motor} size={14} />
          <MText x={tx + 8} y={(cy + ty) / 2 + 3} t="F sin α" color="#fdba74" size={13} anchor="start" />
        </g>
        {/* déplacement */}
        <Arrow x1={105} y1={268} x2={395} y2={268} color={C.disp} w={3} />
        <line x1={105} y1={gy} x2={105} y2={274} stroke={C.mute} strokeDasharray="3 4" />
        <line x1={395} y1={gy} x2={395} y2={274} stroke={C.mute} strokeDasharray="3 4" />
        <VText x={250} y={262} t="d" color={C.disp} size={18} />
        <Label x={105} y={289} color={C.disp} weight={700}>A</Label>
        <Label x={395} y={289} color={C.disp} weight={700}>B</Label>
        {/* encadré */}
        <rect x={470} y={44} width={270} height={138} rx={12} fill="#0f1d3b" stroke="#2a4274" />
        <text x={485} y={70} fill="#e2e8f0" fontSize={13} fontWeight={700}>Lecture de la figure</text>
        <text x={485} y={94} fill={C.force} fontSize={12.5}>● F⃗ : force constante (orange)</text>
        <text x={485} y={113} fill={C.disp} fontSize={12.5}>● d⃗ = AB⃗ : déplacement (bleu)</text>
        <text x={485} y={132} fill={C.velocity} fontSize={12.5}>● α = (F⃗ ; AB⃗) : angle (jaune)</text>
        <text x={485} y={151} fill={C.motor} fontSize={12.5}>● F cos α : composante utile (vert)</text>
        <text x={485} y={170} fill="#aab9d8" fontSize={12.5}>W = F · d · cos α = F⃗ · AB⃗</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trois cas : moteur / nul / résistant                                */
/* ------------------------------------------------------------------ */
function CasePanel({ x, a, color, title, sub, sign }: { x: number; a: number; color: string; title: string; sub: string; sign: string }) {
  const gy = 178;
  const cx = 112;
  const cy = gy - 22;
  const L = 82;
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={4} y={8} width={236} height={262} rx={12} fill="#0b1730" stroke={color} strokeOpacity={0.6} />
      <text x={122} y={32} textAnchor="middle" fill={color} fontSize={14} fontWeight={700}>
        {title}
      </text>
      <text x={122} y={50} textAnchor="middle" fill="#aab9d8" fontSize={12}>
        {sub}
      </text>
      <Ground x1={14} x2={230} y={gy} depth={9} step={11} />
      <rect x={cx - 34} y={gy - 44} width={68} height={44} rx={5} fill="#183463" stroke="#8fb4ff" strokeWidth={1.8} />
      <line x1={cx} y1={cy} x2={cx + 100} y2={cy} stroke={C.disp} strokeDasharray="4 4" />
      <AngleArc cx={cx} cy={cy} r={24} deg={a} color={C.velocity} />
      <Arrow x1={cx} y1={cy} x2={cx + L * cosd(a)} y2={cy - L * sind(a)} color={C.force} w={3.5} />
      <circle cx={cx} cy={cy} r={3.5} fill="#fff" />
      <VText x={cx + L * cosd(a) + (cosd(a) >= 0 ? 14 : -14)} y={cy - L * sind(a) - 6} t="F" color={C.force} size={16} />
      <MText x={cx + 36 * cosd(a / 2)} y={cy - 36 * sind(a / 2) + 4} t="α" color={C.velocity} size={14} />
      <Arrow x1={cx - 60} y1={gy + 28} x2={cx + 70} y2={gy + 28} color={C.disp} w={2.5} />
      <VText x={cx + 5} y={gy + 22} t="d" color={C.disp} size={14} />
      <text x={122} y={gy + 60} textAnchor="middle" fill={color} fontSize={14} fontWeight={700} className="mt">
        {sign}
      </text>
      <text x={122} y={gy + 78} textAnchor="middle" fill="#cbd5e1" fontSize={12}>
        cos α {sign.includes(">") ? "> 0" : sign.includes("<") ? "< 0" : "= 0"}
      </text>
    </g>
  );
}
export function FigThreeCases() {
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 280" className="block h-auto w-full" role="img" aria-label="Travail moteur, nul et résistant">
        <CasePanel x={4} a={35} color={C.motor} title="Travail moteur" sub="α = 35° (0° ≤ α < 90°)" sign="W > 0" />
        <CasePanel x={262} a={90} color={C.zero} title="Travail nul" sub="α = 90° (F ⟂ déplacement)" sign="W = 0" />
        <CasePanel x={520} a={145} color={C.resist} title="Travail résistant" sub="α = 145° (90° < α ≤ 180°)" sign="W < 0" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Travail du poids : montée / descente / horizontal                    */
/* ------------------------------------------------------------------ */
function WeightPanel({ x, ax, ay, bx, by, color, title, line1, line2 }: { x: number; ax: number; ay: number; bx: number; by: number; color: string; title: string; line1: string; line2: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={4} y={6} width={236} height={278} rx={12} fill="#0b1730" stroke={color} strokeOpacity={0.6} />
      <text x={122} y={30} textAnchor="middle" fill={color} fontSize={14} fontWeight={700}>
        {title}
      </text>
      <Ground x1={14} x2={230} y={232} depth={9} step={11} />
      {/* niveaux */}
      <line x1={14} y1={ay} x2={230} y2={ay} stroke={C.disp} strokeDasharray="4 4" opacity={0.5} />
      <line x1={14} y1={by} x2={230} y2={by} stroke={C.force} strokeDasharray="4 4" opacity={0.5} />
      <MText x={20} y={ay - 5} t="z" sub="A" color={C.disp} size={12} anchor="start" />
      <MText x={20} y={by - 5} t="z" sub="B" color={C.force} size={12} anchor="start" />
      {/* déplacement */}
      <Arrow x1={ax} y1={ay} x2={bx} y2={by} color={C.disp} w={2} dash="6 4" />
      {/* point B (fantôme) */}
      <circle cx={bx} cy={by} r={9} fill="none" stroke="#8fb4ff" strokeDasharray="3 3" />
      <text x={bx + 14} y={by - 10} fill={C.force} fontSize={13} fontWeight={700}>B</text>
      {/* objet en A */}
      <Arrow x1={ax} y1={ay} x2={ax} y2={ay + 52} color={C.weight} w={3.5} />
      <VText x={ax + 15} y={ay + 52} t="P" color={C.weight} size={15} />
      <circle cx={ax} cy={ay} r={9} fill="#183463" stroke="#a8c3ff" strokeWidth={2} />
      <text x={ax - 14} y={ay - 10} fill={C.disp} fontSize={13} fontWeight={700}>A</text>
      <text x={122} y={254} textAnchor="middle" fill="#e2e8f0" fontSize={12} className="mt">
        {line1}
      </text>
      <text x={122} y={272} textAnchor="middle" fill={color} fontSize={12.5} fontWeight={700} className="mt">
        {line2}
      </text>
    </g>
  );
}
export function FigWeightCases() {
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 290" className="block h-auto w-full" role="img" aria-label="Travail du poids en montée, descente et déplacement horizontal">
        <WeightPanel x={4} ax={55} ay={196} bx={185} by={84} color={C.resist} title="Montée (A → B)" line1="zB > zA : le poids s'oppose" line2="W = −m·g·(zB − zA) < 0" />
        <WeightPanel x={262} ax={55} ay={84} bx={185} by={196} color={C.motor} title="Descente (A → B)" line1="zB < zA : le poids aide" line2="W = m·g·(zA − zB) > 0" />
        <WeightPanel x={520} ax={55} ay={140} bx={185} by={140} color={C.zero} title="Horizontal (A → B)" line1="zA = zB : P ⟂ déplacement" line2="W = 0" />
      </svg>
    </div>
  );
}

/* Indépendance du chemin */
export function FigWeightPaths() {
  const A = { x: 90, y: 240 };
  const B = { x: 400, y: 90 };
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 290" className="block h-auto w-full" role="img" aria-label="Le travail du poids ne dépend pas du chemin suivi">
        <Ground x1={40} x2={460} y={A.y} />
        {/* niveaux */}
        <line x1={A.x} y1={B.y} x2={B.x + 60} y2={B.y} stroke={C.force} strokeDasharray="5 4" opacity={0.7} />
        <line x1={B.x} y1={B.y} x2={B.x} y2={A.y} stroke={C.velocity} strokeDasharray="3 4" />
        <Arrow x1={B.x + 40} y1={A.y} x2={B.x + 40} y2={B.y} color={C.velocity} w={2.5} />
        <MText x={B.x + 50} y={(A.y + B.y) / 2 + 4} t="h" color={C.velocity} size={17} anchor="start" />
        <MText x={B.x + 60} y={B.y - 7} t="z" sub="B" color={C.force} size={14} anchor="end" />
        <MText x={A.x - 14} y={A.y - 8} t="z" sub="A" color={C.disp} size={14} anchor="end" />
        {/* plan incliné */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#5b7bb5" strokeWidth={3} />
        {/* chemin courbe */}
        <path d={`M${A.x},${A.y} C${A.x + 40},${A.y - 210} ${B.x - 160},${B.y - 70} ${B.x},${B.y}`} fill="none" stroke="#fbbf24" strokeWidth={2.2} strokeDasharray="7 4" className="dash-flow" />
        {/* poids */}
        <Arrow x1={245} y1={165} x2={245} y2={225} color={C.weight} w={3.5} />
        <VText x={262} y={222} t="P" color={C.weight} size={16} />
        <circle cx={245} cy={165} r={8} fill="#183463" stroke="#a8c3ff" strokeWidth={2} />
        {/* A, B */}
        <circle cx={A.x} cy={A.y} r={5} fill={C.disp} />
        <circle cx={B.x} cy={B.y} r={5} fill={C.force} />
        <Label x={A.x} y={A.y + 36} color={C.disp} weight={700}>A</Label>
        <Label x={B.x - 12} y={B.y - 12} color={C.force} weight={700}>B</Label>
        <rect x={500} y={50} width={246} height={184} rx={12} fill="#0f1d3b" stroke="#2a4274" />
        <text x={514} y={76} fill="#e2e8f0" fontSize={13} fontWeight={700}>Trois chemins, un seul travail</text>
        <text x={514} y={100} fill="#5b7bb5" fontSize={12.5}>━ plan incliné</text>
        <text x={514} y={119} fill="#fbbf24" fontSize={12.5}>┅ trajectoire courbe</text>
        <text x={514} y={138} fill={C.velocity} fontSize={12.5}>┃ chemin vertical de hauteur h</text>
        <text x={514} y={170} fill="#cbd5e1" fontSize={13} className="mt">W(P) = −m·g·h</text>
        <text x={514} y={192} fill="#aab9d8" fontSize={12}>avec h = zB − zA</text>
        <text x={514} y={214} fill="#aab9d8" fontSize={12}>seule l'altitude compte.</text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ordres de grandeur d'énergie cinétique (échelle logarithmique)       */
/* ------------------------------------------------------------------ */
export function FigEcOrders() {
  const items = [
    { n: "Balle de tennis", d: "58 g à 30 m/s", E: 0.5 * 0.058 * 900, c: "#a3e635" },
    { n: "Cycliste + vélo", d: "80 kg à 10 m/s", E: 0.5 * 80 * 100, c: "#38bdf8" },
    { n: "Voiture", d: "1 200 kg à 25 m/s", E: 0.5 * 1200 * 625, c: "#fb923c" },
    { n: "Camion", d: "20 t à 25 m/s", E: 0.5 * 20000 * 625, c: "#f87171" },
  ];
  const x0 = 190;
  const x1 = 720;
  const px = (E: number) => x0 + (Math.log10(E) / 7) * (x1 - x0);
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 270" className="block h-auto w-full" role="img" aria-label="Ordres de grandeur de l'énergie cinétique">
        <text x={380} y={22} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
          Énergie cinétique (échelle logarithmique)
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
          <g key={k}>
            <line x1={px(Math.pow(10, k))} y1={36} x2={px(Math.pow(10, k))} y2={216} stroke={C.grid} />
            <text x={px(Math.pow(10, k))} y={236} textAnchor="middle" fill={C.mute} fontSize={11}>
              10<tspan dy={-5} fontSize={8}>{k}</tspan>
            </text>
          </g>
        ))}
        <text x={x1 + 30} y={240} textAnchor="end" fill="#aab9d8" fontSize={11}>J</text>
        {items.map((it, i) => (
          <g key={it.n}>
            <text x={12} y={68 + i * 44} fill="#e2e8f0" fontSize={13} fontWeight={600}>{it.n}</text>
            <text x={12} y={84 + i * 44} fill="#8ea3cc" fontSize={11}>{it.d}</text>
            <rect x={x0} y={52 + i * 44} width={px(it.E) - x0} height={26} rx={4} fill={it.c} opacity={0.85}>
              <animate attributeName="width" from="0" to={px(it.E) - x0} dur="1.2s" fill="freeze" />
            </rect>
            <text x={px(it.E) + 6} y={70 + i * 44} fill="#e2e8f0" fontSize={12} fontWeight={600}>
              {it.E >= 1e5 ? fmt(it.E / 1e6, 2) + " MJ" : fmt(it.E, 1) + " J"}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Système étudié pour le théorème de l'énergie cinétique               */
/* ------------------------------------------------------------------ */
export function FigTheoremSystem() {
  const gy = 160;
  const xa = 170;
  const xb = 560;
  const cy = gy - 24;
  const block = (x: number, ghost: boolean) => (
    <rect x={x - 38} y={gy - 48} width={76} height={48} rx={6} fill={ghost ? "none" : "#183463"} stroke={ghost ? "#5b7bb5" : "#8fb4ff"} strokeWidth={2} strokeDasharray={ghost ? "5 4" : undefined} />
  );
  return (
    <div className={wrap}>
      <svg viewBox="0 0 760 330" className="block h-auto w-full" role="img" aria-label="Forces extérieures et variation d'énergie cinétique entre A et B">
        <Ground x1={30} x2={740} y={gy} />
        {block(xb, true)}
        {block(xa, false)}
        {/* forces en A */}
        <Arrow x1={xa} y1={cy} x2={xa} y2={cy + 58} color={C.weight} w={3.5} />
        <VText x={xa - 15} y={cy + 58} t="P" color={C.weight} size={16} />
        <Arrow x1={xa + 14} y1={gy - 2} x2={xa + 14} y2={gy - 66} color={C.reaction} w={3.5} />
        <VText x={xa + 30} y={gy - 54} t="R" color={C.reaction} size={16} />
        <Arrow x1={xa + 38} y1={cy - 4} x2={xa + 118} y2={cy - 4} color={C.force} w={4} />
        <VText x={xa + 118} y={cy - 16} t="F" color={C.force} size={16} />
        <Arrow x1={xa - 38} y1={gy - 8} x2={xa - 98} y2={gy - 8} color={C.friction} w={3.5} />
        <VText x={xa - 70} y={gy - 18} t="f" color={C.friction} size={16} />
        <circle cx={xa} cy={cy} r={3.5} fill="#fff" />
        {/* vitesses */}
        <Arrow x1={xa - 30} y1={gy - 74} x2={xa + 50} y2={gy - 74} color={C.velocity} w={3} />
        <VText x={xa + 54} y={gy - 80} t="v" sub="A" color={C.velocity} size={15} />
        <Arrow x1={xb - 30} y1={gy - 74} x2={xb + 80} y2={gy - 74} color={C.velocity} w={3} />
        <VText x={xb + 84} y={gy - 80} t="v" sub="B" color={C.velocity} size={15} />
        {/* trajet AB */}
        <Arrow x1={xa} y1={gy + 28} x2={xb} y2={gy + 28} color={C.disp} w={2.5} />
        <line x1={xa} y1={gy} x2={xa} y2={gy + 34} stroke={C.mute} strokeDasharray="3 4" />
        <line x1={xb} y1={gy} x2={xb} y2={gy + 34} stroke={C.mute} strokeDasharray="3 4" />
        <VText x={(xa + xb) / 2} y={gy + 22} t="AB" color={C.disp} size={15} />
        <Label x={xa} y={gy + 52} color={C.disp} weight={700}>A</Label>
        <Label x={xb} y={gy + 52} color={C.disp} weight={700}>B</Label>
        {/* bilan */}
        <rect x={60} y={228} width={640} height={86} rx={12} fill="#0f1d3b" stroke="#2a4274" />
        <text x={380} y={254} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>
          Bilan entre A et B (référentiel galiléen)
        </text>
        <text x={380} y={282} textAnchor="middle" fill={C.energy} fontSize={17} className="mt">
          Ec(B) − Ec(A) = W(P) + W(R) + W(F) + W(f)
        </text>
        <text x={380} y={302} textAnchor="middle" fill="#aab9d8" fontSize={12}>
          ½·m·v_B² − ½·m·v_A² = somme des travaux des forces extérieures
        </text>
      </svg>
    </div>
  );
}
