import { useEffect, useMemo, useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import { bodyParts, colours, consonants, defaultProfile, english, familyMembers, numbers, shapes, storybooks, vocabulary, vocabularyCategories, vowels } from './content.js';
import { LanguageToggle, TopBar, themes, useHashSection, useSwipe, wrap } from './ui.jsx';
import Avatar from './Avatar.jsx';
import LearnSection from './sections/LearnSection.jsx';
import GamesSection from './sections/GamesSection.jsx';
import StoriesSection from './sections/StoriesSection.jsx';
import PersonalSection from './sections/PersonalSection.jsx';
import VocabSection from './sections/VocabSection.jsx';
import NumbersSection from './sections/NumbersSection.jsx';
import ColoursSection from './sections/ColoursSection.jsx';
import BodySection from './sections/BodySection.jsx';
import FamilySection from './sections/FamilySection.jsx';

const copy = {
  ne: { reward: 'स्याबास सानुमाया!', tryAgain: 'फेरि हेरौँ 🙂', previous: 'पछाडि', next: 'अर्को', page: 'पाना', restart: 'फेरि सुरु गर्ने' },
  en: { reward: 'Well done, Sanumaya!', tryAgain: "Let's look again 🙂", previous: 'Back', next: 'Next', page: 'Page', restart: 'Start again' },
};

// Home tiles. `edge` is the darker underside that makes each tile feel like a toy button.
const SECTIONS = [
  { id: 'learn', ne: 'अक्षर', en: 'Letters', bg: '#EEE8FF', edge: '#C9B8FA', ink: '#6A45D8', glyph: { ne: 'क', en: 'Aa' } },
  { id: 'numbers', ne: 'अङ्क', en: 'Numbers', bg: '#FFF3D6', edge: '#F4CE7A', ink: '#C97800', glyph: { ne: '१२३', en: '123' } },
  { id: 'colours', ne: 'रङ र आकार', en: 'Colours', bg: '#FFE8EC', edge: '#FFB8C6', ink: '#D93A5B', art: 'colours' },
  { id: 'vocab', ne: 'शब्द', en: 'Words', bg: '#E1F7EA', edge: '#9EDFB9', ink: '#24875A', emoji: '🐘' },
  { id: 'body', ne: 'मेरो शरीर', en: 'My body', bg: '#FFE9DE', edge: '#FDBE9D', ink: '#D2541E', emoji: '👃' },
  { id: 'family', ne: 'परिवार', en: 'Family', bg: '#E2F1FD', edge: '#A9D3F5', ink: '#2F7FE0', art: 'family' },
  { id: 'stories', ne: 'कथा', en: 'Stories', bg: '#FDE6F1', edge: '#F6B3D3', ink: '#C23A7E', emoji: '📖' },
  { id: 'games', ne: 'खेल', en: 'Games', bg: '#DDF5F1', edge: '#97DDD3', ink: '#16877A', emoji: '🎲' },
];

const TITLES = {
  learn: ['अक्षरमाला', 'Alphabet'], numbers: ['अङ्क', 'Numbers'], colours: ['रङ र आकार', 'Colours'],
  vocab: ['शब्दहरू', 'Words'], body: ['मेरो शरीर', 'My body'], family: ['मेरो परिवार', 'My family'],
  stories: ['कथाघर', 'Story house'], games: ['खेलौँ', "Let's play"], sanumaya: ['अभिभावकका लागि', 'For parents'],
};

function PrayerFlags() {
  const colours = ['#2F7FE0', '#FFFFFF', '#E5383B', '#3BB273', '#FFD23F'];
  const flags = Array.from({ length: 15 }, (_, i) => i);
  return (
    <svg viewBox="0 0 600 70" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full sm:h-16" aria-hidden="true">
      <path d="M-10 8 Q300 46 610 8" fill="none" stroke="#B8AFD6" strokeWidth="2" />
      {flags.map((i) => {
        const x = 12 + i * 40;
        const t = x / 600;
        const y = 8 + 4 * 38 * t * (1 - t);
        return <rect key={i} className="flag" style={{ animationDelay: `${(i % 5) * 0.25}s`, transformOrigin: `${x + 13}px ${y}px` }} x={x} y={y} width="26" height="20" rx="2" fill={colours[i % 5]} stroke="rgba(46,42,79,0.08)" />;
      })}
    </svg>
  );
}

function TileArt({ s, language }) {
  if (s.glyph) return <span className="font-display text-[4.2rem] font-extrabold leading-none sm:text-[5rem]" style={{ color: s.ink }}>{s.glyph[language]}</span>;
  if (s.art === 'colours') return (
    <span className="flex -space-x-3">{['#E5383B', '#FFD23F', '#2F7FE0', '#3BB273'].map((c) => <span key={c} className="h-12 w-12 rounded-full border-4 border-white sm:h-14 sm:w-14" style={{ background: c }} />)}</span>
  );
  if (s.art === 'family') return (
    <span className="flex -space-x-4">
      <span className="h-16 w-16 sm:h-20 sm:w-20"><Avatar look={{ hair: 'bun', tika: true, shirt: '#E94F6B', earrings: true }} bg="#fff" /></span>
      <span className="h-16 w-16 sm:h-20 sm:w-20"><Avatar look={{ hair: 'short', moustache: true, shirt: '#3F8FE0' }} bg="#fff" skin={1} /></span>
    </span>
  );
  return <span className="text-[4rem] leading-none sm:text-[4.8rem]">{s.emoji}</span>;
}

export default function App() {
  const [language, setLanguage] = useState(() => { try { return localStorage.getItem('sanumaya-lang') || 'ne'; } catch { return 'ne'; } });
  const [section, setSection] = useHashSection();
  const [nepaliSet, setNepaliSet] = useState('consonants');
  const [index, setIndex] = useState(0);
  const [gameSeed, setGameSeed] = useState(0);
  const [gameMode, setGameMode] = useState('picture');
  const [reward, setReward] = useState('');
  const [profile, setProfile] = useState(defaultProfile);
  const [draftProfile, setDraftProfile] = useState(defaultProfile);
  const [storyId, setStoryId] = useState(storybooks[0].id);
  const [storyPage, setStoryPage] = useState(0);
  const rewardTimer = useRef(null);
  const holdTimer = useRef(null);

  const t = copy[language];
  const cards = language === 'en' ? english : nepaliSet === 'vowels' ? vowels : consonants;
  const cardIndex = index % cards.length;
  const card = cards[cardIndex];
  const theme = themes[cardIndex % themes.length];
  const story = storybooks.find((item) => item.id === storyId) || storybooks[0];
  const page = story.pages[storyPage];
  const phrase = language === 'en' ? `${card.letter} for ${card.word}` : `${card.letter} बाट ${card.word}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sanumaya-profile');
      if (stored) {
        const parsed = { ...defaultProfile, ...JSON.parse(stored) };
        setProfile(parsed);
        setDraftProfile(parsed);
      }
    } catch { /* storage is optional */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('sanumaya-lang', language); } catch { /* optional */ }
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => { setIndex(0); setGameSeed(0); }, [language, nepaliSet]);

  useEffect(() => () => {
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    if (holdTimer.current) clearTimeout(holdTimer.current);
  }, []);

  const previous = () => setIndex((v) => wrap(v - 1, cards.length));
  const next = () => setIndex((v) => wrap(v + 1, cards.length));
  const cardSwipe = useSwipe(previous, next);
  const storySwipe = useSwipe(
    () => setStoryPage((v) => Math.max(0, v - 1)),
    () => setStoryPage((v) => Math.min(story.pages.length - 1, v + 1)),
  );

  const choices = useMemo(() => {
    const indexes = [cardIndex];
    let offset = 1 + gameSeed;
    while (indexes.length < Math.min(3, cards.length)) {
      const candidate = wrap(cardIndex + offset, cards.length);
      if (!indexes.includes(candidate)) indexes.push(candidate);
      offset += 4;
    }
    return indexes.map((i) => cards[i]).sort((a, b) => ((a.letter.codePointAt(0) + gameSeed) % 5) - ((b.letter.codePointAt(0) + gameSeed) % 5));
  }, [cardIndex, cards, gameSeed]);

  const showReward = (message, duration = 1000) => {
    setReward(message);
    if (rewardTimer.current) clearTimeout(rewardTimer.current);
    rewardTimer.current = setTimeout(() => setReward(''), duration);
  };
  const celebrate = (message) => showReward(message || t.reward);
  const tryAgain = () => showReward(t.tryAgain, 750);

  const choose = (choice) => {
    if (choice.letter !== card.letter) return tryAgain();
    celebrate();
    setTimeout(() => { next(); setGameSeed((v) => v + 1); }, 450);
  };

  const saveProfile = () => {
    const cleaned = Object.fromEntries(Object.entries(draftProfile).map(([k, v]) => [k, String(v).trim() || defaultProfile[k]]));
    setProfile(cleaned);
    setDraftProfile(cleaned);
    try { localStorage.setItem('sanumaya-profile', JSON.stringify(cleaned)); } catch { /* optional */ }
    showReward(language === 'ne' ? 'सुरक्षित भयो 💛' : 'Saved 💛', 1100);
  };
  const resetProfile = () => {
    setProfile(defaultProfile);
    setDraftProfile(defaultProfile);
    try { localStorage.removeItem('sanumaya-profile'); } catch { /* optional */ }
  };

  // Parents hold the gear for 1.5s; a quick tap from a toddler does nothing.
  const startHold = () => { holdTimer.current = setTimeout(() => setSection('sanumaya'), 1500); };
  const cancelHold = () => { if (holdTimer.current) clearTimeout(holdTimer.current); };

  const rewardLayer = reward && (
    <div className="reward-layer pointer-events-none fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="rounded-[2rem] bg-white px-7 py-5 text-center font-display text-3xl font-extrabold text-[var(--ink)] shadow-[0_10px_0_rgba(46,42,79,0.12),0_20px_50px_rgba(46,42,79,0.2)]">🌟 {reward}</div>
    </div>
  );

  if (section === 'home' || !TITLES[section]) {
    return (
      <div className="relative min-h-[100dvh] overflow-x-hidden bg-[radial-gradient(120%_60%_at_50%_0%,#DCEBFF_0%,#F6F3FF_60%)] pb-10">
        <PrayerFlags />
        <div className="relative mx-auto max-w-5xl px-4" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 4.25rem)' }}>
          <div className="flex items-center justify-between">
            <button type="button" onPointerDown={startHold} onPointerUp={cancelHold} onPointerLeave={cancelHold} onContextMenu={(e) => e.preventDefault()} aria-label={language === 'ne' ? 'अभिभावक: १.५ सेकेन्ड थिच्नुहोस्' : 'Parents: press and hold'} title="Hold for 1.5 seconds" className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[var(--ink-soft)]">
              <Settings size={22} />
            </button>
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          <div className="mt-4 flex items-center gap-3 sm:mt-6">
            <img src="/images/stickers/namaste.png" alt="" className="h-24 w-24 flex-none object-contain mix-blend-multiply sm:h-32 sm:w-32" />
            <div className="min-w-0">
              <p className="text-xl font-bold text-[var(--ink-soft)] sm:text-2xl">{language === 'ne' ? `नमस्ते, ${profile.nickname}!` : `Namaste, ${profile.englishName}!`}</p>
              <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.05] text-[var(--ink)] sm:text-6xl">{language === 'ne' ? `${profile.name}को कथाघर` : `${profile.englishName}'s Story House`}</h1>
            </div>
          </div>
          <nav className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" aria-label={language === 'ne' ? 'खण्डहरू' : 'Sections'}>
            {SECTIONS.map((s) => (
              <button key={s.id} type="button" onClick={() => setSection(s.id)} className="tile flex aspect-[1/1.02] flex-col items-center justify-center gap-2 rounded-[2rem] px-2" style={{ background: s.bg, '--edge': s.edge }}>
                <span className="grid h-24 place-items-center sm:h-28"><TileArt s={s} language={language} /></span>
                <span className="text-center leading-tight">
                  <span className="block font-display text-[1.6rem] font-extrabold sm:text-3xl" style={{ color: s.ink }}>{language === 'ne' ? s.ne : s.en}</span>
                  <span className="block text-sm font-bold text-[var(--ink-soft)]">{language === 'ne' ? s.en : s.ne}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
        {rewardLayer}
      </div>
    );
  }

  const [titleNe, titleEn] = TITLES[section];
  const accent = SECTIONS.find((s) => s.id === section)?.ink || '#6A45D8';
  return (
    <div className="min-h-[100dvh] bg-[var(--bg)] pb-12">
      <TopBar {...{ titleNe, titleEn, language, setLanguage, accent }} onHome={() => setSection('home')} />
      {rewardLayer}
      <main className="mx-auto w-full max-w-5xl px-4 pt-4">
        {section === 'learn' && <LearnSection {...{ language, nepaliSet, setNepaliSet, cards, cardIndex, setIndex, card, theme, phrase, previous, next, swipe: cardSwipe }} />}
        {section === 'numbers' && <NumbersSection {...{ language, numbers }} />}
        {section === 'colours' && <ColoursSection {...{ language, colours, shapes }} />}
        {section === 'vocab' && <VocabSection {...{ language, vocabularyCategories, vocabulary }} />}
        {section === 'body' && <BodySection {...{ language, bodyParts, celebrate, tryAgain }} />}
        {section === 'family' && <FamilySection {...{ language, familyMembers, profile }} />}
        {section === 'games' && <GamesSection {...{ language, gameMode, setGameMode, card, phrase, choices, choose, colours, celebrate, tryAgain, newRound: () => setGameSeed((v) => v + 1) }} />}
        {section === 'stories' && <StoriesSection {...{ language, profile, storybooks, story, page, storyPage, setStoryPage, setStoryId, swipe: storySwipe, t }} />}
        {section === 'sanumaya' && <PersonalSection {...{ language, profile, draftProfile, setDraftProfile, saveProfile, resetProfile }} />}
      </main>
    </div>
  );
}
