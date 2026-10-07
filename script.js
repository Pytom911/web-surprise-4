const NAME="Sayang";
const SONGS=[
 {t:"Blessed",src:encodeURI("assets/audio/essed - daniel caesar.mp3")},
 {t:"Superpowers",src:encodeURI("assets/audio/superpowers - daniel caesar.mp3")}
];
const PHOTOS=Array.from({length:8},(_,i)=>`assets/photo${i+1}.jpeg`);
const PIECES=[
 ["01","My Favorite Person","Sometimes i still wonder how i got so lucky to have you. Out of all the people in this world, somehow my heart found yours."],
 ["02","Come Here, Love","If your day ever feels too heavy, come here, okay? You don’t have to explain everything. Let me love you quietly."],
 ["03","You, Always","I hope you know that i notice the little things about you. Those tiny pieces of you have become my favorite things."],
 ["04","Please Stay","I don’t need perfect days. I just want more ordinary days with you. More silly conversations and moments where i think, 'that’s my person'."],
 ["05","If You Ever Forget","If you ever forget how loved you are, let me remind you. You are loved on your happiest days and your quietest days."],
 ["06","My Sweetest Thing","If someone asked me my favorite place, i’d say, 'wherever you are.' Everything feels more like home when it’s you."]
];
const HATES=[
 "1. i hate how you somehow make me smile even when i’m trying so hard not to.",
 "2. i hate how you make me miss you even when we’ve only been apart for a little while.",
 "3. i hate how easily you make my heart melt just by calling me 'sayang'.",
 "4. i hate how you’re always on my mind, even when i’m supposed to be doing something else.",
 "5. i hate how you make me feel so safe that i forget how to be without you.",
 "6. i hate how your little habits have somehow become things i secretly look forward to.",
 "7. i hate how you can make the worst days feel a little softer just by being there.",
 "8. i hate how i keep falling for you over and over again, as if i never learned my lesson.",
 "9. i hate how no matter how many times i say 'i love you', it still never feels like enough.",
 "10. and most of all, i hate that i can’t actually hate you at all."
];
const COUPONS=[
 ["fa-heart","Kupon Peluk Sepuasnya","Berlaku kapan saja, tanpa syarat. Boleh minta nambah."],
 ["fa-utensils","Kupon Makan Enak","Bebas pilih menu dan tempat, aku yang bayar."],
 ["fa-moon","Kupon Temenin Begadang","Bebas curhat atau main game bareng sampai pagi."]
];

const $=s=>document.querySelector(s);
document.querySelectorAll('[data-name]').forEach(e=>e.textContent=NAME);

// Loading
let p=0;const iv=setInterval(()=>{p=Math.min(100,p+Math.random()*15+5);$('#bar').style.width=p+'%';$('#pct').textContent=Math.floor(p)+'%';if(p>=100){clearInterval(iv);setTimeout(()=>{$('#loader').classList.add('done');scatter()},600)}},250);

// Build Content
$('#pieces').innerHTML=PIECES.map(([n,t,d])=>`<div class="card p-6 border-sky/30 hover:-translate-y-2 transition-all"><span class="text-4xl font-script text-sky mb-2 block">${n}</span><h3 class="font-bold text-xl text-deeprose mb-2">${t}</h3><p class="text-ink/80 text-sm leading-relaxed">${d}</p></div>`).join('');
const frame=(u,i)=>`<div class="frame shadow-inner"><img src="${u}" alt="Kenangan ${i+1}" loading="lazy"></div>`;
$('#strips').innerHTML=[0,1].map(s=>`<div class="strip ${s?'rotate-2':'-rotate-2'} shadow-2xl">${PHOTOS.slice(s*4,s*4+4).map((u,i)=>frame(u,s*4+i)).join('')}<p class="font-script text-xl text-deeprose mt-2">${s?'Always You':'Our Story'}</p></div>`).join('');
$('#things').innerHTML=HATES.map(h=>`<div class="card p-4 border-l-4 border-rose text-ink/90 font-medium text-sm hover:translate-x-1 transition-transform">${h}</div>`).join('');
$('#coupons').innerHTML=COUPONS.map(([i,t,d])=>`<div class="card p-5 flex gap-4 items-center border-dashed border-2 border-rose/40 hover:bg-white transition-colors"><div class="w-12 h-12 rounded-full bg-blush flex items-center justify-center text-deeprose text-xl shadow-inner"><i class="fa-solid ${i}"></i></div><div><h3 class="font-black text-ocean text-sm uppercase">${t}</h3><p class="text-xs text-ink/70 mt-1">${d}</p></div></div>`).join('');

// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));

// Petals
function scatter(){setInterval(()=>{const e=document.createElement('img');const src=['flower1.png','flower2.png','flower3.png','flower4.png'][Math.floor(Math.random()*4)];e.src='assets/'+src;e.className='petal opacity-80';e.style.left=Math.random()*100+'vw';const sz=(20+Math.random()*30);e.style.width=sz+'px';const d=6+Math.random()*6;e.style.animationDuration=d+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),d*1000)},800)}

// Burst
function burst(x,y,n=20){for(let i=0;i<n;i++){const e=document.createElement('img');const src=['flower1.png','flower2.png','popoyo1.png'][i%3];e.src='assets/'+src;e.className='burst';e.style.left=x+'px';e.style.top=y+'px';e.style.width=(20+Math.random()*20)+'px';e.style.setProperty('--x',(Math.random()*400-200)+'px');e.style.setProperty('--y',(Math.random()*-400-50)+'px');document.body.appendChild(e);setTimeout(()=>e.remove(),1400)}}

// Music
const au=$('#audio');let ti=0,playing=false;
function load(){au.src=SONGS[ti].src;$('#track').textContent=SONGS[ti].t}
function setIcon(){$('#play').innerHTML=`<i class="fa-solid ${playing?'fa-pause':'fa-play'}"></i>`}
function play(){au.play().then(()=>{playing=true;setIcon();$('#cover').classList.add('animate-spin-slow')}).catch(()=>{})}
load();
$('#play').onclick=()=>{if(playing){au.pause();playing=false;setIcon();$('#cover').classList.remove('animate-spin-slow')}else play()};
$('#next').onclick=()=>{ti=(ti+1)%SONGS.length;load();play()};
$('#start').onclick=e=>{play();burst(e.clientX,e.clientY);$('#letter').scrollIntoView({behavior:'smooth'})};

// Logic
$('#env').onclick=e=>{$('#paper').classList.toggle('open');burst(e.clientX,e.clientY,15)};
$('#giftbox').onclick=e=>{$('#giftbox').classList.add('open');$('#coupons').classList.add('open');burst(e.clientX,e.clientY,25)};
$('#yes').onclick=e=>{$('#answer').classList.remove('hidden');burst(e.clientX,e.clientY,50);$('#no').style.display='none'};
const no=$('#no');
function dodge(){no.style.position='absolute';no.style.left=Math.random()*80+'%';no.style.top=Math.random()*60+'px'}
no.onmouseenter=dodge;no.ontouchstart=e=>{e.preventDefault();dodge()};
