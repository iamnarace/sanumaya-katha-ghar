import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

export const themes = [
  ['#f5f0ff', '#d9cff0', '#665b86'], ['#eef8ff', '#c9deeb', '#496d83'],
  ['#effaf4', '#c9e2d2', '#4e7760'], ['#fff7ea', '#ead7b8', '#8a6a3c'],
  ['#fff2f3', '#e8cbd0', '#8a5d66'],
].map(([background, border, accent]) => ({ background, border, accent }));

export const wrap = (value, length) => (value + length) % length;

export function SafeImage({ src, alt, fallback, className = '', contain = false }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  if (failed) return <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-violet-50 to-sky-50 ${className}`}><span className="text-7xl sm:text-8xl">{fallback}</span></div>;
  return <img src={src} alt={alt} className={`${contain ? 'object-contain' : 'object-cover'} ${className}`} draggable="false" loading="lazy" onError={() => setFailed(true)} />;
}

export function useSwipe(previous, next) {
  const start = useRef(null);
  return {
    onPointerDown: (event) => { start.current = event.clientX; },
    onPointerUp: (event) => {
      if (start.current === null) return;
      const distance = event.clientX - start.current;
      start.current = null;
      if (Math.abs(distance) >= 45) distance > 0 ? previous() : next();
    },
    onPointerCancel: () => { start.current = null; },
  };
}

export function Arrow({ side, onClick, label, disabled = false }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return <button type="button" aria-label={label} disabled={disabled} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onClick(); }} className={`absolute ${side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white/95 text-slate-600 shadow-xl active:scale-95 disabled:opacity-25`}><Icon size={30} strokeWidth={2.5} /></button>;
}

export function AudioBadge({ text }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/90 px-3 py-2 text-xs font-black text-slate-400 shadow-sm"><Volume2 size={17} />{text}</span>;
}

export function personalize(text, profile, language) {
  const name = language === 'ne' ? profile.name : profile.englishName;
  const nickname = language === 'ne' ? profile.nickname : profile.englishName;
  return text.replaceAll('{name}', name).replaceAll('{nickname}', nickname).replaceAll('{animal}', profile.favouriteAnimal).replaceAll('{color}', profile.favouriteColor).replaceAll('{place}', profile.homePlace);
}
