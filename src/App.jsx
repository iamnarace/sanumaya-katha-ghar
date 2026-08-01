import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Heart, Home, Landmark, RefreshCw, Shapes, Users } from 'lucide-react';
import { consonants, culture, defaultProfile, english, family, storybooks, vowels } from './content.js';
import { themes, useSwipe, wrap } from './ui.jsx';
import LearnSection from './sections/LearnSection.jsx';
import GamesSection from './sections/GamesSection.jsx';
import StoriesSection from './sections/StoriesSection.jsx';
import PersonalSection from './sections/PersonalSection.jsx';
import CultureSection from './sections/CultureSection.jsx';

const copy = {
  ne: { learn: 'सिकौँ', games: 'खेल', stories: 'कथा', sanumaya: 'सानुमाया', culture: 'संस्कार', audio: 'आवाज पछि थपिनेछ', previous: 'पछाडि', next: 'अर्को', page: 'पाना', reward: 'स्याबास सानुमाया!', tryAgain: 'फेरि प्रयास गरौँ', restart: 'फेरि सुरु गर्ने' },
  en: { learn: 'Learn', games: 'Games', stories: 'Stories', sanumaya: 'Sanumaya', culture: 'Culture', audio: 'Audio coming soon', previous: 'Back', next: 'Next', page: 'Page', reward: 'Well done, Sanumaya!', tryAgain: 'Try again', restart: 'Start again' },
};

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('learn');
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

  return <div className="min-h-screen select-none bg-[#fbfaf7] pb-28 text-slate-700">
    {reward && <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-slate-900/10 p-4"><div className="rounded-3xl border border-white bg-white/95 px-6 py-5 text-center text-2xl font-black shadow-2xl">🌟 {reward}</div></div>}
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-[#fbfaf7]/95 px-4 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))] shadow-[0_8px_30px_rgba(74,67,91,0.07)] backdrop-blur-xl"><div className="mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-500"><Home /></div><div><h1 className="text-2xl font-black leading-none sm:text-3xl">सानुमायाको कथाघर</h1><p className="mt-1 text-xs font-semibold text-slate-500">A private learning and story world made only for Sanumaya</p></div><Heart className="text-amber-300" fill="currentColor" /></div><div className="mx-auto mt-3 grid max-w-5xl grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm"><button type="button" onClick={() => setLanguage('ne')} className={`min-h-11 rounded-xl font-black ${language === 'ne' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'}`}>🇳🇵 नेपाली</button><button type="button" onClick={() => setLanguage('en')} className={`min-h-11 rounded-xl font-black ${language === 'en' ? 'bg-sky-100 text-sky-900' : 'text-slate-500'}`}>🇬🇧 English</button></div></header>
    <main className="mx-auto grid w-full max-w-5xl gap-4 px-3 py-4 sm:px-5">
      {section === 'learn' && <LearnSection {...{ language, nepaliSet, setNepaliSet, cards, cardIndex, setIndex, card, theme, phrase, previous, next, swipe: cardSwipe, t }} />}
      {section === 'games' && <GamesSection {...{ language, gameMode, setGameMode, card, phrase, choices, choose, countTarget, chooseCount, previous, next, newRound: () => setGameSeed((value) => value + 1), t }} />}
      {section === 'stories' && <StoriesSection {...{ language, profile, storybooks, story, page, storyPage, setStoryPage, setStoryId, swipe: storySwipe, t }} />}
      {section === 'sanumaya' && <PersonalSection {...{ language, profile, draftProfile, setDraftProfile, saveProfile, resetProfile, family, revealed, setRevealed }} />}
      {section === 'culture' && <CultureSection {...{ language, culture, cultureIndex, setCultureIndex, swipe: cultureSwipe, t }} />}
    </main>
    <nav className="fixed bottom-[max(0.55rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[min(calc(100%-1rem),62rem)] -translate-x-1/2 grid-cols-5 gap-1 rounded-3xl border border-slate-100 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl">{[['learn', Shapes], ['games', RefreshCw], ['stories', BookOpen], ['sanumaya', Users], ['culture', Landmark]].map(([id, Icon]) => <button type="button" key={id} onClick={() => setSection(id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-black sm:text-xs ${section === id ? 'bg-violet-100 text-violet-800' : 'text-slate-500'}`}><Icon size={21} /><span>{t[id]}</span></button>)}</nav>
  </div>;
}
