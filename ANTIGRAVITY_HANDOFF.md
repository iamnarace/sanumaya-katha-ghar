# Sanumaya's Katha Ghar — Antigravity AI Handoff

> **Update — 13 October 2026 (branch `feature/new-sections-refresh`)**
>
> Sections 6–9 below describe an older layout. Current state:
>
> - **Home** is a grid of 8 toy-style tiles with prayer-flag bunting: Letters, Numbers, Colours, Words, My body, Family, Stories, Games. Parents hold the gear icon for 1.5 s to open the profile page.
> - **Navigation** uses the URL hash (`#numbers`, `#body` …) so the phone back button returns home. Language choice is remembered in `localStorage` (`sanumaya-lang`).
> - **New sections:** `NumbersSection` (count 1–10 and 11–20 with tap-to-count, times tables 1–10 with practise mode and dot groups), `ColoursSection` (11 colours and 8 shapes), `BodySection` (tappable illustrated child plus a "find it" game), `FamilySection` (18 relations with illustrated avatars from `src/Avatar.jsx`, no real photos).
> - **Words** has 11 categories / 142 words (new: Nature, Clothes, Vehicles; more animals, fruit and vegetables). New words use emoji until real photos are added to `public/images/vocab/`.
> - **Shared UI** in `src/ui.jsx`: `TopBar`, `LanguageToggle`, `Tabs`, `Viewer` (full-screen swipe flashcard), `useHashSection`, `num()` for Nepali digits.
> - **Tailwind** is now compiled at build time (`postcss.config.js`); the CDN script was removed from `index.html`.
> - Fixed: `main` failed to build (unclosed `<div>` in `App.jsx`); missing Tihar image; story reader buttons that did nothing (download/share/listen) removed. Audio is still off.
> - **Advanced learning** (ages 3–6; `AdvancedSection` + `AdvancedMore`, wide button under the home grid) opens a grid of 10 topics: times tables 1–10 (all / one / quiz), add and take away, barakhari, clock (o'clock and half past, Nepali डेढ/अढाई/साढे), days and months, My Nepal facts with an SVG flag, seasons/weather/planets, puzzles (what comes next, odd one out), opposites, and longer stories (public-domain fables). Times tables moved here from Numbers.
> - Data for all new sections lives in `src/content.js` (`numbers`, `colours`, `shapes`, `bodyParts`, `familyMembers`).

**Handoff date:** 2 August 2026 (Australia/Sydney)  
**Prepared for:** Antigravity / the next implementation agent  
**Project owner:** Naresh Adhikari  
**Repository:** `https://github.com/iamnarace/sanumaya-katha-ghar`  
**Active work branch:** `agent/bilingual-cultural-learning`  
**Draft pull request:** `https://github.com/iamnarace/sanumaya-katha-ghar/pull/1`  
**Functional baseline commit:** `99fe49727987133ebadff035534958e26a617f57`  
**Target/base branch:** `main`  
**Current rule:** Do not merge PR #1 or modify `main` without Naresh's explicit approval.

---

## 1. Read this first

This is a **private-use personal family project made only for Sanumaya**, not an extension, mirror, catalogue, or client for any other website.

A previous iteration temporarily linked to and hotlinked content from `https://hamrobarnamala.com`. Naresh explicitly reversed that decision. The Sanumaya app must remain independent.

### Non-negotiable separation rule

Do not add any of the following to this repository or app:

- links to `hamrobarnamala.com`;
- `HB_BASE`, `hbImage`, `storyCover`, or equivalent helpers pointing to that domain;
- buttons that open stories, games, images, or exercises on that domain;
- “Hamro Barnamala” branding or production-library wording;
- copied page layouts, story content, proprietary images, or branding from that site.

Ideas and general interaction patterns may inspire original work, but the implementation, data, copy, visuals, navigation, and stories in this project must be Sanumaya-specific and self-contained.

A repository code search at the current functional baseline returned no matches for `hamrobarnamala.com`.

---

## 2. Product purpose and target child

### Product name

- Nepali: **सानुमायाको कथाघर**
- English: **Sanumaya's Katha Ghar**

### Target user

- Sanumaya
- Approximate age at this handoff: **1 year 2 months / 14 months**
- Raised abroad, with the app intended to strengthen Nepali language, family connection, culture, everyday habits, and bilingual familiarity.

### Core experience

The app should feel like a calm, premium, touch-first private learning world containing:

1. Nepali vowels and consonants with large, clear real photographs.
2. English A–Z cards using the wording **“A for Apple”**, not repetitive wording such as “A, A, Apple.”
3. Very simple toddler games.
4. Highly visual personalised stories starring Sanumaya.
5. Nepali culture: Namaste, Ganesh, Shiva, puja, tika, madal, diya, temple, Dashain, Tihar, family customs, and related vocabulary.
6. Family cards using real family photos when available.

### Toddler interaction rules

- One primary idea per screen.
- Very large pictures and letters.
- Large touch targets; no tiny controls.
- Swipe and large previous/next buttons.
- Minimal reading burden.
- No harsh wrong-answer buzzer, red failure state, or punishment.
- Gentle encouragement such as “स्याबास सानुमाया!”
- No ads.
- No outbound learning links.
- No stock-photo strangers in family cards.
- Real photos for general vocabulary whenever possible.
- AI-generated visuals are encouraged for personalised stories, but not as misleading replacements for ordinary vocabulary objects.
- Story character continuity matters: Sanumaya should look consistent across a book.
- Keep the light premium palette; avoid a heavily red/pink interface.

---

## 3. Current Git and deployment state

### GitHub

- Repository: `iamnarace/sanumaya-katha-ghar`
- Current branch: `agent/bilingual-cultural-learning`
- PR: `#1`, open, draft, unmerged
- PR base: `main`
- PR is currently mergeable, but **must not be merged without approval**.
- At functional baseline `99fe497`, PR #1 had 20 changed files, 29 commits, 624 additions, and 295 deletions.

### Vercel

- Vercel project: `sanumaya-katha-ghar`
- Dashboard: `https://vercel.com/naresh-project2054/sanumaya-katha-ghar/deployments`
- Branch alias: `https://sanumaya-katha-ghar-git-agent-bilingu-1ecd9b-naresh-project2054.vercel.app`
- Latest functional deployment before this documentation commit:
  - Deployment ID: `dpl_51PMFG6RGmhEx9wtisQ2rxctn2zq`
  - Commit: `99fe49727987133ebadff035534958e26a617f57`
  - State: `READY`
  - Vercel GitHub status: `success`
  - Build: Vite production build passed; 1,477 modules transformed.

The preview is protected by Vercel authentication. A temporary `_vercel_share` link expires, so do not save an expiring share link as the permanent project URL. Use the dashboard, a logged-in browser, the Vercel connector, or generate a fresh share URL when needed.

### Main/production

The current work is on the feature branch. The existing `main` production deployment remains the older baseline. Do not promote the preview or merge into `main` until browser acceptance is complete and Naresh approves.

---

## 4. Local checkout: do not guess the Windows path

The exact local Windows clone path was not verified in this handoff. Do not assume a directory name.

If a clone already exists, start in the suspected folder and run:

```powershell
git rev-parse --show-toplevel
git remote -v
git status --short --branch
git branch --show-current
git rev-parse HEAD
```

Expected remote repository:

```text
https://github.com/iamnarace/sanumaya-katha-ghar
```

Expected active branch:

```text
agent/bilingual-cultural-learning
```

If no clone exists:

```powershell
git clone https://github.com/iamnarace/sanumaya-katha-ghar.git
cd sanumaya-katha-ghar
git fetch origin
git switch agent/bilingual-cultural-learning
git pull --ff-only origin agent/bilingual-cultural-learning
```

Never overwrite an existing working tree or discard uncommitted changes. Report any local differences before modifying files.

---

## 5. Tech stack and commands

### Stack

- React 18
- Vite 5
- JavaScript / JSX
- `lucide-react`
- Tailwind utilities loaded from the CDN in `index.html`
- Mukta font for Nepali / Devanagari
- Baloo 2 for friendly English display text
- Static Vercel deployment
- Browser `localStorage` for the personal profile

### Package scripts

From `package.json`:

```powershell
npm install
npm run dev
npm run build
npm run preview
```

There is currently no dedicated unit-test or lint script in `package.json`. Do not claim tests passed unless you add and run them. The authoritative current integration check is `npm run build` plus browser acceptance.

### Recommended local verification

```powershell
npm install
npm run build
npm run dev
```

Then test at the Vite local URL on both a narrow mobile viewport and a tablet/desktop viewport.

---

## 6. Current repository structure

```text
sanumaya-katha-ghar/
├─ ANTIGRAVITY_HANDOFF.md              # This source-of-truth handoff
├─ README.md                            # Currently minimal
├─ index.html                           # Metadata, fonts, Tailwind CDN, root element
├─ package.json                         # Vite/React commands and dependencies
├─ vite.config.js
├─ tailwind.config.js
├─ public/
│  └─ images/
│     ├─ family.jpg                     # Existing real family image
│     ├─ rose.jpg                       # Existing flower/story image
│     ├─ holi.jpg                       # Existing Holi/Sanumaya image
│     ├─ bench.jpg                      # Existing Sanumaya image
│     ├─ traditional.jpg                # Existing traditional clothing/culture image
│     └─ stories/
│        └─ wise-day/
│           ├─ page-01.svg
│           ├─ page-02.svg
│           ├─ page-03.svg
│           ├─ page-04.svg
│           ├─ page-05.svg
│           ├─ page-06.svg
│           ├─ page-07.svg
│           ├─ page-08.svg
│           ├─ page-09.svg
│           └─ page-10.svg
└─ src/
   ├─ main.jsx                          # React entry point
   ├─ App.jsx                           # App state and top-level section routing
   ├─ content.js                        # All letters, words, images, stories, culture, family, defaults
   ├─ ui.jsx                            # Shared SafeImage, Arrow, AudioBadge, swipe, themes, personalise
   ├─ index.css                         # Global typography, animation and accessibility styles
   └─ sections/
      ├─ LearnSection.jsx               # Vowels/consonants/A–Z large learning cards
      ├─ GamesSection.jsx               # Three local toddler games
      ├─ StoriesSection.jsx             # Local story selection and flashcard story reader
      ├─ PersonalSection.jsx            # Profile fields and family reveal cards
      └─ CultureSection.jsx             # Nepali culture cards
```

### Current PR changed files

The current draft PR modifies exactly these functional files/assets before this handoff document:

```text
index.html
public/images/stories/wise-day/page-01.svg
public/images/stories/wise-day/page-02.svg
public/images/stories/wise-day/page-03.svg
public/images/stories/wise-day/page-04.svg
public/images/stories/wise-day/page-05.svg
public/images/stories/wise-day/page-06.svg
public/images/stories/wise-day/page-07.svg
public/images/stories/wise-day/page-08.svg
public/images/stories/wise-day/page-09.svg
public/images/stories/wise-day/page-10.svg
src/App.jsx
src/content.js
src/index.css
src/sections/CultureSection.jsx
src/sections/GamesSection.jsx
src/sections/LearnSection.jsx
src/sections/PersonalSection.jsx
src/sections/StoriesSection.jsx
src/ui.jsx
```

---

## 7. Which file to edit for each task

### Change a letter, word, translation, picture, story sentence, culture item, family member, or default profile

Edit:

```text
src/content.js
```

This is the main content source of truth. Do not hardcode parallel datasets inside section components.

### Change overall navigation, global language state, selected card/story/game state, localStorage behaviour, or section orchestration

Edit:

```text
src/App.jsx
```

`App.jsx` should remain orchestration-focused. Avoid moving large presentation blocks back into it.

### Change the large alphabet card layout

Edit:

```text
src/sections/LearnSection.jsx
```

### Change games or add a new local game

Edit:

```text
src/sections/GamesSection.jsx
```

Add shared game data to `src/content.js` if the data is reused or substantial.

### Change story selection, flashcard story reader, progress dots, arrows, restart logic, or story page layout

Edit:

```text
src/sections/StoriesSection.jsx
```

Story data and page image paths remain in `src/content.js`.

### Change personalisation fields or family reveal cards

Edit:

```text
src/sections/PersonalSection.jsx
```

Profile save/reset state remains in `src/App.jsx`; default values remain in `src/content.js`.

### Change cultural learning cards

Edit:

```text
src/sections/CultureSection.jsx
```

Culture data remains in `src/content.js`.

### Change image fallback, arrows, swipe handling, shared themes, disabled audio badge, or story placeholder substitution

Edit:

```text
src/ui.jsx
```

### Change fonts, global body styling, motion, or accessibility behaviour

Edit:

```text
src/index.css
index.html
```

### Add a new story illustration

Add a local file under a clear story folder, for example:

```text
public/images/stories/<story-id>/page-01.webp
```

Then reference it from the relevant story in `src/content.js`.

Prefer WebP/AVIF/optimised PNG for raster story art. SVG is acceptable for the current lightweight illustrations. Keep filenames stable and descriptive.

---

## 8. Current user-facing navigation

The fixed bottom navigation has five tabs:

1. **सिकौँ / Learn**
2. **खेल / Games**
3. **कथा / Stories**
4. **सानुमाया / Sanumaya**
5. **संस्कार / Culture**

There is also a persistent top language switch:

- 🇳🇵 नेपाली
- 🇬🇧 English

The English alphabet phrase must stay in the format:

```text
A for Apple
B for Ball
C for Cat
```

Do not change it to “A, A, Apple.”

---

## 9. Current feature status

### 9.1 Learn

Current datasets:

- 13 Nepali vowel cards
- 36 Nepali consonant cards
- English A–Z

Nepali consonants have group shortcuts:

- क-वर्ग
- च-वर्ग
- ट-वर्ग
- त-वर्ग
- प-वर्ग
- अन्य
- संयुक्त

The large card includes:

- one very large letter;
- one large visual;
- phrase such as `क बाट कलम`;
- progress count;
- large left/right arrows;
- swipe navigation;
- thumbnail strip.

### 9.2 Games

All games are internal. No external game links remain.

Current game modes:

1. Choose the correct picture.
2. Choose the correct letter.
3. Count one to three flowers.

Feedback is gentle. Correct choices show encouragement; incorrect choices invite another attempt.

### 9.3 Stories

Current local storybooks in `src/content.js`:

1. `wise-day` — **ज्ञानी सानुमायाको दिन** — 10 picture pages
2. `red-flower` — **सानुमाया र रातो फूल** — 5 picture pages
3. `nepal` — **सानुमायाको नेपाल यात्रा** — 5 picture pages

The flagship story reader is flashcard-style:

- story choice cards;
- one large scene per page;
- separate clear text card below the image;
- sound-effect phrase shown as text only;
- Nepali/English switch;
- swipe;
- large previous/next arrows;
- page dots;
- restart at the end;
- profile placeholders such as `{name}` and `{nickname}`.

### 9.4 Sanumaya personalisation

The personal profile supports:

- Nepali name
- English name
- nickname
- favourite animal
- favourite colour
- home place

It is saved in browser `localStorage` under:

```text
sanumaya-profile
```

Current default values:

```text
name: सानुमाया
englishName: Sanumaya
nickname: सानु
favouriteAnimal: खरायो
favouriteColor: गुलाबी
homePlace: Sydney
```

Not every field is currently used by every story. Name and nickname are the most actively substituted values. Future stories should use animal, colour, and home place more meaningfully.

### 9.5 Family

Current family entries:

- आमा, बुवा र सानुमाया — real `family.jpg`
- हजुरबा — fallback avatar
- हजुरआमा — fallback avatar
- मामा — fallback avatar
- माइजु — fallback avatar

Family cards are tap-to-reveal. Replace fallbacks only when Naresh supplies the correct family photos. Do not use stock strangers.

### 9.6 Culture

Current cards:

- नमस्ते
- गणेश भगवान
- शिव भगवान
- पूजा
- टीका
- मादल
- दियो
- मन्दिर
- दशैं
- तिहार

These are introductory toddler cards, not theological lessons. Keep the presentation gentle, respectful, simple, and visually calm.

### 9.7 Audio

Audio is intentionally **disabled for now**.

Current UI shows a placeholder such as:

```text
आवाज पछि थपिनेछ
Audio coming soon
```

Do not re-enable browser Speech Synthesis, automatic narration, or sound playback unless Naresh explicitly approves it.

The long-term plan is to use real family-recorded MP3 clips where appropriate.

---

## 10. “ज्ञानी सानुमायाको दिन” source and implementation history

Two reference files were uploaded in the prior ChatGPT session but are **not committed to the Git repository**:

```text
storybook_app.html
ज्ञानी सानुमायाको दिन.pdf
```

There was also a reference alphabet prototype:

```text
nepali_alphabet_flashcards_hamro_barnamala.html
```

Antigravity will not find these chat uploads in the local repository. Ask Naresh to provide them again only if the original files are required.

### HTML reference behaviour

The HTML reference defined a 9-page toddler story with:

- one large illustration area;
- one large Nepali sentence;
- a sound-effect line;
- page count;
- dots;
- previous/next controls;
- automatic Speech Synthesis.

The app adopted the flashcard layout principles but deliberately did **not** retain automatic audio.

### PDF reference content

The PDF contained 10 visual spreads including the cover:

1. cover;
2. tooth brushing;
3. greeting the sunny morning;
4. hand washing;
5. meeting a white crane in the garden;
6. eating a red apple;
7. a hexagon-shaped kite;
8. counting flowers;
9. Bir blowing a conch;
10. bedtime under the moon and stars.

The PDF contained visible generation artefacts such as literal filenames (`image_b4e061.jpg`) and English fragments (`Shatkon`, `Shanka`) inside Nepali prose. One page also lacked a usable illustration. Those artefacts were removed from the app copy. A local hexagon-kite visual was added for the missing scene.

### Current story assets

The app uses 10 local SVG recreations under:

```text
public/images/stories/wise-day/
```

These are editable project assets inspired by the supplied story scenes; they are not embedded PDF page bitmaps. Preserve that distinction in reports.

---

## 11. Design direction

### Current approved visual direction

- Light cream background
- Soft lavender
- Baby blue
- Light mint
- Warm peach/amber
- White cards
- Gentle shadows
- Rounded corners
- Large typography
- Minimal clutter

### Avoid

- red/pink-dominant theme;
- small photos;
- adult dashboard appearance;
- charts or analytics in the child interface;
- dense four-column grids as the primary toddler mode;
- tiny search controls;
- automatic audio;
- misleading generic images;
- generated-looking object images where a clear real photo is expected.

### Story direction

Naresh wants stories to feel like premium personalised children's books:

- Sanumaya is the main character;
- many pictures, not just a few repeated photos;
- short toddler-friendly sentences;
- strong page-to-page visual progression;
- consistent character appearance;
- Nepali and English versions;
- clear flashcard/page-turning experience.

The desired future standard is approximately 10–20 visual pages per important story, but quality and character consistency are more important than padding the page count.

---

## 12. Known gaps and risks

### A. Repository privacy is not the same as private use

Vercel metadata currently reports the GitHub repository as **public**. `index.html` contains:

```html
<meta name="robots" content="noindex, nofollow, noarchive" />
```

This discourages indexing but is not access control. The preview is Vercel-protected, but a proper long-term private-access decision remains open.

Do not silently change repository visibility, authentication, or domains. Present a privacy plan to Naresh first.

### B. Many learning visuals are still externally hotlinked

`src/content.js` currently uses Unsplash and Wikimedia URL helpers for many vocabulary pictures. Hamro Barnamala links are removed, but these third-party image dependencies remain.

Risks:

- URLs can change or fail;
- an image may not exactly match the word;
- licensing/credit requirements may be unclear;
- offline use is not possible;
- loading performance can vary.

Recommended direction: review every card and move approved, correctly licensed, optimised real images into local folders such as:

```text
public/images/alphabet/ne/
public/images/alphabet/en/
public/images/culture/
```

Do not bulk-download or redistribute assets without confirming licences.

### C. Some word–picture pairs require manual educational review

Pay special attention to uncommon letters/words and generic image matches, especially:

- ङ — मसगेडी
- ञ — गोरुसिंगे
- ठ — ठडेउरो
- ण — तिनधर्के
- क्ष — क्षत्री
- ज्ञ — currently “ज्ञानी” in the private app

Do not invent a visual solely to fill the slot. It is acceptable to use a clearly labelled special-letter treatment until a culturally and linguistically correct object is confirmed.

### D. Culture images are placeholders

Ganesh, Shiva, puja, tika, Dashain, and some other cards reuse general/traditional imagery. They need dedicated respectful visuals.

### E. Story consistency is incomplete

The 10 Wise Day SVGs are coherent enough for a prototype, but they are not yet a fully consistent high-end character system based on Sanumaya's real appearance.

For future AI story generation, obtain 3–5 clear reference photos from Naresh and create a character guide before generating a full book.

### F. No automated test suite

There is no test/lint script. Browser interaction regressions are possible. Add tests only as a focused follow-up; do not pause all visual work for a large testing-framework migration unless approved.

### G. Tailwind setup is mixed

The project has Tailwind in `devDependencies`, but `index.html` currently loads the Tailwind CDN. This works in the current Vercel build but is not the ideal long-term production setup.

Do not perform a broad Tailwind migration during an unrelated bug fix. Propose it as a contained technical cleanup.

---

## 13. Immediate next task for Antigravity

### Task name

**Private Storybook and Visual Acceptance Pass**

### Objective

Confirm the current feature branch works end-to-end, then improve only the defects found. Do not redesign the entire project before acceptance.

### Required sequence

1. Confirm repository root, remote, branch, and clean/dirty state.
2. Pull the latest `agent/bilingual-cultural-learning` branch without overwriting local work.
3. Run `npm install` and `npm run build`.
4. Start the app locally.
5. Test all five tabs on mobile and tablet widths.
6. Verify no Hamro Barnamala links, imports, copy, or external buttons remain.
7. Verify all 10 Wise Day story pages load.
8. Verify story arrows, swipe, dots, thumbnail/page selection, end restart, and language switch.
9. Verify profile save/reset persists correctly through refresh.
10. Verify all games work without leaving the app.
11. Verify audio never plays and remains a placeholder.
12. Record every broken/mismatched visual before replacing it.
13. Make focused fixes on the same feature branch.
14. Run the build again and confirm the Vercel preview.
15. Report changed files, checks, blockers, and next recommendation.

### Do not do during this first pass

- Do not merge PR #1.
- Do not edit `main`.
- Do not modify the separate Hamro Barnamala repository or website.
- Do not add external Hamro links back.
- Do not enable audio.
- Do not replace family placeholders with strangers.
- Do not create a backend or database without a scoped proposal.
- Do not make the app publicly discoverable.
- Do not claim the project is secured merely because `noindex` is present.

---

## 14. Browser acceptance checklist

### Header and language

- [ ] Header is readable on 320–390 px mobile width.
- [ ] Nepali/English switch changes visible copy.
- [ ] No overlapping sticky header content.

### Learn

- [ ] Vowels and consonants are separate.
- [ ] Consonant group shortcuts jump to the correct index.
- [ ] Left/right arrow buttons work reliably.
- [ ] Swipe works without blocking vertical page scrolling.
- [ ] Letter and visual are large enough for a toddler.
- [ ] English reads “A for Apple.”
- [ ] Every image has a useful fallback.

### Games

- [ ] Picture game accepts the correct card.
- [ ] Letter game accepts the correct letter.
- [ ] Counting game cycles through 1–3.
- [ ] Wrong selection is gentle and does not trap the UI.
- [ ] No game opens another website.

### Stories

- [ ] All three local books appear.
- [ ] Wise Day has 10 pages.
- [ ] Each page shows a large visual and separate large text.
- [ ] Nepali text contains no source filename artefacts.
- [ ] English text is readable and concise.
- [ ] Previous is disabled on page 1.
- [ ] Next/restart works at the final page.
- [ ] Swipe, arrows, and dots agree on the current page.
- [ ] Switching story resets to page 1.

### Personalisation

- [ ] Name fields save to `sanumaya-profile`.
- [ ] Story title and text update with the profile.
- [ ] Reset restores defaults.
- [ ] Refresh preserves saved values.
- [ ] Family reveal works.
- [ ] No stock strangers appear.

### Culture

- [ ] All 10 cards are reachable.
- [ ] Previous/next and swipe work.
- [ ] Religious depictions remain respectful and calm.
- [ ] Text is appropriate for a toddler.

### Privacy and independence

- [ ] `git grep` finds no Hamro Barnamala domain/reference.
- [ ] No `<a>` or click action leaves for that website.
- [ ] `noindex` metadata remains.
- [ ] Report the public-repository privacy gap rather than hiding it.

---

## 15. Verification commands

Run from the repository root:

```powershell
git status --short --branch
git branch --show-current
git rev-parse HEAD
git remote -v
npm install
npm run build
```

Check forbidden references:

```powershell
git grep -n -i -E "hamrobarnamala|HB_BASE|hbImage|storyCover"
```

Expected result: no matches in active app code or docs other than this handoff's explanation of the prohibition. Because this document necessarily names the forbidden domain, a repository-wide grep will match this file. Therefore also run the code-only check:

```powershell
git grep -n -i -E "hamrobarnamala|HB_BASE|hbImage|storyCover" -- src public index.html package.json
```

Expected code-only result: no matches.

Check all local story paths:

```powershell
Get-ChildItem public/images/stories/wise-day
```

Expected: `page-01.svg` through `page-10.svg`.

Optional development server:

```powershell
npm run dev
```

After changes:

```powershell
git diff --check
npm run build
git status --short
```

---

## 16. Reporting format expected from Antigravity

Use this structure after each scoped work pass:

```markdown
## Completed
- ...

## Changed files
- `path/file` — exact reason

## Checks run
- command — pass/fail
- browser scenario — pass/fail
- Vercel deployment — state and ID

## Blockers / risks
- ...

## Main branch / production impact
- Explicitly state whether either changed

## Next recommended step
- One focused next step
```

Never report “fully complete” without listing the actual browser scenarios and build result.

---

## 17. Recommended roadmap after acceptance

### Phase A — Visual accuracy and local asset ownership

- Audit all 75 alphabet cards (13 Nepali vowels + 36 consonants + 26 English).
- Replace inaccurate/generic images.
- Confirm licensing.
- Store approved images locally.
- Create dedicated culture images.

### Phase B — Premium Sanumaya character system

- Obtain approved reference photos.
- Define face, hair, skin tone, age, clothing, and illustration style.
- Generate one test scene.
- Get Naresh's approval before creating a full book.

### Phase C — More visual stories

Priority books:

1. ज्ञानी सानुमायाको दिन — refine to premium quality
2. सानुमाया र रातो फूल — expand from 5 to approximately 10–12 unique scenes
3. सानुमायाको नेपाल यात्रा — expand with Himalayas, family, village/home, Namaste, madal, flag, temple, and flowers
4. सानुमायाको दशैंको टीका
5. तिहारको उज्यालो दियो
6. सानुमाया मादल बजाउँछिन्

### Phase D — Real family content

- Add correct photos for Hajurba, Hajurama, Mama, and Maiju.
- Add short family-recorded MP3 greetings.
- Keep recordings optional and parent-controlled.

### Phase E — Privacy and installability

- Decide whether the repository should be private.
- Decide on Vercel protection or app authentication.
- Consider PWA/offline caching after local assets are ready.
- Do not expose family photos through an unprotected public deployment.

---

## 18. Final source-of-truth summary

At the time of handoff:

- The app is a React/Vite toddler learning prototype on `agent/bilingual-cultural-learning`.
- PR #1 is draft and unmerged.
- The feature preview builds successfully on Vercel.
- All direct Hamro Barnamala application links and hotlinks were removed from active app code.
- Learn, Games, Stories, Sanumaya, and Culture are separate internal sections.
- Audio is disabled.
- The primary local book is a 10-page flashcard story, “ज्ञानी सानुमायाको दिन.”
- The next job is acceptance and visual accuracy, not a broad rewrite.
- Main and production must remain unchanged until Naresh approves promotion.
