import { Arrow, SafeImage, Tabs, num } from '../ui.jsx';

export default function LearnSection({ language, nepaliSet, setNepaliSet, cards, cardIndex, setIndex, card, theme, phrase, previous, next, swipe }) {
  return (
    <div className="flex flex-col gap-4">
      {language === 'ne' && (
        <Tabs value={nepaliSet} onChange={setNepaliSet} accent="#6A45D8" options={[['vowels', 'स्वर  अ आ'], ['consonants', 'व्यञ्जन  क ख']]} />
      )}
      <section {...swipe} className="relative touch-pan-y overflow-hidden rounded-[2.2rem]" style={{ background: theme.background, boxShadow: `0 8px 0 ${theme.border}` }}>
        <Arrow side="left" label="Previous letter" onClick={previous} />
        <Arrow side="right" label="Next letter" onClick={next} />
        <div key={cardIndex} className="card-pop grid items-center gap-3 px-16 py-6 sm:grid-cols-[0.8fr_1.2fr] sm:px-20 sm:py-10">
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-[9rem] font-extrabold leading-[0.9] sm:text-[12rem]" style={{ color: theme.accent }}>{card.letter}</span>
            <span className="mt-2 rounded-full bg-white/75 px-4 py-1 text-sm font-extrabold text-[var(--ink-soft)]">{num(cardIndex + 1, language)} / {num(cards.length, language)}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="grid h-56 w-full max-w-md place-items-center overflow-hidden rounded-[2rem] bg-white shadow-[0_6px_0_rgba(46,42,79,0.08)] sm:h-80">
              <SafeImage src={card.image} alt={card.word} fallback={card.fallback} className="h-full w-full [--emoji:8rem]" contain />
            </div>
            <strong className="mt-4 text-center font-display text-4xl font-extrabold leading-tight text-[var(--ink)] sm:text-5xl">{phrase}</strong>
            {language === 'ne' && card.translation && <span className="mt-1 text-lg font-bold text-[var(--ink-soft)]">{card.translation}</span>}
          </div>
        </div>
      </section>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
        {cards.map((item, i) => (
          <button type="button" key={`${item.letter}-${i}`} onClick={() => setIndex(i)} aria-label={item.word} className={`flex h-20 w-16 flex-none flex-col items-center justify-center rounded-2xl font-display text-3xl font-extrabold ${i === cardIndex ? 'bg-[#6A45D8] text-white' : 'bg-white text-[var(--ink)] shadow-[0_3px_0_rgba(46,42,79,0.08)]'}`}>
            {item.letter}
          </button>
        ))}
      </div>
    </div>
  );
}
