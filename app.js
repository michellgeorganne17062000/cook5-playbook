/* [COOK5] Playbook mini app — UI */
const tg=window.Telegram&&window.Telegram.WebApp;
const $=s=>document.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}
    try{if(tg&&tg.CloudStorage&&tg.isVersionAtLeast&&tg.isVersionAtLeast("6.9"))tg.CloudStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
window.LANG=store.get("d8lang",(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.language_code==="ru")?"ru":"en");
let favs=store.get("d8fav",[]);
const RU=()=>window.LANG==="ru"?1:0;
const t=v=>v==null?"":Array.isArray(v)?(v[RU()]??v[0]):v;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt=v=>esc(t(v)).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>").replace(/@(dima|renat|roman|nikita|sanya)/g,(m,w)=>`<span class="p ${w}">${PN[w]}</span>`);
const plain=v=>t(v).replace(/\*/g,"").replace(/@(dima|renat|roman|nikita|sanya)/g,(m,w)=>PN[w]);
const sname=id=>t(SHORT[id])||id;
const secOf=id=>SECTIONS.find(s=>s.strats&&s.strats.split(",").includes(id));

/* Russian phase texts: swap in place so the board engine stays untouched */
STRATS.forEach(s=>{s.phEn=s.phases.slice()});
function applyLang(){STRATS.forEach(s=>{s.phases=(RU()&&PH_RU[s.id])?PH_RU[s.id]:s.phEn});document.documentElement.lang=RU()?"ru":"en"}

/* ---------- views ---------- */
function card(s){const hs=s.blocks.filter(b=>b.h).length;const items=s.blocks.reduce((n,b)=>n+((b.check||b.steps||b.list||[]).length)+(b.table?b.table.rows.length:0)+(b.kpos?5:0),0);const n=s.strats?s.strats.split(",").length:hs>1?hs:items;
  return `<a class="card" href="#/s/${s.id}"><span class="num">${s.num}</span><span class="ic">${s.icon}</span><b>${t(s.title)}</b><small>${n} ${s.strats?t(UI.strats):hs>1?t(UI.blocks):t(UI.points)}${s.kind?" · "+s.kind:""}</small>${favs.includes("s:"+s.id)?'<i class="star">★</i>':""}</a>`}
function home(){
  const rules=SECTIONS.filter(s=>s.group==="rules");
  return `<header class="hero"><div class="logo">COOK5</div><h1>${t(UI.app)}</h1><p>${t(UI.sub)}</p>
  <label class="search"><span>🔍</span><input id="q" type="search" placeholder="${esc(t(UI.search))}" autocomplete="off"></label></header>
  <div id="results"></div>
  <div id="cards">
  <h2 class="grp">📘 ${t(UI.g_rules)}</h2><div class="grid">${rules.map(card).join("")}</div>
  <h2 class="grp">🗺️ ${t(UI.g_maps)}</h2><div class="maps">${MAPS.map(m=>`<a class="mapc ${m.id}" href="#/m/${m.id}"><span class="ic">${m.icon}</span><div><b>${m.name}</b><small>${t(m.sub)}</small><small class="rec">${t(m.rec)}</small></div><span class="go">›</span></a>`).join("")}
   <div class="mapc soon"><span class="ic">➕</span><div><b>${t(UI.soon)}</b><small>${t(UI.soon2)}</small></div></div></div>
  <h2 class="grp">👤 ${t(UI.g_prof)}</h2><div class="profs">${Object.keys(PROFILES).map(w=>`<a class="prof" href="#/p/${w}"><span class="av ${w}">${PN[w][0]}</span><b>${PN[w]}</b><small>${t(PROFILES[w].role)}</small></a>`).join("")}</div>
  </div>`;
}
function mapPage(id){const m=MAPS.find(x=>x.id===id);if(!m)return home();
  return `<header class="bar"><a class="back" href="#/">‹</a><div><small>${t(UI.g_maps)}</small><h1>${m.icon} ${m.name}</h1></div></header>
  <p class="muted">${t(m.sub)} · ${t(m.rec)}</p><div class="grid">${SECTIONS.filter(s=>s.map===id).map(card).join("")}</div>`}
function kposTable(key){return `<div class="tw"><table><thead><tr><th>${t(UI.player)}</th><th>${t(UI.spot)}</th><th>${t(UI.ops)}</th></tr></thead><tbody>${KPOS[key].map(r=>`<tr><td>${fmt("@"+r[0])}</td><td>${fmt(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>`}
function spark(v){const w=260,h=60,mx=Math.max(2,...v),pts=v.map((x,i)=>[14+i*(w-28)/(v.length-1),h-8-(x/mx)*(h-24)]);
  return `<svg viewBox="0 0 ${w} ${h+16}" class="spark"><line x1="10" x2="${w-10}" y1="${h-8-(1/mx)*(h-24)}" y2="${h-8-(1/mx)*(h-24)}" class="one"/><polyline points="${pts.map(p=>p.join(",")).join(" ")}"/>${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5"/><text x="${p[0]}" y="${p[1]-8}">${v[i].toFixed(2)}</text><text class="d" x="${p[0]}" y="${h+12}">${EVENINGS[i]}</text>`).join("")}</svg>`}
function profile(w){const P=PROFILES[w];if(!P)return home();const o=P.ops[0];
  const ord=SECTIONS.filter(x=>x.strats).flatMap(x=>x.strats.split(","));const nh=ord.map(id=>STRATS.find(x=>x.id===id)).map(s=>{const tok=lineupOf(s).find(x=>x[0]===w);return [s,tok[1]]}).filter(x=>x[1]!=="—");
  const kf=Object.entries(KPOS).map(([k,rows])=>{const r=rows.find(x=>x[0]===w);const sec=KAFE.find(x=>x.blocks.some(b=>b.kpos===k));return [sec,r]});
  return `<header class="bar"><a class="back" href="#/">‹</a><div><small>${t(UI.g_prof)}</small><h1>${PN[w]}</h1></div></header>
  <div class="phead"><span class="av big ${w}">${PN[w][0]}</span><div><b>${esc(P.nick)}</b>${P.alt?`<small>${esc(P.alt)}</small>`:""}<span class="p ${w}">${t(P.role)}</span></div></div>
  <div class="kpis"><div><small>${t(UI.p_rank)}</small><b class="sm">${esc(t(P.rank))}</b></div>${P.last?`<div><small>K/D · 06.11</small><b>${P.last[0][2]}</b></div>`:`<div><small>K/D · 29.10</small><b>0.41</b></div>`}</div>
  <article>
  <h2>${t(UI.p_ops)}</h2>
  <div class="tw"><table><tbody>${[[UI.att_main,o[0]],[UI.att_back,o[1]],[UI.def_main,o[2]],[UI.def_back,o[3]],[UI.stop,o[4]]].map(r=>`<tr><th>${t(r[0])}</th><td>${fmt(r[1])}</td></tr>`).join("")}</tbody></table></div>
  <h2>🎯 ${t(UI.p_habit)}</h2><p class="habit">${fmt(P.habit)}</p>
  <h2>${t(UI.p_last)}</h2>
  ${P.last?`<div class="tw"><table><thead><tr><th>${RU()?"Игр":"Games"}</th><th>K–D</th><th>K/D</th><th>${RU()?"Первые дуэли":"Openings"}</th><th>${RU()?"Умер первым":"First to die"}</th></tr></thead><tbody>${P.last.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:`<p class="note">${fmt(P.lastNote)}</p>`}
  ${P.trend?`<h2>${t(UI.p_trend)}</h2><div class="tw sparkw">${spark(P.trend)}</div>`:""}
  <h2>🌃 ${t(UI.p_nh)}</h2>
  <div class="tw"><table><tbody>${nh.map(([s,op])=>`<tr><td><span class="side ${s.side}">${s.side==="d"?t(UI.defence):t(UI.attack)}</span></td><td><a class="lnk" href="#/s/${secOf(s.id).id}/${s.id}">${t(secOf(s.id).title)} · ${sname(s.id)}</a></td><td><b>${esc(op)}</b></td></tr>`).join("")}</tbody></table></div>
  <h2>☕ ${t(UI.p_kafe)}</h2>
  <div class="tw"><table><tbody>${kf.map(([sec,r])=>`<tr><td><a class="lnk" href="#/s/${sec.id}">${t(sec.title)}</a></td><td>${fmt(r[1])}</td><td><b>${esc(r[2])}</b></td></tr>`).join("")}</tbody></table></div>
  </article>`}
function block(b,i,sec){
  if(b.h)return `<h2 id="b${i}" class="${b.side||""}">${b.side?`<span class="side ${b.side}">${b.side==="d"?t(UI.defence):t(UI.attack)}</span>`:""}${fmt(b.h)}${b.tag?`<em>${fmt(b.tag)}</em>`:""}</h2>`;
  if(b.p)return `<p>${fmt(b.p)}</p>`;
  if(b.note)return `<p class="note">${fmt(b.note)}</p>`;
  if(b.list)return `<ul>${b.list.map(x=>`<li>${fmt(x)}</li>`).join("")}</ul>`;
  if(b.steps)return `<ol class="steps">${b.steps.map(x=>`<li>${fmt(x)}</li>`).join("")}</ol>`;
  if(b.check)return `<div class="checks">${b.check.map((x,j)=>{const k=`chk:${sec.id}:${i}:${j}`;return `<label><input type="checkbox" data-k="${k}" ${store.get(k,false)?"checked":""}><span>${fmt(x)}</span></label>`}).join("")}</div>`;
  if(b.kpis)return `<div class="kpis">${b.kpis.map(k=>`<div><b>${k[0]}</b><small>${fmt(k[1])}</small></div>`).join("")}</div>`;
  if(b.table)return `<div class="tw"><table><thead><tr>${b.table.head.map(h=>`<th>${fmt(h)}</th>`).join("")}</tr></thead><tbody>${b.table.rows.map(r=>`<tr>${r.map(c=>`<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  if(b.shots)return `<div class="shots${b.square?" sq":""}">${b.shots.map(s=>`<figure data-img="img/${s[0]}"><img loading="lazy" src="img/${s[0]}" alt=""><figcaption>${fmt(s[1])}</figcaption></figure>`).join("")}</div>`;
  if(b.kpos)return kposTable(b.kpos);
  if(b.board)return `<h2 id="b${i}" class="boardh">🗺️ ${t(UI.board)}</h2><div class="boardslot" data-strats="${b.board}"></div>`;
  return "";
}
function section(id){
  const s=SECTIONS.find(x=>x.id===id);if(!s)return home();
  const toc=s.blocks.map((b,i)=>b.h?`<a href="#" data-to="b${i}" class="${b.side||""}">${plain(b.h)}</a>`:b.board?`<a href="#" data-to="b${i}">🗺️ ${t(UI.board)}</a>`:"").join("");
  const m=MAPS.find(x=>x.id===s.map);
  return `<header class="bar"><a class="back" href="${m?"#/m/"+m.id:"#/"}">‹</a><div><small>${m?m.name:t(UI.g_rules)}${s.kind?" · "+s.kind:""}</small><h1>${s.icon} ${t(s.title)}</h1></div>
   <button class="fav ${favs.includes("s:"+id)?"on":""}" data-fav="s:${id}">${favs.includes("s:"+id)?"★":"☆"}</button></header>
   <details class="toc"><summary>☰ ${t(UI.toc)}</summary><nav>${toc}</nav></details>
   <article>${s.blocks.map((b,i)=>block(b,i,s)).join("")}</article>`;
}
function lineupOf(s){return ["dima","renat","roman","nikita","sanya"].map(w=>{const ops=[];s.items.filter(i=>i.k==="tok"&&i.who===w&&!i.hide&&i.op).sort((x,y)=>x.ph-y.ph).forEach(i=>{const o=tr(i.op);if(!ops.includes(o))ops.push(o)});return [w,ops.join(" / ")||"—"]})}
function lineupCard(s){const sec=secOf(s.id);const k="t:"+s.id;
  return `<div class="lu ${s.side}"><div class="luh"><a href="#/s/${sec.id}/${s.id}"><span class="side ${s.side}">${s.side==="d"?t(UI.defence):t(UI.attack)}</span> <b>${sec.icon} ${t(sec.title)}</b> · ${sname(s.id)}</a><button class="fav ${favs.includes(k)?"on":""}" data-fav="${k}">${favs.includes(k)?"★":"☆"}</button></div>
  <div class="lur">${lineupOf(s).map(([w,o])=>`<span class="p ${w}">${PN[w]}</span><span>${esc(o)}</span>`).join("")}</div></div>`}
function lineups(){
  return `<header class="bar"><a class="back" href="#/">‹</a><div><small>[COOK5]</small><h1>👥 ${t(UI.lineups)}</h1></div></header><h2 class="grp">🌃 Nighthaven</h2>
  ${SECTIONS.filter(s=>s.strats).map(sec=>`<h2>${sec.icon} ${t(sec.title)}</h2>${sec.strats.split(",").map(id=>lineupCard(STRATS.find(x=>x.id===id))).join("")}`).join("")}
  <h2>☕ Kafe · ${t(UI.defence)}</h2>${KAFE.filter(k=>k.blocks.some(b=>b.kpos)).map(k=>{const key=k.blocks.find(b=>b.kpos).kpos;return `<div class="lu d"><div class="luh"><a href="#/s/${k.id}"><b>${k.icon} ${t(k.title)}</b></a></div><div class="lur">${KPOS[key].map(r=>`<span class="p ${r[0]}">${PN[r[0]]}</span><span>${esc(r[2])}</span>`).join("")}</div></div>`}).join("")}`;
}
function favourites(){
  const items=favs.map(f=>{const [k,id]=f.split(":");
    if(k==="s"){const s=SECTIONS.find(x=>x.id===id);return s&&`<a class="card wide" href="#/s/${id}"><span class="ic">${s.icon}</span><b>${t(s.title)}</b></a>`}
    const s=STRATS.find(x=>x.id===id);return s&&lineupCard(s)}).filter(Boolean);
  return `<header class="bar"><a class="back" href="#/">‹</a><div><small>[COOK5]</small><h1>★ ${t(UI.fav)}</h1></div></header>
  ${items.length?items.join(""):`<p class="empty">${t(UI.nofav)}</p>`}`;
}
function news(){
  return `<header class="bar"><a class="back" href="#/">‹</a><div><small>[COOK5]</small><h1>🆕 ${t(UI.news)}</h1></div></header>
  <div class="news">${NEWS.map(n=>`<div><time>${RU()?n[1]:n[0]}</time><p>${fmt(n[2])}</p></div>`).join("")}</div>`;
}

/* ---------- search ---------- */
let INDEX=[];
function buildIndex(){INDEX=[];SECTIONS.forEach(s=>{let head=null,hi=0;s.blocks.forEach((b,i)=>{if(b.h){head=plain(b.h);hi=i}
  const txt=[b.h,b.p,b.note,b.tag].filter(Boolean).map(plain).concat((b.list||b.steps||b.check||[]).map(plain),
    b.table?b.table.rows.flat().map(plain):[],b.shots?b.shots.map(x=>plain(x[1])):[],b.kpos?KPOS[b.kpos].map(r=>PN[r[0]]+" "+plain(r[1])+" "+r[2]):[]).join(" · ");
  if(txt)INDEX.push({s,i:b.h?i:hi,head:head||t(s.title),txt})});
  if(s.strats)s.strats.split(",").forEach(id=>{const st=STRATS.find(x=>x.id===id);INDEX.push({s,i:s.blocks.findIndex(b=>b.board),strat:id,head:"🗺️ "+sname(id),txt:sname(id)+" · "+st.phases.join(" · ")+" · "+lineupOf(st).map(x=>PN[x[0]]+" "+x[1]).join(" · ")})})})}
function buildIndex2(){Object.entries(PROFILES).forEach(([w,P])=>INDEX.push({s:{id:w,icon:"👤",title:UI.g_prof},prof:w,head:PN[w]+" · "+t(P.role),txt:[P.nick,P.alt,t(P.role),t(P.rank)].concat(P.ops[0].map(plain),[plain(P.habit)]).join(" · ")}))}
function search(q){const r=$("#results"),c=$("#cards");q=q.trim().toLowerCase();if(!q){r.innerHTML="";c.hidden=false;return}
  const hits=INDEX.filter(x=>x.txt.toLowerCase().includes(q)||x.head.toLowerCase().includes(q)).slice(0,40);c.hidden=true;
  r.innerHTML=`<h3>${t(UI.results)} · ${hits.length}</h3>`+(hits.length?hits.map(h=>{const p=h.txt.toLowerCase().indexOf(q);const a=Math.max(0,p-40);
    const snip=esc(h.txt.slice(a,a+140)).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),m=>`<mark>${m}</mark>`);
    return `<a class="hit" href="${h.prof?"#/p/"+h.prof:"#/s/"+h.s.id+(h.strat?"/"+h.strat:"/@b"+h.i)}"><small>${h.s.icon} ${t(h.s.title)}</small><b>${esc(h.head)}</b><span>${a?"…":""}${snip}…</span></a>`}).join(""):`<p class="empty">${t(UI.noresults)}</p>`);}

/* ---------- board ---------- */
function legendHTML(){return LEGEND.map(([k,txt,c])=>{let sw;
  if(k==="redwall")sw=`<i class="sw" style="background:#dc2626;height:8px;width:24px;border-radius:2px"></i>`;
  else if(k==="elec")sw=`<i class="sw" style="background:#facc15;border-radius:50%;width:18px;height:18px;font-style:normal;font-size:11px;display:grid;place-items:center">⚡</i>`;
  else if(k==="defuser")sw=`<svg width="22" height="22" viewBox="0 -4 48 48"><rect x="2" y="12" width="44" height="30" rx="5" fill="#1f2937" stroke="#facc15" stroke-width="3"/><rect x="9" y="19" width="20" height="9" rx="2" fill="#22d3ee"/><circle cx="42" cy="0" r="4" fill="#ef4444"/></svg>`;
  else if(k==="site")sw=`<i class="sw" style="background:#2563eb;color:#fff;font:700 9px/16px sans-serif;padding:0 4px;border-radius:4px">${t(UI.site)}</i>`;
  else if(k==="move")sw=`<i class="sw" style="border-top:3px dashed #7a4fd1;width:24px"></i>`;
  else if(k==="floor")sw=`<i class="sw" style="border-top:3px dotted #dc2626;width:24px"></i>`;
  else if(c)sw=`<i class="sw" style="background:${c};color:#fff;font:700 9px/16px monospace;padding:0 3px;border-radius:4px">${k}</i>`;
  else sw=`<i class="sw" style="font-style:normal">${k}</i>`;
  return `<span>${sw}${esc(t(txt))}</span>`}).join("")}
let allowed=STRATS.map(x=>x.id);
function ui(){
  [["d","stratSelD","rowD"],["a","stratSelA","rowA"]].forEach(([side,id,row])=>{const ss=document.getElementById(id);ss.innerHTML="";
    const list=allowed.map(id=>STRATS.find(x=>x.id===id)).filter(x=>x&&x.side===side);document.getElementById(row).hidden=!list.length;
    list.forEach(s=>{const b=document.createElement("button");b.textContent=sname(s.id);b.className=(s===cur?"on ":"")+side;b.onclick=()=>{cur=s;floor=s.floor;phase=1;ui();haptic()};ss.appendChild(b)})});
  $("#rowD .lab").textContent=t(UI.defence);$("#rowA .lab").textContent=t(UI.attack);
  const fs=$("#floorSel");fs.innerHTML="";
  ["t","g","b"].forEach(f=>{if(!cur.items.some(i=>i.f===f))return;const b=document.createElement("button");b.textContent=t(UI.floors[f]);b.className=f===floor?"on":"";b.onclick=()=>{floor=f;ui();haptic()};fs.appendChild(b)});
  const ps=$("#phaseSel");ps.innerHTML="";
  cur.phases.forEach((p,i)=>{const b=document.createElement("button");b.textContent=i+1;b.className=(i+1===phase?"on ":"")+cur.side;b.onclick=()=>{phase=i+1;ui();haptic()};ps.appendChild(b)});
  $("#lineupTitle").textContent=cur.side==="a"?t(UI.lineup_a):t(UI.lineup_d);
  $("#lineupList").innerHTML=lineupOf(cur).map(([w,o])=>`<span class="p ${w}">${PN[w]}</span><b${o==="—"?' class="muted"':""}>${esc(o)}</b>`).join("");
  const k="t:"+cur.id,fb=$("#stratFav");fb.dataset.fav=k;fb.textContent=favs.includes(k)?"★":"☆";fb.classList.toggle("on",favs.includes(k));
  $("#phaseText").innerHTML=cur.phases.map((p,i)=>`<li class="${i+1===phase?"cur":""}" data-ph="${i+1}">${esc(p)}</li>`).join("");
  $("#phLab").textContent=t(UI.phases);$("#lgSum").textContent=t(UI.legend);$("#legend").innerHTML=legendHTML();
  $("#resetPos").textContent="↺ "+t(UI.reset);$("#dragNote").textContent=t(UI.drag);
  draw();
}
function mountBoard(stratId){const slot=document.querySelector(".boardslot"),box=$("#boardBox");
  if(!slot){$("#boardHome").appendChild(box);return}
  slot.appendChild(box);allowed=slot.dataset.strats.split(",");
  if(stratId&&allowed.includes(stratId)){cur=STRATS.find(x=>x.id===stratId);floor=cur.floor;phase=1}
  else if(!allowed.includes(cur.id)){cur=STRATS.find(x=>x.id===allowed[0]);floor=cur.floor;phase=1}
  ui();}

/* ---------- router ---------- */
function haptic(){try{tg&&tg.HapticFeedback&&tg.HapticFeedback.selectionChanged()}catch(e){}}
function route(){
  const h=location.hash.replace(/^#\/?/,"").split("/");const v=$("#view");const tab=h[0]||"home";
  $("#boardHome").appendChild($("#boardBox"));
  v.innerHTML=tab==="s"?section(h[1]):tab==="m"?mapPage(h[1]):tab==="p"?profile(h[1]):tab==="fav"?favourites():tab==="new"?news():tab==="lineups"?lineups():home();
  document.querySelectorAll(".tabs a").forEach(a=>a.classList.toggle("on",a.dataset.tab===(["s","m","p","home"].includes(tab)?"home":tab)));
  if(tab==="s"){mountBoard(h[2]&&!h[2].startsWith("@")?h[2]:null);
    const target=h[2]?(h[2].startsWith("@")?document.getElementById(h[2].slice(1)):document.querySelector(".boardh")):null;
    if(target)setTimeout(()=>target.scrollIntoView({block:"start"}),30);else window.scrollTo(0,0)}
  else window.scrollTo(0,0);
  const q=$("#q");if(q){q.oninput=()=>search(q.value)}
  if(tg&&tg.BackButton){tab==="home"?tg.BackButton.hide():tg.BackButton.show()}
  $("#langBtn").textContent=RU()?"EN":"RU";document.querySelectorAll("[data-ui]").forEach(e=>e.textContent=t(UI[e.dataset.ui]));
}
document.addEventListener("click",e=>{
  const f=e.target.closest("[data-fav]");if(f){e.preventDefault();const k=f.dataset.fav;favs=favs.includes(k)?favs.filter(x=>x!==k):favs.concat(k);store.set("d8fav",favs);
    document.querySelectorAll(`[data-fav="${k}"]`).forEach(b=>{b.textContent=favs.includes(k)?"★":"☆";b.classList.toggle("on",favs.includes(k))});haptic();return}
  const to=e.target.closest("[data-to]");if(to){e.preventDefault();document.getElementById(to.dataset.to).scrollIntoView({behavior:"smooth",block:"start"});to.closest("details").open=false;return}
  const ph=e.target.closest("#phaseText li");if(ph){phase=+ph.dataset.ph;ui();return}
  const fig=e.target.closest("figure[data-img]");if(fig){$("#lbImg").src=fig.dataset.img;$("#lb").hidden=false;return}
  if(e.target.closest("#lb")){$("#lb").hidden=true;return}
});
document.addEventListener("change",e=>{const k=e.target.dataset&&e.target.dataset.k;if(k)store.set(k,e.target.checked)});
$("#langBtn").onclick=()=>{window.LANG=RU()?"en":"ru";store.set("d8lang",window.LANG);applyLang();buildIndex();buildIndex2();
  const y=window.scrollY;$("#boardHome").appendChild($("#boardBox"));route();window.scrollTo(0,y)};
$("#topBtn").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
window.addEventListener("scroll",()=>$("#topBtn").classList.toggle("show",window.scrollY>600),{passive:true});
$("#topBtn").setAttribute("aria-label","Top");
document.getElementById("resetPos").onclick=()=>{Object.keys(pos).filter(k=>k.startsWith(cur.id+"|")).forEach(k=>delete pos[k]);try{localStorage.setItem("d8pos",JSON.stringify(pos))}catch(e){}draw()};
window.addEventListener("hashchange",route);

/* ---------- Telegram ---------- */
if(tg){try{tg.ready();tg.expand();
  const th=tg.themeParams||{};const r=document.documentElement.style;
  if(th.bg_color)r.setProperty("--bg",th.bg_color);if(th.secondary_bg_color)r.setProperty("--bg2",th.secondary_bg_color);
  if(th.text_color)r.setProperty("--fg",th.text_color);if(th.hint_color)r.setProperty("--muted",th.hint_color);
  if(th.button_color)r.setProperty("--acc",th.button_color);if(th.section_bg_color)r.setProperty("--card",th.section_bg_color);
  if(tg.colorScheme)document.documentElement.dataset.theme=tg.colorScheme;
  tg.BackButton&&tg.BackButton.onClick(()=>history.length>1?history.back():(location.hash="#/"));
  if(tg.CloudStorage&&tg.isVersionAtLeast&&tg.isVersionAtLeast("6.9"))tg.CloudStorage.getItem("d8fav",(err,v)=>{if(!err&&v){try{favs=JSON.parse(v);route()}catch(e){}}});
}catch(e){}}
applyLang();buildIndex();buildIndex2();route();
