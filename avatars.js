// Original chibi-style anime portraits for each agent, drawn as inline SVG (100x100).
(function(){
const SKIN='#ffe2cc', SKIN_SH='#f3c6a8', LINE='#2a1a24';

function eyes(iris, opts={}){
  if(opts.calm){ // relaxed, half-closed eyes
    return `<path d="M34 59 q6 -5 12 0" stroke="${LINE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M54 59 q6 -5 12 0" stroke="${LINE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M35 60 q5 4 10 0" fill="${iris}" opacity=".9"/><path d="M55 60 q5 4 10 0" fill="${iris}" opacity=".9"/>`;
  }
  const e=(x)=>`<ellipse cx="${x}" cy="59" rx="5.6" ry="7.4" fill="${LINE}"/>
    <ellipse cx="${x}" cy="60.5" rx="4.4" ry="5.6" fill="${iris}"/>
    <ellipse cx="${x}" cy="62.5" rx="2.6" ry="3" fill="${LINE}" opacity=".55"/>
    <circle cx="${x-1.8}" cy="56.6" r="2" fill="#fff"/><circle cx="${x+2}" cy="63" r="1" fill="#fff" opacity=".9"/>
    <path d="M${x-6.5} 52.5 q6.5 -3.6 13 0" stroke="${LINE}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return e(40)+e(60);
}
const blush=`<ellipse cx="33" cy="68" rx="4.5" ry="2.4" fill="#ff8fa3" opacity=".45"/><ellipse cx="67" cy="68" rx="4.5" ry="2.4" fill="#ff8fa3" opacity=".45"/>`;
const face=`<ellipse cx="50" cy="60" rx="23" ry="24" fill="${SKIN}"/><path d="M30 64 q20 26 40 0" fill="${SKIN_SH}" opacity=".35"/>`;
const neck=`<rect x="44" y="78" width="12" height="10" fill="${SKIN_SH}"/>`;
const wrap=(bg,inner)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs><radialGradient id="g" cx="50%" cy="38%" r="65%"><stop offset="0" stop-color="${bg}" stop-opacity=".55"/><stop offset="1" stop-color="#0b1020"/></radialGradient></defs>
  <circle cx="50" cy="50" r="50" fill="url(#g)"/>${inner}</svg>`;

const A = {
  // Captain: navy officer's coat with gold trim, peaked cap with a star, spiky copper hair, confident grin.
  captain: wrap('#f5b84a', `
    <path d="M14 104 q4 -24 36 -24 q32 0 36 24z" fill="#1d2a52"/>
    <path d="M38 80 l12 14 l12 -14" fill="none" stroke="#f5b84a" stroke-width="3"/>
    <circle cx="50" cy="98" r="2.2" fill="#f5b84a"/>${neck}
    <path d="M26 60 q-3 -26 24 -28 q27 2 24 28 l-4 -10 l-4 8 l-4 -11 l-5 9 l-4 -10 l-5 10 l-4 -9 l-4 11 l-4 -8z" fill="#b8562a"/>
    ${face}
    <path d="M28 54 l4 -14 l5 9 l5 -12 l4 10 l6 -11 l4 11 l5 -10 l4 12 l5 -8 l2 13 q-22 -12 -44 0z" fill="#c8642a"/>
    <path d="M24 36 q26 -14 52 0 l-2 6 q-24 -8 -48 0z" fill="#1d2a52"/>
    <path d="M30 22 q20 -10 40 0 l6 14 q-26 -10 -52 0z" fill="#26356a"/>
    <rect x="25" y="34" width="50" height="4" rx="2" fill="#f5b84a"/>
    <path d="M50 21 l2.2 4.6 l5 .6 l-3.7 3.4 l1 5 l-4.5 -2.5 l-4.5 2.5 l1 -5 l-3.7 -3.4 l5 -.6z" fill="#f5b84a"/>
    ${eyes('#d98b1c')}${blush}
    <path d="M43 72 q7 6 14 0" fill="#fff" stroke="${LINE}" stroke-width="1.6" stroke-linejoin="round"/>`),

  // Scout: explorer with aviator goggles pushed up on messy dark-teal hair, cyan scarf, curious eyes.
  scout: wrap('#4ad6f5', `
    <path d="M14 104 q4 -24 36 -24 q32 0 36 24z" fill="#2c4f5e"/>
    <path d="M30 82 q20 10 40 0 l2 8 q-22 10 -44 0z" fill="#4ad6f5"/><path d="M58 86 l8 16 l-8 -2z" fill="#3bb4d0"/>${neck}
    ${face}
    <path d="M25 58 q-4 -32 25 -32 q30 0 25 32 q-3 -10 -8 -14 q-2 6 -8 6 q2 -6 -2 -9 q-4 7 -10 6 q3 -5 0 -8 q-6 8 -14 9 q-6 2 -8 10z" fill="#1e3a4f"/>
    <path d="M24 42 q26 -10 52 0" stroke="#3a3a46" stroke-width="5" fill="none"/>
    <circle cx="39" cy="38" r="7.5" fill="#3a3a46"/><circle cx="61" cy="38" r="7.5" fill="#3a3a46"/>
    <circle cx="39" cy="38" r="5.2" fill="#4ad6f5"/><circle cx="61" cy="38" r="5.2" fill="#4ad6f5"/>
    <circle cx="37" cy="36" r="1.8" fill="#fff"/><circle cx="59" cy="36" r="1.8" fill="#fff"/>
    ${eyes('#1fa3c4')}${blush}
    <path d="M45 72 q5 4 10 0" fill="none" stroke="${LINE}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M54 70 l3 -1" stroke="${LINE}" stroke-width="1.2"/>`),

  // Tailor: long violet hair, round glasses, a needle-and-thread hairpin, measuring tape around the neck.
  tailor: wrap('#b98cff', `
    <path d="M22 58 q-6 30 -4 46 h64 q2 -16 -4 -46z" fill="#5a3290"/>
    <path d="M14 104 q4 -24 36 -24 q32 0 36 24z" fill="#efe6ff"/>
    <path d="M30 84 q8 6 6 20 M70 84 q-8 6 -6 20" stroke="#ffd34d" stroke-width="5" fill="none"/>
    <path d="M31 88 h4 M32 93 h4 M33 98 h4 M65 88 h4 M64 93 h4 M63 98 h4" stroke="#7a5a00" stroke-width="1"/>${neck}
    ${face}
    <path d="M24 64 q-6 -36 26 -36 q32 0 26 36 q-4 -18 -16 -22 q-10 8 -26 6 q-6 4 -10 16z" fill="#6b3fa0"/>
    <path d="M36 40 q8 -8 22 -6" stroke="#8e64c9" stroke-width="2" fill="none" opacity=".8"/>
    <line x1="64" y1="30" x2="80" y2="20" stroke="#d9dbe6" stroke-width="2" stroke-linecap="round"/>
    <circle cx="79" cy="21" r="1.2" fill="#0b1020"/>
    <path d="M80 20 q6 6 -2 12 q-6 6 2 10" stroke="#ff7eb6" stroke-width="1.4" fill="none"/>
    ${eyes('#8a5ae0')}
    <circle cx="40" cy="60" r="9" fill="none" stroke="#3a2a4a" stroke-width="1.8"/><circle cx="60" cy="60" r="9" fill="none" stroke="#3a2a4a" stroke-width="1.8"/>
    <path d="M49 60 h2" stroke="#3a2a4a" stroke-width="1.8"/>${blush}
    <path d="M46 73 q4 3 8 0" fill="none" stroke="${LINE}" stroke-width="1.6" stroke-linecap="round"/>`),

  // Turtle: steady, unhurried form-filler in a turtle-shell hood with a headset mic, calm smiling eyes.
  turtle: wrap('#4af5a0', `
    <path d="M14 104 q4 -24 36 -24 q32 0 36 24z" fill="#2f8f5b"/>
    <path d="M42 82 h16 v22 h-16z" fill="#bff5d8" opacity=".9"/>${neck}
    <path d="M20 66 q-6 -46 30 -46 q36 0 30 46 q-8 -6 -10 -16 h-40 q-2 10 -10 16z" fill="#2f8f5b"/>
    <path d="M30 34 l10 -6 l10 4 l10 -4 l10 6 M36 46 l4 -10 l10 -4 l10 4 l4 10 M50 32 v-10" stroke="#1d6b42" stroke-width="2" fill="none" stroke-linejoin="round"/>
    ${face}
    <path d="M30 52 q8 -8 14 -4 q4 -6 12 -4 q8 -2 14 8 q-20 -6 -40 0z" fill="#7a4a2a"/>
    ${eyes('#2fbf7a',{calm:true})}${blush}
    <path d="M44 71 q6 5 12 0" fill="none" stroke="${LINE}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M26 60 q-2 -8 4 -10" stroke="#2a2a33" stroke-width="3" fill="none"/>
    <rect x="22" y="56" width="7" height="11" rx="3" fill="#2a2a33"/>
    <path d="M26 66 q2 10 14 9" stroke="#2a2a33" stroke-width="2" fill="none"/><circle cx="41" cy="75" r="2.2" fill="#4af5a0"/>`),

  // Scribe: record-keeper with pink twin buns, a quill tucked behind the ear and a little notebook.
  scribe: wrap('#ff7eb6', `
    <path d="M14 104 q4 -24 36 -24 q32 0 36 24z" fill="#7a2d55"/>
    <path d="M40 80 l10 10 l10 -10" fill="#fff" stroke="#fff" stroke-width="1"/>
    <rect x="58" y="86" width="16" height="14" rx="2" fill="#fff4f9" transform="rotate(-10 66 93)"/>
    <path d="M61 91 h10 M61 95 h8" stroke="#ff7eb6" stroke-width="1.2" transform="rotate(-10 66 93)"/>${neck}
    <circle cx="27" cy="30" r="10" fill="#d9548c"/><circle cx="73" cy="30" r="10" fill="#d9548c"/>
    <path d="M25 62 q-4 -34 25 -34 q29 0 25 34 q-3 -8 -6 -10 v12 q-2 -14 -8 -20 q-10 6 -26 4 q-4 6 -6 14 v-10 q-3 2 -4 10z" fill="#e8679f"/>
    ${face}
    <path d="M28 52 q4 -16 22 -16 q18 0 22 16 q-6 -6 -10 -6 l-2 6 l-4 -7 l-6 7 l-2 -7 l-6 6 l-2 -6 q-6 1 -12 7z" fill="#e8679f"/>
    <path d="M74 50 q12 -18 8 -30 q-10 8 -12 26z" fill="#fff" stroke="#e7d8e2" stroke-width="1"/>
    <path d="M73 50 l7 -24" stroke="#c9b6c3" stroke-width="1"/>
    ${eyes('#d94c8c')}${blush}
    <path d="M46 72 q4 3.5 8 0" fill="none" stroke="${LINE}" stroke-width="1.6" stroke-linecap="round"/>`),
};

window.AVATAR_SVG = A;
window.AVATAR_URL = Object.fromEntries(Object.entries(A).map(([k,s])=>[k,'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)]));
})();
