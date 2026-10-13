import { useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { SafeImage, Tabs, num } from '../ui.jsx';

const COUNT_THINGS = ['🌼', '🐥', '🍎', '🎈', '⭐', '🐟', '🦋', '🍓'];

function ColourGame({ language, colours, celebrate, tryAgain }) {
  const [round, setRound] = useState(0);
  const { target, options } = useMemo(() => {
    const t = colours[(round * 5) % colours.length];
    const others = colours.filter((c) => c.id !== t.id);
    const picks = [t, others[(round * 3) % others.length], others[(round * 3 + 4) % others.length]];
    return { target: t, options: picks.sort((a, b) => ((a.hex.charCodeAt(2) + round) % 7) - ((b.hex.charCodeAt(2) + round) % 7)) };
  }, [round, colours]);
  const choose = (c) => {
    if (c.id !== target.id) return tryAgain();
    celebrate(language === 'ne' ? `${target.ne}! स्याबास!` : `${target.en}! Well done!`);
    setTimeout(() => setRound((r) => r + 1), 700);
  };
  return (
    <section className="rounded-[2rem] bg-white p-5 text-center shadow-[0_6px_0_rgba(46,42,79,0.08)]">
      <h2 className="font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? `${target.ne} कुन हो?` : `Which one is ${target.en.toLowerCase()}?`}</h2>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {options.map((c) => (
          <button key={c.id} type="button" onClick={() => choose(c)} aria-label={c.en} className="aspect-square rounded-[1.8rem] shadow-[0_6px_0_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-none" style={{ background: c.hex, border: c.id === 'white' ? '3px solid #E4E0F0' : 'none' }} />
        ))}
      </div>
    </section>
  );
}

function CountGame({ language, celebrate, tryAgain }) {
  const [round, setRound] = useState(0);
  const target = ((round * 3) % 5) + 1;
  const thing = COUNT_THINGS[round % COUNT_THINGS.length];
  const choose = (v) => {
    if (v !== target) return tryAgain();
    celebrate(language === 'ne' ? `${num(target, 'ne')}! स्याबास!` : `${target}! Well done!`);
    setTimeout(() => setRound((r) => r + 1), 700);
  };
  return (
    <section className="rounded-[2rem] bg-white p-5 text-center shadow-[0_6px_0_rgba(46,42,79,0.08)]">
      <h2 className="font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? 'कति वटा छन्?' : 'How many?'}</h2>
      <div className="my-6 flex min-h-32 flex-wrap items-center justify-center gap-2 text-6xl sm:text-7xl">{Array.from({ length: target }, (_, i) => <span key={i}>{thing}</span>)}</div>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((v) => <button key={v} type="button" onClick={() => choose(v)} className="h-20 rounded-[1.4rem] bg-[#FFF3D6] font-display text-5xl font-extrabold text-[#C97800] shadow-[0_5px_0_#F4CE7A] active:translate-y-1 active:shadow-none">{num(v, language)}</button>)}
      </div>
    </section>
  );
}

export default function GamesSection({ language, gameMode, setGameMode, card, phrase, choices, choose, newRound, colours, celebrate, tryAgain }) {
  return (
    <div className="flex flex-col gap-4">
      <Tabs value={gameMode} onChange={setGameMode} accent="#16877A" options={[
        ['picture', language === 'ne' ? 'चित्र छान' : 'Pick the picture', '🖼️'],
        ['letter', language === 'ne' ? 'अक्षर छान' : 'Pick the letter', 'अ'],
        ['count', language === 'ne' ? 'गन्ती' : 'Count', '🔢'],
        ['colour', language === 'ne' ? 'रङ छान' : 'Pick the colour', '🎨'],
      ]} />
      {gameMode === 'picture' && (
        <section className="rounded-[2rem] bg-white p-5 shadow-[0_6px_0_rgba(46,42,79,0.08)]">
          <h2 className="text-center font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? `${card.word} कहाँ छ?` : `Where is the ${card.word.toLowerCase()}?`}</h2>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
            {choices.map((c) => (
              <button type="button" key={c.letter} onClick={() => choose(c)} aria-label={c.word} className="tile flex flex-col items-center rounded-[1.6rem] bg-[#F6F3FF] p-2" style={{ '--edge': 'rgba(46,42,79,0.1)' }}>
                <span className="grid h-28 w-full place-items-center overflow-hidden rounded-2xl bg-white sm:h-36"><SafeImage src={c.image} alt={c.word} fallback={c.fallback} className="h-full w-full [--emoji:4rem]" contain /></span>
              </button>
            ))}
          </div>
        </section>
      )}
      {gameMode === 'letter' && (
        <section className="rounded-[2rem] bg-white p-5 shadow-[0_6px_0_rgba(46,42,79,0.08)]">
          <h2 className="text-center font-display text-3xl font-extrabold text-[var(--ink)]">{language === 'ne' ? `${card.word} कुन अक्षरबाट?` : `${card.word} starts with…`}</h2>
          <div className="mx-auto mt-4 grid h-56 max-w-sm place-items-center overflow-hidden rounded-[1.8rem] bg-[#F6F3FF]"><SafeImage src={card.image} alt={card.word} fallback={card.fallback} className="h-full w-full [--emoji:7rem]" contain /></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {choices.map((c) => <button type="button" key={c.letter} onClick={() => choose(c)} className="h-24 rounded-[1.6rem] bg-[#EEE8FF] font-display text-6xl font-extrabold text-[#6A45D8] shadow-[0_5px_0_#C9B8FA] active:translate-y-1 active:shadow-none">{c.letter}</button>)}
          </div>
        </section>
      )}
      {gameMode === 'count' && <CountGame {...{ language, celebrate, tryAgain }} />}
      {gameMode === 'colour' && <ColourGame {...{ language, colours, celebrate, tryAgain }} />}
      {(gameMode === 'picture' || gameMode === 'letter') && (
        <button type="button" onClick={newRound} className="mx-auto flex h-12 items-center gap-2 rounded-full bg-white px-5 font-extrabold text-[var(--ink-soft)] shadow-[0_3px_0_rgba(46,42,79,0.1)]"><RefreshCw size={20} />{language === 'ne' ? 'अर्को पालो' : 'New round'}</button>
      )}
    </div>
  );
}
