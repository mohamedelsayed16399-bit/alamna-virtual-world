let bpph=null;let mg2h=null;let skbh=null;let mprh=null;let dtbh=null;let tfeh=null;let bxrh=null;let slph=null;let stph=null;let ldgh=null;let wsch=null;let pnkh=null;let pkdh=null;let hilh=null;let rpsh=null;let nimh=null;let gsnh=null;let calh=null;let bjkh=null;let shph=null;let hgmh=null;let pigh=null;let mnkh=null;let rvh=null;let dbxh=null;let mmdh=null;let fdih=null;let gmkh=null;let damh=null;let snlh=null;let hxgh=null;let dmoh=null;let jamh=null;
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
 g.add(portalMesh('بوكر النرد',-5.8,5.8,0xd9480f,'pkdroom'));
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
function buildPkd(){
 const g=indoor(0xd9480f,0xfff4e6,0xffd8a8);
 sign(g,'🎲 بوكر النرد ضد 🤖',0,4.6,-7.6,'rgba(217,72,15,.92)');
 [[-1.2,0],[0,0.4],[1.2,0.9]].forEach((a,i)=>g.add(mesh(G.box(0.8,0.8,0.8),0xffffff,a[0],0.4+a[1]*0.2,-4.8+i*0.1),mesh(G.sph(0.09,6),0x212529,a[0],0.82+a[1]*0.2,-4.8+i*0.1)));
 g.add(mesh(G.box(0.3,2,0.3),0xd9480f,-5,1,-2),mesh(G.box(0.3,2,0.3),0xd9480f,5,1,-2));
 pkdh={it:{x:0,z:0.2,label:'🎲 العب بوكر النرد',fn:pkdStart}};interacts.push(pkdh.it);
 g.add(portalMesh('ارجع للبنج بونج',5.8,5.8,0x1971c2,'pnkroom'));
 g.add(portalMesh('أعلى أو أقل',-5.8,5.8,0x7048e8,'hilroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎲 3 جولات ضد البوت 🤖. ثبّت النرد اللي عاجبك وأعد الرمي مرتين',3400)
}
function pkdStart(){
 const sc=d=>{const c={};d.forEach(v=>c[v]=(c[v]||0)+1);const k=Object.values(c).sort((a,b)=>b-a);const s=[...d].sort();const st=s.join('')==='12345'||s.join('')==='23456';
  if(k[0]===5)return 50;if(k[0]===4)return 30;if(k[0]===3&&k[1]===2)return 25;if(st)return 20;if(k[0]===3)return 15;if(k[0]===2&&k[1]===2)return 10;if(k[0]===2)return 5;return 0};
 const NM=s=>s>=50?'خمسة متشابهة':s>=30?'أربعة متشابهة':s>=25?'فول هاوس':s>=20?'تسلسل':s>=15?'ثلاثة متشابهة':s>=10?'زوجين':s>=5?'زوج':'ولا حاجة';
 const rl=()=>1+Math.floor(Math.random()*6);
 let d=[0,0,0,0,0],hold=[0,0,0,0,0],rolls=0,rd=1,my=0,bt=0,over=false,msg='',log='';
 const botPlay=()=>{let b=[rl(),rl(),rl(),rl(),rl()];for(let r=0;r<2;r++){const c={};b.forEach(v=>c[v]=(c[v]||0)+1);const best=+Object.keys(c).sort((x,y)=>c[y]-c[x]||y-x)[0];if(sc(b)>=20)break;b=b.map(v=>v===best?v:rl())}return b};
 const first=()=>{d=[rl(),rl(),rl(),rl(),rl()];hold=[0,0,0,0,0];rolls=1};
 first();
 let roll=()=>{},lock=()=>{};
 window.pkdq=()=>({d:d.slice(),hold:hold.slice(),rolls,rd,my,bt,over,coins:me.coins,sc,set:a=>{d=a.slice()},tog:i=>{if(rolls<3)hold[i]^=1},roll:()=>roll(),lock:()=>lock()});
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🎲 بوكر النرد ضد 🤖</h2><div id="kdS" style="text-align:center;font-size:14px;margin:2px;min-height:1.4em"></div><div id="kdD" style="display:flex;gap:6px;justify-content:center;direction:ltr;margin:8px 0"></div><div id="kdH" style="text-align:center;font-size:15px;min-height:1.5em"></div><div id="kdM" style="text-align:center;font-size:13px;margin:6px 0;min-height:3.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="kdR" style="width:auto!important;display:inline-block!important">🎲 ارمي</button><button class="btn" id="kdL" style="width:auto!important;display:inline-block!important">✔ ثبّت</button><button class="btn d" id="kdX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const paint=()=>{if(!$('kdS'))return;$('kdS').textContent='جولة '+Math.min(rd,3)+'/3 · أنت '+my+' : '+bt+' 🤖 · رميات '+rolls+'/3';const D=$('kdD');D.innerHTML='';d.forEach((v,i)=>{const b=document.createElement('button');b.className='btn';b.dataset.i=i;b.textContent=v;b.style.cssText='width:50px!important;height:56px;font-size:28px;padding:0;'+(hold[i]?'background:#f59f00;':'')+(over?'opacity:.5;':'');D.appendChild(b)});$('kdH').textContent=over?'':NM(sc(d))+' ('+sc(d)+')';$('kdM').textContent=msg;$('kdR').disabled=over||rolls>=3;$('kdL').disabled=over};
  const finish=()=>{over=true;me.pkdGames=(me.pkdGames||0)+1;const win=my>bt;if(win)me.pkdBest=Math.max(me.pkdBest||0,my);const dd=today();if(me.pkdDD!==dd){me.pkdDD=dd;me.pkdDC=0}
   let cn=win?(my>=50?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.pkdDC||0)));if(cn){me.coins+=cn;me.pkdDC=(me.pkdDC||0)+cn;updCoins();sfx('win')}else sfx('err');
   msg+='\n'+(win?'🏆 كسبت البوت ':my===bt?'🤝 تعادل ':'🤖 البوت كسب ')+my+':'+bt+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
  roll=()=>{if(over||rolls>=3)return;d=d.map((v,i)=>hold[i]?v:rl());rolls++;sfx('tick');paint()};
  lock=()=>{if(over)return;const s=sc(d);my+=s;const b=botPlay(),bs=sc(b);bt+=bs;msg='جولة '+rd+': أنت '+NM(s)+' ('+s+') · 🤖 \u202A'+b.join(' ')+'\u202C '+NM(bs)+' ('+bs+')';sfx(s>=bs?'star':'place');rd++;if(rd>3){finish();return}first();paint()};
  $('kdD').onclick=e=>{const b=e.target.closest('button');if(!b||over||rolls>=3)return;hold[+b.dataset.i]^=1;sfx('tick');paint()};
  $('kdR').onclick=roll;$('kdL').onclick=lock;
  $('kdX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildHil(){
 const g=indoor(0x7048e8,0xf3f0ff,0xd0bfff);
 sign(g,'🃏 أعلى أو أقل ضد 🤖',0,4.6,-7.6,'rgba(112,72,232,.92)');
 [[-1.4,0],[0,0.3],[1.4,0.6]].forEach((a,i)=>g.add(mesh(G.box(0.9,0.06,1.3),0xffffff,a[0],0.9+a[1]*0.2,-4.8),mesh(G.box(0.7,0.07,1.1),0x7048e8,a[0],0.95+a[1]*0.2,-4.8)));
 g.add(mesh(G.box(1,0.8,1),0x5f3dc4,0,0.4,-4.8));
 hilh={it:{x:0,z:0.2,label:'🃏 العب أعلى أو أقل',fn:hilStart}};interacts.push(hilh.it);
 g.add(portalMesh('ارجع لبوكر النرد',5.8,5.8,0xd9480f,'pkdroom'));
 g.add(portalMesh('حجر ورقة مقص',-5.8,5.8,0xe03131,'rpsroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🃏 10 كروت: خمّن الكارت الجاي أعلى ولا أقل. البوت 🤖 بيلعب معاك',3400)
}
function hilStart(){
 const rc=()=>1+Math.floor(Math.random()*13);
 const NMc=v=>v===1?'A':v===11?'J':v===12?'Q':v===13?'K':''+v;
 let deck=[],i=0,my=0,bt=0,over=false,msg='';
 for(let k=0;k<10;k++)deck.push(rc());
 const step=dir=>{if(over)return;const a=deck[i],b=deck[i+1];const ok=x=>b===a?0:(x==='u'?b>a:b<a)?1:0;
  const bd=a<=6?'u':'d';const m=ok(dir),n=ok(bd);my+=m;bt+=n;
  msg='الكارت '+NMc(a)+' ← '+NMc(b)+' · '+(b===a?'تعادل':m?'✅ صح':'❌ غلط')+' · 🤖 '+(n?'✅':'❌');
  sfx(m?'star':b===a?'tick':'err');i++;if(i>=9)fin();else paint()};
 window.hilq=()=>({deck:deck.slice(),i,my,bt,over,set:d=>{deck=d.slice()},step});
 let paint=()=>{};
 const fin=()=>{over=true;me.hilGames=(me.hilGames||0)+1;const win=my>bt;if(win)me.hilBest=Math.max(me.hilBest||0,my);const dd=today();if(me.hilDD!==dd){me.hilDD=dd;me.hilDC=0}
  let cn=win?(my>=8?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.hilDC||0)));if(cn){me.coins+=cn;me.hilDC=(me.hilDC||0)+cn;updCoins();sfx('win')}
  msg+='\n'+(win?'🏆 كسبت البوت ':my===bt?'🤝 تعادل ':'🤖 البوت كسب ')+my+':'+bt+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🃏 أعلى أو أقل ضد 🤖</h2><div id="hvS" style="text-align:center;font-size:14px;margin:2px"></div><div id="hvC" style="display:flex;justify-content:center;margin:8px 0"></div><div id="hvM" style="text-align:center;font-size:13px;margin:6px 0;min-height:3.2em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="hvU" style="width:auto!important;display:inline-block!important">⬆ أعلى</button><button class="btn" id="hvD" style="width:auto!important;display:inline-block!important">⬇ أقل</button><button class="btn d" id="hvX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('hvS'))return;$('hvS').textContent='كارت '+Math.min(i+1,9)+'/9 · أنت '+my+' : '+bt+' 🤖';$('hvC').innerHTML='<div style="width:70px;height:96px;border-radius:10px;background:#fff;color:#5f3dc4;font-size:34px;font-weight:bold;display:flex;align-items:center;justify-content:center;border:3px solid #7048e8;direction:ltr">'+NMc(deck[over?9:i])+'</div>';$('hvM').textContent=msg;$('hvU').disabled=over;$('hvD').disabled=over};
  $('hvU').onclick=()=>step('u');$('hvD').onclick=()=>step('d');
  $('hvX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildRps(){
 const g=indoor(0xe03131,0xfff5f5,0xffc9c9);
 sign(g,'✊ حجر ورقة مقص ضد 🤖',0,4.6,-7.6,'rgba(224,49,49,.92)');
 g.add(mesh(G.sph(0.6,8),0x868e96,-1.6,0.6,-4.8),mesh(G.box(1.1,0.08,1.4),0xf8f9fa,0,0.9,-4.8),mesh(G.box(0.12,0.9,0.12),0xe03131,1.6,0.6,-4.8),mesh(G.box(0.12,0.9,0.12),0xe03131,1.75,0.6,-4.8));
 rpsh={it:{x:0,z:0.2,label:'✊ العب حجر ورقة مقص',fn:rpsStart}};interacts.push(rpsh.it);
 g.add(portalMesh('ارجع لأعلى أو أقل',5.8,5.8,0x7048e8,'hilroom'));
 g.add(portalMesh('العيدان',-5.8,5.8,0x2f9e44,'nimroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('✊ أول واحد يوصل 3 يكسب. البوت 🤖 بيحاول يتوقع حركتك',3400)
}
function rpsStart(){
 const N=['حجر','ورقة','مقص'],E=['✊','✋','✌'];
 let my=0,bt=0,over=false,msg='',last=-1,rd=1;
 const beats=(a,b)=>(a+1)%3===b?0:a===b?-1:1; // 1 if a beats b: 0 beats 2, 1 beats 0, 2 beats 1
 const win=(a,b)=>a===b?0:((a===0&&b===2)||(a===1&&b===0)||(a===2&&b===1))?1:-1;
 let forced=null;
 const botPick=()=>{if(forced!==null){const f=forced;forced=null;return f}if(last>=0&&Math.random()<0.4)return (last+1)%3;return Math.floor(Math.random()*3)};
 window.rpsq=()=>({my,bt,over,rd,force:v=>{forced=v},pick:i=>pick(i)});
 let paint=()=>{};
 const pick=i=>{if(over)return;const b=botPick();const r=win(i,b);if(r>0)my++;else if(r<0)bt++;last=i;rd++;
  msg='أنت '+E[i]+' '+N[i]+' · 🤖 '+E[b]+' '+N[b]+' · '+(r>0?'✅ كسبت الدور':r<0?'❌ خسرت الدور':'🤝 تعادل');sfx(r>0?'star':r<0?'err':'tick');
  if(my>=3||bt>=3)fin();else paint()};
 const fin=()=>{over=true;me.rpsGames=(me.rpsGames||0)+1;const w=my>bt;if(w)me.rpsBest=(me.rpsBest||0)+1;const dd=today();if(me.rpsDD!==dd){me.rpsDD=dd;me.rpsDC=0}
  let cn=w?(bt===0?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.rpsDC||0)));if(cn){me.coins+=cn;me.rpsDC=(me.rpsDC||0)+cn;updCoins();sfx('win')}
  msg+='\n'+(w?'🏆 كسبت البوت ':'🤖 البوت كسب ')+my+':'+bt+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">✊ حجر ورقة مقص ضد 🤖</h2><div id="rpS" style="text-align:center;font-size:15px;margin:4px"></div><div id="rpM" style="text-align:center;font-size:13px;margin:8px 0;min-height:4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="rpA" style="width:auto!important;display:inline-block!important">✊ حجر</button><button class="btn" id="rpB" style="width:auto!important;display:inline-block!important">✋ ورقة</button><button class="btn" id="rpC" style="width:auto!important;display:inline-block!important">✌ مقص</button><button class="btn d" id="rpX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('rpS'))return;$('rpS').textContent='أنت '+my+' : '+bt+' 🤖 · الأول لـ3';$('rpM').textContent=msg;['rpA','rpB','rpC'].forEach(k=>$(k).disabled=over)};
  $('rpA').onclick=()=>pick(0);$('rpB').onclick=()=>pick(1);$('rpC').onclick=()=>pick(2);
  $('rpX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildNim(){
 const g=indoor(0x2f9e44,0xebfbee,0xb2f2bb);
 sign(g,'🥢 لعبة العيدان ضد 🤖',0,4.6,-7.6,'rgba(47,158,68,.92)');
 for(let k=0;k<9;k++)g.add(mesh(G.cyl(0.05,0.05,1.2,6),0xe8b86d,-1.6+k*0.4,0.6,-4.8));
 nimh={it:{x:0,z:0.2,label:'🥢 العب العيدان',fn:nimStart}};interacts.push(nimh.it);
 g.add(portalMesh('ارجع لحجر ورقة مقص',5.8,5.8,0xe03131,'rpsroom'));
 g.add(portalMesh('خمّن الرقم',-5.8,5.8,0x1098ad,'gsnroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🥢 15 عود: شيل 1 أو 2 أو 3. اللي ياخد آخر عود يخسر. البوت 🤖 معاك',3400)
}
function nimStart(){
 let n=15,over=false,msg='',turn=0;
 const botMove=()=>{const opt=(n-1)%4;let t=opt>=1&&opt<=3&&Math.random()<0.75?opt:1+Math.floor(Math.random()*Math.min(3,n));return Math.min(t,n)};
 window.nimq=()=>({n,over,msg,take:k=>take(k)});
 let paint=()=>{};
 const fin=win=>{over=true;me.nimGames=(me.nimGames||0)+1;if(win)me.nimBest=(me.nimBest||0)+1;const dd=today();if(me.nimDD!==dd){me.nimDD=dd;me.nimDC=0}
  let cn=win?2:0;cn=Math.min(cn,Math.max(0,6-(me.nimDC||0)));if(cn){me.coins+=cn;me.nimDC=(me.nimDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت البوت ':'🤖 البوت كسب ')+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const take=k=>{if(over||k>n)return;n-=k;msg='أنت شلت '+k;sfx('place');if(n===0){msg+=' وأخدت آخر عود 😬';fin(false);return}
  const b=botMove();n-=b;msg+=' · 🤖 شال '+b;if(n===0){msg+=' وأخد آخر عود';fin(true);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🥢 العيدان ضد 🤖</h2><div id="nmS" style="text-align:center;font-size:15px;margin:4px"></div><div id="nmC" style="text-align:center;font-size:22px;line-height:1.3;margin:6px 0;direction:ltr;word-break:break-all"></div><div id="nmM" style="text-align:center;font-size:13px;margin:6px 0;min-height:3.2em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="nmA" style="width:auto!important;display:inline-block!important">شيل 1</button><button class="btn" id="nmB" style="width:auto!important;display:inline-block!important">شيل 2</button><button class="btn" id="nmD" style="width:auto!important;display:inline-block!important">شيل 3</button><button class="btn d" id="nmX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('nmS'))return;$('nmS').textContent='باقي '+n+' عود · اللي ياخد الأخير يخسر';$('nmC').textContent='|'.repeat(n).replace(/(.{5})/g,'$1 ');$('nmM').textContent=msg;[['nmA',1],['nmB',2],['nmD',3]].forEach(a=>$(a[0]).disabled=over||a[1]>n)};
  $('nmA').onclick=()=>take(1);$('nmB').onclick=()=>take(2);$('nmD').onclick=()=>take(3);
  $('nmX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildGsn(){
 const g=indoor(0x1098ad,0xe3fafc,0x99e9f2);
 sign(g,'🔢 خمّن الرقم ضد 🤖',0,4.6,-7.6,'rgba(16,152,173,.92)');
 [[-1.4,0x1098ad],[0,0x0b7285],[1.4,0x1098ad]].forEach((a,i)=>g.add(mesh(G.box(0.9,0.9,0.9),a[1],a[0],0.45,-4.8),mesh(G.box(0.5,0.1,0.05),0xffffff,a[0],0.6,-4.33)));
 gsnh={it:{x:0,z:0.2,label:'🔢 العب خمّن الرقم',fn:gsnStart}};interacts.push(gsnh.it);
 g.add(portalMesh('ارجع للعيدان',5.8,5.8,0x2f9e44,'nimroom'));
 g.add(portalMesh('حساب سريع',-5.8,5.8,0xf08c00,'calroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔢 رقم سري من 1 لـ100. تخمّنوا بالدور مع البوت 🤖 واللي يصيبه الأول يكسب',3400)
}
function gsnStart(){
 let sec=1+Math.floor(Math.random()*100),lo=1,hi=100,tries=0,over=false,msg='';
 const bot=()=>{let g=Math.floor((lo+hi)/2);if(Math.random()<0.3)g=lo+Math.floor(Math.random()*(hi-lo+1));return g};
 window.gsnq=()=>({sec,lo,hi,tries,over,msg,set:v=>{sec=v},guess:v=>guess(v)});
 let paint=()=>{};
 const fin=win=>{over=true;me.gsnGames=(me.gsnGames||0)+1;if(win)me.gsnBest=(me.gsnBest||0)+1;const dd=today();if(me.gsnDD!==dd){me.gsnDD=dd;me.gsnDC=0}
  let cn=win?(tries<=5?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.gsnDC||0)));if(cn){me.coins+=cn;me.gsnDC=(me.gsnDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت البوت! الرقم '+sec:'🤖 البوت كسب. الرقم كان '+sec)+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const note=(who,v)=>{if(v<sec){lo=Math.max(lo,v+1);return who+' '+v+' ⬆ أعلى'}return who+' '+v+' ⬇ أقل'};
 const guess=v=>{if(over)return;v=Math.round(+v);if(!(v>=lo&&v<=hi)){msg='اكتب رقم بين '+lo+' و '+hi;sfx('err');paint();return}tries++;
  if(v===sec){msg='أنت '+v+' ✅ صح';fin(true);return}
  if(v>sec)hi=Math.min(hi,v-1);msg=note('أنت',v).replace(/ ⬆.*| ⬇.*/,'')+(v<sec?' ⬆ أعلى':' ⬇ أقل');sfx('tick');
  const b=Math.min(hi,Math.max(lo,bot()));if(b===sec){msg+=' · 🤖 '+b+' ✅ صح';fin(false);return}
  if(b<sec)lo=Math.max(lo,b+1);else hi=Math.min(hi,b-1);msg+=' · 🤖 '+b+(b<sec?' ⬆':' ⬇');paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🔢 خمّن الرقم ضد 🤖</h2><div id="gnS" style="text-align:center;font-size:15px;margin:4px"></div><div style="text-align:center;margin:8px 0"><input id="gnI" type="number" inputmode="numeric" style="width:90px;color:#111;background:#fff;font-size:22px;text-align:center;direction:ltr;padding:6px;border-radius:8px"></div><div id="gnM" style="text-align:center;font-size:13px;margin:6px 0;min-height:3.2em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="gnG" style="width:auto!important;display:inline-block!important">خمّن ✔</button><button class="btn d" id="gnX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('gnS'))return;$('gnS').textContent='الرقم بين '+lo+' و '+hi+' · محاولاتك '+tries;$('gnM').textContent=msg;$('gnG').disabled=over;$('gnI').disabled=over;if(!over)$('gnI').value=''};
  $('gnG').onclick=()=>guess($('gnI').value);$('gnI').onkeydown=e=>{if(e.key==='Enter')guess($('gnI').value)};
  $('gnX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildCal(){
 const g=indoor(0xf08c00,0xfff9db,0xffec99);
 sign(g,'🧮 حساب سريع ضد 🤖',0,4.6,-7.6,'rgba(240,140,0,.92)');
 [[-1.4,0],[0,0.3],[1.4,0.6]].forEach((a,i)=>g.add(mesh(G.box(0.9,0.9,0.9),0xf08c00,a[0],0.45+a[1]*0.2,-4.8),mesh(G.box(0.5,0.1,0.05),0xffffff,a[0],0.6+a[1]*0.2,-4.33),mesh(G.box(0.1,0.5,0.05),0xffffff,a[0],0.6+a[1]*0.2,-4.33)));
 calh={it:{x:0,z:0.2,label:'🧮 العب حساب سريع',fn:calStart}};interacts.push(calh.it);
 g.add(portalMesh('ارجع لخمّن الرقم',5.8,5.8,0x1098ad,'gsnroom'));
 g.add(portalMesh('واحد وعشرين',-5.8,5.8,0x2b8a3e,'bjkroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧮 7 مسائل، اختار الإجابة الصح. البوت 🤖 بيحل معاك',3400)
}
function calStart(){
 const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 let q=0,my=0,bt=0,over=false,msg='',cur=null;
 const mk=()=>{const t=ri(0,2);let a,b,s,r;if(t===0){a=ri(12,89);b=ri(11,59);s='+';r=a+b}else if(t===1){a=ri(40,99);b=ri(11,39);s='−';r=a-b}else{a=ri(3,12);b=ri(3,12);s='×';r=a*b}
  const o=new Set([r]);const ds=[-10,-3,-2,-1,1,2,3,10].filter(d=>r+d>0).sort(()=>Math.random()-.5);for(let k=0;o.size<4&&k<ds.length;k++)o.add(r+ds[k]);for(let k=1;o.size<4;k++)o.add(r+10+k);
  const arr=[...o].sort(()=>Math.random()-.5);cur={txt:a+' '+s+' '+b,r,arr}};
 window.calq=()=>({q,my,bt,over,cur,ans:v=>ans(v),msg});
 let paint=()=>{};
 const fin=()=>{over=true;me.calGames=(me.calGames||0)+1;const win=my>bt;if(win)me.calBest=Math.max(me.calBest||0,my);const dd=today();if(me.calDD!==dd){me.calDD=dd;me.calDC=0}
  let cn=win?(my>=7?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.calDC||0)));if(cn){me.coins+=cn;me.calDC=(me.calDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت البوت ':my===bt?'🤝 تعادل ':'🤖 البوت كسب ')+my+':'+bt+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const ans=v=>{if(over)return;const ok=v===cur.r;const bok=Math.random()<0.7;if(ok)my++;if(bok)bt++;
  msg=cur.txt+' = '+cur.r+' · أنت '+(ok?'✅':'❌')+' · 🤖 '+(bok?'✅':'❌');sfx(ok?'star':'err');q++;if(q>=7){fin();return}mk();paint()};
 mk();
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🧮 حساب سريع ضد 🤖</h2><div id="mqS" style="text-align:center;font-size:15px;margin:4px"></div><div id="mqQ" style="text-align:center;font-size:30px;font-weight:bold;margin:8px 0;direction:ltr"></div><div id="mqA" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap"></div><div id="mqM" style="text-align:center;font-size:13px;margin:8px 0;min-height:3.2em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="mqX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('mqS'))return;$('mqS').textContent='مسألة '+Math.min(q+1,7)+'/7 · أنت '+my+' : '+bt+' 🤖';$('mqQ').textContent=over?'':cur.txt+' = ؟';$('mqM').textContent=msg;const A=$('mqA');A.innerHTML='';if(!over)cur.arr.forEach(v=>{const b=document.createElement('button');b.className='btn';b.dataset.v=v;b.textContent=v;b.style.cssText='width:auto!important;display:inline-block!important;min-width:64px;font-size:20px';A.appendChild(b)})};
  $('mqA').onclick=e=>{const b=e.target.closest('button');if(b)ans(+b.dataset.v)};
  $('mqX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildBjk(){
 const g=indoor(0x2b8a3e,0xebfbee,0x8ce99a);
 sign(g,'🃏 واحد وعشرين ضد 🤖',0,4.6,-7.6,'rgba(43,138,62,.92)');
 g.add(mesh(G.cyl(1.8,1.8,0.12,16),0x2b8a3e,0,0.8,-4.8),mesh(G.cyl(0.15,0.15,0.8,6),0x5c3d2e,0,0.4,-4.8));
 [[-0.8,0],[0,0.2],[0.8,0.4]].forEach(a=>g.add(mesh(G.box(0.5,0.03,0.7),0xffffff,a[0],0.9,-4.8+a[1])));
 bjkh={it:{x:0,z:0.2,label:'🃏 العب واحد وعشرين',fn:bjkStart}};interacts.push(bjkh.it);
 g.add(portalMesh('ارجع للحساب السريع',5.8,5.8,0xf08c00,'calroom'));
 g.add(portalMesh('معركة السفن',-5.8,5.8,0x1864ab,'shproom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🃏 قرّب من 21 من غير ما تعدّي. الموزّع 🤖 بيسحب لحد 17. 3 جولات',3400)
}
function bjkStart(){
 const draw=()=>{const v=1+Math.floor(Math.random()*13);return v};
 const val=h=>{let s=0,a=0;h.forEach(c=>{if(c===1){a++;s+=11}else s+=c>10?10:c});while(s>21&&a>0){s-=10;a--}return s};
 const nm=c=>c===1?'A':c===11?'J':c===12?'Q':c===13?'K':''+c;
 let P=[],D=[],rd=1,my=0,bt=0,over=false,msg='',done=false;
 const deal=()=>{P=[draw(),draw()];D=[draw(),draw()];done=false};
 deal();
 window.bjkq=()=>({P:P.slice(),D:D.slice(),rd,my,bt,over,done,msg,val,set:(p,d)=>{P=p.slice();D=d.slice()},hit:()=>hit(),stand:()=>stand(),next:()=>nextRound()});
 let paint=()=>{};
 const fin=()=>{over=true;me.bjkGames=(me.bjkGames||0)+1;const win=my>bt;if(win)me.bjkBest=(me.bjkBest||0)+1;const dd=today();if(me.bjkDD!==dd){me.bjkDD=dd;me.bjkDC=0}
  let cn=win?(bt===0?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.bjkDC||0)));if(cn){me.coins+=cn;me.bjkDC=(me.bjkDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت الموزّع ':my===bt?'🤝 تعادل ':'🤖 الموزّع كسب ')+my+':'+bt+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const endRound=r=>{done=true;const a=val(P),b=val(D);if(r>0)my++;else if(r<0)bt++;msg='جولة '+rd+': أنت '+a+' · 🤖 '+b+' · '+(r>0?'✅ كسبت':r<0?'❌ خسرت':'🤝 تعادل');sfx(r>0?'star':r<0?'err':'tick');if(rd>=3)fin();else paint()};
 const hit=()=>{if(over||done)return;P.push(draw());sfx('place');if(val(P)>21){endRound(-1);return}paint()};
 const stand=()=>{if(over||done)return;while(val(D)<17)D.push(draw());const a=val(P),b=val(D);endRound(b>21||a>b?1:a<b?-1:0)};
 const nextRound=()=>{if(!done||over)return;rd++;deal();msg='';paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🃏 واحد وعشرين ضد 🤖</h2><div id="bjS" style="text-align:center;font-size:15px;margin:4px"></div><div id="bjD" style="text-align:center;font-size:18px;margin:6px 0;direction:ltr"></div><div id="bjP" style="text-align:center;font-size:20px;font-weight:bold;margin:6px 0;direction:ltr"></div><div id="bjM" style="text-align:center;font-size:13px;margin:6px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="bjH" style="width:auto!important;display:inline-block!important">اسحب</button><button class="btn" id="bjT" style="width:auto!important;display:inline-block!important">كفاية</button><button class="btn" id="bjN" style="width:auto!important;display:inline-block!important">الجولة الجاية ▶</button><button class="btn d" id="bjX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('bjS'))return;$('bjS').textContent='جولة '+Math.min(rd,3)+'/3 · أنت '+my+' : '+bt+' 🤖';
   $('bjD').textContent='🤖 '+(done?D.map(nm).join(' ')+' = '+val(D):nm(D[0])+' ?');$('bjP').textContent='أنت '+P.map(nm).join(' ')+' = '+val(P);$('bjM').textContent=msg;
   $('bjH').style.display=$('bjT').style.display=done?'none':'inline-block';$('bjN').style.display=(done&&!over)?'inline-block':'none'};
  $('bjH').onclick=hit;$('bjT').onclick=stand;$('bjN').onclick=nextRound;
  $('bjX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildShp(){
 const g=indoor(0x1864ab,0xe7f5ff,0xa5d8ff);
 sign(g,'🚢 معركة السفن ضد 🤖',0,4.6,-7.6,'rgba(24,100,171,.92)');
 g.add(mesh(G.box(3.2,0.12,3.2),0x1c7ed6,0,0.5,-4.8),mesh(G.box(1.1,0.35,0.5),0x495057,0,0.78,-4.8),mesh(G.box(0.12,0.7,0.12),0x868e96,0,1.2,-4.8));
 shph={it:{x:0,z:0.2,label:'🚢 العب معركة السفن',fn:shpStart}};interacts.push(shph.it);
 g.add(portalMesh('ارجع لواحد وعشرين',5.8,5.8,0x2b8a3e,'bjkroom'));
 g.add(portalMesh('كمّل الكلمة',-5.8,5.8,0x5f3dc4,'hgmroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🚢 ٤ سفن مخبّية في شبكة 5×5. اضرب بالدور مع البوت 🤖، أول واحد يغرّق ٤ يكسب',3600)
}
function shpStart(){
 const N=25,K=4;
 const place=()=>{const s=new Set();while(s.size<K)s.add(Math.floor(Math.random()*N));return s};
 let mine=place(),bots=place(),shotMe=new Set(),shotBot=new Set(),hitMe=0,hitBot=0,over=false,msg='';
 window.shpq=()=>({mine:[...mine],bots:[...bots],hitMe,hitBot,over,msg,fire:i=>fire(i)});
 let paint=()=>{};
 const fin=win=>{over=true;me.shpGames=(me.shpGames||0)+1;if(win)me.shpBest=(me.shpBest||0)+1;const dd=today();if(me.shpDD!==dd){me.shpDD=dd;me.shpDC=0}
  let cn=win?(shotMe.size<=12?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.shpDC||0)));if(cn){me.coins+=cn;me.shpDC=(me.shpDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 غرّقت أسطول البوت! ':'🤖 البوت غرّق أسطولك. ')+(cn?'+'+cn+'🪙':'');saveMe();paint()};
 const fire=i=>{if(over||shotMe.has(i))return;shotMe.add(i);const h=bots.has(i);if(h)hitMe++;msg='ضربتك: '+(h?'💥 صابت':'🌊 غلط');sfx(h?'star':'tick');
  if(hitMe>=K){fin(true);return}
  let j;const un=[];for(let k=0;k<N;k++)if(!shotBot.has(k))un.push(k);
  const near=[];shotBot.forEach(s=>{if(mine.has(s)){[s-1,s+1,s-5,s+5].forEach(n=>{if(n>=0&&n<N&&!shotBot.has(n)&&Math.abs((n%5)-(s%5))<=1)near.push(n)})}});
  j=near.length&&Math.random()<0.8?near[Math.floor(Math.random()*near.length)]:un[Math.floor(Math.random()*un.length)];
  shotBot.add(j);const bh=mine.has(j);if(bh)hitBot++;msg+=' · 🤖: '+(bh?'💥 صابت':'🌊 غلط');
  if(hitBot>=K){fin(false);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🚢 معركة السفن ضد 🤖</h2><div id="sqS" style="text-align:center;font-size:14px;margin:4px"></div><div style="display:flex;gap:14px;justify-content:center;align-items:flex-start;flex-wrap:wrap"><div><div style="text-align:center;font-size:12px">🎯 شبكة البوت (اضرب)</div><div id="sqB" style="display:grid;grid-template-columns:repeat(5,auto);gap:3px;direction:ltr;margin-top:4px;justify-content:center"></div></div><div><div style="text-align:center;font-size:12px">🚢 سفنك</div><div id="sqY" style="display:grid;grid-template-columns:repeat(5,auto);gap:2px;direction:ltr;margin-top:4px;justify-content:center"></div></div></div><div id="sqM" style="text-align:center;font-size:13px;margin:6px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="sqX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('sqS'))return;const cs=innerHeight<420?19:34,cy=innerHeight<420?13:22;$('sqS').textContent='أنت '+hitMe+'/'+K+' · 🤖 '+hitBot+'/'+K;const B=$('sqB'),Y=$('sqY');B.innerHTML='';Y.innerHTML='';
   for(let i=0;i<N;i++){const b=document.createElement('button');b.className='btn';b.dataset.i=i;const s=shotMe.has(i);b.textContent=s?(bots.has(i)?'💥':'•'):'';b.style.cssText='width:'+cs+'px!important;min-width:0!important;min-height:0!important;line-height:1!important;height:'+cs+'px!important;padding:0;margin:0;box-sizing:border-box;font-size:'+(cs>30?16:12)+'px;'+(s?(bots.has(i)?'background:#c92a2a;':'background:#364fc7;'):'');B.appendChild(b);
    const d=document.createElement('div');const sh=shotBot.has(i);d.textContent=mine.has(i)?(sh?'💥':'🚢'):(sh?'•':'');d.style.cssText='width:'+cy+'px;height:'+cy+'px;font-size:'+(cy>20?12:9)+'px;text-align:center;line-height:'+cy+'px;border-radius:4px;background:'+(mine.has(i)?(sh?'#c92a2a':'#495057'):(sh?'#364fc7':'#1c2541'));Y.appendChild(d)}
   $('sqM').textContent=msg};
  $('sqB').onclick=e=>{const b=e.target.closest('button');if(b)fire(+b.dataset.i)};
  $('sqX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildHgm(){
 const g=indoor(0x5f3dc4,0xf3f0ff,0xd0bfff);
 sign(g,'🔤 كمّل الكلمة ضد 🤖',0,4.6,-7.6,'rgba(95,61,196,.92)');
 for(let k=0;k<5;k++)g.add(mesh(G.box(0.55,0.7,0.12),k%2?0x7048e8:0xb197fc,-1.6+k*0.8,0.9,-4.8));
 g.add(mesh(G.box(0.2,0.55,0.2),0x5c3d2e,-1.9,0.28,-4.8),mesh(G.box(0.2,0.55,0.2),0x5c3d2e,1.9,0.28,-4.8));
 hgmh={it:{x:0,z:0.2,label:'🔤 العب كمّل الكلمة',fn:hgmStart}};interacts.push(hgmh.it);
 g.add(portalMesh('ارجع لمعركة السفن',5.8,5.8,0x1864ab,'shproom'));
 g.add(portalMesh('لعبة الخنزير',-5.8,5.8,0xe64980,'pigroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔤 كلمة مخبّية. اختار حرف بالدور مع البوت 🤖، اللي يكشف آخر حرف يكسب',3600)
}
function hgmStart(){
 const WS=['كتاب','قمر','شمس','نهر','جبل','بحر','نجم','حصان','خروف','دجاج','ثعلب','بطيخ','تفاح','برتقال','عصير','قلم','مفتاح','طبيب','مطر','ورد'];
 const AL='ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');
 const COM='الميونرتبسكد'.split('');
 let w=WS[Math.floor(Math.random()*WS.length)],used=new Set(),miss=0,over=false,msg='',forced=null;
 const done=()=>w.split('').every(c=>used.has(c));
 window.hgmq=()=>({w,used:[...used],miss,over,msg,set:x=>{w=x},force:l=>{forced=l},pick:l=>pick(l)});
 let paint=()=>{};
 const fin=win=>{over=true;me.hgmGames=(me.hgmGames||0)+1;if(win)me.hgmBest=(me.hgmBest||0)+1;const dd=today();if(me.hgmDD!==dd){me.hgmDD=dd;me.hgmDC=0}
  let cn=win?(miss<=3?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.hgmDC||0)));if(cn){me.coins+=cn;me.hgmDC=(me.hgmDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كشفت آخر حرف! ':'🤖 البوت كشف آخر حرف. ')+'الكلمة: '+w+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botPick=()=>{if(forced){const f=forced;forced=null;return f}const left=AL.filter(c=>!used.has(c));const cm=left.filter(c=>COM.includes(c));const pool=cm.length&&Math.random()<0.6?cm:left;return pool[Math.floor(Math.random()*pool.length)]};
 const pick=l=>{if(over||used.has(l))return;used.add(l);const hit=w.includes(l);if(!hit)miss++;msg='أنت: '+l+(hit?' ✅':' ❌');sfx(hit?'star':'tick');
  if(done()){fin(true);return}
  let b=botPick();if(!b||used.has(b)){const left=AL.filter(c=>!used.has(c));b=left[0]}used.add(b);const bh=w.includes(b);msg+=' · 🤖: '+b+(bh?' ✅':' ❌');
  if(done()){fin(false);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🔤 كمّل الكلمة ضد 🤖</h2><div id="hgS" style="text-align:center;font-size:14px;margin:4px"></div><div id="hgW" style="text-align:center;font-size:30px;letter-spacing:6px;font-weight:bold;margin:6px 0"></div><div id="hgK" style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;direction:rtl;margin:6px 0"></div><div id="hgM" style="text-align:center;font-size:13px;margin:4px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="hgX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('hgS'))return;const sm=innerHeight<420,cs=sm?30:38;$('hgS').textContent='كلمة من '+w.length+' حروف · غلطاتك '+miss;$('hgW').textContent=w.split('').map(c=>used.has(c)||over?c:'_').join(' ');
   const K=$('hgK');K.innerHTML='';AL.forEach(l=>{const b=document.createElement('button');b.className='btn';b.dataset.l=l;b.textContent=l;const u=used.has(l);b.style.cssText='width:'+cs+'px!important;min-width:0!important;min-height:0!important;height:'+(cs-4)+'px!important;line-height:1!important;padding:0;margin:0;font-size:16px;'+(u?(w.includes(l)?'background:#2b8a3e;':'background:#495057;opacity:.5;'):'');b.disabled=u||over;K.appendChild(b)});$('hgM').textContent=msg};
  $('hgK').onclick=e=>{const b=e.target.closest('button');if(b)pick(b.dataset.l)};
  $('hgX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildPig(){
 const g=indoor(0xe64980,0xfff0f6,0xfaa2c1);
 sign(g,'🐷 لعبة الخنزير ضد 🤖',0,4.6,-7.6,'rgba(230,73,128,.92)');
 g.add(mesh(G.sph(0.7,8),0xfaa2c1,0,0.9,-4.8),mesh(G.box(0.4,0.3,0.3),0xf783ac,0,0.85,-4.2),mesh(G.sph(0.15,5),0x212529,-0.25,1.1,-4.3),mesh(G.sph(0.15,5),0x212529,0.25,1.1,-4.3));
 pigh={it:{x:0,z:0.2,label:'🐷 العب الخنزير',fn:pigStart}};interacts.push(pigh.it);
 g.add(portalMesh('ارجع لكمّل الكلمة',5.8,5.8,0x5f3dc4,'hgmroom'));
 g.add(portalMesh('مانكالا',-5.8,5.8,0x8c5a2b,'mnkroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🐷 ارمي النرد واجمع. لو طلع 1 تخسر دورك. "احفظ" يثبّت نقطك. أول واحد لـ40 يكسب',3800)
}
function pigStart(){
 const GOAL=40,rl=()=>1+Math.floor(Math.random()*6);
 let my=0,bt=0,turn=0,over=false,msg='',last=0,forced=null;
 window.pigq=()=>({my,bt,turn,over,msg,last,force:a=>{forced=a.slice()},roll:()=>roll(),hold:()=>hold()});
 let paint=()=>{};
 const nextRoll=()=>{if(forced&&forced.length)return forced.shift();return rl()};
 const fin=win=>{over=true;me.pigGames=(me.pigGames||0)+1;if(win)me.pigBest=(me.pigBest||0)+1;const dd=today();if(me.pigDD!==dd){me.pigDD=dd;me.pigDC=0}
  let cn=win?(bt<=15?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.pigDC||0)));if(cn){me.coins+=cn;me.pigDC=(me.pigDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت البوت! ':'🤖 البوت كسب. ')+my+':'+bt+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botTurn=()=>{let t=0,log='';while(true){const d=nextRoll();if(d===1){log+=' 🎲1 💥';t=0;break}t+=d;log+=' '+d;if(t>=12||bt+t>=GOAL)break}
  bt+=t;msg+=' · 🤖:'+log+(t?' ← حفظ '+t:' ← خسر دوره');if(bt>=GOAL){fin(false);return}turn=0;last=0;paint()};
 let cur=0;
 const roll=()=>{if(over||turn!==0)return;const d=nextRoll();last=d;sfx('tick');
  if(d===1){cur=0;msg='🎲 1! خسرت دورك 💥';turn=1;paint();setTimeout(()=>{if(!$('pzS')&&!over)return;botTurn()},700);return}
  cur+=d;msg='🎲 '+d+' · الدور: '+cur;paint()};
 const hold=()=>{if(over||turn!==0||cur===0)return;my+=cur;msg='حفظت '+cur;cur=0;sfx('place');if(my>=GOAL){fin(true);return}turn=1;paint();setTimeout(()=>{if(!over)botTurn()},700)};
 window.pigq=()=>({my,bt,turn,over,msg,cur,force:a=>{forced=a.slice()},roll,hold,bot:()=>{if(turn===1)botTurn()}});
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🐷 لعبة الخنزير ضد 🤖</h2><div id="pzS" style="text-align:center;font-size:15px;margin:4px"></div><div id="pzD" style="text-align:center;font-size:40px;font-weight:bold;margin:6px 0;min-height:1.2em"></div><div id="pzM" style="text-align:center;font-size:13px;margin:6px 0;min-height:3.2em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="pzR" style="width:auto!important;display:inline-block!important">🎲 ارمي</button><button class="btn" id="pzH" style="width:auto!important;display:inline-block!important">💾 احفظ</button><button class="btn d" id="pzX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('pzS'))return;$('pzS').textContent='أنت '+my+' : '+bt+' 🤖 · الهدف '+GOAL+' · دورك '+cur;$('pzD').textContent=last||'';$('pzM').textContent=msg;$('pzR').disabled=over||turn!==0;$('pzH').disabled=over||turn!==0||cur===0};
  $('pzR').onclick=roll;$('pzH').onclick=hold;
  $('pzX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildMnk(){
 const g=indoor(0x8c5a2b,0xfff4e6,0xe8c9a0);
 sign(g,'🕳️ مانكالا ضد 🤖',0,4.6,-7.6,'rgba(140,90,43,.92)');
 g.add(mesh(G.box(3.4,0.35,1.2),0x8c5a2b,0,0.6,-4.8));
 for(let k=0;k<6;k++)g.add(mesh(G.cyl(0.18,0.18,0.1,8),0x5c3d2e,-1.25+k*0.5,0.8,-4.95),mesh(G.cyl(0.18,0.18,0.1,8),0x5c3d2e,-1.25+k*0.5,0.8,-4.65));
 g.add(mesh(G.cyl(0.25,0.25,0.1,8),0x3b2314,-1.9,0.8,-4.8),mesh(G.cyl(0.25,0.25,0.1,8),0x3b2314,1.9,0.8,-4.8));
 mnkh={it:{x:0,z:0.2,label:'🕳️ العب مانكالا',fn:mnkStart}};interacts.push(mnkh.it);
 g.add(portalMesh('ارجع للعبة الخنزير',5.8,5.8,0xe64980,'pigroom'));
 g.add(portalMesh('ريفيرسي',-5.8,5.8,0x2b8a3e,'rvsroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🕳️ مانكالا: وزّع الحصى عكس عقارب الساعة. لو آخر حصاة في مخزنك العب تاني. أنت تحت والبوت 🤖 فوق',4200)
}
function mnkStart(){
 let b,turn=0,over=false,msg='',hint='';
 const init=()=>{b=[4,4,4,4,4,4,0,4,4,4,4,4,4,0]};init();
 const mineSide=i=>i>=0&&i<=5,botSide=i=>i>=7&&i<=12;
 const sow=(st,i,who)=>{let n=st[i];st[i]=0;let p=i,last=i;while(n>0){p=(p+1)%14;if(who===0&&p===13)continue;if(who===1&&p===6)continue;st[p]++;n--;last=p}
  const store=who===0?6:13;let extra=last===store,cap=0;
  if(!extra&&st[last]===1&&(who===0?mineSide(last):botSide(last))&&st[12-last]>0){cap=st[12-last]+1;st[store]+=cap;st[last]=0;st[12-last]=0}
  return{extra,cap}};
 const side=(st,who)=>who===0?st.slice(0,6).reduce((a,c)=>a+c,0):st.slice(7,13).reduce((a,c)=>a+c,0);
 const checkEnd=()=>{if(side(b,0)===0||side(b,1)===0){for(let i=0;i<6;i++){b[6]+=b[i];b[i]=0;b[13]+=b[7+i];b[7+i]=0}return true}return false};
 window.mnkq=()=>({b:b.slice(),turn,over,msg,set:a=>{b=a.slice()},play:i=>play(i)});
 let paint=()=>{};
 const fin=()=>{over=true;const m=b[6],t=b[13],win=m>t;me.mnkGames=(me.mnkGames||0)+1;if(win)me.mnkBest=(me.mnkBest||0)+1;const dd=today();if(me.mnkDD!==dd){me.mnkDD=dd;me.mnkDC=0}
  let cn=win?(m-t>=8?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.mnkDC||0)));if(cn){me.coins+=cn;me.mnkDC=(me.mnkDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت! ':m===t?'🤝 تعادل ':'🤖 البوت كسب ')+m+':'+t+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botMove=()=>{const opts=[];for(let i=7;i<=12;i++)if(b[i]>0)opts.push(i);let best=-1,bs=-1e9;opts.forEach(i=>{const t=b.slice();const r=sow(t,i,1);let s=t[13]-b[13]+(r.extra?3:0)+Math.random()*1.5;if(s>bs){bs=s;best=i}});return best};
 const botTurn=()=>{let log='';let guard=0;while(!over&&guard++<10){const i=botMove();if(i<0)break;const r=sow(b,i,1);log+=' '+(13-i)+(r.cap?'(أكل '+r.cap+')':'');if(checkEnd()){fin();return}if(!r.extra)break;log+=' +'}
  msg+=' · 🤖 لعب حفرة'+log;turn=0};
 const play=i=>{if(over||turn!==0||!mineSide(i)||b[i]===0)return;const r=sow(b,i,0);msg='لعبت '+(i+1)+(r.cap?' (أكلت '+r.cap+')':'')+(r.extra?' ← العب تاني':'');sfx(r.cap?'star':'place');
  if(checkEnd()){fin();return}
  if(r.extra){paint();return}
  turn=1;botTurn();if(over)return;if(side(b,0)===0){checkEnd();fin();return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🕳️ مانكالا ضد 🤖</h2><div id="mkS" style="text-align:center;font-size:14px;margin:2px"></div><div style="display:flex;justify-content:center;align-items:center;gap:6px;direction:ltr;margin:6px 0"><div id="mkB" style="text-align:center"></div><div><div id="mkT" style="display:flex;gap:4px;margin-bottom:6px"></div><div id="mkY" style="display:flex;gap:4px"></div></div><div id="mkU" style="text-align:center"></div></div><div id="mkM" style="text-align:center;font-size:13px;margin:4px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="mkX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('mkS'))return;const sm=innerHeight<420,cs=sm?32:42,ss=sm?40:52;$('mkS').textContent='🤖 '+b[13]+' · أنت '+b[6]+(turn===0&&!over?' · دورك':'');
   const pit=(n,clk,i,mine)=>{const e=document.createElement('button');e.className='btn';e.textContent=n;if(i!==undefined)e.dataset.i=i;e.style.cssText='width:'+cs+'px!important;min-width:0!important;min-height:0!important;height:'+cs+'px!important;line-height:1!important;padding:0;margin:0;border-radius:50%;font-size:16px;'+(mine?(n>0&&!over?'background:#8c5a2b;':'background:#5c3d2e;opacity:.6;'):'background:#495057;');e.disabled=!mine||n===0||over;return e};
   const T=$('mkT'),Y=$('mkY');T.innerHTML='';Y.innerHTML='';for(let i=12;i>=7;i--)T.appendChild(pit(b[i],0,undefined,false));for(let i=0;i<6;i++)Y.appendChild(pit(b[i],0,i,true));
   const st=(n,l)=>'<div style="width:'+ss*0.7+'px;height:'+(cs*2+10)+'px;border-radius:14px;background:#3b2314;color:#fff;font-size:18px;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:10px">'+l+'</div>'+n+'</div>';
   $('mkB').innerHTML=st(b[13],'🤖');$('mkU').innerHTML=st(b[6],'أنت');$('mkM').textContent=msg};
  $('mkY').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.i!==undefined)play(+x.dataset.i)};
  $('mkX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildRvs(){
 const g=indoor(0x2b8a3e,0xf1fff4,0xb8e0c0);
 sign(g,'⚫ ريفيرسي ضد 🤖',0,4.6,-7.6,'rgba(43,138,62,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0x2b8a3e,0,0.55,-4.8));
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)g.add(mesh(G.cyl(0.2,0.2,0.08,12),(a+b)%2?0x212529:0xf1f3f5,-1.05+a*0.7,0.74,-5.85+b*0.7));
 rvh={it:{x:0,z:0.2,label:'⚫ العب ريفيرسي',fn:rvsStart}};interacts.push(rvh.it);
 g.add(portalMesh('ارجع لمانكالا',5.8,5.8,0x8c5a2b,'mnkroom'));
 g.add(portalMesh('نقط ومربعات',-5.8,5.8,0xf08c00,'dbxroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('⚫ ريفيرسي: حط قطعتك بحيث تحاصر قطع البوت 🤖 فتتقلب لونك. الأكتر قطع يكسب. أنت الفاتح',4200)
}
function rvsStart(){
 const N=6;let b,turn=0,over=false,msg='';
 const init=()=>{b=Array(36).fill(0);b[14]=2;b[21]=2;b[15]=1;b[20]=1};init();
 const D=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
 const flips=(st,i,w)=>{if(st[i])return[];const r=(i/N)|0,c=i%N,o=3-w,out=[];
  D.forEach(d=>{let y=r+d[0],x=c+d[1];const tmp=[];while(y>=0&&y<N&&x>=0&&x<N&&st[y*N+x]===o){tmp.push(y*N+x);y+=d[0];x+=d[1]}
   if(tmp.length&&y>=0&&y<N&&x>=0&&x<N&&st[y*N+x]===w)out.push(...tmp)});return out};
 const moves=(st,w)=>{const m=[];for(let i=0;i<36;i++)if(flips(st,i,w).length)m.push(i);return m};
 const cnt=w=>b.filter(v=>v===w).length;
 const put=(i,w)=>{const f=flips(b,i,w);b[i]=w;f.forEach(k=>b[k]=w);return f.length};
 window.rvq=()=>({b:b.slice(),turn,over,msg,set:(a,t)=>{b=a.slice();turn=t||0},play:i=>play(i),moves:()=>moves(b,1)});
 let paint=()=>{};
 const fin=()=>{over=true;const m=cnt(1),t=cnt(2),win=m>t;me.rvsGames=(me.rvsGames||0)+1;if(win)me.rvsBest=(me.rvsBest||0)+1;const dd=today();if(me.rvsDD!==dd){me.rvsDD=dd;me.rvsDC=0}
  let cn=win?(m-t>=10?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.rvsDC||0)));if(cn){me.coins+=cn;me.rvsDC=(me.rvsDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت! ':m===t?'🤝 تعادل ':'🤖 البوت كسب ')+m+':'+t+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const W=i=>{const r=(i/N)|0,c=i%N,e=(r===0||r===N-1),f=(c===0||c===N-1);return e&&f?10:(e||f?2:0)};
 const botTurn=()=>{let log=0,guard=0;while(!over&&guard++<40){const m=moves(b,2);if(!m.length)break;let best=m[0],bs=-1e9;m.forEach(i=>{const s=flips(b,i,2).length+W(i)*2+Math.random()*1.5;if(s>bs){bs=s;best=i}});put(best,2);log++;msg+=' · 🤖 لعب '+(((best/N)|0)+1)+'،'+((best%N)+1);if(moves(b,1).length)break}
  if(!log)msg+=' · 🤖 مفيش حركة'};
 const endCheck=()=>{if(!moves(b,1).length&&!moves(b,2).length){fin();return true}return false};
 const play=i=>{if(over||turn!==0||!flips(b,i,1).length)return;const n=put(i,1);msg='قلبت '+n;sfx('place');
  if(endCheck())return;
  if(moves(b,2).length){botTurn();if(endCheck())return}else msg+=' · 🤖 مفيش حركة';
  if(!moves(b,1).length){msg+=' · مفيش حركة ليك';let g=0;while(!moves(b,1).length&&g++<40){if(!moves(b,2).length)break;botTurn()}if(endCheck())return}
  paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">⚫ ريفيرسي ضد 🤖</h2><div id="rvS" style="text-align:center;font-size:14px;margin:2px"></div><div id="rvB" style="display:grid;grid-template-columns:repeat(6,auto);gap:3px;justify-content:center;direction:ltr;margin:6px auto"></div><div id="rvM" style="text-align:center;font-size:13px;margin:4px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="rvX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('rvB'))return;const sm=innerHeight<420,cs=sm?26:44,lg=moves(b,1);$('rvS').textContent='🤖 '+cnt(2)+' · أنت '+cnt(1)+(!over?' · دورك':'');
   const B=$('rvB');B.innerHTML='';for(let i=0;i<36;i++){const e=document.createElement('button');e.className='btn';e.dataset.i=i;const ok=!over&&lg.includes(i);
    e.style.cssText='width:'+cs+'px!important;min-width:0!important;min-height:0!important;height:'+cs+'px!important;line-height:1!important;padding:0;margin:0;border-radius:6px;background:#2b8a3e;position:relative;'+(ok?'outline:2px solid #ffd43b;':'');e.disabled=!ok;
    if(b[i]){const d=document.createElement('div');d.style.cssText='position:absolute;inset:'+(sm?3:5)+'px;border-radius:50%;background:'+(b[i]===1?'#f1f3f5':'#212529')+';box-shadow:0 1px 3px #0008';e.appendChild(d)}B.appendChild(e)}
   $('rvM').textContent=msg};
  $('rvB').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.i!==undefined)play(+x.dataset.i)};
  $('rvX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildDbx(){
 const g=indoor(0xf08c00,0xfff9e6,0xffe8a8);
 sign(g,'🔲 نقط ومربعات ضد 🤖',0,4.6,-7.6,'rgba(240,140,0,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0xfff3bf,0,0.55,-4.8));
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)g.add(mesh(G.cyl(0.1,0.1,0.12,8),0x343a40,-1.05+a*0.7,0.74,-5.85+b*0.7));
 dbxh={it:{x:0,z:0.2,label:'🔲 العب نقط ومربعات',fn:dbxStart}};interacts.push(dbxh.it);
 g.add(portalMesh('ارجع لريفيرسي',5.8,5.8,0x2b8a3e,'rvsroom'));
 g.add(portalMesh('كسر الكود',-5.8,5.8,0x7048e8,'mmdroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔲 نقط ومربعات: وصّل نقطتين بخط. اللي يقفل مربع ياخده ويلعب تاني. الأكتر مربعات يكسب (أنت الأصفر)',4200)
}
function dbxStart(){
 const R=4;let H,V,own,turn=0,over=false,msg='';
 const init=()=>{H=Array(20).fill(0);V=Array(20).fill(0);own=Array(16).fill(0)};init();
 const sides=k=>{const r=(k/R)|0,c=k%R;return[['h',r*4+c],['h',(r+1)*4+c],['v',r*5+c],['v',r*5+c+1]]};
 const arr=t=>t==='h'?H:V;
 const cntS=k=>sides(k).filter(s=>arr(s[0])[s[1]]).length;
 const take=(t,i,w)=>{arr(t)[i]=1;let n=0;for(let k=0;k<16;k++)if(!own[k]&&cntS(k)===4){own[k]=w;n++}return n};
 const sc=w=>own.filter(v=>v===w).length;
 const free=()=>{const a=[];for(let i=0;i<20;i++){if(!H[i])a.push(['h',i]);if(!V[i])a.push(['v',i])}return a};
 window.dbxq=()=>({H:H.slice(),V:V.slice(),own:own.slice(),turn,over,msg,set:(h,v,o)=>{H=h.slice();V=v.slice();own=o.slice()},play:(t,i)=>play(t,i),free:()=>free().length});
 let paint=()=>{};
 const fin=()=>{over=true;const m=sc(1),t=sc(2),win=m>t;me.dbxGames=(me.dbxGames||0)+1;if(win)me.dbxBest=(me.dbxBest||0)+1;const dd=today();if(me.dbxDD!==dd){me.dbxDD=dd;me.dbxDC=0}
  let cn=win?(m-t>=5?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.dbxDC||0)));if(cn){me.coins+=cn;me.dbxDC=(me.dbxDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت! ':m===t?'🤝 تعادل ':'🤖 البوت كسب ')+m+':'+t+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botPick=()=>{const f=free();let z=f.filter(e=>{arr(e[0])[e[1]]=1;let ok=false;for(let k=0;k<16;k++)if(!own[k]&&cntS(k)===4)ok=true;arr(e[0])[e[1]]=0;return ok});if(z.length)return z[0];
  const safe=f.filter(e=>{arr(e[0])[e[1]]=1;let bad=false;for(let k=0;k<16;k++)if(!own[k]&&cntS(k)===3)bad=true;arr(e[0])[e[1]]=0;return!bad});
  const L=safe.length?safe:f;return L[(Math.random()*L.length)|0]};
 const botTurn=()=>{let n=0,g=0;while(!over&&free().length&&g++<30){const e=botPick();const k=take(e[0],e[1],2);n+=k;if(own.every(v=>v)){break}if(!k)break}
  msg+=' · 🤖 '+(n?'أخد '+n:'لعب')};
 const play=(t,i)=>{if(over||turn!==0||arr(t)[i])return;const k=take(t,i,1);msg='لعبت'+(k?' وأخدت '+k+' ← العب تاني':'');sfx(k?'star':'place');
  if(own.every(v=>v)){fin();return}
  if(k){paint();return}
  botTurn();if(own.every(v=>v)){fin();return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🔲 نقط ومربعات ضد 🤖</h2><div id="dbS" style="text-align:center;font-size:14px;margin:2px"></div><div id="dbB" style="display:grid;justify-content:center;direction:ltr;margin:6px auto"></div><div id="dbM" style="text-align:center;font-size:13px;margin:4px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="dbX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('dbB'))return;const sm=innerHeight<420,d=sm?6:12,e=sm?18:44;$('dbS').textContent='🤖 '+sc(2)+' · أنت '+sc(1)+(!over?' · دورك':'');
   const B=$('dbB');B.innerHTML='';B.style.gridTemplateColumns=('0px '+d+'px').repeat(0)+[d,e,d,e,d,e,d,e,d].map(x=>x+'px').join(' ');B.style.gridTemplateRows=[d,e,d,e,d,e,d,e,d].map(x=>x+'px').join(' ');
   for(let r=0;r<9;r++)for(let c=0;c<9;c++){let x=document.createElement('div');
    if(r%2===0&&c%2===0){x.style.cssText='width:'+d+'px;height:'+d+'px;border-radius:50%;background:#e9ecef'}
    else if(r%2===1&&c%2===1){const k=((r-1)/2)*4+(c-1)/2;x.style.cssText='background:'+(own[k]===1?'#ffd43b':own[k]===2?'#868e96':'transparent')}
    else{const t=r%2===0?'h':'v',i=t==='h'?(r/2)*4+(c-1)/2:((r-1)/2)*5+c/2,tk=arr(t)[i];const b=document.createElement('button');b.className='btn';b.dataset.t=t;b.dataset.i=i;b.disabled=tk||over;
     b.style.cssText='width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;line-height:1!important;padding:0;margin:0;border-radius:4px;background:'+(tk?'#e9ecef':'#495057')+';opacity:'+(tk?1:.85);x=b}
    B.appendChild(x)}
   $('dbM').textContent=msg};
  $('dbB').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.t)play(x.dataset.t,+x.dataset.i)};
  $('dbX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildMmd(){
 const g=indoor(0x7048e8,0xf3f0ff,0xd0bfff);
 sign(g,'🎯 كسر الكود',0,4.6,-7.6,'rgba(112,72,232,.92)');
 g.add(mesh(G.box(3.2,0.3,2.2),0x7048e8,0,0.55,-4.8));
 [0xe03131,0x2f9e44,0x1971c2,0xf08c00,0x9c36b5,0x15aabf].forEach((c,k)=>g.add(mesh(G.cyl(0.22,0.22,0.1,12),c,-1.25+k*0.5,0.78,-4.8)));
 mmdh={it:{x:0,z:0.2,label:'🎯 العب كسر الكود',fn:mmdStart}};interacts.push(mmdh.it);
 g.add(portalMesh('ارجع لنقط ومربعات',5.8,5.8,0xf08c00,'dbxroom'));
 g.add(portalMesh('غمّر اللوحة',-5.8,5.8,0x1098ad,'fdiroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎯 كسر الكود: خمّن ٤ ألوان مخفية في ٨ محاولات. "تمام" = لون ومكان صح، "لون" = لون صح ومكان غلط',4200)
}
function mmdStart(){
 const COL=['#e03131','#2f9e44','#1971c2','#f08c00','#9c36b5','#15aabf'],MAX=8;
 let sec,hist,cur,over=false,msg='';
 const init=()=>{sec=[0,0,0,0].map(()=>(Math.random()*6)|0);hist=[];cur=[]};init();
 const score=(s,g)=>{let ex=0,sa=s.slice(),ga=g.slice();for(let i=0;i<4;i++)if(sa[i]===ga[i]){ex++;sa[i]=ga[i]=-1}let co=0;for(let i=0;i<4;i++)if(ga[i]>=0){const j=sa.indexOf(ga[i]);if(j>=0){co++;sa[j]=-2}}return[ex,co]};
 window.mmq=()=>({sec:sec.slice(),hist:hist.map(h=>h.slice()),cur:cur.slice(),over,msg,set:a=>{sec=a.slice()},pick:c=>pick(c),submit:()=>submit()});
 let paint=()=>{};
 const fin=win=>{over=true;me.mmdGames=(me.mmdGames||0)+1;if(win)me.mmdBest=(me.mmdBest||0)+1;const dd=today();if(me.mmdDD!==dd){me.mmdDD=dd;me.mmdDC=0}
  let cn=win?(hist.length<=4?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.mmdDC||0)));if(cn){me.coins+=cn;me.mmdDC=(me.mmdDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg=(win?'🏆 كسبت في '+hist.length+' محاولة':'خسرت. الكود كان: '+sec.map(v=>['أحمر','أخضر','أزرق','برتقالي','بنفسجي','تركواز'][v]).join(' '))+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const pick=c=>{if(over||cur.length>=4)return;cur.push(c);sfx('place');paint()};
 const submit=()=>{if(over||cur.length<4){msg='كمّل ٤ ألوان';paint();return}const sc=score(sec,cur);hist.push(cur.concat(sc));cur=[];msg='';if(sc[0]===4){fin(true);return}if(hist.length>=MAX){fin(false);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🎯 كسر الكود</h2><div id="mxS" style="text-align:center;font-size:14px;margin:2px"></div><div id="mxH" style="overflow:auto;direction:ltr;margin:4px auto;text-align:center"></div><div id="mxG" style="display:flex;gap:6px;justify-content:center;align-items:center;direction:ltr;margin:4px 0"></div><div id="mxP" style="display:flex;gap:5px;justify-content:center;direction:ltr"></div><div id="mxM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="mxX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const dot=(col,s)=>'<span style="display:inline-block;width:'+s+'px;height:'+s+'px;border-radius:50%;margin:0 2px;vertical-align:middle;background:'+(col===undefined?'#343a40':COL[col])+'"></span>';
  const bs=b=>{b.style.cssText+=';min-width:0!important;min-height:0!important;line-height:1!important;padding:0 8px;margin:0;width:auto!important;display:inline-block!important'};
  paint=()=>{if(!$('mxH'))return;const sm=innerHeight<420,ds=sm?12:20;$('mxS').textContent='محاولة '+Math.min(hist.length+1,MAX)+' من '+MAX;
   $('mxH').style.maxHeight=sm?'52px':'230px';
   $('mxH').innerHTML=hist.map(h=>'<div style="white-space:nowrap;font-size:'+(sm?11:13)+'px;line-height:'+(ds+4)+'px">'+h.slice(0,4).map(v=>dot(v,ds)).join('')+' <span style="direction:rtl;unicode-bidi:isolate"> تمام '+h[4]+' · لون '+h[5]+'</span></div>').join('');$('mxH').scrollTop=9999;
   $('mxG').innerHTML=[0,1,2,3].map(i=>dot(cur[i],sm?20:28)).join('')+'<button class="btn" id="mxD" style="height:'+(sm?24:34)+'px!important">⌫</button><button class="btn" id="mxK" style="height:'+(sm?24:34)+'px!important;background:#2f9e44">تأكيد</button>';
   ['mxD','mxK'].forEach(id=>bs($(id)));
   $('mxD').onclick=()=>{if(!over){cur.pop();paint()}};$('mxK').onclick=submit;
   $('mxP').innerHTML=COL.map((c,i)=>'<button class="btn" data-c="'+i+'" style="width:'+(sm?26:38)+'px!important;height:'+(sm?26:38)+'px!important;min-width:0!important;min-height:0!important;padding:0;margin:0;border-radius:50%;background:'+c+'"></button>').join('');
   $('mxM').textContent=msg};
  $('mxP').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.c!==undefined)pick(+x.dataset.c)};
  $('mxX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildFdi(){
 const g=indoor(0x1098ad,0xe3fafc,0x99e9f2);
 sign(g,'🌊 غمّر اللوحة',0,4.6,-7.6,'rgba(16,152,173,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0x1098ad,0,0.55,-4.8));
 const cc=[0xe03131,0x2f9e44,0x1971c2,0xf08c00,0x9c36b5,0xfab005];
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)g.add(mesh(G.box(0.6,0.1,0.6),cc[(a*2+b)%6],-1.05+a*0.7,0.74,-5.85+b*0.7));
 fdih={it:{x:0,z:0.2,label:'🌊 العب غمّر اللوحة',fn:fdiStart}};interacts.push(fdih.it);
 g.add(portalMesh('ارجع لكسر الكود',5.8,5.8,0x7048e8,'mmdroom'));
 g.add(portalMesh('خمسة في صف',-5.8,5.8,0xc2955a,'gmkroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🌊 غمّر اللوحة: ابدأ من الركن اللي فوق شمال واختار لون يغمّر الجيران. لوّن اللوحة كلها بلون واحد قبل ما الحركات تخلص',4200)
}
function fdiStart(){
 const N=8,COL=['#e03131','#2f9e44','#1971c2','#f08c00','#9c36b5','#fab005'],MAX=16;
 let gr,moves,over=false,msg='';
 const init=()=>{gr=Array(64).fill(0).map(()=>(Math.random()*6)|0);moves=0};init();
 const done=()=>gr.every(v=>v===gr[0]);
 const flood=c=>{const o=gr[0];if(o===c)return false;const st=[0],seen={0:1};while(st.length){const i=st.pop();gr[i]=c;const r=(i/N)|0,x=i%N;[[r-1,x],[r+1,x],[r,x-1],[r,x+1]].forEach(p=>{if(p[0]<0||p[0]>=N||p[1]<0||p[1]>=N)return;const j=p[0]*N+p[1];if(!seen[j]&&gr[j]===o){seen[j]=1;st.push(j)}})}return true};
 window.fdiq=()=>({gr:gr.slice(),moves,over,msg,set:a=>{gr=a.slice();moves=0},pick:c=>pick(c)});
 let paint=()=>{};
 const fin=win=>{over=true;me.fdiGames=(me.fdiGames||0)+1;if(win)me.fdiBest=(me.fdiBest||0)+1;const dd=today();if(me.fdiDD!==dd){me.fdiDD=dd;me.fdiDC=0}
  let cn=win?(moves<=11?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.fdiDC||0)));if(cn){me.coins+=cn;me.fdiDC=(me.fdiDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg=(win?'🏆 غمّرتها في '+moves+' حركة':'الحركات خلصت قبل ما تتغمّر')+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const pick=c=>{if(over)return;if(!flood(c)){msg='اختار لون تاني';paint();return}moves++;msg='';sfx('place');if(done()){fin(true);return}if(moves>=MAX){fin(false);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🌊 غمّر اللوحة</h2><div id="fiS" style="text-align:center;font-size:14px;margin:2px"></div><div id="fiB" style="display:grid;justify-content:center;direction:ltr;margin:4px auto;gap:1px"></div><div id="fiP" style="display:flex;gap:5px;justify-content:center;direction:ltr;margin-top:6px"></div><div id="fiM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="fiX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('fiB'))return;const sm=innerHeight<420,cs=sm?12:34,ps=sm?20:38;$('fiS').textContent='الحركات '+moves+' من '+MAX;
   const B=$('fiB');B.style.gridTemplateColumns='repeat(8,'+cs+'px)';B.innerHTML=gr.map(v=>'<div style="width:'+cs+'px;height:'+cs+'px;background:'+COL[v]+'"></div>').join('');
   $('fiP').innerHTML=COL.map((c,i)=>'<button class="btn" data-c="'+i+'" style="width:'+ps+'px!important;height:'+ps+'px!important;min-width:0!important;min-height:0!important;padding:0;margin:0;border-radius:50%;background:'+c+(over?';opacity:.4':'')+'"></button>').join('');
   $('fiM').textContent=msg};
  $('fiP').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.c!==undefined)pick(+x.dataset.c)};
  $('fiX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildGmk(){
 const g=indoor(0xc2955a,0xfff8ee,0xe9d3b0);
 sign(g,'⭕ خمسة في صف ضد 🤖',0,4.6,-7.6,'rgba(194,149,90,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0xd9a95b,0,0.55,-4.8));
 for(let a=0;a<5;a++){g.add(mesh(G.box(0.03,0.04,2.8),0x5c3d2e,-1.2+a*0.6,0.72,-4.8),mesh(G.box(2.8,0.04,0.03),0x5c3d2e,0,0.72,-6.0+a*0.6))}
 g.add(mesh(G.cyl(0.2,0.2,0.1,12),0xf1f3f5,-0.6,0.8,-5.4),mesh(G.cyl(0.2,0.2,0.1,12),0x212529,0.6,0.8,-4.2));
 gmkh={it:{x:0,z:0.2,label:'⭕ العب خمسة في صف',fn:gmkStart}};interacts.push(gmkh.it);
 g.add(portalMesh('ارجع لغمّر اللوحة',5.8,5.8,0x1098ad,'fdiroom'));
 g.add(portalMesh('داما',-5.8,5.8,0x5c3d2e,'damroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('⭕ خمسة في صف: كوّن ٥ قطع ورا بعض (أفقي أو رأسي أو قطري) قبل البوت 🤖. أنت الفاتح وبتبدأ',4200)
}
function gmkStart(){
 const N=9;let b,over=false,msg='',mv=0,last=-1;
 const init=()=>{b=Array(81).fill(0);mv=0;last=-1};init();
 const D=[[0,1],[1,0],[1,1],[1,-1]];
 const at=(r,c)=>r<0||r>=N||c<0||c>=N?-1:b[r*N+c];
 const line=(i,p,d)=>{const r=(i/N)|0,c=i%N;let n=1,open=0;for(const s of[1,-1]){let y=r+d[0]*s,x=c+d[1]*s;while(at(y,x)===p){n++;y+=d[0]*s;x+=d[1]*s}if(at(y,x)===0)open++}return[n,open]};
 const wins=(i,p)=>D.some(d=>line(i,p,d)[0]>=5);
 const val=(n,o)=>n>=5?100000:n===4?(o===2?10000:o===1?1000:0):n===3?(o===2?1000:o===1?100:0):n===2?(o===2?100:o===1?10:0):1;
 const sc=(i,p)=>D.reduce((a,d)=>{const l=line(i,p,d);return a+val(l[0],l[1])},0);
 window.gkq=()=>({b:b.slice(),over,msg,mv,set:a=>{b=a.slice()},play:i=>play(i)});
 let paint=()=>{};
 const fin=(w)=>{over=true;me.gmkGames=(me.gmkGames||0)+1;const win=w===1;if(win)me.gmkBest=(me.gmkBest||0)+1;const dd=today();if(me.gmkDD!==dd){me.gmkDD=dd;me.gmkDC=0}
  let cn=win?(mv<=12?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.gmkDC||0)));if(cn){me.coins+=cn;me.gmkDC=(me.gmkDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg=(win?'🏆 كسبت! خمسة ورا بعض':w===2?'🤖 البوت كسب':'🤝 تعادل')+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botMove=()=>{let best=-1,bs=-1;for(let i=0;i<81;i++){if(b[i])continue;const r=(i/N)|0,c=i%N;const near=Math.abs(r-4)+Math.abs(c-4);let s=sc(i,2)*1.1+sc(i,1)+Math.random()*3-near*0.1;if(wins(i,2)){b[i]=2;wins(i,2);b[i]=0}
   if(s>bs){bs=s;best=i}}return best};
 const full=()=>b.every(v=>v);
 const play=i=>{if(over||b[i])return;b[i]=1;mv++;last=i;sfx('place');if(wins(i,1)){msg='';fin(1);return}if(full()){fin(0);return}
  const j=botMove();b[j]=2;last=j;if(wins(j,2)){fin(2);return}if(full()){fin(0);return}msg='';paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">⭕ خمسة في صف ضد 🤖</h2><div id="gkS" style="text-align:center;font-size:14px;margin:2px"></div><div id="gkB" style="display:grid;justify-content:center;direction:ltr;margin:4px auto;gap:2px"></div><div id="gkM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="gkX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('gkB'))return;const sm=innerHeight<420,cs=sm?11:34;$('gkS').textContent='حركاتك '+mv+(!over?' · دورك':'');
   const B=$('gkB');B.style.gridTemplateColumns='repeat(9,'+cs+'px)';B.innerHTML='';
   for(let i=0;i<81;i++){const e=document.createElement('button');e.className='btn';e.dataset.i=i;e.disabled=over||!!b[i];
    e.style.cssText='width:'+cs+'px!important;height:'+cs+'px!important;min-width:0!important;min-height:0!important;line-height:1!important;padding:0;margin:0;border-radius:3px;background:#d9a95b;position:relative;'+(i===last?'outline:2px solid #e03131;':'');
    if(b[i]){const d=document.createElement('div');d.style.cssText='position:absolute;inset:'+(sm?1:4)+'px;border-radius:50%;background:'+(b[i]===1?'#f8f9fa':'#212529')+';box-shadow:0 1px 2px #0008';e.appendChild(d)}B.appendChild(e)}
   $('gkM').textContent=msg};
  $('gkB').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.i!==undefined)play(+x.dataset.i)};
  $('gkX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildDam(){
 const g=indoor(0x5c3d2e,0xfff4e6,0xd9b38c);
 sign(g,'♟️ داما ضد 🤖',0,4.6,-7.6,'rgba(92,61,46,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0xf1d9b5,0,0.55,-4.8));
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)if((a+b)%2)g.add(mesh(G.box(0.7,0.05,0.7),0x5c3d2e,-1.05+a*0.7,0.72,-5.85+b*0.7));
 g.add(mesh(G.cyl(0.22,0.22,0.15,12),0xf8f9fa,-0.35,0.82,-4.45),mesh(G.cyl(0.22,0.22,0.15,12),0x212529,0.35,0.82,-5.15));
 damh={it:{x:0,z:0.2,label:'♟️ العب داما',fn:damStart}};interacts.push(damh.it);
 g.add(portalMesh('ارجع لخمسة في صف',5.8,5.8,0xc2955a,'gmkroom'));
 g.add(portalMesh('سلم وثعبان',-5.8,5.8,0x37b24d,'snlroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('♟️ داما: حرّك قطعك قدّام بالقطر. الأكل إجباري، ولو وصلت آخر صف تبقى ملك (بتتحرك وتاكل في الاتجاهين). أنت الفاتح تحت',4200)
}
function damStart(){
 const N=6;let b,turn=0,over=false,msg='',sel=-1,chain=-1;
 const init=()=>{b=Array(36).fill(0);for(let r=0;r<2;r++)for(let c=0;c<N;c++)if((r+c)%2)b[r*N+c]=2;for(let r=4;r<6;r++)for(let c=0;c<N;c++)if((r+c)%2)b[r*N+c]=1};init();
 const side=v=>v===1||v===3?1:v===2||v===4?2:0;
 const dirs=v=>v===1?[[-1,-1],[-1,1]]:v===2?[[1,-1],[1,1]]:[[-1,-1],[-1,1],[1,-1],[1,1]];
 const pieceMoves=(st,i,jumpsOnly)=>{const v=st[i],s=side(v),r=(i/N)|0,c=i%N,out=[];
  dirs(v).forEach(d=>{const y=r+d[0],x=c+d[1];if(y<0||y>=N||x<0||x>=N)return;const t=st[y*N+x];
   if(t===0&&!jumpsOnly)out.push({f:i,t:y*N+x,cap:-1});
   else if(t&&side(t)!==s){const y2=y+d[0],x2=x+d[1];if(y2>=0&&y2<N&&x2>=0&&x2<N&&st[y2*N+x2]===0)out.push({f:i,t:y2*N+x2,cap:y*N+x})}});return out};
 const legal=(st,s,only)=>{let jumps=[],steps=[];for(let i=0;i<36;i++){if(only>=0&&i!==only)continue;if(side(st[i])!==s)continue;const m=pieceMoves(st,i,false);m.forEach(x=>(x.cap>=0?jumps:steps).push(x))}return jumps.length?jumps:(only>=0?[]:steps)};
 const apply=(st,m)=>{const v=st[m.f];st[m.f]=0;if(m.cap>=0)st[m.cap]=0;const r=(m.t/N)|0;let nv=v;let promo=false;if(v===1&&r===0){nv=3;promo=true}if(v===2&&r===N-1){nv=4;promo=true}st[m.t]=nv;return promo};
 const cnt=s=>b.filter(v=>side(v)===s).length;
 window.dmq=()=>({b:b.slice(),turn,over,msg,sel,chain,set:a=>{b=a.slice();sel=-1;chain=-1},play:(f,t)=>play(f,t),legal:()=>legal(b,1,chain).map(m=>m.f+'>'+m.t)});
 let paint=()=>{};
 const fin=win=>{over=true;me.damGames=(me.damGames||0)+1;if(win)me.damBest=(me.damBest||0)+1;const dd=today();if(me.damDD!==dd){me.damDD=dd;me.damDC=0}
  let cn=win?(cnt(1)>=4?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.damDC||0)));if(cn){me.coins+=cn;me.damDC=(me.damDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg=(win?'🏆 كسبت! ':'🤖 البوت كسب ')+cnt(1)+':'+cnt(2)+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botTurn=()=>{let ch=-1,g=0,caps=0;while(g++<12){const L=legal(b,2,ch);if(!L.length)break;let best=L[0],bs=-1e9;L.forEach(m=>{const t=b.slice();apply(t,m);const mat=t.filter(v=>side(v)===2).length-t.filter(v=>side(v)===1).length;const rep=legal(t,1,-1);const danger=rep.some(x=>x.cap>=0)?1.5:0;const adv=(m.t/N|0)*0.15;const s=mat*3-danger+adv+(b[m.f]>2?0.2:0)+Math.random()*0.8;if(s>bs){bs=s;best=m}});
   const promo=apply(b,best);if(best.cap>=0)caps++;if(best.cap>=0&&!promo&&legal(b,2,best.t).length){ch=best.t;continue}break}
  msg+=' · 🤖 لعب'+(caps?' وأكل '+caps:'')};
 const end=()=>{if(!cnt(2)||!legal(b,2,-1).length){fin(true);return true}if(!cnt(1)||!legal(b,1,-1).length){fin(false);return true}return false};
 const play=(f,t)=>{if(over||turn!==0)return;const L=legal(b,1,chain);const m=L.find(x=>x.f===f&&x.t===t);if(!m)return;const promo=apply(b,m);sfx(m.cap>=0?'star':'place');sel=-1;msg='لعبت'+(m.cap>=0?' وأكلت':'');
  if(m.cap>=0&&!promo&&legal(b,1,m.t).length){chain=m.t;sel=m.t;msg+=' ← كمّل الأكل';paint();return}
  chain=-1;if(!cnt(2)||!legal(b,2,-1).length){fin(true);return}
  botTurn();if(end())return;paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">♟️ داما ضد 🤖</h2><div id="dmS" style="text-align:center;font-size:14px;margin:2px"></div><div id="dmB" style="display:grid;justify-content:center;direction:ltr;margin:4px auto;gap:0"></div><div id="dmM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="dmX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('dmB'))return;const sm=innerHeight<420,cs=sm?19:52,L=over?[]:legal(b,1,chain),froms=new Set(L.map(m=>m.f)),tos=new Set(L.filter(m=>sel>=0&&m.f===sel).map(m=>m.t));
   $('dmS').textContent='🤖 '+cnt(2)+' · أنت '+cnt(1)+(!over?' · دورك':'');
   const B=$('dmB');B.style.gridTemplateColumns='repeat(6,'+cs+'px)';B.innerHTML='';
   for(let i=0;i<36;i++){const r=(i/N)|0,cc=i%N,dark=(r+cc)%2===1;const e=document.createElement('button');e.className='btn';e.dataset.i=i;
    const act=dark&&!over&&(froms.has(i)||tos.has(i));e.disabled=!act;
    e.style.cssText='width:'+cs+'px!important;height:'+cs+'px!important;min-width:0!important;min-height:0!important;line-height:1!important;padding:0;margin:0;border-radius:0;position:relative;background:'+(dark?'#8b5a3c':'#f1d9b5')+';'+(i===sel?'outline:3px solid #ffd43b;outline-offset:-3px;':tos.has(i)?'outline:3px solid #51cf66;outline-offset:-3px;':'');
    if(b[i]){const v=b[i],d=document.createElement('div');d.style.cssText='position:absolute;inset:'+(sm?3:6)+'px;border-radius:50%;background:'+(side(v)===1?'#f8f9fa':'#212529')+';box-shadow:0 1px 3px #0008;display:flex;align-items:center;justify-content:center;color:'+(side(v)===1?'#e8590c':'#ffd43b')+';font-size:'+(sm?10:20)+'px';if(v>2)d.textContent='★';e.appendChild(d)}
    B.appendChild(e)}
   $('dmM').textContent=msg};
  $('dmB').onclick=e=>{const x=e.target.closest('button');if(!x||over)return;const i=+x.dataset.i;const L=legal(b,1,chain);
   if(sel>=0&&L.some(m=>m.f===sel&&m.t===i)){play(sel,i);return}
   if(chain<0&&L.some(m=>m.f===i)){sel=i;paint()}};
  $('dmX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildSnl(){
 const g=indoor(0x37b24d,0xf0fff4,0xb2f2bb);
 sign(g,'🐍 سلم وثعبان ضد 🤖',0,4.6,-7.6,'rgba(55,178,77,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0xd8f5a2,0,0.55,-4.8));
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)g.add(mesh(G.box(0.7,0.05,0.7),(a+b)%2?0x74c0fc:0xffe066,-1.05+a*0.7,0.72,-5.85+b*0.7));
 g.add(mesh(G.box(0.12,0.6,0.12),0x8d5524,-0.7,0.95,-5.2),mesh(G.box(0.12,0.6,0.12),0x8d5524,-0.4,0.95,-5.2),mesh(G.cyl(0.14,0.14,0.5,8),0x2f9e44,0.8,0.95,-4.4));
 snlh={it:{x:0,z:0.2,label:'🐍 العب سلم وثعبان',fn:snlStart}};interacts.push(snlh.it);
 g.add(portalMesh('ارجع للداما',5.8,5.8,0x5c3d2e,'damroom'));
 g.add(portalMesh('هيكس',-5.8,5.8,0x4263eb,'hxgroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🐍 سلم وثعبان: ارمي النرد وكمّل لحد ٣٦. السلم يطلّعك والثعبان ينزّلك. أنت الفاتح والبوت 🤖 الغامق',4200)
}
function snlStart(){
 const JUMP={3:14,8:20,15:26,21:32,17:6,27:11,33:19,30:24};
 let pm=0,pb=0,over=false,msg='',rolls=0,die=0;
 const step=(p,d)=>{let q=p+d;if(q>36)return{p,txt:'محتاج رقم أقل'};let t='';if(JUMP[q]){t=JUMP[q]>q?' سلم ↑':' ثعبان ↓';q=JUMP[q]}return{p:q,txt:t}};
 window.snq=()=>({pm,pb,over,msg,rolls,set:(a,b)=>{pm=a;pb=b},roll:d=>roll(d)});
 let paint=()=>{};
 const fin=win=>{over=true;me.snlGames=(me.snlGames||0)+1;if(win)me.snlBest=(me.snlBest||0)+1;const dd=today();if(me.snlDD!==dd){me.snlDD=dd;me.snlDC=0}
  let cn=win?(rolls<=9?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.snlDC||0)));if(cn){me.coins+=cn;me.snlDC=(me.snlDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg+='\n'+(win?'🏆 كسبت! ':'🤖 البوت كسب ')+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const roll=d=>{if(over)return;d=d||1+((Math.random()*6)|0);die=d;rolls++;const s=step(pm,d);pm=s.p;msg='رميت '+d+(s.txt?' ← '+s.txt:'');sfx('place');if(pm===36){fin(true);return}
  const e=1+((Math.random()*6)|0),t=step(pb,e);pb=t.p;msg+=' · 🤖 رمى '+e+(t.txt?t.txt:'');if(pb===36){fin(false);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🐍 سلم وثعبان ضد 🤖</h2><div id="lzS" style="text-align:center;font-size:14px;margin:2px"></div><div id="lzB" style="display:grid;justify-content:center;direction:ltr;margin:4px auto;gap:1px"></div><div id="lzM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="lzR" style="width:auto!important;display:inline-block!important;min-height:0!important;background:#2f9e44">🎲 ارمي النرد</button><button class="btn d" id="lzX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('lzB'))return;const sm=innerHeight<420,cs=sm?19:52;$('lzS').textContent='🤖 '+pb+' · أنت '+pm+(die?' · النرد '+die:'');
   const B=$('lzB');B.style.gridTemplateColumns='repeat(6,'+cs+'px)';B.innerHTML='';
   for(let r=5;r>=0;r--)for(let cc=0;cc<6;cc++){const n=r*6+(r%2?5-cc:cc)+1;const j=JUMP[n];const e=document.createElement('div');
    e.style.cssText='width:'+cs+'px;height:'+cs+'px;position:relative;box-sizing:border-box;font-size:'+(sm?7:11)+'px;color:#212529;background:'+(j?(j>n?'#8ce99a':'#ffa8a8'):(n+r)%2?'#fff3bf':'#e7f5ff')+';padding:1px 2px;overflow:hidden;line-height:1.1';
    e.textContent=n+(j?(j>n?' ↑'+j:' ↓'+j):'');
    if(pm===n||pb===n){const w=document.createElement('div');w.style.cssText='position:absolute;bottom:'+(sm?1:3)+'px;'+(pm===n&&pb===n?'':'left:50%;transform:translateX(-50%);')+'display:flex;gap:2px';
     if(pm===n){const d=document.createElement('div');d.style.cssText='width:'+(sm?9:18)+'px;height:'+(sm?9:18)+'px;border-radius:50%;background:#fff;border:2px solid #e8590c';w.appendChild(d)}
     if(pb===n){const d=document.createElement('div');d.style.cssText='width:'+(sm?9:18)+'px;height:'+(sm?9:18)+'px;border-radius:50%;background:#212529;border:2px solid #fff';w.appendChild(d)}
     e.appendChild(w)}
    B.appendChild(e)}
   $('lzM').textContent=msg;$('lzR').disabled=over};
  $('lzR').onclick=()=>roll();
  $('lzX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildHxg(){
 const g=indoor(0x4263eb,0xedf2ff,0xbac8ff);
 sign(g,'⬡ هيكس ضد 🤖',0,4.6,-7.6,'rgba(66,99,235,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0xdbe4ff,0,0.55,-4.8));
 for(let a=0;a<5;a++)for(let b=0;b<5;b++)g.add(mesh(G.cyl(0.17,0.17,0.06,6),(a+b)%2?0x748ffc:0x91a7ff,-1.2+a*0.6+b*0.12,0.72,-6.0+b*0.6));
 g.add(mesh(G.box(3.1,0.06,0.1),0xe8590c,0,0.74,-6.3),mesh(G.box(3.1,0.06,0.1),0xe8590c,0.5,0.74,-3.3));
 hxgh={it:{x:0,z:0.2,label:'⬡ العب هيكس',fn:hxgStart}};interacts.push(hxgh.it);
 g.add(portalMesh('ارجع لسلم وثعبان',5.8,5.8,0x37b24d,'snlroom'));
 g.add(portalMesh('دومينو',-5.8,5.8,0x495057,'dmoroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('⬡ هيكس: وصّل الحافة اللي فوق بالحافة اللي تحت بقطعك (برتقالي). البوت 🤖 بيوصّل يمين بشمال. مفيش تعادل',4200)
}
function hxgStart(){
 const N=5;let b,over=false,msg='',mv=0;
 const init=()=>{b=Array(25).fill(0);mv=0};init();
 const nb=i=>{const r=(i/N)|0,c=i%N,o=[];[[0,-1],[0,1],[-1,0],[1,0],[-1,1],[1,-1]].forEach(d=>{const y=r+d[0],x=c+d[1];if(y>=0&&y<N&&x>=0&&x<N)o.push(y*N+x)});return o};
 const dist=(st,p)=>{const o=3-p,INF=99,dd=Array(25).fill(INF),q=[];for(let i=0;i<25;i++){const r=(i/N)|0,c=i%N,src=p===1?r===0:c===0;if(src&&st[i]!==o){dd[i]=st[i]===p?0:1}}
  let ch=true;while(ch){ch=false;for(let i=0;i<25;i++){if(dd[i]>=INF)continue;nb(i).forEach(j=>{if(st[j]===o)return;const w=dd[i]+(st[j]===p?0:1);if(w<dd[j]){dd[j]=w;ch=true}})}}
  let best=INF;for(let i=0;i<25;i++){const r=(i/N)|0,c=i%N,tg=p===1?r===N-1:c===N-1;if(tg&&dd[i]<best)best=dd[i]}return best};
 window.hxq=()=>({b:b.slice(),over,msg,mv,dm:dist(b,1),db:dist(b,2),set:a=>{b=a.slice()},play:i=>play(i)});
 let paint=()=>{};
 const fin=win=>{over=true;me.hxgGames=(me.hxgGames||0)+1;if(win)me.hxgBest=(me.hxgBest||0)+1;const dd=today();if(me.hxgDD!==dd){me.hxgDD=dd;me.hxgDC=0}
  let cn=win?(mv<=8?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.hxgDC||0)));if(cn){me.coins+=cn;me.hxgDC=(me.hxgDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg=(win?'🏆 كسبت! وصّلت فوق بتحت':'🤖 البوت وصّل يمين بشمال')+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const botMove=()=>{let best=-1,bs=-1e9;for(let i=0;i<25;i++){if(b[i])continue;b[i]=2;const db=dist(b,2),dm=dist(b,1);b[i]=0;const s=(db===0?1000:0)+(dm-db)*2+Math.random()*0.8-Math.abs(((i/N)|0)-2)*0.1-Math.abs(i%N-2)*0.1;if(s>bs){bs=s;best=i}}return best};
 const play=i=>{if(over||b[i])return;b[i]=1;mv++;sfx('place');if(dist(b,1)===0){fin(true);return}
  const j=botMove();b[j]=2;msg='';if(dist(b,2)===0){fin(false);return}paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">⬡ هيكس ضد 🤖</h2><div id="hxS" style="text-align:center;font-size:14px;margin:2px"></div><div id="hxB" style="direction:ltr;margin:6px auto;width:max-content"></div><div id="hxM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="hxX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  paint=()=>{if(!$('hxB'))return;const sm=innerHeight<420,cs=sm?20:46;$('hxS').textContent='حركاتك '+mv+(!over?' · دورك':'')+' · أنت: فوق↔تحت (برتقالي)';
   const B=$('hxB');B.innerHTML='';
   for(let r=0;r<N;r++){const row=document.createElement('div');row.style.cssText='display:flex;gap:2px;margin-bottom:2px;margin-left:'+(r*(cs+2)/2)+'px';
    for(let c=0;c<N;c++){const i=r*N+c,e=document.createElement('button');e.className='btn';e.dataset.i=i;e.disabled=over||!!b[i];
     let bd='border:2px solid #4c6ef5;';const bt=r===0?'#e8590c':'#bac8ff',bb=r===N-1?'#e8590c':'#bac8ff',bl=c===0?'#212529':'#bac8ff',br=c===N-1?'#212529':'#bac8ff';
     e.style.cssText='width:'+cs+'px!important;height:'+cs+'px!important;min-width:0!important;min-height:0!important;line-height:1!important;padding:0;margin:0;border-radius:30%;box-sizing:border-box;border-style:solid;border-width:3px;border-color:'+bt+' '+br+' '+bb+' '+bl+';background:'+(b[i]===1?'#fff':b[i]===2?'#212529':'#dbe4ff');
     row.appendChild(e)}B.appendChild(row)}
   $('hxM').textContent=msg};
  $('hxB').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.i!==undefined)play(+x.dataset.i)};
  $('hxX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildDmo(){
 const g=indoor(0x495057,0xf8f9fa,0xced4da);
 sign(g,'🁢 دومينو ضد 🤖',0,4.6,-7.6,'rgba(73,80,87,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0x2b8a3e,0,0.55,-4.8));
 for(let k=0;k<5;k++){g.add(mesh(G.box(0.5,0.06,0.9),0xf8f9fa,-1.2+k*0.6,0.74,-4.8+((k%2)?0.3:-0.3)),mesh(G.cyl(0.05,0.05,0.02,8),0x212529,-1.2+k*0.6,0.78,-4.8+((k%2)?0.3:-0.3)))}
 dmoh={it:{x:0,z:0.2,label:'🁢 العب دومينو',fn:dmoStart}};interacts.push(dmoh.it);
 g.add(portalMesh('ارجع لهيكس',5.8,5.8,0x4263eb,'hxgroom'));
 g.add(portalMesh('زحمة المرور',-5.8,5.8,0xe03131,'jamroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🁢 دومينو: كل واحد معاه ٧ قطع. حط قطعة رقمها زي طرف الصف. مفيش قطعة؟ اسحب. اللي يخلّص قطعه الأول يكسب',4200)
}
function dmoStart(){
 let hand,bot,stock,chain,over=false,msg='',sel=-1,passes=0;
 const init=()=>{const all=[];for(let a=0;a<=6;a++)for(let b=a;b<=6;b++)all.push([a,b]);for(let i=all.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[all[i],all[j]]=[all[j],all[i]]}hand=all.splice(0,7);bot=all.splice(0,7);stock=all;chain=[];sel=-1;passes=0};init();
 const L=()=>chain.length?chain[0][0]:-1,R=()=>chain.length?chain[chain.length-1][1]:-1;
 const fitsL=t=>!chain.length||t[0]===L()||t[1]===L(),fitsR=t=>!chain.length||t[0]===R()||t[1]===R();
 const can=t=>fitsL(t)||fitsR(t);
 const pips=a=>a.reduce((s,t)=>s+t[0]+t[1],0);
 const put=(t,side)=>{if(!chain.length){chain.push([t[0],t[1]]);return}if(side==='L')chain.unshift(t[1]===L()?[t[0],t[1]]:[t[1],t[0]]);else chain.push(t[0]===R()?[t[0],t[1]]:[t[1],t[0]])};
 window.dqq=()=>({hand:hand.map(t=>t.slice()),bot:bot.map(t=>t.slice()),stock:stock.length,chain:chain.map(t=>t.slice()),over,msg,sel,set:(h,b,s,c)=>{hand=h;bot=b;stock=s;chain=c;sel=-1;passes=0},play:(i,s)=>play(i,s),draw:()=>drawBtn(),botT:()=>botTurn()});
 let paint=()=>{};
 const fin=(w)=>{over=true;me.dmoGames=(me.dmoGames||0)+1;const win=w===1;if(win)me.dmoBest=(me.dmoBest||0)+1;const dd=today();if(me.dmoDD!==dd){me.dmoDD=dd;me.dmoDC=0}
  let cn=win?(pips(bot)>=15?3:2):0;cn=Math.min(cn,Math.max(0,6-(me.dmoDC||0)));if(cn){me.coins+=cn;me.dmoDC=(me.dmoDC||0)+cn;updCoins();sfx('win')}else sfx('err');
  msg=(win?'🏆 كسبت! ':w===2?'🤖 البوت كسب ':'🤝 تعادل ')+'(نقطك '+pips(hand)+' · نقطه '+pips(bot)+')'+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 const blocked=()=>!stock.length&&!hand.some(can)&&!bot.some(can);
 const endCheck=()=>{if(!hand.length){fin(1);return true}if(!bot.length){fin(2);return true}if(blocked()){const a=pips(hand),b=pips(bot);fin(a<b?1:b<a?2:0);return true}return false};
 const botTurn=()=>{let g=0;while(g++<20){const m=bot.filter(can);if(m.length){m.sort((x,y)=>(y[0]+y[1])-(x[0]+x[1]));const t=m[0];bot.splice(bot.indexOf(t),1);const side=fitsL(t)?'L':'R';put(t,chain.length?side:'R');passes=0;msg+=' · 🤖 لعب '+t[0]+'|'+t[1];return}
   if(stock.length){bot.push(stock.pop());msg+=' · 🤖 سحب';continue}
   msg+=' · 🤖 عدّى';passes++;return}};
 const play=(i,side)=>{if(over||i<0||i>=hand.length)return;const t=hand[i];if(!can(t))return;
  if(chain.length){if(!side)side=fitsL(t)&&fitsR(t)&&L()!==R()?null:(fitsL(t)?'L':'R');if(!side){sel=i;msg='اختار الجهة';paint();return}if(side==='L'&&!fitsL(t)||side==='R'&&!fitsR(t))return}
  hand.splice(i,1);put(t,side||'R');sel=-1;passes=0;msg='لعبت '+t[0]+'|'+t[1];sfx('place');if(endCheck())return;botTurn();if(endCheck())return;paint()};
 const drawBtn=()=>{if(over||hand.some(can))return;if(stock.length){hand.push(stock.pop());msg='سحبت';sel=-1;paint();return}
  msg='عدّيت';passes++;botTurn();if(endCheck())return;paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🁢 دومينو ضد 🤖</h2><div id="dqS" style="text-align:center;font-size:14px;margin:2px"></div><div id="dqB" style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;direction:ltr;margin:4px auto;overflow:auto"></div><div id="dqH" style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;direction:ltr;margin:6px 0"></div><div id="dqM" style="text-align:center;font-size:13px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="dqD" style="width:auto!important;display:inline-block!important;min-height:0!important">اسحب</button><button class="btn" id="dqL" style="width:auto!important;display:none!important;min-height:0!important">شمال</button><button class="btn" id="dqR" style="width:auto!important;display:none!important;min-height:0!important">يمين</button><button class="btn d" id="dqX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const tile=(t,cs,hl)=>'<span style="display:inline-flex;gap:2px;background:#f8f9fa;color:#212529;border-radius:4px;padding:'+(cs>20?4:2)+'px '+(cs>20?6:3)+'px;font-size:'+cs+'px;font-weight:bold;border:2px solid '+(hl?'#ffd43b':'#adb5bd')+'">'+t[0]+'<span style="color:#adb5bd">|</span>'+t[1]+'</span>';
  paint=()=>{if(!$('dqB'))return;const sm=innerHeight<420;$('dqS').textContent='🤖 '+bot.length+' قطعة · سحب '+stock.length+(chain.length?' · الأطراف '+L()+' و '+R():'');
   $('dqB').style.maxHeight=sm?'40px':'150px';$('dqB').innerHTML=chain.map(t=>tile(t,sm?10:14,false)).join('');
   const H=$('dqH');H.innerHTML='';hand.forEach((t,i)=>{const e=document.createElement('button');e.className='btn';e.dataset.i=i;e.disabled=over||!can(t);
    e.style.cssText='width:auto!important;min-width:0!important;min-height:0!important;line-height:1!important;padding:'+(sm?'3px 5px':'6px 9px')+';margin:0;border-radius:6px;background:'+(i===sel?'#fab005':can(t)?'#2f9e44':'#868e96')+';font-size:'+(sm?12:18)+'px;font-weight:bold;color:#fff';e.textContent=t[0]+'|'+t[1];H.appendChild(e)});
   const need=!over&&!hand.some(can);$('dqD').style.display=need?'inline-block':'none';$('dqD').textContent=stock.length?'اسحب':'عدّي';
   const ch=sel>=0&&!over&&hand[sel]&&fitsL(hand[sel])&&fitsR(hand[sel])&&chain.length&&L()!==R();$('dqL').style.setProperty('display',ch?'inline-block':'none','important');$('dqR').style.setProperty('display',ch?'inline-block':'none','important');
   $('dqM').textContent=msg};
  $('dqH').onclick=e=>{const x=e.target.closest('button');if(x&&x.dataset.i!==undefined)play(+x.dataset.i)};
  $('dqD').onclick=drawBtn;$('dqL').onclick=()=>play(sel,'L');$('dqR').onclick=()=>play(sel,'R');
  $('dqX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
function buildJam(){
 const g=indoor(0xe03131,0xfff5f5,0xffc9c9);
 sign(g,'🚗 زحمة المرور',0,4.6,-7.6,'rgba(224,49,49,.92)');
 g.add(mesh(G.box(3.2,0.3,3.2),0x868e96,0,0.55,-4.8));
 g.add(mesh(G.box(0.9,0.25,0.45),0xe03131,-0.6,0.82,-4.8),mesh(G.box(0.45,0.25,0.9),0x1971c2,0.4,0.82,-5.1),mesh(G.box(0.45,0.25,1.3),0x2f9e44,0.9,0.82,-4.5),mesh(G.box(0.9,0.25,0.45),0xf08c00,-0.3,0.82,-5.6));
 jamh={it:{x:0,z:0.2,label:'🚗 العب زحمة المرور',fn:jamStart}};interacts.push(jamh.it);
 g.add(portalMesh('ارجع للدومينو',5.8,5.8,0x495057,'dmoroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🚗 زحمة المرور: حرّك العربيات عشان العربية الحمرا تطلع من اليمين. اضغط عربية واختار الاتجاه. كل خطوة بتتحسب',4200)
}
function jamStart(){
 const LV=[[[[2,0,2,1],[3,4,2,1],[5,3,3,1],[0,4,2,1],[1,2,2,1],[3,2,3,0],[4,4,2,1],[1,4,2,0],[0,1,2,1],[5,0,2,1]],8],[[[2,2,2,1],[2,4,2,0],[0,4,2,1],[1,5,3,0],[5,0,3,1],[0,1,2,0],[3,2,2,1],[4,1,2,1],[1,3,2,1],[4,4,2,0]],9],[[[2,0,2,1],[4,2,2,1],[2,2,2,0],[0,5,3,0],[3,4,2,1],[1,4,2,0],[0,0,2,1],[5,3,3,1],[4,1,2,0],[1,0,2,1],[0,3,2,1]],13],[[[2,1,2,1],[4,3,2,1],[3,0,2,0],[3,4,2,1],[0,2,2,0],[0,4,2,1],[5,1,2,1],[4,5,2,0],[1,3,3,0],[0,0,2,1],[3,2,2,0]],15],[[[2,0,2,1],[0,4,3,0],[4,2,2,0],[5,4,2,1],[3,1,2,1],[1,1,2,1],[4,4,2,1],[1,5,2,0],[0,2,2,1],[3,0,2,0]],20],[[[2,0,2,1],[2,5,2,0],[3,0,3,1],[4,1,2,1],[0,2,2,0],[4,3,2,0],[5,0,2,1],[0,0,2,0],[3,4,2,0],[2,3,2,0],[5,4,2,1],[0,3,3,1]],22]];
 const N=6;let li=(me.jamLvl||0)%LV.length,P,mv=0,sel=-1,over=false,msg='';
 const load=()=>{P=LV[li][0].map(a=>a.slice());mv=0;sel=-1;over=false;msg='مستوى '+(li+1)+' من '+LV.length+' · أقل عدد خطوات '+LV[li][1]};load();
 const cells=(p)=>{const o=[];for(let k=0;k<p[2];k++)o.push(p[3]?[p[0],p[1]+k]:[p[0]+k,p[1]]);return o};
 const free=(i,r,c)=>{if(r<0||c<0||r>=N||c>=N)return false;for(let j=0;j<P.length;j++){if(j===i)continue;if(cells(P[j]).some(x=>x[0]===r&&x[1]===c))return false}return true};
 const canMove=(i,d)=>{const p=P[i];if(p[3]){const c=d<0?p[1]-1:p[1]+p[2];return free(i,p[0],c)}const r=d<0?p[0]-1:p[0]+p[2];return free(i,r,p[1])};
 const move=(i,d)=>{if(over||i<0||!canMove(i,d))return false;const p=P[i];if(p[3])p[1]+=d;else p[0]+=d;mv++;sfx('place');
  if(i===0&&p[1]+p[2]===N){fin()}return true};
 window.jmq=()=>({P:P.map(a=>a.slice()),mv,over,msg,li,lv:LV.length,min:LV[li][1],set:(a,l)=>{P=a.map(x=>x.slice());mv=0;if(l!==undefined)li=l},move:(i,d)=>move(i,d)});
 let paint=()=>{};
 const fin=()=>{over=true;me.jamGames=(me.jamGames||0)+1;me.jamBest=(me.jamBest||0)+1;const dd=today();if(me.jamDD!==dd){me.jamDD=dd;me.jamDC=0}
  let cn=mv<=LV[li][1]+4?3:2;cn=Math.min(cn,Math.max(0,6-(me.jamDC||0)));if(cn){me.coins+=cn;me.jamDC=(me.jamDC||0)+cn;updCoins();sfx('win')}else sfx('star');
  me.jamLvl=(li+1)%LV.length;msg='🏆 خرّجت العربية في '+mv+' خطوة (الأقل '+LV[li][1]+')'+(cn?' · +'+cn+'🪙':'');saveMe();paint()};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🚗 زحمة المرور</h2><div id="jmS" style="text-align:center;font-size:14px;margin:2px"></div><div id="jmB" style="position:relative;margin:4px auto;background:#495057;border-radius:6px;direction:ltr"></div><div id="jmM" style="text-align:center;font-size:12px;margin:4px 0;min-height:1.4em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap"><button class="btn" id="jmA" style="width:auto!important;display:inline-block!important;min-height:0!important;min-width:0!important;padding:6px 14px">◀</button><button class="btn" id="jmC" style="width:auto!important;display:inline-block!important;min-height:0!important;min-width:0!important;padding:6px 14px">▶</button><button class="btn" id="jmN" style="width:auto!important;display:inline-block!important;min-height:0!important;min-width:0!important;padding:6px 10px">من الأول</button><button class="btn d" id="jmX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const COL=['#e03131','#1971c2','#2f9e44','#f08c00','#9c36b5','#15aabf','#74b816','#e64980','#868e96','#5f3dc4','#c2255c','#0b7285'];
  paint=()=>{if(!$('jmB'))return;const sm=innerHeight<420,cs=sm?24:50;$('jmS').textContent='خطوات '+mv+' · مستوى '+(li+1);
   const B=$('jmB');B.style.width=cs*N+'px';B.style.height=cs*N+'px';B.innerHTML='';
   const ex=document.createElement('div');ex.style.cssText='position:absolute;right:-12px;top:'+(2*cs)+'px;width:12px;height:'+cs+'px;background:#51cf66;border-radius:0 4px 4px 0';B.appendChild(ex);
   P.forEach((p,i)=>{const e=document.createElement('div');e.dataset.i=i;e.style.cssText='position:absolute;box-sizing:border-box;border-radius:8px;border:'+(i===sel?'3px solid #ffd43b':'2px solid #0006')+';background:'+(i===0?'#e03131':COL[1+(i-1)%11])+';left:'+(p[1]*cs+2)+'px;top:'+(p[0]*cs+2)+'px;width:'+((p[3]?p[2]:1)*cs-4)+'px;height:'+((p[3]?1:p[2])*cs-4)+'px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:'+(sm?10:16)+'px';if(i===0)e.textContent='🚗';B.appendChild(e)});
   const hz=sel>=0&&P[sel][3];$('jmA').textContent=hz?'◀':'▲';$('jmC').textContent=hz?'▶':'▼';$('jmA').disabled=$('jmC').disabled=sel<0||over;
   $('jmM').textContent=msg};
  $('jmB').onclick=e=>{const x=e.target.closest('[data-i]');if(!x||over)return;sel=+x.dataset.i;paint()};
  $('jmA').onclick=()=>{if(sel>=0){if(!move(sel,-1))msg='مسدود';else if(!over)msg='';paint()}};
  $('jmC').onclick=()=>{if(sel>=0){if(!move(sel,1))msg='مسدود';else if(!over)msg='';paint()}};
  $('jmN').onclick=()=>{load();paint()};
  $('jmX').onclick=()=>{$('modal').style.display='none'};
  paint()})}
