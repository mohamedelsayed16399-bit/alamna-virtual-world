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
 g.add(portalMesh('ارجع للتتريس',5.8,5.8,0xff8787,'tetris'));
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
