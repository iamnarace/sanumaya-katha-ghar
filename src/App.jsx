import React, { useState } from 'react';
import { Volume2, Sparkles, Heart, Eye, BookOpen, Grid, CheckCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('barnamala'); // 'barnamala', 'game', 'family', 'story'
  const [selectedLetter, setSelectedLetter] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [peekState, setPeekState] = useState({});

  // Trigger Nepali Speech & Visual Effects
  const playAudio = (text) => {
    setShowReward(true);
    setTimeout(() => setShowReward(false), 1200);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ne-NP';
      utterance.rate = 0.75; // Slower pace for toddlers
      window.speechSynthesis.speak(utterance);
    }
  };

  // Full Barnamala Data with Giant Visual Icons
  const barnamala = [
    { letter: 'क', word: 'कमल', english: 'Lotus', icon: '🪷', color: 'from-pink-500 to-rose-500', sound: 'क बाट कमल!' },
    { letter: 'ख', word: 'खरायो', english: 'Rabbit', icon: '🐰', color: 'from-amber-400 to-orange-500', sound: 'ख बाट खरायो!' },
    { letter: 'ग', word: 'गाई', english: 'Cow', icon: '🐮', color: 'from-emerald-400 to-teal-500', sound: 'ग बाट गाई!' },
    { letter: 'घ', word: 'घर', english: 'House', icon: '🏠', color: 'from-sky-400 to-blue-500', sound: 'घ बाट घर!' },
    { letter: 'ङ', word: 'ङा (माछा)', english: 'Fish', icon: '🐟', color: 'from-purple-400 to-indigo-500', sound: 'ङा बाट माछा!' },
  ];

  // Matching Game Options
  const handleMatch = (isCorrect, word) => {
    if (isCorrect) {
      setMatchScore(prev => prev + 1);
      playAudio(`स्याबास सानुमाया! सही उत्तर! ${word}`);
    } else {
      playAudio('फेरि कोसिस गरौँ सानुमाया!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-rose-100 font-sans pb-12">
      
      {/* FLOATING REWARD ANIMATION */}
      {showReward && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center space-x-3 bg-black/10 backdrop-blur-xs">
          <span className="animate-ping text-8xl">🌟</span>
          <span className="animate-bounce text-8xl">💖</span>
          <span className="animate-pulse text-8xl">🎉</span>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white p-4 shadow-xl text-center sticky top-0 z-40 rounded-b-3xl">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-7 h-7 text-yellow-300 animate-spin" />
          <h1 className="text-3xl font-black tracking-wide drop-shadow-md">सानुमायाको कथाघर</h1>
        </div>
        <p className="text-xs text-pink-100 font-semibold mt-0.5">Sanumaya's Interactive Playground • Age 1y 2m</p>

        {/* NAVIGATION TABS */}
        <div className="flex justify-around mt-4 bg-white/20 p-1.5 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('barnamala')}
            className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center space-x-1 transition ${
              activeTab === 'barnamala' ? 'bg-white text-rose-600 shadow-lg scale-105' : 'text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>क ख ग</span>
          </button>

          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center space-x-1 transition ${
              activeTab === 'game' ? 'bg-white text-rose-600 shadow-lg scale-105' : 'text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>खेल (Game)</span>
          </button>

          <button
            onClick={() => setActiveTab('family')}
            className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center space-x-1 transition ${
              activeTab === 'family' ? 'bg-white text-rose-600 shadow-lg scale-105' : 'text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>परिवार</span>
          </button>

          <button
            onClick={() => setActiveTab('story')}
            className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center space-x-1 transition ${
              activeTab === 'story' ? 'bg-white text-rose-600 shadow-lg scale-105' : 'text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>कथा</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-md mx-auto p-4 mt-2">

        {/* ------------------------------------------------------------- */}
        {/* 1. KA KHA GHA (BARNAMALA) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'barnamala' && (
          <div className="space-y-5">
            {/* GIANT FEATURED LETTER CARD */}
            <div 
              onClick={() => playAudio(barnamala[selectedLetter].sound)}
              className={`bg-gradient-to-br ${barnamala[selectedLetter].color} text-white rounded-3xl p-6 shadow-2xl border-4 border-white text-center cursor-pointer transform active:scale-95 transition relative overflow-hidden`}
            >
              <div className="absolute top-3 right-3 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                🔊 Tap for Sound
              </div>

              <span className="text-9xl font-black drop-shadow-lg block my-2">
                {barnamala[selectedLetter].letter}
              </span>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mt-2 flex items-center justify-between">
                <span className="text-6xl">{barnamala[selectedLetter].icon}</span>
                <div className="text-right">
                  <h2 className="text-3xl font-black">{barnamala[selectedLetter].word}</h2>
                  <p className="text-sm font-semibold opacity-90">{barnamala[selectedLetter].english}</p>
                </div>
              </div>
            </div>

            {/* HORIZONTAL CAROUSEL SELECTOR */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {barnamala.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLetter(idx);
                    playAudio(`${item.letter} बाट ${item.word}`);
                  }}
                  className={`flex-none w-20 h-24 rounded-2xl font-black text-3xl flex flex-col items-center justify-center shadow-md border-2 transition ${
                    selectedLetter === idx 
                      ? 'bg-rose-500 text-white border-white scale-110 shadow-lg' 
                      : 'bg-white text-slate-700 border-rose-200'
                  }`}
                >
                  <span>{item.letter}</span>
                  <span className="text-xl mt-1">{item.icon}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. TAP & MATCH GAME */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'game' && (
          <div className="bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-300 text-center space-y-4">
            <div className="bg-amber-100 p-3 rounded-2xl border border-amber-300">
              <h2 className="text-xl font-black text-amber-900">
                '{barnamala[selectedLetter].letter}' बाट के हुन्छ?
              </h2>
              <p className="text-xs text-amber-700 font-bold">Tap the correct item below!</p>
            </div>

            {/* TARGET LETTER DISPLAY */}
            <div className="w-28 h-28 mx-auto bg-rose-500 text-white rounded-3xl flex items-center justify-center text-7xl font-black shadow-lg">
              {barnamala[selectedLetter].letter}
            </div>

            {/* OPTIONS */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {barnamala.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMatch(idx === selectedLetter, item.word)}
                  className="bg-amber-50 hover:bg-amber-100 p-4 rounded-2xl border-2 border-amber-200 flex flex-col items-center shadow-sm active:scale-95 transition"
                >
                  <span className="text-5xl mb-1">{item.icon}</span>
                  <span className="font-extrabold text-slate-800 text-lg">{item.word}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. FAMILY PEEK-A-BOO */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'family' && (
          <div className="space-y-3">
            <div className="bg-rose-100 p-3 rounded-2xl text-center border border-rose-200">
              <p className="font-extrabold text-rose-900 text-base">मेरो प्यारा परिवार (My Family)</p>
              <p className="text-xs text-rose-700">Tap any box to reveal family!</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'f1', title: 'आमा र बुवा', icon: '👨‍👩‍👧', text: 'नमस्ते सानुमाया! आमा र बुवा!' },
                { id: 'f2', title: 'हजुरबा', icon: '👴', text: 'नमस्ते सानुमाया, म तिम्रो हजुरबा!' },
                { id: 'f3', title: 'हजुरआमा', icon: '👵', text: 'प्यारी सानुमाया, म तिम्रो हजुरआमा!' },
                { id: 'f4', title: 'मामा', icon: '🧔', text: 'नमस्ते सानुमाया, म तिम्रो मामा!' },
              ].map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setPeekState(prev => ({ ...prev, [card.id]: !prev[card.id] }));
                    playAudio(card.text);
                  }}
                  className="h-40 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl border-4 border-white shadow-lg flex flex-col items-center justify-center text-white cursor-pointer active:scale-95 transition relative overflow-hidden"
                >
                  {peekState[card.id] ? (
                    <div className="flex flex-col items-center animate-bounce">
                      <span className="text-6xl">{card.icon}</span>
                      <span className="font-black text-lg mt-1">{card.title}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-5xl mb-1">🎁</span>
                      <span className="font-bold text-sm">को हो? (Tap)</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. STORY CORNER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'story' && (
          <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-200 p-5 text-center space-y-4">
            <span className="text-xs font-black text-rose-400 uppercase tracking-widest">
              Sanumaya's Story Corner
            </span>

            <div className="w-full h-48 bg-gradient-to-br from-rose-400 to-amber-400 rounded-2xl flex items-center justify-center text-white shadow-inner">
              <span className="text-8xl">🌹</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-800">सानुमाया र रातो फूल</h3>
              <p className="text-base font-bold text-rose-600">"सानुमाया बगैँचामा गइन्। रातो फूल देखिन्!"</p>
              <p className="text-xs text-slate-400 italic">"Sanumaya went to the garden and saw a red flower!"</p>
            </div>

            <button
              onClick={() => playAudio('सानुमाया बगैँचामा गइन्। रातो फूल देखिन्!')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-3 rounded-2xl shadow-lg active:scale-95 transition flex items-center justify-center space-x-2 text-lg"
            >
              <Volume2 className="w-6 h-6" />
              <span>कथा सुन्नुहोस् (Listen)</span>
            </button>
          </div>
        )}

      </main>
    </div>
  );
}