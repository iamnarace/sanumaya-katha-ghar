const unsplash = (id) => `https://images.unsplash.com/${id}?q=82&w=1000&auto=format&fit=crop`;
const commons = (file, width = 1000) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

const makeCards = (rows) => rows.map(([letter, word, translation, fallback, image]) => ({
  letter,
  word,
  translation,
  fallback,
  image,
}));

export const vowels = makeCards([
  ['अ', 'अनार', 'Pomegranate', '🍎', '/images/alphabet/ne/vowel_a.jpg'],
  ['आ', 'आमा', 'Mother', '👩‍👧', '/images/alphabet/ne/vowel_aa.jpg'],
  ['इ', 'इन्द्रेणी', 'Rainbow', '🌈', '/images/alphabet/ne/vowel_i.jpg'],
  ['ई', 'ईश्वर', 'God', '🙏', '/images/alphabet/ne/vowel_ii.jpg'],
  ['उ', 'उल्लु', 'Owl', '🦉', '/images/alphabet/ne/vowel_u.jpg'],
  ['ऊ', 'ऊन', 'Wool', '🧶', '/images/alphabet/ne/vowel_uu.jpg'],
  ['ऋ', 'ऋषि', 'Sage', '🧘', '/images/alphabet/ne/vowel_ri.jpg'],
  ['ए', 'एक', 'One', '1️⃣', '/images/alphabet/ne/vowel_e.jpg'],
  ['ऐ', 'ऐना', 'Mirror', '🪞', '/images/alphabet/ne/vowel_ai.jpg'],
  ['ओ', 'ओखर', 'Walnut', '🌰', '/images/alphabet/ne/vowel_o.jpg'],
  ['औ', 'औँठी', 'Ring', '💍', '/images/alphabet/ne/vowel_au.jpg'],
  ['अं', 'अंगुर', 'Grapes', '🍇', '/images/alphabet/ne/vowel_am.jpg'],
  ['अः', 'अः!', 'A surprised sound', '😮', '/images/alphabet/ne/vowel_ah.jpg'],
]);

export const consonants = makeCards([
  ['क', 'कलम', 'Pen', '🖊️', '/images/alphabet/ne/ka.jpg'],
  ['ख', 'खरायो', 'Rabbit', '🐰', '/images/alphabet/ne/kha.jpg'],
  ['ग', 'गमला', 'Flowerpot', '🪴', '/images/alphabet/ne/ga.jpg'],
  ['घ', 'घर', 'House', '🏠', '/images/alphabet/ne/gha.jpg'],
  ['ङ', 'नङ', 'Fingernail', '💅', '/images/alphabet/ne/consonant_nga.jpg'],
  ['च', 'चरा', 'Bird', '🐦', '/images/alphabet/ne/consonant_cha.jpg'],
  ['छ', 'छाता', 'Umbrella', '☂️', '/images/alphabet/ne/consonant_chha.jpg'],
  ['ज', 'जरायो', 'Deer', '🦌', '/images/alphabet/ne/consonant_ja.jpg'],
  ['झ', 'झन्डा', 'Flag', '🇳🇵', '/images/alphabet/ne/consonant_jha.jpg'],
  ['ञ', 'गोरुसिंगे', 'Traditional horn', '🎺', '/images/alphabet/ne/consonant_nya.jpg'],
  ['ट', 'टपरी', 'Leaf plate', '🍃', '/images/alphabet/ne/consonant_ta.jpg'],
  ['ठ', 'ठेकी', 'Wooden vessel', '🏺', '/images/alphabet/ne/consonant_tha.jpg'],
  ['ड', 'डमरु', 'Small drum', '🥁', '/images/alphabet/ne/consonant_da.jpg'],
  ['ढ', 'ढकी', 'Basket', '🧺', '/images/alphabet/ne/consonant_dha.jpg'],
  ['ण', 'बाण', 'Arrow', '🏹', '/images/alphabet/ne/consonant_na.jpg'],
  ['त', 'तराजु', 'Scale', '⚖️', '/images/alphabet/ne/consonant_ta2.jpg'],
  ['थ', 'थपडी', 'Clapping', '👏', '/images/alphabet/ne/consonant_tha2.jpg'],
  ['द', 'दमकल', 'Firetruck', '🚒', '/images/alphabet/ne/consonant_da2.jpg'],
  ['ध', 'धनुष', 'Bow', '🏹', '/images/alphabet/ne/consonant_dha2.jpg'],
  ['न', 'नरिवल', 'Coconut', '🥥', '/images/alphabet/ne/consonant_na2.jpg'],
  ['प', 'परेवा', 'Pigeon', '🕊️', '/images/alphabet/ne/consonant_pa.jpg'],
  ['फ', 'फलफूल', 'Fruits', '🍎', '/images/alphabet/ne/consonant_pha.jpg'],
  ['ब', 'बस', 'Bus', '🚌', '/images/alphabet/ne/consonant_ba.jpg'],
  ['भ', 'भकुण्डो', 'Ball', '⚽', '/images/alphabet/ne/consonant_bha.jpg'],
  ['म', 'मकै', 'Corn', '🌽', '/images/alphabet/ne/consonant_ma.jpg'],
  ['य', 'यज्ञ', 'Holy fire', '🔥', '/images/alphabet/ne/consonant_ya.jpg'],
  ['र', 'रथ', 'Chariot', '🛺', '/images/alphabet/ne/consonant_ra.jpg'],
  ['ल', 'लसुन', 'Garlic', '🧄', '/images/alphabet/ne/consonant_la.jpg'],
  ['व', 'वकिल', 'Lawyer', '⚖️', '/images/alphabet/ne/consonant_wa.jpg'],
  ['श', 'शंख', 'Conch', '🐚', '/images/alphabet/ne/consonant_sha.jpg'],
  ['ष', 'षट्कोण', 'Hexagon', '⬡', '/images/alphabet/ne/consonant_sha2.jpg'],
  ['स', 'सर्प', 'Snake', '🐍', '/images/alphabet/ne/consonant_sa.jpg'],
  ['ह', 'हरिण', 'Deer', '🦌', '/images/alphabet/ne/consonant_ha.jpg'],
  ['क्ष', 'क्षत्री', 'Warrior', '🛡️', '/images/alphabet/ne/consonant_ksha.jpg'],
  ['त्र', 'त्रिशुल', 'Trident', '🔱', '/images/alphabet/ne/consonant_tra.jpg'],
  ['ज्ञ', 'ज्ञानी', 'Wise', '📚', '/images/alphabet/ne/consonant_gya.jpg'],
]);

const englishRows = [
  ['A', 'Apple', '🍎', '/images/alphabet/en/A.jpg'],
  ['B', 'Ball', '⚽', '/images/alphabet/en/B.jpg'],
  ['C', 'Cat', '🐱', '/images/alphabet/en/C.jpg'],
  ['D', 'Dog', '🐶', '/images/alphabet/en/D.jpg'],
  ['E', 'Elephant', '🐘', '/images/alphabet/en/E.jpg'],
  ['F', 'Flower', '🌸', '/images/alphabet/en/F.jpg'],
  ['G', 'Garden', '🌻', '/images/alphabet/en/G.jpg'],
  ['H', 'House', '🏠', '/images/alphabet/en/H.jpg'],
  ['I', 'Ice cream', '🍦', '/images/alphabet/en/I.jpg'],
  ['J', 'Juice', '🧃', '/images/alphabet/en/J.jpg'],
  ['K', 'Kite', '🪁', '/images/alphabet/en/K.jpg'],
  ['L', 'Lotus', '🪷', '/images/alphabet/en/L.jpg'],
  ['M', 'Moon', '🌙', '/images/alphabet/en/M.jpg'],
  ['N', 'Nest', '🪺', '/images/alphabet/en/N.jpg'],
  ['O', 'Orange', '🍊', '/images/alphabet/en/O.jpg'],
  ['P', 'Parrot', '🦜', '/images/alphabet/en/P.jpg'],
  ['Q', 'Queen', '👑', '/images/alphabet/en/Q.jpg'],
  ['R', 'Rabbit', '🐰', '/images/alphabet/en/R.jpg'],
  ['S', 'Star', '⭐', '/images/alphabet/en/S.jpg'],
  ['T', 'Tiger', '🐯', '/images/alphabet/en/T.jpg'],
  ['U', 'Umbrella', '☂️', '/images/alphabet/en/U.jpg'],
  ['V', 'Van', '🚐', '/images/alphabet/en/V.jpg'],
  ['W', 'Water', '💧', '/images/alphabet/en/W.jpg'],
  ['X', 'Xylophone', '🎼', '/images/alphabet/en/X.jpg'],
  ['Y', 'Yak', '🐂', '/images/alphabet/en/Y.jpg'],
  ['Z', 'Zebra', '🦓', '/images/alphabet/en/Z.jpg'],
];

export const english = englishRows.map(([letter, word, fallback, image]) => ({
  letter,
  word,
  translation: '',
  fallback,
  image,
}));


export const storybooks = [

  {
    id: 'busy-morning',
    titleNe: '{name}को बिहान',
    titleEn: "{name}'s Busy Morning",
    cover: '/images/stories/sanumaya/story_1_page_1.jpg',
    fallback: '☀️',
    pages: [
      ['/images/stories/sanumaya/story_1_page_1.jpg', 'बिहान भयो! {name} उठिन्।', 'It is morning! {name} wakes up.'],
      ['/images/stories/sanumaya/story_1_page_2.jpg', '{name}ले दाँत माझिन्। चिलिप-चिलिप!', '{name} brushed her teeth. Brush, brush!'],
      ['/images/stories/sanumaya/story_1_page_3.jpg', 'उनले पानीले मुख धोइन्। छ्याप-छ्याप!', 'She washed her face with water. Splash, splash!'],
      ['/images/stories/sanumaya/story_1_page_4.jpg', '{name}ले बोतलबाट पानी पिइन्।', '{name} drank water from her bottle.'],
      ['/images/stories/sanumaya/story_1_page_5.jpg', 'उनले सफा लुगा लगाइन्।', 'She put on clean clothes.'],
      ['/images/stories/sanumaya/story_1_page_6.jpg', 'कपाल कोरेर चिटिक्क परिन्।', 'She combed her hair and looked neat.'],
      ['/images/stories/sanumaya/story_1_page_7.jpg', 'खुट्टामा जुत्ता लगाइन्।', 'She put shoes on her feet.'],
      ['/images/stories/sanumaya/story_1_page_8.jpg', 'परिवारलाई नमस्ते गरिन्। ज्ञानी {nickname}!', 'She said Namaste to her family. Good girl, {nickname}!'],
    ],
  },
  {
    id: 'body-parts',
    titleNe: 'यो म हुँ, {name}!',
    titleEn: 'This is Me, {name}!',
    cover: '/images/stories/sanumaya/story_2_page_1.jpg',
    fallback: '👤',
    pages: [
      ['/images/stories/sanumaya/story_2_page_1.jpg', '{name}ले ऐनामा हेरिन्। को हो त्यो?', '{name} looked in the mirror. Who is that?'],
      ['/images/stories/sanumaya/story_2_page_2.jpg', 'यी मेरा आँखा हुन्। म पुतली हेर्छु!', 'These are my eyes. I look at the butterfly!'],
      ['/images/stories/sanumaya/story_2_page_3.jpg', 'यो मेरो नाक हो। म फूल सुँघ्छु!', 'This is my nose. I smell the flower!'],
      ['/images/stories/sanumaya/story_2_page_4.jpg', 'यी मेरा कान हुन्। म चराको गीत सुन्छु!', "These are my ears. I hear the bird's song!"],
      ['/images/stories/sanumaya/story_2_page_5.jpg', 'यो मेरो मुख हो। म हाँस्छु— हा हा!', 'This is my mouth. I laugh—ha ha!'],
      ['/images/stories/sanumaya/story_2_page_6.jpg', 'यी मेरा हात हुन्। म ताली बजाउँछु!', 'These are my hands. I clap!'],
      ['/images/stories/sanumaya/story_2_page_7.jpg', 'यी मेरा खुट्टा हुन्। म उफ्रिन्छु!', 'These are my feet. I jump!'],
      ['/images/stories/sanumaya/story_2_page_8.jpg', 'टाउकोदेखि खुट्टासम्म, म {name} हुँ!', 'From head to toe, I am {name}!'],
    ],
  },
  {
    id: 'yummy-food',
    titleNe: 'मीठो खाना र पानी',
    titleEn: 'Yummy Food and Water',
    cover: '/images/stories/sanumaya/story_3_page_4.jpg',
    fallback: '🥣',
    pages: [
      ['/images/stories/sanumaya/story_3_page_1.jpg', '{name}लाई भोक लाग्यो।', '{name} felt hungry.'],
      ['/images/stories/sanumaya/story_3_page_2.jpg', 'खाना खानु अघि साबुनपानीले हात धोइन्।', 'She washed her hands with soap and water before eating.'],
      ['/images/stories/sanumaya/story_3_page_3.jpg', '{name} टेबलमा ज्ञानी भएर बसिन्।', '{name} sat nicely at the table.'],
      ['/images/stories/sanumaya/story_3_page_4.jpg', 'उनले चम्चाले मीठो खाना खाइन्।', 'She ate yummy food with her spoon.'],
      ['/images/stories/sanumaya/story_3_page_5.jpg', 'स्याउ पनि खाइन्। कुरुम-कुरुम!', 'She ate an apple too. Crunch, crunch!'],
      ['/images/stories/sanumaya/story_3_page_6.jpg', '{name}ले आफ्नो बोतलबाट पानी पिइन्।', '{name} drank water from her bottle.'],
      ['/images/stories/sanumaya/story_3_page_7.jpg', 'मुख सफा गरिन्।', 'She wiped her mouth clean.'],
      ['/images/stories/sanumaya/story_3_page_8.jpg', '{nickname}ले भनिन्— खानाको लागि धन्यवाद!', '{nickname} said—Thank you for the food!'],
    ],
  },

  {
    id: 'sharing',
    titleNe: 'मिलेर खेलौँ, {name}!',
    titleEn: "Let's Share, {name}!",
    cover: '/images/stories/sharing/page-06.jpg',
    fallback: '🧸',
    pages: [
      ['/images/stories/sharing/page-01.jpg', '{name}सँग धेरै खेलौना छन्।', '{name} has many toys.'],
      ['/images/stories/sharing/page-02.jpg', 'उनको साथी खेल्न आयो।', 'Her friend came to play.'],
      ['/images/stories/sharing/page-03.jpg', 'साथीले टेडी माग्यो।', 'The friend asked for the bear.'],
      ['/images/stories/sharing/page-04.jpg', '{name}ले टेडी दिइन्।', '{name} gave the bear.'],
      ['/images/stories/sharing/page-05.jpg', 'साथीले भन्यो— धन्यवाद!', 'The friend said—Thank you!'],
      ['/images/stories/sharing/page-06.jpg', 'उनीहरू मिलेर ब्लक बनाए।', 'They built blocks together.'],
      ['/images/stories/sharing/page-07.jpg', 'सँगै खेल्दा झन् रमाइलो हुन्छ!', 'Playing together is more fun!'],
      ['/images/stories/sharing/page-08.jpg', 'ज्ञानी {nickname}!', 'Good girl, {nickname}!'],
    ],
  },
  {
    id: 'hide-and-seek',
    titleNe: 'खरायोको लुकामारी',
    titleEn: 'Hide and Seek with Kharaayo',
    cover: '/images/stories/hide-and-seek/page-07.jpg',
    fallback: '🐰',
    pages: [
      ['/images/stories/hide-and-seek/page-01.jpg', '{name}को प्यारो खरायो हरायो!', "{name}'s favorite rabbit is lost!"],
      ['/images/stories/hide-and-seek/page-02.jpg', 'के उ ओछ्यान मुनि छ?', 'Is he under the bed?'],
      ['/images/stories/hide-and-seek/page-03.jpg', 'अहँ, छैन।', 'No, he is not.'],
      ['/images/stories/hide-and-seek/page-04.jpg', 'के उ ढोका पछाडि छ?', 'Is he behind the door?'],
      ['/images/stories/hide-and-seek/page-05.jpg', 'अहँ, त्यहाँ पनि छैन।', 'No, not there either.'],
      ['/images/stories/hide-and-seek/page-06.jpg', 'उहाँ हेर! टोकरी भित्र!', 'Look there! Inside the basket!'],
      ['/images/stories/hide-and-seek/page-07.jpg', 'खरायो सुतिरहेको छ।', 'The rabbit is sleeping.'],
      ['/images/stories/hide-and-seek/page-08.jpg', '{name}ले खरायोलाई बिस्तारै समातिन्।', '{name} held the rabbit gently.'],
    ],
  },
];

export const family = [
  ['आमा, बुवा र सानुमाया', 'Mum, Dad and Sanumaya', '/images/family.jpg', '👨‍👩‍👧'],
  ['हजुरबा', 'Grandfather', '', '👴'],
  ['हजुरआमा', 'Grandmother', '', '👵'],
  ['मामा', 'Maternal uncle', '', '🧔'],
  ['माइजु', 'Aunt', '', '👩'],
].map(([ne, en, image, fallback], id) => ({ id, ne, en, image, fallback }));

export const defaultProfile = {
  name: 'सानुमाया',
  englishName: 'Sanumaya',
  nickname: 'सानु',
  favouriteAnimal: 'खरायो',
  favouriteColor: 'गुलाबी',
  homePlace: 'Sydney',
};


export const vocabularyCategories = [
  { id: 'animals', nameNe: 'जनावर', nameEn: 'Animals', icon: '🐘', color: '#E94F6B', tint: '#FFE8EC' },
  { id: 'food', nameNe: 'खाना र फलफूल', nameEn: 'Food & Fruit', icon: '🍎', color: '#E08A00', tint: '#FFF1D6' },
  { id: 'vegetables', nameNe: 'तरकारी', nameEn: 'Vegetables', icon: '🥕', color: '#2FA36B', tint: '#E1F7EA' },
  { id: 'nature', nameNe: 'प्रकृति', nameEn: 'Nature', icon: '🌳', color: '#1E9E8F', tint: '#DDF5F1' },
  { id: 'clothes', nameNe: 'लुगा', nameEn: 'Clothes', icon: '👕', color: '#3F8FE0', tint: '#E2EFFD' },
  { id: 'vehicles', nameNe: 'सवारी', nameEn: 'Vehicles', icon: '🚌', color: '#E2662F', tint: '#FFE9DE' },
  { id: 'home', nameNe: 'मेरो घर', nameEn: 'My Home', icon: '🏠', color: '#7A5CE0', tint: '#EEE8FF' },
  { id: 'kitchen', nameNe: 'भान्सा', nameEn: 'Kitchen', icon: '🥣', color: '#D9488F', tint: '#FDE6F1' },
  { id: 'actions', nameNe: 'के गर्दै?', nameEn: 'Actions', icon: '🏃', color: '#2C93B8', tint: '#DFF3FA' },
  { id: 'body', nameNe: 'शरीर (फोटो)', nameEn: 'Body photos', icon: '👀', color: '#B4572E', tint: '#F9E8DF' },
  { id: 'culture', nameNe: 'संस्कार', nameEn: 'Culture', icon: '🪔', color: '#C2410C', tint: '#FFEDD5' },
];

export const vocabulary = [
  // Animals
  { id: 'v1', category: 'animals', ne: 'गाई', en: 'Cow', image: '/images/vocab/Cow.jpeg', fallback: '🐄' },
  { id: 'v2', category: 'animals', ne: 'कुकुर', en: 'Dog', image: '/images/vocab/Dog.jpeg', fallback: '🐕' },
  { id: 'v3', category: 'animals', ne: 'बिरालो', en: 'Cat', image: '/images/vocab/Cat.jpeg', fallback: '🐈' },
  { id: 'v4', category: 'animals', ne: 'हात्ती', en: 'Elephant', image: '/images/vocab/Elephant.jpeg', fallback: '🐘' },
  { id: 'v5', category: 'animals', ne: 'बाघ', en: 'Tiger', image: '/images/vocab/Tiger.jpeg', fallback: '🐅' },
  { id: 'v6', category: 'animals', ne: 'चरा', en: 'Bird', image: '/images/vocab/Bird.jpeg', fallback: '🐦' },
  { id: 'v7', category: 'animals', ne: 'माछा', en: 'Fish', image: '/images/vocab/Fish.jpeg', fallback: '🐟' },
  { id: 'v8', category: 'animals', ne: 'बाँदर', en: 'Monkey', image: '/images/vocab/Monkey.jpeg', fallback: '🐒' },
  { id: 'v9', category: 'animals', ne: 'घोडा', en: 'Horse', image: '/images/vocab/Horse.jpeg', fallback: '🐎' },
  { id: 'v10', category: 'animals', ne: 'सुँगुर', en: 'Pig', image: '/images/vocab/Pig.jpeg', fallback: '🐖' },
  // Food
  { id: 'v11', category: 'food', ne: 'स्याउ', en: 'Apple', image: '/images/vocab/Apple.jpeg', fallback: '🍎' },
  { id: 'v12', category: 'food', ne: 'केरा', en: 'Banana', image: '/images/vocab/Banana.jpeg', fallback: '🍌' },
  { id: 'v13', category: 'food', ne: 'आँप', en: 'Mango', image: '/images/vocab/Mango.jpeg', fallback: '🥭' },
  { id: 'v14', category: 'food', ne: 'भात', en: 'Rice', image: '/images/vocab/Rice.jpeg', fallback: '🍚' },
  { id: 'v15', category: 'food', ne: 'दूध', en: 'Milk', image: '/images/vocab/Milk.jpeg', fallback: '🥛' },
  { id: 'v16', category: 'food', ne: 'पानी', en: 'Water', image: '/images/vocab/Water.jpeg', fallback: '💧' },
  { id: 'v17', category: 'food', ne: 'अण्डा', en: 'Egg', image: '/images/vocab/Egg.jpeg', fallback: '🥚' },
  { id: 'v18', category: 'food', ne: 'दाल', en: 'Dal', image: '/images/vocab/Dal.jpeg', fallback: '🍲' },
  { id: 'v19', category: 'food', ne: 'सुन्तला', en: 'Orange', image: '/images/vocab/Orange.jpeg', fallback: '🍊' },
  { id: 'v20', category: 'food', ne: 'गोलभेडा', en: 'Tomato', image: '/images/vocab/Tomato.jpeg', fallback: '🍅' },
  // Body
  { id: 'v21', category: 'body', ne: 'आँखा', en: 'Eyes', image: '/images/vocab/Eyes.jpeg', fallback: '👀' },
  { id: 'v22', category: 'body', ne: 'नाक', en: 'Nose', image: '/images/vocab/Nose.jpeg', fallback: '👃' },
  { id: 'v23', category: 'body', ne: 'मुख', en: 'Mouth', image: '/images/vocab/Mouth.jpeg', fallback: '👄' },
  { id: 'v24', category: 'body', ne: 'कान', en: 'Ear', image: '/images/vocab/Ear.jpeg', fallback: '👂' },
  { id: 'v25', category: 'body', ne: 'हात', en: 'Hands', image: '/images/vocab/Hands.jpeg', fallback: '👐' },
  { id: 'v26', category: 'body', ne: 'खुट्टा', en: 'Legs', image: '/images/vocab/Legs.jpeg', fallback: '🦵' },
  { id: 'v27', category: 'body', ne: 'टाउको', en: 'Head', image: '/images/vocab/Head.jpeg', fallback: '👤' },
  { id: 'v28', category: 'body', ne: 'दाँत', en: 'Teeth', image: '/images/vocab/Teeth.jpeg', fallback: '🦷' },
  { id: 'v29', category: 'body', ne: 'कपाल', en: 'Hair', image: '/images/vocab/Hair.jpeg', fallback: '💇' },
  // Home
  { id: 'v30', category: 'home', ne: 'ओछ्यान', en: 'Bed', image: '/images/vocab/Bed.jpeg', fallback: '🛏️' },
  { id: 'v31', category: 'home', ne: 'कुर्सी', en: 'Chair', image: '/images/vocab/Chair.jpeg', fallback: '🪑' },
  { id: 'v32', category: 'home', ne: 'टेबुल', en: 'Table', image: '/images/vocab/Table.jpeg', fallback: '🪵' },
  { id: 'v33', category: 'home', ne: 'ढोका', en: 'Door', image: '/images/vocab/Door.jpeg', fallback: '🚪' },
  { id: 'v34', category: 'home', ne: 'झ्याल', en: 'Window', image: '/images/vocab/Window.jpeg', fallback: '🪟' },
  { id: 'v35', category: 'home', ne: 'कप', en: 'Cup', image: '/images/vocab/Cup.jpeg', fallback: '☕' },
  { id: 'v36', category: 'home', ne: 'प्लेट', en: 'Plate', image: '/images/vocab/Plate.jpeg', fallback: '🍽️' },
  { id: 'v37', category: 'home', ne: 'चम्चा', en: 'Spoon', image: '/images/vocab/Spoon.jpeg', fallback: '🥄' },
  // Actions
  { id: 'v38', category: 'actions', ne: 'खानु', en: 'Eat', image: '/images/vocab/Eat.jpeg', fallback: '😋' },
  { id: 'v39', category: 'actions', ne: 'सुत्नु', en: 'Sleep', image: '/images/vocab/Sleep.jpeg', fallback: '😴' },
  { id: 'v40', category: 'actions', ne: 'खेल्नु', en: 'Play', image: '/images/vocab/Play.jpeg', fallback: '⚽' },
  { id: 'v41', category: 'actions', ne: 'धुनु', en: 'Wash', image: '/images/vocab/Wash.jpeg', fallback: '🧼' },
  { id: 'v42', category: 'actions', ne: 'रुनु', en: 'Cry', image: '/images/vocab/Cry.jpeg', fallback: '😭' },
  { id: 'v43', category: 'actions', ne: 'हाँस्नु', en: 'Laugh', image: '/images/vocab/Laugh.jpeg', fallback: '😄' },
  { id: 'v44', category: 'actions', ne: 'हिँड्नु', en: 'Walk', image: '/images/vocab/Walk.jpeg', fallback: '🚶' },
  { id: 'v45', category: 'actions', ne: 'दौडिनु', en: 'Run', image: '/images/vocab/Run.jpeg', fallback: '🏃' },
  // Vegetables
  { id: 'v_v1', category: 'vegetables', ne: 'आलु', en: 'Potato', image: '/images/vocab/Potato.jpeg', fallback: '🥔' },
  { id: 'v_v2', category: 'vegetables', ne: 'प्याज', en: 'Onion', image: '/images/vocab/Onion.jpeg', fallback: '🧅' },
  { id: 'v_v3', category: 'vegetables', ne: 'गाजर', en: 'Carrot', image: '/images/vocab/Carrot.jpeg', fallback: '🥕' },
  { id: 'v_v4', category: 'vegetables', ne: 'काउली', en: 'Cauliflower', image: '/images/vocab/Cauliflower.jpeg', fallback: '🥦' },
  { id: 'v_v5', category: 'vegetables', ne: 'साग', en: 'Spinach', image: '/images/vocab/Spinach.jpeg', fallback: '🥬' },
  // New Animals
  { id: 'v_a11', category: 'animals', ne: 'भैंसी', en: 'Buffalo', image: '/images/vocab/Buffalo.jpeg', fallback: '🐃' },
  { id: 'v_a12', category: 'animals', ne: 'बाख्रा', en: 'Goat', image: '/images/vocab/Goat.jpeg', fallback: '🐐' },
  { id: 'v_a13', category: 'animals', ne: 'सिंह', en: 'Lion', image: '/images/vocab/Lion.jpeg', fallback: '🦁' },
  { id: 'v_a14', category: 'animals', ne: 'भालु', en: 'Bear', image: '/images/vocab/Bear.jpeg', fallback: '🐻' },
  { id: 'v_a15', category: 'animals', ne: 'खरायो', en: 'Rabbit', image: '/images/vocab/Rabbit.jpeg', fallback: '🐰' },
  { id: 'v_a16', category: 'animals', ne: 'साँप', en: 'Snake', image: '/images/vocab/Snake.jpeg', fallback: '🐍' },
  // New Body Parts
  { id: 'v_b10', category: 'body', ne: 'जिब्रो', en: 'Tongue', image: '/images/vocab/Tongue.jpeg', fallback: '👅' },
  { id: 'v_b11', category: 'body', ne: 'औंला', en: 'Finger', image: '/images/vocab/Finger.jpeg', fallback: '☝️' },
  { id: 'v_b12', category: 'body', ne: 'पेट', en: 'Stomach', image: '/images/vocab/Stomach.jpeg', fallback: '🤰' },
  { id: 'v_b13', category: 'body', ne: 'पिठ्यूँ', en: 'Back', image: '/images/vocab/Back.jpeg', fallback: '🔙' },
  { id: 'v_b14', category: 'body', ne: 'छाती', en: 'Chest', image: '/images/vocab/Chest.jpeg', fallback: '👕' },
  { id: 'v_b15', category: 'body', ne: 'बाहु', en: 'Arm', image: '/images/vocab/Arm.jpeg', fallback: '💪' },
  // Kitchen
  { id: 'v_k1', category: 'kitchen', ne: 'ब्लेन्डर', en: 'Blender', image: '/images/vocab/Blender.jpeg', fallback: '🌪️' },
  { id: 'v_k2', category: 'kitchen', ne: 'कचौरा', en: 'Bowl', image: '/images/vocab/Bowl.jpeg', fallback: '🥣' },
  { id: 'v_k3', category: 'kitchen', ne: 'गिलास', en: 'Glass', image: '/images/vocab/Glass.jpeg', fallback: '🥛' },
  { id: 'v_k4', category: 'kitchen', ne: 'जग', en: 'Jug', image: '/images/vocab/Jug.jpeg', fallback: '🫙' },
  { id: 'v_k5', category: 'kitchen', ne: 'चक्कु', en: 'Knife', image: '/images/vocab/Knife.jpeg', fallback: '🔪' },
  // Culture
  { id: 'v_c1', category: 'culture', ne: 'नमस्ते', en: 'Namaste', image: '/images/vocab/Namaste.jpeg', fallback: '🙏' },
  { id: 'v_c2', category: 'culture', ne: 'गणेश भगवान', en: 'Lord Ganesha', image: '/images/vocab/Ganesha.jpeg', fallback: '🕉️' },
  { id: 'v_c3', category: 'culture', ne: 'शिव भगवान', en: 'Lord Shiva', image: '/images/vocab/Shiva.jpeg', fallback: '🔱' },
  { id: 'v_c4', category: 'culture', ne: 'पूजा', en: 'Worship', image: '/images/vocab/Puja.jpeg', fallback: '🌺' },
  { id: 'v_c5', category: 'culture', ne: 'टीका', en: 'Tika', image: '/images/vocab/Tika.jpeg', fallback: '🔴' },
  { id: 'v_c6', category: 'culture', ne: 'मादल', en: 'Madal', image: '/images/vocab/Madal.jpeg', fallback: '🥁' },
  { id: 'v_c7', category: 'culture', ne: 'दियो', en: 'Diyo', image: '/images/vocab/Diyo.jpeg', fallback: '🪔' },
  { id: 'v_c8', category: 'culture', ne: 'मन्दिर', en: 'Temple', image: '/images/vocab/Temple.jpeg', fallback: '⛩️' },
  { id: 'v_c9', category: 'culture', ne: 'दशैं', en: 'Dashain', image: '/images/vocab/Dashain.jpeg', fallback: '🌾' },
  { id: 'v_c10', category: 'culture', ne: 'तिहार', en: 'Tihar', image: '', fallback: '🪔' },
  ...[
    ['animals', 'कुखुरा', 'Hen', '🐔'], ['animals', 'हाँस', 'Duck', '🦆'], ['animals', 'भेडा', 'Sheep', '🐑'],
    ['animals', 'मुसा', 'Mouse', '🐭'], ['animals', 'भ्यागुतो', 'Frog', '🐸'], ['animals', 'पुतली', 'Butterfly', '🦋'],
    ['animals', 'मयूर', 'Peacock', '🦚'], ['animals', 'कछुवा', 'Tortoise', '🐢'], ['animals', 'जिराफ', 'Giraffe', '🦒'],
    ['food', 'अंगुर', 'Grapes', '🍇'], ['food', 'तरबुजा', 'Watermelon', '🍉'], ['food', 'भुइँकटहर', 'Pineapple', '🍍'],
    ['food', 'नासपाती', 'Pear', '🍐'], ['food', 'कागती', 'Lemon', '🍋'], ['food', 'रोटी', 'Roti', '🫓'],
    ['food', 'मःम', 'Momo', '🥟'], ['food', 'दही', 'Yoghurt', '🥣'],
    ['vegetables', 'बन्दा', 'Cabbage', '🥬'], ['vegetables', 'भन्टा', 'Eggplant', '🍆'], ['vegetables', 'खुर्सानी', 'Chilli', '🌶️'],
    ['vegetables', 'मकै', 'Corn', '🌽'], ['vegetables', 'काँक्रो', 'Cucumber', '🥒'], ['vegetables', 'ब्रोकाउली', 'Broccoli', '🥦'],
    ['vegetables', 'च्याउ', 'Mushroom', '🍄'], ['vegetables', 'लसुन', 'Garlic', '🧄'], ['vegetables', 'अदुवा', 'Ginger', '🫚'],
    ['vegetables', 'केराउ', 'Peas', '🫛'], ['vegetables', 'भेडे खुर्सानी', 'Capsicum', '🫑'], ['vegetables', 'सखरखण्ड', 'Sweet potato', '🍠'],
    ['nature', 'घाम', 'Sun', '☀️'], ['nature', 'जून', 'Moon', '🌙'], ['nature', 'तारा', 'Star', '⭐'],
    ['nature', 'बादल', 'Cloud', '☁️'], ['nature', 'पानी पर्‍यो', 'Rain', '🌧️'], ['nature', 'इन्द्रेणी', 'Rainbow', '🌈'],
    ['nature', 'रूख', 'Tree', '🌳'], ['nature', 'फूल', 'Flower', '🌸'], ['nature', 'हिमाल', 'Mountain', '🏔️'],
    ['nature', 'हिउँ', 'Snow', '❄️'], ['nature', 'पात', 'Leaf', '🍃'], ['nature', 'समुद्र', 'Sea', '🌊'],
    ['clothes', 'कमिज', 'Shirt', '👕'], ['clothes', 'पाइन्ट', 'Trousers', '👖'], ['clothes', 'फ्रक', 'Dress', '👗'],
    ['clothes', 'जुत्ता', 'Shoes', '👟'], ['clothes', 'मोजा', 'Socks', '🧦'], ['clothes', 'टोपी', 'Hat', '👒'],
    ['clothes', 'ज्याकेट', 'Jacket', '🧥'], ['clothes', 'पन्जा', 'Gloves', '🧤'], ['clothes', 'चस्मा', 'Glasses', '👓'],
    ['vehicles', 'कार', 'Car', '🚗'], ['vehicles', 'बस', 'Bus', '🚌'], ['vehicles', 'साइकल', 'Bicycle', '🚲'],
    ['vehicles', 'हवाइजहाज', 'Aeroplane', '✈️'], ['vehicles', 'रेल', 'Train', '🚆'], ['vehicles', 'डुंगा', 'Boat', '⛵'],
    ['vehicles', 'मोटरसाइकल', 'Motorbike', '🏍️'], ['vehicles', 'हेलिकप्टर', 'Helicopter', '🚁'], ['vehicles', 'ट्याक्टर', 'Tractor', '🚜'],
    ['vehicles', 'दमकल', 'Fire truck', '🚒'],
    ['home', 'बत्ती', 'Lamp', '💡'], ['home', 'घडी', 'Clock', '🕰️'], ['home', 'किताब', 'Book', '📖'],
    ['home', 'खेलौना भालु', 'Teddy', '🧸'], ['home', 'बल', 'Ball', '⚽'],
  ].map(([category, ne, en, fallback], i) => ({ id: `x${i}`, category, ne, en, image: '', fallback })),
];

// ─── Numbers ───────────────────────────────────────────────
const neDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
export const toNepaliDigits = (value) => String(value).replace(/\d/g, (d) => neDigits[d]);

const numberWordsNe = ['', 'एक', 'दुई', 'तीन', 'चार', 'पाँच', 'छ', 'सात', 'आठ', 'नौ', 'दस', 'एघार', 'बाह्र', 'तेह्र', 'चौध', 'पन्ध्र', 'सोह्र', 'सत्र', 'अठार', 'उन्नाइस', 'बीस'];
const numberWordsEn = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
const countObjects = ['🍎', '🐥', '🌼', '🎈', '⭐', '🐟', '🍌', '🦋', '🍓', '🪔', '🫐', '🐞', '🌸', '🍪', '🐠', '🌟', '🍊', '🐝', '🍒', '🎀'];

export const numbers = Array.from({ length: 20 }, (_, i) => ({ n: i + 1, ne: numberWordsNe[i + 1], en: numberWordsEn[i + 1], object: countObjects[i] }));

// ─── Colours and shapes ────────────────────────────────────
export const colours = [
  { id: 'red', ne: 'रातो', en: 'Red', hex: '#E5383B', ink: '#fff', things: ['🍎', '🍓', '🌹'] },
  { id: 'blue', ne: 'निलो', en: 'Blue', hex: '#2F7FE0', ink: '#fff', things: ['🫐', '🐳', '🦋'] },
  { id: 'yellow', ne: 'पहेँलो', en: 'Yellow', hex: '#FFD23F', ink: '#5B4300', things: ['🍌', '🌻', '🐥'] },
  { id: 'green', ne: 'हरियो', en: 'Green', hex: '#3BB273', ink: '#fff', things: ['🥦', '🐸', '🍃'] },
  { id: 'orange', ne: 'सुन्तले', en: 'Orange', hex: '#FF8C32', ink: '#fff', things: ['🍊', '🥕', '🦊'] },
  { id: 'pink', ne: 'गुलाबी', en: 'Pink', hex: '#F47FB5', ink: '#fff', things: ['🌸', '🐷', '🎀'] },
  { id: 'purple', ne: 'बैजनी', en: 'Purple', hex: '#8E5BD8', ink: '#fff', things: ['🍇', '🍆', '☂️'] },
  { id: 'brown', ne: 'खैरो', en: 'Brown', hex: '#8B5A3C', ink: '#fff', things: ['🐻', '🥔', '🍫'] },
  { id: 'white', ne: 'सेतो', en: 'White', hex: '#FFFFFF', ink: '#3A3560', things: ['🥛', '☁️', '🐑'] },
  { id: 'black', ne: 'कालो', en: 'Black', hex: '#2B2B33', ink: '#fff', things: ['🐈‍⬛', '🎩', '🎱'] },
  { id: 'grey', ne: 'खरानी', en: 'Grey', hex: '#9AA0AC', ink: '#fff', things: ['🐘', '🐭', '🪨'] },
];

export const shapes = [
  { id: 'circle', ne: 'गोलो', en: 'Circle', colour: '#E5383B', things: ['⚽', '🍪', '🕰️'] },
  { id: 'square', ne: 'वर्ग', en: 'Square', colour: '#2F7FE0', things: ['🧇', '🎁', '🔲'] },
  { id: 'triangle', ne: 'त्रिभुज', en: 'Triangle', colour: '#3BB273', things: ['🍕', '⛺', '🔺'] },
  { id: 'rectangle', ne: 'आयत', en: 'Rectangle', colour: '#FF8C32', things: ['🚪', '📱', '📺'] },
  { id: 'star', ne: 'तारा', en: 'Star', colour: '#F5B700', things: ['⭐', '🌟', '✨'] },
  { id: 'heart', ne: 'मुटु', en: 'Heart', colour: '#F47FB5', things: ['💖', '💌', '🍓'] },
  { id: 'oval', ne: 'अण्डाकार', en: 'Oval', colour: '#8E5BD8', things: ['🥚', '🏉', '🥔'] },
  { id: 'diamond', ne: 'हीरा', en: 'Diamond', colour: '#1E9E8F', things: ['💎', '🪁', '🔷'] },
];

// ─── My body (ids match the drawing in BodySection) ────────
export const bodyParts = [
  { id: 'hair', ne: 'कपाल', en: 'Hair' }, { id: 'head', ne: 'टाउको', en: 'Head' },
  { id: 'eyebrows', ne: 'आँखीभौं', en: 'Eyebrows' }, { id: 'eyes', ne: 'आँखा', en: 'Eyes' },
  { id: 'ears', ne: 'कान', en: 'Ears' }, { id: 'nose', ne: 'नाक', en: 'Nose' },
  { id: 'cheeks', ne: 'गाला', en: 'Cheeks' }, { id: 'mouth', ne: 'मुख', en: 'Mouth' },
  { id: 'neck', ne: 'घाँटी', en: 'Neck' }, { id: 'shoulders', ne: 'काँध', en: 'Shoulders' },
  { id: 'arms', ne: 'पाखुरा', en: 'Arms' }, { id: 'hands', ne: 'हात', en: 'Hands' },
  { id: 'fingers', ne: 'औंला', en: 'Fingers' }, { id: 'tummy', ne: 'पेट', en: 'Tummy' },
  { id: 'knees', ne: 'घुँडा', en: 'Knees' }, { id: 'legs', ne: 'खुट्टा', en: 'Legs' },
  { id: 'feet', ne: 'पाउ', en: 'Feet' },
];

// ─── Family (illustrated avatars, no real photos) ──────────
// `look` drives the drawing in src/Avatar.jsx
export const familyMembers = [
  { id: 'me', ne: '{name}', en: '{englishName}', relNe: 'म आफैँ!', relEn: "That's me!", look: { age: 'baby', hair: 'tuft', shirt: '#F47FB5' } },
  { id: 'aama', ne: 'आमा', en: 'Mum', relNe: 'मेरी आमा', relEn: 'My mother', look: { hair: 'bun', tika: true, shirt: '#E94F6B', earrings: true } },
  { id: 'buwa', ne: 'बुवा', en: 'Dad', relNe: 'मेरो बुवा', relEn: 'My father', look: { hair: 'short', moustache: true, shirt: '#3F8FE0' } },
  { id: 'hajurbuwa', ne: 'हजुरबुवा', en: 'Grandpa', relNe: 'बुवा वा आमाको बुवा', relEn: "Dad's or Mum's father", look: { age: 'elder', hair: 'short', grey: true, topi: true, moustache: true, glasses: true, shirt: '#E9DFCB' } },
  { id: 'hajuraama', ne: 'हजुरआमा', en: 'Grandma', relNe: 'बुवा वा आमाकी आमा', relEn: "Dad's or Mum's mother", look: { age: 'elder', hair: 'bun', grey: true, glasses: true, tika: true, shirt: '#8E5BD8', earrings: true } },
  { id: 'dai', ne: 'दाइ', en: 'Big brother', relNe: 'ठूलो दाजु', relEn: 'Older brother', look: { age: 'kid', hair: 'spiky', shirt: '#2FA36B' } },
  { id: 'didi', ne: 'दिदी', en: 'Big sister', relNe: 'ठूली दिदी', relEn: 'Older sister', look: { age: 'kid', hair: 'pony', shirt: '#F2A100' } },
  { id: 'bhai', ne: 'भाइ', en: 'Little brother', relNe: 'सानो भाइ', relEn: 'Younger brother', look: { age: 'baby', hair: 'short', shirt: '#2C93B8' } },
  { id: 'bahini', ne: 'बहिनी', en: 'Little sister', relNe: 'सानी बहिनी', relEn: 'Younger sister', look: { age: 'baby', hair: 'pigtails', shirt: '#F06BA8' } },
  { id: 'kaka', ne: 'काका', en: 'Kaka', relNe: 'बुवाको भाइ', relEn: "Dad's younger brother", look: { hair: 'short', beard: true, shirt: '#E2662F' } },
  { id: 'kaki', ne: 'काकी', en: 'Kaki', relNe: 'काकाकी श्रीमती', relEn: "Kaka's wife", look: { hair: 'long', tika: true, shirt: '#1E9E8F', earrings: true } },
  { id: 'thulobuwa', ne: 'ठूलोबुवा', en: 'Thulobuwa', relNe: 'बुवाको दाजु', relEn: "Dad's older brother", look: { hair: 'side', moustache: true, glasses: true, shirt: '#5B6B8C' } },
  { id: 'thuliaama', ne: 'ठूलीआमा', en: 'Thuliaama', relNe: 'ठूलोबुवाकी श्रीमती', relEn: "Thulobuwa's wife", look: { hair: 'bun', tika: true, shirt: '#B4572E', earrings: true } },
  { id: 'phupu', ne: 'फुपू', en: 'Phupu', relNe: 'बुवाकी दिदी वा बहिनी', relEn: "Dad's sister", look: { hair: 'long', shirt: '#D9488F', earrings: true } },
  { id: 'phupaju', ne: 'फुपाजु', en: 'Phupaju', relNe: 'फुपूको श्रीमान्', relEn: "Phupu's husband", look: { hair: 'side', shirt: '#3B7A57' } },
  { id: 'mama', ne: 'मामा', en: 'Mama', relNe: 'आमाको दाजु वा भाइ', relEn: "Mum's brother", look: { hair: 'spiky', moustache: true, shirt: '#7A5CE0' } },
  { id: 'maiju', ne: 'माइजु', en: 'Maiju', relNe: 'मामाकी श्रीमती', relEn: "Mama's wife", look: { hair: 'long', tika: true, shirt: '#E08A00', earrings: true } },
  { id: 'sanima', ne: 'सानीमा', en: 'Sanima', relNe: 'आमाकी बहिनी', relEn: "Mum's younger sister", look: { hair: 'pony', shirt: '#3FA7F0', earrings: true } },
];

// ─── Big kids (3–6 years) ──────────────────────────────────
// Barakhari: each consonant with the 12 vowel signs
export const matras = ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'];
export const barakhariOf = (letter) => matras.map((m) => letter + m);

export const weekDays = [
  { ne: 'आइतबार', en: 'Sunday', icon: '☀️' },
  { ne: 'सोमबार', en: 'Monday', icon: '🌙' },
  { ne: 'मङ्गलबार', en: 'Tuesday', icon: '🔥' },
  { ne: 'बुधबार', en: 'Wednesday', icon: '🌿' },
  { ne: 'बिहीबार', en: 'Thursday', icon: '🌼' },
  { ne: 'शुक्रबार', en: 'Friday', icon: '⭐' },
  { ne: 'शनिबार', en: 'Saturday', icon: '🪐' },
];

export const nepaliMonths = ['वैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'];
export const englishMonths = [
  ['January', 'जनवरी'], ['February', 'फेब्रुअरी'], ['March', 'मार्च'], ['April', 'अप्रिल'], ['May', 'मे'], ['June', 'जुन'],
  ['July', 'जुलाई'], ['August', 'अगस्ट'], ['September', 'सेप्टेम्बर'], ['October', 'अक्टोबर'], ['November', 'नोभेम्बर'], ['December', 'डिसेम्बर'],
];

export const opposites = [
  [{ ne: 'ठूलो', en: 'Big', icon: '🐘' }, { ne: 'सानो', en: 'Small', icon: '🐭' }],
  [{ ne: 'अग्लो', en: 'Tall', icon: '🦒' }, { ne: 'होचो', en: 'Short', icon: '🐧' }],
  [{ ne: 'तातो', en: 'Hot', icon: '🔥' }, { ne: 'चिसो', en: 'Cold', icon: '🧊' }],
  [{ ne: 'दिन', en: 'Day', icon: '☀️' }, { ne: 'रात', en: 'Night', icon: '🌙' }],
  [{ ne: 'छिटो', en: 'Fast', icon: '🐇' }, { ne: 'ढिलो', en: 'Slow', icon: '🐢' }],
  [{ ne: 'खुसी', en: 'Happy', icon: '😀' }, { ne: 'दुखी', en: 'Sad', icon: '😢' }],
  [{ ne: 'माथि', en: 'Up', icon: '🎈' }, { ne: 'तल', en: 'Down', icon: '🍂' }],
  [{ ne: 'खुला', en: 'Open', icon: '📖' }, { ne: 'बन्द', en: 'Closed', icon: '📕' }],
  [{ ne: 'धेरै', en: 'Many', icon: '🍎🍎🍎🍎' }, { ne: 'थोरै', en: 'Few', icon: '🍎' }],
  [{ ne: 'सफा', en: 'Clean', icon: '🛁' }, { ne: 'फोहोर', en: 'Dirty', icon: '🐷' }],
];

// ─── Advanced learning: Nepal, world, stories ──────────────
export const nepalFacts = [
  { id: 'flag', ne: 'राष्ट्रिय झण्डा', en: 'National flag', factNe: 'संसारमा आयताकार नभएको एउटै राष्ट्रिय झण्डा।', factEn: 'The only national flag in the world that is not a rectangle.', art: 'flag' },
  { id: 'everest', ne: 'सगरमाथा', en: 'Mount Everest', factNe: 'संसारकै सबैभन्दा अग्लो हिमाल।', factEn: 'The tallest mountain in the world.', icon: '🏔️' },
  { id: 'kathmandu', ne: 'काठमाडौं', en: 'Kathmandu', factNe: 'नेपालको राजधानी।', factEn: 'The capital city of Nepal.', icon: '🛕' },
  { id: 'flower', ne: 'लालीगुराँस', en: 'Rhododendron', factNe: 'नेपालको राष्ट्रिय फूल।', factEn: 'The national flower of Nepal.', icon: '🌺' },
  { id: 'bird', ne: 'डाँफे', en: 'Himalayan monal', factNe: 'नेपालको राष्ट्रिय पक्षी।', factEn: 'The national bird of Nepal.', image: '/images/vocab/Bird.jpeg', icon: '🐦' },
  { id: 'cow', ne: 'गाई', en: 'Cow', factNe: 'नेपालको राष्ट्रिय जनावर।', factEn: 'The national animal of Nepal.', icon: '🐄' },
  { id: 'colour', ne: 'सिमरिक', en: 'Crimson', factNe: 'नेपालको राष्ट्रिय रङ।', factEn: 'The national colour of Nepal.', swatch: '#DC143C' },
  { id: 'lumbini', ne: 'लुम्बिनी', en: 'Lumbini', factNe: 'गौतम बुद्ध जन्मेको ठाउँ।', factEn: 'Where the Buddha was born.', icon: '☸️' },
  { id: 'rupee', ne: 'रुपैयाँ', en: 'Rupee', factNe: 'नेपालको पैसा।', factEn: "Nepal's money.", icon: '💵' },
  { id: 'provinces', ne: '७ प्रदेश', en: '7 provinces', factNe: 'नेपालमा सातवटा प्रदेश छन्।', factEn: 'Nepal has seven provinces.', icon: '🗺️' },
  { id: 'dalbhat', ne: 'दाल भात', en: 'Dal bhat', factNe: 'नेपालीहरूको मनपर्ने खाना।', factEn: "Nepal's favourite everyday meal.", icon: '🍛' },
  { id: 'volleyball', ne: 'भलिबल', en: 'Volleyball', factNe: 'नेपालको राष्ट्रिय खेल।', factEn: 'The national sport of Nepal.', icon: '🏐' },
];

export const seasonsAus = [
  { ne: 'गर्मी', en: 'Summer', icon: '☀️', monthsNe: 'डिसेम्बर – फेब्रुअरी', monthsEn: 'December – February', tint: '#FFF1D6' },
  { ne: 'शरद', en: 'Autumn', icon: '🍂', monthsNe: 'मार्च – मे', monthsEn: 'March – May', tint: '#FFE9DE' },
  { ne: 'जाडो', en: 'Winter', icon: '❄️', monthsNe: 'जुन – अगस्ट', monthsEn: 'June – August', tint: '#E2F1FD' },
  { ne: 'वसन्त', en: 'Spring', icon: '🌸', monthsNe: 'सेप्टेम्बर – नोभेम्बर', monthsEn: 'September – November', tint: '#E1F7EA' },
];

export const rituNepal = [
  { ne: 'वसन्त', en: 'Spring', months: 'चैत – वैशाख', icon: '🌸' },
  { ne: 'ग्रीष्म', en: 'Summer', months: 'जेठ – असार', icon: '☀️' },
  { ne: 'वर्षा', en: 'Monsoon', months: 'साउन – भदौ', icon: '🌧️' },
  { ne: 'शरद', en: 'Autumn', months: 'असोज – कात्तिक', icon: '🌾' },
  { ne: 'हेमन्त', en: 'Early winter', months: 'मंसिर – पुस', icon: '🍂' },
  { ne: 'शिशिर', en: 'Winter', months: 'माघ – फागुन', icon: '❄️' },
];

export const weather = [
  { ne: 'घमाइलो', en: 'Sunny', icon: '☀️' }, { ne: 'बादल लागेको', en: 'Cloudy', icon: '☁️' },
  { ne: 'पानी परेको', en: 'Rainy', icon: '🌧️' }, { ne: 'हावा चलेको', en: 'Windy', icon: '🌬️' },
  { ne: 'हिउँ परेको', en: 'Snowy', icon: '🌨️' }, { ne: 'चट्याङ', en: 'Stormy', icon: '⛈️' },
];

export const planets = [
  { ne: 'सूर्य', en: 'Sun', colour: '#FFB020', r: 34, factNe: 'सूर्य एउटा ठूलो तारा हो।', factEn: 'The Sun is a big star.' },
  { ne: 'बुध', en: 'Mercury', colour: '#A8A29E', r: 8, factNe: 'सूर्यको सबैभन्दा नजिकको ग्रह।', factEn: 'The closest planet to the Sun.' },
  { ne: 'शुक्र', en: 'Venus', colour: '#E9C46A', r: 12, factNe: 'राति सबैभन्दा चम्किलो देखिने ग्रह।', factEn: 'The brightest planet in the night sky.' },
  { ne: 'पृथ्वी', en: 'Earth', colour: '#2F7FE0', r: 13, factNe: 'हाम्रो घर।', factEn: 'Our home.' },
  { ne: 'मंगल', en: 'Mars', colour: '#D2541E', r: 10, factNe: 'रातो ग्रह।', factEn: 'The red planet.' },
  { ne: 'बृहस्पति', en: 'Jupiter', colour: '#C9A27A', r: 26, factNe: 'सबैभन्दा ठूलो ग्रह।', factEn: 'The biggest planet.' },
  { ne: 'शनि', en: 'Saturn', colour: '#E5C07B', r: 22, ring: true, factNe: 'सुन्दर औँठी भएको ग्रह।', factEn: 'The planet with beautiful rings.' },
  { ne: 'अरुण', en: 'Uranus', colour: '#7FD3E0', r: 16, factNe: 'ढल्केर घुम्ने ग्रह।', factEn: 'It spins on its side.' },
  { ne: 'वरुण', en: 'Neptune', colour: '#3B5BDB', r: 16, factNe: 'सूर्यबाट सबैभन्दा टाढाको ग्रह।', factEn: 'The farthest planet from the Sun.' },
];

// Longer stories for older children: retellings of public-domain fables.
export const bigStories = [
  {
    id: 'hare-tortoise', titleNe: 'खरायो र कछुवा', titleEn: 'The Hare and the Tortoise', cover: '🐇🐢',
    pages: [
      ['🐇🌳🐢', 'एउटा जंगलमा एउटा खरायो र एउटा कछुवा बस्थे। खरायो धेरै छिटो दौडन्थ्यो।', 'In a forest lived a hare and a tortoise. The hare could run very fast.'],
      ['🐇😆', 'खरायोले कछुवालाई जिस्काउँदै भन्यो, "तिमी त कति ढिलो हिँड्छौ!"', 'The hare laughed at the tortoise. "You are so slow!" he said.'],
      ['🐢🙂', 'कछुवाले शान्त भएर भन्यो, "ल, दौड प्रतियोगिता गरौँ।"', 'The tortoise calmly replied, "Then let us have a race."'],
      ['🏁🐇💨', 'दौड सुरु भयो। खरायो फुर्र दौडियो र धेरै अगाडि पुग्यो।', 'The race began. The hare zoomed off and was soon far ahead.'],
      ['🌳🐇😴', '"कछुवा त धेरै पछाडि छ," खरायोले सोच्यो, र रूखमुनि सुत्यो।', '"The tortoise is far behind," thought the hare, and he lay down for a nap under a tree.'],
      ['🐢👣', 'कछुवा नरोकिकन बिस्तारै-बिस्तारै हिँडिरह्यो।', 'The tortoise kept walking, slowly and steadily, without stopping.'],
      ['🐢🏁🎉', 'खरायो ब्युँझँदा कछुवा त अन्तिम रेखामा पुगिसकेको थियो!', 'When the hare woke up, the tortoise had already crossed the finish line!'],
      ['💡', 'बिस्तारै भए पनि नरोकी काम गर्नेले जित्छ।', 'Slow and steady wins the race.'],
    ],
  },
  {
    id: 'thirsty-crow', titleNe: 'तिर्खाएको काग', titleEn: 'The Thirsty Crow', cover: '🐦‍⬛🏺',
    pages: [
      ['☀️🐦‍⬛', 'गर्मीको दिन थियो। एउटा काग धेरै तिर्खायो।', 'It was a hot summer day, and a crow was very thirsty.'],
      ['🐦‍⬛🔍', 'ऊ पानी खोज्दै यताउता उड्यो।', 'He flew here and there, looking for water.'],
      ['🏺💧', 'अन्त्यमा उसले एउटा गाग्री देख्यो, तर पानी धेरै तल थियो।', 'At last he found a pot, but the water was right at the bottom.'],
      ['🐦‍⬛🤔', 'कागको चुच्चो पानीसम्म पुगेन। उसले सोच्यो, "अब के गर्ने?"', 'His beak could not reach the water. He thought, "What shall I do now?"'],
      ['🪨🪨🪨', 'उसले वरपर साना-साना ढुङ्गा देख्यो।', 'Then he noticed small pebbles all around.'],
      ['🐦‍⬛🪨🏺', 'उसले एउटा-एउटा गरेर ढुङ्गा गाग्रीमा खसाल्यो।', 'One by one, he dropped the pebbles into the pot.'],
      ['💧⬆️', 'बिस्तारै पानी माथि आयो!', 'Slowly, the water rose higher and higher!'],
      ['🐦‍⬛😊', 'कागले पानी पियो र खुसी भएर उड्यो। सोचेर काम गरे बाटो भेटिन्छ।', 'The crow drank the water and flew away happily. If you think hard, you can find a way.'],
    ],
  },
];
