import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Gamepad2, Home, Landmark, Settings, Shapes, Sparkles } from 'lucide-react';
import { consonants, defaultProfile, english, family, storybooks, vowels, vocabulary, vocabularyCategories } from './content.js';
import { themes, useSwipe, wrap } from './ui.jsx';
import LearnSection from './sections/LearnSection.jsx';
import GamesSection from './sections/GamesSection.jsx';
import StoriesSection from './sections/StoriesSection.jsx';
import PersonalSection from './sections/PersonalSection.jsx';
import VocabSection from './sections/VocabSection.jsx';

const copy = {
  ne: { learn: 'सिकौँ', games: 'खेल', stories: 'कथा', sanumaya: 'सानुमाया', culture: 'संस्कार', vocab: 'शब्दहरू', audio: 'आवाज पछि थपिनेछ', previous: 'पछाडि', next: 'अर्को', page: 'पाना', reward: 'स्याबास सानुमाया!', tryAgain: 'फेरि प्रयास गरौँ', restart: 'फेरि सुरु गर्ने' },
  en: { learn: 'Learn', games: 'Games', stories: 'Stories', sanumaya: 'Sanumaya', culture: 'Culture', vocab: 'Words', audio: 'Audio coming soon', previous: 'Back', next: 'Next', page: 'Page', reward: 'Well done, Sanumaya!', tryAgain: 'Try again', restart: 'Start again' },
};

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('home');
  const [nepaliSet, setNepaliSet] = useState('consonants');
  const [index, setIndex] = useState(0);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [gameSeed, setGameSeed] = useState(0);
  const [gameMode, setGameMode] = useState('picture');
  const [reward, setReward] = useState('');
  const [profile, setProfile] = useState(defaultProfile);
  const [draftProfile, setDraftProfile] = useState(defaultProfile);
  const [storyId, setStoryId] = useState(storybooks[0].id);
  const [storyPage, setStoryPage] = useState(0);
  const [revealed, setRevealed] = useState({});
  const rewardTimer = useRef(null);
  
  // Parental gate lock
  const holdTimer = useRef(null);

  const t = copy[language];
  const cards = language === 'en' ? english : nepaliSet === 'vowels' ? vowels : consonants;
  const cardIndex = index % cards.length;
  const card = cards[cardIndex];
  const theme = themes[cardIndex % themes.length];
  const story = storybooks.find((item) => item.id === storyId) || storybooks[0];
  const page = story.pages[storyPage];
  const phrase = language === 'en' ? `${card.letter} for ${card.word}` : `${card.letter} बाट ${card.word}`;
  const countTarget = (gameSeed % 3) + 1;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sanumaya-profile');
      if (stored) {
        const parsed = { ...defaultProfile, ...JSON.parse(stored) };
        setProfile(parsed);
        setDraftProfile(parsed);
      }
    } catch {
      // Device storage is optional.
    }
  }, []);

  useEffect(() => {
    setIndex(0);
    setGameSeed(0);
  }, [language, nepaliSet]);

  useEffect(() => () => {
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    if (holdTimer.current) clearTimeout(holdTimer.current);
  }, []);

  const previous = () => setIndex((value) => wrap(value - 1, cards.length));
  const next = () => setIndex((value) => wrap(value + 1, cards.length));
  const cardSwipe = useSwipe(previous, next);
  const cultureSwipe = useSwipe(
    () => setCultureIndex((value) => wrap(value - 1, culture.length)),
    () => setCultureIndex((value) => wrap(value + 1, culture.length)),
  );
  const storySwipe = useSwipe(
    () => setStoryPage((value) => Math.max(0, value - 1)),
    () => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1)),
  );

  const choices = useMemo(() => {
    const indexes = [cardIndex];
    let offset = 1 + gameSeed;
    while (indexes.length < Math.min(3, cards.length)) {
      const candidate = wrap(cardIndex + offset, cards.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 4;
    }
    return indexes
      .map((item) => cards[item])
      .sort((a, b) => ((a.letter.codePointAt(0) + gameSeed) % 5) - ((b.letter.codePointAt(0) + gameSeed) % 5));
  }, [cardIndex, cards, gameSeed]);

  const showReward = (message, duration = 900) => {
    setReward(message);
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(''), duration);
  };

  const choose = (choice) => {
    if (choice.letter !== card.letter) {
      showReward(t.tryAgain, 700);
      return;
    }
    showReward(t.reward);
    setTimeout(() => {
      next();
      setGameSeed((value) => value + 1);
    }, 450);
  };

  const chooseCount = (value) => {
    if (value !== countTarget) {
      showReward(t.tryAgain, 700);
      return;
    }
    showReward(t.reward);
    setGameSeed((current) => current + 1);
  };

  const saveProfile = () => {
    const cleaned = {
      ...draftProfile,
      name: draftProfile.name.trim() || defaultProfile.name,
      englishName: draftProfile.englishName.trim() || defaultProfile.englishName,
      nickname: draftProfile.nickname.trim() || defaultProfile.nickname,
      favouriteAnimal: draftProfile.favouriteAnimal.trim() || defaultProfile.favouriteAnimal,
      favouriteColor: draftProfile.favouriteColor.trim() || defaultProfile.favouriteColor,
      homePlace: draftProfile.homePlace.trim() || defaultProfile.homePlace,
    };
    setProfile(cleaned);
    setDraftProfile(cleaned);
    try {
      localStorage.setItem('sanumaya-profile', JSON.stringify(cleaned));
    } catch {
      // Device storage is optional.
    }
    showReward(language === 'ne' ? 'सानुमायाको जानकारी सुरक्षित भयो 💛' : 'Sanumaya profile saved 💛', 1100);
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    setDraftProfile(defaultProfile);
    try {
      localStorage.removeItem('sanumaya-profile');
    } catch {
      // Device storage is optional.
    }
  };

  const handleSettingsHold = () => {
    holdTimer.current = setTimeout(() => {
      setSection('sanumaya');
    }, 1500); // 1.5 second hold for parental gate
  };

  const cancelSettingsHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  if (section === 'home') {
    return (
      <div className="relative w-full min-h-[100dvh] bg-gradient-to-b from-[#8fd3f4] to-[#84fab0] flex flex-col items-center justify-center overflow-hidden p-4 select-none">
        {/* Animated Background Clouds */}
        <div className="absolute top-10 left-10 w-32 h-10 bg-white/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-16 bg-white/30 rounded-full blur-2xl float-hand"></div>
        <div className="absolute top-40 right-20 w-24 h-8 bg-white/50 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Title Area */}
        <div className="absolute top-[8vh] z-20 text-center w-full px-4">
          <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] tracking-wide leading-tight">
            {language === 'ne' ? 'सानुमायाको कथाघर' : "Sanumaya's World"}
          </h1>
          <p className="mt-2 text-white/90 font-bold text-sm sm:text-lg drop-shadow-sm">
            {language === 'ne' ? 'रमाइलो संसारमा स्वागत छ!' : 'Welcome to the fun learning world!'}
          </p>
        </div>

        {/* Personalized Stickers */}
        <img src="/images/stickers/waving.png" className="absolute top-32 left-4 sm:left-12 w-24 sm:w-32 opacity-80 mix-blend-multiply -rotate-12 float-hand z-10" alt="" />
        <img src="/images/stickers/laughing.png" className="absolute top-24 right-4 sm:right-16 w-24 sm:w-32 opacity-80 mix-blend-multiply rotate-12 float-hand z-10" style={{ animationDelay: '1s' }} alt="" />
        <img src="/images/stickers/pointing.png" className="absolute bottom-16 left-4 sm:left-12 w-24 sm:w-32 opacity-80 mix-blend-multiply rotate-6 float-hand z-10" style={{ animationDelay: '2s' }} alt="" />
        <img src="/images/stickers/namaste.png" className="absolute bottom-20 right-4 sm:right-12 w-24 sm:w-32 opacity-80 mix-blend-multiply -rotate-6 float-hand z-10" style={{ animationDelay: '0.5s' }} alt="" />

        {/* Parental Gate & Controls */}
        <button 
          onPointerDown={handleSettingsHold}
          onPointerUp={cancelSettingsHold}
          onPointerLeave={cancelSettingsHold}
          className="absolute top-6 right-6 z-30 p-3 sm:p-4 bg-white/20 hover:bg-white/40 active:bg-white/60 backdrop-blur-md rounded-full text-white shadow-lg transition-all"
          title="Hold for 1.5s to open Settings"
        >
          <Settings size={28} />
        </button>

        <button 
          onClick={() => setLanguage(language === 'ne' ? 'en' : 'ne')} 
          className="absolute top-6 left-6 z-30 px-5 py-3 sm:px-6 sm:py-4 bg-white/20 hover:bg-white/40 active:scale-95 backdrop-blur-md rounded-full text-white font-black text-lg sm:text-xl shadow-lg transition-all"
        >
          {language === 'ne' ? 'EN' : 'ने'}
        </button>

        {/* The 4 Giant Portals */}
        <div className="z-10 grid grid-cols-2 gap-4 sm:gap-6 md:gap-10 w-full max-w-2xl mt-10 sm:mt-16">
          <button onClick={() => setSection('learn')} className="group relative aspect-square bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] rounded-[2.5rem] sm:rounded-[4rem] border-[6px] border-white/70 shadow-[0_20px_50px_rgba(255,154,158,0.5)] transform transition-transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-4 float-hand" style={{ animationDelay: '0s' }}>
            <span className="text-[5.5rem] sm:text-[6rem] md:text-[7.5rem] font-black text-white drop-shadow-md leading-none pt-4 tracking-tighter">
              {language === 'ne' ? 'क' : 'ABC'}
            </span>
            <span className="text-xl sm:text-3xl font-black text-white/95">{t.learn}</span>
          </button>

          <button onClick={() => setSection('stories')} className="group relative aspect-square bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb] rounded-[2.5rem] sm:rounded-[4rem] border-[6px] border-white/70 shadow-[0_20px_50px_rgba(161,140,209,0.5)] transform transition-transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-4 float-hand" style={{ animationDelay: '0.2s' }}>
            <BookOpen className="w-16 h-16 sm:w-28 sm:h-28 text-white drop-shadow-md" strokeWidth={2.5} />
            <span className="text-xl sm:text-3xl font-black text-white/95 mt-2">{t.stories}</span>
          </button>

          <button onClick={() => setSection('games')} className="group relative aspect-square bg-gradient-to-br from-[#f6d365] to-[#fda085] rounded-[2.5rem] sm:rounded-[4rem] border-[6px] border-white/70 shadow-[0_20px_50px_rgba(246,211,101,0.5)] transform transition-transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-4 float-hand" style={{ animationDelay: '0.4s' }}>
            <Gamepad2 className="w-16 h-16 sm:w-28 sm:h-28 text-white drop-shadow-md" strokeWidth={2.5} />
            <span className="text-xl sm:text-3xl font-black text-white/95 mt-2">{t.games}</span>
          </button>

          <button onClick={() => setSection('vocab')} className="group relative aspect-square bg-gradient-to-br from-[#4facfe] to-[#00f2fe] rounded-[2.5rem] sm:rounded-[4rem] border-[6px] border-white/70 shadow-[0_20px_50px_rgba(79,172,254,0.5)] transform transition-transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-4 float-hand" style={{ animationDelay: '0.6s' }}>
            <Landmark className="w-16 h-16 sm:w-28 sm:h-28 text-white drop-shadow-md" strokeWidth={2.5} />
            <span className="text-xl sm:text-3xl font-black text-white/95 mt-2">{t.vocab}</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Section View
  return (
    <div className="min-h-[100dvh] select-none bg-[#fbfaf7] pb-10 text-slate-700 relative">
      {/* Floating Home Button */}
      <button 
        onClick={() => setSection('home')} 
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 p-3 sm:p-4 bg-white border-[3.5px] border-slate-100 rounded-[1.2rem] shadow-xl hover:scale-105 active:scale-95 transition-transform text-slate-400 hover:text-violet-500"
      >
        <Home size={26} strokeWidth={3} />
      </button>

      {reward && (
        <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-slate-900/10 p-4">
          <div className="rounded-3xl border border-white bg-white/95 px-6 py-5 text-center text-2xl font-black shadow-2xl">
            🌟 {reward}
          </div>
        </div>
      )}

      <main className="mx-auto grid w-full max-w-5xl gap-4 px-3 pt-24 sm:pt-32 pb-4 sm:px-5">
        {section === 'learn' && <LearnSection {...{ language, nepaliSet, setNepaliSet, cards, cardIndex, setIndex, card, theme, phrase, previous, next, swipe: cardSwipe, t }} />}
        {section === 'vocab' && <VocabSection {...{ language, vocabularyCategories, vocabulary, t }} />}
        {section === 'games' && <GamesSection {...{ language, gameMode, setGameMode, card, phrase, choices, choose, countTarget, chooseCount, previous, next, newRound: () => setGameSeed((value) => value + 1), t }} />}
        {section === 'stories' && <StoriesSection {...{ language, profile, storybooks, story, page, storyPage, setStoryPage, setStoryId, swipe: storySwipe, t }} />}
        {section === 'sanumaya' && <PersonalSection {...{ language, profile, draftProfile, setDraftProfile, saveProfile, resetProfile, family, revealed, setRevealed }} />}
      </main>
    </div>
  );
}
