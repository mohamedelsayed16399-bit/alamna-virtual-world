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
  const fin=()=>{over=true;dw();sfx('win');setTimeout(()=>{if(!open())return;const d=today();if(!me.drtd||me.drtd.d!==d)me.drtd={d,c:0};let pay=Math.min(5,Math.floor(sc/80));pay=Math.max(0,Math.min(pay,12-me.drtd.c));me.drtd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.drtBest||0);if(nb)me.drtBest=sc;me.drtGames=(me.drtGames||0)+1;saveMe();
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
 g.add(portalMesh('ارجع للصندوق الموسيقي',5.8,5.8,0x7048e8,'musicbox'),portalMesh('🗼 أبراج هانوي',-5.8,5.8,0x1c7ed6,'hanroom'));
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
let hanh=null;
function buildHan(){
 const g=indoor(0x1c7ed6,0xe7f5ff,0x74c0fc);
 sign(g,'🗼 غرفة أبراج هانوي',0,4.6,-7.6,'rgba(28,126,214,.92)');
 g.add(mesh(G.box(7,0.25,2),0x8d5524,0,0.15,-4));
 const cols=[0xfa5252,0xfd7e14,0xfab005,0x40c057,0x228be6];
 [-2.2,0,2.2].forEach((px,i)=>{g.add(mesh(G.cyl(0.12,0.12,2.8,10),0xdee2e6,px,1.6,-4));
  if(i===0)for(let k=0;k<5;k++)g.add(mesh(G.cyl(1.0-k*0.16,1.0-k*0.16,0.28,18),cols[k],px,0.42+(4-k)*0.3,-4))});
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x1c7ed6,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x1c7ed6,5,0.5,0));
 hanh={it:{x:0,z:0.2,label:'🗼 العب أبراج هانوي',fn:hanStart}};interacts.push(hanh.it);
 g.add(portalMesh('ارجع لساحة إكس أو',5.8,5.8,0x2b8a3e,'xoxroom'),portalMesh('💡 طفي الأنوار',-5.8,5.8,0xf59f00,'lgoroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🗼 انقل الأقراص من البرج الأول للأخير: قرص صغير فوق الكبير بس',3200)
}
function hanStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CH=H?Math.max(110,innerHeight-170):Math.round(W*0.66);
 const COL=['#fa5252','#fd7e14','#fab005','#40c057','#228be6'];
 let st=0,n=3,pegs=[],sel=-1,moves=0,cleared=0,eff=0,over=false,pend=false,msg='';
 const opt=()=>Math.pow(2,n)-1;
 const init=()=>{n=3+st;pegs=[[],[],[]];for(let k=n;k>=1;k--)pegs[0].push(k);sel=-1;moves=0;pend=false;msg=''};
 init();
 let mv=()=>false;
 window.hanq=()=>({n,st,moves,over,cleared,eff,pegs:pegs.map(p=>p.slice()),mv:(a,b)=>mv(a,b)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🗼 أبراج هانوي</h2>')+'<div id="hnH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="hnC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="hnR" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="hnX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('hnC');cv.width=W;cv.height=CH;const x=cv.getContext('2d'),pw=W/3;
  const open=()=>$('hnC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('hnH'))$('hnH').textContent='مرحلة '+(st+1)+'/3 · '+n+' أقراص · حركات '+moves+' (الأمثل '+opt()+')'+(msg?' · '+msg:'')};
  const dw=()=>{x.fillStyle='#e7f5ff';x.fillRect(0,0,W,CH);x.fillStyle='#8d5524';x.fillRect(8,CH-14,W-16,10);
   const dh=Math.min(24,(CH-50)/(n+1));
   for(let i=0;i<3;i++){const px=(i+0.5)*pw;x.fillStyle=sel===i?'#ffd43b':'#adb5bd';x.fillRect(px-4,22,8,CH-36);
    const lift=sel===i?1:0;
    pegs[i].forEach((d,j)=>{const w=pw*(0.3+0.62*d/n),top=j===pegs[i].length-1&&lift;const y=top?8:CH-14-(j+1)*dh;x.fillStyle=COL[d-1];x.beginPath();x.roundRect?x.roundRect(px-w/2,y,w,dh-2,6):x.rect(px-w/2,y,w,dh-2);x.fill();if(top){x.strokeStyle='#212529';x.lineWidth=2;x.stroke()}})}};
  const fin=()=>{over=true;sfx('win');const d=today();if(!me.hanD||me.hanD.d!==d)me.hanD={d,c:0};const sc=cleared+eff;let pay=Math.max(0,Math.min(5,sc,12-me.hanD.c));me.hanD.c+=pay;me.coins+=pay;updCoins();me.hanGames=(me.hanGames||0)+1;const nb=sc>(me.hanBest||0);if(nb)me.hanBest=sc;if(typeof saveMe==='function')saveMe();
   c.innerHTML='<h2>'+(cleared>=3?'🗼 أتقنت هانوي! 🏆':'🗼 خلصت')+'</h2><div style="text-align:center;font-size:16px">حليت <b>'+cleared+'/3</b> مراحل<br>بحركات قريبة من الأمثل في <b>'+eff+'</b><br>'+(nb&&sc?'🏆 رقم قياسي! ':'أحسن نتيجة: '+(me.hanBest||0)+' ')+'<br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'</div><div class="row"><button class="btn" id="hnR2">🔁 تاني</button><button class="btn d" id="hnX2">إغلاق</button></div>';
   $('hnR2').onclick=hanStart;$('hnX2').onclick=()=>{$('modal').style.display='none'}};
  mv=(a,b)=>{if(over||pend||a===b||!pegs[a]||!pegs[b]||!pegs[a].length)return false;const t=pegs[a][pegs[a].length-1];const u=pegs[b][pegs[b].length-1];if(u&&u<t)return false;pegs[a].pop();pegs[b].push(t);moves++;sel=-1;sfx('place');
   if(pegs[2].length===n){pend=true;cleared++;const ok=moves<=Math.floor(opt()*1.5);if(ok)eff++;msg=ok?'ممتاز! 🌟':'تمام ✅';hud();dw();setTimeout(()=>{if(!open())return;if(st>=2)fin();else{st++;init();hud();dw()}},1100)}else{msg='';hud();dw()}return true};
  cv.onpointerdown=e=>{e.preventDefault();if(over||pend)return;const r=cv.getBoundingClientRect(),i=Math.floor((e.clientX-r.left)*W/r.width/pw);if(i<0||i>2)return;
   if(sel<0){if(pegs[i].length){sel=i;sfx('tick')}}else if(sel===i){sel=-1}else if(!mv(sel,i)){sel=-1;msg='مينفعش قرص كبير فوق صغير';sfx('err')}
   hud();dw()};
  $('hnR').onclick=()=>{init();hud();dw()};$('hnX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}
let lgoh=null;
function buildLgo(){
 const g=indoor(0xf59f00,0xfff9db,0xffe066);
 sign(g,'💡 غرفة طفي الأنوار',0,4.6,-7.6,'rgba(245,159,0,.92)');
 g.add(mesh(G.box(4.4,0.12,4.4),0x343a40,0,0.08,-4));
 for(let i=0;i<5;i++)for(let j=0;j<5;j++){const on=(i*3+j*2)%3===0;g.add(mesh(G.box(0.72,0.1,0.72),on?0xffd43b:0x495057,-1.7+i*0.85,0.2,-5.7+j*0.85,on?0xffd43b:undefined))}
 g.add(mesh(G.cyl(0.4,0.4,1,10),0xf59f00,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0xf59f00,5,0.5,0));
 lgoh={it:{x:0,z:0.2,label:'💡 العب طفي الأنوار',fn:lgoStart}};interacts.push(lgoh.it);
 g.add(portalMesh('ارجع لأبراج هانوي',5.8,5.8,0x1c7ed6,'hanroom'),portalMesh('🔢 سودوكو',-5.8,5.8,0x7048e8,'sdkroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('💡 الضغطة بتقلب القرص وجيرانه الأربعة. طفّي كل الأنوار!',3200)
}
function lgoStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),S=H?Math.max(120,Math.min(W,innerHeight-190)):Math.min(W,Math.max(240,Math.min(innerHeight-340,340)));
 const K=[4,7,10];let st=0,g=[],pr=[],moves=0,cleared=0,eff=0,over=false,pend=false,msg='';
 const init=()=>{g=Array(25).fill(0);pr=[];const idx=[...Array(25).keys()].sort(()=>Math.random()-0.5).slice(0,K[st]);idx.forEach(i=>{tg(i);pr.push(i)});if(g.every(v=>!v)){tg(12);pr.push(12)}moves=0;pend=false;msg=''};
 const tg=i=>{const r=Math.floor(i/5),c=i%5;[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const rr=r+a,cc=c+b;if(rr>=0&&rr<5&&cc>=0&&cc<5)g[rr*5+cc]^=1})};
 init();
 let press=()=>false;
 window.lgoq=()=>({st,moves,over,cleared,eff,g:g.slice(),sol:pr.slice(),press:i=>press(i)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">💡 طفّي الأنوار</h2>')+'<div id="lgH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="lgC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="lgR" style="width:auto!important;display:inline-block!important">🔁 لوحة جديدة</button><button class="btn d" id="lgX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('lgC');cv.width=S;cv.height=S;const x=cv.getContext('2d'),cs=S/5;
  const open=()=>$('lgC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('lgH'))$('lgH').textContent='مرحلة '+(st+1)+'/3 · مضيء '+g.filter(v=>v).length+' · ضغطات '+moves+(msg?' · '+msg:'')};
  const dw=()=>{x.fillStyle='#212529';x.fillRect(0,0,S,S);for(let i=0;i<25;i++){const cx=(i%5)*cs+3,cy=Math.floor(i/5)*cs+3,w=cs-6;if(g[i]){x.shadowColor='#ffd43b';x.shadowBlur=12;x.fillStyle='#ffd43b'}else{x.shadowBlur=0;x.fillStyle='#495057'}
   x.beginPath();x.roundRect?x.roundRect(cx,cy,w,w,8):x.rect(cx,cy,w,w);x.fill()}x.shadowBlur=0};
  const fin=()=>{over=true;sfx('win');const d=today();if(!me.lgoD||me.lgoD.d!==d)me.lgoD={d,c:0};const sc=cleared+eff;let pay=Math.max(0,Math.min(5,sc,12-me.lgoD.c));me.lgoD.c+=pay;me.coins+=pay;updCoins();me.lgoGames=(me.lgoGames||0)+1;const nb=sc>(me.lgoBest||0);if(nb)me.lgoBest=sc;saveMe();
   c.innerHTML='<h2>'+(cleared>=3?'💡 نوّرت وطفّيت! 🏆':'💡 خلصت')+'</h2><div style="text-align:center;font-size:16px">حليت <b>'+cleared+'/3</b> مراحل<br>بضغطات قليلة في <b>'+eff+'</b><br>'+(nb&&sc?'🏆 رقم قياسي! ':'أحسن نتيجة: '+(me.lgoBest||0)+' ')+'<br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'</div><div class="row"><button class="btn" id="lgR2">🔁 تاني</button><button class="btn d" id="lgX2">إغلاق</button></div>';
   $('lgR2').onclick=lgoStart;$('lgX2').onclick=()=>{$('modal').style.display='none'}};
  press=i=>{if(over||pend||i<0||i>24)return false;tg(i);moves++;sfx('tick');msg='';
   if(g.every(v=>!v)){pend=true;cleared++;const ok=moves<=K[st]+2;if(ok)eff++;msg=ok?'ممتاز! 🌟':'تمام ✅';hud();dw();setTimeout(()=>{if(!open())return;if(st>=2)fin();else{st++;init();hud();dw()}},1100)}else{hud();dw()}return true};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)*S/r.width/cs),cy=Math.floor((e.clientY-r.top)*S/r.height/cs);if(cx<0||cx>4||cy<0||cy>4)return;press(cy*5+cx)};
  $('lgR').onclick=()=>{init();hud();dw()};$('lgX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}
let sdh=null;
function buildSdk(){
 const g=indoor(0x7048e8,0xf3f0ff,0xd0bfff);
 sign(g,'🔢 غرفة سودوكو',0,4.6,-7.6,'rgba(112,72,232,.92)');
 g.add(mesh(G.box(4.4,0.12,4.4),0xf8f9fa,0,0.08,-4));
 [-1.1,0,1.1].forEach(o=>{g.add(mesh(G.box(0.1,0.08,4.4),0x212529,o,0.16,-4),mesh(G.box(4.4,0.08,0.1),0x212529,0,0.16,-4+o))});
 const B=[[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],cl=[0xfa5252,0xfab005,0x40c057,0x228be6];
 for(let i=0;i<4;i++)for(let j=0;j<4;j++)g.add(mesh(G.cyl(0.28,0.28,0.12,12),cl[B[i][j]-1],-1.65+j*1.1,0.24,-5.65+i*1.1));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x7048e8,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x7048e8,5,0.5,0));
 sdh={it:{x:0,z:0.2,label:'🔢 العب سودوكو',fn:sdkStart}};interacts.push(sdh.it);
 g.add(portalMesh('ارجع لطفي الأنوار',5.8,5.8,0xf59f00,'lgoroom'),portalMesh('🌊 تلوين الفيضان',-5.8,5.8,0x1098ad,'cflroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔢 كل رقم من 1 لـ4 مرة واحدة في كل صف وعمود ومربع',3200)
}
function sdkStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),S=H?Math.max(120,Math.min(W,innerHeight-210)):Math.min(W,Math.max(240,Math.min(innerHeight-400,320)));
 const GV=[10,8,6];let st=0,g=[],fx=[],sol=[],sel=-1,mist=0,cleared=0,eff=0,over=false,pend=false,msg='';
 const sh=a=>a.sort(()=>Math.random()-0.5);
 const init=()=>{const B=[[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],dg=sh([1,2,3,4]),rb=sh([0,1]),cb=sh([0,1]);const rows=[],ro=[];rb.forEach(b=>sh([0,1]).forEach(k=>ro.push(b*2+k)));const co=[];cb.forEach(b=>sh([0,1]).forEach(k=>co.push(b*2+k)));
  sol=[];ro.forEach(r=>co.forEach(cc=>sol.push(dg[B[r][cc]-1])));const keep=new Set(sh([...Array(16).keys()]).slice(0,GV[st]));g=sol.map((v,i)=>keep.has(i)?v:0);fx=g.map(v=>!!v);sel=-1;mist=0;pend=false;msg=''};
 const bad=(i,v)=>{const r=Math.floor(i/4),c=i%4;for(let k=0;k<16;k++){if(k===i||g[k]!==v)continue;const kr=Math.floor(k/4),kc=k%4;if(kr===r||kc===c||(Math.floor(kr/2)===Math.floor(r/2)&&Math.floor(kc/2)===Math.floor(c/2)))return true}return false};
 init();
 let put=()=>false;
 window.sdq=()=>({st,g:g.slice(),fx:fx.slice(),sol:sol.slice(),mist,over,cleared,eff,put:(i,v)=>put(i,v)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🔢 سودوكو صغير</h2>')+'<div id="sdH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="sdC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap">'+[1,2,3,4].map(n=>'<button class="btn sdp" data-n="'+n+'" style="width:auto!important;display:inline-block!important;min-width:46px">'+n+'</button>').join('')+'<button class="btn sdp" data-n="0" style="width:auto!important;display:inline-block!important">⌫</button></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="sdR" style="width:auto!important;display:inline-block!important">🔁 لوحة جديدة</button><button class="btn d" id="sdX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('sdC');cv.width=S;cv.height=S;const x=cv.getContext('2d'),cs=S/4;
  const open=()=>$('sdC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('sdH'))$('sdH').textContent='مرحلة '+(st+1)+'/3 · أخطاء '+mist+(msg?' · '+msg:'')};
  const dw=()=>{x.fillStyle='#f8f9fa';x.fillRect(0,0,S,S);for(let i=0;i<16;i++){const cx=(i%4)*cs,cy=Math.floor(i/4)*cs;if(i===sel){x.fillStyle='#d0ebff';x.fillRect(cx,cy,cs,cs)}else if(fx[i]){x.fillStyle='#e9ecef';x.fillRect(cx,cy,cs,cs)}
   if(g[i]){const b=!fx[i]&&bad(i,g[i]);x.fillStyle=b?'#e03131':fx[i]?'#212529':'#1c7ed6';x.font='bold '+Math.round(cs*0.55)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(g[i],cx+cs/2,cy+cs/2+2)}}
   x.strokeStyle='#adb5bd';x.lineWidth=1.5;for(let i=1;i<4;i++){x.beginPath();x.moveTo(i*cs,0);x.lineTo(i*cs,S);x.moveTo(0,i*cs);x.lineTo(S,i*cs);x.stroke()}
   x.strokeStyle='#212529';x.lineWidth=4;x.strokeRect(2,2,S-4,S-4);x.beginPath();x.moveTo(S/2,0);x.lineTo(S/2,S);x.moveTo(0,S/2);x.lineTo(S,S/2);x.stroke()};
  const fin=()=>{over=true;sfx('win');const d=today();if(!me.sdkD||me.sdkD.d!==d)me.sdkD={d,c:0};const sc=cleared+eff;let pay=Math.max(0,Math.min(5,sc,12-me.sdkD.c));me.sdkD.c+=pay;me.coins+=pay;updCoins();me.sdkGames=(me.sdkGames||0)+1;const nb=sc>(me.sdkBest||0);if(nb)me.sdkBest=sc;saveMe();
   c.innerHTML='<h2>'+(cleared>=3?'🔢 عبقري سودوكو! 🏆':'🔢 خلصت')+'</h2><div style="text-align:center;font-size:16px">حليت <b>'+cleared+'/3</b> مراحل<br>من غير أخطاء في <b>'+eff+'</b><br>'+(nb&&sc?'🏆 رقم قياسي! ':'أحسن نتيجة: '+(me.sdkBest||0)+' ')+'<br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'</div><div class="row"><button class="btn" id="sdR2">🔁 تاني</button><button class="btn d" id="sdX2">إغلاق</button></div>';
   $('sdR2').onclick=sdkStart;$('sdX2').onclick=()=>{$('modal').style.display='none'}};
  put=(i,v)=>{if(over||pend||i<0||i>15||fx[i])return false;sel=i;g[i]=v;msg='';
   if(v){if(bad(i,v)){mist++;sfx('err');msg='رقم متكرر ❌'}else sfx('place')}
   const full=g.every(q=>q),ok=full&&g.every((q,k)=>!bad(k,q));
   if(ok){pend=true;cleared++;if(!mist)eff++;msg=mist?'تمام ✅':'من غير أخطاء 🌟';hud();dw();sfx('win');setTimeout(()=>{if(!open())return;if(st>=2)fin();else{st++;init();hud();dw()}},1100)}else{hud();dw()}return true};
  cv.onpointerdown=e=>{e.preventDefault();if(over||pend)return;const r=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-r.left)*S/r.width/cs),cy=Math.floor((e.clientY-r.top)*S/r.height/cs);if(cx<0||cx>3||cy<0||cy>3)return;const i=cy*4+cx;sel=fx[i]?-1:i;sfx('tick');dw()};
  c.querySelectorAll('.sdp').forEach(b=>b.onclick=()=>{if(sel>=0)put(sel,+b.dataset.n)});
  $('sdR').onclick=()=>{init();hud();dw()};$('sdX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}
let cfh=null;
function buildCfl(){
 const g=indoor(0x1098ad,0xe3fafc,0x66d9e8);
 sign(g,'🌊 غرفة تلوين الفيضان',0,4.6,-7.6,'rgba(16,152,173,.92)');
 const cl=[0xfa5252,0xfab005,0x40c057,0x228be6,0xbe4bdb];
 g.add(mesh(G.box(4.4,0.12,4.4),0x212529,0,0.08,-4));
 for(let i=0;i<6;i++)for(let j=0;j<6;j++){const c=i+j<3?cl[3]:cl[(i*7+j*3+(i>3?1:0))%5];g.add(mesh(G.box(0.62,0.1,0.62),c,-1.6+i*0.64,0.2,-5.6+j*0.64))}
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x1098ad,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x1098ad,5,0.5,0));
 cfh={it:{x:0,z:0.2,label:'🌊 العب تلوين الفيضان',fn:cflStart}};interacts.push(cfh.it);
 g.add(portalMesh('ارجع لسودوكو',5.8,5.8,0x7048e8,'sdkroom'),portalMesh('🧩 الصور المخفية',-5.8,5.8,0xe64980,'nngroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🌊 ابدأ من الركن اللي فوق وغطّي اللوحة بلون واحد قبل ما الحركات تخلص',3200)
}
function cflStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),S=H?Math.max(120,Math.min(W,innerHeight-210)):Math.min(W,Math.max(240,Math.min(innerHeight-400,320)));
 const CO=['#fa5252','#fab005','#40c057','#228be6','#be4bdb'],N=[8,9,10],LM=[16,18,20];
 let st=0,n=8,g=[],moves=0,lim=14,cleared=0,eff=0,over=false,pend=false,msg='';
 const init=()=>{n=N[st];lim=LM[st];g=[];for(let i=0;i<n*n;i++)g.push(Math.floor(Math.random()*5));moves=0;pend=false;msg=''};
 const reg=()=>{const s=new Set([0]),q=[0],c=g[0];while(q.length){const i=q.pop(),r=Math.floor(i/n),cc=i%n;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const rr=r+a,c2=cc+b;if(rr<0||rr>=n||c2<0||c2>=n)return;const k=rr*n+c2;if(!s.has(k)&&g[k]===c){s.add(k);q.push(k)}})}return s};
 init();
 let mv=()=>false;
 window.cflq=()=>({st,n,g:g.slice(),moves,lim,over,cleared,eff,mv:c=>mv(c)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🌊 تلوين الفيضان</h2>')+'<div id="cfH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="cfC" style="display:block;margin:4px auto;border-radius:10px"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">'+CO.map((k,i)=>'<button class="btn cfp" data-c="'+i+'" style="width:auto!important;display:inline-block!important;min-width:48px;background:'+k+'">&nbsp;</button>').join('')+'</div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="cfR" style="width:auto!important;display:inline-block!important">🔁 لوحة جديدة</button><button class="btn d" id="cfX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('cfC');cv.width=S;cv.height=S;const x=cv.getContext('2d');
  const open=()=>$('cfC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('cfH'))$('cfH').textContent='مرحلة '+(st+1)+'/3 · حركات '+moves+'/'+lim+(msg?' · '+msg:'')};
  const dw=()=>{const cs=S/n,rg=reg();for(let i=0;i<n*n;i++){x.fillStyle=CO[g[i]];x.fillRect((i%n)*cs,Math.floor(i/n)*cs,cs+0.5,cs+0.5)}
   x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=2;rg.forEach(i=>{const r=Math.floor(i/n),cc=i%n;[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const k=(r+a)*n+cc+b;if(r+a<0||r+a>=n||cc+b<0||cc+b>=n||!rg.has(k)){x.beginPath();const X=cc*cs,Y=r*cs;if(a===1){x.moveTo(X,Y+cs);x.lineTo(X+cs,Y+cs)}else if(a===-1){x.moveTo(X,Y);x.lineTo(X+cs,Y)}else if(b===1){x.moveTo(X+cs,Y);x.lineTo(X+cs,Y+cs)}else{x.moveTo(X,Y);x.lineTo(X,Y+cs)}x.stroke()}})});
   x.fillStyle='#fff';x.font='bold '+Math.round(cs*0.6)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('★',cs/2,cs/2+2)};
  const fin=()=>{over=true;sfx('win');const d=today();if(!me.cflD||me.cflD.d!==d)me.cflD={d,c:0};const sc=cleared+eff;let pay=Math.max(0,Math.min(5,sc,12-me.cflD.c));me.cflD.c+=pay;me.coins+=pay;updCoins();me.cflGames=(me.cflGames||0)+1;const nb=sc>(me.cflBest||0);if(nb)me.cflBest=sc;saveMe();
   c.innerHTML='<h2>'+(cleared>=3?'🌊 ملك الفيضان! 🏆':'🌊 خلصت')+'</h2><div style="text-align:center;font-size:16px">غطيت <b>'+cleared+'/3</b> لوحات<br>بحركات قليلة في <b>'+eff+'</b><br>'+(nb&&sc?'🏆 رقم قياسي! ':'أحسن نتيجة: '+(me.cflBest||0)+' ')+'<br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'</div><div class="row"><button class="btn" id="cfR2">🔁 تاني</button><button class="btn d" id="cfX2">إغلاق</button></div>';
   $('cfR2').onclick=cflStart;$('cfX2').onclick=()=>{$('modal').style.display='none'}};
  mv=k=>{if(over||pend||k<0||k>4||k===g[0])return false;const rg=reg();rg.forEach(i=>g[i]=k);moves++;sfx('place');
   if(g.every(v=>v===g[0])){pend=true;cleared++;const ok=moves<=lim-3;if(ok)eff++;msg=ok?'ممتاز! 🌟':'تمام ✅';hud();dw();sfx('win');setTimeout(()=>{if(!open())return;if(st>=2)fin();else{st++;init();hud();dw()}},1100)}
   else if(moves>=lim){pend=true;msg='الحركات خلصت ❌';hud();dw();sfx('err');setTimeout(()=>{if(open())fin()},1300)}else{hud();dw()}return true};
  c.querySelectorAll('.cfp').forEach(b=>b.onclick=()=>mv(+b.dataset.c));
  $('cfR').onclick=()=>{init();hud();dw()};$('cfX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}
let nngh=null;
const NNGP=[['❤️','0101011111111110111000100'],['🏠','0010001110111111101111011'],['😊','0101001010000001000101110'],['🌲','0010001110111110010000100'],['➕','0010000100111110010000100']];
function buildNng(){
 const g=indoor(0xe64980,0xfff0f6,0xfaa2c1);
 sign(g,'🧩 غرفة الصور المخفية',0,4.6,-7.6,'rgba(230,73,128,.92)');
 g.add(mesh(G.box(4.4,0.12,4.4),0xf8f9fa,0,0.08,-4));
 const s=NNGP[0][1];for(let i=0;i<5;i++)for(let j=0;j<5;j++)g.add(mesh(G.box(0.7,0.12,0.7),s[i*5+j]==='1'?0xe64980:0xdee2e6,-1.7+j*0.85,0.2,-5.7+i*0.85));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0xe64980,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0xe64980,5,0.5,0));
 nngh={it:{x:0,z:0.2,label:'🧩 العب الصور المخفية',fn:nngStart}};interacts.push(nngh.it);
 g.add(portalMesh('ارجع لتلوين الفيضان',5.8,5.8,0x1098ad,'cflroom'),portalMesh('🦘 قفز الأبراج',-5.8,5.8,0x37b24d,'dljroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧩 الأرقام بتقولك كام مربع ملون ورا بعض في كل صف وعمود. اكتشف الصورة!',3400)
}
function nngStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),S=H?Math.max(130,Math.min(W,innerHeight-210)):Math.min(W,Math.max(240,Math.min(innerHeight-400,320)));
 let st=0,pi=[],sol=[],g=[],mist=0,cleared=0,eff=0,over=false,pend=false,msg='',mark=false;
 const ord=[0,1,2,3,4].sort(()=>Math.random()-0.5).slice(0,3);
 const clue=(arr,ln)=>{const o=[];let n=0;for(const v of ln.map(i=>arr[i])){if(v)n++;else if(n){o.push(n);n=0}}if(n)o.push(n);return o.length?o:[0]};
 const init=()=>{const p=NNGP[ord[st]];pi=p;sol=[...p[1]].map(v=>+v);g=Array(25).fill(0);mist=0;pend=false;msg=''};
 init();
 let tap=()=>false;
 window.nngq=()=>({st,pat:pi[0],g:g.slice(),sol:sol.slice(),mist,over,cleared,eff,tap:i=>tap(i)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🧩 الصور المخفية</h2>')+'<div id="ngH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="ngC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="ngM" style="width:auto!important;display:inline-block!important">⬛ تلوين</button><button class="btn" id="ngR" style="width:auto!important;display:inline-block!important">🔁 من الأول</button><button class="btn d" id="ngX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('ngC');cv.width=S;cv.height=S;const x=cv.getContext('2d'),m=S*0.3,cs=(S-m)/5;
  const open=()=>$('ngC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('ngH'))$('ngH').textContent='صورة '+(st+1)+'/3 · أخطاء '+mist+(msg?' · '+msg:'')};
  const dw=()=>{x.fillStyle='#fff0f6';x.fillRect(0,0,S,S);const rc=[],cc=[];for(let i=0;i<5;i++){rc.push(clue(sol,[0,1,2,3,4].map(j=>i*5+j)));cc.push(clue(sol,[0,1,2,3,4].map(j=>j*5+i)))}
   x.fillStyle='#862e57';x.font='bold '+Math.round(cs*0.38)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';
   for(let i=0;i<5;i++){x.fillText(rc[i].join(' '),m*0.5,m+i*cs+cs/2);const a=cc[i];a.forEach((v,k)=>x.fillText(v,m+i*cs+cs/2,m-(a.length-k)*cs*0.4+cs*0.15))}
   for(let i=0;i<25;i++){const X=m+(i%5)*cs,Y=m+Math.floor(i/5)*cs;x.fillStyle=g[i]===1?(sol[i]?'#d6336c':'#e03131'):'#fff';x.fillRect(X+1,Y+1,cs-2,cs-2);if(g[i]===1&&!sol[i]){x.fillStyle='#fff';x.font='bold '+Math.round(cs*0.6)+'px sans-serif';x.fillText('✖',X+cs/2,Y+cs/2+2)}else if(g[i]===2){x.fillStyle='#adb5bd';x.font=Math.round(cs*0.55)+'px sans-serif';x.fillText('·',X+cs/2,Y+cs/2)}}
   x.strokeStyle='#862e57';x.lineWidth=2;x.strokeRect(m,m,cs*5,cs*5)};
  const fin=()=>{over=true;sfx('win');const d=today();if(!me.nngD||me.nngD.d!==d)me.nngD={d,c:0};const sc=cleared+eff;let pay=Math.max(0,Math.min(5,sc,12-me.nngD.c));me.nngD.c+=pay;me.coins+=pay;updCoins();me.nngGames=(me.nngGames||0)+1;const nb=sc>(me.nngBest||0);if(nb)me.nngBest=sc;saveMe();
   c.innerHTML='<h2>'+(cleared>=3?'🧩 كشفت كل الصور! 🏆':'🧩 خلصت')+'</h2><div style="text-align:center;font-size:16px">كشفت <b>'+cleared+'/3</b> صور<br>بأقل من خطأين في <b>'+eff+'</b><br>'+(nb&&sc?'🏆 رقم قياسي! ':'أحسن نتيجة: '+(me.nngBest||0)+' ')+'<br>'+(pay?'+'+pay+'🪙':'(مفيش جايزة)')+'</div><div class="row"><button class="btn" id="ngR2">🔁 تاني</button><button class="btn d" id="ngX2">إغلاق</button></div>';
   $('ngR2').onclick=nngStart;$('ngX2').onclick=()=>{$('modal').style.display='none'}};
  tap=(i,mk)=>{if(over||pend||i<0||i>24)return false;const mm=mk===undefined?mark:mk;
   if(mm){g[i]=g[i]===2?0:g[i]===1?1:2;sfx('tick')}
   else if(g[i]===1){g[i]=0;sfx('tick')}else{g[i]=1;if(!sol[i]){mist++;sfx('err');msg='مربع غلط ❌'}else{sfx('place');msg=''}}
   if(sol.every((v,k)=>(g[k]===1)===!!v)){pend=true;cleared++;if(mist<2)eff++;msg=mist<2?'🌟 '+pi[0]:'تمام ✅ '+pi[0];hud();dw();sfx('win');setTimeout(()=>{if(!open())return;if(st>=2)fin();else{st++;init();hud();dw()}},1300)}else{hud();dw()}return true};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect(),X=(e.clientX-r.left)*S/r.width-m,Y=(e.clientY-r.top)*S/r.height-m;const cx=Math.floor(X/cs),cy=Math.floor(Y/cs);if(X<0||Y<0||cx>4||cy>4)return;tap(cy*5+cx)};
  $('ngM').onclick=()=>{mark=!mark;$('ngM').textContent=mark?'· علّم فاضي':'⬛ تلوين'};
  $('ngR').onclick=()=>{init();hud();dw()};$('ngX').onclick=()=>{$('modal').style.display='none'};hud();dw()})}
let dljh=null;
function buildDlj(){
 const g=indoor(0x37b24d,0xebfbee,0x8ce99a);
 sign(g,'🦘 غرفة قفز الأبراج',0,4.6,-7.6,'rgba(55,178,77,.92)');
 [[-1.6,0.5],[0.9,1.1],[-0.8,1.8],[1.5,2.5],[-0.3,3.2]].forEach(([x,y],i)=>g.add(mesh(G.box(1.3,0.14,0.8),i%2?0x74c0fc:0x69db7c,x,y,-4.5)));
 g.add(mesh(G.cyl(0.35,0.35,0.5,12),0xffd43b,-0.3,3.55,-4.5));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x37b24d,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x37b24d,5,0.5,0));
 dljh={it:{x:0,z:0.2,label:'🦘 العب قفز الأبراج',fn:dljStart}};interacts.push(dljh.it);
 g.add(portalMesh('ارجع للصور المخفية',5.8,5.8,0xe64980,'nngroom'),portalMesh('🏃 ركض الحارات',-5.8,5.8,0xf76707,'lnrroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🦘 اسحب صباعك يمين وشمال وانط من لوح للوح لأعلى ارتفاع!',3400)
}
function dljStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CW=H?Math.min(W,220):Math.min(W,300),CH=H?Math.max(130,innerHeight-160):Math.min(Math.max(280,innerHeight-330),440);
 let px=CW/2,py=CH-60,vy=0,tx=CW/2,cam=0,best=0,plats=[],over=false,paid=0,dir=0,last=0,t=0;
 const G0=1100,VJ=560,PW=54;
 const gen=()=>{let top=plats.length?Math.min(...plats.map(p=>p.y)):CH;while(top>cam-80){const sc=Math.max(0,-cam)/10,gap=48+Math.random()*(52+Math.min(30,sc/25));top-=gap;const mv=sc>60&&Math.random()<Math.min(0.4,sc/700),sp=sc>30&&Math.random()<0.07;plats.push({x:10+Math.random()*(CW-PW-20),y:top,mv,dx:mv?(Math.random()<0.5?-1:1)*(40+Math.random()*30):0,sp})}};
 const init=()=>{plats=[{x:CW/2-PW/2,y:CH-30,mv:false,dx:0,sp:false}];for(let i=1;i<6;i++)plats.push({x:10+Math.random()*(CW-PW-20),y:CH-30-i*70,mv:false,dx:0,sp:false});px=CW/2;py=CH-60;vy=-VJ;cam=0;best=0;over=false;tx=px;gen()};
 init();
 let step=()=>{};
 window.dljq=()=>({score:Math.floor(best),over,px,py,vy,cam,plats:plats.map(p=>({...p})),CW,CH,sx:v=>{tx=v},step:d=>step(d),paid});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🦘 قفز الأبراج</h2>')+'<div id="djH" style="text-align:center;font-size:14px;margin:2px">ارتفاع 0</div><canvas id="djC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center;direction:ltr"><button class="btn" id="djL" style="width:auto!important;display:inline-block!important;min-width:60px">◀</button><button class="btn d" id="djX" style="width:auto!important;display:inline-block!important">إغلاق</button><button class="btn" id="djR" style="width:auto!important;display:inline-block!important;min-width:60px">▶</button></div>';
  const cv=$('djC');cv.width=CW;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('djC')&&$('modal').style.display!=='none';
  const dw=()=>{x.fillStyle='#d3f9d8';x.fillRect(0,0,CW,CH);x.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<4;i++){const cy=((i*130-cam*0.3)%(CH+40)+CH+40)%(CH+40)-20;x.beginPath();x.arc((i*97)%CW,cy,14,0,7);x.fill()}
   plats.forEach(p=>{const y=p.y-cam;if(y<-20||y>CH+20)return;x.fillStyle=p.sp?'#fa5252':p.mv?'#339af0':'#40c057';x.beginPath();x.roundRect?x.roundRect(p.x,y,PW,10,5):x.rect(p.x,y,PW,10);x.fill();if(p.sp){x.fillStyle='#ffd43b';x.fillRect(p.x+PW/2-6,y-6,12,6)}});
   x.font='30px sans-serif';x.textAlign='center';x.textBaseline='bottom';x.fillText('🦘',px,py-cam+4);
   x.fillStyle='#2b8a3e';x.font='bold 14px sans-serif';x.textAlign='left';x.textBaseline='top';x.fillText('⬆ '+Math.floor(best),8,6)};
  const fin=()=>{over=true;sfx('err');const sc=Math.floor(best),d=today();if(!me.dljD||me.dljD.d!==d)me.dljD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(sc/80),12-me.dljD.c));me.dljD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.dljGames=(me.dljGames||0)+1;const nb=sc>(me.dljBest||0);if(nb)me.dljBest=sc;saveMe();
   c.innerHTML='<h2>🦘 وقعت!</h2><div style="text-align:center;font-size:16px">وصلت ارتفاع <b>'+sc+'</b><br>'+(nb&&sc?'🏆 رقم قياسي!':'أحسن ارتفاع: '+(me.dljBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(80 ارتفاع = 1🪙)')+'</div><div class="row"><button class="btn" id="djR2">🔁 تاني</button><button class="btn d" id="djX2">إغلاق</button></div>';
   $('djR2').onclick=dljStart;$('djX2').onclick=()=>{$('modal').style.display='none'}};
  step=dt=>{if(over)return;dt=Math.min(dt,0.05);t+=dt;
   const mvx=Math.max(-1,Math.min(1,(tx-px)/8))*340*dt;px+=dir?dir*300*dt:mvx;if(px<0)px+=CW;if(px>CW)px-=CW;if(dir)tx=px;
   const oy=py;vy+=G0*dt;py+=vy*dt;
   plats.forEach(p=>{if(p.mv){p.x+=p.dx*dt;if(p.x<4||p.x>CW-PW-4)p.dx*=-1}});
   if(vy>0)for(const p of plats){if(oy<=p.y+2&&py>=p.y&&px>p.x-8&&px<p.x+PW+8){py=p.y;vy=-(p.sp?VJ*1.55:VJ);sfx(p.sp?'star':'tick');break}}
   if(py-CH*0.4<cam)cam=py-CH*0.4;best=Math.max(best,-cam/10);gen();plats=plats.filter(p=>p.y-cam<CH+60);
   if(py-cam>CH+20){dw();fin();return}dw();const h=$('djH');if(h)h.textContent='ارتفاع '+Math.floor(best)};
  const loop=ts=>{if(!open())return;if(!over){const dt=last?(ts-last)/1000:0.016;last=ts;step(dt);requestAnimationFrame(loop)}};
  const hold=(id,d)=>{const b=$(id);b.onpointerdown=e=>{e.preventDefault();dir=d};b.onpointerup=b.onpointerleave=b.onpointercancel=()=>{if(dir===d)dir=0}};hold('djL',-1);hold('djR',1);
  const mvp=e=>{const r=cv.getBoundingClientRect();tx=(e.clientX-r.left)*CW/r.width};cv.onpointerdown=e=>{e.preventDefault();mvp(e)};cv.onpointermove=e=>{if(e.buttons||e.pointerType==='touch')mvp(e)};
  document.addEventListener('keydown',function kd(e){if(!open()){document.removeEventListener('keydown',kd);return}if(e.key==='ArrowLeft')dir=-1;if(e.key==='ArrowRight')dir=1});document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')dir=0});
  $('djX').onclick=()=>{$('modal').style.display='none'};dw();requestAnimationFrame(loop)})}
let lnrh=null;
function buildLnr(){
 const g=indoor(0xf76707,0xfff4e6,0xffc078);
 sign(g,'🏃 غرفة ركض الحارات',0,4.6,-7.6,'rgba(247,103,7,.92)');
 [-1.4,0,1.4].forEach((x,i)=>g.add(mesh(G.box(1.2,0.1,5),0x495057,x,0.1,-4.3),mesh(G.box(0.08,0.12,5),0xffd43b,x+0.7,0.12,-4.3)));
 [[-1.4,-5.5],[0,-3.8],[1.4,-4.6]].forEach(([x,z])=>g.add(mesh(G.box(0.7,0.6,0.4),0xfa5252,x,0.5,z)));
 [[0,-5.8],[1.4,-3]].forEach(([x,z])=>g.add(mesh(G.cyl(0.25,0.25,0.08,14),0xffd43b,x,0.25,z)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0xf76707,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0xf76707,5,0.5,0));
 lnrh={it:{x:0,z:0.2,label:'🏃 العب ركض الحارات',fn:lnrStart}};interacts.push(lnrh.it);
 g.add(portalMesh('ارجع لقفز الأبراج',5.8,5.8,0x37b24d,'dljroom'),portalMesh('🏗️ برج التكديس',-5.8,5.8,0x1c7ed6,'twsroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏃 غيّر الحارة بالضغط يمين أو شمال. اتفادى العوائق وجمّع العملات!',3400)
}
function lnrStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CW=H?Math.min(W,220):Math.min(W,300),CH=H?Math.max(130,innerHeight-160):Math.min(Math.max(280,innerHeight-330),440);
 let lane=1,px=CW/2,items=[],dist=0,coins=0,lives=3,over=false,inv=0,since=0,last=0,paid=0;
 const LW=CW/3,PY=CH-46;
 const spawn=()=>{const row=[0,0,0];const n=Math.random()<0.35?2:1;let k=0;while(k<n){const l=Math.floor(Math.random()*3);if(!row[l]){row[l]=1;k++}}items.push(...row.map((v,l)=>v?{l,y:-30,k:'o'}:null).filter(Boolean));const fr=[0,1,2].filter(l=>!row[l]);if(Math.random()<0.6)items.push({l:fr[Math.floor(Math.random()*fr.length)],y:-30-70,k:'c'})};
 let step=()=>{};
 window.lnrq=()=>({score:Math.floor(dist+coins*10),dist:Math.floor(dist),coins,lives,over,lane,items:items.map(i=>({...i})),PY,CH,go:l=>{lane=Math.max(0,Math.min(2,l))},step:d=>step(d),paid});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏃 ركض الحارات</h2>')+'<div id="lnH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="lnC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center;direction:ltr"><button class="btn" id="lnL" style="width:auto!important;display:inline-block!important;min-width:60px">◀</button><button class="btn d" id="lnX" style="width:auto!important;display:inline-block!important">إغلاق</button><button class="btn" id="lnR" style="width:auto!important;display:inline-block!important;min-width:60px">▶</button></div>';
  const cv=$('lnC');cv.width=CW;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('lnC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('lnH'))$('lnH').textContent='⬆ '+Math.floor(dist+coins*10)+' · 🪙 '+coins+' · '+'❤️'.repeat(lives)};
  const dw=()=>{x.fillStyle='#495057';x.fillRect(0,0,CW,CH);x.strokeStyle='#ffd43b';x.lineWidth=3;x.setLineDash([16,14]);x.lineDashOffset=-(dist*10%30);for(let i=1;i<3;i++){x.beginPath();x.moveTo(i*LW,0);x.lineTo(i*LW,CH);x.stroke()}x.setLineDash([]);
   items.forEach(i=>{const cx=(i.l+0.5)*LW;if(i.k==='o'){x.fillStyle='#e03131';x.fillRect(cx-22,i.y-14,44,28);x.fillStyle='#fff';for(let k=-1;k<=1;k++)x.fillRect(cx+k*14-4,i.y-14,8,28);x.strokeStyle='#212529';x.lineWidth=2;x.strokeRect(cx-22,i.y-14,44,28)}else{x.fillStyle='#ffd43b';x.beginPath();x.arc(cx,i.y,11,0,7);x.fill();x.strokeStyle='#f08c00';x.lineWidth=3;x.stroke()}});
   if(inv<=0||Math.floor(inv*10)%2){x.fillStyle='#1c7ed6';x.beginPath();x.arc(px,PY+6,17,0,7);x.fill();x.fillStyle='#ffd8a8';x.beginPath();x.arc(px,PY-12,10,0,7);x.fill();x.fillStyle='#212529';x.fillRect(px-5,PY-14,3,3);x.fillRect(px+2,PY-14,3,3)}};
  const fin=()=>{over=true;sfx('err');const sc=Math.floor(dist+coins*10),d=today();if(!me.lnrD||me.lnrD.d!==d)me.lnrD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(sc/150),12-me.lnrD.c));me.lnrD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.lnrGames=(me.lnrGames||0)+1;const nb=sc>(me.lnrBest||0);if(nb)me.lnrBest=sc;saveMe();
   c.innerHTML='<h2>🏃 خلصت الجولة!</h2><div style="text-align:center;font-size:16px">النتيجة <b>'+sc+'</b> · 🪙 '+coins+'<br>'+(nb&&sc?'🏆 رقم قياسي!':'أحسن نتيجة: '+(me.lnrBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(150 نتيجة = 1🪙)')+'</div><div class="row"><button class="btn" id="lnR2">🔁 تاني</button><button class="btn d" id="lnX2">إغلاق</button></div>';
   $('lnR2').onclick=lnrStart;$('lnX2').onclick=()=>{$('modal').style.display='none'}};
  step=dt=>{if(over)return;dt=Math.min(dt,0.05);const v=Math.min(130+dist*0.35,340);dist+=v*dt/8;since+=v*dt;if(since>=150){since=0;spawn()}
   px+=((lane+0.5)*LW-px)*Math.min(1,dt*16);inv=Math.max(0,inv-dt);
   items.forEach(i=>i.y+=v*dt);
   items=items.filter(i=>{if(i.y>CH+30)return false;if(Math.abs(i.y-PY)<26&&i.l===lane){if(i.k==='c'){coins++;sfx('star');return false}if(inv<=0){lives--;inv=1.2;sfx('err');return false}}return true});
   dw();hud();if(lives<=0)fin()};
  const loop=ts=>{if(!open())return;if(!over){const dt=last?(ts-last)/1000:0.016;last=ts;step(dt);requestAnimationFrame(loop)}};
  const go=d=>{lane=Math.max(0,Math.min(2,lane+d));sfx('tick')};
  $('lnL').onpointerdown=e=>{e.preventDefault();go(-1)};$('lnR').onpointerdown=e=>{e.preventDefault();go(1)};
  cv.onpointerdown=e=>{e.preventDefault();const r=cv.getBoundingClientRect();go((e.clientX-r.left)/r.width<0.5?-1:1)};
  document.addEventListener('keydown',function kd(e){if(!open()){document.removeEventListener('keydown',kd);return}if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
  $('lnX').onclick=()=>{$('modal').style.display='none'};dw();hud();requestAnimationFrame(loop)})}

let twsh=null;
function buildTws(){
 const g=indoor(0x1c7ed6,0xe7f5ff,0x74c0fc);
 sign(g,'🏗️ غرفة برج التكديس',0,4.6,-7.6,'rgba(28,126,214,.92)');
 [[3,0x4dabf7],[2.4,0x339af0],[1.8,0x1c7ed6],[1.2,0x1971c2],[0.7,0xffd43b]].forEach(([w,c],i)=>g.add(mesh(G.box(w,0.5,w),c,0,0.25+i*0.5,-4.5)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x1c7ed6,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x1c7ed6,5,0.5,0));
 twsh={it:{x:0,z:0.2,label:'🏗️ العب برج التكديس',fn:twsStart}};interacts.push(twsh.it);
 g.add(portalMesh('ارجع لركض الحارات',5.8,5.8,0xf76707,'lnrroom'),portalMesh('🔎 البحث عن الكلمات',-5.8,5.8,0x9c36b5,'wdsroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏗️ اضغط في اللحظة المظبوطة عشان تنزل الطابق فوق اللي تحته. اللي بيطلع بره بيتقصّ!',3600)
}
function twsStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CW=H?Math.min(W,240):Math.min(W,300),CH=H?Math.max(130,innerHeight-160):Math.min(Math.max(280,innerHeight-330),440);
 const BH=18,TY=Math.round(CH*0.5);
 let st=[{x:(CW-130)/2,w:130}],cur={x:0,w:130,d:1},n=0,perf=0,over=false,last=0,paid=0,flash=0;
 const spd=()=>Math.min(90+n*7,280);
 let step=()=>{};
 window.twsq=()=>({n,over,perf,cx:cur.x,cw:cur.w,tx:st[st.length-1].x,tw:st[st.length-1].w,CW,drop:()=>drop(),step:d=>step(d),paid});
 let drop=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏗️ برج التكديس</h2>')+'<div id="twH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="twC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="twD" style="width:auto!important;display:inline-block!important;min-width:110px">⬇ نزّل</button><button class="btn d" id="twX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('twC');cv.width=CW;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('twC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('twH'))$('twH').textContent='🏗️ '+n+' طابق · ✨ '+perf+' مظبوط'};
  const col=i=>'hsl('+((i*23+200)%360)+',70%,55%)';
  const dw=()=>{const g=x.createLinearGradient(0,0,0,CH);g.addColorStop(0,'#a5d8ff');g.addColorStop(1,'#e7f5ff');x.fillStyle=g;x.fillRect(0,0,CW,CH);
   x.fillStyle='#fff';x.beginPath();x.arc(50,40,16,0,7);x.arc(70,38,20,0,7);x.arc(92,42,14,0,7);x.fill();
   st.forEach((b,i)=>{const y=TY+(st.length-1-i)*BH;x.fillStyle=col(i);x.fillRect(b.x,y,b.w,BH-1);x.fillStyle='rgba(255,255,255,.3)';x.fillRect(b.x,y,b.w,4)});
   if(!over){x.fillStyle=col(st.length);x.fillRect(cur.x,TY-BH,cur.w,BH-1);x.fillStyle='rgba(255,255,255,.3)';x.fillRect(cur.x,TY-BH,cur.w,4)}
   if(flash>0){x.fillStyle='rgba(255,215,0,'+flash+')';x.fillRect(st[st.length-1].x,TY,st[st.length-1].w,BH-1)}};
  const fin=()=>{over=true;sfx('err');const d=today();if(!me.twsD||me.twsD.d!==d)me.twsD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(n/4),12-me.twsD.c));me.twsD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.twsGames=(me.twsGames||0)+1;const nb=n>(me.twsBest||0);if(nb)me.twsBest=n;saveMe();
   c.innerHTML='<h2>🏗️ البرج وقع!</h2><div style="text-align:center;font-size:16px">ارتفاع البرج <b>'+n+'</b> طابق · ✨ '+perf+' مظبوط<br>'+(nb&&n?'🏆 رقم قياسي!':'أحسن ارتفاع: '+(me.twsBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(4 طوابق = 1🪙)')+'</div><div class="row"><button class="btn" id="twR2">🔁 تاني</button><button class="btn d" id="twX2">إغلاق</button></div>';
   $('twR2').onclick=twsStart;$('twX2').onclick=()=>{$('modal').style.display='none'}};
  drop=()=>{if(over)return;const t=st[st.length-1];const l=Math.max(cur.x,t.x),r=Math.min(cur.x+cur.w,t.x+t.w),ov=r-l;
   if(ov<=0){dw();fin();return}
   if(Math.abs(cur.x-t.x)<5){st.push({x:t.x,w:cur.w});perf++;flash=0.8;sfx('win')}else{st.push({x:l,w:ov});sfx('place')}
   n++;cur={x:cur.x,w:st[st.length-1].w,d:cur.d};cur.x=cur.d>0?0:CW-cur.w;hud();dw()};
  step=dt=>{if(over)return;dt=Math.min(dt,0.05);flash=Math.max(0,flash-dt*2);cur.x+=cur.d*spd()*dt;if(cur.x<=0){cur.x=0;cur.d=1}if(cur.x+cur.w>=CW){cur.x=CW-cur.w;cur.d=-1}dw()};
  const loop=ts=>{if(!open())return;if(!over){const dt=last?(ts-last)/1000:0.016;last=ts;step(dt);requestAnimationFrame(loop)}};
  $('twD').onpointerdown=e=>{e.preventDefault();drop()};
  cv.onpointerdown=e=>{e.preventDefault();drop()};
  document.addEventListener('keydown',function kd(e){if(!open()){document.removeEventListener('keydown',kd);return}if(e.key===' '||e.key==='ArrowDown'){e.preventDefault();drop()}});
  $('twX').onclick=()=>{$('modal').style.display='none'};dw();hud();requestAnimationFrame(loop)})}

let wdsh=null;
function buildWds(){
 const g=indoor(0x9c36b5,0xf8f0fc,0xe599f7);
 sign(g,'🔎 غرفة البحث عن الكلمات',0,4.6,-7.6,'rgba(156,54,181,.92)');
 [[-1.5,-4.8],[0,-4.8],[1.5,-4.8],[-0.75,-3.4],[0.75,-3.4]].forEach(([x,z],i)=>g.add(mesh(G.box(1.2,0.3,1.2),[0xe599f7,0xda77f2,0xcc5de8,0xbe4bdb,0x9c36b5][i],x,0.15,z)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x9c36b5,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x9c36b5,5,0.5,0));
 wdsh={it:{x:0,z:0.2,label:'🔎 العب البحث عن الكلمات',fn:wdsStart}};interacts.push(wdsh.it);
 g.add(portalMesh('ارجع لبرج التكديس',5.8,5.8,0x1c7ed6,'twsroom'),portalMesh('🐾 حيواني الأليف',-5.8,5.8,0xf08c00,'ptfroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🔎 دوّر على 5 كلمات مخفية. اضغط أول حرف وبعدين آخر حرف (أفقي أو رأسي)!',3600)
}
function wdsStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),N=7,CW=H?Math.min(W,Math.max(150,innerHeight-175)):Math.min(W,320),cs=CW/N;
 const POOL=['قمر','نجم','بحر','شمس','جبل','نهر','وردة','قطة','كتاب','بيت','سمك','نخلة','ماء','ريح','سحاب','زهرة','طير','باب'];
 const FIL='ابتجحدرسشعفقكلمنهوي';
 let words=POOL.slice().sort(()=>Math.random()-0.5).slice(0,5),grid,place=[],found=[],sel=null,over=false,t0=Date.now(),bad=0,paid=0,fl=null;
 const build=()=>{for(let tries=0;tries<200;tries++){grid=Array.from({length:N},()=>Array(N).fill(''));place=[];let ok=true;
   for(const w of words){const L=[...w];let done=false;for(let k=0;k<80&&!done;k++){const v=Math.random()<0.5,rev=Math.random()<0.5,r=Math.floor(Math.random()*(v?N-L.length+1:N)),c=Math.floor(Math.random()*(v?N:N-L.length+1));const cells=L.map((ch,i)=>[v?r+i:r,v?c:c+i]);const seq=rev?L.slice().reverse():L;if(cells.every(([a,b],i)=>!grid[a][b]||grid[a][b]===seq[i])){cells.forEach(([a,b],i)=>grid[a][b]=seq[i]);place.push({w,cells});done=true}}
    if(!done){ok=false;break}}
   if(ok){for(let a=0;a<N;a++)for(let b=0;b<N;b++)if(!grid[a][b])grid[a][b]=FIL[Math.floor(Math.random()*FIL.length)];return}}};
 build();
 let tap=()=>{};
 window.wdsq=()=>({over,found:found.length,words:words.slice(),place:place.map(p=>({w:p.w,cells:p.cells})),N,paid,tap:(r,c)=>tap(r,c),bad});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🔎 البحث عن الكلمات</h2>')+'<div id="wdH" style="text-align:center;font-size:14px;margin:2px;line-height:1.5"></div><canvas id="wdC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="wdX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('wdC');cv.width=CW;cv.height=CW;const x=cv.getContext('2d');
  const open=()=>$('wdC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('wdH'))$('wdH').innerHTML=words.map(w=>found.includes(w)?'<s style="opacity:.5">'+w+'</s>':'<b>'+w+'</b>').join(' · ')};
  const fc=new Set();found.forEach(()=>0);
  const dw=()=>{x.fillStyle='#f8f0fc';x.fillRect(0,0,CW,CW);const fset=new Set();place.filter(p=>found.includes(p.w)).forEach(p=>p.cells.forEach(([a,b])=>fset.add(a+','+b)));
   for(let a=0;a<N;a++)for(let b=0;b<N;b++){const k=a+','+b;x.fillStyle=fset.has(k)?'#8ce99a':(sel&&sel[0]===a&&sel[1]===b)?'#ffd43b':(fl&&fl[0]===a&&fl[1]===b)?'#ff8787':'#fff';x.fillRect(b*cs+1,a*cs+1,cs-2,cs-2);x.fillStyle='#212529';x.font='700 '+Math.round(cs*0.6)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(grid[a][b],b*cs+cs/2,a*cs+cs/2+1)}};
  const fin=()=>{over=true;sfx('win');const secs=Math.round((Date.now()-t0)/1000),sc=Math.max(0,180-secs-bad*5),d=today();if(!me.wdsD||me.wdsD.d!==d)me.wdsD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(sc/50),12-me.wdsD.c));me.wdsD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.wdsGames=(me.wdsGames||0)+1;const nb=sc>(me.wdsBest||0);if(nb)me.wdsBest=sc;saveMe();
   c.innerHTML='<h2>🔎 لقيت كل الكلمات!</h2><div style="text-align:center;font-size:16px">الوقت <b>'+secs+'</b> ث · غلطات '+bad+'<br>النتيجة <b>'+sc+'</b><br>'+(nb&&sc?'🏆 رقم قياسي!':'أحسن نتيجة: '+(me.wdsBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(النتيجة 50 = 1🪙)')+'</div><div class="row"><button class="btn" id="wdR2">🔁 تاني</button><button class="btn d" id="wdX2">إغلاق</button></div>';
   $('wdR2').onclick=wdsStart;$('wdX2').onclick=()=>{$('modal').style.display='none'}};
  tap=(r,c2)=>{if(over)return;
   if(!sel){sel=[r,c2];sfx('tick');dw();return}
   const [a,b]=sel;if(a===r&&b===c2){sel=null;dw();return}
   if(a!==r&&b!==c2){sel=[r,c2];sfx('tick');dw();return}
   const cells=[];if(a===r){const s=b<c2?1:-1;for(let j=b;j!==c2+s;j+=s)cells.push([r,j])}else{const s=a<r?1:-1;for(let i=a;i!==r+s;i+=s)cells.push([i,b])}
   const str=cells.map(([i,j])=>grid[i][j]).join(''),rs=[...str].reverse().join('');
   const w=words.find(w=>!found.includes(w)&&(w===str||w===rs));sel=null;
   if(w){found.push(w);sfx('star');hud();dw();if(found.length===words.length)setTimeout(fin,500)}
   else{bad++;sfx('err');fl=[r,c2];dw();setTimeout(()=>{fl=null;if(open())dw()},300)}};
  cv.onpointerdown=e=>{e.preventDefault();const rc=cv.getBoundingClientRect(),px=(e.clientX-rc.left)/rc.width*CW,py=(e.clientY-rc.top)/rc.height*CW;tap(Math.min(N-1,Math.max(0,Math.floor(py/cs))),Math.min(N-1,Math.max(0,Math.floor(px/cs))))};
  $('wdX').onclick=()=>{$('modal').style.display='none'};dw();hud()})}

let ptfh=null;
function buildPtf(){
 const g=indoor(0xf08c00,0xfff9db,0xffe066);
 sign(g,'🐾 غرفة الحيوان الأليف',0,4.6,-7.6,'rgba(240,140,0,.92)');
 g.add(mesh(G.cyl(0.9,0.9,0.25,16),0xfab005,0,0.13,-4.2),mesh(G.sph(0.6,12,10),0xffa94d,0,0.75,-4.2),mesh(G.sph(0.4,12,10),0xffa94d,0,1.55,-4.2),mesh(G.cyl(0.02,0.14,0.3,4),0xffa94d,-0.22,2.0,-4.2),mesh(G.cyl(0.02,0.14,0.3,4),0xffa94d,0.22,2.0,-4.2));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0xf08c00,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0xf08c00,5,0.5,0));
 ptfh={it:{x:0,z:0.2,label:'🐾 شوف حيوانك الأليف',fn:ptfStart}};interacts.push(ptfh.it);
 g.add(portalMesh('ارجع للبحث عن الكلمات',5.8,5.8,0x9c36b5,'wdsroom'),portalMesh('🌀 المتاهة بالوقت',-5.8,5.8,0x2b8a3e,'mztroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🐾 حيوانك بيجوع ويزهق مع الوقت. أطعمه والعب معاه وهيكبر!',3600)
}
function ptfStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CW=H?Math.min(W,260):Math.min(W,300),CH=H?Math.max(120,innerHeight-190):Math.min(Math.max(230,innerHeight-380),300);
 const now=()=>Date.now();
 if(me.ptfT==null){me.ptfH=70;me.ptfJ=70;me.ptfT=now();me.ptfX=me.ptfX||0}
 const decay=()=>{const t=now(),dh=(t-me.ptfT)/3600000;me.ptfH=Math.max(0,me.ptfH-dh*12.5);me.ptfJ=Math.max(0,me.ptfJ-dh*16);me.ptfT=t};
 decay();
 let hearts=[],bounce=0,msg='',last=0,eat=0,play=0;
 const stage=()=>me.ptfX>=30?2:me.ptfX>=10?1:0;
 const SN=['صغير','كبير شوية','كبير'];
 const bonus=()=>{const d=today();if(me.ptfH>=50&&me.ptfJ>=50&&me.ptfBonus!==d){me.ptfBonus=d;me.coins++;updCoins();msg='⭐ مكافأة الرعاية: +1🪙'}};
 const act=(k)=>{decay();
  if(k==='f'){if(me.ptfH>=95){msg='مش جعان 😴';return false}if(me.coins<1){msg='محتاج 1🪙 للأكل';sfx('err');return false}me.coins--;updCoins();me.ptfH=Math.min(100,me.ptfH+30);me.ptfX++;eat=1;msg='ياميي! 🍖';sfx('drink')}
  else{if(me.ptfJ>=95){msg='لعبنا كفاية 😊';return false}me.ptfJ=Math.min(100,me.ptfJ+25);me.ptfX++;me.ptfGames=(me.ptfGames||0)+1;play=1;msg='هههه! 🎾';sfx('star')}
  me.ptfBest=me.ptfX;for(let i=0;i<5;i++)hearts.push({x:CW/2+(Math.random()-0.5)*80,y:CH*0.4,v:30+Math.random()*30});bonus();saveMe();return true};
 window.ptfq=()=>({h:Math.round(me.ptfH),j:Math.round(me.ptfJ),xp:me.ptfX,stage:stage(),coins:me.coins,feed:()=>act('f'),play:()=>act('p'),msg});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🐾 حيواني الأليف</h2>')+'<div id="pfH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="pfC" style="display:block;margin:4px auto;border-radius:10px"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="pfF" style="width:auto!important;display:inline-block!important">🍖 أطعمه (1🪙)</button><button class="btn" id="pfP" style="width:auto!important;display:inline-block!important">🎾 العب معاه</button><button class="btn d" id="pfX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('pfC');cv.width=CW;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('pfC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('pfH'))$('pfH').textContent=SN[stage()]+' · خبرة '+me.ptfX+(msg?' · '+msg:'')};
  const bar=(y,v,col,lab)=>{x.fillStyle='rgba(0,0,0,.12)';x.fillRect(10,y,CW-20,10);x.fillStyle=col;x.fillRect(10,y,(CW-20)*v/100,10);x.fillStyle='#212529';x.font='11px sans-serif';x.textAlign='left';x.textBaseline='alphabetic';x.fillText(lab+' '+Math.round(v),12,y-2)};
  const dw=()=>{x.fillStyle='#fff3bf';x.fillRect(0,0,CW,CH);x.fillStyle='#ffd8a8';x.fillRect(0,CH*0.72,CW,CH*0.28);
   bar(22,me.ptfH,'#f76707','الجوع (شبع)');bar(48,me.ptfJ,'#37b24d','المرح');
   const s=[0.7,0.9,1.1][stage()]*(H?0.75:1),cx=CW/2,cy=CH*(H?0.7:0.58)-Math.abs(Math.sin(bounce*3))*(play>0?22:6),R=42*s,mood=me.ptfH>=50&&me.ptfJ>=50?1:(me.ptfH<30||me.ptfJ<30?-1:0);
   x.fillStyle='#ffa94d';x.beginPath();x.ellipse(cx,cy+R*0.5,R*1.05,R*0.95,0,0,7);x.fill();x.beginPath();x.arc(cx,cy-R*0.5,R*0.8,0,7);x.fill();
   x.beginPath();x.moveTo(cx-R*0.7,cy-R*0.9);x.lineTo(cx-R*0.5,cy-R*1.6);x.lineTo(cx-R*0.15,cy-R*1.1);x.fill();x.beginPath();x.moveTo(cx+R*0.7,cy-R*0.9);x.lineTo(cx+R*0.5,cy-R*1.6);x.lineTo(cx+R*0.15,cy-R*1.1);x.fill();
   x.fillStyle='#212529';x.beginPath();x.arc(cx-R*0.3,cy-R*0.55,R*0.1,0,7);x.arc(cx+R*0.3,cy-R*0.55,R*0.1,0,7);x.fill();x.strokeStyle='#212529';x.lineWidth=2.5;x.beginPath();
   if(mood>0)x.arc(cx,cy-R*0.3,R*0.25,0.1,3.05);else if(mood<0)x.arc(cx,cy-R*0.1,R*0.25,3.3,6.1);else{x.moveTo(cx-R*0.2,cy-R*0.2);x.lineTo(cx+R*0.2,cy-R*0.2)}x.stroke();
   if(stage()===2){x.fillStyle='#ffd43b';x.beginPath();x.moveTo(cx-R*0.5,cy-R*1.2);x.lineTo(cx-R*0.35,cy-R*1.6);x.lineTo(cx,cy-R*1.25);x.lineTo(cx+R*0.35,cy-R*1.6);x.lineTo(cx+R*0.5,cy-R*1.2);x.fill()}
   if(eat>0){x.fillStyle='#c92a2a';x.beginPath();x.arc(cx+R*1.3,cy+R*0.3,10,0,7);x.fill()}
   hearts.forEach(h=>{x.fillStyle='#fa5252';x.beginPath();x.arc(h.x-4,h.y,5,0,7);x.arc(h.x+4,h.y,5,0,7);x.fill();x.beginPath();x.moveTo(h.x-9,h.y+2);x.lineTo(h.x,h.y+13);x.lineTo(h.x+9,h.y+2);x.fill()})};
  const loop=ts=>{if(!open())return;const dt=last?Math.min(0.05,(ts-last)/1000):0.016;last=ts;bounce+=dt;eat=Math.max(0,eat-dt);play=Math.max(0,play-dt);hearts.forEach(h=>h.y-=h.v*dt);hearts=hearts.filter(h=>h.y>0);decay();dw();hud();requestAnimationFrame(loop)};
  $('pfF').onclick=()=>{act('f');hud()};$('pfP').onclick=()=>{act('p');hud()};
  $('pfX').onclick=()=>{$('modal').style.display='none'};dw();hud();requestAnimationFrame(loop)})}

let mzth=null;
function buildMzt(){
 const g=indoor(0x2b8a3e,0xebfbee,0x8ce99a);
 sign(g,'🌀 غرفة المتاهة بالوقت',0,4.6,-7.6,'rgba(43,138,62,.92)');
 [[-2,-4.8,3,0.5],[0.5,-4.8,0.5,2.5],[2,-3.5,2,0.5],[-1,-3.2,0.5,1.8],[1,-5.8,2.5,0.5]].forEach(([x,z,w,d])=>g.add(mesh(G.box(w,1.2,d),0x2f9e44,x,0.6,z)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x2b8a3e,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x2b8a3e,5,0.5,0));
 mzth={it:{x:0,z:0.2,label:'🌀 العب المتاهة بالوقت',fn:mztStart}};interacts.push(mzth.it);
 g.add(portalMesh('ارجع لحيواني الأليف',5.8,5.8,0xf08c00,'ptfroom'),portalMesh('🫧 فقاعات الرماية',-5.8,5.8,0xd6336c,'bstroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🌀 وصّل للمربع الأخضر قبل ما الوقت يخلص. كل متاهة أكبر من اللي قبلها!',3600)
}
function mztStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CW=H?Math.min(W,Math.max(150,innerHeight-190)):Math.min(W,320);
 let lv=0,size=6,grid,pr=0,pc=0,er=0,ec=0,tl=0,tmax=1,over=false,last=0,paid=0,cs=1;
 const mk=()=>{size=Math.min(6+lv,11);cs=CW/size;grid=Array.from({length:size},()=>Array(size).fill(15));const seen=Array.from({length:size},()=>Array(size).fill(0));const st=[[0,0]];seen[0][0]=1;
  const D=[[-1,0,1,4],[0,1,2,8],[1,0,4,1],[0,-1,8,2]];
  while(st.length){const [r,c]=st[st.length-1];const nb=D.filter(([dr,dc])=>{const a=r+dr,b=c+dc;return a>=0&&b>=0&&a<size&&b<size&&!seen[a][b]});if(!nb.length){st.pop();continue}const [dr,dc,w1,w2]=nb[Math.floor(Math.random()*nb.length)];const a=r+dr,b=c+dc;grid[r][c]&=~w1;grid[a][b]&=~w2;seen[a][b]=1;st.push([a,b])}
  pr=0;pc=0;er=size-1;ec=size-1;
  const dist=Array.from({length:size},()=>Array(size).fill(-1));dist[0][0]=0;const qq=[[0,0]];while(qq.length){const [r,c]=qq.shift();D.forEach(([dr,dc,w1])=>{const a=r+dr,b=c+dc;if(a>=0&&b>=0&&a<size&&b<size&&!(grid[r][c]&w1)&&dist[a][b]<0){dist[a][b]=dist[r][c]+1;qq.push([a,b])}})}
  tmax=tl=dist[er][ec]*0.9+8};
 mk();
 let mv=()=>{},step=()=>{};
 window.mztq=()=>({level:lv,size,over,pos:[pr,pc],exit:[er,ec],grid:grid.map(r=>r.slice()),time:tl,move:(dr,dc)=>mv(dr,dc),step:d=>step(d),paid});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🌀 المتاهة بالوقت</h2>')+'<div id="mzH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="mzC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row" style="display:flex;gap:6px;justify-content:center;direction:ltr"><button class="btn" id="mzL" style="width:auto!important;display:inline-block!important;min-width:46px">◀</button><button class="btn" id="mzU" style="width:auto!important;display:inline-block!important;min-width:46px">▲</button><button class="btn" id="mzD" style="width:auto!important;display:inline-block!important;min-width:46px">▼</button><button class="btn" id="mzR" style="width:auto!important;display:inline-block!important;min-width:46px">▶</button><button class="btn d" id="mzX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('mzC');cv.width=CW;cv.height=CW;const x=cv.getContext('2d');
  const open=()=>$('mzC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('mzH'))$('mzH').textContent='🌀 متاهة '+(lv+1)+' · ⏱ '+Math.ceil(tl)+' ث'};
  const dw=()=>{x.fillStyle='#ebfbee';x.fillRect(0,0,CW,CW);x.fillStyle='#51cf66';x.fillRect(ec*cs+3,er*cs+3,cs-6,cs-6);x.strokeStyle='#2b8a3e';x.lineWidth=2.5;x.lineCap='round';x.beginPath();
   for(let r=0;r<size;r++)for(let c=0;c<size;c++){const w=grid[r][c],X=c*cs,Y=r*cs;if(w&1){x.moveTo(X,Y);x.lineTo(X+cs,Y)}if(w&2){x.moveTo(X+cs,Y);x.lineTo(X+cs,Y+cs)}if(w&4){x.moveTo(X,Y+cs);x.lineTo(X+cs,Y+cs)}if(w&8){x.moveTo(X,Y);x.lineTo(X,Y+cs)}}x.stroke();
   x.fillStyle='#e8590c';x.beginPath();x.arc(pc*cs+cs/2,pr*cs+cs/2,cs*0.3,0,7);x.fill();
   x.fillStyle='rgba(0,0,0,.15)';x.fillRect(0,CW-5,CW,5);x.fillStyle=tl/tmax<0.25?'#e03131':'#fab005';x.fillRect(0,CW-5,CW*Math.max(0,tl/tmax),5)};
  const fin=()=>{over=true;sfx('err');const d=today();if(!me.mztD||me.mztD.d!==d)me.mztD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(lv/2),12-me.mztD.c));me.mztD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.mztGames=(me.mztGames||0)+1;const nb=lv>(me.mztBest||0);if(nb)me.mztBest=lv;saveMe();
   c.innerHTML='<h2>🌀 الوقت خلص!</h2><div style="text-align:center;font-size:16px">خلّصت <b>'+lv+'</b> متاهة<br>'+(nb&&lv?'🏆 رقم قياسي!':'أحسن نتيجة: '+(me.mztBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(كل متاهتين = 1🪙)')+'</div><div class="row"><button class="btn" id="mzR2">🔁 تاني</button><button class="btn d" id="mzX2">إغلاق</button></div>';
   $('mzR2').onclick=mztStart;$('mzX2').onclick=()=>{$('modal').style.display='none'}};
  mv=(dr,dc)=>{if(over)return;const w=grid[pr][pc],bit=dr<0?1:dc>0?2:dr>0?4:8;if(w&bit)return;pr+=dr;pc+=dc;sfx('tick');if(pr===er&&pc===ec){lv++;sfx('win');mk()}dw();hud()};
  step=dt=>{if(over)return;tl-=Math.min(dt,0.05);if(tl<=0){tl=0;dw();fin();return}};
  const loop=ts=>{if(!open())return;if(!over){const dt=last?(ts-last)/1000:0.016;last=ts;step(dt);dw();hud();requestAnimationFrame(loop)}};
  $('mzL').onpointerdown=e=>{e.preventDefault();mv(0,-1)};$('mzR').onpointerdown=e=>{e.preventDefault();mv(0,1)};$('mzU').onpointerdown=e=>{e.preventDefault();mv(-1,0)};$('mzD').onpointerdown=e=>{e.preventDefault();mv(1,0)};
  let sx=0,sy=0;cv.onpointerdown=e=>{e.preventDefault();sx=e.clientX;sy=e.clientY};cv.onpointerup=e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<12)return;if(Math.abs(dx)>Math.abs(dy))mv(0,dx>0?1:-1);else mv(dy>0?1:-1,0)};
  document.addEventListener('keydown',function kd(e){if(!open()){document.removeEventListener('keydown',kd);return}const m={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]}[e.key];if(m){e.preventDefault();mv(...m)}});
  $('mzX').onclick=()=>{$('modal').style.display='none'};dw();hud();requestAnimationFrame(loop)})}

let bsth=null;
function buildBst(){
 const g=indoor(0xd6336c,0xfff0f6,0xfaa2c1);
 sign(g,'🫧 غرفة فقاعات الرماية',0,4.6,-7.6,'rgba(214,51,108,.92)');
 [[-1.6,0xfa5252],[-0.8,0x339af0],[0,0x51cf66],[0.8,0xfcc419],[1.6,0xfa5252]].forEach(([x,c],i)=>g.add(mesh(G.sph(0.4,10),c,x,0.4+(i%2)*0.7,-4.4),mesh(G.sph(0.4,10),[0x339af0,0x51cf66,0xfcc419,0xfa5252,0x339af0][i],x,1.2+(i%2)*0.7,-4.4)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0xd6336c,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0xd6336c,5,0.5,0));
 bsth={it:{x:0,z:0.2,label:'🫧 العب فقاعات الرماية',fn:bstStart}};interacts.push(bsth.it);
 g.add(portalMesh('ارجع للمتاهة بالوقت',5.8,5.8,0x2b8a3e,'mztroom'),portalMesh('📸 كشك التصوير',-5.8,5.8,0x7048e8,'pbkroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🫧 وجّه واضغط عشان تضرب. 3 فقاعات من نفس اللون أو أكتر بتفرقع!',3600)
}
function bstStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),COLS=8,CW=H?176:Math.min(W,320),cs=CW/COLS,CH=H?Math.max(150,innerHeight-160):Math.min(Math.max(300,innerHeight-300),440),R=Math.floor((CH-34)/cs),rad=cs/2-1;
 const COL=['#fa5252','#339af0','#51cf66','#fcc419'];
 let grid=Array.from({length:R},()=>Array(COLS).fill(-1)),popped=0,shots=0,over=false,paid=0,last=0,ang=-Math.PI/2,cur=0,nxt=0,fly=null,pops=[];
 const rc=()=>Math.floor(Math.random()*4);
 for(let r=0;r<(H?2:4);r++)for(let c=0;c<COLS;c++)grid[r][c]=rc();
 cur=rc();nxt=rc();
 const SX=CW/2,SY=CH-16;
 let shoot=()=>{},step=()=>{};
 window.bstq=()=>({popped,shots,over,cur,grid:grid.map(r=>r.slice()),R,COLS,cs,SX,SY,fly:!!fly,shoot:a=>shoot(a),step:d=>step(d),paid});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🫧 فقاعات الرماية</h2>')+'<div id="bsH" style="text-align:center;font-size:14px;margin:2px"></div><canvas id="bsC" style="display:block;margin:4px auto;border-radius:10px;touch-action:none"></canvas><div class="row"><button class="btn d" id="bsX">إغلاق</button></div>';
  const cv=$('bsC');cv.width=CW;cv.height=CH;const x=cv.getContext('2d');
  const open=()=>$('bsC')&&$('modal').style.display!=='none';
  const hud=()=>{if($('bsH'))$('bsH').textContent='🫧 '+popped+' فرقعة · '+shots+' طلقة'};
  const ball=(px,py,ci,r)=>{x.fillStyle=COL[ci];x.beginPath();x.arc(px,py,r,0,7);x.fill();x.fillStyle='rgba(255,255,255,.45)';x.beginPath();x.arc(px-r*0.3,py-r*0.3,r*0.25,0,7);x.fill()};
  const dw=()=>{x.fillStyle='#fff0f6';x.fillRect(0,0,CW,CH);x.strokeStyle='#e64980';x.setLineDash([6,6]);x.beginPath();x.moveTo(0,R*cs);x.lineTo(CW,R*cs);x.stroke();x.setLineDash([]);
   for(let r=0;r<R;r++)for(let c=0;c<COLS;c++)if(grid[r][c]>=0)ball(c*cs+cs/2,r*cs+cs/2,grid[r][c],rad);
   pops.forEach(p=>{x.fillStyle='rgba(255,255,255,'+p.a+')';x.beginPath();x.arc(p.x,p.y,rad*(1.5-p.a),0,7);x.fill()});
   if(!over){x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=2;x.beginPath();x.moveTo(SX,SY);x.lineTo(SX+Math.cos(ang)*60,SY+Math.sin(ang)*60);x.stroke();
    ball(SX,SY,cur,rad);if(fly)ball(fly.x,fly.y,fly.ci,rad);ball(CW-16,CH-14,nxt,rad*0.6)}};
  const fin=()=>{over=true;sfx('err');const d=today();if(!me.bstD||me.bstD.d!==d)me.bstD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(popped/12),12-me.bstD.c));me.bstD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.bstGames=(me.bstGames||0)+1;const nb=popped>(me.bstBest||0);if(nb)me.bstBest=popped;saveMe();
   c.innerHTML='<h2>🫧 الفقاعات وصلت!</h2><div style="text-align:center;font-size:16px">فرقعت <b>'+popped+'</b> فقاعة في '+shots+' طلقة<br>'+(nb&&popped?'🏆 رقم قياسي!':'أحسن نتيجة: '+(me.bstBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(12 فقاعة = 1🪙)')+'</div><div class="row"><button class="btn" id="bsR2">🔁 تاني</button><button class="btn d" id="bsX2">إغلاق</button></div>';
   $('bsR2').onclick=bstStart;$('bsX2').onclick=()=>{$('modal').style.display='none'}};
  const land=()=>{let c=Math.max(0,Math.min(COLS-1,Math.floor(fly.x/cs))),r=Math.max(0,Math.min(R-1,Math.floor(fly.y/cs)));
   while(r<R&&grid[r][c]>=0)r++;if(r>=R){fly=null;fin();return}
   grid[r][c]=fly.ci;fly=null;shots++;
   const key=(a,b)=>a*COLS+b,seen=new Set([key(r,c)]),st=[[r,c]],ci=grid[r][c];
   while(st.length){const [a,b]=st.pop();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([da,db])=>{const p=a+da,q=b+db;if(p>=0&&q>=0&&p<R&&q<COLS&&grid[p][q]===ci&&!seen.has(key(p,q))){seen.add(key(p,q));st.push([p,q])}})}
   if(seen.size>=3){seen.forEach(k=>{const a=Math.floor(k/COLS),b=k%COLS;pops.push({x:b*cs+cs/2,y:a*cs+cs/2,a:1});grid[a][b]=-1});popped+=seen.size;sfx('star');
    const con=new Set();const s2=[];for(let b=0;b<COLS;b++)if(grid[0][b]>=0){con.add(b);s2.push([0,b])}
    while(s2.length){const [a,b]=s2.pop();[[1,0],[0,1],[0,-1]].forEach(([da,db])=>{const p=a+da,q=b+db;if(p>=0&&q>=0&&p<R&&q<COLS&&grid[p][q]>=0&&!con.has(key(p,q))){con.add(key(p,q));s2.push([p,q])}})}
    for(let a=1;a<R;a++)for(let b=0;b<COLS;b++)if(grid[a][b]>=0&&!con.has(key(a,b))){pops.push({x:b*cs+cs/2,y:a*cs+cs/2,a:1});grid[a][b]=-1;popped++}}
   else sfx('place');
   if(shots%6===0){if(grid[R-1].some(v=>v>=0)){fin();return}grid.pop();grid.unshift(Array.from({length:COLS},rc))}
   if(grid[R-1].some(v=>v>=0)){fin();return}
   if(grid.every(r=>r.every(v=>v<0))){for(let r=0;r<3;r++)for(let b=0;b<COLS;b++)grid[r][b]=rc()}
   cur=nxt;nxt=rc();hud()};
  shoot=a=>{if(over||fly)return;ang=Math.min(-0.15,Math.max(-Math.PI+0.15,a));fly={x:SX,y:SY,vx:Math.cos(ang),vy:Math.sin(ang),ci:cur};sfx('tick')};
  step=dt=>{if(over)return;dt=Math.min(dt,0.05);pops.forEach(p=>p.a-=dt*3);pops=pops.filter(p=>p.a>0);
   if(fly){let d=640*dt;while(d>0&&fly){const s=Math.min(d,4);fly.x+=fly.vx*s;fly.y+=fly.vy*s;d-=s;if(fly.x<rad){fly.x=rad;fly.vx=Math.abs(fly.vx)}if(fly.x>CW-rad){fly.x=CW-rad;fly.vx=-Math.abs(fly.vx)}
    let hit=fly.y<=rad;if(!hit)outer:for(let r=0;r<R;r++)for(let b=0;b<COLS;b++)if(grid[r][b]>=0&&Math.hypot(b*cs+cs/2-fly.x,r*cs+cs/2-fly.y)<cs*0.85){hit=true;break outer}
    if(hit){land();break}}}
   dw()};
  const aimTo=e=>{const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*CW,py=(e.clientY-r.top)/r.height*CH;ang=Math.atan2(py-SY,px-SX);ang=Math.min(-0.15,Math.max(-Math.PI+0.15,ang))};
  cv.onpointerdown=e=>{e.preventDefault();aimTo(e)};cv.onpointermove=e=>{if(e.buttons)aimTo(e)};cv.onpointerup=e=>{aimTo(e);shoot(ang)};
  const loop=ts=>{if(!open())return;if(!over){const dt=last?(ts-last)/1000:0.016;last=ts;step(dt);requestAnimationFrame(loop)}};
  $('bsX').onclick=()=>{$('modal').style.display='none'};dw();hud();requestAnimationFrame(loop)})}

let pbkh=null;
function buildPbk(){
 const g=indoor(0x7048e8,0xf3f0ff,0xb197fc);
 sign(g,'📸 غرفة التصوير',0,4.6,-7.6,'rgba(112,72,232,.92)');
 g.add(mesh(G.box(3.2,2.4,0.15),0xd0bfff,0,1.3,-6.2),mesh(G.box(0.5,0.4,0.4),0x212529,0,0.7,-2.6),mesh(G.cyl(0.08,0.08,0.7,6),0x495057,0,0.35,-2.6),mesh(G.cyl(0.25,0.25,0.3,12),0x212529,0,1.1,-2.6));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x7048e8,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x7048e8,5,0.5,0));
 pbkh={it:{x:0,z:0.2,label:'📸 افتح كشك التصوير',fn:pbkStart}};interacts.push(pbkh.it);
 g.add(portalMesh('ارجع لفقاعات الرماية',5.8,5.8,0xd6336c,'bstroom'),portalMesh('🧠 أسئلة وأجوبة',-5.8,5.8,0x0c8599,'qzcroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('📸 اختار خلفية وشكل والتقط صورة. الصور بتتحفظ على جهازك بس!',3600)
}
function pbkStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CW=H?150:Math.min(W,260),CH=H?150:Math.round(CW*0.85);
 const KEY='alamna_pbk';
 const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}};
 const save=a=>{try{localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}};
 const BG=['سما','غروب','ليل','عشب','وردي'],FC=['#ffa94d','#74c0fc','#8ce99a','#d0a0ff','#e8c39e'];
 const S={bg:0,face:0,hat:0,gl:0,cr:0,ht:0};
 const draw=(x,w,h,t)=>{const k=w/260;x.save();x.scale(k,k);const w0=260,h0=h/k;
  const gr=x.createLinearGradient(0,0,0,h0);const P=[['#a5d8ff','#e7f5ff'],['#ff922b','#ffe066'],['#1b1b3a','#4c3a9c'],['#74c0fc','#8ce99a'],['#ffc9de','#fff0f6']][S.bg];gr.addColorStop(0,P[0]);gr.addColorStop(1,P[1]);x.fillStyle=gr;x.fillRect(0,0,w0,h0);
  if(S.bg===2){x.fillStyle='#fff';for(let i=0;i<14;i++){x.fillRect((i*53)%w0,(i*37)%(h0*0.6),2,2)}x.beginPath();x.arc(210,40,16,0,7);x.fill()}
  if(S.bg===3){x.fillStyle='#37b24d';x.fillRect(0,h0*0.8,w0,h0*0.2)}
  if(S.bg===4){x.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<12;i++){x.beginPath();x.arc((i*61)%w0,(i*47)%h0,6,0,7);x.fill()}}
  const cx=w0/2,cy=h0*0.55;x.fillStyle='#4c6ef5';x.beginPath();x.ellipse(cx,cy+78,52,40,0,0,7);x.fill();
  x.fillStyle=FC[S.face];x.beginPath();x.arc(cx,cy,48,0,7);x.fill();
  x.fillStyle='#212529';x.beginPath();x.arc(cx-16,cy-6,5,0,7);x.arc(cx+16,cy-6,5,0,7);x.fill();x.strokeStyle='#212529';x.lineWidth=3;x.beginPath();x.arc(cx,cy+8,16,0.15,3);x.stroke();
  x.fillStyle='rgba(250,82,82,.35)';x.beginPath();x.arc(cx-30,cy+8,7,0,7);x.arc(cx+30,cy+8,7,0,7);x.fill();
  if(S.gl){x.strokeStyle='#212529';x.lineWidth=3;x.fillStyle='rgba(0,0,0,.55)';x.beginPath();x.arc(cx-16,cy-6,13,0,7);x.fill();x.stroke();x.beginPath();x.arc(cx+16,cy-6,13,0,7);x.fill();x.stroke();x.beginPath();x.moveTo(cx-3,cy-6);x.lineTo(cx+3,cy-6);x.stroke()}
  if(S.hat){x.fillStyle='#e03131';x.fillRect(cx-50,cy-50,100,8);x.fillRect(cx-30,cy-95,60,48)}
  if(S.cr){x.fillStyle='#ffd43b';x.beginPath();x.moveTo(cx-34,cy-44);x.lineTo(cx-34,cy-78);x.lineTo(cx-17,cy-58);x.lineTo(cx,cy-84);x.lineTo(cx+17,cy-58);x.lineTo(cx+34,cy-78);x.lineTo(cx+34,cy-44);x.fill()}
  if(S.ht){x.fillStyle='#fa5252';[[40,60],[220,80],[60,170],[205,175],[30,120]].forEach(([a,b],i)=>{const o=Math.sin(t/400+i)*4;x.beginPath();x.arc(a-5,b+o,6,0,7);x.arc(a+5,b+o,6,0,7);x.fill();x.beginPath();x.moveTo(a-11,b+o+2);x.lineTo(a,b+o+15);x.lineTo(a+11,b+o+2);x.fill()})}
  x.restore()};
 const main=()=>{let timer=0;
  window.pbkq=()=>({S:{...S},n:load().length,total:me.pbkGames||0,coins:me.coins,snap:()=>snap(),set:o=>Object.assign(S,o)});
  let snap=()=>false;
  modal(c=>{
   const chip=(id,t)=>'<button class="btn" id="'+id+'" style="width:auto!important;display:inline-block!important;padding:6px 8px;font-size:13px;margin:2px">'+t+'</button>';
   const btns=chip('pbBg','🎨 الخلفية')+chip('pbFc','🙂 اللون')+chip('pbHa','🎩 قبعة')+chip('pbGl','😎 نظارة')+chip('pbCr','👑 تاج')+chip('pbHt','❤️ قلوب')+chip('pbSn','📸 التقط')+chip('pbGa','🖼️ صوري')+'<button class="btn d" id="pbX" style="width:auto!important;display:inline-block!important;padding:6px 8px;font-size:13px;margin:2px">إغلاق</button>';
   c.innerHTML=(H?'':'<h2 style="margin:4px">📸 كشك التصوير</h2>')+'<div id="pbM" style="text-align:center;font-size:13px;margin:2px"></div><div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px"><canvas id="pbC" style="border-radius:10px"></canvas><div style="text-align:center;max-width:'+(H?'240':'300')+'px">'+btns+'</div></div>';
   const cv=$('pbC');cv.width=CW;cv.height=CH;const x=cv.getContext('2d');
   const open=()=>$('pbC')&&$('modal').style.display!=='none';
   const msg=t=>{if($('pbM'))$('pbM').textContent=t};
   const loop=ts=>{if(!open())return;draw(x,CW,CH,ts);requestAnimationFrame(loop)};
   const tg=(id,k,lab)=>{$(id).onclick=()=>{S[k]=S[k]?0:1;sfx('tick');msg(lab+(S[k]?' شغّال':' مقفول'))}};
   $('pbBg').onclick=()=>{S.bg=(S.bg+1)%5;sfx('tick');msg('الخلفية: '+BG[S.bg])};$('pbFc').onclick=()=>{S.face=(S.face+1)%5;sfx('tick');msg('اللون اتغيّر')};
   tg('pbHa','hat','القبعة');tg('pbGl','gl','النظارة');tg('pbCr','cr','التاج');tg('pbHt','ht','القلوب');
   snap=()=>{const t=document.createElement('canvas');t.width=160;t.height=Math.round(160*CH/CW);const tx=t.getContext('2d');draw(tx,160,t.height,performance.now());const url=t.toDataURL('image/jpeg',0.6);const a=load();a.unshift(url);while(a.length>6)a.pop();if(!save(a)){msg('مفيش مساحة تخزين');sfx('err');return false}
    me.pbkGames=(me.pbkGames||0)+1;me.pbkBest=me.pbkGames;sfx('win');let m='📸 اتحفظت! عندك '+a.length+' صور';const d=today();if(me.pbkD!==d){me.pbkD=d;me.coins++;updCoins();m+=' · +1🪙 أول صورة النهاردة'}saveMe();msg(m);return true};
   $('pbSn').onclick=()=>{snap()};
   $('pbGa').onclick=()=>{const a=load();c.innerHTML='<h2 style="margin:4px">🖼️ صوري ('+a.length+')</h2><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">'+(a.length?a.map((u,i)=>'<div style="text-align:center"><img src="'+u+'" style="width:110px;border-radius:8px;display:block"><button class="btn d pbDel" data-i="'+i+'" style="width:auto!important;display:inline-block!important;padding:4px 8px;font-size:12px;margin-top:2px">احذف</button></div>').join(''):'<div>لسه مفيش صور</div>')+'</div><div class="row"><button class="btn" id="pbBk">رجوع</button></div>';
    c.querySelectorAll('.pbDel').forEach(b=>b.onclick=()=>{const a2=load();a2.splice(+b.dataset.i,1);save(a2);pbkStart();setTimeout(()=>$('pbGa')&&$('pbGa').click(),50)});$('pbBk').onclick=pbkStart};
   $('pbX').onclick=()=>{$('modal').style.display='none'};msg('اختار شكلك والتقط!');requestAnimationFrame(loop)})};
 main()}

let qzch=null;
const QZC=[
 ['🌍 جغرافيا',[['عاصمة مصر؟','القاهرة','الإسكندرية','الجيزة','أسوان'],['أطول نهر في إفريقيا؟','النيل','الكونغو','النيجر','الزامبيزي'],['أكبر محيط في العالم؟','الهادئ','الأطلسي','الهندي','المتجمد'],['عاصمة السعودية؟','الرياض','جدة','مكة','الدمام'],['أكبر قارة في العالم؟','آسيا','إفريقيا','أوروبا','أمريكا الشمالية'],['عاصمة المغرب؟','الرباط','الدار البيضاء','مراكش','فاس'],['فين الأهرامات الكبيرة؟','الجيزة','الأقصر','أسوان','الإسكندرية'],['عدد قارات العالم؟','7','5','6','8']]],
 ['🔬 علوم',[['أقرب كوكب للشمس؟','عطارد','الزهرة','المريخ','الأرض'],['الغاز اللي بنتنفسه عشان نعيش؟','الأكسجين','النيتروجين','الهيليوم','الهيدروجين'],['عدد أرجل العنكبوت؟','8','6','4','10'],['أكبر كوكب في المجموعة الشمسية؟','المشتري','زحل','نبتون','الأرض'],['درجة غليان الماء بالمئوية؟','100','90','120','80'],['إيه اللي بيدور حوالين الأرض؟','القمر','الشمس','المريخ','زحل'],['عدد ألوان قوس قزح؟','7','6','5','8'],['أسرع حيوان بري؟','الفهد','الأسد','الحصان','النمر']]],
 ['🔢 حساب',[['7 × 8 = ؟','56','54','48','64'],['15 + 27 = ؟','42','32','41','52'],['100 ÷ 4 = ؟','25','20','40','50'],['نص 90 = ؟','45','40','35','50'],['كام يوم في الأسبوع؟','7','6','8','5'],['كام شهر في السنة؟','12','10','11','13'],['9 × 9 = ؟','81','72','99','91'],['144 ÷ 12 = ؟','12','14','10','16']]]
];
function buildQzc(){
 const g=indoor(0x0c8599,0xe3fafc,0x66d9e8);
 sign(g,'🧠 غرفة الأسئلة',0,4.6,-7.6,'rgba(12,138,153,.92)');
 [[-1.6,0x15aabf],[0,0x22b8cf],[1.6,0x3bc9db]].forEach(([x,c],i)=>g.add(mesh(G.box(1.2,1.2+i*0.4,1.2),c,x,0.6+i*0.2,-4.6)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x0c8599,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x0c8599,5,0.5,0));
 qzch={it:{x:0,z:0.2,label:'🧠 العب أسئلة وأجوبة',fn:qzcStart}};interacts.push(qzch.it);
 g.add(portalMesh('ارجع لكشك التصوير',5.8,5.8,0x7048e8,'pbkroom'),portalMesh('🥪 مطبخ السندوتشات',-5.8,5.8,0xe8590c,'ckrroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧠 اختار موضوع وجاوب على 5 أسئلة. كل إجابتين صح = 1🪙',3400)
}
function qzcStart(){
 modal(c=>{
  const shuf=a=>a.slice().sort(()=>Math.random()-0.5);
  let cat=-1,qs=[],qi=0,ok=0,cur=null,paid=0,locked=false;
  window.qzcq=()=>({cat,qi,ok,ans:cur?cur.ai:-1,paid,pick:i=>pick(i),choose:k=>choose(k)});
  const home=()=>{c.innerHTML='<h2 style="margin:4px">🧠 أسئلة وأجوبة</h2><div style="text-align:center;margin:4px">اختار الموضوع:</div><div class="row" style="flex-direction:column;gap:6px">'+QZC.map((q,i)=>'<button class="btn" id="qzK'+i+'">'+q[0]+'</button>').join('')+'<button class="btn d" id="qzX">إغلاق</button></div>';
   QZC.forEach((q,i)=>$('qzK'+i).onclick=()=>choose(i));$('qzX').onclick=()=>{$('modal').style.display='none'}};
  const choose=k=>{cat=k;qs=shuf(QZC[k][1]).slice(0,5);qi=0;ok=0;ask()};
  const ask=()=>{const q=qs[qi],opts=shuf(q.slice(1).map((t,i)=>({t,r:i===0})));cur={ai:opts.findIndex(o=>o.r),opts};locked=false;
   c.innerHTML='<div style="text-align:center;font-size:13px">'+QZC[cat][0]+' · سؤال '+(qi+1)+'/5 · ✅ '+ok+'</div><h3 style="text-align:center;margin:8px 4px">'+q[0]+'</h3><div class="row" style="flex-direction:column;gap:6px">'+opts.map((o,i)=>'<button class="btn" id="qzA'+i+'">'+o.t+'</button>').join('')+'</div>';
   opts.forEach((o,i)=>$('qzA'+i).onclick=()=>pick(i))};
  const pick=i=>{if(locked||!cur)return;locked=true;const good=i===cur.ai;if(good){ok++;sfx('star')}else sfx('err');
   cur.opts.forEach((o,j)=>{const b=$('qzA'+j);if(b){b.style.background=o.r?'#2f9e44':(j===i?'#e03131':'');b.disabled=true}});
   setTimeout(()=>{if(!$('modal')||$('modal').style.display==='none')return;qi++;if(qi<5)ask();else fin()},700)};
  const fin=()=>{const d=today();if(!me.qzcD||me.qzcD.d!==d)me.qzcD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(ok/2),12-me.qzcD.c));me.qzcD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.qzcGames=(me.qzcGames||0)+1;const nb=ok>(me.qzcBest||0);if(nb)me.qzcBest=ok;saveMe();cur=null;sfx(ok>=3?'win':'err');
   c.innerHTML='<h2>🧠 خلصت الأسئلة!</h2><div style="text-align:center;font-size:16px">جاوبت <b>'+ok+'</b> من 5 صح<br>'+(ok===5?'🌟 ممتاز!':ok>=3?'👏 كويس':'💪 حاول تاني')+'<br>'+(pay?'+'+pay+'🪙':'(كل إجابتين صح = 1🪙)')+'</div><div class="row"><button class="btn" id="qzR2">🔁 موضوع تاني</button><button class="btn d" id="qzX2">إغلاق</button></div>';
   $('qzR2').onclick=qzcStart;$('qzX2').onclick=()=>{$('modal').style.display='none'}};
  home()})}

let ckrh=null;
function buildCkr(){
 const g=indoor(0xe8590c,0xfff4e6,0xffc078);
 sign(g,'🥪 غرفة مطبخ السندوتشات',0,4.6,-7.6,'rgba(232,89,12,.92)');
 g.add(mesh(G.box(3.4,0.9,1.2),0xadb5bd,0,0.45,-4.6),mesh(G.cyl(0.5,0.5,0.15,14),0xf1f3f5,-0.9,1.0,-4.6),mesh(G.cyl(0.5,0.5,0.15,14),0xf1f3f5,0.9,1.0,-4.6));
 [[0xe8a85c,0.2],[0xc92a2a,0.3],[0x51cf66,0.4],[0xffd43b,0.5]].forEach(([c,h],i)=>g.add(mesh(G.cyl(0.42,0.42,0.1,12),c,-0.9,1.1+i*0.1,-4.6)));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0xe8590c,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0xe8590c,5,0.5,0));
 ckrh={it:{x:0,z:0.2,label:'🥪 افتح المطبخ',fn:ckrStart}};interacts.push(ckrh.it);
 g.add(portalMesh('ارجع للأسئلة',5.8,5.8,0x0c8599,'qzcroom'),portalMesh('🌦️ محطة الطقس',-5.8,5.8,0x1971c2,'wthroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🥪 زبون عايز سندوتش: ركّب المكونات بنفس الترتيب قبل ما صبره يخلص!',3600)
}
function ckrStart(){
 const H=innerHeight<420,ING=[['🍞','عيش','#e8a85c'],['🥩','لحمة','#c92a2a'],['🥬','خس','#40c057'],['🧀','جبنة','#fcc419']];
 let order=[],prog=0,served=0,missed=0,tl=45,pat=0,pmax=9,over=false,last=0,paid=0,pen=0;
 const mk=()=>{const n=2+Math.floor(Math.random()*3);order=Array.from({length:n},()=>Math.floor(Math.random()*4));prog=0;pmax=4+n*1.6;pat=pmax};
 mk();
 let tap=()=>{},step=()=>{};
 window.ckrq=()=>({order:order.slice(),prog,served,missed,over,time:tl,tap:i=>tap(i),step:d=>step(d),paid});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🥪 مطبخ السندوتشات</h2>')+'<div id="ckH" style="text-align:center;font-size:14px;margin:2px"></div><div id="ckO" style="display:flex;gap:4px;justify-content:center;margin:6px 0;min-height:40px"></div><div style="height:8px;background:rgba(255,255,255,.2);border-radius:4px;margin:4px 8px"><div id="ckP" style="height:100%;background:#fab005;border-radius:4px"></div></div><div class="row" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">'+ING.map((g,i)=>'<button class="btn" id="ckI'+i+'" style="width:auto!important;display:inline-block!important;min-width:70px;padding:10px 6px">'+g[0]+' '+g[1]+'</button>').join('')+'<button class="btn d" id="ckX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const open=()=>$('ckO')&&$('modal').style.display!=='none';
  const dw=()=>{if(!$('ckO'))return;$('ckH').textContent='⏱ '+Math.ceil(tl)+' ث · ✅ '+served+' · ❌ '+missed;
   $('ckO').innerHTML=order.map((k,i)=>'<div style="width:'+(H?34:44)+'px;height:'+(H?34:44)+'px;border-radius:50%;background:'+ING[k][2]+';display:flex;align-items:center;justify-content:center;font-size:'+(H?16:22)+'px;opacity:'+(i<prog?0.3:1)+';border:'+(i===prog?'3px solid #fff':'3px solid transparent')+'">'+(i<prog?'✓':ING[k][0])+'</div>').join('');
   $('ckP').style.width=Math.max(0,pat/pmax*100)+'%';$('ckP').style.background=pat/pmax<0.3?'#e03131':'#fab005'};
  const fin=()=>{over=true;sfx('win');const d=today();if(!me.ckrD||me.ckrD.d!==d)me.ckrD={d,c:0};let pay=Math.max(0,Math.min(5,Math.floor(served/3),12-me.ckrD.c));me.ckrD.c+=pay;me.coins+=pay;paid=pay;updCoins();me.ckrGames=(me.ckrGames||0)+1;const nb=served>(me.ckrBest||0);if(nb)me.ckrBest=served;saveMe();
   c.innerHTML='<h2>🥪 المطبخ قفل!</h2><div style="text-align:center;font-size:16px">خدمت <b>'+served+'</b> زبون · فاتك '+missed+'<br>'+(nb&&served?'🏆 رقم قياسي!':'أحسن نتيجة: '+(me.ckrBest||0))+'<br>'+(pay?'+'+pay+'🪙':'(كل 3 زباين = 1🪙)')+'</div><div class="row"><button class="btn" id="ckR2">🔁 تاني</button><button class="btn d" id="ckX2">إغلاق</button></div>';
   $('ckR2').onclick=ckrStart;$('ckX2').onclick=()=>{$('modal').style.display='none'}};
  tap=i=>{if(over)return;if(order[prog]===i){prog++;sfx('place');if(prog>=order.length){served++;sfx('star');mk()}}else{prog=0;pat=Math.max(0,pat-1.5);sfx('err')}dw()};
  step=dt=>{if(over)return;dt=Math.min(dt,0.05);tl-=dt;pat-=dt;if(pat<=0){missed++;sfx('err');mk()}if(tl<=0){tl=0;dw();fin();return}dw()};
  const loop=ts=>{if(!open())return;if(!over){const dt=last?(ts-last)/1000:0.016;last=ts;step(dt);requestAnimationFrame(loop)}};
  ING.forEach((g,i)=>$('ckI'+i).onpointerdown=e=>{e.preventDefault();tap(i)});
  $('ckX').onclick=()=>{$('modal').style.display='none'};dw();requestAnimationFrame(loop)})}

let wthh=null;let whlh=null;let arwh=null;let rnrh=null;let trhh=null;let rhlh=null;let ptyh=null;let gdnh=null;let mdlh=null;let rtth=null;
function buildWth(){
 const g=indoor(0x1971c2,0xe7f5ff,0x74c0fc);
 sign(g,'🌦️ محطة الطقس',0,4.6,-7.6,'rgba(25,113,194,.92)');
 g.add(mesh(G.cyl(0.08,0.08,2.4,8),0xadb5bd,0,1.2,-4.6),mesh(G.sph(0.45,10),0xffd43b,0,2.7,-4.6),mesh(G.box(1.4,0.5,0.1),0xf1f3f5,0,1.6,-4.5),mesh(G.cyl(0.05,0.05,1.2,6),0xadb5bd,0.5,2.2,-4.6),mesh(G.box(0.7,0.12,0.12),0xe03131,0.85,2.8,-4.6));
 g.add(mesh(G.cyl(0.4,0.4,1,10),0x1971c2,-5,0.5,0),mesh(G.cyl(0.4,0.4,1,10),0x1971c2,5,0.5,0));
 wthh={it:{x:0,z:0.2,label:'🌦️ شوف الطقس دلوقتي',fn:wthStart}};interacts.push(wthh.it);
 g.add(portalMesh('ارجع للمطبخ',5.8,5.8,0xe8590c,'ckrroom'),portalMesh('عجلة الحظ',-5.8,5.8,0xc2255c,'whlroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🌦️ طقس حقيقي دلوقتي لمدينتك. أول تشييك في اليوم = 1🪙',3400)
}
function wthStart(){
 const H=innerHeight<420;
 const CITY=[['الإسكندرية',31.2,29.92],['القاهرة',30.04,31.24],['أسوان',24.09,32.9],['شرم الشيخ',27.91,34.33],['الأقصر',25.69,32.64]];
 const WN=c=>c===0?'صافي':c<=2?'غيوم متفرقة':c===3?'غائم':c<=48?'ضباب':c<=57?'رذاذ':c<=67?'مطر':c<=77?'ثلج':c<=82?'زخات مطر':'عاصفة رعدية';
 const KIND=c=>c===0?0:c<=2?1:c===3?2:c<=48?5:c<=77?3:c<=82?3:4;
 let ci=+(me.wthCity||0),data=null,err='',loading=false;
 window.wthq=()=>({ci,data,err,loading,city:CITY[ci][0],coins:me.coins,load:i=>load(i)});
 let load=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🌦️ محطة الطقس</h2>')+'<div id="wtC0" style="text-align:center;font-size:15px;margin:2px"></div><div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px"><canvas id="wtC" width="120" height="'+(H?90:110)+'" style="border-radius:10px"></canvas><div id="wtT" style="text-align:center;font-size:14px;line-height:1.7;min-width:150px"></div></div><div id="wtD" style="display:flex;justify-content:center;gap:6px;margin:6px 0;font-size:12px"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="wtN" style="width:auto!important;display:inline-block!important">📍 مدينة تانية</button><button class="btn d" id="wtX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const x=$('wtC').getContext('2d');
  const icon=(k,t)=>{const w=120,h=$('wtC').height;x.clearRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,k===4?'#495057':k===0?'#74c0fc':'#a5d8ff');g.addColorStop(1,'#e7f5ff');x.fillStyle=g;x.fillRect(0,0,w,h);const cx=w/2,cy=h/2-4;
   const cloud=(a,b,s,col)=>{x.fillStyle=col||'#fff';x.beginPath();x.arc(a-14*s,b,12*s,0,7);x.arc(a,b-8*s,16*s,0,7);x.arc(a+16*s,b,12*s,0,7);x.fillRect(a-14*s,b,30*s,12*s);x.fill()};
   if(k===0||k===1){x.fillStyle='#ffd43b';x.beginPath();x.arc(cx+(k?14:0),cy,22,0,7);x.fill();x.strokeStyle='#fab005';x.lineWidth=3;for(let i=0;i<8;i++){const an=i*Math.PI/4+t/2000;x.beginPath();x.moveTo(cx+(k?14:0)+Math.cos(an)*28,cy+Math.sin(an)*28);x.lineTo(cx+(k?14:0)+Math.cos(an)*36,cy+Math.sin(an)*36);x.stroke()}}
   if(k===1)cloud(cx-8,cy+14,1);if(k===2)cloud(cx,cy+4,1.4,'#ced4da');
   if(k===3){cloud(cx,cy-6,1.2,'#adb5bd');x.strokeStyle='#339af0';x.lineWidth=3;for(let i=0;i<5;i++){const o=(t/8+i*18)%30;x.beginPath();x.moveTo(cx-30+i*15,cy+14+o);x.lineTo(cx-34+i*15,cy+24+o);x.stroke()}}
   if(k===4){cloud(cx,cy-6,1.2,'#868e96');x.fillStyle='#ffd43b';x.beginPath();x.moveTo(cx+4,cy+6);x.lineTo(cx-8,cy+26);x.lineTo(cx,cy+24);x.lineTo(cx-6,cy+42);x.lineTo(cx+12,cy+18);x.lineTo(cx+4,cy+18);x.fill()}
   if(k===5){x.fillStyle='rgba(200,200,200,.8)';for(let i=0;i<4;i++)x.fillRect(cx-40+(i%2)*10,cy-14+i*14,80-(i%2)*10,7)}};
  const open=()=>$('wtC')&&$('modal').style.display!=='none';
  const show=()=>{if(!$('wtC0'))return;$('wtC0').textContent='📍 '+CITY[ci][0];
   if(loading){$('wtT').textContent='بحمّل الطقس...';$('wtD').innerHTML='';return}
   if(err){$('wtT').textContent=err;$('wtD').innerHTML='';return}
   const cu=data.current;$('wtT').innerHTML='<b style="font-size:22px">'+Math.round(cu.temperature_2m)+'°م</b><br>'+WN(cu.weather_code)+'<br>💨 '+Math.round(cu.wind_speed_10m)+' كم/س · 💧 '+Math.round(cu.relative_humidity_2m)+'%';
   const dl=data.daily,days=['النهاردة','بكرة','بعد بكرة'];$('wtD').innerHTML=days.map((d,i)=>'<div style="background:rgba(255,255,255,.12);border-radius:8px;padding:4px 8px;text-align:center"><b>'+d+'</b><br>'+Math.round(dl.temperature_2m_max[i])+'° / '+Math.round(dl.temperature_2m_min[i])+'°<br>'+WN(dl.weather_code[i])+'</div>').join('')};
  load=async i=>{ci=i;me.wthCity=i;loading=true;err='';data=null;show();
   try{const ct=new AbortController();const tm=setTimeout(()=>ct.abort(),9000);const r=await fetch('https://api.open-meteo.com/v1/forecast?latitude='+CITY[i][1]+'&longitude='+CITY[i][2]+'&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3',{signal:ct.signal});clearTimeout(tm);if(!r.ok)throw 0;data=await r.json();if(!data.current||!data.daily)throw 0;
    me.wthGames=(me.wthGames||0)+1;me.wthBest=me.wthGames;const d=today();if(me.wthD!==d){me.wthD=d;me.coins++;updCoins();toast('🌦️ +1🪙 أول تشييك للطقس النهاردة',2400)}saveMe()}
   catch(e){err='مفيش نت دلوقتي، جرّب تاني بعدين'}
   loading=false;show()};
  const loop=ts=>{if(!open())return;icon(data&&data.current?KIND(data.current.weather_code):1,ts);requestAnimationFrame(loop)};
  $('wtN').onclick=()=>{load((ci+1)%CITY.length)};$('wtX').onclick=()=>{$('modal').style.display='none'};
  load(ci);requestAnimationFrame(loop)})}

function buildWhl(){
 const g=indoor(0xc2255c,0xfff0f6,0xffc9de);
 sign(g,'🎡 عجلة الحظ',0,4.6,-7.6,'rgba(194,37,92,.92)');
 g.add(mesh(G.cyl(1.6,1.6,0.3,16),0xf06595,0,2.4,-5),mesh(G.cyl(1.2,1.2,0.35,16),0xffd43b,0,2.4,-5),mesh(G.cyl(0.12,0.12,2.2,8),0x868e96,0,1.1,-5.2),mesh(G.box(0.3,0.6,0.2),0xe03131,0,4.2,-4.8));
 g.add(mesh(G.box(0.5,1,0.5),0xc2255c,-5,0.5,0),mesh(G.box(0.5,1,0.5),0xc2255c,5,0.5,0));
 whlh={it:{x:0,z:0.2,label:'🎡 لف العجلة',fn:whlStart}};interacts.push(whlh.it);
 g.add(portalMesh('ارجع للطقس',5.8,5.8,0x1971c2,'wthroom'),portalMesh('رماية الريح',-5.8,5.8,0x2b8a3e,'arwroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🎡 لفّة مجانية كل يوم: لحد 5🪙',3200)
}
function whlStart(){
 const H=innerHeight<420;
 const PR=[1,0,2,1,0,3,1,5],W8=[22,26,14,22,0,6,8,2],COL=['#ff8787','#74c0fc','#ffd43b','#8ce99a','#b197fc','#ff922b','#63e6be','#f06595'];
 const seg=Math.PI*2/8;
 let rot=0,spinning=false,res=null,daily=me.whlD!==today(),t0=0,from=0,to=0,tgt=0;
 window.whlq=()=>({rot,spinning,res,daily,coins:me.coins,spin:()=>sp()});
 let sp=()=>{};
 modal(c=>{
  const S=H?170:230;
  c.innerHTML=(H?'':'<h2 style="margin:4px">🎡 عجلة الحظ</h2>')+'<div id="whT" style="text-align:center;font-size:14px;margin:2px"></div><div style="text-align:center"><canvas id="whC" width="'+S+'" height="'+(S+16)+'" style="max-width:100%"></canvas></div><div class="row" style="display:flex;gap:6px;justify-content:center;margin-top:4px"><button class="btn" id="whB" style="width:auto!important;display:inline-block!important">🎡 لف</button><button class="btn d" id="whX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('whC'),x=cv.getContext('2d'),cx=S/2,cy=S/2+14,R=S/2-6;
  const draw=()=>{x.clearRect(0,0,S,S+16);
   for(let i=0;i<8;i++){const a=rot+i*seg-seg/2-Math.PI/2;x.fillStyle=COL[i];x.beginPath();x.moveTo(cx,cy);x.arc(cx,cy,R,a,a+seg);x.fill();x.strokeStyle='#fff';x.lineWidth=2;x.stroke();
    const m=a+seg/2;x.save();x.translate(cx+Math.cos(m)*R*0.68,cy+Math.sin(m)*R*0.68);x.rotate(m+Math.PI/2);x.fillStyle='#212529';x.font='bold '+(H?16:22)+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(PR[i]?String(PR[i]):'×',0,0);x.restore()}
   x.fillStyle='#fff';x.beginPath();x.arc(cx,cy,12,0,7);x.fill();
   x.fillStyle='#e03131';x.beginPath();x.moveTo(cx-9,cy-R-12);x.lineTo(cx+9,cy-R-12);x.lineTo(cx,cy-R+8);x.fill()};
  const txt=m=>{if($('whT'))$('whT').textContent=m};
  const ready=()=>txt(daily?'🎁 لفّتك المجانية النهاردة جاهزة':'لفّة للتسلية بس (الجايزة خلصت النهاردة)');
  const open=()=>$('whC')&&$('modal').style.display!=='none';
  const pick=()=>{if(!daily)return 1+Math.floor(Math.random()*7)*(Math.random()<.5?1:1)%8;let s=0;for(const w of W8)s+=w;let r=Math.random()*s;for(let i=0;i<8;i++){r-=W8[i];if(r<0)return i}return 0};
  const fin=()=>{spinning=false;rot=to%(Math.PI*2);res=PR[tgt];$('whB').disabled=false;
   if(daily){me.whlD=today();daily=false;me.whlGames=(me.whlGames||0)+1;me.whlBest=Math.max(me.whlBest||0,res);if(res){me.coins+=res;updCoins();sfx('win')}else sfx('err');saveMe();txt(res?'🎉 كسبت '+res+'🪙':'حظ أوفر بكرة 😅')}
   else{sfx('tick');txt('لفّة للتسلية: '+(res?res:'×'))}};
  sp=()=>{if(spinning)return;spinning=true;res=null;$('whB').disabled=true;txt('بتلف...');tgt=pick();from=rot;to=Math.PI*2*(5+Math.floor(Math.random()*2))-tgt*seg+(Math.random()-.5)*seg*.6;t0=performance.now()};
  const loop=ts=>{if(!open())return;if(spinning){const k=Math.min(1,(ts-t0)/4200);const e=1-Math.pow(1-k,3);rot=from+(to-from)*e;if(k>=1){rot=to;fin()}}draw();requestAnimationFrame(loop)};
  $('whB').onclick=sp;$('whX').onclick=()=>{$('modal').style.display='none'};
  ready();requestAnimationFrame(loop)})}

function buildArw(){
 const g=indoor(0x2b8a3e,0xebfbee,0x8ce99a);
 sign(g,'🏹 رماية الريح',0,4.6,-7.6,'rgba(43,138,62,.92)');
 g.add(mesh(G.cyl(1.4,1.4,0.2,16),0xf8f9fa,0,2.2,-6),mesh(G.cyl(1.0,1.0,0.22,16),0xe03131,0,2.2,-6),mesh(G.cyl(0.6,0.6,0.24,16),0xf8f9fa,0,2.2,-6),mesh(G.cyl(0.25,0.25,0.26,12),0xffd43b,0,2.2,-6),mesh(G.box(0.2,2.2,0.2),0x795548,0,1.1,-6.2));
 g.add(mesh(G.cyl(0.05,0.05,3,6),0xadb5bd,-4,1.5,-3),mesh(G.box(1.2,0.6,0.05),0xff922b,-3.4,2.8,-3));
 arwh={it:{x:0,z:0.2,label:'🏹 ارمي سهم',fn:arwStart}};interacts.push(arwh.it);
 g.add(portalMesh('ارجع للعجلة',5.8,5.8,0xc2255c,'whlroom'),portalMesh('العدّاء',-5.8,5.8,0x1864ab,'rnrroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏹 الريح بتزق السهم: صوّب عكسها',3200)
}
function arwStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,360),CH=H?150:230,RW=Math.min(W,CH)/2/11;
 let shot=0,score=0,wind=0,marks=[],done=false,last='',t=0,ts0=performance.now();
 const newWind=()=>{wind=Math.round((Math.random()*6-3)*10)/10;if(Math.abs(wind)<.5)wind=wind<0?-1:1};
 newWind();
 const pos=ts=>{const s=(ts-ts0)/1000;return{x:Math.sin(s*1.6)*RW*5.5+Math.sin(s*3.1)*RW*1.5,y:Math.sin(s*2.1+1)*RW*5+Math.cos(s*2.9)*RW*1.2}};
 const ptsOf=(x,y)=>{const d=Math.hypot(x,y);return d>=RW*10?0:10-Math.floor(d/RW)};
 let fire=()=>{};
 window.arwq=()=>({shot,score,wind,done,marks:marks.length,coins:me.coins,fire:()=>fire(),aim:()=>pos(performance.now()),RW});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏹 رماية الريح</h2>')+'<div id="arT" style="text-align:center;font-size:14px;margin:2px"></div><div style="text-align:center"><canvas id="arC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%"></canvas></div><div class="row" style="display:flex;gap:6px;justify-content:center;margin-top:4px"><button class="btn" id="arB" style="width:auto!important;display:inline-block!important">🏹 اضرب</button><button class="btn d" id="arX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('arC'),x=cv.getContext('2d'),cx=W/2,cy=CH/2;
  const info=()=>{if($('arT'))$('arT').textContent=done?'🏁 النتيجة '+score+'/50'+(last?' · '+last:''):'سهم '+(shot+1)+'/5 · النقاط '+score+' · '+(wind>0?'الريح ← ':'الريح → ')+Math.abs(wind)};
  const draw=tt=>{x.fillStyle='#d3f9d8';x.fillRect(0,0,W,CH);
   const cols=['#f8f9fa','#212529','#339af0','#e03131','#ffd43b'];
   for(let i=10;i>=1;i--){x.fillStyle=i>8?cols[4]:i>6?cols[3]:i>4?cols[2]:i>2?cols[1]:cols[0];x.beginPath();x.arc(cx,cy,RW*i,0,7);x.fill();x.strokeStyle='#868e96';x.lineWidth=1;x.stroke()}
   x.fillStyle='#212529';x.strokeStyle='#212529';
   marks.forEach(m=>{x.fillStyle='#5f3dc4';x.beginPath();x.arc(cx+m.x,cy+m.y,3.5,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=1;x.stroke()});
   if(!done){const p=pos(tt);x.strokeStyle='rgba(0,0,0,.75)';x.lineWidth=2;x.beginPath();x.arc(cx+p.x,cy+p.y,9,0,7);x.moveTo(cx+p.x-14,cy+p.y);x.lineTo(cx+p.x+14,cy+p.y);x.moveTo(cx+p.x,cy+p.y-14);x.lineTo(cx+p.x,cy+p.y+14);x.stroke()}
   const wl=Math.abs(wind)*12;x.strokeStyle='#e8590c';x.fillStyle='#e8590c';x.lineWidth=4;const dir=wind>0?-1:1;const wx=W-50,wy=18;x.beginPath();x.moveTo(wx-dir*wl,wy);x.lineTo(wx+dir*wl,wy);x.stroke();x.beginPath();x.moveTo(wx+dir*(wl+8),wy);x.lineTo(wx+dir*wl,wy-6);x.lineTo(wx+dir*wl,wy+6);x.fill()};
  const open=()=>$('arC')&&$('modal').style.display!=='none';
  fire=()=>{if(!open())return;if(done){shot=0;score=0;marks=[];done=false;last='';newWind();$('arB').textContent='🏹 اضرب';info();return}
   const p=pos(performance.now());const hx=p.x+wind*RW*1.1,hy=p.y;const pt=ptsOf(hx,hy);marks.push({x:hx,y:hy});score+=pt;shot++;sfx(pt>=9?'star':pt?'place':'err');
   if(shot>=5){done=true;me.arwGames=(me.arwGames||0)+1;me.arwBest=Math.max(me.arwBest||0,score);const d=today();if(me.arwDD!==d){me.arwDD=d;me.arwDC=0}
    let c=score>=46?3:score>=40?2:score>=32?1:0;c=Math.min(c,Math.max(0,12-(me.arwDC||0)));if(c){me.coins+=c;me.arwDC=(me.arwDC||0)+c;updCoins();last='+'+c+'🪙'}
    saveMe();$('arB').textContent='🔁 جولة تانية'}else{last='';newWind()}
   info()};
  $('arB').onclick=fire;cv.onclick=fire;$('arX').onclick=()=>{$('modal').style.display='none'};
  info();const loop=ts=>{if(!open())return;draw(ts);requestAnimationFrame(loop)};requestAnimationFrame(loop)})}

function buildRnr(){
 const g=indoor(0x1864ab,0xe7f5ff,0x9ecbff);
 sign(g,'🏃 العدّاء',0,4.6,-7.6,'rgba(24,100,171,.92)');
 for(let i=0;i<3;i++)g.add(mesh(G.box(1.2,0.06,12),i%2?0x495057:0x343a40,-1.3+i*1.3,0.04,-1));
 g.add(mesh(G.box(0.2,0.4,0.2),0xffd43b,-1.3,0.3,-3),mesh(G.box(0.8,0.5,0.4),0xe03131,0,0.3,-4.5),mesh(G.box(0.2,0.4,0.2),0xffd43b,1.3,0.3,-5.5));
 rnrh={it:{x:0,z:0.2,label:'🏃 اجري',fn:rnrStart}};interacts.push(rnrh.it);
 g.add(portalMesh('ارجع للرماية',5.8,5.8,0x2b8a3e,'arwroom'),portalMesh('صيد الكنز',-5.8,5.8,0xa9801f,'trhroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏃 اجري وفادي العوائق واجمع النجوم',3000)
}
function rnrStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,300),CH=H?150:270,LW=W/3,PY=.84;
 let lane=1,items=[],score=0,over=false,gap=0,tm=performance.now(),stars=0,last='';
 const spd=()=>.42+Math.min(.5,score/2600);
 let mv=()=>{};
 window.rnrq=()=>({lane,items:items.map(i=>({l:i.l,y:i.y,s:i.s})),score:Math.floor(score),over,stars,coins:me.coins,PY,spd:spd(),mv:d=>mv(d)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🏃 العدّاء</h2>')+'<div id="rnT" style="text-align:center;font-size:14px;margin:2px"></div><div style="text-align:center"><canvas id="rnC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div class="row" style="display:flex;gap:6px;justify-content:center;margin-top:4px;direction:ltr"><button class="btn" id="rnL" style="width:auto!important;display:inline-block!important">◀</button><button class="btn" id="rnR" style="width:auto!important;display:inline-block!important">▶</button><button class="btn d" id="rnX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('rnC'),x=cv.getContext('2d');
  const info=()=>{if($('rnT'))$('rnT').textContent=over?'💥 خلصت: '+Math.floor(score)+' متر · ⭐'+stars+(last?' · '+last:'')+' (اضغط للعب تاني)':'المسافة '+Math.floor(score)+' · ⭐'+stars};
  const reset=()=>{lane=1;items=[];score=0;over=false;gap=0;stars=0;last='';tm=performance.now()};
  mv=d=>{if(over){reset();return}lane=Math.max(0,Math.min(2,lane+d));sfx('tick')};
  const end=()=>{over=true;sfx('err');me.rnrGames=(me.rnrGames||0)+1;me.rnrBest=Math.max(me.rnrBest||0,Math.floor(score));const d=today();if(me.rnrDD!==d){me.rnrDD=d;me.rnrDC=0}
   let c=score>=1000?3:score>=600?2:score>=300?1:0;c=Math.min(c,Math.max(0,12-(me.rnrDC||0)));if(c){me.coins+=c;me.rnrDC=(me.rnrDC||0)+c;updCoins();last='+'+c+'🪙'}saveMe()};
  const open=()=>$('rnC')&&$('modal').style.display!=='none';
  const step=dt=>{const v=spd();score+=dt*v*110;gap+=dt*v;
   if(gap>.34){gap=0;const r=Math.random();const free=Math.floor(Math.random()*3);if(r<.22)items.push({l:free,y:-.05,s:1});else{for(let l=0;l<3;l++)if(l!==free&&(Math.random()<.7||l===(free+1)%3))items.push({l,y:-.05,s:0})}}
   items.forEach(i=>i.y+=dt*v);
   for(const i of items){if(i.l===lane&&Math.abs(i.y-PY)<.07&&!i.d){if(i.s){i.d=1;stars++;score+=25;sfx('star')}else{end();return}}}
   items=items.filter(i=>i.y<1.1&&!i.d)};
  const draw=()=>{x.fillStyle='#343a40';x.fillRect(0,0,W,CH);x.strokeStyle='#fff';x.lineWidth=2;x.setLineDash([10,10]);x.lineDashOffset=-(score*3)%20;for(let i=1;i<3;i++){x.beginPath();x.moveTo(i*LW,0);x.lineTo(i*LW,CH);x.stroke()}x.setLineDash([]);
   items.forEach(i=>{const cx=i.l*LW+LW/2,cy=i.y*CH;if(i.s){x.fillStyle='#ffd43b';x.beginPath();for(let k=0;k<10;k++){const r=k%2?7:15,a=k*Math.PI/5-Math.PI/2;x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}x.fill()}else{x.fillStyle='#e03131';x.fillRect(cx-LW*.36,cy-12,LW*.72,24);x.fillStyle='#fff';x.fillRect(cx-LW*.36,cy-3,LW*.72,6)}});
   const px=lane*LW+LW/2,py=PY*CH;x.fillStyle=over?'#868e96':'#339af0';x.beginPath();x.arc(px,py,14,0,7);x.fill();x.fillStyle='#ffe8cc';x.beginPath();x.arc(px,py-16,9,0,7);x.fill()};
  const loop=ts=>{if(!open())return;const dt=Math.min(.05,(ts-tm)/1000);tm=ts;if(!over)step(dt);draw();info();requestAnimationFrame(loop)};
  $('rnL').onclick=()=>mv(-1);$('rnR').onclick=()=>mv(1);cv.onclick=e=>{const r=cv.getBoundingClientRect();mv(e.clientX-r.left<r.width/2?-1:1)};$('rnX').onclick=()=>{$('modal').style.display='none'};
  info();requestAnimationFrame(loop)})}

function buildTrh(){
 const g=indoor(0xa9801f,0xfff9db,0xffe8a3);
 sign(g,'💎 صيد الكنز',0,4.6,-7.6,'rgba(169,128,31,.92)');
 g.add(mesh(G.box(1.6,0.9,1),0x8d5524,0,0.45,-5),mesh(G.box(1.7,0.25,1.1),0xffd43b,0,1,-5),mesh(G.sph(0.3,8),0x22b8cf,0.4,1.35,-5),mesh(G.sph(0.25,8),0xf06595,-0.4,1.3,-5));
 g.add(mesh(G.cyl(1.2,1.4,0.2,12),0xe6b45a,-4,0.1,-2),mesh(G.cyl(1.2,1.4,0.2,12),0xe6b45a,4,0.1,-2));
 trhh={it:{x:0,z:0.2,label:'💎 دوّر على الكنز',fn:trhStart}};interacts.push(trhh.it);
 g.add(portalMesh('ارجع للعدّاء',5.8,5.8,0x1864ab,'rnrroom'),portalMesh('إيقاع الحارات',-5.8,5.8,0x7048e8,'rhlroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('💎 4 كنوز مخبية: الأرقام بتقولك كام كنز جنبك',3200)
}
function trhStart(){
 const H=innerHeight<420,CW=6,CHh=5,N=4,MAXD=10,CS=H?30:46;
 let tr,dug,found,left,done,last='';
 const init=()=>{tr=new Set();while(tr.size<N)tr.add(Math.floor(Math.random()*CW*CHh));dug=new Set();found=0;left=MAXD;done=false;last=''};
 init();
 const near=i=>{let n=0;const r=Math.floor(i/CW),c=i%CW;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){if(!a&&!b)continue;const rr=r+a,cc=c+b;if(rr>=0&&rr<CHh&&cc>=0&&cc<CW&&tr.has(rr*CW+cc))n++}return n};
 let dig=()=>{};
 window.trhq=()=>({tr:[...tr],dug:[...dug],found,left,done,coins:me.coins,near,dig:i=>dig(i)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">💎 صيد الكنز</h2>')+'<div id="trT" style="text-align:center;font-size:14px;margin:2px"></div><div id="trG" style="display:grid;grid-template-columns:repeat('+CW+','+CS+'px);gap:3px;justify-content:center;direction:ltr"></div><div class="row" style="display:flex;gap:6px;justify-content:center;margin-top:6px"><button class="btn" id="trN" style="width:auto!important;display:inline-block!important">🔁 جديدة</button><button class="btn d" id="trX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const info=()=>{$('trT').textContent=done?(found===N?'🎉 لقيت كل الكنوز! ':'😅 الحفر خلص ')+'· '+found+'/'+N+(last?' · '+last:''):'💎 '+found+'/'+N+' · حفر باقي '+left};
  const paint=()=>{const G2=$('trG');if(!G2)return;G2.innerHTML='';for(let i=0;i<CW*CHh;i++){const b=document.createElement('button');b.dataset.i=i;const d=dug.has(i);b.style.cssText='width:'+CS+'px;height:'+CS+'px;border-radius:8px;border:0;font-size:'+(H?14:20)+'px;font-weight:bold;cursor:pointer;background:'+(d?(tr.has(i)?'#ffd43b':'#e9d8a6'):'#a9801f')+';color:#fff';
   if(d){if(tr.has(i)){b.textContent='◆';b.style.color='#1098ad'}else{const n=near(i);b.textContent=n?n:'·';b.style.color=n>=2?'#c92a2a':n?'#e8590c':'#1971c2'}}
   b.onclick=()=>dig(i);G2.appendChild(b)}};
  dig=i=>{if(done||dug.has(i)||!$('trG'))return;dug.add(i);left--;
   if(tr.has(i)){found++;sfx('star')}else sfx('tick');
   if(found===N||left<=0){done=true;me.trhGames=(me.trhGames||0)+1;
    if(found===N){me.trhBest=Math.max(me.trhBest||0,left+1);const d=today();if(me.trhDD!==d){me.trhDD=d;me.trhDC=0}let c=1+(left>=2?1:0)+(left>=4?1:0);c=Math.min(c,Math.max(0,12-(me.trhDC||0)));if(c){me.coins+=c;me.trhDC=(me.trhDC||0)+c;updCoins();last='+'+c+'🪙';sfx('win')}}else sfx('err');
    saveMe()}
   paint();info()};
  $('trN').onclick=()=>{init();paint();info()};$('trX').onclick=()=>{$('modal').style.display='none'};
  paint();info()})}

function buildRhl(){
 const g=indoor(0x7048e8,0xf3f0ff,0xd0bfff);
 sign(g,'🥁 إيقاع الحارات',0,4.6,-7.6,'rgba(112,72,232,.92)');
 const C=[0xff6b6b,0xffd43b,0x51cf66,0x339af0];
 for(let i=0;i<4;i++)g.add(mesh(G.cyl(0.55,0.55,0.9,12),C[i],-2.4+i*1.6,0.45,-5),mesh(G.cyl(0.5,0.5,0.06,12),0xf8f9fa,-2.4+i*1.6,0.92,-5));
 g.add(mesh(G.box(0.3,2,0.3),0x343a40,-5,1,-2),mesh(G.box(0.3,2,0.3),0x343a40,5,1,-2));
 rhlh={it:{x:0,z:0.2,label:'🥁 العب إيقاع',fn:rhlStart}};interacts.push(rhlh.it);
 g.add(portalMesh('ارجع للكنز',5.8,5.8,0xa9801f,'trhroom'),portalMesh('بيت الحيوان',-5.8,5.8,0xe8590c,'ptyroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🥁 اضغط الحارة لما النوتة توصل الخط',3000)
}
function rhlStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,300),CH=H?140:250,LW=W/4,LY=.84,FALL=1.5,NN=40,COL=['#ff6b6b','#ffd43b','#51cf66','#339af0'];
 let notes,t0,hits,perf,combo,best,miss,over,last='',started=false;
 const init=()=>{notes=[];let l=0;for(let i=0;i<NN;i++){let n=Math.floor(Math.random()*4);if(n===l&&Math.random()<.5)n=(n+1)%4;l=n;notes.push({t:1.6+i*.58+(Math.random()<.25?.29:0),l:n,s:0})}notes.sort((a,b)=>a.t-b.t);t0=performance.now();hits=0;perf=0;combo=0;best=0;miss=0;over=false;last=''};
 init();
 const now=()=>(performance.now()-t0)/1000;
 let tap=()=>{};
 window.rhlq=()=>({t:now(),notes:notes.map(n=>({t:n.t,l:n.l,s:n.s})),hits,perf,miss,over,coins:me.coins,tap:l=>tap(l)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🥁 إيقاع الحارات</h2>')+'<div id="rhT" style="text-align:center;font-size:14px;margin:2px"></div><div style="text-align:center"><canvas id="rhC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%;touch-action:none"></canvas></div><div class="row" style="display:flex;gap:4px;justify-content:center;margin-top:4px;direction:ltr"><button class="btn" id="rh0" style="width:auto!important;display:inline-block!important;background:#ff6b6b">●</button><button class="btn" id="rh1" style="width:auto!important;display:inline-block!important;background:#e0a800">●</button><button class="btn" id="rh2" style="width:auto!important;display:inline-block!important;background:#2f9e44">●</button><button class="btn" id="rh3" style="width:auto!important;display:inline-block!important;background:#1c7ed6">●</button><button class="btn d" id="rhX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('rhC'),x=cv.getContext('2d');
  const info=()=>{if($('rhT'))$('rhT').textContent=over?'🏁 '+hits+'/'+NN+' · كومبو '+best+(last?' · '+last:'')+' (اضغط أي حارة للإعادة)':'✔ '+hits+'/'+NN+' · كومبو '+combo};
  const finish=()=>{over=true;me.rhlGames=(me.rhlGames||0)+1;me.rhlBest=Math.max(me.rhlBest||0,hits);const d=today();if(me.rhlDD!==d){me.rhlDD=d;me.rhlDC=0}
   let c=hits>=38?3:hits>=34?2:hits>=28?1:0;c=Math.min(c,Math.max(0,12-(me.rhlDC||0)));if(c){me.coins+=c;me.rhlDC=(me.rhlDC||0)+c;updCoins();last='+'+c+'🪙';sfx('win')}else sfx('err');saveMe()};
  tap=l=>{if(over){init();return}const t=now();let b=null;for(const n of notes){if(n.s||n.l!==l)continue;const d=Math.abs(n.t-t);if(d<.24&&(!b||d<Math.abs(b.t-t)))b=n}
   if(b){b.s=Math.abs(b.t-t)<.1?2:1;hits++;if(b.s===2)perf++;combo++;best=Math.max(best,combo);sfx('star')}else{combo=0;sfx('tick')}};
  const open=()=>$('rhC')&&$('modal').style.display!=='none';
  const draw=()=>{const t=now();x.fillStyle='#212529';x.fillRect(0,0,W,CH);
   for(let i=0;i<4;i++){x.fillStyle='rgba(255,255,255,.05)';x.fillRect(i*LW+2,0,LW-4,CH)}
   x.fillStyle='rgba(255,255,255,.7)';x.fillRect(0,LY*CH-2,W,4);
   for(const n of notes){const y=(LY-(n.t-t)/FALL*LY)*CH;if(y<-20||y>CH+20)continue;const cx=n.l*LW+LW/2;x.globalAlpha=n.s?.3:1;x.fillStyle=COL[n.l];x.beginPath();x.arc(cx,y,LW*.32,0,7);x.fill();x.globalAlpha=1}};
  const loop=()=>{if(!open())return;const t=now();if(!over){for(const n of notes)if(!n.s&&t>n.t+.25){n.s=-1;miss++;combo=0}
   if(t>notes[NN-1].t+.6)finish()}draw();info();requestAnimationFrame(loop)};
  for(let i=0;i<4;i++)$('rh'+i).onclick=()=>tap(i);
  cv.onclick=e=>{const r=cv.getBoundingClientRect();tap(Math.max(0,Math.min(3,Math.floor((e.clientX-r.left)/r.width*4))))};
  $('rhX').onclick=()=>{$('modal').style.display='none'};
  t0=performance.now();info();requestAnimationFrame(loop)})}

function buildPty(){
 const g=indoor(0xe8590c,0xfff4e6,0xffd8a8);
 sign(g,'🐣 بيت الحيوان',0,4.6,-7.6,'rgba(232,89,12,.92)');
 g.add(mesh(G.box(2,0.5,1.4),0xc2255c,0,0.25,-5),mesh(G.sph(0.6,10),0xffd43b,0,0.9,-5),mesh(G.sph(0.35,8),0xffa94d,0,1.7,-5),mesh(G.cyl(0.4,0.5,0.3,10),0x74c0fc,-3,0.15,-3),mesh(G.sph(0.3,8),0xff8787,3,0.3,-3));
 g.add(mesh(G.box(0.3,2,0.3),0x8d5524,-5,1,-2),mesh(G.box(0.3,2,0.3),0x8d5524,5,1,-2));
 ptyh={it:{x:0,z:0.2,label:'🐣 اهتم بحيوانك',fn:ptyStart}};interacts.push(ptyh.it);
 g.add(portalMesh('ارجع للإيقاع',5.8,5.8,0x7048e8,'rhlroom'),portalMesh('مزرعة الخضار',-5.8,5.8,0x2f9e44,'gdnroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🐣 حيوانك بيجوع ويزهق مع الوقت. اهتم بيه: مكافأة 1🪙 كل يوم',3400)
}
function ptyStart(){
 const H=innerHeight<420,SP=[['كتكوت','#ffd43b'],['قطة','#ffa94d'],['أرنب','#e5dbff']];
 const RATE=[8,6,5];
 const st=()=>{let s=me.ptyS;if(!s){s=me.ptyS={sp:0,v:[80,80,80],t:Date.now()}}const h=Math.max(0,(Date.now()-s.t)/3600000);if(h>0){for(let i=0;i<3;i++)s.v[i]=Math.max(0,s.v[i]-RATE[i]*h);s.t=Date.now()}return s};
 let msg='',bonus=0;
 window.ptyq=()=>{const s=st();return{sp:s.sp,v:s.v.map(Math.round),coins:me.coins,bonus,act:k=>act(k)}};
 let act=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🐣 بيت الحيوان</h2>')+'<div id="ptT" style="text-align:center;font-size:14px;margin:2px"></div><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center"><canvas id="ptC" width="130" height="'+(H?100:130)+'" style="border-radius:12px;background:#fff4e6"></canvas><div id="ptB" style="min-width:150px;font-size:13px;line-height:1.9"></div></div><div class="row" style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;margin-top:6px"><button class="btn" id="ptF" style="width:auto!important;display:inline-block!important">🍎 أكّل</button><button class="btn" id="ptP" style="width:auto!important;display:inline-block!important">🎾 العب</button><button class="btn" id="ptW" style="width:auto!important;display:inline-block!important">🛁 استحمّى</button><button class="btn d" id="ptS" style="width:auto!important;display:inline-block!important">🔄 نوع تاني</button><button class="btn d" id="ptX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const x=$('ptC').getContext('2d');
  const bar=(n,v,col)=>'<div>'+n+' <span style="display:inline-block;width:80px;height:9px;background:rgba(0,0,0,.25);border-radius:5px;vertical-align:middle"><span style="display:block;height:9px;width:'+Math.round(v)+'%;background:'+col+';border-radius:5px"></span></span> '+Math.round(v)+'</div>';
  const ui=()=>{if(!$('ptB'))return;const s=st();$('ptB').innerHTML=bar('🍎 شبع',s.v[0],'#51cf66')+bar('🎾 فرحة',s.v[1],'#fcc419')+bar('🛁 نضافة',s.v[2],'#4dabf7');
   const m=Math.min(...s.v);$('ptT').textContent=SP[s.sp][0]+' · '+(msg||(m<30?'محتاجك دلوقتي!':m<60?'عايز اهتمام':'مبسوط 😊'))};
  const open=()=>$('ptC')&&$('modal').style.display!=='none';
  const draw=ts=>{const s=st(),m=Math.min(...s.v),w=130,h=$('ptC').height;x.clearRect(0,0,w,h);const b=Math.sin(ts/300)*(m>=30?3:1),cx=w/2,cy=h/2+8+b;
   x.fillStyle='rgba(0,0,0,.12)';x.beginPath();x.ellipse(cx,h-12,28,6,0,0,7);x.fill();
   x.fillStyle=SP[s.sp][1];x.beginPath();x.ellipse(cx,cy,32,28,0,0,7);x.fill();
   if(s.sp===1){x.beginPath();x.moveTo(cx-26,cy-18);x.lineTo(cx-18,cy-42);x.lineTo(cx-8,cy-24);x.fill();x.beginPath();x.moveTo(cx+26,cy-18);x.lineTo(cx+18,cy-42);x.lineTo(cx+8,cy-24);x.fill()}
   if(s.sp===2){x.beginPath();x.ellipse(cx-12,cy-36,6,16,0,0,7);x.ellipse(cx+12,cy-36,6,16,0,0,7);x.fill()}
   if(s.sp===0){x.fillStyle='#fd7e14';x.beginPath();x.moveTo(cx-5,cy+2);x.lineTo(cx+5,cy+2);x.lineTo(cx,cy+10);x.fill()}
   x.fillStyle='#212529';x.beginPath();x.arc(cx-11,cy-6,m<30?2:4,0,7);x.arc(cx+11,cy-6,m<30?2:4,0,7);x.fill();
   x.strokeStyle='#212529';x.lineWidth=2.5;x.beginPath();if(m>=60)x.arc(cx,cy+8,9,0.1,Math.PI-0.1);else if(m>=30){x.moveTo(cx-7,cy+14);x.lineTo(cx+7,cy+14)}else x.arc(cx,cy+20,9,Math.PI+0.3,-0.3);x.stroke();
   if(s.v[2]<30){x.fillStyle='#868e96';[[-30,-20],[28,10],[-24,22]].forEach(p=>{x.beginPath();x.arc(cx+p[0],cy+p[1],3,0,7);x.fill()})}};
  act=k=>{const s=st();if(k==='f'){s.v[0]=Math.min(100,s.v[0]+30);msg='ياميّ! 🍎'}if(k==='p'){s.v[1]=Math.min(100,s.v[1]+25);s.v[2]=Math.max(0,s.v[2]-5);s.v[0]=Math.max(0,s.v[0]-4);msg='حلو اللعب! 🎾'}if(k==='w'){s.v[2]=Math.min(100,s.v[2]+40);msg='نضيف 🛁'}
   me.ptyGames=(me.ptyGames||0)+1;me.ptyBest=Math.max(me.ptyBest||0,Math.round(Math.min(...s.v)));sfx('place');
   const d=today();bonus=0;if(Math.min(...s.v)>=60&&me.ptyD!==d){me.ptyD=d;me.coins++;bonus=1;updCoins();msg='🎁 +1🪙 مكافأة الاهتمام!';sfx('win')}
   saveMe();ui()};
  $('ptF').onclick=()=>act('f');$('ptP').onclick=()=>act('p');$('ptW').onclick=()=>act('w');$('ptS').onclick=()=>{const s=st();s.sp=(s.sp+1)%3;msg='';saveMe();ui()};$('ptX').onclick=()=>{$('modal').style.display='none'};
  ui();const iv=setInterval(()=>{if(!open())clearInterval(iv);else ui()},3000);const loop=ts=>{if(!open())return;draw(ts);requestAnimationFrame(loop)};requestAnimationFrame(loop)})}

function buildGdn(){
 const g=indoor(0x2f9e44,0xebfbee,0xb2f2bb);
 sign(g,'🌱 مزرعة الخضار',0,4.6,-7.6,'rgba(47,158,68,.92)');
 for(let i=0;i<4;i++)g.add(mesh(G.box(1.3,0.25,1.3),0x6f4e37,-2.4+i*1.6,0.12,-5),mesh(G.cyl(0.15,0.15,0.5+i*0.15,6),0x40c057,-2.4+i*1.6,0.5,-5),mesh(G.sph(0.25,8),[0xfd7e14,0xe03131,0xf08c00,0xfd7e14][i],-2.4+i*1.6,0.9+i*0.1,-5));
 g.add(mesh(G.cyl(0.5,0.6,0.7,10),0x4dabf7,4.5,0.35,-2));
 gdnh={it:{x:0,z:0.2,label:'🌱 مزرعتي',fn:gdnStart}};interacts.push(gdnh.it);
 g.add(portalMesh('ارجع لبيت الحيوان',5.8,5.8,0xe8590c,'ptyroom'),portalMesh('تحدّي الحساب',-5.8,5.8,0x0b7285,'mdlroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🌱 ازرع وانتظر (حتى لو برّه اللعبة) وبعدين احصد 🪙',3400)
}
function gdnStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-50,320),CH=H?120:170,PW=W/4;
 const SD=[['جزر','#fd7e14',5,1],['طماطم','#e03131',30,2],['قرع','#f08c00',120,4]];
 let sel=0,msg='';
 const P=()=>{if(!me.gdnP)me.gdnP=[null,null,null,null];return me.gdnP};
 const rem=p=>Math.max(0,SD[p.k][2]*60000-(Date.now()-p.t)-(p.w?SD[p.k][2]*60000*.4:0));
 const prog=p=>Math.min(1,1-rem(p)/(SD[p.k][2]*60000));
 const fmt=ms=>{const s=Math.ceil(ms/1000);return s>=3600?Math.floor(s/3600)+'س '+Math.floor(s%3600/60)+'د':Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
 let tap=()=>{};
 window.gdnq=()=>({p:P().map(p=>p&&{k:p.k,pr:+prog(p).toFixed(2),w:!!p.w}),coins:me.coins,dc:me.gdnDC||0,tap:i=>tap(i),sel:s=>{sel=s}});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🌱 مزرعة الخضار</h2>')+'<div id="gdT" style="text-align:center;font-size:13px;margin:2px;min-height:'+(H?'2.4em':'4em')+';overflow:hidden"></div><div style="text-align:center"><canvas id="gdC" width="'+W+'" height="'+CH+'" style="border-radius:10px;max-width:100%"></canvas></div><div class="row" style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;margin-top:5px"><button class="btn" id="gd0" style="width:auto!important;display:inline-block!important">🥕 جزر</button><button class="btn" id="gd1" style="width:auto!important;display:inline-block!important">🍅 طماطم</button><button class="btn" id="gd2" style="width:auto!important;display:inline-block!important">🎃 قرع</button><button class="btn d" id="gdX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const cv=$('gdC'),x=cv.getContext('2d');
  const info=()=>{if(!$('gdT'))return;$('gdT').textContent=msg||('البذرة: '+SD[sel][0]+' ('+(SD[sel][2]>=60?SD[sel][2]/60+' ساعة':SD[sel][2]+' دقيقة')+' → '+SD[sel][3]+'🪙) · اضغط على أرض فاضية للزرع، على نبتة للسقي (أسرع 40%)، على ناضجة للحصاد')};
  const sel0=()=>{for(let i=0;i<3;i++){const b=$('gd'+i);b.style.outline=i===sel?'3px solid #fff':'none'}};
  tap=i=>{const ps=P(),p=ps[i];msg='';
   if(!p){ps[i]={k:sel,t:Date.now(),w:0};msg='🌱 زرعت '+SD[sel][0];sfx('place')}
   else if(rem(p)<=0){const d=today();if(me.gdnDD!==d){me.gdnDD=d;me.gdnDC=0}let c=Math.min(SD[p.k][3],Math.max(0,10-(me.gdnDC||0)));ps[i]=null;me.gdnGames=(me.gdnGames||0)+1;me.gdnBest=me.gdnGames;if(c){me.coins+=c;me.gdnDC=(me.gdnDC||0)+c;updCoins();msg='🧺 حصدت '+SD[p.k][0]+' +'+c+'🪙';sfx('win')}else{msg='🧺 حصدت، بس حد النهاردة (10🪙) خلص';sfx('tick')}}
   else if(!p.w){p.w=1;msg='💧 سقيت: الوقت قل 40%';sfx('drink')}else msg='⏳ اتسقت قبل كده';
   saveMe();info()};
  const draw=()=>{x.fillStyle='#d3f9d8';x.fillRect(0,0,W,CH);const ps=P();
   for(let i=0;i<4;i++){const p=ps[i],px=i*PW,cx=px+PW/2,gy=CH-34;x.fillStyle='#6f4e37';x.fillRect(px+5,gy,PW-10,28);x.fillStyle='#8d5a3b';x.fillRect(px+5,gy,PW-10,6);
    if(p){const pr=prog(p),h=14+pr*(CH-90),col=SD[p.k][1];x.strokeStyle='#40c057';x.lineWidth=4;x.beginPath();x.moveTo(cx,gy);x.lineTo(cx,gy-h);x.stroke();x.fillStyle='#69db7c';x.beginPath();x.ellipse(cx-10,gy-h*.6,9,4,-.5,0,7);x.ellipse(cx+10,gy-h*.4,9,4,.5,0,7);x.fill();
     if(pr>=1){x.fillStyle=col;x.beginPath();if(p.k===0){x.moveTo(cx-10,gy-h);x.lineTo(cx+10,gy-h);x.lineTo(cx,gy-h+26)}else x.arc(cx,gy-h,p.k===2?18:12,0,7);x.fill();x.fillStyle='#2b8a3e';x.fillRect(cx-3,gy-h-16,6,8)}
     else{x.fillStyle=col;x.globalAlpha=.4+pr*.4;x.beginPath();x.arc(cx,gy-h,4+pr*6,0,7);x.fill();x.globalAlpha=1}
     if(p.w){x.fillStyle='#4dabf7';x.beginPath();x.arc(px+12,gy-10,5,0,7);x.fill()}
     x.fillStyle='#212529';x.font='bold 12px sans-serif';x.textAlign='center';x.fillText(rem(p)<=0?'ناضجة!':fmt(rem(p)),cx,gy+19)}
    else{x.fillStyle='rgba(255,255,255,.65)';x.font='12px sans-serif';x.textAlign='center';x.fillText('فاضية',cx,gy+19)}}};
  const open=()=>$('gdC')&&$('modal').style.display!=='none';
  const loop=()=>{if(!open())return;draw();requestAnimationFrame(loop)};
  cv.onclick=e=>{const r=cv.getBoundingClientRect();tap(Math.max(0,Math.min(3,Math.floor((e.clientX-r.left)/r.width*4))))};
  for(let i=0;i<3;i++)$('gd'+i).onclick=()=>{sel=i;msg='';sel0();info()};
  $('gdX').onclick=()=>{$('modal').style.display='none'};
  sel0();info();requestAnimationFrame(loop)})}

function buildMdl(){
 const g=indoor(0x0b7285,0xe3fafc,0x99e9f2);
 sign(g,'🧮 تحدّي الحساب',0,4.6,-7.6,'rgba(11,114,133,.92)');
 g.add(mesh(G.box(2.4,1.6,0.3),0x212529,0,2,-6),mesh(G.box(2.1,1.3,0.1),0x2b8a3e,0,2,-5.8),mesh(G.box(0.7,1.6,0.7),0x868e96,-3.2,0.8,-4),mesh(G.sph(0.45,10),0xffd43b,-3.2,1.9,-4),mesh(G.box(0.15,0.15,0.5),0xe03131,-3.2,2.5,-4));
 g.add(mesh(G.box(0.3,2,0.3),0x0b7285,-5,1,-2),mesh(G.box(0.3,2,0.3),0x0b7285,5,1,-2));
 mdlh={it:{x:0,z:0.2,label:'🧮 اتحدّى الروبوت 🤖',fn:mdlStart}};interacts.push(mdlh.it);
 g.add(portalMesh('ارجع للمزرعة',5.8,5.8,0x2f9e44,'gdnroom'),portalMesh('اختبار ردّ الفعل',-5.8,5.8,0xc92a2a,'rttroom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🧮 أسرع واحد يجاوب صح (إنت ولا الروبوت 🤖)',3200)
}
function mdlStart(){
 const H=innerHeight<420,TG=5;
 let me0=0,bot=0,q=null,locked=false,botT=0,botOk=false,over=false,msg='',nq=0,qt=0,res='';
 const rnd=n=>Math.floor(Math.random()*n);
 const gen=()=>{const k=rnd(3);let a,b,t,ans;if(k===0){a=10+rnd(40);b=10+rnd(40);t=a+' + '+b;ans=a+b}else if(k===1){a=30+rnd(60);b=10+rnd(a-10);t=a+' − '+b;ans=a-b}else{a=2+rnd(9);b=2+rnd(9);t=a+' × '+b;ans=a*b}
  const o=new Set([ans]);while(o.size<4){const d=(1+rnd(4))*(Math.random()<.5?-1:1)*(k===2?a:1);const v=ans+d;if(v>0)o.add(v)}
  const opts=[...o].sort(()=>Math.random()-.5);q={t,ans,opts};locked=false;qt=Date.now();botT=2200+rnd(2800);botOk=Math.random()<.7;nq++};
 let pick=()=>{};
 window.mdlq=()=>({q,me:me0,bot,over,res,coins:me.coins,locked,pick:i=>pick(i)});
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🧮 تحدّي الحساب</h2>')+'<div id="mdS" style="text-align:center;font-size:14px;margin:2px;direction:rtl"></div><div id="mdQ" style="text-align:center;font-size:'+(H?24:34)+'px;font-weight:bold;margin:'+(H?'2px':'8px')+' 0;direction:ltr;min-height:1.3em"></div><div id="mdO" style="display:grid;grid-template-columns:repeat('+(H?4:2)+',1fr);gap:6px"></div><div id="mdM" style="text-align:center;font-size:13px;margin:6px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn" id="mdN" style="width:auto!important;display:inline-block!important">🔁 تحدّي جديد</button><button class="btn d" id="mdX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const open=()=>$('mdQ')&&$('modal').style.display!=='none';
  const paint=()=>{if(!$('mdQ'))return;$('mdS').textContent='أنت '+me0+' : '+bot+' 🤖 روبوت (أول واحد لـ'+TG+')';$('mdM').textContent=msg;
   $('mdQ').textContent=q?q.t+' = ?':'';const o=$('mdO');o.innerHTML='';if(q&&!over)q.opts.forEach((v,i)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='width:100%!important;font-size:20px';b.textContent=v;b.dataset.i=i;b.disabled=locked;b.onclick=()=>pick(i);o.appendChild(b)})};
  const end=w=>{over=true;res=w?'win':'lose';me.mdlGames=(me.mdlGames||0)+1;let cn=0;
   if(w){const d=today();if(me.mdlDD!==d){me.mdlDD=d;me.mdlDC=0}cn=me0-bot>=4?2:1;cn=Math.min(cn,Math.max(0,6-(me.mdlDC||0)));me.mdlBest=Math.max(me.mdlBest||0,me0-bot);if(cn){me.coins+=cn;me.mdlDC=(me.mdlDC||0)+cn;updCoins()}sfx('win')}else sfx('err');
   msg=w?'🏆 كسبت الروبوت '+me0+':'+bot+(cn?' · +'+cn+'🪙':' · (حد اليوم خلص)'):'🤖 الروبوت كسب '+bot+':'+me0+'، جرّب تاني';saveMe();paint()};
  const nextQ=()=>{if(me0>=TG)return end(true);if(bot>=TG)return end(false);gen();paint()};
  pick=i=>{if(over||locked||!q)return;if(q.opts[i]===q.ans){me0++;msg='✅ صح! نقطة ليك';sfx('star');nextQ()}else{locked=true;msg='❌ غلط، استنى الروبوت';sfx('err');paint()}};
  const tick=()=>{if(!open())return;if(!over&&q&&Date.now()-qt>botT){if(botOk){bot++;msg='🤖 الروبوت جاوب أسرع: '+q.ans;nextQ()}else if(locked){msg='🤖 غلط كمان، سؤال جديد';nextQ()}else{botT=1e9;msg='🤖 الروبوت غلط! لسه ليك فرصة'}}setTimeout(tick,200)};
  $('mdN').onclick=()=>{me0=0;bot=0;over=false;res='';msg='';nextQ()};$('mdX').onclick=()=>{$('modal').style.display='none'};
  nextQ();setTimeout(tick,300)})}

function buildRtt(){
 const g=indoor(0xc92a2a,0xfff5f5,0xffc9c9);
 sign(g,'🚦 اختبار ردّ الفعل',0,4.6,-7.6,'rgba(201,42,42,.92)');
 g.add(mesh(G.box(0.5,3,0.5),0x343a40,0,1.5,-5.5),mesh(G.box(1.2,2.6,0.6),0x212529,0,3,-5.5),mesh(G.sph(0.35,10),0xe03131,0,3.7,-5.15),mesh(G.sph(0.35,10),0xfcc419,0,3,-5.15),mesh(G.sph(0.35,10),0x2f9e44,0,2.3,-5.15));
 g.add(mesh(G.box(0.3,2,0.3),0xc92a2a,-5,1,-2),mesh(G.box(0.3,2,0.3),0xc92a2a,5,1,-2));
 rtth={it:{x:0,z:0.2,label:'🚦 جرّب ردّ فعلك',fn:rttStart}};interacts.push(rtth.it);
 g.add(portalMesh('ارجع لتحدّي الحساب',5.8,5.8,0x0b7285,'mdlroom'),portalMesh('تحدّي البالونات',-5.8,5.8,0xd6336c,'bpproom'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🚦 اضغط أول ما يبقى أخضر. بدري = غلطة',3000)
}
function rttStart(){
 const H=innerHeight<420,N=5;
 let st='idle',times=[],t0=0,to=null,msg='',over=false;
 const q=()=>({st,times:times.slice(),over,coins:me.coins,press:()=>press()});
 window.rttq=q;
 let press=()=>{};
 modal(c=>{
  c.innerHTML=(H?'':'<h2 style="margin:4px">🚦 اختبار ردّ الفعل</h2>')+'<div id="rtS" style="text-align:center;font-size:13px;margin:2px;min-height:1.4em"></div><div id="rtP" style="height:'+(H?'110px':'200px')+';border-radius:14px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:'+(H?18:22)+'px;font-weight:bold;color:#fff;cursor:pointer;user-select:none;touch-action:manipulation;padding:6px"></div><div id="rtM" style="text-align:center;font-size:13px;margin:6px 0;min-height:2.6em;overflow:hidden"></div><div class="row" style="display:flex;gap:6px;justify-content:center"><button class="btn d" id="rtX" style="width:auto!important;display:inline-block!important">إغلاق</button></div>';
  const open=()=>$('rtP')&&$('modal').style.display!=='none';
  const ui=()=>{if(!$('rtP'))return;const P=$('rtP');
   const bg={idle:'#1971c2',wait:'#c92a2a',go:'#2f9e44',early:'#e8590c'}[st];P.style.background=over?'#5f3dc4':bg;
   P.textContent=over?'🏁 المتوسط '+Math.round(times.reduce((a,b)=>a+b,0)/times.length)+' م.ث':{idle:'اضغط هنا للبدء',wait:'استنى الأخضر...',go:'دلوقتي!',early:'بدري! اضغط عشان تعيد'}[st];
   $('rtS').textContent='محاولة '+Math.min(times.length+(over?0:1),N)+'/'+N+(times.length?' · '+times.map(t=>t+'').join(' · '):'');$('rtM').textContent=msg};
  const arm=()=>{st='wait';ui();to=setTimeout(()=>{if(!open())return;st='go';t0=performance.now();ui()},1200+Math.random()*2800)};
  const finish=()=>{over=true;const avg=Math.round(times.reduce((a,b)=>a+b,0)/N);me.rttGames=(me.rttGames||0)+1;const d=today();if(me.rttDD!==d){me.rttDD=d;me.rttDC=0}
   let c=avg<=260?2:avg<=360?1:0;c=Math.min(c,Math.max(0,4-(me.rttDC||0)));const bb=me.rttBest?Math.min(me.rttBest,avg):avg;me.rttBest=bb;
   if(c){me.coins+=c;me.rttDC=(me.rttDC||0)+c;updCoins();sfx('win')}else sfx('tick');
   msg='🏁 متوسطك '+avg+' م.ث (أحسن رقم '+bb+')'+(c?' · +'+c+'🪙':avg>360?' · محتاج أقل من 360 للجايزة':'')+' · اضغط للإعادة';saveMe();ui()};
  press=()=>{if(st==='idle'){times=[];over=false;msg='';arm()}
   else if(st==='wait'){clearTimeout(to);st='early';msg='🚫 ضغطت بدري قبل الأخضر';sfx('err');ui()}
   else if(st==='early'){msg='';arm()}
   else if(st==='go'){const t=Math.round(performance.now()-t0);times.push(t);sfx('star');if(times.length>=N){st='idle';finish()}else{msg='⚡ '+t+' م.ث';arm()}}
   else if(over){over=false;times=[];st='idle';press()}};
  const P=$('rtP');P.onpointerdown=e=>{e.preventDefault();if(over&&st==='idle'){over=false;times=[];msg='';arm();return}press()};
  $('rtX').onclick=()=>{clearTimeout(to);$('modal').style.display='none'};ui()})}
