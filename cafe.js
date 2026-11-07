// Break room: the agents as full-body anime-style colleagues on a coffee break.
// Original characters drawn as inline SVG (heads shared with avatars.js), one 64-second loop.
(function(){
const host=document.getElementById('cafe'); if(!host||!window.AVATAR_PARTS) return;
const NS='http://www.w3.org/2000/svg', P=window.AVATAR_PARTS;
const LOOP=64, FLOOR=285, LINE='#2a1a24', SKIN='#ffe2cc', SKIN_SH='#fbd8bf';

/* ---------- characters ---------- */
// Feet at (0,0), facing the viewer. Front arm is on +x and holds the item.
const C={
  captain:{c:'#f5b84a', coat:'#1d2a52', pants:'#141c38', shoe:'#0c1020', blink:true, item:'mug'},
  scout:{c:'#4ad6f5', coat:'#2c4f5e', pants:'#25303f', shoe:'#3a2a20', blink:true, item:'donut'},
  tailor:{c:'#b98cff', coat:'#efe6ff', pants:'#3a2a4a', shoe:'#5a3290', item:'tea'},
  turtle:{c:'#4af5a0', coat:'#2f8f5b', pants:'#26402f', shoe:'#1d6b42', item:'boba'},
};
const HS=1.1, NECK=-95, SH=21;                           // head scale, neck y, shoulder x
const head=`translate(${-50*HS} ${NECK-82*HS}) scale(${HS})`;
const torso={
  captain:`<path d="M-23 -84 q1 -11 13 -12 l10 7 l10 -7 q12 1 13 12 l-1 42 h-44z" fill="#1d2a52"/>
    <path d="M-10 -96 l10 13 l10 -13" fill="none" stroke="#f5b84a" stroke-width="2.4"/>
    <path d="M-27 -88 q6 -6 12 -6 l-1 6z M27 -88 q-6 -6 -12 -6 l1 6z" fill="#f5b84a"/>
    <rect x="-22" y="-52" width="44" height="5" fill="#f5b84a"/>
    <circle cx="0" cy="-74" r="1.8" fill="#f5b84a"/><circle cx="0" cy="-63" r="1.8" fill="#f5b84a"/>`,
  scout:`<path d="M-23 -84 q1 -11 13 -12 h20 q12 1 13 12 l-1 42 h-44z" fill="#2c4f5e"/>
    <path d="M-7 -95 h14 l-2 52 h-10z" fill="#e6f6fb"/>
    <rect x="-19" y="-64" width="11" height="9" rx="2" fill="#24434f"/><rect x="8" y="-64" width="11" height="9" rx="2" fill="#24434f"/>
    <path d="M-12 -98 q12 8 24 0 l2 6 q-14 8 -28 0z" fill="#4ad6f5"/><path d="M6 -94 l6 14 l-6 -2z" fill="#3bb4d0"/>`,
  tailor:`<path d="M-21 -84 q1 -11 13 -12 h16 q12 1 13 12 l-2 26 h-38z" fill="#efe6ff"/>
    <path d="M-19 -60 h38 l8 40 h-54z" fill="#5a3290"/><path d="M-6 -60 l-3 40 M6 -60 l3 40" stroke="#4a2878" stroke-width="1.5"/>
    <path d="M-13 -94 q5 5 4 20 M13 -94 q-5 5 -4 20" stroke="#ffd34d" stroke-width="3.4" fill="none"/>
    <path d="M-12 -90 h3 M-11 -84 h3 M-11 -78 h3 M9 -90 h3 M8 -84 h3 M8 -78 h3" stroke="#7a5a00" stroke-width=".8"/>`,
  turtle:`<path d="M-24 -84 q1 -11 13 -12 h22 q12 1 13 12 l-1 42 h-46z" fill="#2f8f5b"/>
    <path d="M-7 -95 h14 v18 h-14z" fill="#bff5d8" opacity=".9"/>
    <path d="M-14 -66 h28 l3 14 h-34z" fill="#287a4d"/>
    <path d="M-5 -95 l1 14 M5 -95 l-1 14" stroke="#e6fff1" stroke-width="1.6"/>`,
};
const backHair={ tailor:`<path d="M22 58 q-6 30 -4 46 h64 q2 -16 -4 -46z" fill="#5a3290" transform="${head}"/>` };
const items={
  mug:`<rect x="-3" y="-17" width="13" height="15" rx="2.5" fill="#f4f6ff"/><rect x="-3" y="-13" width="13" height="4" fill="#1d2a52"/>
    <path d="M10 -14 q6 0 6 5 q0 5 -6 5" fill="none" stroke="#f4f6ff" stroke-width="2.2"/>${steam(3,-19)}`,
  tea:`<path d="M-4 -11 h16 q-1 9 -8 9 q-7 0 -8 -9z" fill="#fff4fb"/><path d="M-4 -11 h16" stroke="#b98cff" stroke-width="1.6"/>
    <path d="M12 -9 q4 0 3 4 q-1 2 -4 2" fill="none" stroke="#fff4fb" stroke-width="1.6"/>${steam(4,-13)}`,
  donut:`<g class="donut"><circle cx="4" cy="-9" r="8.5" fill="#d9944f"/><circle cx="4" cy="-9" r="7" fill="#ff8fc0"/>
    <circle cx="4" cy="-9" r="2.6" fill="#7a4a2a"/>
    <path d="M0 -14 l2 1 M8 -13 l1 2 M9 -7 l-2 1 M-1 -6 l1 -2 M4 -16 l1 1" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></g>
    <g class="bite"><circle cx="11.5" cy="-14.5" r="3.6" fill="var(--cafe-bite,#1a2440)"/><circle cx="12.5" cy="-10.5" r="3" fill="var(--cafe-bite,#1a2440)"/></g>`,
  boba:`<path d="M-3 -22 h14 l-2 21 h-10z" fill="#d7f5e3" opacity=".95"/><path d="M-2.4 -14 h12.8 l-1.3 13 h-10.2z" fill="#9ad7a8"/>
    <circle cx="1" cy="-4" r="1.6" fill="#2a1a24"/><circle cx="4.5" cy="-3" r="1.6" fill="#2a1a24"/><circle cx="7.5" cy="-5" r="1.6" fill="#2a1a24"/>
    <rect x="-4" y="-24" width="16" height="3" rx="1.5" fill="#2f8f5b"/><path d="M6 -24 l3 -9" stroke="#4af5a0" stroke-width="2.4" stroke-linecap="round"/>`,
};
function steam(x,y){ return `<g class="steam" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".55">
  <path d="M${x} ${y} q-3 -4 0 -8 q3 -4 0 -8"/><path d="M${x+5} ${y} q-3 -4 0 -8 q3 -4 0 -8" style="animation-delay:-1s"/></g>`; }

// face overlays (avatar coordinates): blink, happy eyes, talking mouth
const LID=x=>`<ellipse cx="${x}" cy="59.6" rx="6.6" ry="7.8" fill="${SKIN}"/>`;
const blinkSvg=`${LID(40)}${LID(60)}<path d="M34 61 q6 3 12 0 M54 61 q6 3 12 0" stroke="${LINE}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
const happySvg=`${LID(40)}${LID(60)}<path d="M34 61 q6 -7 12 0 M54 61 q6 -7 12 0" stroke="${LINE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const mouthSvg=`<ellipse cx="50" cy="73.5" rx="8.5" ry="4" fill="${SKIN_SH}"/>
  <path class="m" d="M45 71.5 q5 -1 10 0 q-1 6 -5 6 q-4 0 -5 -6z" fill="#7a2a3a"/><path d="M47 75.6 q3 -2 6 0 q-1 1.8 -3 1.8 q-2 0 -3 -1.8z" fill="#ff8fa3"/>`;

function charSvg(k){
  const c=C[k];
  return `<g class="ch" id="ch-${k}">
    <ellipse cx="0" cy="2" rx="26" ry="5" fill="#000" opacity=".28"/>
    <g class="flip">
      ${backHair[k]||''}
      <g class="legL"><rect x="-12" y="-46" width="10" height="42" rx="4" fill="${c.pants}"/><ellipse cx="-7" cy="-3" rx="8" ry="4.5" fill="${c.shoe}"/></g>
      <g class="legR"><rect x="2" y="-46" width="10" height="42" rx="4" fill="${c.pants}"/><ellipse cx="7" cy="-3" rx="8" ry="4.5" fill="${c.shoe}"/></g>
      <g class="armB"><path fill="none" stroke="${c.coat}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle r="5" fill="${SKIN}"/></g>
      <g class="body">${torso[k]}
        <rect x="-6" y="-100" width="12" height="9" fill="#f3c6a8"/>
        <g class="head"><g transform="${head}">${P[k].head}
          <g class="blink" visibility="hidden">${blinkSvg}</g><g class="happy" visibility="hidden">${happySvg}</g>
          <g class="talk" visibility="hidden">${mouthSvg}</g></g></g>
      </g>
      <g class="armF"><path fill="none" stroke="${c.coat}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <g class="item">${items[c.item]}</g><circle r="5" fill="${SKIN}"/></g>
    </g></g>`;
}

/* ---------- script: one 64s loop ---------- */
// moves: [t, x, facing]; x is linear between keys. poses: [t, pose] for the front hand.
const S={
  captain:{moves:[[0,262,-1],[3.8,262,-1],[6.8,470,1],[58.2,470,1],[61.4,262,-1],[64,262,-1]],
    poses:[[0,'pour'],[3.2,'hold'],[21.5,'sip'],[22.6,'hold'],[45,'sip'],[46,'hold'],[55,'cheer'],[57.6,'hold'],[61.6,'pour']]},
  tailor:{moves:[[0,580,-1],[36,580,-1],[37,532,-1],[39.4,532,-1],[40.4,580,-1],[64,580,-1]],
    poses:[[0,'hold'],[1.4,'sip'],[2.6,'hold'],[13.4,'sip'],[14.4,'hold'],[37,'reach'],[38.8,'hold'],[55,'cheer'],[57.6,'hold'],[61,'sip'],[62.2,'hold']]},
  scout:{moves:[[0,1420,-1],[12,1420,-1],[16,700,-1],[20,700,1],[44,700,-1],[60.6,700,1],[64,1420,1]],
    poses:[[0,'hold'],[17,'wave'],[18.4,'hold'],[33,'sip'],[34,'hold'],[49,'grab'],[50.2,'hold'],[55,'cheer'],[57.6,'hold'],[60,'wave'],[60.8,'hold']]},
  turtle:{moves:[[0,1420,-1],[22,1420,-1],[32,810,-1],[57.6,810,1],[64,1420,1]],
    poses:[[0,'hold'],[36.5,'sip'],[37.6,'hold'],[55,'cheer'],[57.6,'hold']]},
};
const SAY=[
  [4.0,6.8,'captain',"Fresh pot's ready!"],
  [7.0,10.0,'tailor','Perfect timing. How was the morning run?'],
  [10.2,13.2,'captain','Smooth sailing. Scout found a ton.'],
  [14.0,17.2,'scout','Did someone say my name? I brought donuts!'],
  [17.4,19.8,'tailor','Did you score them first?'],
  [20.0,23.2,'scout','Glazed is a 92. Sprinkles, a solid 78.'],
  [25.0,27.2,'captain',"Where's Turtle?"],
  [27.3,30.5,'scout','On the way. Human pace, as always.'],
  [32.2,35.4,'turtle','Slow and steady fills the forms.'],
  [36.0,39.2,'tailor',"Hold still, your collar's crooked."],
  [39.4,42.4,'captain','Ha. Always tailoring something.'],
  [44.0,46.8,'scout','You gonna finish that croissant?'],
  [47.0,49.0,'tailor','…It’s all yours.'],
  [51.6,54.4,'turtle','One toast, then back to the queue?'],
  [54.6,57.4,'captain','To the next interview!'],
  [57.8,59.8,'turtle','Back to work.'],
  [60.0,62.4,'scout','Wait up, Turtle!'],
];
const LAUGH=[[23.2,24.8,['captain','tailor']],[30.5,31.8,['captain','tailor','scout']],[42.4,43.8,['captain','tailor','scout','turtle']],
  [50.2,51.5,['turtle','scout']],[55.4,57.4,['captain','tailor','scout','turtle']]];
const HAND={rest:[25,-50], hold:[24,-66], sip:[8,-97], cheer:[30,-140], reach:[44,-90], pour:[44,-92], wave:[34,-128], grab:[46,-58]};
const TILT={sip:-38, pour:0, cheer:-8};

/* ---------- scene ---------- */
function scene(){
  const tiles=[...Array(15)].map((_,i)=>{ const x=-200+i*120; return `<path d="M${x} 212 L${640+(x-640)*2.2} 300"/>`; }).join('');
  const snacks=[...Array(12)].map((_,i)=>`<rect x="${1020+(i%3)*24}" y="${92+Math.floor(i/3)*24}" width="16" height="14" rx="2" fill="${['#ff7eb6','#f5b84a','#4ad6f5','#4af5a0','#b98cff','#ff5c6c'][i%6]}" opacity=".85"/>`).join('');
  return `
  <defs>
    <linearGradient id="cf-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151d36"/><stop offset="1" stop-color="#1d2746"/></linearGradient>
    <linearGradient id="cf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a5c"/><stop offset=".7" stop-color="#5b4a8a"/><stop offset="1" stop-color="#e79a7a"/></linearGradient>
    <linearGradient id="cf-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141b30"/><stop offset="1" stop-color="#0b1020"/></linearGradient>
    <radialGradient id="cf-glow"><stop offset="0" stop-color="#ffd890" stop-opacity=".32"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>
    <clipPath id="cf-win"><rect x="470" y="34" width="330" height="112" rx="6"/></clipPath>
  </defs>
  <rect x="-800" y="-800" width="2800" height="1012" fill="url(#cf-wall)"/>
  <rect x="-800" y="168" width="2800" height="44" fill="#18203a"/><path d="M-800 168 H2000" stroke="#2a3558" stroke-width="2"/>
  <rect x="-800" y="212" width="2800" height="400" fill="url(#cf-floor)"/>
  <g stroke="#1c2540" stroke-width="1.2">${tiles}<path d="M-800 238 H2000 M-800 270 H2000"/></g>
  <!-- window with a dusk skyline -->
  <rect x="464" y="28" width="342" height="124" rx="9" fill="#2a3558"/>
  <g clip-path="url(#cf-win)">
    <rect x="470" y="34" width="330" height="112" fill="url(#cf-sky)"/>
    <g class="cloud" fill="#f4d9e8" opacity=".35"><ellipse cx="520" cy="62" rx="26" ry="7"/><ellipse cx="540" cy="57" rx="16" ry="7"/><ellipse cx="690" cy="76" rx="30" ry="6"/></g>
    <path d="M470 146 V112 h22 v-16 h18 v24 h14 v-34 h24 v30 h16 v-14 h20 v40 h10 v-50 h26 v38 h18 v-20 h22 v30 h16 v-44 h20 v26 h26 v-12 h22 v34 h16 V146z" fill="#0f1630"/>
    <g fill="#ffd76a" opacity=".7"><rect x="526" y="96" width="3" height="3"/><rect x="536" y="104" width="3" height="3"/><rect x="606" y="88" width="3" height="3"/>
      <rect x="664" y="110" width="3" height="3"/><rect x="712" y="98" width="3" height="3"/><rect x="760" y="106" width="3" height="3"/><rect x="616" y="100" width="3" height="3"/></g>
  </g>
  <path d="M635 28 v124 M464 90 h342" stroke="#2a3558" stroke-width="5"/>
  <!-- clock -->
  <circle cx="390" cy="70" r="20" fill="#e8ecf7"/><circle cx="390" cy="70" r="20" fill="none" stroke="#2a3558" stroke-width="4"/>
  <line id="cf-hh" x1="390" y1="70" x2="390" y2="60" stroke="#141a2c" stroke-width="2.6" stroke-linecap="round"/>
  <line id="cf-mh" x1="390" y1="70" x2="390" y2="55" stroke="#141a2c" stroke-width="1.6" stroke-linecap="round"/>
  <!-- menu board -->
  <rect x="868" y="44" width="124" height="96" rx="6" fill="#1f2b26" stroke="#5a3f2a" stroke-width="5"/>
  <g font-family="'JetBrains Mono',monospace" fill="#e8ecf7" opacity=".85" font-size="10.5"><text x="884" y="64" fill="#ffd76a" font-size="11">TODAY</text>
    <text x="884" y="83">cold brew</text><text x="884" y="99">matcha boba</text><text x="884" y="115">donuts</text><text x="884" y="131" fill="#ff7eb6">croissants</text></g>
  <!-- lamps over the table -->
  <g stroke="#2a3558" stroke-width="2"><path d="M580 -800 V30 M720 -800 V30"/></g>
  <path d="M564 42 q16 -16 32 0z M704 42 q16 -16 32 0z" fill="#f5b84a"/>
  <ellipse cx="580" cy="170" rx="120" ry="110" fill="url(#cf-glow)" class="lamp"/><ellipse cx="720" cy="170" rx="120" ry="110" fill="url(#cf-glow)" class="lamp"/>
  <!-- snack machine -->
  <rect x="1006" y="70" width="100" height="142" rx="6" fill="#26304f"/><rect x="1014" y="82" width="70" height="104" rx="3" fill="#0f1630"/>${snacks}
  <rect x="1090" y="90" width="9" height="30" rx="2" fill="#4ad6f5" opacity=".6"/><rect x="1020" y="192" width="60" height="12" rx="2" fill="#0b1020"/>
  <!-- plant -->
  <path d="M1150 212 l-6 -34 h28 l-6 34z" fill="#8a5a3a"/>
  <g fill="#2f8f5b"><path d="M1158 178 q-24 -16 -18 -46 q14 18 18 46z"/><path d="M1158 178 q20 -22 12 -54 q-14 22 -12 54z"/><path d="M1158 178 q-4 -34 6 -60 q8 30 -6 60z"/></g>`;
}
function stationSvg(){ // coffee counter (in front of the wall, at the agents' depth)
  return `<rect x="96" y="210" width="146" height="78" rx="4" fill="#3a2c26"/><rect x="96" y="206" width="146" height="8" rx="3" fill="#5a4034"/>
  <rect x="134" y="128" width="84" height="78" rx="8" fill="#c9cfdd"/><rect x="140" y="134" width="72" height="26" rx="5" fill="#26304f"/>
  <circle cx="152" cy="147" r="4" fill="#ff5c6c" class="led"/><text x="162" y="151" font-family="'JetBrains Mono',monospace" font-size="9" fill="#4ad6f5">BREW</text>
  <rect x="192" y="160" width="20" height="12" rx="3" fill="#8a93aa"/>
  <rect id="cf-pour" x="200" y="172" width="3" height="20" rx="1.5" fill="#6b3d20" opacity="0"/>
  <rect x="110" y="190" width="14" height="16" rx="2" fill="#f4f6ff"/><rect x="108" y="184" width="18" height="6" rx="2" fill="#f4f6ff" opacity=".8"/>
  <g fill="#f4f6ff" opacity=".9"><rect x="226" y="194" width="10" height="12" rx="2"/></g>`;
}
function tableSvg(){ // high table the agents stand behind, with snacks on top
  return `<ellipse cx="640" cy="290" rx="250" ry="10" fill="#000" opacity=".25"/>
  <rect x="402" y="226" width="476" height="9" rx="4" fill="#6b4a3a"/>
  <rect x="412" y="235" width="456" height="54" rx="3" fill="#3a2c26"/>
  <path d="M412 247 H868" stroke="#2c211c" stroke-width="2"/>
  <!-- donut box -->
  <path d="M672 226 l4 -12 h48 l4 12z" fill="#f4d4a8"/><path d="M676 214 h48 l-6 -16 h-36z" fill="#ffe7c4"/>
  <circle cx="688" cy="219" r="5" fill="#ff8fc0"/><circle cx="702" cy="219" r="5" fill="#d9944f"/><circle cx="714" cy="219" r="5" fill="#4ad6f5"/>
  <!-- croissant plate -->
  <ellipse cx="626" cy="225" rx="26" ry="4" fill="#e8ecf7"/>
  <g id="cf-cro"><path d="M612 222 q14 -14 28 0 q-14 -4 -28 0z" fill="#e0a050"/><path d="M618 218 l3 3 M626 215 v5 M634 218 l-3 3" stroke="#b8763a" stroke-width="1.2"/></g>
  <!-- cookie jar, napkins, sugar -->
  <g transform="translate(400 0)"><rect x="452" y="200" width="26" height="26" rx="6" fill="#d7f5e3" opacity=".55"/><rect x="450" y="196" width="30" height="6" rx="3" fill="#2f8f5b"/>
  <circle cx="460" cy="218" r="4" fill="#c8843a"/><circle cx="470" cy="214" r="4" fill="#c8843a"/><circle cx="465" cy="208" r="4" fill="#c8843a"/></g>
  <rect x="760" y="214" width="18" height="12" rx="2" fill="#f4f6ff"/><rect x="420" y="210" width="10" height="16" rx="3" fill="#e8ecf7"/>
  <rect x="540" y="214" width="12" height="12" rx="2" fill="#f4f6ff"/><g transform="translate(546 226)">${steam(-3,-14)}</g>`;
}

/* ---------- build ---------- */
const svg=document.createElementNS(NS,'svg');
svg.setAttribute('role','img');
svg.setAttribute('aria-label','Break room: Captain, Scout, Tailor and Turtle chat over coffee, donuts and croissants, make a toast, then head back to work.');
svg.innerHTML=scene()+stationSvg()+`<g id="cf-chars">${['tailor','captain','scout','turtle'].map(charSvg).join('')}</g>`+tableSvg()+
  `<g id="cf-fx"></g><g id="cf-bubbles" font-family="Inter,system-ui,sans-serif" font-size="12.5" aria-hidden="true"></g>`;
host.prepend(svg);
const $=(s,r=svg)=>r.querySelector(s);
const R={};
for(const k in C){ const g=$('#ch-'+k);
  R[k]={g, flip:$('.flip',g), legL:$('.legL',g), legR:$('.legR',g), body:$('.body',g), head:$('.head',g),
    armB:$('.armB path',g), handB:$('.armB circle',g), armF:$('.armF path',g), handF:$('.armF > circle',g), item:$('.item',g),
    blink:$('.blink',g), happy:$('.happy',g), talk:$('.talk',g), mouth:$('.talk .m',g), bite:$('.bite',g)}; }
const pourEl=$('#cf-pour'), croEl=$('#cf-cro'), mh=$('#cf-mh'), hh=$('#cf-hh'), fx=$('#cf-fx'), bubbles=$('#cf-bubbles');

/* ---------- helpers ---------- */
const ease=u=>u<0?0:u>1?1:u*u*(3-2*u);
function track(keys,t){ // linear x between keys; returns [x, facing, moving]
  for(let i=0;i<keys.length-1;i++){ const [t0,x0,f0]=keys[i],[t1,x1,f1]=keys[i+1];
    if(t>=t0&&t<t1){ const u=(t-t0)/(t1-t0); return x0===x1?[x0,f0,false]:[x0+(x1-x0)*u, x1>x0?1:-1, true]; } }
  const k=keys[keys.length-1]; return [k[1],k[2],false];
}
function poseAt(list,t){ let i=0; while(i+1<list.length&&list[i+1][0]<=t) i++;
  const cur=list[i][1], prev=i?list[i-1][1]:list[list.length-1][1]; return [prev,cur,ease((t-list[i][0])/.45)]; }
function ik(sx,sy,tx,ty,out){ // two-bone arm, elbow bends outward/down
  const L=22, dx=tx-sx, dy=ty-sy; let d=Math.hypot(dx,dy); d=Math.min(Math.max(d,4),2*L-.5);
  const a=Math.atan2(dy,dx), b=Math.acos(Math.min(1,d/(2*L)))*out;
  return [sx+L*Math.cos(a+b), sy+L*Math.sin(a+b), sx+Math.cos(a)*d, sy+Math.sin(a)*d];
}
function setArm(path,hand,sx,sy,tx,ty,out){ const [ex,ey,hx,hy]=ik(sx,sy,tx,ty,out);
  path.setAttribute('d',`M${sx} ${sy} L${ex.toFixed(1)} ${ey.toFixed(1)} L${hx.toFixed(1)} ${hy.toFixed(1)}`);
  hand.setAttribute('cx',hx.toFixed(1)); hand.setAttribute('cy',hy.toFixed(1)); return [hx,hy]; }
const vis=(el,on)=>el.setAttribute('visibility',on?'visible':'hidden');

/* ---------- bubbles ---------- */
let VB={x:0,w:1200,y:0,h:300};
const bubbleEls=SAY.map(([,, who,text])=>{
  const g=document.createElementNS(NS,'g'); g.style.opacity=0;
  g.innerHTML=`<path class="tail" fill="#f4f6ff"/><rect rx="11" fill="#f4f6ff" stroke="${C[who].c}" stroke-width="2"/>
    <circle r="3.5" fill="${C[who].c}"/><text fill="#141a2c" font-weight="500">${text}</text>`;
  bubbles.append(g); return g; });
let measured=false;
function measure(){ bubbleEls.forEach(g=>{ let w; try{ w=$('text',g).getComputedTextLength(); }catch(e){} g._w=(w||$('text',g).textContent.length*6.6)+34; }); measured=true; }
function drawBubble(g,x,headTop,a){
  const w=g._w, h=24, by=headTop-h-12, lo=VB.x+8, hi=VB.x+VB.w-8-w;
  const bx=Math.max(lo,Math.min(hi,x-w/2));
  g.style.opacity=a; g.setAttribute('transform',`translate(0 ${((1-a)*6).toFixed(1)})`);
  const r=$('rect',g); r.setAttribute('x',bx); r.setAttribute('y',by); r.setAttribute('width',w); r.setAttribute('height',h);
  const tx=Math.max(bx+14,Math.min(bx+w-14,x));
  $('.tail',g).setAttribute('d',`M${tx-6} ${by+h-1} L${tx+2} ${by+h+9} L${tx+7} ${by+h-1}z`);
  const c=$('circle',g); c.setAttribute('cx',bx+13); c.setAttribute('cy',by+h/2);
  const t=$('text',g); t.setAttribute('x',bx+23); t.setAttribute('y',by+h/2+4.4);
}

/* ---------- frame ---------- */
const sparks=[];
function render(t){
  if(!measured) measure();
  const laughing={}; for(const [a,b,who] of LAUGH) if(t>=a&&t<b) who.forEach(w=>laughing[w]=(t-a));
  const talking={}; SAY.forEach(([a,b,who])=>{ if(t>=a&&t<b-.3) talking[who]=true; });
  const pos={};
  for(const k in C){ const r=R[k], s=S[k];
    let [x,f,moving]=track(s.moves,t); pos[k]=x;
    const slow=k==='turtle'?.55:1, ph=t*9*slow;
    const bob=moving?Math.abs(Math.sin(ph))*2.4:Math.sin(t*2+x)*.6;
    const lb=laughing[k]!=null?Math.abs(Math.sin(laughing[k]*11))*2.6:0;
    r.g.setAttribute('transform',`translate(${x.toFixed(1)} ${FLOOR})`);
    r.flip.setAttribute('transform',`scale(${f} 1)`);
    r.legL.setAttribute('transform',`translate(0 ${moving?(-Math.max(0,Math.sin(ph))*5).toFixed(1):0})`);
    r.legR.setAttribute('transform',`translate(0 ${moving?(-Math.max(0,-Math.sin(ph))*5).toFixed(1):0})`);
    r.body.setAttribute('transform',`translate(0 ${(-bob-lb).toFixed(1)})`);
    const talk=talking[k], tilt=laughing[k]!=null?-6+Math.sin(laughing[k]*11)*2:talk?Math.sin(t*3)*3:Math.sin(t*.9+x)*1.5;
    r.head.setAttribute('transform',`rotate(${tilt.toFixed(1)} 0 ${NECK})`);
    // front hand
    const [p0,p1,u]=poseAt(s.poses,t), A=HAND[p0], B=HAND[p1];
    let hx=A[0]+(B[0]-A[0])*u, hy=A[1]+(B[1]-A[1])*u;
    if(p1==='wave'){ hx+=Math.sin(t*14)*5; }
    if(moving&&p1==='hold'){ hy+=Math.sin(ph)*1.2; }
    const dy=-bob-lb;
    const [fx_,fy_]=setArm(r.armF,r.handF,SH,-86+dy,hx,hy+dy,1);
    const tl=(TILT[p0]||0)+((TILT[p1]||0)-(TILT[p0]||0))*u;
    r.item.setAttribute('transform',`translate(${fx_.toFixed(1)} ${fy_.toFixed(1)}) rotate(${tl.toFixed(1)})`);
    // back hand: swings while walking, holds the belly while laughing
    let bx=-25, by=-50; if(moving){ bx+=Math.sin(ph)*5; by+=Math.abs(Math.cos(ph))*-2; }
    if(laughing[k]!=null){ bx=-10; by=-62; }
    setArm(r.armB,r.handB,-SH,-86+dy,bx,by+dy,-1);
    // face
    const blinkOn=C[k].blink && ((t*1000+k.length*937)%4100)<130 && laughing[k]==null;
    vis(r.blink,blinkOn); vis(r.happy,laughing[k]!=null&&C[k].blink);
    const mouthOpen=(talk&&Math.sin(t*22+k.length)>-.2)||(laughing[k]!=null);
    vis(r.talk,mouthOpen);
    if(mouthOpen) r.mouth.setAttribute('transform',`translate(50 71.5) scale(1 ${talk?(.65+.35*Math.abs(Math.sin(t*17))).toFixed(2):1}) translate(-50 -71.5)`);
  }
  // props
  R.scout.bite.style.display=t>=33.6?'':'none';
  croEl.style.opacity=t>=50&&t<62.5?0:t>=62.5?((t-62.5)/1.5).toFixed(2):1;
  pourEl.setAttribute('opacity',(t>.5&&t<3)||(t>62&&t<63.9)?.9:0);
  mh.setAttribute('transform',`rotate(${(t/LOOP*360).toFixed(1)} 390 70)`);
  hh.setAttribute('transform',`rotate(${(90+t/LOOP*30).toFixed(1)} 390 70)`);
  // bubbles
  SAY.forEach(([a,b,who],i)=>{ const g=bubbleEls[i];
    if(t<a||t>=b){ if(g.style.opacity!=='0') g.style.opacity=0; return; }
    const al=Math.min(1,(t-a)/.25,(b-t)/.25); drawBubble(g,pos[who],FLOOR-170,al); });
  // toast sparkles
  const cheer=t>=55.6&&t<57.4;
  if(cheer&&!sparks.length) for(const k in C) for(let i=0;i<3;i++){ const s=document.createElementNS(NS,'path');
    s.setAttribute('d','M0 -5 L1.3 -1.3 L5 0 L1.3 1.3 L0 5 L-1.3 1.3 L-5 0 L-1.3 -1.3z'); s.setAttribute('fill',['#ffd76a','#fff',C[k].c][i]);
    fx.append(s); sparks.push({s,k,i}); }
  if(cheer) sparks.forEach(({s,k,i})=>{ const u=(t-55.6+i*.3)%1.2, x=pos[k]+(S[k].moves&&track(S[k].moves,t)[1])*30+(i-1)*12, y=FLOOR-150-u*22;
    s.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(1-u/1.2).toFixed(2)})`); });
  else if(sparks.length){ sparks.forEach(({s})=>s.remove()); sparks.length=0; }
}

/* ---------- fit: crop the wide scene to the card ---------- */
function fit(){
  const W=host.clientWidth, H=host.clientHeight; if(!W||!H) return;
  // Show the whole room (0..1200 wide, 300 tall) when the card is wide; on tall cards add wall above,
  // and on phones crop the sides to the table so the agents stay readable.
  const a=W/H, minW=W<700?620:1060; let w=Math.min(Math.max(300*a,minW),1360), h=w/a;
  if(h<240){ h=240; w=h*a; }
  const cx=640;
  VB={x:cx-w/2, y:300-h, w, h};
  svg.setAttribute('viewBox',`${VB.x.toFixed(1)} ${VB.y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
}
new ResizeObserver(fit).observe(host); fit();

/* ---------- loop: runs only while visible ---------- */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){ host.classList.add('still'); render(56.2); return; }
let shown=true, raf=0, t0=performance.now(), paused=0, lastDraw=0;
function tick(now){ raf=requestAnimationFrame(tick);
  if(now-lastDraw<33) return; lastDraw=now;                // ~30fps is plenty
  render(((now-t0)/1000)%LOOP); }
function run(on){ if(on&&!raf){ t0+=performance.now()-paused; raf=requestAnimationFrame(tick); }
  else if(!on&&raf){ cancelAnimationFrame(raf); raf=0; paused=performance.now(); } }
new IntersectionObserver(es=>{ shown=es[0].isIntersecting; run(shown&&!document.hidden); }).observe(host);
document.addEventListener('visibilitychange',()=>run(shown&&!document.hidden));
paused=performance.now(); render(0); run(true);
})();
