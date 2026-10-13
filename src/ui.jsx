import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Volume2, X } from 'lucide-react';

export const themes = [
  ['#FFE8EC', '#FFB8C6', '#D93A5B'],
  ['#E2F1FD', '#A9D3F5', '#2F7FE0'],
  ['#FFF3D6', '#FBD98A', '#C97800'],
  ['#E1F7EA', '#9EDFB9', '#24875A'],
  ['#EEE8FF', '#C9B8FA', '#6A45D8'],
  ['#FFE9DE', '#FDBE9D', '#D2541E'],
  ['#DDF5F1', '#97DDD3', '#16877A'],
].map(([background, border, accent]) => ({ background, border, accent }));

export const wrap = (value, length) => (value + length) % length;

export function SafeImage({ src, alt, fallback, className = '', contain = false }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  if (failed) return <div role="img" aria-label={alt} className={`grid place-items-center ${className}`}><span className="emoji-art leading-none">{fallback}</span></div>;
  return <img src={src} alt={alt} className={`${contain ? 'object-contain' : 'object-cover'} ${className}`} draggable="false" loading="lazy" onError={() => setFailed(true)} />;
}

export function useSwipe(previous, next) {
  const start = useRef(null);
  return {
    onPointerDown: (event) => { start.current = { x: event.clientX, y: event.clientY }; },
    onPointerUp: (event) => {
      if (!start.current) return;
      const dx = event.clientX - start.current.x;
      const dy = event.clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) (dx > 0 ? previous() : next());
    },
    onPointerCancel: () => { start.current = null; },
  };
}

// Section lives in the URL hash so the phone's back button returns home.
export function useHashSection(defaultSection = 'home') {
  const read = () => (window.location.hash.replace('#', '') || defaultSection);
  const [section, setSectionState] = useState(read);
  useEffect(() => {
    const onPop = () => { setSectionState(read()); window.scrollTo(0, 0); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const setSection = useCallback((next) => {
    if (next === 'home') {
      if (window.history.state?.inApp) window.history.back();
      else { window.history.replaceState(null, '', window.location.pathname); setSectionState('home'); }
      return;
    }
    window.history.pushState({ inApp: true }, '', `#${next}`);
    setSectionState(next);
    window.scrollTo(0, 0);
  }, []);
  return [section, setSection];
}

export function Arrow({ side, onClick, label, disabled = false }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return <button type="button" aria-label={label} disabled={disabled} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onClick(); }} className={`absolute ${side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white/95 text-[var(--ink)] shadow-xl active:scale-95 disabled:opacity-25`}><Icon size={30} strokeWidth={2.5} /></button>;
}

export function AudioBadge({ text }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-400"><Volume2 size={15} />{text}</span>;
}

export function personalize(text, profile, language) {
  const name = language === 'ne' ? profile.name : profile.englishName;
  const nickname = language === 'ne' ? profile.nickname : profile.englishName;
  return text.replaceAll('{englishName}', profile.englishName).replaceAll('{name}', name).replaceAll('{nickname}', nickname).replaceAll('{animal}', profile.favouriteAnimal).replaceAll('{color}', profile.favouriteColor).replaceAll('{place}', profile.homePlace);
}

// Sticky bar on every section page: home, title, language.
export function TopBar({ titleNe, titleEn, language, setLanguage, onHome, accent = '#6A45D8' }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#F6F3FF]/85 backdrop-blur-md" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <button type="button" onClick={onHome} aria-label={language === 'ne' ? 'घर' : 'Home'} className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white text-[var(--ink)] shadow-[0_3px_0_rgba(46,42,79,0.12)] active:translate-y-0.5 active:shadow-none">
          <Home size={24} strokeWidth={2.6} />
        </button>
        <div className="min-w-0 flex-1 leading-tight">
          <h1 className="truncate font-display text-2xl font-extrabold sm:text-3xl" style={{ color: accent }}>{language === 'ne' ? titleNe : titleEn}</h1>
          <p className="truncate text-sm font-semibold text-[var(--ink-soft)]">{language === 'ne' ? titleEn : titleNe}</p>
        </div>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
    </header>
  );
}

export function LanguageToggle({ language, setLanguage, light = false }) {
  return (
    <div role="group" aria-label="Language" className={`flex flex-none rounded-full p-1 ${light ? 'bg-white/25' : 'bg-white shadow-[0_3px_0_rgba(46,42,79,0.12)]'}`}>
      {[['ne', 'ने'], ['en', 'EN']].map(([id, label]) => (
        <button key={id} type="button" aria-pressed={language === id} onClick={() => setLanguage(id)} className={`h-10 min-w-[2.75rem] rounded-full px-3 text-base font-extrabold transition-colors ${language === id ? 'bg-[var(--ink)] text-white' : light ? 'text-white' : 'text-[var(--ink-soft)]'}`}>{label}</button>
      ))}
    </div>
  );
}

// Pill tabs used inside sections (vowels/consonants, count/tables, colours/shapes…)
export function Tabs({ value, onChange, options, accent = '#6A45D8' }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {options.map(([id, label, icon]) => {
        const active = value === id;
        return (
          <button key={id} type="button" onClick={() => onChange(id)} aria-pressed={active} className={`flex h-12 flex-none items-center gap-2 rounded-full px-5 text-base font-extrabold transition-colors ${active ? 'text-white shadow-[0_3px_0_rgba(0,0,0,0.15)]' : 'bg-white text-[var(--ink-soft)] shadow-[0_2px_0_rgba(46,42,79,0.08)]'}`} style={active ? { background: accent } : undefined}>
            {icon && <span className="text-xl leading-none">{icon}</span>}{label}
          </button>
        );
      })}
    </div>
  );
}

// Full-screen flashcard: one big thing at a time, swipe or tap arrows.
export function Viewer({ items, index, setIndex, onClose, render, tint = '#F6F3FF', language, label }) {
  const open = index !== null && index !== undefined;
  const count = items.length;
  const prev = useCallback(() => setIndex((i) => wrap(i - 1, count)), [count, setIndex]);
  const next = useCallback(() => setIndex((i) => wrap(i + 1, count)), [count, setIndex]);
  const swipe = useSwipe(prev, next);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, prev, next, onClose]);

  if (!open) return null;
  const counter = language === 'ne' ? `${toNe(index + 1)} / ${toNe(count)}` : `${index + 1} / ${count}`;
  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="viewer-in fixed inset-0 z-[80] flex flex-col" style={{ background: tint, paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <button type="button" onClick={onClose} aria-label={language === 'ne' ? 'बन्द' : 'Close'} className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[var(--ink)] shadow-[0_3px_0_rgba(46,42,79,0.12)] active:translate-y-0.5"><X size={26} strokeWidth={2.6} /></button>
        <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-[var(--ink-soft)]">{counter}</span>
        <span className="w-12" />
      </div>
      <div {...swipe} className="flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center px-4">
        <div key={index} className="card-pop flex h-full w-full max-w-xl flex-col items-center justify-center">{render(items[index])}</div>
      </div>
      <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-4 px-4 pb-5 pt-2">
        <button type="button" onClick={prev} aria-label={language === 'ne' ? 'पछाडि' : 'Back'} className="grid h-16 w-24 place-items-center rounded-[1.4rem] bg-white text-[var(--ink)] shadow-[0_5px_0_rgba(46,42,79,0.14)] active:translate-y-1 active:shadow-none"><ChevronLeft size={36} strokeWidth={3} /></button>
        <button type="button" onClick={next} aria-label={language === 'ne' ? 'अर्को' : 'Next'} className="grid h-16 w-24 place-items-center rounded-[1.4rem] bg-[var(--ink)] text-white shadow-[0_5px_0_rgba(0,0,0,0.25)] active:translate-y-1 active:shadow-none"><ChevronRight size={36} strokeWidth={3} /></button>
      </div>
    </div>
  );
}

const neDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
export const toNe = (value) => String(value).replace(/\d/g, (d) => neDigits[d]);
export const num = (value, language) => (language === 'ne' ? toNe(value) : String(value));
