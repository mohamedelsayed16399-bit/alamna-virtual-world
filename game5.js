let bpph=null;let mg2h=null;let skbh=null;let mprh=null;let dtbh=null;let tfeh=null;let bxrh=null;let slph=null;let stph=null;let ldgh=null;let wsch=null;let pnkh=null;
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
 g.add(portalMesh('تحدّي السهام',-5.8,5.8,0xe03131,'dtbroom'));
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
function buildDtb(){
 const g=indoor(0xe03131,0xfff5f5,0xffc9c9);
 sign(g,'🎯 تحدّي السهام',0,4.6,-7.6,'rgba(224,49,49,.92)');
 [[1.6,0xf8f9fa],[1.2,0xe03131],[0.8,0xf8f9fa],[0.4,0xe03131]].forEach((a,i)=>g.add(mesh(G.cyl(a[0],a[0],0.1+i*0.02,20),a[1],0,2.4,-6.8)));
 g.add(mesh(G.box(0.3,2,0.3),0xe03131,-5,1,-2),mesh(G.box(0.3,2,0.3),0xe03131,5,1,-2));
 dtbh={it:{x:0,z:0.2,label:'🎯 ارمي السهام',fn:dtbStart}};interacts.push(dtbh.it);
 g.add(portalMesh('ارجع للذاكرة',5.8,5.8,0x7048e8,'mprroom'));
 g.add(portalMesh('لعبة 2048',-5.8,5.8,0xf08c00,'tferoom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎯 5 رميات. دوس لما المؤشر يعدّي على النص',3400)
}
function dtbStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?150:250,R=Math.min(W,CH)/2-6,A=W/2-14,B=CH/2-14;
 let t=0,n=0,total=0,over=false,msg='',marks=[];
 const pos=()=>[W/2+A*Math.sin(t*2.1),CH/2+B*Math.sin(t*3.3+1.2*0)];
 window.dtbq=()=>({n,total,over,W,CH,R,coins:me.coins,aim:()=>{t=0},throw:()=>thr(),pos:pos()});
 let thr=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎯 تحدّي السهام</h2>')+'<div id="dtS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="dtC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="dtM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="dtN" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="dtX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('dtC'),x=cv.getContext('2d');
  const open=()=>$('dtC')&&$('modal').style.display!=='none';
  const info=()=>{if($('dtS'))$('dtS').textContent='رمية '+Math.min(n+1,5)+'/5 · المجموع '+total+' · أحسن '+(me.dtbBest||0);if($('dtM'))$('dtM').textContent=msg};
  const finish=()=>{over=true;me.dtbGames=(me.dtbGames||0)+1;me.dtbBest=Math.max(me.dtbBest||0,total);const d=today();if(me.dtbDD!==d){me.dtbDD=d;me.dtbDC=0}
   let c=total>=45?3:total>=38?2:total>=30?1:0;c=Math.min(c,Math.max(0,6-(me.dtbDC||0)));
   if(c){me.coins+=c;me.dtbDC=(me.dtbDC||0)+c;updCoins();sfx('win')}
   msg='🏁 المجموع '+total+'/50'+(c?' · +'+c+'🪙':' · وصّل 30 للجايزة');saveMe();info()};
  thr=()=>{if(over)return;const p=pos(),d=Math.hypot(p[0]-W/2,p[1]-CH/2);const s=Math.max(0,10-Math.floor(d/(R/10)));marks.push(p);n++;total+=s;msg=s?'+'+s+(s>=9?' 🎯':''):'ضاعت';sfx(s?'place':'err');if(n>=5)setTimeout(finish,300);info()};
  let tm=performance.now();
  const loop=ts=>{if(!open())return;const dt=Math.min(.03,(ts-tm)/1000);tm=ts;if(!over)t+=dt;
   x.fillStyle='#fff5f5';x.fillRect(0,0,W,CH);
   [[1,'#f8f9fa'],[.8,'#e03131'],[.6,'#f8f9fa'],[.4,'#e03131'],[.2,'#212529']].forEach(a=>{x.fillStyle=a[1];x.beginPath();x.arc(W/2,CH/2,R*a[0],0,7);x.fill()});
   x.strokeStyle='#868e96';x.lineWidth=1;x.beginPath();x.arc(W/2,CH/2,R,0,7);x.stroke();
   x.fillStyle='#1c7ed6';marks.forEach(m=>{x.beginPath();x.arc(m[0],m[1],4,0,7);x.fill()});
   if(!over){const p=pos();x.strokeStyle='#e8590c';x.lineWidth=2;x.beginPath();x.arc(p[0],p[1],9,0,7);x.moveTo(p[0]-14,p[1]);x.lineTo(p[0]+14,p[1]);x.moveTo(p[0],p[1]-14);x.lineTo(p[0],p[1]+14);x.stroke()}
   info();requestAnimationFrame(loop)};
  cv.onpointerdown=e=>{e.preventDefault();thr()};
  $('dtN').onclick=()=>{n=0;total=0;over=false;msg='';marks=[];t=0;info()};
  $('dtX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildTfe(){
 const g=indoor(0xf08c00,0xfff9db,0xffec99);
 sign(g,'🔢 لعبة 2048',0,4.6,-7.6,'rgba(240,140,0,.92)');
 [0,1,2,3].forEach(i=>g.add(mesh(G.box(0.9,0.5+i*0.3,0.9),[0xffe066,0xffc078,0xff922b,0xf76707][i],-1.8+i*1.2,0.25+i*0.15,-4.5)));
 g.add(mesh(G.box(0.3,2,0.3),0xf08c00,-5,1,-2),mesh(G.box(0.3,2,0.3),0xf08c00,5,1,-2));
 tfeh={it:{x:0,z:0.2,label:'🔢 العب 2048',fn:tfeStart}};interacts.push(tfeh.it);
 g.add(portalMesh('ارجع للسهام',5.8,5.8,0xe03131,'dtbroom'));
 g.add(portalMesh('كسّارة الطوب',-5.8,5.8,0x1098ad,'bxrroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔢 اسحب أو استخدم الأسهم. ادمج الأرقام المتشابهة وصل لـ128',3400)
}
function tfeStart(){
 const H=innerHeight<420,S=H?140:Math.min(innerWidth-50,300),cs=S/4;
 let gr=new Array(16).fill(0),score=0,over=false,msg='',paid=0,sx=0,sy=0;
 const add=()=>{const e=[];gr.forEach((v,i)=>{if(!v)e.push(i)});if(e.length)gr[e[Math.floor(Math.random()*e.length)]]=Math.random()<.9?2:4};
 add();add();
 const slide=a=>{const t=a.filter(v=>v);let sc=0;for(let i=0;i<t.length-1;i++)if(t[i]===t[i+1]){t[i]*=2;sc+=t[i];t.splice(i+1,1)}while(t.length<4)t.push(0);return[t,sc]};
 const idx=(d,l,k)=>d===0?l*4+k:d===1?l*4+3-k:d===2?k*4+l:(3-k)*4+l;
 const canMove=()=>{for(let d=0;d<4;d++)for(let l=0;l<4;l++){const a=[0,1,2,3].map(k=>gr[idx(d,l,k)]);const[r]=slide(a);if(r.some((v,i)=>v!==a[i]))return true}return false};
 let move=()=>false;
 window.tfeq=()=>({gr:gr.slice(),score,over,paid,coins:me.coins,move:d=>move(d),set:a=>{gr=a.slice();over=false}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🔢 لعبة 2048</h2>')+'<div id="tfS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="tfC" width="'+S+'" height="'+S+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="tfM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center;direction:ltr"><button class="btn" id="tfL" style="width:auto!important;display:inline-block!important">◀</button><button class="btn" id="tfU" style="width:auto!important;display:inline-block!important">▲</button><button class="btn" id="tfD" style="width:auto!important;display:inline-block!important">▼</button><button class="btn" id="tfR" style="width:auto!important;display:inline-block!important">▶</button><button class="btn" id="tfN" style="width:auto!important;display:inline-block!important">🔁</button><button class="btn d" id="tfX" style="width:auto!important;display:inline-block!important">✖</button></div>';
  const cv=$('tfC'),x=cv.getContext('2d');
  const open=()=>$('tfC')&&$('modal').style.display!=='none';
  const info=()=>{if($('tfS'))$('tfS').textContent='النقاط '+score+' · أعلى رقم '+Math.max(...gr)+' · أحسن '+(me.tfeBest||0);if($('tfM'))$('tfM').textContent=msg};
  const pay=()=>{const m=Math.max(...gr),lv=m>=512?3:m>=256?2:m>=128?1:0;if(lv>paid){let c=lv-paid;paid=lv;const d=today();if(me.tfeDD!==d){me.tfeDD=d;me.tfeDC=0}c=Math.min(c,Math.max(0,6-(me.tfeDC||0)));if(c){me.coins+=c;me.tfeDC=(me.tfeDC||0)+c;updCoins();sfx('win');msg='🎉 وصلت '+m+' · +'+c+'🪙'}}};
  move=d=>{if(over)return false;let ch=false;for(let l=0;l<4;l++){const a=[0,1,2,3].map(k=>gr[idx(d,l,k)]);const[r,sc]=slide(a);r.forEach((v,k)=>{if(v!==a[k])ch=true;gr[idx(d,l,k)]=v});score+=sc}
   if(ch){add();sfx('tick');msg='';pay();me.tfeBest=Math.max(me.tfeBest||0,score);if(!canMove()){over=true;me.tfeGames=(me.tfeGames||0)+1;msg+=' 💥 خلصت الحركات';sfx('err')}saveMe()}info();return ch};
  const col=v=>({2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850'}[v]||'#3c3a32');
  const loop=()=>{if(!open())return;x.fillStyle='#bbada0';x.fillRect(0,0,S,S);x.textAlign='center';x.textBaseline='middle';
   gr.forEach((v,i)=>{const px=(i%4)*cs,py=Math.floor(i/4)*cs;x.fillStyle=v?col(v):'#cdc1b4';x.fillRect(px+3,py+3,cs-6,cs-6);if(v){x.fillStyle=v<=4?'#776e65':'#fff';x.font='bold '+(v>=1000?cs*.28:v>=100?cs*.34:cs*.42)+'px sans-serif';x.fillText(v,px+cs/2,py+cs/2)}});
   info();requestAnimationFrame(loop)};
  cv.onpointerdown=e=>{e.preventDefault();sx=e.clientX;sy=e.clientY};
  cv.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;if(Math.abs(dx)>Math.abs(dy))move(dx<0?0:1);else move(dy<0?2:3)};
  $('tfL').onclick=()=>move(0);$('tfR').onclick=()=>move(1);$('tfU').onclick=()=>move(2);$('tfD').onclick=()=>move(3);
  $('tfN').onclick=()=>{gr=new Array(16).fill(0);score=0;over=false;msg='';paid=0;add();add();info()};
  $('tfX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildBxr(){
 const g=indoor(0x1098ad,0xe3fafc,0x99e9f2);
 sign(g,'🧱 كسّارة الطوب',0,4.6,-7.6,'rgba(16,152,173,.92)');
 for(let r=0;r<3;r++)for(let c=0;c<5;c++)g.add(mesh(G.box(0.8,0.4,0.5),[0xff6b6b,0xffa94d,0xffd43b][r],-1.8+c*0.9,2.6+r*0.45,-6.8));
 g.add(mesh(G.box(1.6,0.2,0.5),0x1098ad,0,0.4,-4.5),mesh(G.sph(0.2,8),0xffffff,0.4,0.9,-4.5));
 g.add(mesh(G.box(0.3,2,0.3),0x1098ad,-5,1,-2),mesh(G.box(0.3,2,0.3),0x1098ad,5,1,-2));
 bxrh={it:{x:0,z:0.2,label:'🧱 العب كسّارة الطوب',fn:bxrStart}};interacts.push(bxrh.it);
 g.add(portalMesh('ارجع لـ2048',5.8,5.8,0xf08c00,'tferoom'));
 g.add(portalMesh('لغز الأرقام',-5.8,5.8,0x37b24d,'slproom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧱 حرّك اللوح بصباعك واكسر كل الطوب. عندك 3 محاولات',3400)
}
function bxrStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?150:250,C=6,RW=3,bw=W/C,bh=H?11:16,PW=58,PY=CH-12,BR=5,SP=210;
 let br=[],px=W/2,bx=W/2,by=PY-BR-3,vx=0,vy=0,go=false,lives=3,over=false,won=false,msg='',tsc=1,paid=false;
 const fill=()=>{br=[];for(let r=0;r<RW;r++)for(let c=0;c<C;c++)br.push({x:c*bw,y:8+r*bh,a:true,r})};
 fill();
 const alive=()=>br.filter(b=>b.a).length;
 const reset=()=>{go=false;vx=vy=0;bx=px;by=PY-BR-3};
 let launch=()=>{};
 window.bxrq=()=>({left:alive(),lives,over,won,bx,by,px,go,W,CH,coins:me.coins,setP:v=>{px=Math.max(PW/2,Math.min(W-PW/2,v));if(!go)bx=px},launch:()=>launch(),fast:k=>{tsc=k}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🧱 كسّارة الطوب</h2>')+'<div id="bxS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="bxC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="bxM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="bxN" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="bxX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('bxC'),x=cv.getContext('2d');
  const open=()=>$('bxC')&&$('modal').style.display!=='none';
  const info=()=>{if($('bxS'))$('bxS').textContent='الطوب '+alive()+'/'+(C*RW)+' · محاولات '+lives+' · أحسن '+(me.bxrBest||0);if($('bxM'))$('bxM').textContent=msg};
  const finish=()=>{over=true;const k=C*RW-alive();me.bxrGames=(me.bxrGames||0)+1;me.bxrBest=Math.max(me.bxrBest||0,k);const d=today();if(me.bxrDD!==d){me.bxrDD=d;me.bxrDC=0}
   let c=k>=18?3:k>=12?2:k>=6?1:0;c=Math.min(c,Math.max(0,6-(me.bxrDC||0)));
   if(c){me.coins+=c;me.bxrDC=(me.bxrDC||0)+c;updCoins();sfx('win')}else sfx('err');
   msg=(won?'🏆 كسرت كل الطوب':'💥 خلصت المحاولات')+' · كسرت '+k+(c?' · +'+c+'🪙':' · اكسر 6 على الأقل للجايزة');saveMe();info()};
  launch=()=>{if(go||over)return;go=true;const a=-Math.PI/2+(Math.random()-.5)*.6;vx=Math.cos(a)*SP;vy=Math.sin(a)*SP;sfx('tick')};
  const step=dt=>{bx+=vx*dt;by+=vy*dt;
   if(bx<BR){bx=BR;vx=Math.abs(vx)}if(bx>W-BR){bx=W-BR;vx=-Math.abs(vx)}if(by<BR){by=BR;vy=Math.abs(vy)}
   if(vy>0&&by+BR>=PY&&by-BR<=PY+8&&Math.abs(bx-px)<=PW/2+BR){const o=(bx-px)/(PW/2),a=-Math.PI/2+o*1.0;vx=Math.cos(a)*SP;vy=Math.sin(a)*SP;by=PY-BR;sfx('place')}
   for(const b of br){if(!b.a)continue;if(bx+BR>b.x&&bx-BR<b.x+bw&&by+BR>b.y&&by-BR<b.y+bh){b.a=false;const ox=Math.min(bx+BR-b.x,b.x+bw-(bx-BR)),oy=Math.min(by+BR-b.y,b.y+bh-(by-BR));if(ox<oy)vx=-vx;else vy=-vy;sfx('star');if(!alive()){won=true;finish()}break}}
   if(by>CH+BR){lives--;if(lives<=0)finish();else{reset();msg='محاولة تانية'}}};
  let tm=performance.now();
  const loop=ts=>{if(!open())return;let dt=Math.min(.05,(ts-tm)/1000)*tsc;tm=ts;if(go&&!over){while(dt>0){const s=Math.min(dt,.008);step(s);dt-=s;if(over)break}}
   x.fillStyle='#e3fafc';x.fillRect(0,0,W,CH);
   br.forEach(b=>{if(b.a){x.fillStyle=['#ff6b6b','#ffa94d','#ffd43b'][b.r];x.fillRect(b.x+1,b.y+1,bw-2,bh-2)}});
   x.fillStyle='#1098ad';x.fillRect(px-PW/2,PY,PW,7);
   x.fillStyle='#212529';x.beginPath();x.arc(bx,by,BR,0,7);x.fill();
   info();requestAnimationFrame(loop)};
  const mv=e=>{const r=cv.getBoundingClientRect();px=Math.max(PW/2,Math.min(W-PW/2,(e.clientX-r.left)*W/r.width));if(!go)bx=px};
  cv.onpointerdown=e=>{e.preventDefault();mv(e);launch()};cv.onpointermove=mv;
  $('bxN').onclick=()=>{fill();lives=3;over=false;won=false;msg='';px=W/2;reset();info()};
  $('bxX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildSlp(){
 const g=indoor(0x37b24d,0xebfbee,0xb2f2bb);
 sign(g,'🧩 لغز الأرقام',0,4.6,-7.6,'rgba(55,178,77,.92)');
 for(let i=0;i<8;i++)g.add(mesh(G.box(0.7,0.2,0.7),[0x37b24d,0x74c69d,0x69db7c][i%3],-1.1+(i%3)*0.8,0.4,-5.4+Math.floor(i/3)*0.8));
 g.add(mesh(G.box(0.3,2,0.3),0x37b24d,-5,1,-2),mesh(G.box(0.3,2,0.3),0x37b24d,5,1,-2));
 slph={it:{x:0,z:0.2,label:'🧩 العب لغز الأرقام',fn:slpStart}};interacts.push(slph.it);
 g.add(portalMesh('ارجع للطوب',5.8,5.8,0x1098ad,'bxrroom'));
 g.add(portalMesh('تحدّي الألوان',-5.8,5.8,0xae3ec9,'stproom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧩 رتّب الأرقام من 1 لـ8 بأقل حركات',3400)
}
function slpStart(){
 const H=innerHeight<420,S=H?140:Math.min(innerWidth-50,270),cs=S/3;
 let b=[1,2,3,4,5,6,7,8,0],path=[8],moves=0,over=false,msg='';
 const nb=i=>{const r=Math.floor(i/3),c=i%3,o=[];if(r>0)o.push(i-3);if(r<2)o.push(i+3);if(c>0)o.push(i-1);if(c<2)o.push(i+1);return o};
 const shuffle=()=>{b=[1,2,3,4,5,6,7,8,0];path=[8];let bl=8,prev=-1;for(let k=0;k<60;k++){const o=nb(bl).filter(v=>v!==prev);const n=o[Math.floor(Math.random()*o.length)];b[bl]=b[n];b[n]=0;prev=bl;bl=n;path.push(n)}if(b.every((v,i)=>v===(i+1)%9))shuffle()};
 shuffle();
 let tap=()=>{};
 window.slpq=()=>({b:b.slice(),path:path.slice(),moves,over,coins:me.coins,tap:i=>tap(i),set:a=>{b=a.slice();moves=0;over=false}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🧩 لغز الأرقام</h2>')+'<div id="slS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="slC" width="'+S+'" height="'+S+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="slM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="slN" style="width:auto!important;display:inline-block!important">🔁 لغز جديد</button><button class="btn d" id="slX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('slC'),x=cv.getContext('2d');
  const open=()=>$('slC')&&$('modal').style.display!=='none';
  const info=()=>{if($('slS'))$('slS').textContent='الحركات '+moves+' · أحسن '+(me.slpBest||'-');if($('slM'))$('slM').textContent=msg};
  const finish=()=>{over=true;me.slpGames=(me.slpGames||0)+1;me.slpBest=me.slpBest?Math.min(me.slpBest,moves):moves;const d=today();if(me.slpDD!==d){me.slpDD=d;me.slpDC=0}
   let c=moves<=30?3:moves<=50?2:1;c=Math.min(c,Math.max(0,6-(me.slpDC||0)));
   if(c){me.coins+=c;me.slpDC=(me.slpDC||0)+c;updCoins();sfx('win')}
   msg='🏁 حليتها في '+moves+' حركة'+(c?' · +'+c+'🪙':'')+(moves>30?' · اقل من 31 تديك أكتر':'');saveMe();info()};
  tap=i=>{if(over)return;const z=b.indexOf(0);if(!nb(z).includes(i))return;b[z]=b[i];b[i]=0;moves++;sfx('tick');msg='';if(b.every((v,k)=>v===(k+1)%9))finish();info()};
  const loop=()=>{if(!open())return;x.fillStyle='#b2f2bb';x.fillRect(0,0,S,S);x.textAlign='center';x.textBaseline='middle';x.font='bold '+cs*.45+'px sans-serif';
   b.forEach((v,i)=>{if(!v)return;const px=(i%3)*cs,py=Math.floor(i/3)*cs;x.fillStyle=v===i+1?'#2f9e44':'#51cf66';x.fillRect(px+3,py+3,cs-6,cs-6);x.fillStyle='#fff';x.fillText(v,px+cs/2,py+cs/2)});
   info();requestAnimationFrame(loop)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*S/r.width,py=(e.clientY-r.top)*S/r.height;tap(Math.floor(py/cs)*3+Math.floor(px/cs))};
  $('slN').onclick=()=>{shuffle();moves=0;over=false;msg='';info()};
  $('slX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildStp(){
 const g=indoor(0xae3ec9,0xf8f0fc,0xe599f7);
 sign(g,'🎨 تحدّي الألوان',0,4.6,-7.6,'rgba(174,62,201,.92)');
 [0xe03131,0x1c7ed6,0x2f9e44,0xf59f00].forEach((c,i)=>g.add(mesh(G.cyl(0.5,0.5,0.3,12),c,-2.1+i*1.4,0.3,-5)));
 g.add(mesh(G.box(0.3,2,0.3),0xae3ec9,-5,1,-2),mesh(G.box(0.3,2,0.3),0xae3ec9,5,1,-2));
 stph={it:{x:0,z:0.2,label:'🎨 العب تحدّي الألوان',fn:stpStart}};interacts.push(stph.it);
 g.add(portalMesh('ارجع للغز',5.8,5.8,0x37b24d,'slproom'));
 g.add(portalMesh('سباق الحارات',-5.8,5.8,0x495057,'ldgroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎨 دوس على لون الحبر مش على معنى الكلمة. 20 ثانية',3400)
}
function stpStart(){
 const H=innerHeight<420,N=['أحمر','أزرق','أخضر','أصفر'],CL=['#e03131','#1c7ed6','#2f9e44','#f59f00'];
 let ti=0,ink=0,score=0,miss=0,left=20,run=false,over=false,msg='',tmr=null;
 const nxt=()=>{ti=Math.floor(Math.random()*4);ink=(ti+1+Math.floor(Math.random()*3))%4;if(Math.random()<.25)ink=ti};
 nxt();
 let pick=()=>{};
 window.stpq=()=>({ti,ink,score,miss,left,over,run,coins:me.coins,pick:i=>pick(i),start:()=>$('stpG')&&$('stpG').click(),tick:()=>{left=0;}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎨 تحدّي الألوان</h2>')+'<div id="stpS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div id="stpW" style="text-align:center;font-size:'+(H?34:52)+'px;font-weight:bold;margin:'+(H?2:14)+'px 0;min-height:1.3em;direction:rtl"></div><div id="stpB" style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;direction:ltr">'+CL.map((k,i)=>'<button class="btn" data-i="'+i+'" style="background:'+k+';min-height:'+(H?38:52)+'px;width:auto!important;font-size:13px">'+N[i]+'</button>').join('')+'</div><div id="stpM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="stpG" style="width:auto!important;display:inline-block!important">▶ ابدأ</button><button class="btn d" id="stpX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const open=()=>$('stpS')&&$('modal').style.display!=='none';
  const paint=()=>{if(!$('stpS'))return;$('stpS').textContent='النقاط '+score+' · أخطاء '+miss+' · الوقت '+Math.ceil(left)+' · أحسن '+(me.stpBest||0);const w=$('stpW');w.textContent=run?N[ti]:'';w.style.color=CL[ink];$('stpM').textContent=msg};
  const finish=()=>{run=false;over=true;clearInterval(tmr);me.stpGames=(me.stpGames||0)+1;me.stpBest=Math.max(me.stpBest||0,score);const d=today();if(me.stpDD!==d){me.stpDD=d;me.stpDC=0}
   let c=score>=18?3:score>=12?2:score>=7?1:0;c=Math.min(c,Math.max(0,6-(me.stpDC||0)));
   if(c){me.coins+=c;me.stpDC=(me.stpDC||0)+c;updCoins();sfx('win')}else sfx('err');
   msg='🏁 '+score+' صح و'+miss+' غلط'+(c?' · +'+c+'🪙':' · 7 صح للجايزة');saveMe();paint()};
  pick=i=>{if(!run)return;if(i===ink){score++;sfx('tick')}else{miss++;score=Math.max(0,score-1);sfx('err')}nxt();paint()};
  $('stpB').onclick=e=>{const b=e.target.closest('button');if(b)pick(+b.dataset.i)};
  $('stpG').onclick=()=>{score=0;miss=0;left=20;over=false;run=true;msg='';nxt();clearInterval(tmr);tmr=setInterval(()=>{if(!open()){clearInterval(tmr);return}left-=.25;if(left<=0){left=0;finish()}paint()},250);paint()};
  $('stpX').onclick=()=>{clearInterval(tmr);$('modal').style.display='none'};
  paint()})}
function buildLdg(){
 const g=indoor(0x495057,0xf1f3f5,0xced4da);
 sign(g,'🏎️ سباق الحارات',0,4.6,-7.6,'rgba(73,80,87,.92)');
 g.add(mesh(G.box(3.6,0.1,5),0x343a40,0,0.08,-4.5),mesh(G.box(0.1,0.12,4.6),0xffd43b,-0.6,0.12,-4.5),mesh(G.box(0.1,0.12,4.6),0xffd43b,0.6,0.12,-4.5),mesh(G.box(0.7,0.35,1.2),0xe03131,0,0.35,-3.4));
 g.add(mesh(G.box(0.3,2,0.3),0x495057,-5,1,-2),mesh(G.box(0.3,2,0.3),0x495057,5,1,-2));
 ldgh={it:{x:0,z:0.2,label:'🏎️ العب سباق الحارات',fn:ldgStart}};interacts.push(ldgh.it);
 g.add(portalMesh('ارجع للألوان',5.8,5.8,0xae3ec9,'stproom'));
 g.add(portalMesh('فك الكلمة',-5.8,5.8,0x0ca678,'wscroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏎️ دوس يمين أو شمال عشان تغيّر الحارة وتتفادى العربيات',3400)
}
function ldgStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,300),CH=H?150:260,LW=W/3,CW=LW*.5,CHt=H?26:36,PY=CH-CHt-6;
 let lane=1,ob=[],n=0,over=false,msg='',acc=0,go=false,tsc=1;
 const spd=()=>Math.min(260,110+n*3);
 window.ldgq=()=>({lane,ob:ob.map(o=>({lane:o.l,y:o.y})),n,over,go,PY,CHt,CH,coins:me.coins,setLane:l=>{lane=l},setN:v=>{n=v;},fast:k=>{tsc=k},start:()=>$('ldG')&&$('ldG').click()});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏎️ سباق الحارات</h2>')+'<div id="ldS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="ldC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="ldM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="ldG" style="width:auto!important;display:inline-block!important">▶ ابدأ</button><button class="btn d" id="ldX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('ldC'),x=cv.getContext('2d');
  const open=()=>$('ldC')&&$('modal').style.display!=='none';
  const info=()=>{if($('ldS'))$('ldS').textContent='العربيات اللي عدّيت '+n+' · أحسن '+(me.ldgBest||0);if($('ldM'))$('ldM').textContent=msg};
  const finish=()=>{over=true;go=false;me.ldgGames=(me.ldgGames||0)+1;me.ldgBest=Math.max(me.ldgBest||0,n);const d=today();if(me.ldgDD!==d){me.ldgDD=d;me.ldgDC=0}
   let c=n>=50?3:n>=30?2:n>=15?1:0;c=Math.min(c,Math.max(0,6-(me.ldgDC||0)));
   if(c){me.coins+=c;me.ldgDC=(me.ldgDC||0)+c;updCoins();sfx('win')}else sfx('err');
   msg='💥 خبطت بعد '+n+' عربية'+(c?' · +'+c+'🪙':' · عدّي 15 للجايزة');saveMe();info()};
  const spawn=()=>{const a=Math.floor(Math.random()*3);ob.push({l:a,y:-CHt});if(Math.random()<.4){let b=(a+1+Math.floor(Math.random()*2))%3;ob.push({l:b,y:-CHt})}};
  const step=dt=>{const v=spd();acc+=dt;if(acc>=Math.max(.55,1.1-n*.012)){acc=0;spawn()}
   for(const o of ob){o.y+=v*dt;if(!o.p&&o.y>CH){o.p=1;}}
   for(const o of ob){if(o.l===lane&&o.y+CHt>PY+4&&o.y<PY+CHt-4){finish();return}}
   const k=ob.length;ob=ob.filter(o=>o.y<=CH);
   // count a row passed once all its cars left
   };
  let seen=new Set();
  let tm=performance.now();
  const loop=ts=>{if(!open())return;let dt=Math.min(.05,(ts-tm)/1000)*tsc;tm=ts;
   if(go&&!over){while(dt>0&&!over){const s=Math.min(dt,.01);const before=ob.filter(o=>o.y+CHt<PY).length;step(s);dt-=s;}
    ob.forEach(o=>{if(!o.c&&o.y>PY+CHt){o.c=1;n++;info()}})}
   x.fillStyle='#495057';x.fillRect(0,0,W,CH);x.strokeStyle='#ffd43b';x.lineWidth=2;x.setLineDash([10,10]);x.lineDashOffset=-(performance.now()/20)%20;
   for(let i=1;i<3;i++){x.beginPath();x.moveTo(i*LW,0);x.lineTo(i*LW,CH);x.stroke()}x.setLineDash([]);
   ob.forEach(o=>{x.fillStyle='#1c7ed6';x.fillRect(o.l*LW+(LW-CW)/2,o.y,CW,CHt)});
   x.fillStyle='#e03131';x.fillRect(lane*LW+(LW-CW)/2,PY,CW,CHt);x.fillStyle='#ffa8a8';x.fillRect(lane*LW+(LW-CW)/2+3,PY+4,CW-6,8);
   info();requestAnimationFrame(loop)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width;if(!go)return;lane=px<.5?Math.max(0,lane-1):Math.min(2,lane+1);sfx('tick')};
  $('ldG').onclick=()=>{ob=[];n=0;lane=1;over=false;acc=0;go=true;msg='';info()};
  $('ldX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
function buildWsc(){
 const g=indoor(0x0ca678,0xe6fcf5,0x96f2d7);
 sign(g,'🔤 فك الكلمة',0,4.6,-7.6,'rgba(12,166,120,.92)');
 [0,1,2,3,4].forEach(i=>g.add(mesh(G.box(0.7,0.7,0.7),[0x0ca678,0x20c997,0x63e6be,0x38d9a9,0x12b886][i],-2+i*1,0.35+(i%2)*0.2,-5)));
 g.add(mesh(G.box(0.3,2,0.3),0x0ca678,-5,1,-2),mesh(G.box(0.3,2,0.3),0x0ca678,5,1,-2));
 wsch={it:{x:0,z:0.2,label:'🔤 العب فك الكلمة',fn:wscStart}};interacts.push(wsch.it);
 g.add(portalMesh('ارجع للحارات',5.8,5.8,0x495057,'ldgroom'));
 g.add(portalMesh('بنج بونج',-5.8,5.8,0x1971c2,'pnkroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔤 رتّب الحروف المتلخبطة عشان تكوّن الكلمة. 60 ثانية',3400)
}
function wscStart(){
 const WL=['كتاب','مدرسة','سيارة','طائرة','حديقة','مفتاح','شجرة','نافذة','ساعة','حاسوب','مطار','طعام','هاتف','مكتبة'];
 let wd='',tiles=[],pos=0,score=0,left=60,run=false,over=false,msg='',tmr=null,used=[];
 const pickW=()=>{let w;do{w=WL[Math.floor(Math.random()*WL.length)]}while(w===wd||used.includes(w)&&used.length<WL.length);wd=w;used.push(w);if(used.length>=WL.length)used=[];const a=[...w];let t;do{t=a.map((c,i)=>({c,i,d:false}));for(let i=t.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[t[i],t[j]]=[t[j],t[i]]}}while(t.map(k=>k.c).join('')===w);tiles=t;pos=0};
 pickW();
 let tap=()=>{};
 window.wscq=()=>({wd,pos,score,left,over,run,tiles:tiles.map(t=>t.c),coins:me.coins,tap:i=>tap(i),start:()=>$('wcG')&&$('wcG').click()});
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🔤 فك الكلمة</h2><div id="wcS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div id="wcW" style="text-align:center;font-size:30px;font-weight:bold;margin:8px 0;min-height:1.4em;direction:rtl;letter-spacing:4px"></div><div id="wcT" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;direction:rtl;min-height:56px"></div><div id="wcM" style="text-align:center;font-size:13px;margin:6px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="wcG" style="width:auto!important;display:inline-block!important">▶ ابدأ</button><button class="btn d" id="wcX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const open=()=>$('wcS')&&$('modal').style.display!=='none';
  const tick=()=>{if(!$('wcS'))return;$('wcS').textContent='كلمات '+score+' · الوقت '+Math.ceil(left)+' · أحسن '+(me.wscBest||0)};const paint=()=>{if(!$('wcS'))return;tick();$('wcW').textContent=run?wd.slice(0,pos):'';const T=$('wcT');T.innerHTML='';if(run)tiles.forEach((t,i)=>{const b=document.createElement('button');b.className='btn';b.dataset.i=i;b.textContent=t.c;b.disabled=t.d;b.style.cssText='width:48px!important;height:48px;font-size:24px;padding:0;'+(t.d?'opacity:.25':'');T.appendChild(b)});$('wcM').textContent=msg};
  const finish=()=>{run=false;over=true;clearInterval(tmr);me.wscGames=(me.wscGames||0)+1;me.wscBest=Math.max(me.wscBest||0,score);const d=today();if(me.wscDD!==d){me.wscDD=d;me.wscDC=0}
   let c=score>=5?3:score>=4?2:score>=3?1:0;c=Math.min(c,Math.max(0,6-(me.wscDC||0)));
   if(c){me.coins+=c;me.wscDC=(me.wscDC||0)+c;updCoins();sfx('win')}else sfx('err');
   msg='🏁 فكّيت '+score+' كلمة'+(c?' · +'+c+'🪙':' · فُكّ 3 كلمات للجايزة');saveMe();paint()};
  tap=i=>{if(!run)return;const t=tiles[i];if(!t||t.d)return;if(t.c===wd[pos]){t.d=true;pos++;sfx('tick');if(pos>=wd.length){score++;msg='✅ '+wd;sfx('star');pickW()}else msg=''}else{msg='❌ حرف غلط';sfx('err')}paint()};
  $('wcT').onclick=e=>{const b=e.target.closest('button');if(b)tap(+b.dataset.i)};
  $('wcG').onclick=()=>{score=0;left=60;over=false;run=true;msg='';pickW();clearInterval(tmr);tmr=setInterval(()=>{if(!open()){clearInterval(tmr);return}left-=.5;if(left<=0){left=0;finish()}else tick()},500);paint()};
  $('wcX').onclick=()=>{clearInterval(tmr);$('modal').style.display='none'};
  paint()})}
function buildPnk(){
 const g=indoor(0x1971c2,0xe7f5ff,0xa5d8ff);
 sign(g,'🏓 بنج بونج ضد 🤖',0,4.6,-7.6,'rgba(25,113,194,.92)');
 g.add(mesh(G.box(3.2,0.15,2),0x1971c2,0,0.7,-4.5),mesh(G.box(0.12,0.3,2),0xffffff,0,0.9,-4.5),mesh(G.cyl(0.1,0.1,0.7,6),0x495057,-1.4,0.35,-3.6),mesh(G.cyl(0.1,0.1,0.7,6),0x495057,1.4,0.35,-3.6),mesh(G.sph(0.12,8),0xffffff,0.7,1,-4.5));
 g.add(mesh(G.box(0.3,2,0.3),0x1971c2,-5,1,-2),mesh(G.box(0.3,2,0.3),0x1971c2,5,1,-2));
 pnkh={it:{x:0,z:0.2,label:'🏓 العب ضد البوت 🤖',fn:pnkStart}};interacts.push(pnkh.it);
 g.add(portalMesh('ارجع للكلمات',5.8,5.8,0x0ca678,'wscroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏓 حرّك اللوح بصباعك. أول واحد يوصل 5 يكسب. الخصم بوت 🤖',3400)
}
function pnkStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,300),CH=H?150:260,PW=56,PH=7,BR=5,TOP=14,BOT=CH-14;
 let px=W/2,ox=W/2,bx=W/2,by=CH/2,vx=0,vy=0,go=false,me_=0,bot=0,over=false,msg='',tsc=1,sp=170,wait=0;
 const serve=d=>{bx=W/2;by=CH/2;sp=170;const a=(Math.random()-.5)*.9;vx=Math.sin(a)*sp;vy=Math.cos(a)*sp*d;wait=.6};
 let start=()=>{};
 window.pnkq=()=>({me:me_,bot,over,go,bx,by,px,ox,W,CH,coins:me.coins,setP:v=>{px=Math.max(PW/2,Math.min(W-PW/2,v))},fast:k=>{tsc=k},start:()=>$('poG')&&$('poG').click()});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏓 بنج بونج ضد 🤖</h2>')+'<div id="poS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div style="text-align:center"><canvas id="poC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div id="poM" style="text-align:center;font-size:13px;margin:5px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="poG" style="width:auto!important;display:inline-block!important">▶ ابدأ</button><button class="btn d" id="poX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('poC'),x=cv.getContext('2d');
  const open=()=>$('poC')&&$('modal').style.display!=='none';
  const info=()=>{if($('poS'))$('poS').textContent='أنت '+me_+' : '+bot+' 🤖 (الأول لـ5) · أحسن فوز '+(me.pnkBest||0);if($('poM'))$('poM').textContent=msg};
  const finish=()=>{over=true;go=false;me.pnkGames=(me.pnkGames||0)+1;const win=me_>bot,mar=me_-bot;if(win)me.pnkBest=Math.max(me.pnkBest||0,mar);
   const d=today();if(me.pnkDD!==d){me.pnkDD=d;me.pnkDC=0}let c=win?(mar>=3?3:2):0;c=Math.min(c,Math.max(0,6-(me.pnkDC||0)));
   if(c){me.coins+=c;me.pnkDC=(me.pnkDC||0)+c;updCoins();sfx('win')}else sfx('err');
   msg=(win?'🏆 كسبت البوت':'🤖 البوت كسب')+' '+me_+':'+bot+(c?' · +'+c+'🪙':'');saveMe();info()};
  const point=(who)=>{if(who)me_++;else bot++;sfx(who?'star':'err');info();if(me_>=5||bot>=5){finish();return}serve(who?-1:1)};
  const step=dt=>{if(wait>0){wait-=dt;return}
   bx+=vx*dt;by+=vy*dt;if(bx<BR){bx=BR;vx=Math.abs(vx)}if(bx>W-BR){bx=W-BR;vx=-Math.abs(vx)}
   const tx=bx+vx*0.05,d=tx-ox,mx=120*dt*(sp/170);ox+=Math.max(-mx,Math.min(mx,d*(vy<0?1:.15)));ox=Math.max(PW/2,Math.min(W-PW/2,ox));
   if(vy>0&&by+BR>=BOT&&by-BR<=BOT+PH&&Math.abs(bx-px)<=PW/2+BR){sp=Math.min(300,sp+10);const o=(bx-px)/(PW/2),a=o*1.0;vx=Math.sin(a)*sp;vy=-Math.cos(a)*sp;by=BOT-BR;sfx('place')}
   if(vy<0&&by-BR<=TOP+PH&&by+BR>=TOP&&Math.abs(bx-ox)<=PW/2+BR){sp=Math.min(300,sp+10);const o=(bx-ox)/(PW/2),a=o*1.0;vx=Math.sin(a)*sp;vy=Math.cos(a)*sp;by=TOP+PH+BR;sfx('tick')}
   if(by>CH+BR)point(0);else if(by<-BR)point(1)};
  let tm=performance.now();
  const loop=ts=>{if(!open())return;let dt=Math.min(.05,(ts-tm)/1000)*tsc;tm=ts;if(go&&!over){while(dt>0&&go&&!over){const s=Math.min(dt,.008);step(s);dt-=s}}
   x.fillStyle='#e7f5ff';x.fillRect(0,0,W,CH);x.strokeStyle='#a5d8ff';x.setLineDash([6,6]);x.beginPath();x.moveTo(0,CH/2);x.lineTo(W,CH/2);x.stroke();x.setLineDash([]);
   x.fillStyle='#868e96';x.fillRect(ox-PW/2,TOP,PW,PH);x.fillStyle='#1971c2';x.fillRect(px-PW/2,BOT,PW,PH);
   x.fillStyle='#212529';x.beginPath();x.arc(bx,by,BR,0,7);x.fill();info();requestAnimationFrame(loop)};
  const mv=e=>{const r=cv.getBoundingClientRect();px=Math.max(PW/2,Math.min(W-PW/2,(e.clientX-r.left)*W/r.width))};
  cv.onpointerdown=e=>{e.preventDefault();mv(e)};cv.onpointermove=mv;
  $('poG').onclick=()=>{me_=0;bot=0;over=false;go=true;msg='';px=W/2;ox=W/2;serve(1);info()};
  $('poX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}
