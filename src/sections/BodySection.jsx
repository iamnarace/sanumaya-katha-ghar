import { useMemo, useState } from 'react';
import { Tabs } from '../ui.jsx';

const SKIN = '#E2AC84';
const SHADE = '#CF946A';
const HAIR = '#2A1C15';
const SHIRT = '#FFB020';
const SHORTS = '#3FA7F0';

// Each part: visible shapes (drawn in order) + optional bigger invisible tap areas.
const PARTS = {
  arms: { shapes: [
    { t: 'path', d: 'M108 212 L80 312', stroke: SKIN, strokeWidth: 26, strokeLinecap: 'round', fill: 'none' },
    { t: 'path', d: 'M192 212 L220 312', stroke: SKIN, strokeWidth: 26, strokeLinecap: 'round', fill: 'none' },
  ] },
  hands: { shapes: [
    { t: 'circle', cx: 76, cy: 326, r: 18, fill: SKIN },
    { t: 'circle', cx: 224, cy: 326, r: 18, fill: SKIN },
  ] },
  fingers: { shapes: [
    ...[[62, 344], [70, 349], [79, 350], [88, 346]].map(([cx, cy]) => ({ t: 'ellipse', cx, cy, rx: 4.5, ry: 8, fill: SKIN })),
    ...[[212, 346], [221, 350], [230, 349], [238, 344]].map(([cx, cy]) => ({ t: 'ellipse', cx, cy, rx: 4.5, ry: 8, fill: SKIN })),
  ], hit: [{ t: 'ellipse', cx: 75, cy: 348, rx: 22, ry: 11 }, { t: 'ellipse', cx: 225, cy: 348, rx: 22, ry: 11 }] },
  legs: { shapes: [
    { t: 'rect', x: 113, y: 360, width: 32, height: 96, rx: 15, fill: SKIN },
    { t: 'rect', x: 155, y: 360, width: 32, height: 96, rx: 15, fill: SKIN },
  ] },
  knees: { shapes: [
    { t: 'ellipse', cx: 129, cy: 410, rx: 13, ry: 11, fill: SHADE },
    { t: 'ellipse', cx: 171, cy: 410, rx: 13, ry: 11, fill: SHADE },
  ], hit: [{ t: 'circle', cx: 129, cy: 410, r: 18 }, { t: 'circle', cx: 171, cy: 410, r: 18 }] },
  feet: { shapes: [
    { t: 'ellipse', cx: 124, cy: 462, rx: 27, ry: 13, fill: SKIN },
    { t: 'ellipse', cx: 176, cy: 462, rx: 27, ry: 13, fill: SKIN },
    ...[104, 111, 118].map((cx) => ({ t: 'circle', cx, cy: 456, r: 3.5, fill: SHADE })),
    ...[182, 189, 196].map((cx) => ({ t: 'circle', cx, cy: 456, r: 3.5, fill: SHADE })),
  ] },
  shoulders: { shapes: [
    { t: 'ellipse', cx: 110, cy: 206, rx: 20, ry: 15, fill: '#F29F00' },
    { t: 'ellipse', cx: 190, cy: 206, rx: 20, ry: 15, fill: '#F29F00' },
  ] },
  tummy: { shapes: [
    { t: 'ellipse', cx: 150, cy: 292, rx: 36, ry: 30, fill: '#FFC94D' },
    { t: 'circle', cx: 150, cy: 300, r: 3, fill: '#D88A00' },
  ] },
  neck: { shapes: [{ t: 'rect', x: 135, y: 164, width: 30, height: 32, rx: 9, fill: SHADE }] },
  ears: { shapes: [
    { t: 'circle', cx: 84, cy: 112, r: 15, fill: SKIN },
    { t: 'circle', cx: 216, cy: 112, r: 15, fill: SKIN },
  ] },
  head: { shapes: [{ t: 'circle', cx: 150, cy: 108, r: 66, fill: SKIN }] },
  hair: { shapes: [
    { t: 'path', d: 'M86 100 C78 52 116 36 150 36 C188 36 224 54 214 102 C202 78 178 66 150 68 C122 66 98 80 86 100 Z', fill: HAIR },
    { t: 'path', d: 'M146 40 C138 22 152 14 162 22 C154 22 152 30 158 36 Z', fill: HAIR },
  ] },
  eyebrows: { shapes: [
    { t: 'path', d: 'M114 90 Q125 83 136 90', stroke: HAIR, strokeWidth: 5, strokeLinecap: 'round', fill: 'none' },
    { t: 'path', d: 'M164 90 Q175 83 186 90', stroke: HAIR, strokeWidth: 5, strokeLinecap: 'round', fill: 'none' },
  ], hit: [{ t: 'rect', x: 108, y: 78, width: 34, height: 16 }, { t: 'rect', x: 158, y: 78, width: 34, height: 16 }] },
  eyes: { shapes: [
    { t: 'circle', cx: 125, cy: 108, r: 8.5, fill: HAIR },
    { t: 'circle', cx: 175, cy: 108, r: 8.5, fill: HAIR },
    { t: 'circle', cx: 128, cy: 105, r: 2.6, fill: '#fff' },
    { t: 'circle', cx: 178, cy: 105, r: 2.6, fill: '#fff' },
  ], hit: [{ t: 'ellipse', cx: 125, cy: 108, rx: 16, ry: 12 }, { t: 'ellipse', cx: 175, cy: 108, rx: 16, ry: 12 }] },
  cheeks: { shapes: [
    { t: 'circle', cx: 110, cy: 133, r: 12, fill: '#F2858F', opacity: 0.5 },
    { t: 'circle', cx: 190, cy: 133, r: 12, fill: '#F2858F', opacity: 0.5 },
  ], hit: [{ t: 'circle', cx: 110, cy: 133, r: 15 }, { t: 'circle', cx: 190, cy: 133, r: 15 }] },
  nose: { shapes: [{ t: 'ellipse', cx: 150, cy: 124, rx: 7, ry: 5.5, fill: SHADE }], hit: [{ t: 'circle', cx: 150, cy: 123, r: 13 }] },
  mouth: { shapes: [{ t: 'path', d: 'M133 142 Q150 160 167 142 Q150 150 133 142 Z', fill: '#C2414F' }], hit: [{ t: 'ellipse', cx: 150, cy: 148, rx: 22, ry: 12 }] },
};

// Bottom to top, so small face parts sit above the head.
const ORDER = ['arms', 'hands', 'fingers', 'legs', 'knees', 'feet', 'CLOTHES', 'shoulders', 'tummy', 'neck', 'ears', 'head', 'hair', 'eyebrows', 'eyes', 'cheeks', 'nose', 'mouth'];

function Shape({ t, ...props }) {
  const Tag = t;
  return <Tag {...props} />;
}

function Clothes() {
  return (
    <g pointerEvents="none">
      <path d="M100 210 Q102 192 120 190 L180 190 Q198 192 200 210 L206 344 Q150 356 94 344 Z" fill={SHIRT} />
      <path d="M100 210 L88 252 L112 258 Z M200 210 L212 252 L188 258 Z" fill={SHIRT} />
      <path d="M130 190 Q150 206 170 190" fill="none" stroke="#E08A00" strokeWidth="4" strokeLinecap="round" />
      <rect x="106" y="334" width="88" height="44" rx="12" fill={SHORTS} />
      <path d="M150 340 L150 378" stroke="#2B86C8" strokeWidth="3" />
    </g>
  );
}

function highlight(shape) {
  const isLine = shape.fill === 'none';
  return isLine
    ? { ...shape, stroke: '#6A45D8', strokeWidth: (shape.strokeWidth || 4) + 6, opacity: 1 }
    : { ...shape, fill: '#6A45D8', fillOpacity: 0.38, stroke: '#6A45D8', strokeWidth: 5, opacity: 1 };
}

export default function BodySection({ language, bodyParts, celebrate, tryAgain }) {
  const [mode, setMode] = useState('explore');
  const [active, setActive] = useState('nose');
  const [target, setTarget] = useState('nose');
  const [miss, setMiss] = useState(null);
  const byId = useMemo(() => Object.fromEntries(bodyParts.map((p) => [p.id, p])), [bodyParts]);
  const name = (id) => (language === 'ne' ? byId[id].ne : byId[id].en);
  const other = (id) => (language === 'ne' ? byId[id].en : byId[id].ne);

  const newTarget = (current) => {
    const pool = bodyParts.filter((p) => p.id !== current);
    setTarget(pool[Math.floor(Math.random() * pool.length)].id);
  };

  const tap = (id) => {
    if (mode === 'explore') { setActive(id); return; }
    if (id === target) {
      setActive(id);
      celebrate(language === 'ne' ? `${byId[id].ne}! स्याबास!` : `${byId[id].en}! Well done!`);
      setTimeout(() => newTarget(id), 900);
    } else {
      setMiss(id);
      tryAgain();
      setTimeout(() => setMiss(null), 700);
    }
  };

  const shown = mode === 'explore' ? active : miss;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="flex flex-col gap-3">
        <Tabs value={mode} onChange={(m) => { setMode(m); setMiss(null); if (m === 'find') newTarget(target); }} accent="#D2541E" options={[['explore', language === 'ne' ? 'छोएर हेरौँ' : 'Tap and learn', '👆'], ['find', language === 'ne' ? 'खोज्ने खेल' : 'Find it game', '🔍']]} />
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#FFF6EC] to-[#FFE9DE] p-3 shadow-[0_6px_0_rgba(210,84,30,0.12)]">
          {mode === 'find' && (
            <div className="absolute inset-x-3 top-3 z-10 rounded-2xl bg-white/95 px-4 py-3 text-center shadow">
              <p className="font-display text-2xl font-extrabold text-[#D2541E] sm:text-3xl">{language === 'ne' ? `${byId[target].ne} कहाँ छ?` : `Find the ${byId[target].en.toLowerCase()}!`}</p>
            </div>
          )}
          <svg viewBox="0 30 300 460" className="mx-auto block h-[58vh] max-h-[520px] min-h-[360px] w-auto touch-manipulation" role="group" aria-label={language === 'ne' ? 'शरीरको चित्र' : 'Body picture'}>
            {ORDER.map((id) => {
              if (id === 'CLOTHES') return <Clothes key={id} />;
              const part = PARTS[id];
              return (
                <g key={id} role="button" tabIndex={0} aria-label={name(id)} onClick={() => tap(id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') tap(id); }} className="cursor-pointer outline-none">
                  {part.shapes.map((s, i) => <Shape key={i} {...s} />)}
                  {part.hit?.map((s, i) => <Shape key={`h${i}`} {...s} fill="transparent" />)}
                </g>
              );
            })}
            {shown && (
              <g pointerEvents="none" className="part-glow">
                {PARTS[shown].shapes.map((s, i) => <Shape key={i} {...highlight(s)} style={miss ? { stroke: '#9AA0AC', fill: '#9AA0AC' } : undefined} />)}
              </g>
            )}
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {mode === 'explore' && (
          <div className="rounded-[2rem] bg-white p-5 text-center shadow-[0_6px_0_rgba(46,42,79,0.08)]">
            <p className="font-display text-6xl font-extrabold leading-tight text-[#6A45D8] sm:text-7xl">{name(active)}</p>
            <p className="mt-1 text-2xl font-bold text-[var(--ink-soft)]">{other(active)}</p>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-2">
          {bodyParts.map((p) => (
            <button key={p.id} type="button" onClick={() => (mode === 'explore' ? setActive(p.id) : setTarget(p.id))} className={`h-12 rounded-full px-4 text-lg font-extrabold transition-colors ${(mode === 'explore' ? active : target) === p.id ? 'bg-[#6A45D8] text-white' : 'bg-white text-[var(--ink)] shadow-[0_2px_0_rgba(46,42,79,0.08)]'}`}>
              {language === 'ne' ? p.ne : p.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
