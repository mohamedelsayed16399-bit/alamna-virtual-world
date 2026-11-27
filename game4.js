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
 g.add(portalMesh('ارجع لصالة السهام',5.8,5.8,0x5c940d,'darts'));
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
