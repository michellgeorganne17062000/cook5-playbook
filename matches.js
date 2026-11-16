/* [COOK5] Playbook — match tracker ("Матчи").
   The team logs every match: map, mode, score, side rounds, per-player K/D and operators,
   plus mistakes, takeaways and goals for the next matches.
   Data lives in localStorage and (Telegram 6.9+) CloudStorage via app.js store.
   Export/import JSON lets one teammate keep the shared log and send it to the others. */

const MKEY="cook5matches",GKEY="cook5goals";
let MATCHES=null,GOALS2=null;
const loadM=()=>MATCHES||(MATCHES=store.get(MKEY,[]));
const loadG=()=>GOALS2||(GOALS2=store.get(GKEY,[]));
const saveM=()=>store.set(MKEY,MATCHES);
const saveG=()=>store.set(GKEY,GOALS2);
const mid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const byDate=(a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id);

const MAPLIST=["Nighthaven Labs","Kafe Dostoyevsky","Calypso Casino","Villa","Lair","Bank","Border","Chalet","Clubhouse","Coastline","Consulate","Emerald Plains","Oregon","Outback","Skyscraper","Theme Park","Kanal","Stadium","House"];
const OPLIST=["Ace","Amaru","Ash","Azami","Bandit","Blackbeard","Blitz","Brava","Buck","Capitão","Castle","Caveira","Clash","Deimos","Denari","Doc","Dokkaebi","Echo","Ela","Fenrir","Finka","Flores","Frost","Fuze","Glaz","Goyo","Gridlock","Grim","Hibana","Iana","IQ","Jackal","Jäger","Kaid","Kali","Kapkan","Lesion","Lion","Maestro","Maverick","Melusi","Mira","Montagne","Mozzie","Mute","Nomad","Nøkk","Oryx","Osa","Pulse","Ram","Rauora","Rook","Sens","Sentry","Skopós","Sledge","Smoke","Solis","Striker","Tachanka","Thatcher","Thermite","Thorn","Thunderbird","Twitch","Valkyrie","Vigil","Wamai","Warden","Ying","Zero","Zofia"];
const MODES={ranked:["Ranked","Рейтинг"],unranked:["Unranked","Нерейтинг"],quick:["Quick Match","Быстрый"]};
const modeL=m=>t(MODES[m]||MODES.unranked);
const kd=k=>{const d=k.d||0;return d?(k.k/d):k.k};

Object.assign(UI,{
  g_games:["Match log","Матчи"],
  g_sub:["results · K/D · goals","результаты · K/D · цели"],
  g_none:["No matches logged yet.","Пока нет ни одной записи."],
  g_add_first:["Log the first match","Добавить первый матч"],
  g_open:["Open the log","Открыть журнал"],
  g_recent:["Latest matches","Последние матчи"],
  g_stats:["Stats","Статистика"],
  g_goals2:["Goals","Цели"],
  g_add:["Add","Добавить"],
  g_new:["New match","Новый матч"],
  g_edit:["Edit","Изменить"],
  g_del:["Delete","Удалить"],
  g_del_q:["Delete this match? The entry cannot be restored.","Удалить этот матч? Запись нельзя будет восстановить."],
  g_save:["Save","Сохранить"],
  g_saved:["Saved","Сохранено"],
  g_err:["Fill in the map and both scores.","Заполните карту и оба счёта."],
  g_import_err:["Could not read the data. Paste an export from a teammate.","Не удалось прочитать данные. Вставьте текст экспорта от товарища."],
  g_import_ok:["Imported","Импортировано"],
  f_date:["Date","Дата"],f_map:["Map","Карта"],f_score:["Score (us : them)","Счёт (мы : они)"],
  f_start:["First side","Первая сторона"],f_none:["—","—"],
  f_rounds:["Rounds by side (optional)","Раунды по сторонам (необязательно)"],
  f_aw:["Attack won","Атака выиграно"],f_al:["Attack lost","Атака проиграно"],
  f_dw:["Defence won","Защита выиграно"],f_dl:["Defence lost","Защита проиграно"],
  f_players:["Line-up and K/D","Состав и K/D"],
  f_op:["Operator","Оперативник"],f_mist:["Mistakes","Ошибки"],
  f_mist_ph:["What went wrong: lost opening duels, no trades, late-round throws…","Что пошло не так: проигранные первые дуэли, нет разменов, концовки…"],
  f_take:["Takeaways","Выводы"],
  f_take_ph:["What we do differently next time…","Что делаем иначе в следующий раз…"],
  f_goals:["Goals for the next matches","Цели на следующие матчи"],
  f_goals_ph:["e.g. plant by 0:45, no first-angle peeks before info…","напр. плент до 0:45, не пикать первый угол без инфы…"],
  s_games:["games","игр"],s_win:["win rate","побед"],
  s_rounds:["rounds","раунды"],s_att:["attack rounds","раунды атаки"],s_def:["defence rounds","раунды защиты"],
  s_map:["By map","По картам"],s_pl:["By player","По игрокам"],
  s_ops:["Operators","Оперативники"],s_wr:["Win %","% побед"],
  gl_open:["Open goals","Активные цели"],gl_add:["Add a goal","Добавить цель"],
  gl_ph:["What are we working on?","Над чем работаем?"],
  gl_done:["Done","Выполнено"],gl_none:["No active goals. Add one above.","Активных целей нет. Добавьте выше."],
  gl_from:["Goals from recent matches","Цели из последних матчей"],
  io_t:["Share the log (export / import)","Передать журнал (экспорт / импорт)"],
  io_note:["The log lives on this device. To share it: tap Export, copy the text and send it to the team chat — teammates paste it here and tap Import. New entries merge with existing ones.","Журнал хранится на этом устройстве. Чтобы поделиться: нажмите «Экспорт», скопируйте текст и отправьте в чат команды — остальные вставят его здесь и нажмут «Импорт». Новые записи объединятся с имеющимися."],
  io_exp:["Export","Экспорт"],io_imp:["Import","Импорт"]
});

/* ---------- aggregation ---------- */
function matchAgg(){
  const ms=loadM();
  const o={g:ms.length,w:0,l:0,rw:0,rl:0,aw:0,al:0,dw:0,dl:0,side:0,maps:{},pl:{}};
  WHO.forEach(w=>o.pl[w]={g:0,k:0,d:0,ops:{}});
  ms.forEach(m=>{
    const win=m.us>m.them;win?o.w++:o.l++;o.rw+=m.us;o.rl+=m.them;
    if(m.aw!=null){o.aw+=m.aw;o.al+=m.al;o.dw+=m.dw;o.dl+=m.dl;o.side++}
    (o.maps[m.map]||(o.maps[m.map]={g:0,w:0,l:0,rw:0,rl:0}));const mp=o.maps[m.map];
    mp.g++;win?mp.w++:mp.l++;mp.rw+=m.us;mp.rl+=m.them;
    WHO.forEach(w=>{const p=m.players&&m.players[w];if(!p||!p.on)return;const q=o.pl[w];
      q.g++;q.k+=p.k||0;q.d+=p.d||0;if(p.op)q.ops[p.op]=(q.ops[p.op]||0)+1});
  });
  return o;
}
const pct=(w,t)=>t?Math.round(100*w/t):0;
const topOps=(ops,n)=>Object.entries(ops).sort((a,b)=>b[1]-a[1]).slice(0,n||2).map(x=>`${esc(x[0])} ×${x[1]}`).join(" · ");

/* ---------- views ---------- */
function matchRow(m){
  const win=m.us>m.them;
  const who=WHO.filter(w=>m.players&&m.players[w]&&m.players[w].on);
  return `<a class="row" href="#/g/m/${m.id}"><span class="num" style="width:3.2em">${m.date.slice(8,10)}.${m.date.slice(5,7)}</span>
   <span class="tx"><b>${esc(m.map)} <span class="${win?"good":"bad"}">${m.us}:${m.them}</span></b>
   <small>${modeL(m.mode)}${who.length&&who.length<5?" · "+who.map(w=>PN[w]).join(", "):""}</small></span>
   <span class="tag ${win?"good":"bad"}">${win?(RU()?"В":"W"):(RU()?"П":"L")}</span><span class="go">›</span></a>`}
function matchHome(){
  const ms=loadM().slice().sort(byDate),A=matchAgg();
  if(!ms.length)return `<div class="box" style="text-align:center"><p class="empty">${t(UI.g_none)}</p><p style="justify-self:center"><a class="btn primary" href="#/g/add">＋ ${t(UI.g_add_first)}</a></p></div>`;
  return `${kpiTiles([[String(A.g),UI.s_games],[`${A.w}–${A.l}`,["W–L","В–П"],A.g?pct(A.w,A.g):0,A.w>=A.l?"good":"bad"],[`${pct(A.w,A.g)}%`,UI.s_win],[`${A.rw}–${A.rl}`,UI.s_rounds]])}
  <div class="box"><h3>${t(UI.g_recent)}</h3><div class="rows">${ms.slice(0,3).map(matchRow).join("")}</div>
   <p style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn" href="#/g">${t(UI.g_open)} ›</a><a class="btn" href="#/g/add">＋ ${t(UI.g_new)}</a></p></div>
  ${goalsPrev()}`}
function goalsPrev(){
  const g=loadG().filter(x=>!x.done);
  if(!g.length)return "";
  return `<div class="box a"><h3>🎯 ${t(UI.gl_open)}</h3><ul class="tight">${g.slice(0,3).map(x=>`<li>${esc(x.txt)}</li>`).join("")}</ul><p><a class="btn" href="#/g/goals">${t(UI.g_goals2)} ›</a></p></div>`}

function matchLog(){
  const ms=loadM().slice().sort(byDate);
  return `${ms.length?`<div class="box"><div class="rows">${ms.map(matchRow).join("")}</div></div>`:`<div class="box"><p class="empty">${t(UI.g_none)}</p></div>`}
  <p><a class="btn primary" href="#/g/add">＋ ${t(UI.g_new)}</a></p>
  <details class="box"><summary><h3>${t(UI.io_t)}</h3></summary>
   <p class="note">${t(UI.io_note)}</p>
   <textarea id="m-io" rows="5" style="width:100%;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font:500 .8rem/1.4 var(--mono);color:inherit;outline:0" placeholder="…"></textarea>
   <p style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><button class="btn primary" data-mexp style="border:0;cursor:pointer">${t(UI.io_exp)}</button><button class="btn" data-mimp style="border:0;cursor:pointer">${t(UI.io_imp)}</button><span class="note" id="m-io-msg"></span></p></details>`}

function matchStats(){
  const A=matchAgg();if(!A.g)return `<div class="box"><p class="empty">${t(UI.g_none)}</p></div>`;
  const maps=Object.entries(A.maps).sort((a,b)=>b[1].g-a[1].g);
  const pls=WHO.map(w=>[w,A.pl[w]]).filter(x=>x[1].g>0);
  return `${kpiTiles([[String(A.g),UI.s_games],[`${A.w}–${A.l}`,"W–L",pct(A.w,A.g),A.w>=A.l?"good":"bad"],[`${pct(A.w,A.g)}%`,UI.s_win],[`${A.rw}–${A.rl}`,UI.s_rounds]])}
  ${A.side?`${kpiTiles([[`${A.aw}–${A.al}`,UI.s_att,pct(A.aw,A.aw+A.al),"a"],[`${A.dw}–${A.dl}`,UI.s_def,pct(A.dw,A.dw+A.dl),"d"]])}`:""}
  <div class="box"><h3>${t(UI.s_map)}</h3><div class="tw"><table><thead><tr><th>${t(UI.f_map)}</th><th>${t(UI.s_games)}</th><th>W–L</th><th>${t(UI.s_wr)}</th><th>${t(UI.s_rounds)}</th></tr></thead><tbody>
   ${maps.map(([n,m])=>`<tr><td><b>${esc(n)}</b></td><td>${m.g}</td><td class="${m.w>=m.l?"good":"bad"}">${m.w}–${m.l}</td><td>${pct(m.w,m.g)}%</td><td>${m.rw}–${m.rl}</td></tr>`).join("")}</tbody></table></div></div>
  ${pls.length?`<div class="box"><h3>${t(UI.s_pl)}</h3><div class="tw wide"><table><thead><tr><th>${RU()?"Игрок":"Player"}</th><th>${t(UI.s_games)}</th><th>K–D</th><th>K/D</th><th>${t(UI.s_ops)}</th></tr></thead><tbody>
   ${pls.map(([w,p])=>{const r=kd(p);return `<tr><td><span class="p ${w}">${PN[w]}</span></td><td>${p.g}</td><td>${p.k}–${p.d}</td><td class="${r>=1?"good":"bad"}"><b>${r.toFixed(2)}</b></td><td>${topOps(p.ops)||"—"}</td></tr>`}).join("")}</tbody></table></div></div>`:""}`}

function matchGoals(){
  const g=loadG(),open=g.filter(x=>!x.done),done=g.filter(x=>x.done);
  const fromM=loadM().slice().sort(byDate).filter(m=>m.goals).slice(0,5);
  return `<div class="box"><h3>${t(UI.gl_add)}</h3>
   <p style="display:flex;gap:8px"><input type="text" id="g-new" placeholder="${esc(t(UI.gl_ph))}" style="flex:1;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font:inherit;color:inherit;outline:0;min-width:0"><button class="btn primary" data-gadd style="border:0;cursor:pointer;flex:none">＋</button></p></div>
  <div class="box a"><h3>🎯 ${t(UI.gl_open)}</h3>${open.length?`<div class="chk">${open.map(x=>`<label><input type="checkbox" data-gchk="${x.id}"><span>${esc(x.txt)}</span><button class="btn" data-gdel="${x.id}" style="border:0;cursor:pointer;margin-left:auto;color:var(--bad)">✕</button></label>`).join("")}</div>`:`<p class="note">${t(UI.gl_none)}</p>`}</div>
  ${done.length?`<div class="box"><h3>${t(UI.gl_done)}</h3><div class="chk">${done.map(x=>`<label><input type="checkbox" data-gchk="${x.id}" checked><span style="text-decoration:line-through;color:var(--muted)">${esc(x.txt)}</span></label>`).join("")}</div></div>`:""}
  ${fromM.length?`<div class="box"><h3>${t(UI.gl_from)}</h3>${fromM.map(m=>`<p class="quote" style="margin-bottom:8px"><a class="btn" style="text-transform:none;font:inherit" href="#/g/m/${m.id}">${esc(m.map)} ${m.us}:${m.them} · ${m.date.slice(8,10)}.${m.date.slice(5,7)}</a><br>${esc(m.goals)}</p>`).join("")}</div>`:""}`}

function matchDetail(id){
  const m=loadM().find(x=>x.id===id);if(!m)return matchLog();
  const win=m.us>m.them;
  const pls=WHO.filter(w=>m.players&&m.players[w]&&m.players[w].on);
  const side=(m.aw!=null&&(m.aw+m.al+m.dw+m.dl)>0);
  return `<div class="head"><h2>${esc(m.map)}</h2><span class="tag ${win?"good":"bad"}">${win?(RU()?"Победа":"Win"):(RU()?"Поражение":"Loss")}</span><span class="tag">${modeL(m.mode)}</span><span class="tag">${m.date.split("-").reverse().join(".")}</span></div>
  <div class="box" style="justify-items:center;padding:18px"><span class="gv" style="font-size:2.6rem">${m.us} : ${m.them}</span>${m.side?`<span class="note">${t(UI.f_start)}: ${sideL(m.side)}</span>`:""}</div>
  ${side?`<div class="grid2"><div class="box a"><h3><span class="tag a">${t(UI.attack)}</span></h3><span class="gv ${m.aw>=m.al?"good":"bad"}">${m.aw}–${m.al}</span></div><div class="box d"><h3><span class="tag d">${t(UI.defence)}</span></h3><span class="gv ${m.dw>=m.dl?"good":"bad"}">${m.dw}–${m.dl}</span></div></div>`:""}
  ${pls.length?`<div class="box"><h3>${t(UI.f_players)}</h3><div class="tw"><table><thead><tr><th>${RU()?"Игрок":"Player"}</th><th>${t(UI.f_op)}</th><th>K</th><th>D</th><th>K/D</th></tr></thead><tbody>
   ${pls.map(w=>{const p=m.players[w],r=kd(p);return `<tr><td><span class="p ${w}">${PN[w]}</span></td><td>${esc(p.op||"—")}</td><td>${p.k||0}</td><td>${p.d||0}</td><td class="${r>=1?"good":"bad"}"><b>${r.toFixed(2)}</b></td></tr>`}).join("")}</tbody></table></div></div>`:""}
  ${m.mistakes?`<div class="box" style="border-top:3px solid var(--bad)"><h3>${t(UI.f_mist)}</h3><p>${esc(m.mistakes)}</p></div>`:""}
  ${m.takeaways?`<div class="box acc"><h3>${t(UI.f_take)}</h3><p>${esc(m.takeaways)}</p></div>`:""}
  ${m.goals?`<div class="box a"><h3>🎯 ${t(UI.f_goals)}</h3><p>${esc(m.goals)}</p></div>`:""}
  <p style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn" href="#/g/edit/${m.id}">${t(UI.g_edit)}</a><button class="btn" data-mdel="${m.id}" style="border:0;cursor:pointer;color:var(--bad)">${t(UI.g_del)}</button></p>`}

/* ---------- form ---------- */
function matchForm(id){
  const m=id?loadM().find(x=>x.id===id):null;
  const today=new Date().toISOString().slice(0,10);
  const v=(k,d)=>m?(m[k]!=null?m[k]:d):d;
  const P=w=>(m&&m.players&&m.players[w])||{on:true,op:"",k:"",d:""};
  const seg=(grp,opts,cur)=>`<div class="seg" data-mgrp="${grp}">${opts.map(([val,lab,cls])=>`<button type="button" data-mseg="${val}" class="${val===cur?"on ":""}${cls||""}">${lab}</button>`).join("")}</div>`;
  return `<form id="mform" data-eid="${id||""}" style="display:grid;gap:14px" onsubmit="return false">
  <div class="box"><h3>${t(UI.g_new)}</h3>
   <div class="frow"><span class="lab">${t(UI.f_date)}</span><input type="date" id="m-date" value="${v("date",today)}"></div>
   <div class="frow"><span class="lab">${t(UI.f_map)}</span><input type="text" id="m-map" list="maplist" value="${esc(v("map",""))}" placeholder="Kafe Dostoyevsky"><datalist id="maplist">${MAPLIST.map(x=>`<option value="${x}">`).join("")}</datalist></div>
   <div class="frow"><span class="lab">${t(UI.f_score)}</span><div class="scorein"><input type="number" id="m-us" min="0" max="15" value="${v("us","")}" placeholder="4"><span class="gv" style="font-size:1.3rem">:</span><input type="number" id="m-them" min="0" max="15" value="${v("them","")}" placeholder="2"></div></div>
   <div class="frow"><span class="lab">${t(["Mode","Режим"])}</span>${seg("mode",Object.entries(MODES).map(([k,l])=>[k,t(l)]),v("mode","unranked"))}</div>
   <div class="frow"><span class="lab">${t(UI.f_start)}</span>${seg("side",[["",t(UI.f_none)],["a",t(UI.attack),"a"],["d",t(UI.defence),"d"]],v("side",""))}</div></div>
  <div class="box"><h3>${t(UI.f_rounds)}</h3>
   <div class="grid2"><div class="frow"><span class="lab">${t(UI.f_aw)}</span><input type="number" id="m-aw" min="0" max="12" value="${v("aw","")}"></div>
   <div class="frow"><span class="lab">${t(UI.f_al)}</span><input type="number" id="m-al" min="0" max="12" value="${v("al","")}"></div>
   <div class="frow"><span class="lab">${t(UI.f_dw)}</span><input type="number" id="m-dw" min="0" max="12" value="${v("dw","")}"></div>
   <div class="frow"><span class="lab">${t(UI.f_dl)}</span><input type="number" id="m-dl" min="0" max="12" value="${v("dl","")}"></div></div></div>
  <div class="box"><h3>${t(UI.f_players)}</h3>
   ${WHO.map(w=>{const p=P(w);return `<div class="prow"><label class="pon"><input type="checkbox" id="m-on-${w}" ${p.on?"checked":""}><span class="p ${w}">${PN[w]}</span></label><input type="text" id="m-op-${w}" list="ops" placeholder="${esc(t(UI.f_op))}" value="${esc(p.op||"")}"><input type="number" id="m-k-${w}" min="0" max="40" placeholder="K" value="${p.k===0||p.k?p.k:""}"><input type="number" id="m-d-${w}" min="0" max="40" placeholder="D" value="${p.d===0||p.d?p.d:""}"></div>`}).join("")}
   <datalist id="ops">${OPLIST.map(x=>`<option value="${x}">`).join("")}</datalist></div>
  <div class="box"><h3>${t(UI.f_mist)} · ${t(UI.f_take)} · ${t(UI.g_goals2)}</h3>
   <div class="frow"><span class="lab">${t(UI.f_mist)}</span><textarea id="m-mist" placeholder="${esc(t(UI.f_mist_ph))}">${esc(v("mistakes",""))}</textarea></div>
   <div class="frow"><span class="lab">${t(UI.f_take)}</span><textarea id="m-take" placeholder="${esc(t(UI.f_take_ph))}">${esc(v("takeaways",""))}</textarea></div>
   <div class="frow"><span class="lab">${t(UI.f_goals)}</span><textarea id="m-goals" placeholder="${esc(t(UI.f_goals_ph))}">${esc(v("goals",""))}</textarea></div></div>
  <p class="savebar"><button class="btn primary" data-msave style="border:0;cursor:pointer">${t(UI.g_save)}</button><span class="note" id="m-err" style="color:var(--bad)"></span></p></form>`}

/* ---------- routing glue ---------- */
function matchesRoute(sub,arg){
  const tabs=[["#/g",t(UI.g_games),!sub],["#/g/stats",t(UI.g_stats),sub==="stats"],["#/g/goals",t(UI.g_goals2),sub==="goals"],["#/g/add","＋ "+t(UI.g_add),sub==="add"]];
  let body;
  if(sub==="stats")body=matchStats();
  else if(sub==="goals")body=matchGoals();
  else if(sub==="add")body=matchForm();
  else if(sub==="edit")body=matchForm(arg);
  else if(sub==="m")body=matchDetail(arg);
  else body=matchLog();
  return page({crumb:["#/","[COOK5]",""],h1:RU()?"Учёт <b>матчей</b>":"Match <b>tracker</b>",
    sub:t(["results, K/D, mistakes and goals — entered by the team","результаты, K/D, ошибки и цели — вносит команда"]),tabs,body});
}

/* ---------- events (delegated; app.js store/route are used at call time) ---------- */
document.addEventListener("click",e=>{
  const sg=e.target.closest("[data-mseg]");
  if(sg){e.preventDefault();const g=sg.closest("[data-mgrp]");g.querySelectorAll("button").forEach(b=>b.classList.remove("on","a","d"));
    sg.classList.add("on");if(sg.dataset.mseg==="a")sg.classList.add("a");if(sg.dataset.mseg==="d")sg.classList.add("d");haptic();return}
  const sv=e.target.closest("[data-msave]");
  if(sv){e.preventDefault();
    const val=id=>{const x=document.getElementById(id);return x?x.value.trim():""};
    const num=id=>{const v=val(id);return v===""?null:Math.max(0,+v||0)};
    const map=val("m-map"),us=num("m-us"),them=num("m-them");
    const err=document.getElementById("m-err");
    if(!map||us==null||them==null){if(err)err.textContent=t(UI.g_err);return}
    const players={};WHO.forEach(w=>{const on=!!document.getElementById("m-on-"+w).checked;
      players[w]={on,op:val("m-op-"+w),k:num("m-k-"+w)||0,d:num("m-d-"+w)||0}});
    const f=document.getElementById("mform");const eid=f.dataset.eid;
    const side=f.querySelector('[data-mgrp="side"] .on');
    const mode=f.querySelector('[data-mgrp="mode"] .on');
    const rec={date:val("m-date")||new Date().toISOString().slice(0,10),map,mode:mode?mode.dataset.mseg:"unranked",
      side:side?side.dataset.mseg:"",us,them,aw:num("m-aw"),al:num("m-al"),dw:num("m-dw"),dl:num("m-dl"),
      players,mistakes:val("m-mist"),takeaways:val("m-take"),goals:val("m-goals")};
    loadM();
    if(eid){const i=MATCHES.findIndex(x=>x.id===eid);if(i>-1)MATCHES[i]=Object.assign({id:eid},rec)}
    else MATCHES.push(Object.assign({id:mid()},rec));
    saveM();haptic();location.hash="#/g";return}
  const del=e.target.closest("[data-mdel]");
  if(del){e.preventDefault();if(!confirm(t(UI.g_del_q)))return;
    loadM();MATCHES=MATCHES.filter(x=>x.id!==del.dataset.mdel);saveM();haptic();location.hash="#/g";return}
  const exp=e.target.closest("[data-mexp]");
  if(exp){e.preventDefault();const io=document.getElementById("m-io");
    io.value=JSON.stringify({matches:loadM(),goals:loadG()});io.select();
    try{navigator.clipboard.writeText(io.value).catch(()=>{})}catch(x){}
    document.getElementById("m-io-msg").textContent=t(UI.g_saved)+" ✓";return}
  const imp=e.target.closest("[data-mimp]");
  if(imp){e.preventDefault();const io=document.getElementById("m-io"),msg=document.getElementById("m-io-msg");
    try{const d=JSON.parse(io.value);const ms=d.matches||(Array.isArray(d)?d:null);if(!ms)throw 0;
      loadM();loadG();let n=0;
      ms.forEach(m=>{if(m&&m.id&&m.map&&!MATCHES.some(x=>x.id===m.id)){MATCHES.push(m);n++}});
      if(Array.isArray(d.goals))d.goals.forEach(g=>{if(g&&g.id&&!GOALS2.some(x=>x.id===g.id))GOALS2.push(g)});
      saveM();saveG();haptic();route(true);
      const d2=document.querySelector("details.box");if(d2)d2.open=true;
      const m2=document.getElementById("m-io-msg");if(m2){m2.textContent=t(UI.g_import_ok)+": "+n;m2.style.color="var(--good)"}
    }catch(x){msg.textContent=t(UI.g_import_err);msg.style.color="var(--bad)"}
    return}
  const ga=e.target.closest("[data-gadd]");
  if(ga){e.preventDefault();const x=document.getElementById("g-new");const txt=x.value.trim();if(!txt)return;
    loadG();GOALS2.unshift({id:mid(),txt,done:false});saveG();haptic();route(true);return}
  const gd=e.target.closest("[data-gdel]");
  if(gd){e.preventDefault();e.stopPropagation();loadG();GOALS2=GOALS2.filter(x=>x.id!==gd.dataset.gdel);saveG();route(true);return}
});
document.addEventListener("change",e=>{
  const c=e.target.closest("[data-gchk]");
  if(c){loadG();const g=GOALS2.find(x=>x.id===c.dataset.gchk);if(g){g.done=c.checked;saveG();haptic();route(true)}}
});

NEWS.unshift(["17 Nov","17 ноя",["Match tracker: log every match (map, score, K/D, operators), mistakes, takeaways and goals · export/import to share with the team","Учёт матчей: журнал (карта, счёт, K/D, оперативники), ошибки, выводы и цели · экспорт/импорт для обмена с командой"]]);
