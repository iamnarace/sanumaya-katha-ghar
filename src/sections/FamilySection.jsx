import { useState } from 'react';
import Avatar from '../Avatar.jsx';
import { Viewer, personalize } from '../ui.jsx';

const TINTS = ['#FFE8EC', '#E2F1FD', '#FFF3D6', '#E1F7EA', '#EEE8FF', '#FFE9DE', '#DDF5F1'];

export default function FamilySection({ language, familyMembers, profile }) {
  const [open, setOpen] = useState(null);
  const label = (m) => personalize(language === 'ne' ? m.ne : m.en, profile, language);
  const other = (m) => personalize(language === 'ne' ? m.en : m.ne, profile, language === 'ne' ? 'en' : 'ne');
  const rel = (m) => (language === 'ne' ? m.relNe : m.relEn);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-[var(--ink-soft)]">{language === 'ne' ? 'परिवारका सबैलाई चिनौँ। छोएर ठूलो बनाऊ।' : 'Meet everyone in the family. Tap a face to see it big.'}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {familyMembers.map((m, i) => (
          <button key={m.id} type="button" onClick={() => setOpen(i)} className="tile flex flex-col items-center rounded-[1.8rem] bg-white px-3 pb-4 pt-4" style={{ '--edge': 'rgba(46,42,79,0.1)' }}>
            <span className="block h-32 w-32 sm:h-36 sm:w-36"><Avatar look={m.look} bg={TINTS[i % TINTS.length]} skin={i} /></span>
            <span className="mt-2 font-display text-2xl font-extrabold text-[var(--ink)] sm:text-3xl">{label(m)}</span>
            <span className="text-sm font-bold text-[var(--ink-soft)]">{rel(m)}</span>
          </button>
        ))}
      </div>
      <Viewer items={familyMembers} index={open} setIndex={setOpen} onClose={() => setOpen(null)} language={language} label="Family" tint="#FBF9FF"
        render={(m) => {
          const i = familyMembers.indexOf(m);
          return (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="block h-[40vh] max-h-80 w-[40vh] max-w-80"><Avatar look={m.look} bg={TINTS[i % TINTS.length]} skin={i} /></span>
              <p className="font-display text-6xl font-extrabold text-[var(--ink)]">{label(m)}</p>
              <p className="text-2xl font-bold text-[var(--ink-soft)]">{other(m)}</p>
              <p className="rounded-full bg-white px-5 py-2 text-lg font-bold text-[#6A45D8] shadow-[0_3px_0_rgba(46,42,79,0.08)]">{rel(m)}</p>
            </div>
          );
        }} />
    </div>
  );
}
