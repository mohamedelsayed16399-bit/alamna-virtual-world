/* game3.js: connect four room */
let bd=null;
function buildBoard(){
 const g=indoor(0x6d4c41,0xefe4d0,0xffa94d);
 sign(g,'🎲 صالة الألعاب',0,4.6,-7.6,'rgba(230,119,0,.92)');
 g.add(mesh(G.box(3.4,0.16,3.4),0x8d5a2b,-3.8,1.0,-4.6),mesh(G.cyl(0.12,0.12,1,6),0x5c3d2e,-3.8,0.5,-4.6));
 for(let i=0;i<8;i++)for(let j=0;j<8;j++)g.add(mesh(G.box(0.36,0.04,0.36),(i+j)%2?0x212529:0xf1f3f5,-3.8-1.26+i*0.36,1.1,-4.6-1.26+j*0.36));
 const fx=3.2,fz=-5.2;g.add(mesh(G.cyl(0.12,0.12,1.2,6),0x5c3d2e,fx,0.6,fz),mesh(G.box(2.6,0.12,1.2),0x8d5a2b,fx,0.55,fz),mesh(G.box(2.4,2,0.3),0x1c7ed6,fx,1.8,fz));
 for(let r=0;r<6;r++)for(let c=0;c<7;c++){const k=(r*3+c*5)%4,col=k===0?0xfa5252:k===1?0xfcc419:0x0b3d78;const d=mesh(G.cyl(0.13,0.13,0.06,10),col,fx-1.02+c*0.34,2.55-r*0.31,fz+0.18,k<2?col:0);d.rotation.x=Math.PI/2;g.add(d)}
 [[-6.5,-1],[6.5,-1.5]].forEach(([x,z],i)=>{g.add(mesh(G.box(1,0.5,1),0xa9753d,x,0.25,z),mesh(G.box(0.8,0.3,0.8),i?0xfa5252:0x4c6ef5,x,0.65,z,i?0x550000:0x001a66))});
 bd={it:{x:0,z:-2.2,label:'🔴 أربعة في صف ضد 🤖',fn:c4Start}};interacts.push(bd.it);
 g.add(portalMesh('ارجع للتتريس',5.8,5.8,0xff8787,'tetris'),portalMesh('🐦 برج السماء',-5.8,5.8,0x74c0fc,'sky'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔴 وصّل 4 قطع في صف قبل البوت 🤖',3000)
}
function c4Start(){
 const H=innerHeight<420,wins=me.c4fWins||0,DP=Math.min(5,2+Math.floor(wins/2)),CH=H?Math.max(130,innerHeight-165):Math.max(180,Math.min(innerHeight-340,330)),CS=Math.min(Math.floor(CH/6),Math.floor((innerWidth-50)/7)),W=CS*7,HH=CS*6;
 let b=Array(42).fill(0),turn=1,over=false,mv=0,last=-1,wl=null,busy=false;
 window.c4q=()=>({b,turn,over,mv,play:c=>pl(c),wl});
 const dr=(bb,c,p)=>{for(let r=5;r>=0;r--)if(!bb[r*7+c]){bb[r*7+c]=p;return r*7+c}return -1};
 const wn=(bb,p)=>{for(let r=0;r<6;r++)for(let c=0;c<7;c++)for(const[dr_,dc]of[[0,1],[1,0],[1,1],[1,-1]]){const cells=[];for(let k=0;k<4;k++){const rr=r+dr_*k,cc=c+dc*k;if(rr<0||rr>5||cc<0||cc>6||bb[rr*7+cc]!==p)break;cells.push(rr*7+cc)}if(cells.length===4)return cells}return null};
 const ev=(bb,p)=>{let s=0;for(let r=0;r<6;r++)if(bb[r*7+3]===p)s+=3;else if(bb[r*7+3])s-=3;for(let r=0;r<6;r++)for(let c=0;c<7;c++)for(const[a,d]of[[0,1],[1,0],[1,1],[1,-1]]){let m=0,o=0,e=0,ok=1;for(let k=0;k<4;k++){const rr=r+a*k,cc=c+d*k;if(rr<0||rr>5||cc<0||cc>6){ok=0;break}const v=bb[rr*7+cc];if(v===p)m++;else if(v)o++;else e++}if(!ok)continue;if(m===4)s+=100;else if(m===3&&e===1)s+=5;else if(m===2&&e===2)s+=2;if(o===3&&e===1)s-=6}return s};
 const ORD=[3,2,4,1,5,0,6];
 const mm=(bb,d,al,be,mx)=>{const me2=2,op=1;if(wn(bb,2))return 1e5+d;if(wn(bb,1))return -1e5-d;if(d===0||bb.slice(0,7).every(v=>v))return ev(bb,2);let best=mx?-1e9:1e9;for(const c of ORD){if(bb[c])continue;const n=bb.slice();dr(n,c,mx?me2:op);const v=mm(n,d-1,al,be,!mx);if(mx){if(v>best)best=v;if(best>al)al=best}else{if(v<best)best=v;if(best<be)be=best}if(al>=be)break}return best};
 const botMove=()=>{let bc=-1,bv=-1e9;const cs=ORD.filter(c=>!b[c]).sort(()=>Math.random()-.5);for(const c of cs){const n=b.slice();dr(n,c,2);const v=mm(n,DP-1,-1e9,1e9,false)+(c===3?0.5:0)+Math.random()*0.3;if(v>bv){bv=v;bc=c}}return bc};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🔴 أربعة في صف</h2>')+'<div id="c4H" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="c4C" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="c4X">إغلاق</button></div>';
  const cv=$('c4C');cv.width=W;cv.height=HH;const x=cv.getContext('2d');
  const st=t=>{if($('c4H'))$('c4H').textContent=t};st('دورك 🔴 · البوت 🤖 مستوى '+(DP-1));
  const dw=()=>{x.fillStyle='#1c7ed6';x.fillRect(0,0,W,HH);for(let i=0;i<42;i++){const r=Math.floor(i/7),cc=i%7;x.fillStyle=b[i]===1?'#fa5252':b[i]===2?'#fcc419':'#0b3d78';x.beginPath();x.arc(cc*CS+CS/2,r*CS+CS/2,CS*0.4,0,6.3);x.fill();if(i===last){x.strokeStyle='#fff';x.lineWidth=3;x.stroke()}if(wl&&wl.includes(i)){x.strokeStyle='#40c057';x.lineWidth=5;x.stroke()}}};
  const open=()=>$('c4C')&&$('modal').style.display!=='none';
  const fin=r=>{over=true;dw();setTimeout(()=>{if(!open())return;const win=r===1,dwn=r===0,d=today();if(!me.c4d||me.c4d.d!==d)me.c4d={d,c:0};let pay=win?3+(mv<=12?1:0):dwn?1:0;pay=Math.max(0,Math.min(pay,12-me.c4d.c));me.c4d.c+=pay;me.coins+=pay;updCoins();if(win)me.c4fWins=wins+1;const sc=win?60+(42-mv)*2:dwn?20:0,nb=sc>(me.c4fBest||0);if(nb)me.c4fBest=sc;me.c4fGames=(me.c4fGames||0)+1;saveMe();sfx(win?'win':'err');
   c.innerHTML='<h2>'+(win?'🏆 كسبت!':dwn?'🤝 تعادل':'😅 البوت كسب')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · حركات: <b>'+mv+'</b>'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.c4fBest||0))+'<br>'+(pay?'+'+pay+'🪙':(win||dwn)?'(وصلت حد النهاردة)':'جرّب تاني')+(win?'<br>🤖 البوت هيبقى أذكى المرة الجاية':'')+'</div><div class="row"><button class="btn g" id="c4R">🔁 تاني</button><button class="btn d" id="c4X">إغلاق</button></div>';$('c4R').onclick=()=>{$('modal').style.display='none';c4Start()};$('c4X').onclick=()=>{$('modal').style.display='none'}},900)};
  const chk=p=>{const w=wn(b,p);if(w){wl=w;fin(p);return 1}if(b.slice(0,7).every(v=>v)){fin(0);return 1}return 0};
  const pl=col=>{if(over||busy||turn!==1||b[col])return;const i=dr(b,col,1);last=i;mv++;sfx('place');dw();if(chk(1))return;turn=2;busy=true;st('🤖 بيفكر...');setTimeout(()=>{if(!open())return;const m=botMove(),j=dr(b,m,2);last=j;mv++;sfx('tick');busy=false;turn=1;dw();if(chk(2))return;st('دورك 🔴')},500)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect();pl(Math.max(0,Math.min(6,Math.floor((e.clientX-r.left)*W/r.width/CS))))};
  $('c4X').onclick=()=>{$('modal').style.display='none'};dw()})}

/* flappy: sky tower */
let skr=null;
function buildSky(){
 const g=indoor(0x1971c2,0xa5d8ff,0x74c0fc);
 sign(g,'🐦 برج السماء',0,4.6,-7.6,'rgba(25,113,194,.92)');
 for(let i=0;i<7;i++){const x=-6+i*2+Math.random()*.8,y=2.6+Math.random()*1.6,z=-7+Math.random()*1.2;g.add(mesh(G.sph(0.55+Math.random()*.3,8),0xffffff,x,y,z,0x8899aa),mesh(G.sph(0.4,8),0xf1f3f5,x+0.6,y-0.1,z))}
 g.add(mesh(G.cyl(0.9,1.1,0.4,10),0x868e96,0,0.2,-4),mesh(G.cyl(0.35,0.5,3.2,8),0xfab005,0,1.8,-4),mesh(G.sph(0.7,10),0xff922b,0,3.7,-4,0x663300),mesh(G.sph(0.14,6),0x212529,0.28,3.85,-3.4),mesh(G.cyl(0.0,0.14,0.34,5),0xfa5252,0.0,3.7,-3.25,0xaa0000).rotateX(1.57));
 [[-5,-1],[5,-1]].forEach(([x,z])=>{g.add(mesh(G.cyl(0.12,0.12,2.4,6),0x495057,x,1.2,z),mesh(G.box(0.9,0.3,0.3),0xff922b,x,2.5,z,0x663300))});
 skr={it:{x:0,z:-1.6,label:'🐦 طيّر العصفور',fn:flpStart}};interacts.push(skr.it);
 g.add(portalMesh('ارجع لصالة الألعاب',5.8,5.8,0xffa94d,'board'),portalMesh('🧱 ورشة الطوب',-5.8,5.8,0xe8590c,'brick'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🐦 دوس عشان تطيّر وعدّي من الفتحات',3000)
}
function flpStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(200,Math.min(innerHeight-300,420)),W=Math.min(innerWidth-50,360),S=CH/400;
 let by=CH/2,vy=0,sc=0,over=false,started=false,pipes=[],px0=W+40,t0=0,last=0,fl=0;
 const GAP=Math.max(72,CH*0.36),PW=46*W/360,SP=105*W/360,BX=W*0.28,R=11*Math.max(.7,S+.3);
 const addPipe=x=>pipes.push({x,gy:GAP/2+14+Math.random()*(CH-GAP-28-0),ok:false});
 for(let i=0;i<3;i++)addPipe(px0+i*W*0.62);
 const flap=()=>{if(over)return;if(!started){started=true;last=performance.now()}vy=-300*Math.max(.55,S);sfx('tick')};
 window.flq=()=>({y:by,vy,sc,over,started,flap,next:pipes.find(p=>p.x+PW>BX-R),H:CH});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🐦 طيّر العصفور</h2>')+'<div id="flH" style="text-align:center;font-size:14px;margin:2px">دوس عشان تبدأ</div><canvas id="flC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="flX">إغلاق</button></div>';
  const cv=$('flC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('flC')&&$('modal').style.display!=='none';
  const dw=()=>{const gr=x.createLinearGradient(0,0,0,CH);gr.addColorStop(0,'#4dabf7');gr.addColorStop(1,'#d0ebff');x.fillStyle=gr;x.fillRect(0,0,W,CH);x.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<4;i++){const cx=((i*140-fl*0.2)%(W+80)+W+80)%(W+80)-40;x.beginPath();x.arc(cx,40+i*CH*0.2,18,0,6.3);x.arc(cx+16,44+i*CH*0.2,13,0,6.3);x.fill()}
   for(const p of pipes){x.fillStyle='#37b24d';x.fillRect(p.x,0,PW,p.gy-GAP/2);x.fillRect(p.x,p.gy+GAP/2,PW,CH);x.fillStyle='#2b8a3e';x.fillRect(p.x-3,p.gy-GAP/2-12,PW+6,12);x.fillRect(p.x-3,p.gy+GAP/2,PW+6,12)}
   x.save();x.translate(BX,by);x.rotate(Math.max(-.5,Math.min(1.1,vy/600)));x.fillStyle='#fcc419';x.beginPath();x.arc(0,0,R,0,6.3);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(R*.35,-R*.3,R*.38,0,6.3);x.fill();x.fillStyle='#212529';x.beginPath();x.arc(R*.45,-R*.3,R*.17,0,6.3);x.fill();x.fillStyle='#fa5252';x.beginPath();x.moveTo(R*.8,-R*.05);x.lineTo(R*1.5,R*.15);x.lineTo(R*.8,R*.4);x.fill();x.fillStyle='#f08c00';x.beginPath();x.ellipse(-R*.3,R*.2+Math.sin(fl*.3)*3,R*.55,R*.3,0,0,6.3);x.fill();x.restore();
   x.fillStyle='#fff';x.strokeStyle='#1864ab';x.lineWidth=4;x.font='bold 30px sans-serif';x.textAlign='center';x.strokeText(sc,W/2,38);x.fillText(sc,W/2,38)};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.flpd||me.flpd.d!==d)me.flpd={d,c:0};let pay=sc>=3?Math.min(5,1+Math.floor(sc/5)):0;pay=Math.max(0,Math.min(pay,12-me.flpd.c));me.flpd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.flpBest||0);if(nb)me.flpBest=sc;me.flpGames=(me.flpGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(sc>=3?'🐦 برافو!':'💥 خبطت')+'</h2><div style="text-align:center;font-size:16px">عدّيت: <b>'+sc+'</b> فتحة'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.flpBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=3?'(وصلت حد النهاردة)':'عدّي 3 فتحات عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="flR">🔁 تاني</button><button class="btn d" id="flX">إغلاق</button></div>';$('flR').onclick=()=>{$('modal').style.display='none';flpStart()};$('flX').onclick=()=>{$('modal').style.display='none'}},700)};
  const tick=now=>{if(!open())return;if(over)return;let dt=Math.min(0.05,(now-(last||now))/1000);last=now;fl++;
   if(started){vy+=900*Math.max(.55,S)*dt;by+=vy*dt;for(const p of pipes){p.x-=SP*dt;if(!p.ok&&p.x+PW<BX-R){p.ok=true;sc++;sfx('place');$('flH')&&($('flH').textContent='')}}
    if(pipes[0].x+PW<-10){pipes.shift();addPipe(pipes[pipes.length-1].x+W*0.62)}
    if(by+R>CH||by-R<0){dw();return fin()}
    for(const p of pipes){if(BX+R*.8>p.x&&BX-R*.8<p.x+PW&&(by-R*.8<p.gy-GAP/2||by+R*.8>p.gy+GAP/2)){dw();return fin()}}}
   else by=CH/2+Math.sin(now/250)*6;
   dw();requestAnimationFrame(tick)};
  cv.onpointerdown=e=>{e.preventDefault();flap()};
  $('flX').onclick=()=>{$('modal').style.display='none'};dw();requestAnimationFrame(tick)})}

/* breakout: brick workshop */
let bkr=null;
function buildBrick(){
 const g=indoor(0x5f3dc4,0xdee2e6,0xe8590c);
 sign(g,'🧱 ورشة الطوب',0,4.6,-7.6,'rgba(232,89,12,.92)');
 const cols=[0xfa5252,0xff922b,0xfcc419,0x69db7c,0x4dabf7];
 for(let r=0;r<5;r++)for(let c=0;c<7;c++)g.add(mesh(G.box(0.8,0.36,0.4),cols[r],-2.6+c*0.87,0.3+r*0.38,-6.3,0x220000));
 g.add(mesh(G.box(2.2,0.18,0.6),0x1971c2,0,0.3,-1.2,0x001a66),mesh(G.sph(0.22,8),0xffffff,0,0.8,-1.2,0x444444));
 [[-5,-3],[5,-3],[-5.5,1],[5.5,1]].forEach(([x,z],i)=>{g.add(mesh(G.box(0.9,0.5+i%2*0.3,0.9),0xc2874b,x,0.3+i%2*0.15,z),mesh(G.box(0.9,0.14,0.9),0xe8590c,x,0.6+i%2*0.3,z,0x551a00))});
 bkr={it:{x:0,z:-3,label:'🧱 اكسر الطوب',fn:brkStart}};interacts.push(bkr.it);
 g.add(portalMesh('ارجع لبرج السماء',5.8,5.8,0x74c0fc,'sky'),portalMesh('👾 ركن الغزاة',-5.8,5.8,0x7950f2,'invade'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧱 حرّك الصدّادة بصباعك واكسر كل الطوب',3000)
}
function brkStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-300,420)),W=Math.min(innerWidth-50,360),S=W/360;
 const COLS=8,ROWS=5,BW=(W-8)/COLS,BH=Math.max(11,CH*0.05),TOP=28,PH=9,PWd=W*0.22,BR=Math.max(5,W*0.017),clr=['#fa5252','#ff922b','#fcc419','#51cf66','#4dabf7'];
 let br=[],px=W/2,bx=W/2,by=CH-40,vx=0,vy=0,lives=3,lv=1,sc=0,cnt=0,over=false,live=false,last=0,msg='';
 const mk=()=>{br=[];for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)br.push({x:4+c*BW,y:TOP+r*(BH+3),r,on:true})};
 const sp=()=>(150+lv*22)*Math.max(.8,CH/380);
 const serve=()=>{live=false;bx=px;by=CH-PH-22-BR;vx=0;vy=0};
 const launch=()=>{if(live||over)return;live=true;last=performance.now();const a=(Math.random()*0.8-0.4);vx=Math.sin(a)*sp();vy=-Math.cos(a)*sp()};
 mk();serve();
 window.brq=()=>({px,bx,by,vx,vy,lives,lv,sc,cnt,over,live,left:br.filter(b=>b.on).length,setPad:v=>{px=Math.max(PWd/2,Math.min(W-PWd/2,v));if(!live)bx=px},launch,kill:n=>{let k=0;br.forEach(b=>{if(b.on&&k<n){b.on=false;k++;cnt++;sc+=10}})}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🧱 اكسر الطوب</h2>')+'<div id="bkH" style="text-align:center;font-size:14px;margin:2px">حرّك الصدّادة ودوس عشان تطلق الكورة</div><canvas id="bkC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="bkX">إغلاق</button></div>';
  const cv=$('bkC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('bkC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('bkH'))$('bkH').textContent='❤️ '+lives+' · مرحلة '+lv+' · طوب '+cnt+(live?'':' · دوس للإطلاق')};
  const dw=()=>{x.fillStyle='#212529';x.fillRect(0,0,W,CH);for(const b of br){if(!b.on)continue;x.fillStyle=clr[b.r];x.fillRect(b.x,b.y,BW-3,BH);x.fillStyle='rgba(255,255,255,.28)';x.fillRect(b.x,b.y,BW-3,3)}
   x.fillStyle='#4dabf7';x.fillRect(px-PWd/2,CH-PH-14,PWd,PH);x.fillStyle='#fff';x.beginPath();x.arc(bx,by,BR,0,6.3);x.fill();
   x.fillStyle='rgba(255,255,255,.85)';x.font='bold 14px sans-serif';x.textAlign='left';x.fillText(sc,8,18);x.textAlign='right';x.fillText('❤️'.repeat(lives),W-8,18)};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.brkd||me.brkd.d!==d)me.brkd={d,c:0};let pay=Math.min(5,Math.floor(cnt/12));pay=Math.max(0,Math.min(pay,12-me.brkd.c));me.brkd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.brkBest||0);if(nb)me.brkBest=sc;me.brkGames=(me.brkGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(cnt>=12?'🧱 برافو!':'💥 خلصت الأرواح')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · طوب: <b>'+cnt+'</b> · مرحلة '+lv+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.brkBest||0))+'<br>'+(pay?'+'+pay+'🪙':cnt>=12?'(وصلت حد النهاردة)':'اكسر 12 طوبة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="bkR">🔁 تاني</button><button class="btn d" id="bkX">إغلاق</button></div>';$('bkR').onclick=()=>{$('modal').style.display='none';brkStart()};$('bkX').onclick=()=>{$('modal').style.display='none'}},700)};
  const tick=now=>{if(!open()||over)return;const dt=Math.min(0.03,(now-(last||now))/1000);last=now;
   if(live){const steps=3;for(let s=0;s<steps;s++){bx+=vx*dt/steps;by+=vy*dt/steps;
     if(bx<BR){bx=BR;vx=Math.abs(vx)}if(bx>W-BR){bx=W-BR;vx=-Math.abs(vx)}if(by<BR){by=BR;vy=Math.abs(vy)}
     const py=CH-PH-14;if(vy>0&&by+BR>=py&&by+BR<=py+PH+8&&bx>px-PWd/2-BR&&bx<px+PWd/2+BR){const o=(bx-px)/(PWd/2);const a=o*1.05;const v=sp();vx=Math.sin(a)*v;vy=-Math.cos(a)*v;by=py-BR;sfx('tick')}
     for(const b of br){if(!b.on)continue;if(bx+BR>b.x&&bx-BR<b.x+BW-3&&by+BR>b.y&&by-BR<b.y+BH){b.on=false;cnt++;sc+=10*(ROWS-b.r);const ox=Math.min(bx+BR-b.x,b.x+BW-3-(bx-BR)),oy=Math.min(by+BR-b.y,b.y+BH-(by-BR));if(ox<oy)vx=-vx;else vy=-vy;sfx('place');break}}
    }
    if(!br.some(b=>b.on)){lv++;mk();serve();sfx('win')}
    else if(by>CH+BR){lives--;if(lives<=0){hud();return fin()}serve()}
    hud()}
   dw();requestAnimationFrame(tick)};
  const mv=e=>{e.preventDefault();const r=cv.getBoundingClientRect();px=Math.max(PWd/2,Math.min(W-PWd/2,(e.clientX-r.left)*W/r.width));if(!live)bx=px};
  cv.onpointermove=mv;cv.onpointerdown=e=>{mv(e);launch()};
  $('bkX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}

/* space invaders */
let ivr=null;
function buildInvade(){
 const g=indoor(0x1a1b3a,0x2b2d5e,0x7950f2);
 sign(g,'👾 ركن الغزاة',0,4.6,-7.6,'rgba(121,80,242,.92)');
 const cl=[0x69db7c,0xff6b6b,0x74c0fc,0xffd43b];
 for(let r=0;r<3;r++)for(let c=0;c<6;c++){const x=-2.6+c*1.04,y=3.6-r*0.6,z=-6.4,col=cl[(r+c)%4];g.add(mesh(G.box(0.6,0.36,0.3),col,x,y,z,col),mesh(G.box(0.14,0.2,0.14),col,x-0.2,y-0.26,z),mesh(G.box(0.14,0.2,0.14),col,x+0.2,y-0.26,z),mesh(G.box(0.1,0.1,0.1),0x212529,x-0.14,y+0.04,z+0.17),mesh(G.box(0.1,0.1,0.1),0x212529,x+0.14,y+0.04,z+0.17))}
 g.add(mesh(G.box(1.2,0.3,0.6),0x4dabf7,0,0.25,-1.6,0x0b3d78),mesh(G.box(0.3,0.5,0.3),0x4dabf7,0,0.65,-1.6,0x0b3d78));
 [[-5,-2],[5,-2],[-5.5,0.5],[5.5,0.5]].forEach(([x,z],i)=>{g.add(mesh(G.cyl(0.3,0.4,0.6+i%2*0.4,6),0x7950f2,x,0.4+i%2*0.2,z,0x2b1a66),mesh(G.sph(0.22,6),0xffd43b,x,0.9+i%2*0.4,z,0x886600))});
 ivr={it:{x:0,z:-3.2,label:'👾 صدّ الغزاة',fn:invStart}};interacts.push(ivr.it);
 g.add(portalMesh('ارجع لورشة الطوب',5.8,5.8,0xe8590c,'brick'),portalMesh('🏎️ حلبة السباق',-5.8,5.8,0xf03e3e,'track'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('👾 حرّك السفينة بصباعك، النار أوتوماتيك',3000)
}
function invStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-300,420)),W=Math.min(innerWidth-50,360),COLS=7,ROWS=H?2:4,AW=H?17:Math.min(26,W/10),AH=AW*0.7,GX=(W-30)/COLS;
 let al=[],sx=W/2,sh=[],eb=[],dir=1,lives=3,wave=1,sc=0,kills=0,over=false,last=0,fireT=0,enT=0,inv=0,msg=0;
 const spd=()=>(26+wave*9)*(W/360),mk=()=>{al=[];for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)al.push({x:20+GX*c+GX/2-8,y:(H?22:36)+r*(AH+(H?7:12)),r,on:true});dir=1;sh=[];eb=[]};
 mk();
 window.sinq=()=>({sx,lives,wave,sc,kills,over,left:al.filter(a=>a.on).length,al,sh:sh.length,setX:v=>{sx=Math.max(16,Math.min(W-16,v))},W,CH,hit:()=>{inv=0;eb.push({x:sx,y:CH-40,v:200})}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">👾 صدّ الغزاة</h2>')+'<div id="ivH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="ivC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="ivX">إغلاق</button></div>';
  const cv=$('ivC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('ivC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('ivH'))$('ivH').textContent='❤️ '+lives+' · موجة '+wave+' · غزاة '+kills};
  const col=['#51cf66','#ff6b6b','#74c0fc','#ffd43b'];
  const dw=()=>{x.fillStyle='#0b0c1e';x.fillRect(0,0,W,CH);x.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<24;i++)x.fillRect((i*97)%W,(i*53+Date.now()/60)%CH,1.5,1.5);
   for(const a of al){if(!a.on)continue;x.fillStyle=col[a.r%4];x.fillRect(a.x,a.y,AW,AH*0.7);x.fillRect(a.x+3,a.y+AH*0.7,4,AH*0.3);x.fillRect(a.x+AW-7,a.y+AH*0.7,4,AH*0.3);x.fillStyle='#0b0c1e';x.fillRect(a.x+AW*0.25,a.y+3,3,3);x.fillRect(a.x+AW*0.65,a.y+3,3,3)}
   x.fillStyle='#ffd43b';for(const b of sh)x.fillRect(b.x-1.5,b.y,3,9);x.fillStyle='#ff6b6b';for(const b of eb)x.fillRect(b.x-1.5,b.y,3,9);
   if(!(inv>0&&Math.floor(inv*8)%2)){x.fillStyle='#4dabf7';x.fillRect(sx-15,CH-18,30,10);x.fillRect(sx-5,CH-26,10,10)}};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.sinvd||me.sinvd.d!==d)me.sinvd={d,c:0};let pay=Math.min(5,Math.floor(kills/10));pay=Math.max(0,Math.min(pay,12-me.sinvd.c));me.sinvd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.sinvBest||0);if(nb)me.sinvBest=sc;me.sinvGames=(me.sinvGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(kills>=10?'👾 برافو!':'💥 الغزاة كسبوا')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · غزاة: <b>'+kills+'</b> · موجة '+wave+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.sinvBest||0))+'<br>'+(pay?'+'+pay+'🪙':kills>=10?'(وصلت حد النهاردة)':'اضرب 10 غزاة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="ivR">🔁 تاني</button><button class="btn d" id="ivX">إغلاق</button></div>';$('ivR').onclick=()=>{$('modal').style.display='none';invStart()};$('ivX').onclick=()=>{$('modal').style.display='none'}},700)};
  const tick=now=>{if(!open()||over)return;const dt=Math.min(0.04,(now-(last||now))/1000);last=now;if(inv>0)inv-=dt;
   fireT-=dt;if(fireT<=0){fireT=0.42;sh.push({x:sx,y:CH-30});sfx('tick')}
   for(const b of sh)b.y-=380*dt;sh=sh.filter(b=>b.y>-10);
   let ed=false;const live=al.filter(a=>a.on),v=spd()*(1+(1-live.length/(ROWS*COLS))*1.6);
   for(const a of live){a.x+=dir*v*dt;if(a.x<4||a.x+AW>W-4)ed=true}
   if(ed){dir=-dir;for(const a of live){a.y+=AH*(H?0.35:0.55);a.x+=dir*3}}
   enT-=dt;if(enT<=0&&live.length){enT=Math.max(.35,1.1-wave*.08);const a=live[Math.floor(Math.random()*live.length)];eb.push({x:a.x+AW/2,y:a.y+AH,v:(120+wave*12)*Math.max(.8,CH/380)})}
   for(const b of eb)b.y+=b.v*dt;eb=eb.filter(b=>b.y<CH+10);
   for(const b of sh){for(const a of live){if(a.on&&b.x>a.x&&b.x<a.x+AW&&b.y<a.y+AH&&b.y>a.y-10){a.on=false;b.y=-99;kills++;sc+=10*(ROWS-a.r)+5;sfx('place');break}}}
   if(inv<=0)for(const b of eb){if(b.y>CH-28&&b.y<CH-6&&Math.abs(b.x-sx)<17){b.y=CH+99;lives--;inv=1.4;sfx('err');if(lives<=0){hud();return fin()}}}
   if(live.some(a=>a.on&&a.y+AH>=CH-30)){lives=0;hud();return fin()}
   if(!al.some(a=>a.on)){wave++;sc+=50;mk();sfx('win')}
   hud();dw();requestAnimationFrame(tick)};
  const mv=e=>{e.preventDefault();const r=cv.getBoundingClientRect();sx=Math.max(16,Math.min(W-16,(e.clientX-r.left)*W/r.width))};
  cv.onpointermove=mv;cv.onpointerdown=mv;
  $('ivX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}

/* lane racer */
let trk=null;
function buildTrack(){
 const g=indoor(0x343a40,0x495057,0xf03e3e);
 sign(g,'🏎️ حلبة السباق',0,4.6,-7.6,'rgba(240,62,62,.92)');
 g.add(mesh(G.box(5.4,0.04,12),0x212529,0,0.03,-1.2));
 for(let i=0;i<7;i++){g.add(mesh(G.box(0.14,0.05,0.8),0xf8f9fa,-0.9,0.07,-6.5+i*1.9),mesh(G.box(0.14,0.05,0.8),0xf8f9fa,0.9,0.07,-6.5+i*1.9))}
 for(let i=0;i<14;i++)g.add(mesh(G.box(0.4,0.12,0.4),i%2?0xf03e3e:0xf8f9fa,-2.9,0.06,-6.8+i*0.9),mesh(G.box(0.4,0.12,0.4),i%2?0xf8f9fa:0xf03e3e,2.9,0.06,-6.8+i*0.9));
 const car=(x,z,c)=>{g.add(mesh(G.box(0.9,0.28,1.6),c,x,0.28,z,c),mesh(G.box(0.7,0.26,0.7),0x74c0fc,x,0.52,z-0.1,0x0b3d78),mesh(G.cyl(0.18,0.18,0.12,8),0x212529,x-0.5,0.18,z-0.5),mesh(G.cyl(0.18,0.18,0.12,8),0x212529,x+0.5,0.18,z-0.5),mesh(G.cyl(0.18,0.18,0.12,8),0x212529,x-0.5,0.18,z+0.5),mesh(G.cyl(0.18,0.18,0.12,8),0x212529,x+0.5,0.18,z+0.5))};
 car(-1.8,-3,0xf03e3e);car(0,-5,0xfcc419);car(1.8,-2,0x4dabf7);
 [[-5,-3],[5,-3],[-5.5,1],[5.5,1]].forEach(([x,z],i)=>{g.add(mesh(G.cyl(0.4,0.4,0.5,10),0x212529,x,0.25,z),mesh(G.cyl(0.4,0.4,0.1,10),i%2?0xf03e3e:0xf8f9fa,x,0.52,z))});
 trk={it:{x:0,z:3,label:'🏎️ ابدأ السباق',fn:rcrStart}};interacts.push(trk.it);
 g.add(portalMesh('ارجع لركن الغزاة',5.8,5.8,0x7950f2,'invade'),portalMesh('🐸 بركة الضفادع',-5.8,5.8,0x40c057,'lily'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏎️ دوس يمين أو شمال عشان تغيّر الحارة',3000)
}
function rcrStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-300,440)),W=Math.min(innerWidth-50,H?300:300),LW=W/3,CW=LW*0.5,CHt=Math.min(CW*1.7,CH*0.2);
 let lane=1,px=LW*1.5,ob=[],st=[],dist=0,sc=0,stars=0,over=false,last=0,spawnT=0,speed=1,roll=0;
 const sp=()=>(150+Math.min(260,dist*0.05))*CH/380;
 window.rcq=()=>({lane,over,sc,stars,ob,st,W,CH,LW,CHt,setLane:l=>{lane=Math.max(0,Math.min(2,l))}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏎️ سباق الحارات</h2>')+'<div id="rcH" style="text-align:center;font-size:14px;margin:2px">دوس يمين/شمال لتغيير الحارة</div><canvas id="rcC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="rcX">إغلاق</button></div>';
  const cv=$('rcC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('rcC')&&$('modal').style.display!=='none';
  const cc=['#4dabf7','#fcc419','#69db7c','#da77f2','#ff922b'];
  const carD=(cx,cy,col,pl)=>{x.fillStyle=col;x.beginPath();x.roundRect?x.roundRect(cx-CW/2,cy-CHt/2,CW,CHt,6):x.rect(cx-CW/2,cy-CHt/2,CW,CHt);x.fill();x.fillStyle='rgba(20,40,60,.75)';x.fillRect(cx-CW*0.34,cy-CHt*0.22,CW*0.68,CHt*0.28);x.fillStyle='#212529';x.fillRect(cx-CW/2-2,cy-CHt*0.38,3,CHt*0.24);x.fillRect(cx+CW/2-1,cy-CHt*0.38,3,CHt*0.24);x.fillRect(cx-CW/2-2,cy+CHt*0.2,3,CHt*0.24);x.fillRect(cx+CW/2-1,cy+CHt*0.2,3,CHt*0.24);if(pl){x.fillStyle='#fff';x.fillRect(cx-2,cy-CHt/2+2,4,CHt*0.5)}};
  const dw=()=>{x.fillStyle='#2b2f33';x.fillRect(0,0,W,CH);x.fillStyle='#f8f9fa';for(let k=1;k<3;k++)for(let y=-40+(roll%40);y<CH;y+=40)x.fillRect(k*LW-2,y,4,22);
   x.fillStyle='#f03e3e';for(let y=-20+(roll%40);y<CH;y+=20){x.fillRect(0,y,5,10);x.fillRect(W-5,y+10,5,10)}
   for(const s of st){x.fillStyle='#fcc419';x.beginPath();x.arc(s.x,s.y,CW*0.2,0,6.3);x.fill();x.fillStyle='#fff3bf';x.beginPath();x.arc(s.x-2,s.y-2,CW*0.08,0,6.3);x.fill()}
   for(const o of ob)carD(o.x,o.y,cc[o.c],false);
   carD(px,CH-CHt*0.9,'#f03e3e',true);
   x.fillStyle='#fff';x.strokeStyle='#212529';x.lineWidth=4;x.font='bold 22px sans-serif';x.textAlign='center';x.strokeText(sc,W/2,26);x.fillText(sc,W/2,26)};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.rcrd||me.rcrd.d!==d)me.rcrd={d,c:0};let pay=Math.min(5,Math.floor(sc/40));pay=Math.max(0,Math.min(pay,12-me.rcrd.c));me.rcrd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.rcrBest||0);if(nb)me.rcrBest=sc;me.rcrGames=(me.rcrGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(sc>=40?'🏎️ برافو!':'💥 خبطت')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · نجوم: <b>'+stars+'</b>'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.rcrBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=40?'(وصلت حد النهاردة)':'اوصل 40 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="rcR">🔁 تاني</button><button class="btn d" id="rcX">إغلاق</button></div>';$('rcR').onclick=()=>{$('modal').style.display='none';rcrStart()};$('rcX').onclick=()=>{$('modal').style.display='none'}},700)};
  const tick=now=>{if(!open()||over)return;const dt=Math.min(0.04,(now-(last||now))/1000);last=now;const v=sp();dist+=v*dt;roll+=v*dt;sc=Math.floor(dist/22)+stars*5;
   const tx=LW*(lane+0.5);px+=(tx-px)*Math.min(1,dt*14);
   spawnT-=dt;if(spawnT<=0){spawnT=Math.max(.42,1.0-dist/9000)+(H?0.5:0);const l=Math.floor(Math.random()*3),l2=(l+1+Math.floor(Math.random()*2))%3;ob.push({x:LW*(l+0.5),y:-CHt,c:Math.floor(Math.random()*5),l});if(!H&&Math.random()<0.28)ob.push({x:LW*(l2+0.5),y:-CHt*2.5,c:Math.floor(Math.random()*5),l:l2});if(Math.random()<0.5){const l3=Math.floor(Math.random()*3);if(!ob.some(o=>o.l===l3&&o.y<CHt*2))st.push({x:LW*(l3+0.5),y:-CHt*3.2})}}
   for(const o of ob)o.y+=v*0.78*dt;for(const s of st)s.y+=v*0.78*dt;ob=ob.filter(o=>o.y<CH+CHt);st=st.filter(s=>s.y<CH+20);
   const py=CH-CHt*0.9;
   for(const o of ob)if(Math.abs(o.x-px)<CW*0.9&&Math.abs(o.y-py)<CHt*0.92){dw();return fin()}
   for(const s of st)if(Math.abs(s.x-px)<CW*0.7&&Math.abs(s.y-py)<CHt*0.8){s.y=CH+99;stars++;sfx('place')}
   if($('rcH'))$('rcH').textContent='⭐ '+stars+' · سرعة '+Math.round(v/ (150*CH/380)*100)+'%';
   dw();requestAnimationFrame(tick)};
  const mv=e=>{e.preventDefault();const r=cv.getBoundingClientRect();const fx=(e.clientX-r.left)/r.width;lane=fx<0.33?0:fx>0.66?2:1};
  cv.onpointerdown=mv;
  $('rcX').onclick=()=>{$('modal').style.display='none'};dw();requestAnimationFrame(tick)})}

/* frog jump */
let lly=null;
function buildLily(){
 const g=indoor(0x2b8a3e,0x1c7ed6,0x40c057);
 sign(g,'🐸 بركة الضفادع',0,4.6,-7.6,'rgba(43,138,62,.92)');
 g.add(mesh(G.cyl(5.2,5.2,0.1,20),0x3b9be0,0,0.06,-1.2,0x0b3d78));
 for(let i=0;i<9;i++){const a=i*0.7,r=1.2+(i%4)*0.9,x=Math.cos(a)*r*1.1,z=-1.2+Math.sin(a)*r*0.9;g.add(mesh(G.cyl(0.55,0.55,0.08,10),i%3?0x51cf66:0x2f9e44,x,0.14,z,0x144d1c));if(i%3===0)g.add(mesh(G.sph(0.14,6),0xff8787,x+0.1,0.28,z,0xaa3333))}
 g.add(mesh(G.sph(0.5,10),0x40c057,0.3,0.55,-1.4,0x145c20),mesh(G.sph(0.14,6),0xffffff,0.15,0.95,-1.6),mesh(G.sph(0.14,6),0xffffff,0.45,0.95,-1.6),mesh(G.sph(0.07,6),0x212529,0.15,0.96,-1.72),mesh(G.sph(0.07,6),0x212529,0.45,0.96,-1.72));
 [[-5.5,-3],[5.5,-3],[-5.5,1],[5.5,1]].forEach(([x,z],i)=>{g.add(mesh(G.cyl(0.12,0.16,1.6+i%2*0.6,6),0x2b8a3e,x,0.8,z),mesh(G.sph(0.3,6),0x8d5a2b,x,1.7+i%2*0.6,z))});
 lly={it:{x:0,z:3,label:'🐸 اقفز لفوق',fn:frgStart}};interacts.push(lly.it);
 g.add(portalMesh('ارجع لحلبة السباق',5.8,5.8,0xf03e3e,'track'),portalMesh('📦 المخزن',-5.8,5.8,0xc2874b,'depot'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🐸 حرّك صباعك يمين وشمال، الضفدع بيقفز لوحده',3000)
}
function frgStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-300,440)),W=Math.min(innerWidth-50,360),S=CH/400,PWd=W*0.2,PT=7,HJ=CH*0.42,GR=1500*S,V0=Math.sqrt(2*GR*HJ),R=Math.max(8,W*0.03);
 let fx=W/2,fy=CH-30,vy=-V0,cam=0,best=0,pl=[],over=false,last=0,sc=0,tx=W/2,topY=CH-10;
 const addP=y=>{const h=Math.max(0,-y/CH),k=Math.random(),t=h>0.5&&k<0.18?2:h>0.2&&k<0.38?1:0;pl.push({x:Math.random()*(W-PWd),y,t,d:Math.random()<.5?1:-1,on:true})};
 pl.push({x:W/2-PWd/2,y:CH-10,t:0,d:1,on:true});topY=CH-10;
 while(topY>-CH*0.3){topY-=HJ*(0.3+Math.random()*0.35);addP(topY)}
 window.frq=()=>({fx,fy,vy,sc,over,pl,cam,W,CH,PWd,HJ,setX:v=>{tx=v}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🐸 قفزة الضفدع</h2>')+'<div id="frH" style="text-align:center;font-size:14px;margin:2px">حرّك صباعك يمين وشمال</div><canvas id="frC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="frX">إغلاق</button></div>';
  const cv=$('frC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('frC')&&$('modal').style.display!=='none';
  const dw=()=>{const gr=x.createLinearGradient(0,0,0,CH);gr.addColorStop(0,'#74c0fc');gr.addColorStop(1,'#d3f9d8');x.fillStyle=gr;x.fillRect(0,0,W,CH);
   for(const p of pl){if(!p.on)continue;const y=p.y-cam;if(y<-20||y>CH+20)continue;x.fillStyle=p.t===1?'#f783ac':p.t===2?'#a9744f':'#51cf66';x.beginPath();x.ellipse(p.x+PWd/2,y+PT/2,PWd/2,PT,0,0,6.3);x.fill();x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.ellipse(p.x+PWd/2,y+PT/2+2,PWd/2-3,PT-3,0,0,6.3);x.fill()}
   const y=fy-cam;x.fillStyle='#40c057';x.beginPath();x.ellipse(fx,y,R,R*(vy<0?1.15:0.95),0,0,6.3);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(fx-R*.4,y-R*.5,R*.33,0,6.3);x.arc(fx+R*.4,y-R*.5,R*.33,0,6.3);x.fill();x.fillStyle='#212529';x.beginPath();x.arc(fx-R*.4,y-R*.5,R*.15,0,6.3);x.arc(fx+R*.4,y-R*.5,R*.15,0,6.3);x.fill();x.strokeStyle='#2b8a3e';x.lineWidth=2;x.beginPath();x.arc(fx,y+R*.1,R*.45,0.2,2.9);x.stroke();
   x.fillStyle='#fff';x.strokeStyle='#1864ab';x.lineWidth=4;x.font='bold 22px sans-serif';x.textAlign='center';x.strokeText(sc,W/2,26);x.fillText(sc,W/2,26)};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.frgd||me.frgd.d!==d)me.frgd={d,c:0};let pay=Math.min(5,Math.floor(sc/50));pay=Math.max(0,Math.min(pay,12-me.frgd.c));me.frgd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.frgBest||0);if(nb)me.frgBest=sc;me.frgGames=(me.frgGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(sc>=50?'🐸 برافو!':'💦 وقعت في المية')+'</h2><div style="text-align:center;font-size:16px">الارتفاع: <b>'+sc+'</b> م'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.frgBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=50?'(وصلت حد النهاردة)':'اطلع 50 متر عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="frR">🔁 تاني</button><button class="btn d" id="frX">إغلاق</button></div>';$('frR').onclick=()=>{$('modal').style.display='none';frgStart()};$('frX').onclick=()=>{$('modal').style.display='none'}},700)};
  const tick=now=>{if(!open()||over)return;const dt=Math.min(0.035,(now-(last||now))/1000);last=now;
   fx+=(tx-fx)*Math.min(1,dt*12);fx=Math.max(R,Math.min(W-R,fx));
   const oy=fy;vy+=GR*dt;fy+=vy*dt;
   if(vy>0)for(const p of pl){if(!p.on)continue;if(fx>p.x-R*.5&&fx<p.x+PWd+R*.5&&oy+R*.6<=p.y+2&&fy+R*.6>=p.y){fy=p.y-R*.6;vy=-V0;sfx('tick');if(p.t===2)p.on=false;break}}
   for(const p of pl)if(p.t===1&&p.on){p.x+=p.d*50*(W/360)*dt;if(p.x<0){p.x=0;p.d=1}if(p.x>W-PWd){p.x=W-PWd;p.d=-1}}
   if(fy-cam<CH*0.4)cam=fy-CH*0.4;
   while(topY>cam-CH*0.3){topY-=HJ*(0.3+Math.min(0.5,Math.max(0,-topY)/CH/40+Math.random()*0.35));addP(topY)}
   pl=pl.filter(p=>p.y-cam<CH+30);
   sc=Math.max(sc,Math.floor((CH-30-fy)/(CH/40)));
   if(fy-cam>CH+R){dw();return fin()}
   if($('frH'))$('frH').textContent='🐸 '+sc+' م';
   dw();requestAnimationFrame(tick)};
  const mv=e=>{e.preventDefault();const r=cv.getBoundingClientRect();tx=(e.clientX-r.left)*W/r.width};
  cv.onpointermove=mv;cv.onpointerdown=mv;
  $('frX').onclick=()=>{$('modal').style.display='none'};dw();requestAnimationFrame(tick)})}

/* sokoban depot */
let dpt=null;
function buildDepot(){
 const g=indoor(0x6f4e37,0xd9c8a9,0xc2874b);
 sign(g,'📦 المخزن',0,4.6,-7.6,'rgba(160,104,56,.92)');
 const crate=(x,z,y,s,c)=>{g.add(mesh(G.box(s,s,s),c,x,y+s/2,z,0x221100),mesh(G.box(s*1.02,s*0.1,s*1.02),0x8d5a2b,x,y+s*0.15,z),mesh(G.box(s*1.02,s*0.1,s*1.02),0x8d5a2b,x,y+s*0.85,z))};
 for(let i=0;i<4;i++)crate(-5.6+i*0.9,-6.4,0,0.8,0xc2874b);
 for(let i=0;i<3;i++)crate(-5.15+i*0.9,-6.4,0.8,0.8,0xd6a064);
 crate(-4.7,-6.4,1.6,0.8,0xc2874b);
 for(let i=0;i<4;i++)crate(2.4+i*0.9,-6.4,0,0.8,0xa9753d);
 for(let i=0;i<2;i++)crate(2.85+i*0.9,-6.4,0.8,0.8,0xc2874b);
 g.add(mesh(G.box(2.4,0.04,2.4),0x2f9e44,0,0.03,-3.2,0x144d1c));
 [[-0.8,-3.2],[0.8,-3.2]].forEach(([x,z])=>g.add(mesh(G.cyl(0.35,0.35,0.05,10),0xfa5252,x,0.08,z,0x660000)));
 crate(-0.8,-4.2,0,0.7,0xc2874b);crate(0.8,-2.2,0,0.7,0xc2874b);
 [[-5,-2],[5,-2],[-5.5,1.5],[5.5,1.5]].forEach(([x,z],i)=>{g.add(mesh(G.cyl(0.35,0.35,0.9,8),0x495057,x,0.45,z),mesh(G.cyl(0.38,0.38,0.08,8),0xfab005,x,0.6,z,0x553300))});
 dpt={it:{x:0,z:2.2,label:'📦 لغز المخزن',fn:sokStart}};interacts.push(dpt.it);
 g.add(portalMesh('ارجع لبركة الضفادع',5.8,5.8,0x40c057,'lily'),portalMesh('🫧 مصنع الفقاعات',-5.8,5.8,0x22b8cf,'foam'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('📦 ادفع الصناديق على النقط الحمرا',3000)
}
function sokLen(S){const C=S.C,R=S.R,w=new Set(S.wall),gs=new Set(S.goals),key=(p,b)=>p+'|'+b.slice().sort((a,c)=>a-c).join(','),seen=new Set([key(S.pl,S.box)]);let q=[[S.pl,S.box]],n=0,d=0;
 while(q.length&&n<12000){const nq=[];d++;for(const [pp,bb] of q){n++;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const px=pp%C+dx,py=Math.floor(pp/C)+dy,ni=py*C+px;if(w.has(ni))continue;let nb=bb;const bi=bb.indexOf(ni);if(bi>=0){const ti=(py+dy)*C+px+dx;if(w.has(ti)||bb.includes(ti))continue;nb=bb.slice();nb[bi]=ti}const k=key(ni,nb);if(seen.has(k))continue;seen.add(k);if(nb.every(x=>gs.has(x)))return d;nq.push([ni,nb])}}q=nq}return -1}
function sokGen(lv){let best=null,bl=-2,t0=Date.now();const want=Math.min(34,4+lv*4);for(let i=0;i<14&&(i<1||Date.now()-t0<220);i++){const L=sokGen1(lv),n=sokLen(L);if(n>=want)return L;if(n>bl){bl=n;best=L}}return best}
function sokGen1(lv){
 const C=6+Math.min(2,lv>>1),R=5+Math.min(2,(lv+1)>>1),nb=Math.min(4,1+(lv>>1)),T=10+lv*6;
 for(let tr=0;tr<200;tr++){
  const wall=new Set(),at=(x,y)=>y*C+x;
  for(let x=0;x<C;x++){wall.add(at(x,0));wall.add(at(x,R-1))}for(let y=0;y<R;y++){wall.add(at(0,y));wall.add(at(C-1,y))}
  const nw=Math.min(6,Math.floor(lv/1.5)+1);for(let i=0;i<nw;i++){const x=1+Math.floor(Math.random()*(C-2)),y=1+Math.floor(Math.random()*(R-2));wall.add(at(x,y))}
  const free=[];for(let y=1;y<R-1;y++)for(let x=1;x<C-1;x++)if(!wall.has(at(x,y)))free.push(at(x,y));
  if(free.length<nb+3)continue;free.sort(()=>Math.random()-.5);
  const goals=free.slice(0,nb),box=goals.slice();let pl=free[nb];
  const isF=i=>!wall.has(i)&&!box.includes(i);let pulls=0;
  for(let st=0;st<T*40&&pulls<T;st++){const d=[[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random()*4)],px=pl%C,py=Math.floor(pl/C),f=at(px+d[0],py+d[1]),bk=at(px-d[0],py-d[1]);
   const bi=box.indexOf(f);if(bi>=0&&isF(bk)&&px-d[0]>0&&px-d[0]<C-1&&py-d[1]>0&&py-d[1]<R-1){box[bi]=pl;pl=bk;pulls++}else if(bi<0&&!wall.has(f)){pl=f}}
  if(box.some(b=>goals.includes(b)))continue;
  if(pulls<Math.max(3,T*0.4))continue;
  return{C,R,wall:[...wall],goals,box,pl}
 }
 return{C:5,R:4,wall:[0,1,2,3,4,5,9,10,14,15,16,17,18,19],goals:[8],box:[7],pl:6}
}
function sokStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CHm=H?Math.max(110,innerHeight-205):Math.max(200,Math.min(innerHeight-400,330));
 let lv=me.sokLv||0,L=sokGen(lv),{C,R}=L,wall=new Set(L.wall),goals=L.goals,box=L.box.slice(),pl=L.pl,mv=0,hist=[],done=false;
 const CS=Math.floor(Math.min(W/C,CHm/R)),CW=CS*C,CHh=CS*R;
 const solved=()=>box.every(b=>goals.includes(b));
 window.sokq=()=>({C,R,wall:[...wall],goals,box,pl,mv,done,lv,state:()=>({C,R,wall:[...wall],goals,box:box.slice(),pl}),move:(dx,dy)=>move(dx,dy)});
 let move=()=>{};
 modal(c=>{
  const bs='style="flex:1;min-width:0;padding:0;font-size:'+(H?18:22)+'px;min-height:'+(H?34:48)+'px!important"';
  c.innerHTML=(H?'':'<h2 style="margin:4px">📦 لغز المخزن</h2>')+'<div id="skH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="skC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="gap:4px"><button class="btn" id="skL" '+bs+'>⬅️</button><button class="btn" id="skU" '+bs+'>⬆️</button><button class="btn" id="skD" '+bs+'>⬇️</button><button class="btn" id="skRt" '+bs+'>➡️</button><button class="btn" id="skUn" '+bs+'>↩️</button><button class="btn" id="skRs" '+bs+'>🔁</button></div><div class="row"><button class="btn d" id="skX" style="'+(H?'min-height:34px!important':'')+'">إغلاق</button></div>';
  const cv=$('skC');cv.width=CW;cv.height=CHh;const x=cv.getContext('2d');
  const open=()=>$('skC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('skH'))$('skH').textContent='مرحلة '+(lv+1)+' · حركات '+mv+' · صناديق '+box.filter(b=>goals.includes(b)).length+'/'+box.length};
  const dw=()=>{x.fillStyle='#2b2d42';x.fillRect(0,0,CW,CHh);
   for(let i=0;i<R*C;i++){const cx=(i%C)*CS,cy=Math.floor(i/C)*CS;if(wall.has(i)){x.fillStyle='#7048e8';x.fillRect(cx,cy,CS,CS);x.fillStyle='#845ef7';x.fillRect(cx+2,cy+2,CS-4,CS/2-3);x.fillRect(cx+2,cy+CS/2+1,CS-4,CS/2-3)}else{x.fillStyle=(i%C+Math.floor(i/C))%2?'#f1e4c8':'#e8d9b5';x.fillRect(cx,cy,CS,CS)}}
   for(const g of goals){const cx=(g%C)*CS+CS/2,cy=Math.floor(g/C)*CS+CS/2;x.fillStyle='#fa5252';x.beginPath();x.arc(cx,cy,CS*0.18,0,6.3);x.fill()}
   for(const b of box){const cx=(b%C)*CS,cy=Math.floor(b/C)*CS,on=goals.includes(b);x.fillStyle=on?'#40c057':'#c2874b';x.fillRect(cx+3,cy+3,CS-6,CS-6);x.strokeStyle=on?'#2b8a3e':'#8d5a2b';x.lineWidth=3;x.strokeRect(cx+3,cy+3,CS-6,CS-6);x.beginPath();x.moveTo(cx+5,cy+5);x.lineTo(cx+CS-5,cy+CS-5);x.moveTo(cx+CS-5,cy+5);x.lineTo(cx+5,cy+CS-5);x.stroke()}
   const px=(pl%C)*CS+CS/2,py=Math.floor(pl/C)*CS+CS/2;x.fillStyle='#4dabf7';x.beginPath();x.arc(px,py,CS*0.36,0,6.3);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(px-CS*.12,py-CS*.06,CS*.09,0,6.3);x.arc(px+CS*.12,py-CS*.06,CS*.09,0,6.3);x.fill();x.fillStyle='#212529';x.beginPath();x.arc(px-CS*.12,py-CS*.06,CS*.04,0,6.3);x.arc(px+CS*.12,py-CS*.06,CS*.04,0,6.3);x.fill()};
  move=(dx,dy)=>{if(done||!open())return;const px=pl%C+dx,py=Math.floor(pl/C)+dy,ni=py*C+px;if(wall.has(ni))return;const bi=box.indexOf(ni);hist.push([pl,box.slice()]);if(bi>=0){const ti=(py+dy)*C+px+dx;if(wall.has(ti)||box.includes(ti)){hist.pop();return}box[bi]=ti;sfx('place')}else sfx('tick');pl=ni;mv++;dw();hud();if(solved())win()};
  const win=()=>{done=true;setTimeout(()=>{if(!open())return;const d=today();if(!me.sokd||me.sokd.d!==d)me.sokd={d,c:0};let pay=2;pay=Math.max(0,Math.min(pay,12-me.sokd.c));me.sokd.c+=pay;me.coins+=pay;updCoins();me.sokLv=lv+1;me.sokBest=Math.max(me.sokBest||0,lv+1);me.sokGames=(me.sokGames||0)+1;saveMe();sfx('win');
   c.innerHTML='<h2>✅ المرحلة '+(lv+1)+' خلصت!</h2><div style="text-align:center;font-size:16px">حركات: <b>'+mv+'</b><br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'<br>المراحل اللي خلصتها: '+me.sokBest+'</div><div class="row"><button class="btn g" id="skN">▶️ المرحلة الجاية</button><button class="btn d" id="skX">إغلاق</button></div>';$('skN').onclick=()=>{$('modal').style.display='none';sokStart()};$('skX').onclick=()=>{$('modal').style.display='none'}},500)};
  $('skL').onclick=()=>move(-1,0);$('skRt').onclick=()=>move(1,0);$('skU').onclick=()=>move(0,-1);$('skD').onclick=()=>move(0,1);
  $('skUn').onclick=()=>{if(done||!hist.length)return;const h=hist.pop();pl=h[0];box=h[1];mv=Math.max(0,mv-1);dw();hud()};
  $('skRs').onclick=()=>{if(done)return;box=L.box.slice();pl=L.pl;mv=0;hist=[];dw();hud()};
  let sx0=0,sy0=0;cv.onpointerdown=e=>{e.preventDefault();sx0=e.clientX;sy0=e.clientY};cv.onpointerup=e=>{e.preventDefault();const dx=e.clientX-sx0,dy=e.clientY-sy0;if(Math.max(Math.abs(dx),Math.abs(dy))<14)return;if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1,0);else move(0,dy>0?1:-1)};
  $('skX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}

/* bubble shooter */
let fom=null;
function buildFoam(){
 const g=indoor(0x0b7285,0xc5f6fa,0x22b8cf);
 sign(g,'🫧 مصنع الفقاعات',0,4.6,-7.6,'rgba(11,114,133,.92)');
 const cl=[0xfa5252,0x4dabf7,0xfcc419,0x51cf66,0xda77f2];
 g.add(mesh(G.cyl(1.1,1.3,2,12),0x868e96,0,1,-5.4),mesh(G.cyl(0.9,0.9,0.3,12),0x495057,0,2.15,-5.4));
 for(let i=0;i<14;i++){const a=i*0.9,rr=0.25+Math.random()*0.4;g.add(mesh(G.sph(rr,8),cl[i%5],-3.5+(i%7)*1.15+Math.random()*.3,2.3+Math.floor(i/7)*1.0+Math.random()*.6,-6.6+Math.random()*1.3,cl[i%5]))}
 for(let i=0;i<10;i++){const x=-3+Math.random()*6,z=-3.5+Math.random()*3,rr=0.2+Math.random()*0.35;g.add(mesh(G.sph(rr,8),cl[i%5],x,rr,z,cl[i%5]))}
 [[-5,-2],[5,-2],[-5.5,1.5],[5.5,1.5]].forEach(([x,z],i)=>{g.add(mesh(G.cyl(0.4,0.4,0.8,8),0x0b7285,x,0.4,z),mesh(G.sph(0.34,8),cl[i],x,1.0,z,cl[i]))});
 fom={it:{x:0,z:2.2,label:'🫧 اضرب الفقاعات',fn:bbsStart}};interacts.push(fom.it);
 g.add(portalMesh('ارجع للمخزن',5.8,5.8,0xc2874b,'depot'),portalMesh('🍳 مطبخ الشيف',-5.8,5.8,0xff922b,'chef'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🫧 وجّه واطلق: 3 فقاعات من نفس اللون بتفرقع',3000)
}
function bbsStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(240,Math.min(innerHeight-300,440)),W=Math.min(innerWidth-50,360),COLS=H?14:9,r=W/(COLS*2),RH=r*1.74,NR0=H?2:5,CL=['#fa5252','#4dabf7','#fcc419','#51cf66','#da77f2'],lineY=CH-r*3.6;
 let off=0,grid=[],sc=0,lv=1,shots=0,miss=0,over=false,last=0,ball=null,aim=-Math.PI/2,cur=0,nxt=0,pops=0,sx=W/2,sy=CH-r-6;
 const cols=row=>((row+off)&1)?COLS-1:COLS,px=(row,c)=>r+c*2*r+(((row+off)&1)?r:0),py=row=>r+row*RH,at=(row,c)=>grid[row]&&grid[row][c];
 const nbs=(row,c)=>{const o=(row+off)&1,res=[[row,c-1],[row,c+1]];for(const dr of[-1,1])if(o)res.push([row+dr,c],[row+dr,c+1]);else res.push([row+dr,c-1],[row+dr,c]);return res.filter(([a,b])=>a>=0&&a<grid.length&&b>=0&&b<cols(a))};
 const mkRow=()=>Array.from({length:cols(0)},()=>1+Math.floor(Math.random()*(lv>2?5:4)));
 const fill=n=>{grid=[];for(let i=0;i<n;i++){grid.push(null);}for(let i=0;i<n;i++){grid[i]=Array.from({length:cols(i)},()=>1+Math.floor(Math.random()*(lv>2?5:4)))}};
 fill(NR0);
 const present=()=>{const s=new Set();grid.forEach(rw=>rw.forEach(v=>v&&s.add(v)));return[...s]};
 const pick=()=>{const p=present();return p.length?p[Math.floor(Math.random()*p.length)]:1};
 cur=pick();nxt=pick();
 window.bbq=()=>({sc,over,ball:!!ball,cur,aim,rows:grid.length,lv,shots,pops,r,W,CH,sx,sy,grid,px,py,cols,setAim:a=>{aim=Math.max(0.2,Math.min(Math.PI-0.2,a))*-1},shoot:()=>shoot()});
 let shoot=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🫧 مصنع الفقاعات</h2>')+'<div id="bbH" style="text-align:center;font-size:14px;margin:2px">وجّه بصباعك وسيب عشان تطلق</div><canvas id="bbC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="bbX">إغلاق</button></div>';
  const cv=$('bbC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('bbC')&&$('modal').style.display!=='none';
  const dw=()=>{x.fillStyle='#0b2a3a';x.fillRect(0,0,W,CH);
   grid.forEach((rw,row)=>rw.forEach((v,cc)=>{if(!v)return;x.fillStyle=CL[v-1];x.beginPath();x.arc(px(row,cc),py(row),r*0.93,0,6.3);x.fill();x.fillStyle='rgba(255,255,255,.4)';x.beginPath();x.arc(px(row,cc)-r*.3,py(row)-r*.3,r*.25,0,6.3);x.fill()}));
   x.strokeStyle='rgba(255,107,107,.7)';x.setLineDash([6,5]);x.beginPath();x.moveTo(0,lineY);x.lineTo(W,lineY);x.stroke();x.setLineDash([]);
   if(!ball){x.strokeStyle='rgba(255,255,255,.55)';x.setLineDash([4,6]);x.beginPath();x.moveTo(sx,sy);x.lineTo(sx+Math.cos(aim)*CH*0.5,sy+Math.sin(aim)*CH*0.5);x.stroke();x.setLineDash([])}
   const drawB=(bx,by,v)=>{x.fillStyle=CL[v-1];x.beginPath();x.arc(bx,by,r*0.93,0,6.3);x.fill();x.fillStyle='rgba(255,255,255,.4)';x.beginPath();x.arc(bx-r*.3,by-r*.3,r*.25,0,6.3);x.fill()};
   if(ball)drawB(ball.x,ball.y,ball.v);else drawB(sx,sy,cur);drawB(sx-r*3.2,sy+r*0.2,nxt);
   x.fillStyle='rgba(255,255,255,.85)';x.font='bold 13px sans-serif';x.textAlign='left';x.fillText(sc,6,CH-4)};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.bbsd||me.bbsd.d!==d)me.bbsd={d,c:0};let pay=Math.min(5,Math.floor(sc/120));pay=Math.max(0,Math.min(pay,12-me.bbsd.c));me.bbsd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.bbsBest||0);if(nb)me.bbsBest=sc;me.bbsGames=(me.bbsGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(sc>=120?'🫧 برافو!':'💥 الفقاعات وصلت')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · فرقعت: <b>'+pops+'</b> · مرحلة '+lv+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.bbsBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=120?'(وصلت حد النهاردة)':'اوصل 120 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="bbR">🔁 تاني</button><button class="btn d" id="bbX">إغلاق</button></div>';$('bbR').onclick=()=>{$('modal').style.display='none';bbsStart()};$('bbX').onclick=()=>{$('modal').style.display='none'}},700)};
  shoot=()=>{if(ball||over)return;ball={x:sx,y:sy,vx:Math.cos(aim)*560*(W/360),vy:Math.sin(aim)*560*(W/360),v:cur};shots++;sfx('tick')};
  const settle=()=>{let best=null,bd=1e9;const rowG=Math.round((ball.y-r)/RH);for(let row=Math.max(0,rowG-1);row<=rowG+1;row++){if(row>=40)continue;for(let cc=0;cc<cols(row);cc++){if(at(row,cc))continue;const d=Math.hypot(px(row,cc)-ball.x,py(row)-ball.y);if(d<bd){bd=d;best=[row,cc]}}}
   if(!best){ball=null;return}
   while(grid.length<=best[0])grid.push(Array.from({length:cols(grid.length)},()=>0));
   grid[best[0]][best[1]]=ball.v;
   const v=ball.v,seen=new Set([best[0]+','+best[1]]),st=[best],grp=[best];while(st.length){const [a,b]=st.pop();for(const [na,nb] of nbs(a,b)){const k=na+','+nb;if(!seen.has(k)&&at(na,nb)===v){seen.add(k);st.push([na,nb]);grp.push([na,nb])}}}
   let popped=0;if(grp.length>=3){for(const [a,b] of grp)grid[a][b]=0;popped=grp.length;sc+=popped*10;pops+=popped;sfx('place');
    const con=new Set(),s2=[];grid[0]&&grid[0].forEach((q,cc)=>{if(q){con.add('0,'+cc);s2.push([0,cc])}});while(s2.length){const [a,b]=s2.pop();for(const [na,nb] of nbs(a,b)){const k=na+','+nb;if(!con.has(k)&&at(na,nb)){con.add(k);s2.push([na,nb])}}}
    grid.forEach((rw,a)=>rw.forEach((q,b)=>{if(q&&!con.has(a+','+b)){grid[a][b]=0;sc+=20;pops++}}))}
   ball=null;miss=popped?0:miss+1;
   while(grid.length&&grid[grid.length-1].every(q=>!q))grid.pop();
   if(miss>=(H?9:6)){miss=0;off^=1;grid.unshift(Array.from({length:cols(0)},()=>1+Math.floor(Math.random()*(lv>2?5:4))))}
   if(!grid.length||grid.every(rw=>rw.every(q=>!q))){lv++;sc+=100;off=0;fill(NR0);sfx('win')}
   if(grid.some((rw,row)=>rw.some(q=>q)&&py(row)+r>=lineY)){return fin()}
   cur=nxt;if(!present().includes(cur))cur=pick();nxt=pick()};
  const tick=now=>{if(!open()||over)return;const dt=Math.min(0.03,(now-(last||now))/1000);last=now;
   if(ball){const steps=4;for(let s=0;s<steps&&ball;s++){ball.x+=ball.vx*dt/steps;ball.y+=ball.vy*dt/steps;if(ball.x<r){ball.x=r;ball.vx=Math.abs(ball.vx)}if(ball.x>W-r){ball.x=W-r;ball.vx=-Math.abs(ball.vx)}
     let hit=ball.y<=r;if(!hit)for(let row=0;row<grid.length&&!hit;row++)for(let cc=0;cc<grid[row].length;cc++)if(grid[row][cc]&&Math.hypot(px(row,cc)-ball.x,py(row)-ball.y)<r*1.85){hit=true;break}
     if(hit){settle();if(over)return}}}
   if($('bbH'))$('bbH').textContent='نقاط '+sc+' · مرحلة '+lv;
   dw();requestAnimationFrame(tick)};
  const aimTo=e=>{e.preventDefault();const rc=cv.getBoundingClientRect(),X=(e.clientX-rc.left)*W/rc.width,Y=(e.clientY-rc.top)*CH/rc.height;let a=Math.atan2(Y-sy,X-sx);if(a>-0.2)a=a>0?(X<sx?-Math.PI+0.2:-0.2):-0.2;if(a<-Math.PI+0.2)a=-Math.PI+0.2;aim=a};
  cv.onpointerdown=aimTo;cv.onpointermove=e=>{if(e.buttons||e.pressure>0)aimTo(e)};cv.onpointerup=e=>{aimTo(e);shoot()};
  $('bbX').onclick=()=>{$('modal').style.display='none'};dw();requestAnimationFrame(tick)})}

/* chef timing game */
let chr=null;
function buildChef(){
 const g=indoor(0xf1f3f5,0xe9ecef,0xff922b);
 sign(g,'🍳 مطبخ الشيف',0,4.6,-7.6,'rgba(230,119,0,.92)');
 g.add(mesh(G.box(9,0.9,1.2),0xadb5bd,0,0.45,-6.6),mesh(G.box(9.2,0.12,1.4),0x495057,0,0.95,-6.6));
 for(let i=0;i<3;i++){const x=-2.6+i*2.6;g.add(mesh(G.cyl(0.8,0.7,0.2,12),0x212529,x,1.1,-6.6),mesh(G.cyl(0.55,0.55,0.05,12),0xfcc419,x,1.22,-6.6,0x886600),mesh(G.sph(0.18,6),0xffffff,x+0.2,1.27,-6.55))}
 g.add(mesh(G.box(3.4,0.9,1.4),0x868e96,0,0.45,-3),mesh(G.box(3.5,0.1,1.5),0xf8f9fa,0,0.95,-3));
 g.add(mesh(G.cyl(0.4,0.35,0.7,10),0xc92a2a,-1,1.35,-3),mesh(G.cyl(0.3,0.3,0.4,10),0xf8f9fa,0.8,1.2,-3),mesh(G.cyl(0.36,0.36,0.25,12),0xfd7e14,0.1,1.1,-3,0x663300));
 [[-5,-2],[5,-2],[-5.5,1.5],[5.5,1.5]].forEach(([x,z],i)=>{g.add(mesh(G.cyl(0.35,0.35,1.1,8),0xdee2e6,x,0.55,z),mesh(G.cyl(0.4,0.4,0.2,8),i%2?0xff922b:0xfa5252,x,1.15,z))});
 chr={it:{x:0,z:0.2,label:'🍳 اطبخ',fn:chfStart}};interacts.push(chr.it);
 g.add(portalMesh('ارجع لمصنع الفقاعات',5.8,5.8,0x22b8cf,'foam'),portalMesh('🏗️ ورشة البناء',-5.8,5.8,0xfcc419,'tower'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🍳 دوس على الطبخة وهي دهبي بالظبط',3000)
}
function chfStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-340,360)),W=Math.min(innerWidth-50,360),N=3,PWd=W/N;
 let pans=[],lives=3,sc=0,served=0,over=false,last=0,lv=1,msg='',msgT=0,msgC='#fff';
 const dur=()=>Math.max(1.5,3.6-lv*0.2)*(0.85+Math.random()*0.5);
 for(let i=0;i<N;i++)pans.push({p:0,d:dur(),wait:0.3+i*0.5,st:'wait',t:0,z0:0.58,z1:0.8});
 window.chq=()=>({lives,sc,served,over,lv,pans:pans.map(p=>({p:p.p,st:p.st,z0:p.z0,z1:p.z1})),tap:i=>tap(i)});
 let tap=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🍳 مطبخ الشيف</h2>')+'<div id="chH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="chC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="chX">إغلاق</button></div>';
  const cv=$('chC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('chC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('chH'))$('chH').textContent='❤️ '+lives+' · طُبخ '+served+' · مستوى '+lv};
  const col=p=>{const k=Math.min(1,p);return k<0.4?'#f8f0d8':k<0.58?'#f3d27a':k<0.8?'#e0a030':k<0.9?'#8b5a1e':'#2b2118'};
  const dw=()=>{x.fillStyle='#fff4e0';x.fillRect(0,0,W,CH);x.fillStyle='#ced4da';x.fillRect(0,CH*0.62,W,CH*0.38);
   pans.forEach((p,i)=>{const cx=i*PWd+PWd/2,cy=CH*0.5,R=Math.min(PWd*0.36,CH*0.26);
    x.fillStyle='#343a40';x.beginPath();x.arc(cx,cy,R,0,6.3);x.fill();x.fillStyle='#495057';x.beginPath();x.arc(cx,cy,R*0.84,0,6.3);x.fill();x.fillStyle='#343a40';x.fillRect(cx+R*0.9,cy-R*0.1,R*0.7,R*0.2);
    if(p.st==='cook'){x.fillStyle=col(p.p);x.beginPath();x.ellipse(cx,cy,R*0.6,R*0.5,0,0,6.3);x.fill();x.fillStyle=p.p<0.58?'#fff':'#f6c15a';x.beginPath();x.arc(cx-R*0.1,cy-R*0.05,R*0.2,0,6.3);x.fill();if(p.p>0.9){x.fillStyle='rgba(60,60,60,.6)';x.beginPath();x.arc(cx,cy-R*0.9-Math.sin(Date.now()/150)*3,R*0.25,0,6.3);x.fill()}}
    const bx=cx-R,by=cy+R+8,bw=R*2,bh=10;x.fillStyle='#868e96';x.fillRect(bx,by,bw,bh);x.fillStyle='#51cf66';x.fillRect(bx+bw*p.z0,by,bw*(p.z1-p.z0),bh);if(p.st==='cook'){x.fillStyle='#fff';x.fillRect(bx+bw*Math.min(1,p.p)-2,by-4,4,bh+8)}
    x.strokeStyle='#212529';x.lineWidth=1;x.strokeRect(bx,by,bw,bh)});
   if(msgT>0){x.fillStyle=msgC;x.strokeStyle='#212529';x.lineWidth=4;x.font='bold 22px sans-serif';x.textAlign='center';x.strokeText(msg,W/2,28);x.fillText(msg,W/2,28)}
   x.fillStyle='#212529';x.font='bold 15px sans-serif';x.textAlign='left';x.fillText(sc,8,CH-6)};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.chfd||me.chfd.d!==d)me.chfd={d,c:0};let pay=Math.min(5,Math.floor(sc/60));pay=Math.max(0,Math.min(pay,12-me.chfd.c));me.chfd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.chfBest||0);if(nb)me.chfBest=sc;me.chfGames=(me.chfGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(sc>=60?'🍳 شيف كبير!':'🔥 المطبخ اتحرق')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · طُبخ: <b>'+served+'</b>'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.chfBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=60?'(وصلت حد النهاردة)':'اوصل 60 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="chR">🔁 تاني</button><button class="btn d" id="chX">إغلاق</button></div>';$('chR').onclick=()=>{$('modal').style.display='none';chfStart()};$('chX').onclick=()=>{$('modal').style.display='none'}},700)};
  const say=(m,c)=>{msg=m;msgC=c;msgT=0.9};
  const lose=m=>{lives--;say(m,'#ff6b6b');sfx('err');if(lives<=0){hud();fin();return true}return false};
  tap=i=>{if(over||!open())return;const p=pans[i];if(!p||p.st!=='cook')return;
   if(p.p>=p.z0&&p.p<=p.z1){const mid=(p.z0+p.z1)/2,q=1-Math.abs(p.p-mid)/((p.z1-p.z0)/2);const pts=10+Math.round(q*10);sc+=pts;served++;if(served%5===0)lv++;say(q>0.7?'ممتاز! +'+pts:'كويس +'+pts,'#69db7c');sfx('place');p.st='wait';p.wait=0.4;p.p=0;hud()}
   else if(p.p<p.z0){p.st='wait';p.wait=0.5;p.p=0;lose('لسه نيّة!')}
   else{p.st='wait';p.wait=0.5;p.p=0;lose('اتحرقت!')}};
  const tick=now=>{if(!open()||over)return;const dt=Math.min(0.04,(now-(last||now))/1000);last=now;if(msgT>0)msgT-=dt;
   for(const p of pans){if(p.st==='wait'){p.wait-=dt;if(p.wait<=0){p.st='cook';p.p=0;p.d=dur();const w=Math.max(0.12,0.22-lv*0.008);p.z0=0.58+(Math.random()*0.06);p.z1=p.z0+w}}else if(p.st==='cook'){p.p+=dt/p.d;if(p.p>=1){p.st='wait';p.wait=0.6;p.p=0;if(lose('اتحرقت!'))return}}}
   hud();dw();requestAnimationFrame(tick)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect();tap(Math.max(0,Math.min(N-1,Math.floor((e.clientX-r.left)*W/r.width/PWd))))};
  $('chX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}
let twh=null;
function buildTwr(){
 const g=indoor(0xe67700,0xfff3bf,0xfcc419);
 sign(g,'🏗️ ورشة البناء',0,4.6,-7.6,'rgba(230,119,0,.92)');
 const cl=[0xfa5252,0x4dabf7,0x51cf66,0xfcc419,0xda77f2,0xff922b];
 for(let i=0;i<6;i++){const w=2.6-i*0.3;g.add(mesh(G.box(w,0.7,1.6),cl[i],-3,0.35+i*0.7,-5.4))}
 g.add(mesh(G.box(0.3,5,0.3),0xfcc419,3.4,2.5,-6),mesh(G.box(5,0.25,0.25),0xfcc419,1.6,5,-6),mesh(G.box(0.08,2,0.08),0x343a40,0.2,4,-6),mesh(G.box(0.8,0.5,0.8),0x868e96,0.2,2.8,-6));
 for(let i=0;i<5;i++)g.add(mesh(G.cyl(0.3,0.3,0.8,8),0xff6b00,-5.5+i*0.9,0.4,1.8),mesh(G.cyl(0.18,0.3,0.25,8),0xffffff,-5.5+i*0.9,0.9,1.8));
 [[-5,-2],[5,-2]].forEach(([x,z],i)=>{g.add(mesh(G.box(1.1,0.8,1.1),cl[i+2],x,0.4,z),mesh(G.box(0.8,0.6,0.8),cl[i],x,1.1,z))});
 twh={it:{x:0,z:0.2,label:'🏗️ ابني البرج',fn:twrStart}};interacts.push(twh.it);
 g.add(portalMesh('ارجع لمطبخ الشيف',5.8,5.8,0xff922b,'chef'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏗️ دوس في الوقت الصح عشان تركّب الدور فوق اللي قبله',3000)
}
function twrStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(240,Math.min(innerHeight-340,400)),W=Math.min(innerWidth-50,360),bh=H?14:18,w0=W*0.5;
 let bl=[{x:(W-w0)/2,w:w0}],cur=null,combo=0,over=false,last=0,msg='',msgT=0,msgC='#fff',cam=0,fr=[];
 const sc=()=>bl.length-1;
 const mk=()=>{const t=bl[bl.length-1];cur={x:Math.random()<.5?0:W-t.w,w:t.w,dir:1};cur.dir=cur.x===0?1:-1};
 mk();
 let drop=()=>{};
 window.twq=()=>({sc:sc(),over,combo,cur:{x:cur.x,w:cur.w},top:bl[bl.length-1],drop:()=>drop()});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏗️ ورشة البناء</h2>')+'<div id="twH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="twC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="twX">إغلاق</button></div>';
  const cv=$('twC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('twC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('twH'))$('twH').textContent='🏢 الأدوار: '+sc()+' · أحسن: '+Math.max(me.twrBest||0,sc())+(combo>1?' · 🔥 x'+combo:'')};
  const col=i=>'hsl('+((i*17+10)%360)+',70%,58%)';
  const yOf=i=>CH-24-(i+1)*bh+cam;
  const dw=()=>{const gr=x.createLinearGradient(0,0,0,CH);gr.addColorStop(0,'#74c0fc');gr.addColorStop(1,'#e7f5ff');x.fillStyle=gr;x.fillRect(0,0,W,CH);
   x.fillStyle='#8ce99a';x.fillRect(0,CH-24+cam,W,200);x.fillStyle='#74b816';x.fillRect(0,CH-24+cam,W,4);
   bl.forEach((b,i)=>{const y=yOf(i);if(y<-bh||y>CH)return;x.fillStyle=col(i);x.fillRect(b.x,y,b.w,bh-1);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(b.x,y,b.w,3);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(b.x,y+bh-4,b.w,3)});
   fr.forEach(f=>{x.fillStyle=f.c;x.globalAlpha=Math.max(0,f.a);x.fillRect(f.x,f.y,f.w,bh-1);x.globalAlpha=1});
   if(!over){const y=yOf(bl.length);x.fillStyle=col(bl.length);x.fillRect(cur.x,y,cur.w,bh-1);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(cur.x,y,cur.w,3)}
   if(msgT>0){x.fillStyle=msgC;x.strokeStyle='#212529';x.lineWidth=4;x.font='bold 22px sans-serif';x.textAlign='center';x.strokeText(msg,W/2,30);x.fillText(msg,W/2,30)}
   x.fillStyle='#212529';x.font='bold 16px sans-serif';x.textAlign='left';x.fillText(sc(),8,CH-6)};
  const say=(m,cc)=>{msg=m;msgC=cc;msgT=0.8};
  const fin=()=>{over=true;dw();sfx('err');setTimeout(()=>{if(!open())return;const d=today();if(!me.twrd||me.twrd.d!==d)me.twrd={d,c:0};let pay=Math.min(5,Math.floor(sc()/4));pay=Math.max(0,Math.min(pay,12-me.twrd.c));me.twrd.c+=pay;me.coins+=pay;updCoins();const nb=sc()>(me.twrBest||0);if(nb)me.twrBest=sc();me.twrGames=(me.twrGames||0)+1;saveMe();if(pay||nb)sfx('win');
   c.innerHTML='<h2>'+(sc()>=8?'🏗️ مهندس شاطر!':'🏚️ البرج وقع')+'</h2><div style="text-align:center;font-size:16px">الأدوار: <b>'+sc()+'</b>'+(nb&&sc()?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.twrBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc()>=4?'(وصلت حد النهاردة)':'ابني 4 أدوار عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="twR">🔁 تاني</button><button class="btn d" id="twX">إغلاق</button></div>';$('twR').onclick=()=>{$('modal').style.display='none';twrStart()};$('twX').onclick=()=>{$('modal').style.display='none'}},700)};
  drop=()=>{if(over||!open())return;const t=bl[bl.length-1],dx=cur.x-t.x,y=yOf(bl.length);
   if(Math.abs(dx)<=5){bl.push({x:t.x,w:t.w});combo++;if(combo>=3&&t.w<w0){const nw=Math.min(w0,t.w+6),b=bl[bl.length-1];b.x=Math.max(0,Math.min(W-nw,b.x-(nw-t.w)/2));b.w=nw}say(combo>1?'مثالي! x'+combo:'مثالي!','#ffd43b');sfx('win')}
   else{const ov=t.w-Math.abs(dx);if(ov<=0){fr.push({x:cur.x,y,w:cur.w,vy:0,a:1,c:col(bl.length)});fin();return}
    const nx=Math.max(cur.x,t.x);bl.push({x:nx,w:ov});combo=0;
    fr.push({x:dx>0?nx+ov:cur.x,y,w:Math.abs(dx),vy:0,a:1,c:col(bl.length-1)});sfx('place')}
   mk();hud()};
  const tick=now=>{if(!open())return;const dt=Math.min(0.04,(now-(last||now))/1000);last=now;if(msgT>0)msgT-=dt;
   if(!over){const sp=Math.min(320,110+sc()*7);cur.x+=cur.dir*sp*dt;if(cur.x<=0){cur.x=0;cur.dir=1}if(cur.x>=W-cur.w){cur.x=W-cur.w;cur.dir=-1}}
   const tg=Math.max(0,(bl.length-5)*bh);cam+=(tg-cam)*Math.min(1,dt*6);
   fr.forEach(f=>{f.vy+=900*dt;f.y+=f.vy*dt;f.a-=dt*0.9});fr=fr.filter(f=>f.a>0&&f.y<CH+40);
   dw();if(!over||fr.length)requestAnimationFrame(tick)};
  cv.onpointerdown=e=>{e.preventDefault();drop()};
  $('twX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}
