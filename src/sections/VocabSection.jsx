import { useState } from 'react';
import { AudioBadge, SafeImage } from '../ui.jsx';

export default function VocabSection({ language, vocabularyCategories, vocabulary, t }) {
  const [activeCategory, setActiveCategory] = useState(vocabularyCategories[0].id);

  const currentCategory = vocabularyCategories.find((c) => c.id === activeCategory);
  const words = vocabulary.filter((v) => v.category === activeCategory);

  return (
    <>
      <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-500">
              {language === 'ne' ? 'नयाँ शब्दहरू • स्पष्ट चित्र' : 'New Words • Clear Pictures'}
            </span>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              {language === 'ne' ? 'मेरो पहिलो शब्दहरू' : 'My First Words'}
            </h2>
            <p className="text-sm font-semibold text-slate-500">
              {language === 'ne'
                ? 'सानुमायालाई सजिलो हुने गरी तयार पारिएका शब्दहरू।'
                : 'Basic words carefully selected for Sanumaya.'}
            </p>
          </div>
          <span className="float-hand text-5xl drop-shadow-sm">🗣️</span>
        </div>

        {/* Beautiful Scrolling Tab Bar */}
        <div className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x">
            {vocabularyCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex-none snap-start rounded-full px-6 py-3 text-sm sm:text-base font-black transition-all hover:scale-105 active:scale-95 ${
                    isActive ? 'text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${cat.color}, ${cat.toColor})` : '',
                  }}
                >
                  {language === 'ne' ? cat.nameNe : cat.nameEn}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Flashcard Grid */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-5 mt-2">
        {words.map((word) => (
          <button
            key={word.id}
            type="button"
            className="group relative flex flex-col items-center overflow-hidden rounded-[1.8rem] border-[4px] border-white bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            {/* Image Area */}
            <div 
              className="relative flex h-36 sm:h-44 w-full items-center justify-center overflow-hidden rounded-t-[1.3rem] rounded-b-xl border-b-[3px]"
              style={{ 
                borderColor: currentCategory.color,
                background: `linear-gradient(180deg, ${currentCategory.toColor}22, white)`
              }}
            >
              {word.image ? (
                <SafeImage src={word.image} alt={word.en} fallback={word.fallback} className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <span className="text-[5.5rem] transition-transform duration-500 group-hover:scale-110 drop-shadow-sm">{word.fallback}</span>
              )}
            </div>

            {/* Text Area */}
            <div className="flex w-full flex-col items-center justify-center p-3 sm:p-4 bg-white z-10">
              <strong className="text-xl sm:text-2xl font-black leading-none text-slate-700">
                {language === 'ne' ? word.ne : word.en}
              </strong>
              <span className="mt-1.5 text-xs sm:text-sm font-bold text-slate-400">
                {language === 'ne' ? word.en : word.ne}
              </span>
            </div>
            
            {/* Interactive hover glow */}
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none"
              style={{ background: currentCategory.color }}
            />
          </button>
        ))}
      </section>
    </>
  );
}
