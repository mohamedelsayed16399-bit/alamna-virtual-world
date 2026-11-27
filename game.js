'use strict';
/* ===================== helpers ===================== */
const $=id=>document.getElementById(id);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=n=>Array.from({length:n},()=>'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*31)]).join('');
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function toast(msg,ms=2200){const t=$('toast');t.textContent=msg;t.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>t.style.display='none',ms)}
const BODY=['#e8590c','#2f9e44','#3b5bdb','#9c36b5','#e03131','#f08c00','#0c8599','#495057','#d6336c','#1098ad','#74b816','#f783ac','#f2c94c','#dee2e6','#38d9a9','#845ef7','#ff8787','#1864ab','#ffd43b','#212529','#ff1fa9','#00b894','#6c5ce7','#fdcb6e','#e84393','#00cec9','#a3cb38','#b53471','#2d3436','#ff9f43'];const CLV={12:4,13:7,14:10,15:13,16:16,17:19,18:22,19:25,20:30,21:33,22:36,23:40,24:44,25:48,26:52,27:56,28:60,29:64};
const HEAD=['#ffd8a8','#f1b98a','#d9a066','#a9744f','#7a4b2a','#ffe3e3','#8ce99a','#74c0fc','#d0a2f7','#ffd43b'];
const HATS=['بدون','كاب','تاج','طاقية','هوائي','نظارة','قرون','طربوش','شعر ملون','هالة','أجنحة','تاج ملكي','أذن قطة','قبعة ساحر','كعكة','سماعات','نجمة','تاج ورد','خوذة فضاء','قبعة صياد','قبعة قرصان','خوذة فايكنج','تاج جواهر','قبعة نحلة','تاج المستكشف','قبعة الجنرال','تاج الأسطورة','إكليل النجوم','قبعة الشيف','تاج الجليد','هالة العظماء','تاج المئة','تاج البرق','قوس قزح','تاج اللهب','قبعة التخرج','قبعة بيتزا','تاج الجليد','قبعة الحفلة','تاج الكواكب','تاج الأسطورة','قبعة الطباخ','قبعة الشرطي','تاج الشمس','تاج الصقيع','قبعة المهرج','خوذة فارس'];const LVH={25:3,26:5,27:8,28:10,29:12,30:15,32:18,33:22,34:26,35:28,36:32,37:36,38:40,39:45,40:50,41:52,42:56,43:60,44:64,45:68,46:72};
const HPRICE={9:60,10:120,11:250,12:40,13:90,14:30,15:70,16:50,17:60,18:110,19:35,20:55,21:65,22:140,23:30,24:99999,25:99999,26:99999,27:99999,28:99999,29:99999,30:99999,32:99999,33:99999,34:99999,35:99999,36:99999,37:99999,38:99999,39:99999,40:99999,41:99999,42:99999,43:99999,44:99999,45:99999,46:99999};
const FLOORS=['#c8a27a','#8d99ae','#b7e4c7','#f4acb7','#6c757d','#2b2d42','#ffe066','#74c0fc','#a9e34b','#d0bfff','#e8590c','#1864ab','#5c940d','#862e9c','#f8f9fa','#212529','#e63946','#40c057','#ffa8a8','#3bc9db','#7048e8','#f59f00','#099268','#495057','#e64980','#15aabf','#82c91e','#5f3dc4','#8d5524','#0b7285','#c9ada7','#14213d','#bc6c25','#277da1'];
const WALLS=['#f1faee','#ffe8d6','#cdeac0','#bde0fe','#e0aaff','#fff3bf','#ffc9c9','#c5f6fa','#343a40','#fcc2d7','#ffd8a8','#a5d8ff','#b2f2bb','#eebefa','#868e96','#1b1f3b','#fff9db','#d3f9d8','#e5dbff','#ffdeeb','#ffec99','#c3fae8','#d0ebff','#f3d9fa','#ffe3e3','#e3fafc','#f4fce3','#e9ecef','#ffe8cc','#2b8a3e','#fdffb6','#9bf6ff','#ffd6a5','#caffbf'];
const TRICKS=['🤸','🦘','🙏','🌀','💤','🎶','🔝','🤾','🛹','🪂'];const EMOJIS=['👋','😂','❤️','💃','👍','😮','🎉','😴','🍵','☕','🧃','🏆','🔥','😎','🎈','🌟','🥳','🤩','🫶','🚀','👑','🦄','🌈','💎','🐉','🎸','🛸','🔮','🧙','🏅','🌠','🧞','🦸','🎇','🧚','🦚','🌋'];const LEMO=[['🥳',2],['🤩',3],['🫶',4],['🚀',6],['👑',9],['🦄',11],['🌈',13],['💎',16],['🐉',20],['🎸',24],['🛸',28],['🔮',32],['🧙',36],['🏅',40],['🌠',44],['🧞',48],['🦸',52],['🎇',56],['🧚',60],['🦚',64],['🌋',68]];
let AC=null;
function setVol(){if(AC&&AC._mg)AC._mg.gain.value=me&&me.vol!=null?me.vol:1}
(function(){const _c=AudioNode.prototype.connect;AudioNode.prototype.connect=function(d,...a){if(AC&&d===AC.destination){if(!AC._mg){AC._mg=AC.createGain();_c.call(AC._mg,AC.destination)}setVol();return _c.call(this,AC._mg,...a)}return _c.call(this,d,...a)}})();
function sfx(k){if(me&&me.mute)return;try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();const seq={star:[[880,.08],[1320,.12]],chat:[[620,.05]],place:[[300,.07]],win:[[660,.1],[880,.1],[1320,.2]],err:[[200,.15]],drink:[[500,.06],[700,.08]],tick:[[900,.04]]}[k]||[];let t=AC.currentTime;for(const[f,d]of seq){const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d);t+=d*.9}}catch(e){}}
let jukeT=null;
function jukebox(){if(jukeT){clearInterval(jukeT);jukeT=null;toast('🎵 وقفت الموسيقى');return}const sc=[523,587,659,784,880,784,659,587];let i=0;jukeT=setInterval(()=>{try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=sc[i%8]*(i%16<8?1:0.75);i++;g.gain.setValueAtTime(.1,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.35);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.36)}catch(e){}},380);toast('🎵 شغّلت الموسيقى')}
addEventListener('pointerdown',()=>{try{if(AC&&AC.state==='suspended')AC.resume()}catch(e){}},{passive:true});
/* ===================== profile ===================== */
const DEFAULT_ITEMS=[['rug',5,6,0],['sofa',3,3,0],['plant',1,1,0]];
let me;
try{me=JSON.parse(localStorage.getItem('ealam_me')||'null')}catch(e){me=null}
if(!me||!me.id){me={id:rnd(6),name:'زائر'+Math.floor(Math.random()*900+100),body:Math.floor(Math.random()*12),head:0,hat:0,coins:150,floor:0,wall:0,items:DEFAULT_ITEMS.map(a=>a.slice()),friends:[],best:0}}
if(!Array.isArray(me.items))me.items=DEFAULT_ITEMS.map(a=>a.slice());if(!Array.isArray(me.friends))me.friends=[];me.best=me.best||0;if(!Array.isArray(me.owned))me.owned=[];if(!me.daily||typeof me.daily!=='object')me.daily={d:'',streak:0};me.coins=Math.max(0,+me.coins||0);
function saveMe(){try{localStorage.setItem('ealam_me',JSON.stringify(me))}catch(e){}updCoins()}
function updCoins(){$('coins').textContent='🪙 '+me.coins}
/* ===================== three setup ===================== */
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
function applyQ(){renderer.setPixelRatio((me&&me.lq)||window.autoLQ?1:Math.min(devicePixelRatio||1,1.75));renderer.setSize(innerWidth,innerHeight,false)}
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(50,1,0.1,200);
const hemi=new THREE.HemisphereLight(0xffffff,0x556677,0.85);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,0.7);sun.position.set(10,20,8);scene.add(sun);
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
const geoCache={},matCache={};
const G={
box:(w,h,d)=>geoCache['b'+w+'_'+h+'_'+d]||(geoCache['b'+w+'_'+h+'_'+d]=new THREE.BoxGeometry(w,h,d)),
cyl:(a,b,h,s=12)=>geoCache['c'+a+'_'+b+'_'+h+'_'+s]||(geoCache['c'+a+'_'+b+'_'+h+'_'+s]=new THREE.CylinderGeometry(a,b,h,s)),
sph:(r,s=14)=>geoCache['s'+r+'_'+s]||(geoCache['s'+r+'_'+s]=new THREE.SphereGeometry(r,s,Math.max(8,s-4))),
cone:(r,h,s=8)=>geoCache['n'+r+'_'+h+'_'+s]||(geoCache['n'+r+'_'+h+'_'+s]=new THREE.ConeGeometry(r,h,s)),
};
function M(c,em){const k=c+(em||'');return matCache[k]||(matCache[k]=new THREE.MeshLambertMaterial(em?{color:c,emissive:em}:{color:c}))}
function mesh(g,c,x=0,y=0,z=0,em){const m=new THREE.Mesh(g,M(c,em));m.position.set(x,y,z);return m}
function labelSprite(text,opts={}){
const cv=document.createElement('canvas');cv.width=256;cv.height=64;const x=cv.getContext('2d');
x.font='bold 30px system-ui,Arial';x.textAlign='center';x.textBaseline='middle';x.direction='rtl';
const w=Math.min(250,x.measureText(text).width+24);
x.fillStyle=opts.bg||'rgba(16,24,48,.72)';
const r=22;x.beginPath();x.moveTo(128-w/2+r,6);x.arcTo(128+w/2,6,128+w/2,58,r);x.arcTo(128+w/2,58,128-w/2,58,r);x.arcTo(128-w/2,58,128-w/2,6,r);x.arcTo(128-w/2,6,128+w/2,6,r);x.fill();
x.fillStyle=opts.fg||'#fff';x.fillText(text,128,34,236);
const t=new THREE.CanvasTexture(cv);t.minFilter=THREE.LinearFilter;
const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));
s.scale.set(opts.s||2.6,(opts.s||2.6)/4,1);s.renderOrder=10;return s;
}
function emojiSprite(e){
const cv=document.createElement('canvas');cv.width=96;cv.height=96;const x=cv.getContext('2d');x.font='70px serif';x.textAlign='center';x.textBaseline='middle';x.fillText(e,48,54);
const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthTest:false}));s.scale.set(1,1,1);s.renderOrder=11;return s;
}
/* ===================== avatar ===================== */
const AVM=new THREE.MeshLambertMaterial({vertexColors:true});
function mergeAvatar(g){
if(location.search.indexOf('nomerge')>=0)return;
g.updateMatrixWorld(true);const P=[],N=[],C=[],rm=[],feet=g.userData.feet;
for(const o of g.children){if(!o.isMesh||feet.includes(o)||!o.material.isMeshLambertMaterial)continue;
const geo=(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone());geo.applyMatrix4(o.matrix);
const pa=geo.attributes.position.array,na=geo.attributes.normal.array,col=o.material.color,em=o.material.emissive;
const r=Math.min(1,col.r+em.r),gg=Math.min(1,col.g+em.g),b=Math.min(1,col.b+em.b);
P.push(pa);N.push(na);const ca=new Float32Array(pa.length);for(let i=0;i<pa.length;i+=3){ca[i]=r;ca[i+1]=gg;ca[i+2]=b}C.push(ca);rm.push(o)}
const cat=(arr)=>{let t=0;for(const a of arr)t+=a.length;const r=new Float32Array(t);let i=0;for(const a of arr){r.set(a,i);i+=a.length}return r};
for(const o of rm)g.remove(o);
const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(cat(P),3));geo.setAttribute('normal',new THREE.BufferAttribute(cat(N),3));geo.setAttribute('color',new THREE.BufferAttribute(cat(C),3));
g.add(new THREE.Mesh(geo,AVM));
}
function buildAvatar(a){
const g=new THREE.Group();
const bc=BODY[a.b%BODY.length]||BODY[0],hc=HEAD[a.h%HEAD.length]||HEAD[0];
const body=mesh(G.cyl(0.3,0.4,0.9),bc,0,0.75,0);g.add(body);
const head=mesh(G.sph(0.36),hc,0,1.5,0);g.add(head);
g.add(mesh(G.sph(0.06,8),0x111111,-0.13,1.55,0.31),mesh(G.sph(0.06,8),0x111111,0.13,1.55,0.31));
g.add(mesh(G.box(0.18,0.03,0.02),0x7a2a2a,0,1.4,0.34));
const arms=[];for(const sx of[-1,1]){const ar=new THREE.Group();ar.position.set(sx*0.4,1.1,0);ar.add(mesh(G.cyl(0.08,0.08,0.55,6),bc,0,-0.25,0),mesh(G.sph(0.09,6),hc,0,-0.55,0));g.add(ar);arms.push(ar)}
g.userData.arms=arms;
const fl=mesh(G.box(0.2,0.14,0.3),0x222222,-0.17,0.07,0.04),fr=mesh(G.box(0.2,0.14,0.3),0x222222,0.17,0.07,0.04);g.add(fl,fr);
g.userData.feet=[fl,fr];g.userData.body=body;
const h=a.a|0;
if(h===1){g.add(mesh(G.cyl(0.36,0.38,0.14),0x1971c2,0,1.82,0),mesh(G.box(0.4,0.04,0.3),0x1971c2,0,1.78,0.38))}
if(h===2){g.add(mesh(G.cyl(0.3,0.36,0.25,6),0xffd43b,0,1.95,0));for(let i=0;i<5;i++){const an=i/5*Math.PI*2;g.add(mesh(G.cone(0.07,0.16,4),0xffd43b,Math.cos(an)*0.3,2.15,Math.sin(an)*0.3))}}
if(h===3){g.add(mesh(G.sph(0.37,12),0xf8f9fa,0,1.68,0));g.children[g.children.length-1].scale.set(1,0.5,1)}
if(h===5){g.add(mesh(G.box(0.3,0.16,0.04),0x111111,-0.15,1.58,0.35),mesh(G.box(0.3,0.16,0.04),0x111111,0.15,1.58,0.35),mesh(G.box(0.1,0.03,0.04),0x111111,0,1.6,0.35))}
if(h===6){g.add(mesh(G.cone(0.08,0.4,6),0xe03131,-0.25,1.9,0),mesh(G.cone(0.08,0.4,6),0xe03131,0.25,1.9,0))}
if(h===7){g.add(mesh(G.cyl(0.26,0.32,0.32,12),0xc92a2a,0,1.9,0),mesh(G.cyl(0.02,0.02,0.2,6),0x111111,0,2.15,0),mesh(G.sph(0.07,6),0x111111,0,2.28,0))}
if(h===8){g.add(mesh(G.sph(0.4,10),0xcc5de8,0,1.72,-0.05));g.children[g.children.length-1].scale.set(1,0.6,1)}
if(h===9){const t=new THREE.Mesh(new THREE.TorusGeometry(0.28,0.04,6,18),new THREE.MeshBasicMaterial({color:0xffe066}));t.rotation.x=Math.PI/2;t.position.y=2.05;g.add(t)}
if(h===10){for(const sx of[-1,1]){const w=mesh(G.box(0.7,0.08,0.4),0xffffff,sx*0.55,1.1,-0.35);w.rotation.z=sx*-0.5;w.rotation.y=sx*0.3;g.add(w);const w2=mesh(G.box(0.5,0.07,0.3),0xdbe4ff,sx*0.5,0.8,-0.35);w2.rotation.z=sx*-0.4;g.add(w2)}}
if(h===11){g.add(mesh(G.cyl(0.34,0.4,0.3,8),0xffd43b,0,1.98,0,0x553d00));const cc=[0xff6b6b,0x4dabf7,0x69db7c,0xb197fc,0xff922b,0xf06595];for(let i=0;i<6;i++){const an=i/6*Math.PI*2;g.add(mesh(G.cone(0.09,0.3,4),0xffd43b,Math.cos(an)*0.34,2.28,Math.sin(an)*0.34,0x553d00),mesh(G.sph(0.06,6),cc[i],Math.cos(an)*0.34,2.46,Math.sin(an)*0.34,cc[i]))}}
if(h===13){g.add(mesh(G.cone(0.38,0.9,10),0x5f3dc4,0,2.2,0));g.add(mesh(G.cyl(0.55,0.55,0.05,12),0x5f3dc4,0,1.78,0));g.add(mesh(G.sph(0.08,6),0xffd43b,0.1,2.1,0.3,0x665500))}
if(h===14){g.add(mesh(G.cyl(0.3,0.34,0.22,12),0xf8f0e3,0,1.9,0));g.add(mesh(G.cyl(0.31,0.31,0.06,12),0xf783ac,0,2.04,0));g.add(mesh(G.sph(0.07,6),0xe03131,0,2.12,0))}
if(h===16){const st=mesh(G.cone(0.2,0.1,5),0xffd43b,0,2.15,0,0xaa8800);st.rotation.x=Math.PI;g.add(st,mesh(G.cone(0.2,0.3,5),0xffd43b,0,2.3,0,0xaa8800))}
if(h===17){for(let i=0;i<8;i++){const a=i/8*6.28;g.add(mesh(G.sph(0.1,6),[0xff6b9d,0xffd43b,0xf8f9fa,0xb197fc][i%4],Math.cos(a)*0.42,1.9,Math.sin(a)*0.42,0x331122))}g.add(mesh(G.cyl(0.4,0.4,0.05,12),0x2f9e44,0,1.86,0))}
if(h===18){const gl=mesh(G.sph(0.62,14),0xa5d8ff,0,1.62,0);gl.material=new THREE.MeshLambertMaterial({color:0xa5d8ff,transparent:true,opacity:0.35});g.add(gl,mesh(G.cyl(0.5,0.5,0.1,12),0xdee2e6,0,1.15,0))}
if(h===19){g.add(mesh(G.cyl(0.55,0.55,0.05,14),0xf4d58d,0,1.9,0),mesh(G.cyl(0.3,0.36,0.3,12),0xf4d58d,0,2.05,0),mesh(G.cyl(0.37,0.37,0.06,12),0xe03131,0,2.0,0),mesh(G.box(0.04,0.3,0.04),0xff922b,0.25,2.2,0.15))}
if(h===20){g.add(mesh(G.cyl(0.5,0.55,0.12,14),0x212529,0,1.85,0),mesh(G.sph(0.36,10),0x212529,0,2.0,0),mesh(G.box(0.2,0.2,0.04),0xf8f9fa,0,2.02,0.35),mesh(G.box(0.06,0.06,0.04),0xf8f9fa,0,2.02,0.35,0xaaaaaa))}
if(h===21){g.add(mesh(G.sph(0.46,12),0x868e96,0,1.9,0),mesh(G.cone(0.1,0.5,6),0xf8f0e3,0.5,2.05,0).rotateZ(-0.9),mesh(G.cone(0.1,0.5,6),0xf8f0e3,-0.5,2.05,0).rotateZ(0.9),mesh(G.box(0.1,0.2,0.04),0x495057,0,1.8,0.44))}
if(h===22){g.add(mesh(G.cyl(0.42,0.46,0.22,12),0xffd43b,0,1.9,0,0x664400));for(let i=0;i<5;i++){const a=i/5*6.283;g.add(mesh(G.cone(0.1,0.3,4),[0x74c0fc,0xf783ac,0xb197fc,0x69db7c,0xff6b6b][i],Math.cos(a)*0.4,2.15,Math.sin(a)*0.4,[0x74c0fc,0xf783ac,0xb197fc,0x69db7c,0xff6b6b][i]))}}
if(h===23){g.add(mesh(G.cyl(0.03,0.03,0.4,5),0x212529,-0.18,2.0,0.1),mesh(G.cyl(0.03,0.03,0.4,5),0x212529,0.18,2.0,0.1),mesh(G.sph(0.09,7),0xffd43b,-0.18,2.25,0.1,0x886600),mesh(G.sph(0.09,7),0xffd43b,0.18,2.25,0.1,0x886600),mesh(G.cyl(0.46,0.46,0.06,12),0xffd43b,0,1.78,0),mesh(G.cyl(0.47,0.47,0.04,12),0x212529,0,1.82,0))}
if(h===25){g.add(mesh(G.cyl(0.47,0.5,0.22,14),0x2f5d3a,0,1.86,0,0x113311),mesh(G.box(0.75,0.05,0.5),0x1c3d26,0,1.76,0.4),mesh(G.sph(0.1,7),0xffd43b,0,1.98,0.46,0x886600),mesh(G.box(0.5,0.04,0.04),0xffd43b,0,1.92,0.47,0x886600))}
if(h===26){g.add(mesh(G.cyl(0.46,0.5,0.22,14),0xffd43b,0,1.88,0,0xaa7700));for(let k=0;k<5;k++){const a=k/5*6.283;g.add(mesh(G.cone(0.1,0.42,4),0xffd43b,Math.cos(a)*0.4,2.2,Math.sin(a)*0.4,0xaa7700),mesh(G.sph(0.07,6),[0xff6b6b,0x4dabf7,0x69db7c,0xcc5de8,0xff922b][k],Math.cos(a)*0.4,2.46,Math.sin(a)*0.4,0xffffff))}}
if(h===28){g.add(mesh(G.cyl(0.4,0.43,0.3,14),0xf8f9fa,0,1.95,0),mesh(G.sph(0.34,10),0xffffff,0,2.25,0),mesh(G.sph(0.22,8),0xffffff,-0.22,2.2,0.1),mesh(G.sph(0.22,8),0xffffff,0.22,2.2,-0.1))}
if(h===29){g.add(mesh(G.cyl(0.46,0.5,0.14,14),0x74c0fc,0,1.84,0,0x1971c2));for(let k=0;k<6;k++){const a=k/6*6.283;g.add(mesh(G.cone(0.09,0.38+(k%2)*0.2,5),0xe3fafc,Math.cos(a)*0.4,2.08+(k%2)*0.1,Math.sin(a)*0.4,0x74c0fc))}}
if(h===30){const t=new THREE.Mesh(new THREE.TorusGeometry(0.42,0.06,8,20),M(0xffd43b,0xffaa00));t.rotation.x=Math.PI/2;t.position.set(0,2.35,0);g.add(t);g.add(mesh(G.sph(0.1,6),0xffffff,0,2.35,0.42,0xffffaa),mesh(G.sph(0.1,6),0xffffff,0,2.35,-0.42,0xffffaa))}
if(h===32){for(let k=0;k<5;k++){const a=k/5*6.283;g.add(mesh(G.cone(0.1,0.5,4),0xffe066,Math.cos(a)*0.38,2.1+(k%2)*0.15,Math.sin(a)*0.38,0xffcc00))}g.add(mesh(G.cyl(0.4,0.44,0.12,10),0x4dabf7,0,1.86,0,0x1971c2),mesh(G.sph(0.12,6),0xffffaa,0,2.4,0,0xffff66))}
if(h===35){g.add(mesh(G.cyl(0.36,0.4,0.2,10),0x212529,0,1.82,0));g.add(mesh(G.box(0.95,0.06,0.95),0x212529,0,1.98,0));g.add(mesh(G.cyl(0.02,0.02,0.4,4),0xffd43b,0.4,1.8,0.4,0xaa8800));g.add(mesh(G.sph(0.07,5),0xffd43b,0.4,1.58,0.4,0xaa8800))}
if(h===36){g.add(mesh(G.cone(0.5,0.12,3),0xffd43b,0,1.9,0,0xaa7a00));g.add(mesh(G.cone(0.46,0.5,3),0xffa94d,0,2.15,0,0xaa5500));for(const [x,z] of [[0.1,0.05],[-0.12,0.1],[0.02,-0.15]])g.add(mesh(G.cyl(0.07,0.07,0.03,8),0xe03131,x,2.05+z*0.2,z,0x880000))}
if(h===37){g.add(mesh(G.cyl(0.4,0.44,0.14,10),0xa5d8ff,0,1.88,0,0x3b8bd6));for(let k=0;k<7;k++){const a=k/7*6.283;g.add(mesh(G.cone(0.08,0.4+(k%2)*0.2,5),0xe7f5ff,Math.cos(a)*0.34,2.1,Math.sin(a)*0.34,0x74c0fc))}g.add(mesh(G.sph(0.1,6),0x4dabf7,0,2.0,0.4,0x1971c2))}
if(h===38){for(let k=0;k<6;k++)g.add(mesh(G.cone(0.42-k*0.015,0.14,10),k%2?0xf03e3e:0xffd43b,0,1.86+k*0.13,0,k%2?0x880000:0xaa8800));g.add(mesh(G.sph(0.11,6),0x4dabf7,0,2.7,0,0x1971c2))}
if(h===39){g.add(mesh(G.cyl(0.38,0.42,0.1,12),0x7048e8,0,1.86,0,0x2b1a66));g.add(mesh(G.sph(0.2,10),0xff922b,0,2.15,0,0xaa5500));const r=mesh(G.cyl(0.38,0.38,0.03,16),0xffd43b,0,2.15,0,0xaa8800);r.rotation.z=0.4;g.add(r);g.add(mesh(G.sph(0.06,6),0x74c0fc,0.3,2.4,0,0x1971c2))}
if(h===40){g.add(mesh(G.cyl(0.42,0.46,0.24,12),0xffd43b,0,1.92,0,0xaa7a00));for(let k=0;k<8;k++){const a=k/8*6.283;g.add(mesh(G.cone(0.09,0.4,5),0xffd43b,Math.cos(a)*0.4,2.25,Math.sin(a)*0.4,0xaa7a00));g.add(mesh(G.sph(0.06,6),[0xe03131,0x4dabf7,0x51cf66,0xb197fc][k%4],Math.cos(a)*0.44,1.95,Math.sin(a)*0.44,0x444444))}g.add(mesh(G.sph(0.14,8),0xff6b9d,0,2.1,0.46,0x882244))}
if(h===41){g.add(mesh(G.cyl(0.36,0.38,0.14,12),0xf8f9fa,0,1.84,0));g.add(mesh(G.sph(0.3,8),0xf8f9fa,-0.16,2.08,0),mesh(G.sph(0.3,8),0xf8f9fa,0.16,2.08,0),mesh(G.sph(0.3,8),0xf8f9fa,0,2.2,0.1),mesh(G.sph(0.28,8),0xf8f9fa,0,2.2,-0.12))}
if(h===42){g.add(mesh(G.cyl(0.4,0.44,0.28,12),0x1c3a6e,0,1.92,0,0x0a1a38));g.add(mesh(G.cyl(0.42,0.42,0.05,12),0x1c3a6e,0,2.08,0));g.add(mesh(G.box(0.5,0.04,0.3),0x111111,0,1.78,0.38));g.add(mesh(G.cyl(0.07,0.07,0.03,8),0xffd43b,0,1.98,0.42,0xaa8800))}
if(h===43){g.add(mesh(G.cyl(0.4,0.44,0.12,12),0xffd43b,0,1.88,0,0xaa7a00));g.add(mesh(G.sph(0.17,8),0xffa94d,0,2.1,0,0xff8800));for(let k=0;k<12;k++){const a=k/12*6.283;g.add(mesh(G.cone(0.05,0.3,4),0xffd43b,Math.cos(a)*0.4,2.1+Math.sin(a)*0.0,Math.sin(a)*0.4,0xffaa00).rotateZ(0))}for(let k=0;k<8;k++){const a=k/8*6.283;g.add(mesh(G.sph(0.06,6),0xfff3bf,Math.cos(a)*0.26,2.3,Math.sin(a)*0.26,0xffd43b))}}
if(h===44){g.add(mesh(G.cyl(0.4,0.42,0.1,12),0xa5d8ff,0,1.86,0,0x4c9be8));for(let k=0;k<7;k++){const a=k/7*6.283;g.add(mesh(G.cone(0.07,0.36+(k%2)*0.2,4),0xe7f5ff,Math.cos(a)*0.34,2.05,Math.sin(a)*0.34,0x74c0fc))}g.add(mesh(G.sph(0.1,8),0xffffff,0,2.0,0,0x74c0fc))}
if(h===45){g.add(mesh(G.cone(0.34,0.7,10),0xe03131,0,2.2,0,0x8a1c1c));g.add(mesh(G.cyl(0.38,0.38,0.08,12),0xffd43b,0,1.9,0,0xaa8800));g.add(mesh(G.sph(0.1,8),0x1971c2,0,2.58,0,0x0b3d73));g.add(mesh(G.sph(0.09,6),0x2f9e44,-0.3,1.95,0.1));g.add(mesh(G.sph(0.09,6),0xf08c00,0.3,1.95,0.1))}
if(h===46){g.add(mesh(G.cyl(0.38,0.4,0.5,12),0x868e96,0,2.05,0,0x343a40));g.add(mesh(G.sph(0.38,12),0xadb5bd,0,2.3,0,0x495057));g.add(mesh(G.box(0.5,0.08,0.06),0x212529,0,2.0,0.37));g.add(mesh(G.box(0.06,0.35,0.06),0x212529,0,2.1,0.37));g.add(mesh(G.cone(0.08,0.5,4),0xe03131,0,2.8,-0.05,0x8a1c1c));g.add(mesh(G.cone(0.1,0.3,4),0xe03131,0,2.6,-0.2,0x8a1c1c))}
if(h===33){const cs=[0xff6b6b,0xffa94d,0xffd43b,0x69db7c,0x4dabf7,0xb197fc];cs.forEach((c,k)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(0.62-k*0.07,0.045,6,16,Math.PI),M(c,c));t.position.set(0,1.85,0);t.rotation.y=Math.PI/2;g.add(t)})}
if(h===34){g.add(mesh(G.cyl(0.4,0.44,0.12,10),0x6b1a1a,0,1.86,0,0x330000));for(let k=0;k<6;k++){const a=k/6*6.283;g.add(mesh(G.cone(0.1,0.45+(k%3)*0.15,5),k%2?0xff922b:0xe03131,Math.cos(a)*0.34,2.15,Math.sin(a)*0.34,k%2?0xff5500:0xaa0000))}g.add(mesh(G.cone(0.13,0.6,5),0xffd43b,0,2.2,0,0xffaa00))}
if(h===31){g.add(mesh(G.cyl(0.4,0.46,0.22,12),0xffd43b,0,1.9,0,0xaa7a00));for(let k=0;k<7;k++){const a=k/7*6.283;g.add(mesh(G.cone(0.1,0.34,5),0xffd43b,Math.cos(a)*0.4,2.16,Math.sin(a)*0.4,0xaa7a00),mesh(G.sph(0.07,6),[0xff6b6b,0x4dabf7,0x69db7c][k%3],Math.cos(a)*0.4,2.38,Math.sin(a)*0.4,0xffffff))}g.add(mesh(G.sph(0.16,8),0xff4d4d,0,1.98,0.44,0xaa0000))}
if(h===27){for(let k=0;k<8;k++){const a=k/8*6.283;g.add(mesh(G.sph(0.09,6),k%2?0xffd43b:0xffffff,Math.cos(a)*0.5,2.0+Math.sin(k*1.7)*0.06,Math.sin(a)*0.5,0xffdd55))}g.add(mesh(G.sph(0.14,7),0xffd43b,0,2.3,0,0xffaa00))}
if(h===24){g.add(mesh(G.cyl(0.46,0.5,0.2,14),0xffd43b,0,1.88,0,0x886600),mesh(G.sph(0.2,8),0x4dabf7,0,2.1,0.0,0x1971c2),mesh(G.box(0.7,0.04,0.04),0xe03131,0,2.0,0.46));for(let k=0;k<6;k++){const a=k/6*6.283;g.add(mesh(G.cone(0.08,0.22,4),0xffd43b,Math.cos(a)*0.42,2.08,Math.sin(a)*0.42,0x886600))}}
if(h===15){const b=mesh(G.cyl(0.42,0.42,0.06,14),0x212529,0,1.92,0);g.add(b);for(const sx of[-1,1])g.add(mesh(G.cyl(0.14,0.14,0.2,10),0x339af0,sx*0.44,1.55,0,0x0b3a66))}
if(h===12){for(const sx of[-1,1]){const e=mesh(G.cone(0.14,0.3,4),0x343a40,sx*0.22,1.88,0);e.rotation.z=sx*-0.25;g.add(e);g.add(mesh(G.cone(0.07,0.18,4),0xf783ac,sx*0.22,1.86,0.04))}}
if(h===4){g.add(mesh(G.cyl(0.02,0.02,0.4,6),0x868e96,0,2.0,0),mesh(G.sph(0.08,8),0xff6b6b,0,2.25,0,0x661111))}
if(a.p){const pg=new THREE.Group(),pc=[0,0xf08c00,0x8d5524,0xffd43b,0xf8f9fa,0xe8590c,0xf8f9fa,0x51cf66,0xf1f3f5,0x2f9e44,0x212529,0x8d5524,0x7d5a3c,0x6b4423,0xffc078,0x40c057,0xffd43b,0xd9a441,0x9c36b5,0x2f9e44,0x5c7cfa,0x7a828a,0xf783ac,0x2b8a3e,0xe8b04a,0x8a6d4b,0xe03131,0xf8f9fa][a.p]||0xf08c00;pg.position.set(0.95,0,0.35);
pg.add(mesh(G.sph(0.25,8),pc,0,0.28,0),mesh(G.sph(0.17,8),pc,0.0,0.52,0.2));pg.children[0].scale.set(1,0.8,1.3);
pg.add(mesh(G.sph(0.03,5),0x111111,-0.07,0.56,0.35),mesh(G.sph(0.03,5),0x111111,0.07,0.56,0.35));
if(a.p===1){pg.add(mesh(G.cone(0.06,0.14,4),pc,-0.1,0.72,0.2),mesh(G.cone(0.06,0.14,4),pc,0.1,0.72,0.2),mesh(G.box(0.04,0.04,0.3),pc,0,0.35,-0.35))}
if(a.p===2){pg.add(mesh(G.box(0.08,0.2,0.05),0x5c3d1e,-0.17,0.5,0.2),mesh(G.box(0.08,0.2,0.05),0x5c3d1e,0.17,0.5,0.2),mesh(G.box(0.12,0.1,0.14),0x111,0,0.5,0.38))}
if(a.p===4){pg.add(mesh(G.box(0.07,0.32,0.05),pc,-0.07,0.8,0.18),mesh(G.box(0.07,0.32,0.05),pc,0.07,0.8,0.18),mesh(G.box(0.03,0.2,0.03),0xf783ac,-0.07,0.8,0.21),mesh(G.box(0.03,0.2,0.03),0xf783ac,0.07,0.8,0.21),mesh(G.sph(0.08,6),0xf783ac,0,0.5,0.4),mesh(G.sph(0.09,6),pc,0,0.3,-0.36))}
if(a.p===5){pg.add(mesh(G.cone(0.07,0.18,4),pc,-0.1,0.74,0.2),mesh(G.cone(0.07,0.18,4),pc,0.1,0.74,0.2),mesh(G.sph(0.1,6),0xf8f9fa,0,0.48,0.36),mesh(G.sph(0.1,6),0x212529,0,0.5,0.45),mesh(G.cyl(0.07,0.04,0.4,6),pc,0,0.33,-0.4).rotateX(1.2),mesh(G.sph(0.07,6),0xf8f9fa,0,0.3,-0.6))}
if(a.p===6){pg.add(mesh(G.sph(0.08,6),0x212529,-0.14,0.7,0.14),mesh(G.sph(0.08,6),0x212529,0.14,0.7,0.14),mesh(G.sph(0.06,6),0x212529,-0.08,0.58,0.34),mesh(G.sph(0.06,6),0x212529,0.08,0.58,0.34),mesh(G.sph(0.05,6),0x212529,0,0.5,0.38),mesh(G.sph(0.09,6),0x212529,-0.2,0.1,0.15),mesh(G.sph(0.09,6),0x212529,0.2,0.1,0.15))}
if(a.p===7){pg.add(mesh(G.sph(0.08,6),0xf8f9fa,-0.09,0.66,0.26),mesh(G.sph(0.08,6),0xf8f9fa,0.09,0.66,0.26),mesh(G.sph(0.04,5),0x111111,-0.09,0.67,0.33),mesh(G.sph(0.04,5),0x111111,0.09,0.67,0.33),mesh(G.box(0.2,0.02,0.04),0xe03131,0,0.47,0.36))}
if(a.p===8){pg.add(mesh(G.cone(0.04,0.28,5),0xffd43b,0,0.82,0.22,0xaa8800),mesh(G.box(0.05,0.3,0.1),0xf783ac,0,0.68,0.05,0x883355),mesh(G.sph(0.09,6),0xb197fc,0,0.34,-0.34,0x442288),mesh(G.sph(0.07,6),0xf783ac,0,0.28,-0.44,0x883355),mesh(G.sph(0.03,5),0x6741d9,-0.07,0.57,0.34),mesh(G.sph(0.03,5),0x6741d9,0.07,0.57,0.34))}
if(a.p===9)pg.add(mesh(G.sph(0.22,8),0x8d6e3b,0,0.5,-0.02,0x3a2a10),mesh(G.sph(0.07,6),0x94d82d,0,0.34,0.32),mesh(G.sph(0.04,5),0x111111,-0.04,0.36,0.37),mesh(G.sph(0.04,5),0x111111,0.04,0.36,0.37));
if(a.p===10)pg.add(mesh(G.sph(0.17,8),0xf8f9fa,0,0.4,0.06),mesh(G.cone(0.04,0.08,4),0xff922b,0,0.62,0.3),mesh(G.sph(0.03,5),0xf8f9fa,-0.05,0.68,0.24),mesh(G.sph(0.03,5),0xf8f9fa,0.05,0.68,0.24),mesh(G.box(0.12,0.05,0.1),0xff922b,-0.08,0.1,0.08),mesh(G.box(0.12,0.05,0.1),0xff922b,0.08,0.1,0.08));
if(a.p===11)pg.add(mesh(G.cone(0.05,0.1,4),0x5c3a1e,-0.1,0.8,0.18),mesh(G.cone(0.05,0.1,4),0x5c3a1e,0.1,0.8,0.18),mesh(G.sph(0.07,6),0xfff3bf,-0.07,0.65,0.34),mesh(G.sph(0.07,6),0xfff3bf,0.07,0.65,0.34),mesh(G.sph(0.03,5),0x111111,-0.07,0.65,0.4),mesh(G.sph(0.03,5),0x111111,0.07,0.65,0.4),mesh(G.cone(0.03,0.06,4),0xffa94d,0,0.58,0.4));
if(a.p===12)pg.add(mesh(G.sph(0.08,6),0xf1d9b5,0,0.42,0.3),mesh(G.sph(0.03,5),0x111111,0,0.44,0.37),mesh(G.sph(0.03,5),0x111111,-0.05,0.5,0.32),mesh(G.sph(0.03,5),0x111111,0.05,0.5,0.32),mesh(G.cone(0.04,0.14,4),0x4a3524,-0.12,0.72,-0.05),mesh(G.cone(0.04,0.14,4),0x4a3524,0,0.76,-0.05),mesh(G.cone(0.04,0.14,4),0x4a3524,0.12,0.72,-0.05));
if(a.p===13)pg.add(mesh(G.sph(0.07,6),0x6b4423,-0.1,0.74,0.1),mesh(G.sph(0.07,6),0x6b4423,0.1,0.74,0.1),mesh(G.sph(0.08,6),0xf1d9b5,0,0.46,0.33),mesh(G.sph(0.035,5),0x111111,0,0.48,0.4),mesh(G.sph(0.025,5),0x111111,-0.06,0.58,0.32),mesh(G.sph(0.025,5),0x111111,0.06,0.58,0.32));
if(a.p===14)pg.add(mesh(G.sph(0.06,6),0xffc078,-0.09,0.7,0.08),mesh(G.sph(0.06,6),0xffc078,0.09,0.7,0.08),mesh(G.sph(0.1,6),0xf8f9fa,0,0.4,0.28),mesh(G.sph(0.03,5),0xe64980,0,0.44,0.37),mesh(G.sph(0.025,5),0x111111,-0.06,0.56,0.32),mesh(G.sph(0.025,5),0x111111,0.06,0.56,0.32));
if(a.p===15)pg.add(mesh(G.sph(0.11,6),0x2f9e44,0,0.44,0.3,0x1b6b2a),mesh(G.cone(0.04,0.1,4),0xf59f00,0,0.72,-0.05),mesh(G.cone(0.04,0.1,4),0xf59f00,0,0.66,-0.2),mesh(G.cone(0.04,0.1,4),0xf59f00,0,0.58,-0.33),mesh(G.sph(0.025,5),0x111111,-0.06,0.5,0.37),mesh(G.sph(0.025,5),0x111111,0.06,0.5,0.37));
if(a.p===16)pg.add(mesh(G.sph(0.17,8),0xffd43b,0,0.4,0.0,0xaa8800),mesh(G.box(0.3,0.04,0.08),0x212529,0,0.42,-0.02),mesh(G.box(0.3,0.04,0.08),0x212529,0,0.34,-0.1),mesh(G.sph(0.05,5),0x111111,-0.05,0.5,0.15),mesh(G.sph(0.05,5),0x111111,0.05,0.5,0.15),mesh(G.sph(0.08,6),0xe7f5ff,-0.14,0.62,-0.05),mesh(G.sph(0.08,6),0xe7f5ff,0.14,0.62,-0.05));
if(a.p===17)pg.add(mesh(G.sph(0.2,8),0x8d5524,0,0.5,0.22,0x3a2410),mesh(G.sph(0.11,8),0xf2c94c,0,0.5,0.34,0xaa7a00),mesh(G.sph(0.05,5),0x8d5524,-0.09,0.66,0.26),mesh(G.sph(0.05,5),0x8d5524,0.09,0.66,0.26),mesh(G.sph(0.03,5),0x111111,0,0.5,0.44),mesh(G.sph(0.025,5),0x111111,-0.05,0.55,0.43),mesh(G.sph(0.025,5),0x111111,0.05,0.55,0.43));
if(a.p===18)pg.add(mesh(G.sph(0.17,8),0x9c36b5,0,0.52,0.05,0x5f1a73),mesh(G.sph(0.025,5),0xffffff,-0.06,0.56,0.2),mesh(G.sph(0.025,5),0xffffff,0.06,0.56,0.2),...[-0.14,-0.05,0.05,0.14].map(x=>mesh(G.cyl(0.025,0.02,0.22,5),0x9c36b5,x,0.12,0.12+Math.abs(x))));

if(a.p===19)pg.add(mesh(G.sph(0.17,8),0x2f9e44,0,0.5,0.05,0x145a22),mesh(G.sph(0.11,8),0xe03131,0,0.66,0.12,0x8a1010),mesh(G.sph(0.04,5),0xffd43b,0,0.62,0.27,0xaa8800),mesh(G.sph(0.025,5),0xffffff,-0.06,0.69,0.2),mesh(G.sph(0.025,5),0xffffff,0.06,0.69,0.2),mesh(G.box(0.06,0.3,0.05),0x1971c2,0,0.3,-0.2,0x0b3d73))
if(a.p===20)pg.add(mesh(G.sph(0.22,8),0x5c7cfa,0,0.45,0.05,0x2b3d99),mesh(G.sph(0.13,8),0xf1f3f5,0,0.4,0.2,0xcccccc),mesh(G.cyl(0.0,0.1,0.28,4),0x5c7cfa,0,0.78,0.0,0x2b3d99),mesh(G.cyl(0.0,0.07,0.2,4),0x5c7cfa,0,0.45,-0.3,0x2b3d99),mesh(G.sph(0.025,5),0x111111,-0.09,0.52,0.24),mesh(G.sph(0.025,5),0x111111,0.09,0.52,0.24),mesh(G.box(0.12,0.015,0.02),0x111111,0,0.36,0.34))

if(a.p===21)pg.add(mesh(G.sph(0.22,8),0x868e96,0,0.45,0.05,0x212529),mesh(G.sph(0.17,8),0x868e96,0,0.55,0.25,0x212529),mesh(G.cyl(0.05,0.035,0.3,6),0x6c757d,0,0.4,0.42,0x212529).rotateX(1.2),mesh(G.sph(0.13,6),0xadb5bd,-0.2,0.58,0.2,0x343a40),mesh(G.sph(0.13,6),0xadb5bd,0.2,0.58,0.2,0x343a40),mesh(G.sph(0.025,5),0x111111,-0.07,0.6,0.38),mesh(G.sph(0.025,5),0x111111,0.07,0.6,0.38))
if(a.p===22)pg.add(mesh(G.sph(0.17,8),0xf783ac,0,0.5,0.0,0xc2255c),mesh(G.cyl(0.03,0.04,0.35,6),0xf783ac,0,0.78,0.08,0xc2255c),mesh(G.sph(0.09,8),0xf783ac,0,0.98,0.14,0xc2255c),mesh(G.cyl(0.0,0.04,0.12,5),0x212529,0,0.96,0.26).rotateX(1.5),mesh(G.sph(0.02,5),0x111111,-0.05,1.0,0.2),mesh(G.sph(0.02,5),0x111111,0.05,1.0,0.2),mesh(G.cyl(0.015,0.015,0.35,4),0xe64980,-0.06,0.15,0.0),mesh(G.cyl(0.015,0.015,0.2,4),0xe64980,0.06,0.15,0.0))
if(a.p===23)pg.add(mesh(G.box(0.3,0.16,0.8),0x2b8a3e,0,0.25,0,0x145a22),mesh(G.box(0.22,0.1,0.4),0x2b8a3e,0,0.28,0.55,0x145a22),mesh(G.box(0.2,0.04,0.3),0xf1f3f5,0,0.2,0.58),mesh(G.sph(0.04,5),0xffd43b,-0.07,0.38,0.5,0x806000),mesh(G.sph(0.04,5),0xffd43b,0.07,0.38,0.5,0x806000),mesh(G.cyl(0.0,0.1,0.5,5),0x2b8a3e,0,0.22,-0.55,0x145a22).rotateX(-1.45),mesh(G.box(0.05,0.1,0.05),0x1e6f2f,0,0.38,0.1),mesh(G.box(0.05,0.1,0.05),0x1e6f2f,0,0.38,-0.1))
if(a.p===25)pg.add(mesh(G.sph(0.3,10),0x8a6d4b,0,0.5,0,0x4a3a22),mesh(G.sph(0.2,10),0xd9c3a0,0,0.62,0.22,0x8a7a5a),mesh(G.sph(0.045,6),0x111111,-0.07,0.66,0.38),mesh(G.sph(0.045,6),0x111111,0.07,0.66,0.38),mesh(G.sph(0.04,5),0x3a2a18,0,0.58,0.41),mesh(G.cyl(0.04,0.04,0.45,5),0x6f5636,-0.22,0.6,0.0).rotateZ(0.5),mesh(G.cyl(0.04,0.04,0.45,5),0x6f5636,0.22,0.6,0.0).rotateZ(-0.5),mesh(G.sph(0.05,5),0x3a2a18,-0.34,0.4,0),mesh(G.sph(0.05,5),0x3a2a18,0.34,0.4,0));
if(a.p===26)pg.add(mesh(G.sph(0.3,12),0xe03131,0,0.32,0,0x7a0a0a),mesh(G.box(0.02,0.3,0.5),0x212529,0,0.5,0),mesh(G.sph(0.14,8),0x212529,0,0.3,0.28,0x000000),mesh(G.sph(0.03,5),0xffffff,-0.06,0.34,0.4),mesh(G.sph(0.03,5),0xffffff,0.06,0.34,0.4),mesh(G.sph(0.075,6),0x111111,-0.152,0.548,0.122,0x000000),mesh(G.sph(0.075,6),0x111111,0.181,0.550,0.066,0x000000),mesh(G.sph(0.075,6),0x111111,-0.244,0.459,-0.105,0x000000),mesh(G.sph(0.075,6),0x111111,0.200,0.470,-0.166,0x000000),mesh(G.sph(0.075,6),0x111111,0.000,0.567,-0.170,0x000000),mesh(G.sph(0.075,6),0x111111,-0.092,0.489,-0.230,0x000000),mesh(G.sph(0.075,6),0x111111,0.031,0.612,0.061,0x000000));
if(a.p===27)pg.add(mesh(G.sph(0.3,10),0xf8f9fa,0,0.42,-0.05,0x999999),mesh(G.cyl(0.06,0.08,0.7,6),0xf8f9fa,0,0.9,0.2,0x999999),mesh(G.sph(0.11,8),0xf8f9fa,0,1.3,0.28,0x999999),mesh(G.box(0.08,0.05,0.2),0xff922b,0,1.28,0.45,0xaa4400),mesh(G.sph(0.025,5),0x111111,-0.06,1.34,0.38),mesh(G.sph(0.025,5),0x111111,0.06,1.34,0.38),mesh(G.sph(0.2,8),0xf1f3f5,-0.28,0.5,-0.15,0x999999),mesh(G.sph(0.2,8),0xf1f3f5,0.28,0.5,-0.15,0x999999));
if(a.p===24)pg.add(mesh(G.box(0.3,0.3,0.4),0xe8b04a,0,0.5,0,0x8a5a10),mesh(G.cyl(0.07,0.09,0.8,6),0xe8b04a,0,1.0,0.15,0x8a5a10),mesh(G.sph(0.13,8),0xe8b04a,0,1.5,0.2,0x8a5a10),mesh(G.box(0.1,0.08,0.14),0xd9984a,0,1.45,0.34,0x8a5a10),mesh(G.cyl(0.02,0.02,0.12,4),0x8a5a10,-0.06,1.68,0.2),mesh(G.cyl(0.02,0.02,0.12,4),0x8a5a10,0.06,1.68,0.2),mesh(G.sph(0.03,5),0x111111,-0.07,1.53,0.31),mesh(G.sph(0.03,5),0x111111,0.07,1.53,0.31),mesh(G.sph(0.06,5),0x7a4a10,0,0.55,0.15),mesh(G.sph(0.06,5),0x7a4a10,0,0.6,-0.1),mesh(G.cyl(0.03,0.03,0.4,4),0xe8b04a,-0.1,0.2,0.1),mesh(G.cyl(0.03,0.03,0.4,4),0xe8b04a,0.1,0.2,0.1),mesh(G.cyl(0.03,0.03,0.4,4),0xe8b04a,-0.1,0.2,-0.12),mesh(G.cyl(0.03,0.03,0.4,4),0xe8b04a,0.1,0.2,-0.12))
if(a.p===3){pg.add(mesh(G.box(0.14,0.05,0.12),0xff922b,0,0.5,0.38))}
const L=Math.min(a.l|0,6);if(L>0)pg.scale.setScalar(1+0.12*L);if(L>=3){const bw=mesh(G.cyl(0.14,0.14,0.04,8),0xe03131,0,0.82,-0.05,0x440000);pg.add(bw)}if(L>=5){pg.add(mesh(G.cone(0.09,0.18,5),0xffd43b,0,1.0,0.1,0x886600))}
if(a.q===1)pg.add(mesh(G.cone(0.1,0.2,4),0xe64980,-0.12,0.38,0.32),mesh(G.cone(0.1,0.2,4),0xe64980,0.12,0.38,0.32),mesh(G.sph(0.06,6),0xc2255c,0,0.38,0.34));
if(a.q===2){pg.add(mesh(G.box(0.26,0.07,0.05),0x111111,0,0.58,0.37),mesh(G.box(0.3,0.015,0.05),0x111111,0,0.6,0.36))}
if(a.q===3){const sc=mesh(G.cyl(0.2,0.2,0.08,10),0xe03131,0,0.36,0.17);pg.add(sc,mesh(G.box(0.07,0.2,0.04),0xe03131,0.16,0.26,0.3))}
if(a.q===4)pg.add(mesh(G.cyl(0.14,0.14,0.03,10),0x111111,0,0.56,0.2),mesh(G.cyl(0.09,0.09,0.2,10),0x111111,0,0.67,0.2),mesh(G.box(0.1,0.03,0.092),0xe03131,0,0.6,0.2));
if(a.q===5)pg.add(mesh(G.cyl(0.1,0.12,0.07,8),0xffd43b,0,0.58,0.22,0xaa7a00),mesh(G.cone(0.04,0.1,4),0xffd43b,-0.08,0.66,0.22,0xaa7a00),mesh(G.cone(0.04,0.12,4),0xffd43b,0,0.67,0.22,0xaa7a00),mesh(G.cone(0.04,0.1,4),0xffd43b,0.08,0.66,0.22,0xaa7a00));
if(a.q===6)pg.add(mesh(G.box(0.3,0.16,0.03),0xf8f9fa,-0.2,0.34,0.02,0x888888).rotateZ(0.5),mesh(G.box(0.3,0.16,0.03),0xf8f9fa,0.2,0.34,0.02,0x888888).rotateZ(-0.5));
if(a.q===10)pg.add(mesh(G.cyl(0.13,0.14,0.08,10),0x1971c2,0,0.6,0.2,0x0b3d75),mesh(G.box(0.16,0.02,0.12),0x1864ab,0,0.58,0.32,0x0b3d75),mesh(G.sph(0.03,5),0xffd43b,0,0.66,0.2,0xaa8800));
if(a.q===11)pg.add(mesh(G.sph(0.06,6),0xffd43b,0.12,0.7,0.2,0xaa8800),mesh(G.sph(0.05,6),0xff6b9d,0.12,0.77,0.2,0x882244),mesh(G.sph(0.05,6),0xff6b9d,0.19,0.7,0.2,0x882244),mesh(G.sph(0.05,6),0xff6b9d,0.12,0.63,0.2,0x882244),mesh(G.sph(0.05,6),0xff6b9d,0.05,0.7,0.2,0x882244));
if(a.q===12)pg.add(mesh(G.cyl(0.19,0.19,0.05,12),0xb197fc,0,0.5,0.1,0x442288),mesh(G.cone(0.07,0.12,4),0x74c0fc,0,0.4,0.3,0x1971c2),mesh(G.cone(0.07,0.1,4),0x74c0fc,0,0.34,0.3,0x1971c2).rotateX(3.14));
if(a.q===13)pg.add(mesh(G.box(0.14,0.07,0.05),0x111111,-0.09,0.74,0.2,0x222222),mesh(G.box(0.14,0.07,0.05),0x111111,0.09,0.74,0.2,0x222222),mesh(G.box(0.06,0.02,0.04),0x111111,0,0.76,0.2));
if(a.q===14)pg.add(mesh(G.cyl(0.015,0.015,0.34,4),0x212529,0,0.8,0.12).rotateZ(1.57),mesh(G.cyl(0.07,0.07,0.06,8),0xe03131,-0.17,0.68,0.12,0x660000).rotateZ(1.57),mesh(G.cyl(0.07,0.07,0.06,8),0xe03131,0.17,0.68,0.12,0x660000).rotateZ(1.57));
if(a.q===15)pg.add(mesh(G.box(0.2,0.14,0.02),0x4dabf7,-0.12,0.95,0.12,0x1971c2).rotateZ(0.5),mesh(G.box(0.2,0.14,0.02),0x4dabf7,0.12,0.95,0.12,0x1971c2).rotateZ(-0.5),mesh(G.box(0.03,0.18,0.03),0x212529,0,0.93,0.12));
if(a.q===16)pg.add(mesh(G.cyl(0.1,0.12,0.06,8),0xffd43b,0,0.74,0.15,0xaa8800),mesh(G.cone(0.03,0.09,4),0xffd43b,-0.07,0.81,0.15),mesh(G.cone(0.03,0.09,4),0xffd43b,0,0.83,0.15),mesh(G.cone(0.03,0.09,4),0xffd43b,0.07,0.81,0.15),mesh(G.sph(0.025,5),0xe03131,0,0.76,0.27));
if(a.q===17)pg.add(mesh(G.box(0.26,0.26,0.12),0x1971c2,0,0.5,-0.25,0x0b3d73),mesh(G.box(0.2,0.1,0.04),0xffd43b,0,0.46,-0.33),mesh(G.box(0.03,0.04,0.3),0x0b3d73,-0.13,0.6,-0.1),mesh(G.box(0.03,0.04,0.3),0x0b3d73,0.13,0.6,-0.1));
if(a.q===18)pg.add(mesh(G.cyl(0.17,0.17,0.07,10),0xe03131,0,0.5,0.22,0x8a1c1c).rotateX(1.2),mesh(G.box(0.07,0.2,0.03),0xe03131,0.1,0.38,0.3,0x8a1c1c),mesh(G.box(0.07,0.04,0.03),0xf8f9fa,0.1,0.34,0.32));
if(a.q===19)pg.add(mesh(G.cyl(0.13,0.13,0.02,10),0x212529,0,0.73,0.15),mesh(G.cyl(0.08,0.08,0.14,10),0x212529,0,0.81,0.15),mesh(G.cyl(0.082,0.082,0.03,10),0xe03131,0,0.77,0.15));
if(a.q===20)pg.add(mesh(G.cyl(0.17,0.17,0.06,10),0x1971c2,0,0.5,0.22,0x0b3d73).rotateX(1.2),mesh(G.sph(0.07,8),0xffd43b,0,0.4,0.34,0xaa8800));
if(a.q===21)pg.add(...[0,1,2,3,4].map(k=>mesh(G.sph(0.035,6),0xf783ac,Math.cos(k*1.2566)*0.05-0.09,0.76+Math.sin(k*1.2566)*0.05,0.17,0xe64980)),mesh(G.sph(0.03,6),0xffd43b,-0.09,0.76,0.19));

if(a.q===22)pg.add(mesh(G.sph(0.11,8),0x5c940d,0,0.74,0.14,0x2b4a06),mesh(G.cyl(0.115,0.115,0.02,10),0x3b5a0a,0,0.69,0.14,0x1e3004))
if(a.q===23)pg.add(mesh(G.box(0.09,0.22,0.04),0xffd43b,0.03,0.88,0.18,0xaa8800).rotateZ(0.5),mesh(G.box(0.09,0.2,0.04),0xffd43b,-0.03,0.73,0.18,0xaa8800).rotateZ(-0.5))
if(a.q===24)pg.add(...[0,1,2,3].map(k=>mesh(G.sph(0.045,6),0x2f9e44,Math.cos(k*1.5708)*0.05-0.09,0.76+Math.sin(k*1.5708)*0.05,0.17,0x145a22)),mesh(G.cyl(0.008,0.008,0.08,4),0x145a22,-0.09,0.68,0.17))
if(a.q===25)pg.add(mesh(G.sph(0.15,9),0xe03131,0,0.78,0.14,0x6a0000),mesh(G.cyl(0.05,0.06,0.1,6),0xf8f9fa,0,0.69,0.14,0x888888),mesh(G.sph(0.05,6),0xffffff,-0.08,0.85,0.24,0xcccccc),mesh(G.sph(0.05,6),0xffffff,0.09,0.82,0.22,0xcccccc),mesh(G.sph(0.045,6),0xffffff,0.0,0.92,0.18,0xcccccc),mesh(G.sph(0.04,6),0xffffff,0.12,0.9,0.1,0xcccccc))
if(a.q===26)pg.add(mesh(G.sph(0.09,7),0xf8f9fa,0,0.9,0.14,0xaabbcc),mesh(G.sph(0.08,7),0xf8f9fa,-0.09,0.87,0.14,0xaabbcc),mesh(G.sph(0.08,7),0xf8f9fa,0.09,0.87,0.14,0xaabbcc),mesh(G.sph(0.07,7),0xf8f9fa,0,0.95,0.14,0xaabbcc))
if(a.q===27)pg.add(mesh(G.sph(0.11,8),0xff2b2b,0,0.6,0.3,0xaa0000))
if(a.q===7)pg.add(mesh(G.cyl(0.01,0.01,0.5,4),0xdee2e6,0.18,0.85,0.1),mesh(G.sph(0.14,8),0xe03131,0.18,1.15,0.1,0x880000));
if(a.q===8)pg.add(mesh(G.cyl(0.19,0.19,0.05,12),0xe03131,0,0.5,0.1,0x880000),mesh(G.sph(0.09,8),0xffd43b,0,0.42,0.3,0xaa7a00));
if(a.q===9)pg.add(mesh(G.sph(0.12,5),0xffd43b,0,1.0,0.1,0xffaa00),mesh(G.cone(0.09,0.26,4),0xffd43b,0,1.2,0.1,0xffaa00),mesh(G.cone(0.09,0.26,4),0xffd43b,0,0.8,0.1,0xffaa00).rotateZ(3.14),mesh(G.cone(0.09,0.26,4),0xffd43b,-0.2,1.0,0.1,0xffaa00).rotateZ(1.57),mesh(G.cone(0.09,0.26,4),0xffd43b,0.2,1.0,0.1,0xffaa00).rotateZ(-1.57));
if(a.pn&&a.p){const pl=labelSprite('🐾 '+a.pn,{s:2.3});pl.position.set(0,1.0,0);pg.add(pl)}
g.add(pg);g.userData.pet=pg}
const sh=new THREE.Mesh(new THREE.CircleGeometry(0.5,16),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:0.25}));sh.rotation.x=-Math.PI/2;sh.position.y=0.02;g.add(sh);
mergeAvatar(g);
return g;
}
class Actor{
constructor(app,name,isBot){
this.app=app;this.name=name;this.isBot=!!isBot;this.root=new THREE.Group();this.av=null;this.setApp(app);
this.tag=labelSprite((isBot?'🤖 ':'')+name,{s:2.4});this.tag.position.y=2.55;this.root.add(this.tag);
this.bubble=null;this.bubT=0;this.emo=null;this.emoT=0;this.phase=Math.random()*6;this.moving=false;this.yaw=0;this.stars=0;this.dance=0;this.last=performance.now();
}
setApp(a){this.app=a;if(this.av)this.root.remove(this.av);this.av=buildAvatar(a);this.root.add(this.av)}
setName(n){if(n===this.name&&this.tag)return;this.name=n;if(this.tag){this.root.remove(this.tag);this.tag.material.map.dispose()}this.tag=labelSprite((this.isBot?'🤖 ':'')+n,{s:2.4});this.tag.position.y=2.55;this.root.add(this.tag)}
say(t){if(this.bubble){this.root.remove(this.bubble);this.bubble.material.map.dispose()}this.bubble=labelSprite(t,{s:3.4,bg:'rgba(255,255,255,.95)',fg:'#111'});this.bubble.position.y=3.2;this.root.add(this.bubble);this.bubT=5}
emote(e){if(e==='💃')this.dance=3;if(TRICKS.includes(e))this.trick={k:e,t:0};if(this.emo)this.root.remove(this.emo);this.emo=emojiSprite(e);this.emo.position.y=3.0;this.root.add(this.emo);this.emoT=2.2}
tick(dt,t){
const f=this.av.userData.feet,ar=this.av.userData.arms,pet=this.av.userData.pet;
if(pet&&this.trick){const T=this.trick;T.t+=dt;const u=T.t/1.6;if(u>=1){this.trick=null;pet.rotation.x=0;pet.rotation.y=0;pet.rotation.z=0;pet.position.z=0;pet.position.y=0}else{if(T.k==='🤸'){pet.rotation.x=-u*6.283;pet.position.y=Math.sin(u*3.1416)*0.9}else if(T.k==='🦘'){pet.position.y=Math.abs(Math.sin(u*9.42))*0.8;pet.rotation.x=0}else if(T.k==='🙏'){pet.rotation.x=Math.sin(Math.min(1,u*3)*1.57)*0.7*(u<0.8?1:(1-u)*5);pet.position.y=0}else if(T.k==='💤'){pet.rotation.x=0;pet.rotation.z=(u<0.15?u/0.15:u>0.85?(1-u)/0.15:1)*1.45;pet.position.y=0}else if(T.k==='🎶'){pet.rotation.x=0;pet.rotation.z=Math.sin(u*40)*0.35;pet.position.y=Math.abs(Math.sin(u*20))*0.15}else if(T.k==='🔝'){pet.rotation.x=-(u<0.15?u/0.15:u>0.85?(1-u)/0.15:1)*0.9;pet.position.y=0.1}else if(T.k==='🤾'){pet.rotation.z=-u*6.283;pet.position.y=Math.abs(Math.sin(u*3.1416))*0.2}else if(T.k==='🛹'){pet.position.z=Math.sin(u*6.283)*0.6;pet.rotation.x=0;pet.position.y=0.05}else if(T.k==='🪂'){pet.position.y=Math.sin(u*3.1416)*1.1;pet.rotation.z=Math.sin(u*14)*0.25}else{pet.rotation.y=u*12.566;pet.position.y=Math.sin(u*3.1416)*0.4}}}
else if(pet){pet.rotation.x=0;pet.position.y=Math.abs(Math.sin(t*6+this.phase))*(this.moving?0.12:0.03);if(this.dance>0){pet.position.y=Math.abs(Math.sin(t*9))*0.5;pet.rotation.y+=dt*10}else if(pet.rotation.y){pet.rotation.y=0}pet.rotation.z=(!this.moving&&this.dance<=0)?Math.sin(t*7+this.phase)*0.12:0}
if(this.dance>0){this.dance-=dt;this.av.rotation.y+=dt*7;this.av.position.y=Math.abs(Math.sin(t*10))*0.15;ar[0].rotation.z=2.4+Math.sin(t*14)*0.4;ar[1].rotation.z=-2.4-Math.sin(t*14)*0.4;if(this.dance<=0){this.av.rotation.y=0;ar[0].rotation.z=ar[1].rotation.z=0}}
else if(this.moving){ar[0].rotation.x=Math.sin(this.phase)*0.7;ar[1].rotation.x=-Math.sin(this.phase)*0.7}else{ar[0].rotation.x*=0.8;ar[1].rotation.x*=0.8;ar[0].rotation.z=ar[1].rotation.z=0}
if(this.moving&&this.dance<=0){this.phase+=dt*11;f[0].position.z=0.04+Math.sin(this.phase)*0.18;f[1].position.z=0.04-Math.sin(this.phase)*0.18;this.av.position.y=Math.abs(Math.sin(this.phase))*0.08}
else if(this.dance<=0){f[0].position.z=f[1].position.z=0.04;this.av.position.y*=0.8}
if(this.bubT>0){this.bubT-=dt;if(this.bubT<=0&&this.bubble){this.root.remove(this.bubble);this.bubble=null}}
if(this.emoT>0){this.emoT-=dt;this.emo.position.y=3.0+(2.2-this.emoT)*0.4+Math.sin(t*8)*0.05;if(this.emoT<=0){this.root.remove(this.emo);this.emo=null}}
this.root.rotation.y+= (angDiff(this.root.rotation.y,this.yaw))*Math.min(1,dt*12);
}
}
function angDiff(a,b){let d=(b-a)%(Math.PI*2);if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;return d}
const myApp=()=>({b:me.body,h:me.head,a:me.hat,p:me.pet|0,l:Math.floor((me.fed||0)/3),q:me.pacc|0,pn:me.pname||''});
const parts=[],pGeo=new THREE.SphereGeometry(0.09,5,4);
function burst(p,col,n){for(let i=0;i<n;i++){const m=new THREE.Mesh(pGeo,new THREE.MeshBasicMaterial({color:Array.isArray(col)?col[i%col.length]:col}));m.position.set(p.x,p.y+1.6,p.z);scene.add(m);const a=Math.random()*6.283,u=1+Math.random()*3;parts.push({m,vx:Math.cos(a)*u,vy:2+Math.random()*4,vz:Math.sin(a)*u,t:1.3})}}
function tickParts(dt){for(let i=parts.length-1;i>=0;i--){const q=parts[i];q.t-=dt;q.vy-=9*dt;q.m.position.x+=q.vx*dt;q.m.position.y+=q.vy*dt;q.m.position.z+=q.vz*dt;if(q.t<=0){scene.remove(q.m);q.m.material.dispose();parts.splice(i,1)}}}
/* ===================== static merge (performance) ===================== */
function mergeStatic(root){
if(location.search.indexOf('nomerge')>=0)return;
root.updateMatrixWorld(true);const B=new Map(),rm=[];
root.traverse(o=>{if(!o.isMesh||o.userData.keep||!o.material||!o.material.isMeshLambertMaterial||o.material.map||!o.geometry||!o.geometry.attributes.position)return;
let b=B.get(o.material.uuid);if(!b){b={m:o.material,p:[],n:[]};B.set(o.material.uuid,b)}
const g=(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone());g.applyMatrix4(o.matrixWorld);b.p.push(g.attributes.position.array);b.n.push(g.attributes.normal.array);rm.push(o)});
for(const o of rm)if(o.parent)o.parent.remove(o);
for(const b of B.values()){const cat=(arr)=>{let t=0;for(const a of arr)t+=a.length;const r=new Float32Array(t);let i=0;for(const a of arr){r.set(a,i);i+=a.length}return r};
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(cat(b.p),3));g.setAttribute('normal',new THREE.BufferAttribute(cat(b.n),3));
const m=new THREE.Mesh(g,b.m);root.add(m)}
}
let isNight=false,fwT=3;
/* ===================== rooms ===================== */
let room={type:'plaza',id:'plaza',owner:null,group:null,stars:[],bounds:26,pickables:[]};
let lamps=[],fountainWater=null,portals=[],ground=null,clouds=[];
const remotes=new Map();const joinLog={};
let player=null,bots=[];
let walkTarget=null;
function disposeTree(o){try{o.traverse(n=>{if(n.geometry)n.geometry.dispose();const ms=n.material?(Array.isArray(n.material)?n.material:[n.material]):[];for(const m of ms){if(m.map)m.map.dispose();m.dispose()}})}catch(e){}}
function disposeRoom(){
if(room.group){scene.remove(room.group);disposeTree(room.group)}
lamps=[];portals=[];fountainWater=null;interacts=[];clouds=[];
for(const [,r] of remotes){scene.remove(r.root);disposeTree(r.root)}remotes.clear();
for(const b of bots){scene.remove(b.root);disposeTree(b.root)}bots=[];
}
function portalMesh(label,x,z,color,to){
const g=new THREE.Group();g.position.set(x,0,z);
const ring=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.14,8,28),new THREE.MeshBasicMaterial({color}));ring.rotation.x=Math.PI/2;ring.position.y=0.15;g.add(ring);
const disc=new THREE.Mesh(new THREE.CircleGeometry(1.0,24),new THREE.MeshBasicMaterial({color,transparent:true,opacity:0.3}));disc.rotation.x=-Math.PI/2;disc.position.y=0.05;g.add(disc);
const l=labelSprite(label,{s:2.6});l.position.y=2.1;g.add(l);
g.userData={x,z,ring,to,label};portals.push(g.userData);return g;
}
function grassTex(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#5aa85c';x.fillRect(0,0,128,128);const r=mulberry(5);for(let i=0;i<900;i++){x.fillStyle=['#4f9a52','#63b366','#6bbd6e','#4a8f4d'][i&3];x.fillRect(r()*128,r()*128,2+r()*3,2+r()*3)}for(let i=0;i<30;i++){x.fillStyle=['#fff','#ffd43b','#ff8787'][i%3];x.fillRect(r()*128,r()*128,2,2)}
const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(24,24);return t}
const winMat=new THREE.MeshLambertMaterial({color:0xfff3bf,emissive:0x000000});
const moon=(()=>{const g=new THREE.Group(),m=new THREE.Mesh(new THREE.SphereGeometry(4.2,20,16),new THREE.MeshBasicMaterial({color:0xfff5cc,fog:false})),h=new THREE.Mesh(new THREE.SphereGeometry(7,20,16),new THREE.MeshBasicMaterial({color:0xfff5cc,transparent:true,opacity:0.18,fog:false,depthWrite:false}));g.add(m,h);for(const[x,y,z,r]of[[-1,1,3.6,0.9],[1.4,-1,3.7,0.6],[0.3,1.8,3.8,0.5]]){const c=new THREE.Mesh(new THREE.SphereGeometry(r,8,6),new THREE.MeshBasicMaterial({color:0xe3d9a8,fog:false}));c.position.set(x,y,z);g.add(c)}g.position.set(-16,27,-82);g.lookAt(0,0,0);g.visible=false;scene.add(g);return g})();
const nightStars=(()=>{const n=500,p=new Float32Array(n*3),r=mulberry(11);for(let i=0;i<n;i++){const th=r()*6.283,ph=Math.acos(r()*0.9+0.1),R=95;p[i*3]=R*Math.sin(ph)*Math.cos(th);p[i*3+1]=R*Math.cos(ph);p[i*3+2]=R*Math.sin(ph)*Math.sin(th)}
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));const pt=new THREE.Points(g,new THREE.PointsMaterial({color:0xffffff,size:1.4,transparent:true,opacity:0,fog:false}));scene.add(pt);return pt})();
function buildPlaza(){
const g=new THREE.Group();
ground=mesh(new THREE.CircleGeometry(40,48),0x58a85a,0,0,0);ground.material=new THREE.MeshLambertMaterial({map:grassTex()});ground.rotation.x=-Math.PI/2;g.add(ground);
const pl=mesh(new THREE.CircleGeometry(12,40),0xd9d2c3,0,0.02,0);pl.rotation.x=-Math.PI/2;g.add(pl);
const pl2=mesh(new THREE.RingGeometry(6.4,7,40),0xb8a98f,0,0.03,0);pl2.rotation.x=-Math.PI/2;g.add(pl2);
g.add(mesh(G.cyl(3,3.2,0.5,24),0x9aa3ad,0,0.25,0));
const w=mesh(G.cyl(2.6,2.6,0.3,24),0x4dabf7,0,0.5,0);g.add(w);fountainWater=w;
g.add(mesh(G.cyl(0.35,0.5,2,10),0xced4da,0,1.2,0),mesh(G.sph(0.55),0x74c0fc,0,2.4,0));
const rng=mulberry(7);
for(let i=0;i<34;i++){const an=rng()*6.283,r=15+rng()*11,x=Math.cos(an)*r,z=Math.sin(an)*r;
const t=new THREE.Group();t.position.set(x,0,z);const s=0.8+rng()*0.7;t.scale.set(s,s,s);
t.add(mesh(G.cyl(0.18,0.25,1.4,6),0x7b4a2a,0,0.7,0),mesh(G.cone(1.1,2,7),0x2b8a3e,0,2.1,0),mesh(G.cone(0.85,1.6,7),0x37b24d,0,3.0,0));g.add(t)}
for(let i=0;i<8;i++){const an=i/8*6.283+0.2,x=Math.cos(an)*12.4,z=Math.sin(an)*12.4;
const l=new THREE.Group();l.position.set(x,0,z);l.add(mesh(G.cyl(0.07,0.09,3,6),0x343a40,0,1.5,0));
const bulb=new THREE.Mesh(G.sph(0.25,10),new THREE.MeshBasicMaterial({color:0x777755}));bulb.position.y=3.1;l.add(bulb);lamps.push(bulb);g.add(l)}
for(let i=0;i<6;i++){const an=i/6*6.283+0.5,x=Math.cos(an)*9,z=Math.sin(an)*9;
const b=new THREE.Group();b.position.set(x,0,z);b.rotation.y=-an+Math.PI/2;b.add(mesh(G.box(1.8,0.12,0.5),0x8d5524,0,0.5,0),mesh(G.box(1.8,0.45,0.1),0x8d5524,0,0.8,-0.22),mesh(G.box(0.1,0.5,0.4),0x555,-0.8,0.25,0),mesh(G.box(0.1,0.5,0.4),0x555,0.8,0.25,0));g.add(b)}
const cols=[0xff8787,0x74c0fc,0xffd43b,0xb197fc,0x69db7c];
for(let i=0;i<10;i++){const an=i/10*6.283+0.3,r=33;const x=Math.cos(an)*r,z=Math.sin(an)*r,h=5+rng()*6;
const b=new THREE.Group();b.position.set(x,0,z);b.rotation.y=-an;b.add(mesh(G.box(6,h,6),cols[i%5],0,h/2,0),mesh(G.box(6.4,0.5,6.4),0x495057,0,h+0.25,0));
for(let k=0;k<3;k++){const w=new THREE.Mesh(G.box(0.9,1,0.1),winMat);w.position.set(-1.6+k*1.6,h*0.55,-3.05);b.add(w)}g.add(b)}
const dx=0,dz=-18;
g.add(mesh(G.box(5,4,0.5),0xf59f00,dx,2,dz-1),mesh(G.box(1.8,3,0.6),0x5c3d1e,dx,1.5,dz-0.72));
const sg=labelSprite('بيتي 🏠',{s:3.4,bg:'rgba(245,159,0,.95)'});sg.position.set(dx,4.8,dz);g.add(sg);
g.add(portalMesh('ادخل بيتك',dx,dz+2,0xffd43b,'home'));
g.add(portalMesh('🕹️ الأركيد',16,6,0xff6b9d,'arcade'));g.add(portalMesh('⚽ الملعب',16,-8,0x69db7c,'park'));g.add(portalMesh('🏁 السباق',-16,-8,0xffa94d,'race'));g.add(portalMesh('☕ الكافيه',-16,6,0x74c0fc,'cafe'));g.add(portalMesh('🌷 الحديقة',0,17.5,0xf06595,'garden'));g.add(portalMesh('🏖️ الشاطئ',16,-1,0xffc078,'beach'));g.add(portalMesh('💎 الكهف',-16,-1,0x9775fa,'cave'));g.add(portalMesh('🪩 الديسكو',8,16,0xe64980,'disco'));g.add(portalMesh('👻 البيت المسكون',-8,16,0x845ef7,'haunt'));g.add(portalMesh('🚀 محطة الفضاء',8,-17,0x4dabf7,'space'));g.add(portalMesh('🌀 المتاهة',-8,-17,0x20c997,'maze'));g.add(portalMesh('🎢 الملاهي',-16,14,0xff922b,'fun'));g.add(portalMesh('👗 عرض الأزياء',16,14,0xf06595,'show'));g.add(portalMesh('🚜 المزرعة',-16,-14,0x82c91e,'farm'));g.add(portalMesh('🎹 الاستوديو',16,-14,0x15aabf,'studio'));g.add(portalMesh('⛳ الميني جولف',0,10.5,0x2f9e44,'golf'));
for(let i=0;i<14;i++){const an=rng()*6.283,r=4+rng()*9;g.add(mesh(G.sph(0.12,6),[0xff6b6b,0xffd43b,0xf783ac,0xffffff][i%4],Math.cos(an)*r*1.9,0.12,Math.sin(an)*r*1.9))}
clouds=[];for(let i=0;i<6;i++){const c=new THREE.Group();for(let k=0;k<4;k++){const sp=mesh(G.sph(2+k%2,8),0xffffff,k*2.2,k%2,0);sp.scale.y=0.6;sp.userData.keep=true;c.add(sp)}c.position.set(-60+i*24,28+i%3*4,-30+(i*13)%50);g.add(c);clouds.push(c)}
const board=new THREE.Group();board.position.set(-7,0,-4);board.add(mesh(G.box(0.2,2,0.2),0x6d4c2a,0,1,0),mesh(G.box(2.4,1.4,0.15),0xe9d8a6,0,2,0));g.add(board);
const bl=labelSprite('⭐ اجمع النجوم',{s:2.6,bg:'rgba(255,211,92,.95)',fg:'#222'});bl.position.set(-7,3.3,-4);g.add(bl);
if(winterNow()){const rg=mulberry(99);for(const[tx,tz]of[[10,12],[-10,12]]){const t=new THREE.Group();t.position.set(tx,0,tz);t.add(mesh(G.cyl(0.25,0.3,0.8,6),0x6f4e37,0,0.4,0));for(let k=0;k<4;k++)t.add(mesh(G.cone(2.0-k*0.4,1.8,9),k%2?0x2f9e44:0x2b8a3e,0,1.5+k*1.1,0));t.add(mesh(G.cone(0.3,0.6,5),0xffd43b,0,5.9,0,0xffd43b));for(let k=0;k<22;k++){const a=rg()*6.28,h=1.2+rg()*3.8,r=Math.max(0.2,2.0-(h-0.9)*0.42);t.add(mesh(G.sph(0.11,5),[0xff6b6b,0xffd43b,0x74c0fc,0xf8f9fa,0xff8cc6][k%5],Math.cos(a)*r,h,Math.sin(a)*r,[0xff6b6b,0xffd43b,0x74c0fc,0xf8f9fa,0xff8cc6][k%5]))}for(let k=0;k<4;k++){const a=k*1.6+0.3;t.add(mesh(G.box(0.55,0.5,0.55),[0xe03131,0x1971c2,0xf08c00,0x9c36b5][k],Math.cos(a)*1.7,0.25,Math.sin(a)*1.7),mesh(G.box(0.58,0.08,0.12),0xffd43b,Math.cos(a)*1.7,0.52,Math.sin(a)*1.7))}g.add(t)}
interacts.push({x:7,z:9,label:'🎆 أطلق ألعاب نارية',fn:fwLaunch});sign(g,'🎆 ألعاب نارية',7,2.6,8);const st=new THREE.Group();st.position.set(-10,0,-12);st.add(mesh(G.box(2.4,0.9,1.2),0x8d6e63,0,0.45,0),mesh(G.box(2.8,0.1,1.6),0xc92a2a,0,2.1,0),mesh(G.box(0.1,1.6,0.1),0x5c3d1e,-1.2,1.3,0.6),mesh(G.box(0.1,1.6,0.1),0x5c3d1e,1.2,1.3,0.6),mesh(G.cyl(0.18,0.15,0.3,8),0xf8f9fa,-0.4,1.05,0),mesh(G.cyl(0.18,0.15,0.3,8),0xf8f9fa,0.1,1.05,0));for(let k=0;k<8;k++)st.add(mesh(G.sph(0.07,5),k%2?0xffd43b:0xff6b6b,-1.2+k*0.34,1.95,0.7,k%2?0xffd43b:0xff6b6b));g.add(st);const sl=labelSprite('🎄 سوق الشتاء',{s:3,bg:'rgba(201,42,42,.9)'});sl.position.set(-10,3.7,-12);g.add(sl);const hl=labelSprite('☕ شوكولاتة سخنة',{s:2.4,bg:'rgba(60,30,20,.9)'});hl.position.set(-10,2.6,-12);g.add(hl);interacts.push({x:-10,z:-10.6,label:'☕ شوكولاتة سخنة (+5🪙)',fn:hotChoc})}
room.bounds=26;if(typeof benchesBuild==="function")benchesBuild(g);mergeStatic(g);room.group=g;scene.add(g);
}
function winterNow(){const d=new Date(),m=d.getMonth()+1,dy=d.getDate();return (m===11&&dy>=15)||m===12||(m===1&&dy<=15)||/[?&]snow/.test(location.search)}
let lastChoc=0;
function hotChoc(){const t=Date.now();if(t-lastChoc<120000){toast('☕ استنى '+Math.ceil((120000-(t-lastChoc))/1000)+' ثانية للكوباية الجاية');return}const d=today();if(!me.chd||me.chd.d!==d)me.chd={d,n:0};if(me.chd.n>=10){toast('☕ شربت كفاية النهاردة!');return}lastChoc=t;me.chd.n++;me.coins+=5;updCoins();saveMe();sfx('star');burst(player.root.position,0xc2410c,12);toast('☕ بالهنا والشفا! +5🪙')}
/* ----- furniture ----- */
const CAT={
sofa:{n:'كنبة',e:'🛋️',p:40,w:2,d:1},bed:{n:'سرير',e:'🛏️',p:80,w:2,d:2},table:{n:'ترابيزة',e:'🪵',p:30,w:2,d:1},chair:{n:'كرسي',e:'🪑',p:15,w:1,d:1},
aquarium:{n:'حوض سمك',e:'🐠',p:100,w:2,d:1},fireplace:{n:'مدفأة',e:'🔥',p:150,w:2,d:1},desk:{n:'مكتب',e:'💻',p:50,w:2,d:1},cactus:{n:'صبار',e:'🌵',p:8,w:1,d:1},
plant:{n:'نبتة',e:'🪴',p:10,w:1,d:1},lamp:{n:'أباجورة',e:'💡',p:20,w:1,d:1},tv:{n:'تلفزيون',e:'📺',p:70,w:2,d:1},rug:{n:'سجادة',e:'🟥',p:25,w:2,d:2,floor:true},
shelf:{n:'مكتبة',e:'📚',p:35,w:2,d:1},fridge:{n:'تلاجة',e:'🧊',p:45,w:1,d:1},piano:{n:'بيانو',e:'🎹',p:120,w:2,d:1},trophy:{n:'كأس',e:'🏆',p:200,w:1,d:1},wardrobe:{n:'دولاب',e:'🚪',p:60,w:2,d:1},fountain:{n:'نافورة',e:'⛲',p:180,w:2,d:2},globe:{n:'كرة أرضية',e:'🌍',p:55,w:1,d:1},xtree:{n:'شجرة زينة',e:'🎄',p:60,w:1,d:1},scope:{n:'تليسكوب',e:'🔭',p:90,w:1,d:1},jukebox:{n:'جوك بوكس',e:'🎵',p:140,w:1,d:1},pondf:{n:'بركة كوي',e:'🪷',p:110,w:2,d:2,floor:true},crystal:{n:'كريستالة',e:'💎',p:75,w:1,d:1},chestf:{n:'صندوق كنز',e:'🧰',p:65,w:1,d:1},bonsai:{n:'بونساي',e:'🌳',p:40,w:1,d:1},beanbag:{n:'بين باج',e:'🟣',p:35,w:1,d:1},hammock:{n:'أرجوحة شبكية',e:'🏝️',p:60,w:2,d:1},arcadem:{n:'ماكينة ألعاب',e:'🕹️',p:140,w:1,d:1},balloons:{n:'بالونات',e:'🎈',p:25,w:1,d:1},cake:{n:'تورتة',e:'🎂',p:30,w:1,d:1},robot:{n:'روبوت',e:'🤖',p:90,w:1,d:1},lighthouse:{n:'فنار',e:'🗼',p:170,w:1,d:1},cannon:{n:'مدفع',e:'💣',p:120,w:1,d:2},anvil:{n:'سندان',e:'⚒️',p:60,w:1,d:1},tipi:{n:'خيمة هندية',e:'⛺',p:90,w:2,d:2},igloo:{n:'بيت ثلج',e:'🧊',p:110,w:2,d:2},mailbox:{n:'صندوق بريد',e:'📮',p:40,w:1,d:1},totem:{n:'عمود توتم',e:'🗿',p:85,w:1,d:1},birdhouse:{n:'بيت عصافير',e:'🐦',p:55,w:1,d:1},swingset:{n:'أرجوحة',e:'🎠',p:95,w:2,d:1},lamppost:{n:'عمود إنارة',e:'💡',p:50,w:1,d:1},dartboard:{n:'لعبة السهام',e:'🎯',p:65,w:1,d:1},vendingmachine:{n:'ماكينة مشروبات',e:'🥤',p:150,w:1,d:1},seesaw:{n:'أرجوحة توازن',e:'⚖️',p:80,w:2,d:1},gramophone:{n:'جرامافون',e:'📻',p:130,w:1,d:1},mushroom:{n:'فطر كبير',e:'🍄',p:45,w:1,d:1},snowglobe:{n:'كرة ثلج',e:'🔮',p:70,w:1,d:1},grandfather:{n:'ساعة جدّي',e:'🕰️',p:140,w:1,d:1},popcorn:{n:'ماكينة فشار',e:'🍿',p:95,w:1,d:1},icecream:{n:'عربية آيس كريم',e:'🍦',p:120,w:2,d:1},cottoncandy:{n:'غزل البنات',e:'🍭',p:60,w:1,d:1},wagon:{n:'عربة خشب',e:'🛒',p:50,w:2,d:1},pizzaoven:{n:'فرن بيتزا',e:'🍕',p:130,w:2,d:1},toybox:{n:'صندوق ألعاب',e:'🧸',p:55,w:1,d:1},sunflower:{n:'عباد شمس',e:'🌻',p:35,w:1,d:1},bathtub:{n:'بانيو',e:'🛁',p:70,w:2,d:1},hotairballoon:{n:'منطاد',e:'🎈',p:95,w:1,d:1},bookcart:{n:'عربية كتب',e:'📖',p:40,w:1,d:1},sandtower:{n:'برج رمل',e:'🗼',p:30,w:1,d:1},chesstable:{n:'طاولة شطرنج',e:'♟️',p:65,w:1,d:1},bunkbed:{n:'سرير دورين',e:'🛏️',p:110,w:2,d:1},hayrolls:{n:'حزم قش',e:'🌾',p:25,w:1,d:1},hourglass:{n:'ساعة رملية',e:'⏳',p:45,w:1,d:1},tricycle:{n:'تريسكل',e:'🚲',p:50,w:1,d:1},cradle:{n:'مهد طفل',e:'🍼',p:60,w:1,d:1},stool:{n:'كرسي عالي',e:'🪑',p:20,w:1,d:1},cuckoo:{n:'ساعة كوكو',e:'🕰️',p:55,w:1,d:1},treasurechest:{n:'صندوق كنز',e:'💰',p:85,w:1,d:1},anchor:{n:'مرساة',e:'⚓',p:40,w:1,d:1},lifebuoy:{n:'طوق نجاة',e:'🛟',p:30,w:1,d:1},surfboard:{n:'لوح ركوب أمواج',e:'🏄',p:45,w:1,d:1},wheelbarrow:{n:'عربة يد',e:'🛒',p:35,w:1,d:1},abacus:{n:'عداد خرز',e:'🧮',p:40,w:1,d:1},typewriter:{n:'آلة كاتبة',e:'⌨️',p:60,w:1,d:1},rockinghorse:{n:'حصان هزاز',e:'🐴',p:75,w:1,d:1},lampion:{n:'فانوس ورقي',e:'🏮',p:45,w:1,d:1},compass:{n:'بوصلة كبيرة',e:'🧭',p:50,w:1,d:1},woodstove:{n:'مدفأة حطب',e:'🔥',p:85,w:1,d:1},sundial:{n:'ساعة شمسية',e:'🕰️',p:60,w:1,d:1},pagoda:{n:'باجودا',e:'🏯',p:95,w:1,d:1},gong:{n:'جونج',e:'🥁',p:55,w:1,d:1},birdbath:{n:'حوض عصافير',e:'🐦',p:50,w:1,d:1},sleigh:{n:'مزلقة',e:'🛷',p:70,w:2,d:1},harp:{n:'قيثارة',e:'🎼',p:90,w:1,d:1},loom:{n:'نول نسيج',e:'🧶',p:80,w:2,d:1},cauldron:{n:'قدر سحري',e:'🧪',p:65,w:1,d:1},spinwheel:{n:'عجلة غزل',e:'🎡',p:55,w:1,d:1},beehive:{n:'خلية نحل',e:'🐝',p:45,w:1,d:1},candelabra:{n:'شمعدان',e:'🕯️',p:60,w:1,d:1},icecart:{n:'عربة آيس كريم',e:'🍦',p:85,w:2,d:1},chandelier:{n:'ثريا',e:'💡',p:110,w:1,d:1},canoe:{n:'كانو',e:'🛶',p:75,w:2,d:1},clockg:{n:'ساعة جدية',e:'⏰',p:95,w:1,d:1},hatstand:{n:'علاقة قبعات',e:'🎩',p:40,w:1,d:1},umbrella:{n:'شمسية شاطئ',e:'⛱️',p:50,w:1,d:1},telephone:{n:'تليفون قديم',e:'☎️',p:45,w:1,d:1},samovar:{n:'سماور',e:'🫖',p:70,w:1,d:1},pottery:{n:'فخارة',e:'🏺',p:40,w:1,d:1},fishbowl:{n:'حوض سمك صغير',e:'🐠',p:55,w:1,d:1},kettle:{n:'غلاية شاي',e:'🫖',p:50,w:1,d:1},toolbox:{n:'صندوق عدة',e:'🧰',p:45,w:1,d:1},trumpet:{n:'ترومبيت',e:'🎺',p:60,w:1,d:1},postbox:{n:'صندوق بريد',e:'📮',p:65,w:1,d:1},ladder:{n:'سلم خشب',e:'🪜',p:70,w:1,d:1},watering:{n:'رشاش مياه',e:'🚿',p:45,w:1,d:1},bookpile:{n:'كومة كتب',e:'📚',p:50,w:1,d:1},sewing:{n:'ماكينة خياطة',e:'🧵',p:75,w:1,d:1},skateboard:{n:'سكيت بورد',e:'🛹',p:60,w:1,d:1},scales:{n:'ميزان قديم',e:'⚖️',p:70,w:1,d:1},bellows:{n:'منفاخ نار',e:'🔥',p:55,w:1,d:1},satchel:{n:'شنطة جلد',e:'👜',p:50,w:1,d:1},bicycle:{n:'عجلة',e:'🚲',p:90,w:2,d:1},blender:{n:'خلاط',e:'🥤',p:55,w:1,d:1},cooler:{n:'تلاجة رحلات',e:'🧊',p:60,w:1,d:1},iron:{n:'مكواة',e:'👔',p:45,w:1,d:1},rocket:{n:'صاروخ',e:'🚀',p:160,w:1,d:1},sandcastle:{n:'قلعة رمل',e:'🏰',p:60,w:1,d:1},treasure:{n:'صندوق كنز',e:'💰',p:100,w:1,d:1},scarecrow:{n:'فزاعة',e:'🧑‍🌾',p:50,w:1,d:1},kayak:{n:'قارب كاياك',e:'🛶',p:130,w:2,d:1},hottub:{n:'جاكوزي',e:'🛁',p:200,w:2,d:2},windmill:{n:'طاحونة هوا',e:'🌬️',p:110,w:1,d:1},piggybank:{n:'حصالة خنزير',e:'🐷',p:40,w:1,d:1},guitar:{n:'جيتار',e:'🎸',p:85,w:1,d:1},scooter:{n:'سكوتر',e:'🛴',p:95,w:1,d:1},chessboard:{n:'طاولة شطرنج',e:'♟️',p:75,w:1,d:1},arcade:{n:'ماكينة ألعاب',e:'🕹️',p:180,w:1,d:1},telescope:{n:'تلسكوب',e:'🔭',p:90,w:1,d:1},trampoline:{n:'ترامبولين',e:'🤸',p:120,w:2,d:2},drumkit:{n:'طقم طبول',e:'🥁',p:140,w:2,d:1},bbq:{n:'شواية',e:'🍖',p:80,w:1,d:1},lavalamp:{n:'مصباح حمم',e:'🫧',p:45,w:1,d:1},pinata:{n:'بيناتا',e:'🪅',p:70,w:1,d:1},snowman:{n:'رجل ثلج',e:'⛄',p:55,w:1,d:1},radio:{n:'راديو قديم',e:'📻',p:50,w:1,d:1},throne:{n:'عرش',e:'👑',p:220,w:2,d:1},plantpot:{n:'أصيص ورد',e:'🪴',p:25,w:1,d:1},fishtank:{n:'حوض سمك',e:'🐟',p:110,w:2,d:1},merrygo:{n:'حصان دوار',e:'🎠',p:150,w:2,d:2},campfire:{n:'نار مخيم',e:'🔥',p:40,w:1,d:1},drums:{n:'طبول',e:'🥁',p:95,w:2,d:1},easel:{n:'حامل رسم',e:'🎨',p:45,w:1,d:1},tent:{n:'خيمة',e:'⛺',p:75,w:2,d:2},poster:{n:'صورتي (حيط)',e:'📸',p:40,w:2,d:1,wall:true},painting:{n:'لوحة (حيط)',e:'🖼️',p:30,w:2,d:1,wall:true},wclock:{n:'ساعة (حيط)',e:'🕒',p:20,w:1,d:1,wall:true},banner:{n:'راية (حيط)',e:'🚩',p:25,w:2,d:1,wall:true},mirror:{n:'مراية (حيط)',e:'🪞',p:35,w:1,d:1,wall:true}
};
function buildFurn(id){
const g=new THREE.Group(),c=CAT[id],W=c.w,D=c.d;
const A=(m)=>{g.add(m);return m};
switch(id){
case'sofa':A(mesh(G.box(2,0.45,0.9),0x0ca678,0,0.25,0));A(mesh(G.box(2,0.55,0.25),0x099268,0,0.7,-0.32));A(mesh(G.box(0.22,0.7,0.9),0x099268,-0.89,0.4,0));A(mesh(G.box(0.22,0.7,0.9),0x099268,0.89,0.4,0));break;
case'bed':A(mesh(G.box(2,0.35,2),0x7b4a2a,0,0.2,0));A(mesh(G.box(1.85,0.25,1.85),0xf8f9fa,0,0.5,0));A(mesh(G.box(1.85,0.12,1.1),0xe8590c,0,0.68,0.35));A(mesh(G.box(1.2,0.15,0.4),0xdee2e6,0,0.7,-0.7));A(mesh(G.box(2,0.9,0.15),0x5c3d1e,0,0.55,-0.95));break;
case'table':A(mesh(G.box(1.9,0.1,0.9),0x9c6b3f,0,0.75,0));for(const[x,z]of[[-.85,-.35],[.85,-.35],[-.85,.35],[.85,.35]])A(mesh(G.box(0.1,0.7,0.1),0x6d4c2a,x,0.35,z));break;
case'chair':A(mesh(G.box(0.7,0.1,0.7),0xb5651d,0,0.45,0));A(mesh(G.box(0.7,0.7,0.1),0xb5651d,0,0.85,-0.3));for(const[x,z]of[[-.3,-.3],[.3,-.3],[-.3,.3],[.3,.3]])A(mesh(G.box(0.08,0.45,0.08),0x6d4c2a,x,0.22,z));break;
case'plant':A(mesh(G.cyl(0.25,0.18,0.4,8),0xc2410c,0,0.2,0));A(mesh(G.sph(0.4,8),0x2f9e44,0,0.75,0));A(mesh(G.sph(0.25,8),0x51cf66,0.15,1.1,0.05));break;
case'crystal':A(mesh(G.cyl(0.3,0.35,0.12,8),0x343a40,0,0.06,0));for(let j=0;j<3;j++){const m=mesh(G.cone(0.14,0.7+j*0.3,5),[0x74c0fc,0xb197fc,0xf783ac][j],(j-1)*0.16,0.5+j*0.12,0,[0x74c0fc,0xb197fc,0xf783ac][j]);m.rotation.z=(j-1)*0.2;A(m)}break;
case'chestf':A(mesh(G.box(0.9,0.4,0.55),0x8d5a2b,0,0.25,0));A(mesh(G.cyl(0.275,0.275,0.9,10),0x8d5a2b,0,0.45,0).rotateZ(Math.PI/2));A(mesh(G.box(0.12,0.3,0.58),0xffd43b,0,0.3,0,0x664400));A(mesh(G.sph(0.07,6),0xffd43b,0,0.38,0.3,0x664400));break;
case'bonsai':A(mesh(G.box(0.6,0.15,0.4),0x7b5e3b,0,0.08,0));A(mesh(G.cyl(0.06,0.09,0.5,6),0x5c3d1e,0,0.4,0));for(const[x,y,z,r]of[[0,0.8,0,0.28],[-0.2,0.65,0.05,0.2],[0.22,0.68,-0.03,0.2]])A(mesh(G.sph(r,8),0x2f9e44,x,y,z));break;
case'lamp':A(mesh(G.cyl(0.2,0.25,0.1,8),0x343a40,0,0.05,0));A(mesh(G.cyl(0.04,0.04,1.2,6),0x343a40,0,0.65,0));A(mesh(G.cone(0.32,0.45,10),0xffe066,0,1.45,0,0x886611));break;
case'tv':A(mesh(G.box(1.6,0.45,0.5),0x5c3d1e,0,0.23,0));A(mesh(G.box(1.5,0.9,0.1),0x111111,0,0.95,0));A(mesh(G.box(1.38,0.76,0.05),0x4dabf7,0,0.95,0.06,0x113355));break;
case'rug':A(mesh(G.box(1.9,0.04,1.9),0xc92a2a,0,0.03,0));A(mesh(G.box(1.5,0.05,1.5),0xffd43b,0,0.04,0));A(mesh(G.box(1.1,0.06,1.1),0xc92a2a,0,0.05,0));break;
case'shelf':A(mesh(G.box(2,2,0.4),0x7b4a2a,0,1,0));{const cs=[0xe03131,0x1971c2,0xf08c00,0x2f9e44,0x9c36b5];for(let r=0;r<3;r++)for(let i=0;i<7;i++)A(mesh(G.box(0.18,0.4,0.28),cs[(i+r)%5],-0.8+i*0.27,0.45+r*0.6,0.06))}break;
case'fridge':A(mesh(G.box(0.9,1.9,0.8),0xf1f3f5,0,0.95,0));A(mesh(G.box(0.05,0.5,0.05),0x868e96,0.35,1.2,0.42));A(mesh(G.box(0.85,0.03,0.02),0xadb5bd,0,1.3,0.41));break;
case'piano':A(mesh(G.box(2,1,0.8),0x111111,0,0.5,-0.05));A(mesh(G.box(1.9,0.08,0.4),0xffffff,0,1.0,0.25));A(mesh(G.box(0.1,0.7,0.1),0x111,-0.8,0.35,0.35));A(mesh(G.box(0.1,0.7,0.1),0x111,0.8,0.35,0.35));break;
case'aquarium':A(mesh(G.box(2,0.5,0.8),0x343a40,0,0.25,0));{const gl=mesh(G.box(1.9,0.9,0.7),0x74c0fc,0,0.95,0);gl.material=new THREE.MeshLambertMaterial({color:0x74c0fc,transparent:true,opacity:0.45});A(gl);for(const[x,y,z,c]of[[-.5,.9,0,0xff922b],[.3,1.1,.1,0xffd43b],[.6,.8,-.1,0xff6b6b]])A(mesh(G.box(0.25,0.14,0.08),c,x,y,z))}break;
case'fireplace':A(mesh(G.box(2,1.6,0.6),0x868e96,0,0.8,0));A(mesh(G.box(1.1,0.9,0.1),0x111111,0,0.55,0.3));A(mesh(G.cone(0.25,0.6,5),0xff922b,-0.15,0.5,0.32,0xaa4400));A(mesh(G.cone(0.2,0.45,5),0xffd43b,0.15,0.45,0.32,0x886600));A(mesh(G.box(2.2,0.15,0.8),0x495057,0,1.65,0));break;
case'desk':A(mesh(G.box(1.9,0.1,0.9),0xa9754f,0,0.8,0));A(mesh(G.box(0.1,0.8,0.8),0x7b4a2a,-0.85,0.4,0));A(mesh(G.box(0.1,0.8,0.8),0x7b4a2a,0.85,0.4,0));A(mesh(G.box(0.6,0.04,0.4),0x343a40,0,0.87,0.1));{const sc=mesh(G.box(0.6,0.4,0.03),0x4dabf7,0,1.1,-0.1,0x113355);sc.rotation.x=-0.2;A(sc)}break;
case'cactus':A(mesh(G.cyl(0.25,0.18,0.35,8),0xc2410c,0,0.18,0));A(mesh(G.cyl(0.14,0.16,0.7,8),0x2f9e44,0,0.65,0));A(mesh(G.cyl(0.07,0.07,0.3,6),0x2f9e44,0.22,0.65,0));A(mesh(G.sph(0.06,5),0xff6b9d,0,1.02,0));break;
case'wardrobe':A(mesh(G.box(1.8,2.2,0.8),0x8d6e63,0,1.1,0));A(mesh(G.box(0.03,2.0,0.05),0x3e2723,0,1.1,0.42));A(mesh(G.sph(0.06,6),0xffd43b,-0.12,1.1,0.44,0x553d00));A(mesh(G.sph(0.06,6),0xffd43b,0.12,1.1,0.44,0x553d00));break;
case'fountain':A(mesh(G.cyl(0.95,1.05,0.4,16),0xadb5bd,0,0.2,0));A(mesh(G.cyl(0.85,0.85,0.08,16),0x4dabf7,0,0.38,0,0x0b3a66));A(mesh(G.cyl(0.12,0.16,0.9,8),0xced4da,0,0.8,0));A(mesh(G.sph(0.22,8),0x74c0fc,0,1.3,0,0x0b3a66));break;
case'globe':A(mesh(G.cyl(0.25,0.3,0.1,10),0x495057,0,0.05,0));A(mesh(G.cyl(0.04,0.04,0.5,6),0x495057,0,0.35,0));A(mesh(G.sph(0.4,12),0x1c7ed6,0,0.95,0,0x0b3a66));A(mesh(G.sph(0.2,8),0x40c057,0.2,1.0,0.28));break;
case'xtree':A(mesh(G.cyl(0.1,0.12,0.3,6),0x6f4e37,0,0.15,0));A(mesh(G.cone(0.55,0.8,8),0x2b8a3e,0,0.65,0));A(mesh(G.cone(0.42,0.7,8),0x2f9e44,0,1.15,0));A(mesh(G.cone(0.28,0.55,8),0x37b24d,0,1.6,0));A(mesh(G.sph(0.1,6),0xffd43b,0,1.95,0,0xaa8800));for(const[x,y,z,c]of[[.25,.5,.3,0xff6b6b],[-.2,.9,.25,0x4dabf7],[.15,1.3,.2,0xffd43b],[-.1,1.6,.15,0xff6b9d]])A(mesh(G.sph(0.07,6),c,x,y,z,c));break;
case'scope':for(const[x,z]of[[0,.3],[-.3,-.25],[.3,-.25]]){const l=mesh(G.cyl(0.03,0.03,1.0,5),0x343a40,x*0.8,0.5,z*0.8);l.rotation.z=x*-0.4;A(l)}{const t=mesh(G.cyl(0.1,0.16,1.0,10),0xf1f3f5,0,1.15,0);t.rotation.x=Math.PI/2-0.6;A(t);const e=mesh(G.cyl(0.12,0.12,0.06,10),0x1c7ed6,0,1.5,-0.38,0x0b3a66);e.rotation.x=Math.PI/2-0.6;A(e)}break;
case'jukebox':A(mesh(G.box(0.9,1.3,0.6),0xc2255c,0,0.65,0));A(mesh(G.cyl(0.45,0.45,0.6,12),0xe64980,0,1.3,0));A(mesh(G.box(0.6,0.5,0.05),0xffd43b,0,0.9,0.32,0xaa8800));A(mesh(G.box(0.6,0.12,0.05),0x74c0fc,0,0.45,0.32,0x113355));break;
case'pondf':A(mesh(G.cyl(0.95,0.95,0.07,16),0x4dabf7,0,0.05,0,0x0b3a66));A(mesh(G.cyl(1.0,1.05,0.1,16),0xadb5bd,0,0.0,0));for(const[x,z,c]of[[.3,.2,0xff922b],[-.35,-.1,0xf8f9fa],[.1,-.45,0xff6b6b]])A(mesh(G.box(0.3,0.04,0.12),c,x,0.1,z));for(const[x,z]of[[-.5,.35],[.45,-.3]]){A(mesh(G.cyl(0.18,0.18,0.02,8),0x2f9e44,x,0.1,z));A(mesh(G.sph(0.07,6),0xff6b9d,x,0.14,z))}break;
case'hammock':for(const x of[-0.95,0.95])A(mesh(G.cyl(0.06,0.08,1.3,6),0x8d5a2b,x,0.65,0));A(mesh(G.box(1.7,0.08,0.55),0xff922b,0,0.75,0));A(mesh(G.box(1.5,0.06,0.45),0xffd43b,0,0.82,0));A(mesh(G.box(0.4,0.12,0.35),0xf8f9fa,-0.55,0.9,0));break;
case'arcadem':A(mesh(G.box(0.8,1.5,0.7),0x1971c2,0,0.75,0));A(mesh(G.box(0.62,0.5,0.05),0x111111,0,1.1,0.36));A(mesh(G.box(0.5,0.38,0.03),0x69db7c,0,1.1,0.39,0x0b4a1b));A(mesh(G.box(0.7,0.1,0.4),0x343a40,0,0.75,0.4));A(mesh(G.sph(0.07,6),0xe03131,-0.12,0.85,0.42));A(mesh(G.sph(0.07,6),0xffd43b,0.12,0.85,0.42));A(mesh(G.box(0.8,0.2,0.7),0xf08c00,0,1.55,0));break;
case'balloons':A(mesh(G.cyl(0.18,0.2,0.08,8),0x495057,0,0.04,0));for(const[x,y,z,c]of[[-.2,1.6,0,0xff6b6b],[.2,1.8,.1,0x4dabf7],[0,2.0,-.15,0xffd43b]]){A(mesh(G.cyl(0.015,0.015,y-0.2,4),0xdee2e6,x*0.5,(y-0.2)/2+0.1,z*0.5));A(mesh(G.sph(0.28,8),c,x,y,z))}break;
case'cake':A(mesh(G.cyl(0.4,0.4,0.18,12),0xf8f9fa,0,0.09,0));A(mesh(G.cyl(0.3,0.3,0.25,12),0xf783ac,0,0.3,0));A(mesh(G.cyl(0.2,0.2,0.2,12),0xfff3bf,0,0.52,0));A(mesh(G.cyl(0.02,0.02,0.15,4),0xff6b6b,0,0.7,0));A(mesh(G.sph(0.04,5),0xffd43b,0,0.8,0,0xaa8800));A(mesh(G.sph(0.06,5),0xe03131,0.18,0.43,0.1));break;
case'plantpot':A(mesh(G.cyl(0.35,0.28,0.3,8),0xc2703a,0,0.15,0));A(mesh(G.cyl(0.05,0.07,0.5,6),0x7b4a2a,0,0.55,0));A(mesh(G.sph(0.4,8),0x2f9e44,0,1.0,0));A(mesh(G.sph(0.25,8),0x51cf66,0.25,0.9,0.1));break;
case'fishtank':A(mesh(G.box(1.6,0.12,0.6),0x495057,0,0.5,0));{const t=mesh(G.box(1.5,0.7,0.5),0x74c0fc,0,0.9,0);t.material=new THREE.MeshLambertMaterial({color:0x74c0fc,transparent:true,opacity:0.45});A(t)}A(mesh(G.sph(0.09,6),0xff922b,-0.3,0.95,0,0xaa4400));A(mesh(G.sph(0.07,6),0xffd43b,0.25,0.8,0.1,0xaa7a00));A(mesh(G.box(0.9,0.1,0.4),0xffe8a3,0,0.6,0));break;
case'merrygo':A(mesh(G.cyl(1.1,1.1,0.15,16),0xe64980,0,0.1,0));A(mesh(G.cyl(0.08,0.08,1.7,6),0xf8f9fa,0,0.95,0));A(mesh(G.cone(1.3,0.5,16),0xfab005,0,2,0,0x664400));for(const a of[0,2.1,4.2])A(mesh(G.box(0.3,0.4,0.6),[0xf8f9fa,0xa9744f,0x4dabf7][a/2.1|0],Math.cos(a)*0.75,0.5,Math.sin(a)*0.75));break;
case'campfire':for(let k=0;k<4;k++){const a=k*1.57;A(mesh(G.cyl(0.07,0.07,0.7,5),0x7b4a2a,Math.cos(a)*0.2,0.2,Math.sin(a)*0.2).rotateZ(Math.cos(a)*0.6).rotateX(Math.sin(a)*0.6))}A(mesh(G.cone(0.25,0.6,6),0xff922b,0,0.5,0,0xff5500));A(mesh(G.cone(0.14,0.4,6),0xffd43b,0,0.55,0,0xffaa00));break;
case'lighthouse':A(mesh(G.cyl(0.3,0.5,1.5,10),0xf8f9fa,0,0.75,0,0x555555));for(let k=0;k<3;k++)A(mesh(G.cyl(0.4-k*0.04,0.4-k*0.04,0.18,10),0xe03131,0,0.3+k*0.5,0,0x660000));A(mesh(G.cyl(0.32,0.32,0.08,10),0x212529,0,1.55,0));A(mesh(G.cyl(0.2,0.2,0.3,8),0xfff3bf,0,1.75,0,0xffd43b));A(mesh(G.cone(0.28,0.25,10),0xe03131,0,2.02,0,0x660000));break;
case'cannon':A(mesh(G.cyl(0.18,0.22,0.9,10),0x343a40,0,0.55,0.1,0x111111).rotateX(1.2));A(mesh(G.cyl(0.25,0.25,0.12,10),0x5c3a1e,-0.3,0.25,0).rotateZ(1.57));A(mesh(G.cyl(0.25,0.25,0.12,10),0x5c3a1e,0.3,0.25,0).rotateZ(1.57));A(mesh(G.sph(0.14,8),0x212529,0,0.2,0.6));break;
case'anvil':A(mesh(G.box(0.5,0.25,0.35),0x495057,0,0.12,0));A(mesh(G.box(0.3,0.15,0.25),0x495057,0,0.3,0));A(mesh(G.box(0.8,0.15,0.3),0x343a40,0,0.45,0));A(mesh(G.cone(0.15,0.25,4),0x343a40,0.5,0.45,0).rotateZ(-1.57));break;
case'tipi':for(let k=0;k<2;k++)A(mesh(G.cone(0.9-k*0.02,1.9,8),k?0xe9c46a:0xc2955a,0,0.95,0,0x3a2410));A(mesh(G.cone(0.3,0.7,4),0x2b2118,0,0.3,0.7));for(let k=0;k<3;k++)A(mesh(G.cyl(0.02,0.02,0.6,4),0x8d5524,-0.1+k*0.1,2.1,0));break;
case'igloo':A(mesh(G.sph(0.85,12),0xe9f5ff,0,0.2,0,0x6c8aa6));A(mesh(G.box(0.4,0.5,0.5),0x1c3d5a,0,0.25,0.75));A(mesh(G.box(0.5,0.1,0.5),0xcfe8fa,0,0.55,0.75));break;
case'mailbox':A(mesh(G.cyl(0.05,0.05,0.8,6),0x8d5524,0,0.4,0,0x3a2410));A(mesh(G.box(0.4,0.25,0.25),0x1971c2,0,0.9,0,0x0b3d73));A(mesh(G.box(0.04,0.2,0.04),0xe03131,0.22,1.0,0));break;
case'totem':for(let k=0;k<4;k++)A(mesh(G.box(0.4,0.4,0.4),[0xc2410c,0x2b8a3e,0xf2c94c,0x1971c2][k],0,0.2+k*0.4,0,0x3a2410));A(mesh(G.box(0.9,0.08,0.1),0xe03131,0,1.2,0.1));break;
case'birdhouse':A(mesh(G.cyl(0.05,0.05,0.9,6),0x8d5524,0,0.45,0,0x3a2410));A(mesh(G.box(0.4,0.35,0.35),0xf4a261,0,1.05,0,0x7a4a1f));A(mesh(G.cone(0.34,0.25,4),0xc92a2a,0,1.37,0).rotateY(0.785));A(mesh(G.cyl(0.07,0.07,0.04,8),0x111111,0,1.05,0.19).rotateX(1.57));break;
case'swingset':for(const s of[-0.8,0.8]){A(mesh(G.cyl(0.05,0.05,1.5,6),0x6c757d,s,0.75,-0.2).rotateZ(s>0?-0.12:0.12));A(mesh(G.cyl(0.05,0.05,1.5,6),0x6c757d,s,0.75,0.2).rotateZ(s>0?-0.12:0.12))}A(mesh(G.cyl(0.05,0.05,1.8,6),0x6c757d,0,1.45,0).rotateZ(1.5708));for(const s of[-0.3,0.3]){A(mesh(G.cyl(0.015,0.015,0.9,4),0x212529,s,1.0,0));A(mesh(G.box(0.3,0.05,0.18),0xe8590c,s,0.55,0,0x8a3200))}break;
case'lamppost':A(mesh(G.cyl(0.12,0.16,0.15,8),0x343a40,0,0.08,0));A(mesh(G.cyl(0.04,0.05,1.7,6),0x495057,0,0.95,0));A(mesh(G.sph(0.15,8),0xfff3bf,0,1.9,0,0xffd43b));A(mesh(G.cone(0.2,0.14,8),0x343a40,0,2.06,0));break;
case'dartboard':A(mesh(G.cyl(0.4,0.4,0.06,16),0x212529,0,1.2,0).rotateX(1.5708));A(mesh(G.cyl(0.3,0.3,0.07,16),0xe03131,0,1.2,0.01).rotateX(1.5708));A(mesh(G.cyl(0.2,0.2,0.08,16),0xf8f9fa,0,1.2,0.02).rotateX(1.5708));A(mesh(G.cyl(0.08,0.08,0.09,12),0x2f9e44,0,1.2,0.03).rotateX(1.5708));A(mesh(G.cyl(0.03,0.03,0.9,4),0x6c757d,0,0.45,-0.05));break;
case'vendingmachine':A(mesh(G.box(0.8,1.6,0.6),0xe03131,0,0.8,0,0x8a1c1c));A(mesh(G.box(0.6,0.9,0.05),0xa5d8ff,0,1.0,0.31,0x4c9be8));for(let k=0;k<3;k++)for(let j=0;j<3;j++)A(mesh(G.cyl(0.07,0.07,0.2,6),[0xffd43b,0x2f9e44,0xf8f9fa][(k+j)%3],-0.2+j*0.2,0.75+k*0.28,0.3));A(mesh(G.box(0.4,0.15,0.04),0x212529,0,0.2,0.31));break;
case'seesaw':A(mesh(G.cone(0.2,0.35,4),0x6c757d,0,0.18,0,0x343a40));{const bd=mesh(G.box(1.8,0.07,0.28),0xf08c00,0,0.42,0,0x8a4b00);bd.rotation.z=0.18;A(bd)}A(mesh(G.box(0.1,0.18,0.28),0x212529,-0.72,0.62,0));A(mesh(G.box(0.1,0.18,0.28),0x212529,0.72,0.3,0));break;
case'gramophone':A(mesh(G.box(0.5,0.3,0.5),0x7a4a1f,0,0.15,0,0x3a2410));A(mesh(G.cyl(0.2,0.2,0.04,12),0x212529,0,0.32,0));A(mesh(G.cyl(0.03,0.03,0.5,6),0x868e96,0,0.55,0));A(mesh(G.cone(0.3,0.45,12),0xffd43b,0,0.95,0,0xaa8800).rotateZ(0.5));break;
case'mushroom':A(mesh(G.cyl(0.14,0.18,0.5,8),0xf8f9fa,0,0.25,0,0x999999));A(mesh(G.sph(0.5,12),0xe03131,0,0.6,0,0x8a1c1c));for(const [x,z] of[[0.2,0.3],[-0.25,0.2],[0,-0.35]])A(mesh(G.sph(0.07,6),0xf8f9fa,x,0.95-Math.abs(x)*0.5,z));break;
case'snowglobe':A(mesh(G.cyl(0.3,0.36,0.2,12),0x7a4a1f,0,0.1,0,0x3a2410));A(mesh(G.sph(0.34,14),0xcfe8fa,0,0.5,0,0x74c0fc));A(mesh(G.cone(0.1,0.22,6),0x2f9e44,0,0.38,0));A(mesh(G.sph(0.08,6),0xffffff,0.1,0.3,0.05));A(mesh(G.sph(0.03,5),0xffffff,-0.12,0.6,0.1));break;
case'grandfather':A(mesh(G.box(0.5,1.8,0.3),0x7a4a1f,0,0.9,0,0x3a2410));A(mesh(G.cyl(0.2,0.2,0.05,14),0xf8f9fa,0,1.45,0.16,0x999999).rotateX(1.5708));A(mesh(G.box(0.03,0.15,0.02),0x212529,0,1.48,0.2));A(mesh(G.box(0.1,0.03,0.02),0x212529,0.04,1.45,0.2));A(mesh(G.box(0.3,0.5,0.04),0xa5d8ff,0,0.7,0.16,0x4c9be8));A(mesh(G.cyl(0.07,0.07,0.04,10),0xffd43b,0,0.55,0.19,0xaa8800).rotateX(1.5708));A(mesh(G.cone(0.3,0.25,4),0x5c3a1e,0,1.93,0).rotateY(0.785));break;
case'popcorn':A(mesh(G.box(0.7,0.15,0.55),0x343a40,0,0.08,0));A(mesh(G.box(0.6,0.7,0.45),0xe03131,0,0.5,0,0x8a1c1c));A(mesh(G.box(0.5,0.45,0.04),0xcfe8fa,0,0.55,0.24));A(mesh(G.cyl(0.3,0.22,0.3,10),0xf8f9fa,0,0.99,0,0x999999));for(let k=0;k<6;k++)A(mesh(G.sph(0.09,6),0xfff3bf,-0.15+(k%3)*0.15,1.2+(k>2?0.05:0),(k%2)*0.1-0.05));A(mesh(G.box(0.6,0.06,0.5),0xffd43b,0,0.88,0));break;
case'icecream':A(mesh(G.box(1.1,0.4,0.6),0xf8f9fa,0,0.4,0,0x999999));A(mesh(G.box(1.1,0.1,0.62),0xf783ac,0,0.6,0));A(mesh(G.cyl(0.05,0.05,1.0,6),0x6c757d,-0.5,1.0,-0.25));A(mesh(G.cyl(0.05,0.05,1.0,6),0x6c757d,0.5,1.0,-0.25));A(mesh(G.box(1.3,0.06,0.8),0x74c0fc,0,1.5,-0.1,0x1971c2));for(const x of[-0.3,0,0.3])A(mesh(G.sph(0.1,8),[0xf783ac,0xfff3bf,0x8ce99a][Math.round(x*3.3)+1],x,0.72,0.1));A(mesh(G.cyl(0.1,0.1,0.1,8),0x212529,-0.4,0.07,0.3).rotateX(1.5708));A(mesh(G.cyl(0.1,0.1,0.1,8),0x212529,0.4,0.07,0.3).rotateX(1.5708));break;
case'cottoncandy':A(mesh(G.cyl(0.04,0.04,0.7,6),0xf8f9fa,0,0.35,0,0x999999));A(mesh(G.sph(0.3,10),0xf783ac,0,0.95,0,0xe64980));A(mesh(G.sph(0.2,8),0x74c0fc,0.18,1.15,0.05));A(mesh(G.sph(0.16,8),0xd0bfff,-0.17,1.2,-0.05));A(mesh(G.cyl(0.16,0.2,0.08,10),0x343a40,0,0.04,0));break;
case'wagon':A(mesh(G.box(1.0,0.22,0.55),0xc92a2a,0,0.35,0,0x7a1414));A(mesh(G.box(1.0,0.2,0.04),0xc92a2a,0,0.5,0.26));A(mesh(G.box(1.0,0.2,0.04),0xc92a2a,0,0.5,-0.26));for(const x of[-0.35,0.35])for(const z of[-0.3,0.3])A(mesh(G.cyl(0.14,0.14,0.06,10),0x212529,x,0.14,z).rotateX(1.5708));A(mesh(G.cyl(0.03,0.03,0.7,5),0x6c757d,0.85,0.5,0).rotateZ(1.0));break;
case'pizzaoven':A(mesh(G.box(1.0,0.5,0.8),0xb5651d,0,0.25,0,0x5a320e));A(mesh(G.sph(0.5,12),0xc2410c,0,0.55,0,0x6b2308));A(mesh(G.box(0.34,0.26,0.1),0x212529,0,0.45,0.42));A(mesh(G.sph(0.1,6),0xff922b,0,0.42,0.44,0xff6b00));A(mesh(G.cyl(0.07,0.09,0.45,8),0x6c757d,0.25,1.1,-0.1));break;
case'toybox':A(mesh(G.box(0.8,0.4,0.5),0x1971c2,0,0.2,0,0x0b3d73));A(mesh(G.box(0.84,0.06,0.54),0xffd43b,0,0.43,0,0xaa8800));A(mesh(G.sph(0.14,8),0xc2955a,0,0.6,0,0x6b4423));A(mesh(G.sph(0.09,8),0xc2955a,0,0.78,0));A(mesh(G.box(0.14,0.14,0.14),0xe03131,0.25,0.5,0.1));A(mesh(G.sph(0.1,8),0x40c057,-0.25,0.5,0.1));break;
case'bathtub':A(mesh(G.box(1.1,0.4,0.55),0xf1f3f5,0,0.25,0,0xaaaaaa));A(mesh(G.box(0.95,0.06,0.42),0x74c0fc,0,0.46,0,0x1c7ed6));A(mesh(G.sph(0.12,6),0xffffff,-0.2,0.55,0,0xcccccc));A(mesh(G.sph(0.09,6),0xffffff,0.05,0.56,0.08,0xcccccc));A(mesh(G.cyl(0.04,0.04,0.3,6),0xadb5bd,0.5,0.55,0));break;
case'hotairballoon':A(mesh(G.sph(0.5,10),0xe03131,0,1.5,0,0x8a1010));A(mesh(G.sph(0.34,8),0xffd43b,0,1.52,0.2,0xaa8800));A(mesh(G.box(0.4,0.28,0.4),0xc2955a,0,0.45,0,0x6b4423));for(const x of[-0.18,0.18])A(mesh(G.cyl(0.015,0.015,0.7,4),0x495057,x,0.82,0));break;
case'bookcart':A(mesh(G.box(0.9,0.06,0.4),0x8b5a2b,0,0.5,0,0x4a2c0a));A(mesh(G.box(0.9,0.06,0.4),0x8b5a2b,0,0.18,0,0x4a2c0a));A(mesh(G.box(0.06,0.5,0.4),0x8b5a2b,-0.42,0.34,0));A(mesh(G.box(0.06,0.5,0.4),0x8b5a2b,0.42,0.34,0));for(let k=0;k<5;k++)A(mesh(G.box(0.1,0.28,0.3),[0xe03131,0x1971c2,0x2f9e44,0xffd43b,0x9c36b5][k],-0.3+k*0.14,0.67,0));A(mesh(G.sph(0.08,6),0x212529,-0.35,0.06,0.15));A(mesh(G.sph(0.08,6),0x212529,0.35,0.06,0.15));break;
case'chesstable':A(mesh(G.cyl(0.05,0.07,0.5,6),0x6b4423,0,0.25,0,0x3a2410));A(mesh(G.box(0.7,0.06,0.7),0x5c3a1e,0,0.52,0,0x2a1808));for(let i=0;i<4;i++)for(let j=0;j<4;j++)if((i+j)%2==0)A(mesh(G.box(0.16,0.02,0.16),0xf1e4c3,-0.24+i*0.16,0.56,-0.24+j*0.16));A(mesh(G.cyl(0.04,0.05,0.18,6),0x212529,-0.08,0.66,0.08));A(mesh(G.cyl(0.04,0.05,0.14,6),0xf8f9fa,0.08,0.64,-0.08,0xcccccc));break;
case'bunkbed':for(const x of[-0.5,0.5])for(const z of[-0.25,0.25])A(mesh(G.box(0.07,1.3,0.07),0x8b5a2b,x,0.65,z,0x4a2c0a));A(mesh(G.box(1.1,0.1,0.6),0x74c0fc,0,0.35,0,0x1c7ed6));A(mesh(G.box(1.1,0.1,0.6),0xff8787,0,1.0,0,0xc92a2a));A(mesh(G.box(0.25,0.08,0.4),0xffffff,-0.38,0.44,0));A(mesh(G.box(0.25,0.08,0.4),0xffffff,-0.38,1.09,0));A(mesh(G.box(0.05,0.65,0.05),0x8b5a2b,0.58,0.65,0.0));break;
case'hayrolls':A(mesh(G.cyl(0.35,0.35,0.5,10),0xe9c46a,-0.25,0.35,0,0x8a6a10));A(mesh(G.cyl(0.35,0.35,0.5,10),0xdda94b,0.4,0.35,0.1,0x8a6a10));A(mesh(G.cyl(0.3,0.3,0.45,10),0xf0d27a,0.05,0.85,0.05,0x8a6a10));A(mesh(G.cyl(0.36,0.36,0.04,10),0x8b5a2b,-0.25,0.35,0.0));break;
case'wheelbarrow':A(mesh(G.box(0.7,0.25,0.45),0x2f9e44,0,0.4,-0.05,0x145a22));A(mesh(G.cyl(0.14,0.14,0.06,10),0x212529,0,0.14,0.42).rotateZ(1.5708));A(mesh(G.box(0.05,0.05,0.5),0x8b5a2b,-0.2,0.28,-0.5,0x4a2c0a));A(mesh(G.box(0.05,0.05,0.5),0x8b5a2b,0.2,0.28,-0.5,0x4a2c0a));for(let k=0;k<4;k++)A(mesh(G.sph(0.09,6),0x8b5a2b,-0.2+k*0.13,0.6,-0.05,0x4a2c0a));break;
case'abacus':A(mesh(G.box(0.7,0.04,0.04),0x8b5a2b,0,0.05,0,0x4a2c0a));A(mesh(G.box(0.04,0.7,0.04),0x8b5a2b,-0.33,0.4,0,0x4a2c0a));A(mesh(G.box(0.04,0.7,0.04),0x8b5a2b,0.33,0.4,0,0x4a2c0a));A(mesh(G.box(0.7,0.04,0.04),0x8b5a2b,0,0.75,0,0x4a2c0a));for(let r=0;r<4;r++){A(mesh(G.cyl(0.008,0.008,0.62,4),0x495057,0,0.2+r*0.15,0).rotateZ(1.5708));for(let b=0;b<4;b++)A(mesh(G.sph(0.045,6),[0xe03131,0x1971c2,0xffd43b,0x2f9e44][r],-0.25+b*0.07+(r%2)*0.2,0.2+r*0.15,0,0x222222))}break;
case'typewriter':A(mesh(G.box(0.6,0.18,0.4),0x343a40,0,0.3,0,0x111111));A(mesh(G.box(0.55,0.04,0.3),0xdee2e6,0,0.41,0.03));for(let i=0;i<5;i++)for(let j=0;j<2;j++)A(mesh(G.cyl(0.03,0.03,0.03,6),0xf8f9fa,-0.2+i*0.1,0.45,0.08-j*0.1));A(mesh(G.box(0.5,0.3,0.05),0xf1f3f5,0,0.6,-0.2));A(mesh(G.box(0.08,0.02,0.5),0x8b5a2b,0,0.17,0));A(mesh(G.cyl(0.04,0.04,0.55,6),0x212529,0,0.5,-0.15,0x000000).rotateZ(1.5708));A(mesh(G.box(0.5,0.28,0.01),0xffffff,0,0.65,-0.19,0xdddddd));break;
case'lampion':A(mesh(G.cyl(0.02,0.02,0.9,5),0x8b5a2b,0,0.45,0));A(mesh(G.sph(0.25,8),0xe03131,0,0.95,0,0xff6b3d));A(mesh(G.cyl(0.1,0.1,0.04,8),0xffd43b,0,1.2,0,0x806000));A(mesh(G.cyl(0.1,0.1,0.04,8),0xffd43b,0,0.7,0,0x806000));for(let k=0;k<3;k++)A(mesh(G.cyl(0.008,0.008,0.2,4),0xffd43b,-0.06+k*0.06,0.58,0));break;
case'compass':A(mesh(G.cyl(0.4,0.4,0.06,16),0xb8860b,0,0.05,0,0x5a4300));A(mesh(G.cyl(0.34,0.34,0.065,16),0xf8f9fa,0,0.055,0));A(mesh(G.box(0.05,0.07,0.6),0xe03131,0,0.1,0.0,0x6a0000));A(mesh(G.box(0.05,0.07,0.3),0x1971c2,0,0.1,-0.15,0x001a4a));A(mesh(G.box(0.3,0.07,0.04),0x343a40,0,0.1,0));break;
case'woodstove':A(mesh(G.box(0.6,0.7,0.5),0x343a40,0,0.4,0,0x111111));A(mesh(G.box(0.4,0.3,0.02),0xff6b3d,0,0.4,0.26,0xff4500));A(mesh(G.cyl(0.07,0.07,0.6,8),0x212529,0,1.05,-0.1,0x000000));A(mesh(G.box(0.66,0.05,0.56),0x495057,0,0.78,0));for(let k=0;k<3;k++)A(mesh(G.cyl(0.05,0.05,0.4,6),0x8b5a2b,-0.15+k*0.15,0.1,0.35,0x4a2c0a).rotateZ(1.5708));break;
case'sundial':A(mesh(G.cyl(0.2,0.25,0.5,10),0x868e96,0,0.25,0,0x333333));A(mesh(G.cyl(0.4,0.4,0.06,16),0xadb5bd,0,0.53,0,0x444444));A(mesh(G.box(0.03,0.3,0.3),0xb8860b,0,0.7,0.0,0x5a4300));for(let k=0;k<6;k++){const t=-1.2+k*0.48;A(mesh(G.box(0.03,0.02,0.1),0x212529,Math.sin(t)*0.3,0.57,-Math.cos(t)*0.3))}break;
case'pagoda':for(let k=0;k<3;k++){A(mesh(G.box(0.5-k*0.1,0.22,0.5-k*0.1),0xf1e0c5,0,0.15+k*0.4,0,0x6b5a3a));A(mesh(G.cyl(0.18,0.46-k*0.1,0.1,4),0xc92a2a,0,0.32+k*0.4,0,0x5a0f0f).rotateY(0.785))}A(mesh(G.cyl(0.01,0.02,0.3,5),0xffd43b,0,1.5,0,0x806000));break;
case'gong':A(mesh(G.box(0.05,0.9,0.05),0x8b5a2b,-0.35,0.45,0,0x4a2c0a));A(mesh(G.box(0.05,0.9,0.05),0x8b5a2b,0.35,0.45,0,0x4a2c0a));A(mesh(G.box(0.8,0.05,0.05),0x8b5a2b,0,0.9,0,0x4a2c0a));A(mesh(G.cyl(0.28,0.28,0.04,16),0xe6b422,0,0.55,0,0x7a5a00).rotateX(1.5708));A(mesh(G.sph(0.06,6),0xb8860b,0,0.55,0.04,0x5a4300));break;
case'birdbath':A(mesh(G.cyl(0.12,0.16,0.5,8),0xadb5bd,0,0.25,0,0x333333));A(mesh(G.cyl(0.32,0.2,0.12,12),0xced4da,0,0.55,0,0x444444));A(mesh(G.cyl(0.26,0.26,0.02,12),0x4dabf7,0,0.62,0,0x1864ab));A(mesh(G.sph(0.06,6),0xffd43b,0.1,0.7,0,0x806000));A(mesh(G.sph(0.045,6),0xff8787,0.1,0.76,0.04));break;
case'sleigh':A(mesh(G.box(0.8,0.2,0.4),0xc92a2a,0,0.3,0,0x5a0f0f));A(mesh(G.box(0.1,0.35,0.4),0xc92a2a,-0.4,0.5,0,0x5a0f0f));A(mesh(G.box(0.9,0.04,0.05),0xb8860b,0,0.1,0.15,0x5a4300));A(mesh(G.box(0.9,0.04,0.05),0xb8860b,0,0.1,-0.15,0x5a4300));A(mesh(G.box(0.05,0.2,0.05),0xb8860b,-0.25,0.2,0.15));A(mesh(G.box(0.05,0.2,0.05),0xb8860b,0.25,0.2,-0.15));A(mesh(G.sph(0.14,6),0x2f9e44,0.1,0.5,0,0x145a22));break;
case'harp':A(mesh(G.box(0.06,0.9,0.06),0xb8860b,-0.25,0.5,0,0x5a4300));A(mesh(G.box(0.4,0.05,0.07),0xb8860b,0.0,0.05,0,0x5a4300));A(mesh(G.box(0.06,0.5,0.06),0xb8860b,0.25,0.3,0,0x5a4300).rotateZ(-0.5));for(let k=0;k<6;k++)A(mesh(G.cyl(0.006,0.006,0.7-k*0.08,3),0xf8f9fa,-0.2+k*0.07,0.45+k*0.04,0));break;
case'loom':A(mesh(G.box(0.06,0.9,0.06),0x8b5a2b,-0.4,0.45,0,0x4a2c0a));A(mesh(G.box(0.06,0.9,0.06),0x8b5a2b,0.4,0.45,0,0x4a2c0a));A(mesh(G.box(0.9,0.06,0.1),0x8b5a2b,0,0.9,0,0x4a2c0a));A(mesh(G.box(0.9,0.06,0.1),0x8b5a2b,0,0.1,0,0x4a2c0a));for(let k=0;k<9;k++)A(mesh(G.cyl(0.006,0.006,0.8,3),0xf1f3f5,-0.34+k*0.085,0.5,0));for(let k=0;k<4;k++)A(mesh(G.box(0.7,0.05,0.02),[0xe03131,0x1971c2,0xffd43b,0x2f9e44][k],0,0.15+k*0.07,0.01));break;
case'cauldron':A(mesh(G.sph(0.3,10),0x212529,0,0.35,0,0x000000));A(mesh(G.cyl(0.25,0.25,0.03,12),0x69db7c,0,0.6,0,0x2b8a3e));for(let k=0;k<3;k++)A(mesh(G.cyl(0.02,0.02,0.2,4),0x8b5a2b,-0.2+k*0.2,0.07,0.15,0x4a2c0a));A(mesh(G.sph(0.06,5),0xb197fc,0.05,0.7,0.0,0x7048e8));A(mesh(G.sph(0.04,5),0xb197fc,-0.1,0.8,0.05,0x7048e8));break;
case'spinwheel':A(mesh(G.cyl(0.45,0.45,0.05,16),0xc2955a,0,0.62,0,0x6b4423).rotateX(1.5708));A(mesh(G.cyl(0.36,0.36,0.07,16),0x3b2a1a,0,0.62,0,0x000000).rotateX(1.5708));for(let k=0;k<4;k++)A(mesh(G.box(0.03,0.8,0.08),0xffe8b0,0,0.62,0,0x8a7a50).rotateZ(k*0.7854));A(mesh(G.sph(0.07,6),0xe03131,0,0.62,0.06,0x6a0000));A(mesh(G.box(0.8,0.06,0.25),0x8b5a2b,0,0.06,0,0x4a2c0a));A(mesh(G.box(0.06,0.35,0.06),0x8b5a2b,0,0.25,0,0x4a2c0a));A(mesh(G.sph(0.09,6),0xf8f9fa,0.38,0.45,0.0,0x888888));break;
case'beehive':A(mesh(G.cyl(0.04,0.04,0.3,4),0x8b5a2b,-0.15,0.15,0,0x4a2c0a));A(mesh(G.cyl(0.04,0.04,0.3,4),0x8b5a2b,0.15,0.15,0,0x4a2c0a));for(let k=0;k<5;k++)A(mesh(G.cyl(0.24-Math.abs(k-2)*0.03,0.24-Math.abs(k-2)*0.03,0.1,10),k%2?0x8a5a10:0xffd43b,0,0.35+k*0.1,0,k%2?0x2a1a00:0x806000));A(mesh(G.sph(0.06,5),0x212529,0,0.45,0.23));A(mesh(G.sph(0.03,4),0x212529,0.2,0.75,0.1,0x000000));break;
case'candelabra':A(mesh(G.cyl(0.1,0.14,0.06,8),0xe6b422,0,0.03,0,0x7a5a00));A(mesh(G.cyl(0.03,0.03,0.5,6),0xe6b422,0,0.3,0,0x7a5a00));A(mesh(G.box(0.6,0.03,0.03),0xe6b422,0,0.55,0,0x7a5a00));for(let k=0;k<3;k++){A(mesh(G.cyl(0.03,0.03,0.18,6),0xf8f9fa,-0.28+k*0.28,0.66,0));A(mesh(G.sph(0.035,5),0xffd43b,-0.28+k*0.28,0.79,0,0xff9900))}break;
case'icecart':A(mesh(G.box(0.8,0.3,0.45),0xf783ac,0,0.4,0,0xc2255c));A(mesh(G.box(0.82,0.05,0.47),0xf8f9fa,0,0.58,0));A(mesh(G.cyl(0.12,0.12,0.05,10),0x212529,-0.28,0.14,0.25).rotateZ(1.5708));A(mesh(G.cyl(0.12,0.12,0.05,10),0x212529,0.28,0.14,0.25).rotateZ(1.5708));A(mesh(G.cyl(0.02,0.02,0.7,4),0x8b5a2b,0,0.95,0,0x4a2c0a));A(mesh(G.cyl(0.0,0.5,0.15,12),0x74c0fc,0,1.3,0,0x1864ab));for(let k=0;k<3;k++)A(mesh(G.sph(0.06,6),[0xfff3bf,0xffa8a8,0x8ce99a][k],-0.2+k*0.2,0.65,0.0));break;
case'chandelier':A(mesh(G.cyl(0.14,0.18,0.06,10),0x7a5a00,0,0.03,0,0x3a2a00));A(mesh(G.cyl(0.03,0.04,0.9,6),0xe6b422,0,0.5,0,0x7a5a00));A(mesh(G.cyl(0.38,0.38,0.06,14),0xe6b422,0,0.95,0,0x7a5a00));for(let k=0;k<6;k++){const t=k*1.047;A(mesh(G.cyl(0.025,0.025,0.2,5),0xf8f9fa,Math.cos(t)*0.34,1.08,Math.sin(t)*0.34));A(mesh(G.sph(0.07,6),0xfff3a0,Math.cos(t)*0.34,1.22,Math.sin(t)*0.34,0xffcc00))}A(mesh(G.sph(0.12,7),0xa5d8ff,0,1.05,0,0x4dabf7));break;
case'canoe':A(mesh(G.box(0.95,0.14,0.34),0xe8590c,0,0.14,0,0x7a2a00));A(mesh(G.box(0.2,0.14,0.3),0xe8590c,0.55,0.18,0,0x7a2a00).rotateZ(0.5));A(mesh(G.box(0.2,0.14,0.3),0xe8590c,-0.55,0.18,0,0x7a2a00).rotateZ(-0.5));A(mesh(G.box(0.9,0.02,0.26),0xffd8a8,0,0.22,0));A(mesh(G.box(0.05,0.06,0.3),0x8b5a2b,0.1,0.24,0));A(mesh(G.cyl(0.015,0.015,0.9,4),0x8b5a2b,0,0.3,0.1,0x4a2c0a).rotateZ(1.2));break;
case'clockg':A(mesh(G.box(0.4,1.2,0.25),0x8b5a2b,0,0.6,0,0x4a2c0a));A(mesh(G.cyl(0.17,0.17,0.04,14),0xf8f9fa,0,0.95,0.13,0xaaaaaa).rotateX(1.5708));A(mesh(G.box(0.02,0.12,0.02),0x212529,0,0.99,0.16));A(mesh(G.box(0.09,0.02,0.02),0x212529,0.04,0.95,0.16));A(mesh(G.box(0.3,0.4,0.03),0x5a3a1a,0,0.4,0.13,0x2a1a0a));A(mesh(G.cyl(0.07,0.07,0.02,10),0xe6b422,0,0.28,0.15,0x7a5a00).rotateX(1.5708));A(mesh(G.box(0.46,0.06,0.3),0x6b4423,0,1.23,0,0x2a1a0a));break;
case'hatstand':A(mesh(G.cyl(0.18,0.2,0.05,10),0x5a3a1a,0,0.03,0,0x2a1a0a));A(mesh(G.cyl(0.03,0.03,1.4,6),0x8b5a2b,0,0.7,0,0x4a2c0a));for(let k=0;k<4;k++){const t=k*1.5708+0.4;A(mesh(G.cyl(0.015,0.015,0.2,4),0x8b5a2b,Math.cos(t)*0.1,1.35+(k%2)*0.05,Math.sin(t)*0.1,0x4a2c0a))}A(mesh(G.cyl(0.14,0.14,0.14,10),0x212529,0,1.5,0,0x000000));A(mesh(G.cyl(0.2,0.2,0.02,10),0x212529,0,1.43,0,0x000000));A(mesh(G.box(0.2,0.06,0.04),0xe03131,0.15,1.2,0.1,0x6a0000));break;
case'umbrella':A(mesh(G.cyl(0.03,0.03,1.3,6),0xf8f9fa,0,0.65,0,0x888888));A(mesh(G.cyl(0.02,0.62,0.3,10),0xe03131,0,1.35,0,0x6a0000));A(mesh(G.cyl(0.02,0.4,0.2,10),0xf8f9fa,0,1.46,0,0x888888));A(mesh(G.cyl(0.18,0.2,0.06,10),0xffd43b,0,0.03,0,0x806000));A(mesh(G.sph(0.06,5),0xe03131,0,1.52,0,0x6a0000));break;
case'telephone':A(mesh(G.box(0.34,0.14,0.26),0x212529,0,0.1,0,0x000000));A(mesh(G.cyl(0.1,0.1,0.03,10),0xf8f9fa,0,0.18,0.02,0xaaaaaa));A(mesh(G.box(0.34,0.06,0.07),0xc92a2a,0,0.26,-0.08,0x5a0f0f));A(mesh(G.sph(0.06,6),0xc92a2a,-0.17,0.26,-0.08,0x5a0f0f));A(mesh(G.sph(0.06,6),0xc92a2a,0.17,0.26,-0.08,0x5a0f0f));break;
case'samovar':A(mesh(G.cyl(0.2,0.14,0.45,12),0xb8860b,0,0.35,0,0x5a4300));A(mesh(G.cyl(0.12,0.15,0.1,10),0x8a6508,0,0.08,0,0x3a2a00));A(mesh(G.sph(0.14,8),0xb8860b,0,0.64,0,0x5a4300));A(mesh(G.cyl(0.04,0.04,0.1,6),0x8a6508,0,0.78,0,0x3a2a00));A(mesh(G.cyl(0.02,0.02,0.2,5),0xe6b422,0.26,0.4,0,0x7a5a00).rotateZ(1.2));A(mesh(G.sph(0.04,5),0x212529,-0.22,0.4,0));break;
case'pottery':A(mesh(G.sph(0.26,10),0xc2611f,0,0.28,0,0x6a2a00));A(mesh(G.cyl(0.12,0.2,0.12,10),0xc2611f,0,0.55,0,0x6a2a00));A(mesh(G.cyl(0.14,0.14,0.03,10),0xe8a06a,0,0.62,0,0x7a4a20));A(mesh(G.box(0.4,0.04,0.04),0xf1d4a0,0,0.3,0.25,0x806040));A(mesh(G.box(0.04,0.1,0.04),0xf1d4a0,0,0.3,0.25,0x806040));break;
case'fishbowl':A(mesh(G.sph(0.26,12),0x74c0fc,0,0.42,0,0x1864ab));A(mesh(G.cyl(0.22,0.26,0.1,10),0x495057,0,0.08,0,0x111111));A(mesh(G.sph(0.07,6),0xff922b,0.04,0.4,0.05,0xcc5500));A(mesh(G.cyl(0.0,0.06,0.1,5),0xff922b,-0.05,0.4,0.05,0xcc5500).rotateZ(1.57));A(mesh(G.sph(0.03,5),0xffffff,0.06,0.5,0.1));A(mesh(G.sph(0.05,6),0x69db7c,-0.1,0.2,-0.05,0x2b8a3e));break;
case'kettle':A(mesh(G.cyl(0.2,0.24,0.26,12),0x868e96,0,0.2,0,0x222222));A(mesh(G.sph(0.2,10),0x868e96,0,0.34,0,0x222222));A(mesh(G.sph(0.05,6),0x212529,0,0.56,0,0x000000));A(mesh(G.cyl(0.03,0.05,0.22,6),0x868e96,0.26,0.32,0,0x222222).rotateZ(-0.8));A(mesh(G.cyl(0.02,0.02,0.3,6),0x212529,-0.2,0.4,0,0x000000).rotateZ(0.5));g.scale.setScalar(1.7);break;
case'toolbox':A(mesh(G.box(0.6,0.26,0.28),0xe03131,0,0.15,0,0x5c0000));A(mesh(G.box(0.62,0.04,0.3),0xc92a2a,0,0.3,0,0x500000));A(mesh(G.box(0.3,0.04,0.04),0x212529,0,0.4,0,0x000000));A(mesh(G.box(0.04,0.1,0.04),0x212529,-0.14,0.35,0,0x000000));A(mesh(G.box(0.04,0.1,0.04),0x212529,0.14,0.35,0,0x000000));A(mesh(G.box(0.12,0.05,0.02),0xffd43b,0,0.18,0.15,0x886600));g.scale.setScalar(1.5);break;
case'trumpet':A(mesh(G.cyl(0.03,0.03,0.7,8),0xffd43b,0,0.4,0,0x996600).rotateZ(1.57));A(mesh(G.cyl(0.03,0.2,0.22,10),0xffd43b,0.42,0.4,0,0x996600).rotateZ(-1.57));A(mesh(G.cyl(0.03,0.03,0.3,8),0xfab005,0,0.55,0,0x886600).rotateZ(1.57));A(mesh(G.cyl(0.03,0.03,0.12,6),0x212529,-0.08,0.28,0,0x000000));A(mesh(G.cyl(0.03,0.03,0.12,6),0x212529,0,0.28,0,0x000000));A(mesh(G.cyl(0.03,0.03,0.12,6),0x212529,0.08,0.28,0,0x000000));g.scale.setScalar(1.5);break;
case'postbox':A(mesh(G.cyl(0.04,0.04,0.7,6),0x495057,0,0.35,0,0x111111));A(mesh(G.box(0.4,0.3,0.26),0x1c7ed6,0,0.8,0,0x0b3d6b));A(mesh(G.sph(0.2,10),0x1c7ed6,0,0.95,0,0x0b3d6b));A(mesh(G.box(0.26,0.04,0.02),0x111111,0,0.82,0.14,0x000000));A(mesh(G.box(0.14,0.1,0.02),0xffffff,0,0.7,0.14,0x888888));g.scale.setScalar(1.6);break;
case'ladder':A(mesh(G.box(0.06,1.4,0.06),0xc2955a,-0.22,0.7,0,0x6b4423).rotateX(0.2));A(mesh(G.box(0.06,1.4,0.06),0xc2955a,0.22,0.7,0,0x6b4423).rotateX(0.2));for(let k=0;k<5;k++)A(mesh(G.box(0.44,0.05,0.05),0x8b5a2b,0,0.2+k*0.28,0.2-k*0.055,0x4a2c0a));break;
case'watering':A(mesh(G.cyl(0.2,0.17,0.3,12),0x2f9e44,0,0.17,0,0x0b3d16));A(mesh(G.cyl(0.03,0.04,0.4,6),0x2f9e44,0.3,0.34,0,0x0b3d16).rotateZ(-0.9));A(mesh(G.cyl(0.07,0.04,0.06,8),0x2f9e44,0.47,0.5,0,0x0b3d16).rotateZ(-0.9));A(mesh(G.box(0.05,0.28,0.05),0x2b8a3e,-0.2,0.35,0,0x0b3d16));A(mesh(G.box(0.2,0.04,0.05),0x2b8a3e,-0.1,0.5,0,0x0b3d16));g.scale.setScalar(1.5);break;
case'bookpile':for(const[y,w,c,x]of[[0.06,0.5,0xe03131,0],[0.17,0.44,0x1c7ed6,0.03],[0.28,0.46,0x2f9e44,-0.03],[0.39,0.38,0xfab005,0.02]])A(mesh(G.box(w,0.1,0.34),c,x,y,0));A(mesh(G.box(0.4,0.02,0.3),0xf8f9fa,0,0.17,0.01));g.scale.setScalar(1.5);break;
case'sewing':A(mesh(G.box(0.7,0.08,0.3),0x343a40,0,0.1,0,0x111111));A(mesh(G.box(0.14,0.45,0.2),0xf8f9fa,-0.22,0.36,0,0x666666));A(mesh(G.box(0.5,0.12,0.2),0xf8f9fa,-0.02,0.58,0,0x666666));A(mesh(G.cyl(0.015,0.015,0.2,5),0x868e96,0.2,0.46,0));A(mesh(G.cyl(0.1,0.1,0.06,10),0xe64980,-0.3,0.66,0,0x660033));A(mesh(G.box(0.14,0.03,0.16),0xadb5bd,0.2,0.2,0));g.scale.setScalar(1.5);break;
case'skateboard':A(mesh(G.box(0.7,0.05,0.2),0xf76707,0,0.14,0,0x6b2c00));for(const x of[-0.24,0.24])for(const z of[-0.08,0.08])A(mesh(G.cyl(0.05,0.05,0.04,8),0xf8f9fa,x,0.07,z).rotateX(1.5708));A(mesh(G.box(0.3,0.02,0.12),0x212529,0,0.17,0));g.scale.setScalar(1.5);break;
case'scales':A(mesh(G.cyl(0.18,0.22,0.06,10),0x8b5a2b,0,0.03,0,0x4a2c0a));A(mesh(G.cyl(0.03,0.03,0.9,6),0xffd43b,0,0.5,0,0x886600));A(mesh(G.box(0.9,0.04,0.04),0xffd43b,0,0.95,0,0x886600));for(const x of[-0.42,0.42]){A(mesh(G.cyl(0.002,0.002,0.3,3),0x868e96,x,0.78,0));A(mesh(G.cyl(0.14,0.1,0.05,10),0xffd43b,x,0.6,0,0x886600))}g.scale.setScalar(1.3);break;
case'bellows':A(mesh(G.box(0.5,0.05,0.3),0x8b5a2b,-0.05,0.3,0,0x4a2c0a).rotateZ(0.22));A(mesh(G.box(0.5,0.05,0.3),0x8b5a2b,-0.05,0.08,0,0x4a2c0a).rotateZ(-0.12));A(mesh(G.box(0.4,0.22,0.26),0x5c3a1e,-0.05,0.19,0,0x2a1808));A(mesh(G.cyl(0.04,0.06,0.3,6),0x343a40,0.32,0.15,0,0x000000).rotateZ(1.5708));A(mesh(G.box(0.18,0.04,0.05),0x212529,-0.38,0.4,0,0x000000));A(mesh(G.sph(0.04,5),0xffd43b,0,0.2,0.14,0x886600));A(mesh(G.sph(0.04,5),0xffd43b,-0.15,0.2,0.14,0x886600));g.scale.setScalar(1.6);break;
case'satchel':A(mesh(G.box(0.4,0.3,0.14),0x8d5524,0,0.2,0,0x3a2410));A(mesh(G.box(0.42,0.12,0.16),0x6f4518,0,0.32,0,0x2a1808));A(mesh(G.box(0.06,0.08,0.02),0xffd43b,0,0.28,0.09,0x886600));A(mesh(G.cyl(0.015,0.015,0.3,5),0x3a2410,-0.15,0.42,0).rotateZ(0.5));A(mesh(G.cyl(0.015,0.015,0.3,5),0x3a2410,0.15,0.42,0).rotateZ(-0.5));g.scale.setScalar(1.6);break;
case'bicycle':for(const z of[-0.4,0.4])A(mesh(G.cyl(0.3,0.3,0.05,14),0x212529,0,0.32,z,0x000000).rotateZ(1.5708).rotateY(0));A(mesh(G.box(0.05,0.05,0.9),0x1c7ed6,0,0.55,0,0x0b3d6b));A(mesh(G.box(0.05,0.35,0.05),0x1c7ed6,0,0.5,0.4,0x0b3d6b));A(mesh(G.box(0.4,0.05,0.05),0x212529,0,0.82,0.4,0x000000));A(mesh(G.box(0.14,0.05,0.25),0x212529,0,0.78,-0.25,0x000000));g.scale.setScalar(1.7);break;
case'blender':A(mesh(G.cyl(0.18,0.22,0.2,10),0x343a40,0,0.1,0,0x111111));A(mesh(G.cyl(0.2,0.14,0.5,10),0xa5d8ff,0,0.45,0,0x1864ab));A(mesh(G.cyl(0.2,0.2,0.05,10),0xe03131,0,0.72,0,0x5c0000));A(mesh(G.sph(0.03,5),0x40c057,0.2,0.1,0.1,0x0b5a1b));g.scale.setScalar(1.4);break;
case'cooler':A(mesh(G.box(0.7,0.4,0.4),0x1c7ed6,0,0.25,0,0x0b3d6b));A(mesh(G.box(0.74,0.08,0.44),0xf8f9fa,0,0.48,0,0x888888));A(mesh(G.box(0.3,0.04,0.05),0x212529,0,0.56,0,0x000000));A(mesh(G.box(0.05,0.1,0.05),0x212529,-0.14,0.53,0,0x000000));A(mesh(G.box(0.05,0.1,0.05),0x212529,0.14,0.53,0,0x000000));g.scale.setScalar(1.4);break;
case'iron':A(mesh(G.box(0.5,0.08,0.28),0xced4da,0,0.1,0,0x555555));A(mesh(G.cone(0.14,0.22,4),0xced4da,0.3,0.1,0,0x555555).rotateZ(-1.5708));A(mesh(G.box(0.3,0.14,0.2),0x4dabf7,-0.05,0.2,0,0x1864ab));A(mesh(G.box(0.3,0.04,0.06),0x212529,-0.05,0.3,0,0x000000));A(mesh(G.box(0.9,0.05,0.4),0xf1f3f5,0,0.02,0.45,0x999999));g.scale.setScalar(1.5);break;
case'rockinghorse':A(mesh(G.box(0.9,0.05,0.12),0x8b5a2b,0,0.05,0.14,0x4a2c0a));A(mesh(G.box(0.9,0.05,0.12),0x8b5a2b,0,0.05,-0.14,0x4a2c0a));A(mesh(G.box(0.6,0.3,0.25),0xc2955a,0,0.5,0,0x6b4423));A(mesh(G.box(0.08,0.35,0.08),0xc2955a,-0.2,0.25,0.1));A(mesh(G.box(0.08,0.35,0.08),0xc2955a,0.2,0.25,-0.1));A(mesh(G.box(0.16,0.4,0.16),0xc2955a,0.35,0.78,0,0x6b4423));A(mesh(G.box(0.3,0.16,0.16),0xc2955a,0.5,0.95,0,0x6b4423));A(mesh(G.sph(0.03,5),0x111111,0.5,1.0,0.09));A(mesh(G.box(0.05,0.2,0.1),0x212529,0.28,0.88,0));A(mesh(G.box(0.05,0.2,0.06),0x212529,-0.34,0.58,0,0x000000));break;
case'treasurechest':A(mesh(G.box(0.7,0.3,0.45),0x8b5a2b,0,0.15,0,0x4a2c0a));A(mesh(G.cyl(0.225,0.225,0.7,10),0x6b4423,0,0.32,0,0x3a2410).rotateZ(1.5708));A(mesh(G.box(0.72,0.05,0.47),0xffd43b,0,0.3,0,0xaa8800));A(mesh(G.box(0.08,0.12,0.05),0xffd43b,0,0.25,0.24,0xaa8800));for(let k=0;k<5;k++)A(mesh(G.cyl(0.05,0.05,0.015,8),0xffd43b,-0.15+k*0.08,0.58+(k%2)*0.04,0,0xaa8800));break;
case'anchor':A(mesh(G.cyl(0.04,0.04,0.9,6),0x495057,0,0.55,0));A(mesh(G.box(0.4,0.05,0.05),0x495057,0,0.85,0));A(mesh(G.sph(0.07,8),0x495057,0,1.05,0));A(mesh(G.cyl(0.04,0.04,0.5,6),0x495057,-0.2,0.18,0).rotateZ(0.9));A(mesh(G.cyl(0.04,0.04,0.5,6),0x495057,0.2,0.18,0).rotateZ(-0.9));A(mesh(G.cyl(0.0,0.09,0.15,4),0x495057,-0.38,0.05,0));A(mesh(G.cyl(0.0,0.09,0.15,4),0x495057,0.38,0.05,0));break;
case'lifebuoy':for(let k=0;k<12;k++){const a=k/12*6.283;A(mesh(G.sph(0.09,6),k%2?0xf8f9fa:0xe03131,Math.cos(a)*0.32,0.4+Math.sin(a)*0.32,0,k%2?0xcccccc:0x8a1010))}A(mesh(G.cyl(0.02,0.02,0.4,4),0x8b5a2b,0,0.05,0));break;
case'surfboard':A(mesh(G.box(0.3,1.3,0.06),0xff922b,0,0.7,0,0xc2410c));A(mesh(G.box(0.3,0.2,0.065),0xfff3bf,0,0.9,0.005,0xaa9900));A(mesh(G.box(0.06,1.2,0.07),0xf8f9fa,0,0.7,0.005));A(mesh(G.box(0.4,0.06,0.4),0x8b5a2b,0,0.03,0.0,0x4a2c0a));break;
case'tricycle':A(mesh(G.cyl(0.22,0.22,0.05,12),0x212529,0,0.22,0.3,0x000000).rotateZ(1.5708));for(const x of[-0.2,0.2])A(mesh(G.cyl(0.15,0.15,0.05,12),0x212529,x,0.15,-0.25).rotateZ(1.5708));A(mesh(G.box(0.08,0.5,0.08),0xe03131,0,0.45,0.1,0x8a1010));A(mesh(G.box(0.4,0.06,0.3),0xe03131,0,0.4,-0.15,0x8a1010));A(mesh(G.box(0.4,0.05,0.05),0x495057,0,0.72,0.2));A(mesh(G.box(0.2,0.06,0.2),0x212529,0,0.5,-0.2));break;
case'cradle':A(mesh(G.box(0.8,0.06,0.45),0xc2955a,0,0.12,0,0x6b4423));A(mesh(G.box(0.8,0.3,0.05),0xe8b896,0,0.3,0.2,0x6b4423));A(mesh(G.box(0.8,0.3,0.05),0xe8b896,0,0.3,-0.2,0x6b4423));A(mesh(G.box(0.05,0.4,0.45),0xe8b896,-0.4,0.32,0));A(mesh(G.box(0.05,0.3,0.45),0xe8b896,0.4,0.28,0));A(mesh(G.box(0.65,0.1,0.36),0xffc9de,0,0.2,0,0xe64980));A(mesh(G.sph(0.11,8),0xffdfc4,-0.22,0.3,0,0xcc9966));A(mesh(G.cyl(0.02,0.02,0.4,4),0xc2955a,0,0.62,0));break;
case'stool':A(mesh(G.cyl(0.2,0.2,0.05,10),0xffd43b,0,0.65,0,0xaa8800));for(const[x,z]of[[-0.15,-0.15],[0.15,-0.15],[-0.15,0.15],[0.15,0.15]])A(mesh(G.cyl(0.025,0.03,0.65,5),0x8b5a2b,x,0.32,z));A(mesh(G.box(0.4,0.04,0.04),0x8b5a2b,0,0.3,0.15));A(mesh(G.box(0.35,0.04,0.04),0x8b5a2b,0,0.3,-0.15));A(mesh(G.box(0.4,0.3,0.04),0xffd43b,0,0.85,-0.18,0xaa8800));break;
case'cuckoo':A(mesh(G.box(0.5,0.45,0.25),0x8b5a2b,0,0.9,0,0x4a2c0a));A(mesh(G.cyl(0.0,0.4,0.25,4),0x6b4423,0,1.25,0,0x3a2410).rotateY(0.785));A(mesh(G.cyl(0.14,0.14,0.04,12),0xfff3bf,0,0.88,0.13,0xaa9900).rotateX(1.5708));A(mesh(G.cyl(0.012,0.012,0.12,4),0x212529,0,0.92,0.16));A(mesh(G.cyl(0.03,0.03,0.4,5),0xffd43b,0,0.55,0.05,0xaa8800));A(mesh(G.sph(0.06,6),0xffd43b,0,0.32,0.05,0xaa8800));A(mesh(G.sph(0.06,6),0xffd43b,0.14,0.4,0.05,0xaa8800));break;
case'hourglass':A(mesh(G.cyl(0.25,0.25,0.06,8),0x8b5a2b,0,0.03,0,0x4a2c0a));A(mesh(G.cyl(0.25,0.25,0.06,8),0x8b5a2b,0,1.0,0,0x4a2c0a));A(mesh(G.cyl(0.0,0.2,0.4,8),0xe9c46a,0,0.28,0,0x8a6a10));A(mesh(G.cyl(0.2,0.0,0.4,8),0xa5d8ff,0,0.75,0,0x1c7ed6));A(mesh(G.sph(0.03,6),0xe9c46a,0,0.52,0));break;
case'sandtower':A(mesh(G.cyl(0.5,0.6,0.25,10),0xe9c46a,0,0.12,0,0x8a6a10));A(mesh(G.cyl(0.14,0.16,0.5,8),0xf4d58d,-0.25,0.5,0));A(mesh(G.cyl(0.14,0.16,0.5,8),0xf4d58d,0.25,0.5,0));A(mesh(G.cyl(0.0,0.17,0.2,8),0xe03131,-0.25,0.85,0,0x8a1010));A(mesh(G.cyl(0.0,0.17,0.2,8),0xe03131,0.25,0.85,0,0x8a1010));A(mesh(G.box(0.3,0.35,0.2),0xf4d58d,0,0.42,0));break;
case'sunflower':A(mesh(G.cyl(0.03,0.04,1.2,6),0x2f9e44,0,0.6,0));A(mesh(G.sph(0.11,6),0x6b4423,0,1.28,0.04));for(let k=0;k<10;k++){const a=k/10*6.283;A(mesh(G.sph(0.07,5),0xffd43b,Math.cos(a)*0.16,1.28+Math.sin(a)*0.16,0.0,0xf08c00))}A(mesh(G.sph(0.09,6),0x2f9e44,0.12,0.5,0.0));break;
case'rocket':A(mesh(G.cyl(0.22,0.26,1.1,10),0xf8f9fa,0,0.8,0,0x555555));A(mesh(G.cone(0.22,0.4,10),0xe03131,0,1.55,0,0x660000));A(mesh(G.sph(0.09,6),0x4dabf7,0,1.0,0.22,0x1971c2));for(let k=0;k<3;k++){const a=k*2.094;A(mesh(G.box(0.05,0.35,0.22),0xe03131,Math.cos(a)*0.28,0.35,Math.sin(a)*0.28,0x660000))}A(mesh(G.cone(0.14,0.3,8),0xff922b,0,0.1,0,0xff6600).rotateX(3.14));break;
case'sandcastle':A(mesh(G.cyl(0.55,0.65,0.3,10),0xe9c46a,0,0.15,0));A(mesh(G.cyl(0.3,0.35,0.5,8),0xf4d58d,0,0.55,0));for(let k=0;k<6;k++){const a=k/6*6.283;A(mesh(G.box(0.1,0.12,0.1),0xf4d58d,Math.cos(a)*0.3,0.86,Math.sin(a)*0.3))}A(mesh(G.cyl(0.01,0.01,0.3,4),0x8d5524,0,1.05,0));A(mesh(G.box(0.15,0.1,0.01),0xe03131,0.08,1.12,0));break;
case'treasure':A(mesh(G.box(0.7,0.35,0.45),0x8d5524,0,0.18,0,0x3a2410));{const l=mesh(G.cyl(0.225,0.225,0.7,8),0x7a4a1f,0,0.4,0,0x3a2410);l.rotation.z=1.5708;l.scale.set(1,1,1);A(l)}A(mesh(G.box(0.08,0.4,0.48),0xffd43b,-0.22,0.28,0,0xaa8800));A(mesh(G.box(0.08,0.4,0.48),0xffd43b,0.22,0.28,0,0xaa8800));A(mesh(G.sph(0.06,6),0xffd43b,0,0.4,0.23,0xaa8800));for(let k=0;k<4;k++)A(mesh(G.cyl(0.06,0.06,0.02,8),0xffd43b,-0.3+k*0.2,0.03,0.4,0xaa8800));break;
case'scarecrow':A(mesh(G.cyl(0.03,0.03,1.6,4),0x8d5524,0,0.8,0));A(mesh(G.box(1.0,0.05,0.05),0x8d5524,0,1.15,0));A(mesh(G.box(0.35,0.45,0.15),0x2f9e44,0,1.0,0));A(mesh(G.sph(0.17,8),0xf4d58d,0,1.5,0));A(mesh(G.cyl(0.25,0.25,0.03,10),0xc2955a,0,1.62,0));A(mesh(G.cyl(0.14,0.16,0.18,8),0xc2955a,0,1.72,0));break;
case'kayak':{const b=mesh(G.sph(0.5,10),0xf76707,0,0.3,0,0x6b2c00);b.scale.set(2.2,0.4,0.7);A(b)}A(mesh(G.cyl(0.015,0.015,1.6,4),0x868e96,0,0.6,0).rotateZ(1.57));A(mesh(G.sph(0.1,6),0x1971c2,-0.8,0.6,0.02));A(mesh(G.sph(0.1,6),0x1971c2,0.8,0.6,-0.02));break;
case'hottub':A(mesh(G.cyl(0.9,0.95,0.55,16),0x5c3a1e,0,0.28,0));A(mesh(G.cyl(0.78,0.78,0.06,16),0x3bc9db,0,0.55,0,0x0b7285));for(let k=0;k<3;k++)A(mesh(G.sph(0.08,6),0xe3fafc,-0.3+k*0.3,0.62+k%2*0.05,0.1));break;
case'windmill':A(mesh(G.cyl(0.25,0.4,1.3,8),0xf1f3f5,0,0.65,0));A(mesh(G.cone(0.32,0.4,8),0xc92a2a,0,1.5,0,0x550000));for(let k=0;k<4;k++){const a=k*1.5708;A(mesh(G.box(0.12,0.7,0.03),0x8d5524,Math.sin(a)*0.35,1.2+Math.cos(a)*0.35,0.4).rotateZ(-a))}A(mesh(G.sph(0.07,6),0x212529,0,1.2,0.4));break;
case'piggybank':{const b=mesh(G.sph(0.3,8),0xf783ac,0,0.38,0,0x883355);b.scale.set(1.2,1,1);A(b)}A(mesh(G.sph(0.1,6),0xf06595,0.34,0.4,0));A(mesh(G.cone(0.05,0.1,4),0xf783ac,-0.1,0.7,0.1));A(mesh(G.cone(0.05,0.1,4),0xf783ac,0.1,0.7,0.1));A(mesh(G.box(0.14,0.03,0.03),0x111111,0,0.68,0));for(const x of[-0.18,0.18])A(mesh(G.cyl(0.05,0.05,0.12,6),0xf783ac,x,0.07,0.1));break;
case'guitar':A(mesh(G.cyl(0.02,0.02,0.15,4),0x495057,0,0.08,0));{const b=mesh(G.sph(0.25,8),0xc2410c,0,0.55,0,0x5a1a00);b.scale.set(1,1.2,0.35);A(b)}A(mesh(G.cyl(0.14,0.14,0.04,10),0x212529,0,0.55,0.07));A(mesh(G.box(0.07,0.7,0.05),0x5c3a1e,0,1.15,0));A(mesh(G.box(0.14,0.15,0.05),0x212529,0,1.55,0));break;
case'scooter':A(mesh(G.box(0.3,0.06,0.9),0x1c7ed6,0,0.18,0,0x0b3d75));A(mesh(G.cyl(0.12,0.12,0.06,10),0x212529,0,0.12,0.4).rotateZ(1.57));A(mesh(G.cyl(0.12,0.12,0.06,10),0x212529,0,0.12,-0.4).rotateZ(1.57));A(mesh(G.cyl(0.03,0.03,1.0,6),0x868e96,0,0.7,0.42));A(mesh(G.box(0.5,0.05,0.05),0x212529,0,1.2,0.42));break;
case'chessboard':A(mesh(G.cyl(0.04,0.06,0.5,6),0x5c3a1e,0,0.25,0));for(let i=0;i<4;i++)for(let j=0;j<4;j++)A(mesh(G.box(0.17,0.04,0.17),(i+j)%2?0x212529:0xf8f9fa,-0.255+i*0.17,0.55,-0.255+j*0.17));A(mesh(G.cyl(0.04,0.05,0.2,6),0xf8f9fa,-0.1,0.67,0.07));A(mesh(G.cyl(0.04,0.05,0.25,6),0x212529,0.1,0.69,-0.07));break;
case'arcade':A(mesh(G.box(0.8,1.7,0.7),0x7048e8,0,0.85,0,0x2b1a66));A(mesh(G.box(0.62,0.45,0.05),0x15aabf,0,1.25,0.36,0x0b6b78));A(mesh(G.box(0.7,0.08,0.4),0x5f3dc4,0,0.85,0.42));A(mesh(G.cyl(0.02,0.02,0.15,4),0x495057,-0.1,0.95,0.45));A(mesh(G.sph(0.05,6),0xe03131,-0.1,1.03,0.45,0x880000));A(mesh(G.sph(0.04,6),0xffd43b,0.15,0.91,0.45,0xaa8800));break;
case'telescope':A(mesh(G.cyl(0.02,0.03,0.9,4),0x868e96,0,0.45,0));{const t=mesh(G.cyl(0.07,0.1,0.7,8),0x1971c2,0,1.0,0,0x0b3d75);t.rotation.x=-0.7;A(t)}A(mesh(G.cyl(0.09,0.09,0.04,8),0xffd43b,0,0.9,0.1,0xaa8800));break;
case'trampoline':A(mesh(G.cyl(0.9,0.9,0.06,16),0x212529,0,0.45,0));A(mesh(G.cyl(0.78,0.78,0.07,16),0x4dabf7,0,0.46,0,0x1864ab));for(let i=0;i<4;i++){const a=i*1.5708+0.78;A(mesh(G.cyl(0.03,0.03,0.45,4),0x868e96,Math.cos(a)*0.8,0.22,Math.sin(a)*0.8))}break;
case'drumkit':A(mesh(G.cyl(0.3,0.3,0.4,10),0xe03131,0,0.25,0,0x7a1010));A(mesh(G.cyl(0.18,0.18,0.25,10),0xc92a2a,-0.4,0.4,0.2));A(mesh(G.cyl(0.18,0.18,0.25,10),0xc92a2a,0.4,0.4,0.2));A(mesh(G.cyl(0.02,0.02,0.9,4),0x868e96,-0.55,0.45,-0.2));A(mesh(G.cyl(0.22,0.22,0.02,10),0xffd43b,-0.55,0.9,-0.2,0xaa8800));A(mesh(G.cyl(0.02,0.02,0.9,4),0x868e96,0.55,0.45,-0.2));A(mesh(G.cyl(0.22,0.22,0.02,10),0xffd43b,0.55,0.9,-0.2,0xaa8800));break;
case'bbq':A(mesh(G.sph(0.3,8),0x212529,0,0.6,0));A(mesh(G.cyl(0.28,0.28,0.04,10),0x868e96,0,0.62,0));for(const x of[-0.2,0.2])A(mesh(G.cyl(0.02,0.02,0.5,4),0x495057,x,0.25,0.15));A(mesh(G.box(0.5,0.05,0.04),0x868e96,0,0.7,0.1));A(mesh(G.sph(0.06,5),0xff6b00,0.1,0.72,0,0xff6b00));break;
case'lavalamp':A(mesh(G.cyl(0.22,0.28,0.15,8),0x495057,0,0.08,0));{const t=mesh(G.cyl(0.14,0.24,0.7,8),0xff6b9d,0,0.5,0,0xaa2255);A(t)}A(mesh(G.sph(0.12,6),0xffd43b,0,0.55,0.05,0xaa8800));A(mesh(G.sph(0.09,6),0xffa8c5,0.03,0.78,0,0xaa4466));A(mesh(G.cone(0.1,0.2,8),0x495057,0,0.95,0));break;
case'pinata':A(mesh(G.cyl(0.02,0.02,1.2,4),0x868e96,0,1.9,0));A(mesh(G.box(0.7,0.5,0.45),0xff6b6b,0,1.15,0,0x551111));A(mesh(G.box(0.7,0.12,0.46),0xffd43b,0,1.0,0,0x886600));A(mesh(G.box(0.7,0.12,0.46),0x4dabf7,0,1.3,0,0x114466));A(mesh(G.sph(0.18,6),0xff6b6b,0.4,1.35,0,0x551111));A(mesh(G.cone(0.08,0.22,4),0xffd43b,-0.3,1.5,0,0x886600));break;
case'snowman':A(mesh(G.sph(0.45,10),0xf8f9fa,0,0.45,0,0x444444));A(mesh(G.sph(0.32,10),0xf8f9fa,0,1.05,0,0x444444));A(mesh(G.sph(0.22,10),0xf8f9fa,0,1.5,0,0x444444));A(mesh(G.cone(0.05,0.28,4),0xff922b,0,1.5,0.22).rotateX(1.57));A(mesh(G.cyl(0.2,0.2,0.18,8),0x212529,0,1.75,0));A(mesh(G.sph(0.03,5),0x111111,-0.08,1.56,0.19));A(mesh(G.sph(0.03,5),0x111111,0.08,1.56,0.19));break;
case'radio':A(mesh(G.box(0.8,0.5,0.35),0x8d5524,0,0.45,0));A(mesh(G.cyl(0.14,0.14,0.04,10),0xffd43b,-0.2,0.45,0.19).rotateX(1.57));A(mesh(G.box(0.25,0.15,0.04),0xdee2e6,0.2,0.5,0.19,0x888888));A(mesh(G.cyl(0.03,0.03,0.4,4),0x868e96,0.3,0.9,0));break;
case'throne':A(mesh(G.box(1.5,0.5,0.9),0xc92a2a,0,0.35,0));A(mesh(G.box(1.5,1.6,0.2),0xc92a2a,0,1.1,-0.35));A(mesh(G.box(0.2,0.8,0.9),0xffd43b,-0.75,0.7,0,0x886600));A(mesh(G.box(0.2,0.8,0.9),0xffd43b,0.75,0.7,0,0x886600));A(mesh(G.cone(0.2,0.4,5),0xffd43b,0,2.05,-0.35,0xaa7a00));A(mesh(G.sph(0.1,6),0x4dabf7,0,1.7,-0.24,0x1971c2));break;
case'robot':A(mesh(G.box(0.6,0.7,0.4),0x868e96,0,0.7,0));A(mesh(G.box(0.5,0.4,0.4),0xced4da,0,1.25,0));A(mesh(G.sph(0.07,6),0x4dabf7,-0.12,1.28,0.21,0x0b3a66));A(mesh(G.sph(0.07,6),0x4dabf7,0.12,1.28,0.21,0x0b3a66));A(mesh(G.cyl(0.015,0.015,0.2,4),0x495057,0,1.55,0));A(mesh(G.sph(0.05,5),0xe03131,0,1.68,0,0x660000));for(const x of[-0.2,0.2])A(mesh(G.box(0.14,0.35,0.14),0x495057,x,0.18,0));for(const x of[-0.42,0.42])A(mesh(G.box(0.1,0.5,0.1),0x868e96,x,0.75,0));break;
case'beanbag':A(mesh(G.sph(0.55,10),0x9c36b5,0,0.4,0));A(mesh(G.sph(0.35,8),0xbe4bdb,0,0.75,-0.1));break;
case'drums':A(mesh(G.cyl(0.4,0.4,0.5,12),0xe03131,-0.4,0.5,0));A(mesh(G.cyl(0.3,0.3,0.4,12),0x1971c2,0.3,0.75,0.1));A(mesh(G.cyl(0.35,0.35,0.35,12),0xf08c00,0.6,0.45,-0.2));A(mesh(G.cyl(0.03,0.03,1.0,5),0x868e96,-0.7,0.9,0.1));A(mesh(G.cyl(0.3,0.3,0.03,12),0xffd43b,-0.7,1.4,0.1,0x886600));break;
case'easel':for(const x of[-.3,.3])A(mesh(G.box(0.06,1.6,0.06),0x8d6e63,x,0.8,x*0.3));A(mesh(G.box(0.9,0.7,0.05),0xf8f9fa,0,1.1,0.05));A(mesh(G.sph(0.18,6),0xff6b6b,-0.2,1.15,0.09));A(mesh(G.sph(0.14,6),0x4dabf7,0.15,1.0,0.09));A(mesh(G.sph(0.12,6),0xffd43b,0.1,1.3,0.09));break;
case'tent':A(mesh(G.cone(1.5,1.6,4),0xf76707,0,0.8,0));A(mesh(G.box(0.6,0.9,0.05),0x5c3d1e,0,0.45,0.72));A(mesh(G.cone(0.1,0.25,4),0xffd43b,0,1.7,0,0x886600));break;
case'poster':{A(mesh(G.box(1.8,1.2,0.08),0xf8f9fa,0,2.3,-0.44));const pm=new THREE.MeshBasicMaterial({color:0x74c0fc});const pl=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.0),pm);pl.position.set(0,2.3,-0.39);A(pl);
try{const al=(room&&room.owner===me.id&&typeof albumGet==='function')?albumGet():[];if(al.length){const im=new Image();im.onload=()=>{const t=new THREE.Texture(im);t.needsUpdate=true;t.minFilter=THREE.LinearFilter;pm.map=t;pm.color.set(0xffffff);pm.needsUpdate=true};im.src=al[(me.posIdx|0)%al.length].u}else{pm.color.set(0xffd43b)}}catch(e){}}break;
case'painting':A(mesh(G.box(1.8,1.2,0.08),0x6d4c2a,0,2.3,-0.44));A(mesh(G.box(1.6,1.0,0.06),0x74c0fc,0,2.3,-0.4));A(mesh(G.box(1.6,0.4,0.07),0x51cf66,0,2.0,-0.39));A(mesh(G.sph(0.18,8),0xffd43b,0.4,2.55,-0.36,0xaa8800));A(mesh(G.cone(0.3,0.5,4),0x868e96,-0.4,2.35,-0.37));break;
case'wclock':{const f=mesh(G.cyl(0.38,0.38,0.08,16),0x5c3d1e,0,2.4,-0.42);f.rotation.x=Math.PI/2;A(f);const fc=mesh(G.cyl(0.32,0.32,0.06,16),0xf8f9fa,0,2.4,-0.39);fc.rotation.x=Math.PI/2;A(fc);A(mesh(G.box(0.04,0.22,0.03),0x111,0,2.46,-0.35));const hh=mesh(G.box(0.03,0.15,0.03),0x111,0.06,2.4,-0.35);hh.rotation.z=-1.1;A(hh)}break;
case'banner':A(mesh(G.box(0.1,0.1,0.1),0x6d4c2a,-0.8,2.9,-0.42));A(mesh(G.box(1.8,0.06,0.06),0x6d4c2a,0,2.9,-0.42));A(mesh(G.box(1.5,1.2,0.04),0xc92a2a,0,2.25,-0.42));A(mesh(G.cone(0.3,0.35,5),0xffd43b,0,2.4,-0.39,0xaa8800));A(mesh(G.box(1.5,0.12,0.05),0xffd43b,0,1.7,-0.41));break;
case'mirror':A(mesh(G.box(0.8,1.4,0.08),0xffd43b,0,2.2,-0.44,0x553d00));A(mesh(G.box(0.66,1.26,0.06),0xcfeaff,0,2.2,-0.4,0x335577));break;
case'trophy':A(mesh(G.box(0.7,0.5,0.7),0x495057,0,0.25,0));A(mesh(G.cyl(0.3,0.1,0.6,10),0xffd43b,0,0.85,0,0x553d00));A(mesh(G.cyl(0.05,0.05,0.3,6),0xffd43b,0,0.5,0,0x553d00));break;
}
g.userData.id=id;return g;
}
let home={items:[],floor:0,wall:0,name:'',group:null,fgroup:null,ghost:null,grid:null,floorMesh:null,wallMeshes:[]};
function footprint(id,rot){const c=CAT[id];return rot%2?[c.d,c.w]:[c.w,c.d]}
function furnPlace(g,id,cx,cz,rot){const[w,d]=footprint(id,rot);g.position.set(cx-7+w/2,0,cz-7+d/2);g.rotation.y=-rot*Math.PI/2}
function rebuildFurn(){
if(home.fgroup)home.group.remove(home.fgroup);
const fg=new THREE.Group();home.fgroup=fg;home.group.add(fg);room.pickables=[];
home.items.forEach((it,i)=>{const g=buildFurn(it[0]);furnPlace(g,it[0],it[1],it[2],it[3]);g.userData.idx=i;fg.add(g);room.pickables.push(g)});
if(home.sel!=null&&home.items[home.sel]){const it=home.items[home.sel],[w,d]=footprint(it[0],it[3]);const hb=new THREE.Mesh(G.box(w,0.06,d),new THREE.MeshBasicMaterial({color:0xffd43b,transparent:true,opacity:0.5}));hb.position.set(it[1]-7+w/2,0.08,it[2]-7+d/2);fg.add(hb)}
}
function applyHomeColors(){
home.floorMesh.material=M(FLOORS[home.floor%FLOORS.length]);
for(const w of home.wallMeshes)w.material=M(WALLS[home.wall%WALLS.length]);
}
let interacts=[],actFn=null,gbCb=null;
function indoor(fc,wc,neon){
const g=new THREE.Group();g.add(mesh(G.box(16,0.3,16),fc,0,-0.15,0),mesh(G.box(17,0.1,17),0x15182f,0,-0.35,0));
g.add(mesh(G.box(16.4,5,0.4),wc,0,2.5,-8.2),mesh(G.box(0.4,5,16.4),wc,-8.2,2.5,0));
if(neon){g.add(mesh(G.box(16,0.15,0.1),neon,0,3.8,-7.95,neon),mesh(G.box(0.1,0.15,16),neon,-7.95,3.8,0,neon),mesh(G.box(16,0.15,0.1),neon,0,0.4,-7.95,neon))}
const pm=portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza');g.add(pm);return g}
function finishRoom(g){mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[]}
function sign(g,t,x,y,z,col){const l=labelSprite(t,{s:3.2,bg:col||'rgba(16,24,48,.85)'});l.position.set(x,y,z);g.add(l)}
function buildArcade(){
interacts=[];const g=indoor(0x22254d,0x2b2f6a,0xff4dc4);
const cols=[0xff6b6b,0x4dabf7,0xffd43b,0x69db7c,0xb197fc];
for(let i=0;i<5;i++){const x=-6+i*3;const c=new THREE.Group();c.position.set(x,0,-7.2);c.add(mesh(G.box(1.6,2.6,1.1),0x1b1b3a,0,1.3,0),mesh(G.box(1.3,1,0.1),cols[i],0,1.8,0.56,cols[i]),mesh(G.box(1.5,0.2,0.8),0x343a40,0,1.0,0.5));
for(let k=0;k<3;k++)c.add(mesh(G.sph(0.08,6),cols[(i+k)%5],-0.3+k*0.3,1.0,0.82,cols[(i+k)%5]));g.add(c)}
const t=new THREE.Group();t.position.set(-3.5,0,-1);t.add(mesh(G.cyl(1.2,1.2,0.12,20),0x7048e8,0,0.9,0),mesh(G.cyl(0.15,0.25,0.9,8),0x343a40,0,0.45,0));
for(let r=0;r<3;r++)for(let c=0;c<3;c++)t.add(mesh(G.box(0.4,0.03,0.4),(r+c)%2?0xf8f9fa:0xced4da,-0.45+c*0.45,0.97,-0.45+r*0.45));
g.add(t);sign(g,'❌⭕ إكس أو',-3.5,2.4,-1);interacts.push({x:-3.5,z:-1,label:'🎮 العب إكس أو',fn:openTTT});
const m=new THREE.Group();m.position.set(4,0,-3.5);m.add(mesh(G.box(1.4,2.2,1),0x0b7285,0,1.1,0),mesh(G.box(1.1,0.9,0.1),0x69db7c,0,1.5,0.52,0x226633),mesh(G.cyl(0.35,0.35,0.15,16),0xff3b3b,0,0.95,0.5,0x661111));g.add(m);
sign(g,'🃏 لعبة الذاكرة',0.5,2.4,2.5);{const mk=(x,z,c)=>{const t=new THREE.Group();t.position.set(x,0,z);t.add(mesh(G.cyl(0.8,0.8,0.1,16),c,0,0.9,0,c),mesh(G.cyl(0.12,0.2,0.9,8),0x343a40,0,0.45,0));g.add(t)};mk(-4.2,3.6,0x7048e8);mk(4.4,-3.2,0x12b886);sign(g,'🔴 سيمون يقول',-4.2,2.4,3.6);interacts.push({x:-4.2,z:4.8,label:'🔴 العب سيمون يقول',fn:openSimon});sign(g,'⚡ سرعة رد الفعل',4.4,2.4,-3.2);interacts.push({x:4.4,z:-2,label:'⚡ اختبر سرعتك',fn:openReact})}{const mt=new THREE.Group();mt.position.set(0.5,0,2.5);mt.add(mesh(G.cyl(0.9,0.9,0.1,16),0x2b8a3e,0,0.9,0),mesh(G.cyl(0.12,0.2,0.9,8),0x343a40,0,0.45,0));for(let i=0;i<3;i++)mt.add(mesh(G.box(0.3,0.02,0.42),[0xff6b6b,0xffd43b,0x4dabf7][i],-0.4+i*0.4,0.97,0.1*(i-1)));g.add(mt);interacts.push({x:0.5,z:2.5,label:'🃏 العب لعبة الذاكرة',fn:openMemory})}sign(g,'⚡ اختبار السرعة',4,2.9,-3.5);interacts.push({x:4,z:-3.5,label:'⚡ اختبر سرعتك',fn:openReact});
g.add(portalMesh('🎳 البولينج',5.5,5,0xbe4bdb,'bowl'),portalMesh('🎯 ميدان الرماية',-5.5,5,0xe03131,'gallery'),portalMesh('🚗 التصادم',-5.5,-2.5,0x4263eb,'bump'));interacts.push({x:6.2,z:-1.5,label:'🏆 لوحة الأبطال',fn:openChamps});interacts.push({x:0,z:-3.5,label:'📅 تحدي الأسبوع',fn:openWeekly});sign(g,'📅 تحدي الأسبوع',0,2.4,-4.6);sign(g,'🏆 الأبطال',6.2,2.4,-2.6);
finishRoom(g);
}
function buildCafe(){
interacts=[];const g=indoor(0xb08968,0xf3e2c7,0xffa94d);
const ct=new THREE.Group();ct.position.set(0,0,-4.8);ct.add(mesh(G.box(7,1.1,1.2),0x6f4e37,0,0.55,0),mesh(G.box(7.2,0.12,1.4),0xd9b38c,0,1.14,0));
for(let i=0;i<4;i++)ct.add(mesh(G.cyl(0.2,0.2,0.3,10),[0xe03131,0x1971c2,0xf08c00,0x2f9e44][i],-2.4+i*1.6,1.35,0));
g.add(ct);sign(g,'☕ اطلب مشروب',0,2.6,-4.8);interacts.push({x:0,z:-3.6,label:'☕ اطلب مشروب',fn:openCafeMenu});
const j=new THREE.Group();j.position.set(-6,0,-6.5);j.add(mesh(G.box(1.3,2.3,0.9),0x862e9c,0,1.15,0),mesh(G.cyl(0.5,0.5,0.1,14),0xffd43b,0,1.7,0.46,0x665500));g.add(j);
sign(g,'🎵 صندوق الموسيقى',-6,2.9,-6.5);interacts.push({x:-6,z:-5.4,label:'🎵 شغّل/وقّف الموسيقى',fn:jukebox});
for(const[x,z]of[[-4,0],[4,0],[-4,3],[4,3],[0,1.5]]){const t=new THREE.Group();t.position.set(x,0,z);t.add(mesh(G.cyl(0.8,0.8,0.1,16),0x8d6e63,0,0.8,0),mesh(G.cyl(0.1,0.15,0.8,6),0x4e342e,0,0.4,0));for(const dx of[-1.1,1.1])t.add(mesh(G.cyl(0.3,0.3,0.1,10),0xc2410c,dx,0.5,0),mesh(G.cyl(0.05,0.05,0.5,6),0x333,dx,0.25,0));g.add(t)}
g.add(mesh(G.box(0.1,2,3),0x74c0fc,-8.0,2.4,3,0x112244));
g.add(portalMesh('🎡 عجلة الحظ',6,5.8,0x9775fa,'wheel'));
g.add(portalMesh('📸 استوديو الصور',-6,5.8,0xffd43b,'photo'),portalMesh('🥐 المخبز',-6,-2.5,0xe8590c,'bake'),portalMesh('🔭 القبة النجمية',6,-2.5,0x5c7cfa,'plan'));
finishRoom(g);
}
let ball=null,ballV={x:0,z:0},lastKick=null,goalCool=0,goals=0,ballSend=0;
function buildPark(){
interacts=[];const g=new THREE.Group();
const gm=mesh(G.box(40,0.3,40),0x3fa34d,0,-0.15,0);gm.material=new THREE.MeshLambertMaterial({map:grassTex()});g.add(gm);
const ln=0xffffff;g.add(mesh(G.box(33,0.02,0.12),ln,0,0.02,0),mesh(G.box(0.12,0.02,33),ln,0,0.02,0),mesh(G.box(33,0.02,0.12),ln,0,0.02,16.5),mesh(G.box(33,0.02,0.12),ln,0,0.02,-16.5),mesh(G.box(0.12,0.02,33),ln,16.5,0.02,0),mesh(G.box(0.12,0.02,33),ln,-16.5,0.02,0));
const circ=new THREE.Mesh(new THREE.RingGeometry(3,3.15,32),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));circ.rotation.x=-Math.PI/2;circ.position.y=0.03;g.add(circ);
for(const sx of[-1,1]){const gx=sx*16.4;g.add(mesh(G.box(0.2,2.2,0.2),0xf8f9fa,gx,1.1,-2.6),mesh(G.box(0.2,2.2,0.2),0xf8f9fa,gx,1.1,2.6),mesh(G.box(0.2,0.2,5.4),0xf8f9fa,gx,2.2,0));const net=mesh(G.box(0.05,2.1,5.2),0xdee2e6,gx+sx*1.2,1.05,0);net.material=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.25});g.add(net)}
const rng=mulberry(21);for(let i=0;i<16;i++){const an=i/16*6.283,r=22,t=new THREE.Group();t.position.set(Math.cos(an)*r,0,Math.sin(an)*r);t.add(mesh(G.cyl(0.18,0.25,1.4,6),0x7b4a2a,0,0.7,0),mesh(G.cone(1.1,2.2,7),0x2b8a3e,0,2.2,0));g.add(t)}
ball=new THREE.Mesh(new THREE.SphereGeometry(0.45,12,10),new THREE.MeshLambertMaterial({color:0xffffff}));ball.userData.keep=true;ball.position.set(0,0.45,0);g.add(ball);ballV={x:0,z:0};lastKick=null;goalCool=0;
g.add(portalMesh('اخرج للساحة',0,15.8,0xff8787,'plaza'),portalMesh('🏀 تحدي السلة',-9,15.8,0xe8590c,'hoops'),portalMesh('⚽ ركلات الجزاء',9,15.8,0x2f9e44,'pen'),portalMesh('⛸️ حلبة التزلج',4.5,15.8,0x74c0fc,'ice'),portalMesh('🦁 حديقة الحيوان',-14.5,15.8,0xf59f00,'zoo'),portalMesh('🐠 الأكواريوم',-4.5,15.8,0x22b8cf,'tank'),portalMesh('🙈 الاستغماية',14.5,15.8,0xffa94d,'seek'),portalMesh('🌸 حديقة الورود',14.5,11.5,0xf783ac,'flw'),portalMesh('🎈 فرقعة البالونات',-14.5,11.5,0xff6b6b,'bal'),portalMesh('🔨 اضرب الخلد',-14.5,7.5,0x8d5524,'mole'),portalMesh('🏁 سباق النقاط',14.5,7.5,0x20c997,'dash'));
{const pl=new THREE.Group();pl.position.set(-12,0,-12);pl.add(mesh(G.cyl(1.3,1.5,0.2,16),0x5f3dc4,0,0.1,0),mesh(G.cyl(0.08,0.08,1.6,6),0xadb5bd,0,1,0),mesh(G.cone(0.35,0.5,5),0xffd43b,0,2,0,0xaa8800));g.add(pl);sign(g,'🌠 اصطد النجوم',-12,3,-12,'rgba(95,61,196,.9)');interacts.push({x:-12,z:-10.6,label:'🌠 العب اصطياد النجوم',fn:startStarGame});sign(g,'🏆 أفضل النجوم',-8.5,3,-12,'rgba(16,24,48,.85)');interacts.push({x:-8.5,z:-10.6,label:'🏆 أفضل جامعي النجوم',fn:openStarLB})}
const sc=labelSprite('⚽ كورة جماعية: اضرب الكورة!',{s:5,bg:'rgba(47,158,68,.9)'});sc.position.set(0,3.5,-10);g.add(sc);
mergeStatic(g);scene.add(g);room.group=g;room.bounds=17;room.pickables=[];
}
function ballKick(x,z,vx,vz){ballV.x=vx;ballV.z=vz;lastKick=me.id}
function tickBall(dt){
if(!ball||room.type!=='park')return;
if(goalCool>0){goalCool-=dt;if(goalCool<=0){ball.position.set(0,0.45,0);ballV.x=ballV.z=0;lastKick=null}return}
const p=ball.position;p.x+=ballV.x*dt;p.z+=ballV.z*dt;const f=Math.pow(0.35,dt);ballV.x*=f;ballV.z*=f;ball.rotation.z-=ballV.x*dt*2;ball.rotation.x+=ballV.z*dt*2;
if(Math.abs(p.x)>15.7&&Math.abs(p.z)<2.6){if(Math.abs(p.x)>16.6){goals++;goalCool=1.6;sfx('win');burst({x:p.x,y:0,z:p.z},[0xffffff,0xffd43b,0xff6b6b],35);toast('⚽ جوووول! ('+goals+')',1500);if(lastKick===me.id){me.coins+=10;saveMe();toast('⚽ جوووول! +10 🪙',1800)}}}
else{if(Math.abs(p.x)>16.6){p.x=Math.sign(p.x)*16.6;ballV.x*=-0.7}}
if(Math.abs(p.z)>16.6){p.z=Math.sign(p.z)*16.6;ballV.z*=-0.7}
if(player){const dx=p.x-player.root.position.x,dz=p.z-player.root.position.z,d=Math.hypot(dx,dz);
if(d<1.05&&d>0.01&&goalCool<=0){const sp=player.moving?9:5;ballV.x=dx/d*sp;ballV.z=dz/d*sp;lastKick=me.id;sfx('tick');const n=performance.now();if(n-ballSend>90){ballSend=n;pub({t:'ball',i:me.id,x:+p.x.toFixed(2),z:+p.z.toFixed(2),vx:+ballV.x.toFixed(2),vz:+ballV.z.toFixed(2)})}}}
}
function openGuestbook(){
const owner=room.owner,entries={};
modal(c=>{c.innerHTML='<h2>📖 دفتر الزوار</h2><div id="gbl" style="max-height:30vh;overflow:auto"></div><label>اكتب رسالة</label><input type="text" id="gbi" maxlength="60" autocomplete="off"><div class="row"><button class="btn g" id="gbs">وقّع</button><button class="btn d" id="gbx">إغلاق</button></div>';
const render=()=>{const l=$('gbl');if(!l)return;l.innerHTML='';const arr=Object.values(entries).sort((a,b)=>b.t-a.t);if(!arr.length)l.textContent='لسه مفيش توقيعات';arr.slice(0,30).forEach(e=>{const d=document.createElement('div');d.className='qrow';d.textContent=e.n+': '+e.m;l.appendChild(d)})};
gbCb=(id,m)=>{entries[id]=m;render()};
if(netOK)client.subscribe(NS+'/gb/'+owner+'/+');
$('gbs').onclick=()=>{const t=str($('gbi').value,60).trim();if(!t||!netOK){toast('محتاج اتصال');return}const o={n:me.name,m:t,t:Date.now()};client.publish(NS+'/gb/'+owner+'/'+me.id,JSON.stringify(o),{retain:true});entries[me.id]=o;$('gbi').value='';render();sfx('place')};
$('gbx').onclick=()=>{try{client.unsubscribe(NS+'/gb/'+owner+'/+')}catch(e){}gbCb=null;closeModal()};render()})}
let race={idx:0,t0:0,run:false,gates:[],obs:[],cool:0},lbCb=null;
function colorGates(){race.gates.forEach((g,i)=>{const tgt=race.idx>=8?0:race.idx;g.mat.color.set(i===tgt?0x40ff7a:0x4dabf7);g.mesh.scale.setScalar(i===tgt?1.15:1)})}
function buildRace(){
interacts=[];const g=new THREE.Group();race={idx:0,t0:0,run:false,gates:[],obs:[],cool:0};
g.add(mesh(G.box(40,0.3,40),0x3b3f4a,0,-0.15,0));
const rg=new THREE.Mesh(new THREE.RingGeometry(9,13,48),new THREE.MeshLambertMaterial({color:0x5a606e,side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.y=0.02;g.add(rg);
for(let i=0;i<8;i++){const a=Math.PI/2-i/8*Math.PI*2,x=Math.cos(a)*11,z=Math.sin(a)*11;
const mat=new THREE.MeshBasicMaterial({color:0x4dabf7});const t=new THREE.Mesh(new THREE.TorusGeometry(1.4,0.16,8,24),mat);t.position.set(x,1.5,z);t.rotation.y=-a+Math.PI;g.add(t);
const n=labelSprite(i===0?'🏁 البداية':String(i),{s:1.6});n.position.set(x,3.4,z);g.add(n);race.gates.push({x,z,mat,mesh:t});
const b=a-Math.PI/8,r=i%2?8.6:13.4,ox=Math.cos(b)*r,oz=Math.sin(b)*r;g.add(mesh(G.cyl(0.8,0.9,2,10),i%2?0xff6b6b:0xffd43b,ox,1,oz));race.obs.push({x:ox,z:oz})}
const bd=new THREE.Group();bd.position.set(-3,0,12.8);bd.add(mesh(G.box(0.2,2,0.2),0x6d4c2a,0,1,0),mesh(G.box(2.2,1.2,0.15),0xffa94d,0,2,0));g.add(bd);
const ls=labelSprite('🏁 لوحة الأسرع',{s:2.8,bg:'rgba(255,169,77,.95)',fg:'#222'});ls.position.set(-3,3.2,12.8);g.add(ls);
interacts.push({x:-3,z:12.2,label:'🏁 لوحة الأسرع',fn:openRaceLB});
g.add(portalMesh('اخرج للساحة',0,15.8,0xff8787,'plaza'));
for(const gg of race.gates)gg.mesh.userData.keep=true;mergeStatic(g);scene.add(g);room.group=g;room.bounds=17;room.pickables=[];colorGates();
}
function tickRace(){
const p=player.root.position;
for(const o of race.obs){const dx=p.x-o.x,dz=p.z-o.z,d=Math.hypot(dx,dz);if(d<1.3&&d>0.001){p.x=o.x+dx/d*1.3;p.z=o.z+dz/d*1.3}}
const tgt=race.idx>=8?0:race.idx,gt=race.gates[tgt],now=performance.now();
if(now>race.cool&&Math.hypot(p.x-gt.x,p.z-gt.z)<1.8){
if(race.idx===0&&!race.run){race.run=true;race.t0=now;race.idx=1;sfx('tick')}
else if(race.idx>=8){const t=(now-race.t0)/1000;const coins=Math.max(5,Math.min(40,Math.round(60-t*1.5)));me.coins+=coins;
if(!me.raceBest||t<me.raceBest){me.raceBest=+t.toFixed(2);if(netOK)try{client.publish(NS+'/lb/'+me.id,JSON.stringify({n:me.name,t:me.raceBest}),{retain:true})}catch(e){}}
saveMe();sfx('win');burst(p,[0x40ff7a,0xffd43b,0x4dabf7],40);toast('🏁 خلصت في '+t.toFixed(1)+' ثانية! +'+coins+'🪙',2500);race.idx=0;race.run=false;race.cool=now+2500;qAdd('race')}
else{race.idx++;sfx('star')}
colorGates()}
$('race').textContent=race.run?'⏱️ '+((now-race.t0)/1000).toFixed(1)+' ث · بوابة '+Math.min(race.idx,8)+'/8':'ادخل البوابة الخضراء عشان تبدأ'+(me.raceBest?' · رقمك '+me.raceBest+' ث':'');
}
function openRaceLB(){
const e={};modal(c=>{c.innerHTML='<h2>🏁 أسرع اللاعبين</h2><div id="rl"></div><div class="row"><button class="btn d" id="rx">إغلاق</button></div>';
const render=()=>{const l=$('rl');if(!l)return;l.innerHTML='';const a=Object.values(e).sort((x,y)=>x.t-y.t).slice(0,10);if(!a.length)l.textContent='لسه مفيش أرقام';a.forEach((v,i)=>{const d=document.createElement('div');d.className='qrow';d.textContent=(i+1)+'. '+v.n+' · '+v.t+' ث';l.appendChild(d)})};
lbCb=(id,m)=>{e[id]=m;render()};if(netOK)client.subscribe(NS+'/lb/+');if(me.raceBest)e[me.id]={n:me.name,t:me.raceBest};
$('rx').onclick=()=>{try{client.unsubscribe(NS+'/lb/+')}catch(x){}lbCb=null;closeModal()};render()})}
function buildHome(data){
const g=new THREE.Group();home.group=g;home.items=(Array.isArray(data.items)?data.items:[]).filter(a=>Array.isArray(a)&&CAT[a[0]]).map(a=>a.slice());home.floor=data.floor|0;home.wall=data.wall|0;home.name=data.n||'';home.sel=null;
home.floorMesh=mesh(G.box(14,0.3,14),0xffffff,0,-0.15,0);g.add(home.floorMesh);
g.add(mesh(G.box(15,0.1,15),0x2b2f4a,0,-0.35,0));
home.wallMeshes=[];
const bw=mesh(G.box(14.4,4.2,0.4),0xffffff,0,2.1,-7.2),lw=mesh(G.box(0.4,4.2,14.4),0xffffff,-7.2,2.1,0);g.add(bw,lw);home.wallMeshes.push(bw,lw);
g.add(mesh(G.box(14.4,0.3,0.5),0x6d4c2a,0,0.15,-6.95),mesh(G.box(0.5,0.3,14.4),0x6d4c2a,-6.95,0.15,0));
g.add(mesh(G.box(3,2,0.1),0x74c0fc,-3,2.4,-6.97,0x112244),mesh(G.box(3.2,0.15,0.2),0xf8f9fa,-3,1.35,-6.9));
g.add(mesh(G.box(0.1,2,3),0x74c0fc,-6.97,2.4,3,0x112244));
g.add(mesh(G.box(2.4,3,0.2),0x5c3d1e,3.5,1.5,-6.9));
const grid=new THREE.GridHelper(14,14,0xffffff,0xffffff);grid.material.transparent=true;grid.material.opacity=0.25;grid.position.y=0.02;grid.visible=false;g.add(grid);home.grid=grid;
const pm=portalMesh('اخرج للساحة',0,6.2,0xff8787,'plaza');g.add(pm);
g.add(mesh(G.box(0.8,1,0.8),0x5c3d1e,6,0.5,-4.5),mesh(G.box(0.7,0.12,0.5),0xc92a2a,6,1.05,-4.5));{const gl=labelSprite('📖 دفتر الزوار',{s:2.6});gl.position.set(6,2.1,-4.5);g.add(gl)}
interacts=[{x:5.2,z:-4.5,label:'📖 دفتر الزوار',fn:openGuestbook}];
applyHomeColors();scene.add(g);room.group=g;room.bounds=6.5;rebuildFurn();
const ownerTag=labelSprite('بيت '+(data.n||'صاحبنا'),{s:3.4});ownerTag.position.set(0,5.2,-6.9);g.add(ownerTag);
}
/* ----- sky ----- */
function applySky(){
const d=new Date(),h=d.getHours()+d.getMinutes()/60,k=0.5+0.5*Math.cos((h-13)*Math.PI/12);
const day=new THREE.Color(0x8fd3ff),night=new THREE.Color(0x0b1030),c=night.clone().lerp(day,clamp(k*1.3,0,1));
const inHome=room.type!=='plaza'&&room.type!=='park'&&room.type!=='beach';
scene.background=inHome?new THREE.Color(0x1b2340):c;scene.fog=inHome?null:new THREE.Fog(c,50,110);
hemi.intensity=inHome?0.95:0.2+0.75*k;sun.intensity=inHome?0.55:0.05+0.75*k;
for(const l of lamps)l.material.color.set(k<0.5?0xffee88:0x666655);
winMat.emissive.set(k<0.5?0xffbb44:0x000000);isNight=k<0.45;nightStars.visible=!inHome;moon.visible=!inHome&&k<0.5;nightStars.material.opacity=clamp(1.2-k*2.4,0,1);
}
/* ===================== network ===================== */
const NS='ealam-es-v1';
const BROKERS=['wss://broker.emqx.io:8084/mqtt','wss://broker.hivemq.com:8884/mqtt','wss://test.mosquitto.org:8081'];
let client=null,netOK=false,bi=0,subRoom=null,homeCb=null;
function setOnline(){const n=remotes.size+1;$('online').textContent=(netOK?'🟢 أونلاين':'🟠 بدون إنترنت اللعب')+' · '+n+' في الغرفة'}
function netConnect(){
if(typeof mqtt==='undefined'){setOnline();return}
try{
if(client){try{client.end(true)}catch(e){}}
client=mqtt.connect(BROKERS[bi],{clientId:'ealam_'+me.id+'_'+rnd(5),clean:true,reconnectPeriod:0,connectTimeout:7000,keepalive:30});
client.on('connect',()=>{netOK=true;subRoom=null;subscribeRoom();subFriends();pubPres();publishHome();pubPet();setOnline()});
client.on('message',onMsg);
const fail=()=>{if(netOK||client){netOK=false;setOnline()}bi=(bi+1)%BROKERS.length;clearTimeout(netConnect.t);netConnect.t=setTimeout(netConnect,4000)};
client.on('error',fail);client.on('close',fail);
}catch(e){setTimeout(netConnect,5000)}
}
function topicRoom(id){return NS+'/r/'+id}
function subscribeRoom(){
if(!netOK||!client)return;
if(subRoom&&subRoom!==room.id){try{client.unsubscribe(topicRoom(subRoom))}catch(e){}}
client.subscribe(topicRoom(room.id));subRoom=room.id;sendPos(true);
}
function pub(obj){if(netOK&&client){try{client.publish(topicRoom(room.id),JSON.stringify(obj))}catch(e){}}}
const BADRX=/(fuck\w*|shit\w*|bitch\w*|asshole|pussy|nigg\w*|whore|slut|شرموط\S*|متناك\S*|منيوك\S*|قحب\S*|ابن الكلب|ولاد الكلب|كسمك|كس امك|ديوث|معرص|cunt|faggot)/gi;
const BADN=['fuck','shit','bitch','whore','slut','nigg','pussy','asshole','dickhead','motherfuck','شرموط','متناك','منيوك','قحبه','كسمك','كساميك','كسامك','ابنالكلب','ولادالكلب','ابنالمتناكه','ابنالشرموطه','ديوث','معرص','كسختك','كساختك','ابنوسخه','sharmot','kosomak','cunt','faggot'].map(w=>w.replace(/(.)\1+/g,'$1'));
function modNorm(t){return String(t).toLowerCase().replace(/[\u064b-\u065f\u0670\u0640\u200b-\u200f]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[@4]/g,'a').replace(/[3]/g,'e').replace(/[0]/g,'o').replace(/[1!|]/g,'i').replace(/[$5]/g,'s').replace(/[^a-z\u0621-\u064a]/g,'').replace(/(.)\1+/g,'$1')}
function modBad(t){const n=modNorm(t);return BADN.some(w=>n.includes(w))}
const URLRX=/(https?:\/\/\S+|www\.\S+|\b\S+\.(com|net|org|io|me|ly|xyz|app|gg|tk)\b\S*)/gi;
const PIIRX=/(\+?\d[\d\s\-.]{7,}\d|[\w.+-]+@[\w-]+\.[\w.]+)/g;
const str=(s,n)=>{let r=String(s==null?'':s).replace(/[\u0000-\u001f<>\u200b-\u200f\u202a-\u202e\u2060\ufeff\u0640]/g,'').replace(/(.)\1{4,}/gu,'$1$1$1$1').slice(0,n).replace(/(^|\s)((?:[^\s][ .]){5,}[^\s])(?=\s|$)/g,(m,p,q)=>p+q.replace(/[ .]/g,'')).replace(BADRX,m=>'*'.repeat(Math.min(m.length,4))).replace(/([0-9])\uFE0F?\u20E3/g,'$1').replace(URLRX,'[رابط]').replace(/\S*(?:\s\.\s?|\bdot\s+|\sنقطة\s+)(?:com|net|org|xyz|info)\b/gi,'[رابط]').replace(/[\u0660-\u0669]/g,c=>String(c.charCodeAt(0)-1632)).replace(PIIRX,'[محجوب]');return modBad(r)?'***':r};
const num=(v,a,b,d=0)=>{v=+v;return isFinite(v)?clamp(v,a,b):d};
function getRemote(m){
let r=remotes.get(m.i);
const app={b:num(m.b,0,29,0)|0,h:num(m.h,0,20,0)|0,a:num(m.a,0,46,0)|0,p:num(m.p,0,27,0)|0,l:num(m.l,0,50,0)|0,q:num(m.q,0,27,0)|0,pn:str(m.pn,10)};
if(!r){r=new Actor(app,str(m.n,16)||'لاعب');r.tx=0;r.tz=0;r.root.position.set(num(m.x,-50,50),0,num(m.z,-50,50));scene.add(r.root);remotes.set(m.i,r);setOnline();{const tn=Date.now();joinLog[m.i]=joinLog[m.i]||0;if(tn-joinLog[m.i]>20000){joinLog[m.i]=tn;addLog('','🔔 '+r.name+' دخل الغرفة')}};if(room&&room.type==='home'&&room.owner===me.id){toast('🏡 '+r.name+' زار بيتك!',3000);sfx('star');qAdd('visit')}}
else{if(r.app.b!==app.b||r.app.h!==app.h||r.app.a!==app.a||r.app.p!==app.p||r.app.l!==app.l||r.app.q!==app.q||(r.app.pn||'')!==app.pn)r.setApp(app);r.setName(str(m.n,16)||'لاعب')}
r.seen=performance.now();return r;
}
function onMsg(topic,payload){
let m;try{m=JSON.parse(payload.toString())}catch(e){return}
if(!m||typeof m!=='object')return;
if(topic.startsWith(NS+'/u/')){const c=topic.slice(NS.length+3);if(typeof m.r==='string')friendPres[c]={n:str(m.n,14),r:str(m.r,8),h:m.h?str(m.h,8):null,seen:Date.now()};return}
if(topic.startsWith(NS+'/fr/')){frMsg(m);return}
if(topic.startsWith(NS+'/pl/')){const pp=topic.split('/');if(plCb&&pp[2]&&typeof m.l==='number')plCb(pp[2],{n:str(m.n,14),l:num(m.l,0,30)|0,p:num(m.p,0,27)|0});return}
if(topic.startsWith(NS+'/sg/')){const pp=topic.split('/');if(slCb&&pp[2]&&typeof m.s==='number')slCb(pp[2],{n:str(m.n,14),s:num(m.s,0,80)});return}
if(topic.startsWith(NS+'/bl/')){const pp=topic.split('/');if(blCb&&pp[2]&&typeof m.s==='number')blCb(pp[2],{n:str(m.n,14),s:num(m.s,0,60)});return}
if(topic.startsWith(NS+'/ch/')){const pp=topic.split('/');if(chCb&&pp[2]&&m.g&&typeof m.g==='object'){const q={};for(const k of['golf','hoops','bowl','gal','tag','pen','seek','kite','bump','bake','star','ice','bal','mol','mth','clr','wrd','seq','odd','cmp','tfq'])q[k]=num(m.g[k],0,9999);chCb(pp[2],{n:str(m.n,14),g:q})}return}
if(topic.startsWith(NS+'/lb/')){const pp=topic.split('/');if(lbCb&&pp[2]&&typeof m.t==='number')lbCb(pp[2],{n:str(m.n,14),t:num(m.t,0,9999)});return}
if(topic.startsWith(NS+'/gb/')){const pp=topic.split('/');if(gbCb&&pp[2]===room.owner&&pp[3])gbCb(pp[3],{n:str(m.n,14),m:str(m.m,60),t:num(m.t,0,9e15)});return}
if(topic.startsWith(NS+'/h/')){if(homeCb&&topic===NS+'/h/'+homeCb.code)homeCb.fn(m);return}
if(topic!==topicRoom(room.id))return;
if(m.i===me.id||typeof m.i!=='string'||m.i.length>12)return;
if(m.t==='bye'){const r=remotes.get(m.i);if(r){scene.remove(r.root);remotes.delete(m.i);setOnline()}return}
if(me.blk&&me.blk.some(e=>e.i===m.i))return;
const r=getRemote(m);
if(m.t==='p'){r.tx=num(m.x,-50,50);r.tz=num(m.z,-50,50);r.stars=num(m.s,0,99999)|0}
else if(m.t==='c'){const t=str(m.m,100);const rx=(window.rxChat=window.rxChat||{}),nw=Date.now(),q=rx[m.i]||(rx[m.i]={t:0,l:'',n:0});let flood=nw-q.t<700;if(t===q.l){q.n++;if(q.n>=3)flood=true}else{q.n=0;q.l=t}q.t=nw;if(t&&!flood){sfx('chat');r.say(t);addLog(r.name,t)}}
else if(m.t==='fs'){showIn(m,r)}
else if(m.t==='fv'){voteIn(m)}
else if(m.t==='n'){noteIn(m,r)}else if(m.t==='fw'){fwIn(m,r)}
else if(m.t==='e'){const e=str(m.e,4);if(EMOJIS.includes(e)||TRICKS.includes(e))r.emote(e)}
else if(m.t==='ball'){if(ball&&room.type==='park'&&goalCool<=0){ball.position.x=num(m.x,-17,17);ball.position.z=num(m.z,-17,17);ballV.x=num(m.vx,-20,20);ballV.z=num(m.vz,-20,20);lastKick=m.i}}
else if(m.t==='ttt'){tttRecv(m)}
else if(m.t==='tttq'){if(ttt.mv>0)tttSend()}
else if(m.t==='s'){takeStar(num(m.sl,0,1e9),num(m.k,0,50)|0,false)}
}
let lastPos=0,lastX=1e9,lastZ=1e9;
function sendPos(force){
if(!player)return;const n=performance.now();
const moved=Math.abs(player.root.position.x-lastX)+Math.abs(player.root.position.z-lastZ)>0.05;
if(!force&&!((moved&&n-lastPos>220)||n-lastPos>2500))return;
lastPos=n;lastX=player.root.position.x;lastZ=player.root.position.z;
pub({t:'p',i:me.id,n:me.name,b:me.body,h:me.head,a:me.hat,p:me.pet|0,q:me.pacc|0,pn:me.pname||'',l:Math.floor((me.fed||0)/3),x:+lastX.toFixed(2),z:+lastZ.toFixed(2),s:stars})
}
addEventListener('beforeunload',()=>{pub({t:'bye',i:me.id})});
function publishHome(){
if(!netOK||!client)return;
try{client.publish(NS+'/h/'+me.id,JSON.stringify({n:me.name,floor:me.floor,wall:me.wall,items:me.items}),{retain:true})}catch(e){}
}
function fetchHome(code,cb){
if(!netOK){cb(null);return}
let done=false;const fin=(d)=>{if(done)return;done=true;try{client.unsubscribe(NS+'/h/'+code)}catch(e){}homeCb=null;cb(d)};
homeCb={code,fn:m=>{if(Array.isArray(m.items))fin({n:str(m.n,16),floor:num(m.floor,0,33)|0,wall:num(m.wall,0,33)|0,items:m.items.filter(a=>Array.isArray(a)&&CAT[a[0]]&&[1,2,3].every(i=>isFinite(+a[i]))).slice(0,80).map(a=>[a[0],a[1]|0,a[2]|0,a[3]|0])})}};
client.subscribe(NS+'/h/'+code);setTimeout(()=>fin(null),3500);
}
const QD={race:['خلّص دور في حلبة السباق',1,30],stars:['اجمع 5 نجوم',5,30],drink:['اطلب مشروب من الكافيه',1,15],ttt:['اكسب لعبة إكس أو',1,25],visit:['زور بيت صاحب',1,20],brain:['العب لعبة تفكير في غرفة الخطة',1,20]};
function today(){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function ensureQ(){if(!me.q||me.q.d!==today())me.q={d:today(),p:{stars:0,drink:0,ttt:0,visit:0,race:0},c:{}};if(me.q.p.race==null)me.q.p.race=0;if(me.q.p.brain==null)me.q.p.brain=0}
function qAdd(k){ensureQ();const q=me.q,def=QD[k];if(q.c[k])return;q.p[k]=Math.min(def[1],(q.p[k]||0)+1);if(q.p[k]>=def[1]){q.c[k]=1;me.coins+=def[2];toast('🎯 خلصت مهمة: '+def[0]+' +'+def[2]+'🪙',3000);sfx('win')}saveMe()}
function streakCal(){const cur=((Math.max(1,me.daily.streak)-1)%7)+1;let h='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin:10px 0;direction:rtl">';for(let i=1;i<=7;i++){const st=i<cur?'done':i===cur?'now':'next';h+='<div style="text-align:center;border-radius:10px;padding:6px 0;font-size:11px;background:'+(st==='now'?'#ff922b':st==='done'?'rgba(81,207,102,.35)':'rgba(255,255,255,.1)')+';'+(st==='now'?'transform:scale(1.12);font-weight:bold':'')+'">'+(st==='done'?'✅':i===7?'🎁':'🪙')+'<br>'+(20+10*(i-1))+'<br><span style="opacity:.7">يوم '+i+'</span></div>'}return h+'</div>'}
function openStreak(){modal(c=>{c.innerHTML='<h2>📅 سلسلة الدخول</h2><div style="text-align:center;color:#aab4de">يوم متتالي رقم '+me.daily.streak+' · كل يوم هديتك بتكبر لحد اليوم السابع</div>'+streakCal()+'<div style="text-align:center;font-size:12px;opacity:.8">لو فاتك يوم السلسلة بترجع من الأول · الجمعة الهدية ضعف 🎉</div><div class="row"><button class="btn g" id="skx">تمام</button></div>';$('skx').onclick=closeModal})}
function dailyCheck(){const t=today();if(me.daily.d===t)return;const y=new Date(Date.now()-864e5),ys=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();me.daily.streak=me.daily.d===ys?me.daily.streak+1:1;me.daily.d=t;const fri=new Date().getDay()===5,r=(20+10*Math.min(me.daily.streak-1,6))*(fri?2:1);me.coins+=r;saveMe();
setTimeout(()=>{modal(c=>{c.innerHTML='<h2>🎁 هدية اليوم</h2><div style="font-size:42px;text-align:center">🪙 +'+r+'</div><div style="text-align:center;color:#aab4de">يوم متتالي رقم '+me.daily.streak+' · ارجع بكرة لهدية أكبر</div>'+streakCal()+(fri?'<div style="text-align:center;color:#ffd43b;margin-top:6px">🎉 جمعة مباركة! هدية اليوم ضعف</div>':'')+'<div class="row"><button class="btn g" id="ok">شكراً</button></div>';$('ok').onclick=closeModal});burst(player.root.position,[0xff6b6b,0xffd43b,0x4dabf7,0x69db7c],40);sfx('win')},900)}
$('bQ').onclick=()=>{ensureQ();modal(c=>{c.innerHTML='<h2>🎯 مهام النهارده</h2><div id="ql"></div><div class="row"><button class="btn o" id="ach">🏅 إنجازات</button><button class="btn o" id="psp">🛂 جواز السفر</button><button class="btn o" id="trm">🗺️ خريطة الكنز</button><button class="btn o" id="stk">📅 سلسلتي</button><button class="btn g" id="ok">تمام</button></div>';$('ach').onclick=openAch;$('psp').onclick=openPassport;$('trm').onclick=openTreasure;$('stk').onclick=openStreak;Object.keys(QD).forEach(k=>{const d=QD[k],p=me.q.p[k]||0,r=document.createElement('div');r.className='qrow';r.textContent=(me.q.c[k]?'✅ ':'⬜ ')+d[0]+' · +'+d[2]+'🪙 ('+p+'/'+d[1]+')';const b=document.createElement('div');b.className='qbar';b.innerHTML='<i style="width:'+(p/d[1]*100)+'%"></i>';r.appendChild(b);$('ql').appendChild(r)});$('ok').onclick=closeModal})};
/* minimap */
function drawMM(){const cv=$('mm'),x=cv.getContext('2d'),W=184,sc=84/room.bounds;x.clearRect(0,0,W,W);x.save();x.translate(92,92);
x.fillStyle='rgba(80,160,90,.35)';x.beginPath();if(room.type==='plaza')x.arc(0,0,room.bounds*sc,0,6.3);else x.rect(-room.bounds*sc,-room.bounds*sc,room.bounds*sc*2,room.bounds*sc*2);x.fill();
const dot=(px,pz,c,r)=>{x.fillStyle=c;x.beginPath();x.arc(px*sc,pz*sc,r,0,6.3);x.fill()};
for(const s of starObjs)if(!starTaken.has(s.k))dot(s.x,s.z,'#ffd43b',4);
for(const pt of portals)dot(pt.x,pt.z,'#ff8787',5);
for(const it of interacts)dot(it.x,it.z,'#74c0fc',4);
for(const b of bots)dot(b.root.position.x,b.root.position.z,'#999',3);
for(const [,r] of remotes)dot(r.root.position.x,r.root.position.z,'#4dabf7',5);
dot(player.root.position.x,player.root.position.z,'#fff',6);x.restore()}
/* ===================== friends presence ===================== */
const friendPres={};const RN={mole:'اضرب الخلد',dash:'سباق النقاط',bal:'فرقعة البالونات',flw:'حديقة الورود',tank:'الأكواريوم',ice:'حلبة التزلج',plan:'القبة النجمية',zoo:'حديقة الحيوان',lib:'المكتبة',bake:'المخبز',bump:'التصادم',kite:'الطيارة الورق',plaza:'الساحة',arcade:'الأركيد',cafe:'الكافيه',home:'بيت',garden:'الحديقة',beach:'الشاطئ',cave:'الكهف',disco:'الديسكو',haunt:'البيت المسكون',space:'محطة الفضاء',maze:'المتاهة',fun:'الملاهي',show:'عرض الأزياء',farm:'المزرعة',studio:'الاستوديو',seek:'الاستغماية',pen:'ركلات الجزاء',photo:'استوديو الصور',jump:'الترامبولين',tag:'الطاردة',gallery:'ميدان الرماية',wheel:'عجلة الحظ',bowl:'البولينج',hoops:'تحدي السلة',golf:'الميني جولف',fish:'ميناء الصيد'};
function presTopic(c){return NS+'/u/'+c}
function subFriends(){if(!netOK||!client)return;try{client.subscribe(NS+'/fr/'+me.id)}catch(e){}me.friends.forEach(f=>{try{client.subscribe(presTopic(f.code))}catch(e){}})}
function pubPres(){if(!netOK||!client)return;try{client.publish(presTopic(me.id),JSON.stringify({n:me.name,r:room.type,h:room.type==='home'?room.owner:null}))}catch(e){}}
setInterval(pubPres,15000);
/* ===================== room switching ===================== */
const tttInit=()=>({g:0,mv:0,b:'.........',x:null,o:null,xn:'',on:'',over:false});
let ttt=tttInit(),tttMode='net',tttBot=null,tttRender=null;
const WINS=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function tttWinner(b){for(const w of WINS){if(b[w[0]]!=='.'&&b[w[0]]===b[w[1]]&&b[w[1]]===b[w[2]])return b[w[0]]}return b.includes('.')?null:'D'}
function tttSend(){pub({t:'ttt',i:me.id,g:ttt.g,mv:ttt.mv,b:ttt.b,x:ttt.x,o:ttt.o,xn:ttt.xn,on:ttt.on})}
function tttRecv(m){
if(typeof m.b!=='string'||!/^[XO.]{9}$/.test(m.b))return;const g=num(m.g,0,1e6)|0,mv=num(m.mv,0,9)|0;
if(g>ttt.g||(g===ttt.g&&mv>ttt.mv)){ttt={g,mv,b:m.b,x:m.x?str(m.x,12):null,o:m.o?str(m.o,12):null,xn:str(m.xn,14),on:str(m.on,14),over:!!tttWinner(m.b)};if(ttt.over)tttPayout();if(tttRender&&tttMode==='net')tttRender()}
}
function tttPayout(){const w=tttWinner(ttt.b);if(w==='X'&&ttt.x===me.id||w==='O'&&ttt.o===me.id){me.coins+=20;saveMe();sfx('win');burst(player.root.position,[0xff6b6b,0xffd43b,0x4dabf7,0x69db7c],40);qAdd('ttt');toast('🏆 كسبت! +20 🪙')}}
function tttMove(i){
if(tttMode==='bot'){const b=tttBot;if(b.over||b.b[i]!=='.')return;b.b=b.b.slice(0,i)+'X'+b.b.slice(i+1);let w=tttWinner(b.b);
if(!w){const e=[];for(let k=0;k<9;k++)if(b.b[k]==='.')e.push(k);let pick=null;
for(const sym of['O','X']){for(const k of e){const t=b.b.slice(0,k)+sym+b.b.slice(k+1);if(sym==='O'?tttWinner(t)==='O':tttWinner(b.b.slice(0,k)+'X'+b.b.slice(k+1))==='X'){pick=k;break}}if(pick!=null)break}
if(pick==null)pick=b.b[4]==='.'?4:e[Math.floor(Math.random()*e.length)];b.b=b.b.slice(0,pick)+'O'+b.b.slice(pick+1);w=tttWinner(b.b)}
if(w){b.over=true;if(w==='X'){me.coins+=10;saveMe();sfx('win');burst(player.root.position,[0xff6b6b,0xffd43b,0x4dabf7],30);qAdd('ttt');toast('🏆 كسبت البوت! +10 🪙')}}else sfx('tick');tttRender();return}
if(ttt.over||ttt.b[i]!=='.')return;
let sym=null;const odd=ttt.mv%2;
if(ttt.x===me.id)sym='X';else if(ttt.o===me.id)sym='O';
else if(!ttt.x){ttt.x=me.id;ttt.xn=me.name;sym='X'}else if(!ttt.o){ttt.o=me.id;ttt.on=me.name;sym='O'}
if(!sym){toast('اللعبة فيها لاعبين، اضغط لعبة جديدة');return}
if((sym==='X'&&odd)||(sym==='O'&&!odd)){toast('مش دورك');sfx('err');return}
ttt.b=ttt.b.slice(0,i)+sym+ttt.b.slice(i+1);ttt.mv++;ttt.over=!!tttWinner(ttt.b);sfx('tick');
tttSend();if(ttt.over)tttPayout();tttRender()}
function openTTT(){
modal(c=>{
c.innerHTML='<h2>❌⭕ إكس أو</h2><div class="sw" id="tm"></div><div id="ts" style="margin:10px 0;font-size:15px;min-height:22px"></div><div id="tb" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;direction:ltr"></div><div class="row"><button class="btn o" id="tn">لعبة جديدة</button><button class="btn d" id="tx">إغلاق</button></div>';
const tm=$('tm');[['net','ضد لاعب'],['bot','ضد البوت']].forEach(([k,n])=>{const u=document.createElement('u');u.textContent=n;if(tttMode===k)u.className='on';u.onclick=()=>{tttMode=k;if(k==='bot')tttBot={b:'.........',over:false};[...tm.children].forEach(x=>x.className='');u.className='on';tttRender()};tm.appendChild(u)});
tttRender=()=>{const net=tttMode==='net',b=net?ttt.b:tttBot.b,over=net?ttt.over:tttBot.over,w=tttWinner(b);const bd=$('tb');if(!bd){tttRender=null;return}bd.innerHTML='';
for(let i=0;i<9;i++){const d=document.createElement('button');d.className='btn '+(b[i]==='X'?'r':b[i]==='O'?'g':'d');d.style.cssText='height:76px;font-size:40px;flex-direction:row;justify-content:center';d.textContent=b[i]==='X'?'✕':b[i]==='O'?'○':'';d.onclick=()=>tttMove(i);bd.appendChild(d)}
let st;if(net){const odd=ttt.mv%2;st=w?(w==='D'?'تعادل':'فاز '+(w==='X'?(ttt.xn||'X'):(ttt.on||'O'))):(!ttt.x?'اضغط خانة عشان تبدأ كـ ✕ وصاحبك يدخل ○':'الدور على '+(odd?(ttt.on||'منتظر لاعب ثاني'):ttt.xn)+' · ✕='+ttt.xn+' ○='+(ttt.on||'؟'))}
else st=w?(w==='D'?'تعادل':w==='X'?'كسبت! 🎉':'البوت كسب'):'دورك (✕)';$('ts').textContent=st};
$('tn').onclick=()=>{if(tttMode==='bot'){tttBot={b:'.........',over:false}}else{ttt={...tttInit(),g:ttt.g+1};tttSend()}tttRender()};
$('tx').onclick=()=>{closeModal()};tttBot=tttBot||{b:'.........',over:false};tttRender();
});
}
function openReact(){
modal(c=>{
c.innerHTML='<h2>⚡ اختبار السرعة</h2><div style="font-size:13px;color:#aab4de">اضغط على المربع أول ما يبقى أخضر. أسرع = فلوس أكتر. أفضل رقم: <b id="rb">'+(me.reactBest||'-')+'</b> مللي</div><div id="rg" style="height:170px;border-radius:16px;margin:12px 0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;background:#c92a2a;cursor:pointer">اضغط عشان تبدأ</div><div class="row"><button class="btn d" id="rx">إغلاق</button></div>';
let st='idle',t0=0,to=null;const g=$('rg');
g.onclick=()=>{
if(st==='idle'){st='wait';g.style.background='#c92a2a';g.textContent='استنى الأخضر…';to=setTimeout(()=>{st='go';g.style.background='#2f9e44';g.textContent='دلوقتي!';t0=performance.now()},1200+Math.random()*2800)}
else if(st==='wait'){clearTimeout(to);st='idle';g.textContent='بدري! اضغط تاني';sfx('err')}
else if(st==='go'){const ms=Math.round(performance.now()-t0);st='idle';const gain=Math.max(1,Math.min(20,Math.round(25-ms/30)));me.coins+=gain;if(!me.reactBest||ms<me.reactBest)me.reactBest=ms;saveMe();$('rb').textContent=me.reactBest;g.style.background='#1971c2';g.textContent=ms+' مللي · +'+gain+'🪙 · اضغط تاني';sfx('win')}};
$('rx').onclick=()=>{clearTimeout(to);closeModal()}});
}
function openCafeMenu(){
modal(c=>{c.innerHTML='<h2>☕ منيو الكافيه</h2><div id="cm"></div><div class="row"><button class="btn d" id="cx">إغلاق</button></div>';
[['شاي','🍵',5],['قهوة','☕',8],['عصير','🧃',10],['كأس الفخامة','🏆',40]].forEach(([n,e,p])=>{const d=document.createElement('div');d.className='friend';const sp=document.createElement('span');sp.textContent=e+' '+n+' · 🪙'+p;const b=document.createElement('button');b.className='btn g';b.style.padding='6px 12px';b.textContent='اطلب';b.onclick=()=>{if(me.coins<p){toast('فلوسك مش كفاية');sfx('err');return}me.coins-=p;saveMe();sfx('drink');qAdd('drink');player.emote(e);pub({t:'e',i:me.id,e});addLog('','طلبت '+n);closeModal()};d.append(sp,b);$('cm').appendChild(d)});
$('cx').onclick=closeModal})}
let stars=0,starSlot=-1,starObjs=[],starTaken=new Set();
function enterRoom(type,opts={}){bg=null;
pub({t:'bye',i:me.id});
if(player)scene.remove(player.root);
disposeRoom();room={type,id:'plaza',owner:null,group:null,pickables:[],bounds:26};
editing=false;sel=null;hold=null;$('shop').style.display='none';
if(type==='plaza'){room.id='plaza';buildPlaza();addWheel();$('roomName').textContent='🌳 الساحة العامة';initBots();setupStars()}
else if(type==='arcade'){room.id='arcade';buildArcade();$('roomName').textContent='🕹️ الأركيد';starObjs=[]}
else if(type==='race'){room.id='race';buildRace();$('roomName').textContent='🏁 حلبة السباق';starObjs=[]}
else if(type==='park'){room.id='park';buildPark();$('roomName').textContent='⚽ الملعب';starObjs=[]}
else if(type==='private'){const pc=cleanCode(opts.code).slice(0,4);room.id='priv-'+pc;room.code=pc;buildPrivate();$('roomName').textContent='🔒 غرفة خاصة '+pc;starObjs=[]}
else if(type==='garden'){room.id='garden';buildGarden();$('roomName').textContent='🌷 الحديقة';starObjs=[]}
else if(type==='beach'){room.id='beach';buildBeach();$('roomName').textContent='🏖️ الشاطئ';starObjs=[]}
else if(type==='cave'){room.id='cave';buildCave();$('roomName').textContent='💎 الكهف';starObjs=[]}
else if(type==='disco'){room.id='disco';buildDisco();$('roomName').textContent='🪩 الديسكو';starObjs=[]}
else if(type==='haunt'){room.id='haunt';buildHaunt();$('roomName').textContent='👻 البيت المسكون';starObjs=[]}
else if(type==='space'){room.id='space';buildSpace();$('roomName').textContent='🚀 محطة الفضاء';starObjs=[]}
else if(type==='maze'){room.id='maze';buildMaze();$('roomName').textContent='🌀 المتاهة';starObjs=[]}
else if(type==='fun'){room.id='fun';buildFun();$('roomName').textContent='🎢 الملاهي';starObjs=[]}
else if(type==='show'){room.id='show';buildShow();$('roomName').textContent='👗 عرض الأزياء';starObjs=[]}
else if(type==='farm'){room.id='farm';buildFarm();$('roomName').textContent='🚜 المزرعة';starObjs=[]}
else if(type==='fish'){room.id='fish';buildFish();$('roomName').textContent='🎣 ميناء الصيد';starObjs=[]}
else if(type==='golf'){room.id='golf';buildGolf();$('roomName').textContent='⛳ الميني جولف';starObjs=[]}
else if(type==='hoops'){room.id='hoops';buildHoops();$('roomName').textContent='🏀 تحدي السلة';starObjs=[]}
else if(type==='bowl'){room.id='bowl';buildBowl();$('roomName').textContent='🎳 البولينج';starObjs=[]}
else if(type==='wheel'){room.id='wheel';buildWheel();$('roomName').textContent='🎡 عجلة الحظ';starObjs=[]}
else if(type==='gallery'){room.id='gallery';buildGallery();$('roomName').textContent='🎯 ميدان الرماية';starObjs=[]}
else if(type==='bake'){room.id='bake';buildBake();$('roomName').textContent='🥐 المخبز';starObjs=[]}
else if(type==='lib'){room.id='lib';buildLib();$('roomName').textContent='📚 المكتبة';starObjs=[]}
else if(type==='tank'){room.id='tank';buildTank();$('roomName').textContent='🐠 الأكواريوم';starObjs=[]}
else if(type==='flw'){room.id='flw';buildFlw();$('roomName').textContent='🌸 حديقة الورود';starObjs=[]}
else if(type==='mole'){room.id='mole';buildMole();$('roomName').textContent='🔨 اضرب الخلد';starObjs=[]}
else if(type==='bal'){room.id='bal';buildBal();$('roomName').textContent='🎈 فرقعة البالونات';starObjs=[]}
else if(type==='dash'){room.id='dash';buildDash();$('roomName').textContent='🏁 سباق النقاط';starObjs=[]}
else if(type==='zoo'){room.id='zoo';buildZoo();$('roomName').textContent='🦁 حديقة الحيوان';starObjs=[]}
else if(type==='plan'){room.id='plan';buildPlan();$('roomName').textContent='🔭 القبة النجمية';starObjs=[]}
else if(type==='ice'){room.id='ice';room.slide=true;buildIce();$('roomName').textContent='⛸️ حلبة التزلج';starObjs=[]}
else if(type==='bump'){room.id='bump';buildBump();$('roomName').textContent='🚗 تصادم';starObjs=[]}
else if(type==='tag'){room.id='tag';buildTag();$('roomName').textContent='🏃 الطاردة';starObjs=[]}
else if(type==='jump'){room.id='jump';buildJump();$('roomName').textContent='🤸 الترامبولين';starObjs=[]}
else if(type==='photo'){room.id='photo';buildPhoto();$('roomName').textContent='📸 استوديو الصور';starObjs=[]}
else if(type==='pen'){room.id='pen';buildPen();$('roomName').textContent='⚽ ركلات الجزاء';starObjs=[]}
else if(type==='kite'){room.id='kite';buildKite();$('roomName').textContent='🪁 الطيارة الورق';starObjs=[]}
else if(type==='seek'){room.id='seek';buildSeek();$('roomName').textContent='🙈 الاستغماية';starObjs=[]}
else if(type==='studio'){room.id='studio';buildStudio();$('roomName').textContent='🎹 الاستوديو';starObjs=[]}
else if(type==='cafe'){room.id='cafe';buildCafe();$('roomName').textContent='☕ الكافيه';starObjs=[]}
else{room.owner=opts.owner;room.id='home-'+opts.owner;const d=opts.data;buildHome(d);$('roomName').textContent='🏠 بيت '+(d.n||opts.owner);starObjs=[]}
player=player||new Actor(myApp(),me.name);player.setApp(myApp());player.setName(me.name);
if(type==='plaza'){const f=opts.from;const sp={home:[0,-14.2],arcade:[13.6,6],cafe:[-13.6,6],garden:[0,14.6],park:[13.6,-8],race:[-13.6,-8],beach:[13.6,-1],cave:[-13.6,-1],disco:[7.4,13.6],haunt:[-7.4,13.6],space:[8,-14],maze:[-8,-14],fun:[-13.4,11.6],show:[13.4,11.6],farm:[-13.4,-11.6],studio:[13.4,-11.6],golf:[0,7.9]}[f]||[0,8];player.root.position.set(sp[0],0,sp[1])}else player.root.position.set(0,0,5)
player.root.rotation.y=player.yaw=Math.PI;scene.add(player.root);walkTarget=null;
$('bHome').innerHTML=type==='plaza'?'<span>🏠</span>بيتي':'<span>🌳</span>الساحة';
$('bEdit').hidden=!(type==='home'&&room.owner===me.id);
dist=type==='home'?(innerWidth<600?24:17):(innerWidth<600?24:20);applySky();stampRoom(type);setTimeout(()=>thSpawn(type),400);if(me.tr)chestUpd();subscribeRoom();setOnline();renderLB();pubPres();if(type==='arcade'){ttt=tttInit();setTimeout(()=>pub({t:'tttq',i:me.id}),800)}
}
function goPlaza(from){enterRoom('plaza',{from:from===true?'home':from})}
function goMyHome(){enterRoom('home',{owner:me.id,data:{n:me.name,floor:me.floor,wall:me.wall,items:me.items}})}
function visit(code){
code=str(code,8).toUpperCase().trim();if(!code)return;
if(code===me.id){goMyHome();return}
toast('جاري البحث عن البيت…');
fetchHome(code,d=>{if(!d){toast('مفيش بيت بالكود ده، أو الإنترنت واقع');return}
enterRoom('home',{owner:code,data:d});
if(!me.friends.some(f=>f.code===code)){me.friends.push({code,name:d.n||code});saveMe()}
toast('أنت في بيت '+(d.n||code));qAdd('visit');subFriends()});
}
/* ===================== bots (honest, labeled) ===================== */
const BOT_LINES=['أهلاً بيك في عالمنا! 👋','الساحة حلوة النهارده','في نجوم جديدة ظهرت ⭐','فرّش بيتك وادعي صحابك','تعالى نلعب لعبة جمع النجوم'];
function initBots(){
const defs=[['نور',2,1,1],['سامي',0,0,2],['ليلى',5,2,0],['كريم',3,3,3]];
defs.forEach((d,i)=>{const b=new Actor({b:d[0],h:d[1],a:d[3]},d[0]===2?'سامي':['نور','سامي','ليلى','كريم'][i],true);
const an=i*1.7;b.root.position.set(Math.cos(an)*9,0,Math.sin(an)*9);b.tgt=null;b.wait=Math.random()*3;b.chat=8+Math.random()*10;scene.add(b.root);bots.push(b)});
}
function tickBots(dt){
for(const b of bots){
b.wait-=dt;b.chat-=dt;
if(b.chat<=0){b.chat=14+Math.random()*16;b.say(BOT_LINES[Math.floor(Math.random()*BOT_LINES.length)])}
if(!b.tgt&&b.wait<=0){const an=Math.random()*6.283,r=3+Math.random()*10;b.tgt=[Math.cos(an)*r,Math.sin(an)*r]}
b.moving=false;
if(b.tgt){const dx=b.tgt[0]-b.root.position.x,dz=b.tgt[1]-b.root.position.z,d=Math.hypot(dx,dz);
if(d<0.2){b.tgt=null;b.wait=2+Math.random()*4}else{const s=2*dt;b.root.position.x+=dx/d*s;b.root.position.z+=dz/d*s;b.yaw=Math.atan2(dx,dz);b.moving=true}}
b.tick(dt,performance.now()/1000);
}
}
/* ===================== stars minigame ===================== */
const SLOT_MS=30000;
function setupStars(){setupChests();starObjs=[];starTaken=new Set();starSlot=-1;rollStars()}
function rollStars(){
const slot=Math.floor(Date.now()/SLOT_MS);if(slot===starSlot)return;starSlot=slot;
for(const s of starObjs)room.group.remove(s.m);starObjs=[];starTaken=new Set();
const rng=mulberry(slot*977+13);
for(let k=0;k<9;k++){
let x,z;do{const an=rng()*6.283,r=5+rng()*19;x=Math.cos(an)*r;z=Math.sin(an)*r}while(Math.hypot(x,z)<3.8);
const m=new THREE.Mesh(new THREE.OctahedronGeometry(0.45),new THREE.MeshLambertMaterial({color:0xffd43b,emissive:0xaa7700}));m.position.set(x,1.1,z);m.scale.y=1.4;room.group.add(m);starObjs.push({m,k,x,z});
}
}
function takeStar(slot,k,mine){
if(room.type!=='plaza'||slot!==starSlot)return;const key=k;if(starTaken.has(key))return;
const s=starObjs.find(o=>o.k===k);if(!s)return;starTaken.add(key);room.group.remove(s.m);
if(mine){sfx('star');burst(player.root.position,0xffd43b,10);qAdd('stars');stars++;me.coins+=5;if(stars>me.best)me.best=stars;saveMe();pub({t:'s',i:me.id,n:me.name,sl:slot,k});player.emote('⭐');renderLB();sendPos(true)}
}
function renderLB(){
const el=$('lb');if(room.type!=='plaza'){el.style.display='none';return}el.style.display='block';
const list=[{n:me.name+' (أنت)',s:stars}];for(const [,r] of remotes)list.push({n:r.name,s:r.stars||0});
list.sort((a,b)=>b.s-a.s);
el.innerHTML='<b>⭐ لوحة النجوم</b>';
list.slice(0,5).forEach(x=>{const d=document.createElement('div');const a=document.createElement('span'),b=document.createElement('span');a.textContent=x.n;b.textContent=x.s;d.append(a,b);el.appendChild(d)});
const d=document.createElement('div');d.style.cssText='color:#aab;border-top:1px solid #345;margin-top:3px';d.innerHTML='<span>أفضل رقم ليك</span><span>'+me.best+'</span>';el.appendChild(d);
}
/* ===================== input / camera ===================== */
let yaw=0.4,dist=20,pitch=0.9,camT=new THREE.Vector3();
const keys={};let joy={x:0,y:0};const iceV={x:0,z:0};
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;keys[e.key.toLowerCase()]=true});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
const ray=new THREE.Raycaster(),mv=new THREE.Vector2(),gplane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
function pointerWorld(cx,cy){mv.set(cx/innerWidth*2-1,-(cy/innerHeight)*2+1);ray.setFromCamera(mv,camera);const p=new THREE.Vector3();return ray.ray.intersectPlane(gplane,p)?p:null}
const ptrs=new Map();let tapStart=null,pinch0=0,dist0=0;
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
if(ptrs.size===1)tapStart={x:e.clientX,y:e.clientY,t:performance.now(),moved:false};
if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch0=Math.hypot(a.x-b.x,a.y-b.y);dist0=dist;tapStart=null}});
canvas.addEventListener('pointermove',e=>{
const p=ptrs.get(e.pointerId);
if(p){const dx=e.clientX-p.x;p.x=e.clientX;p.y=e.clientY;
if(ptrs.size===2){const [a,b]=[...ptrs.values()];dist=clamp(dist0*pinch0/Math.max(20,Math.hypot(a.x-b.x,a.y-b.y)),8,34)}
else if(tapStart){if(Math.hypot(e.clientX-tapStart.x,e.clientY-tapStart.y)>8)tapStart.moved=true;if(tapStart.moved)yaw-=dx*0.006}}
if(hold&&e.pointerType==='mouse')updateGhost(e.clientX,e.clientY);
});
const endp=e=>{ptrs.delete(e.pointerId);if(tapStart&&!tapStart.moved&&e.type==='pointerup'&&performance.now()-tapStart.t<500)onTap(e.clientX,e.clientY);if(ptrs.size===0)tapStart=null};
canvas.addEventListener('pointerup',endp);canvas.addEventListener('pointercancel',endp);
canvas.addEventListener('wheel',e=>{dist=clamp(dist+e.deltaY*0.01,7,28);e.preventDefault()},{passive:false});
/* joystick */
(function(){const j=$('joy'),k=j.firstElementChild;let id=null;
const set=(e)=>{const r=j.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=e.clientX-cx,dy=e.clientY-cy;const m=Math.hypot(dx,dy),mx=45;if(m>mx){dx=dx/m*mx;dy=dy/m*mx}k.style.transform='translate('+dx+'px,'+dy+'px)';joy.x=dx/mx;joy.y=-dy/mx;walkTarget=null};
j.addEventListener('pointerdown',e=>{id=e.pointerId;j.setPointerCapture(id);set(e);e.stopPropagation()});
j.addEventListener('pointermove',e=>{if(e.pointerId===id)set(e)});
const up=e=>{if(e.pointerId===id){id=null;joy.x=joy.y=0;k.style.transform=''}};j.addEventListener('pointerup',up);j.addEventListener('pointercancel',up)})();
/* ===================== edit mode ===================== */
let editing=false,sel=null,hold=null;
function occupied(id,cx,cz,rot,ignore){
const[w,d]=footprint(id,rot);if(cx<0||cz<0||cx+w>14||cz+d>14)return true;const fl=CAT[id].floor,LY=k=>CAT[k].floor?1:CAT[k].wall?2:0;if(CAT[id].wall&&(rot||cz!==0))return true;
for(let i=0;i<home.items.length;i++){if(i===ignore)continue;const it=home.items[i];if(LY(it[0])!==LY(id))continue;
const[w2,d2]=footprint(it[0],it[3]);if(cx<it[1]+w2&&cx+w>it[1]&&cz<it[2]+d2&&cz+d>it[2])return true}
return false;
}
function cellFor(id,rot,p){const[w,d]=footprint(id,rot);return[clamp(Math.round(p.x+7-w/2),0,14-w),CAT[id].wall?0:clamp(Math.round(p.z+7-d/2),0,14-d)]}
function updateGhost(cx,cy){
if(!hold)return;const p=pointerWorld(cx,cy);if(!p)return;
const[x,z]=cellFor(hold.id,hold.rot,p);hold.cx=x;hold.cz=z;
if(!home.ghost){home.ghost=buildFurn(hold.id);home.group.add(home.ghost);home.ghost.traverse(o=>{if(o.material){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=0.6}});home.ghostId=hold.id}
furnPlace(home.ghost,hold.id,x,z,hold.rot);
const bad=occupied(hold.id,x,z,hold.rot,hold.moving);
home.ghost.traverse(o=>{if(o.material)o.material.emissive=new THREE.Color(bad?0x880000:0x004400)});
}
function clearGhost(){if(home.ghost){home.group.remove(home.ghost);home.ghost=null}}
function onTap(cx,cy){
if(window.__tapHook&&window.__tapHook(cx,cy))return;
if(portalsHit(cx,cy))return;
if(editing&&room.type==='home'&&room.owner===me.id){
if(hold){updateGhost(cx,cy);if(!hold.cx&&hold.cx!==0)return;placeHeld();return}
mv.set(cx/innerWidth*2-1,-(cy/innerHeight)*2+1);ray.setFromCamera(mv,camera);
const hits=ray.intersectObjects(room.pickables,true);
if(hits.length){let o=hits[0].object;while(o&&o.userData.idx==null)o=o.parent;if(o){home.sel=o.userData.idx;rebuildFurn();renderShop();return}}
home.sel=null;rebuildFurn();renderShop();return;
}
const p=pointerWorld(cx,cy);if(!p)return;
const b=room.bounds;const r=Math.hypot(p.x,p.z);
if(room.type==='plaza'){if(r>b){p.x*=b/r;p.z*=b/r}}else{p.x=clamp(p.x,-b,b);p.z=clamp(p.z,-b,b)}
walkTarget=p;
}
function portalsHit(cx,cy){return false}
function placeHeld(){
const h=hold,c=CAT[h.id];
if(occupied(h.id,h.cx,h.cz,h.rot,h.moving)){toast('المكان ده مش فاضي');return}
if(h.moving!=null){home.items[h.moving]=[h.id,h.cx,h.cz,h.rot];home.sel=h.moving;hold=null;clearGhost()}
else{if(me.coins<c.p){toast('مفيش فلوس كفاية، اجمع نجوم ⭐');return}me.coins-=c.p;home.items.push([h.id,h.cx,h.cz,h.rot]);home.sel=home.items.length-1}
sfx('place');me.items=home.items.map(a=>a.slice());saveMe();publishHome();rebuildFurn();renderShop();
}
function renderShop(){
const sh=$('shop'),tools=$('shoptools'),box=$('shopitems');
sh.style.display=editing?'block':'none';home.grid&&(home.grid.visible=editing);$('log').style.display=editing?'none':'flex';if(!editing)return;
tools.innerHTML='';box.innerHTML='';
const mk=(t,cls,fn)=>{const b=document.createElement('button');b.className='btn '+cls;b.textContent=t;b.onclick=fn;tools.appendChild(b);return b};
mk('🎨 الأرضية','d',()=>{home.floor=(home.floor+1)%FLOORS.length;me.floor=home.floor;applyHomeColors();saveMe();publishHome();toast('🎨 الأرضية '+(home.floor+1)+'/'+FLOORS.length,900)});
mk('🖼️ الحيطان','d',()=>{home.wall=(home.wall+1)%WALLS.length;me.wall=home.wall;applyHomeColors();saveMe();publishHome();toast('🖼️ الحيطان '+(home.wall+1)+'/'+WALLS.length,900)});
if(hold){mk('🔄 لف','o',()=>{hold.rot=(hold.rot+1)%4;if(home.ghost){clearGhost()}if(hold.cx!=null)ghostAt()});mk('✖ إلغاء','r',()=>{hold=null;clearGhost();renderShop()})}
else if(home.sel!=null&&home.items[home.sel]){const i=home.sel,it=home.items[i];
mk('🔄 لف','o',()=>{const r=(it[3]+1)%4;if(!occupied(it[0],it[1],it[2],r,i)){it[3]=r;me.items=home.items.map(a=>a.slice());saveMe();publishHome();rebuildFurn()}else toast('مفيش مكان للف')});
mk('✋ حرّك','p',()=>{hold={id:it[0],rot:it[3],moving:i};home.sel=null;rebuildFurn();renderShop();toast('اضغط المكان الجديد')});
mk('🗑️ بيع (+'+Math.floor(CAT[it[0]].p/2)+')','r',()=>{me.coins+=Math.floor(CAT[it[0]].p/2);home.items.splice(i,1);home.sel=null;me.items=home.items.map(a=>a.slice());saveMe();publishHome();rebuildFurn();renderShop()})}
else{const s=document.createElement('span');s.textContent='اختار قطعة من تحت وبعدين اضغط مكانها في البيت · أو اضغط قطعة عشان تعدلها';tools.appendChild(s)}
Object.keys(CAT).forEach(id=>{const c=CAT[id],d=document.createElement('div');d.className='it'+(me.coins<c.p?' no':'')+(hold&&hold.id===id&&hold.moving==null?' on':'');
d.innerHTML='<span>'+c.e+'</span>'+c.n+'<br>🪙'+c.p;d.onclick=()=>{hold={id,rot:0,moving:null};home.sel=null;clearGhost();rebuildFurn();renderShop();toast('اضغط في البيت عشان تحط '+c.n)};box.appendChild(d)});
}
function ghostAt(){if(!hold)return;clearGhost();home.ghost=null;const g=buildFurn(hold.id);home.group.add(g);home.ghost=g;g.traverse(o=>{if(o.material){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=0.6}});furnPlace(g,hold.id,hold.cx,hold.cz,hold.rot)}
/* ===================== UI ===================== */
function addLog(n,t){const l=$('log'),d=document.createElement('div');if(n){const i=document.createElement('i');i.textContent=n+': ';d.appendChild(i)}d.appendChild(document.createTextNode(t));l.appendChild(d);while(l.children.length>6)l.removeChild(l.firstChild)}
function modal(build){const c=$('mcard');c.innerHTML='';build(c);$('modal').style.display='flex'}
function closeModal(){$('modal').style.display='none'}
$('modal').addEventListener('pointerdown',e=>{if(e.target===$('modal'))closeModal()});
let lastChatT=0;function sendChat(){const i=$('chatin'),t=str(i.value,80).trim();if(!t)return;if(Date.now()-lastChatT<1200){toast('🕐 براحة شوية على الرسايل',1200);return}lastChatT=Date.now();i.value='';sfx('chat');player.say(t);addLog('أنا',t);pub({t:'c',i:me.id,n:me.name,m:t});$('chatbox').style.display='none';i.blur()}
$('chatsend').onclick=sendChat;$('chatin').addEventListener('keydown',e=>{if(e.key==='Enter')sendChat()});
$('bChat').onclick=()=>{$('emo').style.display='none';const b=$('chatbox');b.style.display=b.style.display==='flex'?'none':'flex';if(b.style.display==='flex')setTimeout(()=>$('chatin').focus(),50)};
function renderEmo(){const lv=typeof plLevel==='function'?plLevel().lv:1;$('emo').innerHTML=EMOJIS.slice(0,8).concat(me.pet?(me.tricks||[]):[]).map(e=>'<b>'+e+'</b>').join('')+LEMO.map(a=>lv>=a[1]?'<b>'+a[0]+'</b>':'<b data-l="'+a[1]+'" style="opacity:.4">🔒</b>').join('')}renderEmo();
$('emo').onclick=e=>{if(e.target.tagName!=='B')return;if(e.target.dataset.l){toast('🎖️ الإيموجي ده بيتفتح عند مستوى '+e.target.dataset.l);return}const em=e.target.textContent;if(TRICKS.includes(em)&&!(me.pet&&(me.tricks||[]).includes(em)))return;if(TRICKS.includes(em))me.trickDo=(me.trickDo||0)+1;player.emote(em);pub({t:'e',i:me.id,e:em});$('emo').style.display='none'};
$('bEmo').onclick=()=>{renderEmo();$('chatbox').style.display='none';const b=$('emo');b.style.display=b.style.display==='flex'?'none':'flex'};
$('bHome').onclick=()=>{if(room.type==='plaza')goMyHome();else goPlaza(room.type)};
$('bEdit').onclick=()=>{editing=!editing;hold=null;clearGhost();home.sel=null;rebuildFurn();renderShop();$('bEdit').innerHTML=editing?'<span>✅</span>تم':'<span>🛋️</span>فرّش'};
$('act').onclick=()=>{if(actFn)actFn.fn()};
$('bMe').onclick=()=>modal(c=>{
c.innerHTML='<h2>🎨 شكلك واسمك</h2><label>الاسم</label><input type="text" id="nm" maxlength="14"><label>لون الجسم</label><div class="sw" id="s1"></div><label>لون البشرة</label><div class="sw" id="s2"></div><label>القبعة</label><div class="sw" id="s3"></div><label>الحيوان الأليف</label><div class="sw" id="s4"></div><label>إكسسوار الحيوان</label><div class="sw" id="s5"></div><label>كودك (ابعته لصحابك عشان يزوروا بيتك)</label><div style="font-size:26px;letter-spacing:4px;font-weight:800;color:#ffd35c" id="code"></div><div class="row"><button class="btn g" id="ok">تم</button></div>';
$('nm').value=me.name;$('code').textContent=me.id;
const sw=(id,arr,key,isCol)=>{if(key==='hat'&&typeof lvUnlock==='function')lvUnlock();const el=$(id);arr.forEach((v,i)=>{const b=document.createElement(isCol?'b':'u');const cl=key==='body'&&CLV[i]&&plLevel().lv<CLV[i];if(cl){b.style.opacity='.4';b.textContent='🔒';b.style.fontSize='11px';b.style.textAlign='center'}const lock=key==='hat'&&HPRICE[i]&&!me.owned.includes(i);if(isCol)b.style.background=v;else b.textContent=v+(lock?(i===24?' 🔒 جواز السفر':i>=25?' 🔒 مستوى '+LVH[i]:' 🔒'+HPRICE[i]):'');if(me[key]===i)b.classList.add('on');b.onclick=()=>{if(cl){toast('🎖️ اللون ده بيتفتح عند مستوى '+CLV[i]);sfx('err');return}if(lock&&!b.dataset.u){if(HPRICE[i]>=99999){toast(i===24?'🛂 بتتفتح من جواز السفر':'🎖️ بتتفتح عند مستوى '+LVH[i]);sfx('err');return}if(me.coins<HPRICE[i]){toast('محتاج '+HPRICE[i]+' 🪙');sfx('err');return}me.coins-=HPRICE[i];me.owned.push(i);b.dataset.u=1;b.textContent=v;sfx('win');burst(player.root.position,0xffd43b,30)}me[key]=i;[...el.children].forEach(x=>x.classList.remove('on'));b.classList.add('on');player.setApp(myApp());saveMe();sendPos(true)};el.appendChild(b)})};
sw('s4',['بدون','🐱 قطة','🐶 كلب','🦆 بطة','🐰 أرنب','🦊 ثعلب','🐼 باندا','🐸 ضفدع','🦄 يونيكورن','🐢 سلحفاة','🐧 بطريق','🦉 بومة','🦔 قنفذ','🐻 دب','🐹 هامستر','🦖 ديناصور','🐝 نحلة','🦁 أسد','🐙 أخطبوط','🦜 ببغاء','🦈 قرش','🐘 فيل','🦩 فلامنجو','🐊 تمساح','🦒 زرافة','🦥 كسلان','🐞 دعسوقة','🦢 بجعة'],'pet',false);sw('s5',['بدون','🎀 فيونكة','😎 نضارة','🧣 وشاح','🎩 قبعة','👑 تاج','🪽 أجنحة','🎈 بالون','🔔 جرس','⭐ نجمة','🧢 كاب','🌸 وردة','💎 ألماسة','🕶️ نضارة شمس','🎧 سماعات','🦋 فراشة','👑 تاج','🎒 شنطة','🧣 وشاح','🎩 قبعة','🔔 جرس','🌸 وردة','🪖 خوذة','⚡ برق','🍀 برسيم','🍄 فطر','☁️ سحابة','🔴 أنف مهرج'],'pacc',false);sw('s1',BODY,'body',true);sw('s2',HEAD,'head',true);sw('s3',HATS,'hat',false);
$('ok').onclick=()=>{const n=str($('nm').value,14).trim();if(n){me.name=n;player.setName(n)}saveMe();publishHome();sendPos(true);closeModal()};
});
$('bVisit').onclick=()=>modal(c=>{
c.innerHTML='<h2>🔑 زيارة صاحب</h2><label>اكتب كود صاحبك</label><input type="text" id="vc" maxlength="8" style="text-transform:uppercase;letter-spacing:3px" autocomplete="off"><div class="row"><button class="btn g" id="go">زيارة</button><button class="btn o" id="fq">➕ طلب صداقة</button></div><div class="row"><button class="btn" id="pn">🔒 غرفة خاصة جديدة</button><button class="btn" id="pj">🔑 ادخل غرفة خاصة</button></div><label>أصحابك</label><div id="fl"></div>';
$('go').onclick=()=>{const v=$('vc').value;closeModal();visit(v)};
$('fq').onclick=()=>{sendFriendReq($('vc').value)};
$('pn').onclick=()=>{closeModal();const code=Array.from({length:4},()=>'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*31)]).join('');enterRoom('private',{code});setTimeout(()=>toast('🔒 كود الغرفة: '+code+' · ابعته لصحابك',6000),400)};
$('pj').onclick=()=>{const v=cleanCode($('vc').value).slice(0,4);if(v.length!==4){toast('اكتب كود الغرفة (٤ حروف) فوق');return}closeModal();enterRoom('private',{code:v})};
const fl=$('fl');if(!me.friends.length)fl.textContent='لسه مفيش. أي بيت تزوره بيتضاف هنا.';
me.friends.forEach(f=>{const d=document.createElement('div');d.className='friend';const pr=friendPres[f.code],on=pr&&Date.now()-pr.seen<40000;const s=document.createElement('span');s.textContent=(on?'🟢 ':'⚪ ')+f.name+' · '+f.code+(on?' · '+(RN[pr.r]||''):'');const b=document.createElement('button');b.className='btn g';b.style.padding='6px 12px';b.textContent='زيارة';b.onclick=()=>{closeModal();visit(f.code)};d.append(s);{const gb=document.createElement('button');gb.className='btn';gb.style.cssText='padding:6px 10px;margin-inline-end:6px';gb.textContent='🎁';gb.onclick=()=>openGift(f);d.append(gb)}if(on&&pr.r!=='home'&&RN[pr.r]){const j=document.createElement('button');j.className='btn o';j.style.cssText='padding:6px 12px;margin-inline-end:6px';j.textContent='انضم';j.onclick=()=>{closeModal();enterRoom(pr.r,{})};d.append(j)}d.append(b);fl.appendChild(d)});
});
$('bInfo').onclick=()=>modal(c=>{
c.innerHTML='<h2>ℹ️ إزاي تلعب</h2><div style="line-height:1.8;font-size:14px;max-height:30vh;overflow:auto;padding-inline-end:6px"><b>🚶 الحركة:</b> اضغط في أي مكان أو استخدم العصا. اسحب الشاشة تلف الكاميرا.<br><b>⭐ الفلوس:</b> اجمع النجوم والكنوز والصناديق والمطر في الساحة، وخد هدية يومية (الجمعة ضعف!).<br><b>🏠 بيتك:</b> فرّش بالفلوس: أثاث وسجاد وكمان لوحات وساعات على الحيط. زر "فرّش" جوه البيت.<br><b>🤝 الأصحاب:</b> زر "زيارة": اكتب كود صاحبك وابعتله طلب صداقة، وبعد ما يوافق تقدر تزوره وتبعتله 🎁 هدية. كودك في "شكلي".<br><b>🔒 غرف خاصة:</b> اعمل غرفة بكود من 4 حروف وقول لصحابك.<br><b>🎮 الألعاب:</b> الأركيد (إكس أو، ذاكرة، سيمون، رد فعل)، الملعب (كورة ونجوم)، السباق، الحديقة (فراشات وصيد سمك)، الشاطئ (صدف وقارب وكورة)، الكهف (جواهر وصخور تتكسّر)، الديسكو (لعبة إيقاع وحلبة رقص)، البيت المسكون (صيد أشباح)، محطة الفضاء (طاقة وتليسكوب). 🎹 الاستوديو: ازف بيانو وطبول وأجراس وصحابك في الغرفة بيسمعوك. 🚜 المزرعة: ازرع جزر وطماطم وقرع واحصدها بعد وقت. 👗 عرض الأزياء: اطلع على المنصة وصحابك يصوتولك ❤️. 🗺️ خريطة الكنز (من المهام): ٤ علامات X في أماكن مختلفة كل يوم. 🎓 تدريب الحيوان (من أكل الحيوانات): حيل بتظهر لصحابك. 🎢 الملاهي (أفعوانية ودوّامة). 🌀 المتاهة (بتتغير كل يوم). 🎆 مهرجان في الساحة كل نص ساعة (على الساعة و ٣٠) فيه ألعاب نارية وفانوس وهدية. 🛂 جواز السفر (من المهام): ختم من كل مكان وخد تاج المستكشف.<br><b>🐾 الحيوان:</b> اختاره من "شكلي" وأكله من الساحة عشان يكبر. بيرقص معاك.<br><b>📷 صورة:</b> الزر الدايرة على الشمال.<br><b>🤖 البوتات</b> عليها علامة 🤖، والباقي لاعبين حقيقيين أونلاين.<br><b>⚠️ تنبيه:</b> الشات واللوحات على سيرفر عام من غير رقابة. متكتبش بياناتك الشخصية.</div><div class="row"><button class="btn d" id="sm"></button><button class="btn d" id="sq"></button></div><div class="row"><button class="btn d" id="st"></button></div><div class="row" style="align-items:center;gap:8px"><span style="white-space:nowrap">🔉 الصوت</span><input type="range" id="sv" min="0" max="100" step="10" style="flex:1"></div><div class="row"><button class="btn g" id="ok">تمام</button></div>';{const sv=$('sv');sv.value=Math.round((me.vol==null?1:me.vol)*100);sv.oninput=()=>{me.vol=sv.value/100;setVol();saveMe()};sv.onchange=()=>sfx('star')}const lab=()=>{$('sm').textContent=me.mute?'🔇 الصوت: مكتوم':'🔊 الصوت: شغال';$('sq').textContent=me.lq?'🖼️ الجودة: خفيفة':'🖼️ الجودة: عالية'};lab();$('sm').onclick=()=>{me.mute=!me.mute;saveMe();lab();if(me.mute&&jukeT){jukebox()}};$('sq').onclick=()=>{me.lq=!me.lq;saveMe();applyQ();lab()};const tl=()=>{$('st').textContent='🔤 حجم الكتابة: '+['عادي','كبير','كبير جداً'][me.ts|0]};tl();$('st').onclick=()=>{me.ts=((me.ts|0)+1)%3;saveMe();applyTS();tl()};$('ok').onclick=closeModal});
/* ===================== main loop ===================== */
let last=performance.now(),tClock=0;
function frame(now){
requestAnimationFrame(frame);
const dt=Math.min(0.05,(now-last)/1000);last=now;tClock+=dt;chestTick(dt);gardenTick(dt);snowTick(dt);visTick(dt);achTick(dt);rainTick(dt);if(discoBall&&room.type==='private'){discoBall.rotation.y+=dt;discoBall.material.color.setHSL((tClock*0.3)%1,0.8,0.65)}fireflyTick(dt);ambTick(dt);if(wheelObj&&room.type==='plaza')wheelObj.rotation.z+=dt*0.8;fpsTick(dt);
if(player){
let ix=joy.x+((keys['d']||keys['arrowright'])?1:0)-((keys['a']||keys['arrowleft'])?1:0),iy=joy.y+((keys['w']||keys['arrowup'])?1:0)-((keys['s']||keys['arrowdown'])?1:0);
const m=Math.hypot(ix,iy);let vx=0,vz=0,mov=false;
const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
if(m>0.1){const k=Math.min(1,m)/m;ix*=k;iy*=k;vx=rx*ix+fx*iy;vz=rz*ix+fz*iy;walkTarget=null;mov=true}
else if(walkTarget){const dx=walkTarget.x-player.root.position.x,dz=walkTarget.z-player.root.position.z,d=Math.hypot(dx,dz);if(d<0.15)walkTarget=null;else{vx=dx/d;vz=dz/d;mov=true}}
if(room.slide){const k2=Math.min(1,dt*1.3),tx=mov?vx*6.5:0,tz=mov?vz*6.5:0;iceV.x+=(tx-iceV.x)*k2;iceV.z+=(tz-iceV.z)*k2;const p=player.root.position;p.x+=iceV.x*dt;p.z+=iceV.z*dt;const sv=Math.hypot(iceV.x,iceV.z);if(sv>0.5)player.yaw=Math.atan2(iceV.x,iceV.z);mov=sv>0.5}else if(mov){const p=player.root.position,sp=5*dt;p.x+=vx*sp;p.z+=vz*sp;player.yaw=Math.atan2(vx,vz)}
const p=player.root.position,b=room.bounds;
if(room.type==='plaza'){const r=Math.hypot(p.x,p.z);if(r>b){p.x*=b/r;p.z*=b/r}if(r<3.5){p.x*=3.5/Math.max(r,0.01);p.z*=3.5/Math.max(r,0.01)}}
else if(ride){p.x=clamp(p.x,-14,14);p.z=clamp(p.z,-18,-8.6)}
else{p.x=clamp(p.x,-b,b);p.z=clamp(p.z,-b,b)}
if(ride)rideTick(dt);mazeCollide(p);
player.moving=mov;player.tick(dt,tClock);
{const f=(room.type==='plaza'||room.type==='park')?1:0.4;camT.lerp(new THREE.Vector3(p.x*f,1,p.z*f),Math.min(1,dt*6))}
camera.position.set(camT.x+Math.sin(yaw)*Math.cos(pitch)*dist,camT.y+Math.sin(pitch)*dist,camT.z+Math.cos(yaw)*Math.cos(pitch)*dist);camera.lookAt(camT);
sendPos(false);
for(const pt of portals){const dx=p.x-pt.x,dz=p.z-pt.z;pt.ring.rotation.z+=dt*2;if(!nearCool&&dx*dx+dz*dz<1.1){nearCool=true;setTimeout(()=>nearCool=false,1500);gotoPortal(pt.to);break}}
}
{let best=null,bd=9;if(player)for(const it of interacts){const d=Math.hypot(player.root.position.x-it.x,player.root.position.z-it.z);if(d<2.6&&d<bd){bd=d;best=it}}const a=$('act');if(best){if(actFn!==best){actFn=best;a.style.display='flex'}if(a.textContent!==best.label)a.textContent=best.label}else if(actFn){actFn=null;a.style.display='none'}}
tickParts(dt);tickBall(dt);if(isNight&&room.type==='plaza'){fwT-=dt;if(fwT<=0){fwT=4+Math.random()*5;const fx=(Math.random()-0.5)*20,fz=(Math.random()-0.5)*20,fc=[[0xff6b6b,0xffd43b],[0x4dabf7,0xffffff],[0x69db7c,0xffd43b],[0xf783ac,0xb197fc]][Math.floor(Math.random()*4)];burst({x:fx,y:8,z:fz},fc,45);sfx('tick')}}{const rc=$('race');if(room.type==='race'&&player){tickRace();rc.style.display='block'}else if(rc.style.display!=='none')rc.style.display='none'}if(player&&(frame.n%6===0))drawMM();
for(const c of clouds){c.position.x+=dt*0.8;if(c.position.x>70)c.position.x=-70}
const nowMs=performance.now();
for(const [id,r] of remotes){
if(nowMs-r.seen>9000){scene.remove(r.root);remotes.delete(id);setOnline();continue}
const dx=r.tx-r.root.position.x,dz=r.tz-r.root.position.z,d=Math.hypot(dx,dz);r.moving=d>0.1;
if(d>0.02){const k=Math.min(1,dt*8);r.root.position.x+=dx*k;r.root.position.z+=dz*k;if(d>0.1)r.yaw=Math.atan2(dx,dz)}
r.tick(dt,tClock);
}
if(room.type==='park'&&player&&Math.abs(player.root.position.x)<=17){}
if(room.type==='plaza'){tickBots(dt);rollStars();
for(const s of starObjs){if(starTaken.has(s.k))continue;s.m.rotation.y+=dt*2;s.m.position.y=1.1+Math.sin(tClock*3+s.k)*0.18;
if(player){const dx=player.root.position.x-s.x,dz=player.root.position.z-s.z;if(dx*dx+dz*dz<1.4)takeStar(starSlot,s.k,true)}}
if(fountainWater)fountainWater.position.y=0.5+Math.sin(tClock*2)*0.03;
}
if((frame.n=(frame.n||0)+1)%600===0)applySky();
renderer.render(scene,camera);
}
let nearCool=false;
function gotoPortal(to){if(to==='home')goMyHome();else if(to==='plaza')goPlaza(room.type);else enterRoom(to,{})}
setTimeout(()=>{if(me.ob&&!me.hint2&&room&&room.type==='plaza'){me.hint2=1;saveMe();toast('🎡 جرّب عجلة الحظ شرق الساحة، و🐾 أكل الحيوانات في الغرب، و🌷 الحديقة في الجنوب',5000)}},15000);
function onboard(){if(me.ob||document.getElementById('ob')||/nomerge|noob/.test(location.search))return;const steps=['👋 أهلاً في عالمنا! اسحب بإصبعك في الشاشة عشان تتحرك','💬 اضغط زر الشات عشان تكلم اللاعبين','🚪 ادخل البوابات للألعاب والكافيه وبيتك','🎁 خد هديتك اليومية من القائمة، وجمّع عملات!'];let i=0;const b=document.createElement('div');b.id='ob';b.style.cssText='position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:50;max-width:86vw;background:#fff;color:#111;border-radius:16px;padding:14px 18px;font:600 15px system-ui;text-align:center;box-shadow:0 6px 24px #0006;direction:rtl';const t=document.createElement('div'),n=document.createElement('button');n.className='btn g';n.style.cssText='margin-top:10px';b.append(t,n);document.body.appendChild(b);function show(){t.textContent=steps[i];n.textContent=i<steps.length-1?'التالي ◀':'يلا نلعب!'}n.onclick=()=>{i++;if(i>=steps.length){b.remove();me.ob=1;saveMe()}else show()};show()}
(function w(){if($('modal').style.display==='flex')return setTimeout(w,700);onboard()})();
window.addEventListener('orientationchange',()=>setTimeout(()=>window.dispatchEvent(new Event('resize')),250));
let butter=[];
let bg=null,blCb=null;
function openButterLB(){const e={};modal(c=>{c.innerHTML='<h2>🦋 أفضل الصيادين</h2><div id="bl"></div><div class="row"><button class="btn d" id="bx">إغلاق</button></div>';const render=()=>{const l=$('bl');if(!l)return;l.innerHTML='';const a=Object.values(e).sort((x,y)=>y.s-x.s).slice(0,10);if(!a.length)l.textContent='لسه مفيش أرقام';a.forEach((v,i)=>{const d=document.createElement('div');d.className='qrow';d.textContent=(i+1)+'. '+v.n+' · '+v.s+' فراشة';l.appendChild(d)})};blCb=(id,m)=>{e[id]=m;render()};if(netOK)try{client.subscribe(NS+'/bl/+')}catch(x){}if(me.bfBest)e[me.id]={n:me.name,s:Math.min(60,me.bfBest)};$('bx').onclick=()=>{try{client.unsubscribe(NS+'/bl/+')}catch(x){}blCb=null;closeModal()};render()})}
function startButter(){if(bg){toast('اللعبة شغالة!');return}bg={t:30,n:0};const h=chestHud();h.style.display='block';toast('🦋 اجري ورا الفراشات! 30 ثانية');sfx('star')}
function butterGame(dt){
if(!bg)return;const h=chestHud();bg.t-=dt;h.style.display='block';h.textContent='🦋 '+bg.n+' · ⏱ '+Math.max(0,Math.ceil(bg.t));
const p=player.root.position;
for(const b of butter){if(b.hide>0){b.hide-=dt;if(b.hide<=0)b.m.visible=true;continue}const q=b.m.position;if(Math.hypot(p.x-q.x,p.z-q.z)<1.1){b.m.visible=false;b.hide=1.5;bg.n++;sfx('chat');burst(q,0xf783ac,6)}}
if(bg.t<=0){const n=bg.n,pr=Math.min(n*2,40);bg=null;const nb=Math.min(60,n);if(nb>(me.bfBest||0)){me.bfBest=nb;if(netOK)try{client.publish(NS+'/bl/'+me.id,JSON.stringify({n:me.name,s:nb}),{retain:true})}catch(x){}}me.coins+=pr;updCoins();saveMe();sfx('star');burst(p,0xffd43b,14);toast('🦋 اصطدت '+n+' فراشة! +'+pr+'🪙 · أفضل نتيجة '+me.bfBest,3500);chestUpd()}
}
let lastWater=0;
function buildGarden(){
interacts=[];butter=[];const g=indoor(0x3f8f3f,0xbfe3a8,0xf783ac);
const rng=mulberry(4242),cols=[0xff6b9d,0xffd43b,0xb197fc,0xff922b,0xf8f9fa,0x74c0fc];
for(let i=0;i<46;i++){const x=-6.8+rng()*13.6,z=-6.8+rng()*11;if(Math.hypot(x-3.5,z+2)<2.4||Math.hypot(x+3,z-1)<1.6)continue;const c=cols[i%6];g.add(mesh(G.cyl(0.03,0.03,0.4,5),0x2f9e44,x,0.2,z),mesh(G.sph(0.14,6),c,x,0.45,z,c))}
const pd=mesh(G.cyl(2.2,2.2,0.08,22),0x4dabf7,3.5,0.04,-2,0x0b3a66);g.add(pd);g.add(mesh(G.cyl(2.4,2.5,0.14,22),0xadb5bd,3.5,0.0,-2));g.add(pd);
for(const[x,z,h]of[[-6,-6,2.6],[6,-6.2,3],[-6.2,5,2.2]]){g.add(mesh(G.cyl(0.25,0.3,h,7),0x6f4e37,x,h/2,z),mesh(G.cone(1.3,2.2,8),0x2b8a3e,x,h+0.9,z))}
const b=new THREE.Group();b.position.set(-3,0,1);b.add(mesh(G.box(2,0.12,0.7),0x8d6e63,0,0.55,0),mesh(G.box(2,0.5,0.1),0x8d6e63,0,0.9,-0.3),mesh(G.box(0.12,0.5,0.6),0x5c4033,-0.9,0.25,0),mesh(G.box(0.12,0.5,0.6),0x5c4033,0.9,0.25,0));g.add(b);
const wc=new THREE.Group();wc.position.set(0,0,-3);wc.add(mesh(G.cyl(0.3,0.4,0.6,10),0x1c7ed6,0,0.3,0),mesh(G.cyl(0.05,0.05,0.5,6),0x1864ab,0.3,0.55,0));g.add(wc);
sign(g,'🚿 اسقِ الورد',0,1.8,-3);interacts.push({x:0,z:-2,label:'🚿 اسقِ الورد (+3🪙)',fn:waterFlowers});
g.add(mesh(G.box(1.2,0.1,2.2),0x8d6e63,3.5,0.12,0.9),mesh(G.box(0.1,0.5,0.1),0x5c4033,2.95,0.3,1.9),mesh(G.box(0.1,0.5,0.1),0x5c4033,4.05,0.3,1.9));sign(g,'🎣 صيد السمك',3.5,2.2,2.2);interacts.push({x:3.5,z:1.6,label:'🎣 اصطد سمك',fn:openFishing});
sign(g,'🌷 الحديقة',0,4,-7.5,'rgba(190,40,100,.85)');sign(g,'🦋 اصطد الفراشات',5.5,2.2,3.5);interacts.push({x:5.5,z:4.5,label:'🦋 العب اصطياد الفراشات',fn:startButter});sign(g,'🏆 أفضل الصيادين',-5.5,2.2,3.5);interacts.push({x:-5.5,z:4.5,label:'🏆 أفضل الصيادين',fn:openButterLB});
g.add(portalMesh('🤸 الترامبولين',-6,5.5,0xf06595,'jump'),portalMesh('📚 المكتبة',6,5.5,0x7950f2,'lib'));
finishRoom(g);
for(let i=0;i<8;i++){const m=new THREE.Group(),c=cols[i%6];for(const sx of[-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(0.28,0.22),new THREE.MeshBasicMaterial({color:c,side:2}));w.position.x=sx*0.14;w.userData.sx=sx;m.add(w)}room.group.add(m);butter.push({m,a:rng()*6.28,r:2+rng()*4.5,h:1.2+rng()*1.2,sp:0.3+rng()*0.4,cx:(rng()-0.5)*6,cz:(rng()-0.5)*5})}
}
function openSimon(){modal(c=>{const t=today();if(!me.smd||me.smd.d!==t)me.smd={d:t,n:0};c.innerHTML='<h2>🔴 سيمون يقول</h2><div id="smsg" style="text-align:center;min-height:26px;margin:6px">احفظ الترتيب وكرره! أفضل مستوى: '+(me.simBest||0)+'</div><div id="sgrid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0"></div><div class="row"><button class="btn g" id="sgo">ابدأ</button><button class="btn d" id="sx">إغلاق</button></div>';const cols=['#e03131','#2f9e44','#1971c2','#f08c00'],dim=['#6b2020','#1d4d2b','#123f6b','#7a4a00'],bs=[];let seq=[],pos=0,state=0,alive=true;const g=$('sgrid');for(let i=0;i<4;i++){const b=document.createElement('button');b.style.cssText='height:84px;border:0;border-radius:14px;background:'+dim[i];b.onclick=()=>{if(state!==2)return;flash(i);if(i!==seq[pos]){fail();return}pos++;if(pos>=seq.length){state=0;setTimeout(next,700)}};g.appendChild(b);bs.push(b)}const flash=i=>{bs[i].style.background=cols[i];sfx('tick');setTimeout(()=>{if(alive)bs[i].style.background=dim[i]},300)};const next=()=>{if(!alive)return;seq.push(Math.floor(Math.random()*4));pos=0;state=1;$('smsg').textContent='🔎 ركز... مستوى '+seq.length;seq.forEach((v,k)=>setTimeout(()=>{if(alive)flash(v)},600+k*600));setTimeout(()=>{if(!alive)return;state=2;$('smsg').textContent='👆 دورك!'},600+seq.length*600)};const fail=()=>{state=0;const lv=Math.max(0,seq.length-1);me.simBest=Math.max(me.simBest||0,lv);const pay=me.smd.n<3?Math.min(lv*3,30):0;if(pay)me.smd.n++;me.coins+=pay;updCoins();saveMe();sfx('err');$('smsg').textContent='❌ غلطت! وصلت مستوى '+lv+(pay?' · +'+pay+'🪙':' · (وصلت حد النهاردة)');$('sgo').textContent='جرب تاني';$('sgo').style.display=''};$('sgo').onclick=()=>{seq=[];$('sgo').style.display='none';next()};$('sx').onclick=()=>{alive=false;closeModal()}})}
function openReact(){modal(c=>{const t=today();if(!me.rcd||me.rcd.d!==t)me.rcd={d:t,n:0};c.innerHTML='<h2>⚡ سرعة رد الفعل</h2><div id="rmsg" style="text-align:center;margin:6px">دوس على الزرار أول ما يبقى أخضر. أفضل رقم: '+(me.reactBest?me.reactBest+' ms':'—')+'</div><button id="rbtn" style="width:100%;height:120px;border:0;border-radius:16px;background:#495057;color:#fff;font-size:22px">ابدأ</button><div class="row"><button class="btn d" id="rx">إغلاق</button></div>';let st=0,t0=0,tm=null;const b=$('rbtn');$('rx').onclick=()=>{clearTimeout(tm);closeModal()};b.onclick=()=>{if(st===0){st=1;b.style.background='#c92a2a';b.textContent='استنى...';tm=setTimeout(()=>{st=2;t0=performance.now();b.style.background='#2f9e44';b.textContent='دوس دلوقتي!'},1500+Math.random()*3000)}else if(st===1){clearTimeout(tm);st=0;b.style.background='#495057';b.textContent='بدري! جرب تاني';sfx('err')}else{const ms=Math.round(performance.now()-t0);st=0;me.reactBest=me.reactBest?Math.min(me.reactBest,ms):ms;const pay=me.rcd.n<5?(ms<300?10:ms<450?5:2):0;if(pay)me.rcd.n++;me.coins+=pay;updCoins();saveMe();sfx('star');b.style.background='#495057';b.textContent=ms+' ms'+(pay?' · +'+pay+'🪙':'')+' · دوس تاني';$('rmsg').textContent='أفضل رقم: '+me.reactBest+' ms'}}})}
let sgm=null;
let slCb=null;
function openStarLB(){const e={};modal(c=>{c.innerHTML='<h2>🌠 أفضل جامعي النجوم</h2><div id="sl"></div><div class="row"><button class="btn d" id="sx">إغلاق</button></div>';const render=()=>{const l=$('sl');if(!l)return;l.innerHTML='';const a=Object.values(e).sort((x,y)=>y.s-x.s).slice(0,10);if(!a.length)l.textContent='لسه مفيش أرقام';a.forEach((v,i)=>{const d=document.createElement('div');d.className='qrow';d.textContent=(i+1)+'. '+v.n+' · '+v.s+' نجمة';l.appendChild(d)})};slCb=(id,m)=>{e[id]=m;render()};if(netOK)try{client.subscribe(NS+'/sg/+')}catch(x){}if(me.sgBest)e[me.id]={n:me.name,s:Math.min(80,me.sgBest)};$('sx').onclick=()=>{try{client.unsubscribe(NS+'/sg/+')}catch(x){}slCb=null;closeModal()};render()})}
function startStarGame(){if(sgm){toast('اللعبة شغالة!');return}sgm={t:25,n:0,sp:0,items:[]};const h=chestHud();h.style.display='block';toast('🌠 اجمع النجوم الصفرا وابعد عن النيازك الحمرا! 25 ثانية',3000);sfx('star')}
function starGameTick(dt){
if(!sgm)return;if(!room||room.type!=='park'||!player){for(const i of sgm.items)if(i.m.parent)i.m.parent.remove(i.m);sgm=null;chestUpd();return}
const h=chestHud(),p=player.root.position;sgm.t-=dt;sgm.sp-=dt;h.style.display='block';h.textContent='🌠 '+sgm.n+' · ⏱ '+Math.max(0,Math.ceil(sgm.t));
if(sgm.sp<=0&&sgm.t>1.5&&sgm.items.length<9){sgm.sp=0.55;const bad=Math.random()<0.28,m=mesh(bad?G.sph(0.4,7):G.cone(0.4,0.7,5),bad?0xe03131:0xffd43b,(Math.random()-0.5)*28,1,(Math.random()-0.5)*28,bad?0xaa2200:0xaa8800);m.userData.bad=bad;room.group.add(m);sgm.items.push({m,bad,l:4.5})}
for(let k=sgm.items.length-1;k>=0;k--){const i=sgm.items[k];i.l-=dt;i.m.rotation.y+=dt*3;i.m.position.y=1+Math.sin(tClock*4+k)*0.25;const q=i.m.position;let gone=i.l<=0;if(Math.hypot(p.x-q.x,p.z-q.z)<1.2){gone=true;if(i.bad){sgm.n=Math.max(0,sgm.n-3);sfx('tick');burst(q,0xe03131,8)}else{sgm.n++;sfx('chat');burst(q,0xffd43b,8)}}if(gone){room.group.remove(i.m);sgm.items.splice(k,1)}}
if(sgm.t<=0){const n=sgm.n,t=today();if(!me.sgd||me.sgd.d!==t)me.sgd={d:t,n:0};const pay=me.sgd.n<5?Math.min(n*2,40):0;if(pay)me.sgd.n++;for(const i of sgm.items)room.group.remove(i.m);sgm=null;me.sgBest=Math.max(me.sgBest||0,n);if(netOK&&n>0)try{client.publish(NS+'/sg/'+me.id,JSON.stringify({n:me.name,s:Math.min(80,me.sgBest)}),{retain:true})}catch(x){}me.coins+=pay;updCoins();saveMe();sfx('star');burst(p,0xffd43b,16);toast('🌠 جمعت '+n+' نجمة'+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)')+' · أفضل نتيجة '+me.sgBest,3500);chestUpd()}
}
let fishT=null;
function openFishing(){modal(c=>{const fd=()=>{const t=today();if(!me.fd||me.fd.d!==t)me.fd={d:t,n:0};return me.fd};c.innerHTML='<h2>🎣 صيد السمك</h2><div id="fmsg" style="font-size:18px;margin:10px 0;min-height:48px;text-align:center">ارمي السنارة وانتظر النبشة، وبعدين اشد بسرعة!</div><div class="row"><button class="btn" id="fgo">🎣 ارمي السنارة</button><button class="btn d" id="fx">إغلاق</button></div><div id="fst" style="text-align:center;opacity:.8;font-size:13px;margin-top:6px"></div>';let st=0,tm=null,bite=0;const upd=()=>{$('fst').textContent='🐟 صيدك الكلي: '+(me.fish||0)+' · مدفوع النهاردة '+fd().n+'/10'};upd();const end=()=>{clearTimeout(tm);closeModal()};$('fx').onclick=end;$('fgo').onclick=()=>{const m=$('fmsg'),b=$('fgo');if(st===0){st=1;m.textContent='🌊 مستني النبشة...';b.textContent='استنى...';tm=setTimeout(()=>{st=2;bite=Date.now();m.textContent='⚡ نبشة! اشد دلوقتي!';b.textContent='⚡ شد!';sfx('chat');tm=setTimeout(()=>{st=0;m.textContent='🐟 السمكة هربت! جرب تاني';b.textContent='🎣 ارمي السنارة'},1300)},1500+Math.random()*2800)}else if(st===1){clearTimeout(tm);st=0;m.textContent='😅 شديت بدري، السمكة خافت';b.textContent='🎣 ارمي السنارة'}else if(st===2){clearTimeout(tm);st=0;const r=Math.random(),f=r<0.02?['🦈',50,'قرش!']:r<0.12?['🐡',15,'سمكة نفاخة']:r<0.4?['🐠',8,'سمكة ملونة']:['🐟',4,'سمكة'];const d=fd();let pay=d.n<10?f[1]:0;if(pay)d.n++;me.fish=(me.fish||0)+1;me.coins+=pay;m.textContent=f[0]+' '+f[2]+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)');b.textContent='🎣 ارمي تاني';sfx('star');burst(player.root.position,0x74c0fc,10);updCoins();saveMe();upd()}}})}
function waterFlowers(){const t=Date.now();if(t-lastWater<20000){toast('🌱 الورد لسه مبلول، استنى '+Math.ceil((20000-(t-lastWater))/1000)+' ثانية');return}lastWater=t;me.coins+=3;sfx('star');burst(player.root.position,0x74c0fc,12);toast('🌷 الورد فرحان! +3🪙');updCoins();saveMe()}
let rays=null;
function rayTick(){if(!scene||!room)return;if(!rays){rays=new THREE.Group();for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(2.2+i*0.3,34),new THREE.MeshBasicMaterial({color:0xfff3b0,transparent:true,opacity:0.07,blending:THREE.AdditiveBlending,depthWrite:false,side:2}));m.position.set(-34+i*4.5,15,-26-i*1.5);m.rotation.z=-0.55;m.userData.i=i;rays.add(m)}scene.add(rays)}const d=new Date(),h=d.getHours()+d.getMinutes()/60,day=h>7&&h<17;rays.visible=day&&(room.type==='plaza'||room.type==='park'||room.type==='garden'||room.type==='beach')&&!(me&&me.lq)&&!window.autoLQ;if(rays.visible)rays.children.forEach(m=>m.material.opacity=0.09+0.06*Math.sin(tClock*0.6+m.userData.i*1.7))}
let shells=[],lastCastle=0;
function buildBeach(){
interacts=[];shells=[];const g=new THREE.Group(),rng=mulberry(777);
g.add(mesh(G.box(16,0.3,16),0xcfa95f,0,-0.15,0),mesh(G.box(70,0.2,40),0x1971c2,0,-0.3,-28,0x062a50),mesh(G.box(16,0.12,3),0x339af0,0,-0.12,-9.4,0x083a66));
for(let i=0;i<9;i++)g.add(mesh(G.box(1.2+rng()*2,0.05,0.12),0xffffff,-7+i*1.8,0.02,-8.4+rng()*0.8));
g.add(mesh(G.sph(2.2,14),0xffa94d,6,5.5,-26,0xff6b1a));
for(const[x,z,h]of[[-6,-4,3.2],[6.2,-2,2.8],[-6.5,3,3],[6,4.5,3.4]]){const t=new THREE.Group();t.position.set(x,0,z);const l=mesh(G.cyl(0.14,0.2,h,6),0x8d6e63,0,h/2,0);l.rotation.z=x>0?-0.15:0.15;t.add(l);for(let k=0;k<6;k++){const a=k/6*6.28,lf=mesh(G.box(1.6,0.06,0.35),0x2f9e44,Math.cos(a)*0.8,h+0.05,Math.sin(a)*0.8);lf.rotation.y=-a;lf.rotation.z=-0.35;t.add(lf)}t.add(mesh(G.sph(0.14,6),0x5c3d1e,0.15,h-0.1,0.1),mesh(G.sph(0.14,6),0x5c3d1e,-0.12,h-0.1,0.12));g.add(t)}
for(const[x,z,c]of[[-3,0,0xff6b6b],[3.2,1.5,0x4dabf7],[-2.2,5,0xffd43b]]){const u=new THREE.Group();u.position.set(x,0,z);u.add(mesh(G.cyl(0.04,0.04,2.2,5),0xf8f9fa,0,1.1,0),mesh(G.cone(1.4,0.6,10),c,0,2.3,0),mesh(G.box(1.3,0.06,0.6),0xf8f9fa,0.1,0.18,1.0));g.add(u)}
const cs=new THREE.Group();cs.position.set(0,0,-3);cs.add(mesh(G.cyl(0.9,1.1,0.5,8),0xe6c27a,0,0.25,0),mesh(G.cyl(0.5,0.6,0.5,8),0xe6c27a,0,0.75,0),mesh(G.cone(0.3,0.5,6),0xff6b6b,0,1.25,0));g.add(cs);
const bt=new THREE.Group();bt.position.set(5.5,0,-8.2);bt.add(mesh(G.box(2.6,0.5,1),0xc2410c,0,0.15,0),mesh(G.cyl(0.05,0.05,2,5),0x5c3d1e,0,1.2,0),mesh(G.box(0.05,1.3,1),0xf8f9fa,0.1,1.4,0));g.add(bt);
sign(g,'⛵ رحلة بالقارب',5.5,2.4,-7);interacts.push({x:5.5,z:-5.8,label:'⛵ ابدأ رحلة القارب',fn:startRide});
sign(g,'🏖️ الشاطئ',0,4.2,-6,'rgba(230,119,0,.9)');sign(g,'🏰 ابني قلعة رمل',0,2.2,-3);interacts.push({x:0,z:-1.6,label:'🏰 ابني قلعة رمل (+2🪙)',fn:buildCastle});
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'),portalMesh('🎣 ميناء الصيد',-5,6,0x1c7ed6,'fish'),portalMesh('🏃 الطاردة',5,6,0x22b8cf,'tag'),portalMesh('🪁 الطيارة الورق',-10,5,0xfab005,'kite'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
bball=new THREE.Mesh(new THREE.SphereGeometry(0.4,14,10),new THREE.MeshLambertMaterial({color:0xff6b6b}));bball.position.set(2,0.4,2);bbv={x:0,z:0};bbh=0;room.group.add(bball);const bs=new THREE.Mesh(new THREE.SphereGeometry(0.405,14,10,0,6.3,0.9,0.5),new THREE.MeshLambertMaterial({color:0xffffff}));bball.add(bs);sign(room.group,'🏐 اضرب الكورة (+1🪙 كل 10)',2,2.2,3.6);
for(let i=0;i<6;i++){const m=mesh(G.sph(0.18,8),[0xffd6e0,0xfff0c2,0xd0ebff][i%3],-6+rng()*12,0.12,-6+rng()*11,0x553355);m.scale.set(1,0.55,1);room.group.add(m);shells.push(m)}
toast('🐚 فيه 6 صدفات مستخبية على الشاطئ، دور عليهم!',2800)
}
let gems=[],rocks=[],bats=[];
function buildCave(){
interacts=[];gems=[];rocks=[];bats=[];const g=indoor(0x3b3550,0x2b2640,0x9775fa),rng=mulberry(9191);
for(let i=0;i<14;i++){const x=-7+rng()*14,z=-7+rng()*10;g.add(mesh(G.cone(0.25+rng()*0.3,0.8+rng()*1.4,5),0x4a4366,x,0.6,z))}
for(let i=0;i<8;i++){const x=-7+rng()*14,z=-7.5;g.add(mesh(G.cone(0.2,1.2+rng()*1.5,4),0x6c5aa0,x,4.4,z+0.4).rotateX(Math.PI))}
for(const[x,z,c]of[[-6,-6,0x74c0fc],[6,-6.2,0xf783ac],[-6.5,2,0xb197fc],[6.4,1,0x69db7c]]){const k=new THREE.Group();k.position.set(x,0,z);for(let j=0;j<4;j++){const m=mesh(G.cone(0.18,0.9+j*0.3,5),c,(j-1.5)*0.22,0.5+j*0.12,(j%2)*0.2,c);m.rotation.z=(j-1.5)*0.18;k.add(m)}g.add(k);const L=new THREE.PointLight(c,0.9,7);L.position.set(x,1.2,z);g.add(L)}
for(const[x,z]of[[-3,-5],[3,-5.5],[-5,-1],[5,-2.5],[0,-6.5]]){const r=new THREE.Group();r.position.set(x,0,z);r.add(mesh(G.sph(0.7,7),0x6b6485,0,0.45,0),mesh(G.sph(0.25,6),0xffd43b,0.3,0.7,0.5,0xaa8800));r.traverse(q=>q.userData.keep=true);g.add(r);const o={x,z:z+1.4,g:r,hits:0,cd:0,label:'⛏️ كسّر الصخرة'};rocks.push(o);interacts.push({x:o.x,z:o.z,label:'⛏️ كسّر الصخرة (٣ ضربات، +4🪙)',fn:()=>mineRock(o)})}
sign(g,'💎 الكهف',0,4.2,-6,'rgba(112,72,232,.9)');sign(g,'⛏️ كسّر الصخور واجمع الجواهر',0,3.0,-4.6);
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
const gc=[0x74c0fc,0xf783ac,0xb197fc,0x69db7c,0xffd43b];
for(let i=0;i<8;i++){const m=mesh(G.cone(0.2,0.5,4),gc[i%5],-6.5+rng()*13,0.5,-4+rng()*9,gc[i%5]);m.userData.keep=true;room.group.add(m);gems.push(m)}
for(let i=0;i<4;i++){const b=new THREE.Group();b.add(mesh(G.sph(0.17,7),0x3b2f4a,0,0,0),mesh(G.box(0.5,0.04,0.28),0x3b2f4a,-0.35,0.05,0),mesh(G.box(0.5,0.04,0.28),0x3b2f4a,0.35,0.05,0),mesh(G.sph(0.04,5),0xff6b6b,-0.07,0.04,0.14,0xff3333),mesh(G.sph(0.04,5),0xff6b6b,0.07,0.04,0.14,0xff3333));b.userData={a:rng()*6,r:2+rng()*3,h:2.5+rng()};room.group.add(b);bats.push(b)}
toast('💎 فيه 8 جواهر مستخبية في الكهف وصخور تتكسّر!',3000)
}
function mineRock(o){if(!o.g.visible)return;const t=today();if(!me.mnd||me.mnd.d!==t)me.mnd={d:t,n:0};o.hits++;sfx('tick');burst(o.g.position,0xadb5bd,6);o.g.scale.setScalar(1-o.hits*0.18);if(o.hits>=3){o.hits=0;o.g.visible=false;o.cd=45;const pay=me.mnd.n<10?4:0;if(pay)me.mnd.n++;me.coins+=pay;me.mined=(me.mined||0)+1;sfx('star');burst(o.g.position,0xffd43b,12);toast('⛏️ لقيت جوهرة! '+(pay?'+4🪙':'(وصلت حد النهاردة)'),2500);updCoins();saveMe()}else toast('⛏️ '+o.hits+'/3',700)}
function caveTick(dt){if(!room||room.type!=='cave'||!player)return;const p=player.root.position;for(const b of bats){const u=b.userData;u.a+=dt*1.1;b.position.set(Math.cos(u.a)*u.r,u.h+Math.sin(u.a*3)*0.2,Math.sin(u.a*1.3)*u.r*0.8);b.rotation.y=-u.a;b.children[1].rotation.z=Math.sin(tClock*18)*0.7;b.children[2].rotation.z=-Math.sin(tClock*18)*0.7}for(const o of rocks){if(!o.g.visible){o.cd-=dt;if(o.cd<=0){o.g.visible=true;o.g.scale.setScalar(1)}}}for(let k=gems.length-1;k>=0;k--){const m=gems[k];m.rotation.y+=dt*2.5;m.position.y=0.55+Math.sin(tClock*3+k)*0.1;if(Math.hypot(p.x-m.position.x,p.z-m.position.z)<1.0){room.group.remove(m);gems.splice(k,1);const t=today();if(!me.gmd||me.gmd.d!==t)me.gmd={d:t,n:0};const pay=me.gmd.n<16?2:0;if(pay)me.gmd.n++;me.gemsGot=(me.gemsGot||0)+1;me.coins+=pay;sfx('chat');burst(m.position,0xb197fc,8);toast('💎 جوهرة! '+(pay?'+2🪙':'(وصلت حد النهاردة)')+(gems.length?'':' · خلصتهم كلهم!'));updCoins();saveMe()}}}
let dTiles=[],dBall=null,dsT=0;
function buildDisco(){
interacts=[];dTiles=[];const g=indoor(0x1b1b2f,0x2a1f3d,0xe64980);
const cols=[0xe64980,0x7048e8,0x15aabf,0xfab005,0x40c057,0xff6b6b];
for(let i=0;i<6;i++)for(let j=0;j<6;j++){const m=mesh(G.box(1.5,0.06,1.5),cols[(i*2+j)%6],-3.75+i*1.5,0.04,-5+j*1.5,cols[(i*2+j)%6]);m.userData.keep=true;g.add(m);dTiles.push(m)}
dBall=mesh(G.sph(0.8,10),0xdee2e6,0,4.2,-2,0x777777);dBall.userData.keep=true;g.add(dBall);g.add(mesh(G.cyl(0.02,0.02,1.5,4),0x868e96,0,5,-2));
for(const x of[-6.5,6.5]){g.add(mesh(G.box(1.2,2.4,1),0x212529,x,1.2,-6.5),mesh(G.cyl(0.4,0.4,0.1,12),0x495057,x,0.8,-5.95).rotateX(Math.PI/2),mesh(G.cyl(0.25,0.25,0.1,12),0x495057,x,1.8,-5.95).rotateX(Math.PI/2))}
const L1=new THREE.PointLight(0xe64980,1.1,12);L1.position.set(-3,3,-2);g.add(L1);const L2=new THREE.PointLight(0x15aabf,1.1,12);L2.position.set(3,3,-2);g.add(L2);
sign(g,'🪩 الديسكو',0,4.4,-6.5,'rgba(230,73,152,.92)');sign(g,'🎵 العب لعبة الإيقاع',0,2.6,-3.8);interacts.push({x:0,z:-1.6,label:'🎵 العب لعبة الإيقاع (+🪙)',fn:openRhythm});
interacts.push({x:-6,z:2,label:'💃 ارقص على الحلبة',fn:()=>{player.emote('💃');toast('💃 ارقص!',1200);sfx('star')}});sign(g,'💃 ارقص',-6,2.4,3.2);
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('🪩 الديسكو! العب الإيقاع أو ارقص على الحلبة',2800)
}
function discoTick(dt){if(!room||room.type!=='disco')return;dsT+=dt;if(dBall)dBall.rotation.y+=dt*1.5;const b=Math.floor(dsT*2.2);dTiles.forEach((m,i)=>{const on=((i+b)%5===0)||(((i*7+b)%11)===0);m.material.emissiveIntensity=on?1:0.12;m.position.y=on?0.07:0.04})}
function openRhythm(){modal(c=>{const t=today();if(!me.rhd||me.rhd.d!==t)me.rhd={d:t,n:0};c.innerHTML='<h2>🎵 لعبة الإيقاع</h2><div id="rhm" style="text-align:center;margin:4px;min-height:22px">دوس على الزرار لما النوتة توصل الخط. أفضل نتيجة: '+(me.rhBest||0)+'</div><canvas id="rhc" width="280" height="300" style="width:100%;max-width:300px;display:block;margin:0 auto;background:#12122a;border-radius:12px"></canvas><div id="rhb" style="direction:ltr;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0"></div><div class="row"><button class="btn g" id="rgo">ابدأ</button><button class="btn d" id="rx">إغلاق</button></div>';
const cv=$('rhc'),x=cv.getContext('2d'),cols=['#e64980','#15aabf','#fab005','#40c057'],lab=['◀','▼','▲','▶'],keys={ArrowLeft:0,ArrowDown:1,ArrowUp:2,ArrowRight:3,a:0,s:1,w:2,d:3};let notes=[],t0=0,run=false,score=0,combo=0,best=0,hit=0,miss=0,raf=0,alive=true,flash=[0,0,0,0];
const press=i=>{flash[i]=0.15;if(!run)return;const now=(performance.now()-t0)/1000;let bi=-1,bd=9;notes.forEach((n,k)=>{if(!n.done&&n.l===i){const d=Math.abs(n.t-now);if(d<bd){bd=d;bi=k}}});if(bi>=0&&bd<0.24){const n=notes[bi];n.done=1;hit++;combo++;best=Math.max(best,combo);const per=bd<0.1;score+=(per?100:50)+Math.min(combo,20)*5;sfx(per?'star':'tick');$('rhm').textContent=(per?'🌟 ممتاز! ':'👍 كويس ')+'×'+combo}else{combo=0;sfx('err')}};
for(let i=0;i<4;i++){const b=document.createElement('button');b.style.cssText='height:58px;border:0;border-radius:12px;font-size:24px;color:#fff;background:'+cols[i];b.textContent=lab[i];b.onpointerdown=e=>{e.preventDefault();press(i)};$('rhb').appendChild(b)}
const kd=e=>{const k=keys[e.key];if(k!==undefined&&alive){e.preventDefault();press(k)}};window.addEventListener('keydown',kd);
const end=()=>{run=false;cancelAnimationFrame(raf);const acc=notes.length?hit/notes.length:0;me.rhBest=Math.max(me.rhBest||0,score);me.rhPlays=(me.rhPlays||0)+1;const pay=me.rhd.n<4?Math.min(25,Math.round(hit*0.6)):0;if(pay)me.rhd.n++;me.coins+=pay;updCoins();saveMe();sfx('win');const gr=acc>=0.9?'S':acc>=0.75?'A':acc>=0.55?'B':'C';$('rhm').textContent='🏁 النتيجة '+score+' · تقدير '+gr+' · '+hit+'/'+notes.length+' · أطول كومبو '+best+(pay?' · +'+pay+'🪙':' · (وصلت حد النهاردة)');$('rgo').style.display='';$('rgo').textContent='العب تاني'};
const draw=()=>{const now=(performance.now()-t0)/1000;x.fillStyle='#12122a';x.fillRect(0,0,280,300);for(let i=0;i<4;i++){x.fillStyle=i%2?'#1a1a38':'#16162f';x.fillRect(i*70,0,70,300);x.fillStyle=cols[i]+(flash[i]>0?'':'55');x.fillRect(i*70+6,262,58,22);flash[i]=Math.max(0,flash[i]-0.016)}x.fillStyle='#fff';x.fillRect(0,272,280,2);let left=0;for(const n of notes){if(n.done)continue;const y=272-(n.t-now)*190;if(y>-20&&y<320){x.fillStyle=cols[n.l];x.beginPath();x.arc(n.l*70+35,y,17,0,6.3);x.fill();x.fillStyle='#fff';x.font='16px sans-serif';x.textAlign='center';x.fillText(lab[n.l],n.l*70+35,y+6)}if(n.t-now<-0.24&&!n.m){n.m=1;miss++;combo=0}if(!n.m)left++}x.fillStyle='#fff';x.font='bold 15px sans-serif';x.textAlign='left';x.fillText('⭐ '+score,8,20);x.textAlign='right';x.fillText('🔥 ×'+combo,272,20);if(now>notes[notes.length-1].t+0.6){end();return}raf=requestAnimationFrame(draw)};
$('rgo').onclick=()=>{const r=mulberry(Date.now()&0xffff);notes=[];let tt=1.6,pl=1;for(let k=0;k<40;k++){let l=Math.floor(r()*4);if(r()<0.3)l=pl;notes.push({t:tt,l});pl=l;tt+=0.55+(r()<0.35?0:0.2)}score=0;combo=0;best=0;hit=0;miss=0;t0=performance.now();run=true;$('rgo').style.display='none';$('rhm').textContent='يلا!';draw()};
$('rx').onclick=()=>{alive=false;run=false;cancelAnimationFrame(raf);window.removeEventListener('keydown',kd);closeModal()};
window.__rh={press,notes:()=>notes,now:()=>(performance.now()-t0)/1000};
})}
let ghosts=[],hunt=null;
