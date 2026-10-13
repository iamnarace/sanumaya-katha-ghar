import { useMemo, useState } from 'react';
import { Tabs, num } from '../ui.jsx';
import { Tables } from './NumbersSection.jsx';
import { BigStoriesArea, ClockArea, NepalArea, NepalFlag, PuzzlesArea, WorldArea } from './AdvancedMore.jsx';

const ACCENT = '#3B5BDB';
const card = 'rounded-[1.8rem] bg-white shadow-[0_6px_0_rgba(46,42,79,0.08)]';
const rand = (max) => Math.floor(Math.random() * max);

// ── Times tables: one at a time, all ten together, or a quiz ──
function AllTables({ language }) {
  const n = (v) => num(v, language);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((t) => (
        <div key={t} className={`${card} p-3 sm:p-4`}>
          <h3 className="mb-2 font-display text-xl font-extrabold sm:text-2xl" style={{ color: ACCENT }}>{language === 'ne' ? `${n(t)} को पहाडा` : `${t} times table`}</h3>
          <ul className="flex flex-col gap-0.5">
            {Array.from({ length: 10 }, (_, j) => j + 1).map((m) => (
              <li key={m} className="flex justify-between font-display text-base font-bold text-[var(--ink)] sm:text-lg">
                <span>{n(t)} × {n(m)}</span><span style={{ color: ACCENT }}>= {n(t * m)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function makeQuestion(op, max) {
  if (op === '×') {
    const a = rand(10) + 1; const b = rand(10) + 1;
    return { a, b, answer: a * b };
  }
  if (op === '+') {
    const a = rand(max) + 1; const b = rand(max - a + 1);
    return { a, b, answer: a + b };
  }
  const a = rand(max) + 1; const b = rand(a + 1);
  return { a, b, answer: a - b };
}

function choicesFor(answer) {
  const set = new Set([answer]);
  const spread = Math.max(3, Math.round(answer * 0.25));
  while (set.size < 3) {
    const c = answer + (rand(spread * 2 + 1) - spread);
    if (c >= 0) set.add(c);
  }
  return [...set].sort(() => Math.random() - 0.5);
}

function Quiz({ language, op, celebrate, tryAgain, pictures }) {
  const [q, setQ] = useState(() => makeQuestion(op, 10));
  const [score, setScore] = useState(0);
  const choices = useMemo(() => choicesFor(q.answer), [q]);
  const n = (v) => num(v, language);
  const thing = '🍎';
  const pick = (c) => {
    if (c !== q.answer) return tryAgain();
    celebrate(language === 'ne' ? `${n(q.answer)}! स्याबास!` : `${q.answer}! Well done!`);
    setScore((s) => s + 1);
    setTimeout(() => setQ(makeQuestion(op, 10)), 700);
  };
  return (
    <section className={`${card} p-5 text-center`}>
      <p className="text-sm font-bold text-[var(--ink-soft)]">{language === 'ne' ? `सही उत्तर: ${n(score)}` : `Correct so far: ${score}`}</p>
      {pictures && (
        <div className="my-4 flex flex-wrap items-center justify-center gap-2 text-4xl sm:text-5xl">
          <span className="flex flex-wrap justify-center">{Array.from({ length: q.a }, (_, i) => <span key={i} className={op === '−' && i >= q.a - q.b ? 'opacity-25 line-through' : ''}>{thing}</span>)}</span>
          {op === '+' && q.b > 0 && <><span className="font-display font-extrabold text-[var(--ink-soft)]">+</span><span className="flex flex-wrap justify-center">{Array.from({ length: q.b }, (_, i) => <span key={i}>🍐</span>)}</span></>}
        </div>
      )}
      <p className="my-3 font-display text-6xl font-extrabold text-[var(--ink)]">{n(q.a)} {op} {n(q.b)} = <span style={{ color: ACCENT }}>?</span></p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {choices.map((c) => <button key={c} type="button" onClick={() => pick(c)} className="h-20 rounded-[1.4rem] bg-[#E7ECFF] font-display text-4xl font-extrabold shadow-[0_5px_0_#B9C6FA] active:translate-y-1 active:shadow-none" style={{ color: ACCENT }}>{n(c)}</button>)}
      </div>
      <button type="button" onClick={() => setQ(makeQuestion(op, 10))} className="mt-4 h-11 rounded-full bg-[#F1EEFA] px-5 font-bold text-[var(--ink-soft)]">{language === 'ne' ? 'अर्को प्रश्न' : 'Skip'}</button>
    </section>
  );
}

function TablesArea({ language, celebrate, tryAgain }) {
  const [view, setView] = useState('all');
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={view} onChange={setView} accent="#6A45D8" options={[['all', language === 'ne' ? 'सबै पहाडा' : 'All tables'], ['one', language === 'ne' ? 'एउटा पहाडा' : 'One table'], ['quiz', language === 'ne' ? 'प्रश्न' : 'Quiz']]} />
      {view === 'all' && <AllTables language={language} />}
      {view === 'one' && <Tables language={language} />}
      {view === 'quiz' && <Quiz key="x" op="×" {...{ language, celebrate, tryAgain }} />}
    </div>
  );
}

function SumsArea({ language, celebrate, tryAgain }) {
  const [op, setOp] = useState('+');
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={op} onChange={setOp} accent="#6A45D8" options={[['+', language === 'ne' ? 'जोड +' : 'Add +'], ['−', language === 'ne' ? 'घटाउ −' : 'Take away −']]} />
      <Quiz key={op} op={op} pictures {...{ language, celebrate, tryAgain }} />
    </div>
  );
}

function Barakhari({ consonants, barakhariOf, language }) {
  const [letter, setLetter] = useState('क');
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-[var(--ink-soft)]">{language === 'ne' ? 'अक्षर छान, अनि बाह्रखरी पढ।' : 'Pick a letter to see it with every vowel sign.'}</p>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {consonants.map((c) => (
          <button key={c.letter} type="button" onClick={() => setLetter(c.letter)} aria-pressed={letter === c.letter} className={`h-14 w-14 flex-none rounded-2xl font-display text-3xl font-extrabold ${letter === c.letter ? 'bg-[#6A45D8] text-white' : 'bg-white text-[var(--ink)] shadow-[0_3px_0_rgba(46,42,79,0.08)]'}`}>{c.letter}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {barakhariOf(letter).map((syl, i) => (
          <div key={syl} className={`${card} grid aspect-square place-items-center`} style={i === 0 ? { background: '#EEE8FF' } : undefined}>
            <span className="font-display text-6xl font-extrabold text-[var(--ink)]">{syl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarArea({ language, weekDays, nepaliMonths, englishMonths }) {
  const today = new Date().getDay();
  const n = (v) => num(v, language);
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="mb-3 font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'हप्ताका सात दिन' : 'Seven days of the week'}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {weekDays.map((d, i) => (
            <div key={d.en} className={`${card} relative flex flex-col items-center gap-1 p-4 text-center ${i === today ? 'ring-4 ring-[#FFB020]' : ''}`}>
              <span className="text-4xl">{d.icon}</span>
              <span className="leading-tight"><strong className="block font-display text-xl font-extrabold text-[var(--ink)] sm:text-2xl">{language === 'ne' ? d.ne : d.en}</strong><span className="text-sm font-bold text-[var(--ink-soft)]">{language === 'ne' ? d.en : d.ne}</span></span>
              {i === today && <span className="absolute -top-3 right-3 rounded-full bg-[#FFB020] px-3 py-0.5 text-sm font-extrabold text-white">{language === 'ne' ? 'आज' : 'Today'}</span>}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'नेपाली महिना' : 'Nepali months'}</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {nepaliMonths.map((m, i) => (
            <div key={m} className={`${card} p-3 text-center`}><span className="block text-sm font-bold text-[var(--ink-soft)]">{n(i + 1)}</span><strong className="font-display text-2xl font-extrabold text-[#C23A7E]">{m}</strong></div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'अंग्रेजी महिना' : 'English months'}</h3>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {englishMonths.map(([en, ne], i) => (
            <div key={en} className={`${card} p-3 text-center`}><span className="block text-sm font-bold text-[var(--ink-soft)]">{n(i + 1)}</span><strong className="font-display text-xl font-extrabold text-[#2F7FE0]">{language === 'ne' ? ne : en}</strong><span className="block text-xs font-bold text-[var(--ink-soft)]">{language === 'ne' ? en : ne}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}

function OppositesArea({ language, opposites }) {
  const label = (w) => (language === 'ne' ? w.ne : w.en);
  const sub = (w) => (language === 'ne' ? w.en : w.ne);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {opposites.map(([a, b]) => (
        <div key={a.en} className={`${card} grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-4 text-center`}>
          {[a, b].map((w, i) => (
            <div key={w.en} className={i === 1 ? 'order-3' : ''}>
              <span className="block text-5xl leading-tight">{w.icon}</span>
              <strong className="block font-display text-2xl font-extrabold text-[var(--ink)]">{label(w)}</strong>
              <span className="text-sm font-bold text-[var(--ink-soft)]">{sub(w)}</span>
            </div>
          ))}
          <span className="order-2 font-display text-2xl font-extrabold text-[var(--ink-soft)]">↔</span>
        </div>
      ))}
    </div>
  );
}

const TOPICS = [
  { id: 'tables', ne: 'पहाडा', en: 'Times tables', icon: '✖️', bg: '#E7ECFF', edge: '#B9C6FA', ink: '#3B5BDB' },
  { id: 'sums', ne: 'जोड-घटाउ', en: 'Add & take away', icon: '➕', bg: '#FFF3D6', edge: '#F4CE7A', ink: '#C97800' },
  { id: 'barakhari', ne: 'बाह्रखरी', en: 'Barakhari', glyph: 'का', bg: '#EEE8FF', edge: '#C9B8FA', ink: '#6A45D8' },
  { id: 'clock', ne: 'घडी', en: 'Clock', icon: '🕒', bg: '#E2F1FD', edge: '#A9D3F5', ink: '#2F7FE0' },
  { id: 'calendar', ne: 'दिन र महिना', en: 'Days & months', icon: '📅', bg: '#FFE9DE', edge: '#FDBE9D', ink: '#D2541E' },
  { id: 'nepal', ne: 'मेरो नेपाल', en: 'My Nepal', flag: true, bg: '#FFE8EC', edge: '#FFB8C6', ink: '#DC143C' },
  { id: 'world', ne: 'ऋतु र ग्रह', en: 'Seasons & space', icon: '🪐', bg: '#DDF5F1', edge: '#97DDD3', ink: '#16877A' },
  { id: 'puzzles', ne: 'दिमागी खेल', en: 'Puzzles', icon: '🧩', bg: '#E1F7EA', edge: '#9EDFB9', ink: '#24875A' },
  { id: 'opposites', ne: 'उल्टो शब्द', en: 'Opposites', icon: '↔️', bg: '#F1EEFA', edge: '#D6CFF0', ink: '#5B4FA0' },
  { id: 'stories', ne: 'लामा कथा', en: 'Longer stories', icon: '📚', bg: '#FDE6F1', edge: '#F6B3D3', ink: '#C23A7E' },
];

export default function AdvancedSection(props) {
  const { language } = props;
  const [topic, setTopic] = useState(null);
  const current = TOPICS.find((t) => t.id === topic);
  if (!current) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-[var(--ink-soft)]">{language === 'ne' ? '३ देखि ६ वर्षका नानीहरूका लागि। एउटा विषय छान।' : 'For children aged 3 to 6. Pick a topic.'}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TOPICS.map((t) => (
            <button key={t.id} type="button" onClick={() => { setTopic(t.id); window.scrollTo(0, 0); }} className="tile flex aspect-[1/0.95] flex-col items-center justify-center gap-2 rounded-[1.8rem] px-2" style={{ background: t.bg, '--edge': t.edge }}>
              <span className="grid h-16 place-items-center">{t.flag ? <NepalFlag className="h-16" /> : t.glyph ? <span className="font-display text-5xl font-extrabold" style={{ color: t.ink }}>{t.glyph}</span> : <span className="text-5xl">{t.icon}</span>}</span>
              <span className="text-center leading-tight"><span className="block font-display text-xl font-extrabold" style={{ color: t.ink }}>{language === 'ne' ? t.ne : t.en}</span><span className="block text-xs font-bold text-[var(--ink-soft)]">{language === 'ne' ? t.en : t.ne}</span></span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setTopic(null)} className="flex h-11 flex-none items-center gap-1 rounded-full bg-white pl-3 pr-4 text-sm font-extrabold text-[var(--ink-soft)] shadow-[0_3px_0_rgba(46,42,79,0.1)]">‹ {language === 'ne' ? 'सबै विषय' : 'All topics'}</button>
        <h2 className="truncate font-display text-2xl font-extrabold" style={{ color: current.ink }}>{language === 'ne' ? current.ne : current.en}</h2>
      </div>
      {topic === 'tables' && <TablesArea {...props} />}
      {topic === 'sums' && <SumsArea {...props} />}
      {topic === 'barakhari' && <Barakhari {...props} />}
      {topic === 'clock' && <ClockArea {...props} />}
      {topic === 'calendar' && <CalendarArea {...props} />}
      {topic === 'nepal' && <NepalArea {...props} />}
      {topic === 'world' && <WorldArea {...props} />}
      {topic === 'puzzles' && <PuzzlesArea {...props} />}
      {topic === 'opposites' && <OppositesArea {...props} />}
      {topic === 'stories' && <BigStoriesArea {...props} />}
    </div>
  );
}
