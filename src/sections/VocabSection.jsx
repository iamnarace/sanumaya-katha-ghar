import { useState } from 'react';
import { SafeImage, Viewer } from '../ui.jsx';

export default function VocabSection({ language, vocabularyCategories, vocabulary }) {
  const [activeCategory, setActiveCategory] = useState(vocabularyCategories[0].id);
  const [open, setOpen] = useState(null);
  const cat = vocabularyCategories.find((c) => c.id === activeCategory);
  const words = vocabulary.filter((v) => v.category === activeCategory);
  const main = (w) => (language === 'ne' ? w.ne : w.en);
  const sub = (w) => (language === 'ne' ? w.en : w.ne);

  return (
    <div className="flex flex-col gap-4">
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {vocabularyCategories.map((c) => {
          const active = c.id === activeCategory;
          return (
            <button key={c.id} type="button" aria-pressed={active} onClick={() => { setActiveCategory(c.id); setOpen(null); }}
              className={`flex h-14 flex-none items-center gap-2 rounded-full pl-2 pr-5 text-base font-extrabold transition-colors ${active ? 'text-white shadow-[0_3px_0_rgba(0,0,0,0.15)]' : 'bg-white text-[var(--ink-soft)] shadow-[0_2px_0_rgba(46,42,79,0.08)]'}`}
              style={active ? { background: c.color } : undefined}>
              <span className={`grid h-10 w-10 place-items-center rounded-full text-2xl ${active ? 'bg-white/25' : ''}`} style={active ? undefined : { background: c.tint }}>{c.icon}</span>
              {language === 'ne' ? c.nameNe : c.nameEn}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {words.map((w, i) => (
          <button key={w.id} type="button" onClick={() => setOpen(i)} className="tile flex flex-col overflow-hidden rounded-[1.8rem] bg-white text-center" style={{ '--edge': 'rgba(46,42,79,0.1)' }}>
            <span className="grid h-36 w-full place-items-center sm:h-44" style={{ background: cat.tint }}>
              <SafeImage src={w.image} alt={w.en} fallback={w.fallback} className="h-full w-full p-2 [--emoji:5rem]" contain />
            </span>
            <span className="px-2 pb-3 pt-2">
              <strong className="block font-display text-2xl font-extrabold leading-tight text-[var(--ink)]">{main(w)}</strong>
              <span className="block text-sm font-bold text-[var(--ink-soft)]">{sub(w)}</span>
            </span>
          </button>
        ))}
      </div>

      <Viewer items={words} index={open} setIndex={setOpen} onClose={() => setOpen(null)} language={language} label={cat.nameEn} tint={cat.tint}
        render={(w) => (
          <div className="flex w-full flex-col items-center gap-4">
            <span className="grid h-[46vh] max-h-[26rem] w-full place-items-center overflow-hidden rounded-[2rem] bg-white shadow-[0_6px_0_rgba(46,42,79,0.08)]">
              <SafeImage src={w.image} alt={w.en} fallback={w.fallback} className="h-full w-full [--emoji:11rem]" contain />
            </span>
            <p className="font-display text-6xl font-extrabold leading-tight" style={{ color: cat.color }}>{main(w)}</p>
            <p className="text-2xl font-bold text-[var(--ink-soft)]">{sub(w)}</p>
          </div>
        )} />
    </div>
  );
}
