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
 g.add(portalMesh('ارجع لصالة الهوكي',5.8,5.8,0x1c7ed6,'hockey'),portalMesh('🧠 استوديو المسابقات',-5.8,5.8,0x862e9c,'quiz'));
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
let qzh=null;
const QZB=[
['عاصمة مصر؟',['القاهرة','الإسكندرية','الجيزة','أسوان'],0],
['كام يوم في السنة العادية؟',['364','365','366','360'],1],
['أكبر كوكب في المجموعة الشمسية؟',['الأرض','المريخ','المشتري','زحل'],2],
['أطول نهر في مصر؟',['الفرات','النيل','دجلة','الأمازون'],1],
['كام لون في قوس قزح؟',['5','6','7','8'],2],
['الحيوان الأسرع في العالم على اليابسة؟',['الأسد','الفهد','الحصان','النمر'],1],
['كام ضلع في المثلث؟',['2','3','4','5'],1],
['إيه ناتج 7 × 8؟',['54','56','58','64'],1],
['الكوكب الأحمر هو؟',['الزهرة','عطارد','المريخ','نبتون'],2],
['أكبر محيط في العالم؟',['الأطلسي','الهندي','الهادي','المتجمد'],2],
['كام حرف في اللغة العربية؟',['26','28','30','32'],1],
['مين بنى الأهرامات؟',['الرومان','المصريين القدماء','الفرس','اليونان'],1],
['أي من دول دي في أفريقيا؟',['البرازيل','كينيا','تايلاند','تشيلي'],1],
['الذهب رمزه الكيميائي؟',['Ag','Au','Fe','Cu'],1],
['كام ساعة في اليوم؟',['12','24','36','48'],1],
['النحلة بتنتج؟',['اللبن','العسل','الحرير','الزيت'],1],
['أكبر حيوان في العالم؟',['الفيل','الحوت الأزرق','الزرافة','القرش'],1],
['كام دقيقة في الساعة؟',['30','45','60','100'],2],
['القمر بيدور حوالين؟',['الشمس','الأرض','المريخ','زحل'],1],
['عدد أيام الأسبوع؟',['5','6','7','8'],2],
['الماء بيغلي عند؟',['50 درجة','80 درجة','100 درجة','120 درجة'],2],
['أكبر قارة في العالم؟',['أفريقيا','آسيا','أوروبا','أمريكا الجنوبية'],1],
['كام سنة في القرن؟',['10','50','100','1000'],2],
['الطائر اللي مبيعرفش يطير؟',['النسر','البطريق','الصقر','الحمام'],1],
['إيه ناتج 15 + 27؟',['41','42','43','52'],1],
['الفاكهة اللي بتتحول لزبيب؟',['التين','العنب','التمر','المشمش'],1],
['كام لاعب في فريق كرة القدم داخل الملعب؟',['9','10','11','12'],2],
['مين الكوكب الأقرب للشمس؟',['الزهرة','عطارد','الأرض','المريخ'],1],
['إيه لون الموز الناضج؟',['أحمر','أصفر','أزرق','بنفسجي'],1],
['كام شهر في السنة؟',['10','11','12','13'],2],
['البحر اللي على حدود مصر الشمالية؟',['الأحمر','المتوسط','الميت','الأسود'],1],
['الحيوان اللي بيعيش في الصحراء ويتحمل العطش؟',['الجمل','البطة','الدلفين','الضفدع'],0],
['إيه ناتج 100 ÷ 4؟',['20','25','30','40'],1],
['كام حاسة عند الإنسان؟',['3','4','5','6'],2],
['أسرع وسيلة نقل في الهواء؟',['القطار','الطائرة','السفينة','الدراجة'],1],
['الكوكب اللي ليه حلقات مشهورة؟',['المشتري','زحل','الأرض','المريخ'],1],
['إيه العضو اللي بيضخ الدم؟',['الرئة','الكبد','القلب','المعدة'],2],
['كام ضلع في المربع؟',['3','4','5','6'],1],
['الشمس هي؟',['كوكب','نجمة','قمر','مذنب'],1],
['اللون الناتج من خلط الأصفر والأزرق؟',['أخضر','برتقالي','بنفسجي','بني'],0],
['مين بيعمل البيض؟',['البقرة','الدجاجة','الخروف','الحصان'],1],
['أعلى جبل في العالم؟',['إيفرست','كليمنجارو','موسى','الألب'],0],
['كام يوم في شهر فبراير في السنة العادية؟',['28','29','30','31'],0]
];
function buildQz(){
 const g=indoor(0x862e9c,0xf8f0fc,0xcc5de8);
 sign(g,'🧠 استوديو المسابقات',0,4.6,-7.6,'rgba(134,46,156,.92)');
 g.add(mesh(G.box(4,0.3,2),0x7048e8,0,0.15,-5.6),mesh(G.box(3.4,1.6,0.2),0x212529,0,1.4,-6.9),mesh(G.box(3.2,1.4,0.05),0x4dabf7,0,1.4,-6.78,0x1864ab));
 [[-1.2,-4.6],[0,-4.6],[1.2,-4.6]].forEach(([x,z],i)=>g.add(mesh(G.cyl(0.35,0.35,0.9,12),[0xfa5252,0xfcc419,0x51cf66][i],x,0.75,z),mesh(G.cyl(0.4,0.4,0.1,12),0xdee2e6,x,1.25,z)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x862e9c,-5,0.5,0),mesh(G.sph(0.4,8),0xfcc419,-5,1.2,0,0xfcc419),mesh(G.cyl(0.4,0.4,1,10),0x862e9c,5,0.5,0),mesh(G.sph(0.4,8),0xfa5252,5,1.2,0,0xfa5252));
 qzh={it:{x:0,z:0.2,label:'🧠 ابدأ المسابقة',fn:qzStart}};interacts.push(qzh.it);
 g.add(portalMesh('ارجع لصالة السهام',5.8,5.8,0x5c940d,'darts'),portalMesh('🥌 صالة الكيرلنج',-5.8,5.8,0x1098ad,'curl'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧠 10 أسئلة، جاوب بسرعة عشان تكسب نقاط أكتر',3000)
}
function qzStart(){
 const H=innerHeight<420,N=10,TL=12;
 const pool=QZB.slice().sort(()=>Math.random()-.5).slice(0,N).map(q=>{const o=q[1].map((t,i)=>({t,c:i===q[2]})).sort(()=>Math.random()-.5);return{q:q[0],o}});
 let i=0,sc=0,ok=0,st=0,over=false,tl=TL,lock=false,iv=null;
 window.qzq=()=>({sc,i,ok,over,lock,cor:over?-1:pool[i].o.findIndex(o=>o.c),ans:k=>pick(k)});
 let pick=()=>{};
 modal(c=>{
  const draw=()=>{if(!$('qzB'))return;const p=pool[i];$('qzT').textContent='سؤال '+(i+1)+'/'+N+' · ⭐ '+sc+(st>1?' · 🔥 x'+st:'');$('qzQ').textContent=p.q;$('qzBar').style.width=(tl/TL*100)+'%';$('qzBar').style.background=tl<4?'#fa5252':'#51cf66';
   $('qzO').innerHTML='';p.o.forEach((o,k)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='width:100%;margin:'+(H?'2px':'3px')+' 0;padding:'+(H?'2px':'')+';min-height:'+(H?'28px':'46px')+'!important;font-size:'+(H?'13':'16')+'px';b.textContent=o.t;b.dataset.k=k;b.onclick=()=>pick(k);$('qzO').appendChild(b)})};
  c.innerHTML=(H?'':'<h2 style="margin:4px">🧠 استوديو المسابقات</h2>')+'<div id="qzB"><div id="qzT" style="text-align:center;font-size:14px;margin:2px"></div><div style="height:8px;background:#495057;border-radius:4px;margin:4px 0"><div id="qzBar" style="height:8px;border-radius:4px;width:100%"></div></div><div id="qzQ" style="text-align:center;font-size:'+(H?'15':'18')+'px;font-weight:bold;margin:'+(H?'2':'10')+'px 0;min-height:'+(H?'20':'44')+'px"></div><div id="qzO"></div></div><div class="row"><button class="btn d" id="qzX">إغلاق</button></div>';
  const open=()=>$('qzB')&&$('modal').style.display!=='none';
  const fin=()=>{over=true;clearInterval(iv);const d=today();if(!me.qzsd||me.qzsd.d!==d)me.qzsd={d,c:0};let pay=Math.min(5,Math.floor(sc/40));pay=Math.max(0,Math.min(pay,12-me.qzsd.c));me.qzsd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.qzsBest||0);if(nb)me.qzsBest=sc;me.qzsGames=(me.qzsGames||0)+1;saveMe();sfx('win');
   c.innerHTML='<h2>'+(ok>=8?'🧠 عبقري!':ok>=5?'👏 كويس!':'📚 حاول تاني')+'</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+ok+'</b>/'+N+' · نقاط: <b>'+sc+'</b>'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.qzsBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=40?'(وصلت حد النهاردة)':'اوصل 40 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn g" id="qzR">🔁 تاني</button><button class="btn d" id="qzX">إغلاق</button></div>';$('qzR').onclick=()=>{$('modal').style.display='none';qzStart()};$('qzX').onclick=()=>{$('modal').style.display='none'}};
  const next=()=>{i++;if(i>=N){fin();return}tl=TL;lock=false;draw()};
  pick=k=>{if(over||lock||!open())return;lock=true;const p=pool[i],good=k>=0&&p.o[k].c;const bs=$('qzO').children;[...bs].forEach((b,j)=>{b.disabled=true;if(p.o[j].c){b.style.background='#2f9e44'}else if(j===k){b.style.background='#e03131'}});
   if(good){ok++;st++;sc+=10+Math.round(tl/TL*5)+Math.min(10,(st-1)*2);sfx('win')}else{st=0;sfx('err')}
   setTimeout(()=>{if(open())next()},900)};
  iv=setInterval(()=>{if(!open()){clearInterval(iv);return}if(over||lock)return;tl-=0.1;if(tl<=0){pick(-1)}else if($('qzBar')){$('qzBar').style.width=(tl/TL*100)+'%';$('qzBar').style.background=tl<4?'#fa5252':'#51cf66'}},100);
  $('qzX').onclick=()=>{clearInterval(iv);$('modal').style.display='none'};draw()})}

/* R268: curling */
let crh=null;
function buildCrl(){
 const g=indoor(0x1098ad,0xe3fafc,0x22b8cf);
 sign(g,'🥌 صالة الكيرلنج',0,4.6,-7.6,'rgba(16,152,173,.92)');
 g.add(mesh(G.box(3.4,0.06,13),0xe7f5ff,0,0.04,-1.2));
 [[1.5,0x1c7ed6],[1.1,0xffffff],[0.7,0xe03131],[0.3,0xffffff]].forEach(([r,c],i)=>g.add(mesh(G.cyl(r,r,0.04,24),c,0,0.08+i*0.01,-5.4)));
 [[-1,-1,0xe03131],[1,-3,0xfcc419],[-0.5,-4.4,0xe03131]].forEach(([x,z,c])=>g.add(mesh(G.cyl(0.32,0.34,0.22,14),0x868e96,x,0.2,z),mesh(G.cyl(0.18,0.18,0.1,10),c,x,0.36,z)));
 [[-2.3,-5],[2.3,-5]].forEach(([x,z])=>g.add(mesh(G.box(0.2,0.5,13),0x1c7ed6,x,0.25,-1.2)));
 g.add(mesh(G.box(0.1,1.4,0.1),0x8d6e63,-4.4,0.7,-1),mesh(G.box(0.6,0.15,0.3),0xe03131,-4.4,0.1,-1));
 crh={it:{x:0,z:0.2,label:'🥌 العب كيرلنج ضد 🤖',fn:crlStart}};interacts.push(crh.it);
 g.add(portalMesh('ارجع لاستوديو المسابقات',5.8,5.8,0x862e9c,'quiz'),portalMesh('⛄ ساحة كرات الثلج',-5.8,5.8,0x339af0,'snowfight'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🥌 اسحب الحجر لورا وسيب عشان تزلقه ناحية الهدف',3200)
}
function crlStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(260,Math.min(innerHeight-330,380)),W=Math.min(innerWidth-50,360);
 const sr=H?7:11,hx=W/2,hy=H?48:Math.round(CH*0.2),HR=H?40:Math.min(W*0.36,CH*0.2),lx=W/2,ly=CH-(H?14:22),hog=H?CH*0.66:CH*0.6;
 const Dm=(ly-hy)*1.35,A=450,VM=Math.sqrt(2*A*Dm),PM=H?58:90;
 let st=[],k=0,end=0,first=0,ph='aim',pt=0,tp=[0,0],bp=0,over=false,msg='',msgT=0,last=0,drag=null,cur=null;
 const who=()=>((k+first)%2===0?0:1);
 const launch=(dx,dy,p)=>{if(ph!=='aim')return;const L=Math.hypot(dx,dy);if(L<1e-6||dy>=0)return;p=Math.max(0.12,Math.min(1,p));const s={x:lx,y:ly,vx:dx/L*VM*p,vy:dy/L*VM*p,t:who(),mv:true};st.push(s);cur=s;ph='move';drag=null;sfx('place')};
 const aimAt=(tx,ty,off)=>{const dx=tx-lx,dy=ty-ly,d=Math.hypot(dx,dy);launch(dx,dy,Math.sqrt((d+(off||0))/Dm))};
 const dist=s=>Math.hypot(s.x-hx,s.y-hy);
 const scoreEnd=()=>{const a=st.filter(s=>dist(s)<HR+sr).sort((p,q)=>dist(p)-dist(q));if(!a.length)return{w:-1,n:0};const w=a[0].t;let n=0;for(const s of a){if(s.t===w)n++;else break}return{w,n}};
 window.crq=()=>({tp:tp.slice(),k,end,ph,over,hx,hy,lx,ly,Dm,st:st.length,aim:aimAt,turn:who(),shoot:launch});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🥌 صالة الكيرلنج</h2>')+'<div id="crH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="crC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="crX">إغلاق</button></div>';
  const cv=$('crC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('crC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('crH'))$('crH').textContent='أنت 🔴 '+tp[0]+' · 🤖🟡 '+tp[1]+' · جولة '+(end+1)+'/2 · '+(over?'خلصت':(who()===0?'دورك':'دور 🤖'))};
  const say=m=>{msg=m;msgT=1.6};
  const stone=s=>{x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.arc(s.x+1.5,s.y+2,sr,0,6.3);x.fill();x.fillStyle='#adb5bd';x.beginPath();x.arc(s.x,s.y,sr,0,6.3);x.fill();x.strokeStyle='#495057';x.lineWidth=1.5;x.stroke();x.fillStyle=s.t===0?'#e03131':'#fcc419';x.beginPath();x.arc(s.x,s.y,sr*0.55,0,6.3);x.fill()};
  const dw=()=>{x.fillStyle='#e7f5ff';x.fillRect(0,0,W,CH);x.fillStyle='#d0ebff';x.fillRect(0,0,6,CH);x.fillRect(W-6,0,6,CH);
   [[HR,'#1c7ed6'],[HR*0.66,'#fff'],[HR*0.33,'#e03131'],[HR*0.12,'#fff']].forEach(([r,cc])=>{x.fillStyle=cc;x.beginPath();x.arc(hx,hy,r,0,6.3);x.fill()});
   x.strokeStyle='#339af0';x.lineWidth=1;x.beginPath();x.moveTo(0,hy);x.lineTo(W,hy);x.moveTo(hx,0);x.lineTo(hx,CH);x.stroke();
   x.strokeStyle='#e03131';x.lineWidth=2;x.beginPath();x.moveTo(0,hog);x.lineTo(W,hog);x.stroke();
   x.fillStyle='#e03131';x.font='10px sans-serif';x.textAlign='right';x.fillText('خط الإطلاق',W-8,hog-3);
   st.forEach(stone);
   if(ph==='aim'&&who()===0){x.fillStyle='rgba(224,49,49,.25)';x.beginPath();x.arc(lx,ly,sr+4,0,6.3);x.fill();stone({x:lx,y:ly,t:0});
    if(drag){const dx=lx-drag.x,dy=ly-drag.y,L=Math.min(PM,Math.hypot(dx,dy)),a=Math.atan2(dy,dx);x.strokeStyle='#e03131';x.lineWidth=2;x.setLineDash([5,5]);x.beginPath();x.moveTo(lx,ly);x.lineTo(lx+Math.cos(a)*Dm*(L/PM)*(L/PM),ly+Math.sin(a)*Dm*(L/PM)*(L/PM));x.stroke();x.setLineDash([]);x.fillStyle='#212529';x.fillRect(W-14,8,8,PM);x.fillStyle=L/PM>0.8?'#fa5252':'#51cf66';x.fillRect(W-14,8+PM*(1-L/PM),8,PM*L/PM)}}
   if(msgT>0){x.fillStyle='#212529';x.font='bold 18px sans-serif';x.textAlign='center';x.fillText(msg,W/2,H?20:30)}};
  const nextShot=()=>{k++;if(k>=8){const r=scoreEnd();if(r.w>=0)tp[r.w]+=r.n;say(r.w<0?'جولة تعادل: مفيش نقاط':(r.w===0?'كسبت '+r.n+' نقاط 🎉':'🤖 كسب '+r.n+(r.n>1?' نقاط':' نقطة')));end++;ph='score';pt=1.8;hud();return}ph='aim';bp=0.9;hud()};
  const fin=()=>{over=true;ph='over';dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.crld||me.crld.d!==d)me.crld={d,c:0};const W2=tp[0]>tp[1],D=tp[0]===tp[1];let pay=(W2?3:D?1:0)+(tp[0]>=3?1:0);pay=Math.max(0,Math.min(5,pay,12-me.crld.c));me.crld.c+=pay;me.coins+=pay;updCoins();const nb=tp[0]>(me.crlBest||0);if(nb)me.crlBest=tp[0];me.crlGames=(me.crlGames||0)+1;if(W2)me.crlWins=(me.crlWins||0)+1;saveMe();
   c.innerHTML='<h2>'+(W2?'🥌 كسبت! 🏆':D?'🥌 تعادل':'🥌 🤖 كسب المرة دي')+'</h2><div style="text-align:center;font-size:16px">أنت 🔴 <b>'+tp[0]+'</b> · 🤖🟡 <b>'+tp[1]+'</b><br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو مفيش جايزة)')+'<br>أحسن نتيجة ليك: '+(me.crlBest||0)+' · انتصاراتك: '+(me.crlWins||0)+'</div><div class="row"><button class="btn" id="crR">🔁 تاني</button><button class="btn d" id="crX2">إغلاق</button></div>';
   $('crR').onclick=crlStart;$('crX2').onclick=()=>{$('modal').style.display='none'}},900)};
  const botShot=()=>{const pl=st.filter(s=>s.t===0&&dist(s)<HR+sr).sort((a,b)=>dist(a)-dist(b)),bo=st.filter(s=>s.t===1&&dist(s)<HR+sr).sort((a,b)=>dist(a)-dist(b));
   let tx=hx,ty=hy,off=0;
   if(pl.length&&(!bo.length||dist(pl[0])<dist(bo[0]))&&Math.random()<0.6){tx=pl[0].x;ty=pl[0].y;off=Dm*0.28}
   else{tx=hx+(Math.random()-.5)*HR*0.6;ty=hy+(Math.random()-.3)*HR*0.4}
   const dx=tx-lx+(Math.random()-.5)*sr*1.6,dy=ty-ly,d=Math.hypot(dx,dy);launch(dx,dy,Math.sqrt((d+off)/Dm)*(1+(Math.random()-.5)*0.12))};
  const step=h=>{for(const s of st){if(!s.mv)continue;const v=Math.hypot(s.vx,s.vy);if(v<9){s.vx=s.vy=0;s.mv=false;continue}const dv=Math.min(v,A*h);s.vx-=s.vx/v*dv;s.vy-=s.vy/v*dv;s.x+=s.vx*h;s.y+=s.vy*h}
   for(let i=0;i<st.length;i++)for(let j=i+1;j<st.length;j++){const a=st[i],b=st[j];if(!a.mv&&!b.mv)continue;let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>=sr*2||d<1e-6)continue;const nx=dx/d,ny=dy/d,ov=sr*2-d;a.x-=nx*ov/2;a.y-=ny*ov/2;b.x+=nx*ov/2;b.y+=ny*ov/2;const rv=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(rv>0){const j2=rv*0.95;a.vx-=j2*nx;a.vy-=j2*ny;b.vx+=j2*nx;b.vy+=j2*ny;a.mv=true;b.mv=true;sfx('place')}}
   st=st.filter(s=>!(s.x<6+sr*0.3||s.x>W-6-sr*0.3||s.y<hy-HR-30))};
  const tick=now=>{if(!open())return;const dt=Math.min(0.04,(now-(last||now))/1000);last=now;if(msgT>0)msgT-=dt;
   if(ph==='move'){let n=Math.ceil(dt/0.004);for(let i=0;i<n;i++)step(dt/n);if(!st.some(s=>s.mv)){st=st.filter(s=>s.y<hog);cur=null;nextShot()}}
   else if(ph==='aim'&&who()===1){bp-=dt;if(bp<=0)botShot()}
   else if(ph==='score'){pt-=dt;if(pt<=0){if(end>=2)fin();else{st=[];k=0;first=1;ph='aim';bp=0.9;hud()}}}
   dw();hud();if(ph!=='over')requestAnimationFrame(tick)};
  const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*CH/r.height}};
  cv.onpointerdown=e=>{e.preventDefault();if(ph==='aim'&&who()===0){drag=pos(e);try{cv.setPointerCapture(e.pointerId)}catch(_){}}};
  cv.onpointermove=e=>{if(drag)drag=pos(e)};
  cv.onpointerup=e=>{if(!drag)return;const q=pos(e),dx=lx-q.x,dy=ly-q.y,L=Math.hypot(dx,dy);drag=null;if(L<14)return;launch(dx,dy,Math.min(1,L/PM))};
  $('crX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}

/* R269: snowball fight */
let snh=null;
function buildSnw(){
 const g=indoor(0x74c0fc,0xf1f8ff,0xa5d8ff);
 sign(g,'⛄ ساحة كرات الثلج',0,4.6,-7.6,'rgba(51,154,240,.92)');
 [[-4,-5],[0,-5.6],[4,-5]].forEach(([x,z])=>{g.add(mesh(G.box(2.4,1,0.8),0x91a7ff,x,0.5,z+0.8));g.add(mesh(G.sph(0.7,10),0xffffff,x,1.5,z),mesh(G.sph(0.5,10),0xffffff,x,2.3,z),mesh(G.sph(0.08,6),0xff922b,x,2.3,z+0.5),mesh(G.sph(0.06,6),0x212529,x-0.15,2.45,z+0.42),mesh(G.sph(0.06,6),0x212529,x+0.15,2.45,z+0.42))});
 for(let i=0;i<7;i++)g.add(mesh(G.sph(0.25+Math.random()*0.15,8),0xffffff,-3+i,0.25,2+Math.random()*2));
 snh={it:{x:0,z:0.2,label:'⛄ ابدأ معركة الثلج',fn:snwStart}};interacts.push(snh.it);
 g.add(portalMesh('ارجع لصالة الكيرلنج',5.8,5.8,0x1098ad,'curl'),portalMesh('🪢 ساحة شد الحبل',-5.8,5.8,0xe67700,'tug'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('⛄ دوس على رجل الثلج 🤖 قبل ما يرمي عليك',3200)
}
function snwStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(260,Math.min(innerHeight-330,380)),W=Math.min(innerWidth-50,360);
 const u=Math.min(W/360,CH/300),TL=45,fy=CH*(H?0.74:0.68);
 const bots=[0.2,0.5,0.8].map(f=>({x:W*f,st:'hid',p:0,tm:0,kind:0}));
 let sc=0,hearts=3,t=TL,over=false,last=0,nx=0.8,cmb=0,flash=0,fx=[],msg='',msgT=0,hitN=0;
 const bw=44*u,bh=64*u;
 const rect=b=>({x:b.x-bw/2,y:fy-bh*b.p-6*u,w:bw,h:bh*b.p+6*u});
 const hitB=i=>{const b=bots[i];if(over||!(b.st==='up'||b.st==='rise'))return false;
  if(b.kind===2){sc=Math.max(0,sc-15);cmb=0;say('🐧 ده صاحبك! -15');sfx('lose')}
  else{cmb++;hitN++;const g2=b.kind===1?30:10+Math.min(10,(cmb-1)*2);sc+=g2;say('+'+g2+(cmb>2?' 🔥':''));sfx('win')}
  b.st='down';b.tm=0;fx.push({x:b.x,y:fy-bh*0.7,t:0});return true};
 const tapAt=(px,py)=>{for(let i=0;i<3;i++){const r=rect(bots[i]);if(bots[i].st!=='hid'&&bots[i].st!=='down'&&px>=r.x-6&&px<=r.x+r.w+6&&py>=r.y-8&&py<=r.y+r.h+8)return hitB(i)}cmb=0;return false};
 window.snwq=()=>({sc,hearts,over,t,hitN,bots:bots.map((b,i)=>({st:b.st,kind:b.kind,cx:b.x,cy:fy-bh*b.p*0.5,hit:()=>hitB(i)})),tap:tapAt});
 const say=m=>{msg=m;msgT=0.8};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">⛄ ساحة كرات الثلج</h2>')+'<div id="snH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="snC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="snX">إغلاق</button></div>';
  const cv=$('snC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('snC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('snH'))$('snH').textContent='⭐ '+sc+' · '+'❤️'.repeat(hearts)+'🖤'.repeat(3-hearts)+' · ⏱️ '+Math.max(0,Math.ceil(t))+(cmb>1?' · 🔥 x'+cmb:'')};
  const fin=()=>{over=true;dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.snwd||me.snwd.d!==d)me.snwd={d,c:0};let pay=Math.min(5,Math.floor(sc/150));pay=Math.max(0,Math.min(pay,12-me.snwd.c));me.snwd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.snwBest||0);if(nb)me.snwBest=sc;me.snwGames=(me.snwGames||0)+1;saveMe();
   c.innerHTML='<h2>'+(hearts>0?'⛄ كسبت المعركة!':'⛄ اتغطيت بالتلج!')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · رجال ثلج ضربتهم: '+hitN+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.snwBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=150?'(وصلت حد النهاردة)':'اوصل 150 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn" id="snR">🔁 تاني</button><button class="btn d" id="snX2">إغلاق</button></div>';
   $('snR').onclick=snwStart;$('snX2').onclick=()=>{$('modal').style.display='none'}},800)};
  const snowman=(b)=>{const r=rect(b),cx=b.x,top=r.y,s=u;x.save();x.beginPath();x.rect(r.x-8,top-10*s,r.w+16,fy-top+2);x.clip();
   const by=fy-bh*b.p*0.5+10*s;
   if(b.kind===2){x.fillStyle='#212529';x.beginPath();x.ellipse(cx,by,15*s,22*s,0,0,6.3);x.fill();x.fillStyle='#fff';x.beginPath();x.ellipse(cx,by+5*s,9*s,14*s,0,0,6.3);x.fill();x.fillStyle='#ff922b';x.beginPath();x.moveTo(cx-4*s,by-8*s);x.lineTo(cx+4*s,by-8*s);x.lineTo(cx,by-3*s);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(cx-5*s,by-14*s,3*s,0,6.3);x.arc(cx+5*s,by-14*s,3*s,0,6.3);x.fill();x.fillStyle='#000';x.beginPath();x.arc(cx-5*s,by-14*s,1.4*s,0,6.3);x.arc(cx+5*s,by-14*s,1.4*s,0,6.3);x.fill()}
   else{x.fillStyle=b.kind===1?'#ffe066':'#fff';x.strokeStyle='#adb5bd';x.lineWidth=1.5;x.beginPath();x.arc(cx,by+8*s,19*s,0,6.3);x.fill();x.stroke();x.beginPath();x.arc(cx,by-14*s,13*s,0,6.3);x.fill();x.stroke();
    x.fillStyle='#212529';x.beginPath();x.arc(cx-4.5*s,by-17*s,2*s,0,6.3);x.arc(cx+4.5*s,by-17*s,2*s,0,6.3);x.fill();x.fillStyle='#ff922b';x.beginPath();x.moveTo(cx,by-14*s);x.lineTo(cx+9*s,by-12*s);x.lineTo(cx,by-10*s);x.fill();x.fillStyle='#e03131';x.fillRect(cx-12*s,by-3*s,24*s,5*s);
    x.fillStyle='#343a40';x.fillRect(cx-9*s,by-30*s,18*s,5*s);x.fillRect(cx-6*s,by-38*s,12*s,9*s);
    x.strokeStyle='#868e96';x.lineWidth=1.5;x.beginPath();x.moveTo(cx+10*s,by-26*s);x.lineTo(cx+14*s,by-36*s);x.stroke();x.fillStyle=Math.floor(t*4)%2?'#fa5252':'#ffa8a8';x.beginPath();x.arc(cx+14*s,by-37*s,2.5*s,0,6.3);x.fill()}
   x.restore()};
  const dw=()=>{const gr=x.createLinearGradient(0,0,0,fy);gr.addColorStop(0,'#74c0fc');gr.addColorStop(1,'#e7f5ff');x.fillStyle=gr;x.fillRect(0,0,W,CH);
   x.fillStyle='#dbe4ff';x.beginPath();x.moveTo(0,fy);x.lineTo(W*0.18,fy-CH*0.22);x.lineTo(W*0.36,fy);x.lineTo(W*0.6,fy-CH*0.28);x.lineTo(W*0.85,fy);x.closePath();x.fill();
   x.fillStyle='#fff';x.fillRect(0,fy,W,CH-fy);
   bots.forEach(b=>{if(b.st!=='hid')snowman(b);x.fillStyle='#91a7ff';x.strokeStyle='#5c7cfa';x.lineWidth=2;const w=bw*1.35;x.beginPath();x.roundRect?x.roundRect(b.x-w/2,fy-4*u,w,26*u,8):x.rect(b.x-w/2,fy-4*u,w,26*u);x.fill();x.stroke();
    if(b.st==='up'&&b.kind!==2){const f=Math.min(1,b.tm/b.dur);x.fillStyle='#212529';x.fillRect(b.x-bw/2,fy+24*u,bw,4*u);x.fillStyle=f>0.7?'#fa5252':'#fcc419';x.fillRect(b.x-bw/2,fy+24*u,bw*(1-f),4*u)}});
   fx.forEach(f=>{x.fillStyle='rgba(255,255,255,'+(1-f.t/0.4)+')';x.strokeStyle='#74c0fc';for(let i=0;i<8;i++){const a=i*0.785,d=f.t*140*u;x.beginPath();x.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d,4*u,0,6.3);x.fill();x.stroke()}});
   if(flash>0){x.fillStyle='rgba(224,49,49,'+flash*0.5+')';x.fillRect(0,0,W,CH)}
   x.fillStyle='#364fc7';x.font='bold '+(H?10:12)+'px sans-serif';x.textAlign='center';x.fillText('⛄ 🤖 رجال الثلج الآليين',W/2,H?12:18);
   if(msgT>0){x.fillStyle='#212529';x.strokeStyle='#fff';x.lineWidth=4;x.font='bold 20px sans-serif';x.strokeText(msg,W/2,CH-(H?10:24));x.fillText(msg,W/2,CH-(H?10:24))}};
  const lvl=()=>1-t/TL;
  const tick=now=>{if(!open())return;const dt=Math.min(0.05,(now-(last||now))/1000);last=now;
   if(!over){t-=dt;if(msgT>0)msgT-=dt;if(flash>0)flash-=dt*2;fx.forEach(f=>f.t+=dt);fx=fx.filter(f=>f.t<0.4);nx-=dt;
    if(nx<=0){const hid=bots.filter(b=>b.st==='hid');if(hid.length){const b=hid[Math.floor(Math.random()*hid.length)],r=Math.random();b.kind=r<0.12?2:r<0.2?1:0;b.st='rise';b.tm=0;b.dur=Math.max(0.75,1.6-lvl()*0.85)*(b.kind===1?0.8:1)}nx=Math.max(0.35,0.95-lvl()*0.6)*(0.7+Math.random()*0.6)}
    bots.forEach(b=>{if(b.st==='hid')return;b.tm+=dt;
     if(b.st==='rise'){b.p=Math.min(1,b.tm/0.22);if(b.tm>=0.22){b.st='up';b.tm=0;b.p=1}}
     else if(b.st==='up'){if(b.tm>=b.dur){if(b.kind!==2){hearts--;flash=1;cmb=0;sfx('lose');say('اتضربت! ❄️');b.st='down';b.tm=0}else{b.st='down';b.tm=0}}}
     else if(b.st==='down'){b.p=Math.max(0,1-b.tm/0.2);if(b.tm>=0.2){b.st='hid';b.p=0}}});
    if(hearts<=0||t<=0)fin()}
   hud();dw();if(!over)requestAnimationFrame(tick)};
  const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*CH/r.height}};
  cv.onpointerdown=e=>{e.preventDefault();const q=pos(e);tapAt(q.x,q.y)};
  $('snX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}

/* R270: tug of war */
let tgh=null;
function buildTgw(){
 const g=indoor(0xe67700,0xfff4e6,0xffa94d);
 sign(g,'🪢 ساحة شد الحبل',0,4.6,-7.6,'rgba(230,119,0,.92)');
 g.add(mesh(G.box(9,0.05,3),0x8d6e63,0,0.04,-3));
 g.add(mesh(G.box(8.4,0.08,0.12),0xd9a066,0,0.55,-3));
 g.add(mesh(G.box(0.12,0.9,0.12),0xe03131,0,0.9,-3),mesh(G.box(0.7,0.4,0.05),0xe03131,0.35,1.2,-3));
 [[-3.6,0x4dabf7],[-3,0x4dabf7],[3,0xfcc419],[3.6,0xfcc419]].forEach(([x,c])=>g.add(mesh(G.cyl(0.28,0.3,0.8,10),c,x,0.4,-3),mesh(G.sph(0.28,8),0xffd8a8,x,1,-3)));
 g.add(mesh(G.box(0.1,1.2,0.1),0x4dabf7,-4.4,0.6,-3),mesh(G.box(0.1,1.2,0.1),0xfcc419,4.4,0.6,-3));
 tgh={it:{x:0,z:0.2,label:'🪢 شد الحبل ضد 🤖',fn:tgwStart}};interacts.push(tgh.it);
 g.add(portalMesh('ارجع لساحة الثلج',5.8,5.8,0x339af0,'snowfight'),portalMesh('⛏️ موقع التنقيب',-5.8,5.8,0xa9792f,'digsite'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🪢 دوس بسرعة، والدوسة الأقوى لما الدايرة تكبر',3200)
}
function tgwStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(260,Math.min(innerHeight-330,340)),W=Math.min(innerWidth-50,360);
 const BEST=3,RT=20;
 let pos=0,rd=0,pw=0,bw=0,t=0,over=false,last=0,taps=[],ring=0,ph=Math.random()*6,msg='',msgT=0,state='play',st=0,fl=0,pf=0;
 const lv=()=>rd;
 const say=m=>{msg=m;msgT=0.8};
 const cyc=0.9;
 const perfect=()=>{const f=(t%cyc)/cyc;return f>0.72};
 const tap=()=>{if(over||state!=='play')return;const now=t;taps=taps.filter(x=>now-x<1);const fat=taps.length>7?0.6:1;taps.push(now);const pf2=perfect();pos+=(pf2?0.085:0.04)*fat;if(pf2){say('ممتاز! 💪');sfx('win');pf=0.2}else sfx('place')};
 window.tgwq=()=>({pos,rd,pw,bw,over,state,perfect:perfect(),tap,t});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🪢 ساحة شد الحبل</h2>')+'<div id="tgH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="tgC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="tgX">إغلاق</button></div>';
  const cv=$('tgC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('tgC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('tgH'))$('tgH').textContent='أنت 🔵 '+pw+' · 🤖🟡 '+bw+' · جولة '+Math.min(rd+1,BEST)+' · ⏱️ '+Math.max(0,Math.ceil(RT-st))};
  const fin=()=>{over=true;state='done';dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.tgwd||me.tgwd.d!==d)me.tgwd={d,c:0};const won=pw>bw;let pay=won?(pw===2&&bw===0?4:3):0;pay=Math.max(0,Math.min(5,pay,12-me.tgwd.c));me.tgwd.c+=pay;me.coins+=pay;updCoins();const sc=pw*10-bw*5+Math.round(pos*0);const nb=won&&pw>(me.tgwBest||0);if(nb)me.tgwBest=pw;if(won)me.tgwBest=Math.max(me.tgwBest||0,pw);me.tgwGames=(me.tgwGames||0)+1;if(won)me.tgwWins=(me.tgwWins||0)+1;saveMe();
   c.innerHTML='<h2>'+(won?'🪢 كسبت! 🏆':'🪢 🤖 كسب المرة دي')+'</h2><div style="text-align:center;font-size:16px">أنت 🔵 <b>'+pw+'</b> · 🤖🟡 <b>'+bw+'</b><br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'<br>انتصاراتك: '+(me.tgwWins||0)+'</div><div class="row"><button class="btn" id="tgR">🔁 تاني</button><button class="btn d" id="tgX2">إغلاق</button></div>';
   $('tgR').onclick=tgwStart;$('tgX2').onclick=()=>{$('modal').style.display='none'}},900)};
  const endRd=w=>{if(w>0)pw++;else bw++;state='between';fl=1.4;say(w>0?'كسبت الجولة! 🎉':'🤖 كسب الجولة');hud()};
  const person=(px,py,col,face)=>{x.fillStyle=col;x.fillRect(px-7,py-18,14,22);x.fillStyle='#ffd8a8';x.beginPath();x.arc(px,py-24,7,0,6.3);x.fill();x.fillStyle='#212529';x.beginPath();x.arc(px-2.5,py-25,1.2,0,6.3);x.arc(px+2.5,py-25,1.2,0,6.3);x.fill();x.fillRect(px-6,py+4,5,8);x.fillRect(px+1,py+4,5,8)};
  const dw=()=>{const cy=H?CH*0.5:CH*0.46,sc=Math.min(1,W/360);x.fillStyle='#ffe8cc';x.fillRect(0,0,W,CH);
   x.fillStyle='#74b816';x.fillRect(0,cy+26,W,CH-cy-26);
   const L=W*0.12,R=W*0.88;x.fillStyle='rgba(77,171,247,.25)';x.fillRect(0,cy-30,W/2,70);x.fillStyle='rgba(252,196,25,.25)';x.fillRect(W/2,cy-30,W/2,70);
   x.strokeStyle='#e03131';x.lineWidth=3;x.setLineDash([5,4]);x.beginPath();x.moveTo(W/2,cy-40);x.lineTo(W/2,cy+34);x.stroke();x.setLineDash([]);
   const flagX=W/2-pos*(W*0.36);
   [[-1,'#4dabf7',0.06],[1,'#fcc419',0.94]].forEach(([d,c,f])=>{x.fillStyle=c;x.fillRect(W*f-3,cy-40,6,60)});
   x.strokeStyle='#8d6e63';x.lineWidth=5;x.beginPath();x.moveTo(W*0.1,cy);x.lineTo(W*0.9,cy);x.stroke();
   x.fillStyle='#e03131';x.fillRect(flagX-3,cy-18,6,36);x.beginPath();x.moveTo(flagX+3,cy-18);x.lineTo(flagX+18,cy-12);x.lineTo(flagX+3,cy-6);x.fill();
   const sh=Math.sin(t*14)*1.2;
   for(let i=0;i<2;i++){person(flagX-34-i*20+sh,cy+14,'#1c7ed6');person(flagX+34+i*20-sh,cy+14,'#f08c00')}
   x.fillStyle='#364fc7';x.font='bold 11px sans-serif';x.textAlign='center';x.fillText('أنت',flagX-44,cy+34);x.fillText('🤖',flagX+44,cy+34);
   if(state==='play'){const f=(t%cyc)/cyc,rr=(f>0.72?1:0.35+f*0.7)*34*sc+8,cx=W/2,ry=CH-(H?38:62);x.strokeStyle='#868e96';x.lineWidth=2;x.beginPath();x.arc(cx,ry,34*sc+8,0,6.3);x.stroke();x.fillStyle=f>0.72?'rgba(81,207,102,.85)':'rgba(77,171,247,.55)';x.beginPath();x.arc(cx,ry,rr,0,6.3);x.fill();x.fillStyle='#fff';x.font='bold 14px sans-serif';x.fillText(f>0.72?'دوس!':'اضغط',cx,ry+5)}
   x.fillStyle='#212529';x.fillRect(W*0.2,H?8:12,W*0.6,8);x.fillStyle='#4dabf7';x.fillRect(W*0.2,H?8:12,W*0.6*(0.5+pos/2),8);
   if(msgT>0){x.fillStyle='#212529';x.strokeStyle='#fff';x.lineWidth=4;x.font='bold 20px sans-serif';x.strokeText(msg,W/2,H?34:44);x.fillText(msg,W/2,H?34:44)}};
  const tick=now=>{if(!open())return;const dt=Math.min(0.05,(now-(last||now))/1000);last=now;t+=dt;if(msgT>0)msgT-=dt;
   if(state==='play'){st+=dt;const F=(0.2+0.06*lv())*(1+0.6*Math.sin(t*1.7+ph))*(1+0.35*Math.sin(t*4.1));pos-=F*dt;
    if(pos>=1)endRd(1);else if(pos<=-1)endRd(-1);else if(st>=RT)endRd(pos>0?1:-1)}
   else if(state==='between'){fl-=dt;if(fl<=0){if(pw>=2||bw>=2||rd>=BEST-1&&pw!==bw){fin()}else{rd++;pos=0;st=0;taps=[];state='play'}}}
   hud();dw();if(!over)requestAnimationFrame(tick)};
  cv.onpointerdown=e=>{e.preventDefault();tap()};
  $('tgX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}

/* R271: treasure dig */
let dgh=null;
function buildDgt(){
 const g=indoor(0xa9792f,0xfff3d6,0xffd43b);
 sign(g,'⛏️ موقع التنقيب',0,4.6,-7.6,'rgba(169,121,47,.92)');
 g.add(mesh(G.box(7,0.08,5),0xe9c46a,0,0.05,-3.2));
 for(let i=0;i<9;i++)g.add(mesh(G.cyl(0.35+Math.random()*0.3,0.5+Math.random()*0.3,0.25+Math.random()*0.2,8),0xd4a24c,-3+Math.random()*6,0.15,-5.2+Math.random()*3.8));
 g.add(mesh(G.box(0.9,0.6,0.6),0x8d5524,2.2,0.3,-1.6),mesh(G.box(0.92,0.18,0.62),0xffd43b,2.2,0.65,-1.6,0xffd43b));
 g.add(mesh(G.box(0.1,1.4,0.1),0x8d6e63,-2.4,0.7,-1.4),mesh(G.box(0.5,0.5,0.1),0x868e96,-2.4,0.1,-1.3));
 dgh={it:{x:0,z:0.2,label:'⛏️ ابدأ التنقيب',fn:dgtStart}};interacts.push(dgh.it);
 g.add(portalMesh('ارجع لساحة شد الحبل',5.8,5.8,0xe67700,'tug'),portalMesh('🎨 المرسم',-5.8,5.8,0xd6336c,'artroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('⛏️ احفر، والرقم بيقولك الكنز بعيد قد إيه',3200)
}
function dgtStart(){
 const H=innerHeight<420,CH=H?Math.max(130,innerHeight-165):Math.max(260,Math.min(innerHeight-330,380)),W=Math.min(innerWidth-50,360);
 const cols=H?9:7,rows=H?5:7,TOP=H?0:6,cs=Math.floor(Math.min(W/cols,(CH-TOP)/rows)),gx=Math.floor((W-cs*cols)/2),gy=Math.floor((CH-cs*rows)/2),R=3,DG=6;
 let rd=0,sc=0,dug=[],left=DG,tr=null,state='play',over=false,fl=0,last=0,msg='',msgT=0,found=0,t=0;
 const newR=()=>{tr={c:Math.floor(Math.random()*cols),r:Math.floor(Math.random()*rows)};dug=[];left=DG;state='play'};
 newR();
 const dist=(c,r)=>Math.max(Math.abs(c-tr.c),Math.abs(r-tr.r));
 const say=m=>{msg=m;msgT=1.2};
 let dig=()=>{};
 window.dgtq=()=>({rd,sc,left,state,over,found,cols,rows,dug:dug.map(d=>({c:d.c,r:d.r,d:d.d})),dig:(c,r)=>dig(c,r)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">⛏️ موقع التنقيب</h2>')+'<div id="dgH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="dgC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="dgX">إغلاق</button></div>';
  const cv=$('dgC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('dgC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('dgH'))$('dgH').textContent='كنز '+Math.min(rd+1,R)+'/'+R+' · ⭐ '+sc+' · ⛏️ '+left+(H?'':' · رقم الخانة = بُعد الكنز بالخانات')};
  const fin=()=>{over=true;dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.dgtd||me.dgtd.d!==d)me.dgtd={d,c:0};let pay=Math.min(5,Math.floor(sc/50));pay=Math.max(0,Math.min(pay,12-me.dgtd.c));me.dgtd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.dgtBest||0);if(nb)me.dgtBest=sc;me.dgtGames=(me.dgtGames||0)+1;saveMe();
   c.innerHTML='<h2>'+(found===R?'⛏️ لقيت كل الكنوز! 💎':'⛏️ خلص التنقيب')+'</h2><div style="text-align:center;font-size:16px">لقيت <b>'+found+'/'+R+'</b> · النقاط: <b>'+sc+'</b>'+(nb&&sc?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.dgtBest||0))+'<br>'+(pay?'+'+pay+'🪙':sc>=50?'(وصلت حد النهاردة)':'اوصل 50 نقطة عشان تكسب عملات')+'</div><div class="row"><button class="btn" id="dgR">🔁 تاني</button><button class="btn d" id="dgX2">إغلاق</button></div>';
   $('dgR').onclick=dgtStart;$('dgX2').onclick=()=>{$('modal').style.display='none'}},900)};
  dig=(cc,rr)=>{if(over||state!=='play'||cc<0||rr<0||cc>=cols||rr>=rows||dug.some(d=>d.c===cc&&d.r===rr))return false;const d=dist(cc,rr);dug.push({c:cc,r:rr,d});left--;sfx('place');
   if(d===0){const g2=20+left*10;sc+=g2;found++;state='won';fl=1.4;say('💎 لقيته! +'+g2);sfx('win')}
   else if(left<=0){state='lost';fl=1.6;say('خلصت الحفر 😢 الكنز كان هنا');}
   hud();return true};
  const col=d=>d<=1?'#e03131':d===2?'#f76707':d===3?'#fab005':d===4?'#74c0fc':'#4c6ef5';
  const dw=()=>{x.fillStyle='#fff3d6';x.fillRect(0,0,W,CH);
   for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const px=gx+c*cs,py=gy+r*cs,dd=dug.find(d=>d.c===c&&d.r===r);
    x.fillStyle=dd?'#b8864b':((c+r)%2?'#e9c46a':'#e3bb5c');x.fillRect(px+1,py+1,cs-2,cs-2);
    if(!dd){x.fillStyle='rgba(255,255,255,.18)';x.fillRect(px+1,py+1,cs-2,3)}
    if(dd){if(dd.d===0){x.fillStyle='#8d5524';x.fillRect(px+cs*0.18,py+cs*0.3,cs*0.64,cs*0.46);x.fillStyle='#ffd43b';x.fillRect(px+cs*0.18,py+cs*0.3,cs*0.64,cs*0.16);x.fillRect(px+cs*0.44,py+cs*0.4,cs*0.12,cs*0.16)}
     else{x.fillStyle=col(dd.d);x.beginPath();x.arc(px+cs/2,py+cs/2,cs*0.36,0,6.3);x.fill();x.fillStyle='#fff';x.font='bold '+Math.floor(cs*0.46)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(dd.d,px+cs/2,py+cs/2+1);x.textBaseline='alphabetic'}}}
   if(state==='lost'){const px=gx+tr.c*cs,py=gy+tr.r*cs;x.strokeStyle='#e03131';x.lineWidth=3;x.strokeRect(px+2,py+2,cs-4,cs-4);x.fillStyle='#8d5524';x.fillRect(px+cs*0.18,py+cs*0.3,cs*0.64,cs*0.46);x.fillStyle='#ffd43b';x.fillRect(px+cs*0.18,py+cs*0.3,cs*0.64,cs*0.16)}
   if(msgT>0){x.fillStyle='rgba(33,37,41,.85)';x.fillRect(0,CH/2-16,W,30);x.fillStyle='#ffd43b';x.font='bold 18px sans-serif';x.textAlign='center';x.fillText(msg,W/2,CH/2+6)}};
  const tick=now=>{if(!open())return;const dt=Math.min(0.05,(now-(last||now))/1000);last=now;t+=dt;if(msgT>0)msgT-=dt;
   if((state==='won'||state==='lost')){fl-=dt;if(fl<=0){rd++;if(rd>=R)fin();else{newR();hud()}}}
   dw();if(!over)requestAnimationFrame(tick)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*W/r.width-gx,py=(e.clientY-r.top)*CH/r.height-gy;dig(Math.floor(px/cs),Math.floor(py/cs))};
  $('dgX').onclick=()=>{$('modal').style.display='none'};hud();dw();requestAnimationFrame(tick)})}

/* R272: art studio with drawing pad */
let arth=null,artCv=null,artTex=null;
function artLoad(){try{const d=localStorage.getItem('ealam_drw');const x=artCv.getContext('2d');x.fillStyle='#fff9db';x.fillRect(0,0,256,192);if(d){const im=new Image();im.onload=()=>{x.drawImage(im,0,0,256,192);if(artTex)artTex.needsUpdate=true};im.src=d}else{x.fillStyle='#868e96';x.font='bold 22px sans-serif';x.textAlign='center';x.fillText('لوحتك هنا',128,100)}if(artTex)artTex.needsUpdate=true}catch(e){}}
function buildArt(){
 const g=indoor(0xd6336c,0xfff0f6,0xff8787);
 sign(g,'🎨 مرسم عالمنا',0,4.6,-7.6,'rgba(214,51,108,.92)');
 [[-4.5,-5,0xe03131],[-3.5,-5.4,0xfcc419],[3.5,-5.4,0x40c057],[4.5,-5,0x228be6]].forEach(([x,z,c])=>g.add(mesh(G.cyl(0.3,0.3,0.6,10),0xf1f3f5,x,0.3,z),mesh(G.cyl(0.24,0.24,0.1,10),c,x,0.64,z,c)));
 g.add(mesh(G.box(0.12,2.6,0.12),0x8d6e63,-1.7,1.3,-6.4),mesh(G.box(0.12,2.6,0.12),0x8d6e63,1.7,1.3,-6.4),mesh(G.box(3.8,0.14,0.2),0x8d6e63,0,0.3,-6.3),mesh(G.box(3.5,2.7,0.1),0x5c3d2e,0,2.1,-6.45));
 arth={it:{x:0,z:0.2,label:'🎨 ارسم لوحة',fn:artStart}};interacts.push(arth.it);
 g.add(portalMesh('ارجع لموقع التنقيب',5.8,5.8,0xa9792f,'digsite'),portalMesh('🎵 الصندوق الموسيقي',-5.8,5.8,0x7048e8,'musicbox'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 if(!artCv){artCv=document.createElement('canvas');artCv.width=256;artCv.height=192}
 artTex=new THREE.CanvasTexture(artCv);artLoad();
 const pl=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.4),new THREE.MeshBasicMaterial({map:artTex}));pl.position.set(0,2.1,-6.38);g.add(pl);
 toast('🎨 لوحتك المحفوظة بتتعلق على الحامل',3000)
}
function artStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),avail=H?Math.max(96,innerHeight-190):Math.max(200,Math.min(innerHeight-400,320)),cw=Math.floor(Math.min(W,avail*4/3)),ch=Math.floor(cw*3/4);
 const COLS=['#212529','#e03131','#f76707','#fcc419','#40c057','#228be6','#7048e8','#f06595','#8d5524','#ffffff'];
 let col=COLS[0],sz=4,er=false,undo=[],drawing=false,lp=null,strokes=0,saved=false;
 window.drwq=()=>({strokes,saved,col,sz});
 modal(c=>{
  const bs='width:auto!important;display:inline-block!important;min-height:'+(H?'26':'34')+'px!important;padding:'+(H?'1px 6px':'3px 8px')+';font-size:'+(H?'12':'14')+'px;margin:2px';
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎨 المرسم</h2>')+'<canvas id="drC" style="display:block;margin:2px auto;border-radius:8px;touch-action:none;background:#fff;width:'+cw+'px;height:'+ch+'px"></canvas><div id="drP" style="text-align:center;margin:2px"></div><div style="text-align:center"><button class="btn" id="drS1" style="'+bs+'">● صغير</button><button class="btn" id="drS2" style="'+bs+'">⬤ وسط</button><button class="btn" id="drS3" style="'+bs+'">⬤ كبير</button><button class="btn" id="drE" style="'+bs+'">🧽 ممحاة</button><button class="btn" id="drU" style="'+bs+'">↩️ تراجع</button><button class="btn" id="drK" style="'+bs+'">🗑️ مسح</button></div><div class="row"><button class="btn" id="drSv" style="'+bs+'">💾 احفظ على الحامل</button><button class="btn d" id="drX" style="'+bs+'">إغلاق</button></div>';
  const cv=$('drC');cv.width=320;cv.height=240;const x=cv.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,320,240);x.lineCap='round';x.lineJoin='round';
  try{const d=localStorage.getItem('ealam_drw');if(d){const im=new Image();im.onload=()=>x.drawImage(im,0,0,320,240);im.src=d}}catch(e){}
  const pal=$('drP');COLS.forEach(cc=>{const b=document.createElement('button');b.style.cssText='width:'+(H?22:28)+'px;height:'+(H?22:28)+'px;border-radius:50%;margin:2px;border:3px solid '+(cc===col?'#ffd43b':'#495057')+';background:'+cc;b.dataset.c=cc;b.onclick=()=>{col=cc;er=false;[...pal.children].forEach(k=>k.style.borderColor=k.dataset.c===col?'#ffd43b':'#495057')};pal.appendChild(b)});
  const sizes=[3,7,14];[1,2,3].forEach(i=>$('drS'+i).onclick=()=>{sz=sizes[i-1];er=false});
  $('drE').onclick=()=>{er=true};
  const snap=()=>{undo.push(x.getImageData(0,0,320,240));if(undo.length>12)undo.shift()};
  $('drU').onclick=()=>{if(undo.length)x.putImageData(undo.pop(),0,0)};
  $('drK').onclick=()=>{snap();x.fillStyle='#fff';x.fillRect(0,0,320,240)};
  const pos=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*320/r.width,y:(e.clientY-r.top)*240/r.height}};
  const line=(a,b)=>{x.strokeStyle=er?'#fff':col;x.lineWidth=er?sz*2.2:sz;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()};
  cv.onpointerdown=e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}snap();drawing=true;lp=pos(e);line(lp,{x:lp.x+0.01,y:lp.y})};
  cv.onpointermove=e=>{if(!drawing)return;const p=pos(e);line(lp,p);lp=p};
  const up=()=>{if(drawing){drawing=false;strokes++}};cv.onpointerup=up;cv.onpointercancel=up;
  $('drSv').onclick=()=>{try{const t=document.createElement('canvas');t.width=256;t.height=192;t.getContext('2d').drawImage(cv,0,0,256,192);localStorage.setItem('ealam_drw',t.toDataURL('image/jpeg',0.72));me.drwGames=(me.drwGames||0)+1;saveMe();saved=true;sfx('win');toast('✅ اتحفظت على الحامل، اطلع بره وارجع تشوفها',3200)}catch(e){toast('مقدرتش أحفظ اللوحة',2500)}};
  $('drX').onclick=()=>{$('modal').style.display='none'}})}

/* R273: music box */
let mbh=null,mbT=null,mbCount=0;
const MBF=[1046.5,880,784,659.3,587.3,523.3];
function mbTone(f,d){if(me&&me.mute)return;try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.25,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+0.05);mbCount++}catch(e){}}
function mbLoad(){try{const a=JSON.parse(localStorage.getItem('ealam_mbx')||'null');if(a&&Array.isArray(a.g)&&a.g.length===8)return{g:a.g.map(r=>Array.from({length:6},(_,i)=>r[i]?1:0)),tp:[0,1,2].includes(a.tp)?a.tp:1}}catch(e){}return null}
const MBTP=[0.32,0.22,0.14];
function mbPlay(tune){clearInterval(mbT);let s=0;const st=()=>{tune.g[s].forEach((v,r)=>{if(v)mbTone(MBF[r],0.35)});s++;if(s>=8){clearInterval(mbT);mbT=null}};st();if(s<8)mbT=setInterval(st,MBTP[tune.tp]*1000)}
function buildMbx(){
 const g=indoor(0x7048e8,0xf3f0ff,0xb197fc);
 sign(g,'🎵 غرفة الصندوق الموسيقي',0,4.6,-7.6,'rgba(112,72,232,.92)');
 g.add(mesh(G.box(3,1.2,2),0x8d5524,0,0.6,-5),mesh(G.box(3.1,0.15,2.1),0xffd43b,0,1.25,-5,0xffd43b),mesh(G.cyl(0.55,0.55,2.6,16),0xced4da,0,1.8,-5));
 [0xfa5252,0x4dabf7,0x51cf66,0xfcc419,0xcc5de8,0xff922b].forEach((c,i)=>g.add(mesh(G.sph(0.22,8),c,-3.4+i*1.36,0.3+(i%3)*0.5,-1.5,c)));
 g.add(mesh(G.cyl(0.35,0.35,1.1,10),0x7048e8,-5,0.55,0),mesh(G.cyl(0.35,0.35,1.1,10),0x7048e8,5,0.55,0));
 mbh={it:{x:0,z:0.2,label:'🎵 ألّف لحن',fn:mbStart},it2:{x:2.6,z:-1.8,label:'▶️ شغّل لحنك المحفوظ',fn:()=>{const t=mbLoad();if(t){mbPlay(t);toast('🎵 بيشغّل لحنك',1800)}else toast('مفيش لحن محفوظ لسه، ألّف واحد الأول',2500)}}};
 interacts.push(mbh.it,mbh.it2);
 g.add(portalMesh('ارجع للمرسم',5.8,5.8,0xd6336c,'artroom'),portalMesh('❌ ساحة إكس أو',-5.8,5.8,0x2b8a3e,'xoxroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎵 ألّف لحن من 8 نوتات واحفظه',3000)
}
function mbStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),cw=Math.floor(W/8),chh=H?Math.max(12,Math.min(cw,Math.floor((innerHeight-185)/6))):Math.min(cw,40),CH=chh*6;
 const sv=mbLoad()||{g:Array.from({length:8},()=>[0,0,0,0,0,0]),tp:1};
 let G2=sv.g,tp=sv.tp,step=-1,iv=null;
 const COL=['#fa5252','#ff922b','#fcc419','#51cf66','#4dabf7','#cc5de8'];
 window.mbq=()=>({g:G2.map(r=>r.slice()),step,playing:!!iv,tp});
 modal(c=>{
  const bs='width:auto!important;display:inline-block!important;min-height:'+(H?'26':'34')+'px!important;padding:'+(H?'1px 8px':'3px 10px')+';font-size:'+(H?'12':'14')+'px;margin:2px';
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎵 الصندوق الموسيقي</h2>')+'<canvas id="mbC" style="display:block;margin:4px auto;border-radius:8px;touch-action:none"></canvas><div style="text-align:center"><button class="btn" id="mbP" style="'+bs+'">▶️ شغّل</button><button class="btn" id="mbT" style="'+bs+'"></button><button class="btn" id="mbK" style="'+bs+'">🗑️ مسح</button><button class="btn" id="mbS" style="'+bs+'">💾 احفظ</button><button class="btn d" id="mbX" style="'+bs+'">إغلاق</button></div>';
  const cv=$('mbC');cv.width=cw*8;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('mbC')&&$('modal').style.display!=='none';
  const dw=()=>{x.fillStyle='#2b2250';x.fillRect(0,0,cv.width,CH);
   for(let col=0;col<8;col++)for(let r=0;r<6;r++){const px=col*cw,py=r*chh,on=G2[col][r];x.fillStyle=on?COL[r]:(col%2?'#3b3170':'#352b66');x.fillRect(px+2,py+2,cw-4,chh-4);if(on){x.fillStyle='rgba(255,255,255,.35)';x.fillRect(px+2,py+2,cw-4,4)}}
   if(step>=0){x.strokeStyle='#ffd43b';x.lineWidth=3;x.strokeRect(step*cw+1,1,cw-2,CH-2)}};
  const lbl=()=>{$('mbT').textContent=['🐢 بطيء','🚶 وسط','🐇 سريع'][tp]};
  const stop=()=>{clearInterval(iv);iv=null;step=-1;if($('mbP'))$('mbP').textContent='▶️ شغّل';dw()};
  $('mbP').onclick=()=>{if(iv){stop();return}step=0;$('mbP').textContent='⏹ وقف';const go=()=>{if(!open()){clearInterval(iv);iv=null;return}dw();G2[step].forEach((v,r)=>{if(v)mbTone(MBF[r],0.35)});step=(step+1)%8};go();iv=setInterval(go,MBTP[tp]*1000)};
  $('mbT').onclick=()=>{tp=(tp+1)%3;lbl();if(iv){clearInterval(iv);const go=()=>{if(!open()){clearInterval(iv);iv=null;return}dw();G2[step].forEach((v,r)=>{if(v)mbTone(MBF[r],0.35)});step=(step+1)%8};iv=setInterval(go,MBTP[tp]*1000)}};
  $('mbK').onclick=()=>{G2=Array.from({length:8},()=>[0,0,0,0,0,0]);dw()};
  $('mbS').onclick=()=>{try{localStorage.setItem('ealam_mbx',JSON.stringify({g:G2,tp}));me.mbxGames=(me.mbxGames||0)+1;saveMe();sfx('win');toast('✅ اتحفظ اللحن، دوس "شغّل لحنك" بره',3000)}catch(e){toast('مقدرتش أحفظ',2000)}};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),col=Math.floor((e.clientX-r.left)*cv.width/r.width/cw),row=Math.floor((e.clientY-r.top)*CH/r.height/chh);if(col<0||col>7||row<0||row>5)return;G2[col][row]=G2[col][row]?0:1;if(G2[col][row])mbTone(MBF[row],0.3);dw()};
  $('mbX').onclick=()=>{stop();$('modal').style.display='none'};lbl();dw()})}

/* R274: tic-tac-toe tournament vs 3 bots */
let xoh=null;
const XOL=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function xoWin(b){for(const l of XOL)if(b[l[0]]&&b[l[0]]===b[l[1]]&&b[l[0]]===b[l[2]])return{p:b[l[0]],l};return b.every(v=>v)?{p:0,l:null}:null}
function xoMM(b,t){const w=xoWin(b);if(w)return w.p===2?10:w.p===1?-10:0;let best=t===2?-99:99;for(let i=0;i<9;i++)if(!b[i]){b[i]=t;const s=xoMM(b,t===2?1:2);b[i]=0;if(t===2){if(s>best)best=s}else if(s<best)best=s}return best}
function xoBot(b,lv){const em=[];for(let i=0;i<9;i++)if(!b[i])em.push(i);const rnd=()=>em[Math.floor(Math.random()*em.length)];
 const find=p=>{for(const i of em){b[i]=p;const w=xoWin(b);b[i]=0;if(w&&w.p===p)return i}return -1};
 if(lv===0){if(Math.random()<0.3){const w=find(2);if(w>=0)return w}return rnd()}
 if(lv===1){let m=find(2);if(m<0)m=find(1);if(m>=0)return m;if(!b[4])return 4;const c=[0,2,6,8].filter(i=>!b[i]);return c.length?c[Math.floor(Math.random()*c.length)]:rnd()}
 if(Math.random()<0.12)return rnd();let bi=-1,bs=-99;for(const i of em){b[i]=2;const s=xoMM(b,1);b[i]=0;if(s>bs||s===bs&&Math.random()<0.4){bs=s;bi=i}}return bi}
function buildXox(){
 const g=indoor(0x2b8a3e,0xebfbee,0x69db7c);
 sign(g,'❌⭕ ساحة إكس أو',0,4.6,-7.6,'rgba(43,138,62,.92)');
 g.add(mesh(G.box(4.2,0.1,4.2),0xf1f3f5,0,0.06,-4));
 [-0.7,0.7].forEach(o=>{g.add(mesh(G.box(0.1,0.06,4.2),0x212529,o,0.12,-4),mesh(G.box(4.2,0.06,0.1),0x212529,0,0.12,-4+o))});
 [[-1.4,-5.4,0],[0,-4,1],[1.4,-2.6,0],[1.4,-5.4,1],[-1.4,-2.6,1]].forEach(([x,z,k])=>{if(k)g.add(mesh(G.cyl(0.45,0.45,0.12,16),0xfa5252,x,0.2,z),mesh(G.cyl(0.25,0.25,0.14,16),0xf1f3f5,x,0.2,z));else{const a=mesh(G.box(1,0.12,0.2),0x228be6,x,0.2,z),b2=mesh(G.box(1,0.12,0.2),0x228be6,x,0.2,z);a.rotation.y=0.78;b2.rotation.y=-0.78;g.add(a,b2)}});
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x2b8a3e,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x2b8a3e,5,0.5,0));
 xoh={it:{x:0,z:0.2,label:'❌ العب بطولة إكس أو',fn:xoxStart}};interacts.push(xoh.it);
 g.add(portalMesh('ارجع للصندوق الموسيقي',5.8,5.8,0x7048e8,'musicbox'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('❌ اهزم 3 روبوتات 🤖 واحد ورا التاني',3000)
}
function xoxStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),S=H?Math.max(120,Math.min(W,innerHeight-190)):Math.min(W,Math.max(240,Math.min(innerHeight-340,340)));
 let b=Array(9).fill(0),lv=0,cleared=0,draws=0,over=false,turn=1,res=null,wl=null,pend=false;
 window.xoxq=()=>({b:b.slice(),lv,cleared,over,turn,res,play:i=>play(i)});
 let play=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">❌⭕ بطولة إكس أو</h2>')+'<div id="xoH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="xoC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="xoX">إغلاق</button></div>';
  const cv=$('xoC');cv.width=S;cv.height=S;const x=cv.getContext('2d'),cs=S/3;
  const open=()=>$('xoC')&&$('modal').style.display!=='none';
  const NM=['🤖 مبتدئ','🤖 ذكي','🤖 خبير'];
  const hud=()=>{if($('xoH'))$('xoH').textContent='أنت ❌ ضد '+NM[Math.min(lv,2)]+' ⭕ · مستوى '+Math.min(lv+1,3)+'/3 · '+(res?res:(turn===1?'دورك':'دور 🤖'))};
  const dw=()=>{x.fillStyle='#f8f9fa';x.fillRect(0,0,S,S);x.strokeStyle='#495057';x.lineWidth=4;x.lineCap='round';for(let i=1;i<3;i++){x.beginPath();x.moveTo(i*cs,8);x.lineTo(i*cs,S-8);x.moveTo(8,i*cs);x.lineTo(S-8,i*cs);x.stroke()}
   for(let i=0;i<9;i++){const cx=(i%3+0.5)*cs,cy=(Math.floor(i/3)+0.5)*cs,r=cs*0.28;if(b[i]===1){x.strokeStyle='#1c7ed6';x.lineWidth=cs*0.1;x.beginPath();x.moveTo(cx-r,cy-r);x.lineTo(cx+r,cy+r);x.moveTo(cx+r,cy-r);x.lineTo(cx-r,cy+r);x.stroke()}else if(b[i]===2){x.strokeStyle='#e8590c';x.lineWidth=cs*0.1;x.beginPath();x.arc(cx,cy,r,0,6.3);x.stroke()}}
   if(wl){x.strokeStyle='#40c057';x.lineWidth=cs*0.08;const a=wl[0],z=wl[2];x.beginPath();x.moveTo((a%3+0.5)*cs,(Math.floor(a/3)+0.5)*cs);x.lineTo((z%3+0.5)*cs,(Math.floor(z/3)+0.5)*cs);x.stroke()}};
  const fin=()=>{over=true;turn=0;dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.xoxd||me.xoxd.d!==d)me.xoxd={d,c:0};let pay=cleared+(cleared>=3?2:0);pay=Math.max(0,Math.min(5,pay,12-me.xoxd.c));me.xoxd.c+=pay;me.coins+=pay;updCoins();const nb=cleared>(me.xoxBest||0);if(nb)me.xoxBest=cleared;me.xoxGames=(me.xoxGames||0)+1;saveMe();
   c.innerHTML='<h2>'+(cleared>=3?'❌ بطل البطولة! 🏆':'❌ خلصت البطولة')+'</h2><div style="text-align:center;font-size:16px">هزمت <b>'+cleared+'/3</b> روبوتات'+(nb&&cleared?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+(me.xoxBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'</div><div class="row"><button class="btn" id="xoR">🔁 تاني</button><button class="btn d" id="xoX2">إغلاق</button></div>';
   $('xoR').onclick=xoxStart;$('xoX2').onclick=()=>{$('modal').style.display='none'}},900)};
  const after=()=>{const w=xoWin(b);if(!w)return false;wl=w.l;pend=true;if(w.p===1){res='كسبت! 🎉';cleared++;sfx('win');hud();dw();setTimeout(()=>{if(!open())return;if(cleared>=3)fin();else{lv++;b=Array(9).fill(0);wl=null;res=null;turn=1;pend=false;hud();dw()}},1200)}
   else if(w.p===2){res='🤖 كسب';hud();dw();setTimeout(()=>{if(open())fin()},1200)}
   else{res='تعادل';draws++;hud();dw();setTimeout(()=>{if(!open())return;if(draws>=3)fin();else{b=Array(9).fill(0);wl=null;res=null;turn=1;pend=false;hud();dw()}},1000)}return true};
  const bot=()=>{if(!open()||over)return;const m=xoBot(b,lv);b[m]=2;sfx('place');if(!after()){turn=1;hud();dw()}};
  play=i=>{if(over||pend||turn!==1||b[i])return false;b[i]=1;sfx('place');if(!after()){turn=2;hud();dw();setTimeout(bot,500)}else dw();return true};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)*S/r.width/cs),cy=Math.floor((e.clientY-r.top)*S/r.height/cs);if(cx<0||cx>2||cy<0||cy>2)return;play(cy*3+cx)};
  $('xoX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}
