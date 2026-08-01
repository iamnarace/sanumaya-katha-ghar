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

const commons = (name, width = 1100) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=${width}`;

const makeCards = (rows) => rows.map(([
  letter,
  word,
  translation,
  fallback,
  image = '',
  credit = '',
  creditUrl = '',
]) => ({ letter, word, translation, fallback, image, credit, creditUrl }));

const vowels = makeCards([
  ['अ', 'अनार', 'Pomegranate', '🍎'],
  ['आ', 'आमा', 'Mum', '👩‍👧', '/images/family.jpg'],
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
]);

const consonants = makeCards([
  ['क', 'कमल', 'Lotus', '🪷', commons('Lotus flower.JPG'), 'Jamil / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Lotus_flower.JPG'],
  ['ख', 'खरायो', 'Rabbit', '🐰', commons('Rabbit photography.jpg'), 'Orumalayalichekkan / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Rabbit_photography.jpg'],
  ['ग', 'गाई', 'Cow', '🐄', commons('Cow photography.jpg'), 'Viveka Ravichandran V / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Cow_photography.jpg'],
  ['घ', 'घर', 'Home', '🏠', commons('Nepal house.jpg'), 'US Government / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Nepal_house.jpg'],
  ['ङ', 'ङ वर्ण', 'Special letter', '🔤'],
  ['च', 'चरा', 'Bird', '🐦', commons('HOUSE SPARROW BIRD.jpg'), 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:HOUSE_SPARROW_BIRD.jpg'],
  ['छ', 'छाता', 'Umbrella', '☂️', commons('Blue umbrella.jpg'), 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Blue_umbrella.jpg'],
  ['ज', 'जहाज', 'Aeroplane', '✈️', commons('Airplane photo.jpg'), 'Donna Alvita / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Airplane_photo.jpg'],
  ['झ', 'झण्डा', 'Flag', '🇳🇵', commons('Flag of Nepal.svg'), 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Flag_of_Nepal.svg'],
  ['ञ', 'ञ वर्ण', 'Special letter', '🔤'],
  ['ट', 'टमाटर', 'Tomato', '🍅', commons('Tomato.JPG'), 'Public domain / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Tomato.JPG'],
  ['ठ', 'ठेला', 'Cart', '🛒'],
  ['ड', 'डमरु', 'Damaru', '🥁'],
  ['ढ', 'ढोका', 'Door', '🚪'],
  ['ण', 'ण वर्ण', 'Special letter', '🔤'],
  ['त', 'तरकारी', 'Vegetables', '🥕', commons('Tomatoes.jpg'), 'Wilfredor / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Tomatoes.jpg'],
  ['थ', 'थाल', 'Plate', '🍽️'],
  ['द', 'दियो', 'Lamp', '🪔'],
  ['ध', 'धारा', 'Tap', '🚰'],
  ['न', 'नमस्ते', 'Namaste', '🙏', '/images/traditional.jpg'],
  ['प', 'पुतली', 'Butterfly', '🦋'],
  ['फ', 'फूल', 'Flower', '🌸', commons('Pink Lotus Flower.jpg'), 'Flora-Victoria / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Pink_Lotus_Flower.jpg'],
  ['ब', 'बुवा', 'Dad', '👨‍👧', '/images/family.jpg'],
  ['भ', 'भगवान', 'God', '🕉️'],
  ['म', 'मादल', 'Madal', '🥁'],
  ['य', 'याक', 'Yak', '🐂'],
  ['र', 'रथ', 'Chariot', '🛺'],
  ['ल', 'लालीगुराँस', 'Rhododendron', '🌺'],
  ['व', 'विमान', 'Aeroplane', '✈️', commons('Airplane photo.jpg'), 'Donna Alvita / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Airplane_photo.jpg'],
  ['श', 'शिव', 'Shiva', '🔱'],
  ['ष', 'ष वर्ण', 'Special letter', '🔤'],
  ['स', 'सानुमाया', 'Sanumaya', '💖', '/images/bench.jpg'],
  ['ह', 'हात्ती', 'Elephant', '🐘'],
  ['क्ष', 'क्षमा', 'Forgiveness', '🤝'],
  ['त्र', 'त्रिशूल', 'Trident', '🔱'],
  ['ज्ञ', 'ज्ञान', 'Knowledge', '📚'],
]);

const english = makeCards([
  ['A', 'Apple', '', '🍎'], ['B', 'Ball', '', '⚽'], ['C', 'Cat', '', '🐱'], ['D', 'Dog', '', '🐶'],
  ['E', 'Elephant', '', '🐘'], ['F', 'Flower', '', '🌸', commons('Pink Lotus Flower.jpg')],
  ['G', 'Garden', '', '🌻', '/images/rose.jpg'], ['H', 'House', '', '🏠', commons('Nepal house.jpg')],
  ['I', 'Ice cream', '', '🍦'], ['J', 'Juice', '', '🧃'], ['K', 'Kite', '', '🪁'],
  ['L', 'Lotus', '', '🪷', commons('Lotus flower.JPG')], ['M', 'Moon', '', '🌙'], ['N', 'Nest', '', '🪺'],
  ['O', 'Orange', '', '🍊'], ['P', 'Parrot', '', '🦜'], ['Q', 'Queen', '', '👑'],
  ['R', 'Rabbit', '', '🐰', commons('Rabbit photography.jpg')], ['S', 'Sanumaya', '', '💖', '/images/bench.jpg'],
  ['T', 'Tiger', '', '🐯'], ['U', 'Umbrella', '', '☂️', commons('Blue umbrella.jpg')],
  ['V', 'Van', '', '🚐'], ['W', 'Water', '', '💧'], ['X', 'Xylophone', '', '🎼'],
  ['Y', 'Yak', '', '🐂'], ['Z', 'Zebra', '', '🦓'],
]);

const culture = [
  ['नमस्ते', 'Namaste', '🙏', 'दुई हात जोडेर आदरका साथ नमस्ते गरौँ।', 'We join our hands to greet with respect.', '#fff8df', '#f4d98a'],
  ['गणेश भगवान', 'Lord Ganesh', '🕉️', 'गणेश भगवानलाई फूल चढाएर नमस्ते गरौँ।', 'We offer flowers and greet Lord Ganesh respectfully.', '#fff1df', '#f3c88d'],
  ['शिव भगवान', 'Lord Shiva', '🔱', 'शान्त शिव भगवान, डमरु र हिमाल।', 'A gentle introduction to Lord Shiva, the damaru and the Himalayas.', '#eef3ff', '#c9d6f7'],
  ['पूजा', 'Puja', '🌺', 'फूल, दियो र श्रद्धासँग पूजा गरिन्छ।', 'Puja is a respectful family prayer.', '#fff2f4', '#efcbd2'],
  ['टीका', 'Tika', '🔴', 'टीका माया र आशीर्वादको चिन्ह हो।', 'Tika is a loving mark of blessing.', '#fff4ec', '#f2d1b9'],
  ['मादल', 'Madal', '🥁', 'मादल नेपाली बाजा हो।', 'The madal is a traditional Nepali drum.', '#f6f0e7', '#dbc6ab'],
  ['दियो', 'Diyo', '🪔', 'दियोले घर उज्यालो बनाउँछ।', 'A diya brings warm light to the home.', '#fff9df', '#eddb9e'],
  ['मन्दिर', 'Temple', '🛕', 'मन्दिरमा शान्त भएर नमस्ते गरौँ।', 'At the temple we are calm and respectful.', '#f3efff', '#d8cdf4'],
  ['दशैं', 'Dashain', '🌾', 'दशैंमा टीका, जमरा र परिवारको आशीर्वाद।', 'Dashain brings tika, jamara and family blessings.', '#eef8ea', '#cce2c3'],
  ['तिहार', 'Tihar', '✨', 'तिहारमा दियो, फूलमाला र उज्यालो हुन्छ।', 'Tihar is filled with diyas, flowers and light.', '#eef6ff', '#c8def3'],
].map(([ne, en, icon, descNe, descEn, background, border], id) => ({ id, ne, en, icon, descNe, descEn, background, border }));

const storyRows = [
  ['red-flower', 'सानुमाया र रातो फूल', 'Sanumaya and the Red Flower', '/images/rose.jpg', '🌹', [
    ['/images/rose.jpg', '', 'बिहान सानुमाया फूलबारीमा गइन्।', 'One morning, Sanumaya went into the flower garden.'],
    [commons('Lotus flower.JPG', 1400), '/images/traditional.jpg', 'उनले ठूलो गुलाबी फूल देखिन्।', 'She saw a big pink flower.'],
    [commons('HOUSE SPARROW BIRD.jpg', 1400), '/images/bench.jpg', 'सानो चरा नजिकै आयो।', 'A little bird came close.'],
    [commons('Rabbit photography.jpg', 1400), '/images/traditional.jpg', 'खरायो पनि फूल हेर्न आयो।', 'A rabbit came to see the flower too.'],
    ['/images/bench.jpg', '', 'सानुमाया खुसीले हाँसिन्।', 'Sanumaya smiled with joy.'],
    [commons('Pink Lotus Flower.jpg', 1400), '/images/bench.jpg', 'फूल नरम र सुन्दर थियो।', 'The flower was soft and beautiful.'],
    [commons('Cow photography.jpg', 1400), '/images/traditional.jpg', 'बाटोमा उनले गाई देखिन्।', 'On the way, she saw a cow.'],
    [commons('Nepal house.jpg', 1400), '/images/bench.jpg', 'त्यसपछि सानुमाया घर फर्किइन्।', 'Then Sanumaya went home.'],
    ['/images/family.jpg', '', 'आमा र बुवालाई सबै कुरा सुनाइन्।', 'She told Mum and Dad everything.'],
    ['/images/rose.jpg', '', 'सानुमायाले भनिन्, “रातो फूल!”', 'Sanumaya said, “Red flower!”'],
  ]],
  ['holi', 'सानुमायाको रङ्गीन होली', "Sanumaya's Colourful Holi", '/images/holi.jpg', '🎨', [
    ['/images/holi.jpg', '', 'आज होली हो। सानुमाया धेरै खुसी छिन्।', 'Today is Holi. Sanumaya is very happy.'],
    ['/images/holi.jpg', '', 'यो रातो रङ हो।', 'This colour is red.'],
    ['/images/holi.jpg', '', 'यो पहेँलो रङ हो।', 'This colour is yellow.'],
    ['/images/rose.jpg', '/images/holi.jpg', 'फूल पनि रङ्गीन देखियो।', 'Even the flowers looked colourful.'],
    [commons('Blue umbrella.jpg', 1400), '/images/holi.jpg', 'निलो रङ छाता जस्तै थियो।', 'The blue colour looked like an umbrella.'],
    ['/images/traditional.jpg', '', 'सानुमायाले नयाँ लुगा लगाइन्।', 'Sanumaya wore her special clothes.'],
    [commons('HOUSE SPARROW BIRD.jpg', 1400), '/images/holi.jpg', 'चराले पनि रमाइलो हेर्यो।', 'A little bird watched the fun.'],
    ['/images/bench.jpg', '', 'सानुमाया हाँस्दै खेलिन्।', 'Sanumaya laughed and played.'],
    ['/images/family.jpg', '', 'आमा र बुवासँग होली झन् रमाइलो भयो।', 'Holi was more fun with Mum and Dad.'],
    ['/images/holi.jpg', '', 'रातो, पहेँलो, निलो—रङ्गीन होली!', 'Red, yellow and blue—a colourful Holi!'],
  ]],
  ['nepal-adventure', 'सानुमायाको नेपाल यात्रा', "Sanumaya's Nepal Adventure", '/images/traditional.jpg', '🇳🇵', [
    [commons('Airplane photo.jpg', 1400), '/images/traditional.jpg', 'सानुमाया जहाजमा नेपाल गइन्।', 'Sanumaya flew to Nepal in an aeroplane.'],
    [commons('Nepal house.jpg', 1400), '/images/bench.jpg', 'उनले सुन्दर नेपाली घर देखिन्।', 'She saw a beautiful Nepali house.'],
    [commons('Cow photography.jpg', 1400), '/images/traditional.jpg', 'आँगनमा गाई थियो।', 'There was a cow in the yard.'],
    [commons('HOUSE SPARROW BIRD.jpg', 1400), '/images/bench.jpg', 'छानामाथि सानो चरा बस्यो।', 'A little bird sat on the roof.'],
    [commons('Lotus flower.JPG', 1400), '/images/traditional.jpg', 'पोखरीमा कमल फुलेको थियो।', 'A lotus was blooming in the pond.'],
    [commons('Rabbit photography.jpg', 1400), '/images/bench.jpg', 'सानुमायाले खरायोलाई नमस्ते गरिन्।', 'Sanumaya said Namaste to a rabbit.'],
    ['/images/traditional.jpg', '', 'उनले नेपाली लुगा लगाइन्।', 'She wore her Nepali clothes.'],
    ['/images/rose.jpg', '', 'बगैँचामा रातो फूल थियो।', 'There was a red flower in the garden.'],
    ['/images/bench.jpg', '', 'सानुमाया पार्कमा हाँसिन्।', 'Sanumaya laughed in the park.'],
    ['/images/family.jpg', '', 'परिवारसँगको यात्रा सबैभन्दा प्यारो भयो।', 'The family journey was the most special part.'],
    [commons('Flag of Nepal.svg', 1400), '/images/traditional.jpg', 'यो नेपालको झण्डा हो।', 'This is the flag of Nepal.'],
    ['/images/family.jpg', '', 'सानुमायाले भनिन्, “नेपाल प्यारो छ!”', 'Sanumaya said, “I love Nepal!”'],
  ]],
];

const stories = storyRows.map(([id, ne, en, cover, icon, pages]) => ({
  id,
  ne,
  en,
  cover,
  icon,
  pages: pages.map(([image, hero, pageNe, pageEn]) => ({ image, hero, ne: pageNe, en: pageEn })),
}));

const family = [
  ['आमा, बुवा र सानुमाया', 'Mum, Dad and Sanumaya', '/images/family.jpg', '👨‍👩‍👧'],
  ['हजुरबा', 'Grandfather', '', '👴'],
  ['हजुरआमा', 'Grandmother', '', '👵'],
  ['मामा', 'Maternal uncle', '', '🧔'],
  ['माइजु', 'Aunt', '', '👩'],
].map(([ne, en, image, fallback], id) => ({ id, ne, en, image, fallback }));

const copy = {
  ne: {
    learn: 'सिकौँ', culture: 'संस्कार', stories: 'कथा', family: 'परिवार',
    audio: 'आवाज पछि थपिनेछ', page: 'पृष्ठ', reveal: 'को हो? छोएर हेरौँ',
    reward: 'स्याबास सानुमाया!', picturePages: 'चित्र पृष्ठ',
  },
  en: {
    learn: 'Learn', culture: 'Culture', stories: 'Stories', family: 'Family',
    audio: 'Audio coming soon', page: 'Page', reveal: 'Who is it? Tap to reveal',
    reward: 'Well done, Sanumaya!', picturePages: 'picture pages',
  },
};

const themes = [
  ['#f5f0ff', '#d9cff0', '#665b86'],
  ['#eef8ff', '#c9deeb', '#496d83'],
  ['#effaf4', '#c9e2d2', '#4e7760'],
  ['#fff7ea', '#ead7b8', '#8a6a3c'],
  ['#fff2f3', '#e8cbd0', '#8a5d66'],
].map(([background, border, accent]) => ({ background, border, accent }));

const wrap = (value, length) => (value + length) % length;

function SafeImage({ src, alt, fallback, className = '', contain = false }) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-violet-50 to-sky-50 ${className}`}>
        <span className="text-8xl drop-shadow-sm">{fallback}</span>
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

function Arrow({ side, onClick, label }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute ${side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white/95 text-slate-600 shadow-xl active:scale-95`}
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

function PhotoCredits({ cards, language }) {
  const credits = cards.filter((item) => item.credit && item.creditUrl);
  if (!credits.length) return null;

  return (
    <details className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm">
      <summary className="cursor-pointer font-black text-slate-600">
        {language === 'ne' ? 'तस्बिर स्रोत' : 'Photo credits'}
      </summary>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {credits.map((item) => (
          <a key={`${item.letter}-${item.word}`} href={item.creditUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-50 px-3 py-2 underline decoration-slate-300 underline-offset-2">
            {item.letter} — {item.word}: {item.credit}
          </a>
        ))}
      </div>
    </details>
  );
}

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('learn');
  const [nepaliSet, setNepaliSet] = useState('consonants');
  const [index, setIndex] = useState(0);
  const [cultureIndex, setCultureIndex] = useState(0);
  const [storyId, setStoryId] = useState(stories[0].id);
  const [storyPage, setStoryPage] = useState(0);
  const [revealed, setRevealed] = useState({});
  const [reward, setReward] = useState('');
  const [seed, setSeed] = useState(0);
  const rewardTimer = useRef(null);
  const t = copy[language];

  const cards = language === 'en' ? english : nepaliSet === 'vowels' ? vowels : consonants;
  const cardIndex = index % cards.length;
  const card = cards[cardIndex];
  const theme = themes[cardIndex % themes.length];
  const cultureCard = culture[cultureIndex];
  const story = stories.find((item) => item.id === storyId) || stories[0];
  const page = story.pages[storyPage];
  const phrase = language === 'en' ? `${card.letter} for ${card.word}` : `${card.letter} बाट ${card.word}`;

  useEffect(() => {
    setIndex(0);
    setSeed(0);
  }, [language, nepaliSet]);

  useEffect(() => () => {
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
  }, []);

  const previous = () => setIndex((value) => wrap(value - 1, cards.length));
  const next = () => setIndex((value) => wrap(value + 1, cards.length));
  const swipe = useSwipe(previous, next);
  const cultureSwipe = useSwipe(
    () => setCultureIndex((value) => wrap(value - 1, culture.length)),
    () => setCultureIndex((value) => wrap(value + 1, culture.length)),
  );
  const storySwipe = useSwipe(
    () => setStoryPage((value) => Math.max(0, value - 1)),
    () => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1)),
  );

  const choices = useMemo(() => {
    const target = cardIndex;
    const indexes = [target];
    let offset = 1 + seed;

    while (indexes.length < Math.min(3, cards.length)) {
      const candidate = wrap(target + offset, cards.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 3;
    }

    return indexes
      .map((itemIndex) => cards[itemIndex])
      .sort((a, b) => a.letter.localeCompare(b.letter));
  }, [cardIndex, cards, seed]);

  const answer = (choice) => {
    if (choice.letter !== card.letter) return;

    setReward(t.reward);
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(''), 1000);
    setTimeout(() => {
      next();
      setSeed((value) => value + 1);
    }, 450);
  };

  return (
    <div className="min-h-screen select-none bg-[#fbfaf7] pb-28 text-slate-700">
      {reward && (
        <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-slate-900/10 p-4">
          <div className="rounded-3xl border border-white bg-white/95 px-6 py-5 text-center text-2xl font-black shadow-2xl">🌟 {reward} 💛</div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-[#fbfaf7]/95 px-4 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))] shadow-[0_8px_30px_rgba(74,67,91,0.07)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-4xl grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-500"><Home /></div>
          <div>
            <h1 className="text-2xl font-black leading-none sm:text-3xl">सानुमायाको कथाघर</h1>
            <p className="mt-1 text-xs font-semibold text-slate-500">Sanumaya&apos;s private learning world</p>
          </div>
          <Heart className="text-amber-300" fill="currentColor" />
        </div>

        <div className="mx-auto mt-3 grid max-w-4xl grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
          <button type="button" onClick={() => setLanguage('ne')} className={`min-h-11 rounded-xl font-black ${language === 'ne' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'}`}>🇳🇵 नेपाली</button>
          <button type="button" onClick={() => setLanguage('en')} className={`min-h-11 rounded-xl font-black ${language === 'en' ? 'bg-sky-100 text-sky-900' : 'text-slate-500'}`}>🇬🇧 English</button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-4xl gap-4 px-3 py-4 sm:px-5">
        {section === 'learn' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)] sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'ठूलो अक्षर • वास्तविक तस्बिर' : 'Big letters • clear pictures'}</span>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? 'एक पटकमा एउटा कुरा सिकौँ' : 'One clear idea at a time'}</h2>
                  <p className="text-sm font-semibold text-slate-500">{language === 'ne' ? 'Swipe गर्नुहोस् वा ठूलो arrow छुनुहोस्।' : 'Swipe or tap the large arrow buttons.'}</p>
                </div>
                <span className="float-hand text-5xl">👆</span>
              </div>

              {language === 'ne' && (
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1.5">
                  <button type="button" onClick={() => setNepaliSet('vowels')} className={`min-h-16 rounded-xl px-3 text-left ${nepaliSet === 'vowels' ? 'bg-violet-100 text-violet-900' : 'text-slate-500'}`}>
                    <strong className="block text-lg">स्वर</strong>
                    <span className="text-xs">अ आ इ ई उ ऊ</span>
                  </button>
                  <button type="button" onClick={() => setNepaliSet('consonants')} className={`min-h-16 rounded-xl px-3 text-left ${nepaliSet === 'consonants' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500'}`}>
                    <strong className="block text-lg">व्यञ्जन</strong>
                    <span className="text-xs">क ख ग घ ङ</span>
                  </button>
                </div>
              )}
            </section>

            <section {...swipe} className="relative touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-[0_20px_55px_rgba(74,67,91,0.13)]" style={{ background: theme.background, borderColor: theme.border }}>
              <Arrow side="left" label="Previous letter" onClick={previous} />
              <Arrow side="right" label="Next letter" onClick={next} />

              <div className="grid min-h-[590px] items-center gap-3 px-5 py-8 sm:min-h-[540px] sm:grid-cols-[0.8fr_1.2fr] sm:px-20">
                <div className="flex flex-col items-center justify-center text-center">
                  <AudioBadge text={t.audio} />
                  <span className="mt-4 text-[9.5rem] font-black leading-[0.8] sm:text-[12rem]" style={{ color: theme.accent }}>{card.letter}</span>
                  <span className="mt-5 rounded-full bg-white/70 px-4 py-1.5 text-sm font-black text-slate-500">{cardIndex + 1} / {cards.length}</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="grid h-72 w-full max-w-sm place-items-center overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-[0_16px_38px_rgba(74,67,91,0.12)] sm:h-80">
                    <SafeImage src={card.image} alt={card.word} fallback={card.fallback} className="h-full w-full p-3" contain />
                  </div>
                  <strong className="mt-5 text-center text-4xl font-black leading-tight text-slate-800 sm:text-5xl">{phrase}</strong>
                  {language === 'ne' && <span className="mt-1 text-base font-bold text-slate-500">{card.translation}</span>}
                </div>
              </div>
            </section>

            <div className="flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cards.map((item, itemIndex) => (
                <button type="button" key={`${item.letter}-${itemIndex}`} onClick={() => setIndex(itemIndex)} className={`flex h-24 w-[5rem] flex-none flex-col items-center justify-center overflow-hidden rounded-2xl border font-black shadow-sm ${itemIndex === cardIndex ? 'border-violet-200 bg-violet-100 text-violet-900' : 'border-slate-100 bg-white'}`}>
                  <span className="text-3xl">{item.letter}</span>
                  <span className="mt-1 grid h-9 w-12 place-items-center overflow-hidden rounded-lg bg-white/70">
                    <SafeImage src={item.image} alt={item.word} fallback={item.fallback} className="h-full w-full p-0.5" contain />
                  </span>
                </button>
              ))}
            </div>

            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase text-emerald-600">{language === 'ne' ? 'कहाँ छ?' : 'Can you find it?'}</span>
                  <h3 className="text-2xl font-black">{phrase}</h3>
                </div>
                <button type="button" onClick={() => setSeed((value) => value + 1)} className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-sky-600"><RefreshCw size={22} /></button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
                {choices.map((choice) => (
                  <button type="button" key={choice.letter} onClick={() => answer(choice)} className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-[#fbfaf7] p-2 active:scale-95">
                    <span className="grid h-24 w-full place-items-center overflow-hidden rounded-xl bg-white">
                      <SafeImage src={choice.image} alt={choice.word} fallback={choice.fallback} className="h-full w-full p-1" contain />
                    </span>
                    <strong className="mt-2 text-base leading-tight">{choice.word}</strong>
                  </button>
                ))}
              </div>
            </section>

            <PhotoCredits cards={cards} language={language} />
          </>
        )}

        {section === 'culture' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-black uppercase text-amber-600">नेपाल • परिवार • संस्कार</span>
              <h2 className="text-2xl font-black">{language === 'ne' ? 'हाम्रो संस्कृति चिनौँ' : 'Discover our Nepali culture'}</h2>
            </section>

            <section {...cultureSwipe} className="relative min-h-[470px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-xl" style={{ background: cultureCard.background, borderColor: cultureCard.border }}>
              <Arrow side="left" label="Previous culture card" onClick={() => setCultureIndex((value) => wrap(value - 1, culture.length))} />
              <Arrow side="right" label="Next culture card" onClick={() => setCultureIndex((value) => wrap(value + 1, culture.length))} />
              <div className="flex min-h-[470px] flex-col items-center justify-center px-16 text-center">
                <AudioBadge text={t.audio} />
                <span className="mt-4 text-[9rem]">{cultureCard.icon}</span>
                <h2 className="text-4xl font-black sm:text-5xl">{language === 'ne' ? cultureCard.ne : cultureCard.en}</h2>
                <p className="mt-4 max-w-xl text-lg font-bold text-slate-600 sm:text-xl">{language === 'ne' ? cultureCard.descNe : cultureCard.descEn}</p>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {culture.map((item, itemIndex) => (
                <button type="button" key={item.id} onClick={() => setCultureIndex(itemIndex)} className={`min-h-24 rounded-2xl border p-3 text-left shadow-sm ${itemIndex === cultureIndex ? 'border-violet-200 bg-violet-50' : 'border-slate-100 bg-white'}`}>
                  <span className="mr-2 text-4xl">{item.icon}</span>
                  <strong className="text-base">{language === 'ne' ? item.ne : item.en}</strong>
                </button>
              ))}
            </div>
          </>
        )}

        {section === 'stories' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase text-violet-500">Personalised picture books</span>
                  <h2 className="mt-1 text-2xl font-black sm:text-3xl">{language === 'ne' ? 'सानुमाया आफ्नै कथाकी मुख्य पात्र' : 'Sanumaya is the hero of every story'}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{language === 'ne' ? 'छोटो वाक्य, ठूलो चित्र र धेरै पृष्ठ।' : 'Short sentences, large pictures and many pages.'}</p>
                </div>
                <Sparkles className="text-amber-400" size={30} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ['1', language === 'ne' ? 'कथा छान्नुहोस्' : 'Choose a story'],
                  ['2', language === 'ne' ? 'सानुमाया नायिका' : 'Sanumaya is the hero'],
                  ['3', language === 'ne' ? 'चित्र swipe गर्नुहोस्' : 'Swipe the picture pages'],
                ].map(([number, label]) => (
                  <div key={number} className="rounded-2xl bg-slate-50 px-2 py-3">
                    <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-violet-100 font-black text-violet-700">{number}</span>
                    <strong className="mt-2 block text-xs leading-tight sm:text-sm">{label}</strong>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {stories.map((item) => (
                  <button type="button" key={item.id} onClick={() => { setStoryId(item.id); setStoryPage(0); }} className={`relative h-64 w-[82%] flex-none snap-center overflow-hidden rounded-[1.8rem] border-[4px] bg-slate-100 shadow-xl sm:w-[48%] ${item.id === story.id ? 'border-violet-300' : 'border-white'}`}>
                    <SafeImage src={item.cover} alt={item.ne} fallback={item.icon} className="h-full w-full" />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/5 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700 shadow">{item.pages.length} {t.picturePages}</span>
                    <strong className="absolute bottom-4 left-4 right-4 text-left text-2xl leading-tight text-white">{language === 'ne' ? item.ne : item.en}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section {...storySwipe} className="overflow-hidden rounded-[2.2rem] border-[5px] border-white bg-white shadow-[0_24px_60px_rgba(74,67,91,0.16)]">
              <div className="relative h-[31rem] overflow-hidden bg-slate-100 sm:h-[37rem]">
                <SafeImage src={page.image} alt={language === 'ne' ? story.ne : story.en} fallback={story.icon} className="h-full w-full" />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                {page.hero && (
                  <div className="absolute bottom-28 right-4 rounded-[1.4rem] border-4 border-white bg-white p-1 shadow-2xl sm:bottom-24 sm:right-6">
                    <SafeImage src={page.hero} alt="Sanumaya" fallback="💖" className="h-24 w-20 rounded-[1rem] sm:h-32 sm:w-28" />
                    <strong className="block py-1 text-center text-xs text-violet-700">Sanumaya</strong>
                  </div>
                )}

                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-700 shadow">
                  {t.page} {storyPage + 1}/{story.pages.length}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-5 pr-28 text-white sm:p-7 sm:pr-40">
                  <span className="text-xs font-black uppercase tracking-wider text-white/75">{language === 'ne' ? story.ne : story.en}</span>
                  <p className="mt-1 text-2xl font-black leading-snug drop-shadow sm:text-4xl">{language === 'ne' ? page.ne : page.en}</p>
                </div>

                <Arrow side="left" label="Previous story page" onClick={() => setStoryPage((value) => Math.max(0, value - 1))} />
                <Arrow side="right" label="Next story page" onClick={() => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1))} />
              </div>

              <div className="border-t border-slate-100 p-4">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {story.pages.map((storyItem, itemIndex) => (
                    <button type="button" key={`${story.id}-${itemIndex}`} onClick={() => setStoryPage(itemIndex)} className={`relative h-20 w-16 flex-none overflow-hidden rounded-xl border-2 ${itemIndex === storyPage ? 'border-violet-400' : 'border-white'}`}>
                      <SafeImage src={storyItem.image} alt={`${t.page} ${itemIndex + 1}`} fallback={story.icon} className="h-full w-full" />
                      <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900/70 text-[10px] font-black text-white">{itemIndex + 1}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button type="button" disabled={storyPage === 0} onClick={() => setStoryPage((value) => Math.max(0, value - 1))} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-violet-50 px-4 font-black text-violet-700 disabled:opacity-30"><ChevronLeft /> {language === 'ne' ? 'अघिल्लो' : 'Previous'}</button>
                  <AudioBadge text={t.audio} />
                  <button type="button" disabled={storyPage === story.pages.length - 1} onClick={() => setStoryPage((value) => Math.min(story.pages.length - 1, value + 1))} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-violet-50 px-4 font-black text-violet-700 disabled:opacity-30">{language === 'ne' ? 'अर्को' : 'Next'} <ChevronRight /></button>
                </div>
              </div>
            </section>
          </>
        )}

        {section === 'family' && (
          <>
            <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-black uppercase text-violet-500">{language === 'ne' ? 'मेरो प्यारा परिवार' : 'My loving family'}</span>
              <h2 className="text-2xl font-black">{language === 'ne' ? 'छोएर परिवारलाई भेटौँ' : 'Tap to meet the family'}</h2>
              <p className="text-sm text-slate-500">{t.audio}</p>
            </section>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {family.map((member, memberIndex) => {
                const active = revealed[member.id];
                const memberTheme = themes[memberIndex % themes.length];

                return (
                  <button type="button" key={member.id} onClick={() => setRevealed((value) => ({ ...value, [member.id]: true }))} className="relative min-h-60 overflow-hidden rounded-3xl border-[3px] shadow-lg" style={{ background: memberTheme.background, borderColor: memberTheme.border }}>
                    {active ? (
                      <>
                        <SafeImage src={member.image} alt={member.ne} fallback={member.fallback} className="absolute inset-0 h-full w-full" />
                        <span className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />
                        <strong className="absolute bottom-3 left-3 right-3 text-left text-lg text-white">{language === 'ne' ? member.ne : member.en}</strong>
                      </>
                    ) : (
                      <span className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="gift-bob text-7xl">🎁</span>
                        <strong className="mt-2 px-3 text-sm">{t.reveal}</strong>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>

      <nav className="fixed bottom-[max(0.55rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[min(calc(100%-1rem),52rem)] -translate-x-1/2 grid-cols-4 gap-1 rounded-3xl border border-slate-100 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl">
        {[
          ['learn', Shapes],
          ['culture', Landmark],
          ['stories', BookOpen],
          ['family', Users],
        ].map(([id, Icon]) => (
          <button type="button" key={id} onClick={() => setSection(id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-black ${section === id ? 'bg-violet-100 text-violet-800' : 'text-slate-500'}`}>
            <Icon size={22} />
            <span>{t[id]}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
