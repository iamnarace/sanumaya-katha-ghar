import React, { useState } from 'react';
import { Volume2, Heart, Sparkles, Eye, BookOpen, Music, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('peekaboo'); // 'peekaboo', 'soundboard', 'family', 'story'
  const [peekState, setPeekState] = useState({});
  const [showReward, setShowReward] = useState(false);
  const [storyPage, setStoryPage] = useState(0);

  // Safe Speech & Audio trigger
  const playAudio = (text, customAudioUrl = null) => {
    setShowReward(true);
    setTimeout(() => setShowReward(false), 1200);

    // Play custom family .mp3 recording if available
    if (customAudioUrl) {
      const audio = new Audio(customAudioUrl);
      audio.play().catch(() => playSpeech(text));
      return;
    }

    playSpeech(text);
  };

  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ne-NP';
      utterance.rate = 0.75; // Slower pace for toddlers
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePeek = (id, text) => {
    setPeekState((prev) => ({ ...prev, [id]: !prev[id] }));
    playAudio(text);
  };

  // Real family data (using placeholders for extended family until real photos are uploaded)
  const familyList = [
    { id: 'ama', nameNp: 'आमा', nameEn: 'Ama', icon: '👩', audio: 'नमस्ते सानुमाया, म तिम्रो आमा!', photo: '/images/family.jpg' },
    { id: 'buwa', nameNp: 'बुवा', nameEn: 'Buwa', icon: '👨', audio: 'नमस्ते सानुमाया, म तिम्रो बुवा!', photo: '/images/family.jpg' },
    { id: 'hajurba', nameNp: 'हजुरबा', nameEn: 'Hajurba', icon: '👴', audio: 'नमस्ते सानुमाया, म तिम्रो हजुरबा!', photo: null },
    { id: 'hajurama', nameNp: 'हजुरआमा', nameEn: 'Hajurama', icon: '👵', audio: 'प्यारी सानुमाया, म तिम्रो हजुरआमा!', photo: null },
    { id: 'mama', nameNp: 'मामा', nameEn: 'Mama', icon: '🧔', audio: 'नमस्ते सानुमाया, म तिम्रो मामा!', photo: null },
    { id: 'maiju', nameNp: 'माइजु', nameEn: 'Maiju', icon: '👩‍🦰', audio: 'नमस्ते सानुमाया, म तिम्रो माइजु!', photo: null },
  ];

  // Toddler Vocabulary (Accurate Word-Image Pairings)
  const vocabList = [
    { letter: 'क', word: 'कमल', english: 'Lotus', icon: '🪷', sound: 'क बाट कमल!' },
    { letter: 'ख', word: 'खरायो', english: 'Rabbit', icon: '🐰', sound: 'ख बाट खरायो!' },
    { letter: 'ग', word: 'गाई', english: 'Cow', icon: '🐮', sound: 'ग बाट गाई!' },
    { letter: 'घ', word: 'घर', english: 'House', icon: '🏠', sound: 'घ बाट घर!' },
  ];

  // Personalized Story Starring Sanumaya
  const storyPages = [
    {
      photo: '/images/rose.jpg',
      np: 'सानुमाया बगैँचामा गइन्।',
      en: 'Sanumaya went to the garden.',
      audio: 'सानुमाया बगैँचामा गइन्। रातो फूल देखिन्!'
    },
    {
      photo: '/images/rose.jpg',
      np: 'सानुमायाले भनिन्— "नमस्ते रातो फूल!"',
      en: 'Sanumaya said, "Hello red flower!"',
      audio: 'सानुमायाले भनिन्, नमस्ते रातो फूल!'
    },
    {
      photo: '/images/bench.jpg',
      np: 'फूलले भन्यो— "नमस्ते सानुमाया, मुस्कुराउ!"',
      en: 'The flower said, "Hello Sanumaya, keep smiling!"',
      audio: 'फूलले भन्यो, नमस्ते सानुमाया! मुस्कुराउ!'
    },
    {
      photo: '/images/holi.jpg',
      np: 'सानुमायाले होलीमा रङ खेलिन्।',
      en: 'Sanumaya played with colors in Holi.',
      audio: 'सानुमायाले होलीमा रङ खेलिन्। आहा कति रमाइलो!'
    }
  ];

  return (
    <div className="min-h-screen bg-pink-50 font-sans pb-12">
      
      {/* TODDLER REWARD ANIMATION */}
      {showReward && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center space-x-3">
          <span className="animate-ping text-7xl">🌟</span>
          <span className="animate-bounce text-7xl">💖</span>
          <span className="animate-pulse text-7xl">🎈</span>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white p-4 shadow-md text-center sticky top-0 z-40">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <h1 className="text-2xl font-black tracking-wide">सानुमायाको कथाघर</h1>
        </div>
        <p className="text-xs text-pink-100 font-medium">Sanumaya's Katha Ghar • Age 1y 2m</p>

        {/* NAVIGATION TABS */}
        <div className="flex justify-center space-x-1.5 mt-3 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('peekaboo')}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center space-x-1 transition ${
              activeTab === 'peekaboo' ? 'bg-white text-rose-600 shadow' : 'bg-white/20 text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>लुकामारी</span>
          </button>
          <button
            onClick={() => setActiveTab('soundboard')}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center space-x-1 transition ${
              activeTab === 'soundboard' ? 'bg-white text-rose-600 shadow' : 'bg-white/20 text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>आवाज</span>
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center space-x-1 transition ${
              activeTab === 'family' ? 'bg-white text-rose-600 shadow' : 'bg-white/20 text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>परिवार</span>
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center space-x-1 transition ${
              activeTab === 'story' ? 'bg-white text-rose-600 shadow' : 'bg-white/20 text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>कथा</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-md mx-auto p-4 mt-1">

        {/* ------------------------------------------------------------- */}
        {/* 1. PEEK-A-BOO GAME */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'peekaboo' && (
          <div className="space-y-4">
            <div className="bg-amber-100 p-3 rounded-2xl text-center border border-amber-300">
              <p className="font-extrabold text-amber-900 text-base">को हो? थिच्नुहोस् र हेर्नुहोस्!</p>
              <p className="text-xs text-amber-700">Tap to unblur and hear the voice!</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 */}
              <div
                onClick={() => togglePeek('c1', 'नमस्ते सानुमाया! आमा र बुवा!')}
                className="h-44 bg-rose-400 rounded-3xl border-4 border-rose-300 shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition flex items-center justify-center"
              >
                <img
                  src="/images/family.jpg"
                  alt="Family"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x400/f43f5e/white?text=Ama+and+Buwa'; }}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    peekState['c1'] ? 'scale-100 blur-0' : 'scale-125 blur-xl opacity-30'
                  }`}
                />
                {!peekState['c1'] && (
                  <div className="absolute inset-0 bg-rose-500/90 flex flex-col items-center justify-center text-white font-black">
                    <span className="text-5xl mb-1">🎁</span>
                    <span>को आयो?</span>
                  </div>
                )}
              </div>

              {/* Card 2 */}
              <div
                onClick={() => togglePeek('c2', 'रातो फूल! सानुमाया!')}
                className="h-44 bg-amber-400 rounded-3xl border-4 border-amber-300 shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition flex items-center justify-center"
              >
                <img
                  src="/images/rose.jpg"
                  alt="Roses"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x400/f59e0b/white?text=Red+Roses'; }}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    peekState['c2'] ? 'scale-100 blur-0' : 'scale-125 blur-xl opacity-30'
                  }`}
                />
                {!peekState['c2'] && (
                  <div className="absolute inset-0 bg-amber-500/90 flex flex-col items-center justify-center text-white font-black">
                    <span className="text-5xl mb-1">🌹</span>
                    <span>हेरौँ!</span>
                  </div>
                )}
              </div>

              {/* Card 3 */}
              <div
                onClick={() => togglePeek('c3', 'होलीको रङ! छमछम!')}
                className="h-44 bg-purple-400 rounded-3xl border-4 border-purple-300 shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition flex items-center justify-center"
              >
                <img
                  src="/images/holi.jpg"
                  alt="Holi"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x400/a855f7/white?text=Holi+Colors'; }}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    peekState['c3'] ? 'scale-100 blur-0' : 'scale-125 blur-xl opacity-30'
                  }`}
                />
                {!peekState['c3'] && (
                  <div className="absolute inset-0 bg-purple-500/90 flex flex-col items-center justify-center text-white font-black">
                    <span className="text-5xl mb-1">🎨</span>
                    <span>के हो?</span>
                  </div>
                )}
              </div>

              {/* Card 4 */}
              <div
                onClick={() => togglePeek('c4', 'हा हा हा! मुस्कुराउने सानुमाया!')}
                className="h-44 bg-emerald-400 rounded-3xl border-4 border-emerald-300 shadow-lg relative overflow-hidden cursor-pointer active:scale-95 transition flex items-center justify-center"
              >
                <img
                  src="/images/bench.jpg"
                  alt="Laughing"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x400/10b981/white?text=Sanumaya'; }}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    peekState['c4'] ? 'scale-100 blur-0' : 'scale-125 blur-xl opacity-30'
                  }`}
                />
                {!peekState['c4'] && (
                  <div className="absolute inset-0 bg-emerald-500/90 flex flex-col items-center justify-center text-white font-black">
                    <span className="text-5xl mb-1">😄</span>
                    <span>को हो?</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. TODDLER SOUNDBOARD */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'soundboard' && (
          <div className="space-y-3">
            <div className="bg-pink-100 p-3 rounded-2xl text-center border border-pink-300">
              <p className="font-extrabold text-pink-900 text-base">अक्षर र आवाज (Tap to Hear)</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {vocabList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => playAudio(item.sound)}
                  className="bg-white p-4 rounded-3xl shadow-md border-2 border-pink-200 flex flex-col items-center text-center cursor-pointer active:scale-95 transition"
                >
                  <span className="text-6xl mb-2">{item.icon}</span>
                  <span className="text-4xl font-black text-rose-500 mb-1">{item.letter}</span>
                  <p className="text-lg font-bold text-slate-800">{item.word}</p>
                  <p className="text-xs text-slate-400 font-semibold">{item.english}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. FAMILY TREE (NO STRANGER PHOTOS) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'family' && (
          <div className="space-y-3">
            <div className="bg-rose-100 p-3 rounded-2xl text-center border border-rose-200">
              <p className="font-extrabold text-rose-900 text-base">मेरो परिवार (My Family)</p>
              <p className="text-xs text-rose-700">Tap to hear greetings from family!</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {familyList.map((member) => (
                <div
                  key={member.id}
                  onClick={() => playAudio(member.audio)}
                  className="bg-white p-3 rounded-3xl shadow-sm border-2 border-rose-100 flex flex-col items-center text-center cursor-pointer active:scale-95 transition"
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.nameNp}
                      onError={(e) => { e.target.style.display = 'none'; }}
                      className="w-20 h-20 rounded-full object-cover border-2 border-amber-300 mb-2"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl mb-2">
                      {member.icon}
                    </div>
                  )}
                  <h3 className="font-black text-slate-800 text-lg">{member.nameNp}</h3>
                  <p className="text-xs text-rose-500 font-bold">{member.nameEn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. STORYBOOK */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'story' && (
          <div className="bg-white rounded-3xl shadow-xl border-4 border-rose-200 overflow-hidden text-center p-4 space-y-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Page {storyPage + 1} of {storyPages.length}
            </span>

            <img
              src={storyPages[storyPage].photo}
              alt="Story scene"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400/f43f5e/white?text=Sanumaya+Story'; }}
              className="w-full h-56 object-cover rounded-2xl shadow-sm"
            />

            <p className="text-xl font-bold text-slate-800 leading-snug">{storyPages[storyPage].np}</p>
            <p className="text-xs text-slate-400 italic">"{storyPages[storyPage].en}"</p>

            <button
              onClick={() => playAudio(storyPages[storyPage].audio)}
              className="w-full bg-rose-500 text-white font-black py-3 rounded-2xl shadow active:scale-95 transition text-base flex items-center justify-center space-x-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>कथा सुन्नुहोस् (Listen)</span>
            </button>

            <div className="flex justify-between space-x-2 pt-1">
              <button
                disabled={storyPage === 0}
                onClick={() => setStoryPage((prev) => prev - 1)}
                className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl disabled:opacity-30 text-sm"
              >
                ⬅️ Previous
              </button>
              <button
                disabled={storyPage === storyPages.length - 1}
                onClick={() => setStoryPage((prev) => prev + 1)}
                className="flex-1 bg-rose-500 text-white font-bold py-2.5 rounded-xl disabled:opacity-30 shadow text-sm"
              >
                Next ➡️
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}