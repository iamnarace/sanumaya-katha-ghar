import { BookOpen, ChevronLeft, ChevronRight, CornerUpLeft, Volume2, Maximize, Share2, Download, X } from 'lucide-react';
import { Arrow, AudioBadge, personalize, SafeImage } from '../ui.jsx';

export default function StoriesSection({ language, profile, storybooks, story, page, storyPage, setStoryPage, setStoryId, swipe, t }) {
  const nextPage = () => setStoryPage((value) => value === story.pages.length - 1 ? 0 : value + 1);
  const prevPage = () => setStoryPage((value) => Math.max(0, value - 1));

  return <>
    {/* Story Selection */}
    <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-black uppercase text-violet-500">{language === 'ne' ? 'निजी चित्रकथा संग्रह' : 'Private picture-book library'}</span>
          <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? `${profile.name} मुख्य पात्र भएका कथा` : `Stories starring ${profile.englishName}`}</h2>
          <p className="mt-1 text-sm text-slate-500">{language === 'ne' ? 'हरेक पानामा ठूलो चित्र, छोटो वाक्य र सजिलो navigation।' : 'A large picture, a short sentence and simple navigation on every page.'}</p>
        </div>
        <BookOpen className="text-amber-400" size={34} />
      </div>
      <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {storybooks.map((item) => (
          <button type="button" key={item.id} onClick={() => { setStoryId(item.id); setStoryPage(0); }} className={`relative h-72 w-[82%] flex-none snap-center overflow-hidden rounded-[1.9rem] border-[4px] bg-amber-50 shadow-xl sm:w-[48%] ${item.id === story.id ? 'border-violet-300' : 'border-white'}`}>
            <SafeImage src={item.cover} alt={personalize(language === 'ne' ? item.titleNe : item.titleEn, profile, language)} fallback={item.fallback} className="h-full w-full" contain />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black shadow">{item.pages.length} {language === 'ne' ? 'पाना' : 'pages'}</span>
            <span className="absolute bottom-4 left-4 right-4 text-left text-white">
              <strong className="block text-2xl leading-tight">{personalize(language === 'ne' ? item.titleNe : item.titleEn, profile, language)}</strong>
              <small className="mt-1 block text-sm font-bold text-white/80">{language === 'ne' ? item.subtitleNe : item.subtitleEn}</small>
            </span>
          </button>
        ))}
      </div>
    </section>

    {/* Book Flipbook Viewer */}
    <section {...swipe} className="relative w-full mx-auto mt-6 rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-white border-b border-slate-100 gap-y-3">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
           <div className="flex items-center gap-2">
             <button className="p-2 text-slate-400 hover:text-slate-800 transition-colors"><CornerUpLeft size={20}/></button>
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
           <button className="p-2 hover:text-slate-800 transition-colors hidden sm:block"><X size={24}/></button>
        </div>
      </div>

      {/* Book Pages Area */}
      <div className="flex flex-col md:flex-row bg-[#e8e9eb] p-2 sm:p-4 md:p-8 lg:p-12 gap-2 md:gap-0 min-h-[500px] md:min-h-[600px]">
        
        {/* Left Page (Image) */}
        <div className="flex-1 bg-white rounded-lg md:rounded-l-2xl md:rounded-r-none book-spine-left relative overflow-hidden z-10 flex flex-col group">
          <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-slate-300/40 to-transparent pointer-events-none hidden md:block z-20"></div>
          
          <div className="flex-1 w-full h-[40vh] md:h-auto flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
             <SafeImage src={page[0]} alt={`${t.page} ${storyPage + 1}`} fallback={story.fallback} className="w-full h-full object-contain drop-shadow-sm" contain />
             {/* Mobile swipe controls overlay */}
             <div className="absolute inset-y-0 left-0 w-16 md:hidden z-30 flex items-center justify-start pl-2">
               <button onClick={prevPage} disabled={storyPage === 0} className="p-3 bg-white/80 rounded-full shadow-lg disabled:opacity-0 active:bg-slate-100"><ChevronLeft size={24} className="text-slate-800"/></button>
             </div>
             <div className="absolute inset-y-0 right-0 w-16 md:hidden z-30 flex items-center justify-end pr-2">
               <button onClick={nextPage} className="p-3 bg-white/80 rounded-full shadow-lg active:bg-slate-100"><ChevronRight size={24} className="text-slate-800"/></button>
             </div>
          </div>
        </div>

        {/* Right Page (Text) */}
        <div className="flex-1 bg-[#fdfcf8] rounded-lg md:rounded-r-2xl md:rounded-l-none book-spine-right relative z-0 flex flex-col">
          <div className="absolute top-0 bottom-0 left-0 w-8 md:w-12 bg-gradient-to-r from-slate-200/50 to-transparent pointer-events-none hidden md:block z-10"></div>
          
          <div className="flex-1 w-full p-8 md:p-14 lg:p-20 flex flex-col justify-center relative">
             <div className="absolute top-6 right-8 text-[10px] sm:text-xs font-black tracking-[0.2em] text-slate-300 uppercase hidden sm:block">
               NARESH ADHIKARI
             </div>
             
             <div className="relative z-20 max-w-lg mx-auto w-full">
               <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-[1.6] md:leading-[1.7] text-slate-800 drop-cap tracking-tight">
                 {personalize(language === 'ne' ? page[1] : page[2], profile, language)}
               </p>
               
               {/* Sound effect / secondary text */}
               {(page[3] || page[4]) && (
                 <p className="mt-8 md:mt-12 text-lg sm:text-xl md:text-2xl font-semibold text-slate-400 italic">
                   {personalize(language === 'ne' ? page[3] : page[4], profile, language)}
                 </p>
               )}
             </div>

             <div className="absolute bottom-6 right-8 text-xs sm:text-sm font-black text-slate-300">
               {storyPage + 1}
             </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}
