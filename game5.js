let bpph=null;let mg2h=null;let skbh=null;let mprh=null;
function buildBpp(){
 const g=indoor(0xd6336c,0xfff0f6,0xffc2d9);
 sign(g,'🎈 تحدّي البالونات',0,4.6,-7.6,'rgba(214,51,108,.92)');
 [0xff6b6b,0xffd43b,0x4dabf7,0x69db7c,0xf783ac].forEach((c,i)=>g.add(mesh(G.sph(0.5,10),c,-3.2+i*1.6,2.2+(i%2)*0.5,-5),mesh(G.cyl(0.02,0.02,1.4,4),0xadb5bd,-3.2+i*1.6,1.2,-5)));
 g.add(mesh(G.box(0.3,2,0.3),0xd6336c,-5,1,-2),mesh(G.box(0.3,2,0.3),0xd6336c,5,1,-2));
 bpph={it:{x:0,z:0.2,label:'🎈 فرقع البالونات',fn:bppStart}};interacts.push(bpph.it);
 g.add(portalMesh('ارجع لردّ الفعل',5.8,5.8,0xc92a2a,'rttroom'),portalMesh('جولف مصغّر 2',-5.8,5.8,0x2f9e44,'mg2room'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎈 فرقع البالونات في 30 ثانية. الدهبي = 3، والقنبلة ⚫ بتخصم!',3400)
}
function bppStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?140:250,DUR=30;
 let bl=[],score=0,left=DUR,over=false,tm=0,sp=0,t00=0,flash=0,last='',pops=0;
 const COL=['#ff6b6b','#4dabf7','#69db7c','#f783ac','#b197fc'];
 const mk=()=>{const r=Math.random(),k=r<.14?2:r<.30?1:0;return{x:24+Math.random()*(W-48),y:CH+24,v:45+Math.random()*40+(DUR-left)*2.2,k,c:COL[Math.floor(Math.random()*5)],r:k===2?15:19}};
 let hit=()=>{};
 window.bppq=()=>({bl:bl.map(b=>({x:b.x,y:b.y,k:b.k})),score,left:Math.ceil(left),over,coins:me.coins,W,CH,hit:(x,y)=>hit(x,y)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎈 تحدّي البالونات</h2>')+'<div id="bpS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="bpC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="bpM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="bpN" style="width:auto!important;display:inline-block!important">🔁 جولة جديدة</button><button class="btn d" id="bpX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('bpC'),x=cv.getContext('2d');
  const info=()=>{if($('bpS'))$('bpS').textContent='⭐ '+score+' · ⏱ '+Math.ceil(left)+(over?' · انتهت':'');if($('bpM'))$('bpM').textContent=last};
  const open=()=>$('bpC')&&$('modal').style.display!=='none';
  const reset=()=>{bl=[];score=0;left=DUR;over=false;sp=0;flash=0;last='';pops=0;tm=performance.now()};
  const finish=()=>{over=true;me.bppGames=(me.bppGames||0)+1;me.bppBest=Math.max(me.bppBest||0,score);const d=today();if(me.bppDD!==d){me.bppDD=d;me.bppDC=0}
   let c=score>=40?3:score>=30?2:score>=20?1:0;c=Math.min(c,Math.max(0,6-(me.bppDC||0)));if(c){me.coins+=c;me.bppDC=(me.bppDC||0)+c;updCoins();sfx('win')}else sfx('tick');
   last='🏁 النتيجة '+score+(c?' · +'+c+'🪙':' · محتاج 20+ للجايزة');saveMe()};
  hit=(px,py)=>{if(over)return;for(let i=bl.length-1;i>=0;i--){const b=bl[i];if(Math.hypot(b.x-px,b.y-py)<b.r+8){bl.splice(i,1);pops++;if(b.k===1){score=Math.max(0,score-3);flash=.3;sfx('err');last='⚫ قنبلة! -3'}else{score+=b.k===2?3:1;sfx(b.k===2?'star':'place');last=b.k===2?'✨ دهبي +3':''}info();return}}};
  const loop=ts=>{if(!open())return;const dt=Math.min(.05,(ts-tm)/1000);tm=ts;
   if(!over){left-=dt;sp-=dt;if(sp<=0){bl.push(mk());sp=Math.max(.28,.75-(DUR-left)*.014)}bl.forEach(b=>b.y-=b.v*dt);bl=bl.filter(b=>b.y>-30);flash=Math.max(0,flash-dt);if(left<=0){left=0;finish()}}
   x.fillStyle=flash>0?'#ffa8a8':'#c5f6fa';x.fillRect(0,0,W,CH);
   bl.forEach(b=>{x.strokeStyle='#868e96';x.lineWidth=1;x.beginPath();x.moveTo(b.x,b.y+b.r);x.lineTo(b.x+Math.sin(b.y/20)*4,b.y+b.r+18);x.stroke();x.fillStyle=b.k===1?'#212529':b.k===2?'#fcc419':b.c;x.beginPath();x.ellipse(b.x,b.y,b.r*.85,b.r,0,0,7);x.fill();x.fillStyle='rgba(255,255,255,.4)';x.beginPath();x.ellipse(b.x-b.r*.3,b.y-b.r*.4,b.r*.2,b.r*.3,0,0,7);x.fill();if(b.k===1){x.fillStyle='#e03131';x.fillRect(b.x-2,b.y-b.r-5,4,6)}});
   info();requestAnimationFrame(loop)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect();hit((e.clientX-r.left)*W/r.width,(e.clientY-r.top)*CH/r.height)};
  $('bpN').onclick=reset;$('bpX').onclick=()=>{$('modal').style.display='none'};
  tm=performance.now();info();requestAnimationFrame(loop)})}

function buildMg2(){
 const g=indoor(0x2f9e44,0xebfbee,0xb2f2bb);
 sign(g,'⛳ جولف مصغّر 2',0,4.6,-7.6,'rgba(47,158,68,.92)');
 g.add(mesh(G.cyl(2.2,2.2,0.12,16),0x51cf66,0,0.06,-4.5),mesh(G.cyl(0.25,0.25,0.14,10),0x212529,1,0.1,-4.5),mesh(G.cyl(0.03,0.03,1.6,4),0xf8f9fa,1,0.9,-4.5),mesh(G.box(0.5,0.3,0.03),0xe03131,1.25,1.5,-4.5),mesh(G.sph(0.15,8),0xffffff,-1.2,0.2,-4.2));
 g.add(mesh(G.box(0.3,2,0.3),0x2f9e44,-5,1,-2),mesh(G.box(0.3,2,0.3),0x2f9e44,5,1,-2));
 mg2h={it:{x:0,z:0.2,label:'⛳ العب جولف',fn:mg2Start}};interacts.push(mg2h.it);
 g.add(portalMesh('ارجع للبالونات',5.8,5.8,0xd6336c,'bpproom'));
 g.add(portalMesh('برج السحاب',-5.8,5.8,0x4263eb,'skbroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('⛳ 3 حفر. اسحب لورا من الكورة وسيّب. أقل ضربات أحسن',3400)
}
function mg2Start(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?150:250,K=1.6,BR=7,HR=11;
 const LV=[{s:[.15,.5],h:[.85,.5],w:[],par:2},{s:[.12,.3],h:[.88,.3],w:[[.48,0,.04,.68]],par:3},{s:[.1,.5],h:[.9,.5],w:[[.35,.3,.04,.7],[.65,0,.04,.7]],par:4}];
 let li=0,bx=0,by=0,vx=0,vy=0,strokes=0,total=0,moving=false,drag=null,msg='',over=false,sunk=false;
 const px=l=>[l[0]*W,l[1]*CH];
 const load=i=>{li=i;const s=px(LV[i].s);bx=s[0];by=s[1];vx=vy=0;strokes=0;moving=false;sunk=false};
 load(0);
 let shoot=()=>{};
 window.mg2q=()=>({li,bx,by,strokes,total,moving,over,sunk,W,CH,K,hole:px(LV[li].h),walls:LV[li].w.map(w=>[w[0]*W,w[1]*CH,w[2]*W,w[3]*CH]),coins:me.coins,shoot:(a,v)=>shoot(a,v)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">⛳ جولف مصغّر 2</h2>')+'<div id="mgS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="mgC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="mgM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="mgN" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="mgX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('mgC'),x=cv.getContext('2d');
  const open=()=>$('mgC')&&$('modal').style.display!=='none';
  const info=()=>{if($('mgS'))$('mgS').textContent='حفرة '+(li+1)+'/3 · الضربات '+strokes+' (المطلوب '+LV[li].par+') · المجموع '+total;if($('mgM'))$('mgM').textContent=msg};
  const finish=()=>{over=true;me.mg2Games=(me.mg2Games||0)+1;const par=LV.reduce((a,l)=>a+l.par,0);me.mg2Best=me.mg2Best?Math.min(me.mg2Best,total):total;
   const d=today();if(me.mg2DD!==d){me.mg2DD=d;me.mg2DC=0}let c=total<=par?3:total<=par+2?2:total<=par+5?1:0;c=Math.min(c,Math.max(0,6-(me.mg2DC||0)));
   if(c){me.coins+=c;me.mg2DC=(me.mg2DC||0)+c;updCoins();sfx('win')}msg='🏁 خلصت 3 حفر بـ'+total+' ضربة (المطلوب '+par+')'+(c?' · +'+c+'🪙':' · جرّب أقل من '+(par+6)+' للجايزة');saveMe();info()};
  shoot=(a,v)=>{if(moving||over||sunk)return;v=Math.min(v,420);vx=Math.cos(a)*v;vy=Math.sin(a)*v;moving=true;strokes++;total++;msg='';sfx('place');info()};
  const step=dt=>{const L=LV[li],ws=L.w.map(w=>[w[0]*W,w[1]*CH,w[2]*W,w[3]*CH]),h=px(L.h);
   const f=Math.exp(-K*dt);vx*=f;vy*=f;bx+=vx*dt;by+=vy*dt;
   if(bx<BR){bx=BR;vx=-vx}if(bx>W-BR){bx=W-BR;vx=-vx}if(by<BR){by=BR;vy=-vy}if(by>CH-BR){by=CH-BR;vy=-vy}
   for(const w of ws){const cx=Math.max(w[0],Math.min(bx,w[0]+w[2])),cy=Math.max(w[1],Math.min(by,w[1]+w[3]));const dx=bx-cx,dy=by-cy;if(dx*dx+dy*dy<BR*BR){if(Math.abs(dx)>Math.abs(dy)){vx=-vx;bx=dx>=0?w[0]+w[2]+BR:w[0]-BR}else{vy=-vy;by=dy>=0?w[1]+w[3]+BR:w[1]-BR}sfx('tick')}}
   const sp=Math.hypot(vx,vy);
   if(Math.hypot(bx-h[0],by-h[1])<HR&&sp<260){sunk=true;moving=false;vx=vy=0;bx=h[0];by=h[1];sfx('star');msg='🎉 دخلت في '+strokes+(strokes<=L.par?' (ممتاز)':'');info();setTimeout(()=>{if(li<2){load(li+1);msg='';info()}else finish()},900);return}
   if(sp<8){vx=vy=0;moving=false}};
  let tm=performance.now();
  const loop=ts=>{if(!open())return;const dt=Math.min(.03,(ts-tm)/1000);tm=ts;if(moving)step(dt);
   x.fillStyle='#8ce99a';x.fillRect(0,0,W,CH);const L=LV[li],h=px(L.h);x.fillStyle='#212529';x.beginPath();x.arc(h[0],h[1],HR,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.moveTo(h[0],h[1]);x.lineTo(h[0],h[1]-22);x.stroke();x.fillStyle='#e03131';x.fillRect(h[0],h[1]-22,12,7);
   x.fillStyle='#8d5524';L.w.forEach(w=>x.fillRect(w[0]*W,w[1]*CH,w[2]*W,w[3]*CH));
   if(drag&&!moving&&!sunk){x.strokeStyle='rgba(0,0,0,.5)';x.lineWidth=3;x.setLineDash([6,5]);x.beginPath();x.moveTo(bx,by);x.lineTo(bx+(bx-drag[0])*1.6,by+(by-drag[1])*1.6);x.stroke();x.setLineDash([])}
   if(!sunk){x.fillStyle='#fff';x.beginPath();x.arc(bx,by,BR,0,7);x.fill();x.strokeStyle='#adb5bd';x.lineWidth=1;x.stroke()}
   info();requestAnimationFrame(loop)};
  const pos=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*W/r.width,(e.clientY-r.top)*CH/r.height]};
  cv.onpointerdown=e=>{e.preventDefault();if(!moving&&!over&&!sunk){drag=pos(e);cv.setPointerCapture&&cv.setPointerCapture(e.pointerId)}};
  cv.onpointermove=e=>{if(drag)drag=pos(e)};
  cv.onpointerup=e=>{if(!drag)return;const d=pos(e),dx=bx-d[0],dy=by-d[1],len=Math.hypot(dx,dy);drag=null;if(len>8)shoot(Math.atan2(dy,dx),len*5)};
  $('mgN').onclick=()=>{total=0;over=false;msg='';load(0);info()};$('mgX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildSkb(){
 const g=indoor(0x4263eb,0xedf2ff,0xbac8ff);
 sign(g,'🏗️ برج السحاب',0,4.6,-7.6,'rgba(66,99,235,.92)');
 [0,1,2,3,4].forEach(i=>g.add(mesh(G.box(2.4-i*0.4,0.5,1.4),[0x4263eb,0x5c7cfa,0x748ffc,0x91a7ff,0xbac8ff][i],0,0.25+i*0.5,-4.5)));
 g.add(mesh(G.box(0.3,2,0.3),0x4263eb,-5,1,-2),mesh(G.box(0.3,2,0.3),0x4263eb,5,1,-2));
 skbh={it:{x:0,z:0.2,label:'🏗️ ابني البرج',fn:skbStart}};interacts.push(skbh.it);
 g.add(portalMesh('ارجع للجولف',5.8,5.8,0x2f9e44,'mg2room'));
 g.add(portalMesh('لعبة الذاكرة',-5.8,5.8,0x7048e8,'mprroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏗️ دوس في اللحظة المظبوطة عشان الطبقة تنزل فوق اللي تحتها',3400)
}
function skbStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?150:250,BH=14;
 let L=[{x:W/2-60,w:120}],n=0,bx=0,bw=120,dir=1,over=false,perf=0,msg='',coinsGot=0;
 const spd=()=>Math.min(260,90+n*5);
 window.skbq=()=>({n,bx,bw,top:L[L.length-1],over,W,perf,coins:me.coins,drop:()=>drop(),align:()=>{bx=L[L.length-1].x}});
 let drop=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏗️ برج السحاب</h2>')+'<div id="skS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="skC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="skM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="skN" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="skX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('skC'),x=cv.getContext('2d');
  const open=()=>$('skC')&&$('modal').style.display!=='none';
  const info=()=>{if($('skS'))$('skS').textContent='الطبقات '+n+' · ممتاز '+perf+' · أحسن '+(me.skbBest||0);if($('skM'))$('skM').textContent=msg};
  const reset=()=>{L=[{x:W/2-60,w:120}];n=0;bw=120;bx=0;dir=1;over=false;perf=0;msg='';coinsGot=0};
  const finish=()=>{over=true;me.skbGames=(me.skbGames||0)+1;me.skbBest=Math.max(me.skbBest||0,n);const d=today();if(me.skbDD!==d){me.skbDD=d;me.skbDC=0}
   let c=n>=25?3:n>=18?2:n>=10?1:0;c=Math.min(c,Math.max(0,6-(me.skbDC||0)));
   if(c){me.coins+=c;me.skbDC=(me.skbDC||0)+c;updCoins();sfx('win')}else sfx('err');
   msg='💥 البرج وقع عند '+n+' طبقة'+(c?' · +'+c+'🪙':' · وصّل 10 طبقات للجايزة');saveMe();info()};
  drop=()=>{if(over)return;const t=L[L.length-1];let l=Math.max(bx,t.x),r=Math.min(bx+bw,t.x+t.w);
   if(r-l<=1){finish();return}
   if(Math.abs(bx-t.x)<4){l=t.x;r=t.x+t.w;perf++;msg='✨ ممتاز';sfx('star')}else{msg='';sfx('place')}
   L.push({x:l,w:r-l});n++;bw=r-l;bx=n%2?0:W-bw;dir=n%2?1:-1;info()};
  let tm=performance.now();
  const loop=ts=>{if(!open())return;const dt=Math.min(.03,(ts-tm)/1000);tm=ts;
   if(!over){bx+=dir*spd()*dt;if(bx<0){bx=0;dir=1}if(bx+bw>W){bx=W-bw;dir=-1}}
   x.fillStyle='#dbe4ff';x.fillRect(0,0,W,CH);
   const oy=Math.max(0,(L.length+1)*BH-(CH-30));
   L.forEach((b,i)=>{x.fillStyle='hsl('+(220+i*9)%360+',70%,'+(55+(i%2)*6)+'%)';x.fillRect(b.x,CH-(i+1)*BH+oy,b.w,BH-1)});
   if(!over){x.fillStyle='#e8590c';x.fillRect(bx,CH-(L.length+1)*BH+oy,bw,BH-1)}
   info();requestAnimationFrame(loop)};
  bx=0;
  cv.onpointerdown=e=>{e.preventDefault();drop()};
  $('skN').onclick=()=>{reset();info()};$('skX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildMpr(){
 const g=indoor(0x7048e8,0xf3f0ff,0xd0bfff);
 sign(g,'🃏 لعبة الذاكرة',0,4.6,-7.6,'rgba(112,72,232,.92)');
 [0,1,2,3].forEach(i=>g.add(mesh(G.box(0.9,0.06,1.2),[0x7048e8,0xf03e3e,0xfab005,0x37b24d][i],-1.6+i*1.1,0.5,-4.5)));
 g.add(mesh(G.box(4.8,0.4,1.6),0x5f3dc4,0,0.2,-4.5));
 g.add(mesh(G.box(0.3,2,0.3),0x7048e8,-5,1,-2),mesh(G.box(0.3,2,0.3),0x7048e8,5,1,-2));
 mprh={it:{x:0,z:0.2,label:'🃏 العب الذاكرة',fn:mprStart}};interacts.push(mprh.it);
 g.add(portalMesh('ارجع للبرج',5.8,5.8,0x4263eb,'skbroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🃏 اقلب كارتين متشابهين. أقل حركات أحسن',3400)
}
function mprStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?150:250,C=4,R=4,cw=W/C,ch=CH/R;
 const cols=['#e03131','#1c7ed6'],face=[];
 for(let i=0;i<8;i++)face.push(i,i);
 for(let i=15;i>0;i--){const j=Math.floor(Math.random()*(i+1));[face[i],face[j]]=[face[j],face[i]]}
 let up=new Array(16).fill(false),done=new Array(16).fill(false),sel=[],moves=0,lock=false,over=false,msg='';
 window.mprq=()=>({face:face.slice(),up:up.slice(),done:done.slice(),moves,over,lock,W,CH,coins:me.coins,flip:i=>flip(i)});
 let flip=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🃏 لعبة الذاكرة</h2>')+'<div id="mpS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="mpC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="mpM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="mpN" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="mpX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('mpC'),x=cv.getContext('2d');
  const open=()=>$('mpC')&&$('modal').style.display!=='none';
  const info=()=>{if($('mpS'))$('mpS').textContent='الحركات '+moves+' · أحسن '+(me.mprBest||'-');if($('mpM'))$('mpM').textContent=msg};
  const finish=()=>{over=true;me.mprGames=(me.mprGames||0)+1;me.mprBest=me.mprBest?Math.min(me.mprBest,moves):moves;const d=today();if(me.mprDD!==d){me.mprDD=d;me.mprDC=0}
   let c=moves<=12?3:moves<=16?2:moves<=22?1:0;c=Math.min(c,Math.max(0,6-(me.mprDC||0)));
   if(c){me.coins+=c;me.mprDC=(me.mprDC||0)+c;updCoins();sfx('win')}
   msg='🏁 خلصت في '+moves+' حركة'+(c?' · +'+c+'🪙':' · جرّب أقل من 23 للجايزة');saveMe();info()};
  flip=i=>{if(lock||over||up[i]||done[i])return;up[i]=true;sel.push(i);sfx('tick');
   if(sel.length===2){moves++;const[a,b]=sel;sel=[];
    if(face[a]===face[b]){done[a]=done[b]=true;sfx('star');msg='';if(done.every(v=>v))setTimeout(finish,500)}
    else{lock=true;msg='مش متشابهين';setTimeout(()=>{up[a]=up[b]=false;lock=false;msg='';info()},700)}}
   info()};
  const shape=(k,cx,cy,r)=>{x.beginPath();if(k===0)x.arc(cx,cy,r,0,7);else if(k===1)x.rect(cx-r,cy-r,2*r,2*r);else if(k===2){x.moveTo(cx,cy-r);x.lineTo(cx+r,cy+r);x.lineTo(cx-r,cy+r);x.closePath()}else{x.moveTo(cx,cy-r);x.lineTo(cx+r,cy);x.lineTo(cx,cy+r);x.lineTo(cx-r,cy);x.closePath()}x.fill()};
  const loop=()=>{if(!open())return;x.fillStyle='#e5dbff';x.fillRect(0,0,W,CH);
   for(let i=0;i<16;i++){const cx=(i%C)*cw,cy=Math.floor(i/C)*ch,vis=up[i]||done[i];
    x.fillStyle=done[i]?'#b2f2bb':vis?'#fff':'#7048e8';x.fillRect(cx+3,cy+3,cw-6,ch-6);
    if(vis){const f=face[i];x.fillStyle=cols[f>>2&1];shape(f&3,cx+cw/2,cy+ch/2,Math.min(cw,ch)*0.28)}}
   info();requestAnimationFrame(loop)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*W/r.width,py=(e.clientY-r.top)*CH/r.height;flip(Math.floor(py/ch)*C+Math.floor(px/cw))};
  $('mpN').onclick=()=>{if(lock)return;for(let i=15;i>0;i--){const j=Math.floor(Math.random()*(i+1));[face[i],face[j]]=[face[j],face[i]]}up.fill(false);done.fill(false);sel=[];moves=0;over=false;msg='';info()};
  $('mpX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
