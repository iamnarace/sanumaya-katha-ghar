export default function PersonalSection({ language, profile, draftProfile, setDraftProfile, saveProfile, resetProfile }) {
  const fields = [['name', 'नेपाली नाम', 'Nepali name'], ['englishName', 'अंग्रेजी नाम', 'English name'], ['nickname', 'बोलाउने नाम', 'Nickname'], ['favouriteAnimal', 'मनपर्ने जनावर', 'Favourite animal'], ['favouriteColor', 'मनपर्ने रङ', 'Favourite colour'], ['homePlace', 'बस्ने ठाउँ', 'Home place']];
  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-[0_6px_0_rgba(46,42,79,0.08)]">
      <h2 className="font-display text-2xl font-extrabold text-[var(--ink)]">{language === 'ne' ? `${profile.name}को विवरण` : `${profile.englishName}'s details`}</h2>
      <p className="mt-1 text-base text-[var(--ink-soft)]">{language === 'ne' ? 'यहाँको नाम कथा र परिवार पानामा देखिन्छ। यो जानकारी यही फोन/कम्प्युटरमा मात्र बस्छ।' : 'These names appear in stories and on the family page. They are saved on this device only.'}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.map(([key, ne, en]) => (
          <label key={key} className="block">
            <span className="text-sm font-bold text-[var(--ink-soft)]">{language === 'ne' ? ne : en}</span>
            <input value={draftProfile[key]} onChange={(e) => setDraftProfile((v) => ({ ...v, [key]: e.target.value }))} className="mt-1 h-12 w-full rounded-xl border-2 border-[#E6E1F5] bg-[#FBFAFF] px-3 text-lg font-bold text-[var(--ink)] outline-none focus:border-[#6A45D8]" />
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={saveProfile} className="h-12 rounded-2xl bg-[#6A45D8] px-6 font-extrabold text-white shadow-[0_4px_0_#4B2FA8]">{language === 'ne' ? 'सुरक्षित गर्नुहोस्' : 'Save details'}</button>
        <button type="button" onClick={resetProfile} className="h-12 rounded-2xl bg-[#F1EEFA] px-6 font-extrabold text-[var(--ink-soft)]">{language === 'ne' ? 'सुरुकै नाम राख्नुहोस्' : 'Reset to default'}</button>
      </div>
    </section>
  );
}
