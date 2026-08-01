import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Landmark,
  RefreshCw,
  Shapes,
  Sparkles,
  Users,
  Volume2,
} from 'lucide-react';
import {
  consonants,
  culture,
  defaultProfile,
  english,
  family,
  gameLinks,
  HB_BASE,
  libraryStories,
  personalStoryTemplates,
  vowels,
} from './content.js';

const copy = {
  ne: {
    learn: 'सिकौँ', games: 'खेल', stories: 'कथा', sanumaya: 'सानुमाया', culture: 'संस्कार',
    audio: 'आवाज पछि थपिनेछ', previous: 'अघिल्लो', next: 'अर्को', page: 'पृष्ठ',
    reward: 'स्याबास सानुमाया!', tryAgain: 'फेरि प्रयास गरौँ', open: 'खोल्नुहोस्',
  },
  en: {
    learn: 'Learn', games: 'Games', stories: 'Stories', sanumaya: 'Sanumaya', culture: 'Culture',
    audio: 'Audio coming soon', previous: 'Previous', next: 'Next', page: 'Page',
    reward: 'Well done, Sanumaya!', tryAgain: 'Try again', open: 'Open',
  },
};

const themes = [
  ['#f5f0ff', '#d9cff0', '#665b86'],
  ['#eef8ff', '#c9deeb', '#496d83'],
  ['#effaf4', '#c9e2d2', '#4e7760'],
  ['#fff7ea', '#ead7b8', '#8a6a3c'],
  ['#fff2f3', '#e8cbd0', '#8a5d66'],
].map(([background, border, accent]) => ({ background, border, accent }));

const consonantGroups = [
  ['क-वर्ग', 'क ख ग घ ङ', 0],
  ['च-वर्ग', 'च छ ज झ ञ', 5],
  ['ट-वर्ग', 'ट ठ ड ढ ण', 10],
  ['त-वर्ग', 'त थ द ध न', 15],
  ['प-वर्ग', 'प फ ब भ म', 20],
  ['अन्य', 'य र ल व श ष स ह', 25],
  ['संयुक्त', 'क्ष त्र ज्ञ', 33],
];

const wrap = (value, length) => (value + length) % length;

function SafeImage({ src, alt, fallback, className = '', contain = false }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-violet-50 to-sky-50 ${className}`}>
        <span className="text-7xl drop-shadow-sm sm:text-8xl">{fallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${contain ? 'object-contain' : 'object-cover'} ${className}`}
      draggable="false"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function useSwipe(previous, next) {
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

function Arrow({ side, onClick, label, disabled = false }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute ${side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white/95 text-slate-600 shadow-xl active:scale-95 disabled:opacity-30`}
    >
      <Icon size={30} strokeWidth={2.5} />
    </button>
  );
}

function AudioBadge({ text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-white/90 px-3 py-2 text-xs font-black text-slate-400 shadow-sm">
      <Volume2 size={17} />
      {text}
    </span>
  );
}

function personalize(text, profile, language) {
  const name = language === 'ne' ? profile.name : profile.englishName;
  const nickname = language === 'ne' ? profile.nickname : profile.englishName;
  return text
    .replaceAll('{name}', name)
    .replaceAll('{nickname}', nickname)
    .replaceAll('{animal}', profile.favouriteAnimal)
    .replaceAll('{color}', profile.favouriteColor)
    .replaceAll('{place}', profile.homePlace);
}

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('learn');
  const [nepaliSet, setNepaliSet] = useState('consonants');
  const [index, setIndex] = useState(0);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [gameSeed, setGameSeed] = useState(0);
  const [reward, setReward] = useState('');
  const [profile, setProfile] = useState(defaultProfile);
  const [draftProfile, setDraftProfile] = useState(defaultProfile);
  const [personalStoryId, setPersonalStoryId] = useState(personalStoryTemplates[0].id);
  const [personalPage, setPersonalPage] = useState(0);
  const [revealed, setRevealed] = useState({});
  const rewardTimer = useRef(null);
  const t = copy[language];

  const cards = language === 'en' ? english : nepaliSet === 'vowels' ? vowels : consonants;
  const cardIndex = index % cards.length;
  const card = cards[cardIndex];
  const theme = themes[cardIndex % themes.length];
  const cultureCard = culture[cultureIndex];
  const personalStory = personalStoryTemplates.find((item) => item.id === personalStoryId) || personalStoryTemplates[0];
  const personalStoryPage = personalStory.pages[personalPage];
  const phrase = language === 'en' ? `${card.letter} for ${card.word}` : `${card.letter} बाट ${card.word}`;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('sanumaya-profile');
      if (stored) {
        const parsed = { ...defaultProfile, ...JSON.parse(stored) };
        setProfile(parsed);
        setDraftProfile(parsed);
      }
    } catch {
      // Device storage is optional; the app still works without it.
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
    () => setPersonalPage((value) => Math.max(0, value - 1)),
    () => setPersonalPage((value) => Math.min(personalStory.pages.length - 1, value + 1)),
  );

  const gameChoices = useMemo(() => {
    const indexes = [cardIndex];
    let offset = 1 + gameSeed;
    while (indexes.length < Math.min(3, cards.length)) {
      const candidate = wrap(cardIndex + offset, cards.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 4;
    }
    return indexes
      .map((itemIndex) => cards[itemIndex])
      .sort((a, b) => ((a.letter.codePointAt(0) + gameSeed) % 5) - ((b.letter.codePointAt(0) + gameSeed) % 5));
  }, [cardIndex, cards, gameSeed]);

  const chooseGameAnswer = (choice) => {
    if (choice.letter !== card.letter) {
      setReward(t.tryAgain);
      if (rewardTimer.current) clearTimeout(rewardTimer.current);
      rewardTimer.current = setTimeout(() => setReward(''), 750);
      return;
    }

    setReward(t.reward);
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(''), 950);
    setTimeout(() => {
      next();
      setGameSeed((value) => value + 1);
    }, 450);
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
      window.localStorage.setItem('sanumaya-profile', JSON.stringify(cleaned));
    } catch {
      // Saving is best effort only.
    }
    setReward(language === 'ne' ? 'सानुमायाको जानकारी सुरक्षित भयो 💛' : 'Sanumaya profile saved 💛');
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(''), 1100);
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    setDraftProfile(defaultProfile);
    try { window.localStorage.removeItem('sanumaya-profile'); } catch { /* optional */ }
  };

  return (
    <div className="min-h-screen select-none bg-[#fbfaf7] pb-28 text-slate-700">
      {reward && (
        <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-slate-900/10 p-4">
          <div className="rounded-3xl border border-white bg-white/95 px-6 py-5 text-center text-2xl font-black shadow-2xl">🌟 {reward}</div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-[#fbfaf7]/95 px-4 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))] shadow-[0_8px_30px_rgba(74,67,91,0.07)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-500"><Home /></div>
          <div>
            <h1 className="text-2xl font-black leading-none sm:text-3xl">सानुमायाको कथाघर</h1>
            <p className="mt-1 text-xs font-semibold text-slate-500">Personal learning, family stories and Nepali culture</p>
          </div>
          <Heart className="text-amber-300" fill="currentColor" />
        </div>

        <div className="mx-auto mt-3 grid max-w-5xl grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
          <button type="button" onClick={() => setLanguage('ne')} className={`min-h-11 rounded-xl font-black ${language === 'ne' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'}`}>🇳🇵 नेपाली</button>
          <button type="button" onClick={() => setLanguage('en')} className={`min-h-11 rounded-xl font-black ${language === 'en' ? 'bg-sky-100 text-sky-900' : 'text-slate-500'}`}>🇬🇧 English</button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl gap-4 px-3 py-4 sm:px-5">
        {section === 'learn' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)] sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'सबै अक्षरमा वास्तविक visual' : 'Large picture alphabet cards'}</span>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? 'एक पटकमा एउटा स्पष्ट अक्षर' : 'One clear letter at a time'}</h2>
                  <p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'चित्रहरू Hamro Barnamala production library बाट आउँछन्।' : 'Swipe or use the large arrow buttons.'}</p>
                </div>
                <span className="float-hand text-5xl">👆</span>
              </div>

              {language === 'ne' && (
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1.5">
                  <button type="button" onClick={() => setNepaliSet('vowels')} className={`min-h-16 rounded-xl px-3 text-left ${nepaliSet === 'vowels' ? 'bg-violet-100 text-violet-900' : 'text-slate-500'}`}>
                    <strong className="block text-lg">स्वर</strong><span className="text-xs">अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः</span>
                  </button>
                  <button type="button" onClick={() => setNepaliSet('consonants')} className={`min-h-16 rounded-xl px-3 text-left ${nepaliSet === 'consonants' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500'}`}>
                    <strong className="block text-lg">व्यञ्जन</strong><span className="text-xs">क देखि ज्ञ • 36 cards</span>
                  </button>
                </div>
              )}

              {language === 'ne' && nepaliSet === 'consonants' && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {consonantGroups.map(([label, letters, start]) => (
                    <button type="button" key={label} onClick={() => setIndex(start)} className="flex-none rounded-2xl border border-slate-100 bg-white px-3 py-2 text-left shadow-sm">
                      <strong className="block text-sm">{label}</strong><span className="text-xs text-slate-400">{letters}</span>
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section {...cardSwipe} className="relative touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-[0_20px_55px_rgba(74,67,91,0.13)]" style={{ background: theme.background, borderColor: theme.border }}>
              <Arrow side="left" label="Previous letter" onClick={previous} />
              <Arrow side="right" label="Next letter" onClick={next} />

              <div className="grid min-h-[610px] items-center gap-4 px-5 py-8 sm:min-h-[560px] sm:grid-cols-[0.72fr_1.28fr] sm:px-20">
                <div className="flex flex-col items-center justify-center text-center">
                  <AudioBadge text={t.audio} />
                  <span className="mt-5 text-[10rem] font-black leading-[0.78] sm:text-[13rem]" style={{ color: theme.accent }}>{card.letter}</span>
                  <span className="mt-6 rounded-full bg-white/75 px-4 py-1.5 text-sm font-black text-slate-500">{cardIndex + 1} / {cards.length}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="grid h-80 w-full max-w-lg place-items-center overflow-hidden rounded-[2.2rem] border-4 border-white bg-white shadow-[0_16px_38px_rgba(74,67,91,0.12)] sm:h-[25rem]">
                    <SafeImage src={card.image} alt={card.word} fallback={card.fallback} className="h-full w-full" contain />
                  </div>
                  <strong className="mt-5 text-center text-4xl font-black leading-tight text-slate-800 sm:text-5xl">{phrase}</strong>
                  {language === 'ne' && <span className="mt-1 text-base font-bold text-slate-500">{card.translation}</span>}
                </div>
              </div>
            </section>

            <div className="flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cards.map((item, itemIndex) => (
                <button type="button" key={`${item.letter}-${itemIndex}`} onClick={() => setIndex(itemIndex)} className={`flex h-24 w-[5.3rem] flex-none flex-col items-center justify-center overflow-hidden rounded-2xl border font-black shadow-sm ${itemIndex === cardIndex ? 'border-violet-200 bg-violet-100 text-violet-900' : 'border-slate-100 bg-white'}`}>
                  <span className="text-3xl">{item.letter}</span>
                  <span className="mt-1 grid h-10 w-14 place-items-center overflow-hidden rounded-lg bg-white/80">
                    <SafeImage src={item.image} alt={item.word} fallback={item.fallback} className="h-full w-full" contain />
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {section === 'games' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
              <span className="text-xs font-black uppercase text-emerald-600">Toddler quick play</span>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? 'सही चित्र कहाँ छ?' : 'Can you find the right picture?'}</h2>
              <p className="text-sm font-semibold text-slate-500">{phrase}</p>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
                {gameChoices.map((choice) => (
                  <button type="button" key={choice.letter} onClick={() => chooseGameAnswer(choice)} className="flex min-h-48 flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-[#fbfaf7] p-2 shadow-sm active:scale-95">
                    <span className="grid h-32 w-full place-items-center overflow-hidden rounded-2xl bg-white">
                      <SafeImage src={choice.image} alt={choice.word} fallback={choice.fallback} className="h-full w-full" contain />
                    </span>
                    <strong className="mt-3 text-base leading-tight sm:text-lg">{choice.word}</strong>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex justify-between gap-3">
                <button type="button" onClick={previous} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-violet-50 px-4 font-black text-violet-700"><ChevronLeft /> {t.previous}</button>
                <button type="button" onClick={() => setGameSeed((value) => value + 1)} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-sky-50 px-4 font-black text-sky-700"><RefreshCw size={20} /> New choices</button>
                <button type="button" onClick={next} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-violet-50 px-4 font-black text-violet-700">{t.next} <ChevronRight /></button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase text-violet-500">Hamro Barnamala games</span>
                  <h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'Production website का थप खेलहरू' : 'More games from the production website'}</h2>
                  <p className="text-sm text-slate-500">{language === 'ne' ? 'सानुमाया ठूलो हुँदै जाँदा उपयोगी हुने structured games।' : 'Structured games for later learning stages.'}</p>
                </div>
                <Shapes className="text-violet-400" size={30} />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {gameLinks.map((game) => (
                  <a key={game.title} href={game.url} target="_blank" rel="noreferrer" className="grid min-h-32 grid-cols-[4rem_1fr_auto] items-center gap-3 rounded-3xl border border-slate-100 bg-[#fbfaf7] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-4xl shadow-sm">{game.icon}</span>
                    <span><strong className="block text-lg">{game.title}</strong><span className="mt-1 block text-sm text-slate-500">{game.description}</span><small className="mt-2 block font-black text-violet-500">{game.meta}</small></span>
                    <ChevronRight className="text-slate-300" />
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {section === 'stories' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase text-violet-500">59 bilingual stories • 25 categories</span>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">Hamro Barnamala Story Library</h2>
                  <p className="mt-1 text-sm text-slate-500">{language === 'ne' ? 'Production website का कथा यहीँबाट छानेर खोल्न सकिन्छ।' : 'Choose a story here and open the production reading page.'}</p>
                </div>
                <BookOpen className="text-amber-400" size={32} />
              </div>
              <a href={`${HB_BASE}/stories`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-violet-100 px-5 font-black text-violet-800">{language === 'ne' ? 'सबै 59 कथा हेर्नुहोस्' : 'Browse all 59 stories'} <ChevronRight /></a>
            </section>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {libraryStories.map((story) => (
                <a key={story.slug} href={story.url} target="_blank" rel="noreferrer" className="overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-56 bg-slate-100">
                    <SafeImage src={story.image} alt={story.titleNe} fallback="📖" className="h-full w-full" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700 shadow">{story.category} • {story.level}</span>
                  </div>
                  <div className="p-4">
                    <strong className="block text-xl leading-tight">{language === 'ne' ? story.titleNe : story.titleEn}</strong>
                    <span className="mt-1 block text-sm font-semibold text-slate-400">{language === 'ne' ? story.titleEn : story.titleNe}</span>
                    <p className="mt-3 text-sm text-slate-600">{story.summaryNe}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-black text-violet-600">{t.open} <ChevronRight size={18} /></span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {section === 'sanumaya' && (
          <>
            <section className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-amber-50 p-4 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase text-violet-500">Sanumaya Personal World</span>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? `${profile.name} को आफ्नै कथा संसार` : `${profile.englishName}'s own story world`}</h2>
                  <p className="mt-1 text-sm text-slate-500">{language === 'ne' ? 'नाम, बोलाउने नाम, मनपर्ने जनावर, रङ र बस्ने ठाउँ परिवर्तन गर्न सकिन्छ।' : 'Personalise the name, nickname, favourite animal, colour and home.'}</p>
                </div>
                <Sparkles className="text-amber-400" size={34} />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ['name', 'नेपाली नाम', 'Nepali name'],
                  ['englishName', 'English name', 'English name'],
                  ['nickname', 'बोलाउने नाम', 'Nickname'],
                  ['favouriteAnimal', 'मनपर्ने जनावर', 'Favourite animal'],
                  ['favouriteColor', 'मनपर्ने रङ', 'Favourite colour'],
                  ['homePlace', 'बस्ने ठाउँ', 'Home place'],
                ].map(([key, labelNe, labelEn]) => (
                  <label key={key} className="rounded-2xl border border-white bg-white/90 p-3 shadow-sm">
                    <span className="text-xs font-black text-slate-500">{language === 'ne' ? labelNe : labelEn}</span>
                    <input value={draftProfile[key]} onChange={(event) => setDraftProfile((value) => ({ ...value, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 font-bold outline-none focus:border-violet-300" />
                  </label>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={saveProfile} className="min-h-12 rounded-2xl bg-violet-600 px-5 font-black text-white shadow">{language === 'ne' ? 'व्यक्तिगत जानकारी सुरक्षित गर्नुहोस्' : 'Save personalisation'}</button>
                <button type="button" onClick={resetProfile} className="min-h-12 rounded-2xl bg-white px-5 font-black text-slate-500 shadow-sm">{language === 'ne' ? 'पहिलेकै बनाउनुहोस्' : 'Reset'}</button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
              <span className="text-xs font-black uppercase text-amber-600">Personal picture books</span>
              <h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'सानुमाया नायिका भएका कथाहरू' : 'Picture books starring Sanumaya'}</h2>
              <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {personalStoryTemplates.map((story) => (
                  <button type="button" key={story.id} onClick={() => { setPersonalStoryId(story.id); setPersonalPage(0); }} className={`relative h-64 w-[82%] flex-none snap-center overflow-hidden rounded-[1.8rem] border-[4px] bg-slate-100 shadow-xl sm:w-[48%] ${story.id === personalStory.id ? 'border-violet-300' : 'border-white'}`}>
                    <SafeImage src={story.cover} alt={personalize(language === 'ne' ? story.titleNe : story.titleEn, profile, language)} fallback={story.fallback} className="h-full w-full" />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black shadow">{story.pages.length} {language === 'ne' ? 'चित्र पृष्ठ' : 'picture pages'}</span>
                    <strong className="absolute bottom-4 left-4 right-4 text-left text-2xl leading-tight text-white">{personalize(language === 'ne' ? story.titleNe : story.titleEn, profile, language)}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section {...storySwipe} className="overflow-hidden rounded-[2.2rem] border-[5px] border-white bg-white shadow-[0_24px_60px_rgba(74,67,91,0.16)]">
              <div className="relative h-[34rem] overflow-hidden bg-slate-100 sm:h-[40rem]">
                <SafeImage src={personalStoryPage[0]} alt={personalize(language === 'ne' ? personalStory.titleNe : personalStory.titleEn, profile, language)} fallback={personalStory.fallback} className="h-full w-full" />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-28 right-4 overflow-hidden rounded-[1.4rem] border-4 border-white bg-white p-1 shadow-2xl sm:bottom-24 sm:right-6">
                  <SafeImage src="/images/bench.jpg" alt={profile.englishName} fallback="💖" className="h-28 w-24 rounded-[1rem] sm:h-36 sm:w-32" />
                  <strong className="block py-1 text-center text-xs text-violet-700">{profile.englishName}</strong>
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black shadow">{t.page} {personalPage + 1}/{personalStory.pages.length}</span>
                <div className="absolute bottom-0 left-0 right-0 p-5 pr-32 text-white sm:p-7 sm:pr-44">
                  <span className="text-xs font-black uppercase tracking-wider text-white/75">{personalize(language === 'ne' ? personalStory.titleNe : personalStory.titleEn, profile, language)}</span>
                  <p className="mt-1 text-2xl font-black leading-snug drop-shadow sm:text-4xl">{personalize(language === 'ne' ? personalStoryPage[1] : personalStoryPage[2], profile, language)}</p>
                </div>
                <Arrow side="left" label="Previous story page" disabled={personalPage === 0} onClick={() => setPersonalPage((value) => Math.max(0, value - 1))} />
                <Arrow side="right" label="Next story page" disabled={personalPage === personalStory.pages.length - 1} onClick={() => setPersonalPage((value) => Math.min(personalStory.pages.length - 1, value + 1))} />
              </div>
              <div className="flex gap-2 overflow-x-auto border-t border-slate-100 p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {personalStory.pages.map((page, pageIndex) => (
                  <button type="button" key={`${personalStory.id}-${pageIndex}`} onClick={() => setPersonalPage(pageIndex)} className={`relative h-20 w-16 flex-none overflow-hidden rounded-xl border-2 ${pageIndex === personalPage ? 'border-violet-400' : 'border-white'}`}>
                    <SafeImage src={page[0]} alt={`${t.page} ${pageIndex + 1}`} fallback={personalStory.fallback} className="h-full w-full" />
                    <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900/70 text-[10px] font-black text-white">{pageIndex + 1}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-black uppercase text-violet-500">{language === 'ne' ? 'सानुमायाको परिवार' : "Sanumaya's family"}</span>
              <h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'छोएर परिवारलाई भेटौँ' : 'Tap to meet the family'}</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {family.map((member, memberIndex) => {
                  const active = revealed[member.id];
                  const memberTheme = themes[memberIndex % themes.length];
                  return (
                    <button type="button" key={member.id} onClick={() => setRevealed((value) => ({ ...value, [member.id]: true }))} className="relative min-h-56 overflow-hidden rounded-3xl border-[3px] shadow-lg" style={{ background: memberTheme.background, borderColor: memberTheme.border }}>
                      {active ? (
                        <><SafeImage src={member.image} alt={member.ne} fallback={member.fallback} className="absolute inset-0 h-full w-full" /><span className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" /><strong className="absolute bottom-3 left-3 right-3 text-left text-lg text-white">{language === 'ne' ? member.ne : member.en}</strong></>
                      ) : (
                        <span className="absolute inset-0 flex flex-col items-center justify-center"><span className="gift-bob text-7xl">🎁</span><strong className="mt-2 px-3 text-sm">{language === 'ne' ? 'को हो? छोएर हेरौँ' : 'Who is it? Tap to reveal'}</strong></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {section === 'culture' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-black uppercase text-amber-600">नेपाल • परिवार • संस्कार</span>
              <h2 className="text-2xl font-black">{language === 'ne' ? 'तस्बिरसँग हाम्रो संस्कृति चिनौँ' : 'Discover Nepali culture with pictures'}</h2>
            </section>

            <section {...cultureSwipe} className="relative min-h-[570px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] border-amber-100 bg-amber-50 shadow-xl">
              <Arrow side="left" label="Previous culture card" onClick={() => setCultureIndex((value) => wrap(value - 1, culture.length))} />
              <Arrow side="right" label="Next culture card" onClick={() => setCultureIndex((value) => wrap(value + 1, culture.length))} />
              <div className="flex min-h-[570px] flex-col items-center justify-center px-16 py-8 text-center">
                <AudioBadge text={t.audio} />
                <div className="mt-5 grid h-80 w-full max-w-lg place-items-center overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl">
                  <SafeImage src={cultureCard.image} alt={cultureCard.ne} fallback={cultureCard.fallback} className="h-full w-full" contain />
                </div>
                <h2 className="mt-5 text-4xl font-black sm:text-5xl">{language === 'ne' ? cultureCard.ne : cultureCard.en}</h2>
                <p className="mt-3 max-w-xl text-lg font-bold text-slate-600 sm:text-xl">{language === 'ne' ? cultureCard.descNe : cultureCard.descEn}</p>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {culture.map((item, itemIndex) => (
                <button type="button" key={item.id} onClick={() => setCultureIndex(itemIndex)} className={`overflow-hidden rounded-2xl border p-2 text-left shadow-sm ${itemIndex === cultureIndex ? 'border-violet-200 bg-violet-50' : 'border-slate-100 bg-white'}`}>
                  <span className="grid h-24 w-full place-items-center overflow-hidden rounded-xl bg-slate-50"><SafeImage src={item.image} alt={item.ne} fallback={item.fallback} className="h-full w-full" contain /></span>
                  <strong className="mt-2 block text-sm">{language === 'ne' ? item.ne : item.en}</strong>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-[max(0.55rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[min(calc(100%-1rem),62rem)] -translate-x-1/2 grid-cols-5 gap-1 rounded-3xl border border-slate-100 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl">
        {[
          ['learn', Shapes],
          ['games', RefreshCw],
          ['stories', BookOpen],
          ['sanumaya', Users],
          ['culture', Landmark],
        ].map(([id, Icon]) => (
          <button type="button" key={id} onClick={() => setSection(id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-black sm:text-xs ${section === id ? 'bg-violet-100 text-violet-800' : 'text-slate-500'}`}>
            <Icon size={21} />
            <span>{t[id]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
