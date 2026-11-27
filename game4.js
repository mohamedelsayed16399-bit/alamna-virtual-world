/* game4.js: darts room */
let drh=null;
function buildDrt(){
 const g=indoor(0x5c940d,0xf4fce3,0x82c91e);
 sign(g,'🎯 صالة السهام',0,4.6,-7.6,'rgba(92,148,13,.92)');
 g.add(mesh(G.box(3.2,3.2,0.2),0x5c3d2e,0,2.4,-7.5));
 const rings=[[1.45,0x212529],[1.2,0xf1f3f5],[1.0,0x212529],[0.75,0xfa5252],[0.5,0x51cf66],[0.22,0xfa5252]];
 rings.forEach(([r,c],i)=>{const m=mesh(G.cyl(r,r,0.1,24),c,0,2.4,-7.35+i*0.02);m.rotation.x=Math.PI/2;g.add(m)});
 g.add(mesh(G.box(2.4,0.7,1),0x868e96,-3,0.35,-3),mesh(G.box(2.4,0.1,1.1),0xdee2e6,-3,0.75,-3));
 for(let i=0;i<4;i++)g.add(mesh(G.cyl(0.04,0.04,0.7,6),[0xfa5252,0xfcc419,0x4dabf7,0x51cf66][i],-3.6+i*0.4,1.1,-3));
 [[-5,0],[5,0]].forEach(([x,z],i)=>g.add(mesh(G.cyl(0.35,0.35,1,10),0x5c940d,x,0.5,z),mesh(G.sph(0.35,8),[0xfcc419,0xfa5252][i],x,1.2,z,[0xfcc419,0xfa5252][i])));
 drh={it:{x:0,z:0.2,label:'🎯 ارمي السهام',fn:drtStart}};interacts.push(drh.it);
 g.add(portalMesh('ارجع لصالة الهوكي',5.8,5.8,0x1c7ed6,'hockey'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎯 دوس لما المؤشر يكون على الهدف',3000)
}
function drtStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(260,Math.min(innerHeight-330,380)),W=Math.min(innerWidth-50,360),R=Math.min(W,CH)/2-(H?12:24),cx=W/2,cy=CH/2;
 const ORD=[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5],TOT=15;
 let thrown=0,sc=0,over=false,last=0,t=0,stuck=[],msg='',msgT=0,msgC='#fff',ph=Math.random()*6,cool=0,fl=null;
 const rnd=()=>Math.floor(thrown/3);
 const ret=()=>{const lv=rnd(),A=R*0.8,fx=1.1+lv*0.35,fy=1.5+lv*0.4;return{x:cx+A*Math.sin(t*fx+ph)*Math.cos(t*0.37),y:cy+A*Math.cos(t*fy+ph*1.3)}};
 const val=(px,py)=>{const dx=px-cx,dy=py-cy,d=Math.hypot(dx,dy)/R;if(d>1)return{p:0,l:'خارج!'};if(d<0.07)return{p:50,l:'بُل! 50'};if(d<0.15)return{p:25,l:'25'};let a=Math.atan2(dx,-dy);if(a<0)a+=Math.PI*2;const n=ORD[Math.floor((a+Math.PI/20)/(Math.PI/10))%20];if(d>0.92)return{p:n*2,l:'دبل '+n*2};if(d>0.55&&d<0.65)return{p:n*3,l:'تربل '+n*3};return{p:n,l:''+n}};
 let thr=()=>{};
 window.drq=()=>({sc,thrown,over,R,cx,cy,ret:ret(),val,throw:()=>thr()});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎯 صالة السهام</h2>')+'<div id="drH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="drC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="drX">إغلاق</button></div>';
  const cv=$('drC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('drC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('drH'))$('drH').textContent='🎯 النقاط: '+sc+' · السهام: '+(TOT-thrown)+' · جولة '+Math.min(5,rnd()+1)+'/5'};
  const say=(m,cc)=>{msg=m;msgC=cc;msgT=0.9};
  const dw=()=>{x.fillStyle='#fff9db';x.fillRect(0,0,W,CH);
   for(let i=0;i<20;i++){const a0=-Math.PI/2+(i-0.5)*Math.PI/10,a1=a0+Math.PI/10,dark=i%2===0;
    const ring=(r0,r1,c)=>{x.fillStyle=c;x.beginPath();x.arc(cx,cy,R*r1,a0,a1);x.arc(cx,cy,R*r0,a1,a0,true);x.closePath();x.fill()};
    ring(0.15,0.55,dark?'#212529':'#f1e9c9');ring(0.55,0.65,dark?'#e03131':'#2f9e44');ring(0.65,0.92,dark?'#212529':'#f1e9c9');ring(0.92,1,dark?'#e03131':'#2f9e44')}
   x.fillStyle='#2f9e44';x.beginPath();x.arc(cx,cy,R*0.15,0,6.3);x.fill();x.fillStyle='#e03131';x.beginPath();x.arc(cx,cy,R*0.07,0,6.3);x.fill();
   x.fillStyle='#343a40';x.font='bold '+(H?9:11)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';for(let i=0;i<20;i++){const a=-Math.PI/2+i*Math.PI/10;x.fillText(ORD[i],cx+Math.cos(a)*R*1.1,cy+Math.sin(a)*R*1.1)}x.textBaseline='alphabetic';
   stuck.forEach(s=>{x.strokeStyle='#868e96';x.lineWidth=2;x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.x+6,s.y-10);x.stroke();x.fillStyle='#ffd43b';x.beginPath();x.arc(s.x,s.y,2.5,0,6.3);x.fill()});
   if(!over){const r=ret();x.strokeStyle='rgba(255,255,255,.95)';x.lineWidth=2.5;x.beginPath();x.arc(r.x,r.y,9,0,6.3);x.stroke();x.strokeStyle='#228be6';x.lineWidth=1.5;x.beginPath();x.arc(r.x,r.y,9,0,6.3);x.stroke();x.beginPath();x.moveTo(r.x-14,r.y);x.lineTo(r.x+14,r.y);x.moveTo(r.x,r.y-14);x.lineTo(r.x,r.y+14);x.stroke()}
   if(msgT>0){x.fillStyle=msgC;x.strokeStyle='#212529';x.lineWidth=4;x.font='bold 22px sans-serif';x.textAlign='center';x.strokeText(msg,W/2,26);x.fillText(msg,W/2,26)}};
  const fin=()=>{over=true;dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.drtd||me.drtd.d!==d)me.drtd={d,c:0};let pay=Math.min(5,Math.floor(sc/60));pay=Math.max(0,Math.min(pay,12-me.drtd.c));me.drtd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.drtBest||0);if(nb)me.drtBest=sc;me.drtGames=(me.drtGames||0)+1;saveMe();
   c.innerHTML='<h2>'+(sc>=250?'🎯 قناص!':'🎯 خلصت السهام')+'</h2><div style="text-align:center;font-size:16px">مجموع النقاط: <b>'+sc+'</b>'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.drtBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=60?'(وصلت حد النهاردة)':'اوصل 60 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="drR">🔁 تاني</button><button class="btn d" id="drX">إغلاق</button></div>';$('drR').onclick=()=>{$('modal').style.display='none';drtStart()};$('drX').onclick=()=>{$('modal').style.display='none'}},700)};
  thr=()=>{if(over||cool>0||!open())return;const r=ret(),j=R*0.04,px=r.x+(Math.random()-.5)*2*j,py=r.y+(Math.random()-.5)*2*j,v=val(px,py);thrown++;sc+=v.p;stuck.push({x:px,y:py});cool=0.35;sfx(v.p>=40?'win':'place');say(v.p>=40?v.l+' 🔥':v.l,v.p?'#ffd43b':'#ff6b6b');hud();if(thrown>=TOT)fin()};
  const tick=now=>{if(!open())return;const dt=Math.min(0.04,(now-(last||now))/1000);last=now;if(msgT>0)msgT-=dt;if(cool>0)cool-=dt;if(!over)t+=dt;hud();dw();if(!over)requestAnimationFrame(tick)};
  cv.onpointerdown=e=>{e.preventDefault();thr()};
  $('drX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}
