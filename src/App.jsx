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

const nepaliLetters = [
  ['अ', 'अनानास', 'Pineapple', '🍍'],
  ['आ', 'आमा', 'Mum', '👩‍👧'],
  ['इ', 'इन्द्रेणी', 'Rainbow', '🌈'],
  ['ई', 'ईश्वर', 'God', '🙏'],
  ['उ', 'उल्लु', 'Owl', '🦉'],
  ['ए', 'एक', 'One', '1️⃣'],
  ['क', 'कमल', 'Lotus', '🪷'],
  ['ख', 'खरायो', 'Rabbit', '🐰'],
  ['ग', 'गाई', 'Cow', '🐄'],
  ['घ', 'घर', 'Home', '🏠'],
  ['च', 'चरा', 'Bird', '🐦'],
  ['छ', 'छाता', 'Umbrella', '☂️'],
  ['ज', 'जहाज', 'Aeroplane', '✈️'],
  ['ट', 'टोपी', 'Cap', '🧢'],
  ['म', 'मादल', 'Nepali drum', '🥁'],
  ['न', 'नमस्ते', 'Namaste', '🙏'],
  ['प', 'पुतली', 'Butterfly', '🦋'],
  ['फ', 'फूल', 'Flower', '🌸'],
  ['ब', 'बुवा', 'Dad', '👨‍👧'],
  ['स', 'सानुमाया', 'Sanumaya', '💖'],
].map(([letter, word, translation, icon]) => ({
  letter,
  word,
  translation,
  icon,
  speech: `${letter} बाट ${word}`,
}));

const englishLetters = [
  ['A', 'Apple', '🍎'], ['B', 'Ball', '⚽'], ['C', 'Cat', '🐱'], ['D', 'Dog', '🐶'],
  ['E', 'Elephant', '🐘'], ['F', 'Flower', '🌸'], ['G', 'Garden', '🌻'], ['H', 'House', '🏠'],
  ['I', 'Ice cream', '🍦'], ['J', 'Juice', '🧃'], ['K', 'Kite', '🪁'], ['L', 'Lotus', '🪷'],
  ['M', 'Moon', '🌙'], ['N', 'Namaste', '🙏'], ['O', 'Orange', '🍊'], ['P', 'Parrot', '🦜'],
  ['Q', 'Queen', '👑'], ['R', 'Rabbit', '🐰'], ['S', 'Sanumaya', '💖'], ['T', 'Tiger', '🐯'],
  ['U', 'Umbrella', '☂️'], ['V', 'Van', '🚐'], ['W', 'Water', '💧'], ['X', 'Xylophone', '🎼'],
  ['Y', 'Yak', '🐂'], ['Z', 'Zebra', '🦓'],
].map(([letter, word, icon]) => ({
  letter,
  word,
  translation: word === 'Sanumaya' ? 'सानुमाया' : '',
  icon,
  speech: `${letter}. ${letter} for ${word}`,
}));

const cultureCards = [
  ['namaste', 'नमस्ते', 'Namaste', '🙏', 'दुई हात जोडेर आदरका साथ नमस्ते गरौँ।', 'We join our hands to greet someone with respect.', 'नमस्ते। दुई हात जोडेर नमस्ते गरौँ।', 'Namaste. We join our hands to greet with respect.', '#e11d48', '#fb7185'],
  ['ganesh', 'गणेश भगवान', 'Lord Ganesh', '🕉️', 'गणेश भगवानलाई फूल चढाएर नमस्ते गरौँ।', 'We offer flowers and greet Lord Ganesh respectfully.', 'गणेश भगवान। ॐ गणेशाय नमः।', 'Lord Ganesh. We greet Lord Ganesh with respect.', '#f97316', '#f59e0b'],
  ['shiva', 'शिव भगवान', 'Lord Shiva', '🔱', 'शान्त शिव भगवान, डमरु र हिमाल।', 'A gentle introduction to Lord Shiva, the damaru and the Himalayas.', 'शिव भगवान। ॐ नमः शिवाय।', 'Lord Shiva. Om Namah Shivaya.', '#0284c7', '#6366f1'],
  ['puja', 'पूजा', 'Puja', '🌺', 'फूल, दियो र श्रद्धासँग पूजा गरिन्छ।', 'Puja is a respectful family prayer with flowers and a lamp.', 'पूजा। फूल र दियो राखेर श्रद्धाले पूजा गरौँ।', 'Puja. A respectful family prayer with flowers and a lamp.', '#db2777', '#f472b6'],
  ['tika', 'टीका', 'Tika', '🔴', 'टीका माया र आशीर्वादको चिन्ह हो।', 'Tika is a loving mark of blessing.', 'टीका। टीका माया र आशीर्वादको चिन्ह हो।', 'Tika is a loving mark of blessing.', '#dc2626', '#f43f5e'],
  ['madal', 'मादल', 'Madal', '🥁', 'मादल नेपाली बाजा हो। धिन ता, धिन ता!', 'The madal is a traditional Nepali drum.', 'मादल। धिन ता, धिन ता। मादल नेपाली बाजा हो।', 'Madal. A traditional Nepali drum. Dhin ta, dhin ta.', '#b45309', '#f59e0b'],
  ['diya', 'दियो', 'Diyo', '🪔', 'दियोले घर उज्यालो बनाउँछ।', 'A diya brings a warm light to the home.', 'दियो। दियोले घर उज्यालो बनाउँछ।', 'Diyo. A small lamp that brings warm light.', '#ca8a04', '#f59e0b'],
  ['temple', 'मन्दिर', 'Temple', '🛕', 'मन्दिरमा शान्त भएर नमस्ते गरौँ।', 'At the temple we are calm and respectful.', 'मन्दिर। मन्दिरमा शान्त भएर नमस्ते गरौँ।', 'Temple. We stay calm and respectful.', '#7c3aed', '#a855f7'],
  ['dashain', 'दशैं', 'Dashain', '🌾', 'दशैंमा टीका, जमरा र परिवारको आशीर्वाद।', 'Dashain brings tika, jamara and family blessings.', 'दशैं। टीका, जमरा र परिवारको आशीर्वाद।', 'Dashain. Tika, jamara and family blessings.', '#15803d', '#65a30d'],
  ['tihar', 'तिहार', 'Tihar', '✨', 'तिहारमा दियो, फूलमाला र उज्यालो हुन्छ।', 'Tihar is filled with diyas, flower garlands and light.', 'तिहार। दियो, फूलमाला र उज्यालो।', 'Tihar. Diyas, flower garlands and beautiful lights.', '#4338ca', '#7c3aed'],
].map(([id, titleNe, titleEn, icon, descriptionNe, descriptionEn, speechNe, speechEn, from, to]) => ({
  id,
  titleNe,
  titleEn,
  icon,
  descriptionNe,
  descriptionEn,
  speechNe,
  speechEn,
  from,
  to,
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
  ['ama-buwa', 'आमा, बुवा र सानुमाया', 'Mum, Dad and Sanumaya', '/images/family.jpg', '👨‍👩‍👧', 'सानुमाया, हामी तिमीलाई धेरै माया गर्छौँ।', 'Sanumaya, we love you very much.'],
  ['hajurba', 'हजुरबा', 'Grandfather', '', '👴', 'नमस्ते सानुमाया, म तिम्रो हजुरबा।', 'Hello Sanumaya, I am your grandfather.'],
  ['hajurama', 'हजुरआमा', 'Grandmother', '', '👵', 'प्यारी सानुमाया, म तिम्रो हजुरआमा।', 'Dear Sanumaya, I am your grandmother.'],
  ['mama', 'मामा', 'Maternal uncle', '', '🧔', 'नमस्ते सानुमाया, म तिम्रो मामा।', 'Hello Sanumaya, I am your uncle.'],
  ['maiju', 'माइजु', 'Aunt', '', '👩', 'नमस्ते सानुमाया, म तिम्री माइजु।', 'Hello Sanumaya, I am your aunt.'],
].map(([id, titleNe, titleEn, image, icon, speechNe, speechEn]) => ({
  id,
  titleNe,
  titleEn,
  image,
  icon,
  speechNe,
  speechEn,
}));

const copy = {
  ne: {
    learn: 'सिकौँ', culture: 'संस्कार', stories: 'कथा', family: 'परिवार',
    subtitle: 'सानुमायाको निजी नेपाली–अङ्ग्रेजी सिकाइ संसार',
    tap: 'छोएर सुनौँ', swipe: 'अर्को कार्डका लागि swipe गर्नुहोस्',
    find: 'सही चित्र छुनुहोस्', listen: 'सुन्नुहोस्', reveal: 'को हो? छोएर हेरौँ',
    wellDone: 'स्याबास सानुमाया!', again: 'फेरि हेरौँ सानुमाया।', page: 'पृष्ठ',
  },
  en: {
    learn: 'Learn', culture: 'Culture', stories: 'Stories', family: 'Family',
    subtitle: "Sanumaya's private Nepali–English learning world",
    tap: 'Tap and listen', swipe: 'Swipe to see the next card',
    find: 'Tap the correct picture', listen: 'Listen', reveal: 'Who is it? Tap to reveal',
    wellDone: 'Well done, Sanumaya!', again: 'Let us look again, Sanumaya.', page: 'Page',
  },
};

const navItems = [
  ['learn', Shapes],
  ['culture', Landmark],
  ['stories', BookOpen],
  ['family', Users],
];

const wrap = (value, length) => (value + length) % length;

function SafeImage({ src, alt, fallback, className = '' }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-rose-200 to-amber-200 ${className}`} role="img" aria-label={alt}>
        <span className="text-7xl drop-shadow">{fallback}</span>
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
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerUp: (event) => {
      if (startX.current === null) return;
      const distance = event.clientX - startX.current;
      startX.current = null;
      if (Math.abs(distance) < 45) return;
      distance > 0 ? previous() : next();
    },
    onPointerCancel: () => { startX.current = null; },
  };
}

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('learn');
  const [letterIndex, setLetterIndex] = useState(0);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [storyId, setStoryId] = useState(stories[0].id);
  const [storyPage, setStoryPage] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [reward, setReward] = useState('');
  const [gameSeed, setGameSeed] = useState(0);
  const rewardTimer = useRef(null);
  const t = copy[language];
  const letters = language === 'ne' ? nepaliLetters : englishLetters;
  const currentLetter = letters[letterIndex % letters.length];
  const currentCulture = cultureCards[cultureIndex];
  const story = stories.find((item) => item.id === storyId) ?? stories[0];
  const page = story.pages[storyPage] ?? story.pages[0];

  useEffect(() => {
    setLetterIndex(0);
    setStoryPage(0);
  }, [language]);

  useEffect(() => () => {
    if (rewardTimer.current) window.clearTimeout(rewardTimer.current);
    window.speechSynthesis?.cancel();
  }, []);

  const speak = (text, celebrate = false) => {
    if (celebrate) {
      setReward(t.wellDone);
      if (rewardTimer.current) window.clearTimeout(rewardTimer.current);
      rewardTimer.current = window.setTimeout(() => setReward(''), 1050);
    }
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = language === 'ne' ? 'ne-NP' : 'en-AU';
    voice.rate = language === 'ne' ? 0.72 : 0.78;
    voice.pitch = 1.08;
    window.speechSynthesis.speak(voice);
  };

  const letterSwipe = useSwipe(
    () => setLetterIndex((value) => wrap(value - 1, letters.length)),
    () => setLetterIndex((value) => wrap(value + 1, letters.length)),
  );
  const cultureSwipe = useSwipe(
    () => setCultureIndex((value) => wrap(value - 1, cultureCards.length)),
    () => setCultureIndex((value) => wrap(value + 1, cultureCards.length)),
  );
  const storySwipe = useSwipe(
    () => setStoryPage((value) => Math.max(0, value - 1)),
    () => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1)),
  );

  const gameChoices = useMemo(() => {
    const target = letterIndex % letters.length;
    const indexes = [target];
    let offset = 1 + (gameSeed % Math.max(1, letters.length - 1));
    while (indexes.length < Math.min(3, letters.length)) {
      const candidate = wrap(target + offset, letters.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 3;
    }
    return indexes
      .map((index) => letters[index])
      .sort((a, b) => ((a.letter.charCodeAt(0) + gameSeed) % 7) - ((b.letter.charCodeAt(0) + gameSeed) % 7));
  }, [gameSeed, letterIndex, letters]);

  const chooseGameAnswer = (choice) => {
    if (choice.letter !== currentLetter.letter) {
      speak(t.again);
      return;
    }
    speak(language === 'ne' ? `स्याबास सानुमाया। ${currentLetter.speech}` : `Well done, Sanumaya. ${currentLetter.speech}`, true);
    window.setTimeout(() => {
      setLetterIndex((value) => wrap(value + 1, letters.length));
      setGameSeed((value) => value + 1);
    }, 650);
  };

  const cardGradient = language === 'ne'
    ? 'linear-gradient(145deg, #f43f5e, #ec4899 55%, #f59e0b)'
    : 'linear-gradient(145deg, #0ea5e9, #6366f1 55%, #a855f7)';

  return (
    <div className="min-h-screen select-none bg-gradient-to-b from-amber-50 via-rose-50 to-orange-50 pb-28 text-slate-800">
      {reward && (
        <div className="reward-layer fixed inset-0 z-[100] grid place-items-center bg-slate-900/20 p-5 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center gap-3 rounded-3xl border-4 border-white bg-gradient-to-br from-rose-600 to-amber-500 px-5 py-4 text-white shadow-2xl">
            <span className="text-5xl">🌟</span>
            <strong className="text-center text-2xl">{reward}</strong>
            <span className="text-5xl">💖</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 rounded-b-[2rem] bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 px-4 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))] text-white shadow-xl">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/40 bg-white/20"><Home /></div>
          <div>
            <h1 className="text-2xl font-black leading-none sm:text-3xl">सानुमायाको कथाघर</h1>
            <p className="mt-1 text-xs font-semibold text-white/85">{t.subtitle}</p>
          </div>
          <Heart className="text-rose-100" fill="currentColor" />
        </div>

        <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 gap-1.5 rounded-2xl border border-white/20 bg-rose-950/20 p-1.5">
          <button type="button" onClick={() => setLanguage('ne')} className={`min-h-11 rounded-xl font-black transition ${language === 'ne' ? 'bg-white text-rose-700 shadow' : 'text-white'}`}>🇳🇵 नेपाली</button>
          <button type="button" onClick={() => setLanguage('en')} className={`min-h-11 rounded-xl font-black transition ${language === 'en' ? 'bg-white text-rose-700 shadow' : 'text-white'}`}>🇬🇧 English</button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-3xl gap-4 px-3 py-4 sm:px-5">
        {section === 'learn' && (
          <>
            <section className="flex items-center justify-between gap-3 rounded-3xl border border-white bg-white/85 p-4 shadow-lg">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">{language === 'ne' ? 'क ख ग • आवाज • चित्र' : 'ABC • sounds • pictures'}</span>
                <h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'छोऊ, सुन र swipe गर' : 'Tap, listen and swipe'}</h2>
                <p className="text-sm font-semibold text-slate-500">{t.swipe}</p>
              </div>
              <span className="float-hand text-5xl">👆</span>
            </section>

            <section {...letterSwipe} className="relative min-h-[430px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[5px] border-white text-white shadow-2xl" style={{ background: cardGradient }}>
              <button type="button" aria-label="Previous letter" onClick={() => setLetterIndex((value) => wrap(value - 1, letters.length))} className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-900/15 backdrop-blur"><ChevronLeft /></button>
              <button type="button" aria-label="Next letter" onClick={() => setLetterIndex((value) => wrap(value + 1, letters.length))} className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-900/15 backdrop-blur"><ChevronRight /></button>

              <button type="button" onClick={() => speak(currentLetter.speech, true)} className="absolute inset-0 flex w-full flex-col items-center justify-center px-14 py-10 active:scale-[0.985]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-900/15 px-3 py-2 text-sm font-black backdrop-blur"><Volume2 size={18} /> {t.tap}</span>
                <span className="-ml-3 mt-2 text-[9rem] font-black leading-none drop-shadow-xl sm:text-[11rem]">{currentLetter.letter}</span>
                <span className="-mt-2 text-7xl drop-shadow-lg sm:text-8xl">{currentLetter.icon}</span>
                <strong className="mt-1 text-4xl font-black leading-none drop-shadow">{currentLetter.word}</strong>
                {currentLetter.translation && <span className="mt-2 font-bold text-white/80">{currentLetter.translation}</span>}
              </button>
            </section>

            <div className="flex snap-x gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {letters.map((item, index) => (
                <button type="button" key={`${item.letter}-${index}`} onClick={() => { setLetterIndex(index); speak(item.speech); }} className={`flex h-20 w-[4.4rem] flex-none snap-center flex-col items-center justify-center rounded-2xl border-2 font-black shadow transition ${index === letterIndex ? 'border-rose-500 bg-rose-500 text-white -translate-y-1' : 'border-rose-100 bg-white text-slate-700'}`}>
                  <span className="text-2xl">{item.letter}</span><small className="mt-1 text-lg">{item.icon}</small>
                </button>
              ))}
            </div>

            <section className="rounded-3xl border border-white bg-white/90 p-4 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-rose-600">{language === 'ne' ? 'कहाँ छ?' : 'Can you find it?'}</span>
                  <h3 className="mt-1 text-xl font-black">{language === 'ne' ? `${currentLetter.letter} बाट ${currentLetter.word}` : `${currentLetter.letter} for ${currentLetter.word}`}</h3>
                  <p className="text-sm font-semibold text-slate-500">{t.find}</p>
                </div>
                <button type="button" aria-label="Refresh choices" onClick={() => setGameSeed((value) => value + 1)} className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-600"><RefreshCw size={20} /></button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {gameChoices.map((choice) => (
                  <button type="button" key={choice.letter} onClick={() => chooseGameAnswer(choice)} className="flex min-h-28 flex-col items-center justify-center rounded-2xl border-2 border-orange-100 bg-orange-50 p-2 active:scale-95">
                    <span className="text-5xl">{choice.icon}</span><strong className="mt-1 text-sm leading-tight">{choice.word}</strong>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {section === 'culture' && (
          <>
            <section className="flex items-center justify-between gap-3 rounded-3xl border border-white bg-white/90 p-4 shadow-lg">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">नेपाल • परिवार • संस्कार</span>
                <h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'हाम्रो संस्कृति चिनौँ' : 'Discover our Nepali culture'}</h2>
                <p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'सरल शब्द, सम्मानजनक चित्र र परिचित आवाज' : 'Simple words, respectful visuals and familiar sounds'}</p>
              </div>
              <span className="text-5xl">🇳🇵</span>
            </section>

            <section {...cultureSwipe} className="relative min-h-[420px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[5px] border-white text-white shadow-2xl" style={{ background: `linear-gradient(145deg, ${currentCulture.from}, ${currentCulture.to})` }}>
              <button type="button" aria-label="Previous card" onClick={() => setCultureIndex((value) => wrap(value - 1, cultureCards.length))} className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-900/15"><ChevronLeft /></button>
              <button type="button" aria-label="Next card" onClick={() => setCultureIndex((value) => wrap(value + 1, cultureCards.length))} className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-900/15"><ChevronRight /></button>
              <button type="button" onClick={() => speak(language === 'ne' ? currentCulture.speechNe : currentCulture.speechEn, true)} className="absolute inset-0 flex w-full flex-col items-center justify-center px-14 py-10 text-center active:scale-[0.985]">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-900/15 px-3 py-2 text-sm font-black"><Volume2 size={18} /> {t.tap}</span>
                <span className="mt-4 text-[7rem] leading-none drop-shadow-xl sm:text-[9rem]">{currentCulture.icon}</span>
                <h2 className="mt-3 text-4xl font-black leading-none drop-shadow">{language === 'ne' ? currentCulture.titleNe : currentCulture.titleEn}</h2>
                <p className="mt-3 max-w-md text-lg font-bold leading-snug text-white/90">{language === 'ne' ? currentCulture.descriptionNe : currentCulture.descriptionEn}</p>
              </button>
            </section>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {cultureCards.map((item, index) => (
                <button type="button" key={item.id} onClick={() => { setCultureIndex(index); speak(language === 'ne' ? item.speechNe : item.speechEn); }} className={`grid min-h-24 grid-cols-[3rem_1fr] items-center gap-2 rounded-2xl border-2 p-2 text-left shadow ${index === cultureIndex ? 'border-rose-300 bg-rose-50 text-rose-800' : 'border-orange-100 bg-white'}`}>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-3xl">{item.icon}</span>
                  <strong className="leading-tight">{language === 'ne' ? item.titleNe : item.titleEn}</strong>
                </button>
              ))}
            </div>
          </>
        )}

        {section === 'stories' && (
          <>
            <section className="rounded-3xl border border-white bg-white/90 p-4 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div><span className="text-xs font-black uppercase tracking-wider text-rose-600">{language === 'ne' ? 'कथा छान्नुहोस्' : 'Choose a story'}</span><h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'सानुमाया मुख्य पात्र भएका कथा' : 'Stories starring Sanumaya'}</h2></div>
                <Sparkles className="text-amber-500" />
              </div>
              <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {stories.map((item) => (
                  <button type="button" key={item.id} onClick={() => { setStoryId(item.id); setStoryPage(0); }} className={`relative h-40 w-[72%] flex-none snap-center overflow-hidden rounded-2xl border-[3px] bg-rose-200 shadow-lg sm:w-[46%] ${item.id === story.id ? 'border-rose-400' : 'border-white'}`}>
                    <SafeImage src={item.cover} alt={language === 'ne' ? item.titleNe : item.titleEn} fallback={item.icon} className="h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <strong className="absolute bottom-3 left-3 right-3 text-left text-lg leading-tight text-white">{language === 'ne' ? item.titleNe : item.titleEn}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section {...storySwipe} className="touch-pan-y overflow-hidden rounded-[2rem] border-[5px] border-white bg-white shadow-2xl">
              <div className="relative h-[20rem] overflow-hidden bg-rose-200 sm:h-[26rem]">
                <SafeImage src={page.image} alt={language === 'ne' ? story.titleNe : story.titleEn} fallback={page.icon} className="h-full w-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-4 text-6xl drop-shadow-lg">{page.icon}</span>
                <span className="absolute right-3 top-3 rounded-full bg-slate-900/40 px-3 py-1 text-xs font-black text-white backdrop-blur">{t.page} {storyPage + 1}/{story.pages.length}</span>
              </div>
              <div className="p-5 text-center">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">{language === 'ne' ? story.titleNe : story.titleEn}</span>
                <p className="mx-auto mt-2 min-h-20 max-w-xl text-2xl font-black leading-snug">{language === 'ne' ? page.ne : page.en}</p>
                <button type="button" onClick={() => speak(language === 'ne' ? page.ne : page.en, storyPage === story.pages.length - 1)} className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-rose-500 px-5 font-black text-white shadow-lg"><Volume2 size={22} /> {t.listen}</button>
              </div>
              <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2 px-4 pb-4">
                <button type="button" disabled={storyPage === 0} onClick={() => setStoryPage((value) => Math.max(0, value - 1))} className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-600 disabled:opacity-30"><ChevronLeft /></button>
                <div className="flex justify-center gap-2">{story.pages.map((_, index) => <button type="button" aria-label={`${t.page} ${index + 1}`} key={index} onClick={() => setStoryPage(index)} className={`h-2.5 rounded-full ${index === storyPage ? 'w-8 bg-rose-500' : 'w-2.5 bg-rose-200'}`} />)}</div>
                <button type="button" disabled={storyPage === story.pages.length - 1} onClick={() => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1))} className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-600 disabled:opacity-30"><ChevronRight /></button>
              </div>
            </section>
          </>
        )}

        {section === 'family' && (
          <>
            <section className="flex items-center justify-between gap-3 rounded-3xl border border-white bg-white/90 p-4 shadow-lg">
              <div><span className="text-xs font-black uppercase tracking-wider text-rose-600">{language === 'ne' ? 'मेरो प्यारा परिवार' : 'My loving family'}</span><h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'छोएर परिवारलाई भेटौँ' : 'Tap to meet the family'}</h2><p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'हरेक कार्ड वास्तविक family voice का लागि तयार छ।' : 'Each card is ready for a real family voice recording.'}</p></div>
              <span className="text-5xl">💞</span>
            </section>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {family.map((member) => {
                const isRevealed = Boolean(revealed[member.id]);
                const title = language === 'ne' ? member.titleNe : member.titleEn;
                return (
                  <button type="button" key={member.id} onClick={() => { setRevealed((value) => ({ ...value, [member.id]: true })); speak(language === 'ne' ? member.speechNe : member.speechEn, true); }} className="relative min-h-52 overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white shadow-xl active:scale-[0.97]">
                    {isRevealed ? (
                      <><SafeImage src={member.image} alt={title} fallback={member.icon} className="absolute inset-0 h-full w-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" /><strong className="absolute bottom-3 left-3 right-9 text-left text-lg leading-tight">{title}</strong><Volume2 className="absolute bottom-3 right-3" size={20} /></>
                    ) : (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3"><span className="gift-bob text-7xl">🎁</span><strong className="text-sm leading-tight">{t.reveal}</strong></span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-[max(0.55rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[min(calc(100%-1rem),45rem)] -translate-x-1/2 grid-cols-4 gap-1 rounded-3xl border border-white/90 bg-white/90 p-1.5 shadow-2xl backdrop-blur-xl">
        {navItems.map(([id, Icon]) => (
          <button type="button" key={id} onClick={() => setSection(id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-black transition ${section === id ? 'bg-rose-500 text-white shadow-lg -translate-y-0.5' : 'text-slate-500'}`}>
            <Icon size={22} /><span>{t[id]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
