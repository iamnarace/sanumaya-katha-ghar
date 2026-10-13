import { useId } from 'react';

// Original illustrated family faces. Everything is drawn here, no photos.
const SKINS = ['#E2AC84', '#D59B70', '#C98C62'];
const HAIR = '#2A1C15';
const GREY = '#CFCBC4';

function Hair({ style, colour, back }) {
  const cap = <path d="M56 86 C52 44 82 30 100 30 C120 30 150 42 144 88 C136 64 120 56 100 56 C80 56 64 64 56 86 Z" fill={colour} />;
  if (back) {
    if (style === 'long') return <path d="M52 92 C44 34 156 34 148 92 L154 160 C130 170 70 170 46 160 Z" fill={colour} />;
    if (style === 'pony') return <ellipse cx="150" cy="78" rx="14" ry="30" fill={colour} transform="rotate(18 150 78)" />;
    if (style === 'bun') return <circle cx="100" cy="34" r="17" fill={colour} />;
    if (style === 'pigtails') return <g fill={colour}><circle cx="48" cy="74" r="14" /><circle cx="152" cy="74" r="14" /></g>;
    return null;
  }
  switch (style) {
    case 'spiky':
      return <path d="M56 86 C54 58 62 46 70 40 L74 28 L84 38 L92 24 L102 36 L112 22 L120 38 L132 30 L134 44 C146 54 148 70 144 88 C136 64 120 56 100 56 C80 56 64 64 56 86 Z" fill={colour} />;
    case 'side':
      return <path d="M56 88 C50 44 84 28 104 30 C128 32 150 46 144 88 C140 70 132 62 122 58 C104 66 80 66 62 72 Z" fill={colour} />;
    case 'tuft':
      return <path d="M98 50 C92 38 100 30 108 34 C102 36 102 42 106 46 Z" fill={colour} />;
    default:
      return cap;
  }
}

function Topi() {
  // Dhaka topi: tilted cap with a small woven pattern
  return (
    <g transform="rotate(-6 100 46)">
      <path d="M60 60 L66 30 Q100 22 134 30 L140 60 Q100 52 60 60 Z" fill="#F6EFE2" stroke="#7A2E2E" strokeWidth="2" />
      {[72, 86, 100, 114, 128].map((x, i) => <rect key={x} x={x - 4} y={38 + (i % 2) * 6} width="8" height="6" rx="1" fill={['#B42318', '#1F2A44', '#2F7A4D'][i % 3]} />)}
      {[79, 93, 107, 121].map((x) => <circle key={x} cx={x} cy="50" r="2" fill="#B42318" />)}
    </g>
  );
}

export default function Avatar({ look = {}, bg = '#EEE8FF', skin = 0, size = '100%' }) {
  const { age = 'adult', hair = 'short', grey = false, moustache, beard, glasses, tika, topi, earrings, shirt = '#7A5CE0' } = look;
  const skinFill = SKINS[skin % SKINS.length];
  const hairColour = grey ? GREY : HAIR;
  const scale = age === 'baby' ? 0.8 : age === 'kid' ? 0.9 : 1;
  const big = age === 'baby';
  const clipId = `clip${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-hidden="true">
      <defs><clipPath id={clipId}><circle cx="100" cy="100" r="100" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="200" height="200" fill={bg} />
        <g transform={`translate(100 200) scale(${scale}) translate(-100 -200)`}>
          <Hair style={hair} colour={hairColour} back />
          <path d="M28 210 C28 158 58 140 100 140 C142 140 172 158 172 210 Z" fill={shirt} />
          <path d="M84 140 Q100 156 116 140" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="4" strokeLinecap="round" />
          <rect x="88" y="118" width="24" height="26" rx="8" fill={skinFill} />
          <rect x="88" y="118" width="24" height="10" fill="rgba(0,0,0,0.08)" />
          <circle cx="57" cy="94" r="10" fill={skinFill} />
          <circle cx="143" cy="94" r="10" fill={skinFill} />
          {earrings && <g fill="#E8B020"><circle cx="56" cy="107" r="4" /><circle cx="144" cy="107" r="4" /></g>}
          <ellipse cx="100" cy="90" rx={big ? 46 : 43} ry={big ? 46 : 48} fill={skinFill} />
          {beard && <path d="M60 96 C62 128 82 140 100 140 C118 140 138 128 140 96 C136 112 124 120 100 120 C76 120 64 112 60 96 Z" fill={hairColour} />}
          <Hair style={hair} colour={hairColour} />
          {topi && <Topi />}
          {age === 'elder' && <g stroke="rgba(0,0,0,0.13)" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M86 64 Q100 60 114 64" /><path d="M88 70 Q100 67 112 70" /></g>}
          {tika && <ellipse cx="100" cy="70" rx="4" ry="6" fill="#D7263D" />}
          <g stroke={hairColour === GREY ? '#8F8A82' : HAIR} strokeWidth="3.5" fill="none" strokeLinecap="round">
            <path d="M74 76 Q82 71 90 76" /><path d="M110 76 Q118 71 126 76" />
          </g>
          <g fill="#2A1C15">
            <circle cx="82" cy="88" r={big ? 6 : 4.5} /><circle cx="118" cy="88" r={big ? 6 : 4.5} />
          </g>
          <g fill="#fff"><circle cx="84" cy="86" r="1.6" /><circle cx="120" cy="86" r="1.6" /></g>
          {glasses && <g fill="none" stroke="#3A3560" strokeWidth="2.5"><circle cx="82" cy="88" r="11" /><circle cx="118" cy="88" r="11" /><path d="M93 88 Q100 84 107 88" /></g>}
          <path d="M97 98 Q100 104 103 98" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2.5" strokeLinecap="round" />
          <g fill="#F2858F" opacity="0.45"><circle cx="72" cy="104" r="7" /><circle cx="128" cy="104" r="7" /></g>
          {moustache && <path d="M86 110 Q93 104 100 109 Q107 104 114 110 Q107 113 100 111 Q93 113 86 110 Z" fill={hairColour} />}
          <path d="M89 115 Q100 125 111 115" fill="none" stroke="#B23A48" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
