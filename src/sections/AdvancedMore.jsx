import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { SafeImage, Tabs, num, useSwipe } from '../ui.jsx';

const card = 'rounded-[1.8rem] bg-white shadow-[0_6px_0_rgba(46,42,79,0.08)]';
const rand = (max) => Math.floor(Math.random() * max);
const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

// ── Clock ─────────────────────────────────────────────────
export function timeWords(h, half, language) {
  if (language === 'en') return half ? `Half past ${h}` : `${h} o'clock`;
  if (!half) return `${num(h, 'ne')} बजे`;
  if (h === 1) return 'डेढ बजे';
  if (h === 2) return 'अढाई बजे';
  return `साढे ${num(h, 'ne')} बजे`;
}

function ClockFace({ h, half, language, size = 'h-64 w-64 sm:h-72 sm:w-72' }) {
  const hourAngle = ((h % 12) + (half ? 0.5 : 0)) * 30;
  const minuteAngle = half ? 180 : 0;
  return (
    <svg viewBox="0 0 200 200" className={size} role="img" aria-label={timeWords(h, half, language)}>
      <circle cx="100" cy="100" r="94" fill="#fff" stroke="#3B5BDB" strokeWidth="8" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i * 6 * Math.PI) / 180; const long = i % 5 === 0;
        return <line key={i} x1={100 + Math.sin(a) * (long ? 76 : 82)} y1={100 - Math.cos(a) * (long ? 76 : 82)} x2={100 + Math.sin(a) * 86} y2={100 - Math.cos(a) * 86} stroke={long ? '#2E2A4F' : '#C9C4DD'} strokeWidth={long ? 3 : 1.5} strokeLinecap="round" />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1; const a = (n * 30 * Math.PI) / 180;
        return <text key={n} x={100 + Math.sin(a) * 62} y={100 - Math.cos(a) * 62} textAnchor="middle" dominantBaseline="central" className="font-display" fontSize="17" fontWeight="800" fill="#2E2A4F">{num(n, language)}</text>;
      })}
      <line x1="100" y1="100" x2="100" y2="62" stroke="#E94F6B" strokeWidth="8" strokeLinecap="round" transform={`rotate(${hourAngle} 100 100)`} style={{ transition: 'transform 300ms ease' }} />
      <line x1="100" y1="100" x2="100" y2="50" stroke="#3B5BDB" strokeWidth="5" strokeLinecap="round" transform={`rotate(${minuteAngle} 100 100)`} style={{ transition: 'transform 300ms ease' }} />
      <circle cx="100" cy="100" r="7" fill="#2E2A4F" />
    </svg>
  );
}

export function ClockArea({ language, celebrate, tryAgain }) {
  const [mode, setMode] = useState('learn');
  const [h, setH] = useState(3);
  const [half, setHalf] = useState(false);
  const [q, setQ] = useState(() => ({ h: rand(12) + 1, half: Math.random() < 0.5 }));
  const options = useMemo(() => {
    const set = [q];
    while (set.length < 3) {
      const c = { h: rand(12) + 1, half: Math.random() < 0.5 };
      if (!set.some((s) => s.h === c.h && s.half === c.half)) set.push(c);
    }
    return shuffle(set);
  }, [q]);
  const digital = (hh, hf) => `${num(hh, language)}:${hf ? num(30, language) : num('00', language)}`;
  const pick = (o) => {
    if (o !== q) return tryAgain();
    celebrate(timeWords(q.h, q.half, language));
    setTimeout(() => setQ({ h: rand(12) + 1, half: Math.random() < 0.5 }), 800);
  };
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={mode} onChange={setMode} accent="#6A45D8" options={[['learn', language === 'ne' ? 'घडी सिकौँ' : 'Learn the clock'], ['quiz', language === 'ne' ? 'कति बज्यो?' : 'What time is it?']]} />
      {mode === 'learn' ? (
        <section className={`${card} flex flex-col items-center gap-3 p-5`}>
          <ClockFace h={h} half={half} language={language} />
          <p className="font-display text-5xl font-extrabold text-[#3B5BDB]">{digital(h, half)}</p>
          <p className="font-display text-3xl font-extrabold text-[var(--ink)]">{timeWords(h, half, language)}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Hour back" onClick={() => setH((v) => (v === 1 ? 12 : v - 1))} className="grid h-14 w-14 place-items-center rounded-2xl bg-[#E7ECFF] text-[#3B5BDB] shadow-[0_4px_0_#B9C6FA]"><Minus size={28} strokeWidth={3} /></button>
            <span className="text-base font-bold text-[var(--ink-soft)]">{language === 'ne' ? 'घण्टा' : 'Hour'}</span>
            <button type="button" aria-label="Hour forward" onClick={() => setH((v) => (v === 12 ? 1 : v + 1))} className="grid h-14 w-14 place-items-center rounded-2xl bg-[#E7ECFF] text-[#3B5BDB] shadow-[0_4px_0_#B9C6FA]"><Plus size={28} strokeWidth={3} /></button>
            <button type="button" onClick={() => setHalf((v) => !v)} className="h-14 rounded-2xl bg-[#FFF3D6] px-5 font-display text-xl font-extrabold text-[#C97800] shadow-[0_4px_0_#F4CE7A]">{half ? (language === 'ne' ? 'पूरा घण्टा' : "o'clock") : (language === 'ne' ? 'आधा घण्टा' : 'Half past')}</button>
          </div>
        </section>
      ) : (
        <section className={`${card} flex flex-col items-center gap-3 p-5`}>
          <ClockFace h={q.h} half={q.half} language={language} />
          <div className="grid w-full gap-3 sm:grid-cols-3">
            {options.map((o) => <button key={`${o.h}-${o.half}`} type="button" onClick={() => pick(o)} className="h-16 rounded-[1.4rem] bg-[#E7ECFF] font-display text-2xl font-extrabold text-[#3B5BDB] shadow-[0_5px_0_#B9C6FA] active:translate-y-1 active:shadow-none">{timeWords(o.h, o.half, language)}</button>)}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Nepal ─────────────────────────────────────────────────
export function NepalFlag({ className = '' }) {
  const sun = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 === 0 ? 13 : 8; const a = (i * 15 * Math.PI) / 180;
    return `${24 + Math.sin(a) * r},${93 - Math.cos(a) * r}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 100 124" className={className} role="img" aria-label="Nepal flag">
      <path d="M2 2 L94 60 L34 60 L94 122 L2 122 Z" fill="#003893" strokeLinejoin="round" />
      <path d="M8 13 L77 55 L22 55 L82 116 L8 116 Z" fill="#DC143C" />
      <path d="M12 36 A13 13 0 0 0 38 36 A13 10 0 0 1 12 36 Z" fill="#fff" />
      <circle cx="25" cy="41" r="5" fill="#fff" />
      <polygon points={sun} fill="#fff" />
      <circle cx="24" cy="93" r="6" fill="#fff" />
    </svg>
  );
}

export function NepalArea({ language, nepalFacts }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {nepalFacts.map((f) => (
        <div key={f.id} className={`${card} flex flex-col items-center p-4 text-center`}>
          <span className="grid h-24 w-full place-items-center">
            {f.art === 'flag' ? <NepalFlag className="h-24" /> : f.image ? <SafeImage src={f.image} alt={f.en} fallback={f.icon} className="h-24 w-24 rounded-2xl" /> : f.swatch ? <span className="h-20 w-20 rounded-full" style={{ background: f.swatch }} /> : <span className="text-6xl">{f.icon}</span>}
          </span>
          <strong className="mt-2 break-words font-display text-xl font-extrabold leading-tight text-[#DC143C] sm:text-2xl">{language === 'ne' ? f.ne : f.en}</strong>
          <span className="text-xs font-bold text-[var(--ink-soft)]">{language === 'ne' ? f.en : f.ne}</span>
          <p className="mt-2 text-base font-semibold leading-snug text-[var(--ink)]">{language === 'ne' ? f.factNe : f.factEn}</p>
        </div>
      ))}
    </div>
  );
}

// ── Seasons, weather, planets ─────────────────────────────
function Planet({ p, size = 90 }) {
  const box = 80;
  return (
    <svg viewBox={`0 0 ${box} ${box}`} width={size} height={size} aria-hidden="true">
      {p.ring && <ellipse cx="40" cy="40" rx={p.r + 16} ry={p.r * 0.45} fill="none" stroke="#C9A35A" strokeWidth="4" transform="rotate(-18 40 40)" />}
      <circle cx="40" cy="40" r={p.r} fill={p.colour} />
      <circle cx={40 - p.r * 0.35} cy={40 - p.r * 0.35} r={p.r * 0.35} fill="#fff" opacity="0.25" />
    </svg>
  );
}

export function WorldArea({ language, seasonsAus, rituNepal, weather, planets }) {
  const [tab, setTab] = useState('seasons');
  const L = (x) => (language === 'ne' ? x.ne : x.en);
  const S = (x) => (language === 'ne' ? x.en : x.ne);
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={tab} onChange={setTab} accent="#6A45D8" options={[['seasons', language === 'ne' ? 'ऋतु' : 'Seasons', '🍂'], ['weather', language === 'ne' ? 'मौसम' : 'Weather', '⛅'], ['planets', language === 'ne' ? 'ग्रहहरू' : 'Planets', '🪐']]} />
      {tab === 'seasons' && (
        <>
          <h3 className="font-display text-2xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'अस्ट्रेलियाका चार ऋतु' : 'Four seasons in Australia'}</h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {seasonsAus.map((s) => (
              <div key={s.en} className="flex flex-col items-center rounded-[1.8rem] p-4 text-center shadow-[0_6px_0_rgba(46,42,79,0.08)]" style={{ background: s.tint }}>
                <span className="text-6xl">{s.icon}</span>
                <strong className="mt-1 font-display text-2xl font-extrabold text-[var(--ink)]">{L(s)}</strong>
                <span className="text-sm font-bold text-[var(--ink-soft)]">{S(s)}</span>
                <span className="mt-1 text-xs font-bold text-[var(--ink-soft)]">{language === 'ne' ? s.monthsNe : s.monthsEn}</span>
              </div>
            ))}
          </div>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'नेपालका छ ऋतु' : 'Six seasons in Nepal'}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {rituNepal.map((r) => (
              <div key={r.ne} className={`${card} flex items-center gap-3 p-3`}>
                <span className="text-4xl">{r.icon}</span>
                <span className="leading-tight"><strong className="block font-display text-xl font-extrabold text-[var(--ink)]">{L(r)}</strong><span className="text-xs font-bold text-[var(--ink-soft)]">{r.months}</span></span>
              </div>
            ))}
          </div>
        </>
      )}
      {tab === 'weather' && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {weather.map((w) => (
            <div key={w.en} className={`${card} flex flex-col items-center p-5 text-center`}>
              <span className="text-7xl">{w.icon}</span>
              <strong className="mt-2 font-display text-2xl font-extrabold text-[var(--ink)]">{L(w)}</strong>
              <span className="text-sm font-bold text-[var(--ink-soft)]">{S(w)}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'planets' && (
        <div className="flex flex-col gap-3">
          {planets.map((p, i) => (
            <div key={p.en} className={`${card} flex items-center gap-4 p-3`}>
              <Planet p={p} />
              <span className="min-w-0 leading-tight">
                <span className="text-xs font-bold text-[var(--ink-soft)]">{i === 0 ? (language === 'ne' ? 'तारा' : 'Star') : `${num(i, language)}`}</span>
                <strong className="block font-display text-2xl font-extrabold text-[var(--ink)]">{L(p)} <span className="text-base font-bold text-[var(--ink-soft)]">{S(p)}</span></strong>
                <span className="text-base font-semibold text-[var(--ink)]">{language === 'ne' ? p.factNe : p.factEn}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Puzzles: what comes next, odd one out ─────────────────
const GROUPS = {
  fruit: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍐'],
  animals: ['🐶', '🐱', '🐰', '🐮', '🐷', '🐸'],
  vehicles: ['🚗', '🚌', '🚲', '✈️', '🚆', '⛵'],
  clothes: ['👕', '👖', '👗', '👟', '🧦', '👒'],
  sky: ['☀️', '🌙', '⭐', '☁️', '🌈', '⚡'],
};
const groupNames = Object.keys(GROUPS);

function makePattern() {
  const pool = shuffle(Object.values(GROUPS).flat());
  const kinds = [[0, 1], [0, 0, 1], [0, 1, 2], [0, 1, 1]];
  const kind = kinds[rand(kinds.length)];
  const items = kind.map((k) => pool[k]);
  const seq = Array.from({ length: kind.length * 2 + 1 }, (_, i) => items[i % kind.length]);
  const answer = seq.pop();
  const wrong = shuffle(pool.slice(3).filter((x) => !items.includes(x))).slice(0, 2);
  return { seq, answer, options: shuffle([answer, ...wrong]) };
}

function makeOdd() {
  const [main, other] = shuffle(groupNames);
  const three = shuffle(GROUPS[main]).slice(0, 3);
  const odd = GROUPS[other][rand(6)];
  return { items: shuffle([...three, odd]), odd };
}

export function PuzzlesArea({ language, celebrate, tryAgain }) {
  const [mode, setMode] = useState('pattern');
  const [pattern, setPattern] = useState(makePattern);
  const [odd, setOdd] = useState(makeOdd);
  const good = () => celebrate(language === 'ne' ? 'स्याबास!' : 'Well done!');
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={mode} onChange={setMode} accent="#6A45D8" options={[['pattern', language === 'ne' ? 'अब के आउँछ?' : 'What comes next?'], ['odd', language === 'ne' ? 'कुन फरक छ?' : 'Odd one out']]} />
      {mode === 'pattern' ? (
        <section className={`${card} p-5 text-center`}>
          <h3 className="font-display text-2xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'अब कुन आउँछ?' : 'What comes next?'}</h3>
          <div className="my-5 flex flex-wrap items-center justify-center gap-1 text-4xl sm:text-5xl">
            {pattern.seq.map((x, i) => <span key={i}>{x}</span>)}
            <span className="grid h-14 w-14 place-items-center rounded-2xl border-4 border-dashed border-[#B9C6FA] font-display text-3xl font-extrabold text-[#3B5BDB]">?</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {pattern.options.map((o) => <button key={o} type="button" onClick={() => { if (o !== pattern.answer) return tryAgain(); good(); setTimeout(() => setPattern(makePattern()), 700); }} className="h-24 rounded-[1.6rem] bg-[#F6F3FF] text-6xl shadow-[0_5px_0_rgba(46,42,79,0.1)] active:translate-y-1 active:shadow-none">{o}</button>)}
          </div>
        </section>
      ) : (
        <section className={`${card} p-5 text-center`}>
          <h3 className="font-display text-2xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'यीमध्ये कुन फरक छ?' : 'Which one does not belong?'}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {odd.items.map((o) => <button key={o} type="button" onClick={() => { if (o !== odd.odd) return tryAgain(); good(); setTimeout(() => setOdd(makeOdd()), 700); }} className="h-28 rounded-[1.6rem] bg-[#F6F3FF] text-7xl shadow-[0_5px_0_rgba(46,42,79,0.1)] active:translate-y-1 active:shadow-none">{o}</button>)}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Longer stories ────────────────────────────────────────
export function BigStoriesArea({ language, bigStories }) {
  const [storyId, setStoryId] = useState(null);
  const [page, setPage] = useState(0);
  const story = bigStories.find((s) => s.id === storyId);
  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min((story?.pages.length || 1) - 1, p + 1));
  const swipe = useSwipe(prev, next);
  if (!story) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {bigStories.map((s) => (
          <button key={s.id} type="button" onClick={() => { setStoryId(s.id); setPage(0); }} className="tile flex items-center gap-4 rounded-[1.8rem] bg-[#FDE6F1] p-5 text-left" style={{ '--edge': '#F6B3D3' }}>
            <span className="text-6xl">{s.cover}</span>
            <span className="leading-tight"><strong className="block font-display text-2xl font-extrabold text-[#C23A7E]">{language === 'ne' ? s.titleNe : s.titleEn}</strong><span className="text-sm font-bold text-[var(--ink-soft)]">{language === 'ne' ? `${num(s.pages.length, 'ne')} पाना` : `${s.pages.length} pages`}</span></span>
          </button>
        ))}
      </div>
    );
  }
  const [art, ne, en] = story.pages[page];
  const last = page === story.pages.length - 1;
  return (
    <section {...swipe} className={`${card} touch-pan-y overflow-hidden`}>
      <div className="flex items-center justify-between gap-2 border-b border-[#EEE8FF] px-4 py-3">
        <button type="button" onClick={() => setStoryId(null)} className="h-10 rounded-full bg-[#F1EEFA] px-4 text-sm font-extrabold text-[var(--ink-soft)]">{language === 'ne' ? 'सबै कथा' : 'All stories'}</button>
        <strong className="truncate font-display text-xl font-extrabold text-[#C23A7E]">{language === 'ne' ? story.titleNe : story.titleEn}</strong>
        <span className="text-sm font-bold text-[var(--ink-soft)]">{num(page + 1, language)}/{num(story.pages.length, language)}</span>
      </div>
      <div key={page} className="card-pop flex min-h-[22rem] flex-col items-center justify-center gap-5 px-6 py-8 text-center">
        <span className="text-7xl leading-tight sm:text-8xl">{art}</span>
        <p className="max-w-xl font-display text-2xl font-bold leading-relaxed text-[var(--ink)] sm:text-3xl">{language === 'ne' ? ne : en}</p>
        <p className="max-w-xl text-base font-semibold text-[var(--ink-soft)]">{language === 'ne' ? en : ne}</p>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pb-4">
        <button type="button" onClick={prev} disabled={page === 0} aria-label="Back" className="grid h-14 w-20 place-items-center rounded-[1.2rem] bg-[#F1EEFA] text-[var(--ink)] disabled:opacity-30"><ChevronLeft size={32} strokeWidth={3} /></button>
        <div className="flex gap-1.5">{story.pages.map((_, i) => <span key={i} className={`h-2.5 w-2.5 rounded-full ${i === page ? 'bg-[#C23A7E]' : 'bg-[#E6E1F5]'}`} />)}</div>
        <button type="button" onClick={last ? () => setPage(0) : next} aria-label={last ? 'Start again' : 'Next'} className="grid h-14 w-20 place-items-center rounded-[1.2rem] bg-[var(--ink)] text-white">{last ? '↺' : <ChevronRight size={32} strokeWidth={3} />}</button>
      </div>
    </section>
  );
}
