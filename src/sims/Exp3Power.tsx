import { useRef, useState } from "react";
import { C, cosd, fmt, sind, useRaf, workColor, workKind } from "../lib/phys";
import { Arrow, Ground, Label, VText, Wheel } from "../components/svg";
import { Banner, M, Readout, SimControls, SimShell, Slider, SvgBox } from "../components/ui";
import { LineChart } from "../components/LineChart";

const PX = 30; // pixels par mètre
const GY = 232;
const CX = 250; // position (fixe à l'écran) du chariot
const TMAX = 10;

export default function Exp3Power() {
  const [F, setF] = useState(80);
  const [v, setV] = useState(4);
  const [a, setA] = useState(0);
  const [t, setT] = useState(0);
  const [run, setRun] = useState(false);
  const tRef = useRef(0);

  useRaf(run, (dt) => {
    const n = Math.min(TMAX, tRef.current + dt);
    tRef.current = n;
    setT(n);
    if (n >= TMAX) setRun(false);
  });

  const toggle = () => {
    if (!run && t >= TMAX) {
      tRef.current = 0;
      setT(0);
    }
    setRun(!run);
  };
  const reset = () => {
    setRun(false);
    tRef.current = 0;
    setT(0);
  };

  const cosA = cosd(a);
  const P = F * v * cosA; // puissance instantanée (= moyenne ici)
  const s = v * t;
  const W = F * cosA * s;
  const Pm = t > 0 ? W / t : P;
  const kind = workKind(P);
  const col = workColor(kind);

  // sol défilant gradué
  const ticks = [];
  for (let k = Math.floor(s) - 9; k <= Math.floor(s) + 18; k++) {
    const x = CX + (k - s) * PX - 60;
    if (x < 10 || x > 750) continue;
    const big = k % 5 === 0;
    ticks.push(
      <g key={k}>
        <line x1={x} y1={GY} x2={x} y2={GY + (big ? 14 : 7)} stroke="#6f8fd0" strokeWidth={big ? 2 : 1} />
        {big && k >= 0 && (
          <text x={x} y={GY + 30} fill={C.mute} fontSize={11} textAnchor="middle">
            {k} m
          </text>
        )}
      </g>
    );
  }

  const bx = CX - 60;
  const cy = GY - 36;
  const wAng = (s * PX) / 15;
  const FL = 22 + F * 0.45;

  const Wend = P * TMAX;
  const lineFull: [number, number][] = [
    [0, 0],
    [TMAX, Wend],
  ];
  const lineNow: [number, number][] = [
    [0, 0],
    [t, P * t],
  ];
  const pv: [number, number][] = [];
  for (let k = 0; k <= 15; k += 0.5) pv.push([k, F * k * cosA]);
  const pmax = Math.max(F * 15 * Math.abs(cosA), 10);

  return (
    <SimShell n={3} title="Puissance d'une force" goal="Relier travail, durée et puissance : régler F, v et α, puis observer W(t) et P.">
      <SvgBox viewBox="0 0 760 290">
        <Ground x1={20} x2={740} y={GY} />
        {ticks}
        {/* chariot */}
        <rect x={bx} y={GY - 40} width={120} height={26} rx={5} fill="#183463" stroke="#8fb4ff" strokeWidth={2} />
        <rect x={bx + 28} y={GY - 62} width={64} height={24} rx={4} fill="#122a52" stroke="#8fb4ff" strokeWidth={1.5} />
        <Wheel cx={bx + 26} cy={GY - 12} r={12} angle={wAng} />
        <Wheel cx={bx + 94} cy={GY - 12} r={12} angle={wAng} />
        {/* force appliquée */}
        {F > 0 && <Arrow x1={bx + 120} y1={cy} x2={bx + 120 + FL * cosd(a)} y2={cy - FL * sind(a)} color={C.force} w={4} />}
        {F > 0 && <VText x={bx + 120 + FL * cosd(a) + (a > 90 ? -16 : 16)} y={cy - FL * sind(a) - 6} t="F" color={C.force} size={18} />}
        <circle cx={bx + 120} cy={cy} r={4} fill="#fff" />
        {/* vitesse */}
        {v > 0 && <Arrow x1={bx + 60} y1={GY - 78} x2={bx + 60 + 6 * v + 10} y2={GY - 78} color={C.velocity} w={3.5} />}
        {v > 0 && <VText x={bx + 60 + 6 * v + 28} y={GY - 73} t="v" color={C.velocity} size={17} />}
        <Label x={380} y={26} size={13} color="#aab9d8">
          t = {fmt(t, 2)} s — distance parcourue s = v·t = {fmt(s, 2)} m — travail W = {fmt(W, 1)} J
        </Label>
      </SvgBox>

      <SimControls running={run} onToggle={toggle} onReset={reset} />

      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Force constante" symbol="F" unit="N" value={F} min={0} max={200} step={5} digits={0} onChange={setF} color={C.force} />
        <Slider label="Vitesse constante" symbol="v" unit="m/s" value={v} min={0} max={15} step={0.5} onChange={setV} color={C.velocity} />
        <Slider label="Angle (F, v)" symbol="α" unit="°" value={a} min={0} max={180} step={1} digits={0} onChange={setA} color="#f472b6" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Readout label="Durée écoulée t" value={fmt(t, 2)} unit="s" tone="accent" />
        <Readout label="Travail W = F·s·cos α" value={fmt(W, 1)} unit="J" tone={kind} />
        <Readout label={<>Puissance moyenne <M>W / t</M></>} value={fmt(Pm, 1)} unit="W" tone={kind} big />
        <Readout label={<>Puissance <M>F·v·cos α</M></>} value={fmt(P, 1)} unit="W" tone={kind} big />
      </div>

      <Banner kind={kind === "zero" ? "zero" : kind}>
        {kind === "motor" && (
          <>
            <strong>Puissance motrice.</strong> La force fournit <strong>{fmt(P, 1)} J chaque seconde</strong> ({fmt(P / 1000, 3)} kW). Ici la force et la vitesse sont constantes, donc la puissance moyenne est égale à la puissance instantanée.
          </>
        )}
        {kind === "resist" && (
          <>
            <strong>Puissance résistante (P &lt; 0).</strong> La force retire {fmt(-P, 1)} J chaque seconde au solide (α &gt; 90°).
          </>
        )}
        {kind === "zero" && (
          <>
            <strong>Puissance nulle.</strong> {F === 0 ? "Aucune force." : v === 0 ? "Le solide est immobile : aucun travail n'est fourni." : "F est perpendiculaire à la vitesse (α = 90°)."}
          </>
        )}
        <div className="mt-1 font-mono text-xs opacity-90">
          P = F × v × cos α = {fmt(F, 0)} × {fmt(v, 1)} × {fmt(cosA, 3)} = {fmt(P, 1)} W
        </div>
      </Banner>

      <div className="grid gap-4 rounded-xl border border-sky-400/10 bg-ink-900/60 p-3 lg:grid-cols-2">
        <div>
          <LineChart
            title="Travail W(t) : la pente est la puissance"
            xmin={0}
            xmax={TMAX}
            ymin={Math.min(0, Wend) * 1.1}
            ymax={Math.max(0, Wend) * 1.1 + (Wend === 0 ? 10 : 0)}
            xlabel="t (s)"
            ylabel="W (J)"
            series={[
              { pts: lineFull, color: "#4d6aa3", dash: "6 5", width: 2 },
              { pts: lineNow, color: col, width: 3.5 },
            ]}
            markers={[{ x: t, y: P * t, color: col }]}
          />
          <p className="text-center text-xs text-slate-400">Pente = ΔW / Δt = {fmt(P, 1)} J/s = {fmt(P, 1)} W</p>
        </div>
        <div>
          <LineChart
            title="Puissance P selon la vitesse v (F, α fixés)"
            xmin={0}
            xmax={15}
            ymin={Math.min(0, F * 15 * cosA) * 1.1}
            ymax={Math.max(pmax, F * 15 * cosA) * 1.1}
            xlabel="v (m/s)"
            ylabel="P (W)"
            series={[{ pts: pv, color: "#7dd3fc" }]}
            markers={[{ x: v, y: P, color: col }]}
          />
          <p className="text-center text-xs text-slate-400">
            <M>P</M> est proportionnelle à <M>v</M> (et à <M>F</M>) : droite passant par l'origine.
          </p>
        </div>
      </div>
    </SimShell>
  );
}
