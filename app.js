/* [COOK5] Playbook mini app — UI. Design and navigation follow the D8 HTML playbooks:
   every page = header (crumb, H1, sub line, EN/RU) + sticky tab bar + one tab of content. */
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
const inl=s=>s.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>");
const fmt=v=>inl(esc(t(v))).replace(/@(dima|renat|roman|nikita|sanya)/g,(m,w)=>`<span class="p ${w}">${PN[w]}</span>`);
const plain=v=>t(v).replace(/\*/g,"").replace(/@(dima|renat|roman|nikita|sanya)/g,(m,w)=>PN[w]);
const sname=id=>t(SHORT[id])||id;
const secOf=id=>SECTIONS.find(s=>s.strats&&s.strats.split(",").includes(id));
const WHO=["dima","renat","roman","nikita","sanya"];
const sideL=s=>s==="d"?t(UI.defence):t(UI.attack);

/* Russian phase texts: swap in place so the board engine stays untouched */
STRATS.forEach(s=>{s.phEn=s.phases.slice()});
function applyLang(){STRATS.forEach(s=>{s.phases=(RU()&&PH_RU[s.id])?PH_RU[s.id]:s.phEn});document.documentElement.lang=RU()?"ru":"en"}

/* ---------- documents (each one = a playbook page with tabs) ---------- */
const DOCS={
 rules:{order:SECTIONS.filter(s=>s.group==="rules").map(s=>s.id),
  h1:["D8 Team <b>Rulebook</b>","Свод правил <b>D8</b>"],
  sub:["v1 · updated 7 Nov 2026 · team games 19.10–06.11 · sources: baseline 29.10, reviews 30.10 / 02.11 / 06.11, Nighthaven & Kafe playbooks","v1 · обновлено 7 ноября 2026 · командные игры 19.10–06.11 · источники: базовый срез 29.10, разборы 30.10 / 02.11 / 06.11, плейбуки Nighthaven и Kafe"]},
 calls:{order:["cl-lang","cl-ours","cl-other"],
  h1:["Attack <b>Calls</b>","Коллы <b>атаки</b>"],
  sub:["[COOK5] · added 7 Nov 2026 · six call words + 16 named attack plays · source: R6 Basic Calls (generic playbook) · not tested by us yet","[COOK5] · добавлено 7 ноября 2026 · шесть слов-коллов + 16 именных розыгрышей атаки · источник: R6 Basic Calls (общий плейбук) · нами ещё не проверено"]},
 nh:{order:["plan","map","cc","basement","storage","kitchen","pro","bans","practice"],
  h1:["Nighthaven Labs <b>Playbook</b>","Nighthaven Labs <b>Плейбук</b>"],
  sub:["D8 · updated 30 Oct 2026 · sources: Mint setup video, basement attack video, Nighthaven attack video, W7M pro review, r6tv pro data","D8 · обновлено 30 октября 2026 · источники: видео с сетапами Mint, видео атаки подвала, видео атаки Nighthaven, разбор W7M, про-статистика r6tv"]},
 cal:{order:["c-plan","c-base","c-bj","c-bet","c-2f"],
  h1:["Calypso Casino <b>Playbook</b>","Calypso Casino <b>Плейбук</b>"],
  sub:["[COOK5] · updated 7 Nov 2026 · defence setups for all 4 sites · source: Mint's Calypso defence guide + his top-down screenshots","[COOK5] · обновлено 7 ноября 2026 · сетапы защиты на все 4 точки · источник: гайд Mint по защите Calypso + его скриншоты сверху"]},
 villa:{order:["v-plan","v-ag"],
  h1:["Villa <b>Playbook</b>","Villa <b>Плейбук</b>"],
  sub:["[COOK5] · added 7 Nov 2026 · 2F Aviator / Games defence + strat board · source: setup drawing from a Discord channel · untested","[COOK5] · добавлено 7 ноября 2026 · защита 2F Aviator / Games + страт-борд · источник: схема из Discord-канала · не проверено"]},
 kafe:{order:["k-plan","k-read","k-mine","k-kit","k-bar"],
  h1:["Kafe Dostoyevsky <b>Playbook</b>","Kafe Dostoyevsky <b>Плейбук</b>"],
  sub:["D8 · game plan and defence setups for all 4 sites · attack plan and strat boards to come","D8 · игровой план и сетапы защиты на все 4 точки · план атаки и страт-борды — позже"]}
};
const TABL={"cl-lang":["Call words","Слова-коллы"],"cl-ours":["Our maps","Наши карты"],"cl-other":["Other maps","Другие карты"],plan:["Overview","Обзор"],map:["Map","Карта"],cc:["CC / Servers","CC / Servers"],basement:["Basement","Подвал"],storage:["Storage","Storage"],kitchen:["Kitchen","Kitchen"],pro:["Pro notes","Про-заметки"],bans:["Bans","Баны"],practice:["Practice","Тренировка"],
 "r-check":["Checklist","Чек-лист"],"r-round":["In-round","В раунде"],"r-pool":["Maps","Карты"],"r-ops":["Operators","Оперативники"],"r-sites":["Line-ups","Расстановки"],"r-bans":["Bans","Баны"],"r-goals":["Targets","Цели"],
 "c-plan":["Overview","Обзор"],"c-base":["Basement","Подвал"],"c-bj":["Blackjack","Blackjack"],"c-bet":["Betting","Betting"],"c-2f":["2F","2F"],
 "v-plan":["Overview","Обзор"],"v-ag":["Aviator / Games","Aviator / Games"],
 "k-plan":["Overview","Обзор"],"k-read":["Reading","Reading"],"k-mine":["Mining","Mining"],"k-kit":["Kitchen","Kitchen"],"k-bar":["Bar","Bar"]};
const docOf=s=>s.group==="rules"?"rules":s.group==="calls"?"calls":s.map;
const docHref=d=>d==="rules"?"#/r":d==="calls"?"#/c":"#/m/"+d;
const docName=d=>d==="rules"?t(UI.g_rules):d==="calls"?t(UI.g_calls):MAPS.find(m=>m.id===d).name;

/* ---------- shared page chrome ---------- */
function page({crumb,h1,sub,tabs,body}){
  return `<header class="ph${crumb?" crumbed":""}">${crumb?`<div class="crumb"><a href="${crumb[0]}">‹ ${esc(crumb[1])}</a>${crumb[2]?`<span>/ ${esc(crumb[2])}</span>`:""}</div>`:""}
   <h1>${h1}</h1>${sub?`<span class="sub">${sub}</span>`:""}
   <div class="seg lang"><button data-l="en" class="${RU()?"":"on"}">EN</button><button data-l="ru" class="${RU()?"on":""}">RU</button></div></header>
  ${tabs?`<nav class="tabs" id="tabs">${tabs.map(x=>`<a href="${x[0]}" class="${x[2]?"on ":""}${x[3]||""}">${esc(x[1])}${x[4]?'<span class="star">★</span>':""}</a>`).join("")}</nav>`:""}
  <section class="pg">${body}</section>`}
const kpiTiles=list=>`<div class="kpis">${list.map(k=>`<div class="kpi"><b class="${k[3]==="good"||k[3]==="bad"?k[3]:""}">${esc(k[0])}</b><span>${fmt(k[1])}</span>${k[2]?`<div class="bar ${k[3]}"><i style="width:${k[2]}%"></i></div>`:""}</div>`).join("")}</div>`;
const row=(href,ic,title,small,extra)=>`<a class="row" href="${href}">${ic}<span class="tx"><b>${title}</b>${small?`<small>${small}</small>`:""}</span>${extra||""}<span class="go">›</span></a>`;
const favBtn=k=>`<button class="fav ${favs.includes(k)?"on":""}" data-fav="${k}" aria-label="★">${favs.includes(k)?"★":"☆"}</button>`;

/* ---------- section content (blocks → panels) ---------- */
function kposTable(key){return `<div class="tw"><table><thead><tr><th>${t(UI.player)}</th><th>${t(UI.spot)}</th><th>${t(UI.ops)}</th></tr></thead><tbody>${KPOS[key].map(r=>`<tr><td>${fmt("@"+r[0])}</td><td>${fmt(r[1])}</td><td><b>${esc(r[2])}</b></td></tr>`).join("")}</tbody></table></div>`}
function blockHTML(b,i,sec){
  if(b.p)return `<p class="lead">${fmt(b.p)}</p>`;
  if(b.note)return `<p class="note">${fmt(b.note)}</p>`;
  if(b.list)return `<ul class="tight">${b.list.map(x=>`<li>${fmt(x)}</li>`).join("")}</ul>`;
  if(b.steps)return `<ol class="steps">${b.steps.map(x=>`<li>${fmt(x)}</li>`).join("")}</ol>`;
  if(b.check)return `<div class="chk">${b.check.map((x,j)=>{const k=`chk:${sec.id}:${i}:${j}`;return `<label><input type="checkbox" data-k="${k}" ${store.get(k,false)?"checked":""}><span>${fmt(x)}</span></label>`}).join("")}</div>`;
  if(b.kpis)return kpiTiles(b.kpis.map(k=>[k[0],k[1]]));
  if(b.table)return `<div class="tw"><table><thead><tr>${b.table.head.map(h=>`<th>${fmt(h)}</th>`).join("")}</tr></thead><tbody>${b.table.rows.map(r=>`<tr>${r.map((c,j)=>j===0&&/^\d+$/.test(t(c))?`<td class="n">${esc(t(c))}</td>`:`<td>${fmt(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  if(b.shots)return `<div class="strip${b.square?" sq":""}">${b.shots.map(s=>`<button class="shot" data-img="img/${s[0]}" data-cap="${esc(plain(s[1]))}"><img loading="lazy" src="img/${s[0]}" alt=""><span>${fmt(s[1])}</span></button>`).join("")}</div>`;
  if(b.kpos)return kposTable(b.kpos);
  return "";
}
function secBody(s){
  const out=[];let box=null;
  const close=()=>{if(box){out.push(`<div class="box ${box.cls}">${box.h}${box.c.join("")}</div>`);box=null}};
  s.blocks.forEach((b,i)=>{
    if(b.h){close();box={cls:b.side||"",c:[],h:`<h3 id="b${i}">${b.side?`<span class="tag ${b.side}">${sideL(b.side)}</span>`:""}<span>${fmt(b.h)}</span>${b.tag?`<span class="tag">${fmt(b.tag)}</span>`:""}</h3>`};return}
    if(b.board){close();out.push(`<div class="box acc" id="b${i}"><h3 class="boardh">${t(UI.board)}</h3><div class="boardslot" data-strats="${b.board}"></div></div>`);return}
    const h=blockHTML(b,i,s);
    if(box)box.c.push(h);else if(b.p||b.note||b.kpis)out.push(h);else out.push(`<div class="box">${h}</div>`);
  });close();return out.join("");
}
function section(id){
  const s=SECTIONS.find(x=>x.id===id);if(!s)return home("ov");
  const d=docOf(s),D=DOCS[d],m=MAPS.find(x=>x.id===d);
  const tabs=D.order.map(x=>["#/s/"+x,t(TABL[x]),x===id,"",favs.includes("s:"+x)]);
  const body=`<div class="head"><h2>${t(s.title)}</h2>${s.kind?`<span class="tag">${s.kind}</span>`:""}${s.strats?`<span class="tag a">${s.strats.split(",").length} ${t(UI.strats)}</span>`:""}${favBtn("s:"+id)}</div>${secBody(s)}`;
  return page({crumb:["#/","[COOK5]",m?t(UI.g_maps):""],h1:t(D.h1),sub:fmt(D.sub)+(m?` · <span>${t(m.rec)}</span>`:""),tabs,body});
}

/* ---------- home ---------- */
const HOME_TABS=[["ov",UI.overview],["rules",UI.g_rules],["maps",UI.g_maps],["rev",UI.g_rev],["players",UI.players],["lineups",UI.lineups],["fav",UI.saved],["new",UI.news]];
function home(tab){
  tab=HOME_TABS.some(x=>x[0]===tab)?tab:"ov";
  const tabs=HOME_TABS.map(([k,l])=>[k==="ov"?"#/":"#/h/"+k,t(l),k===tab]);
  const body={ov:homeOv,rules:homeRules,maps:homeMaps,rev:homeRev,players:homePlayers,lineups:lineups,fav:favourites,new:news}[tab]();
  return page({h1:RU()?"[COOK5] <b>Плейбук</b>":"[COOK5] <b>Playbook</b>",sub:esc(t(["D8 · Rainbow Six Siege · ","D8 · Rainbow Six Siege · "])+t(UI.updated)+" · "+t(UI.sub)),tabs,body});
}
function homeOv(){
  const last=REVIEWS[0];
  return `<label class="search"><span>🔍</span><input id="q" type="search" placeholder="${esc(t(UI.search))}" autocomplete="off"></label>
  <div id="results" hidden></div>
  <div id="cards" style="display:grid;gap:14px">
  ${kpiTiles([["21–28",UI.k_games],["42%",UI.k_att,42,"a"],["55%",UI.k_def,55,"d"],["0–8",UI.k_last,0,"bad"]])}
  <div class="box"><h3>${t(["Who does what","Кто что делает"])}</h3><div class="tw"><table><thead><tr><th>${t(UI.player)}</th><th>${t(UI.p_role)}</th><th>${t(UI.p_rank)}</th></tr></thead><tbody>
   ${WHO.map(w=>`<tr><td><a href="#/p/${w}"><span class="p ${w}">${PN[w]}</span></a></td><td>${fmt(PROFILES[w].role)}</td><td>${esc(t(PROFILES[w].rank)).replace(/ \(.*/,"")}</td></tr>`).join("")}</tbody></table></div></div>
  <div class="box acc"><h3>${t(["Latest review","Последний разбор"])}</h3><div class="rows">${revRow(last)}</div></div>
  <div class="box"><h3>${t(["Playbooks","Плейбуки"])}</h3><div class="rows">
   ${row("#/r",'<span class="ic">📘</span>',t(UI.g_rules),`${SECTIONS.filter(s=>s.group==="rules").length} ${t(UI.blocks)}`)}
   ${row("#/c",'<span class="ic">📣</span>',t(UI.g_calls),t(["6 call words · 16 attack plays","6 слов-коллов · 16 розыгрышей атаки"]))}
   ${MAPS.map(m=>row("#/m/"+m.id,`<span class="ic">${m.icon}</span>`,m.name,`${t(m.sub)} · ${t(m.rec)}`)).join("")}
   ${row("#/h/rev",'<span class="ic">📊</span>',t(UI.g_rev),REVIEWS.map(r=>r.date).join(" · "))}
  </div></div></div>`}
function homeRules(){const rs=SECTIONS.filter(s=>s.group==="rules");
  return `<p class="lead">${fmt(DOCS.rules.sub)}</p><div class="box"><div class="rows">${rs.map(s=>row("#/s/"+s.id,`<span class="num">${s.num}</span>`,t(s.title),t(TABL[s.id]),favs.includes("s:"+s.id)?'<span class="star">★</span>':"")).join("")}</div></div>`}
function homeMaps(){
  return MAPS.map(m=>`<div class="box"><h3><span>${m.icon} ${m.name}</span><span class="tag d">${t(m.rec)}</span></h3><p class="note">${t(m.sub)}</p><div class="rows">${DOCS[m.id].order.map(id=>{const s=SECTIONS.find(x=>x.id===id);
    return row("#/s/"+id,`<span class="num">${s.num}</span>`,t(s.title),[s.kind,s.strats?s.strats.split(",").length+" "+t(UI.strats):""].filter(Boolean).join(" · "),favs.includes("s:"+id)?'<span class="star">★</span>':"")}).join("")}</div></div>`).join("")+
   `<div class="box" style="border-style:dashed"><p class="note">➕ ${t(UI.soon)} — ${t(UI.soon2)}</p></div>`}
const revRow=r=>row("#/v/"+r.id,`<span class="num">${r.date}</span>`,t(r.title),`<span class="${r.kind==="duo"?"ka":"kd"}">${r.kind==="duo"?t(UI.rev_duo):t(UI.rev_team)}</span> · ${esc(t(r.line))}`);
function homeRev(){
  const latest=REVIEWS.find(r=>r.kind==="team");const secs=revSections(latest);const cmp=secs.find(s=>/compared|сравнение/i.test(s.h));
  const tbl=cmp&&cmp.blocks.find(b=>b.t==="table");
  return `<div class="box"><div class="rows">${REVIEWS.map(revRow).join("")}</div></div>
   ${tbl?`<div class="box"><h3>${t(UI.rev_trend)} <span class="tag">${latest.date}</span></h3>${mdTable(tbl)}</div>`:""}
   <p class="note">${t(UI.rev_src)}</p>`}
function homePlayers(){
  return `<div class="box"><div class="rows">${WHO.map(w=>{const P=PROFILES[w];return row("#/p/"+w,`<span class="av ${w}">${PN[w][0]}</span>`,PN[w],`${esc(P.nick)} · ${t(P.role)} · ${esc(t(P.rank)).replace(/ \(.*/,"")}`)}).join("")}</div></div>`}
function lineupOf(s){return WHO.map(w=>{const ops=[];s.items.filter(i=>i.k==="tok"&&i.who===w&&!i.hide&&i.op).sort((x,y)=>x.ph-y.ph).forEach(i=>{const o=tr(i.op);if(!ops.includes(o))ops.push(o)});return [w,ops.join(" / ")||"—"]})}
function lineupCard(s){const sec=secOf(s.id);const k="t:"+s.id;
  return `<div class="box ${s.side}"><div class="luh"><a href="#/s/${sec.id}/${s.id}" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span class="tag ${s.side}">${sideL(s.side)}</span><b>${t(sec.title)} · ${sname(s.id)}</b></a>${favBtn(k)}</div>
  <div class="lu">${lineupOf(s).map(([w,o])=>`<span class="p ${w}">${PN[w]}</span><span class="${o==="—"?"muted":""}">${esc(o)}</span>`).join("")}</div></div>`}
/* maps whose defence line-ups live in KPOS tables: [doc id, icon, short name, profile label] */
const KPOS_MAPS=[["cal","🎰","Calypso","p_cal"],["villa","🏛️","Villa","p_villa"],["kafe","☕","Kafe","p_kafe"]];
const kposSecs=d=>DOCS[d].order.map(id=>SECTIONS.find(s=>s.id===id)).filter(s=>s&&s.blocks.some(b=>b.kpos));
function lineups(){
  return `<h2>🌃 Nighthaven</h2>${DOCS.nh.order.map(id=>SECTIONS.find(s=>s.id===id)).filter(s=>s.strats).map(sec=>sec.strats.split(",").map(id=>lineupCard(STRATS.find(x=>x.id===id))).join("")).join("")}
  ${KPOS_MAPS.map(([d,ic,nm])=>`<h2>${ic} ${nm} · ${t(UI.defence)}</h2>${kposSecs(d).map(k=>{const key=k.blocks.find(b=>b.kpos).kpos;return `<div class="box d"><div class="luh"><a href="#/s/${k.id}"><b>${t(k.title)}</b></a></div><div class="lu">${KPOS[key].map(r=>`<span class="p ${r[0]}">${PN[r[0]]}</span><span>${esc(r[2])}</span>`).join("")}</div></div>`}).join("")}`).join("")}`;
}
function favourites(){
  const items=favs.map(f=>{const [k,id]=f.split(":");
    if(k==="s"){const s=SECTIONS.find(x=>x.id===id);return s&&`<div class="box"><div class="rows">${row("#/s/"+id,`<span class="ic">${s.icon}</span>`,t(s.title),docName(docOf(s)))}</div></div>`}
    const s=STRATS.find(x=>x.id===id);return s&&lineupCard(s)}).filter(Boolean);
  return items.length?items.join(""):`<p class="empty">${t(UI.nofav)}</p>`;
}
function news(){return `<div class="box"><div class="rows">${NEWS.map(n=>`<div class="row"><span class="num" style="width:3.6em">${RU()?n[1]:n[0]}</span><span class="tx"><span>${fmt(n[2])}</span></span></div>`).join("")}</div></div>`}

/* ---------- reviews (markdown from rv-*.js) ---------- */
function mdParse(src){const L=src.split("\n"),out=[];let i=0;
  const cells=r=>r.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(c=>c.trim());
  while(i<L.length){const l=L[i];let m;
    if(!l.trim()){i++;continue}
    if((m=l.match(/^(#{1,3})\s+(.*)/))){out.push({t:"h"+m[1].length,x:m[2]});i++;continue}
    if(l.startsWith("|")){const rs=[];while(i<L.length&&L[i].startsWith("|")){rs.push(L[i]);i++}out.push({t:"table",head:cells(rs[0]),body:rs.slice(2).map(cells)});continue}
    if(/^- /.test(l)){const it=[];while(i<L.length&&/^- /.test(L[i])){it.push(L[i].slice(2));i++}out.push({t:"ul",it});continue}
    if(/^\d+\. /.test(l)){const it=[];while(i<L.length&&/^\d+\. /.test(L[i])){it.push(L[i].replace(/^\d+\. /,""));i++}out.push({t:"ol",it});continue}
    const ps=[];while(i<L.length&&L[i].trim()&&!/^(#|\||- |\d+\. )/.test(L[i])){ps.push(L[i]);i++}
    out.push({t:"p",x:ps});
  }return out}
const _rs={};
function revSections(R){const k=R.id+RU();if(_rs[k])return _rs[k];
  const bl=mdParse(REV_MD[R.id][RU()?"ru":"en"]);const secs=[];let cur={h:"",intro:1,blocks:[]},title="";
  bl.forEach(b=>{if(b.t==="h1"){title=b.x;return}if(b.t==="h2"){secs.push(cur);cur={h:b.x,blocks:[]};return}cur.blocks.push(b)});secs.push(cur);
  const intro=secs.shift();secs[0].intro=intro.blocks;secs.title=title;return _rs[k]=secs}
const revTab=h=>{const f=REV_TABS.find(x=>x[0].test(h));return f?t(f[1]):h.replace(/\..*/,"")};
const PNAME={Dima:"dima",Renat:"renat",Roman:"roman",Nikita:"nikita",Sanya:"sanya","Дима":"dima","Ренат":"renat","Роман":"roman","Никита":"nikita","Саня":"sanya"};
function mdCell(c,hd){const h=inl(esc(c));
  if(/^([ADАЗ][+−]\s*)+$/.test(c))return `<span class="rd">${c.split(/\s+/).map(x=>`<i class="${x.endsWith("+")?"w":"l"}">${x}</i>`).join("")}</span>`;
  if(/^(Met|Выполнено)/.test(c))return `<span class="good">${h}</span>`;
  if(/^(Not met|Не выполнено)/.test(c))return `<span class="bad">${h}</span>`;
  const m=/^(Player|Игрок)$/.test(hd)&&c.match(/^(\S+)(.*)$/);if(m&&PNAME[m[1]])return `<span class="p ${PNAME[m[1]]}">${m[1]}</span>${esc(m[2])}`;
  return h}
function mdTable(b,rows){rows=rows||b.body;const wide=b.head.length>5;
  return `<div class="tw${wide?" wide":""}"><table><thead><tr>${b.head.map(h=>`<th>${inl(esc(h))}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,j)=>j===0&&/^\d+$/.test(c)?`<td class="n">${c}</td>`:`<td>${mdCell(c,b.head[j])}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`}
const mdP=b=>b.x.map(x=>inl(esc(x))).join("<br>");
function mdBlock(b){
  if(b.t==="table")return mdTable(b);
  if(b.t==="ul")return `<ul class="tight">${b.it.map(x=>`<li>${inl(esc(x))}</li>`).join("")}</ul>`;
  if(b.t==="ol")return `<ol class="steps">${b.it.map(x=>`<li>${inl(esc(x))}</li>`).join("")}</ol>`;
  if(b.t==="p")return `<p>${mdP(b)}</p>`;return ""}
function mdBody(blocks,firstCls){const out=[];let box=null,n=0;
  const close=()=>{if(box){out.push(`<div class="box ${box.cls}">${box.h}${box.c.join("")}</div>`);box=null}};
  const open=(h,sub)=>{close();box={h:h?`<h3>${h}</h3>`:"",c:[],sub,cls:n++===0?firstCls||"":""}};
  blocks.forEach((b,i)=>{const nx=blocks[i+1];
    if(b.t==="h3"){open(inl(esc(b.x)),1);return}
    if(b.t==="p"){const x=b.x.join(" ");
      if(box&&box.sub){box.c.push(`<p>${mdP(b)}</p>`);return}
      if(box&&/^\*/.test(x)){box.c.push(`<p class="note">${mdP(b)}</p>`);return}
      close();
      if(nx&&nx.t!=="p"&&nx.t!=="h3"&&/:$/.test(x)&&x.length<100){open(inl(esc(x.replace(/:$/,""))));return}
      out.push(`<p class="lead">${mdP(b)}</p>`);return}
    if(!box)open("");
    box.c.push(mdBlock(b));
    if(!box.sub&&nx&&(nx.t==="table"||nx.t==="ul"||nx.t==="ol"))close();
  });close();return out.join("")}
function review(id,tab){
  const R=REVIEWS.find(r=>r.id===id);if(!R||!REV_MD[id])return home("rev");
  const secs=revSections(R);tab=Math.max(0,Math.min(secs.length-1,+tab||0));const S=secs[tab];
  const tabs=secs.map((s,i)=>["#/v/"+id+"/"+i,revTab(s.h),i===tab]);
  const heading=S.h.replace(/^\d+b?\.\s*/,"");
  const body=(tab===0?kpiTiles(R.kpis)+`<p class="lead">${esc(t(R.who))}</p>`+(S.intro?mdBody(S.intro):""):"")+
    `<div class="head"><h2>${inl(esc(heading))}</h2>${tab===0?`<span class="tag ${R.kind==="duo"?"a":"d"}">${R.kind==="duo"?t(UI.rev_duo):t(UI.rev_team)}</span>`:""}</div>`+
    mdBody(S.blocks,/summary|выводы/i.test(S.h)?"acc":"")+(tab===secs.length-1?`<p class="note">${t(UI.rev_src)}</p>`:"");
  const h1=R.kind==="duo"?(RU()?`Дуо-разбор <b>${R.date}</b>`:`Duo review <b>${R.date}</b>`):(RU()?`Разбор <b>${R.date}</b>`:`Session review <b>${R.date}</b>`);
  return page({crumb:["#/h/rev","[COOK5]",t(UI.g_rev)],h1,sub:inl(esc(secs.title)),tabs,body});
}
const hitsN=g=>g.join("").split(/<li>|<tr>|class="quote"/).length-1-g.reduce((n,x)=>n+(x.match(/<thead><tr>/g)||[]).length,0);
/* personal review: every line of the team reviews that names this player */
const whoRx=w=>new RegExp("(^|[^A-Za-zА-Яа-яЁё0-9_])("+WHO_RX[w][RU()]+")(?![A-Za-zА-Яа-яЁё0-9_])","g");
function personal(w){
  const rx=whoRx(w),has=s=>{rx.lastIndex=0;return rx.test(s)},hl=h=>{rx.lastIndex=0;return h.replace(rx,`$1<mark class="me">$2</mark>`)};
  return `<p class="lead">${t(UI.rev_my_note)}</p>`+REVIEWS.map((R,ri)=>{
    const secs=revSections(R);const groups=[];
    secs.forEach((S,si)=>{if(/opponents|соперники/i.test(S.h))return;const hits=[];
      S.blocks.forEach(b=>{
        if(b.t==="p"&&has(b.x.join(" ")))hits.push(`<p class="quote">${hl(mdP(b))}</p>`);
        if((b.t==="ul"||b.t==="ol")){const it=b.it.filter(has);if(it.length)hits.push(`<ul class="tight">${it.map(x=>`<li>${hl(inl(esc(x)))}</li>`).join("")}</ul>`)}
        if(b.t==="table"){const rows=b.body.filter(r=>r.some(has));if(rows.length)hits.push(hl(mdTable(b,rows)))}
      });
      if(hits.length)groups.push(`<a class="mlab" href="#/v/${R.id}/${si}">${esc(revTab(S.h))} ›</a>${hits.join("")}`)});
    return `<details class="box ${R.kind==="duo"?"a":"d"}"${ri===0?" open":""}><summary><h3><span>${R.date} · ${t(R.title)}</span><span class="tag">${groups.length?hitsN(groups):0}</span></h3></summary>${groups.length?groups.join(""):`<p class="note">${t(UI.rev_none)}</p>`}
      <a class="btn" href="#/v/${R.id}">${t(UI.rev_open)} ›</a></details>`}).join("");
}

/* ---------- profile ---------- */
function spark(v){const w=260,h=60,mx=Math.max(2,...v),pts=v.map((x,i)=>[14+i*(w-28)/(v.length-1),h-8-(x/mx)*(h-24)]);
  return `<svg viewBox="0 0 ${w} ${h+16}" class="spark"><line x1="10" x2="${w-10}" y1="${h-8-(1/mx)*(h-24)}" y2="${h-8-(1/mx)*(h-24)}" class="one"/><polyline points="${pts.map(p=>p.join(",")).join(" ")}"/>${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5"/><text x="${p[0]}" y="${p[1]-8}">${v[i].toFixed(2)}</text><text class="d" x="${p[0]}" y="${h+12}">${EVENINGS[i]}</text>`).join("")}</svg>`}
const PTABS=[["ov",UI.overview],["ops",UI.p_ops],["strats",UI.strats_t],["rev",UI.rev_my]];
function profile(w,tab){const P=PROFILES[w];if(!P)return home("players");
  tab=PTABS.some(x=>x[0]===tab)?tab:"ov";const o=P.ops[0];
  const tabs=PTABS.map(([k,l])=>["#/p/"+w+(k==="ov"?"":"/"+k),k==="ops"?t(["Operators","Оперативники"]):t(l),k===tab]);
  let body="";
  if(tab==="ov")body=`<div class="phead"><span class="av big ${w}">${PN[w][0]}</span><div><b>${PN[w]}</b><small>${esc(P.nick)}</small><span class="p ${w}">${t(P.role)}</span></div></div>
    ${kpiTiles([[t(P.rank).replace(/ \(.*/,""),UI.p_rank],P.last?[P.last[0][2],"K/D · 06.11",0,+P.last[0][2]>=1?"good":"bad"]:["0.41","K/D · 29.10",0,"bad"]])}
    <div class="box acc"><h3>${t(UI.p_habit)}</h3><p class="habit">${fmt(P.habit)}</p></div>
    <div class="box"><h3>${t(UI.p_last)}</h3>${P.last?`<div class="tw"><table><thead><tr><th>${RU()?"Игр":"Games"}</th><th>K–D</th><th>K/D</th><th>${RU()?"Первые дуэли":"Openings"}</th><th>${RU()?"Умер первым":"First to die"}</th></tr></thead><tbody>${P.last.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:`<p class="note">${fmt(P.lastNote)}</p>`}</div>
    ${P.trend?`<div class="box d"><h3>${t(UI.p_trend)}</h3>${spark(P.trend)}</div>`:""}`;
  if(tab==="ops")body=`<div class="box"><h3>${t(UI.p_ops)}</h3><div class="tw"><table><tbody>${[[UI.att_main,o[0],"a"],[UI.att_back,o[1],"a"],[UI.def_main,o[2],"d"],[UI.def_back,o[3],"d"],[UI.stop,o[4],"bad"]].map(r=>`<tr><th><span class="tag ${r[2]}">${t(r[0])}</span></th><td>${fmt(r[1])}</td></tr>`).join("")}</tbody></table></div></div>`;
  if(tab==="strats"){
    const ord=DOCS.nh.order.map(id=>SECTIONS.find(x=>x.id===id)).filter(x=>x.strats).flatMap(x=>x.strats.split(","));
    const nh=ord.map(id=>STRATS.find(x=>x.id===id)).map(s=>[s,lineupOf(s).find(x=>x[0]===w)[1]]).filter(x=>x[1]!=="—");
    const kp=d=>kposSecs(d).map(sec=>[sec,KPOS[sec.blocks.find(b=>b.kpos).kpos].find(x=>x[0]===w)]).filter(x=>x[1]);
    body=`<div class="box"><h3>🌃 ${t(UI.p_nh)}</h3><div class="tw"><table><tbody>${nh.map(([s,op])=>`<tr><td><span class="tag ${s.side}">${sideL(s.side)}</span></td><td><a class="btn" style="text-transform:none;font:inherit;color:var(--def)" href="#/s/${secOf(s.id).id}/${s.id}">${t(secOf(s.id).title)} · ${sname(s.id)}</a></td><td><b>${esc(op)}</b></td></tr>`).join("")}</tbody></table></div></div>
    ${KPOS_MAPS.map(([d,ic,,lab])=>`<div class="box d"><h3>${ic} ${t(UI[lab])}</h3><div class="tw"><table><tbody>${kp(d).map(([sec,r])=>`<tr><td><a href="#/s/${sec.id}" style="color:var(--def)">${t(sec.title)}</a></td><td>${fmt(r[1])}</td><td><b>${esc(r[2])}</b></td></tr>`).join("")}</tbody></table></div></div>`).join("")}`}
  if(tab==="rev")body=personal(w);
  return page({crumb:["#/h/players","[COOK5]",t(UI.players)],h1:`${PN[w]} <b>${esc(P.nick)}</b>`,sub:`${fmt(P.role)} · ${esc(t(P.rank))}`,tabs,body});
}

/* ---------- search ---------- */
let INDEX=[];
function buildIndex(){INDEX=[];SECTIONS.forEach(s=>{let head=null,hi=0;s.blocks.forEach((b,i)=>{if(b.h){head=plain(b.h);hi=i}
  const txt=[b.h,b.p,b.note,b.tag].filter(Boolean).map(plain).concat((b.list||b.steps||b.check||[]).map(plain),
    b.table?b.table.rows.flat().map(plain):[],b.shots?b.shots.map(x=>plain(x[1])):[],b.kpos?KPOS[b.kpos].map(r=>PN[r[0]]+" "+plain(r[1])+" "+r[2]):[]).join(" · ");
  if(txt)INDEX.push({where:docName(docOf(s))+" · "+t(s.title),href:"#/s/"+s.id+"/@b"+(b.h?i:hi),head:head||t(s.title),txt})});
  if(s.strats)s.strats.split(",").forEach(id=>{const st=STRATS.find(x=>x.id===id);INDEX.push({where:docName(docOf(s))+" · "+t(s.title),href:"#/s/"+s.id+"/"+id,head:"🗺️ "+sname(id),txt:sname(id)+" · "+st.phases.join(" · ")+" · "+lineupOf(st).map(x=>PN[x[0]]+" "+x[1]).join(" · ")})})});
  Object.entries(PROFILES).forEach(([w,P])=>INDEX.push({where:t(UI.players),href:"#/p/"+w,head:PN[w]+" · "+t(P.role),txt:[P.nick,t(P.role),t(P.rank)].concat(P.ops[0].map(plain),[plain(P.habit)]).join(" · ")}));
  REVIEWS.forEach(R=>{if(!REV_MD[R.id])return;revSections(R).forEach((S,si)=>{if(/opponents|соперники/i.test(S.h))return;
    const txt=S.blocks.map(b=>b.t==="p"?b.x.join(" "):b.t==="table"?b.body.map(r=>r.join(" ")).join(" · "):b.it?b.it.join(" · "):"").join(" · ").replace(/\*/g,"");
    INDEX.push({where:t(UI.g_rev)+" · "+R.date,href:"#/v/"+R.id+"/"+si,head:revTab(S.h)+" · "+t(R.title),txt})})});
}
function search(q){const r=$("#results"),c=$("#cards");q=q.trim().toLowerCase();if(!q){r.hidden=true;r.innerHTML="";c.hidden=false;return}
  const hits=INDEX.filter(x=>x.txt.toLowerCase().includes(q)||x.head.toLowerCase().includes(q)).slice(0,40);c.hidden=true;r.hidden=false;
  r.innerHTML=`<div class="box"><h3>${t(UI.results)} <span class="tag">${hits.length}</span></h3>`+(hits.length?hits.map(h=>{const p=h.txt.toLowerCase().indexOf(q);const a=Math.max(0,p-40);
    const snip=esc(h.txt.slice(a,a+140)).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),m=>`<mark>${m}</mark>`);
    return `<a class="hit" href="${h.href}"><small>${esc(h.where)}</small><b>${esc(h.head)}</b><span>${a?"…":""}${snip}…</span></a>`}).join(""):`<p class="empty">${t(UI.noresults)}</p>`)+"</div>"}

/* ---------- board ---------- */
const LGI={"👣":"markers/feet-hole.png","👀":"markers/head-hole.png",AJ:"gadgets/airjab-launcher.png",HB:"utility/hard-breach-charge.png","🔥":"gadgets/tactical-crossbow.png",TR:"gadgets/entry-denial-device.png","📷":"utility/bulletproof-camera.png","💨":"utility/smoke-grenade.png",CA:"gadgets/armor-panel.png"};
function legendHTML(){return LEGEND.map(([k,txt,c])=>{let sw;
  if(k==="redwall"||k==="rfi")sw=`<img class="sw" src="img/r6/icons/utility/reinforcement.png" alt="" style="width:22px;height:22px;object-fit:contain;background:#fff;border:1px solid #9ca3af;border-radius:4px">`;
  else if(k==="elec")sw=`<i class="sw" style="background:#facc15;border-radius:50%;width:20px;height:20px;display:grid;place-items:center"><img src="img/r6/icons/gadgets/shock-wire.png" alt="" style="width:14px;height:14px"></i>`;
  else if(k==="defuser")sw=`<img class="sw" src="img/r6/icons/utility/defuser.png" alt="" style="width:22px;height:22px;object-fit:contain;border:2px solid #facc15;border-radius:4px;background:#b45309">`;
  else if(k==="site")sw=`<i class="sw" style="background:#2563eb;color:#fff;font:700 9px/16px sans-serif;padding:0 4px;border-radius:4px">${t(UI.site)}</i>`;
  else if(k==="move")sw=`<i class="sw" style="border-top:3px dashed #7a4fd1;width:24px"></i>`;
  else if(k==="drop")sw=`<img class="sw" src="img/r6/icons/markers/drop.png" alt="" style="width:20px;height:20px;object-fit:contain;background:#fff;border-radius:4px">`;
  else if(k==="hole"||k==="🔄")sw=`<img class="sw" src="img/r6/icons/markers/hole.png" alt="" style="width:26px;height:18px;object-fit:contain;">`;
  else if(k==="floor")sw=`<i class="sw" style="border-top:3px dotted #dc2626;width:24px"></i>`;
  else if(LGI[k])sw=`<img class="sw" src="img/r6/icons/${LGI[k]}" alt="" style="width:22px;height:22px;object-fit:contain;background:#fff;border:2px solid ${c||"#555"};border-radius:5px;padding:1px;box-sizing:border-box">`;
  else if(c)sw=`<i class="sw" style="background:${c};color:#fff;font:700 9px/16px monospace;padding:0 3px;border-radius:4px">${k}</i>`;
  else sw=`<i class="sw" style="font-style:normal">${k}</i>`;
  return `<span>${sw}${esc(t(txt))}</span>`}).join("")}
let allowed=STRATS.map(x=>x.id);
function ui(){
  [["d","stratSelD","rowD"],["a","stratSelA","rowA"]].forEach(([side,id,rw])=>{const ss=document.getElementById(id);ss.innerHTML="";
    const list=allowed.map(id=>STRATS.find(x=>x.id===id)).filter(x=>x&&x.side===side);document.getElementById(rw).hidden=!list.length;
    list.forEach(s=>{const b=document.createElement("button");b.textContent=sname(s.id);b.className=(s===cur?"on ":"")+side;b.onclick=()=>{cur=s;floor=s.floor;phase=1;ui();haptic()};ss.appendChild(b)})});
  $("#rowD .lab").textContent=t(UI.defence);$("#rowA .lab").textContent=t(UI.attack);
  const fs=$("#floorSel");fs.innerHTML="";
  Object.keys(FLOORS).forEach(f=>{if(!cur.items.some(i=>i.f===f))return;const b=document.createElement("button");b.textContent=t(UI.floors[f]);b.className=f===floor?"on":"";b.onclick=()=>{floor=f;ui();haptic()};fs.appendChild(b)});
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
let lastDoc="";
function route(keepY){
  const h=location.hash.replace(/^#\/?/,"").split("/");const v=$("#view");const k=h[0]||"";
  $("#boardHome").appendChild($("#boardBox"));
  let doc,html;
  if(k==="s"){const s=SECTIONS.find(x=>x.id===h[1]);doc="d:"+(s?docOf(s):"");html=section(h[1])}
  else if(k==="m"||k==="r"||k==="c"){const d=k==="r"?"rules":k==="c"?"calls":h[1];const id=DOCS[d]?DOCS[d].order[0]:null;if(id){location.replace("#/s/"+id);return}html=home("maps");doc="home"}
  else if(k==="v"){doc="v:"+h[1];html=review(h[1],h[2])}
  else if(k==="p"){doc="p:"+h[1];html=profile(h[1],h[2])}
  else if(k==="h"){doc="home";html=home(h[1])}
  else if(k==="fav"||k==="new"||k==="lineups"){doc="home";html=home(k)}
  else {doc="home";html=home("ov")}
  const y=window.scrollY;v.innerHTML=html;
  if(k==="s"){mountBoard(h[2]&&!h[2].startsWith("@")?h[2]:null)}
  const nav=$("#tabs"),navTop=nav?nav.offsetTop:0;
  const target=k==="s"&&h[2]?(h[2].startsWith("@")?document.getElementById(h[2].slice(1)):document.querySelector(".boardh")):null;
  if(keepY===true)window.scrollTo(0,y);
  else if(target)setTimeout(()=>window.scrollTo(0,target.getBoundingClientRect().top+window.scrollY-(nav?nav.offsetHeight:0)-10),30);
  else if(doc===lastDoc&&y>navTop)window.scrollTo(0,navTop);
  else window.scrollTo(0,0);
  lastDoc=doc;
  const q=$("#q");if(q){q.oninput=()=>search(q.value)}
  if(tg&&tg.BackButton){(k===""&&true)?tg.BackButton.hide():tg.BackButton.show()}
}
document.addEventListener("click",e=>{
  const f=e.target.closest("[data-fav]");if(f){e.preventDefault();const k=f.dataset.fav;favs=favs.includes(k)?favs.filter(x=>x!==k):favs.concat(k);store.set("d8fav",favs);
    document.querySelectorAll(`[data-fav="${k}"]`).forEach(b=>{b.textContent=favs.includes(k)?"★":"☆";b.classList.toggle("on",favs.includes(k))});haptic();return}
  const l=e.target.closest("[data-l]");if(l){if(l.dataset.l!==window.LANG){window.LANG=l.dataset.l;store.set("d8lang",window.LANG);applyLang();buildIndex();route(true)}return}
  const ph=e.target.closest("#phaseText li");if(ph){phase=+ph.dataset.ph;ui();return}
  const fig=e.target.closest(".shot[data-img]");if(fig){$("#lbImg").src=fig.dataset.img;$("#lbCap").textContent=fig.dataset.cap||"";$("#lb").hidden=false;return}
  if(e.target.closest("#lb")){$("#lb").hidden=true;return}
});
document.addEventListener("change",e=>{const k=e.target.dataset&&e.target.dataset.k;if(k)store.set(k,e.target.checked)});
$("#topBtn").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
window.addEventListener("scroll",()=>$("#topBtn").classList.toggle("show",window.scrollY>600),{passive:true});
document.getElementById("resetPos").onclick=()=>{Object.keys(pos).filter(k=>k.startsWith(cur.id+"|")).forEach(k=>delete pos[k]);try{localStorage.setItem("d8pos",JSON.stringify(pos))}catch(e){}draw()};
window.addEventListener("hashchange",()=>route());

/* ---------- Telegram ---------- */
if(tg){try{tg.ready();tg.expand();
  if(tg.colorScheme)document.documentElement.dataset.theme=tg.colorScheme;
  const bg=tg.colorScheme==="dark"?"#0f1318":"#eef1f4";
  if(tg.isVersionAtLeast&&tg.isVersionAtLeast("6.1")){try{tg.setHeaderColor(bg);tg.setBackgroundColor(bg)}catch(e){}}
  tg.onEvent&&tg.onEvent("themeChanged",()=>{document.documentElement.dataset.theme=tg.colorScheme});
  tg.BackButton&&tg.BackButton.onClick(()=>history.length>1?history.back():(location.hash="#/"));
  if(tg.CloudStorage&&tg.isVersionAtLeast&&tg.isVersionAtLeast("6.9"))tg.CloudStorage.getItem("d8fav",(err,v)=>{if(!err&&v){try{favs=JSON.parse(v);route(true)}catch(e){}}});
}catch(e){}}
applyLang();buildIndex();route();
