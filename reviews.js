/* [COOK5] Playbook — session reviews (team) and personal review filters.
   Full review texts live in rv-*.js (markdown, EN + RU, copied from the project docs).
   KPI tiles below are copied from each review's executive summary. */
const REV_MD={};
const REVIEWS=[
 {id:"2026-11-06",date:"06.11",kind:"team",title:["Evening 06.11","Вечер 06.11"],
  line:["0–8 · ranked 0–7 · rounds 22–36","0–8 · рейтинг 0–7 · раунды 22–36"],
  who:["Dima, Renat, Roman, Nikita (+ randoms)","Дима, Ренат, Роман, Никита (+ рандомы)"],
  kpis:[["0–8",["games · ranked 0–7","игры · рейтинг 0–7"],0,"bad"],["37.9%",["rounds 22–36","раунды 22–36"]],["34%",["attack 10/29","атака 10/29"],34,"a"],["41%",["defence 12/29","защита 12/29"],41,"d"]]},
 {id:"2026-11-04",date:"04.11",kind:"duo",title:["Duo 04.11 · Dima + Renat","Дуо 04.11 · Дима + Ренат"],
  line:["5–5 · 10 ranked games · rounds 31–29","5–5 · 10 рейтинговых игр · раунды 31–29"],
  who:["Dima, Renat + 3 randoms","Дима, Ренат + 3 рандома"],
  kpis:[["5–5",["10 ranked games","10 рейтинговых игр"]],["51.7%",["rounds 31–29","раунды 31–29"]],["50%",["attack 15/30","атака 15/30"],50,"a"],["53%",["defence 16/30","защита 16/30"],53,"d"]]},
 {id:"2026-11-02",date:"02.11",kind:"team",title:["Evening 02.11","Вечер 02.11"],
  line:["4–3 · rounds 24–20 · attack 50%","4–3 · раунды 24–20 · атака 50%"],
  who:["all five (Coastline, Lair) + blocks with randoms","все пятеро (Coastline, Lair) + блоки с рандомами"],
  kpis:[["4–3",["games","игры"],0,"good"],["54.5%",["rounds 24–20","раунды 24–20"]],["50%",["attack 11/22","атака 11/22"],50,"a"],["59%",["defence 13/22","защита 13/22"],59,"d"]]},
 {id:"2026-10-30",date:"30.10",kind:"team",title:["Evening 30.10","Вечер 30.10"],
  line:["4–5 · rounds 22–26 · 8 rounds short-handed","4–5 · раунды 22–26 · 8 раундов в меньшинстве"],
  who:["all five, then randoms for Nikita","все пятеро, потом рандомы вместо Никиты"],
  kpis:[["4–5",["games","игры"]],["45.8%",["rounds 22–26","раунды 22–26"]],["38%",["attack 10/26","атака 10/26"],38,"a"],["55%",["defence 12/22","защита 12/22"],55,"d"]]}
];
/* how each player is named in the review texts (EN / RU, all case forms) */
/* [EN, RU] name patterns; app.js wraps them with letter boundaries (no lookbehind, for older iOS webviews) */
const WHO_RX={
 dima:["Dima|peacedim","Дима|Димы|Диме|Диму|Димой|peacedim"],
 renat:["Renat|rena1ss4nce_","Ренат|Рената|Ренату|Ренатом|Ренате|rena1ss4nce_"],
 roman:["Roman|D8_gRom","Роман|Романа|Роману|Романом|Романе|Рома|Ромы|Роме|Рому|D8_gRom"],
 nikita:["Nikita|D8_Mr\\.White","Никита|Никиты|Никите|Никиту|Никитой|D8_Mr\\.White"],
 sanya:["Sanya|D8_StereoSanya","Саня|Сани|Сане|Саню|Саней|D8_StereoSanya"]
};
/* short tab labels for review sections, matched on the heading text */
const REV_TABS=[
 [/summary|выводы/i,["Overview","Обзор"]],[/compared|сравнение/i,["Compare","Сравнение"]],
 [/match review|разбор матчей/i,["Matches","Матчи"]],[/^\d+\.\s*(maps|карты)/i,["Maps","Карты"]],
 [/operator|оператив/i,["Operators","Оперативники"]],[/mistakes|ошибки/i,["Mistakes","Ошибки"]],
 [/recommend|рекоменд/i,["Plan","План"]],[/objectives|цели/i,["Targets","Цели"]],
 [/snake/i,["Snake 9b","Snake 9b"]],[/missing|answers|не хватает|ответы/i,["Missing data","Чего нет"]],
 [/opponents|соперники/i,["Opponents","Соперники"]]
];
Object.assign(UI,{
  g_rev:["Reviews","Разборы"], rev_team:["Team evening","Командный вечер"], rev_duo:["Duo","Дуо"],
  rev_src:["Source: project session reviews (Tracker Network data). Opponent line-up tables stay in the project docs.","Источник: разборы сессий из проекта (данные Tracker Network). Таблицы составов соперников — в документах проекта."],
  rev_my:["Personal review","Личный разбор"],
  rev_my_note:["Every line below is taken word for word from the team reviews where you are named. Open the full review for context.","Каждая строка ниже взята дословно из командных разборов, где ты упомянут. Полный разбор — по ссылке."],
  rev_none:["Not named in this review.","В этом разборе не упоминается."],
  rev_open:["Open full review","Открыть полный разбор"],
  rev_trend:["Evenings compared","Сравнение вечеров"],
  overview:["Overview","Обзор"], players:["Players","Игроки"], saved:["Saved","Сохранённое"],
  strats_t:["Strats","Страты"], home:["[COOK5]","[COOK5]"], updated:["updated 7 Nov 2026","обновлено 7 ноября 2026"],
  k_games:["games 19.10–06.11 (49)","игры 19.10–06.11 (49)"], k_att:["attack rounds (64/152)","раунды атаки (64/152)"],
  k_def:["defence rounds (82/148)","раунды защиты (82/148)"], k_last:["last evening, 06.11 (ranked 0–7)","последний вечер, 06.11 (рейтинг 0–7)"],
  open_all:["Open","Открыть"], top5:["Top 5 rules","5 главных правил"], go:["Go to","Перейти"]
});
NEWS.unshift(["07 Nov","07 ноя",["New design (same as the HTML playbooks) · Reviews: 30.10, 02.11, 04.11 duo, 06.11 · personal review tab in every profile","Новый дизайн (как в HTML-плейбуках) · Разборы: 30.10, 02.11, дуо 04.11, 06.11 · вкладка «Личный разбор» в каждом профиле"]]);

/* Home screen: 1 primary + 2 secondary goals. Values from the session reviews (team evenings only; the 04.11 duo
   day is not counted). Targets = rulebook R7 (set after 06.11). cur/target are numbers for the bar; dir "max" = keep below. */
const GOALS=[
 {lvl:"primary",title:["Trade or don't fight","Размен — или не воюем"],metric:["Deaths traded (proxy)","Разменянные смерти (прокси)"],
  cur:27,target:35,dir:"min",now:"27%",goal:"≥35%",trend:[["30.10","33%"],["02.11","29%"],["06.11","27%"]],
  why:["Down three evenings in a row. On 06.11 we lost all 16 rounds where one enemy got 3+ kills, and 1v2 / 1v3 went 0 of 33.","Падает третий вечер подряд. 06.11 проиграли все 16 раундов, где один соперник взял 3+, а 1v2 / 1v3 — 0 из 33."],
  how:["After the first pick nobody takes the next fight alone: the partner stays within one room (2 s to refrag), the IGL calls **collapse** or **hold**.","После первого фрага никто не берёт следующую дуэль один: напарник в пределах одной комнаты (2 с на размен), IGL зовёт **collapse** или **hold**."],
  src:"2026-11-06"},
 {lvl:"secondary",title:["Attack rounds","Раунды атаки"],metric:["Attack round win","Победы в раундах атаки"],
  cur:34,target:45,dir:"min",now:"34%",goal:"≥45%",trend:[["30.10","38%"],["02.11","50%"],["06.11","34%"]],
  why:["Attack is the weak side all period: 42% (64/152) against 55% on defence. 5 attack rounds on 06.11 were lost with players alive.","Атака — слабая сторона весь период: 42% (64/152) против 55% в защите. 06.11 пять раундов атаки проиграны с живыми игроками."],
  how:["Openings go to Roman and Dima with a trade partner; plant by **0:45**.","Первый контакт — Роман и Дима с напарником на размен; плент до **0:45**."],
  src:"2026-11-06"},
 {lvl:"secondary",title:["Defence: first duel","Защита: первая дуэль"],metric:["Defence rounds where we lose the first duel","Раунды защиты с проигранной первой дуэлью"],
  cur:55,target:45,dir:"max",now:"55%",goal:"≤45%",trend:[["02.11","45%"],["06.11","55%"]],
  why:["16 of 29 on 06.11, and we won only 3 of those 16 rounds. Roman died first 8 times, 6 of them on defence.","06.11: 16 из 29, и из этих 16 раундов выиграли только 3. Роман погибал первым 8 раз, 6 — в защите."],
  how:["No first-angle peeks before drone or utility info; after our first pick, **hold** and fall back to site.","Не пикать первый угол без инфы от дрона или гаджетов; после нашего первого фрага — **hold** и отход на точку."],
  src:"2026-11-06"}
];
/* Sanya did not play on 06.11: his last team evening in the reviews is 02.11 (session review 02.11, per-player table). */
const LAST_SEEN={sanya:{date:"02.11",row:["4","12–19","0.63","0–3","37%"],trend:[0.65,0.55,0.76,0.42,0.63]}};
Object.assign(UI,{
  goals:["Goals for the next evenings","Цели на ближайшие вечера"], g_primary:["Primary","Главная"], g_secondary:["Secondary","Второстепенная"],
  g_now:["now","сейчас"], g_target:["target","цель"], g_how:["How","Как"],
  g_note:["Team evenings only (the 04.11 duo day is not counted). Targets = rulebook R7. Plus the standing rule: 2 ranked losses in a row = stop.","Только командные вечера (дуо 04.11 не считается). Цели — свод правил R7. Плюс постоянное правило: 2 поражения в рейтинге подряд = стоп."],
  pl_t:["Players","Игроки"], pl_kd:["K/D","K/D"], pl_open:["openings","первые дуэли"], pl_first:["first to die","умер первым"],
  pl_note:["Last team evening each player played. K/D line = all team evenings 19.10 → 06.11.","Последний командный вечер, который игрок сыграл. Линия K/D — все командные вечера 19.10 → 06.11."]
});
