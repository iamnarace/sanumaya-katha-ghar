import { AudioBadge, Arrow, SafeImage } from '../ui.jsx';



export default function LearnSection({ language, nepaliSet, setNepaliSet, cards, cardIndex, setIndex, card, theme, phrase, previous, next, swipe, t }) {
  return <>
    <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'सानुमायासँग पढौँ!' : "Let's read with Sanumaya!"}</span><h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? 'सानुमायाको अक्षरमाला' : "Sanumaya's Alphabet World"}</h2><p className="text-sm font-semibold text-slate-500">{phrase}</p></div><img src="/images/stickers/pointing.png" className="float-hand w-16 h-16 sm:w-20 sm:h-20 object-contain mix-blend-multiply opacity-90 -rotate-12" alt="" /></div>
      {language === 'ne' && (
        <div className="mt-6 flex gap-3 sm:gap-4">
          <button type="button" onClick={() => setNepaliSet('vowels')} className={`flex-1 rounded-[1.5rem] sm:rounded-[2rem] border-[4px] py-4 sm:py-5 text-center transition-transform hover:scale-105 active:scale-95 ${nepaliSet === 'vowels' ? 'border-[#fbc2eb] bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb] text-white shadow-lg' : 'border-slate-100 bg-white text-slate-300'}`}>
            <strong className="block text-4xl sm:text-5xl font-black">अ आ</strong>
            <span className={`mt-1 block text-xs sm:text-sm font-black uppercase tracking-wider ${nepaliSet === 'vowels' ? 'text-white/90' : 'text-slate-400'}`}>Vowels</span>
          </button>
          <button type="button" onClick={() => setNepaliSet('consonants')} className={`flex-1 rounded-[1.5rem] sm:rounded-[2rem] border-[4px] py-4 sm:py-5 text-center transition-transform hover:scale-105 active:scale-95 ${nepaliSet === 'consonants' ? 'border-[#84fab0] bg-gradient-to-br from-[#8fd3f4] to-[#84fab0] text-white shadow-lg' : 'border-slate-100 bg-white text-slate-300'}`}>
            <strong className="block text-4xl sm:text-5xl font-black">क ख</strong>
            <span className={`mt-1 block text-xs sm:text-sm font-black uppercase tracking-wider ${nepaliSet === 'consonants' ? 'text-white/90' : 'text-slate-400'}`}>Consonants</span>
          </button>
        </div>
      )}
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
