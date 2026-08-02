import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, CornerUpLeft, Volume2, Maximize, Share2, Download, X } from 'lucide-react';
import { Arrow, AudioBadge, personalize, SafeImage } from '../ui.jsx';

export default function StoriesSection({ language, profile, storybooks, story, page, storyPage, setStoryPage, setStoryId, swipe, t }) {
  const [isReading, setIsReading] = useState(false);
  const nextPage = () => setStoryPage((value) => value === story.pages.length - 1 ? 0 : value + 1);
  const prevPage = () => setStoryPage((value) => Math.max(0, value - 1));

  return <>
    {/* Story Selection Library */}
    {!isReading && (
      <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase text-violet-500">{language === 'ne' ? 'निजी चित्रकथा संग्रह' : 'Private picture-book library'}</span>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? `${profile.name} मुख्य पात्र भएका कथा` : `Stories starring ${profile.englishName}`}</h2>
            <p className="mt-1 text-sm text-slate-500">{language === 'ne' ? 'हरेक पानामा ठूलो चित्र, छोटो वाक्य र सजिलो navigation।' : 'A large picture, a short sentence and simple navigation on every page.'}</p>
          </div>
          <BookOpen className="text-amber-400" size={34} />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storybooks.map((item) => (
            <button type="button" key={item.id} onClick={() => { setStoryId(item.id); setStoryPage(0); setIsReading(true); }} className="group relative h-80 sm:h-96 w-full flex-col overflow-hidden rounded-[1.9rem] border-[4px] border-white bg-amber-50 shadow-xl transition-transform hover:scale-105 active:scale-95 text-left flex">
              <SafeImage src={item.cover} alt={personalize(language === 'ne' ? item.titleNe : item.titleEn, profile, language)} fallback={item.fallback} className="h-full w-full" contain />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black shadow">{item.pages.length} {language === 'ne' ? 'पाना' : 'pages'}</span>
              <span className="absolute bottom-4 left-4 right-4 text-white">
                <strong className="block text-2xl leading-tight group-hover:text-amber-200 transition-colors">{personalize(language === 'ne' ? item.titleNe : item.titleEn, profile, language)}</strong>
                <small className="mt-1 block text-sm font-bold text-white/80">{language === 'ne' ? item.subtitleNe : item.subtitleEn}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    )}

    {/* Book Flipbook Viewer */}
    {isReading && (
    <section {...swipe} className="relative w-full mx-auto mt-6 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-white border-b border-slate-100 gap-y-3">
         <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
           <div className="flex items-center gap-2">
             <button onClick={() => setIsReading(false)} className="p-2 text-slate-400 hover:text-slate-800 transition-colors" title="Back to Library"><CornerUpLeft size={20}/></button>
             <span className="font-bold text-lg text-slate-800 line-clamp-1">{personalize(language === 'ne' ? story.titleNe : story.titleEn, profile, language)}</span>
           </div>
           
           <div className="flex items-center gap-4 sm:hidden">
             <button onClick={prevPage} disabled={storyPage === 0} className="text-slate-500 disabled:opacity-30"><ChevronLeft size={24}/></button>
             <span className="font-semibold text-sm text-slate-600">{storyPage + 1}/{story.pages.length}</span>
             <button onClick={nextPage} className="text-slate-500"><ChevronRight size={24}/></button>
           </div>
        </div>

        <div className="hidden sm:flex items-center gap-6">
           <button onClick={prevPage} disabled={storyPage === 0} className="text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-30"><ChevronLeft size={24}/></button>
           <span className="font-semibold text-sm text-slate-600">{storyPage + 1}/{story.pages.length}</span>
           <button onClick={nextPage} className="text-slate-500 hover:text-slate-800 transition-colors"><ChevronRight size={24}/></button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-slate-400 w-full sm:w-auto justify-end">
           <button className="p-2 hover:text-slate-800 transition-colors hidden sm:block"><Maximize size={20}/></button>
           <button className="p-2 hover:text-slate-800 transition-colors hidden sm:block"><Download size={20}/></button>
           <button className="p-2 hover:text-slate-800 transition-colors hidden sm:block"><Share2 size={20}/></button>
           <button className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-100 transition-colors">
             <Volume2 size={16} /> Listen
           </button>
           <button onClick={() => setIsReading(false)} className="p-2 hover:text-slate-800 transition-colors hidden sm:block"><X size={24}/></button>
        </div>
      </div>

      {/* Immersive Book Page Area */}
      <div className="flex flex-col relative w-full bg-slate-900 rounded-b-3xl overflow-hidden shadow-inner flex-1">
        
        {/* Full Image */}
        <div className="relative w-full flex-1 min-h-[50vh] sm:min-h-[65vh] flex items-center justify-center">
          <SafeImage src={page[0]} alt={`${t.page} ${storyPage + 1}`} fallback={story.fallback} className="absolute inset-0 w-full h-full object-contain" />
          
          {/* Swipe controls overlay */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 z-30 flex items-center justify-start pl-2 sm:pl-6">
            <button onClick={prevPage} disabled={storyPage === 0} className="p-3 sm:p-5 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full shadow-lg disabled:opacity-0 active:scale-95 transition-all text-white"><ChevronLeft size={36} strokeWidth={3} /></button>
          </div>
          <div className="absolute inset-y-0 right-0 w-24 sm:w-32 z-30 flex items-center justify-end pr-2 sm:pr-6">
            <button onClick={nextPage} className="p-3 sm:p-5 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full shadow-lg active:scale-95 transition-all text-white"><ChevronRight size={36} strokeWidth={3} /></button>
          </div>
        </div>

        {/* Bottom Text Panel */}
        <div className="w-full bg-white px-6 py-8 sm:px-12 sm:py-14 border-t-[6px] border-amber-400 z-20 flex flex-col items-center justify-center text-center relative shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
          <div className="absolute top-4 left-6 text-xs sm:text-sm font-black text-slate-300 hidden sm:block">
            {storyPage + 1} / {story.pages.length}
          </div>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-800 tracking-tight max-w-4xl">
            {personalize(language === 'ne' ? page[1] : page[2], profile, language)}
          </p>
          {(page[3] || page[4]) && (
            <p className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-slate-400 italic">
              {personalize(language === 'ne' ? page[3] : page[4], profile, language)}
            </p>
          )}
        </div>
      </div>
    </section>
    )}
  </>;
}
