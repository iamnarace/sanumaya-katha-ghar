import { useState } from 'react';
import { Tabs, Viewer } from '../ui.jsx';

export function ShapeArt({ id, colour, className = '' }) {
  const p = { fill: colour, stroke: 'rgba(0,0,0,0.12)', strokeWidth: 3 };
  const shapes = {
    circle: <circle cx="50" cy="50" r="40" {...p} />,
    square: <rect x="12" y="12" width="76" height="76" rx="6" {...p} />,
    triangle: <path d="M50 10 L92 86 L8 86 Z" strokeLinejoin="round" {...p} />,
    rectangle: <rect x="6" y="24" width="88" height="52" rx="6" {...p} />,
    star: <path d="M50 6 L62 37 L95 38 L69 58 L78 90 L50 71 L22 90 L31 58 L5 38 L38 37 Z" strokeLinejoin="round" {...p} />,
    heart: <path d="M50 88 C20 66 6 50 6 32 C6 18 17 8 30 8 C40 8 46 14 50 22 C54 14 60 8 70 8 C83 8 94 18 94 32 C94 50 80 66 50 88 Z" {...p} />,
    oval: <ellipse cx="50" cy="50" rx="44" ry="30" {...p} />,
    diamond: <path d="M50 6 L90 50 L50 94 L10 50 Z" strokeLinejoin="round" {...p} />,
  };
  return <svg viewBox="0 0 100 100" className={className} aria-hidden="true">{shapes[id]}</svg>;
}

// Soft paint-splash shape so colours feel like paint, not swatches.
function Blob({ hex, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 6 C66 4 82 12 90 26 C98 40 96 58 90 70 C82 86 64 96 48 94 C32 92 14 84 8 68 C2 52 6 34 16 22 C24 12 36 7 50 6 Z" fill={hex} stroke={hex === '#FFFFFF' ? '#E4E0F0' : 'rgba(0,0,0,0.08)'} strokeWidth="2.5" />
      <ellipse cx="34" cy="30" rx="11" ry="7" fill="#fff" opacity="0.35" transform="rotate(-30 34 30)" />
    </svg>
  );
}

export default function ColoursSection({ language, colours, shapes }) {
  const [tab, setTab] = useState('colours');
  const [open, setOpen] = useState(null);
  const items = tab === 'colours' ? colours : shapes;
  const nameOf = (item) => (language === 'ne' ? item.ne : item.en);
  const otherOf = (item) => (language === 'ne' ? item.en : item.ne);

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={tab} onChange={(t) => { setTab(t); setOpen(null); }} accent="#D93A5B" options={[['colours', language === 'ne' ? 'रङ' : 'Colours', '🎨'], ['shapes', language === 'ne' ? 'आकार' : 'Shapes', '🔺']]} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button key={item.id} type="button" onClick={() => setOpen(i)} className="tile flex flex-col items-center rounded-[1.8rem] bg-white px-3 pb-4 pt-4" style={{ '--edge': 'rgba(46,42,79,0.1)' }}>
            {tab === 'colours' ? <Blob hex={item.hex} className="h-28 w-28" /> : <ShapeArt id={item.id} colour={item.colour} className="h-28 w-28" />}
            <span className="mt-2 font-display text-3xl font-extrabold text-[var(--ink)]">{nameOf(item)}</span>
            <span className="text-base font-bold text-[var(--ink-soft)]">{otherOf(item)}</span>
          </button>
        ))}
      </div>
      <Viewer items={items} index={open} setIndex={setOpen} onClose={() => setOpen(null)} language={language} label={tab}
        tint={tab === 'colours' ? '#FBF9FF' : '#F6F3FF'}
        render={(item) => (
          <div className="flex w-full flex-col items-center gap-4">
            {tab === 'colours' ? <Blob hex={item.hex} className="h-[38vh] max-h-72 w-auto" /> : <ShapeArt id={item.id} colour={item.colour} className="h-[38vh] max-h-72 w-auto" />}
            <p className="font-display text-6xl font-extrabold" style={{ color: tab === 'colours' && item.id !== 'white' ? item.hex : tab === 'shapes' ? item.colour : 'var(--ink)' }}>{nameOf(item)}</p>
            <p className="text-2xl font-bold text-[var(--ink-soft)]">{otherOf(item)}</p>
            <div className="flex gap-3">{item.things.map((t) => <span key={t} className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-5xl shadow-[0_4px_0_rgba(46,42,79,0.08)]">{t}</span>)}</div>
          </div>
        )} />
    </div>
  );
}
