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
 g.add(portalMesh('ارجع لبرج السماء',5.8,5.8,0x74c0fc,'sky'));
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
