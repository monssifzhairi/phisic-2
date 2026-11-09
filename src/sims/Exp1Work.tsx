import { useRef, useState } from "react";
import { C, cosd, fmt, rad, sind, useRaf, workColor, workKind } from "../lib/phys";
import { AngleArc, Arrow, Ground, Label, MText, VText } from "../components/svg";
import { Banner, M, Readout, SimControls, SimShell, Slider, SvgBox, Vec } from "../components/ui";
import { LineChart } from "../components/LineChart";

const X0 = 60; // abscisse du bord gauche du bloc au départ
const SC = 46; // pixels par mètre
const BW = 80;
const BH = 50;
const GY = 250;

export default function Exp1Work() {
  const [F, setF] = useState(50);
  const [d, setD] = useState(6);
  const [a, setA] = useState(30);
  const [s, setS] = useState(0);
  const [run, setRun] = useState(false);
  const sRef = useRef(0);

  useRaf(run, (dt) => {
    const n = Math.min(d, Math.min(sRef.current, d) + 2 * dt);
    sRef.current = n;
    setS(n);
    if (n >= d) setRun(false);
  });

  const sc = Math.min(s, d);
  const cosA = cosd(a);
  const Wtot = F * d * cosA;
  const Wlive = F * sc * cosA;
  const kind = workKind(Wtot);
  const col = workColor(kind);

  const toggle = () => {
    if (!run && sc >= d) {
      sRef.current = 0;
      setS(0);
    }
    setRun(!run);
  };
  const reset = () => {
    setRun(false);
    sRef.current = 0;
    setS(0);
  };

  const bx = X0 + sc * SC;
  const cx = bx + BW / 2;
  const cy = GY - BH / 2;
  const L = 24 + F * 0.9;
  const tipx = cx + L * cosd(a);
  const tipy = cy - L * sind(a);
  const ax = X0 + BW / 2;
  const bxEnd = X0 + d * SC + BW / 2;
  const half = rad(a / 2);

  const pts: [number, number][] = [];
  for (let k = 0; k <= 180; k += 3) pts.push([k, F * d * cosd(k)]);
  const bound = Math.max(F * d, 1);

  return (
    <SimShell n={1} title="Travail d'une force constante" goal="Faire varier F, d et α pour voir quand le travail est moteur, résistant ou nul.">
      <SvgBox viewBox="0 0 760 330">
        <Ground x1={20} x2={740} y={GY} />
        {/* Points A et B */}
        <line x1={ax} y1={GY} x2={ax} y2={292} stroke={C.mute} strokeDasharray="3 4" />
        <line x1={bxEnd} y1={GY} x2={bxEnd} y2={292} stroke={C.mute} strokeDasharray="3 4" />
        <Arrow x1={ax} y1={288} x2={bxEnd} y2={288} color={C.disp} w={2.5} />
        <MText x={(ax + bxEnd) / 2} y={316} t={`AB = d = ${fmt(d, 1)} m`} color={C.disp} size={15} />
        <Label x={ax} y={GY + 38} color={C.disp} weight={700} size={14}>A</Label>
        <Label x={bxEnd} y={GY + 38} color={C.disp} weight={700} size={14}>B</Label>
        {/* bloc fantôme final */}
        <rect x={X0 + d * SC} y={GY - BH} width={BW} height={BH} rx={5} fill="none" stroke="#5b7bb5" strokeDasharray="5 4" />
        {/* axe de référence */}
        <line x1={cx} y1={cy} x2={cx + 125} y2={cy} stroke={C.disp} strokeDasharray="5 4" strokeWidth={1.4} opacity={0.8} />
        <VText x={cx + 140} y={cy + 5} t="d" color={C.disp} size={15} />
        {/* bloc */}
        <rect x={bx} y={GY - BH} width={BW} height={BH} rx={6} fill="#183463" stroke="#8fb4ff" strokeWidth={2} />
        <text x={bx + BW / 2} y={GY - 8} textAnchor="middle" fill="#9db9ee" fontSize={12}>
          solide
        </text>
        {/* projection de F sur le déplacement */}
        {F > 0 && Math.abs(cosA) > 0 && (
          <>
            <line x1={tipx} y1={tipy} x2={tipx} y2={cy} stroke={C.force} strokeDasharray="3 4" opacity={0.8} />
            <line x1={cx} y1={cy + 1} x2={tipx} y2={cy + 1} stroke={col} strokeWidth={5} opacity={0.85} strokeLinecap="round" />
          </>
        )}
        <AngleArc cx={cx} cy={cy} r={42} deg={F > 0 ? a : 0} color={C.velocity} />
        {F > 0 && a > 3 && (
          <MText x={cx + 62 * Math.cos(half)} y={cy - 62 * Math.sin(half) + 5} t="α" color={C.velocity} size={18} />
        )}
        {/* force */}
        {F > 0 && <Arrow x1={cx} y1={cy} x2={tipx} y2={tipy} color={C.force} w={4} />}
        <circle cx={cx} cy={cy} r={4.5} fill="#fff" />
        {F > 0 && <VText x={tipx + (cosA >= 0 ? 16 : -16)} y={tipy - 8} t="F" color={C.force} size={18} />}
        {/* progression */}
        <Label x={380} y={28} color="#aab9d8" size={13}>
          déplacement parcouru : {fmt(sc, 2)} m — travail déjà fourni : {fmt(Wlive, 1)} J
        </Label>
      </SvgBox>

      <SimControls running={run} onToggle={toggle} onReset={reset} />

      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Intensité de la force" symbol="F" unit="N" value={F} min={0} max={100} step={1} digits={0} onChange={setF} color={C.force} />
        <Slider label="Déplacement" symbol="d" unit="m" value={d} min={1} max={10} step={0.5} digits={1} onChange={setD} color={C.disp} />
        <Slider label="Angle" symbol="α" unit="°" value={a} min={0} max={180} step={1} digits={0} onChange={setA} color={C.velocity} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Readout label="cos α" value={fmt(cosA, 3)} tone="accent" />
        <Readout label={<>Composante <M>F cos α</M></>} value={fmt(F * cosA, 1)} unit="N" tone="accent" />
        <Readout label="Travail total W(F)" value={fmt(Wtot, 1)} unit="J" tone={kind} big />
        <Readout label="Travail en direct" value={fmt(Wlive, 1)} unit="J" tone={kind} />
      </div>

      <Banner kind={kind}>
        {kind === "motor" && (
          <>
            <strong>Travail moteur (W &gt; 0)</strong> — 0° ≤ α &lt; 90° : <M>cos α &gt; 0</M>. La force a une composante dans le sens du déplacement : elle <em>aide</em> le mouvement et fournit de l'énergie au solide.
          </>
        )}
        {kind === "resist" && (
          <>
            <strong>Travail résistant (W &lt; 0)</strong> — 90° &lt; α ≤ 180° : <M>cos α &lt; 0</M>. La force s'<em>oppose</em> au mouvement (comme un frottement) : elle retire de l'énergie au solide.
          </>
        )}
        {kind === "zero" && (
          <>
            <strong>Travail nul (W = 0)</strong> —{" "}
            {F === 0 ? "la force est nulle." : cosA === 0 ? "α = 90° : la force est perpendiculaire au déplacement (cos 90° = 0)." : "d = 0."} Aucun transfert d'énergie par cette force.
          </>
        )}
        <div className="mt-1 font-mono text-xs opacity-90">
          W = F × d × cos α = {fmt(F, 0)} × {fmt(d, 1)} × {fmt(cosA, 3)} = {fmt(Wtot, 1)} J
        </div>
      </Banner>

      <div className="rounded-xl border border-sky-400/10 bg-ink-900/60 p-3">
        <div className="mx-auto max-w-xl">
          <LineChart
            title="Travail W en fonction de l'angle α (F et d fixés)"
            xmin={0}
            xmax={180}
            ymin={-bound * 1.1}
            ymax={bound * 1.1}
            xticks={[0, 45, 90, 135, 180]}
            xlabel="α (°)"
            ylabel="W (J)"
            series={[{ pts, color: "#7dd3fc" }]}
            markers={[{ x: a, y: Wtot, color: col }]}
          />
        </div>
        <p className="mt-1 text-center text-xs text-slate-400">
          La courbe est une cosinusoïde : maximale pour α = 0°, nulle pour α = 90°, minimale pour α = 180°. Vecteurs : <Vec>F</Vec> (orange), <Vec>d</Vec> (bleu).
        </p>
      </div>
    </SimShell>
  );
}
