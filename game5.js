let bpph=null;
function buildBpp(){
 const g=indoor(0xd6336c,0xfff0f6,0xffc2d9);
 sign(g,'🎈 تحدّي البالونات',0,4.6,-7.6,'rgba(214,51,108,.92)');
 [0xff6b6b,0xffd43b,0x4dabf7,0x69db7c,0xf783ac].forEach((c,i)=>g.add(mesh(G.sph(0.5,10),c,-3.2+i*1.6,2.2+(i%2)*0.5,-5),mesh(G.cyl(0.02,0.02,1.4,4),0xadb5bd,-3.2+i*1.6,1.2,-5)));
 g.add(mesh(G.box(0.3,2,0.3),0xd6336c,-5,1,-2),mesh(G.box(0.3,2,0.3),0xd6336c,5,1,-2));
 bpph={it:{x:0,z:0.2,label:'🎈 فرقع البالونات',fn:bppStart}};interacts.push(bpph.it);
 g.add(portalMesh('ارجع لردّ الفعل',5.8,5.8,0xc92a2a,'rttroom'));
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
