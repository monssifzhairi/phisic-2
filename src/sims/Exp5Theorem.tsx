import { useRef, useState } from "react";
import { C, cosd, fmt, niceTicks, short, sind, useRaf } from "../lib/phys";
import { Arrow, Label, MText, VText } from "../components/svg";
import { Banner, M, Readout, Seg, SimControls, SimShell, Slider, SvgBox } from "../components/ui";

const G = 9.8;
const SC = 26;
const KF = 0.6; // px par newton (échelle commune des forces)
const OX = 60;
const OY = 335;
const BW = 54;
const BH = 36;

export default function Exp5Theorem() {
  const [m, setM] = useState(4);
  const [vi, setVi] = useState(6);
  const [F, setF] = useState(30);
  const [a, setA] = useState(20);
  const [f, setFr] = useState(10);
  const [th, setTh] = useState(0);
  const [d, setD] = useState(10);
  const [speed, setSpeed] = useState(0.5);
  const [s, setS] = useState(0);
  const [run, setRun] = useState(false);
  const tRef = useRef(0);

  const Fx = F * cosd(a);
  const Fy = F * sind(a);
  const wAlong = m * G * sind(th); // composante du poids le long du plan (opposée au mouvement)
  const Fnet = Fx - f - wAlong;
  const acc = Fnet / m;
  const N = m * G * cosd(th) - Fy;
  const EcA = 0.5 * m * vi * vi;

  // distance réellement parcourue D (le solide peut s'arrêter avant B)
  let D = d;
  let stopped = false;
  if (Fnet < 0) {
    const sStop = EcA / -Fnet;
    if (sStop < d) {
      D = sStop;
      stopped = true;
    }
  } else if (Fnet === 0 && vi === 0) D = 0;
  const lift = N < 0;

  // durée du mouvement
  let tEnd = 0;
  if (D > 0) {
    if (Math.abs(acc) < 1e-9) tEnd = vi > 0 ? D / vi : 0;
    else tEnd = (-vi + Math.sqrt(Math.max(0, vi * vi + 2 * acc * D))) / acc;
  }

  const sc = Math.min(s, D);
  const calc = (sv: number) => {
    const Wp = -wAlong * sv;
    const WR = 0;
    const WF = Fx * sv;
    const Wf = -f * sv;
    const sum = Wp + WR + WF + Wf;
    const v = Math.sqrt(Math.max(0, vi * vi + (2 * Fnet * sv) / m));
    const Ec = 0.5 * m * v * v;
    return { Wp, WR, WF, Wf, sum, v, Ec, dEc: Ec - EcA };
  };
  const fin = calc(D);
  const live = calc(sc);
  const okFinal = Math.abs(fin.dEc - fin.sum) < 1e-6;

  useRaf(run, (dt) => {
    tRef.current = Math.min(tEnd, tRef.current + dt * speed);
    const t = tRef.current;
    const sv = Math.min(D, vi * t + 0.5 * acc * t * t);
    setS(Math.max(0, sv));
    if (t >= tEnd) setRun(false);
  });

  const reset = () => {
    setRun(false);
    tRef.current = 0;
    setS(0);
  };
  const toggle = () => {
    if (lift || D === 0) return;
    if (!run && tRef.current >= tEnd) {
      tRef.current = 0;
      setS(0);
    }
    setRun(!run);
  };
  // toute modification des paramètres relance l'expérience proprement
  const upd = (fn: (v: number) => void) => (v: number) => {
    fn(v);
    reset();
  };

  /* ---------- scène ---------- */
  const xc = 20 + sc * SC;
  const cy = -BH / 2;
  const Fl = KF * F;
  const Ll = KF * m * G;
  const Rl = KF * Math.max(N, 0);
  const fl = KF * f;
  const planeStart = th > 0 ? 0 : -40;
  const hatch = [];
  for (let x = planeStart; x <= 20 + d * SC + 100; x += 14) hatch.push(<line key={x} x1={x} y1={0} x2={x - 11} y2={11} stroke="#2a4274" strokeWidth={1.2} />);

  /* ---------- graphique en cascade ---------- */
  const W = 460;
  const H = 300;
  const L = 56;
  const R = 14;
  const T = 38;
  const B = 44;
  const ymax = Math.max(EcA, fin.Ec, EcA + Math.max(fin.sum, 0), live.Ec, 1) * 1.18;
  const py = (y: number) => H - B - (y / ymax) * (H - T - B);
  const bw = 78;
  const bxs = [L + 28, L + 28 + (W - L - R - 56 - bw) / 2, W - R - 28 - bw];
  const bar = (x: number, y0: number, y1: number, color: string, val: string) => {
    const top = Math.min(py(y0), py(y1));
    const hgt = Math.max(Math.abs(py(y0) - py(y1)), 1.5);
    return (
      <g>
        <rect x={x} y={top} width={bw} height={hgt} rx={3} fill={color} opacity={0.88} />
        <MText x={x + bw / 2} y={top - 7} t={val} color="#e2e8f0" size={13} />
      </g>
    );
  };
  const sumColor = live.sum > 1e-9 ? C.motor : live.sum < -1e-9 ? C.resist : C.zero;

  const row = (label: React.ReactNode, expr: string, fv: number, lv: number, color?: string) => (
    <tr className="border-t border-sky-400/10">
      <td className="px-2 py-1.5">{label}</td>
      <td className="px-2 py-1.5 font-mono text-[11px] text-slate-400">{expr}</td>
      <td className="px-2 py-1.5 text-right font-mono tabular-nums" style={{ color }}>
        {fmt(fv, 1)}
      </td>
      <td className="px-2 py-1.5 text-right font-mono tabular-nums" style={{ color }}>
        {fmt(lv, 1)}
      </td>
    </tr>
  );

  return (
    <SimShell n={5} title="Théorème de l'énergie cinétique" goal="Appliquer des forces, calculer chaque travail et vérifier que ΔEc = ΣW(forces extérieures) à chaque instant.">
      <SvgBox viewBox="0 0 760 380">
        {/* sol */}
        <line x1={10} y1={OY} x2={750} y2={OY} stroke="#3a548c" strokeWidth={1.5} />
        {th > 0 && (
          <>
            <polygon
              points={`${OX},${OY} ${OX + (20 + d * SC + 60) * cosd(th)},${OY} ${OX + (20 + d * SC + 60) * cosd(th)},${OY - (20 + d * SC + 60) * sind(th)}`}
              fill="#0f1d3b"
              stroke="none"
              opacity={0.9}
            />
            <MText x={OX + 62} y={OY - 6} t="θ" color={C.velocity} size={16} />
            <path d={`M${OX + 52},${OY} A52,52 0 0 0 ${OX + 52 * cosd(th)},${OY - 52 * sind(th)}`} stroke={C.velocity} strokeWidth={1.8} fill="none" />
          </>
        )}
        <g transform={`translate(${OX} ${OY}) rotate(${-th})`}>
          <line x1={planeStart} y1={0} x2={20 + d * SC + 100} y2={0} stroke="#6f8fd0" strokeWidth={2.4} />
          {hatch}
          {/* repères A, B (et point d'arrêt) */}
          <line x1={20} y1={4} x2={20} y2={-BH - 8} stroke={C.mute} strokeDasharray="3 4" />
          <line x1={20 + d * SC} y1={4} x2={20 + d * SC} y2={-BH - 8} stroke={C.mute} strokeDasharray="3 4" />
          <Label x={20} y={26} color={C.disp} weight={700}>A</Label>
          <Label x={20 + d * SC} y={26} color={C.disp} weight={700}>B</Label>
          {stopped && (
            <>
              <line x1={20 + D * SC} y1={4} x2={20 + D * SC} y2={-BH - 8} stroke={C.resist} strokeDasharray="3 4" />
              <Label x={20 + D * SC} y={40} color={C.resist} size={11}>arrêt</Label>
            </>
          )}
          {/* bloc */}
          <rect x={xc - BW / 2} y={-BH} width={BW} height={BH} rx={5} fill="#183463" stroke="#8fb4ff" strokeWidth={2} />
          <text x={xc} y={-BH / 2 + 5} textAnchor="middle" fill="#dbe7ff" fontSize={12} fontWeight={600}>
            {fmt(m, 0)} kg
          </text>
          {/* vitesse */}
          {live.v > 0.05 && <Arrow x1={xc} y1={-BH - 14} x2={xc + 4.5 * live.v + 8} y2={-BH - 14} color={C.velocity} w={3} />}
          {live.v > 0.05 && <VText x={xc + 4.5 * live.v + 24} y={-BH - 9} t="v" color={C.velocity} size={15} />}
          {/* réaction normale */}
          {Rl > 3 && <Arrow x1={xc + 10} y1={-2} x2={xc + 10} y2={-2 - Rl} color={C.reaction} w={3} />}
          {Rl > 3 && <VText x={xc + 24} y={-Rl + 6} t="R" color={C.reaction} size={14} />}
          {/* poids (vertical dans le repère terrestre) */}
          <g transform={`translate(${xc - 10} ${cy}) rotate(${th})`}>
            <Arrow x1={0} y1={0} x2={0} y2={Ll} color={C.weight} w={3} />
            <VText x={-14} y={Ll} t="P" color={C.weight} size={14} />
          </g>
          {/* frottement */}
          {f > 0 && <Arrow x1={xc - BW / 2} y1={-5} x2={xc - BW / 2 - fl} y2={-5} color={C.friction} w={3} />}
          {f > 0 && <VText x={xc - BW / 2 - fl / 2} y={-14} t="f" color={C.friction} size={14} />}
          {/* force appliquée */}
          {F > 0 && <Arrow x1={xc} y1={cy} x2={xc + Fl * cosd(a)} y2={cy - Fl * sind(a)} color={C.force} w={3.5} />}
          {F > 0 && <VText x={xc + Fl * cosd(a) + 14} y={cy - Fl * sind(a) - 6} t="F" color={C.force} size={15} />}
          <circle cx={xc} cy={cy} r={3.5} fill="#fff" />
        </g>
        <Label x={380} y={22} size={13} color="#aab9d8">
          position s = {fmt(sc, 2)} m — vitesse v = {fmt(live.v, 2)} m/s
        </Label>
        {lift && (
          <Label x={380} y={46} size={13} color="#fbbf24" weight={700}>
            Force verticale trop grande : le solide décollerait (R &lt; 0). Diminue F ou α.
          </Label>
        )}
      </SvgBox>

      <SimControls running={run} onToggle={toggle} onReset={reset}>
        <span className="text-xs text-slate-400">Vitesse de lecture :</span>
        <Seg value={speed} onChange={setSpeed} options={[{ v: 0.25, l: "×0,25" }, { v: 0.5, l: "×0,5" }, { v: 1, l: "×1" }]} />
      </SimControls>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Slider label="Masse" symbol="m" unit="kg" value={m} min={1} max={20} step={0.5} onChange={upd(setM)} color="#a78bfa" />
        <Slider label="Vitesse initiale" symbol={<>v<sub>A</sub></>} unit="m/s" value={vi} min={0} max={15} step={0.5} onChange={upd(setVi)} color={C.velocity} />
        <Slider label="Distance AB" symbol="d" unit="m" value={d} min={1} max={20} step={0.5} onChange={upd(setD)} color={C.disp} />
        <Slider label="Inclinaison du plan" symbol="θ" unit="°" value={th} min={0} max={30} step={1} digits={0} onChange={upd(setTh)} color="#94a3b8" />
        <Slider label="Force appliquée" symbol="F" unit="N" value={F} min={0} max={100} step={1} digits={0} onChange={upd(setF)} color={C.force} />
        <Slider label="Angle de F avec le déplacement" symbol="α" unit="°" value={a} min={0} max={90} step={1} digits={0} onChange={upd(setA)} color="#f472b6" />
        <Slider label="Frottement (constant)" symbol="f" unit="N" value={f} min={0} max={50} step={1} digits={0} onChange={upd(setFr)} color={C.friction} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-x-auto rounded-xl border border-sky-400/15 bg-ink-900/70 p-2">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-2 py-1.5 text-left">Force</th>
                <th className="px-2 py-1.5 text-left">Travail</th>
                <th className="px-2 py-1.5 text-right">A → B (J)</th>
                <th className="px-2 py-1.5 text-right">En direct (J)</th>
              </tr>
            </thead>
            <tbody>
              {row(<><M>P</M> poids</>, "−m·g·sinθ·s", fin.Wp, live.Wp, C.weight)}
              {row(<><M>R</M> réaction</>, "R ⟂ déplacement → 0", fin.WR, live.WR, C.reaction)}
              {row(<><M>F</M> appliquée</>, "F·s·cos α", fin.WF, live.WF, C.force)}
              {row(<><M>f</M> frottement</>, "−f·s", fin.Wf, live.Wf, C.friction)}
              <tr className="border-t-2 border-sky-400/30 bg-sky-400/5 font-semibold">
                <td className="px-2 py-1.5">ΣW</td>
                <td className="px-2 py-1.5 font-mono text-[11px] text-slate-400">somme des travaux</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-white">{fmt(fin.sum, 1)}</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-white">{fmt(live.sum, 1)}</td>
              </tr>
              <tr className="border-t border-sky-400/10">
                <td className="px-2 py-1.5">
                  <M>E<sub>c</sub>(A)</M>
                </td>
                <td className="px-2 py-1.5 font-mono text-[11px] text-slate-400">½·m·v<sub>A</sub>²</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-cyan-300">{fmt(EcA, 1)}</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-cyan-300">{fmt(EcA, 1)}</td>
              </tr>
              <tr className="border-t border-sky-400/10">
                <td className="px-2 py-1.5">
                  <M>E<sub>c</sub>(B)</M>
                </td>
                <td className="px-2 py-1.5 font-mono text-[11px] text-slate-400">½·m·v²</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-cyan-300">{fmt(fin.Ec, 1)}</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-cyan-300">{fmt(live.Ec, 1)}</td>
              </tr>
              <tr className="border-t-2 border-sky-400/30 bg-cyan-400/5 font-semibold">
                <td className="px-2 py-1.5">
                  Δ<M>E<sub>c</sub></M>
                </td>
                <td className="px-2 py-1.5 font-mono text-[11px] text-slate-400">Ec(B) − Ec(A)</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-white">{fmt(fin.dEc, 1)}</td>
                <td className="px-2 py-1.5 text-right font-mono tabular-nums text-white">{fmt(live.dEc, 1)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-sky-400/15 bg-ink-900/70 p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Bilan énergétique en cascade">
            <text x={W / 2} y={18} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
              Bilan énergétique : Ec(A) + ΣW = Ec(B)
            </text>
            {niceTicks(0, ymax, 4).map((v) => (
              <g key={v}>
                <line x1={L} y1={py(v)} x2={W - R} y2={py(v)} stroke={v === 0 ? "#4a6498" : C.grid} />
                <text x={L - 6} y={py(v) + 4} fill={C.mute} fontSize={11} textAnchor="end">
                  {short(v)}
                </text>
              </g>
            ))}
            <text transform={`translate(13 ${(T + H - B) / 2}) rotate(-90)`} fill="#aab9d8" fontSize={12} textAnchor="middle">
              énergie (J)
            </text>
            {bar(bxs[0], 0, EcA, "#3b82f6", fmt(EcA, 1))}
            {bar(bxs[1], EcA, EcA + live.sum, sumColor, (live.sum > 0 ? "+" : "") + fmt(live.sum, 1))}
            {bar(bxs[2], 0, live.Ec, C.energy, fmt(live.Ec, 1))}
            <line x1={bxs[0] + bw} y1={py(EcA)} x2={bxs[1]} y2={py(EcA)} stroke={C.mute} strokeDasharray="3 3" />
            <line x1={bxs[1] + bw} y1={py(EcA + live.sum)} x2={bxs[2]} y2={py(EcA + live.sum)} stroke={C.mute} strokeDasharray="3 3" />
            <text x={bxs[0] + bw / 2} y={H - B + 18} fill="#cbd5e1" fontSize={12} textAnchor="middle">
              Ec(A)
            </text>
            <text x={bxs[1] + bw / 2} y={H - B + 18} fill="#cbd5e1" fontSize={12} textAnchor="middle">
              ΣW (en direct)
            </text>
            <text x={bxs[2] + bw / 2} y={H - B + 18} fill="#cbd5e1" fontSize={12} textAnchor="middle">
              Ec (en direct)
            </text>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Readout label={<>Force résultante (axe du mouvement)</>} value={fmt(Fnet, 2)} unit="N" tone={Fnet > 0 ? "motor" : Fnet < 0 ? "resist" : "zero"} />
        <Readout label="Réaction normale R" value={fmt(N, 1)} unit="N" tone={lift ? "resist" : "accent"} />
        <Readout label={<>Vitesse finale <M>v<sub>B</sub></M></>} value={fmt(fin.v, 2)} unit="m/s" tone="energy" />
        <Readout label="Distance réellement parcourue" value={fmt(D, 2)} unit="m" tone={stopped ? "resist" : "accent"} />
      </div>

      <Banner kind={okFinal ? "motor" : "resist"}>
        <strong>Vérification du théorème :</strong> Δ<M>E<sub>c</sub></M> = {fmt(fin.dEc, 2)} J et ΣW = {fmt(fin.sum, 2)} J → écart = {fmt(fin.dEc - fin.sum, 6)} J {okFinal ? "✓ Le théorème est vérifié." : "✗"}
        <div className="mt-1 text-xs opacity-90">
          {stopped && D > 0 && <>Le solide s'arrête après {fmt(D, 2)} m, avant d'atteindre B : le travail résistant a épuisé toute son énergie cinétique (Ec = 0). </>}
          {stopped && D === 0 && <>Le solide ne démarre pas : il n'a aucune énergie cinétique et la résultante des forces le long du mouvement est résistante. </>}
          {D === 0 && !stopped && Fnet === 0 && <>Les forces se compensent exactement le long du déplacement et le solide part du repos : il reste immobile. </>}
          {!stopped && D > 0 && fin.sum > 0 && <>ΣW &gt; 0 : l'énergie cinétique augmente, le solide accélère. </>}
          {!stopped && D > 0 && fin.sum < 0 && <>ΣW &lt; 0 : l'énergie cinétique diminue, le solide ralentit. </>}
          {!stopped && D > 0 && fin.sum === 0 && <>ΣW = 0 : l'énergie cinétique est conservée, la vitesse est constante. </>}
          Les travaux de <M>P</M> (si θ = 0) et de <M>R</M> sont nuls car ces forces sont perpendiculaires au déplacement. Référentiel terrestre supposé galiléen, g = 9,8 N/kg.
        </div>
      </Banner>
    </SimShell>
  );
}
