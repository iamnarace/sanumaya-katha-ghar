import { AudioBadge, Arrow, SafeImage } from '../ui.jsx';

const groups = [
  ['क-वर्ग', 'क ख ग घ ङ', 0], ['च-वर्ग', 'च छ ज झ ञ', 5], ['ट-वर्ग', 'ट ठ ड ढ ण', 10],
  ['त-वर्ग', 'त थ द ध न', 15], ['प-वर्ग', 'प फ ब भ म', 20], ['अन्य', 'य र ल व श ष स ह', 25], ['संयुक्त', 'क्ष त्र ज्ञ', 33],
];

export default function LearnSection({ language, nepaliSet, setNepaliSet, cards, cardIndex, setIndex, card, theme, phrase, previous, next, swipe, t }) {
  return <>
    <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'ठूलो अक्षर • स्पष्ट वास्तविक तस्बिर' : 'Large letters • clear real pictures'}</span><h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? 'एक पटकमा एउटा कुरा सिकौँ' : 'One clear idea at a time'}</h2><p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'सबै सामग्री यही निजी project भित्र व्यवस्थित गरिएको छ।' : 'Everything is organised inside this private project.'}</p></div><span className="float-hand text-5xl">👆</span></div>
      {language === 'ne' && <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1.5">
        <button type="button" onClick={() => setNepaliSet('vowels')} className={`min-h-16 rounded-xl px-3 text-left ${nepaliSet === 'vowels' ? 'bg-violet-100 text-violet-900' : 'text-slate-500'}`}><strong className="block text-lg">स्वर</strong><span className="text-xs">अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः</span></button>
        <button type="button" onClick={() => setNepaliSet('consonants')} className={`min-h-16 rounded-xl px-3 text-left ${nepaliSet === 'consonants' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500'}`}><strong className="block text-lg">व्यञ्जन</strong><span className="text-xs">क देखि ज्ञ • 36 cards</span></button>
      </div>}
      {language === 'ne' && nepaliSet === 'consonants' && <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{groups.map(([label, letters, start]) => <button type="button" key={label} onClick={() => setIndex(start)} className="flex-none rounded-2xl border border-slate-100 bg-white px-3 py-2 text-left shadow-sm"><strong className="block text-sm">{label}</strong><span className="text-xs text-slate-400">{letters}</span></button>)}</div>}
    </section>
    <section {...swipe} className="relative touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-[0_20px_55px_rgba(74,67,91,0.13)]" style={{ background: theme.background, borderColor: theme.border }}>
      <Arrow side="left" label="Previous letter" onClick={previous} /><Arrow side="right" label="Next letter" onClick={next} />
      <div className="grid min-h-[610px] items-center gap-4 px-5 py-8 sm:min-h-[560px] sm:grid-cols-[0.72fr_1.28fr] sm:px-20">
        <div className="flex flex-col items-center text-center"><AudioBadge text={t.audio} /><span className="mt-5 text-[10rem] font-black leading-[0.78] sm:text-[13rem]" style={{ color: theme.accent }}>{card.letter}</span><span className="mt-6 rounded-full bg-white/75 px-4 py-1.5 text-sm font-black text-slate-500">{cardIndex + 1} / {cards.length}</span></div>
        <div className="flex flex-col items-center"><div className="grid h-80 w-full max-w-lg place-items-center overflow-hidden rounded-[2.2rem] border-4 border-white bg-white shadow-xl sm:h-[25rem]"><SafeImage src={card.image} alt={card.word} fallback={card.fallback} className="h-full w-full" contain /></div><strong className="mt-5 text-center text-4xl font-black leading-tight text-slate-800 sm:text-5xl">{phrase}</strong>{language === 'ne' && <span className="mt-1 text-base font-bold text-slate-500">{card.translation}</span>}</div>
      </div>
    </section>
    <div className="flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{cards.map((item, itemIndex) => <button type="button" key={`${item.letter}-${itemIndex}`} onClick={() => setIndex(itemIndex)} className={`flex h-24 w-[5.3rem] flex-none flex-col items-center justify-center overflow-hidden rounded-2xl border font-black shadow-sm ${itemIndex === cardIndex ? 'border-violet-200 bg-violet-100 text-violet-900' : 'border-slate-100 bg-white'}`}><span className="text-3xl">{item.letter}</span><span className="mt-1 grid h-10 w-14 place-items-center overflow-hidden rounded-lg bg-white/80"><SafeImage src={item.image} alt={item.word} fallback={item.fallback} className="h-full w-full" contain /></span></button>)}</div>
  </>;
}
