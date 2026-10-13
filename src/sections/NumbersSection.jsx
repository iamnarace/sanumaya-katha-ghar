import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Tabs, Viewer, num, toNe } from '../ui.jsx';

const ACCENT = '#C97800';

function Objects({ item, counted, onCount, size = 'text-4xl sm:text-5xl' }) {
  // Rows of five, like a ten-frame, so bigger numbers are easy to see.
  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
      {Array.from({ length: item.n }, (_, i) => (
        <button key={i} type="button" onClick={(e) => { e.stopPropagation(); onCount?.(i); }} className={`grid aspect-square place-items-center rounded-2xl transition-transform ${counted?.has(i) ? 'scale-90 bg-white/90 ring-4 ring-[#FFB020]' : 'bg-white/50'} ${size}`}>
          <span className="leading-none">{item.object}</span>
        </button>
      ))}
    </div>
  );
}

function CountCard({ item, language }) {
  const [counted, setCounted] = useState(() => new Set());
  const count = (i) => setCounted((prev) => { const next = new Set(prev); next.add(i); return next; });
  const done = counted.size;
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex items-end gap-4">
        <span className="font-display text-[8rem] font-extrabold leading-[0.85] text-[#C97800] sm:text-[10rem]">{num(item.n, language)}</span>
        <span className="pb-3 font-display text-4xl font-extrabold text-[var(--ink-soft)]">{language === 'ne' ? item.n : toNe(item.n)}</span>
      </div>
      <p className="font-display text-4xl font-extrabold text-[var(--ink)]">{language === 'ne' ? item.ne : item.en}</p>
      <p className="text-lg font-bold text-[var(--ink-soft)]">{language === 'ne' ? item.en : item.ne}</p>
      <div className="w-full max-w-sm"><Objects item={item} counted={counted} onCount={count} /></div>
      <p className="h-8 text-xl font-extrabold text-[#C97800]">
        {done === 0 ? (language === 'ne' ? 'छोएर गनौँ!' : 'Tap to count!') : done === item.n ? (language === 'ne' ? `${item.ne}! स्याबास!` : `${item.en}! Well done!`) : num(done, language)}
      </p>
    </div>
  );
}

function NumberGrid({ items, language, onOpen }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item, i) => (
        <button key={item.n} type="button" onClick={() => onOpen(i)} className="tile flex flex-col items-center gap-1 rounded-[1.8rem] bg-[#FFF3D6] px-3 pb-4 pt-3" style={{ '--edge': '#F4CE7A' }}>
          <span className="font-display text-7xl font-extrabold leading-none text-[#C97800]">{num(item.n, language)}</span>
          <span className="text-xl font-extrabold text-[var(--ink)]">{language === 'ne' ? item.ne : item.en}</span>
          <span className={`mt-2 grid gap-1 ${item.n > 10 ? 'grid-cols-10' : 'grid-cols-5'}`} aria-hidden="true">
            {Array.from({ length: item.n }, (_, d) => <span key={d} className="h-2.5 w-2.5 rounded-full bg-[#F29A0E]" />)}
          </span>
        </button>
      ))}
    </div>
  );
}

export function Tables({ language }) {
  const [table, setTable] = useState(2);
  const [hide, setHide] = useState(false);
  const [shown, setShown] = useState(() => new Set());
  const [row, setRow] = useState(null);
  const n = (v) => num(v, language);
  const pick = (t) => { setTable(t); setShown(new Set()); setRow(null); };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((t) => (
          <button key={t} type="button" onClick={() => pick(t)} aria-pressed={table === t} className={`h-14 rounded-2xl font-display text-2xl font-extrabold ${table === t ? 'bg-[#C97800] text-white shadow-[0_4px_0_#8E5500]' : 'bg-white text-[var(--ink)] shadow-[0_3px_0_rgba(46,42,79,0.1)]'}`}>{n(t)}</button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? `${n(table)} को पहाडा` : `${table} times table`}</h2>
        <button type="button" onClick={() => { setHide((h) => !h); setShown(new Set()); }} className="flex h-12 items-center gap-2 rounded-full bg-white px-4 font-extrabold text-[var(--ink-soft)] shadow-[0_3px_0_rgba(46,42,79,0.1)]">
          {hide ? <Eye size={20} /> : <EyeOff size={20} />}{hide ? (language === 'ne' ? 'उत्तर देखाऊ' : 'Show answers') : (language === 'ne' ? 'अभ्यास गरौँ' : 'Practise')}
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((m) => {
          const visible = !hide || shown.has(m);
          return (
            <button key={m} type="button" onClick={() => { if (hide && !shown.has(m)) setShown((s) => new Set(s).add(m)); else setRow(row === m ? null : m); }} className={`flex items-center justify-between rounded-2xl px-5 py-3 text-left font-display text-3xl font-extrabold shadow-[0_3px_0_rgba(46,42,79,0.08)] ${row === m ? 'bg-[#FFF3D6] ring-4 ring-[#F4CE7A]' : 'bg-white'}`}>
              <span className="text-[var(--ink)]">{n(table)} × {n(m)}</span>
              <span className={visible ? 'text-[#C97800]' : 'text-slate-300'}>= {visible ? n(table * m) : '?'}</span>
            </button>
          );
        })}
      </div>
      {row && (
        <div className="rounded-[1.8rem] bg-white p-4 shadow-[0_6px_0_rgba(46,42,79,0.08)]">
          <p className="mb-3 text-center text-lg font-bold text-[var(--ink-soft)]">
            {language === 'ne' ? `${n(table)} वटाको ${n(row)} समूह = ${n(table * row)}` : `${row} groups of ${table} = ${table * row}`}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: row }, (_, g) => (
              <div key={g} className="flex max-w-[7.5rem] flex-wrap justify-center gap-1 rounded-xl bg-[#FFF3D6] p-2">
                {Array.from({ length: table }, (_, d) => <span key={d} className="h-3.5 w-3.5 rounded-full bg-[#F29A0E]" />)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NumbersSection({ language, numbers }) {
  const [tab, setTab] = useState('count');
  const [open, setOpen] = useState(null);
  const items = tab === 'more' ? numbers.slice(10, 20) : numbers.slice(0, 10);
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={tab} onChange={(t) => { setTab(t); setOpen(null); }} accent={ACCENT} options={[
        ['count', language === 'ne' ? 'गन्ती १–१०' : 'Count 1–10', '🍎'],
        ['more', language === 'ne' ? '११–२०' : '11–20', '⭐'],
      ]} />
      <NumberGrid items={items} language={language} onOpen={setOpen} />
      <Viewer items={items} index={open} setIndex={setOpen} onClose={() => setOpen(null)} language={language} tint="#FFF6E2" label="Numbers" render={(item) => <CountCard key={item.n} item={item} language={language} />} />
    </div>
  );
}
