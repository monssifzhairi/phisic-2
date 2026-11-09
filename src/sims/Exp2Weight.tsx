import { useRef, useState } from "react";
import { C, fmt, useRaf, workKind } from "../lib/phys";
import { Arrow, Ground, Label, MText, VText, ZAxis } from "../components/svg";
import { Banner, M, Readout, Seg, SimControls, SimShell, Slider, SvgBox } from "../components/ui";

type PathKind = "direct" | "detour" | "zigzag";

const SX = (x: number) => 110 + x * 34;
const SZ = (z: number) => 330 - z * 28;

function zOf(kind: PathKind, u: number, zA: number, zB: number): number {
  const lin = zA + (zB - zA) * u;
  if (kind === "direct") return lin;
  if (kind === "zigzag") return Math.max(0, lin + 1.4 * Math.sin(4 * Math.PI * u) * Math.sin(Math.PI * u));
  // détour : passe par un sommet à 11 m au milieu
  const top = 11;
  return u < 0.5 ? zA + (top - zA) * (u / 0.5) : top + (zB - top) * ((u - 0.5) / 0.5);
}

export default function Exp2Weight() {
  const [m, setM] = useState(5);
  const [zA, setZA] = useState(6);
  const [zB, setZB] = useState(2);
  const [Lh, setLh] = useState(8);
  const [g, setG] = useState(9.8);
  const [path, setPath] = useState<PathKind>("direct");
  const [u, setU] = useState(0);
  const [run, setRun] = useState(false);
  const uRef = useRef(0);

  useRaf(run, (dt) => {
    const n = Math.min(1, uRef.current + dt * 0.22);
    uRef.current = n;
    setU(n);
    if (n >= 1) setRun(false);
  });

  const P = m * g;
  const W = m * g * (zA - zB);
  const kind = workKind(W);
  const z = zOf(path, u, zA, zB);
  const x = Lh * u;
  const Wlive = m * g * (zA - z);

  const toggle = () => {
    if (!run && u >= 1) {
      uRef.current = 0;
      setU(0);
    }
    setRun(!run);
  };
  const reset = () => {
    setRun(false);
    uRef.current = 0;
    setU(0);
  };

  const pathPts = Array.from({ length: 81 }, (_, i) => {
    const t = i / 80;
    return `${i === 0 ? "M" : "L"}${SX(Lh * t).toFixed(1)},${SZ(zOf(path, t, zA, zB)).toFixed(1)}`;
  }).join(" ");

  const bx = SX(x);
  const by = SZ(z);
  const wl = 16 + P * 0.3;
  const xr = 720;

  const ticks = [0, 2, 4, 6, 8, 10];

  return (
    <SimShell n={2} title="Travail du poids" goal="Modifier les hauteurs initiale et finale (et le chemin suivi) pour voir que W(P) ne dépend que de zA − zB.">
      <SvgBox viewBox="0 0 760 400">
        <Ground x1={70} x2={740} y={SZ(0)} />
        <ZAxis x={70} y0={SZ(0)} y1={SZ(11)} label="z (m)" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={66} y1={SZ(t)} x2={74} y2={SZ(t)} stroke="#8fa6d4" />
            <text x={60} y={SZ(t) + 4} fill={C.mute} fontSize={11} textAnchor="end">
              {t}
            </text>
          </g>
        ))}
        {/* niveaux zA et zB */}
        <line x1={70} y1={SZ(zA)} x2={xr} y2={SZ(zA)} stroke={C.disp} strokeDasharray="6 5" opacity={0.6} />
        <line x1={70} y1={SZ(zB)} x2={xr} y2={SZ(zB)} stroke={C.force} strokeDasharray="6 5" opacity={0.6} />
        <MText x={xr - 4} y={SZ(zA) - 7} t="z" sub="A" color={C.disp} size={15} anchor="end" />
        <MText x={xr - 4} y={SZ(zB) + (zA === zB ? -7 : 17)} t="z" sub="B" color={C.force} size={15} anchor="end" />
        {/* trajectoire */}
        <path d={pathPts} fill="none" stroke="#6f8fd0" strokeWidth={2} strokeDasharray="2 5" />
        {/* déplacement AB */}
        <Arrow x1={SX(0)} y1={SZ(zA)} x2={SX(Lh)} y2={SZ(zB)} color={C.disp} w={2} dash="7 5" opacity={0.7} />
        {/* Δz */}
        {Math.abs(zB - zA) > 0.01 && (
          <>
            <Arrow x1={xr - 40} y1={SZ(zA)} x2={xr - 40} y2={SZ(zB)} color={C.velocity} w={2.5} />
            <MText x={xr - 48} y={(SZ(zA) + SZ(zB)) / 2 + 5} t={`Δz = ${fmt(zB - zA, 1)} m`} color={C.velocity} size={14} anchor="end" />
          </>
        )}
        {/* points A et B */}
        <circle cx={SX(0)} cy={SZ(zA)} r={5} fill={C.disp} />
        <Label x={SX(0) - 14} y={SZ(zA) - 10} color={C.disp} weight={700} size={14}>A</Label>
        <circle cx={SX(Lh)} cy={SZ(zB)} r={5} fill={C.force} />
        <Label x={SX(Lh) + 14} y={SZ(zB) - 10} color={C.force} weight={700} size={14}>B</Label>
        {/* objet */}
        <Arrow x1={bx} y1={by} x2={bx} y2={by + wl} color={C.weight} w={4} />
        <VText x={bx + 18} y={by + wl - 2} t="P" color={C.weight} size={18} />
        <circle cx={bx} cy={by} r={13} fill="#183463" stroke="#a8c3ff" strokeWidth={2.5} />
        <text x={bx} y={by + 4} textAnchor="middle" fill="#dbe7ff" fontSize={11} fontWeight={600}>
          m
        </text>
        <Label x={410} y={24} size={13} color="#aab9d8">
          hauteur actuelle z = {fmt(z, 2)} m — travail du poids déjà fourni : {fmt(Wlive, 1)} J
        </Label>
      </SvgBox>

      <SimControls running={run} onToggle={toggle} onReset={reset}>
        <Seg
          value={path}
          onChange={(p) => {
            setPath(p);
            reset();
          }}
          options={[
            { v: "direct", l: "Direct" },
            { v: "zigzag", l: "Sinueux" },
            { v: "detour", l: "Par un sommet" },
          ]}
        />
        <Seg value={g} onChange={setG} options={[{ v: 9.8, l: "g = 9,8" }, { v: 10, l: "g = 10" }]} />
      </SimControls>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Slider label="Masse" symbol="m" unit="kg" value={m} min={1} max={20} step={0.5} onChange={setM} color={C.weight} />
        <Slider label="Altitude initiale" symbol={<>z<sub>A</sub></>} unit="m" value={zA} min={0} max={10} step={0.5} onChange={setZA} color={C.disp} />
        <Slider label="Altitude finale" symbol={<>z<sub>B</sub></>} unit="m" value={zB} min={0} max={10} step={0.5} onChange={setZB} color={C.force} />
        <Slider label="Distance horizontale" symbol="AB" unit="m" value={Lh} min={0} max={15} step={0.5} onChange={setLh} color="#94a3b8" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Readout label={<>Poids <M>P = m·g</M></>} value={fmt(P, 1)} unit="N" tone="accent" />
        <Readout label={<>Dénivelé <M>z<sub>A</sub> − z<sub>B</sub></M></>} value={fmt(zA - zB, 1)} unit="m" tone="neutral" />
        <Readout label={<>Travail total <M>W(P)</M></>} value={fmt(W, 1)} unit="J" tone={kind} big />
        <Readout label="Travail en direct" value={fmt(Wlive, 1)} unit="J" tone={kind} />
      </div>

      <Banner kind={kind}>
        {kind === "motor" && (
          <>
            <strong>Descente : travail moteur.</strong> Le poids est dirigé vers le bas et le solide descend (z<sub>B</sub> &lt; z<sub>A</sub>) : <M>W = m·g·(z<sub>A</sub> − z<sub>B</sub>) &gt; 0</M>.
          </>
        )}
        {kind === "resist" && (
          <>
            <strong>Montée : travail résistant.</strong> Le poids s'oppose à la montée (z<sub>B</sub> &gt; z<sub>A</sub>) : <M>W = m·g·(z<sub>A</sub> − z<sub>B</sub>) &lt; 0</M>.
          </>
        )}
        {kind === "zero" && (
          <>
            <strong>Travail nul.</strong> z<sub>A</sub> = z<sub>B</sub> : le déplacement est horizontal (ou la trajectoire revient à la même altitude) ; le poids, vertical, est perpendiculaire au déplacement.
          </>
        )}
        <div className="mt-1 font-mono text-xs opacity-90">
          W(P) = m × g × (zA − zB) = {fmt(m, 1)} × {fmt(g, 1)} × ({fmt(zA, 1)} − {fmt(zB, 1)}) = {fmt(W, 1)} J
        </div>
        <div className="mt-1 text-xs opacity-80">
          Change de chemin : le travail final reste identique, car il ne dépend que de l'altitude de départ et d'arrivée (axe z orienté vers le haut).
        </div>
      </Banner>
    </SimShell>
  );
}
