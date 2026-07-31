import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen, ChevronLeft, ChevronRight, Heart, Home, Landmark,
  RefreshCw, Shapes, Sparkles, Users, Volume2,
} from 'lucide-react';

const makeCards = (rows) => rows.map(([letter, word, translation, icon]) => ({ letter, word, translation, icon }));

const vowels = makeCards([
  ['अ', 'अनार', 'Pomegranate', '🔴'], ['आ', 'आमा', 'Mum', '👩‍👧'],
  ['इ', 'इन्द्रेणी', 'Rainbow', '🌈'], ['ई', 'ईश्वर', 'God', '🙏'],
  ['उ', 'उल्लु', 'Owl', '🦉'], ['ऊ', 'ऊन', 'Wool', '🧶'],
  ['ऋ', 'ऋषि', 'Sage', '🧘'], ['ए', 'एक', 'One', '1️⃣'],
  ['ऐ', 'ऐना', 'Mirror', '🪞'], ['ओ', 'ओखर', 'Walnut', '🌰'],
  ['औ', 'औँठी', 'Ring', '💍'], ['अं', 'अंगुर', 'Grapes', '🍇'],
  ['अः', 'अः!', 'A sound', '😮'],
]);

const consonants = makeCards([
  ['क', 'कमल', 'Lotus', '🪷'], ['ख', 'खरायो', 'Rabbit', '🐰'], ['ग', 'गाई', 'Cow', '🐄'],
  ['घ', 'घर', 'Home', '🏠'], ['ङ', 'ङ वर्ण', 'Nepali letter', '🔤'], ['च', 'चरा', 'Bird', '🐦'],
  ['छ', 'छाता', 'Umbrella', '☂️'], ['ज', 'जहाज', 'Aeroplane', '✈️'], ['झ', 'झण्डा', 'Flag', '🇳🇵'],
  ['ञ', 'ञ वर्ण', 'Nepali letter', '🔤'], ['ट', 'टमाटर', 'Tomato', '🍅'], ['ठ', 'ठेला', 'Cart', '🛒'],
  ['ड', 'डमरु', 'Damaru', '🥁'], ['ढ', 'ढोका', 'Door', '🚪'], ['ण', 'ण वर्ण', 'Nepali letter', '🔤'],
  ['त', 'तरकारी', 'Vegetables', '🥕'], ['थ', 'थाल', 'Plate', '🍽️'], ['द', 'दियो', 'Lamp', '🪔'],
  ['ध', 'धारा', 'Tap', '🚰'], ['न', 'नमस्ते', 'Namaste', '🙏'], ['प', 'पुतली', 'Butterfly', '🦋'],
  ['फ', 'फूल', 'Flower', '🌸'], ['ब', 'बुवा', 'Dad', '👨‍👧'], ['भ', 'भगवान', 'God', '🕉️'],
  ['म', 'मादल', 'Madal', '🥁'], ['य', 'याक', 'Yak', '🐂'], ['र', 'रथ', 'Chariot', '🛺'],
  ['ल', 'लालीगुराँस', 'Rhododendron', '🌺'], ['व', 'विमान', 'Aeroplane', '✈️'],
  ['श', 'शिव', 'Shiva', '🔱'], ['ष', 'ष वर्ण', 'Nepali letter', '🔤'], ['स', 'सानुमाया', 'Sanumaya', '💖'],
  ['ह', 'हात्ती', 'Elephant', '🐘'], ['क्ष', 'क्षमा', 'Forgiveness', '🤝'],
  ['त्र', 'त्रिशूल', 'Trident', '🔱'], ['ज्ञ', 'ज्ञान', 'Knowledge', '📚'],
]);

const english = makeCards([
  ['A', 'Apple', '', '🍎'], ['B', 'Ball', '', '⚽'], ['C', 'Cat', '', '🐱'], ['D', 'Dog', '', '🐶'],
  ['E', 'Elephant', '', '🐘'], ['F', 'Flower', '', '🌸'], ['G', 'Garden', '', '🌻'], ['H', 'House', '', '🏠'],
  ['I', 'Ice cream', '', '🍦'], ['J', 'Juice', '', '🧃'], ['K', 'Kite', '', '🪁'], ['L', 'Lotus', '', '🪷'],
  ['M', 'Moon', '', '🌙'], ['N', 'Nest', '', '🪺'], ['O', 'Orange', '', '🍊'], ['P', 'Parrot', '', '🦜'],
  ['Q', 'Queen', '', '👑'], ['R', 'Rabbit', '', '🐰'], ['S', 'Sanumaya', '', '💖'], ['T', 'Tiger', '', '🐯'],
  ['U', 'Umbrella', '', '☂️'], ['V', 'Van', '', '🚐'], ['W', 'Water', '', '💧'], ['X', 'Xylophone', '', '🎼'],
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
    ['/images/rose.jpg', '🌤️', 'बिहान सानुमाया बगैँचामा गइन्।', 'One morning, Sanumaya went into the garden.'],
    ['/images/rose.jpg', '🌹', 'उनले एउटा सुन्दर रातो फूल देखिन्।', 'She saw a beautiful red flower.'],
    ['/images/bench.jpg', '🦋', 'एउटा सानो पुतली फूलमाथि बस्यो।', 'A little butterfly landed on the flower.'],
    ['/images/family.jpg', '💖', 'आमा र बुवाले भने, “स्याबास सानुमाया!”', 'Mum and Dad said, “Well done, Sanumaya!”'],
  ]],
  ['holi', 'सानुमायाको रङ्गीन होली', "Sanumaya's Colourful Holi", '/images/holi.jpg', '🎨', [
    ['/images/holi.jpg', '🎉', 'आज होली हो। सानुमाया धेरै खुसी छिन्।', 'Today is Holi. Sanumaya is very happy.'],
    ['/images/holi.jpg', '🔴', 'यो रातो रङ हो।', 'This colour is red.'],
    ['/images/traditional.jpg', '🙏', 'सानुमायाले सबैलाई नमस्ते गरिन्।', 'Sanumaya greeted everyone with Namaste.'],
    ['/images/family.jpg', '🌈', 'परिवारसँग होली झन् रमाइलो भयो।', 'Holi was even more fun with family.'],
  ]],
  ['madal', 'सानुमाया र सानो मादल', 'Sanumaya and the Little Madal', '/images/traditional.jpg', '🥁', [
    ['/images/traditional.jpg', '🎁', 'सानुमायाले एउटा सानो मादल देखिन्।', 'Sanumaya found a little madal.'],
    ['/images/traditional.jpg', '🥁', 'उनले मादलमा बिस्तारै टक् टक् गरिन्।', 'She gently tapped the madal: tak, tak.'],
    ['/images/bench.jpg', '💃', 'सानुमाया हाँस्दै नाच्न थालिन्।', 'Sanumaya smiled and began to dance.'],
    ['/images/family.jpg', '👏', 'सबैले ताली बजाए। स्याबास सानुमाया!', 'Everyone clapped. Well done, Sanumaya!'],
  ]],
];

const stories = storyRows.map(([id, ne, en, cover, icon, pages]) => ({
  id, ne, en, cover, icon,
  pages: pages.map(([image, pageIcon, pageNe, pageEn]) => ({ image, icon: pageIcon, ne: pageNe, en: pageEn })),
}));

const family = [
  ['आमा, बुवा र सानुमाया', 'Mum, Dad and Sanumaya', '/images/family.jpg', '👨‍👩‍👧'],
  ['हजुरबा', 'Grandfather', '', '👴'], ['हजुरआमा', 'Grandmother', '', '👵'],
  ['मामा', 'Maternal uncle', '', '🧔'], ['माइजु', 'Aunt', '', '👩'],
].map(([ne, en, image, icon], id) => ({ id, ne, en, image, icon }));

const copy = {
  ne: { learn: 'सिकौँ', culture: 'संस्कार', stories: 'कथा', family: 'परिवार', audio: 'आवाज पछि थपिनेछ', page: 'पृष्ठ', reveal: 'को हो? छोएर हेरौँ', reward: 'स्याबास सानुमाया!' },
  en: { learn: 'Learn', culture: 'Culture', stories: 'Stories', family: 'Family', audio: 'Audio coming soon', page: 'Page', reveal: 'Who is it? Tap to reveal', reward: 'Well done, Sanumaya!' },
};

const themes = [
  ['linear-gradient(145deg,#f7f2ff,#eee8fb)', '#d9cff0', '#665b86'],
  ['linear-gradient(145deg,#eef8ff,#e4f0f8)', '#c9deeb', '#496d83'],
  ['linear-gradient(145deg,#effaf4,#e5f3ea)', '#c9e2d2', '#4e7760'],
  ['linear-gradient(145deg,#fff7ea,#f8eddc)', '#ead7b8', '#8a6a3c'],
  ['linear-gradient(145deg,#fff2f3,#f8e7e9)', '#e8cbd0', '#8a5d66'],
].map(([background, border, accent]) => ({ background, border, accent }));

const wrap = (value, length) => (value + length) % length;

function SafeImage({ src, alt, fallback, className }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  if (failed) return <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-violet-100 to-sky-100 ${className}`}><span className="text-7xl">{fallback}</span></div>;
  return <img src={src} alt={alt} className={className} draggable="false" onError={() => setFailed(true)} />;
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
    <button type="button" aria-label={label} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onClick(); }} className={`absolute ${side === 'left' ? 'left-3' : 'right-3'} top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/90 text-slate-600 shadow-lg`}>
      <Icon />
    </button>
  );
}

function AudioBadge({ text }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/75 px-3 py-2 text-xs font-black text-slate-500 shadow-sm"><Volume2 size={17} />{text}</span>;
}

export default function App() {
  const [language, setLanguage] = useState('ne');
  const [section, setSection] = useState('learn');
  const [nepaliSet, setNepaliSet] = useState('vowels');
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
  const card = cards[index % cards.length];
  const theme = themes[index % themes.length];
  const cultureCard = culture[cultureIndex];
  const story = stories.find((item) => item.id === storyId) || stories[0];
  const page = story.pages[storyPage];
  const phrase = language === 'en' ? `${card.letter} for ${card.word}` : `${card.letter} बाट ${card.word}`;

  useEffect(() => { setIndex(0); setSeed(0); }, [language, nepaliSet]);
  useEffect(() => () => rewardTimer.current && clearTimeout(rewardTimer.current), []);

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
    const target = index % cards.length;
    const indexes = [target];
    let offset = 1 + seed;
    while (indexes.length < 3) {
      const candidate = wrap(target + offset, cards.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 3;
    }
    return indexes.map((itemIndex) => cards[itemIndex]).sort((a, b) => a.letter.localeCompare(b.letter));
  }, [cards, index, seed]);

  const answer = (choice) => {
    if (choice.letter !== card.letter) return;
    setReward(t.reward);
    clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(''), 1000);
    setTimeout(() => { next(); setSeed((value) => value + 1); }, 450);
  };

  return (
    <div className="min-h-screen select-none bg-[#fbfaf7] pb-28 text-slate-700">
      {reward && <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-slate-900/10"><div className="rounded-3xl border border-white bg-white/95 px-6 py-5 text-2xl font-black shadow-2xl">🌟 {reward} 💛</div></div>}

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-[#fbfaf7]/95 px-4 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))] shadow-[0_8px_30px_rgba(74,67,91,0.07)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-3xl grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-500"><Home /></div>
          <div><h1 className="text-2xl font-black leading-none sm:text-3xl">सानुमायाको कथाघर</h1><p className="mt-1 text-xs font-semibold text-slate-500">Sanumaya's private learning world</p></div>
          <Heart className="text-amber-300" fill="currentColor" />
        </div>
        <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 gap-2 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
          <button type="button" onClick={() => setLanguage('ne')} className={`min-h-11 rounded-xl font-black ${language === 'ne' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'}`}>🇳🇵 नेपाली</button>
          <button type="button" onClick={() => setLanguage('en')} className={`min-h-11 rounded-xl font-black ${language === 'en' ? 'bg-sky-100 text-sky-900' : 'text-slate-500'}`}>🇬🇧 English</button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-3xl gap-4 px-3 py-4 sm:px-5">
        {section === 'learn' && <>
          <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(74,67,91,0.07)]">
            <div className="flex items-center justify-between"><div><span className="text-xs font-black uppercase tracking-wider text-violet-500">{language === 'ne' ? 'नेपाली अक्षर' : 'English alphabet'}</span><h2 className="mt-1 text-2xl font-black">{language === 'ne' ? 'अक्षर र चित्र सिकौँ' : 'Learn A to Z with pictures'}</h2><p className="text-sm font-semibold text-slate-500">Swipe or use the arrow buttons</p></div><span className="float-hand text-5xl">👆</span></div>
            {language === 'ne' && <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1.5">
              <button type="button" onClick={() => setNepaliSet('vowels')} className={`min-h-14 rounded-xl px-3 text-left ${nepaliSet === 'vowels' ? 'bg-violet-100 text-violet-900' : 'text-slate-500'}`}><strong className="block">स्वर</strong><span className="text-xs">अ आ इ ई उ ऊ</span></button>
              <button type="button" onClick={() => setNepaliSet('consonants')} className={`min-h-14 rounded-xl px-3 text-left ${nepaliSet === 'consonants' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500'}`}><strong className="block">व्यञ्जन</strong><span className="text-xs">क ख ग घ ङ</span></button>
            </div>}
          </section>

          <section {...swipe} className="relative min-h-[430px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-[0_20px_55px_rgba(74,67,91,0.13)]" style={{ background: theme.background, borderColor: theme.border }}>
            <Arrow side="left" label="Previous letter" onClick={previous} /><Arrow side="right" label="Next letter" onClick={next} />
            <div className="flex min-h-[430px] flex-col items-center justify-center px-16 py-9 text-center">
              <AudioBadge text={t.audio} />
              <span className="mt-3 text-[8.5rem] font-black leading-none sm:text-[10.5rem]" style={{ color: theme.accent }}>{card.letter}</span>
              <span className="mt-1 grid h-28 w-28 place-items-center rounded-[2rem] border border-white bg-white/70 text-7xl shadow-sm">{card.icon}</span>
              <strong className="mt-4 text-3xl font-black leading-tight sm:text-4xl">{phrase}</strong>
              {language === 'ne' && <span className="mt-1 text-sm font-bold text-slate-500">{card.translation}</span>}
              <span className="mt-4 rounded-full bg-white/65 px-3 py-1 text-xs font-black text-slate-500">{index + 1} / {cards.length}</span>
            </div>
          </section>

          <div className="flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{cards.map((item, itemIndex) => <button type="button" key={`${item.letter}-${itemIndex}`} onClick={() => setIndex(itemIndex)} className={`flex h-20 w-[4.4rem] flex-none flex-col items-center justify-center rounded-2xl border font-black shadow-sm ${itemIndex === index ? 'border-violet-200 bg-violet-100 text-violet-900' : 'border-slate-100 bg-white'}`}><span className="text-2xl">{item.letter}</span><small className="text-lg">{item.icon}</small></button>)}</div>

          <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between"><div><span className="text-xs font-black uppercase text-emerald-600">{language === 'ne' ? 'कहाँ छ?' : 'Can you find it?'}</span><h3 className="text-xl font-black">{phrase}</h3></div><button type="button" onClick={() => setSeed((value) => value + 1)} className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600"><RefreshCw size={20} /></button></div>
            <div className="mt-4 grid grid-cols-3 gap-2">{choices.map((choice) => <button type="button" key={choice.letter} onClick={() => answer(choice)} className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-[#fbfaf7] p-2"><span className="text-5xl">{choice.icon}</span><strong className="mt-1 text-sm">{choice.word}</strong></button>)}</div>
          </section>
        </>}

        {section === 'culture' && <>
          <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"><span className="text-xs font-black uppercase text-amber-600">नेपाल • परिवार • संस्कार</span><h2 className="text-2xl font-black">{language === 'ne' ? 'हाम्रो संस्कृति चिनौँ' : 'Discover our Nepali culture'}</h2></section>
          <section {...cultureSwipe} className="relative min-h-[420px] touch-pan-y overflow-hidden rounded-[2.2rem] border-[4px] shadow-xl" style={{ background: cultureCard.background, borderColor: cultureCard.border }}>
            <Arrow side="left" label="Previous culture card" onClick={() => setCultureIndex((value) => wrap(value - 1, culture.length))} /><Arrow side="right" label="Next culture card" onClick={() => setCultureIndex((value) => wrap(value + 1, culture.length))} />
            <div className="flex min-h-[420px] flex-col items-center justify-center px-16 text-center"><AudioBadge text={t.audio} /><span className="mt-4 text-[8rem]">{cultureCard.icon}</span><h2 className="text-4xl font-black">{language === 'ne' ? cultureCard.ne : cultureCard.en}</h2><p className="mt-4 text-lg font-bold text-slate-600">{language === 'ne' ? cultureCard.descNe : cultureCard.descEn}</p></div>
          </section>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{culture.map((item, itemIndex) => <button type="button" key={item.id} onClick={() => setCultureIndex(itemIndex)} className={`min-h-20 rounded-2xl border p-2 text-left shadow-sm ${itemIndex === cultureIndex ? 'border-violet-200 bg-violet-50' : 'border-slate-100 bg-white'}`}><span className="mr-2 text-3xl">{item.icon}</span><strong>{language === 'ne' ? item.ne : item.en}</strong></button>)}</div>
        </>}

        {section === 'stories' && <>
          <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><div><span className="text-xs font-black uppercase text-violet-500">{language === 'ne' ? 'कथा छान्नुहोस्' : 'Choose a story'}</span><h2 className="text-2xl font-black">{language === 'ne' ? 'सानुमाया मुख्य पात्र भएका कथा' : 'Stories starring Sanumaya'}</h2></div><Sparkles className="text-amber-400" /></div><div className="mt-4 flex gap-3 overflow-x-auto">{stories.map((item) => <button type="button" key={item.id} onClick={() => { setStoryId(item.id); setStoryPage(0); }} className="relative h-40 w-[72%] flex-none overflow-hidden rounded-2xl border-[3px] border-white shadow-lg"><SafeImage src={item.cover} alt={item.ne} fallback={item.icon} className="h-full w-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" /><strong className="absolute bottom-3 left-3 right-3 text-left text-white">{language === 'ne' ? item.ne : item.en}</strong></button>)}</div></section>
          <section {...storySwipe} className="overflow-hidden rounded-[2rem] border-[4px] border-white bg-white shadow-xl"><div className="relative h-[20rem]"><SafeImage src={page.image} alt={story.ne} fallback={page.icon} className="h-full w-full object-cover" /><span className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-black">{t.page} {storyPage + 1}/{story.pages.length}</span></div><div className="p-5 text-center"><p className="min-h-20 text-2xl font-black">{language === 'ne' ? page.ne : page.en}</p><button type="button" disabled className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-slate-50 px-5 font-black text-slate-400"><Volume2 size={20} />{t.audio}</button></div><div className="flex justify-between px-4 pb-4"><button type="button" disabled={storyPage === 0} onClick={() => setStoryPage((value) => value - 1)} className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 disabled:opacity-30"><ChevronLeft /></button><button type="button" disabled={storyPage === story.pages.length - 1} onClick={() => setStoryPage((value) => value + 1)} className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 disabled:opacity-30"><ChevronRight /></button></div></section>
        </>}

        {section === 'family' && <><section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"><span className="text-xs font-black uppercase text-violet-500">{language === 'ne' ? 'मेरो प्यारा परिवार' : 'My loving family'}</span><h2 className="text-2xl font-black">{language === 'ne' ? 'छोएर परिवारलाई भेटौँ' : 'Tap to meet the family'}</h2><p className="text-sm text-slate-500">{t.audio}</p></section><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{family.map((member, memberIndex) => { const active = revealed[member.id]; const memberTheme = themes[memberIndex % themes.length]; return <button type="button" key={member.id} onClick={() => setRevealed((value) => ({ ...value, [member.id]: true }))} className="relative min-h-52 overflow-hidden rounded-3xl border-[3px] shadow-lg" style={{ background: memberTheme.background, borderColor: memberTheme.border }}>{active ? <><SafeImage src={member.image} alt={member.ne} fallback={member.icon} className="absolute inset-0 h-full w-full object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" /><strong className="absolute bottom-3 left-3 right-3 text-left text-white">{language === 'ne' ? member.ne : member.en}</strong></> : <span className="absolute inset-0 flex flex-col items-center justify-center"><span className="gift-bob text-7xl">🎁</span><strong className="mt-2 text-sm">{t.reveal}</strong></span>}</button>; })}</div></>}
      </main>

      <nav className="fixed bottom-[max(0.55rem,env(safe-area-inset-bottom))] left-1/2 z-50 grid w-[min(calc(100%-1rem),45rem)] -translate-x-1/2 grid-cols-4 gap-1 rounded-3xl border border-slate-100 bg-white/95 p-1.5 shadow-2xl">
        {[["learn", Shapes], ["culture", Landmark], ["stories", BookOpen], ["family", Users]].map(([id, Icon]) => <button type="button" key={id} onClick={() => setSection(id)} className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-black ${section === id ? 'bg-violet-100 text-violet-800' : 'text-slate-500'}`}><Icon size={22} /><span>{t[id]}</span></button>)}
      </nav>
    </div>
  );
}
