import { useRef, useState } from "react";
import { C, fmt, useRaf } from "../lib/phys";
import { Arrow, Ground, Label, VText, Wheel } from "../components/svg";
import { M, Readout, SimControls, SimShell, Slider, SvgBox } from "../components/ui";
import { LineChart } from "../components/LineChart";

const GY = 190;
const VMAX = 30;
const MMAX = 100;

export default function Exp4Kinetic() {
  const [m, setM] = useState(10);
  const [v, setV] = useState(10);
  const [x, setX] = useState(60);
  const [run, setRun] = useState(true);
  const xRef = useRef(60);
  const aRef = useRef(0);
  const [ang, setAng] = useState(0);

  useRaf(run, (dt) => {
    let nx = xRef.current + v * 14 * dt;
    if (nx > 800) nx -= 960;
    xRef.current = nx;
    aRef.current += (v * 14 * dt) / 13;
    setX(nx);
    setAng(aRef.current);
  });

  const reset = () => {
    setRun(false);
    xRef.current = 60;
    aRef.current = 0;
    setX(60);
    setAng(0);
  };

  const Ec = 0.5 * m * v * v;
  const load = 8 + 3.2 * Math.sqrt(m);

  const pv: [number, number][] = [];
  const pv2: [number, number][] = [];
  for (let k = 0; k <= VMAX; k += 0.5) {
    pv.push([k, 0.5 * m * k * k]);
    pv2.push([k, 0.5 * 2 * m * k * k]);
  }
  const pm: [number, number][] = [];
  for (let k = 0; k <= MMAX; k += 2) pm.push([k, 0.5 * k * v * v]);

  return (
    <SimShell n={4} title="Énergie cinétique d'un chariot" goal="Observer comment Ec dépend de la masse (linéairement) et de la vitesse (au carré).">
      <SvgBox viewBox="0 0 760 240">
        <Ground x1={10} x2={750} y={GY} />
        <g transform={`translate(${x} 0)`}>
          <rect x={0} y={GY - 40} width={130} height={14} rx={4} fill="#183463" stroke="#8fb4ff" strokeWidth={2} />
          <rect x={20} y={GY - 40 - load} width={90} height={load} rx={3} fill="#2b4f8f" stroke="#a8c3ff" strokeWidth={1.5} />
          <text x={65} y={GY - 40 - load / 2 + 4} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={600}>
            {fmt(m, 0)} kg
          </text>
          <Wheel cx={26} cy={GY - 13} r={13} angle={ang} />
          <Wheel cx={104} cy={GY - 13} r={13} angle={ang} />
          {v > 0 && <Arrow x1={65} y1={GY - 40 - load - 16} x2={65 + 3.5 * v + 12} y2={GY - 40 - load - 16} color={C.velocity} w={3.5} />}
          {v > 0 && <VText x={65 + 3.5 * v + 30} y={GY - 40 - load - 11} t="v" color={C.velocity} size={17} />}
        </g>
        <Label x={380} y={24} size={13} color="#aab9d8">
          Ec = ½ × {fmt(m, 0)} × {fmt(v, 1)}² = {fmt(Ec, 1)} J
        </Label>
      </SvgBox>

      <SimControls running={run} onToggle={() => setRun(!run)} onReset={reset} />

      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label="Masse" symbol="m" unit="kg" value={m} min={1} max={MMAX} step={1} digits={0} onChange={setM} color="#a78bfa" />
        <Slider label="Vitesse" symbol="v" unit="m/s" value={v} min={0} max={VMAX} step={0.5} onChange={setV} color={C.velocity} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Readout label="Vitesse en km/h" value={fmt(v * 3.6, 1)} unit="km/h" tone="accent" />
        <Readout label={<>Énergie cinétique <M>E<sub>c</sub></M></>} value={fmt(Ec, 1)} unit="J" tone="energy" big />
        <Readout label={<>Masse ×2 : <M>E<sub>c</sub></M> devient</>} value={fmt(2 * Ec, 1)} unit="J (×2)" tone="neutral" />
        <Readout label={<>Vitesse ×2 : <M>E<sub>c</sub></M> devient</>} value={fmt(4 * Ec, 1)} unit="J (×4)" tone="neutral" />
      </div>

      <div className="grid gap-4 rounded-xl border border-sky-400/10 bg-ink-900/60 p-3 lg:grid-cols-2">
        <div>
          <LineChart
            title="Ec en fonction de la vitesse v (m fixée)"
            xmin={0}
            xmax={VMAX}
            ymin={0}
            ymax={0.5 * 2 * m * VMAX * VMAX * 1.03}
            xlabel="v (m/s)"
            ylabel="Ec (J)"
            series={[
              { pts: pv, color: C.energy, width: 3, label: `m = ${fmt(m, 0)} kg` },
              { pts: pv2, color: "#4d6aa3", dash: "6 5", width: 2, label: `2m = ${fmt(2 * m, 0)} kg` },
            ]}
            markers={[{ x: v, y: Ec, color: C.velocity }]}
          />
          <p className="text-center text-xs text-slate-400">Parabole : Ec ∝ v². Doubler v multiplie Ec par 4.</p>
        </div>
        <div>
          <LineChart
            title="Ec en fonction de la masse m (v fixée)"
            xmin={0}
            xmax={MMAX}
            ymin={0}
            ymax={Math.max(0.5 * MMAX * v * v, 1) * 1.05}
            xlabel="m (kg)"
            ylabel="Ec (J)"
            series={[{ pts: pm, color: "#c4b5fd", width: 3 }]}
            markers={[{ x: m, y: Ec, color: C.velocity }]}
          />
          <p className="text-center text-xs text-slate-400">Droite passant par l'origine : Ec ∝ m. Doubler m multiplie Ec par 2.</p>
        </div>
      </div>
    </SimShell>
  );
}
