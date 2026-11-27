'use strict';
function buildHaunt(){
interacts=[];ghosts=[];hunt=null;const g=indoor(0x2b2230,0x241a2e,0x845ef7),rng=mulberry(1313);
for(const[x,z]of[[-6,-6],[6,-6],[-6.5,4],[6.5,4]]){const c=new THREE.Group();c.position.set(x,0,z);c.add(mesh(G.cyl(0.12,0.14,0.5,6),0xf1e9d2,0,0.25,0),mesh(G.sph(0.08,6),0xffa94d,0,0.58,0,0xff8800));g.add(c);const L=new THREE.PointLight(0xffa94d,0.8,6);L.position.set(x,0.9,z);g.add(L)}
for(const[x,z]of[[-3,-6.8],[3,-6.8],[0,3]]){const p=new THREE.Group();p.position.set(x,0,z);p.add(mesh(G.sph(0.4,8),0xf08c00,0,0.4,0,0x552200),mesh(G.box(0.08,0.15,0.08),0x2f9e44,0,0.85,0));g.add(p)}
g.add(mesh(G.box(1.1,0.5,2.2),0x3e2723,5.5,0.25,-2.5),mesh(G.box(1.2,0.12,2.3),0x5d4037,5.5,0.56,-2.5));
for(const[x,z]of[[-5.5,-2],[-3.5,-3.4],[-5,1]]){g.add(mesh(G.box(0.5,0.9,0.12),0x868e96,x,0.45,z),mesh(G.cyl(0.25,0.25,0.12,8),0x868e96,x,0.9,z).rotateX(Math.PI/2))}
g.add(mesh(G.box(0.1,3,0.1),0x1b1b1b,-7.6,1.5,-7.6));for(let i=0;i<6;i++)g.add(mesh(G.box(0.02,1.6-i*0.2,0.02),0xf1f3f5,-7.6+i*0.4,3.2-i*0.2,-7.7).rotateZ(0.5));
sign(g,'👻 البيت المسكون',0,4.4,-6.5,'rgba(112,72,232,.92)');sign(g,'🔦 صيد الأشباح',0,2.8,-3.6);interacts.push({x:0,z:-1.6,label:'🔦 ابدأ صيد الأشباح (٤٥ ثانية)',fn:startHunt});
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('👻 الأشباح مختفية في الضلمة. ابدأ الصيد من اللافتة!',3000)
}
function mkGhost(){const gp=new THREE.Group();const mt=new THREE.MeshLambertMaterial({color:0xf8f9fa,transparent:true,opacity:0.8,emissive:0x8888bb});gp.add(new THREE.Mesh(new THREE.SphereGeometry(0.42,10,8),mt));const sk=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.5,0.5,10),mt);sk.position.y=-0.3;gp.add(sk);for(const x of[-0.15,0.15]){const e=new THREE.Mesh(new THREE.SphereGeometry(0.07,6,5),new THREE.MeshBasicMaterial({color:0x212529}));e.position.set(x,0.08,0.36);gp.add(e)}return gp}
function startHunt(){if(hunt||!room||room.type!=='haunt')return;const t=today();if(!me.hnd||me.hnd.d!==t)me.hnd={d:t,n:0};const rng=mulberry(Date.now()&0xffff);const gs=[];for(let i=0;i<7;i++){const m=mkGhost();m.userData={a:rng()*6.28,sp:0.5+rng()*0.5,r:2.5+rng()*3.5,cx:(rng()-0.5)*5,cz:(rng()-0.5)*6-1};m.position.set(m.userData.cx,0.9,m.userData.cz);m.visible=false;room.group.add(m);gs.push(m)}ghosts=gs;hunt={t:45,n:0};toast('🔦 امسك الأشباح! بتظهر لما تقرب منها',3000);sfx('star')}
function endHunt(){if(!hunt)return;const h=hunt;hunt=null;for(const m of ghosts)if(m.parent)m.parent.remove(m);ghosts=[];const t=today();if(!me.hnd||me.hnd.d!==t)me.hnd={d:t,n:0};const pay=me.hnd.n<4?Math.min(h.n*3,21):0;if(pay)me.hnd.n++;me.ghostsGot=(me.ghostsGot||0)+h.n;me.coins+=pay;updCoins();saveMe();sfx('win');toast('👻 مسكت '+h.n+' شبح'+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)'),3200);chestUpd()}
function hauntTick(dt){if(!hunt)return;if(!room||room.type!=='haunt'){hunt=null;ghosts=[];return}const h=chestHud(),p=player.root.position;hunt.t-=dt;h.style.display='block';h.textContent='👻 '+hunt.n+' · ⏱ '+Math.max(0,Math.ceil(hunt.t));for(let k=ghosts.length-1;k>=0;k--){const m=ghosts[k],u=m.userData;u.a+=dt*u.sp;const d=Math.hypot(p.x-m.position.x,p.z-m.position.z);const fl=d<3.2?1.4:1;m.position.x=Math.max(-7,Math.min(7,u.cx+Math.cos(u.a)*u.r*fl*0.8));m.position.z=Math.max(-7,Math.min(7,u.cz+Math.sin(u.a*1.3)*u.r*0.7));m.position.y=0.9+Math.sin(tClock*3+k)*0.15;m.rotation.y=-u.a;m.visible=d<4.5;m.children[0].material.opacity=0.3+0.5*Math.max(0,1-d/4.5);if(d<1.0){room.group.remove(m);ghosts.splice(k,1);hunt.n++;sfx('chat');burst(m.position,0xdee2e6,10);toast('👻 مسكت شبح! '+hunt.n,700)}}if(hunt.t<=0||!ghosts.length)endHunt()}
let orbs=[],orun=null,planets=[];
const PFACT=['🪐 زحل ليه حلقات من الجليد والصخور','🔴 المريخ لونه أحمر بسبب الصدأ','🌕 القمر بيبعد عنا حوالي ٣٨٤ ألف كم','☀️ الشمس أكبر من الأرض ١٠٩ مرة','🌍 الأرض هي الكوكب الوحيد اللي فيه حياة معروفة','🟠 المشتري أكبر كوكب في المجموعة الشمسية','🌌 مجرتنا اسمها درب التبانة'];
function buildSpace(){
interacts=[];orbs=[];planets=[];orun=null;const g=indoor(0x2d3748,0x1a202c,0x4dabf7),rng=mulberry(2024);
for(let i=0;i<70;i++){const m=mesh(G.sph(0.05+rng()*0.06,4),0xffffff,-30+rng()*60,3+rng()*22,-30-rng()*30,0xffffff);m.userData.keep=true;g.add(m)}
const pl=[[0x4dabf7,4,-9,8,-20,0x0b3a66],[0xf08c00,2.2,8,9,-22,0x663300],[0xe64980,1.2,0,12,-24,0x660033]];for(const[c,r,x,y,z,e]of pl){const m=mesh(G.sph(r,16),c,x,y,z,e);m.userData.keep=true;g.add(m);planets.push(m)}
const ring=new THREE.Mesh(new THREE.TorusGeometry(3.2,0.15,6,28),new THREE.MeshBasicMaterial({color:0xffd8a8,transparent:true,opacity:0.7}));ring.position.set(8,9,-22);ring.rotation.x=1.2;ring.userData.keep=true;g.add(ring);
g.add(mesh(G.box(14,3,0.3),0x0b1220,0,3.2,-8.1,0x050914));
for(const[x,z]of[[-5,-4],[5,-4],[-5,2],[5,2]]){g.add(mesh(G.cyl(0.5,0.5,0.15,12),0x495057,x,0.08,z,0x1971c2))}
const tl=new THREE.Group();tl.position.set(-6,0,-5.5);tl.add(mesh(G.cyl(0.1,0.18,1.0,6),0x343a40,0,0.5,0),mesh(G.cyl(0.18,0.18,1.3,8),0xced4da,0,1.3,0).rotateX(1.0));g.add(tl);
sign(g,'🚀 محطة الفضاء',0,4.4,-6.5,'rgba(25,113,194,.92)');sign(g,'⚡ اجمع الطاقة',2.5,2.6,-3.4);interacts.push({x:2.5,z:-1.8,label:'⚡ ابدأ جمع الطاقة (٣٥ ثانية)',fn:startOrbs});sign(g,'🔭 تليسكوب',-6,2.2,-5.5);interacts.push({x:-6,z:-4,label:'🔭 بُص في التليسكوب',fn:scopeLook});
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('🚀 محطة الفضاء! بُص في التليسكوب أو اجمع الطاقة',3000)
}
function scopeLook(){const t=today();if(!me.scd||me.scd.d!==t)me.scd={d:t,n:0};const f=PFACT[Math.floor(Math.random()*PFACT.length)];const pay=me.scd.n<5?1:0;if(pay){me.scd.n++;me.coins+=1;updCoins();saveMe()}me.scopes=(me.scopes||0)+1;sfx('star');toast(f+(pay?' · +1🪙':''),4000)}
function startOrbs(){if(orun||!room||room.type!=='space')return;const rng=mulberry(Date.now()&0xffff);orbs=[];for(let i=0;i<12;i++){const m=mesh(G.sph(0.28,8),0x22d3ee,(rng()-0.5)*12,0.6+rng()*1.2,(rng()-0.5)*12,0x0891b2);m.userData={vx:(rng()-0.5)*1.4,vz:(rng()-0.5)*1.4,keep:true};room.group.add(m);orbs.push(m)}orun={t:35,n:0};toast('⚡ الطاقة بتطفو في كل مكان! امسكها قبل ما الوقت يخلص',3000);sfx('star')}
function endOrbs(){if(!orun)return;const r=orun;orun=null;for(const m of orbs)if(m.parent)m.parent.remove(m);orbs=[];const t=today();if(!me.orbd||me.orbd.d!==t)me.orbd={d:t,n:0};const pay=me.orbd.n<4?Math.min(r.n*2,24):0;if(pay)me.orbd.n++;me.orbsGot=(me.orbsGot||0)+r.n;me.coins+=pay;updCoins();saveMe();sfx('win');toast('⚡ جمعت '+r.n+' طاقة'+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)'),3200);chestUpd()}
function spaceTick(dt){if(!room||room.type!=='space'){if(orun){orun=null;orbs=[]}return}for(const p of planets)p.rotation.y+=dt*0.05;if(!orun||!player)return;const h=chestHud(),p=player.root.position;orun.t-=dt;h.style.display='block';h.textContent='⚡ '+orun.n+' · ⏱ '+Math.max(0,Math.ceil(orun.t));for(let k=orbs.length-1;k>=0;k--){const m=orbs[k],u=m.userData;m.position.x+=u.vx*dt;m.position.z+=u.vz*dt;if(Math.abs(m.position.x)>7){u.vx*=-1;m.position.x=Math.sign(m.position.x)*7}if(m.position.z>7||m.position.z<-7){u.vz*=-1;m.position.z=Math.max(-7,Math.min(7,m.position.z))}m.position.y=0.9+Math.sin(tClock*2+k)*0.4;if(Math.hypot(p.x-m.position.x,p.z-m.position.z)<1.1){room.group.remove(m);orbs.splice(k,1);orun.n++;sfx('chat');burst(m.position,0x22d3ee,8)}}if(orun.t<=0||!orbs.length)endOrbs()}
let festLast=-1,festFw=0,lanterns=[],festToastId=-1,festHudEl=null;
function festState(){const n=new Date();let sec=(n.getMinutes()%30)*60+n.getSeconds();const id=Math.floor(Date.now()/1800000);if(/[?&]fest/.test(location.search))return{on:true,left:60,id:id};if(sec<90)return{on:true,left:90-sec,id:id};return{on:false,left:1800-sec,id:id+1}}
function mmss(t){t=Math.max(0,Math.ceil(t));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}
function festTick(dt){if(!me||!player)return;if(!festHudEl){festHudEl=document.createElement('div');festHudEl.id='festHud';festHudEl.style.cssText='position:fixed;left:8px;top:148px;z-index:9;background:#000a;color:#ff8787;padding:4px 12px;border-radius:14px;font:700 13px system-ui;direction:rtl;pointer-events:none;display:none';document.body.appendChild(festHudEl)}const f=festState();const inPlaza=room&&room.type==='plaza';festHudEl.style.display=inPlaza?'block':'none';if(inPlaza)festHudEl.textContent=f.on?'🎆 المهرجان شغال! '+mmss(f.left):'🎆 المهرجان بعد '+mmss(f.left);if(f.on&&festToastId!==f.id){festToastId=f.id;if(!inPlaza)toast('🎆 المهرجان بدأ في الساحة العامة! الحق الحفلة',4000);else sfx('win')}
for(let k=lanterns.length-1;k>=0;k--){const l=lanterns[k];l.m.position.y+=dt*l.v;l.m.position.x+=Math.sin(tClock+l.p)*dt*0.4;l.t-=dt;if(l.t<=0||!inPlaza){scene.remove(l.m);l.m.material.dispose();lanterns.splice(k,1)}}
if(!inPlaza||!f.on)return;if(festLast!==f.id){festLast=f.id;const t=today();if(!me.fsd||me.fsd.d!==t)me.fsd={d:t,n:0};if(me.fsd.n<8){me.fsd.n++;me.coins+=10;me.fests=(me.fests||0)+1;updCoins();saveMe();sfx('star');toast('🎉 دخلت المهرجان! +10🪙',3500)}else toast('🎆 مهرجان! (وصلت حد النهاردة)',2500)}
festFw-=dt;if(festFw<=0){festFw=0.5+Math.random()*0.6;const fx=(Math.random()-0.5)*26,fz=(Math.random()-0.5)*26,fc=[[0xff6b6b,0xffd43b],[0x4dabf7,0xffffff],[0x69db7c,0xffd43b],[0xf783ac,0xb197fc],[0xffa94d,0xff6b6b]][Math.floor(Math.random()*5)];burst({x:fx,y:7+Math.random()*4,z:fz},fc,40);sfx('tick');if(lanterns.length<24&&Math.random()<0.6){const m=new THREE.Mesh(new THREE.BoxGeometry(0.4,0.55,0.4),new THREE.MeshBasicMaterial({color:[0xffa94d,0xff6b6b,0xffd43b][Math.floor(Math.random()*3)]}));m.position.set((Math.random()-0.5)*24,1,(Math.random()-0.5)*24);scene.add(m);lanterns.push({m,v:0.9+Math.random()*0.8,p:Math.random()*6,t:12})}}}
let mz=null;
function buildMaze(){
interacts=[];const g=indoor(0x2f4f3a,0x264034,0x20c997);const N=6,C=2;const d=new Date();let seed=d.getFullYear()*400+d.getMonth()*35+d.getDate();const rng=mulberry(seed);
const vis=[],right=[],down=[];for(let i=0;i<N;i++){vis.push(Array(N).fill(false));right.push(Array(N).fill(true));down.push(Array(N).fill(true))}
const st=[[0,N-1]];vis[N-1][0]=true;while(st.length){const[cx,cz]=st[st.length-1];const nb=[];for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,nz=cz+dz;if(nx>=0&&nx<N&&nz>=0&&nz<N&&!vis[nz][nx])nb.push([nx,nz,dx,dz])}if(!nb.length){st.pop();continue}const[nx,nz,dx,dz]=nb[Math.floor(rng()*nb.length)];if(dx===1)right[cz][cx]=false;else if(dx===-1)right[nz][nx]=false;else if(dz===1)down[cz][cx]=false;else down[nz][nx]=false;vis[nz][nx]=true;st.push([nx,nz])}
const walls=[];const W=(x0,z0,x1,z1)=>{walls.push([Math.min(x0,x1)-0.15,Math.min(z0,z1)-0.15,Math.max(x0,x1)+0.15,Math.max(z0,z1)+0.15]);g.add(mesh(G.box(Math.abs(x1-x0)+0.3,1.6,Math.abs(z1-z0)+0.3),0x3b8f5a,(x0+x1)/2,0.8,(z0+z1)/2))};
const o=-N*C/2;mz={walls,N,C,o,t:0,run:false,done:false,init:false,pick:[]};
return finishMaze(g,right,down,W,N,C,o)
}
function finishMaze(g,right,down,W,N,C,o){
W(o,o,-o,o);W(o,o,o,-o);W(-o,o,-o,-o);
for(let i=0;i<N;i++){if(i!==0)W(o+i*C,-o,o+(i+1)*C,-o)}
for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(x<N-1&&right[z][x])W(o+(x+1)*C,o+z*C,o+(x+1)*C,o+(z+1)*C);if(z<N-1&&down[z][x])W(o+x*C,o+(z+1)*C,o+(x+1)*C,o+(z+1)*C)}
const gx=-o-C/2,gz=o+C/2,sx=o+C/2,sz=-o-C/2;mz.sx=sx;mz.sz=sz;mz.gx=gx;mz.gz=gz;
g.add(mesh(G.cyl(0.5,0.6,0.3,10),0xffd43b,gx,0.15,gz,0x886600),mesh(G.cyl(0.14,0.2,0.5,8),0xffd43b,gx,0.6,gz,0x886600),mesh(G.cone(0.45,0.5,8),0xffd43b,gx,1.1,gz,0xaa8800));
g.add(mesh(G.cyl(0.8,0.8,0.05,16),0x20c997,sx,0.03,sz,0x0a6b50));
sign(g,'🌀 المتاهة',0,4.4,-8,'rgba(18,140,100,.92)');sign(g,'🏆 الهدف',gx,2.2,gz);sign(g,'🚩 البداية',sx,2.2,sz);
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
const rng2=mulberry(mz.walls.length*7+3);for(let i=0;i<6;i++){const m=mesh(G.sph(0.2,8),0xffd43b,o+C/2+Math.floor(rng2()*N)*C,0.5,o+C/2+Math.floor(rng2()*N)*C,0xaa8800);m.userData.keep=true;room.group.add(m);mz.pick.push(m)}
toast('🌀 المتاهة تتغير كل يوم! وصّل للكأس الدهبي بأسرع وقت',3200)
}
function mazeCollide(p){if(!mz||!room||room.type!=='maze')return;const r=0.32;for(const w of mz.walls){const cx=Math.max(w[0],Math.min(p.x,w[2])),cz=Math.max(w[1],Math.min(p.z,w[3]));const dx=p.x-cx,dz=p.z-cz,d=Math.hypot(dx,dz);if(d<r){if(d>0.0001){p.x=cx+dx/d*r;p.z=cz+dz/d*r}else{const px=Math.min(p.x-w[0],w[2]-p.x),pz=Math.min(p.z-w[1],w[3]-p.z);if(px<pz)p.x+=(p.x<(w[0]+w[2])/2?-1:1)*(px+r);else p.z+=(p.z<(w[1]+w[3])/2?-1:1)*(pz+r)}}}}
function mazeTick(dt){if(!room||room.type!=='maze'){mz=null;return}if(!mz||!player)return;const p=player.root.position;if(!mz.init){mz.init=true;p.set(mz.sx,0,mz.sz);walkTarget=null}
for(let k=mz.pick.length-1;k>=0;k--){const m=mz.pick[k];m.rotation.y+=dt*2;if(Math.hypot(p.x-m.position.x,p.z-m.position.z)<0.8){room.group.remove(m);mz.pick.splice(k,1);me.coins+=1;updCoins();saveMe();sfx('chat');burst(m.position,0xffd43b,5)}}
if(mz.done)return;const h=chestHud();if(!mz.run){if(Math.hypot(p.x-mz.sx,p.z-mz.sz)>1.6){mz.run=true;mz.t=0;toast('⏱ بدأ العد! وصّل للكأس',1800)}return}
mz.t+=dt;h.style.display='block';h.textContent='🌀 ⏱ '+mz.t.toFixed(1);if(Math.hypot(p.x-mz.gx,p.z-mz.gz)<0.9){mz.done=true;mz.run=false;const t=today();if(!me.mzd||me.mzd.d!==t)me.mzd={d:t,n:0};const fast=mz.t<45;const pay=me.mzd.n<3?(10+(fast?5:0)):0;if(pay)me.mzd.n++;me.mazes=(me.mazes||0)+1;me.mzBest=me.mzBest?Math.min(me.mzBest,mz.t):mz.t;me.coins+=pay;updCoins();saveMe();sfx('win');burst(p,0xffd43b,24);toast('🏆 خلصت المتاهة في '+mz.t.toFixed(1)+' ثانية'+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)')+' · أفضل وقت '+me.mzBest.toFixed(1),4500);chestUpd();setTimeout(()=>{if(mz)mz.done=false,mz.run=false,mz.init=false},3000)}}
let fride=null,carou=null,cpts=null;
const cpos=t=>{const a=t*6.2832;return[5.2*Math.cos(a),1.6+1.1*Math.sin(3*a)+0.7*Math.sin(a),-1.5+4.2*Math.sin(a)]};
function buildFun(){
interacts=[];fride=null;const g=indoor(0x6b8f3c,0x4a6b8a,0xff922b);
const pts=[];for(let i=0;i<=80;i++){const p=cpos(i/80);pts.push(new THREE.Vector3(p[0],p[1],p[2]))}
const curve=new THREE.CatmullRomCurve3(pts,true);const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,120,0.09,5,true),new THREE.MeshLambertMaterial({color:0xe03131}));tube.userData.keep=true;g.add(tube);
for(let i=0;i<24;i++){const p=cpos(i/24);g.add(mesh(G.cyl(0.05,0.05,p[1],5),0x868e96,p[0],p[1]/2,p[2]))}
g.add(mesh(G.box(1.6,0.2,1),0xffd43b,5.2,0.1,-1.5+0.8),mesh(G.box(0.1,1.2,0.1),0x343a40,4.3,0.7,0.4));
sign(g,'🎢 ركوب الأفعوانية',5.2,2.4,1.8);interacts.push({x:5.2,z:2.4,label:'🎢 اركب الأفعوانية (٢٨ ثانية)',fn:()=>startFun('coaster')});
const cr=new THREE.Group();cr.position.set(-4.2,0,-3.6);cr.add(mesh(G.cyl(2.2,2.2,0.2,18),0xf783ac,0,0.1,0,0x661133),mesh(G.cyl(0.18,0.18,2.6,8),0xffd43b,0,1.4,0,0x886600),mesh(G.cone(2.5,0.9,18),0xe64980,0,3.1,0));const hs=[];for(let i=0;i<6;i++){const a=i/6*6.283,h=new THREE.Group();h.position.set(Math.cos(a)*1.5,0.7,Math.sin(a)*1.5);h.add(mesh(G.box(0.7,0.4,0.3),[0xf8f9fa,0xffd43b,0x74c0fc][i%3],0,0.4,0),mesh(G.box(0.2,0.4,0.2),0xf8f9fa,0.33,0.7,0),mesh(G.cyl(0.03,0.03,1.8,4),0xffd43b,0,0.9,0));hs.push(h);cr.add(h)}g.add(cr);carou={g:cr,hs};
sign(g,'🎠 الدوّامة',-4.2,3.7,-3.6);interacts.push({x:-4.2,z:-1.3,label:'🎠 اركب الدوّامة (١٥ ثانية)',fn:()=>startFun('carousel')});
for(const[x,z,c]of[[-6,3,0xff6b6b],[-6,5,0x4dabf7],[6,5.5,0xffd43b]]){const b=new THREE.Group();b.position.set(x,0,z);b.add(mesh(G.cyl(0.04,0.04,1.4,4),0x868e96,0,0.7,0),mesh(G.sph(0.35,8),c,0,1.7,0,c));g.add(b)}
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));sign(g,'🎢 الملاهي',0,4.4,-6.6,'rgba(230,119,0,.92)');
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('🎢 الملاهي! اركب الأفعوانية أو الدوّامة',3000)
}
function startFun(kind){if(fride||!room||room.type!=='fun')return;const t=today();if(!me.fud||me.fud.d!==t)me.fud={d:t,n:0};fride={k:kind,t:0,dur:kind==='coaster'?28:15};walkTarget=null;sfx('star');toast(kind==='coaster'?'🎢 ماسك كويس! يلا بينا':'🎠 دوّامة!',2200)}
function endFun(ok){if(!fride)return;const r=fride;fride=null;if(!ok||!room||room.type!=='fun')return;const t=today();if(!me.fud||me.fud.d!==t)me.fud={d:t,n:0};const pay=me.fud.n<6?(r.k==='coaster'?5:3):0;if(pay)me.fud.n++;me.funRides=(me.funRides||0)+1;me.coins+=pay;player.root.position.set(r.k==='coaster'?5.2:-4.2,0,r.k==='coaster'?2.4:-1.3);updCoins();saveMe();sfx('win');toast('🎉 رحلة حلوة! '+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)'),3000)}
function funTick(dt){if(carou&&room&&room.type==='fun'){carou.g.rotation.y+=dt*(fride&&fride.k==='carousel'?1.2:0.4);carou.hs.forEach((h,i)=>h.position.y=0.7+Math.sin(tClock*3+i)*0.2)}if(!fride)return;if(!room||room.type!=='fun'){fride=null;return}const p=player.root.position;fride.t+=dt;const h=chestHud();h.style.display='block';h.textContent=(fride.k==='coaster'?'🎢':'🎠')+' ⏱ '+Math.max(0,Math.ceil(fride.dur-fride.t));walkTarget=null;
if(fride.k==='coaster'){const u=(fride.t/fride.dur)*2%1,q=cpos(u),q2=cpos((u+0.01)%1);p.set(q[0],q[1]+0.25,q[2]);player.yaw=Math.atan2(q2[0]-q[0],q2[2]-q[2])}else{const a=fride.t*1.2+0.0;p.set(-4.2+Math.cos(a)*1.5,0.9+Math.sin(tClock*3)*0.2,-3.6+Math.sin(a)*1.5);player.yaw=-a}
if(fride.t>=fride.dur)endFun(true)}
let showCur=null,myShow=null,showVoted='';
function buildShow(){
interacts=[];showCur=null;myShow=null;const g=indoor(0x4a2545,0x35203a,0xf06595);
g.add(mesh(G.box(3,0.3,10),0xf8f9fa,0,0.15,-1.5),mesh(G.box(3.2,0.08,0.3),0xf06595,0,0.32,-6.4,0xf06595),mesh(G.box(6,0.4,1.4),0x212529,0,0.2,-6.6));
for(let i=0;i<7;i++){g.add(mesh(G.box(0.12,0.05,0.5),0xf06595,-1.1,0.32,-5.8+i*1.3,0xaa3366),mesh(G.box(0.12,0.05,0.5),0xf06595,1.1,0.32,-5.8+i*1.3,0xaa3366))}
for(const x of[-4.5,4.5]){for(let j=0;j<3;j++)g.add(mesh(G.box(1.4,0.5,0.7),0xc2255c,x,0.25,-1+j*2),mesh(G.box(1.4,0.5,0.15),0xc2255c,x+(x<0?-0.55:0.55),0.7,-1+j*2))}
for(const x of[-2.2,2.2]){const L=new THREE.PointLight(0xffe3f0,1.2,9);L.position.set(x,4,-3);g.add(L);g.add(mesh(G.cone(0.4,0.8,8),0x343a40,x,4,-3))}
sign(g,'👗 عرض الأزياء',0,4.4,-6.6,'rgba(194,37,92,.92)');sign(g,'🌟 اعرض إطلالتك',0,2.4,2.4);interacts.push({x:0,z:3.4,label:'🌟 اعرض إطلالتك على المنصة',fn:startShow});
sign(g,'❤️ صوّت',-5.8,2.4,2.8);interacts.push({x:-5.8,z:3.6,label:'❤️ صوّت للعارض الحالي',fn:castVote});
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('👗 عرض الأزياء! اطلع على المنصة أو صوّت للعارضين',3000)
}
function startShow(){if(myShow||!room||room.type!=='show')return;const t=today();if(!me.fsd||me.fsd.d!==t)me.fsd={d:t,n:0,v:0};myShow={t:0,votes:0,voters:{}};walkTarget=null;pub({t:'fs',i:me.id,n:me.name});toast('🌟 يلا على المنصة! الناس هتصوتلك',2800);sfx('star')}
function showIn(m,r){showCur={id:m.i,n:str(m.n,14)||r.name,until:Date.now()+16000};showVoted='';toast('🌟 '+showCur.n+' بيعرض إطلالته! روح عند "صوّت"',3500);sfx('chat')}
function voteIn(m){if(!myShow||m.to!==me.id||myShow.voters[m.i])return;myShow.voters[m.i]=1;myShow.votes++;toast('❤️ '+(str(m.n,14)||'حد')+' صوّتلك! ('+myShow.votes+')',1800);sfx('chat');burst(player.root.position,0xff6b9d,8)}
function castVote(){if(!showCur||Date.now()>showCur.until){toast('مفيش عارض دلوقتي، استنى حد يطلع على المنصة');return}if(showCur.id===me.id)return;if(showVoted===showCur.id+showCur.until){toast('صوّتّ خلاص');return}showVoted=showCur.id+showCur.until;pub({t:'fv',i:me.id,n:me.name,to:showCur.id});const t=today();if(!me.fsd||me.fsd.d!==t)me.fsd={d:t,n:0,v:0};let msg='❤️ صوّتّ لـ '+showCur.n;if(me.fsd.v<10){me.fsd.v++;me.coins+=1;updCoins();saveMe();msg+=' +1🪙'}sfx('star');toast(msg,2200)}
function endShow(){const s=myShow;myShow=null;if(!s)return;const t=today();if(!me.fsd||me.fsd.d!==t)me.fsd={d:t,n:0,v:0};const pay=me.fsd.n<5?Math.min(2+s.votes*3,26):0;if(pay)me.fsd.n++;me.shows=(me.shows||0)+1;me.showVotes=(me.showVotes||0)+s.votes;me.coins+=pay;player.root.position.set(0,0,3.4);player.yaw=Math.PI;updCoins();saveMe();sfx('win');player.emote('🌟');toast('🌟 عرضك خلص! '+s.votes+' صوت'+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)'),3600)}
function showTick(dt){if(!room||room.type!=='show'){myShow=null;return}if(!myShow||!player)return;myShow.t+=dt;const u=myShow.t/10,p=player.root.position;walkTarget=null;if(u<0.5){p.set(0,0.35,2.2-u*2*8.2);player.yaw=Math.PI}else if(u<0.7){p.set(0,0.35,-6);player.yaw=(u-0.5)*5*6.283}else if(u<1){p.set(0,0.35,-6+(u-0.7)/0.3*8.4);player.yaw=0}if(myShow.t>4.5&&myShow.t<4.7)player.emote('😎');if(myShow.t>6&&!myShow.p){myShow.p=1;player.emote('💃')}const h=chestHud();h.style.display='block';h.textContent='🌟 ❤️ '+myShow.votes+' · ⏱ '+Math.max(0,Math.ceil(10-myShow.t));if(myShow.t>=10)endShow()}
const CROPS=[['🥕','جزر',2,90,6,0xff922b],['🍅','طماطم',4,180,12,0xe03131],['🎃','قرع',8,360,26,0xf08c00]];
let plots=[];
function farmData(){me.farm=me.farm||[null,null,null,null,null,null];return me.farm}
function buildFarm(){
interacts=[];plots=[];const g=indoor(0x6b4f2a,0x8fbf6a,0x82c91e);
g.add(mesh(G.box(16,0.05,16),0x5aa85c,0,0.01,0));
for(let i=0;i<6;i++){const x=-4+(i%3)*4,z=-3.5+Math.floor(i/3)*4.2;g.add(mesh(G.box(2.6,0.25,2.2),0x5d3a1a,x,0.12,z));g.add(mesh(G.box(2.3,0.05,1.9),0x3e2410,x,0.26,z));
const it={x,z:z+1.7,label:'🌱 قطعة أرض',fn:()=>plotAct(i)};interacts.push(it);plots.push({i,x,z,it,m:null})}
g.add(mesh(G.box(0.2,1.4,0.2),0x8d6e63,6.4,0.7,5.5),mesh(G.box(1.4,0.6,0.1),0xf8f0e3,6.4,1.4,5.5),mesh(G.box(0.1,1.2,0.1),0x8d6e63,5.8,0.6,5.5));
sign(g,'🚜 المزرعة',0,4.4,-6.6,'rgba(70,140,20,.92)');sign(g,'🌾 ازرع واستنى تكبر وبعدين احصد',0,3.2,-5.3);
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
farmRefresh();toast('🚜 المزرعة! الزرع بيكبر حتى وانت بره',3000)
}
function farmRefresh(){if(!room||room.type!=='farm')return;const d=farmData();for(const p of plots){const pl=d[p.i];if(p.m){room.group.remove(p.m);p.m=null}if(!pl)continue;const c=CROPS[pl.c];const u=Math.min(1,(Date.now()-pl.t)/(c[3]*1000));const m=new THREE.Group();m.position.set(p.x,0.3,p.z);const sc=0.25+u*0.75;for(let k=0;k<4;k++){const a=k*1.57+0.4;const cr=u>=1?mesh(G.sph(0.22*sc+0.08,8),c[5],Math.cos(a)*0.55,0.2*sc,Math.sin(a)*0.55,c[5]):mesh(G.cone(0.1,0.5*sc+0.1,5),0x2f9e44,Math.cos(a)*0.55,0.25*sc,Math.sin(a)*0.55);cr.userData.keep=true;m.add(cr)}room.group.add(m);p.m=m}}
function plotAct(i){const d=farmData(),pl=d[i];if(!pl){modal(c=>{c.innerHTML='<h2>🌱 اختار بذرة</h2><div id="sd"></div><div class="row"><button class="btn d" id="sx">إلغاء</button></div>';CROPS.forEach((cr,k)=>{const b=document.createElement('button');b.className='btn o';b.style.cssText='display:block;width:100%;margin:6px 0';b.textContent=cr[0]+' '+cr[1]+' · '+cr[2]+'🪙 · '+Math.round(cr[3]/60*10)/10+' دقيقة · تكسب '+cr[4]+'🪙';b.onclick=()=>{if(me.coins<cr[2]){toast('محتاج '+cr[2]+' عملة');return}me.coins-=cr[2];d[i]={c:k,t:Date.now()};updCoins();saveMe();sfx('chat');closeModal();farmRefresh();toast('🌱 زرعت '+cr[1])};$('sd').appendChild(b)});$('sx').onclick=closeModal});return}
const c=CROPS[pl.c],left=c[3]-(Date.now()-pl.t)/1000;if(left>0){toast(c[0]+' لسه بيكبر... فاضل '+Math.ceil(left)+' ثانية');return}
const t=today();if(!me.fmd||me.fmd.d!==t)me.fmd={d:t,n:0};const pay=me.fmd.n<15?c[4]:0;if(pay)me.fmd.n++;d[i]=null;me.harv=(me.harv||0)+1;me.coins+=pay;updCoins();saveMe();sfx('star');burst(new THREE.Vector3(plots[i].x,0.5,plots[i].z),c[5],12);farmRefresh();toast('🧺 حصدت '+c[1]+' '+c[0]+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)'),2800)}
function farmTick(dt){if(!room||room.type!=='farm'||!plots.length)return;const d=farmData();for(const p of plots){const pl=d[p.i];if(!pl)p.it.label='🌱 ازرع بذرة';else{const c=CROPS[pl.c],left=c[3]-(Date.now()-pl.t)/1000;p.it.label=left>0?c[0]+' بيكبر · '+Math.ceil(left)+'ث':'🧺 احصد '+c[0]+' (+'+c[4]+'🪙)';if(p.m&&p.ready!==(left<=0)){p.ready=left<=0;farmRefresh()}}}if(!farmTick.t||tClock-farmTick.t>5){farmTick.t=tClock;farmRefresh()}}
const NOTES=[262,294,330,349,392,440,494,523];let studioNotes=0,lastNoteSent=0;
function playNote(ins,k){if(me&&me.mute)return;try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);if(ins===0){o.type='triangle';o.frequency.value=NOTES[k];g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.25,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+0.7);o.start(t);o.stop(t+0.75)}else if(ins===1){o.type='sine';o.frequency.setValueAtTime([140,200,300,420][k%4]*(k>3?1.8:1),t);o.frequency.exponentialRampToValueAtTime(40,t+0.18);g.gain.setValueAtTime(0.4,t);g.gain.exponentialRampToValueAtTime(0.0001,t+0.22);o.start(t);o.stop(t+0.25)}else{o.type='sine';o.frequency.value=NOTES[k]*2;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.18,t+0.005);g.gain.exponentialRampToValueAtTime(0.0001,t+1.2);o.start(t);o.stop(t+1.25)}}catch(e){}}
function noteIn(m,r){const ins=num(m.s,0,2)|0,k=num(m.k,0,7)|0;playNote(ins,k);r.emote(['🎹','🥁','🔔'][ins])}
const FISH=[['🐟','سردين',1,60],['🐠','بلطي',1,60],['🐡','نفّاخ',2,40],['🦑','حبار',3,25],['🦈','قرش صغير',5,10],['🐙','أخطبوط',4,15],['🐋','حوت ذهبي',12,3]];
let fishSt=null,bobber=null,fishDock=null,fishTank=null;
function fishData(){me.fish=me.fish||{};return me.fish}
function buildFish(){
interacts=[];fishSt={s:'idle',t:0,w:0};const g=new THREE.Group();
g.add(mesh(G.box(40,0.2,40),0x1971c2,0,-0.3,-12,0x0a3d73),mesh(G.box(16,0.3,5),0xcfa95f,0,-0.15,5.5));
g.add(mesh(G.box(3,0.2,9),0x8d6e63,0,0.25,-2.2));
for(let i=0;i<5;i++)g.add(mesh(G.cyl(0.14,0.14,1.2,6),0x5c3d1e,-1.4,0,-6+i*1.9),mesh(G.cyl(0.14,0.14,1.2,6),0x5c3d1e,1.4,0,-6+i*1.9));
g.add(mesh(G.sph(2.2,14),0xffa94d,-6,5.5,-26,0xff6b1a));
const lh=new THREE.Group();lh.position.set(5.5,0,-6);lh.add(mesh(G.cyl(0.5,0.9,3.4,8),0xf8f9fa,0,1.7,0),mesh(G.cyl(0.52,0.52,0.5,8),0xe03131,0,1.2,0),mesh(G.cyl(0.55,0.55,0.5,8),0xe03131,0,2.4,0),mesh(G.cone(0.7,0.7,8),0x343a40,0,3.7,0),mesh(G.sph(0.3,8),0xffd43b,0,3.45,0,0xffd43b));g.add(lh);
const bt=new THREE.Group();bt.position.set(-4.5,0,-4);bt.add(mesh(G.box(2.4,0.4,1),0x1c7ed6,0,0.1,0),mesh(G.cyl(0.04,0.04,1.8,5),0x5c3d1e,0,1.1,0),mesh(G.box(0.05,1.1,0.9),0xf8f9fa,0.1,1.3,0));g.add(bt);
sign(g,'🎣 ميناء الصيد',0,4.4,-4.5,'rgba(25,113,194,.92)');sign(g,'🐟 ارمي السنارة واستنى السمكة تسحب',0,3.2,-0.8);
interacts.push({x:0,z:-1.6,label:'🎣 ارمي السنارة',fn:fishAct,_fish:1});fishDock=interacts[0];
interacts.push({x:-3.5,z:1.5,label:'📖 كتالوج السمك',fn:openFishBook});
sign(g,'📖 كتالوج',-3.5,2.4,0.4);
bobber=new THREE.Group();bobber.add(mesh(G.sph(0.2,8),0xff4757,0,0,0),mesh(G.sph(0.14,8),0xf8f9fa,0,0.18,0));bobber.visible=false;
{const tk=new THREE.Group();tk.position.set(4.6,0,1.5);const gl=mesh(G.box(2.6,1.6,1.4),0x74c0fc,0,1.2,0);gl.material=gl.material.clone();gl.material.transparent=true;gl.material.opacity=0.28;tk.add(mesh(G.box(2.8,0.3,1.6),0x5c3d1e,0,0.15,0),gl,mesh(G.box(2.6,0.12,1.4),0xe6c27a,0,0.5,0));g.add(tk);sign(g,'🐠 حوض السمك بتاعك',4.6,3.1,1.5);
fishTank=new THREE.Group();fishTank.position.copy(tk.position);const d=fishData();const cols=[0xadb5bd,0xffa94d,0x69db7c,0xb197fc,0x4dabf7,0xff6b6b,0xffd43b];let n=0;
for(let k=0;k<FISH.length;k++){const c=Math.min(2,d[k]||0);for(let j=0;j<c&&n<12;j++,n++){const f=new THREE.Group();f.add(mesh(G.sph(0.17,8),cols[k],0,0,0),mesh(G.cone(0.12,0.25,4),cols[k],-0.22,0,0));f.children[0].scale.set(1.5,1,0.6);f.children[1].rotation.z=Math.PI/2;f.userData={a:Math.random()*6.28,s:0.5+Math.random()*0.6,y:0.8+Math.random()*0.8,r:0.4+Math.random()*0.5};fishTank.add(f)}}
if(!n)sign(g,'اصطد سمك عشان يظهر هنا',4.6,2.4,1.5)}
g.add(portalMesh('ارجع للشاطئ',0,7.2,0xff8787,'beach'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(fishTank);
g.add(bobber);
toast('🎣 ميناء الصيد! ارمي السنارة وشد لما تسحب',3200)
}
function fishAct(){const F=fishSt;if(!F)return;
if(F.s==='idle'){F.s='wait';F.t=0;F.w=1.8+Math.random()*3.5;bobber.visible=true;bobber.position.set(0,0.05,-6.4);sfx('place');toast('🎣 رميت السنارة... استنى',1500);return}
if(F.s==='wait'){F.s='idle';bobber.visible=false;toast('🙈 شديت بدري، السمكة هربت',1800);return}
if(F.s==='bite'){const d=fishData();let r=Math.random()*153,k=0;for(let i=0;i<FISH.length;i++){r-=FISH[i][3];if(r<=0){k=i;break}}
const f=FISH[k];d[k]=(d[k]||0)+1;me.fishN=(me.fishN||0)+1;const t=today();if(!me.fdd||me.fdd.d!==t)me.fdd={d:t,c:0};let pay=0;if(me.fdd.c<40){pay=Math.min(f[2],40-me.fdd.c);me.fdd.c+=pay}
me.coins+=pay;updCoins();saveMe();sfx('star');burst(new THREE.Vector3(0,1,-6.4),[0x74c0fc,0xffffff,0xffd43b],14);
toast('🎉 اصطدت '+f[0]+' '+f[1]+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)'),2800);F.s='idle';bobber.visible=false;F.last=k;return}
}
function fishTick(dt){if(!room||room.type!=='fish'||!fishSt)return;const F=fishSt;F.t+=dt;if(fishTank)for(const f of fishTank.children){const u=f.userData;u.a+=dt*u.s;f.position.set(Math.cos(u.a)*u.r*1.8,u.y+Math.sin(u.a*2)*0.1,Math.sin(u.a)*u.r*0.8);f.rotation.y=-u.a-Math.PI/2*0}
if(F.s==='idle'){fishDock.label='🎣 ارمي السنارة'}
else if(F.s==='wait'){fishDock.label='⏳ استنى السحبة... (شد بدري = تهرب)';bobber.position.y=0.05+Math.sin(tClock*3)*0.03;if(F.t>F.w){F.s='bite';F.t=0;sfx('err');toast('❗ سحب! شد دلوقتي!',1200)}}
else if(F.s==='bite'){fishDock.label='❗❗ شد دلوقتي!';bobber.position.y=-0.1+Math.sin(tClock*40)*0.08;if(F.t>1.4){F.s='idle';bobber.visible=false;toast('😅 السمكة هربت، حاول تاني',1800)}}
}
function openFishBook(){modal(c=>{const d=fishData();let h='<h2>📖 كتالوج السمك</h2><div style="text-align:center;font-size:15px">';let n=0;FISH.forEach((f,k)=>{const got=d[k]||0;if(got)n++;h+='<div style="margin:6px 0">'+(got?f[0]+' '+f[1]+' × '+got:'❔ لسه ما اصطدتش')+'</div>'});h+='<div style="margin-top:8px">'+n+' / '+FISH.length+' أنواع · إجمالي: '+(me.fishN||0)+'</div></div><div class="row"><button class="btn d" id="fx">إغلاق</button></div>';c.innerHTML=h;$('fx').onclick=()=>{$('modal').style.display='none'}})}
const GOLF=[{n:1,par:2,s:[0,5],h:[0,-5],w:[[-3,-1,2.5,0.5]]},{n:2,par:3,s:[-5,5],h:[5,-5],w:[[-1,0,0.5,3],[2,-3,3,0.5]]},{n:3,par:4,s:[5,5],h:[-5,-5],w:[[-3,2,4,0.5],[1,-1,4,0.5],[-6,-3,0.5,2.5]]}];
let gf=null,gArrow=null,gBall=null,gHole=null,gWalls=[],gIt=null;
function buildGolf(){
interacts=[];const g=indoor(0x1d4d2b,0x2f7d46,0x69db7c);
g.add(mesh(G.box(15,0.06,15),0x37b24d,0,0.02,0));
gf={hole:0,strokes:0,tot:[],v:null,state:'aim',ang:0,pow:5};
sign(g,'⛳ الميني جولف',0,4.4,-6.8,'rgba(47,158,68,.92)');
gHole=mesh(G.cyl(0.4,0.4,0.05,16),0x111111,0,0.06,0);const fl=new THREE.Group();fl.add(mesh(G.cyl(0.03,0.03,1.6,5),0xf8f9fa,0,0.8,0),mesh(G.box(0.6,0.35,0.03),0xe03131,0.3,1.45,0));gHole.add(fl);g.add(gHole);
gBall=mesh(G.sph(0.2,10),0xffffff,0,0.22,0);g.add(gBall);
gArrow=mesh(G.cone(0.25,0.7,6),0xffd43b,0,0.3,0,0xffaa00);gArrow.rotation.x=-Math.PI/2;g.add(gArrow);
gIt={x:0,z:0,label:'⛳ اضرب الكورة',fn:golfOpen};interacts.push(gIt);
gf.grp=new THREE.Group();g.add(gf.grp);
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
g.add(gf.grp);
golfLoad(0);toast('⛳ ميني جولف! 3 حفر، قلّل الضربات',3000)
}
function golfLoad(i){const H=GOLF[i];gf.hole=i;gf.strokes=0;gf.v=null;gf.state='aim';gf.ang=0;while(gf.grp.children.length)gf.grp.remove(gf.grp.children[0]);gWalls=[];
for(const w of H.w){gWalls.push(w);gf.grp.add(mesh(G.box(w[2],0.6,w[3]),0x8d6e63,w[0]+w[2]/2,0.3,w[1]+w[3]/2))}
gBall.position.set(H.s[0],0.22,H.s[1]);gHole.position.set(H.h[0],0.06,H.h[1]);golfAim();gf.fn=0}
function golfAim(){const H=GOLF[gf.hole];const dx=H.h[0]-gBall.position.x,dz=H.h[1]-gBall.position.z;gf.base=Math.atan2(dx,dz);const a=gf.base+gf.ang*Math.PI/180;gf.dir=[Math.sin(a),Math.cos(a)];gArrow.visible=gf.state==='aim';gArrow.position.set(gBall.position.x+gf.dir[0]*1,0.3,gBall.position.z+gf.dir[1]*1);gArrow.rotation.set(Math.PI/2,0,0);gArrow.rotation.order='YXZ';gArrow.rotation.y=a}
function golfOpen(){if(!gf||gf.state!=='aim')return;const H=GOLF[gf.hole];modal(c=>{c.innerHTML='<h2>⛳ حفرة '+H.n+' · بار '+H.par+'</h2><div style="text-align:center">ضربات: <b id="gs">'+gf.strokes+'</b></div><div style="margin:8px 0">🧭 الاتجاه<input type="range" id="ga" min="-60" max="60" value="'+gf.ang+'" style="width:100%"></div><div style="margin:8px 0">💪 القوة<input type="range" id="gp" min="1" max="10" value="'+gf.pow+'" style="width:100%"></div><div class="row"><button class="btn g" id="gh">⛳ اضرب</button><button class="btn d" id="gx">إلغاء</button></div>';
$('ga').oninput=e=>{gf.ang=+e.target.value;golfAim()};$('gp').oninput=e=>{gf.pow=+e.target.value};$('gx').onclick=()=>{$('modal').style.display='none'};$('gh').onclick=()=>{$('modal').style.display='none';golfHit()}})}
function golfHit(){if(!gf||gf.state!=='aim')return;golfAim();gf.strokes++;gf.state='roll';const sp=2+gf.pow*1.5;gf.v=[gf.dir[0]*sp,gf.dir[1]*sp];gArrow.visible=false;sfx('place')}
function golfTick(dt){if(!room||room.type!=='golf'||!gf)return;gIt.x=gBall.position.x;gIt.z=gBall.position.z+1.2;gIt.label=gf.state==='aim'?'⛳ اضرب (ضربة '+(gf.strokes+1)+') · حفرة '+(gf.hole+1):'⏳ الكورة بتتحرك...';
if(gf.state!=='roll'||!gf.v)return;const H=GOLF[gf.hole],n=4;for(let k=0;k<n;k++){const d=dt/n,p=gBall.position;let nx=p.x+gf.v[0]*d,nz=p.z+gf.v[1]*d;
if(nx<-7||nx>7){gf.v[0]*=-0.8;nx=clamp(nx,-7,7)}if(nz<-7||nz>7){gf.v[1]*=-0.8;nz=clamp(nz,-7,7)}
for(const w of gWalls){const x0=w[0]-0.2,x1=w[0]+w[2]+0.2,z0=w[1]-0.2,z1=w[1]+w[3]+0.2;if(nx>x0&&nx<x1&&nz>z0&&nz<z1){const ox=Math.min(nx-x0,x1-nx),oz=Math.min(nz-z0,z1-nz);if(ox<oz){gf.v[0]*=-0.8;nx=p.x}else{gf.v[1]*=-0.8;nz=p.z}sfx('tick')}}
p.x=nx;p.z=nz;const sp=Math.hypot(gf.v[0],gf.v[1]);const hd=Math.hypot(nx-H.h[0],nz-H.h[1]);if(hd<0.55&&sp<8){golfSink();return}}
const f=Math.max(0,1-1.1*dt);gf.v[0]*=f;gf.v[1]*=f;if(Math.hypot(gf.v[0],gf.v[1])<0.35){gf.v=null;gf.state='aim';golfAim();if(gf.strokes>=8){golfSink(true)}}}
function golfSink(forced){const H=GOLF[gf.hole];gf.state='done';gf.v=null;gBall.position.set(H.h[0],0.05,H.h[1]);sfx('win');burst(new THREE.Vector3(H.h[0],0.8,H.h[1]),[0xffd43b,0xffffff,0x69db7c],16);
const st=forced?8:gf.strokes;gf.tot.push(st);const t=today();if(!me.gfd||me.gfd.d!==t)me.gfd={d:t,c:0};let pay=Math.max(1,H.par+3-st);if(forced)pay=0;pay=Math.min(pay,30-me.gfd.c);if(pay<0)pay=0;me.gfd.c+=pay;me.coins+=pay;updCoins();
toast((st===1?'🏆 هول إن وان! ':'✅ دخلت في '+st+' ضربات ')+(pay?'+'+pay+'🪙':''),2600);
if(gf.hole<2){setTimeout(()=>{if(room&&room.type==='golf')golfLoad(gf.hole+1)},1800)}else{const tot=gf.tot.reduce((a,b)=>a+b,0);me.golfRounds=(me.golfRounds||0)+1;if(!me.golfBest||tot<me.golfBest)me.golfBest=tot;saveMe();setTimeout(()=>{if(!room||room.type!=='golf')return;modal(c=>{c.innerHTML='<h2>🏁 خلصت الجولة!</h2><div style="text-align:center;font-size:16px">الحفر: '+gf.tot.join(' · ')+'<br>المجموع: <b>'+tot+'</b> (بار 9)<br>أحسن نتيجة: '+me.golfBest+'</div><div class="row"><button class="btn g" id="ga2">🔁 جولة جديدة</button><button class="btn d" id="gx2">إغلاق</button></div>';$('ga2').onclick=()=>{$('modal').style.display='none';gf.tot=[];golfLoad(0)};$('gx2').onclick=()=>{$('modal').style.display='none'}})},1800)}
saveMe()}
let hp=null,hpBall=null,hpHoop=null,hpIt=null;
function buildHoops(){
interacts=[];const g=indoor(0x2b2f3a,0x364156,0xff922b);
g.add(mesh(G.box(15,0.06,15),0xc97b3c,0,0.02,0),mesh(G.box(0.2,0.02,15),0xffffff,0,0.06,0),mesh(G.cyl(2,2,0.02,24),0xe8590c,0,0.07,-1));
g.add(mesh(G.box(0.25,5,0.25),0x495057,0,2.5,-6.6),mesh(G.box(3,1.8,0.12),0xf8f9fa,0,5.1,-6.4),mesh(G.box(1.2,0.9,0.05),0xe03131,0,4.9,-6.32));
hpHoop=mesh(G.cyl(0.55,0.55,0.05,16),0xff6b00,0,4.4,-5.6,0xff4400);g.add(hpHoop);
const net=mesh(G.cyl(0.5,0.3,0.6,10),0xf1f3f5,0,4.05,-5.6);net.material=net.material.clone();net.material.transparent=true;net.material.opacity=0.45;g.add(net);
sign(g,'🏀 تحدي السلة',0,6.6,-6.6,'rgba(232,89,12,.92)');sign(g,'⏱️ ٣٠ ثانية، اضغط اشوت في المنتصف',0,2.4,-0.5);
hp={s:'idle',t:0,sc:0,sh:0,sw:0,m:0.5,fly:null};hpBall=mesh(G.sph(0.35,12),0xff7f27,0,0.4,1.8);g.add(hpBall);
hpIt={x:0,z:3,label:'🏀 ابدأ التحدي',fn:hoopAct};interacts.push(hpIt);
g.add(portalMesh('ارجع للملعب',0,7.2,0xff8787,'park'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
g.add(hpBall,hpHoop);
toast('🏀 تحدي السلة! أحسن نتيجة بتتسجل',3000)
}
function hoopMeter(on){let e=$('hpm');if(!on){if(e)e.remove();return}if(!e){e=document.createElement('div');e.id='hpm';e.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:200px;width:220px;height:22px;border-radius:12px;background:linear-gradient(90deg,#e03131 0,#f08c00 25%,#2f9e44 40%,#2f9e44 60%,#f08c00 75%,#e03131 100%);border:2px solid #fff;z-index:30;pointer-events:none;direction:ltr';e.innerHTML='<div id="hpk" style="position:absolute;top:-6px;width:8px;height:30px;background:#fff;border-radius:4px;box-shadow:0 0 6px #000"></div><div id="hpt" style="position:absolute;top:-30px;left:0;right:0;text-align:center;font:bold 15px sans-serif;color:#fff;text-shadow:0 1px 3px #000"></div>';document.body.appendChild(e)}}
function hoopAct(){if(!hp)return;if(hp.s==='idle'){hp.s='play';hp.t=30;hp.sc=0;hp.sh=0;hp.sw=0;hoopMeter(true);sfx('win');toast('🏀 ابدأ! اشوت لما العلامة في الأخضر',1800);return}
if(hp.s==='play'&&!hp.fly){const d=Math.abs(hp.m-0.5);hp.sh++;let r=d<0.1?2:d<0.22?1:0;if(r===2)hp.sw++;hp.sc+=r;hp.fly={t:0,r,x0:0,z0:1.8};
if(r===2)toast('✨ سوووش! +2',700);else if(r===1)toast('🏀 دخلت +1',700);else toast('❌ ماجتش',700);}}
function hoopTick(dt){if(!room||room.type!=='hoops'||!hp)return;
if(hp.fly){const f=hp.fly;f.t+=dt/0.7;const u=Math.min(1,f.t),tx=f.r?0:(Math.random()<0.5?1:-1)*0.9,tz=-5.6;hpBall.position.set(tx*u*(f.r?0:1),0.4+(4.1-0.4)*u+Math.sin(u*Math.PI)*2.2,1.8+(tz-1.8)*u);if(u>=1){if(f.r){sfx('star');burst(new THREE.Vector3(0,4.2,-5.6),[0xffd43b,0xff7f27],8);hpBall.position.set(0,0.4,1.8)}else{sfx('err');hpBall.position.set(0,0.4,1.8)}hp.fly=null}}
if(hp.s==='play'){hp.t-=dt;hp.m=0.5+0.5*Math.sin(tClock*3.4+hp.sh*0.9);const k=$('hpk'),t=$('hpt');if(k)k.style.left=(hp.m*212)+'px';if(t)t.textContent='⏱️ '+Math.ceil(hp.t)+'  ·  🏀 '+hp.sc;hpIt.label='🏀 اشوت! ('+hp.sc+' نقطة)';if(hp.t<=0)hoopEnd()}else hpIt.label='🏀 ابدأ التحدي'+(me.hoopBest?' (أحسن: '+me.hoopBest+')':'')}
function hoopEnd(){hp.s='idle';hoopMeter(false);const sc=hp.sc;const t=today();if(!me.hpd||me.hpd.d!==t)me.hpd={d:t,c:0};let pay=Math.min(Math.floor(sc/2),25-me.hpd.c);if(pay<0)pay=0;me.hpd.c+=pay;me.coins+=pay;updCoins();const nb=!me.hoopBest||sc>me.hoopBest;if(nb)me.hoopBest=sc;me.hoopGames=(me.hoopGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>⏱️ خلص الوقت!</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · سووش: '+hp.sw+' من '+hp.sh+' تصويبة'+(nb?'<br>🏆 رقم قياسي جديد!':'<br>أحسن نتيجة: '+me.hoopBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="hx1">🔁 تاني</button><button class="btn d" id="hx2">إغلاق</button></div>';$('hx1').onclick=()=>{$('modal').style.display='none';hoopAct()};$('hx2').onclick=()=>{$('modal').style.display='none'}})}
let bw=null;
function buildBowl(){
interacts=[];const g=indoor(0x2a1b3d,0x3a2556,0xbe4bdb);
g.add(mesh(G.box(3.2,0.08,15),0xd9a35b,0,0.04,-0.5),mesh(G.box(0.5,0.1,15),0x343a40,-1.9,0.05,-0.5),mesh(G.box(0.5,0.1,15),0x343a40,1.9,0.05,-0.5),mesh(G.box(3.2,3,0.3),0x212529,0,1.5,-7.4));
for(let i=0;i<7;i++)g.add(mesh(G.cone(0.15,0.4,3),0x5c3d1e,-1.2+i*0.4,0.1,1.8));
sign(g,'🎳 البولينج',0,4.6,-7,'rgba(190,75,219,.92)');sign(g,'٥ أدوار · ٢ رمية في كل دور',0,3.4,-1);
bw={s:'idle',fr:1,ro:1,sc:0,down:0,pins:[],ball:mesh(G.sph(0.3,12),0x1c7ed6,0,0.35,4),ang:0,pow:7,hook:0,fly:null,hist:[]};g.add(bw.ball);
const rows=[[0],[-0.3,0.3],[-0.6,0,0.6],[-0.9,-0.3,0.3,0.9]];let k=0;rows.forEach((r,i)=>r.forEach(x=>{const m=new THREE.Group();m.add(mesh(G.cyl(0.1,0.16,0.6,8),0xf8f9fa,0,0.3,0),mesh(G.cyl(0.11,0.11,0.07,8),0xe03131,0,0.5,0),mesh(G.sph(0.11,8),0xf8f9fa,0,0.68,0));m.position.set(x,0,-5.2-i*0.5);bw.pins.push({m,x,z:-5.2-i*0.5,down:false,v:null});g.add(m);k++}));
bw.it={x:0,z:3,label:'🎳 ارمي الكورة',fn:bowlOpen};interacts.push(bw.it);
g.add(portalMesh('ارجع للأركيد',-5,4.8,0xff8787,'arcade'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
g.add(bw.ball,...bw.pins.map(p=>p.m));
toast('🎳 بولينج! 5 أدوار',2600)
}
function bowlReset(){for(const p of bw.pins){p.down=false;p.v=null;p.m.position.set(p.x,0,p.z);p.m.rotation.set(0,0,0)}}
function bowlOpen(){if(!bw||bw.s==='roll')return;modal(c=>{c.innerHTML='<h2>🎳 دور '+bw.fr+' · رمية '+bw.ro+'</h2><div style="text-align:center">النقاط: <b>'+bw.sc+'</b></div><div style="margin:8px 0">🧭 الاتجاه<input type="range" id="ba" min="-10" max="10" value="'+bw.ang+'" style="width:100%"></div><div style="margin:8px 0">🌀 الدوران<input type="range" id="bh" min="-10" max="10" value="'+bw.hook+'" style="width:100%"></div><div class="row"><button class="btn g" id="bg">🎳 ارمي</button><button class="btn d" id="bx">إلغاء</button></div>';
$('ba').oninput=e=>{bw.ang=+e.target.value};$('bh').oninput=e=>{bw.hook=+e.target.value};$('bx').onclick=()=>{$('modal').style.display='none'};$('bg').onclick=()=>{$('modal').style.display='none';bowlThrow()}})}
function bowlThrow(){if(!bw||bw.s==='roll')return;bw.s='roll';bw.fly={t:0};bw.fdown=0;sfx('place')}
function knock(p,dx,dz){if(p.down)return;p.down=true;bw.fdown++;p.v={x:dx*3+(Math.random()-0.5),z:dz*3-1,t:0,r:(Math.random()-0.5)*8};for(const q of bw.pins){if(!q.down&&Math.hypot(q.x-p.x,q.z-p.z)<0.75&&Math.random()<0.65)setTimeout(()=>{if(room&&room.type==='bowl')knock(q,(q.x-p.x),-0.5)},90)}}
function bowlTick(dt){if(!room||room.type!=='bowl'||!bw)return;
for(const p of bw.pins)if(p.v){p.v.t+=dt;p.m.position.x+=p.v.x*dt;p.m.position.z+=p.v.z*dt;p.m.rotation.z+=p.v.r*dt;p.m.rotation.x+=dt*4;if(p.v.t>0.6){p.m.position.y=-3;p.v=null}}
bw.it.label=bw.s==='roll'?'⏳ ...':'🎳 ارمي · '+bw.fr+'/5';
if(bw.fly){const f=bw.fly;f.t+=dt/1.1;const u=Math.min(1,f.t);const x=Math.sin(bw.ang*0.03)*u*10+bw.hook*0.05*u*u*10;const z=4-u*11.4;bw.ball.position.set(x,0.35,z);bw.ball.rotation.x-=dt*12;
if(Math.abs(x)<1.55)for(const p of bw.pins)if(!p.down&&Math.hypot(p.x-x,p.z-z)<0.5)knock(p,(p.x-x)*1.5,-0.4);
if(u>=1){bw.fly=null;const n=bw.fdown;bw.sc+=n;sfx(n>=1?'star':'err');toast(n===10-bw.down?'💥 ستريك!':n?'🎳 وقعت '+n:'😅 رمية في الجتر',1400);bw.down+=n;
setTimeout(()=>{if(!room||room.type!=='bowl')return;bw.ball.position.set(0,0.35,4);
if(bw.down>=10||bw.ro===2){const stk=bw.down>=10&&bw.ro===1;if(bw.down>=10)bw.sc+=stk?5:2;bw.hist.push(bw.down);bw.fr++;bw.ro=1;bw.down=0;bowlReset()}else bw.ro=2;
bw.s='idle';if(bw.fr>5)bowlEnd()},1000)}}}
function bowlEnd(){const sc=bw.sc,t=today();if(!me.bwd||me.bwd.d!==t)me.bwd={d:t,c:0};let pay=Math.min(Math.floor(sc/5),20-me.bwd.c);if(pay<0)pay=0;me.bwd.c+=pay;me.coins+=pay;updCoins();const nb=!me.bowlBest||sc>me.bowlBest;if(nb)me.bowlBest=sc;me.bowlGames=(me.bowlGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>🎳 خلصت اللعبة!</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.bowlBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="bz1">🔁 لعبة جديدة</button><button class="btn d" id="bz2">إغلاق</button></div>';$('bz1').onclick=()=>{$('modal').style.display='none';bw.fr=1;bw.ro=1;bw.sc=0;bw.down=0;bw.hist=[];bowlReset()};$('bz2').onclick=()=>{$('modal').style.display='none'}});bw.fr=1;bw.ro=1;bw.sc=0;bw.down=0;bw.hist=[];bowlReset()}
const WHEEL=[[5,0xff6b6b],[10,0x4dabf7],[5,0xffd43b],[25,0x9775fa],[5,0x69db7c],[15,0xff922b],[5,0xf783ac],[10,0x38d9a9]];
let wh=null;
function buildWheel(){
interacts=[];const g=indoor(0x3b1a4f,0x4a2466,0xffd43b);
const spin=new THREE.Group();spin.position.set(0,3.0,-5.6);const wheel=new THREE.Group();wheel.rotation.x=Math.PI/2;spin.add(wheel);
WHEEL.forEach((w,i)=>{const seg=new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,0.4,16,1,false,i*Math.PI/4,Math.PI/4),new THREE.MeshLambertMaterial({color:w[1]}));wheel.add(seg);
const c=i*Math.PI/4+Math.PI/8;const lb=labelSprite('+'+w[0],{s:1.6,bg:'rgba(0,0,0,.35)'});lb.position.set(Math.sin(c)*1.8,0.3,Math.cos(c)*1.8);wheel.add(lb)});
spin.add(mesh(G.cyl(0.35,0.35,0.5,12),0xffd43b,0,0,0.1,0xaa8800));spin.children[1].rotation.x=Math.PI/2;
g.add(spin);
const ptr=mesh(G.cone(0.4,0.9,3),0xe03131,0,5.9,-5.2,0x880000);ptr.rotation.z=Math.PI;g.add(ptr);
g.add(mesh(G.box(0.4,4,0.4),0x5c3d1e,-2.9,2,-6),mesh(G.box(0.4,4,0.4),0x5c3d1e,2.9,2,-6));
sign(g,'🎡 عجلة الحظ اليومية',0,7.0,-5.4,'rgba(151,117,250,.92)');sign(g,'لفّة مجانية كل يوم · الأيام المتتالية بتزود الجايزة',0,1.4,-2,'rgba(16,24,48,.85)');
wh={spin,t:0,s:'idle',from:0,to:0,res:0};
wh.it={x:0,z:-0.5,label:'🎡 لف العجلة',fn:wheelSpin};interacts.push(wh.it);
g.add(portalMesh('ارجع للكافيه',-5,5,0xff8787,'cafe'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(spin,ptr);
toast('🎡 عجلة الحظ! لفّة مجانية كل يوم',2800)
}
function wheelSpin(){if(!wh||wh.s==='spin')return;const t=today();if(me.whd===t){toast('🕐 لفّيت النهاردة، تعالى بكرة!',2200);return}
const i=Math.floor(Math.random()*WHEEL.length);const y=new Date();y.setDate(y.getDate()-1);const yd=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();me.whs=(me.whd===yd)?(me.whs||0)+1:1;me.whd=t;
wh.res=i;wh.s='spin';wh.t=0;wh.from=wh.spin.rotation.z;const c=i*Math.PI/4+Math.PI/8;wh.to=Math.PI-c+Math.PI*2*5;wh.spin.rotation.z=wh.from%(Math.PI*2);wh.from=wh.spin.rotation.z;saveMe();sfx('place')}
function wheelTick(dt){if(!room||room.type!=='wheel'||!wh)return;wh.it.label=me.whd===today()?'🎡 خلصت لفّة النهاردة':'🎡 لف العجلة';
if(wh.s!=='spin')return;wh.t+=dt/4.5;const u=Math.min(1,wh.t),e=1-Math.pow(1-u,3);wh.spin.rotation.z=wh.from+(wh.to-wh.from)*e;if(Math.floor(wh.t*40)%3===0&&u<0.9)sfx('tick');
if(u>=1){wh.s='idle';const base=WHEEL[wh.res][0],bonus=Math.min(5,(me.whs||1)-1),pay=base+bonus;me.coins+=pay;updCoins();me.wheelSpins=(me.wheelSpins||0)+1;saveMe();sfx('win');burst(new THREE.Vector3(0,5,-5),[WHEEL[wh.res][1],0xffd43b,0xffffff],20);toast('🎉 كسبت +'+base+'🪙'+(bonus?' + بونص '+bonus+' (أيام متتالية: '+me.whs+')':''),3500)}}
let gl=null;
function buildGallery(){
interacts=[];const g=indoor(0x3d1f12,0x5c3320,0xff6b6b);
g.add(mesh(G.box(15,0.06,15),0x7b4a2d,0,0.02,0),mesh(G.box(14,0.4,0.6),0x8d6e63,0,1.1,-1),mesh(G.box(14,3.4,0.2),0x4a2c1a,0,3,-6.4));
for(const x of[-6.5,-3.2,0,3.2,6.5])g.add(mesh(G.box(0.3,5,0.3),0xe03131,x,2.5,-6.3),mesh(G.box(1.4,0.3,0.1),0xf8f9fa,x,5.1,-6.3));
sign(g,'🎯 ميدان الرماية',0,6.4,-6.4,'rgba(224,49,49,.92)');sign(g,'اضغط على الأهداف · الدهبي +3 · القنبلة -2',0,2.2,-0.4);
gl={s:'idle',t:0,sc:0,hit:0,miss:0,sp:0,slots:[],grp:new THREE.Group()};
for(let i=0;i<6;i++){const x=-4.5+(i%3)*4.5,y=(i<3?1.3:3.1);const m=new THREE.Group();m.position.set(x,y,-4.8);m.userData.slot=i;
const disc=new THREE.Mesh(new THREE.CylinderGeometry(0.8,0.8,0.12,18),new THREE.MeshLambertMaterial({color:0xe03131}));disc.rotation.x=Math.PI/2;disc.userData.slot=i;m.add(disc);
const c2=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.14,18),new THREE.MeshLambertMaterial({color:0xffffff}));c2.rotation.x=Math.PI/2;c2.userData.slot=i;m.add(c2);
const c3=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.16,18),new THREE.MeshLambertMaterial({color:0xe03131}));c3.rotation.x=Math.PI/2;c3.userData.slot=i;m.add(c3);
m.rotation.x=-Math.PI/2;m.visible=false;gl.grp.add(m);gl.slots.push({m,up:false,t:0,kind:0,parts:[disc,c2,c3]})}
gl.it={x:0,z:1.5,label:'🎯 ابدأ الرماية',fn:galleryStart};interacts.push(gl.it);
g.add(portalMesh('ارجع للأركيد',5,5,0xff8787,'arcade'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(gl.grp);
toast('🎯 ميدان الرماية! ٣٠ ثانية',2600)
}
function galleryStart(){if(!gl||gl.s==='play')return;gl.s='play';gl.t=30;gl.sc=0;gl.hit=0;gl.miss=0;gl.sp=0.3;for(const s of gl.slots){s.up=false;s.m.visible=false}sfx('win');toast('🎯 ابدأ! اضغط على الأهداف',1500)}
function galKind(s,k){s.kind=k;const cols=k===1?[0xffd43b,0xffffff,0xff922b]:k===2?[0x212529,0x495057,0xe03131]:[0xe03131,0xffffff,0xe03131];s.parts.forEach((p,i)=>p.material.color.set(cols[i]))}
window.__tapHook=function(cx,cy){if(!room||room.type!=='gallery'||!gl||gl.s!=='play')return false;
mv.set(cx/innerWidth*2-1,-(cy/innerHeight)*2+1);ray.setFromCamera(mv,camera);const vis=gl.slots.filter(s=>s.up).flatMap(s=>s.parts);const hits=ray.intersectObjects(vis,false);
if(hits.length){const s=gl.slots[hits[0].object.userData.slot];const v=s.kind===1?3:s.kind===2?-2:1;gl.sc=Math.max(0,gl.sc+v);if(v>0){gl.hit++;sfx('star')}else sfx('err');burst(s.m.position.clone(),[v>0?0xffd43b:0x868e96,0xffffff],8);s.up=false;s.m.visible=false;toast(v>0?'🎯 +'+v:'💣 '+v,600)}
else{gl.miss++;}return true};
function galleryTick(dt){if(!room||room.type!=='gallery'||!gl)return;gl.it.label=gl.s==='play'?'🎯 '+gl.sc+' · ⏱️ '+Math.ceil(gl.t):'🎯 ابدأ الرماية'+(me.galBest?' (أحسن '+me.galBest+')':'');
for(const s of gl.slots)if(s.up){s.t-=dt;const u=Math.min(1,(s.life-s.t)/0.2);s.m.rotation.x=-Math.PI/2*(1-u);if(s.t<=0){s.up=false;s.m.visible=false}}
if(gl.s!=='play')return;gl.t-=dt;gl.sp-=dt;if(gl.sp<=0){gl.sp=0.45+Math.random()*0.5;const fr=gl.slots.filter(s=>!s.up);if(fr.length){const s=fr[Math.floor(Math.random()*fr.length)],r=Math.random();galKind(s,r<0.15?1:r<0.3?2:0);s.up=true;s.life=s.t=r<0.15?0.9:1.4;s.m.visible=true;s.m.rotation.x=-Math.PI/2}}
if(gl.t<=0){gl.s='idle';for(const s of gl.slots){s.up=false;s.m.visible=false}galleryEnd()}}
function galleryEnd(){const sc=gl.sc,t=today();if(!me.gld||me.gld.d!==t)me.gld={d:t,c:0};let pay=Math.min(Math.floor(sc/3),20-me.gld.c);if(pay<0)pay=0;me.gld.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.galBest||0);if(nb)me.galBest=sc;me.galGames=(me.galGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>🎯 خلص الوقت!</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · إصابات: '+gl.hit+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.galBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="gz1">🔁 تاني</button><button class="btn d" id="gz2">إغلاق</button></div>';$('gz1').onclick=()=>{$('modal').style.display='none';galleryStart()};$('gz2').onclick=()=>{$('modal').style.display='none'}})}
let tg=null;
function buildTag(){
interacts=[];const g=indoor(0x1b3a4b,0x24566e,0x22b8cf);
g.add(mesh(G.box(15,0.06,15),0x3b6e8f,0,0.02,0),mesh(G.cyl(2,2,0.02,24),0xffd43b,0,0.06,0,0x554400));
for(const[x,z]of[[-5,-5],[5,-5],[-5,3],[5,3]])g.add(mesh(G.box(0.8,0.1,0.8),0xff6b6b,x,0.08,z,0x662222));
sign(g,'🏃 الطاردة مع الروبوت',0,5,-6.8,'rgba(34,184,207,.92)');sign(g,'٢٠ث اهرب · ٢٠ث امسكه',0,3.2,-1.5);
const bot=new THREE.Group();bot.add(mesh(G.box(0.7,0.8,0.5),0x868e96,0,0.7,0),mesh(G.box(0.6,0.5,0.5),0xced4da,0,1.35,0),mesh(G.sph(0.08,6),0xff3b3b,-0.15,1.4,0.26,0xff0000),mesh(G.sph(0.08,6),0xff3b3b,0.15,1.4,0.26,0xff0000),mesh(G.cyl(0.04,0.04,0.35,5),0x495057,0,1.8,0));
const lb=labelSprite('🤖 روبوت',{s:1.6});lb.position.set(0,2.4,0);bot.add(lb);bot.position.set(0,0,-4);
tg={s:'idle',t:0,bot,run:0,chase:0,ph:0,bv:[0,0]};
tg.it={x:0,z:2,label:'🏃 ابدأ الطاردة',fn:tagStart};interacts.push(tg.it);
g.add(portalMesh('ارجع للشاطئ',5,5,0xff8787,'beach'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(bot);
toast('🏃 الطاردة! الروبوت 🤖 مش لاعب حقيقي',3000)
}
function tagStart(){if(!tg||tg.s!=='idle')return;tg.s='run';tg.t=20;tg.run=0;tg.chase=0;tg.bot.position.set(0,0,-5);player.root.position.set(0,0,4);toast('🏃 اهرب من الروبوت ٢٠ ثانية!',2200);sfx('win')}
function tagTick(dt){if(!room||room.type!=='tag'||!tg||!player)return;tg.it.label=tg.s==='idle'?'🏃 ابدأ الطاردة'+(me.tagBest?' (أحسن '+me.tagBest+')':''):(tg.s==='run'?'🏃 اهرب! ':'👆 امسكه! ')+Math.ceil(tg.t)+'ث';
if(tg.s==='idle'){tg.bot.position.x=Math.sin(tClock*0.8)*3;tg.bot.rotation.y=Math.PI/2;return}
const b=tg.bot.position,p=player.root.position;let dx=p.x-b.x,dz=p.z-b.z,d=Math.hypot(dx,dz)||1;
let sx,sz,sp;
if(tg.s==='run'){sp=4.3;sx=dx/d;sz=dz/d}else{sp=4.2;sx=-dx/d;sz=-dz/d;const w=6.4;if(Math.abs(b.x)>w)sz+=(b.z>0?-1:1)*1.5*Math.sign(b.x*sx||1);if(Math.abs(b.z)>w)sx+=(b.x>0?-1:1)*1.5;if(Math.abs(b.x)>w-1.2)sx-=Math.sign(b.x)*1.2;if(Math.abs(b.z)>w-1.2)sz-=Math.sign(b.z)*1.2;const m=Math.hypot(sx,sz)||1;sx/=m;sz/=m}
b.x=clamp(b.x+sx*sp*dt,-7,7);b.z=clamp(b.z+sz*sp*dt,-7,7);tg.bot.rotation.y=Math.atan2(sx,sz);
tg.t-=dt;
if(tg.s==='run'){tg.run+=dt;if(d<0.9){toast('🤖 مسكك بعد '+tg.run.toFixed(1)+' ثانية!',1800);sfx('err');tg.s='chase';tg.t=20;tg.bot.position.set(0,0,-3);player.root.position.set(0,0,4);setTimeout(()=>toast('👆 دلوقتي إنت اللي بتطارده!',1800),1000)}else if(tg.t<=0){toast('🏆 نجيت ٢٠ ثانية!',1800);sfx('win');tg.run=20;tg.s='chase';tg.t=20;tg.bot.position.set(0,0,-3);player.root.position.set(0,0,4)}}
else if(tg.s==='chase'){if(d<0.9){tg.chase=tg.t;tagEnd(true)}else if(tg.t<=0){tg.chase=0;tagEnd(false)}}}
function tagEnd(caught){tg.s='idle';const pts=Math.round(tg.run+tg.chase*1);const t=today();if(!me.tgd||me.tgd.d!==t)me.tgd={d:t,c:0};let pay=Math.min(Math.floor(pts/4),12-me.tgd.c);if(pay<0)pay=0;me.tgd.c+=pay;me.coins+=pay;updCoins();const nb=pts>(me.tagBest||0);if(nb)me.tagBest=pts;me.tagGames=(me.tagGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>🏃 خلصت الطاردة!</h2><div style="text-align:center;font-size:16px">هربت: '+tg.run.toFixed(1)+'ث · '+(caught?'مسكت الروبوت 🤖 وفاضل '+Math.round(tg.chase)+'ث':'الروبوت هرب منك')+'<br>النقاط: <b>'+pts+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.tagBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="tz1">🔁 تاني</button><button class="btn d" id="tz2">إغلاق</button></div>';$('tz1').onclick=()=>{$('modal').style.display='none';tagStart()};$('tz2').onclick=()=>{$('modal').style.display='none'}})}
let jp=null;
function buildJump(){
interacts=[];const g=indoor(0x3a1f4d,0x56307a,0xf06595);
g.add(mesh(G.box(15,0.06,15),0x7048e8,0,0.02,0));
const pads=[[-4,-3],[4,-3],[0,2.5],[-4.5,4],[4.5,4]];
pads.forEach(([x,z],i)=>g.add(mesh(G.cyl(1.7,1.7,0.2,20),[0xff6b6b,0x4dabf7,0xffd43b,0x69db7c,0xf783ac][i],x,0.1,z,0x222222),mesh(G.cyl(1.2,1.2,0.22,20),0x212529,x,0.11,z)));
sign(g,'🤸 حديقة الترامبولين',0,6.5,-6.8,'rgba(240,101,149,.92)');sign(g,'اضغط اقفز في لحظة الهبوط للكومبو · اجمع النجوم',0,2.3,-0.8);
jp={pads,vy:0,air:false,combo:0,press:0,best:0,stars:[],got:0,grp:new THREE.Group(),bn:0};
for(let i=0;i<6;i++){const st=mesh(G.sph(0.35,8),0xffd43b,0,0,0,0xffaa00);st.scale.set(1,1,0.35);jp.grp.add(st);jp.stars.push(st);jumpStar(i)}
jp.it={x:0,z:3,label:'⬆️ اقفز',fn:jumpPress};interacts.push(jp.it);
g.add(portalMesh('ارجع للحديقة',-5.5,5,0xff8787,'garden'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(jp.grp);
toast('🤸 الترامبولين! اضغط اقفز واجمع النجوم',3000)
}
function jumpStar(i){const p=jp.pads[Math.floor(Math.random()*jp.pads.length)];jp.stars[i].position.set(p[0]+(Math.random()-0.5)*1.4,2.2+Math.random()*4.6,p[1]+(Math.random()-0.5)*1.4);jp.stars[i].visible=true}
function jumpPad(){const p=player.root.position;for(const q of jp.pads)if(Math.hypot(p.x-q[0],p.z-q[1])<1.6)return true;return false}
function jumpPress(){if(!jp||!player)return;if(!jp.air){if(jumpPad()){jp.air=true;jp.vy=8;jp.combo=0}else{toast('قف على ترامبولين الأول 🤸',1200)}}else jp.press=0.3}
function jumpTick(dt){if(!room||room.type!=='jump'||!jp||!player)return;const p=player.root.position;jp.it.x=p.x;jp.it.z=p.z+1.2;jp.it.label=jp.air?'⬆️ اقفز عند الهبوط · كومبو '+jp.combo:'⬆️ اقفز'+(jumpPad()?'':' (قف على ترامبولين)');
for(const st of jp.stars)st.rotation.y+=dt*3;
if(jp.press>0)jp.press-=dt;
if(jp.air){jp.vy-=22*dt;p.y+=jp.vy*dt;if(p.y>jp.best){jp.best=p.y;}
for(let i=0;i<jp.stars.length;i++){const st=jp.stars[i];if(st.visible&&Math.hypot(st.position.x-p.x,st.position.z-p.z)<1.3&&Math.abs(st.position.y-(p.y+0.9))<1.3){st.visible=false;jp.got++;me.jstars=(me.jstars||0)+1;sfx('star');burst(st.position.clone(),[0xffd43b,0xffffff],8);if(jp.got%5===0){const t=today();if(!me.jpd||me.jpd.d!==t)me.jpd={d:t,c:0};if(me.jpd.c<15){me.jpd.c+=3;me.coins+=3;updCoins();toast('⭐ '+jp.got+' نجمة +3🪙',1200)}saveMe()}setTimeout(()=>{if(room&&room.type==='jump')jumpStar(i)},1500)}}
if(p.y<=0){p.y=0;if(jumpPad()){if(jp.press>0){jp.combo=Math.min(6,jp.combo+1);if(jp.combo>=2)toast('🔥 كومبو x'+jp.combo,700)}else jp.combo=0;jp.vy=8+jp.combo*1.5;sfx('place');jp.press=0;me.jumpBest=Math.max(me.jumpBest||0,jp.combo);if(jp.combo>=3)saveMe()}else{jp.air=false;jp.vy=0;jp.combo=0}}}
}
const BACKS=[['🌅 غروب',0xff8c42,['🌴','🌊','☀️']],['🌌 فضاء',0x1a1b4b,['🚀','⭐','🪐']],['🌸 ربيع',0xf783ac,['🌷','🦋','🌸']],['🏰 قلعة',0x7a8aa0,['🏰','🐉','👑']],['🎉 حفلة',0x9775fa,['🎈','🎁','🎊']],['❄️ شتا',0x74c0fc,['⛄','❄️','🎄']]];
let ps=null;
function buildPhoto(){
interacts=[];const g=indoor(0x222230,0x2f2f44,0xfff3bf);
g.add(mesh(G.box(15,0.06,15),0x343a40,0,0.02,0),mesh(G.cyl(2.2,2.2,0.12,24),0xf8f9fa,0,0.1,-1.5));
ps={i:0,back:mesh(G.box(11,4.4,0.3),BACKS[0][1],0,2.2,-5.5,0x222222),props:[],grp:new THREE.Group(),n:0};g.add(ps.back);
for(const x of[-4.5,4.5])g.add(mesh(G.cyl(0.08,0.08,3.5,6),0x495057,x,1.75,-2),mesh(G.sph(0.4,8),0xfff3bf,x,3.7,-2,0xffee99));
sign(g,'📸 استوديو الصور',0,5.2,-5.2,'rgba(255,212,59,.9)');
ps.it1={x:-2.2,z:2,label:'🎨 غيّر الخلفية',fn:photoNext};interacts.push(ps.it1);ps.it2={x:2.2,z:2,label:'📸 صوّر',fn:photoSnap};interacts.push(ps.it2);
sign(g,'🎨 الخلفية',-2.2,1.6,1.1);sign(g,'📸 صوّر',2.2,1.6,1.1);
g.add(portalMesh('ارجع للكافيه',-5.5,5,0xff8787,'cafe'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(ps.grp);
photoApply();player.root.position.set(0,0,-1.5);setTimeout(()=>{dist=innerWidth<600?27:22;pitch=0.75},600);toast('📸 استوديو الصور! اختار خلفية وقف في الدايرة وصوّر',3200)
}
function photoApply(){const B=BACKS[ps.i];ps.back.material.color.set(B[1]);while(ps.grp.children.length)ps.grp.remove(ps.grp.children[0]);B[2].forEach((e,k)=>{const l=labelSprite(e,{s:2.2,bg:'rgba(0,0,0,0)'});l.position.set(-3.6+k*3.6,1.3+(k===1?1.2:0),-5.0);ps.grp.add(l)});const t=labelSprite(B[0],{s:2.4,bg:'rgba(0,0,0,.5)'});t.position.set(0,3.9,-5.0);ps.grp.add(t);ps.it1.label='🎨 غيّر الخلفية ('+B[0]+')'}
function photoNext(){if(!ps)return;ps.i=(ps.i+1)%BACKS.length;photoApply();sfx('place');burst(new THREE.Vector3(0,3,-5),[0xffd43b,0xffffff],10)}
function photoSnap(){if(!ps)return;ps.n++;me.studioPics=(me.studioPics||0)+1;saveMe();sfx('star');takePhoto()}
let chCb=null,chLast='';
const GBG=[['golf','⛳ جولف',1],['hoops','🏀 سلة',0],['bowl','🎳 بولينج',0],['gal','🎯 رماية',0],['tag','🏃 طاردة',0],['pen','⚽ جزاء',0],['seek','🙈 استغماية',0],['kite','🪁 طيارة',0],['bump','🚗 تصادم',0],['bake','🥐 مخبز',0],['star','🌌 نجوم',0],['ice','⛸️ تزلج',0],['bal','🎈 بالونات',0],['mol','🔨 خلد',0],['mth','⚡ حساب',0],['clr','🎨 ألوان',0],['wrd','🔤 كلمات',0],['seq','🔢 أرقام',0],['odd','🟦 مختلف',0],['cmp','⚖️ الأكبر',0],['tfq','✔️ صح وغلط',0],['cnt','🔢 عدّ',0],['adx','➕ كمّل',0],['snk','🐍 ثعبان',0],['tzf','🔷 2048',0],['mns','💣 ألغام',0],['pzz','🍕 بيتزا',0],['dnc','💃 رقص',0],['isl','🏝️ كنز',0],['ast','🔭 مرصد',0],['frt','🍉 فاكهة',0],['rhy','🥁 إيقاع',0],['rkt','🚀 فضاء',0],['pgn','🏓 بنج بونج',0],['ttr','🧱 تتريس',0],['c4f','🔴 أربعة',0],['flp','🐦 طيّر',0],['brk','🧱 طوب',0],['sinv','👾 غزاة',0],['rcr','🏎️ سباق',0],['frg','🐸 ضفدع',0],['sok','📦 مخزن',0],['bbs','🫧 فقاعات',0],['twr','🏗️ برج',0],['cnn','💥 مدفع',0],['pbl','🎰 بينبول',0],['ahk','🏒 هوكي',0],['drt','🎯 سهام',0],['qzs','🧠 مسابقة',0],['crl','🥌 كيرلنج',0],['snw','⛄ ثلج',0],['tgw','🪢 حبل',0],['dgt','⛏️ تنقيب',0],['xox','❌ إكس أو',0],['han','🗼 هانوي',0],['lgo','💡 أنوار',0],['chf','🍳 شيف',0]];
function myBests(){return{golf:me.golfBest||0,hoops:me.hoopBest||0,bowl:me.bowlBest||0,gal:me.galBest||0,tag:me.tagBest||0,pen:me.penBest||0,seek:me.seekBest||0,kite:me.kiteBest||0,bump:me.bumpBest||0,bake:me.bakeBest||0,star:me.simonBest||0,ice:me.iceBest||0,bal:me.balBest||0,mol:me.molBest||0,mth:me.mthBest||0,clr:me.clrBest||0,wrd:me.wrdBest||0,seq:me.seqBest||0,odd:me.oddBest||0,cmp:me.cmpBest||0,tfq:me.tfqBest||0,cnt:me.cntBest||0,adx:me.adxBest||0,snk:me.snkBest||0,tzf:me.tzfBest||0,mns:me.mnsBest||0,pzz:me.pzzBest||0,dnc:me.dncBest||0,isl:me.islBest||0,ast:me.astBest||0,frt:me.frtBest||0,rhy:me.rhyBest||0,rkt:me.rktBest||0,pgn:me.pgnBest||0,ttr:me.ttrBest||0,c4f:me.c4fBest||0,flp:me.flpBest||0,brk:me.brkBest||0,sinv:me.sinvBest||0,rcr:me.rcrBest||0,frg:me.frgBest||0,sok:me.sokBest||0,bbs:me.bbsBest||0,chf:me.chfBest||0,twr:me.twrBest||0,cnn:me.cnnBest||0,pbl:me.pblBest||0,ahk:me.ahkBest||0,drt:me.drtBest||0,qzs:me.qzsBest||0,crl:me.crlBest||0,snw:me.snwBest||0,tgw:me.tgwBest||0,dgt:me.dgtBest||0,xox:me.xoxBest||0,han:me.hanBest||0,lgo:me.lgoBest||0}}
function pubBests(){try{const o=JSON.stringify({n:me.name,g:myBests()});if(o===chLast||!netOK)return;chLast=o;client.publish(NS+'/ch/'+me.id,o,{retain:true})}catch(e){}}
const _sv0=saveMe;saveMe=function(){_sv0.apply(this,arguments);pubBests()};
const WKEYS=['ice','simon','mem','tag','seek','kite','bump','bake','pen','hoop','gal','bowl','bal','dash','mol','mth','clr','wrd','seq','odd','cmp','tfq','cnt','adx','snk','tzf','mns','pzz','dnc','isl','ast','frt','rhy','rkt','pgn','ttr','c4f','flp','brk','sinv','rcr','frg','sok','bbs','chf','twr','cnn','pbl','ahk','drt','qzs','crl','snw','tgw','dgt','xox','han','lgo'];
function wkId(){const d=new Date(),j=new Date(d.getFullYear(),0,1);return d.getFullYear()+'w'+Math.floor(((d-j)/864e5+j.getDay())/7)}
function wkCounts(){const o={};for(const k of WKEYS)o[k]=me[k+'Games']||0;return o}
function wkInit(){if(!me.wk||me.wk.w!==wkId()){me.wk={w:wkId(),base:wkCounts(),cl:[]};saveMe()}return me.wk}
function wkProg(){const w=wkInit(),n=wkCounts();let sum=0,dif=0;for(const k of WKEYS){const d=n[k]-(w.base[k]||0);if(d>0){sum+=d;dif++}}return{sum,dif}}
const WCH=[['🎮 العب ١٠ جولات',p=>p.sum,10,25],['🌈 جرّب ٤ ألعاب مختلفة',p=>p.dif,4,25],['🔥 العب ٢٥ جولة',p=>p.sum,25,60]];
function openWeekly(){const w=wkInit();modal(c=>{const p=wkProg();let h='<h2>📅 تحدي الأسبوع</h2>'+lvBar()+'<div style="font-size:13px;opacity:.8;text-align:center;margin-bottom:8px">بيتجدد كل أسبوع · أي لعبة بتحسب</div>';
 WCH.forEach((q,i)=>{const v=Math.min(q[2],q[1](p)),done=v>=q[2],cl=w.cl.indexOf(i)>=0;h+='<div style="background:rgba(255,255,255,.08);border-radius:12px;padding:8px 10px;margin:5px 0"><b>'+q[0]+'</b> · '+v+'/'+q[2]+'<div style="height:8px;background:rgba(255,255,255,.15);border-radius:6px;margin:6px 0"><div style="height:8px;width:'+Math.round(v/q[2]*100)+'%;background:#51cf66;border-radius:6px"></div></div>'+(cl?'<span>✅ اتسلّمت</span>':done?'<button class="btn g" data-q="'+i+'">استلم +'+q[3]+'🪙</button>':'<span>الجايزة '+q[3]+'🪙</span>')+'</div>'});
 c.innerHTML=h+'<div class="row"><button class="btn d" id="wkx">إغلاق</button></div>';$('wkx').onclick=()=>{$('modal').style.display='none'};
 c.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const i=+b.dataset.q,q=WCH[i];if(w.cl.indexOf(i)>=0||q[1](wkProg())<q[2])return;w.cl.push(i);me.coins+=q[3];updCoins();saveMe();sfx('win');toast('🎁 +'+q[3]+'🪙 تحدي الأسبوع',1600);openWeekly()})})}
function lvUnlock(){const L=plLevel().lv;for(const k in LVH){if(L>=LVH[k]&&!me.owned.includes(+k)){me.owned.push(+k);setTimeout(()=>toast('🎖️ مستوى '+L+'! اتفتحت: '+HATS[k],2600),400)}}saveMe()}
function plLevel(){let n=0;for(const k of['tag','seek','kite','bump','bake','pen','hoop','gal','bowl','mem','simon','ice','bal','dash','mol','mth','clr','wrd','seq','odd','cmp','tfq','cnt','adx','snk','tzf','mns','pzz','dnc','isl','ast','frt','rhy','rkt','pgn','ttr','c4f','flp','brk','sinv','rcr','frg','sok','bbs','chf','twr','cnn','pbl','ahk','drt','qzs','crl','snw','tgw','dgt','xox','han','lgo'])n+=me[k+'Games']||0;const lv=Math.floor(Math.sqrt(n/2))+1,nx=2*lv*lv,cur=2*(lv-1)*(lv-1);return{n,lv,pct:Math.round((n-cur)/(nx-cur)*100),nx}}
function lvBar(){const L=plLevel();return '<div style="background:rgba(255,255,255,.08);border-radius:12px;padding:8px 10px;margin:6px 0;text-align:center"><b>🎖️ مستوى اللاعب '+L.lv+'</b> · '+L.n+' جولة<div style="height:8px;background:rgba(255,255,255,.15);border-radius:6px;margin:6px 0"><div style="height:8px;width:'+L.pct+'%;background:#ffd43b;border-radius:6px"></div></div><span style="font-size:11px;opacity:.7">الجولة اللي بعدها لحد '+L.nx+' للمستوى '+(L.lv+1)+'</span></div>'}
function openChamps(){const e={};modal(c=>{let cur=1;c.innerHTML='<h2>🏆 لوحة الأبطال</h2>'+lvBar()+'<div class="row" id="cg" style="flex-wrap:wrap"></div><div id="cl"></div><div class="row stk"><button class="btn d" id="cx">إغلاق</button></div>';
const render=()=>{const l=$('cl');if(!l)return;l.innerHTML='';const G0=GBG[cur];const a=Object.entries(e).map(([id,v])=>({id,n:v.n,v:v.g[G0[0]]})).filter(x=>x.v>0).sort((x,y)=>G0[2]?x.v-y.v:y.v-x.v).slice(0,10);if(!a.length)l.textContent='لسه مفيش أرقام، العب وسجل رقمك!';a.forEach((v,i)=>{const d=document.createElement('div');d.className='qrow';d.textContent=(i+1)+'. '+v.n+' · '+v.v+(v.id===me.id?' (إنت)':'');l.appendChild(d)})};
GBG.forEach((g,i)=>{const b=document.createElement('button');b.className='btn o';b.style.margin='3px';b.textContent=g[1];b.onclick=()=>{cur=i;render()};$('cg').appendChild(b)});
e[me.id]={n:me.name,g:myBests()};chCb=(id,m)=>{e[id]=m;render()};if(netOK)client.subscribe(NS+'/ch/+');
$('cx').onclick=()=>{try{client.unsubscribe(NS+'/ch/+')}catch(x){}chCb=null;closeModal()};render()})}
let pn=null;
function buildPen(){
interacts=[];const g=indoor(0x14391f,0x1e5a30,0x69db7c);
g.add(mesh(G.box(15,0.06,15),0x2f9e44,0,0.02,0),mesh(G.box(15,0.02,0.15),0xffffff,0,0.07,-5),mesh(G.cyl(0.15,0.15,0.02,10),0xffffff,0,0.07,2));
for(const x of[-3.2,3.2])g.add(mesh(G.cyl(0.08,0.08,2.6,6),0xf8f9fa,x,1.3,-5.3));g.add(mesh(G.cyl(0.08,0.08,6.4,6),0xf8f9fa,0,2.6,-5.3));g.children[g.children.length-1].rotation.z=Math.PI/2;
const net=mesh(G.box(6.4,2.6,0.05),0xf1f3f5,0,1.3,-6.3);net.material=net.material.clone();net.material.transparent=true;net.material.opacity=0.25;g.add(net);
const k=new THREE.Group();k.add(mesh(G.box(0.8,1.0,0.5),0xffd43b,0,0.9,0),mesh(G.sph(0.3,8),0xced4da,0,1.7,0),mesh(G.box(1.8,0.2,0.2),0xffd43b,0,1.2,0));const kl=labelSprite('🤖 حارس',{s:1.5});kl.position.set(0,2.5,0);k.add(kl);k.position.set(0,0,-5.1);
pn={k,ball:mesh(G.sph(0.25,12),0xffffff,0,0.3,2),n:0,goals:0,s:'idle',fly:null,ax:0,ay:4};
sign(g,'⚽ ركلات الجزاء',0,4.6,-5.5,'rgba(47,158,68,.92)');sign(g,'٥ ركلات · الحارس 🤖 مش لاعب حقيقي',0,2.4,0.8);
pn.it={x:0,z:3.4,label:'⚽ ابدأ الركلات',fn:penOpen};interacts.push(pn.it);
g.add(portalMesh('ارجع للملعب',-5.5,5,0xff8787,'park'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(k,pn.ball);
toast('⚽ ركلات الجزاء! سجل في الحارس 🤖',2800)
}
function penOpen(){if(!pn||pn.s!=='idle')return;modal(c=>{c.innerHTML='<h2>⚽ ركلة '+(pn.n+1)+' من 5</h2><div style="text-align:center">أهداف: <b>'+pn.goals+'</b></div><div style="margin:8px 0">↔️ اليمين/الشمال<input type="range" id="pa" min="-10" max="10" value="'+pn.ax+'" style="width:100%"></div><div style="margin:8px 0">↕️ الارتفاع<input type="range" id="pb" min="0" max="10" value="'+pn.ay+'" style="width:100%"></div><div class="row"><button class="btn g" id="pg">⚽ اشوت</button><button class="btn d" id="px">إلغاء</button></div>';
$('pa').oninput=e=>{pn.ax=+e.target.value};$('pb').oninput=e=>{pn.ay=+e.target.value};$('px').onclick=()=>{$('modal').style.display='none'};$('pg').onclick=()=>{$('modal').style.display='none';penShoot()}})}
function penShoot(){if(!pn||pn.s!=='idle')return;pn.s='fly';const tx=pn.ax*0.34,ty=0.2+pn.ay*0.24;const dv=Math.floor(Math.random()*3)-1;const hi=Math.random()<0.4;pn.fly={t:0,tx,ty,kx:dv*2.2,ky:hi?1.6:0.3,from:pn.k.position.x};sfx('place')}
function penTick(dt){if(!room||room.type!=='pen'||!pn)return;pn.it.label=pn.s==='idle'?'⚽ اشوت · ركلة '+(pn.n+1)+'/5':'⏳ ...';if(!pn.fly)return;const f=pn.fly;f.t+=dt/0.7;const u=Math.min(1,f.t);
pn.ball.position.set(f.tx*u,0.3+(f.ty-0.3)*u+Math.sin(u*Math.PI)*0.4,2-u*7.3);const ku=Math.min(1,u*1.6);pn.k.position.x=f.from+(f.kx-f.from)*ku;pn.k.position.y=(f.ky>1?1.0:0)*ku;pn.k.rotation.z=-(f.kx/2.2)*0.5*ku;
if(u>=1){pn.fly=null;let res;if(Math.abs(f.tx)>3||f.ty>2.4)res='miss';else if(Math.abs(f.kx-f.tx)<1.2&&Math.abs((f.ky>1?1.6:0.5)-f.ty)<1.0)res='save';else res='goal';
pn.n++;if(res==='goal'){pn.goals++;sfx('win');burst(pn.ball.position.clone(),[0xffd43b,0xffffff,0x69db7c],16);toast('⚽ جوووول!',1400)}else{sfx('err');toast(res==='save'?'🧤 الحارس صدها!':'😅 برا المرمى',1400)}
setTimeout(()=>{if(!room||room.type!=='pen')return;pn.ball.position.set(0,0.3,2);pn.k.position.set(0,0,-5.1);pn.k.rotation.z=0;pn.s='idle';if(pn.n>=5)penEnd()},1100)}}
function penEnd(){const sc=pn.goals,t=today();if(!me.pnd||me.pnd.d!==t)me.pnd={d:t,c:0};let pay=Math.min(sc*2,15-me.pnd.c);if(pay<0)pay=0;me.pnd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.penBest||0);if(nb)me.penBest=sc;me.penGames=(me.penGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>⚽ خلصت الركلات!</h2><div style="text-align:center;font-size:16px">سجلت <b>'+sc+'</b> من 5'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.penBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="pz1">🔁 تاني</button><button class="btn d" id="pz2">إغلاق</button></div>';$('pz1').onclick=()=>{$('modal').style.display='none';pn.n=0;pn.goals=0};$('pz2').onclick=()=>{$('modal').style.display='none'}});pn.n=0;pn.goals=0}
let kt=null,sk=null;
function buildKite(){
interacts=[];const g=indoor(0x4aa3df,0x8fd3f4,0xfab005);
g.add(mesh(G.box(15,0.06,15),0x69db7c,0,0.02,0));
kt={rings:[],s:'idle',t:0,sc:0,vy:0,y:3,k:null,gust:0};
const kg=new THREE.Group();const dm=mesh(G.box(1.1,1.1,0.06),0xff6b6b,0,0,0);dm.rotation.z=Math.PI/4;kg.add(dm);const dm2=mesh(G.box(0.5,0.5,0.07),0xffd43b,0,0,0);dm2.rotation.z=Math.PI/4;kg.add(dm2);
for(let i=1;i<=4;i++)kg.add(mesh(G.sph(0.1,6),i%2?0x4dabf7:0xffffff,(i%2?0.12:-0.12),-0.8-i*0.3,0));
const kl=labelSprite('🪁',{s:1,bg:'rgba(0,0,0,0)'});kl.position.set(0,0.9,0);kg.add(kl);kt.k=kg;g.add(kg);
for(let i=0;i<5;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.12,8,20),new THREE.MeshBasicMaterial({color:0xffd43b}));g.add(r);kt.rings.push(r);kiteRing(i)}
sign(g,'🪁 طيّر الطيارة وعدّي من الحلقات',0,5,-6.8,'rgba(250,176,5,.92)');sign(g,'امشي عشان الطيارة تتبعك · اضغط ⬆️ عشان تعلّيها',0,3,-1.8);
kt.it={x:0,z:4,label:'🪁 ابدأ التطيير',fn:kitePress};interacts.push(kt.it);
g.add(portalMesh('ارجع للشاطئ',5.5,5.8,0xff8787,'beach'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('🪁 الهوا حلو! ابدأ التطيير',2400)
}
function kiteRing(i){const r=kt.rings[i];r.position.set((Math.random()-0.5)*11,2+Math.random()*4.5,-5+Math.random()*8.5);r.rotation.y=Math.random()*3}
function kitePress(){if(!kt||!player)return;if(kt.s!=='play'){kt.s='play';kt.t=45;kt.sc=0;kt.y=3;kt.vy=0;sfx('win');toast('🪁 ٤٥ ثانية · عدّي من الحلقات!',1600);return}kt.vy=Math.min(kt.vy+5.5,7);sfx('star')}
function kiteTick(dt){if(!room||room.type!=='kite'||!kt||!player)return;const p=player.root.position,k=kt.k;
kt.it.x=p.x;kt.it.z=p.z+1.2;
if(kt.s==='play'){kt.it.label='⬆️ علّي الطيارة · '+Math.ceil(kt.t)+'ث · 🎯'+kt.sc;kt.t-=dt;kt.vy-=6*dt;kt.y=Math.max(1,Math.min(8,kt.y+kt.vy*dt));if(kt.y<=1||kt.y>=8)kt.vy=0}
else kt.it.label='🪁 ابدأ التطيير'+(me.kiteBest?' (أحسن '+me.kiteBest+')':'');
const tx=p.x,tz=p.z-1.5;k.position.x+=(tx-k.position.x)*Math.min(1,dt*2.2);k.position.z+=(tz-k.position.z)*Math.min(1,dt*2.2);k.position.y+=(kt.y-k.position.y)*Math.min(1,dt*5);
k.rotation.z=Math.sin(performance.now()/400)*0.25;k.rotation.y=Math.sin(performance.now()/900)*0.3;
for(let i=0;i<kt.rings.length;i++){const r=kt.rings[i];r.rotation.z+=dt;
if(kt.s==='play'&&Math.hypot(r.position.x-k.position.x,r.position.z-k.position.z)<1.3&&Math.abs(r.position.y-k.position.y)<1.2){kt.sc++;sfx('star');burst(r.position.clone(),[0xffd43b,0xffffff],12);toast('✨ +1 حلقة · '+kt.sc,600);kiteRing(i)}}
if(kt.s==='play'&&kt.t<=0)kiteEnd()}
function kiteEnd(){kt.s='idle';const sc=kt.sc,t=today();if(!me.ktd||me.ktd.d!==t)me.ktd={d:t,c:0};let pay=Math.min(Math.floor(sc*1.5),15-me.ktd.c);if(pay<0)pay=0;me.ktd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.kiteBest||0);if(nb)me.kiteBest=sc;me.kiteGames=(me.kiteGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>🪁 خلص التطيير!</h2><div style="text-align:center;font-size:16px">عدّيت من <b>'+sc+'</b> حلقة'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.kiteBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="kz1">🔁 تاني</button><button class="btn d" id="kz2">إغلاق</button></div>';$('kz1').onclick=()=>{$('modal').style.display='none';kitePress()};$('kz2').onclick=()=>{$('modal').style.display='none'}})}
let bp=null;
let bk=null;const BKI=[['🥖','عيش',0xd9a441],['🥐','كرواسون',0xf0b35a],['🍰','كيك',0xff8fab]];
function buildBake(){
 interacts=[];const g=indoor(0x4a2c1a,0x6b4128,0xe8590c);
 g.add(mesh(G.box(15,0.06,15),0xb08968,0,0.02,0));
 bk={s:'idle',t:0,sc:0,combo:0,ord:0,pat:0,st:[],ok:0};
 BKI.forEach((it,i)=>{const x=(i-1)*4.2,z=-3.5;g.add(mesh(G.box(3,1.1,1.6),0x8d5a2b,x,0.55,z),mesh(G.box(2.6,0.1,1.3),it[2],x,1.15,z));const l=labelSprite(it[0],{s:1.6,bg:'rgba(0,0,0,0)'});l.position.set(x,2,z);g.add(l);
  const e={x,z:z+1.7,label:it[0]+' '+it[1],fn:()=>bakePick(i)};interacts.push(e);bk.st.push(e)});
 sign(g,'🥐 المخبز · زبون 🤖 بيطلب',0,5,-6.8,'rgba(232,89,12,.92)');
 bk.board=labelSprite('🥐 ابدأ الشغل',{s:3.4});bk.board.position.set(0,3.6,-5.2);g.add(bk.board);
 bk.it={x:0,z:4.5,label:'🥐 ابدأ المخبز',fn:bakeStart};interacts.push(bk.it);
 g.add(portalMesh('ارجع للكافيه',5.8,5.8,0xff8787,'cafe'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('🥐 الزبون 🤖 بيطلب · قف عند الصنف الصح',2800)
}
function bakeOrder(){bk.ord=Math.floor(Math.random()*3);bk.pat=6;updBakeBoard()}
function updBakeBoard(){if(!bk)return;const s=bk.s==='play'?'الزبون 🤖 عايز '+BKI[bk.ord][0]+' · '+Math.ceil(bk.pat)+'ث':'🥐 ابدأ الشغل';try{room.group.remove(bk.board);if(bk.board.material){bk.board.material.map&&bk.board.material.map.dispose();bk.board.material.dispose()}}catch(e){}const l=labelSprite(s,{s:3.4});l.position.set(0,3.6,-5.2);room.group.add(l);bk.board=l;bk.lastS=s}
function bakeStart(){if(!bk||bk.s==='play')return;bk.s='play';bk.t=45;bk.sc=0;bk.combo=0;bk.ok=0;bakeOrder();sfx('win')}
function bakePick(i){if(!bk||bk.s!=='play')return;if(i===bk.ord){bk.combo++;const pts=1+Math.min(4,bk.combo-1)+(bk.pat>3?1:0);bk.sc+=pts;bk.ok++;sfx('star');toast('✅ +'+pts+(bk.combo>1?' · كومبو x'+bk.combo:''),700);bakeOrder()}else{bk.combo=0;sfx('err');toast('❌ ده مش طلبه',700)}}
function bakeTick(dt){if(!room||room.type!=='bake'||!bk||!player)return;
 if(bk.s!=='play'){bk.it.label='🥐 ابدأ المخبز'+(me.bakeBest?' (أحسن '+me.bakeBest+')':'');return}
 bk.t-=dt;bk.pat-=dt;bk.it.x=player.root.position.x;bk.it.z=player.root.position.z+2.6;bk.it.label='🥐 '+Math.ceil(bk.t)+'ث · 🎯'+bk.sc;
 if(bk.pat<=0){bk.combo=0;toast('😤 الزبون مشي!',700);bakeOrder()}
 const s='الزبون 🤖 عايز '+BKI[bk.ord][0]+' · '+Math.ceil(bk.pat)+'ث';if(s!==bk.lastS)updBakeBoard();
 if(bk.t<=0)bakeEnd()}
function bakeEnd(){bk.s='idle';updBakeBoard();const sc=bk.sc,t=today();if(!me.bkd||me.bkd.d!==t)me.bkd={d:t,c:0};let pay=Math.min(Math.floor(sc/3),15-me.bkd.c);if(pay<0)pay=0;me.bkd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.bakeBest||0);if(nb)me.bakeBest=sc;me.bakeGames=(me.bakeGames||0)+1;saveMe();sfx('win');
 modal(c=>{c.innerHTML='<h2>🥐 خلص الشغل!</h2><div style="text-align:center;font-size:16px">خدمت '+bk.ok+' زبون<br>النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.bakeBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="bkz1">🔁 تاني</button><button class="btn d" id="bkz2">إغلاق</button></div>';$('bkz1').onclick=()=>{$('modal').style.display='none';bakeStart()};$('bkz2').onclick=()=>{$('modal').style.display='none'}})}
let pz=null;const PZS=[['🍅','صلصة',0xe03131],['🧀','جبنة',0xffd43b],['🍕','بيبروني',0xc92a2a],['🍄','مشروم',0xdee2e6],['🫒','زيتون',0x5c940d]];
function buildPizza(){
 interacts=[];const g=indoor(0x5c1f12,0x8a3220,0xff6b35);
 g.add(mesh(G.box(15,0.06,15),0xf8f0e0,0,0.02,0));
 for(let i=0;i<5;i++)for(let j=0;j<5;j++)if((i+j)%2===0)g.add(mesh(G.box(3,0.02,3),0xd9480f,-6+i*3,0.06,-6+j*3));
 pz={s:'idle',t:0,sc:0,combo:0,ord:2,step:0,pat:0,ok:0,seq:[0,1,2,5],st:[]};
 PZS.forEach((it,i)=>{const x=-5.6+i*2.8,z=-3.5;g.add(mesh(G.box(2.2,1.0,1.3),0x8d5a2b,x,0.5,z),mesh(G.box(2.4,0.1,1.5),0xf1f3f5,x,1.05,z),mesh(G.cyl(0.6,0.45,0.35,12),it[2],x,1.28,z,0x222222));
  for(let k=0;k<6;k++){const a=k*1.05;g.add(mesh(G.sph(0.11,6),i===1?0xfff3bf:i===0?0xff8787:i===2?0xa61e1e:i===3?0xf1f3f5:0x2b4a0a,x+Math.cos(a)*0.28,1.5,z+Math.sin(a)*0.28))}
  const l=labelSprite(it[0]+' '+it[1],{s:1.5,bg:'rgba(0,0,0,0)'});l.position.set(x,2.3,z);g.add(l);
  const e={x,z:z+1.7,label:it[0]+' '+it[1],fn:()=>pzPick(i)};interacts.push(e);pz.st.push(e)});
 g.add(mesh(G.box(3.4,2.2,1.8),0xa5522a,0,1.1,4.9),mesh(G.box(2.2,1.2,0.3),0x1a0a05,0,1.0,3.95),mesh(G.box(1.8,0.5,0.3),0xff922b,0,0.75,3.9,0xff5500),mesh(G.cyl(0.25,0.3,1.3,8),0x6b3a1a,1.2,2.8,5.1));
 const ol=labelSprite('🔥 الفرن',{s:1.6,bg:'rgba(0,0,0,0)'});ol.position.set(0,2.8,4.9);g.add(ol);
 pz.oven={x:0,z:3.1,label:'🔥 الفرن',fn:()=>pzPick(5)};interacts.push(pz.oven);
 sign(g,'🍕 مطعم البيتزا · زبون 🤖 بيطلب',0,5,-6.8,'rgba(214,72,15,.92)');
 pz.board=labelSprite('🍕 ابدأ الشغل',{s:3.4});pz.board.position.set(0,3.8,-5.4);g.add(pz.board);
 pz.it={x:-5.8,z:3.6,label:'🍕 ابدأ مطعم البيتزا',fn:pzStart};interacts.push(pz.it);
 g.add(portalMesh('ارجع للكافيه',5.8,5.8,0xff8787,'cafe'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('🍕 صلصة ← جبنة ← الإضافة ← الفرن',3000)
}
function pzOrder(){pz.ord=2+Math.floor(Math.random()*3);pz.seq=[0,1,pz.ord,5];pz.step=0;pz.pat=15;pzBoard()}
function pzBoard(){if(!pz)return;const sq=pz.seq.map((k,i)=>(i<pz.step?'✅':i===pz.step?'👉':'')+(k===5?'🔥':PZS[k][0])).join(' ');const s=pz.s==='play'?'🤖 بيتزا '+PZS[pz.ord][1]+' · '+Math.ceil(pz.pat)+'ث  '+sq:'🍕 ابدأ الشغل';try{room.group.remove(pz.board);if(pz.board.material){pz.board.material.map&&pz.board.material.map.dispose();pz.board.material.dispose()}}catch(e){}const l=labelSprite(s,{s:3.4});l.position.set(0,3.8,-5.4);room.group.add(l);pz.board=l;pz.lastS=s}
function pzStart(){if(!pz||pz.s==='play')return;pz.s='play';pz.t=60;pz.sc=0;pz.combo=0;pz.ok=0;pzOrder();sfx('win')}
function pzPick(i){if(!pz||pz.s!=='play')return;if(i===pz.seq[pz.step]){pz.step++;sfx('click');if(pz.step>=4){pz.combo++;const pts=3+Math.min(4,pz.combo-1)+(pz.pat>8?2:0);pz.sc+=pts;pz.ok++;sfx('star');toast('🍕 جاهزة! +'+pts+(pz.combo>1?' · كومبو x'+pz.combo:''),900);pzOrder()}else pzBoard()}else{pz.combo=0;pz.step=0;pz.pat=Math.max(1,pz.pat-2);sfx('err');toast('❌ الترتيب غلط، ابدأ من الصلصة',900);pzBoard()}}
function pzzTick(dt){if(!room||room.type!=='pizza'||!pz||!player)return;
 if(pz.s!=='play'){pz.it.label='🍕 ابدأ مطعم البيتزا'+(me.pzzBest?' (أحسن '+me.pzzBest+')':'');return}
 pz.t-=dt;pz.pat-=dt;pz.it.x=player.root.position.x;pz.it.z=player.root.position.z+2.6;pz.it.label='🍕 '+Math.ceil(pz.t)+'ث · 🎯'+pz.sc;
 if(pz.pat<=0){pz.combo=0;toast('😤 الزبون 🤖 مشي!',800);pzOrder()}
 const s='🤖 بيتزا '+PZS[pz.ord][1]+' · '+Math.ceil(pz.pat)+'ث';if(!pz.lastS||pz.lastS.indexOf(s)!==0)pzBoard();
 if(pz.t<=0)pzEnd()}
function pzEnd(){pz.s='idle';pzBoard();const sc=pz.sc,t=today();if(!me.pzzd||me.pzzd.d!==t)me.pzzd={d:t,c:0};let pay=Math.min(Math.floor(sc/5),12-me.pzzd.c);if(pay<0)pay=0;me.pzzd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.pzzBest||0);if(nb)me.pzzBest=sc;me.pzzGames=(me.pzzGames||0)+1;saveMe();sfx('win');
 modal(c=>{c.innerHTML='<h2>🍕 خلص الشغل!</h2><div style="text-align:center;font-size:16px">خدمت '+pz.ok+' زبون<br>النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.pzzBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 5 نقاط لكل عملة)')+'</div><div class="row"><button class="btn g" id="pzz1">🔁 تاني</button><button class="btn d" id="pzz2">إغلاق</button></div>';$('pzz1').onclick=()=>{$('modal').style.display='none';pzStart()};$('pzz2').onclick=()=>{$('modal').style.display='none'}})}
let dn=null;const DNP=[['🔴',0xe03131,-3.5,-2.5],['🔵',0x1c7ed6,3.5,-2.5],['🟢',0x2f9e44,-3.5,2.5],['🟡',0xf59f00,3.5,2.5]];
let rk=null;
function buildRocket(){
 const g=indoor(0x1a1b3a,0x0b0c20,0x7950f2);
 sign(g,'🚀 قاعدة الإطلاق',0,4.6,-7.6,'rgba(121,80,242,.92)');
 for(let i=0;i<40;i++)g.add(mesh(G.box(0.08,0.08,0.05),0xfff3bf,-7.6+Math.random()*15.2,1+Math.random()*3,-7.95,0xfff3bf));
 g.add(mesh(G.cyl(2,2.2,0.3,16),0x495057,0,0.15,-4.5),mesh(G.cyl(0.7,0.7,3.2,14),0xf8f9fa,0,2.1,-4.5),mesh(G.cyl(0.01,0.7,1.3,14),0xfa5252,0,4.35,-4.5),mesh(G.sph(0.26,10),0x4dabf7,0,2.9,-3.8,0x1c7ed6),mesh(G.cyl(0.4,0.2,0.7,10),0xff922b,0,0.5,-4.5,0xff6b00));
 for(let k=0;k<3;k++){const a=k*2.09,f=mesh(G.box(0.12,1,0.7),0xfa5252,Math.cos(a)*0.85,0.9,-4.5+Math.sin(a)*0.85);f.rotation.y=-a;g.add(f)}
 for(const[x,c]of[[-5.5,0xff6b6b],[5.5,0x4dabf7]])g.add(mesh(G.sph(0.5,10),c,x,2.2,-5,c));
 rk={it:{x:0,z:-1.6,label:'🚀 انطلق',fn:rktStart}};interacts.push(rk.it);
 g.add(portalMesh('ارجع للمرصد',5.8,5.8,0xff8787,'obs'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🚀 اسحب صباعك يمين وشمال. اجمع النجوم وابعد عن الصخور',3000)
}
function rktStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-44,400),CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-330,420));
 let sx=W/2,tx=W/2,lv=3,sc=0,st=0,T=0,O=[],spT=0.5,inv=0,last=0,over=false,msg='',msgT=0;
 window.rkq=()=>({O,sx,lv,st,sc,over,CH,W,T});
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🚀 رحلة الفضاء</h2><div id="rkH" style="text-align:center;font-size:15px"></div><canvas id="rkC" style="touch-action:none;background:linear-gradient(#0b0c20,#2b2d6e);border-radius:12px;display:block;margin:4px auto"></canvas><div class="row"><button class="btn d" id="rkX">إغلاق</button></div>';
  const cv=$('rkC');cv.width=W;cv.height=CH;const x=cv.getContext('2d'),SY=CH-34,SR=14,stars=[];for(let i=0;i<30;i++)stars.push([Math.random()*W,Math.random()*CH,Math.random()*1.5+0.5]);
  const hud=()=>{$('rkH').textContent='❤️'.repeat(lv)+'🖤'.repeat(3-lv)+' · ⭐ '+st+' · 🛰️ '+sc};hud();
  const open=()=>$('rkC')&&$('modal').style.display!=='none';
  const mv=e=>{const r=cv.getBoundingClientRect();tx=Math.max(SR,Math.min(W-SR,(e.clientX-r.left)*W/r.width))};
  cv.onpointerdown=e=>{e.preventDefault();mv(e)};cv.onpointermove=mv;
  const end=()=>{over=true;const d=today();if(!me.rkd||me.rkd.d!==d)me.rkd={d,c:0};let pay=Math.min(4,Math.floor(sc/150),12-me.rkd.c);if(pay<0)pay=0;me.rkd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.rktBest||0);if(nb)me.rktBest=sc;me.rktGames=(me.rktGames||0)+1;saveMe();sfx('win');
   c.innerHTML='<h2>🚀 خلصت الرحلة</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · نجوم: <b>'+st+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.rktBest)+'<br>'+(pay?'+'+pay+'🪙':me.rkd.c>=12?'(وصلت حد النهاردة)':'محتاج 150 نقطة عشان عملة')+'</div><div class="row"><button class="btn g" id="rkR">🔁 تاني</button><button class="btn d" id="rkX">إغلاق</button></div>';$('rkR').onclick=()=>{$('modal').style.display='none';rktStart()};$('rkX').onclick=()=>{$('modal').style.display='none'}};
  const f=ts=>{if(!open())return;const d=Math.min(0.05,(ts-last)/1000);last=ts;
   if(!over){T+=d;const V=CH*(0.38+Math.min(0.5,T*0.01));sx+=(tx-sx)*Math.min(1,d*14);inv-=d;msgT-=d;sc=Math.floor(T*5)+st*10;spT-=d;
    if(spT<=0){const s=Math.random()<0.28;O.push({x:20+Math.random()*(W-40),y:-20,r:s?10:12+Math.random()*12,s,a:0});spT=Math.max(0.28,0.7-T*0.008)}
    O.forEach(o=>{o.y+=V*d;o.a+=d*2;if(!o.dead&&Math.hypot(o.x-sx,o.y-SY)<o.r+SR-3){o.dead=1;if(o.s){st++;sc+=10;msg='⭐ +10';msgT=0.5;sfx('star')}else if(inv<=0){lv--;inv=1.2;msg='💥';msgT=0.6;sfx('err')}hud()}});
    O=O.filter(o=>!o.dead&&o.y<CH+30);if(lv<=0){lv=0;hud();over=true;setTimeout(()=>{if(open())end()},400)}}
   x.clearRect(0,0,W,CH);x.fillStyle='#fff';stars.forEach(q=>{q[1]=(q[1]+q[2]*0.6)%CH;x.fillRect(q[0],q[1],q[2],q[2])});
   O.forEach(o=>{if(o.s){x.fillStyle='#ffd43b';x.beginPath();for(let k=0;k<10;k++){const rr=k%2?o.r*0.45:o.r,a=o.a+k*Math.PI/5;x.lineTo(o.x+Math.cos(a)*rr,o.y+Math.sin(a)*rr)}x.fill()}else{x.fillStyle='#868e96';x.beginPath();x.arc(o.x,o.y,o.r,0,6.3);x.fill();x.fillStyle='#5c6166';x.beginPath();x.arc(o.x-o.r*0.3,o.y-o.r*0.2,o.r*0.3,0,6.3);x.fill()}});
   if(!over&&(inv<=0||Math.floor(inv*10)%2)){x.fillStyle='#ff922b';x.beginPath();x.moveTo(sx-6,SY+12);x.lineTo(sx,SY+26+Math.random()*8);x.lineTo(sx+6,SY+12);x.fill();x.fillStyle='#f1f3f5';x.beginPath();x.moveTo(sx,SY-18);x.lineTo(sx+12,SY+14);x.lineTo(sx-12,SY+14);x.fill();x.fillStyle='#fa5252';x.fillRect(sx-14,SY+8,8,8);x.fillRect(sx+6,SY+8,8,8);x.fillStyle='#4dabf7';x.beginPath();x.arc(sx,SY,4,0,6.3);x.fill()}
   if(msgT>0){x.fillStyle='#ffe066';x.font='bold 20px sans-serif';x.textAlign='center';x.fillText(msg,W/2,40)}
   requestAnimationFrame(f)};
  $('rkX').onclick=()=>{$('modal').style.display='none'};requestAnimationFrame(ts=>{last=ts;f(ts)})})}
let pg=null;
function buildPong(){
 const g=indoor(0x3b5b3a,0x1b2a1b,0x94d82d);
 sign(g,'🏓 صالة البنج بونج',0,4.6,-7.6,'rgba(47,158,68,.92)');
 g.add(mesh(G.box(4.6,0.18,2.6),0x1c7ed6,0,1.1,-4.5),mesh(G.box(4.5,0.02,0.06),0xffffff,0,1.2,-4.5),mesh(G.box(0.06,0.02,2.5),0xffffff,0,1.2,-4.5),mesh(G.box(0.05,0.35,2.7),0xf1f3f5,0,1.38,-4.5));
 for(const[x,z]of[[-2.1,-3.5],[2.1,-3.5],[-2.1,-5.5],[2.1,-5.5]])g.add(mesh(G.cyl(0.07,0.07,1.05,6),0x495057,x,0.52,z));
 for(const[x,c]of[[-2.9,0xfa5252],[2.9,0x212529]]){g.add(mesh(G.cyl(0.35,0.35,0.05,12),c,x,1.5,-4.5),mesh(G.cyl(0.05,0.05,0.4,6),0x8d5a2b,x,1.25,-4.5));}
 g.add(mesh(G.sph(0.1,8),0xffffff,0.8,1.4,-4.3,0x888888));
 sign(g,'🤖 بوت اللعب',0,2.6,-4.5,'rgba(16,24,48,.9)');
 pg={it:{x:0,z:-1.6,label:'🏓 العب ضد البوت 🤖',fn:pgnStart}};interacts.push(pg.it);
 g.add(portalMesh('ارجع للإيقاع',5.8,5.8,0xff8787,'drum'),portalMesh('🧱 تتريس',-5.8,5.8,0x4c6ef5,'tetris'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('🏓 اسحب المضرب يمين وشمال. أول واحد يوصل 5 يكسب',3000)
}
function pgnStart(){
 const H=innerHeight<420,W=Math.min(innerWidth-44,380),CH=H?Math.max(130,innerHeight-165):Math.max(220,Math.min(innerHeight-330,420)),PW=W*0.26,BR=7,PY=CH-18,BY=18,wins=me.pgnWins||0,BS=W*Math.min(1.5,0.8+wins*0.05);
 let px=W/2,tx=W/2,bx=W/2,tb=W/2,ball={x:W/2,y:CH/2,vx:0,vy:0},s=CH*0.7,sp=0.8,P=0,B=0,err=0,over=false,last=0,hits=0,msg='';
 window.pgq=()=>({ball,px,bx,P,B,over,PW,W,CH,PY});
 const serve=dir=>{s=CH*0.7;const a=(Math.random()-.5)*0.8;ball={x:W/2,y:CH/2,vx:s*Math.sin(a),vy:dir*s*Math.cos(a)};sp=0.8;hits=0};
 modal(c=>{
  c.innerHTML='<h2 style="margin:4px">🏓 بنج بونج</h2><div id="pgH" style="text-align:center;font-size:15px"></div><canvas id="pgC" style="touch-action:none;background:#2b8a3e;border-radius:12px;display:block;margin:4px auto"></canvas><div class="row"><button class="btn d" id="pgX">إغلاق</button></div>';
  const cv=$('pgC');cv.width=W;cv.height=CH;const x=cv.getContext('2d');
  const hud=()=>{$('pgH').textContent='أنت '+P+' - '+B+' 🤖 بوت'};hud();
  const open=()=>$('pgC')&&$('modal').style.display!=='none';
  const mv=e=>{const r=cv.getBoundingClientRect();tx=Math.max(PW/2,Math.min(W-PW/2,(e.clientX-r.left)*W/r.width))};
  cv.onpointerdown=e=>{e.preventDefault();mv(e)};cv.onpointermove=mv;
  const end=()=>{over=true;const win=P>B,sc=Math.max(0,P*20+(win?30:0)-B*5),d=today();if(!me.pgd||me.pgd.d!==d)me.pgd={d,c:0};let pay=win?Math.min(3+(B===0?1:0),12-me.pgd.c):0;if(pay<0)pay=0;me.pgd.c+=pay;me.coins+=pay;updCoins();if(win)me.pgnWins=wins+1;const nb=sc>(me.pgnBest||0);if(nb)me.pgnBest=sc;me.pgnGames=(me.pgnGames||0)+1;saveMe();sfx(win?'win':'err');
   c.innerHTML='<h2>'+(win?'🏆 كسبت!':'😅 البوت كسب')+'</h2><div style="text-align:center;font-size:16px">النتيجة: <b>'+P+' - '+B+'</b> · النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.pgnBest)+'<br>'+(pay?'+'+pay+'🪙':win?'(وصلت حد النهاردة)':'العب تاني وكسبه')+(win?'<br>🤖 البوت هيبقى أسرع المرة الجاية':'')+'</div><div class="row"><button class="btn g" id="pgR">🔁 تاني</button><button class="btn d" id="pgX">إغلاق</button></div>';$('pgR').onclick=()=>{$('modal').style.display='none';pgnStart()};$('pgX').onclick=()=>{$('modal').style.display='none'}};
  const pt=who=>{if(who)P++;else B++;hud();sfx(who?'star':'err');if(P>=5||B>=5){over=true;setTimeout(()=>{if(open())end()},500)}else{ball.vx=ball.vy=0;sp=0;setTimeout(()=>{if(open()&&!over)serve(who?-1:1)},700)}};
  const f=ts=>{if(!open())return;const d=Math.min(0.04,(ts-last)/1000);last=ts;
   if(!over){px+=Math.max(-W*3*d,Math.min(W*3*d,tx-px));
    ball.x+=ball.vx*d;ball.y+=ball.vy*d;if(ball.x<BR){ball.x=BR;ball.vx=Math.abs(ball.vx)}if(ball.x>W-BR){ball.x=W-BR;ball.vx=-Math.abs(ball.vx)}
    const tg=ball.vy<0?ball.x+err:W/2;bx+=Math.max(-BS*d,Math.min(BS*d,tg-bx));bx=Math.max(PW/2,Math.min(W-PW/2,bx));
    if(ball.vy>0&&ball.y+BR>=PY-5&&ball.y<PY+8&&Math.abs(ball.x-px)<PW/2+BR){const a=Math.max(-1,Math.min(1,(ball.x-px)/(PW/2)))*0.95;s=Math.min(CH*1.5,s*1.05);ball.vx=s*Math.sin(a);ball.vy=-s*Math.cos(a);ball.y=PY-5-BR;sfx('tick');err=(Math.random()-.5)*PW*(1.7-Math.min(0.5,wins*0.05))}
    else if(ball.vy<0&&ball.y-BR<=BY+5&&ball.y>BY-8&&Math.abs(ball.x-bx)<PW/2+BR){const a=Math.max(-1,Math.min(1,(ball.x-bx)/(PW/2)))*0.95;s=Math.min(CH*1.5,s*1.05);ball.vx=s*Math.sin(a);ball.vy=s*Math.cos(a);ball.y=BY+5+BR;sfx('tick')}
    if(ball.vy||ball.vx){if(ball.y>CH+10)pt(0);else if(ball.y<-10)pt(1)}}
   x.clearRect(0,0,W,CH);x.strokeStyle='rgba(255,255,255,.5)';x.setLineDash([8,8]);x.lineWidth=2;x.beginPath();x.moveTo(0,CH/2);x.lineTo(W,CH/2);x.stroke();x.setLineDash([]);
   x.fillStyle='#212529';x.fillRect(bx-PW/2,BY-5,PW,10);x.fillStyle='#fa5252';x.fillRect(px-PW/2,PY-5,PW,10);x.fillStyle='#fff';x.beginPath();x.arc(ball.x,ball.y,BR,0,6.3);x.fill();
   requestAnimationFrame(f)};
  $('pgX').onclick=()=>{$('modal').style.display='none'};serve(Math.random()<0.5?1:-1);requestAnimationFrame(ts=>{last=ts;f(ts)})})}
function buildDance(){
 interacts=[];const g=indoor(0x1a0a33,0x3b1a6b,0xd6336c);
 g.add(mesh(G.box(15,0.06,15),0x241044,0,0.02,0));
 for(let i=0;i<5;i++)for(let j=0;j<5;j++)if((i+j)%2===0)g.add(mesh(G.box(3,0.02,3),0x34195e,-6+i*3,0.06,-6+j*3));
 dn={s:'idle',t:0,sc:0,combo:0,tg:-1,win:0,wmax:0,gap:0,ok:0,miss:0,pads:[]};
 DNP.forEach((p,i)=>{const m=mesh(G.cyl(1.5,1.5,0.12,20),p[1],p[2],0.1,p[3]);m.material=m.material.clone();m.material.color.setHex(p[1]);m.material.emissive=new THREE.Color(0x000000);m.userData.keep=true;g.add(m);dn.pads.push(m);
  const l=labelSprite(p[0],{s:1.4,bg:'rgba(0,0,0,0)'});l.position.set(p[2],1.6,p[3]);g.add(l)});
 const ball=mesh(G.sph(0.5,10),0xe9ecef,0,7.2,-3,0x888899);ball.material=ball.material.clone();ball.userData.keep=true;g.add(ball);dn.ball=ball;
 sign(g,'💃 حلبة الرقص · قف على المربع المنوّر',0,5.8,-6.8,'rgba(214,51,108,.92)');
 dn.it={x:0,z:5.2,label:'💃 ابدأ الرقص',fn:dnStart};interacts.push(dn.it);
 g.add(portalMesh('ارجع للكافيه',5.8,5.8,0xff8787,'cafe'));
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];mergeStatic(g);
 toast('💃 قف على المربع اللي بينوّر قبل ما الوقت يخلص',3000)
}
function dnSet(i,on){const m=dn.pads[i];if(!m)return;m.material.emissive.setHex(on?DNP[i][1]:0x000000);m.scale.y=on?3:1;m.scale.x=m.scale.z=on?1.12:1}
function dnNext(){if(dn.tg>=0)dnSet(dn.tg,false);let n;do{n=Math.floor(Math.random()*4)}while(n===dn.tg);dn.tg=n;dn.wmax=Math.max(2.4,4.2-dn.ok*0.1);dn.win=dn.wmax;dnSet(n,true)}
function dnStart(){if(!dn||dn.s==='play')return;dn.s='play';dn.t=45;dn.sc=0;dn.combo=0;dn.ok=0;dn.miss=0;dn.tg=-1;dn.gap=0.6;sfx('win')}
function dncTick(dt){if(!room||room.type!=='dance'||!dn||!player)return;
 if(dn.ball)dn.ball.rotation.y+=dt;
 if(dn.s!=='play'){dn.it.label='💃 ابدأ الرقص'+(me.dncBest?' (أحسن '+me.dncBest+')':'');return}
 dn.t-=dt;dn.it.x=player.root.position.x;dn.it.z=player.root.position.z+2.6;dn.it.label='💃 '+Math.ceil(dn.t)+'ث · 🎯'+dn.sc;
 if(dn.gap>0){dn.gap-=dt;if(dn.gap<=0)dnNext()}
 else{dn.win-=dt;const p=DNP[dn.tg];const d=Math.hypot(player.root.position.x-p[2],player.root.position.z-p[3]);
  if(d<1.4){const pts=1+Math.min(4,dn.combo)+(dn.win>dn.wmax/2?1:0);dn.combo++;dn.ok++;dn.sc+=pts;sfx('star');toast('✨ +'+pts+(dn.combo>1?' · كومبو x'+dn.combo:''),700);dnSet(dn.tg,false);dn.tg=-1;dn.gap=0.5}
  else if(dn.win<=0){dn.combo=0;dn.miss++;sfx('err');toast('😅 فاتك المربع',600);dnSet(dn.tg,false);dn.tg=-1;dn.gap=0.5}}
 if(dn.t<=0)dnEnd()}
function dnEnd(){if(dn.tg>=0)dnSet(dn.tg,false);dn.tg=-1;dn.s='idle';const sc=dn.sc,t=today();if(!me.dncd||me.dncd.d!==t)me.dncd={d:t,c:0};let pay=Math.min(Math.floor(sc/6),12-me.dncd.c);if(pay<0)pay=0;me.dncd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.dncBest||0);if(nb)me.dncBest=sc;me.dncGames=(me.dncGames||0)+1;saveMe();sfx('win');
 modal(c=>{c.innerHTML='<h2>💃 خلصت الرقصة!</h2><div style="text-align:center;font-size:16px">مربعات صح: '+dn.ok+' · فاتك: '+dn.miss+'<br>النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.dncBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 6 نقاط لكل عملة)')+'</div><div class="row"><button class="btn g" id="dnz1">🔁 تاني</button><button class="btn d" id="dnz2">إغلاق</button></div>';$('dnz1').onclick=()=>{$('modal').style.display='none';dnStart()};$('dnz2').onclick=()=>{$('modal').style.display='none'}})}
function buildLib(){
 interacts=[];const g=indoor(0x2d2250,0x4a3a7a,0x7950f2);
 g.add(mesh(G.box(15,0.06,15),0x6c5b9a,0,0.02,0));
 const cols=[0xe03131,0x1c7ed6,0x2f9e44,0xf08c00,0xae3ec9,0x0c8599];
 for(let r=0;r<2;r++)for(let i=0;i<5;i++){const x=-6+i*3,z=-6.4;g.add(mesh(G.box(2.6,0.12,0.9),0x6b4423,x,0.9+r*1.5,z));for(let k=0;k<7;k++)g.add(mesh(G.box(0.28,1.1,0.6),cols[(i+k+r)%6],x-1.0+k*0.33,1.5+r*1.5,z))}
 g.add(mesh(G.cyl(1.6,1.6,0.9,16),0x8d5a2b,0,0.45,-1),mesh(G.box(1.4,0.05,1.0),0xfff3bf,0,0.95,-1));
 sign(g,'📚 المكتبة · اختبار معلومات',0,5,-6.8,'rgba(121,80,242,.92)');sign(g,'🎓 دوس على الترابيزة وابدأ الاختبار',0,3,-1.2);
 interacts.push({x:0,z:0.6,label:'🎓 ابدأ اختبار المكتبة'+(me.quizBest?' (أحسن '+me.quizBest+')':''),fn:openQuiz});
 g.add(portalMesh('ارجع للحديقة',5.8,5.8,0xff8787,'garden'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('📚 مكتبة هادية · ابدأ اختبار المعلومات',2600)
}
const QZ=[['أكبر كوكب في المجموعة الشمسية؟',['المشتري','زحل','المريخ'],0],['عاصمة مصر؟',['الإسكندرية','القاهرة','أسوان'],1],['كام يوم في الأسبوع؟',['٥','٧','٩'],1],['أطول نهر في مصر؟',['النيل','الفرات','دجلة'],0],['أي حيوان بيقول مواء؟',['الكلب','القطة','الحصان'],1],['الشمس نجم ولا كوكب؟',['كوكب','نجم','قمر'],1],['كام ضلع في المثلث؟',['٣','٤','٥'],0],['لون السما في النهار؟',['أخضر','أزرق','أحمر'],1],['أكبر محيط في العالم؟',['الهادئ','الأطلسي','الهندي'],0],['٧ × ٨ = ؟',['٥٦','٤٨','٦٤'],0],['عدد أيام السنة العادية؟',['٣٦٥','٣٦٠','٣٣٠'],0],['إيه اللي بيدّي الصوف؟',['الخروف','الدجاجة','البقرة'],0],['الأهرامات في أي محافظة؟',['الجيزة','أسيوط','دمياط'],0],['أصغر عدد أولي؟',['١','٢','٣'],1],['الماء بيغلي عند كام درجة مئوية؟',['٥٠','١٠٠','١٥٠'],1],['كام حرف في الأبجدية العربية؟',['٢٨','٢٦','٣٠'],0],['أسرع حيوان بري؟',['الفهد','الأسد','الحصان'],0],['الذهب لونه؟',['فضي','أصفر','أبيض'],1],['كام شهر في السنة؟',['١٠','١٢','١٤'],1],['الأرض بتلف حوالين؟',['الشمس','القمر','المريخ'],0]];
function openQuiz(){modal(c=>{const qs=QZ.slice().sort(()=>Math.random()-0.5).slice(0,6);let qi=0,sc=0,tm=null,left=12;
 const fin=()=>{clearInterval(tm);const nb=sc>(me.quizBest||0);if(nb)me.quizBest=sc;me.memGames=(me.memGames||0)+1;const tt=today();if(!me.qzd||me.qzd.d!==tt)me.qzd={d:tt,c:0};let pay=Math.max(0,Math.min(sc*2,10-me.qzd.c));me.qzd.c+=pay;me.coins+=pay;updCoins();saveMe();sfx('win');c.innerHTML='<h2>🎓 خلص الاختبار!</h2><div style="text-align:center;font-size:16px">جاوبت صح <b>'+sc+'</b> من '+qs.length+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.quizBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="qzr">🔁 تاني</button><button class="btn d" id="qzx">إغلاق</button></div>';$('qzr').onclick=openQuiz;$('qzx').onclick=closeModal};
 const show=()=>{if(qi>=qs.length)return fin();const q=qs[qi];left=12;const ord=q[1].map((a,i)=>[a,i]).sort(()=>Math.random()-0.5);c.innerHTML='<h2>🎓 اختبار المكتبة</h2><div style="text-align:center;font-size:12px;opacity:.8">سؤال '+(qi+1)+'/'+qs.length+' · صح: '+sc+' · <span id="qt">'+left+'</span>ث</div><div style="text-align:center;font-size:18px;margin:12px 0;font-weight:bold">'+q[0]+'</div>'+ord.map(o=>'<button class="btn o" style="display:block;width:100%;margin:6px 0" data-a="'+o[1]+'">'+o[0]+'</button>').join('')+'<div class="row"><button class="btn d" id="qzx">إغلاق</button></div>';$('qzx').onclick=()=>{clearInterval(tm);closeModal()};
  c.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const ok=+b.dataset.a===q[2];if(ok){sc++;sfx('star')}else sfx('err');c.querySelectorAll('[data-a]').forEach(x=>{x.disabled=true;if(+x.dataset.a===q[2])x.style.background='#2f9e44'});if(!ok)b.style.background='#e03131';clearInterval(tm);setTimeout(()=>{qi++;show()},900)});
  clearInterval(tm);tm=setInterval(()=>{left--;const e=$('qt');if(e)e.textContent=left;if(!document.getElementById('qzx')){clearInterval(tm);return}if(left<=0){clearInterval(tm);qi++;show()}},1000)};
 show()})}
const ZA=[['🦁','الأسد',0xe8a33d,-4.5,-4],['🐘','الفيل',0x868e96,0,-4.5],['🦒','الزرافة',0xf0b84a,4.5,-4],['🐒','القرد',0x8d5a2b,-5,0.5],['🐧','البطريق',0x343a40,5,0.5],['🐢','السلحفاة',0x51cf66,0,1]];
function zooFed(){const k=today();if(!me.zoo||me.zoo.d!==k)me.zoo={d:k,fed:[],paid:0};return me.zoo}
function buildZoo(){
 interacts=[];const g=indoor(0x1f4d2b,0x2f7a43,0xf59f00);
 g.add(mesh(G.box(15,0.06,15),0x6abf69,0,0.02,0));
 const z=zooFed();
 ZA.forEach((a,i)=>{const [em,nm,col,x,zz]=a;g.add(mesh(G.box(2.6,0.15,2.6),0x8d6e63,x,0.08,zz));
  const body=mesh(G.box(1.4,0.9,0.9),col,x,0.9,zz),head=mesh(G.box(0.7,0.7,0.7),col,x+(i%2?0.8:-0.8),1.5,zz);g.add(body,head);for(const dx of[-0.5,0.5])for(const dz of[-0.3,0.3])g.add(mesh(G.box(0.22,0.5,0.22),col,x+dx,0.35,zz+dz));
  if(i===2)g.add(mesh(G.box(0.3,1.2,0.3),col,x+0.8,2.2,zz));
  const l=labelSprite(em+' '+nm,{s:1.7});l.position.set(x,3.0,zz);g.add(l);
  const e={x,z:zz+2,label:'🍎 أكّل '+nm+(z.fed.indexOf(i)>=0?' ✅':''),fn:()=>zooFeed(i,e,nm,em)};interacts.push(e)});
 sign(g,'🦁 حديقة الحيوان · أكّل كل الحيوانات النهارده',0,5,-6.8,'rgba(245,159,0,.92)');
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('🦁 أكّل الحيوانات · كل واحد +5🪙',2600)
}
function zooFeed(i,e,nm,em){const z=zooFed();if(z.fed.indexOf(i)>=0){toast(em+' '+nm+' شبعان النهارده',900);return}
 z.fed.push(i);let pay=Math.min(5,40-z.paid);if(pay<0)pay=0;z.paid+=pay;me.coins+=pay;e.label='🍎 أكّل '+nm+' ✅';
 sfx('star');burst(player.root.position.clone().setY(1.2),[0xff6b6b,0xffd43b,0x69db7c],14);toast(em+' '+nm+' بيشكرك! +'+pay+'🪙 ('+z.fed.length+'/6)',1200);
 if(z.fed.length===6){const bonus=Math.min(10,40-z.paid);z.paid+=Math.max(0,bonus);me.coins+=Math.max(0,bonus);me.zooAll=(me.zooAll||0)+1;sfx('win');setTimeout(()=>toast('🎉 أكّلت كل الحيوانات! +'+Math.max(0,bonus)+'🪙',2000),1300)}
 updCoins();saveMe()}
const TK=[['🐠','سمك المهرج',0xff922b,-4.5,-4],['🐡','النفيخة',0xffd43b,0,-4.5],['🦈','القرش الصغير',0x748ffc,4.5,-4],['🐙','الأخطبوط',0xf06595,-5,0.5],['🐢','السلحفاة البحرية',0x40c057,5,0.5]];
let tkFish=[];
function tankFed(){const k=today();if(!me.tkd||me.tkd.d!==k)me.tkd={d:k,fed:[],paid:0};return me.tkd}
function buildTank(){
 interacts=[];tkFish=[];const g=indoor(0x0b3a5c,0x145a85,0x22b8cf);
 g.add(mesh(G.box(15,0.06,15),0x1c7ed6,0,0.02,0));
 const z=tankFed();
 TK.forEach((a,i)=>{const [em,nm,col,x,zz]=a;g.add(mesh(G.box(3,0.2,3),0x495057,x,0.1,zz));
  g.add(mesh(G.box(0.2,2.2,3),0x74c0fc,x-1.5,1.3,zz),mesh(G.box(0.2,2.2,3),0x74c0fc,x+1.5,1.3,zz),mesh(G.box(3,2.2,0.2),0x74c0fc,x,1.3,zz-1.5));
  const l=labelSprite(em+' '+nm,{s:1.7});l.position.set(x,3.0,zz);g.add(l);
  const e={x,z:zz+2.2,label:'🍤 أكّل '+nm+(z.fed.indexOf(i)>=0?' ✅':''),fn:()=>tankFeed(i,e,nm,em)};interacts.push(e)});
 sign(g,'🐠 الأكواريوم · أكّل السمك النهارده',0,5,-6.8,'rgba(34,184,207,.92)');
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 mergeStatic(g);
 TK.forEach((a,i)=>{for(let k=0;k<3;k++){const f=new THREE.Group();f.add(mesh(G.box(0.5,0.28,0.2),a[2],0,0,0),mesh(G.box(0.18,0.3,0.1),a[2],-0.32,0,0));g.add(f);tkFish.push({f,cx:a[3],cz:a[4],ph:Math.random()*6.28,sp:0.6+Math.random()*0.8,r:0.5+k*0.2,y:0.7+k*0.45})}});
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('🐠 أكّل السمك · كل واحد +4🪙',2600)
}
function tankTick(dt){if(!room||room.type!=='tank')return;const t=performance.now()/1000;tkFish.forEach(o=>{const a=t*o.sp+o.ph;o.f.position.set(o.cx+Math.cos(a)*o.r*1.6,o.y+Math.sin(a*2)*0.1,o.cz+Math.sin(a)*o.r*1.6);o.f.rotation.y=-a-Math.PI/2})}
function tankFeed(i,e,nm,em){const z=tankFed();if(z.fed.indexOf(i)>=0){toast(em+' '+nm+' شبعان النهارده',900);return}
 z.fed.push(i);let pay=Math.min(4,30-z.paid);if(pay<0)pay=0;z.paid+=pay;me.coins+=pay;e.label='🍤 أكّل '+nm+' ✅';
 sfx('star');burst(player.root.position.clone().setY(1.2),[0x74c0fc,0x66d9e8,0xffffff],14);toast(em+' '+nm+' بيشكرك! +'+pay+'🪙 ('+z.fed.length+'/5)',1200);
 if(z.fed.length===5){const bonus=Math.min(10,30-z.paid);z.paid+=Math.max(0,bonus);me.coins+=Math.max(0,bonus);me.tkAll=(me.tkAll||0)+1;sfx('win');setTimeout(()=>toast('🎉 أكّلت كل السمك! +'+Math.max(0,bonus)+'🪙',2000),1300)}
 updCoins();saveMe()}
const FL=[['🌹','الورد الأحمر',0xe03131,-4.5,-4],['🌻','عباد الشمس',0xfcc419,0,-4.5],['🌷','التوليب',0xf06595,4.5,-4],['🪻','اللافندر',0x9775fa,-5,0.5],['🌼','الأقحوان',0xf8f9fa,5,0.5]];
let flwObjs=[];
function flwFed(){const k=today();if(!me.fld||me.fld.d!==k)me.fld={d:k,fed:[],paid:0};return me.fld}
function buildFlw(){
 interacts=[];flwObjs=[];const g=indoor(0x2b5d34,0x4c9a5a,0xf783ac);
 g.add(mesh(G.box(15,0.06,15),0x74b816,0,0.02,0));
 const z=flwFed();
 FL.forEach((a,i)=>{const [em,nm,col,x,zz]=a;g.add(mesh(G.box(3,0.25,3),0x6d4c41,x,0.12,zz));
  const l=labelSprite(em+' '+nm,{s:1.7});l.position.set(x,3.0,zz);g.add(l);
  const e={x,z:zz+2.2,label:'💧 اسقي '+nm+(z.fed.indexOf(i)>=0?' ✅':''),fn:()=>flwWater(i,e,nm,em)};interacts.push(e)});
 sign(g,'🌸 حديقة الورود · اسقي الورد النهارده',0,5,-6.8,'rgba(240,101,149,.92)');
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 mergeStatic(g);
 FL.forEach((a,i)=>{for(let k=0;k<5;k++){const f=new THREE.Group();f.add(mesh(G.box(0.08,0.9,0.08),0x37b24d,0,0.45,0),mesh(G.box(0.4,0.4,0.15),a[2],0,1.0,0));f.position.set(a[3]-1+(k%3)*1,0.25,a[4]-0.8+Math.floor(k/3)*1.2);g.add(f);flwObjs.push({f,ph:Math.random()*6})}});
 scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('🌸 اسقي الورد · كل واحد +3🪙',2600)
}
function flwTick(dt){if(!room||room.type!=='flw')return;const t=performance.now()/1000;flwObjs.forEach(o=>{o.f.rotation.z=Math.sin(t*1.5+o.ph)*0.12})}
function flwWater(i,e,nm,em){const z=flwFed();if(z.fed.indexOf(i)>=0){toast(em+' '+nm+' اتسقى النهارده',900);return}
 z.fed.push(i);let pay=Math.min(3,25-z.paid);if(pay<0)pay=0;z.paid+=pay;me.coins+=pay;e.label='💧 اسقي '+nm+' ✅';
 sfx('star');burst(player.root.position.clone().setY(1.2),[0x74c0fc,0xf783ac,0xffffff],14);toast(em+' '+nm+' اتسقى! +'+pay+'🪙 ('+z.fed.length+'/5)',1200);
 if(z.fed.length===5){const bonus=Math.min(10,25-z.paid);z.paid+=Math.max(0,bonus);me.coins+=Math.max(0,bonus);me.flAll=(me.flAll||0)+1;sfx('win');setTimeout(()=>toast('🎉 سقيت كل الورد! +'+Math.max(0,bonus)+'🪙',2000),1300)}
 updCoins();saveMe()}
let shS=null,shT=12,shI=null;
function shootTick(dt){
 const ok=(isNight||/[?&]wish/.test(location.search))&&room&&(room.type==='plaza'||room.type==='park'||room.type==='beach')&&player;
 if(!ok){if(shS){shS.visible=false}if(shI){const i=interacts.indexOf(shI);if(i>=0)interacts.splice(i,1);shI=null}return}
 if(!shS){shS=new THREE.Mesh(new THREE.BoxGeometry(0.25,0.25,6),new THREE.MeshBasicMaterial({color:0xfff3bf,transparent:true,opacity:0.9}));shS.visible=false;scene.add(shS);shS.userData={life:0}}
 if(shS.userData.life>0){const u=shS.userData;u.life-=dt;shS.position.x+=u.vx*dt;shS.position.y+=u.vy*dt;shS.position.z+=u.vz*dt;shS.material.opacity=Math.max(0,Math.min(0.9,u.life/1.5));
  if(u.life<=0){shS.visible=false;if(shI){const i=interacts.indexOf(shI);if(i>=0)interacts.splice(i,1);shI=null}}return}
 shT-=dt;if(shT>0)return;shT=(/[?&]wish/.test(location.search)?3:30)+Math.random()*30;
 const p=player.root.position,u=shS.userData;shS.position.set(p.x-30,45,p.z-50);u.vx=22;u.vy=-9;u.vz=6;u.life=4.5;shS.rotation.set(0,Math.atan2(u.vx,u.vz),0);shS.lookAt(shS.position.x+u.vx,shS.position.y+u.vy,shS.position.z+u.vz);shS.visible=true;
 shI={x:p.x,z:p.z,label:'🌠 اتمنى أمنية',fn:wishNow};interacts.push(shI);toast('🌠 نجمة بتعدي! اتمنى أمنية',2200)
}
function wishNow(){const k=today();if(!me.wsh||me.wsh.d!==k)me.wsh={d:k,n:0};if(shI){const i=interacts.indexOf(shI);if(i>=0)interacts.splice(i,1);shI=null}
 if(me.wsh.n>=3){toast('🌠 اتمنيت كفاية النهارده، بكرة تاني',1500);return}
 me.wsh.n++;me.wishAll=(me.wishAll||0)+1;me.coins+=3;updCoins();sfx('star');burst(player.root.position.clone().setY(2),[0xfff3bf,0xffd43b,0xffffff],18);toast('✨ أمنيتك اتسجلت! +3🪙 ('+me.wsh.n+'/3)',1800);saveMe()}
let balRun=null,balObjs=[];
function balDay(){const k=today();if(!me.bld||me.bld.d!==k)me.bld={d:k,paid:0,best:0};return me.bld}
function buildBal(){
 interacts=[];balObjs=[];balRun=null;const g=indoor(0x4a1f5e,0x7a3a9a,0xff6b6b);
 g.add(mesh(G.box(15,0.06,15),0x9c36b5,0,0.02,0));
 sign(g,'🎈 فرقعة البالونات · 25 ثانية',0,5,-6.8,'rgba(255,107,107,.92)');
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 const bd=balDay();
 interacts.push({x:0,z:3,label:'🎈 ابدأ الفرقعة (أفضل '+bd.best+')',fn:balStart});
 toast('🎈 امشي على البالونات عشان تفرقعها',2600)
}
const BALC=[0xff6b6b,0xffd43b,0x4dabf7,0x69db7c,0xf783ac,0xb197fc];
function balSpawn(){const f=new THREE.Group();const c=BALC[Math.floor(Math.random()*BALC.length)];f.add(mesh(G.box(0.8,1,0.8),c,0,1.4,0),mesh(G.box(0.05,0.8,0.05),0xdee2e6,0,0.6,0));f.position.set((Math.random()-0.5)*11,0,(Math.random()-0.5)*10);room.group.add(f);balObjs.push({f,ph:Math.random()*6})}
function balStart(){if(balRun){return}balRun={t:25,n:0};balObjs.forEach(o=>room.group.remove(o.f));balObjs=[];for(let i=0;i<9;i++)balSpawn();toast('🎈 ابدأ! 25 ثانية',1200)}
function balTick(dt){
 if(!room||room.type!=='bal'){if(balRun){balRun=null;balObjs=[]}return}
 balObjs.forEach(o=>{o.f.position.y=Math.sin(tClock*2+o.ph)*0.25});
 if(!balRun||!player)return;const h=chestHud(),p=player.root.position;balRun.t-=dt;h.style.display='block';h.textContent='🎈 '+balRun.n+' · ⏱ '+Math.max(0,Math.ceil(balRun.t));
 for(let i=balObjs.length-1;i>=0;i--){const o=balObjs[i];if(Math.hypot(o.f.position.x-p.x,o.f.position.z-p.z)<1){room.group.remove(o.f);balObjs.splice(i,1);balRun.n++;sfx('star');burst(o.f.position.clone().setY(1.6),[0xff6b6b,0xffd43b,0x4dabf7],10);balSpawn()}}
 if(balRun.t<=0){const n=balRun.n,bd=balDay();balRun=null;h.style.display='none';balObjs.forEach(o=>room.group.remove(o.f));balObjs=[];
  let pay=Math.min(Math.floor(n/2),20-bd.paid);if(pay<0)pay=0;bd.paid+=pay;me.coins+=pay;if(n>bd.best)bd.best=n;if(n>(me.balBest||0))me.balBest=n;me.balGames=(me.balGames||0)+1;
  sfx('win');toast('🎈 فرقعت '+n+' بالونة! +'+pay+'🪙',2600);updCoins();saveMe();
  const it=interacts.find(x=>x.label.startsWith('🎈 ابدأ'));if(it)it.label='🎈 ابدأ الفرقعة (أفضل '+bd.best+')'}
}
let dashRun=null,dashRings=[];
const DASHP=[[-5,-4],[5,-4.5],[5.5,1],[0,-1],[-5.5,1.5],[-3,5],[3.5,5]];
function dashDay(){const k=today();if(!me.dsd||me.dsd.d!==k)me.dsd={d:k,paid:0};return me.dsd}
function buildDash(){
 interacts=[];dashRings=[];dashRun=null;const g=indoor(0x0b4f3a,0x1f8a68,0x20c997);
 g.add(mesh(G.box(15,0.06,15),0x2b8a3e,0,0.02,0));
 sign(g,'🏁 سباق النقاط · عدّي كل الحلقات بالترتيب',0,5,-6.8,'rgba(32,201,151,.92)');
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 DASHP.forEach((p,i)=>{const r=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.12,8,20),new THREE.MeshBasicMaterial({color:0x868e96}));r.rotation.x=Math.PI/2;r.position.set(p[0],0.3,p[1]);g.add(r);const l=labelSprite(String(i+1),{s:1.2});l.position.set(p[0],1.6,p[1]);g.add(l);dashRings.push(r)});
 const bt=me.dashBest?me.dashBest.toFixed(1)+'ث':'-';
 interacts.push({x:0,z:4.2,label:'🏁 ابدأ السباق (أفضل '+bt+')',fn:dashStart});
 toast('🏁 عدّي الحلقات من 1 لـ 7 بأسرع وقت',2600)
}
function dashStart(){if(dashRun)return;dashRun={t:0,i:0};dashRings.forEach((r,i)=>r.material.color.set(i===0?0xffd43b:0x868e96));toast('🏁 يلا!',900)}
function dashTick(dt){
 if(!room||room.type!=='dash'){if(dashRun){dashRun=null;dashRings=[]}return}
 if(!dashRun||!player)return;const h=chestHud(),p=player.root.position;dashRun.t+=dt;h.style.display='block';h.textContent='🏁 '+(dashRun.i)+'/7 · '+dashRun.t.toFixed(1);
 const tg=DASHP[dashRun.i];
 if(Math.hypot(tg[0]-p.x,tg[1]-p.z)<1.1){dashRings[dashRun.i].material.color.set(0x51cf66);dashRun.i++;sfx('star');
  if(dashRun.i>=DASHP.length){const t=dashRun.t,bd=dashDay();dashRun=null;h.style.display='none';
   const fast=t<=18;let pay=fast?8:4;pay=Math.min(pay,20-bd.paid);if(pay<0)pay=0;bd.paid+=pay;me.coins+=pay;me.dashGames=(me.dashGames||0)+1;const nb=!me.dashBest||t<me.dashBest;if(nb)me.dashBest=t;
   sfx('win');toast('🏁 خلصت في '+t.toFixed(1)+'ث'+(nb?' · رقم قياسي! 🏆':'')+' +'+pay+'🪙',2800);updCoins();saveMe();
   const it=interacts.find(x=>x.label.startsWith('🏁 ابدأ'));if(it)it.label='🏁 ابدأ السباق (أفضل '+me.dashBest.toFixed(1)+'ث)'}
  else dashRings[dashRun.i].material.color.set(0xffd43b)}
}
function buildPlan(){
 interacts=[];const g=indoor(0x0b1033,0x1b2358,0x5c7cfa);
 g.add(mesh(G.box(15,0.06,15),0x1a1f4a,0,0.02,0),mesh(G.cyl(3.2,3.2,0.1,28),0x364fc7,0,0.08,-1,0x1a2a77));
 for(let i=0;i<60;i++){const a=Math.random()*6.283,r=3+Math.random()*4.5,h=2+Math.random()*4.5;g.add(mesh(G.sph(0.05+Math.random()*0.08,5),[0xffffff,0xffd43b,0x74c0fc][i%3],Math.cos(a)*r,h,Math.sin(a)*r-1,0xffffaa))}
 g.add(mesh(G.sph(0.7,12),0xffe066,0,3.2,-5,0xffaa00),mesh(G.sph(0.35,10),0x74c0fc,-3,4,-4,0x225588),mesh(G.sph(0.45,10),0xff8787,3.5,3.4,-3.5,0x882222));
 sign(g,'🔭 القبة النجمية · تتبّع النجوم',0,5.5,-6.8,'rgba(92,124,250,.92)');
 sign(g,'⚡ تحدي الحساب',-4,3,1.2,'rgba(230,119,0,.92)');
 sign(g,'🎨 تحدي الألوان',4,3,1.2,'rgba(156,54,181,.92)');
 sign(g,'🔤 رتّب الكلمة',-5.5,3,-2,'rgba(12,133,153,.92)');
 sign(g,'🔢 كمّل الأرقام',5.5,3,-2,'rgba(95,61,196,.92)');
 sign(g,'🟦 الشكل المختلف',5.8,3,-5.2,'rgba(24,100,171,.92)');
 sign(g,'⚖️ مين الأكبر',-5.8,3,-5.2,'rgba(201,42,42,.92)');
 sign(g,'✔️ صح ولا غلط',-2.8,3,-5.9,'rgba(47,158,68,.92)');
 sign(g,'🔢 عدّ بسرعة',2.8,3,-5.9,'rgba(25,113,194,.92)');
 sign(g,'➕ كمّل الناقص',-8,3,-5.2,'rgba(156,54,181,.92)');
 sign(g,'🐍 ثعبان الحلبة',8,3,-5.2,'rgba(47,158,68,.92)');
 sign(g,'🔷 لعبة 2048',8,3,-1.5,'rgba(92,124,250,.92)');
 sign(g,'💣 كاسح الألغام',-8,3,-1.5,'rgba(232,89,12,.92)');
 interacts.push({x:-8,z:-1.5,label:'💣 ابدأ كاسح الألغام'+(me.mnsBest?' (أحسن '+me.mnsBest+')':''),fn:openMns});
 interacts.push({x:8,z:-1.5,label:'🔷 ابدأ 2048'+(me.tzfBest?' (أحسن '+me.tzfBest+')':''),fn:openTzf});
 interacts.push({x:8,z:-5.2,label:'🐍 ابدأ ثعبان الحلبة'+(me.snkBest?' (أحسن '+me.snkBest+')':''),fn:openSnk});
 interacts.push({x:-8,z:-5.2,label:'➕ ابدأ كمّل الناقص'+(me.adxBest?' (أحسن '+me.adxBest+')':''),fn:openAdx});
 interacts.push({x:2.8,z:-5.9,label:'🔢 ابدأ عدّ بسرعة'+(me.cntBest?' (أحسن '+me.cntBest+')':''),fn:openCnt});
 interacts.push({x:-2.8,z:-5.9,label:'✔️ ابدأ صح ولا غلط'+(me.tfqBest?' (أحسن '+me.tfqBest+')':''),fn:openTfq});
 interacts.push({x:-5.8,z:-5.2,label:'⚖️ ابدأ مين الأكبر'+(me.cmpBest?' (أحسن '+me.cmpBest+')':''),fn:openCmp});
 interacts.push({x:5.8,z:-5.2,label:'🟦 ابدأ الشكل المختلف'+(me.oddBest?' (أحسن '+me.oddBest+')':''),fn:openOdd});
 interacts.push({x:5.5,z:-2,label:'🔢 ابدأ كمّل الأرقام'+(me.seqBest?' (أحسن '+me.seqBest+')':''),fn:openSeq});
 interacts.push({x:-5.5,z:-2,label:'🔤 ابدأ رتّب الكلمة'+(me.wrdBest?' (أحسن '+me.wrdBest+')':''),fn:openWord});
 interacts.push({x:4,z:1.2,label:'🎨 ابدأ تحدي الألوان'+(me.clrBest?' (أحسن '+me.clrBest+')':''),fn:openColor});
 interacts.push({x:-4,z:1.2,label:'⚡ ابدأ تحدي الحساب'+(me.mthBest?' (أحسن '+me.mthBest+')':''),fn:openMath});
 interacts.push({x:0,z:1.2,label:'🌌 ابدأ تتبّع النجوم'+(me.simonBest?' (أحسن '+me.simonBest+')':''),fn:openStarSeq});
 g.add(portalMesh('ارجع للكافيه',5.8,5.8,0xff8787,'cafe'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('🔭 اتفرج على النجوم وكرّر الترتيب',2600)
}
function openMath(){modal(c=>{const lw=innerHeight<420;let t=30,sc=0,tot=0,alive=true,ans=0;const td=today();if(!me.mtd||me.mtd.d!==td)me.mtd={d:td,paid:0};
 c.innerHTML='<h2>⚡ تحدي الحساب</h2><div id="mhd" style="text-align:center;margin:4px;font-size:15px"></div><div id="mq" style="text-align:center;font-size:'+(lw?24:34)+'px;margin:'+(lw?4:10)+'px;direction:ltr"></div><div id="mo" style="display:grid;grid-template-columns:'+(lw?'repeat(4,1fr)':'1fr 1fr')+';gap:10px"></div><div class="row"><button class="btn d" id="mx">إغلاق</button></div>';
 $('mx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const q=()=>{const op=Math.random()<0.5?'+':(Math.random()<0.5?'-':'×');let a,b;if(op==='×'){a=2+Math.floor(Math.random()*9);b=2+Math.floor(Math.random()*9);ans=a*b}else{a=5+Math.floor(Math.random()*(20+sc*2));b=2+Math.floor(Math.random()*(15+sc));if(op==='-'&&b>a){const x=a;a=b;b=x}ans=op==='+'?a+b:a-b}
  $('mq').textContent=a+' '+op+' '+b+' = ?';const o=new Set([ans]);while(o.size<4){const d=Math.floor(Math.random()*9)-4;if(d)o.add(Math.max(0,ans+d))}
  const arr=[...o].sort(()=>Math.random()-0.5);const box=$('mo');box.innerHTML='';arr.forEach(v=>{const bt=document.createElement('button');bt.className='btn';bt.style.cssText='height:'+(lw?44:60)+'px;font-size:22px';bt.textContent=v;bt.onclick=()=>pick(v);box.appendChild(bt)})};
 const hd=()=>{const e=$('mhd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const pick=v=>{if(!alive)return;tot++;if(v===ans){sc++;sfx('chat')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.mthGames=(me.mthGames||0)+1;qAdd('brain');const nb=sc>(me.mthBest||0);if(nb)me.mthBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.mtd.paid);if(pay<0)pay=0;me.mtd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=8?'win':'err');
  c.innerHTML='<h2>⚡ خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b> من '+tot+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.mthBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="mr">🔁 تاني</button><button class="btn d" id="mx2">إغلاق</button></div>';$('mr').onclick=openMath;$('mx2').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('mq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__math={get ans(){return ans},pick,get sc(){return sc}};hd();q()})}
function openColor(){modal(c=>{const lw=innerHeight<420;const CL=[['أحمر','#fa5252'],['أزرق','#339af0'],['أخضر','#40c057'],['أصفر','#fab005']];let t=30,sc=0,tot=0,alive=true,ans=0;const td=today();if(!me.cld||me.cld.d!==td)me.cld={d:td,paid:0};
 c.innerHTML='<h2>🎨 تحدي الألوان</h2><div style="text-align:center;font-size:13px;opacity:.8">اضغط على <b>لون الكلمة</b> مش معناها</div><div id="chd" style="text-align:center;margin:4px;font-size:15px"></div><div id="cq" style="text-align:center;font-size:'+(lw?30:44)+'px;font-weight:bold;margin:'+(lw?2:10)+'px"></div><div id="co" style="display:grid;grid-template-columns:'+(lw?'repeat(4,1fr)':'1fr 1fr')+';gap:10px"></div><div class="row"><button class="btn d" id="cx">إغلاق</button></div>';
 $('cx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const box=$('co');CL.forEach((k,i)=>{const bt=document.createElement('button');bt.style.cssText='height:'+(lw?44:58)+'px;border:0;border-radius:14px;background:'+k[1]+';color:#fff;font-size:18px;font-weight:bold';bt.textContent=k[0];bt.onclick=()=>pick(i);box.appendChild(bt)});
 const q=()=>{const w=Math.floor(Math.random()*4);let col=Math.floor(Math.random()*4);if(Math.random()<0.7)while(col===w)col=Math.floor(Math.random()*4);ans=col;const e=$('cq');e.textContent=CL[w][0];e.style.color=CL[col][1]};
 const hd=()=>{const e=$('chd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const pick=i=>{if(!alive)return;tot++;if(i===ans){sc++;sfx('chat')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.clrGames=(me.clrGames||0)+1;qAdd('brain');const nb=sc>(me.clrBest||0);if(nb)me.clrBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.cld.paid);if(pay<0)pay=0;me.cld.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=8?'win':'err');
  c.innerHTML='<h2>🎨 خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b> من '+tot+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.clrBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="cr">🔁 تاني</button><button class="btn d" id="cx2">إغلاق</button></div>';$('cr').onclick=openColor;$('cx2').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('cq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__clr={get ans(){return ans},pick,get sc(){return sc}};hd();q()})}
function openSeq(){modal(c=>{const lw=innerHeight<420,nw=innerWidth<340;let t=30,sc=0,alive=true,ans=0;const td=today();if(!me.sqd||me.sqd.d!==td)me.sqd={d:td,paid:0};
 c.innerHTML='<h2>🔢 كمّل الأرقام</h2><div id="shd" style="text-align:center;margin:4px;font-size:15px"></div><div id="sq" dir="ltr" style="text-align:center;font-size:'+(nw?21:lw?24:30)+'px;font-weight:700;min-height:'+(lw?30:48)+'px;margin:'+(lw?2:8)+'px;white-space:nowrap"></div><div id="so" style="display:grid;grid-template-columns:1fr 1fr;gap:8px"></div><div class="row"><button class="btn d" id="sx">إغلاق</button></div>';
 $('sx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('shd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const R=n=>Math.floor(Math.random()*n);
 const q=()=>{const k=R(3);let a=1+R(9),d=2+R(7),arr=[];if(k===0){for(let i=0;i<5;i++)arr.push(a+d*i)}else if(k===1){d=2+R(2);a=1+R(3);for(let i=0;i<5;i++)arr.push(a*Math.pow(d,i))}else{for(let i=1;i<=5;i++)arr.push(i*i+a)}
  ans=arr[4];const sh=arr.slice(0,4);const opts=[ans];let g=0;while(opts.length<4&&g++<50){const o=ans+(R(2)?1:-1)*(1+R(Math.max(2,Math.round(ans*.3))));if(o>0&&!opts.includes(o))opts.push(o)}while(opts.length<4)opts.push(ans+opts.length*7);opts.sort(()=>Math.random()-0.5);
  $('sq').textContent=sh.join(' , ')+' , ?';const box=$('so');box.innerHTML='';opts.forEach(o=>{const b=document.createElement('button');b.className='btn';b.style.cssText='font-size:24px;padding:'+(lw?3:10)+'px 0';b.textContent=o;b.onclick=()=>pick(o);box.appendChild(b)})};
 const pick=o=>{if(!alive)return;if(o===ans){sc++;sfx('win')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.seqGames=(me.seqGames||0)+1;qAdd('brain');const nb=sc>(me.seqBest||0);if(nb)me.seqBest=sc;let pay=Math.min(Math.floor(sc/2),10-me.sqd.paid);if(pay<0)pay=0;me.sqd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>🔢 خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.seqBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 2 صح لكل عملة)')+'</div><div class="row"><button class="btn g" id="sr">🔁 تاني</button><button class="btn d" id="sx2">إغلاق</button></div>';$('sr').onclick=openSeq;$('sx2').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('sq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__seq={get ans(){return ans},pick,get sc(){return sc}};hd();q()})}
function openOdd(){modal(c=>{const lw=innerHeight<420;let t=30,sc=0,alive=true,odd=-1;const td=today();if(!me.oddd||me.oddd.d!==td)me.oddd={d:td,paid:0};
 const sz=Math.max(100,Math.min(280,innerHeight-(lw?200:260),innerWidth-70));
 c.innerHTML='<h2>🟦 الشكل المختلف</h2><div id="ohd" style="text-align:center;margin:4px;font-size:15px"></div><div id="og" style="display:grid;gap:5px;margin:6px auto;width:'+sz+'px;height:'+sz+'px"></div><div class="row"><button class="btn d" id="ox">إغلاق</button></div>';
 $('ox').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('ohd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const R=n=>Math.floor(Math.random()*n);
 const q=()=>{const n=Math.min(5,2+Math.floor(sc/3)),df=Math.max(7,26-sc*1.5),h=R(360),sa=55+R(25),l=45+R(15),g=$('og');if(!g)return;g.style.gridTemplateColumns='repeat('+n+',1fr)';g.style.gridTemplateRows='repeat('+n+',1fr)';g.innerHTML='';odd=R(n*n);
  for(let i=0;i<n*n;i++){const b=document.createElement('button');const ll=i===odd?(l+(R(2)?df:-df)):l;b.style.cssText='border:0;border-radius:10px;cursor:pointer;background:hsl('+h+','+sa+'%,'+Math.max(18,Math.min(85,ll))+'%)';b.onclick=()=>pick(i);g.appendChild(b)}};
 const pick=i=>{if(!alive)return;if(i===odd){sc++;sfx('win')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.oddGames=(me.oddGames||0)+1;qAdd('brain');const nb=sc>(me.oddBest||0);if(nb)me.oddBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.oddd.paid);if(pay<0)pay=0;me.oddd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>🟦 خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.oddBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 3 صح لكل عملة)')+'</div><div class="row"><button class="btn g" id="or">🔁 تاني</button><button class="btn d" id="ox2">إغلاق</button></div>';$('or').onclick=openOdd;$('ox2').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('og')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__odd={get odd(){return odd},pick,get sc(){return sc}};hd();q()})}
function openAdx(){modal(c=>{const lw=innerHeight<420,nw=innerWidth<340;let t=30,sc=0,alive=true,ans=0;const td=today();if(!me.adxd||me.adxd.d!==td)me.adxd={d:td,paid:0};
 c.innerHTML='<h2>➕ كمّل الناقص</h2><div id="ahd" style="text-align:center;margin:4px;font-size:15px"></div><div id="aq" dir="ltr" style="text-align:center;font-size:'+(nw?26:lw?28:36)+'px;font-weight:bold;margin:'+(lw?2:10)+'px 0;white-space:nowrap"></div><div id="ab" dir="ltr" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:'+(lw?2:8)+'px 0"></div><div class="row"><button class="btn d" id="axx">إغلاق</button></div>';
 $('axx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('ahd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const R=n=>Math.floor(Math.random()*n);
 const q=()=>{const lv=Math.min(3,Math.floor(sc/4)),mx=[10,20,50,100][lv],tot=mx-R(Math.floor(mx/2)),a=1+R(tot-1),b=tot-a;ans=b;const e=$('aq'),box=$('ab');if(!e||!box)return;e.textContent=a+' + ? = '+tot;const o=new Set([b]);while(o.size<3){const d=1+R(3),v=b+(R(2)?d:-d);if(v>=1)o.add(v)}const arr=[...o].sort(()=>Math.random()-.5);box.innerHTML='';arr.forEach(v=>{const x=document.createElement('button');x.className='btn';x.style.cssText='font-size:'+(lw?20:26)+'px;padding:'+(lw?10:20)+'px 0';x.textContent=v;x.onclick=()=>pick(v);box.appendChild(x)})};
 const pick=v=>{if(!alive)return;if(v===ans){sc++;sfx('win')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.adxGames=(me.adxGames||0)+1;qAdd('brain');const nb=sc>(me.adxBest||0);if(nb)me.adxBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.adxd.paid);if(pay<0)pay=0;me.adxd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>➕ خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.adxBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 3 صح لكل عملة)')+'</div><div class="row"><button class="btn g" id="ar">🔁 تاني</button><button class="btn d" id="ax3">إغلاق</button></div>';$('ar').onclick=openAdx;$('ax3').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('aq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__adx={get ans(){return ans},pick,get sc(){return sc}};hd();q()})}
function openSnk(){modal(c=>{const lw=innerHeight<420,N=14,S=lw?160:Math.max(190,Math.min(280,innerWidth-70,innerHeight-350)),cs=Math.floor(S/N),W=cs*N;let sn=[[7,7],[6,7],[5,7]],dir=[1,0],nd=[1,0],ap=[10,7],sc=0,alive=true,started=false,tmo=0;const td=today();if(!me.snkd||me.snkd.d!==td)me.snkd={d:td,paid:0};
 const bs='font-size:'+(lw?18:24)+'px;padding:'+(lw?6:12)+'px 0;min-width:'+(lw?46:58)+'px';
 c.innerHTML='<h2>🐍 ثعبان الحلبة</h2><div id="skh" style="text-align:center;margin:2px;font-size:15px"></div><div style="display:flex;flex-direction:'+(lw?'row':'column')+';align-items:center;justify-content:center;gap:'+(lw?14:8)+'px"><canvas id="skc" width="'+W+'" height="'+W+'" style="touch-action:none;border-radius:10px;border:3px solid #2f9e44;background:#0b3d20;max-width:100%"></canvas>'+(lw?'<div style="display:flex;flex-direction:column;align-items:center">':'')+'<div dir="ltr" style="display:grid;grid-template-columns:repeat(3,'+(lw?46:58)+'px);gap:5px;justify-content:center"><span></span><button class="btn" id="sku" style="'+bs+'">⬆️</button><span></span><button class="btn" id="skl" style="'+bs+'">⬅️</button><button class="btn" id="skd" style="'+bs+'">⬇️</button><button class="btn" id="skr" style="'+bs+'">➡️</button></div>'+(lw?'<button class="btn d" id="skx" style="margin-top:8px">إغلاق</button></div><div style="position:absolute;left:-9999px" id="skm"></div>':'</div><div style="text-align:center;font-size:12px;margin:3px" id="skm">اسحب على الشاشة أو اضغط الأسهم للبدء</div><div class="row"><button class="btn d" id="skx">إغلاق</button></div>');
 const cx=$('skc').getContext('2d'),R=n=>Math.floor(Math.random()*n);
 const hd=()=>{const e=$('skh');if(e)e.textContent='🍎 '+sc};
 const place=()=>{let a;do{a=[R(N),R(N)]}while(sn.some(s=>s[0]===a[0]&&s[1]===a[1]));ap=a};
 const draw=()=>{if(!$('skc'))return;for(let i=0;i<N;i++)for(let j=0;j<N;j++){cx.fillStyle=(i+j)%2?'#0e4a27':'#0b3d20';cx.fillRect(i*cs,j*cs,cs,cs)}
  cx.fillStyle='#e03131';cx.beginPath();cx.arc(ap[0]*cs+cs/2,ap[1]*cs+cs/2,cs*.38,0,7);cx.fill();cx.fillStyle='#2f9e44';cx.fillRect(ap[0]*cs+cs/2-1,ap[1]*cs+1,3,cs*.22);
  sn.forEach((s,i)=>{cx.fillStyle=i?(i%2?'#51cf66':'#40c057'):'#ffd43b';const m=i?1.5:1;cx.fillRect(s[0]*cs+m,s[1]*cs+m,cs-2*m,cs-2*m);if(!i){cx.fillStyle='#111';const ex=dir[1]?[[.28,.4],[.72,.4]]:[[.5,.28],[.5,.72]];ex.forEach(e=>{cx.beginPath();cx.arc(s[0]*cs+e[0]*cs,s[1]*cs+e[1]*cs,cs*.09,0,7);cx.fill()})}})};
 const kd=e=>{const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(m&&alive){e.preventDefault();turn(m[0],m[1])}};
 document.addEventListener('keydown',kd);
 const cleanup=()=>{alive=false;clearTimeout(tmo);document.removeEventListener('keydown',kd)};
 const turn=(dx,dy)=>{if(!alive)return;if(dx===-dir[0]&&dy===-dir[1])return;nd=[dx,dy];if(!started){started=true;const m=$('skm');if(m)m.textContent='🍎 كُل التفاح وماتخبطش في الحيطة ولا في نفسك';tmo=setTimeout(loop,200)}};
 const step=()=>{dir=nd;const h=[sn[0][0]+dir[0],sn[0][1]+dir[1]];if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||sn.slice(0,-1).some(s=>s[0]===h[0]&&s[1]===h[1])){end();return false}sn.unshift(h);if(h[0]===ap[0]&&h[1]===ap[1]){sc++;sfx('win');place()}else sn.pop();hd();draw();return true};
 const loop=()=>{if(!alive||!$('skc')){cleanup();return}if(step())tmo=setTimeout(loop,Math.max(75,190-sc*6))};
 const end=()=>{cleanup();me.snkGames=(me.snkGames||0)+1;qAdd('brain');const nb=sc>(me.snkBest||0);if(nb)me.snkBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.snkd.paid);if(pay<0)pay=0;me.snkd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>🐍 خلصت اللعبة</h2><div style="text-align:center;font-size:16px">تفاح اتاكل: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.snkBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 3 تفاحات لكل عملة)')+'</div><div class="row"><button class="btn g" id="skr2">🔁 تاني</button><button class="btn d" id="skx3">إغلاق</button></div>';$('skr2').onclick=openSnk;$('skx3').onclick=closeModal};
 $('skx').onclick=()=>{cleanup();closeModal()};
 $('sku').onclick=()=>turn(0,-1);$('skd').onclick=()=>turn(0,1);$('skl').onclick=()=>turn(-1,0);$('skr').onclick=()=>turn(1,0);
 let tx=0,ty=0;const cv=$('skc');cv.addEventListener('touchstart',e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;e.preventDefault()},{passive:false});cv.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;if(Math.max(Math.abs(dx),Math.abs(dy))<14)return;if(Math.abs(dx)>Math.abs(dy))turn(dx>0?1:-1,0);else turn(0,dy>0?1:-1);e.preventDefault()},{passive:false});
 window.__snk={turn,step,get sc(){return sc},get alive(){return alive},get sn(){return sn},get ap(){return ap},set ap(v){ap=v},get started(){return started}};hd();draw()})}
function openTzf(){modal(c=>{const lw=innerHeight<420,S=lw?168:Math.max(190,Math.min(290,innerWidth-70,innerHeight-350));let g=Array(16).fill(0),sc=0,alive=true,over=false;const td=today();if(!me.tzfd||me.tzfd.d!==td)me.tzfd={d:td,paid:0};
 const COL={0:'#1c2a4a',2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'};
 const bs='font-size:'+(lw?18:24)+'px;padding:'+(lw?6:12)+'px 0;min-width:'+(lw?46:58)+'px';
 c.innerHTML='<h2>🔷 2048</h2><div id="tzh" style="text-align:center;margin:2px;font-size:15px"></div><div style="display:flex;flex-direction:'+(lw?'row':'column')+';align-items:center;justify-content:center;gap:'+(lw?14:8)+'px"><div id="tzb" dir="ltr" style="touch-action:none;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;width:'+S+'px;height:'+S+'px;padding:5px;border-radius:10px;background:#0b1033;border:3px solid #5c7cfa;box-sizing:content-box"></div>'+(lw?'<div style="display:flex;flex-direction:column;align-items:center">':'')+'<div dir="ltr" style="display:grid;grid-template-columns:repeat(3,'+(lw?46:58)+'px);gap:5px;justify-content:center"><span></span><button class="btn" id="tzu" style="'+bs+'">⬆️</button><span></span><button class="btn" id="tzl" style="'+bs+'">⬅️</button><button class="btn" id="tzd" style="'+bs+'">⬇️</button><button class="btn" id="tzr" style="'+bs+'">➡️</button></div>'+(lw?'<div style="display:flex;gap:6px;margin-top:8px"><button class="btn g" id="tze" style="padding:6px 8px">🏁 إنهاء</button><button class="btn d" id="tzx" style="padding:6px 8px">إغلاق</button></div></div>':'</div><div class="row"><button class="btn g" id="tze">🏁 إنهاء واستلم</button><button class="btn d" id="tzx">إغلاق</button></div>');
 const R=n=>Math.floor(Math.random()*n);
 const hd=()=>{const e=$('tzh');if(e)e.textContent='🔷 '+sc+' · 🏆 '+(me.tzfBest||0)};
 const draw=()=>{const bx=$('tzb');if(!bx)return;bx.innerHTML='';const ts=Math.floor((S-20)/4);g.forEach(v=>{const d=document.createElement('div');d.style.cssText='display:flex;align-items:center;justify-content:center;border-radius:6px;font-weight:bold;background:'+(COL[v]||'#3c3a32')+';color:'+(v>4?'#fff':'#444')+';font-size:'+(v>=1024?Math.floor(ts*.3):v>=128?Math.floor(ts*.38):Math.floor(ts*.46))+'px';d.textContent=v||'';bx.appendChild(d)})};
 const spawn=()=>{const e=[];g.forEach((v,i)=>{if(!v)e.push(i)});if(e.length)g[e[R(e.length)]]=R(10)?2:4};
 const line=a=>{const t=a.filter(x=>x);const o=[];for(let i=0;i<t.length;i++){if(t[i]===t[i+1]){o.push(t[i]*2);sc+=t[i]*2;i++}else o.push(t[i])}while(o.length<4)o.push(0);return o};
 const canMove=()=>{if(g.includes(0))return true;for(let i=0;i<16;i++){if(i%4<3&&g[i]===g[i+1])return true;if(i<12&&g[i]===g[i+4])return true}return false};
 const move=d=>{if(!alive||over)return false;const before=g.join();const n=g.slice();for(let k=0;k<4;k++){const idx=[0,1,2,3].map(j=>d===0?k*4+j:d===1?k*4+3-j:d===2?j*4+k:(3-j)*4+k);const l=line(idx.map(i=>g[i]));idx.forEach((i,j)=>n[i]=l[j])}
  if(n.join()===before)return false;g=n;spawn();sfx('win');hd();draw();if(!canMove()){over=true;setTimeout(()=>{if($('tzb'))end()},700)}return true};
 const end=()=>{if(!alive)return;alive=false;document.removeEventListener('keydown',kd);me.tzfGames=(me.tzfGames||0)+1;qAdd('brain');const nb=sc>(me.tzfBest||0);if(nb)me.tzfBest=sc;let pay=Math.min(Math.floor(sc/250),10-me.tzfd.paid);if(pay<0)pay=0;me.tzfd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=250?'win':'err');
  c.innerHTML='<h2>🔷 خلصت اللعبة</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b> · أعلى مربع: <b>'+Math.max(...g)+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.tzfBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 250 نقطة لكل عملة)')+'</div><div class="row"><button class="btn g" id="tzr2">🔁 تاني</button><button class="btn d" id="tzx3">إغلاق</button></div>';$('tzr2').onclick=openTzf;$('tzx3').onclick=closeModal};
 const kd=e=>{const m={ArrowUp:2,ArrowDown:3,ArrowLeft:0,ArrowRight:1}[e.key];if(m!==undefined&&alive){e.preventDefault();move(m)}};
 document.addEventListener('keydown',kd);
 $('tzx').onclick=()=>{alive=false;document.removeEventListener('keydown',kd);closeModal()};$('tze').onclick=()=>{if(sc>0||g.some(v=>v>2))end();else{alive=false;document.removeEventListener('keydown',kd);closeModal()}};
 $('tzu').onclick=()=>move(2);$('tzd').onclick=()=>move(3);$('tzl').onclick=()=>move(0);$('tzr').onclick=()=>move(1);
 let tx=0,ty=0;const cv=$('tzb');cv.addEventListener('touchstart',e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;e.preventDefault()},{passive:false});cv.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;if(Math.max(Math.abs(dx),Math.abs(dy))<14)return;if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:0);else move(dy>0?3:2);e.preventDefault()},{passive:false});
 spawn();spawn();window.__tzf={move,get g(){return g},set g(v){g=v},get sc(){return sc},set sc(v){sc=v},get alive(){return alive},draw,hd};hd();draw()})}
function openMns(){modal(c=>{const lw=innerHeight<420,N=8,M=10,S=lw?152:Math.max(200,Math.min(300,innerWidth-70,innerHeight-340));let mine=Array(64).fill(0),rev=Array(64).fill(0),flg=Array(64).fill(0),placed=false,alive=true,flagMode=false,won=false,sc=0;const td=today();if(!me.mnsd||me.mnsd.d!==td)me.mnsd={d:td,paid:0};
 const cs=Math.floor(S/N),NC=['','#4dabf7','#51cf66','#ff6b6b','#9775fa','#ffa94d','#22b8cf','#ced4da','#868e96'];
 c.innerHTML='<h2>💣 كاسح الألغام</h2><div id="mnh" style="text-align:center;margin:2px;font-size:15px"></div><div style="display:flex;flex-direction:'+(lw?'row':'column')+';align-items:center;justify-content:center;gap:'+(lw?14:8)+'px"><div id="mnb" dir="ltr" style="display:grid;grid-template-columns:repeat(8,'+cs+'px);gap:2px;padding:4px;border-radius:10px;background:#0b1033;border:3px solid #e8590c"></div><div style="display:flex;flex-direction:'+(lw?'column':'row')+';gap:6px;align-items:center;flex-wrap:wrap;justify-content:center"><button class="btn" id="mnf" style="padding:'+(lw?6:10)+'px 10px">⛏️ حفر</button><button class="btn g" id="mne" style="padding:'+(lw?6:10)+'px 10px">🏁 إنهاء</button><button class="btn d" id="mnx" style="padding:'+(lw?6:10)+'px 10px">إغلاق</button></div></div><div style="text-align:center;font-size:12px;margin:3px" id="mnm">'+(lw?'':'دوس على مربع للحفر. بدّل لـ🚩 عشان تعلّم اللغم')+'</div>';
 const nb=i=>{const x=i%N,y=Math.floor(i/N),o=[];for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){if(!dx&&!dy)continue;const a=x+dx,b=y+dy;if(a>=0&&b>=0&&a<N&&b<N)o.push(b*N+a)}return o};
 const cnt=i=>nb(i).filter(j=>mine[j]).length;
 const hd=()=>{const e=$('mnh');if(e)e.textContent='💣 '+(M-flg.reduce((a,b)=>a+b,0))+' · ✅ '+rev.reduce((a,b)=>a+b,0)+'/'+(N*N-M)};
 const draw=()=>{const bx=$('mnb');if(!bx)return;bx.innerHTML='';for(let i=0;i<64;i++){const d=document.createElement('div');let bg='#364fc7',t='',col='#fff';if(rev[i]){bg='#1c2a4a';if(mine[i]){bg='#e03131';t='💣'}else{const n=cnt(i);if(n){t=n;col=NC[n]}}}else if(!alive&&mine[i]){bg='#5c1a1a';t='💣'}else if(flg[i])t='🚩';d.style.cssText='display:flex;align-items:center;justify-content:center;border-radius:4px;font-weight:bold;cursor:pointer;width:'+cs+'px;height:'+cs+'px;background:'+bg+';color:'+col+';font-size:'+Math.floor(cs*.55)+'px';d.textContent=t;d.onclick=()=>tap(i);bx.appendChild(d)}};
 const place=f=>{const ok=new Set([f,...nb(f)]);let n=0;while(n<M){const i=Math.floor(Math.random()*64);if(!mine[i]&&!ok.has(i)){mine[i]=1;n++}}placed=true};
 const flood=i=>{const st=[i];while(st.length){const k=st.pop();if(rev[k]||flg[k])continue;rev[k]=1;if(!cnt(k))nb(k).forEach(j=>{if(!rev[j]&&!mine[j])st.push(j)})}};
 const tap=i=>{if(!alive)return;if(flagMode){if(!rev[i]){flg[i]^=1;sfx('click')}hd();draw();return}if(rev[i]||flg[i])return;if(!placed)place(i);if(mine[i]){rev[i]=1;alive=false;sfx('err');draw();setTimeout(()=>{if($('mnb'))end()},900);return}flood(i);sfx('win');hd();draw();if(rev.reduce((a,b)=>a+b,0)>=N*N-M){won=true;alive=false;setTimeout(()=>{if($('mnb'))end()},500)}};
 const end=()=>{alive=false;sc=rev.reduce((a,b)=>a+(b?1:0),0)-(mine.some((m,i)=>m&&rev[i])?1:0);me.mnsGames=(me.mnsGames||0)+1;qAdd('brain');const nbst=sc>(me.mnsBest||0);if(nbst)me.mnsBest=sc;let pay=Math.min(Math.floor(sc/18)+(won?2:0),10-me.mnsd.paid);if(pay<0)pay=0;me.mnsd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(won?'win':'err');
  c.innerHTML='<h2>'+(won?'🎉 كسحت كل الألغام!':'💥 خلصت اللعبة')+'</h2><div style="text-align:center;font-size:16px">مربعات آمنة: <b>'+sc+'</b> من '+(N*N-M)+(nbst?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.mnsBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 18 مربع لكل عملة)')+'</div><div class="row"><button class="btn g" id="mnr2">🔁 تاني</button><button class="btn d" id="mnx3">إغلاق</button></div>';$('mnr2').onclick=openMns;$('mnx3').onclick=closeModal};
 $('mnx').onclick=()=>{alive=false;closeModal()};$('mne').onclick=()=>{if(alive&&rev.some(x=>x))end();else{alive=false;closeModal()}};
 $('mnf').onclick=()=>{flagMode=!flagMode;$('mnf').textContent=flagMode?'🚩 علم':'⛏️ حفر'};
 window.__mns={tap,get mine(){return mine},set mine(v){mine=v;placed=true},get rev(){return rev},get alive(){return alive},get won(){return won},nb,draw,hd,get flg(){return flg}};hd();draw()})}
function openCnt(){modal(c=>{const lw=innerHeight<420,nw=innerWidth<340;let t=30,sc=0,alive=true,ans=0;const td=today();if(!me.cntd||me.cntd.d!==td)me.cntd={d:td,paid:0};
 c.innerHTML='<h2>🔢 عدّ بسرعة</h2><div id="nhd" style="text-align:center;margin:4px;font-size:15px"></div><div id="nq" style="text-align:center;font-size:'+(lw?24:30)+'px;line-height:1.25;margin:'+(lw?0:8)+'px 0;min-height:'+(lw?34:76)+'px;word-break:break-all"></div><div id="nb" dir="ltr" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:'+(lw?2:8)+'px 0"></div><div class="row"><button class="btn d" id="nxx">إغلاق</button></div>';
 $('nxx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('nhd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const R=n=>Math.floor(Math.random()*n);
 const E=['⭐','🍎','🐟','🎈','🌸','🍪'];
 const q=()=>{const lv=Math.min(3,Math.floor(sc/4)),n=2+R(4+lv*2),em=E[R(E.length)];ans=n;const e=$('nq'),box=$('nb');if(!e||!box)return;e.textContent=em.repeat(n);const o=new Set([n]);while(o.size<3){const d=1+R(2),v=n+(R(2)?d:-d);if(v>=1)o.add(v)}const arr=[...o].sort(()=>Math.random()-.5);box.innerHTML='';arr.forEach(v=>{const b=document.createElement('button');b.className='btn';b.style.cssText='font-size:'+(lw?20:26)+'px;padding:'+(lw?10:20)+'px 0';b.textContent=v;b.onclick=()=>pick(v);box.appendChild(b)})};
 const pick=v=>{if(!alive)return;if(v===ans){sc++;sfx('win')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.cntGames=(me.cntGames||0)+1;qAdd('brain');const nb=sc>(me.cntBest||0);if(nb)me.cntBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.cntd.paid);if(pay<0)pay=0;me.cntd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>🔢 خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.cntBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 3 صح لكل عملة)')+'</div><div class="row"><button class="btn g" id="nr">🔁 تاني</button><button class="btn d" id="nx3">إغلاق</button></div>';$('nr').onclick=openCnt;$('nx3').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('nq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__cnt={get ans(){return ans},pick,get sc(){return sc}};hd();q()})}
function openTfq(){modal(c=>{const lw=innerHeight<420,nw=innerWidth<340;let t=30,sc=0,alive=true,ok=true;const td=today();if(!me.tfqd||me.tfqd.d!==td)me.tfqd={d:td,paid:0};
 c.innerHTML='<h2>✔️ صح ولا غلط</h2><div id="thd" style="text-align:center;margin:4px;font-size:15px"></div><div id="tq" dir="ltr" style="text-align:center;font-size:'+(nw?24:lw?26:34)+'px;font-weight:bold;margin:'+(lw?2:10)+'px 0;white-space:nowrap"></div><div id="tb" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:'+(lw?2:8)+'px 0"></div><div class="row"><button class="btn d" id="txx">إغلاق</button></div>';
 $('txx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('thd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const R=n=>Math.floor(Math.random()*n);
 const q=()=>{const lv=Math.min(3,Math.floor(sc/4)),k=lv===0?0:R(3);let v,s;if(k===0){const a=2+R(9),b=2+R(9);v=a*b;s=a+' × '+b}else if(k===1){const a=10+R(40),b=10+R(40);v=a+b;s=a+' + '+b}else{const a=20+R(80),b=2+R(15);v=a-b;s=a+' - '+b}ok=R(2)===0;let sh=v;if(!ok){const d=1+R(lv>1?2:3);sh=v+(R(2)?d:-d);if(sh===v||sh<0)sh=v+d}const e=$('tq'),box=$('tb');if(!e||!box)return;e.textContent=s+' = '+sh;box.innerHTML='';[['✔️ صح',true,'g'],['✖️ غلط',false,'d']].forEach(a=>{const b=document.createElement('button');b.className='btn '+a[2];b.style.cssText='font-size:'+(nw?18:lw?18:22)+'px;padding:'+(lw?10:20)+'px 0';b.textContent=a[0];b.onclick=()=>pick(a[1]);box.appendChild(b)})};
 const pick=x=>{if(!alive)return;if(x===ok){sc++;sfx('win')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.tfqGames=(me.tfqGames||0)+1;qAdd('brain');const nb=sc>(me.tfqBest||0);if(nb)me.tfqBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.tfqd.paid);if(pay<0)pay=0;me.tfqd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>✔️ خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.tfqBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 3 صح لكل عملة)')+'</div><div class="row"><button class="btn g" id="tr">🔁 تاني</button><button class="btn d" id="tx3">إغلاق</button></div>';$('tr').onclick=openTfq;$('tx3').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('tq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__tfq={get ok(){return ok},pick,get sc(){return sc}};hd();q()})}
function openCmp(){modal(c=>{const lw=innerHeight<420,nw=innerWidth<340;let t=30,sc=0,alive=true,big=0;const td=today();if(!me.cmpd||me.cmpd.d!==td)me.cmpd={d:td,paid:0};
 c.innerHTML='<h2>⚖️ مين الأكبر</h2><div id="chd" style="text-align:center;margin:4px;font-size:15px"></div><div id="cq" dir="ltr" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:'+(lw?2:8)+'px 0"></div><div class="row"><button class="btn d" id="cxx">إغلاق</button></div>';
 $('cxx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('chd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const R=n=>Math.floor(Math.random()*n);
 const mk=()=>{const lv=Math.min(3,Math.floor(sc/4)),k=R(3+lv>3?3:3);let v,s;if(lv===0||k===0){const a=2+R(9),b=2+R(9);v=a*b;s=a+' × '+b}else if(k===1){const a=10+R(40),b=10+R(40);v=a+b;s=a+' + '+b}else{const a=20+R(80),b=2+R(15);v=a-b;s=a+' - '+b}return{v,s}};
 const q=()=>{let x=mk(),y=mk(),g=0;while(x.v===y.v&&g++<20)y=mk();if(x.v===y.v){y.v=x.v+1;y.s=String(y.v)}big=x.v>y.v?0:1;const box=$('cq');if(!box)return;box.innerHTML='';[x,y].forEach((o,i)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='font-size:'+(nw?19:lw?20:26)+'px;padding:'+(lw?10:26)+'px 0;white-space:nowrap';b.textContent=o.s;b.onclick=()=>pick(i);box.appendChild(b)})};
 const pick=i=>{if(!alive)return;if(i===big){sc++;sfx('win')}else{sfx('err');t=Math.max(0,t-2)}hd();q()};
 const end=()=>{alive=false;me.cmpGames=(me.cmpGames||0)+1;qAdd('brain');const nb=sc>(me.cmpBest||0);if(nb)me.cmpBest=sc;let pay=Math.min(Math.floor(sc/3),10-me.cmpd.paid);if(pay<0)pay=0;me.cmpd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>⚖️ خلص الوقت</h2><div style="text-align:center;font-size:16px">إجابات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.cmpBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة أو محتاج 3 صح لكل عملة)')+'</div><div class="row"><button class="btn g" id="cr">🔁 تاني</button><button class="btn d" id="cx3">إغلاق</button></div>';$('cr').onclick=openCmp;$('cx3').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('cq')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__cmp={get big(){return big},pick,get sc(){return sc}};hd();q()})}
function openWord(){modal(c=>{const lw=innerHeight<420;const W=['قطة','بحر','شمس','قمر','نجمة','ورده','كتاب','مدرسة','سمكة','طيارة','حديقة','عصفور','برتقال','تفاحة','صحراء','جمل','فيل','أسد','نمر','بطه','عنب','موز','بيت','باب','شباك','كرسي','طاوله','قلم','ساعة','سحابة','مطر','جبل','نهر','شجرة','زهرة','فراشة','دجاجة','حصان','قرد','سلحفاة'];let t=30,sc=0,tot=0,alive=true,word='',built=[],tiles=[];const td=today();if(!me.wdd||me.wdd.d!==td)me.wdd={d:td,paid:0};
 c.innerHTML='<h2>🔤 رتّب الكلمة</h2><div id="whd" style="text-align:center;margin:4px;font-size:15px"></div><div id="wb" style="text-align:center;font-size:'+(lw?28:38)+'px;min-height:'+(lw?36:52)+'px;margin:'+(lw?2:8)+'px;letter-spacing:2px"></div><div id="wo" style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center"></div><div class="row"><button class="btn" id="wc">↩️ امسح</button><button class="btn" id="ws">⏭️ تخطّي (-3ث)</button><button class="btn d" id="wx">إغلاق</button></div>';
 $('wx').onclick=()=>{alive=false;clearInterval(iv);closeModal()};
 const hd=()=>{const e=$('whd');if(e)e.textContent='⏱ '+t+' ث · ✅ '+sc};
 const draw=()=>{$('wb').textContent=built.map(i=>tiles[i]).join('')||'؟';[...$('wo').children].forEach((b,i)=>{b.style.opacity=built.includes(i)?'.25':'1'})};
 const q=()=>{let w;do{w=W[Math.floor(Math.random()*W.length)]}while(w===word);word=w;const ch=[...w];let s;let n=0;do{s=ch.slice().sort(()=>Math.random()-0.5);n++}while(s.join('')===w&&n<20);tiles=s;built=[];const box=$('wo');box.innerHTML='';s.forEach((l,i)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='width:'+(lw?42:54)+'px;height:'+(lw?42:54)+'px;font-size:24px;padding:0';b.textContent=l;b.onclick=()=>tap(i);box.appendChild(b)});draw()};
 const tap=i=>{if(!alive||built.includes(i))return;built.push(i);sfx('chat');draw();if(built.length===tiles.length){tot++;if(W.includes(built.map(k=>tiles[k]).join(''))){sc++;sfx('win');hd();q()}else{sfx('err');t=Math.max(0,t-2);hd();built=[];draw()}}};
 $('wc').onclick=()=>{built=[];draw()};$('ws').onclick=()=>{if(!alive)return;t=Math.max(0,t-3);hd();q()};
 const end=()=>{alive=false;me.wrdGames=(me.wrdGames||0)+1;qAdd('brain');const nb=sc>(me.wrdBest||0);if(nb)me.wrdBest=sc;let pay=Math.min(sc*2,10-me.wdd.paid);if(pay<0)pay=0;me.wdd.paid+=pay;me.coins+=pay;updCoins();lvUnlock();saveMe();sfx(sc>=3?'win':'err');
  c.innerHTML='<h2>🔤 خلص الوقت</h2><div style="text-align:center;font-size:16px">كلمات صح: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.wrdBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="wr">🔁 تاني</button><button class="btn d" id="wx2">إغلاق</button></div>';$('wr').onclick=openWord;$('wx2').onclick=closeModal};
 const iv=setInterval(()=>{if(!alive||!$('wb')){clearInterval(iv);return}t--;hd();if(t<=0){clearInterval(iv);end()}},1000);
 window.__wrd={get word(){return word},get tiles(){return tiles},tap,get sc(){return sc}};hd();q()})}
function openStarSeq(){modal(c=>{const COL=['#fa5252','#fab005','#40c057','#339af0'],EM=['🔴','🟡','🟢','🔵'],FR=[262,330,392,523];let seq=[],pi=0,busy=true,alive=true;
 const tone=i=>{try{if(me&&me.mute)return;if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),gn=AC.createGain();o.frequency.value=FR[i];o.type='triangle';gn.gain.value=0.12;o.connect(gn);gn.connect(AC.destination);o.start();gn.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+0.3);o.stop(AC.currentTime+0.32)}catch(e){}};
 c.innerHTML='<h2>🌌 تتبّع النجوم</h2><div id="sm" style="text-align:center;margin:6px;min-height:22px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"></div><div class="row"><button class="btn d" id="smx">إغلاق</button></div>';
 const grid=c.querySelector('div[style*=grid]');const pads=COL.map((cl,i)=>{const b=document.createElement('button');b.style.cssText='height:84px;border:0;border-radius:18px;font-size:30px;opacity:.55;background:'+cl;b.textContent='⭐';b.onclick=()=>press(i);grid.appendChild(b);return b});
 $('smx').onclick=()=>{alive=false;closeModal()};
 const flash=i=>{pads[i].style.opacity='1';pads[i].style.transform='scale(1.06)';tone(i);setTimeout(()=>{pads[i].style.opacity='.55';pads[i].style.transform=''},320)};
 const msg=s=>{const e=$('sm');if(e)e.textContent=s};
 const play=()=>{busy=true;pi=0;msg('👀 اتفرج · الدور '+seq.length);let k=0;const step=()=>{if(!alive||!$('sm'))return;if(k>=seq.length){busy=false;msg('🎯 دورك!');return}flash(seq[k++]);setTimeout(step,Math.max(380,700-seq.length*25))};setTimeout(step,700)};
 const next=()=>{seq.push(Math.floor(Math.random()*4));play()};
 const end=()=>{alive=false;const sc=seq.length-1,nb=sc>(me.simonBest||0);if(nb)me.simonBest=sc;me.simonGames=(me.simonGames||0)+1;const tt=today();if(!me.ssd||me.ssd.d!==tt)me.ssd={d:tt,c:0};let pay=Math.max(0,Math.min(sc,12-me.ssd.c));me.ssd.c+=pay;me.coins+=pay;updCoins();saveMe();sfx(sc>=5?'win':'err');
  c.innerHTML='<h2>🌌 خلصت الجولة</h2><div style="text-align:center;font-size:16px">وصلت لـ <b>'+sc+'</b> نجمة'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن: '+me.simonBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="smr">🔁 تاني</button><button class="btn d" id="smx2">إغلاق</button></div>';$('smr').onclick=openStarSeq;$('smx2').onclick=closeModal};
 const press=i=>{if(busy||!alive)return;flash(i);if(i!==seq[pi]){busy=true;setTimeout(end,500);return}pi++;if(pi>=seq.length){busy=true;msg('✅ صح!');setTimeout(next,700)}};
 window.__simon={get seq(){return seq},press};
 setTimeout(next,500)})}
let fwLast=0,fwInLast=0;
function fwShow(x,z){const cols=[[0xff6b6b,0xffd43b],[0x74c0fc,0xffffff],[0x69db7c,0xffd43b],[0xcc5de8,0xff8787],[0xffa94d,0xffffff]];let k=0;const go=()=>{if(!room||room.type!=='plaza'||k>=6)return;const c=cols[Math.floor(Math.random()*cols.length)];const p=new THREE.Vector3(x+(Math.random()-0.5)*6,4+Math.random()*4,z+(Math.random()-0.5)*6);burst(p,c,46);sfx('star');k++;setTimeout(go,330)};go()}
function fwLaunch(){const n=Date.now();if(n-fwLast<25000){toast('⏳ استنى '+Math.ceil((25000-(n-fwLast))/1000)+' ثانية',900);return}fwLast=n;me.fwCount=(me.fwCount||0)+1;saveMe();const p=player.root.position;fwShow(p.x,p.z);toast('🎆 ألعاب نارية!',1400);pub({t:'fw',i:me.id,n:me.name,x:p.x,z:p.z})}
function fwIn(m,r){const n=Date.now();if(n-fwInLast<8000)return;fwInLast=n;if(!room||room.type!=='plaza')return;fwShow(num(m.x,-40,40),num(m.z,-40,40));try{r.emote('🎆')}catch(e){}toast('🎆 '+str(m.n,14)+' أطلق ألعاب نارية',1600)}
let ic=null;
function buildIce(){
 interacts=[];const g=indoor(0x1c3c5a,0x2f6a96,0x74c0fc);
 g.add(mesh(G.box(15,0.06,15),0x7ab8e0,0,0.03,0));
 for(let i=0;i<5;i++)g.add(mesh(G.box(0.06,0.02,13),0xbfe3ff,-6+i*3,0.07,0));
 sign(g,'⛸️ حلبة التزلج · اجمع الندفات',0,5,-6.8,'rgba(116,192,252,.92)');sign(g,'الجليد بيزحلق · الندفات 3 نقاط',0,3,-2);
 ic={s:'idle',t:0,sc:0,fl:[]};
 for(let i=0;i<7;i++){const f=mesh(G.sph(0.32,6),0xffffff,0,0.8,0,0x99ddff);g.add(f);ic.fl.push(f);iceFlake(i)}
 ic.it={x:0,z:5,label:'⛸️ ابدأ التزلج',fn:iceStart};interacts.push(ic.it);
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 toast('⛸️ الجليد بيزحلق! ابدأ واجمع الندفات',2800)
}
function iceFlake(i){const f=ic.fl[i];f.position.set((Math.random()-0.5)*11,0.8,(Math.random()-0.5)*11)}
function iceStart(){if(!ic||ic.s==='play')return;ic.s='play';ic.t=40;ic.sc=0;sfx('win');toast('⛸️ ٤٠ ثانية!',1200)}
function iceTick(dt){if(!room||room.type!=='ice'||!ic||!player)return;const p=player.root.position;
 for(const f of ic.fl){f.rotation.y+=dt*2;f.position.y=0.8+Math.sin(tClock*3+f.position.x)*0.15}
 if(ic.s!=='play'){ic.it.label='⛸️ ابدأ التزلج'+(me.iceBest?' (أحسن '+me.iceBest+')':'');ic.it.x=0;ic.it.z=5;return}
 ic.t-=dt;ic.it.x=p.x;ic.it.z=p.z+4;ic.it.label='⛸️ '+Math.ceil(ic.t)+'ث · ❄️'+ic.sc;
 for(let i=0;i<ic.fl.length;i++){const f=ic.fl[i];if(Math.hypot(f.position.x-p.x,f.position.z-p.z)<1.1){ic.sc+=3;sfx('star');burst(f.position.clone().setY(0),[0xffffff,0x74c0fc],10);iceFlake(i)}}
 if(ic.t<=0)iceEnd()}
function iceEnd(){ic.s='idle';const sc=ic.sc,tt=today();if(!me.icd||me.icd.d!==tt)me.icd={d:tt,c:0};let pay=Math.min(Math.floor(sc/6),12-me.icd.c);if(pay<0)pay=0;me.icd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.iceBest||0);if(nb)me.iceBest=sc;me.iceGames=(me.iceGames||0)+1;saveMe();sfx('win');
 modal(c=>{c.innerHTML='<h2>⛸️ خلص التزلج!</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.iceBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="icz1">🔁 تاني</button><button class="btn d" id="icz2">إغلاق</button></div>';$('icz1').onclick=()=>{$('modal').style.display='none';iceStart()};$('icz2').onclick=()=>{$('modal').style.display='none'}})}
function buildBump(){
interacts=[];const g=indoor(0x2b2d42,0x3d405b,0x4263eb);
g.add(mesh(G.box(15,0.06,15),0x495a80,0,0.02,0),mesh(G.cyl(5.5,5.5,0.02,28),0x364fc7,0,0.05,0,0x112266));
sign(g,'🚗 تصادم · اهرب من العربيات 🤖',0,5,-6.8,'rgba(66,99,235,.92)');sign(g,'٤٠ ثانية · معاك ٣ قلوب · العربيات روبوتات',0,3.2,-1.8);
bp={s:'idle',t:0,hp:3,inv:0,cars:[]};
for(let i=0;i<4;i++){const c=new THREE.Group();c.add(mesh(G.box(1.3,0.5,0.9),[0xff6b6b,0xffd43b,0x51cf66,0xcc5de8][i],0,0.4,0),mesh(G.box(0.7,0.35,0.7),0xdee2e6,-0.1,0.8,0),mesh(G.cyl(0.18,0.18,0.1,8),0x212529,0.45,0.2,0.5),mesh(G.cyl(0.18,0.18,0.1,8),0x212529,-0.45,0.2,0.5));
const l=labelSprite('🤖',{s:0.9,bg:'rgba(0,0,0,0)'});l.position.set(0,1.5,0);c.add(l);c.visible=false;g.add(c);bp.cars.push({m:c,a:0,sp:0})}
bp.it={x:0,z:5,label:'🚗 ابدأ التصادم',fn:bumpStart};interacts.push(bp.it);
g.add(portalMesh('ارجع للأركيد',5.8,5.8,0xff8787,'arcade'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
toast('🚗 عربيات الروبوت 🤖 بتتصادم، اهرب منها',2600)
}
function bumpStart(){if(!bp||bp.s==='play')return;bp.s='play';bp.t=40;bp.hp=3;bp.inv=0;player.root.position.set(0,0,3);bp.cars.forEach((c,i)=>{c.a=i*1.6+0.4;c.sp=2.8+i*0.3;c.m.position.set(Math.cos(c.a)*6,0,-Math.abs(Math.sin(c.a))*5-1);c.m.visible=true});toast('🚗 عيش ٤٠ ثانية!',1600);sfx('win')}
function bumpTick(dt){if(!room||room.type!=='bump'||!bp||!player)return;const p=player.root.position;
if(bp.s!=='play'){bp.it.label='🚗 ابدأ التصادم'+(me.bumpBest?' (أحسن '+me.bumpBest+')':'');bp.it.x=0;bp.it.z=5;return}
bp.it.x=p.x;bp.it.z=p.z+1.5;bp.it.label='🚗 '+Math.ceil(bp.t)+'ث · '+'❤️'.repeat(bp.hp);
bp.t-=dt;if(bp.inv>0)bp.inv-=dt;
for(const c of bp.cars){const m=c.m.position;let dx=p.x-m.x,dz=p.z-m.z;const d=Math.hypot(dx,dz)||1;
const tgt=Math.atan2(dx,dz);let da=tgt-c.a;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;c.a+=da*dt*1.2;
const sp=c.sp+(40-bp.t)*0.04;m.x+=Math.sin(c.a)*sp*dt;m.z+=Math.cos(c.a)*sp*dt;m.x=Math.max(-6.5,Math.min(6.5,m.x));m.z=Math.max(-6.5,Math.min(6.5,m.z));c.m.rotation.y=c.a;
if(d<1.2&&bp.inv<=0){bp.hp--;bp.inv=1.5;sfx('err');toast('💥 اتخبطت! '+'❤️'.repeat(Math.max(0,bp.hp)),900);const k=1.8;p.x=Math.max(-6.5,Math.min(6.5,p.x+dx/d*k));p.z=Math.max(-6.5,Math.min(6.5,p.z+dz/d*k));c.a+=Math.PI*0.8}}
if(bp.hp<=0||bp.t<=0)bumpEnd()}
function bumpEnd(){const sc=Math.floor(40-Math.max(0,bp.t))+(bp.hp>0?bp.hp*5:0);bp.s='idle';bp.cars.forEach(c=>c.m.visible=false);const t=today();if(!me.bpd||me.bpd.d!==t)me.bpd={d:t,c:0};let pay=Math.min(Math.floor(sc/6),12-me.bpd.c);if(pay<0)pay=0;me.bpd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.bumpBest||0);if(nb)me.bumpBest=sc;me.bumpGames=(me.bumpGames||0)+1;saveMe();sfx(bp.hp>0?'win':'star');const hp=bp.hp;
modal(c=>{c.innerHTML='<h2>🚗 '+(hp>0?'نجوت!':'خلصت قلوبك')+'</h2><div style="text-align:center;font-size:16px">النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.bumpBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="bz1">🔁 تاني</button><button class="btn d" id="bz2">إغلاق</button></div>';$('bz1').onclick=()=>{$('modal').style.display='none';bumpStart()};$('bz2').onclick=()=>{$('modal').style.display='none'}})}
function buildSeek(){
interacts=[];const g=indoor(0x2a2f45,0x3b4264,0xffa94d);
g.add(mesh(G.box(15,0.06,15),0x495a80,0,0.02,0));
sk={spots:[],rd:0,hid:0,t:0,s:'idle',sc:0,found:0,bot:null,bots:[]};
const pos=[[-5,-4],[0,-5],[5,-4],[-5.5,0.5],[5.5,0.5],[-3,3.5],[3,3.5],[0,0]];const kinds=[['📦',0xc2874a],['🛢️',0x495057],['🌳',0x2f9e44],['🪑',0x8d6e63]];
pos.forEach(([x,z],i)=>{const k=kinds[i%4];const m=new THREE.Group();m.position.set(x,0,z);m.add(mesh(G.box(1.4,1.5,1.4),k[1],0,0.75,0));const l=labelSprite(k[0],{s:1.2,bg:'rgba(0,0,0,0)'});l.position.set(0,1.9,0);m.add(l);g.add(m);
const it={x,z:z+1.4,label:'🔍 فتّش هنا',fn:()=>seekCheck(i)};interacts.push(it);sk.spots.push({x,z,it,m})});
const bot=new THREE.Group();bot.add(mesh(G.box(0.6,0.7,0.4),0x868e96,0,0.5,0),mesh(G.box(0.5,0.4,0.4),0xced4da,0,1.05,0),mesh(G.sph(0.07,6),0xff3b3b,-0.12,1.1,0.2,0xff0000),mesh(G.sph(0.07,6),0xff3b3b,0.12,1.1,0.2,0xff0000));const bl=labelSprite('🤖 روبوت',{s:1.3});bl.position.set(0,1.7,0);bot.add(bl);bot.visible=false;sk.bot=bot;
sign(g,'🙈 استغماية مع الروبوت',0,5,-6.8,'rgba(255,169,77,.92)');sign(g,'الروبوت 🤖 مستخبي · فتّش الصناديق · ٣ جولات',0,3,-1.8);
sk.start={x:0,z:4,label:'🙈 ابدأ الاستغماية',fn:seekStart};interacts.push(sk.start);
g.add(portalMesh('ارجع للملعب',-5.5,5.5,0xff8787,'park'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];g.add(bot);
toast('🙈 استغماية! الروبوت 🤖 بيستخبى وإنت بتدور',2800)
}
function seekStart(){if(!sk||sk.s==='play')return;sk.s='play';sk.rd=1;sk.sc=0;sk.found=0;seekRound();sfx('win')}
function seekRound(){sk.t=25;sk.hid=Math.floor(Math.random()*sk.spots.length);const sp=sk.spots[sk.hid];sk.bot.visible=false;sk.bot.position.set(sp.x+0.2,0,sp.z-0.2);toast('🙈 جولة '+sk.rd+'/3 · الروبوت استخبى!',1800)}
function seekCheck(i){if(!sk||sk.s!=='play')return;const sp=sk.spots[i];if(i===sk.hid){sk.bot.visible=true;const pts=Math.max(1,Math.ceil(sk.t));sk.sc+=pts;sk.found++;sfx('star');burst(new THREE.Vector3(sp.x,1.2,sp.z),[0xffd43b,0xffffff],14);toast('🎉 لقيته! +'+pts,1400);sk.s='pause';setTimeout(()=>{if(!room||room.type!=='seek')return;sk.rd++;if(sk.rd>3)seekEnd();else{sk.s='play';seekRound()}},1500)}else{sfx('err');toast('❌ مفيش حد هنا',900);sp.m.position.x+=0.001}}
function seekTick(dt){if(!room||room.type!=='seek'||!sk)return;sk.start.label=sk.s==='play'?'🙈 جولة '+sk.rd+'/3 · '+Math.ceil(sk.t)+'ث':'🙈 ابدأ الاستغماية'+(me.seekBest?' (أحسن '+me.seekBest+')':'');if(sk.s==='play'){sk.t-=dt;if(sk.t<=0){toast('⏱️ الروبوت كان في '+(sk.spots[sk.hid].m.children[1]?'مكان تاني':''),1200);sk.bot.visible=true;sk.s='pause';setTimeout(()=>{if(!room||room.type!=='seek')return;sk.bot.visible=false;sk.rd++;if(sk.rd>3)seekEnd();else{sk.s='play';seekRound()}},1500)}}}
function seekEnd(){sk.s='idle';sk.bot.visible=false;const sc=sk.sc,t=today();if(!me.skd||me.skd.d!==t)me.skd={d:t,c:0};let pay=Math.min(Math.floor(sc/8),15-me.skd.c);if(pay<0)pay=0;me.skd.c+=pay;me.coins+=pay;updCoins();const nb=sc>(me.seekBest||0);if(nb)me.seekBest=sc;me.seekGames=(me.seekGames||0)+1;saveMe();sfx('win');
modal(c=>{c.innerHTML='<h2>🙈 خلصت الاستغماية!</h2><div style="text-align:center;font-size:16px">لقيت الروبوت '+sk.found+' من 3<br>النقاط: <b>'+sc+'</b>'+(nb?'<br>🏆 رقم قياسي!':'<br>أحسن نتيجة: '+me.seekBest)+'<br>'+(pay?'+'+pay+'🪙':'(وصلت حد النهاردة)')+'</div><div class="row"><button class="btn g" id="sz1">🔁 تاني</button><button class="btn d" id="sz2">إغلاق</button></div>';$('sz1').onclick=()=>{$('modal').style.display='none';seekStart()};$('sz2').onclick=()=>{$('modal').style.display='none'}})}
function buildStudio(){
interacts=[];const g=indoor(0x1f2a3a,0x2b3a52,0x15aabf);
g.add(mesh(G.box(3,0.9,1),0xf8f9fa,-3,0.45,-5),mesh(G.box(3,0.2,0.2),0x212529,-3,0.95,-5.45));for(let i=0;i<8;i++)g.add(mesh(G.box(0.3,0.05,0.9),0x212529,-4.2+i*0.34,0.93,-4.9));
g.add(mesh(G.cyl(0.7,0.7,0.5,12),0xe03131,3,0.25,-5),mesh(G.cyl(0.35,0.35,0.3,10),0xf08c00,2,0.75,-5),mesh(G.cyl(0.35,0.35,0.3,10),0xffd43b,4,0.75,-5),mesh(G.cyl(0.5,0.5,0.03,12),0xffd43b,4.7,1.5,-5));
for(let i=0;i<5;i++){g.add(mesh(G.cyl(0.03,0.03,0.8,4),0x868e96,-1.6+i*0.8,1.6,-6.6),mesh(G.cyl(0.12,0.16,0.3,8),0xffd43b,-1.6+i*0.8,1.1,-6.6,0xaa8800))}
sign(g,'🎹 استوديو الموسيقى',0,4.4,-6.6,'rgba(12,133,153,.92)');sign(g,'🎶 العب مع صحابك، الكل بيسمع',0,3.2,-4.2);
interacts.push({x:0,z:-2.5,label:'🎹 افتح الأدوات الموسيقية',fn:openStudio});
g.add(portalMesh('اخرج للساحة',0,7.2,0xff8787,'plaza'));
mergeStatic(g);scene.add(g);room.group=g;room.bounds=7.5;room.pickables=[];
toast('🎹 الاستوديو! كل نوتة بتعزفها صحابك في الغرفة بيسمعوها',3200)
}
function openStudio(){modal(c=>{let ins=0;c.innerHTML='<h2>🎹 الأدوات</h2><div class="row" style="margin-bottom:6px"><button class="btn g" id="i0">🎹 بيانو</button><button class="btn o" id="i1">🥁 طبول</button><button class="btn o" id="i2">🔔 أجراس</button></div><div id="kb" style="direction:ltr;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0"></div><div style="text-align:center;font-size:12px" id="kn">نوتات النهاردة: '+studioNotes+'</div><div class="row"><button class="btn d" id="kx">إغلاق</button></div>';const cols=['#e64980','#be4bdb','#4c6ef5','#15aabf','#40c057','#fab005','#fd7e14','#fa5252'];for(let k=0;k<8;k++){const b=document.createElement('button');b.style.cssText='height:70px;border:0;border-radius:12px;color:#fff;font-size:20px;background:'+cols[k];b.textContent=['دو','ري','مي','فا','صول','لا','سي','دو'][k];b.onpointerdown=e=>{e.preventDefault();hit(k)};$('kb').appendChild(b)}
const hit=k=>{playNote(ins,k);const n=performance.now();if(n-lastNoteSent>120){lastNoteSent=n;pub({t:'n',i:me.id,n:me.name,s:ins,k})}studioNotes++;me.notes=(me.notes||0)+1;$('kn').textContent='نوتات: '+studioNotes;if(studioNotes%40===0){const t=today();if(!me.mud||me.mud.d!==t)me.mud={d:t,n:0};if(me.mud.n<5){me.mud.n++;me.coins+=3;updCoins();toast('🎶 عزف حلو! +3🪙',1500)}}if(studioNotes%20===0)saveMe()};
for(const i of[0,1,2])$('i'+i).onclick=()=>{ins=i;for(const j of[0,1,2])$('i'+j).className='btn '+(j===i?'g':'o')};
$('kx').onclick=()=>{saveMe();closeModal()};window.__st={hit,setIns:v=>ins=v}})}
function buildCastle(){const t=Date.now();if(t-lastCastle<20000){toast('🏰 القلعة لسه بتنشف، استنى '+Math.ceil((20000-(t-lastCastle))/1000)+' ثانية');return}lastCastle=t;me.coins+=2;sfx('star');burst(player.root.position,0xe6c27a,12);toast('🏰 قلعة جامدة! +2🪙');updCoins();saveMe()}
let ride=null;
function startRide(){if(ride){return}const t=today();if(!me.rdd||me.rdd.d!==t)me.rdd={d:t,n:0};const rng=mulberry(Date.now()&0xffff),items=[];const boat=new THREE.Group();boat.add(mesh(G.box(1.8,0.35,0.8),0xc2410c,0,0.12,0),mesh(G.box(0.8,0.3,0.7),0xe8590c,0.5,0.35,0),mesh(G.cyl(0.04,0.04,1.6,5),0x5c3d1e,-0.2,1.1,0),mesh(G.box(0.04,1.0,0.9),0xf8f9fa,-0.1,1.1,0));player.root.add(boat);for(let i=0;i<9;i++){const m=mesh(G.sph(0.3,8),0xffd43b,-12+rng()*24,0.35,-9.5-rng()*8,0xaa8800);room.group.add(m);items.push(m)}walkTarget=null;player.root.position.set(0,0.15,-9.5);ride={t:30,n:0,boat,items};toast('⛵ رحلة القارب! اجمع العوامات الصفرا في 30 ثانية',3000);sfx('star')}
function endRide(ok){if(!ride)return;const r=ride;ride=null;try{player.root.remove(r.boat)}catch(e){}for(const m of r.items)if(m.parent)m.parent.remove(m);if(!ok||!room||room.type!=='beach')return;const t=today();if(!me.rdd||me.rdd.d!==t)me.rdd={d:t,n:0};const pay=me.rdd.n<4?Math.min(r.n*3,30):0;if(pay)me.rdd.n++;me.rides=(me.rides||0)+1;me.coins+=pay;player.root.position.set(5.5,0,-6);updCoins();saveMe();sfx('star');burst(player.root.position,0xffd43b,14);toast('⛵ جمعت '+r.n+' عوامة'+(pay?' +'+pay+'🪙':' (وصلت حد النهاردة)'),3200);chestUpd()}
function rideTick(dt){if(!ride)return;if(!room||room.type!=='beach'){endRide(false);return}const h=chestHud(),p=player.root.position;ride.t-=dt;h.style.display='block';h.textContent='⛵ '+ride.n+' · ⏱ '+Math.max(0,Math.ceil(ride.t));p.y=0.15+Math.sin(tClock*3)*0.05;ride.boat.rotation.z=Math.sin(tClock*2.2)*0.06;for(let k=ride.items.length-1;k>=0;k--){const m=ride.items[k];m.position.y=0.35+Math.sin(tClock*3+k)*0.12;if(Math.hypot(p.x-m.position.x,p.z-m.position.z)<1.4){room.group.remove(m);ride.items.splice(k,1);ride.n++;sfx('chat');burst(m.position,0xffd43b,6)}}if(ride.t<=0||!ride.items.length)endRide(true)}
let bball=null,bbv={x:0,z:0},bbh=0,bbc=0;
function beachBall(dt){if(!bball||room.type!=='beach')return;const p=bball.position,q=player.root.position;p.x+=bbv.x*dt;p.z+=bbv.z*dt;const f=Math.pow(0.4,dt);bbv.x*=f;bbv.z*=f;bball.rotation.z-=bbv.x*dt*2;bball.rotation.x+=bbv.z*dt*2;if(Math.abs(p.x)>7.3){p.x=Math.sign(p.x)*7.3;bbv.x*=-0.8}if(p.z>7.3){p.z=7.3;bbv.z*=-0.8}if(p.z<-7.6){p.z=-7.6;bbv.z*=-0.8}const dx=p.x-q.x,dz=p.z-q.z,d=Math.hypot(dx,dz);if(bbc<=0&&d<1.0&&d>0.01){const sp=player.moving?8:5;bbv.x=dx/d*sp;bbv.z=dz/d*sp;bbc=0.25;bbh++;sfx('tick');if(bbh%10===0){const t=today();if(!me.bbd||me.bbd.d!==t)me.bbd={d:t,n:0};if(me.bbd.n<30){me.bbd.n++;me.coins+=1;updCoins();saveMe();toast('🏐 '+bbh+' ضربة! +1🪙',1200)}else toast('🏐 '+bbh+' ضربة!',900)}else if(bbh%5===0)toast('🏐 '+bbh,700)}if(bbc>0)bbc-=dt}
function beachTick(dt){beachBall(dt);if(!room||room.type!=='beach'||!player||!shells.length)return;const p=player.root.position;for(let k=shells.length-1;k>=0;k--){const m=shells[k];m.rotation.y+=dt*2;if(Math.hypot(p.x-m.position.x,p.z-m.position.z)<1.0){room.group.remove(m);shells.splice(k,1);const t=today();if(!me.shd||me.shd.d!==t)me.shd={d:t,n:0};const pay=me.shd.n<18?3:0;if(pay)me.shd.n++;me.shells=(me.shells||0)+1;me.coins+=pay;sfx('chat');burst(m.position,0xffd6e0,8);toast('🐚 صدفة! '+(pay?'+3🪙':'(وصلت حد النهاردة)')+(shells.length?'':' · خلصتهم كلهم!'));updCoins();saveMe()}}}
function gardenTick(dt){moleTick(dt||0.016);dashTick(dt||0.016);balTick(dt||0.016);shootTick(dt||0.016);flwTick(dt||0.016);tankTick(dt||0.016);iceTick(dt||0.016);bakeTick(dt||0.016);pzzTick(dt||0.016);dncTick(dt||0.016);bumpTick(dt||0.016);kiteTick(dt||0.016);seekTick(dt||0.016);penTick(dt||0.016);jumpTick(dt||0.016);tagTick(dt||0.016);galleryTick(dt||0.016);wheelTick(dt||0.016);bowlTick(dt||0.016);hoopTick(dt||0.016);golfTick(dt||0.016);fishTick(dt||0.016);beachTick(dt||0.016);farmTick(dt||0.016);showTick(dt||0.016);funTick(dt||0.016);mazeTick(dt||0.016);festTick(dt||0.016);spaceTick(dt||0.016);hauntTick(dt||0.016);discoTick(dt||0.016);caveTick(dt||0.016);rayTick();starGameTick(dt||0.016);dt=dt||0.016;butterGame(dt);if(!butter.length||!room||room.type!=='garden')return;for(const b of butter){b.a+=dt*b.sp;b.m.position.set(b.cx+Math.cos(b.a)*b.r,b.h+Math.sin(b.a*3)*0.3,b.cz+Math.sin(b.a)*b.r*0.7);b.m.rotation.y=-b.a;const f=Math.sin(tClock*14+b.a*5)*0.9;b.m.children[0].rotation.y=f;b.m.children[1].rotation.y=-f}}
const QUICK=['مرحبا 👋','تعالى بيتي 🏠','نلعب؟ 🎮','شكراً 🙏','ههه 😂','يلا بينا!','مبروك 🎉','تعالى الشاطئ 🏖️'];
(function(){const cb=$('chatbox');const row=document.createElement('div');cb.style.flexWrap='wrap';row.style.cssText='flex-basis:100%;display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;direction:rtl';QUICK.forEach(t=>{const b=document.createElement('button');b.className='btn';b.style.cssText='padding:6px 10px;min-height:40px;font-size:13px';b.textContent=t;b.onclick=()=>{$('chatin').value=t;sendChat()};row.appendChild(b)});cb.appendChild(row)})();
let fpsAcc=0,fpsN=0,fpsLow=0;
function fpsTick(dt){if(window.autoLQ||document.hidden)return;fpsAcc+=dt;fpsN++;if(fpsAcc>=1){const f=fpsN/fpsAcc;fpsAcc=0;fpsN=0;if(f<25)fpsLow++;else fpsLow=Math.max(0,fpsLow-1);if(fpsLow>=5){window.autoLQ=1;applyQ();toast('⚙️ خفّفنا الجودة تلقائياً عشان اللعب يبقى أسلس')}}}
function addPetShop(){
const g=new THREE.Group();g.position.set(-10.5,0,10);
g.add(mesh(G.box(3,0.2,2),0x8d6e63,0,1.0,0),mesh(G.cyl(0.08,0.08,1,6),0x5c4033,-1.3,0.5,-0.8),mesh(G.cyl(0.08,0.08,1,6),0x5c4033,1.3,0.5,-0.8),mesh(G.cyl(0.08,0.08,1,6),0x5c4033,-1.3,0.5,0.8),mesh(G.cyl(0.08,0.08,1,6),0x5c4033,1.3,0.5,0.8));
for(const[x,c]of[[-1,0xe03131],[0,0xf8f9fa],[1,0xe03131]])g.add(mesh(G.box(1,0.08,2.4),c,x,2.6,0));
g.add(mesh(G.cyl(0.06,0.06,1.6,6),0x495057,-1.4,1.8,-1),mesh(G.cyl(0.06,0.06,1.6,6),0x495057,1.4,1.8,-1));
g.add(mesh(G.sph(0.3,8),0xc2410c,-0.7,1.35,0),mesh(G.sph(0.25,8),0xd9480f,0.2,1.3,0.2),mesh(G.sph(0.28,8),0xe8590c,0.9,1.33,-0.1));
const sgn=labelSprite('🐾 أكل الحيوانات',{s:3.2,bg:'rgba(30,110,60,.9)'});sgn.position.set(0,3.5,0);g.add(sgn);
g.rotation.y=0.6;room.group.add(g);
interacts.push({x:-10.5,z:10-1.5,label:'🐾 أطعم حيوانك',fn:openPetShop});
}
const TRK=[['🤸','قلبة في الهوا',15],['🦘','قفزات',25],['🙏','سلام وانحناءة',20],['🌀','لفة دوّارة',30],['💤','ينام',20],['🎶','يرقص',25],['🔝','يقف على رجليه',30],['🤾','يتدحرج على جنبه',35],['🛹','ينزلق',35],['🪂','يطفو في الهوا',40]];
function openTrainer(){modal(c=>{if(!me.pet){closeModal();toast('اختار حيوان من "شكلي" الأول');return}me.tricks=me.tricks||[];c.innerHTML='<h2>🎓 تدريب الحيوان</h2><div style="text-align:center;margin:4px;font-size:13px">اتعلم حيلة وبعدين استخدمها من زرار "تفاعل" وصحابك هيشوفوها</div><div id="tl"></div><div class="row"><button class="btn g" id="ok">تمام</button></div>';for(const [e,n,p] of TRK){const d=document.createElement('div');d.className='qrow';const has=me.tricks.includes(e);d.textContent=e+' '+n+(has?' · ✅ اتعلمها':' · '+p+'🪙');if(!has){const b=document.createElement('button');b.className='btn o';b.style.cssText='margin-inline-start:8px;padding:2px 10px';b.textContent='علّمه';b.onclick=()=>{if(me.coins<p){toast('محتاج '+p+' عملة');return}me.coins-=p;me.tricks.push(e);updCoins();saveMe();renderEmo();sfx('win');player.emote(e);pub({t:'e',i:me.id,e});toast('🎓 حيوانك اتعلم: '+n,2800);openTrainer()};d.appendChild(b)}$('tl').appendChild(d)}$('ok').onclick=closeModal})}
function openPetCare(){modal(c=>{if(!me.pet){c.innerHTML='<h2>🛁 رعاية الحيوان</h2><div style="text-align:center;margin:14px">معندكش حيوان. اختار واحد من "شكلي" الأول</div><div class="row"><button class="btn g" id="px">تمام</button></div>';$('px').onclick=closeModal;return}
 const pc=me.pc=me.pc||{},nm=['','قطة','كلب','بطة','أرنب','ثعلب','باندا','ضفدع','يونيكورن','سلحفاة','بطريق','بومة','قنفذ','دب','هامستر'],dn=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);
 const Mt=k=>{const t=pc[k]||Date.now()-144e5;return Math.max(0,Math.min(100,Math.round(100-(Date.now()-t)/288e3)))};
 const draw=()=>{const a=[['f','🍖 الأكل','#f08c00'],['p','🎾 اللعب','#4dabf7'],['w','🛁 النظافة','#51cf66']],ok=a.every(x=>Mt(x[0])>=60),cl=pc.ld===today(),avg=(Mt('f')+Mt('p')+Mt('w'))/3;
  c.innerHTML='<h2>'+(avg>=70?'😻':avg>=40?'🙂':'😿')+' رعاية ال'+nm[me.pet]+'</h2><div style="margin:6px 0">'+a.map(x=>'<div style="font-size:13px;margin-top:5px">'+x[1]+' '+Mt(x[0])+'%</div><div style="height:12px;background:#223;border-radius:6px"><div style="height:100%;width:'+Mt(x[0])+'%;background:'+x[2]+';border-radius:6px"></div></div>').join('')+'</div><div style="text-align:center;font-size:12px">'+(cl?'✅ خدت مكافأة النهاردة · أيام متتالية: '+(pc.st||1):ok?'🎁 حيوانك مبسوط، استلم المكافأة!':'خلّي الثلاثة فوق 60% عشان تاخد مكافأة اليوم')+'</div><div class="row" style="flex-wrap:wrap"><button class="btn g" id="pf">🍖 أكل (5🪙)</button><button class="btn o" id="pp">🎾 لعب</button><button class="btn o" id="pw">🛁 استحمام</button></div><div class="row"><button class="btn g" id="pcl"'+(ok&&!cl?'':' disabled style="opacity:.45"')+'>🎁 المكافأة</button><button class="btn d" id="px">إغلاق</button></div>';
  if(innerHeight<420){c.querySelectorAll('button').forEach(b=>b.style.padding='4px 8px');c.querySelectorAll('div[style*="margin-top:5px"]').forEach(d=>d.style.marginTop='0');const h=c.querySelector('h2');if(h)h.style.margin='0 0 2px'}
  $('px').onclick=closeModal;
  $('pf').onclick=()=>{if(me.coins<5){toast('محتاج 5 عملات');return}me.coins-=5;me.fed=(me.fed||0)+1;pc.f=Date.now();pubPet();player.setApp(myApp());updCoins();sfx('star');player.emote('❤️');if(me.fed%3===0){me.coins+=15;updCoins();toast('🎉 مستوى جديد! +15🪙')}saveMe();draw()};
  $('pp').onclick=play;$('pw').onclick=wash;
  $('pcl').onclick=()=>{if(!ok||cl)return;const d=dn();pc.st=(pc.ln===d-1)?(pc.st||1)+1:1;pc.ln=d;pc.ld=today();const b=10+Math.min(10,(pc.st-1)*2);me.coins+=b;updCoins();saveMe();sfx('win');player.emote('😻');toast('🎁 +'+b+'🪙 · أيام متتالية: '+pc.st,2800);draw()}};
 const play=()=>{let pos=0,dir=1,hits=0,tries=0;c.innerHTML='<h2>🎾 العب مع حيوانك</h2><div style="text-align:center;font-size:13px">اضغط لما العلامة تبقى في الأخضر · 3 محاولات</div><div style="position:relative;height:30px;background:#223;border-radius:8px;margin:14px 0"><div style="position:absolute;left:40%;width:20%;height:100%;background:#2f9e44;border-radius:8px"></div><div id="pm" style="position:absolute;top:0;width:6px;height:100%;background:#ffd43b"></div></div><div id="pr" style="text-align:center;margin:6px">✅ 0 / 0</div><div class="row"><button class="btn g" id="pt">🎾 اضرب</button></div>';
  const iv=setInterval(()=>{if(!$('pm')){clearInterval(iv);return}pos+=dir*2.5;if(pos>=97||pos<=0)dir=-dir;$('pm').style.left=pos+'%'},30);
  $('pt').onclick=()=>{tries++;if(pos>=38&&pos<=58){hits++;sfx('win')}else sfx('err');$('pr').textContent='✅ '+hits+' / '+tries;if(tries>=3){clearInterval(iv);if(hits>=2){pc.p=Date.now();toast('🎾 حيوانك اتبسط!');player.emote('❤️')}else toast('😅 جرب تاني');saveMe();draw()}}};
 const wash=()=>{let n=0,t=8;c.innerHTML='<h2>🛁 استحمام</h2><div style="text-align:center;font-size:13px">افرك 15 مرة في 8 ثواني</div><div id="wb" style="text-align:center;font-size:40px;margin:10px">🫧</div><div id="wr" style="text-align:center">0 / 15 · 8ث</div><div class="row"><button class="btn g" id="wt" style="padding:16px 30px">🧽 افرك</button></div>';
  const iv=setInterval(()=>{if(!$('wr')){clearInterval(iv);return}t--;$('wr').textContent=n+' / 15 · '+t+'ث';if(t<=0){clearInterval(iv);toast('😅 جرب تاني');draw()}},1000);
  $('wt').onclick=()=>{n++;sfx('click');$('wb').textContent=n%2?'🫧🫧':'🛁';$('wr').textContent=n+' / 15 · '+t+'ث';if(n>=15){clearInterval(iv);pc.w=Date.now();saveMe();toast('✨ حيوانك نضيف!');player.emote('✨');draw()}}};
 window.__pc={play,wash,draw};draw()})}
function openPetShop(){
const names=['','قطة','كلب','بطة','أرنب','ثعلب','باندا','ضفدع','يونيكورن','سلحفاة','بطريق','بومة','قنفذ','دب','هامستر'];
modal(c=>{
if(!me.pet){c.innerHTML='<h2>🐾 أكل الحيوانات</h2><div style="text-align:center;margin:14px;font-size:17px">معندكش حيوان. اختار واحد من "شكلي" الأول 🐱🐶🦆🐰🦊</div><div class="row"><button class="btn g" id="ok">تمام</button></div>';$('ok').onclick=closeModal;return}
const lv=Math.floor((me.fed||0)/3)+1;
c.innerHTML='<h2>🐾 أطعم ال'+names[me.pet]+'</h2><div style="text-align:center;font-size:17px;margin:10px">وجبات: '+(me.fed||0)+' · مستوى '+lv+'</div><div class="row"><button class="btn g" id="f1">🍖 وجبة (5🪙)</button><button class="btn o" id="pbd">🏆 اللوحة</button><button class="btn o" id="ptr">🎓 تدريب</button><button class="btn g" id="pcr">🛁 رعاية</button><button class="btn" id="no">إغلاق</button></div>';
$('no').onclick=closeModal;$('pbd').onclick=openPetBoard;$('ptr').onclick=openTrainer;$('pcr').onclick=openPetCare;
$('f1').onclick=()=>{if(me.coins<5){toast('محتاج 5 عملات');return}me.coins-=5;me.fed=(me.fed||0)+1;pubPet();player.setApp(myApp());updCoins();saveMe();sfx('star');player.emote('❤️');burst(player.root.position,0xff6b9d,10);toast('😻 حيوانك شبع! مستوى '+(Math.floor(me.fed/3)+1)+' · وجبات '+me.fed);if(me.fed%3===0){me.coins+=15;updCoins();saveMe();toast('🎉 مستوى جديد! +15🪙')}closeModal()}
})
}
const SNOW=(()=>{const d=new Date(),m=d.getMonth()+1,dy=d.getDate();return (m===11&&dy>=15)||m===12||(m===1&&dy<=15)||/[?&]snow/.test(location.search)})();
let snowPts=null;
function snowTick(dt){
if(!SNOW||(me&&me.lq)||window.autoLQ){if(snowPts)snowPts.visible=false;return}
if(!snowPts){const n=260,p=new Float32Array(n*3);for(let i=0;i<n;i++){p[i*3]=(Math.random()-0.5)*36;p[i*3+1]=Math.random()*14;p[i*3+2]=(Math.random()-0.5)*36}const gm=new THREE.BufferGeometry();gm.setAttribute('position',new THREE.BufferAttribute(p,3));snowPts=new THREE.Points(gm,new THREE.PointsMaterial({color:0xffffff,size:0.22,transparent:true,opacity:0.85,depthWrite:false}));snowPts.frustumCulled=false;scene.add(snowPts)}
snowPts.visible=!!room&&(room.type==='plaza'||room.type==='park'||room.type==='garden');if(!snowPts.visible||!player)return;
const a=snowPts.geometry.attributes.position,px=player.root.position.x,pz=player.root.position.z;
for(let i=0;i<a.count;i++){let y=a.getY(i)-dt*(1.2+(i%5)*0.25);let x=a.getX(i)+Math.sin(tClock+i)*dt*0.4,z=a.getZ(i);if(y<0){y=14;x=px+(Math.random()-0.5)*36;z=pz+(Math.random()-0.5)*36}a.setXYZ(i,x,y,z)}a.needsUpdate=true}
let frPend=[],frLast={};
function cleanCode(c){return str(c,8).toUpperCase().replace(/[^A-Z0-9]/g,'')}
function sendFriendReq(code){code=cleanCode(code);if(!code||code===me.id){toast('اكتب كود صحيح');return}if(me.friends.some(f=>f.code===code)){toast('هو صاحبك أصلاً 👍');return}if(!netOK||!client){toast('الإنترنت واقع');return}frSent[code]=1;try{client.publish(NS+'/fr/'+code,JSON.stringify({t:'req',f:me.id,n:me.name}))}catch(e){}toast('📨 اتبعت الطلب. لازم صاحبك يكون أونلاين دلوقتي')}
function addFriendLocal(code,name){if(!me.friends.some(f=>f.code===code)){me.friends.push({code,name:str(name,16)||code});saveMe();subFriends()}}
const GIFTS=[['🌹','وردة'],['🍰','كيكة'],['⭐','نجمة'],['🎈','بلونة']];let giftLast={},giftIn={};
function openGift(f){modal(c=>{c.innerHTML='<h2>🎁 ابعت هدية لـ'+str(f.name,16)+'</h2><div style="text-align:center;opacity:.8;margin:4px">هدية حلوة من غير فلوس 💛</div><div id="gl" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0"></div><div class="row"><button class="btn d" id="gx">إغلاق</button></div>';GIFTS.forEach((g,i)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='font-size:22px;padding:14px';b.textContent=g[0]+' '+g[1];b.onclick=()=>{const t=Date.now();if(t-(giftLast[f.code]||0)<10000){toast('استنى شوية قبل الهدية الجاية');return}if(!netOK||!client){toast('الإنترنت واقع');return}giftLast[f.code]=t;try{client.publish(NS+'/fr/'+f.code,JSON.stringify({t:'gift',f:me.id,n:me.name,g:i}))}catch(e){}me.giftsSent=(me.giftsSent||0)+1;saveMe();sfx('star');burst(player.root.position,0xff6b9d,14);closeModal();toast('🎁 بعتّ '+g[0]+' لـ'+f.name)};$('gl').appendChild(b)});$('gx').onclick=closeModal})}
function frMsg(m){
const f=cleanCode(m.f),n=str(m.n,16)||f;if(!f||f===me.id)return;
if(m.t==='req'){if(me.friends.some(x=>x.code===f)||frPend.some(x=>x.f===f))return;const t=Date.now();if(t-(frLast[f]||0)<30000)return;frLast[f]=t;if(frPend.length>=3)return;frPend.push({f,n});showFrModal()}
else if(m.t==='gift'){if(!me.friends.some(x=>x.code===f))return;const t=Date.now();if(t-(giftIn[f]||0)<5000)return;giftIn[f]=t;const g=GIFTS[num(m.g,0,GIFTS.length-1,0)|0];me.giftsGot=(me.giftsGot||0)+1;saveMe();sfx('win');if(player)burst(player.root.position,[0xff6b9d,0xffd43b],24);toast('🎁 '+n+' بعتلك '+g[0]+' '+g[1]+'!',3500);addLog&&addLog('','🎁 '+n+' بعتلك '+g[0])}
else if(m.t==='acc'){if(!frSent[f])return;addFriendLocal(f,n);delete frSent[f];sfx('star');toast('🤝 '+n+' وافق وبقى صاحبك!')}
}
const frSent={};
function showFrModal(){
if(!frPend.length||$('modal').style.display==='flex')return setTimeout(showFrModal,2500);
const q=frPend[0];
modal(c=>{c.innerHTML='<h2>👋 طلب صداقة</h2><div style="text-align:center;font-size:18px;margin:14px"></div><div class="row"><button class="btn g" id="fa">قبول</button><button class="btn d" id="fd">رفض</button></div>';c.children[1].textContent=q.n+' ('+q.f+') عايز يبقى صاحبك';
$('fa').onclick=()=>{frPend.shift();addFriendLocal(q.f,q.n);if(netOK&&client)try{client.publish(NS+'/fr/'+q.f,JSON.stringify({t:'acc',f:me.id,n:me.name}))}catch(e){}closeModal();toast('🤝 بقيتوا أصحاب');if(frPend.length)setTimeout(showFrModal,600)};
$('fd').onclick=()=>{frPend.shift();closeModal();if(frPend.length)setTimeout(showFrModal,600)}});
}
function buildPrivate(){
interacts=[];const g=indoor(0x2b2350,0x4c3a8a,0x9775fa);
g.add(mesh(G.cyl(3.2,3.2,0.05,24),0x7048e8,0,0.03,0),mesh(G.cyl(2.2,2.2,0.06,24),0xf783ac,0,0.05,0,0x661133));
for(const[x,z,r]of[[-5,-5,0],[5,-5,0],[-5,3,Math.PI/2],[5,3,-Math.PI/2]]){const c=new THREE.Group();c.position.set(x,0,z);c.rotation.y=r;c.add(mesh(G.box(2.4,0.5,1),0x6741d9,0,0.25,0),mesh(G.box(2.4,0.7,0.25),0x5f3dc4,0,0.75,-0.4),mesh(G.box(0.25,0.5,1),0x5f3dc4,-1.1,0.5,0),mesh(G.box(0.25,0.5,1),0x5f3dc4,1.1,0.5,0));g.add(c)}
for(let i=0;i<8;i++){const an=i/8*6.283;g.add(mesh(G.cyl(0.05,0.05,2.2,6),0xffd43b,Math.cos(an)*6.6,1.1,Math.sin(an)*6.6,0x665500),mesh(G.sph(0.18,8),[0xff6b9d,0x4dabf7,0xffd43b,0x69db7c][i%4],Math.cos(an)*6.6,2.3,Math.sin(an)*6.6,0xffffff))}
sign(g,'🔒 غرفة '+room.code,0,4.1,-7.5,'rgba(112,72,232,.9)');
interacts.push({x:0,z:0,label:'💃 ارقص',fn:()=>{player.emote('💃');sfx('star')}});
finishRoom(g);
const ball=new THREE.Mesh(new THREE.SphereGeometry(0.5,12,10),new THREE.MeshBasicMaterial({color:0xffffff}));ball.position.set(0,4.2,0);room.group.add(ball);discoBall=ball;
}
let discoBall=null;
let ambN=null,ambT=0;
const AMB={plaza:[220,277,330],park:[196,247,294],garden:[262,330,392],beach:[196,262,330],cave:[110,147,175],disco:[262,330,392],haunt:[98,123,147],space:[131,165,196],maze:[185,233,277],fun:[262,330,392],show:[294,370,440],farm:[196,247,294],fish:[196,247,294],seek:[220,277,330],pen:[196,247,294],photo:[262,330,392],jump:[262,330,392],tag:[196,262,330],gallery:[220,277,330],wheel:[262,330,392],bowl:[185,233,277],hoops:[196,247,294],golf:[262,330,392],studio:[220,277,330],cafe:[175,220,262],arcade:[165,208,247],race:[147,185,220],private:[233,294,349],home:[196,262,311]};
function ambTick(dt){
ambT-=dt;if(ambT>0)return;ambT=1;
const on=!(me&&me.mute)&&AC&&AC.state==='running'&&!document.hidden;
if(!ambN){if(!AC||AC.state!=='running')return;const o=[0,1,2].map(i=>{const x=AC.createOscillator();x.type=i===1?'triangle':'sine';return x}),gn=AC.createGain(),lp=AC.createBiquadFilter(),lfo=AC.createOscillator(),lg=AC.createGain();lp.type='lowpass';lp.frequency.value=700;gn.gain.value=0;lfo.frequency.value=0.12;lg.gain.value=0.004;lfo.connect(lg);lg.connect(gn.gain);o.forEach(x=>{x.connect(lp);x.start()});lfo.start();lp.connect(gn);gn.connect(AC.destination);ambN={o,gn}}
const ch=AMB[room.type]||AMB.plaza;ambN.o.forEach((x,i)=>x.frequency.setTargetAtTime(ch[i],AC.currentTime,1.5));
ambN.gn.gain.setTargetAtTime(on?0.012:0,AC.currentTime,0.8);
}
let ffPts=null;
function fireflyTick(dt){
const want=(isNight||/[?&]firefly/.test(location.search))&&room&&(room.type==='plaza'||room.type==='garden'||room.type==='park')&&!(me&&me.lq)&&!window.autoLQ&&player;
if(!want){if(ffPts)ffPts.visible=false;return}
if(!ffPts){const n=45,p=new Float32Array(n*3);for(let i=0;i<n;i++){p[i*3]=(Math.random()-0.5)*30;p[i*3+1]=0.6+Math.random()*2.2;p[i*3+2]=(Math.random()-0.5)*30}const gm=new THREE.BufferGeometry();gm.setAttribute('position',new THREE.BufferAttribute(p,3));ffPts=new THREE.Points(gm,new THREE.PointsMaterial({color:0xfff3a0,size:0.35,transparent:true,opacity:0.9,depthWrite:false,blending:THREE.AdditiveBlending}));ffPts.frustumCulled=false;ffPts.userData.c=new THREE.Vector3();scene.add(ffPts)}
ffPts.visible=true;const a=ffPts.geometry.attributes.position,px=player.root.position.x,pz=player.root.position.z;
for(let i=0;i<a.count;i++){let x=a.getX(i)+Math.sin(tClock*0.7+i*1.7)*dt*0.8,y=a.getY(i)+Math.cos(tClock*0.9+i)*dt*0.4,z=a.getZ(i)+Math.cos(tClock*0.6+i*2.3)*dt*0.8;if(Math.abs(x-px)>16)x=px+(Math.random()-0.5)*28;if(Math.abs(z-pz)>16)z=pz+(Math.random()-0.5)*28;a.setXYZ(i,x,clamp(y,0.5,3),z)}a.needsUpdate=true;ffPts.material.opacity=0.55+0.4*Math.sin(tClock*3);
}
function applyTS(){document.body.classList.toggle('ts1',(me.ts|0)===1);document.body.classList.toggle('ts2',(me.ts|0)===2)}
const tsCss=document.createElement('style');tsCss.textContent='body.ts1 #modal .card{zoom:1.15}body.ts2 #modal .card{zoom:1.3}body.ts1 #bar .btn,body.ts1 #toast,body.ts1 #log div{font-size:calc(1em + 2px)}body.ts2 #bar .btn,body.ts2 #toast,body.ts2 #log div{font-size:calc(1em + 4px)}body.ts1 #chatbox input,body.ts2 #chatbox input{font-size:18px}';document.head.appendChild(tsCss);setTimeout(applyTS,0);
const RAIN_PERIOD=300000,RAIN_LEN=70000;let rainObjs=[],rainSlot=-1,rainTaken=new Set(),rainAnn=-1;
function rainTick(dt){
if(!room||room.type!=='plaza'||!player){if(rainObjs.length&&room&&room.group){for(const o of rainObjs)room.group.remove(o.m)}rainObjs=[];rainSlot=-1;return}
const now=Date.now(),slot=Math.floor(now/RAIN_PERIOD),el=now-slot*RAIN_PERIOD;
if(el>=RAIN_LEN){if(rainObjs.length){for(const o of rainObjs)room.group.remove(o.m);rainObjs=[]}rainSlot=slot;return}
if(slot!==rainSlot){rainSlot=slot;rainTaken=new Set();for(const o of rainObjs)room.group.remove(o.m);rainObjs=[];const rng=mulberry(slot*7919+5);
for(let k=0;k<26;k++){const an=rng()*6.283,r=4+rng()*19;const m=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,0.1,14),new THREE.MeshLambertMaterial({color:0xffd43b,emissive:0xaa7700}));m.rotation.x=Math.PI/2;m.visible=false;room.group.add(m);rainObjs.push({m,k,x:Math.cos(an)*r,z:Math.sin(an)*r,t:k*2400+rng()*800})}}
if(rainAnn!==slot){rainAnn=slot;toast('🪙 مطر العملات بدأ في الساحة! اجمع بسرعة',3500);sfx('win')}
const p=player.root.position;
for(const o of rainObjs){if(rainTaken.has(o.k))continue;const age=el-o.t;if(age<0){o.m.visible=false;continue}const fall=Math.max(0,1-age/900);o.m.visible=true;o.m.position.set(o.x,0.7+fall*9,o.z);o.m.rotation.z+=dt*4;
if(fall===0&&Math.hypot(p.x-o.x,p.z-o.z)<1.2){rainTaken.add(o.k);o.m.visible=false;me.coins+=2;updCoins();saveMe();sfx('star');burst(o.m.position,0xffd43b,5)}}
}
let plCb=null;
function pubPet(){const l=Math.floor((me.fed||0)/3);if(!me.pet||l<1||!netOK||!client)return;try{client.publish(NS+'/pl/'+me.id,JSON.stringify({n:me.name,l:Math.min(l,30),p:me.pet}),{retain:true})}catch(e){}}
function openPetBoard(){const e={};modal(c=>{c.innerHTML='<h2>🏆 أكبر الحيوانات</h2><div id="pl"></div><div class="row"><button class="btn d" id="px">إغلاق</button></div>';const nm=['','🐱','🐶','🦆','🐰','🦊','🐼','🐸','🦄','🐢','🐧','🦉','🦔','🐻','🐹'];const render=()=>{const l=$('pl');if(!l)return;l.innerHTML='';const a=Object.values(e).sort((x,y)=>y.l-x.l).slice(0,10);if(!a.length)l.textContent='لسه مفيش أرقام';a.forEach((v,i)=>{const d=document.createElement('div');d.className='qrow';d.textContent=(i+1)+'. '+v.n+' · '+(nm[v.p]||'🐾')+' مستوى '+v.l;l.appendChild(d)})};plCb=(id,m)=>{e[id]=m;render()};if(netOK)try{client.subscribe(NS+'/pl/+')}catch(x){}const l0=Math.floor((me.fed||0)/3);if(me.pet&&l0>0)e[me.id]={n:me.name,l:Math.min(l0,30),p:me.pet};$('px').onclick=()=>{try{client.unsubscribe(NS+'/pl/+')}catch(x){}plCb=null;closeModal()};render()})}
/* ===== achievements ===== */
const ACH=[['fw','🎆','أطلقت ألعاب نارية',()=>(me.fwCount||0)>=1],['friend','🤝','أول صاحب',()=>me.friends.length>=1],['rich','💰','٣٠٠ عملة',()=>me.coins>=300],['pet3','🐾','حيوان مستوى ٣',()=>(me.fed||0)>=9],['tres','🧰','صياد كنوز اليوم',()=>me.tr&&me.tr.got.length>=5],['hats','🎩','٣ قبعات مشتراة',()=>(me.owned||[]).length>=3],['bfly','🦋','٢٠ فراشة',()=>(me.bfBest||0)>=20],['race','🏁','أنهيت سباق',()=>!!me.raceBest],['mem','🃏','ذاكرة قوية',()=>(me.memWins||0)>=1],['fish','🎣','٥ سمكات',()=>(me.fish||0)>=5],['sg','🌠','١٠ نجوم في لعبة',()=>(me.sgBest||0)>=10],['shell','🐚','٦ صدفات',()=>(me.shells||0)>=6],['gem','💎','٨ جواهر',()=>(me.gemsGot||0)>=8],['mine','⛏️','كسّرت ٣ صخور',()=>(me.mined||0)>=3],['rhy','🎵','أول لعبة إيقاع',()=>(me.rhPlays||0)>=1],['ghost','👻','٥ أشباح',()=>(me.ghostsGot||0)>=5],['orb','⚡','١٠ طاقات',()=>(me.orbsGot||0)>=10],['scope','🔭','بُصيت في التليسكوب',()=>(me.scopes||0)>=1],['fest','🎆','حضرت مهرجان',()=>(me.fests||0)>=1],['maze','🌀','خلصت المتاهة',()=>(me.mazes||0)>=1],['fun','🎢','ركبت الأفعوانية',()=>(me.funRides||0)>=1],['trick','🎓','حيوان اتعلم حيلتين',()=>(me.tricks||[]).length>=2],['th','🏴‍☠️','لقيت الكنز الكبير',()=>(me.thWins||0)>=1],['show','👗','عرضت إطلالتك',()=>(me.shows||0)>=1],['farm','🧺','حصدت ٥ محاصيل',()=>(me.harv||0)>=5],['mus','🎵','٥٠ نوتة',()=>(me.notes||0)>=50],['ride','⛵','رحلة قارب',()=>(me.rides||0)>=1],['photo','📷','أول صورة',()=>(me.photos||0)>=1],['gift','🎁','أول هدية',()=>(me.giftsSent||0)+(me.giftsGot||0)>=1],['fish','🎣','١٠ سمكات',()=>(me.fishN||0)>=10],['golf','⛳','خلّصت جولة جولف',()=>(me.golfRounds||0)>=1],['hoops','🏀','٢٠ نقطة في السلة',()=>(me.hoopBest||0)>=20],['bowl','🎳','٢٥ نقطة بولينج',()=>(me.bowlBest||0)>=25],['wheel','🎡','أول لفّة',()=>(me.wheelSpins||0)>=1],['gal','🎯','١٥ نقطة رماية',()=>(me.galBest||0)>=15],['tag','🏃','أول طاردة',()=>(me.tagGames||0)>=1],['jump','🤸','كومبو x4 ترامبولين',()=>(me.jumpBest||0)>=4],['spic','📸','صوّرت في الاستوديو',()=>(me.studioPics||0)>=1],['pen','⚽','٣ أهداف جزاء',()=>(me.penBest||0)>=3],['seek','🙈','لقيت الروبوت',()=>(me.seekGames||0)>=1],['kite','🪁','طيّار الورق',()=>(me.kiteGames||0)>=1],['bump','🚗','نجوت من التصادم',()=>(me.bumpGames||0)>=1],['ice','⛸️','متزلّج',()=>(me.iceGames||0)>=1],['plan','🌌','تتبّع النجوم',()=>(me.simonBest||0)>=5],['zoo','🦒','صاحب الحيوانات',()=>(me.zooAll||0)>=1],['tank','🐠','صاحب السمك',()=>(me.tkAll||0)>=1],['flw','🌸','بستاني الورود',()=>(me.flAll||0)>=1],['wish','🌠','صاحب الأمنيات',()=>(me.wishAll||0)>=1],['pix','🎨','فنان صغير',()=>(me.pixN||0)>=1],['bal','🎈','فرقعت ١٥ بالونة',()=>(me.balBest||0)>=15],['mole','🔨','ضربت ١٢ خلد',()=>(me.molBest||0)>=12],['dash','🏁','سباق تحت ١٨ ثانية',()=>!!me.dashBest&&me.dashBest<=18],['lib','🧠','ذاكرة حديد',()=>(me.memGames||0)>=1],['bake','🥐','خبّاز',()=>(me.bakeGames||0)>=1],['simon','🔴','سيمون مستوى ٥',()=>(me.simBest||0)>=5],['react','⚡','أقل من ٣٠٠ms',()=>me.reactBest&&me.reactBest<300]];
let achT=0;
function achTick(dt){achT-=dt;if(achT>0||!me)return;achT=3;me.ach=me.ach||{};for(const [k,e,n,f] of ACH){if(!me.ach[k]){let ok=false;try{ok=f()}catch(x){}if(ok){me.ach[k]=1;me.coins+=10;updCoins();saveMe();sfx('win');toast('🏅 إنجاز جديد: '+e+' '+n+' · +10🪙',3500);break}}}}
const STAMPS=[['plaza','🌳','الساحة'],['maze','🌀','المتاهة'],['fun','🎢','الملاهي'],['show','👗','عرض الأزياء'],['farm','🚜','المزرعة'],['studio','🎹','الاستوديو'],['seek','🙈','الاستغماية'],['kite','🪁','الطيارة الورق'],['bump','🚗','التصادم'],['ice','⛸️','حلبة التزلج'],['plan','🔭','القبة النجمية'],['zoo','🦁','حديقة الحيوان'],['tank','🐠','الأكواريوم'],['flw','🌸','حديقة الورود'],['bal','🎈','فرقعة البالونات'],['mole','🔨','اضرب الخلد'],['dash','🏁','سباق النقاط'],['lib','📚','المكتبة'],['bake','🥐','المخبز'],['pizza','🍕','مطعم البيتزا'],['dance','💃','حلبة الرقص'],['isle','🏝️','جزيرة الكنز'],['obs','🔭','المرصد'],['fruit','🍉','سوق الفاكهة'],['drum','🥁','استوديو الإيقاع'],['rocket','🚀','قاعدة الإطلاق'],['pong','🏓','صالة البنج بونج'],['tetris','🧱','ركن التتريس'],['board','🎲','صالة الألعاب'],['sky','🐦','برج السماء'],['brick','🧱','ورشة الطوب'],['invade','👾','ركن الغزاة'],['track','🏎️','حلبة السباق'],['lily','🐸','بركة الضفادع'],['depot','📦','المخزن'],['foam','🫧','مصنع الفقاعات'],['chef','🍳','مطبخ الشيف'],['tower','🏗️','ورشة البناء'],['cannon','💥','ميدان المدفع'],['pinball','🎰','صالة البينبول'],['hockey','🏒','صالة الهوكي'],['darts','🎯','صالة السهام'],['quiz','🧠','استوديو المسابقات'],['curl','🥌','صالة الكيرلنج'],['snowfight','⛄','ساحة كرات الثلج'],['tug','🪢','ساحة شد الحبل'],['digsite','⛏️','موقع التنقيب'],['artroom','🎨','المرسم'],['musicbox','🎵','الصندوق الموسيقي'],['xoxroom','❌','ساحة إكس أو'],['hanroom','🗼','أبراج هانوي'],['lgoroom','💡','طفي الأنوار'],['pen','⚽','ركلات الجزاء'],['photo','📸','استوديو الصور'],['jump','🤸','الترامبولين'],['tag','🏃','الطاردة'],['gallery','🎯','ميدان الرماية'],['wheel','🎡','عجلة الحظ'],['bowl','🎳','البولينج'],['hoops','🏀','تحدي السلة'],['golf','⛳','الميني جولف'],['fish','🎣','ميناء الصيد'],['arcade','🕹️','الأركيد'],['cafe','☕','الكافيه'],['garden','🌷','الحديقة'],['park','⚽','الملعب'],['race','🏁','السباق'],['beach','🏖️','الشاطئ'],['cave','💎','الكهف'],['disco','🪩','الديسكو'],['haunt','👻','البيت المسكون'],['space','🚀','محطة الفضاء']];
function stampRoom(type){const st=STAMPS.find(x=>x[0]===type);if(!st||!me)return;me.stamps=me.stamps||{};if(me.stamps[type])return;me.stamps[type]=1;sfx('star');const n=STAMPS.filter(x=>me.stamps[x[0]]).length;toast('🛂 ختم جديد: '+st[1]+' '+st[2]+' ('+n+'/'+STAMPS.length+')',2600);if(n>=STAMPS.length&&!me.pspDone){me.pspDone=1;me.coins+=100;me.owned=me.owned||[];if(!me.owned.includes(24))me.owned.push(24);updCoins();setTimeout(()=>{toast('🎉 جواز السفر اكتمل! +100🪙 وتاج المستكشف اتفتح',5000);sfx('win')},2800)}saveMe()}
function openPassport(){modal(c=>{me.stamps=me.stamps||{};const n=STAMPS.filter(x=>me.stamps[x[0]]).length;c.innerHTML='<h2>🛂 جواز السفر</h2><div style="text-align:center;margin:4px">'+n+'/'+STAMPS.length+' ختم'+(me.pspDone?' · ✅ مكتمل':' · اكمله واخد ١٠٠🪙 وتاج المستكشف')+'</div><div id="pg" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0;max-height:42vh;overflow:auto"></div><div class="row"><button class="btn o" id="pcd">🪪 بطاقتي</button><button class="btn g" id="ok">تمام</button></div>';$('pcd').onclick=openCard;for(const [k,e,nm] of STAMPS){const d=document.createElement('div');const got=me.stamps[k];d.style.cssText='border-radius:12px;padding:10px 4px;text-align:center;font-size:12px;border:2px dashed '+(got?'#40c057':'#666')+';background:'+(got?'rgba(64,192,87,.18)':'rgba(255,255,255,.05)')+';opacity:'+(got?1:0.55);d.innerHTML='<div style="font-size:26px">'+(got?e:'❔')+'</div>'+nm;$('pg').appendChild(d)}$('ok').onclick=closeModal})}
const TH_ROOMS=[['beach','🏖️ مكان فيه رمل وموج وقلعة'],['garden','🌷 مكان فيه ورد وفراشات وبركة'],['cave','💎 مكان مظلم فيه جواهر وخفافيش'],['park','⚽ مكان فيه ملعب ونجوم'],['disco','🪩 مكان فيه نور ورقص'],['space','🚀 مكان فيه كواكب وتليسكوب'],['fun','🎢 مكان فيه أفعوانية ودوّامة'],['haunt','👻 مكان مسكون'],['cafe','☕ مكان قهوة وراحة'],['plaza','🌳 المكان الكبير في النص']];
function thPlan(){const t=today();let h=0;for(const ch of t)h=(h*31+ch.charCodeAt(0))>>>0;const r=mulberry(h);const idx=[...Array(TH_ROOMS.length).keys()];for(let i=idx.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]]}return idx.slice(0,4).map(i=>({room:TH_ROOMS[i][0],clue:TH_ROOMS[i][1],seed:Math.floor(r()*99999)}))}
function thState(){const t=today();if(!me.th||me.th.d!==t)me.th={d:t,s:0,done:0};return me.th}
function thSpawn(type){if(!me||!room||!player)return;const st=thState();if(st.done||st.s>=4)return;const plan=thPlan(),cur=plan[st.s];if(!cur||cur.room!==type)return;const r=mulberry(cur.seed);let x,z;if(type==='plaza'){const a=r()*6.283,d=7+r()*9;x=Math.cos(a)*d;z=Math.sin(a)*d}else{const b=room.bounds*0.7;x=(r()*2-1)*b;z=(r()*2-1)*b*0.8-1;if(Math.hypot(x,z-7)<2)z-=3}
const m=new THREE.Group();m.position.set(x,0.06,z);const bar=(rot)=>{const b=mesh(G.box(1.1,0.06,0.22),0xe03131,0,0,0,0x990000);b.rotation.y=rot;b.userData.keep=true;return b};m.add(bar(0.78),bar(-0.78));m.userData.th=1;room.group.add(m);const l=labelSprite('❌ احفر هنا',{s:2.2});l.position.set(x,1.2,z);room.group.add(l);
interacts.push({x,z,label:'⛏️ احفر هنا (خطوة '+(st.s+1)+'/4)',fn:()=>thDig(m,l)});toast('🗺️ شفت علامة X! احفر عليها',2800)}
function thDig(m,l){const st=thState();if(st.done||!m.parent)return;room.group.remove(m);room.group.remove(l);interacts=interacts.filter(i=>!(i.label&&i.label.includes('احفر هنا')));st.s++;sfx('star');burst(player.root.position,0xffd43b,14);if(st.s>=4){st.done=1;me.coins+=40;me.thWins=(me.thWins||0)+1;updCoins();toast('🏴‍☠️ لقيت الكنز الكبير! +40🪙',4500);sfx('win')}else{const nx=thPlan()[st.s];toast('✅ لقيت قطعة من الخريطة! الخطوة الجاية: '+nx.clue,5000)}saveMe()}
function openTreasure(){modal(c=>{const st=thState(),plan=thPlan();c.innerHTML='<h2>🗺️ خريطة الكنز</h2><div style="text-align:center;margin:4px;font-size:13px">٤ أماكن بالترتيب. دور على علامة ❌ في كل مكان واحفر. بتتغير كل يوم. الجايزة ٤٠🪙</div><div id="tl2"></div><div class="row"><button class="btn g" id="ok">تمام</button></div>';plan.forEach((p,i)=>{const d=document.createElement('div');d.className='qrow';d.textContent=(i<st.s?'✅ ':i===st.s&&!st.done?'📍 ':'🔒 ')+'خطوة '+(i+1)+': '+(i<=st.s?p.clue:'؟؟؟')+(i===st.s&&!st.done?' (ادخل المكان ده)':'');$('tl2').appendChild(d)});if(st.done){const d=document.createElement('div');d.className='qrow';d.textContent='🏴‍☠️ خلصت خريطة النهاردة! تعالى بكرة';$('tl2').appendChild(d)}$('ok').onclick=closeModal})}
function openAch(){modal(c=>{c.innerHTML='<h2>🏅 إنجازاتك</h2><div id="al"></div><div class="row"><button class="btn g" id="ok">تمام</button></div>';me.ach=me.ach||{};for(const [k,e,n] of ACH){const d=document.createElement('div');d.className='qrow';d.textContent=(me.ach[k]?'✅ ':'🔒 ')+e+' '+n;$('al').appendChild(d)}$('ok').onclick=closeModal})}
/* ===== memory game ===== */
function openMemory(){
const EM=['🍎','🚀','🐟','🎸','🌵','🍩'];let cards=[],first=-1,lock=false,found=0,t0=0,tm=null,moves=0;
modal(c=>{c.innerHTML='<h2>🃏 لعبة الذاكرة</h2><div id="mi" style="text-align:center;margin:6px">اقلب الكروت وادي كل زوج</div><div id="mg" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;direction:ltr"></div><div class="row"><button class="btn d" id="mx">إغلاق</button></div>';
cards=EM.concat(EM).map((e,i)=>({e,i,o:Math.random()})).sort((a,b)=>a.o-b.o);
window.__memCards=cards;const g=$('mg');cards.forEach((cd,i)=>{const b=document.createElement('button');b.className='btn';b.style.cssText='font-size:30px;min-height:64px;padding:4px';b.textContent='❔';b.onclick=()=>{if(lock||cd.up||cd.done)return;if(!t0){t0=Date.now();tm=setInterval(()=>{const el=$('mi');if(!el){clearInterval(tm);return}el.textContent='⏱ '+Math.floor((Date.now()-t0)/1000)+' ث · حركات '+moves},500)}cd.up=1;b.textContent=cd.e;sfx('chat');
if(first<0){first=i;return}
moves++;const a=cards[first],bt=g.children[first];
if(a.e===cd.e){a.done=cd.done=1;found++;bt.style.background='#2f9e44';b.style.background='#2f9e44';first=-1;sfx('star');
if(found===EM.length){clearInterval(tm);const sec=Math.round((Date.now()-t0)/1000);const day=today();me.memD=me.memD&&me.memD.d===day?me.memD:{d:day,n:0};let pr=0;if(me.memD.n<3){pr=sec<=35?30:sec<=60?20:10;me.memD.n++;me.coins+=pr;updCoins()}me.memWins=(me.memWins||0)+1;saveMe();sfx('win');$('mi').textContent='🎉 خلصت في '+sec+' ث · '+moves+' حركة'+(pr?' · +'+pr+'🪙':' · (٣ مرات مدفوعة في اليوم)')}}
else{lock=true;setTimeout(()=>{a.up=cd.up=0;bt.textContent='❔';b.textContent='❔';first=-1;lock=false},700)}};g.appendChild(b)});
$('mx').onclick=()=>{clearInterval(tm);closeModal()}})}
/* ===== richer visuals ===== */
let haloTex=null;
function halo(){if(haloTex)return haloTex;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),gr=x.createRadialGradient(32,32,2,32,32,32);gr.addColorStop(0,'rgba(255,240,170,0.95)');gr.addColorStop(0.4,'rgba(255,220,120,0.35)');gr.addColorStop(1,'rgba(255,200,80,0)');x.fillStyle=gr;x.fillRect(0,0,64,64);haloTex=new THREE.CanvasTexture(c);return haloTex}
function visTick(dt){
if(!room)return;
if(room.type==='plaza'){
for(const l of lamps){if(!l.userData.h){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:halo(),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));sp.scale.set(3.6,3.6,1);l.add(sp);l.userData.h=sp}l.userData.h.material.opacity=THREE.MathUtils.lerp(l.userData.h.material.opacity,isNight?0.95:0,Math.min(1,dt*2))}
if(fountainWater){fountainWater.position.y=0.5+Math.sin(tClock*1.6)*0.025;fountainWater.material.color.setHSL(0.56+Math.sin(tClock*0.8)*0.015,0.85,0.58+Math.sin(tClock*2.2)*0.04)}
}
}
let wheelObj=null;
const WPRIZE=[5,10,5,20,10,50,15,100,10,30];
function addWheel(){
const g=new THREE.Group();g.position.set(10.5,0,10);
g.add(mesh(G.cyl(0.12,0.12,3,8),0x495057,-0.9,1.5,0),mesh(G.cyl(0.12,0.12,3,8),0x495057,0.9,1.5,0));
const w=new THREE.Group();w.position.y=2.4;const cols=[0xff6b6b,0xffd43b,0x51cf66,0x4dabf7,0xb197fc];
for(let i=0;i<10;i++){const sg=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,0.2,10,1,false,i*Math.PI/5,Math.PI/5),new THREE.MeshLambertMaterial({color:cols[i%5]}));w.add(sg)}
w.rotation.x=Math.PI/2;const holder=new THREE.Group();holder.position.y=0;holder.add(w);g.add(holder);holder.position.set(0,0,0);
const pt=mesh(G.cone(0.2,0.5,4),0xe03131,0,4.1,0.15);pt.rotation.x=Math.PI;g.add(pt);
const sgn=labelSprite('🎡 عجلة الحظ',{s:3.2,bg:'rgba(180,40,120,.9)'});sgn.position.set(0,4.9,0);g.add(sgn);
g.rotation.y=-0.6;room.group.add(g);wheelObj=w;
interacts.push({x:10.5,z:10-1.2,label:'🎡 لف عجلة الحظ',fn:openWheel});addPetShop();
}
function openWheel(){
const t=today();
modal(c=>{
if(me.wheel===t){c.innerHTML='<h2>🎡 عجلة الحظ</h2><div style="text-align:center;font-size:18px;margin:14px">لفيت النهارده خلاص، ارجع بكرة 🌙</div><div class="row"><button class="btn g" id="ok">تمام</button></div>';$('ok').onclick=closeModal;return}
c.innerHTML='<h2>🎡 عجلة الحظ</h2><div id="wn" style="text-align:center;font-size:56px;margin:12px">🎡</div><div style="text-align:center;color:#aab4de">لفة واحدة كل يوم</div><div class="row"><button class="btn g" id="sp">لف العجلة!</button><button class="btn" id="no">لاحقاً</button></div>';
$('no').onclick=closeModal;
$('sp').onclick=()=>{$('sp').disabled=true;me.wheel=t;const idx=Math.floor(Math.random()*WPRIZE.length),pr=WPRIZE[idx];let n=0;const iv=setInterval(()=>{n++;$('wn').textContent=WPRIZE[Math.floor(Math.random()*WPRIZE.length)]+' 🪙';sfx('chat');if(n>=18){clearInterval(iv);$('wn').textContent='🪙 +'+pr;me.coins+=pr;updCoins();saveMe();sfx('star');burst(player.root.position,0xffd43b,16);$('sp').textContent='تمام';$('sp').disabled=false;$('sp').onclick=closeModal;$('no').style.display='none'}},110)}
})
}
let chests=[];
function dayKey(){return new Date().toISOString().slice(0,10)}
function albumGet(){try{return JSON.parse(localStorage.getItem('ealam_album')||'[]')}catch(e){return[]}}
function albumAdd(c){try{const w=420,h=Math.round(c.height*w/c.width),t=document.createElement('canvas');t.width=w;t.height=h;t.getContext('2d').drawImage(c,0,0,w,h);let a=albumGet();a.unshift({u:t.toDataURL('image/jpeg',0.72),r:RN[room.type]||'غرفة',d:new Date().toLocaleDateString('ar-EG')});a=a.slice(0,12);while(a.length){try{localStorage.setItem('ealam_album',JSON.stringify(a));break}catch(e){a.pop()}}}catch(e){}}
function openAlbum(){const a=albumGet();modal(c=>{let h='<h2>🖼️ ألبوم الصور</h2>';if(!a.length)h+='<div style="text-align:center;opacity:.8;padding:20px">لسه مفيش صور · دوس 📷 عشان تاخد صورة</div>';else h+='<div style="font-size:12px;opacity:.7;text-align:center;margin-bottom:6px">آخر '+a.length+' صورة · دوس على صورة عشان تكبّرها</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-height:48vh;overflow:auto">'+a.map((p,i)=>'<div data-i="'+i+'" style="border-radius:8px;overflow:hidden;position:relative"><img src="'+p.u+'" style="width:100%;display:block" alt=""><span style="position:absolute;bottom:0;right:0;left:0;background:#000a;font-size:9px;text-align:center">'+p.r+'</span></div>').join('')+'</div>';
 c.innerHTML=h+'<div class="row"><button class="btn g" id="alp">🎨 مرسم</button><button class="btn d" id="alx">إغلاق</button></div>';$('alx').onclick=closeModal;$('alp').onclick=openPixel;c.querySelectorAll('[data-i]').forEach(d=>d.onclick=()=>openAlbumPic(+d.dataset.i))})}
const PXC=['#ffffff','#212529','#e03131','#f08c00','#fcc419','#40c057','#1c7ed6','#7048e8','#f06595','#8d5a2b'];
function openPixel(){modal(c=>{const N=12,S=Math.min(264,Math.floor(innerWidth*0.72/N)*N);let col=1,down=false,last=null;const cells=new Array(N*N).fill(0);
 c.innerHTML='<h2>🎨 المرسم</h2><canvas id="pxc" width="'+S+'" height="'+S+'" style="display:block;margin:0 auto;border-radius:8px;touch-action:none;background:#fff;max-width:100%"></canvas><div id="pxp" style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin:8px 0"></div><div class="row"><button class="btn o" id="pxz">🧹 مسح</button><button class="btn g" id="pxs">💾 احفظ في الألبوم</button><button class="btn d" id="pxb">رجوع</button></div>';
 const cv=c.querySelector('#pxc'),cx=cv.getContext('2d'),cs=S/N;
 const draw=()=>{cx.fillStyle='#fff';cx.fillRect(0,0,S,S);for(let i=0;i<N*N;i++){if(cells[i]){cx.fillStyle=PXC[cells[i]-1];cx.fillRect((i%N)*cs,Math.floor(i/N)*cs,cs,cs)}}cx.strokeStyle='#0002';for(let i=0;i<=N;i++){cx.beginPath();cx.moveTo(i*cs,0);cx.lineTo(i*cs,S);cx.moveTo(0,i*cs);cx.lineTo(S,i*cs);cx.stroke()}};
 const paint=e=>{const r=cv.getBoundingClientRect(),x=Math.floor((e.clientX-r.left)/r.width*N),y=Math.floor((e.clientY-r.top)/r.height*N);if(x<0||y<0||x>=N||y>=N)return;const v=col+1;const lx=last?last[0]:x,ly=last?last[1]:y,n=Math.max(Math.abs(x-lx),Math.abs(y-ly),1);for(let k=1;k<=n;k++){const px=Math.round(lx+(x-lx)*k/n),py=Math.round(ly+(y-ly)*k/n);cells[py*N+px]=v}last=[x,y];draw()};
 cv.addEventListener('pointerdown',e=>{down=true;last=null;cv.setPointerCapture(e.pointerId);paint(e)});cv.addEventListener('pointermove',e=>{if(down)paint(e)});cv.addEventListener('pointerup',()=>{down=false;last=null});cv.addEventListener('pointercancel',()=>{down=false;last=null});
 const pp=c.querySelector('#pxp');const rp=()=>{pp.innerHTML='';PXC.forEach((k,i)=>{const b=document.createElement('b');b.style.cssText='width:28px;height:28px;border-radius:50%;background:'+k+';border:3px solid '+(i===col?'#ffd43b':'#fff4');pp.append(b);b.onclick=()=>{col=i;rp()}});const er=document.createElement('b');er.textContent='🧽';er.style.cssText='width:28px;height:28px;text-align:center;font-size:20px;line-height:28px;border-radius:50%;border:3px solid '+(col===-1?'#ffd43b':'#fff4');er.onclick=()=>{col=-1;rp()};pp.append(er)};
 const paint0=paint;rp();draw();
 c.querySelector('#pxz').onclick=()=>{cells.fill(0);draw()};
 c.querySelector('#pxb').onclick=openAlbum;
 c.querySelector('#pxs').onclick=()=>{if(!cells.some(v=>v)){toast('ارسم حاجة الأول 🙂');return}const o=document.createElement('canvas');o.width=o.height=240;const ox=o.getContext('2d');ox.fillStyle='#fff';ox.fillRect(0,0,240,240);for(let i=0;i<N*N;i++)if(cells[i]){ox.fillStyle=PXC[cells[i]-1];ox.fillRect((i%N)*20,Math.floor(i/N)*20,20,20)}
  let a=albumGet();a.unshift({u:o.toDataURL('image/png'),r:'🎨 رسمتي',d:new Date().toLocaleDateString('ar-EG')});a=a.slice(0,12);while(a.length){try{localStorage.setItem('ealam_album',JSON.stringify(a));break}catch(e){a.pop()}}me.pixN=(me.pixN||0)+1;saveMe();sfx('win');toast('🎨 رسمتك اتحفظت في الألبوم',1800);openAlbum()}
 })}
function cardCanvas(){const W=480,H=270,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const gr=x.createLinearGradient(0,0,W,H);gr.addColorStop(0,'#3b5bdb');gr.addColorStop(1,'#9c36b5');x.fillStyle=gr;x.fillRect(0,0,W,H);
 x.fillStyle='rgba(255,255,255,.12)';x.beginPath();x.arc(W-40,30,90,0,6.3);x.fill();
 const bc=BODY[(me.body|0)%BODY.length]||BODY[0];
 x.fillStyle=bc;x.beginPath();x.roundRect?x.roundRect(48,120,96,110,24):x.rect(48,120,96,110);x.fill();x.fillStyle='#ffd8b5';x.beginPath();x.arc(96,98,46,0,6.3);x.fill();x.fillStyle='#212529';x.beginPath();x.arc(80,94,5,0,6.3);x.arc(112,94,5,0,6.3);x.fill();x.strokeStyle='#212529';x.lineWidth=4;x.beginPath();x.arc(96,106,16,0.2,2.9);x.stroke();
 const L=plLevel();me.stamps=me.stamps||{};me.ach=me.ach||{};const sn=STAMPS.filter(k=>me.stamps[k[0]]).length,an=ACH.filter(k=>me.ach[k[0]]).length;
 x.direction='rtl';x.textAlign='right';x.fillStyle='#fff';x.font='bold 34px sans-serif';x.fillText(String(me.name||'لاعب'),W-30,62);
 x.font='20px sans-serif';x.fillStyle='#ffe066';x.fillText('🎖️ مستوى '+L.lv,W-30,98);
 x.fillStyle='#fff';x.font='22px sans-serif';[['🪙 عملات',me.coins|0],['🛂 أختام',sn+'/'+STAMPS.length],['🏅 إنجازات',an+'/'+ACH.length],['🤝 أصحاب',(me.friends||[]).length]].forEach((a,i)=>{x.fillText(a[0]+'  '+a[1],W-30,145+i*34)});
 x.textAlign='left';x.direction='ltr';x.font='bold 18px sans-serif';x.fillStyle='rgba(255,255,255,.8)';x.fillText('عالمنا Alamna',24,H-14);return c}
function openCard(){modal(c=>{const cv=cardCanvas();cv.style.cssText='display:block;width:100%;border-radius:12px';c.innerHTML='<h2>🪪 بطاقة اللاعب</h2><div id="cdw"></div><div class="row"><a class="btn g" id="cds" download="alamna-card.png" style="text-decoration:none;text-align:center">💾 حفظ</a><button class="btn o" id="cda">🖼️ للألبوم</button><button class="btn d" id="cdb">رجوع</button></div>';$('cdw').appendChild(cv);$('cds').href=cv.toDataURL('image/png');
 $('cda').onclick=()=>{let a=albumGet();a.unshift({u:cv.toDataURL('image/jpeg',0.8),r:'🪪 بطاقتي',d:new Date().toLocaleDateString('ar-EG')});a=a.slice(0,12);while(a.length){try{localStorage.setItem('ealam_album',JSON.stringify(a));break}catch(e){a.pop()}}me.cardN=(me.cardN||0)+1;saveMe();toast('🖼️ البطاقة في الألبوم',1500);openAlbum()};$('cdb').onclick=openPassport})}
function openAlbumPic(i){const a=albumGet(),p=a[i];if(!p)return openAlbum();modal(c=>{c.innerHTML='<h2>📷 '+p.r+'</h2><img src="'+p.u+'" style="display:block;margin:0 auto;max-width:100%;max-height:46vh;border-radius:10px" alt=""><div style="text-align:center;font-size:12px;opacity:.7;margin:6px">'+p.d+'</div><div class="row"><a class="btn g" id="aps" download="alamna.jpg" style="text-decoration:none;text-align:center">💾 حفظ</a><button class="btn o" id="apd">🗑️ حذف</button><button class="btn d" id="apb">رجوع</button></div>';$('aps').href=p.u;$('apb').onclick=openAlbum;$('apd').onclick=()=>{const b=albumGet();b.splice(i,1);localStorage.setItem('ealam_album',JSON.stringify(b));openAlbum()}})}
let mapTmr=0;
function drawBigMap(cv){const x=cv.getContext('2d'),W=cv.width,sc=(W/2-26)/room.bounds,C=W/2;x.clearRect(0,0,W,W);x.fillStyle='#17213f';x.fillRect(0,0,W,W);x.save();x.translate(C,C);
 x.fillStyle='rgba(80,160,90,.4)';x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=2;x.beginPath();if(room.type==='plaza')x.arc(0,0,room.bounds*sc,0,6.3);else x.rect(-room.bounds*sc,-room.bounds*sc,room.bounds*sc*2,room.bounds*sc*2);x.fill();x.stroke();
 x.textAlign='center';const dot=(px,pz,col,r)=>{x.fillStyle=col;x.beginPath();x.arc(px*sc,pz*sc,r,0,6.3);x.fill()};
 for(const s of starObjs)if(!starTaken.has(s.k))dot(s.x,s.z,'#ffd43b',3);
 for(const it of interacts){dot(it.x,it.z,'#74c0fc',4)}
 x.font='bold 11px system-ui';
 x.font='16px system-ui';for(const pt of portals){dot(pt.x,pt.z,'rgba(255,135,135,.55)',11);const lb=(pt.label||'').trim().split(' ')[0];const ic=/[^\u0600-\u06FF\w]/.test(lb)&&lb.length<=3?lb:'🚪';x.fillStyle='#fff';x.fillText(ic,pt.x*sc,pt.z*sc+6)}
 for(const [,r] of remotes){dot(r.root.position.x,r.root.position.z,'#4dabf7',6)}
 const pp=player.root.position,pu=5+Math.sin(performance.now()/200)*1.5;dot(pp.x,pp.z,'#fff',pu+2);dot(pp.x,pp.z,'#ff922b',pu-1);x.fillStyle='#fff';x.font='bold 12px system-ui';x.strokeStyle='#000a';x.strokeText('أنت',pp.x*sc,pp.z*sc-12);x.fillText('أنت',pp.x*sc,pp.z*sc-12);x.restore()}
function openMap(){if(!room||!player)return;modal(c=>{const w=Math.min(330,Math.floor(window.innerWidth-60));c.innerHTML='<h2>🗺️ خريطة '+(RN[room.type]||'الغرفة')+'</h2><canvas id="bigmap" width="'+w+'" height="'+w+'" style="display:block;margin:0 auto;border-radius:12px;max-width:100%"></canvas><div style="font-size:12px;text-align:center;opacity:.8;margin:6px">🔴 بوابات (الرمز = المكان) · 🔵 صحابك · 🟡 نجوم · ⚪ إنت</div><div class="row"><button class="btn d" id="mpx">إغلاق</button></div>';const cv=$('bigmap');drawBigMap(cv);clearInterval(mapTmr);mapTmr=setInterval(()=>{if($('modal').style.display==='none'||!$('bigmap')){clearInterval(mapTmr);return}try{drawBigMap($('bigmap'))}catch(e){}},200);$('mpx').onclick=()=>{clearInterval(mapTmr);closeModal()}})}
(function(){const m=$('mm');m.style.pointerEvents='auto';m.style.cursor='pointer';m.setAttribute('aria-label','خريطة');m.addEventListener('click',openMap)})();
function takePhoto(){
try{renderer.render(scene,camera);const src=renderer.domElement,w=src.width,h=src.height,c=document.createElement('canvas');c.width=w;c.height=h+Math.round(h*0.07);const x=c.getContext('2d');x.fillStyle='#101830';x.fillRect(0,0,c.width,c.height);x.drawImage(src,0,0);x.fillStyle='#fff';x.font='bold '+Math.round(h*0.035)+'px sans-serif';x.textAlign='center';x.fillText('عالمنا · '+me.name+' · '+(RN[room.type]||'غرفة'),w/2,h+Math.round(h*0.05));const url=c.toDataURL('image/png');albumAdd(c);sfx('star');
modal(m=>{m.innerHTML='<h2>📷 صورتك</h2><img id="phimg" style="display:block;margin:0 auto;max-width:100%;max-height:46vh;object-fit:contain;border-radius:10px" alt=""><div style="text-align:center;font-size:13px;opacity:.8;margin:6px">دوس مطوّل على الصورة أو اضغط حفظ</div><div class="row"><button class="btn o" id="phalb">🖼️ ألبومي</button><a class="btn g" id="phsave" download="alamna.png" style="text-decoration:none;text-align:center">💾 حفظ</a><button class="btn d" id="phx">إغلاق</button></div>';$('phimg').src=url;$('phsave').href=url;$('phx').onclick=closeModal;$('phalb').onclick=openAlbum});me.photos=(me.photos||0)+1;saveMe()}catch(e){toast('مقدرتش آخد الصورة')}
}
(function(){const b=document.createElement('button');b.id='bPhoto';b.textContent='📷';b.setAttribute('aria-label','صورة');b.style.cssText='position:fixed;left:8px;bottom:150px;z-index:9;width:42px;height:42px;border-radius:50%;border:0;background:#000a;color:#fff;font-size:20px';b.onclick=takePhoto;document.body.appendChild(b)})();
function chestHud(){let h=$('chestHud');if(!h){h=document.createElement('div');h.id='chestHud';h.style.cssText='position:fixed;right:8px;top:148px;z-index:9;background:#000a;color:#ffd43b;padding:4px 12px;border-radius:14px;font:700 13px system-ui;direction:rtl;pointer-events:none';document.body.appendChild(h)}return h}
function setupChests(){
chests=[];const k=dayKey();if(!me.tr||me.tr.d!==k)me.tr={d:k,got:[]};
let seed=0;for(const c of k)seed=(seed*31+c.charCodeAt(0))>>>0;const rng=mulberry(seed+7);
for(let i=0;i<5;i++){let x,z;do{const an=rng()*6.283,r=6+rng()*17;x=Math.cos(an)*r;z=Math.sin(an)*r}while(Math.hypot(x,z)<5);
if(me.tr.got.includes(i))continue;
const g=new THREE.Group();g.add(mesh(G.box(0.8,0.5,0.55),0x8d5524,0,0.25,0));g.add(mesh(G.cyl(0.27,0.27,0.8,10),0xffd43b,0,0.55,0,0x886600));g.children[1].rotation.z=Math.PI/2;g.add(mesh(G.sph(0.09,6),0xfff3bf,0,0.35,0.3,0xaa8800));
const beam=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,6,6),new THREE.MeshBasicMaterial({color:0xffe066,transparent:true,opacity:0.35}));beam.position.y=3;g.add(beam);
g.position.set(x,0,z);room.group.add(g);chests.push({g,i,x,z})}
chestUpd()}
function chestUpd(){const h=chestHud();if(room&&room.type==='plaza'){h.style.display='block';h.textContent='🧰 كنوز اليوم '+me.tr.got.length+'/5'+(me.tr.got.length>=5?' ✅':'')}else h.style.display='none'}
function chestTick(dt){
if(!chests.length||!room||room.type!=='plaza'||!player)return;
for(const c of chests){c.g.rotation.y+=dt*1.5;c.g.position.y=Math.sin(tClock*2+c.i)*0.1}
const p=player.root.position;
for(let n=chests.length-1;n>=0;n--){const c=chests[n];if(Math.hypot(p.x-c.x,p.z-c.z)<1.3){
room.group.remove(c.g);chests.splice(n,1);me.tr.got.push(c.i);me.coins+=15;sfx('star');burst(p,0xffd43b,14);
let msg='🧰 لقيت كنز! +15🪙';
if(me.tr.got.length>=5){me.coins+=100;msg='🏆 لقيت كل كنوز اليوم! +100🪙 مكافأة';for(const c of [0xff6b6b,0x51cf66,0x4dabf7,0xffd43b])burst(p,c,12)}
toast(msg,2800);updCoins();saveMe();chestUpd()}}
}
window.__vw={rideN(){return ride&&ride.n},rideI(){return ride&&ride.items},shells(){return shells},bball(){return bball},hits(){return bbh},sgi(){return sgm&&sgm.items},get rain(){return rainObjs},get friends(){return me.friends},get amb(){return ambN},get butter(){return butter},get me(){return me},get autoLQ(){return window.autoLQ},get chests(){return chests},get tr(){return me.tr},get pos(){return player.root.position},renderer,get isNight(){return isNight},get race(){return race},get goals(){return goals},get ball(){return ball},get ballV(){return ballV},friendPres,subFriends,qAdd,dailyCheck,get q(){return me.q},get room(){return room},me,get player(){return player},visit,enterRoom,goMyHome,goPlaza,remotes,get stars(){return stars},get home(){return home}};
applyQ();updCoins();enterRoom('plaza');netConnect();setOnline();dailyCheck();ensureQ();
requestAnimationFrame(frame);
setTimeout(()=>{$('loading').style.display='none';if(!localStorage.getItem('ealam_seen')){localStorage.setItem('ealam_seen','1');$('bInfo').click()}},400);

function blkList(){me.blk=me.blk||[];return me.blk}
function openBlkList(){modal(c=>{const l=blkList();c.innerHTML='<h2>🚫 اللاعبين المتجاهَلين</h2><div id="bkl" style="max-height:40vh;overflow:auto"></div><div class="row"><button class="btn d" id="bkx">قفل</button></div>';const d=c.querySelector('#bkl');if(!l.length)d.innerHTML='<div style="text-align:center;opacity:.8;padding:14px">مفيش حد متجاهَل</div>';l.forEach((e,i)=>{const row=document.createElement('div');row.className='friend';const sp=document.createElement('span');sp.textContent='🚫 '+e.n;const b=document.createElement('button');b.className='btn';b.textContent='ارجّعه';b.onclick=()=>{l.splice(i,1);saveMe();toast('اتشال التجاهل');openBlkList()};row.append(sp,b);d.append(row)});c.querySelector('#bkx').onclick=closeModal})}
function openPlayerTap(id,r){modal(c=>{c.innerHTML='<h2></h2><div style="text-align:center;opacity:.85;margin:6px 0 10px">لو حد بيضايقك تقدر تتجاهله. مش هتشوفه ولا هتسمع شات منه.</div><div class="row"><button class="btn d" id="pbk">🚫 تجاهل اللاعب ده</button></div><div class="row"><button class="btn" id="plst">📋 المتجاهَلين ('+blkList().length+')</button><button class="btn" id="px">قفل</button></div>';c.querySelector('h2').textContent='👤 '+r.name;
 c.querySelector('#pbk').onclick=()=>{const l=blkList();if(!l.some(e=>e.i===id)){if(l.length>=50)l.shift();l.push({i:id,n:r.name})}me.blk=l;saveMe();if(r.root){scene.remove(r.root);disposeTree(r.root)}remotes.delete(id);setOnline();closeModal();toast('🚫 اتجاهل '+r.name)};
 c.querySelector('#plst').onclick=openBlkList;c.querySelector('#px').onclick=closeModal})}
(function(){const prev=window.__tapHook;window.__tapHook=function(cx,cy){if(prev&&prev(cx,cy))return true;if(!room||!player||editing)return false;let best=null,bd=46;const v=new THREE.Vector3();for(const [id,r] of remotes){if(r.bot)continue;v.copy(r.root.position);v.y+=1.4;v.project(camera);if(v.z>1)continue;const sx=(v.x+1)/2*innerWidth,sy=(1-v.y)/2*innerHeight,d=Math.hypot(sx-cx,sy-cy);if(d<bd){bd=d;best=[id,r]}}if(!best)return false;openPlayerTap(best[0],best[1]);return true}})();
/* R98: plaza benches, sit by standing on a bench spot */
var BENCHES=[[-12,5,0],[12,5,0],[-12,-6,0],[12,-6,0]];
function benchesBuild(g){if(!BENCHES)return;for(const[x,z,r]of BENCHES){const b=new THREE.Group();b.position.set(x,0,z);b.rotation.y=r;b.add(mesh(G.box(2.2,0.12,0.7),0xa9744f,0,0.5,0),mesh(G.box(2.2,0.55,0.1),0x8d5524,0,0.9,-0.38),mesh(G.box(0.12,0.5,0.6),0x495057,-1,0.25,0),mesh(G.box(0.12,0.5,0.6),0x495057,1,0.25,0));g.add(b);const l=labelSprite('🪑 مقعد',{s:2});l.position.set(x,1.7,z);g.add(l);interacts.push({x:x,z:z+1.6,label:'🪑 اقعد على المقعد',fn:()=>{player.root.position.set(x,0,z+0.08);player.yaw=r;walkTarget=null;sfx('star');toast('🪑 قاعد.. تحرك عشان تقوم',1500)}})}}
function benchNear(p){if(!BENCHES||!room||room.type!=='plaza')return false;for(const[x,z]of BENCHES)if(Math.hypot(p.x-x,p.z-(z+0.08))<0.35)return true;return false}
{const oT=Actor.prototype.tick;Actor.prototype.tick=function(dt,t){oT.call(this,dt,t);if(!this.av||this.moving||!benchNear(this.root.position)){if(this.sitK){this.sitK=0}return}const f=this.av.userData.feet,ar=this.av.userData.arms;this.sitK=1;this.av.position.y=-0.22;if(f){f[0].position.z=f[1].position.z=0.5}if(ar){ar[0].rotation.x=ar[1].rotation.x=-0.5}}}
try{if(room&&room.type==='plaza'&&room.group&&!room.group.userData.bn){room.group.userData.bn=1;benchesBuild(room.group);wellBuild(room.group);flowerBuild(room.group);ballBuild(room.group);lanternBuild(room.group)}}catch(e){}
/* R120: wishing well */
var WISHES=['✨ أمنيتك قربت تتحقق','🍀 يوم حظك النهاردة','🌟 حد هيفرّحك قريب','🎁 مفاجأة حلوة في السكة','💪 هتنجح في اللي بتحاوله','🌈 بعد التعب راحة','🦋 تغيير حلو جاي','☀️ بكرة أحلى من النهاردة','🤝 صاحب جديد في الطريق','🏆 هتكسب لعبة كبيرة'];
function wellBuild(g){const x=0,z=-9;const w=new THREE.Group();w.position.set(x,0,z);w.add(mesh(G.cyl(0.9,1.0,0.7,14),0x868e96,0,0.35,0),mesh(G.cyl(0.7,0.7,0.05,14),0x1c7ed6,0,0.7,0,0x0b3d75),mesh(G.cyl(0.07,0.07,1.3,6),0x8d5524,-0.8,1.3,0),mesh(G.cyl(0.07,0.07,1.3,6),0x8d5524,0.8,1.3,0),mesh(G.box(2.1,0.1,1.2),0xc92a2a,0,2.0,0,0x550000),mesh(G.cone(1.2,0.5,4),0xe03131,0,2.35,0,0x660000).rotateY(0.785));g.add(w);const l=labelSprite('⛲ بئر الأمنيات',{s:2});l.position.set(x,2.9,z);g.add(l);interacts.push({x:x,z:z+1.6,label:'⛲ اتمنى أمنية',fn:()=>{const t=Date.now();if(t-(window._wl||0)<4000){toast('⏳ استنى شوية قبل الأمنية الجاية',1500);return}window._wl=t;me.wishes=(me.wishes|0)+1;saveMe();sfx('star');toast(WISHES[Math.floor(Math.random()*WISHES.length)]+' · أمنية رقم '+me.wishes,2800)}})}
/* R121: flower beds */
function flowerBuild(g){for(const[x,z,c]of [[9,-10,0xff6b9d],[0,11,0xffd43b],[16,0,0xb197fc],[-16,0,0xff922b]]){const f=new THREE.Group();f.position.set(x,0,z);f.add(mesh(G.cyl(1.1,1.2,0.25,14),0x868e96,0,0.12,0),mesh(G.cyl(0.95,0.95,0.28,14),0x5c3a1e,0,0.14,0));for(let k=0;k<9;k++){const a=k/9*6.283,r=0.25+(k%3)*0.25;const h=0.35+(k%2)*0.15;f.add(mesh(G.cyl(0.02,0.02,h,4),0x2f9e44,Math.cos(a)*r,0.28+h/2,Math.sin(a)*r),mesh(G.sph(0.11,6),k%3===0?0xf8f9fa:c,Math.cos(a)*r,0.3+h,Math.sin(a)*r,c))}g.add(f)}}
/* R124: kickable ball */
function ballBuild(g){const B=window.kBall={x:-6,z:3,vx:0,vz:0,k:0};const m=mesh(G.sph(0.35,10),0xf8f9fa,0,0.35,0,0x555555);const sp=mesh(G.sph(0.37,5),0x212529,0,0.35,0);sp.scale.set(1,0.5,1);m.add(sp);m.position.set(B.x,0.35,B.z);g.add(m);B.m=m;const it={x:B.x,z:B.z+1.4,label:'⚽ اركل الكورة',fn:()=>{const p=player.root.position;let dx=B.x-p.x,dz=B.z-p.z;const d=Math.hypot(dx,dz)||1;if(d>3.5){toast('⚽ قرّب من الكورة الأول',1200);return}B.vx=dx/d*9;B.vz=dz/d*9;B.k++;sfx('tick');if(B.k===10)toast('⚽ 10 ركلات! لاعب كورة',2200)}};interacts.push(it);B.it=it}
{const oT=Actor.prototype.tick;Actor.prototype.tick=function(dt,t){oT.call(this,dt,t);const B=window.kBall;if(this!==player||!B||!B.m||!B.m.parent||room.type!=='plaza')return;const sp=Math.hypot(B.vx,B.vz);if(sp>0.05){B.x+=B.vx*dt;B.z+=B.vz*dt;const f=Math.pow(0.35,dt);B.vx*=f;B.vz*=f;if(Math.abs(B.x)>17){B.x=Math.sign(B.x)*17;B.vx*=-0.7}if(Math.abs(B.z)>17){B.z=Math.sign(B.z)*17;B.vz*=-0.7}B.m.position.set(B.x,0.35+Math.abs(Math.sin(B.x*2+B.z*2))*0.05*Math.min(1,sp),B.z);B.m.rotation.x+=B.vz*dt*3;B.m.rotation.z-=B.vx*dt*3;B.it.x=B.x;B.it.z=B.z+1.4}}}
/* R133: floating lanterns */
function lanternBuild(g){const L=window.kLant=[];const cols=[0xff6b6b,0xffd43b,0x74c0fc,0xb197fc,0x69db7c,0xff922b,0xf783ac,0x63e6be];for(let k=0;k<8;k++){const a=k/8*6.283+0.3,r=13;const x=Math.cos(a)*r,z=Math.sin(a)*r;const m=new THREE.Group();m.position.set(x,3.2,z);const b=mesh(G.sph(0.4,8),cols[k],0,0,0,cols[k]);b.scale.set(1,1.25,1);m.add(b,mesh(G.cyl(0.12,0.12,0.08,6),0x5c3a1e,0,0.55,0),mesh(G.cyl(0.01,0.01,1.2,4),0x868e96,0,1.2,0));g.add(m);L.push({m,y:3.2,p:k})}}
{const oT=Actor.prototype.tick;Actor.prototype.tick=function(dt,t){oT.call(this,dt,t);const L=window.kLant;if(this!==player||!L||!L.length||!L[0].m.parent||room.type!=='plaza')return;const tt=performance.now()/1000;for(const o of L){o.m.position.y=o.y+Math.sin(tt*1.2+o.p)*0.25;o.m.rotation.z=Math.sin(tt*0.9+o.p)*0.08}}}

/* R104: whack-a-mole */
var moleRun=null,moleObjs=[];
function moleDay(){const k=today();if(!me.mld||me.mld.d!==k)me.mld={d:k,paid:0,best:0};return me.mld}
function buildMole(){
 interacts=[];moleObjs=[];moleRun=null;const g=indoor(0x3b2a1a,0x5c3d1e,0xffa94d);
 g.add(mesh(G.box(15,0.06,15),0x5c940d,0,0.02,0));
 sign(g,'🔨 اضرب الخلد · 30 ثانية · قف على الحفرة اللي طلع منها',0,5,-6.8,'rgba(141,85,36,.92)');
 g.add(portalMesh('ارجع للملعب',5.8,5.8,0xff8787,'park'));
 for(let i=0;i<9;i++){const x=(i%3-1)*3.6,z=(Math.floor(i/3)-1)*3.2-1;const h=mesh(G.cyl(0.9,0.9,0.05,14),0x2b1b0e,x,0.07,z);g.add(h);const m=new THREE.Group();m.position.set(x,-0.9,z);m.add(mesh(G.cyl(0.5,0.55,0.9,10),0x8d5524,0,0.45,0),mesh(G.sph(0.5,10),0x8d5524,0,0.95,0),mesh(G.sph(0.14,6),0xffffff,-0.2,1.05,0.4),mesh(G.sph(0.14,6),0xffffff,0.2,1.05,0.4),mesh(G.sph(0.07,6),0x111111,-0.2,1.05,0.5),mesh(G.sph(0.07,6),0x111111,0.2,1.05,0.5),mesh(G.sph(0.14,6),0xf783ac,0,0.88,0.48,0x661133));m.userData.keep=true;g.add(m);moleObjs.push({m,x,z,up:0,t:0})}
 mergeStatic(g);scene.add(g);room.group=g;room.bounds=7;room.pickables=[];
 const bd=moleDay();
 interacts.push({x:0,z:4.6,label:'🔨 ابدأ (أفضل '+bd.best+')',fn:moleStart});
 toast('🔨 الخلد بيطلع من الحفر، قف عليه عشان تضربه',2600)
}
function moleStart(){if(moleRun)return;moleRun={t:30,n:0,sp:0};moleObjs.forEach(o=>{o.up=0;o.m.position.y=-0.9});toast('🔨 ابدأ! 30 ثانية',1200)}
function moleTick(dt){
 if(!room||room.type!=='mole'){if(moleRun){moleRun=null}return}
 for(const o of moleObjs){const ty=o.up>0?0.0:-0.95;o.m.position.y+=(ty-o.m.position.y)*Math.min(1,dt*14)}
 if(!moleRun||!player)return;const h=chestHud(),p=player.root.position;moleRun.t-=dt;h.style.display='block';h.textContent='🔨 '+moleRun.n+' · ⏱ '+Math.max(0,Math.ceil(moleRun.t));
 moleRun.sp-=dt;if(moleRun.sp<=0){moleRun.sp=0.55+Math.random()*0.5;const down=moleObjs.filter(o=>o.up<=0);if(down.length){const o=down[Math.floor(Math.random()*down.length)];o.up=1.1+Math.random()*0.5}}
 for(const o of moleObjs){if(o.up>0){o.up-=dt;if(Math.hypot(o.x-p.x,o.z-p.z)<1.1){o.up=0;moleRun.n++;sfx('star');burst(new THREE.Vector3(o.x,1.2,o.z),[0xffd43b,0xffffff,0xff922b],10)}}}
 if(moleRun.t<=0){const n=moleRun.n,bd=moleDay();moleRun=null;h.style.display='none';moleObjs.forEach(o=>{o.up=0});
  let pay=Math.min(Math.floor(n/2),20-bd.paid);if(pay<0)pay=0;bd.paid+=pay;me.coins+=pay;if(n>bd.best)bd.best=n;if(n>(me.molBest||0))me.molBest=n;me.molGames=(me.molGames||0)+1;
  sfx('win');toast('🔨 ضربت '+n+' خلد! +'+pay+'🪙',2600);updCoins();saveMe();
  const it=interacts.find(x=>x.label.startsWith('🔨 ابدأ'));if(it)it.label='🔨 ابدأ (أفضل '+bd.best+')'}
}
/* R100: milestone gift hat 31 for everyone */
try{if(me&&Array.isArray(me.owned)&&!me.owned.includes(31)){me.owned.push(31);saveMe();setTimeout(()=>{try{toast('🎉 الجولة 100! هدية: 👑 تاج المئة (من "شكلي")',4200);burst(player.root.position,0xffd43b,24);sfx('star')}catch(e){}},2500)}}catch(e){}
/* R106: live avatar preview in the look modal */
function lookPrev(){try{const c=$('modal').firstElementChild;if(!c||c.querySelector('#lkp'))return;const cv=document.createElement('canvas');cv.id='lkp';cv.width=240;cv.height=260;cv.style.cssText='display:block;margin:2px auto 6px;width:110px;height:120px;border-radius:14px;background:rgba(255,255,255,.1)';const h=c.querySelector('h2');if(h)h.after(cv);else c.prepend(cv);
const r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});r.setSize(240,260,false);const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xffffff,0x667788,1.2));const dl=new THREE.DirectionalLight(0xffffff,0.8);dl.position.set(2,4,5);sc.add(dl);const cam=new THREE.PerspectiveCamera(36,240/260,0.1,50);cam.position.set(0,1.5,5.2);cam.lookAt(0,1.4,0);let key='',av=null;const t0=performance.now();
const loop=()=>{if(!document.body.contains(cv)||cv.offsetParent===null){r.dispose();return}const k=JSON.stringify(myApp());if(k!==key){key=k;if(av)sc.remove(av);av=buildAvatar(myApp());sc.add(av)}av.rotation.y=(performance.now()-t0)/1400;r.render(sc,cam);requestAnimationFrame(loop)};loop()}catch(e){}}
{const ob=$('bMe').onclick;$('bMe').onclick=function(){const x=ob.apply(this,arguments);setTimeout(()=>{lookPrev();petNameUI()},30);return x}}
/* R107: photo filters */
function photoFilt(){try{const im=$('phimg');if(!im||$('phf'))return;const base=im.src;const row=document.createElement('div');row.id='phf';row.style.cssText='display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:6px 0';im.after(row);
const apply=(k)=>{const I=new Image();I.onload=()=>{const c=document.createElement('canvas');c.width=I.width;c.height=I.height;const x=c.getContext('2d');x.drawImage(I,0,0);if(k!=='orig'){const d=x.getImageData(0,0,c.width,c.height),a=d.data;for(let i=0;i<a.length;i+=4){const r=a[i],g=a[i+1],b=a[i+2];if(k==='sepia'){a[i]=Math.min(255,r*.393+g*.769+b*.189);a[i+1]=Math.min(255,r*.349+g*.686+b*.168);a[i+2]=Math.min(255,r*.272+g*.534+b*.131)}else if(k==='bw'){const l=r*.3+g*.59+b*.11;a[i]=a[i+1]=a[i+2]=l}else if(k==='vivid'){const l=r*.3+g*.59+b*.11;a[i]=Math.max(0,Math.min(255,l+(r-l)*1.7));a[i+1]=Math.max(0,Math.min(255,l+(g-l)*1.7));a[i+2]=Math.max(0,Math.min(255,l+(b-l)*1.7))}}x.putImageData(d,0,0);}
if(k==='frame'){const t=Math.round(c.width*0.03);x.strokeStyle='#ffd43b';x.lineWidth=t;x.strokeRect(t/2,t/2,c.width-t,c.height-t);x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(t,t,c.width-t*2,c.height-t*2)}
const u=c.toDataURL('image/png');im.src=u;const s=$('phsave');if(s)s.href=u};I.src=base};
[['orig','🔄 أصلي'],['sepia','🎞️ قديم'],['bw','⚫ أبيض وأسود'],['vivid','🌈 ألوان'],['frame','🖼️ إطار']].forEach(([k,t])=>{const b=document.createElement('button');b.className='btn o';b.style.cssText='padding:6px 10px;font-size:13px;min-height:0';b.textContent=t;b.onclick=()=>{sfx('place');apply(k)};row.appendChild(b)})}catch(e){}}
{const oT=takePhoto;takePhoto=function(){oT.apply(this,arguments);setTimeout(photoFilt,60)};const pb=$('bPhoto');if(pb)pb.onclick=takePhoto}

/* R108: pet name */
function petNameUI(){try{const c=$('modal').firstElementChild;const s4=c&&c.querySelector('#s4');if(!s4||c.querySelector('#pnm'))return;const i=document.createElement('input');i.id='pnm';i.maxLength=10;i.placeholder='🐾 اسم حيوانك (اختياري)';i.value=me.pname||'';i.style.cssText='width:100%;margin-top:6px;padding:8px;border-radius:10px;border:1px solid #556;background:#0f1530;color:#fff;font:inherit;font-size:16px;box-sizing:border-box';i.onchange=()=>{let v=str(i.value,10).trim();if(v==='***')v='';me.pname=v;i.value=v;saveMe();player.setApp(myApp());try{sendPos(true)}catch(e){}toast(v?'🐾 اسم حيوانك: '+v:'اتشال اسم الحيوان',1400)};s4.after(i)}catch(e){}}
