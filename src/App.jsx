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
  Volume2Off,
} from 'lucide-react';

const nepaliVowels = [
  ['अ', 'अनार', 'Pomegranate', '🔴'],
  ['आ', 'आमा', 'Mum', '👩‍👧'],
  ['इ', 'इन्द्रेणी', 'Rainbow', '🌈'],
  ['ई', 'ईश्वर', 'God', '🙏'],
  ['उ', 'उल्लु', 'Owl', '🦉'],
  ['ऊ', 'ऊन', 'Wool', '🧶'],
  ['ऋ', 'ऋषि', 'Sage', '🧘'],
  ['ए', 'एक', 'One', '1️⃣'],
  ['ऐ', 'ऐना', 'Mirror', '🪞'],
  ['ओ', 'ओखर', 'Walnut', '🌰'],
  ['औ', 'औँठी', 'Ring', '💍'],
  ['अं', 'अंगुर', 'Grapes', '🍇'],
  ['अः', 'अः!', 'A sound', '😮'],
].map(([letter, word, translation, icon]) => ({ letter, word, translation, icon }));

const nepaliConsonants = [
  ['क', 'कमल', 'Lotus', '🪷'], ['ख', 'खरायो', 'Rabbit', '🐰'],
  ['ग', 'गाई', 'Cow', '🐄'], ['घ', 'घर', 'Home', '🏠'], ['ङ', 'ङ वर्ण', 'Nepali letter', '🔤'],
  ['च', 'चरा', 'Bird', '🐦'], ['छ', 'छाता', 'Umbrella', '☂️'],
  ['ज', 'जहाज', 'Aeroplane', '✈️'], ['झ', 'झण्डा', 'Flag', '🇳🇵'], ['ञ', 'ञ वर्ण', 'Nepali letter', '🔤'],
  ['ट', 'टमाटर', 'Tomato', '🍅'], ['ठ', 'ठेला', 'Cart', '🛒'],
  ['ड', 'डमरु', 'Damaru', '🥁'], ['ढ', 'ढोका', 'Door', '🚪'], ['ण', 'ण वर्ण', 'Nepali letter', '🔤'],
  ['त', 'तरकारी', 'Vegetables', '🥕'], ['थ', 'थाल', 'Plate', '🍽️'],
  ['द', 'दियो', 'Lamp', '🪔'], ['ध', 'धारा', 'Tap', '🚰'], ['न', 'नमस्ते', 'Namaste', '🙏'],
  ['प', 'पुतली', 'Butterfly', '🦋'], ['फ', 'फूल', 'Flower', '🌸'],
  ['ब', 'बुवा', 'Dad', '👨‍👧'], ['भ', 'भगवान', 'God', '🕉️'], ['म', 'मादल', 'Madal', '🥁'],
  ['य', 'याक', 'Yak', '🐂'], ['र', 'रथ', 'Chariot', '🛺'],
  ['ल', 'लालीगुराँस', 'Rhododendron', '🌺'], ['व', 'विमान', 'Aeroplane', '✈️'],
  ['श', 'शिव', 'Shiva', '🔱'], ['ष', 'ष वर्ण', 'Nepali letter', '🔤'],
  ['स', 'सानुमाया', 'Sanumaya', '💖'], ['ह', 'हात्ती', 'Elephant', '🐘'],
  ['क्ष', 'क्षमा', 'Forgiveness', '🤝'], ['त्र', 'त्रिशूल', 'Trident', '🔱'], ['ज्ञ', 'ज्ञान', 'Knowledge', '📚'],
].map(([letter, word, translation, icon]) => ({ letter, word, translation, icon }));

const englishLetters = [
  ['A', 'Apple', '🍎'], ['B', 'Ball', '⚽'], ['C', 'Cat', '🐱'], ['D', 'Dog', '🐶'],
  ['E', 'Elephant', '🐘'], ['F', 'Flower', '🌸'], ['G', 'Garden', '🌻'], ['H', 'House', '🏠'],
  ['I', 'Ice cream', '🍦'], ['J', 'Juice', '🧃'], ['K', 'Kite', '🪁'], ['L', 'Lotus', '🪷'],
  ['M', 'Moon', '🌙'], ['N', 'Nest', '🪺'], ['O', 'Orange', '🍊'], ['P', 'Parrot', '🦜'],
  ['Q', 'Queen', '👑'], ['R', 'Rabbit', '🐰'], ['S', 'Sanumaya', '💖'], ['T', 'Tiger', '🐯'],
  ['U', 'Umbrella', '☂️'], ['V', 'Van', '🚐'], ['W', 'Water', '💧'], ['X', 'Xylophone', '🎼'],
  ['Y', 'Yak', '🐂'], ['Z', 'Zebra', '🦓'],
].map(([letter, word, icon]) => ({ letter, word, translation: '', icon }));

const cultureCards = [
  ['namaste', 'नमस्ते', 'Namaste', '🙏', 'दुई हात जोडेर आदरका साथ नमस्ते गरौँ।', 'We join our hands to greet someone with respect.', '#fff8df', '#f4d98a'],
  ['ganesh', 'गणेश भगवान', 'Lord Ganesh', '🕉️', 'गणेश भगवानलाई फूल चढाएर नमस्ते गरौँ।', 'We offer flowers and greet Lord Ganesh respectfully.', '#fff1df', '#f3c88d'],
  ['shiva', 'शिव भगवान', 'Lord Shiva', '🔱', 'शान्त शिव भगवान, डमरु र हिमाल।', 'A gentle introduction to Lord Shiva, the damaru and the Himalayas.', '#eef3ff', '#c9d6f7'],
  ['puja', 'पूजा', 'Puja', '🌺', 'फूल, दियो र श्रद्धासँग पूजा गरिन्छ।', 'Puja is a respectful family prayer with flowers and a lamp.', '#fff2f4', '#efcbd2'],
  ['tika', 'टीका', 'Tika', '🔴', 'टीका माया र आशीर्वादको चिन्ह हो।', 'Tika is a loving mark of blessing.', '#fff4ec', '#f2d1b9'],
  ['madal', 'मादल', 'Madal', '🥁', 'मादल नेपाली बाजा हो।', 'The madal is a traditional Nepali drum.', '#f6f0e7', '#dbc6ab'],
  ['diya', 'दियो', 'Diyo', '🪔', 'दियोले घर उज्यालो बनाउँछ।', 'A diya brings a warm light to the home.', '#fff9df', '#eddb9e'],
  ['temple', 'मन्दिर', 'Temple', '🛕', 'मन्दिरमा शान्त भएर नमस्ते गरौँ।', 'At the temple we are calm and respectful.', '#f3efff', '#d8cdf4'],
  ['dashain', 'दशैं', 'Dashain', '🌾', 'दशैंमा टीका, जमरा र परिवारको आशीर्वाद।', 'Dashain brings tika, jamara and family blessings.', '#eef8ea', '#cce2c3'],
  ['tihar', 'तिहार', 'Tihar', '✨', 'तिहारमा दियो, फूलमाला र उज्यालो हुन्छ।', 'Tihar is filled with diyas, flower garlands and light.', '#eef6ff', '#c8def3'],
].map(([id, titleNe, titleEn, icon, descriptionNe, descriptionEn, background, border]) => ({
  id, titleNe, titleEn, icon, descriptionNe, descriptionEn, background, border,
}));

const stories = [
  {
    id: 'red-flower',
    titleNe: 'सानुमाया र रातो फूल',
    titleEn: 'Sanumaya and the Red Flower',
    cover: '/images/rose.jpg',
    icon: '🌹',
    pages: [
      ['/images/rose.jpg', '🌤️', 'बिहान सानुमाया बगैँचामा गइन्।', 'One morning, Sanumaya went into the garden.'],
      ['/images/rose.jpg', '🌹', 'उनले एउटा सुन्दर रातो फूल देखिन्।', 'She saw a beautiful red flower.'],
      ['/images/bench.jpg', '🦋', 'एउटा सानो पुतली फूलमाथि बस्यो।', 'A little butterfly landed on the flower.'],
      ['/images/bench.jpg', '👏', 'सानुमायाले भनिन्, “रातो फूल!”', 'Sanumaya said, “Red flower!”'],
      ['/images/family.jpg', '💖', 'आमा र बुवाले भने, “स्याबास सानुमाया!”', 'Mum and Dad said, “Well done, Sanumaya!”'],
    ],
  },
  {
    id: 'holi',
    titleNe: 'सानुमायाको रङ्गीन होली',
    titleEn: "Sanumaya's Colourful Holi",
    cover: '/images/holi.jpg',
    icon: '🎨',
    pages: [
      ['/images/holi.jpg', '🎉', 'आज होली हो। सानुमाया धेरै खुसी छिन्।', 'Today is Holi. Sanumaya is very happy.'],
      ['/images/holi.jpg', '🔴', 'यो रातो रङ हो।', 'This colour is red.'],
      ['/images/holi.jpg', '🟡', 'यो पहेँलो रङ हो।', 'This colour is yellow.'],
      ['/images/traditional.jpg', '🙏', 'सानुमायाले सबैलाई नमस्ते गरिन्।', 'Sanumaya greeted everyone with Namaste.'],
      ['/images/family.jpg', '🌈', 'परिवारसँग होली झन् रमाइलो भयो।', 'Holi was even more fun with family.'],
    ],
  },
  {
    id: 'madal',
    titleNe: 'सानुमाया र सानो मादल',
    titleEn: 'Sanumaya and the Little Madal',
    cover: '/images/traditional.jpg',
    icon: '🥁',
    pages: [
      ['/images/traditional.jpg', '🎁', 'सानुमायाले एउटा सानो मादल देखिन्।', 'Sanumaya found a little madal.'],
      ['/images/traditional.jpg', '🥁', 'उनले मादलमा बिस्तारै टक् टक् गरिन्।', 'She gently tapped the madal: tak, tak.'],
      ['/images/bench.jpg', '🎵', 'मादलले भन्यो, “धिन ता, धिन ता!”', 'The madal sang, “Dhin ta, dhin ta!”'],
      ['/images/bench.jpg', '💃', 'सानुमाया हाँस्दै नाच्न थालिन्।', 'Sanumaya smiled and began to dance.'],
      ['/images/family.jpg', '👏', 'सबैले ताली बजाए। स्याबास सानुमाया!', 'Everyone clapped. Well done, Sanumaya!'],
    ],
  },
].map((story) => ({
  ...story,
  pages: story.pages.map(([image, icon, ne, en]) => ({ image, icon, ne, en })),
}));

const family = [
  ['ama-buwa', 'आमा, बुवा र सानुमाया', 'Mum, Dad and Sanumaya', '/images/family.jpg', '👨‍👩‍👧'],
  ['hajurba', 'हजुरबा', 'Grandfather', '', '👴'],
  ['hajurama', 'हजुरआमा', 'Grandmother', '', '👵'],
  ['mama', 'मामा', 'Maternal uncle', '', '🧔'],
  ['maiju', 'माइजु', 'Aunt', '', '👩'],
].map(([id, titleNe, titleEn, image, icon]) => ({ id, titleNe, titleEn, image, icon }));

const copy = {
  ne: {
    learn: 'सिकौँ', culture: 'संस्कार', stories: 'कथा', family: 'परिवार',
    subtitle: 'सानुमायाको निजी नेपाली–अङ्ग्रेजी सिकाइ संसार',
    swipe: 'बायाँ वा दायाँ swipe गरेर अर्को कार्ड हेर्नुहोस्',
    find: 'सही चित्र छुनुहोस्', reveal: 'को हो? छोएर हेरौँ',
    wellDone: 'स्याबास सानुमाया!', page: 'पृष्ठ', audioSoon: 'आवाज पछि थपिनेछ',
  },
  en: {
    learn: 'Learn', culture: 'Culture', stories: 'Stories', family: 'Family',
    subtitle: "Sanumaya's private Nepali–English learning world",
    swipe: 'Swipe left or right to see the next card',
    find: 'Tap the correct picture', reveal: 'Who is it? Tap to reveal',
    wellDone: 'Well done, Sanumaya!', page: 'Page', audioSoon: 'Audio coming soon',
  },
};

const navItems = [
  ['learn', Shapes], ['culture', Landmark], ['stories', BookOpen], ['family', Users],
];

const cardThemes = [
  { background: 'linear-gradient(145deg, #f7f2ff, #eee8fb)', border: '#d9cff0', accent: '#665b86' },
  { background: 'linear-gradient(145deg, #eef8ff, #e4f0f8)', border: '#c9deeb', accent: '#496d83' },
  { background: 'linear-gradient(145deg, #effaf4, #e5f3ea)', border: '#c9e2d2', accent: '#4e7760' },
  { background: 'linear-gradient(145deg, #fff7ea, #f8eddc)', border: '#ead7b8', accent: '#8a6a3c' },
  { background: 'linear-gradient(145deg, #fff2f3, #f8e7e9)', border: '#e8cbd0', accent: '#8a5d66' },
];

const wrap = (value, length) => (value + length) % length;

function SafeImage({ src, alt, fallback, className = '' }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-violet-100 to-sky-100 ${className}`} role="img" aria-label={alt}>
        <span className="text-7xl drop-shadow-sm">{fallback}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} draggable="false" onError={() => setFailed(true)} />;
}

function useSwipe(previous, next) {
  const startX = useRef(null);

  return {
    onPointerDown: (event) => {
      startX.current = event.clientX;
    },
    onPointerUp: (event) => {
      if (startX.current === null) return;
      const distance = event.clientX - startX.current;
      startX.current = null;
      if (Math.abs(distance) < 45) return;
      if (distance > 0) previous();
      else next();
    },
    onPointerCancel: () => { startX.current = null; },
  };
}

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('learn');
  const [nepaliSet, setNepaliSet] = useState('vowels');
  const [cardIndex, setCardIndex] = useState(0);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [storyId, setStoryId] = useState(stories[0].id);
  const [storyPage, setStoryPage] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [reward, setReward] = useState('');
  const [gameSeed, setGameSeed] = useState(0);
  const rewardTimer = useRef(null);

  const t = copy[language];
  const cards = language === 'en'
    ? englishLetters
    : nepaliSet === 'vowels' ? nepaliVowels : nepaliConsonants;
  const currentCard = cards[cardIndex % cards.length];
  const currentTheme = cardThemes[cardIndex % cardThemes.length];
  const currentCulture = cultureCards[cultureIndex];
  const story = stories.find((item) => item.id === storyId) ?? stories[0];
  const page = story.pages[storyPage] ?? story.pages[0];

  useEffect(() => {
    setCardIndex(0);
    setGameSeed(0);
  }, [language, nepaliSet]);

  useEffect(() => () => {
    if (rewardTimer.current) window.clearTimeout(rewardTimer.current);
  }, []);

  const showReward = () => {
    setReward(t.wellDone);
    if (rewardTimer.current) window.clearTimeout(rewardTimer.current);
    rewardTimer.current = window.setTimeout(() => setReward(''), 1100);
  };

  const previousCard = () => setCardIndex((value) => wrap(value - 1, cards.length));
  const nextCard = () => setCardIndex((value) => wrap(value + 1, cards.length));
  const previousCulture = () => setCultureIndex((value) => wrap(value - 1, cultureCards.length));
  const nextCulture = () => setCultureIndex((value) => wrap(value + 1, cultureCards.length));

  const cardSwipe = useSwipe(previousCard, nextCard);
  const cultureSwipe = useSwipe(previousCulture, nextCulture);
  const storySwipe = useSwipe(
    () => setStoryPage((value) => Math.max(0, value - 1)),
    () => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1)),
  );

  const gameChoices = useMemo(() => {
    const target = cardIndex % cards.length;
    const indexes = [target];
    let offset = 1 + (gameSeed % Math.max(1, cards.length - 1));

    while (indexes.length < Math.min(3, cards.length)) {
      const candidate = wrap(target + offset, cards.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 3;
    }

    return indexes
      .map((index) => cards[index])
      .sort((a, b) => ((a.letter.charCodeAt(0) + gameSeed) % 7) - ((b.letter.charCodeAt(0) + gameSeed) % 7));
  }, [cardIndex, cards, gameSeed]);

  const chooseGameAnswer = (choice) => {
    if (choice.letter !== currentCard.letter) return;
    showReward();
    window.setTimeout(() => {
      setCardIndex((value) => wrap(value + 1, cards.length));
      setGameSeed((value) => value + 1);
    }, 500);
  };

  const learningPhrase = language === 'en'
    ? `${currentCard.letter} for ${currentCard.word}`
    : `${currentCard.letter} बाट ${currentCard.word}`;

  return (
    <div className="min-h-screen select-none bg-[#fbfaf7] pb-28 text-slate-700">
      {reward && (
        <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-slate-900/10 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-3xl border border-white bg-white/95 px-5 py-4 text-slate-700 shadow-2xl">
            <span className="text-5xl">🌟</span>
            <strong className="text-center text-2xl">{reward}</strong>
            <span className="text-5xl">💛</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-[#fbfaf7]/95 px-4 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))] shadow-[0_8px_30px_rgba(74,67,91,0.07)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-500"><Home /></div>
          <div>
            <h1 className="text-2xl font-black leading-none text-slate-700 sm:text-3xl">सानुमायाको कथाघर</h1>
            <p className="mt-1 text-xs font-semibold text-slate-500">{t.subtitle}</p>
          </div>
          <Heart className="text-amber-300" fill="currentColor" />
        </div>

        <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
          <button type="button" onClick={() => setLanguage('ne')} className={`min-h-11 rounded-xl font-black transition ${language === 'ne' ? 'bg-amber-100 text-amber-900 shadow-sm' : 'text-slate-500'}`}>🇳🇵 नेपाली</button>
          <button type="button" onClick={() => setLanguage('en')} className={`min-h-11 rounded-xl font-black transition ${language === 'en' ? 'bg-sky-100 text-sky-900 shadow-sm' : 'text-slate-500'}`}>🇬🇧 English</button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-3xl gap-4 px-3 py-4 sm:px-5">
        {section === 'learn' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-violet-500">
                    {language === 'ne' ? 'नेपाली अक्षर' : 'English alphabet'}
                  </span>
                  <h2 className="mt-1 text-2xl font-black text-slate-700">
                    {language === 'ne' ? 'अक्षर र चित्र सिकौँ' : 'Learn A to Z with pictures'}
                  </h2>
                  <p className="text-sm font-semibold text-slate-500">{t.swipe}</p>
                </div>
                <span className="float-hand text-5xl">👆</span>
              </div>

              {language === 'ne' && (
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1.5">
                  <button type="button" onClick={() => setNepaliSet('vowels')} className={`min-h-14 rounded-xl px-3 text-left transition ${nepaliSet === 'vowels' ? 'bg-violet-100 text-violet-900 shadow-sm' : 'text-slate-500'}`}>
                    <strong className="block text-base">स्वर</strong>
                    <span className="text-xs font-semibold">अ आ इ ई उ ऊ</span>
                  </button>
                  <button type="button" onClick={() => setNepaliSet('consonants')} className={`min-h-14 rounded-xl px-3 text-left transition ${nepaliSet === 'consonants' ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-slate-500'}`}>
                    <strong className="block text-base">व्यञ्जन</strong>
                    <span className="text-xs font-semibold">क ख ग घ ङ</span>
                  </button>
                </div>
              )}
            </section>

            <section
              {...cardSwipe}
              className="relative min-h-[430px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-[0_20px_55px_rgba(74,67,91,0.13)]"
              style={{ background: currentTheme.background, borderColor: currentTheme.border }}
            >
              <button
                type="button"
                aria-label="Previous letter"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => { event.stopPropagation(); previousCard(); }}
                className="absolute left-3 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/85 text-slate-600 shadow-lg backdrop-blur"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next letter"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => { event.stopPropagation(); nextCard(); }}
                className="absolute right-3 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/85 text-slate-600 shadow-lg backdrop-blur"
              >
                <ChevronRight />
              </button>

              <div className="flex min-h-[430px] flex-col items-center justify-center px-16 py-9 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-3 py-2 text-xs font-black text-slate-500 shadow-sm backdrop-blur">
                  <Volume2Off size={17} /> {t.audioSoon}
                </span>
                <span className="mt-3 text-[8.5rem] font-black leading-none drop-shadow-sm sm:text-[10.5rem]" style={{ color: currentTheme.accent }}>
                  {currentCard.letter}
                </span>
                <span className="mt-1 grid h-28 w-28 place-items-center rounded-[2rem] border border-white bg-white/70 text-7xl shadow-sm sm:h-32 sm:w-32 sm:text-8xl">
                  {currentCard.icon}
                </span>
                <strong className="mt-4 text-3xl font-black leading-tight text-slate-700 sm:text-4xl">{learningPhrase}</strong>
                {language === 'ne' && currentCard.translation && (
                  <span className="mt-1 text-sm font-bold text-slate-500">{currentCard.translation}</span>
                )}
                <span className="mt-4 rounded-full bg-white/65 px-3 py-1 text-xs font-black text-slate-500">
                  {cardIndex + 1} / {cards.length}
                </span>
              </div>
            </section>

            <div className="flex snap-x gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cards.map((item, index) => (
                <button
                  type="button"
                  key={`${item.letter}-${index}`}
                  onClick={() => setCardIndex(index)}
                  className={`flex h-20 w-[4.4rem] flex-none snap-center flex-col items-center justify-center rounded-2xl border font-black shadow-sm transition ${index === cardIndex ? 'border-violet-200 bg-violet-100 text-violet-900 -translate-y-1' : 'border-slate-100 bg-white text-slate-600'}`}
                >
                  <span className="text-2xl">{item.letter}</span>
                  <small className="mt-1 text-lg">{item.icon}</small>
                </button>
              ))}
            </div>

            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                    {language === 'ne' ? 'कहाँ छ?' : 'Can you find it?'}
                  </span>
                  <h3 className="mt-1 text-xl font-black text-slate-700">{learningPhrase}</h3>
                  <p className="text-sm font-semibold text-slate-500">{t.find}</p>
                </div>
                <button type="button" aria-label="Refresh choices" onClick={() => setGameSeed((value) => value + 1)} className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600"><RefreshCw size={20} /></button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {gameChoices.map((choice) => (
                  <button type="button" key={choice.letter} onClick={() => chooseGameAnswer(choice)} className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-[#fbfaf7] p-2 active:scale-95">
                    <span className="text-5xl">{choice.icon}</span>
                    <strong className="mt-1 text-sm leading-tight text-slate-600">{choice.word}</strong>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {section === 'culture' && (
          <>
            <section className="flex items-center justify-between gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)]">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-600">नेपाल • परिवार • संस्कार</span>
                <h2 className="mt-1 text-2xl font-black text-slate-700">{language === 'ne' ? 'हाम्रो संस्कृति चिनौँ' : 'Discover our Nepali culture'}</h2>
                <p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'सरल शब्द र सम्मानजनक चित्र' : 'Simple words and respectful visuals'}</p>
              </div>
              <span className="text-5xl">🇳🇵</span>
            </section>

            <section
              {...cultureSwipe}
              className="relative min-h-[420px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-[0_20px_55px_rgba(74,67,91,0.12)]"
              style={{ background: currentCulture.background, borderColor: currentCulture.border }}
            >
              <button type="button" aria-label="Previous card" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); previousCulture(); }} className="absolute left-3 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/85 text-slate-600 shadow-lg"><ChevronLeft /></button>
              <button type="button" aria-label="Next card" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); nextCulture(); }} className="absolute right-3 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/85 text-slate-600 shadow-lg"><ChevronRight /></button>
              <div className="flex min-h-[420px] flex-col items-center justify-center px-16 py-10 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-3 py-2 text-xs font-black text-slate-500"><Volume2Off size={17} /> {t.audioSoon}</span>
                <span className="mt-4 text-[7rem] leading-none drop-shadow-sm sm:text-[9rem]">{currentCulture.icon}</span>
                <h2 className="mt-3 text-4xl font-black leading-none text-slate-700">{language === 'ne' ? currentCulture.titleNe : currentCulture.titleEn}</h2>
                <p className="mt-4 max-w-md text-lg font-bold leading-snug text-slate-600">{language === 'ne' ? currentCulture.descriptionNe : currentCulture.descriptionEn}</p>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {cultureCards.map((item, index) => (
                <button type="button" key={item.id} onClick={() => setCultureIndex(index)} className={`grid min-h-24 grid-cols-[3rem_1fr] items-center gap-2 rounded-2xl border p-2 text-left shadow-sm ${index === cultureIndex ? 'border-violet-200 bg-violet-50 text-violet-900' : 'border-slate-100 bg-white text-slate-600'}`}>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#fbfaf7] text-3xl">{item.icon}</span>
                  <strong className="leading-tight">{language === 'ne' ? item.titleNe : item.titleEn}</strong>
                </button>
              ))}
            </div>
          </>
        )}

        {section === 'stories' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'कथा छान्नुहोस्' : 'Choose a story'}</span>
                  <h2 className="mt-1 text-2xl font-black text-slate-700">{language === 'ne' ? 'सानुमाया मुख्य पात्र भएका कथा' : 'Stories starring Sanumaya'}</h2>
                </div>
                <Sparkles className="text-amber-400" />
              </div>
              <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {stories.map((item) => (
                  <button type="button" key={item.id} onClick={() => { setStoryId(item.id); setStoryPage(0); }} className={`relative h-40 w-[72%] flex-none snap-center overflow-hidden rounded-2xl border-[3px] bg-violet-100 shadow-lg sm:w-[46%] ${item.id === story.id ? 'border-violet-300' : 'border-white'}`}>
                    <SafeImage src={item.cover} alt={language === 'ne' ? item.titleNe : item.titleEn} fallback={item.icon} className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />
                    <strong className="absolute bottom-3 left-3 right-3 text-left text-lg leading-tight text-white">{language === 'ne' ? item.titleNe : item.titleEn}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section {...storySwipe} className="touch-pan-y overflow-hidden rounded-[2rem] border-[4px] border-white bg-white shadow-[0_20px_55px_rgba(74,67,91,0.12)]">
              <div className="relative h-[20rem] overflow-hidden bg-violet-100 sm:h-[26rem]">
                <SafeImage src={page.image} alt={language === 'ne' ? story.titleNe : story.titleEn} fallback={page.icon} className="h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-4 text-6xl drop-shadow-lg">{page.icon}</span>
                <span className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-black text-slate-600 backdrop-blur">{t.page} {storyPage + 1}/{story.pages.length}</span>
              </div>
              <div className="p-5 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? story.titleNe : story.titleEn}</span>
                <p className="mx-auto mt-2 min-h-20 max-w-xl text-2xl font-black leading-snug text-slate-700">{language === 'ne' ? page.ne : page.en}</p>
                <button type="button" disabled className="mt-3 inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-5 font-black text-slate-400"><Volume2Off size={21} /> {t.audioSoon}</button>
              </div>
              <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2 px-4 pb-4">
                <button type="button" disabled={storyPage === 0} onClick={() => setStoryPage((value) => Math.max(0, value - 1))} className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600 disabled:opacity-30"><ChevronLeft /></button>
                <div className="flex justify-center gap-2">{story.pages.map((_, index) => <button type="button" aria-label={`${t.page} ${index + 1}`} key={index} onClick={() => setStoryPage(index)} className={`h-2.5 rounded-full ${index === storyPage ? 'w-8 bg-violet-400' : 'w-2.5 bg-violet-100'}`} />)}</div>
                <button type="button" disabled={storyPage === story.pages.length - 1} onClick={() => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1))} className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600 disabled:opacity-30"><ChevronRight /></button>
              </div>
            </section>
          </>
        )}

        {section === 'family' && (
          <>
            <section className="flex items-center justify-between gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)]">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'मेरो प्यारा परिवार' : 'My loving family'}</span>
                <h2 className="mt-1 text-2xl font-black text-slate-700">{language === 'ne' ? 'छोएर परिवारलाई भेटौँ' : 'Tap to meet the family'}</h2>
                <p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'वास्तविक family voice पछि थपिनेछ।' : 'Real family voices will be added later.'}</p>
              </div>
              <span className="text-5xl">💞</span>
            </section>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {family.map((member, index) => {
                const isRevealed = Boolean(revealed[member.id]);
                const title = language === 'ne' ? member.titleNe : member.titleEn;
                const theme = cardThemes[index % cardThemes.length];

                return (
                  <button
                    type="button"
                    key={member.id}
                    onClick={() => setRevealed((value) => ({ ...value, [member.id]: true }))}
                    className="relative min-h-52 overflow-hidden rounded-3xl border-[3px] text-slate-700 shadow-[0_14px_35px_rgba(74,67,91,0.1)] active:scale-[0.97]"
                    style={{ background: theme.background, borderColor: theme.border }}
                  >
                    {isRevealed ? (
                      <>
                        <SafeImage src={member.image} alt={title} fallback={member.icon} className="absolute inset-0 h-full w-full object-cover" />
                        <span className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                        <strong className="absolute bottom-3 left-3 right-3 text-left text-lg leading-tight text-white">{title}</strong>
                      </>
                    ) : (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                        <span className="gift-bob text-7xl">🎁</span>
                        <strong className="text-sm leading-tight">{t.reveal}</strong>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-[max(0.55rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[min(calc(100%-1rem),45rem)] -translate-x-1/2 grid-cols-4 gap-1 rounded-3xl border border-slate-100 bg-white/95 p-1.5 shadow-[0_16px_45px_rgba(74,67,91,0.16)] backdrop-blur-xl">
        {navItems.map(([id, Icon]) => (
          <button type="button" key={id} onClick={() => setSection(id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-black transition ${section === id ? 'bg-violet-100 text-violet-800 shadow-sm -translate-y-0.5' : 'text-slate-500'}`}>
            <Icon size={22} /><span>{t[id]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
