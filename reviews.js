/* [COOK5] Playbook — session reviews (team) and personal review filters.
   Full review texts live in rv-*.js (markdown, EN + RU, copied from the project docs).
   KPI tiles below are copied from each review's executive summary. */
const REV_MD={};
const REVIEWS=[
 {id:"2026-11-20",date:"20.11",kind:"team",title:["Evening 20.11","Вечер 20.11"],
  line:["4–0 · unranked · rounds 18–10 · trades 36%","4–0 · нерейтинг · раунды 18–10 · размены 36%"],
  who:["all five (Theme Park, Border), then Dima, Renat, Roman, Sanya + a random","все пятеро (Theme Park, Border), потом Дима, Ренат, Роман, Саня + рандом"],
  kpis:[["4–0",["games · unranked","игры · нерейтинг"],0,"good"],["64.3%",["rounds 18–10","раунды 18–10"]],["57%",["attack 8/14","атака 8/14"],57,"a"],["71%",["defence 10/14","защита 10/14"],71,"d"]]},
 {id:"2026-11-16",date:"16.11",kind:"team",title:["Evening 16.11","Вечер 16.11"],
  line:["3–4 · ranked · rounds 22–30 · trades 25%","3–4 · рейтинг · раунды 22–30 · размены 25%"],
  who:["Dima, Renat, Roman + 2 randoms every game","Дима, Ренат, Роман + 2 рандома в каждой игре"],
  kpis:[["3–4",["games · ranked","игры · рейтинг"]],["42.3%",["rounds 22–30","раунды 22–30"]],["41%",["attack 9/22","атака 9/22"],41,"a"],["50%",["defence 10/20","защита 10/20"],50,"d"]]},
 {id:"2026-11-10",date:"10.11",kind:"team",title:["Evening 10.11","Вечер 10.11"],
  line:["3–3 · unranked · rounds 18–18 · trades 35%","3–3 · нерейтинг · раунды 18–18 · размены 35%"],
  who:["Dima, Renat, Roman, Sanya (+ randoms; no Nikita)","Дима, Ренат, Роман, Саня (+ рандомы; без Никиты)"],
  kpis:[["3–3",["games · unranked","игры · нерейтинг"]],["50.0%",["rounds 18–18","раунды 18–18"]],["35%",["attack 6/17","атака 6/17"],35,"a"],["63%",["defence 12/19","защита 12/19"],63,"d"]]},
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
 [/summary|выводы/i,["Overview","Обзор"]],[/compared|сравнени/i,["Compare","Сравнение"]],
 [/match review|разбор матчей/i,["Matches","Матчи"]],[/^\d+\.\s*(maps|карты)/i,["Maps","Карты"]],
 [/operator|оператив/i,["Operators","Оперативники"]],[/mistakes|ошибки/i,["Mistakes","Ошибки"]],
 [/recommend|рекоменд/i,["Plan","План"]],[/objectives|цели/i,["Targets","Цели"]],
 [/snake/i,["Snake 9b","Snake 9b"]],[/missing|answers|не хватает|ответы/i,["Missing data","Чего нет"]],
 [/opponents|соперники/i,["Opponents","Соперники"]],[/rulebook|свода правил/i,["Rulebook","Свод правил"]]
];
Object.assign(UI,{
  g_rev:["Reviews","Разборы"], rev_team:["Team evening","Командный вечер"], rev_duo:["Duo","Дуо"],
  rev_src:["Source: project session reviews (Tracker Network data). Opponent ranks and line-ups are in each review's Opponents tab.","Источник: разборы сессий из проекта (данные Tracker Network). Ранги и составы соперников — во вкладке «Соперники» каждого разбора."],
  rev_my:["Personal review","Личный разбор"],
  rev_my_note:["Every line below is taken word for word from the team reviews where you are named. Open the full review for context.","Каждая строка ниже взята дословно из командных разборов, где ты упомянут. Полный разбор — по ссылке."],
  rev_none:["Not named in this review.","В этом разборе не упоминается."],
  rev_open:["Open full review","Открыть полный разбор"],
  rev_trend:["Evenings compared","Сравнение вечеров"],
  overview:["Overview","Обзор"], players:["Players","Игроки"], saved:["Saved","Сохранённое"],
  strats_t:["Strats","Страты"], home:["[COOK5]","[COOK5]"], updated:["updated 21 Nov 2026","обновлено 21 ноября 2026"],
  k_games:["games 19.10–20.11 (66)","игры 19.10–20.11 (66)"], k_att:["attack rounds (87/205)","раунды атаки (87/205)"],
  k_def:["defence rounds (114/201)","раунды защиты (114/201)"], k_last:["last evening, 20.11 (unranked)","последний вечер, 20.11 (нерейтинг)"],
  open_all:["Open","Открыть"], top5:["Top 5 rules","5 главных правил"], go:["Go to","Перейти"]
});
NEWS.unshift(["07 Nov","07 ноя",["New design (same as the HTML playbooks) · Reviews: 30.10, 02.11, 04.11 duo, 06.11 · personal review tab in every profile","Новый дизайн (как в HTML-плейбуках) · Разборы: 30.10, 02.11, дуо 04.11, 06.11 · вкладка «Личный разбор» в каждом профиле"]]);

/* Home screen: 1 primary + 2 secondary goals. Values from the session reviews (team evenings only; the 04.11 duo
   day is not counted). Targets = rulebook R7 (set after 06.11). cur/target are numbers for the bar; dir "max" = keep below. */
const GOALS=[
 {lvl:"primary",title:["Trade or don't fight","Размен — или не воюем"],metric:["Deaths traded (proxy)","Разменянные смерти (прокси)"],
  cur:36,target:35,dir:"min",now:"36%",goal:"≥35%",trend:[["30.10","33%"],["02.11","29%"],["06.11","27%"],["10.11","35%"],["16.11","25%"],["20.11","36%"]],
  why:["20.11: met again, 36% (31 of 86), after 25% on 16.11. It has now been met twice, both in unranked; hold it in a ranked evening too.","20.11: снова выполнено, 36% (31 из 86) после 25% 16.11. Выполнено уже дважды, оба раза в нерейтинге; удержать и в рейтинговом вечере."],
  how:["After the first pick nobody takes the next fight alone: the partner stays within one room (2 s to refrag), the IGL calls **collapse** or **hold**.","После первого фрага никто не берёт следующую дуэль один: напарник в пределах одной комнаты (2 с на размен), IGL зовёт **collapse** или **hold**."],
  src:"2026-11-20"},
 {lvl:"secondary",title:["Attack rounds","Раунды атаки"],metric:["Attack round win","Победы в раундах атаки"],
  cur:57,target:45,dir:"min",now:"57%",goal:"≥45%",trend:[["30.10","38%"],["02.11","50%"],["06.11","34%"],["10.11","35%"],["16.11","41%"],["20.11","57%"]],
  why:["20.11: 8/14, the best attack of the period, and both OT attack rounds won. Unranked, with all five in two games; the test is a ranked evening.","20.11: 8/14 — лучшая атака за период, оба раунда атаки в ОТ выиграны. Нерейтинг, две игры впятером; проверка — рейтинговый вечер."],
  how:["One named attack plan per map, called in the lobby (Calls sheet: Kafe *South Window*, Chalet *Mezz Clear*). Openings go to Renat and Roman (Dima plays second) with a trade partner; plant by **0:45**.","Один названный план атаки на карту, объявляем в лобби (лист коллов: Kafe *South Window*, Chalet *Mezz Clear*). Первый контакт — Ренат и Роман (Дима вторым) с напарником; плент до **0:45**."],
  src:"2026-11-20"},
 {lvl:"secondary",title:["Defence: first duel","Защита: первая дуэль"],metric:["Defence rounds where we lose the first duel","Раунды защиты с проигранной первой дуэлью"],
  cur:57,target:45,dir:"max",now:"57%",goal:"≤45%",trend:[["02.11","45%"],["06.11","55%"],["10.11","47%"],["16.11","50%"],["20.11","57%"]],
  why:["20.11: 8 of 14, the fourth evening in a row above 45%. Dima died first on defence 3 times, Sanya, Roman and Renat once each. When we won the first duel on defence we won all 6 rounds.","20.11: 8 из 14 — четвёртый вечер подряд выше 45%. В защите Дима погибал первым 3 раза, Саня, Роман и Ренат — по разу. Когда в защите выигрывали первую дуэль, выиграли все 6 раундов."],
  how:["No first-angle peeks before drone or utility info; after our first pick, **hold** and fall back to site.","Не пикать первый угол без инфы от дрона или гаджетов; после нашего первого фрага — **hold** и отход на точку."],
  src:"2026-11-20"}
];
/* Sanya did not play on 06.11: his last team evening in the reviews is 02.11 (session review 02.11, per-player table). */
const LAST_SEEN={nikita:{date:"06.11",row:["6","32–34","0.94","3–4","11%"],trend:[1.06,0.97,0.70,1.10,1.00,0.94]}};
Object.assign(UI,{
  goals:["Goals for the next evenings","Цели на ближайшие вечера"], g_primary:["Primary","Главная"], g_secondary:["Secondary","Второстепенная"],
  g_now:["now","сейчас"], g_target:["target","цель"], g_how:["How","Как"],
  g_note:["Team evenings only (the 04.11 duo day is not counted; quick-match warm-ups excluded). Targets = rulebook R7. Plus the standing rule: 2 ranked losses in a row = stop.","Только командные вечера (дуо 04.11 и разминочные quick match не считаются). Цели — свод правил R7. Плюс постоянное правило: 2 поражения в рейтинге подряд = стоп."],
  pl_t:["Players","Игроки"], pl_kd:["K/D","K/D"], pl_open:["openings","первые дуэли"], pl_first:["first to die","умер первым"],
  pl_note:["Last team evening each player played. K/D line = all team evenings 19.10 → 20.11.","Последний командный вечер, который игрок сыграл. Линия K/D — все командные вечера 19.10 → 20.11."]
});

NEWS.unshift(["10 Nov","10 ноя",["Review 10.11: 3–3, defence 63%, trades 35% (goal met) · attack still 35% · player cards and goals updated","Разбор 10.11: 3–3, защита 63%, размены 35% (цель выполнена) · атака всё ещё 35% · карточки игроков и цели обновлены"]]);
NEWS.unshift(["10 Nov","10 ноя",["Opponents tab in every review: ranks, K/D, HS% and first kills of every enemy player, match by match (10.11: Kafe lobby averaged Platinum II)","Вкладка «Соперники» в каждом разборе: ранг, K/D, HS% и первые убийства каждого игрока соперника по матчам (10.11: лобби Kafe — в среднем Platinum II)"]]);
NEWS.unshift(["18 Nov","18 ноя",["Review 16.11: 3–4 in ranked, rounds 22–30 · attack up to 41%, trades down to 25% · Roman 1v4 clutch · opponents averaged Gold V · goals and player cards updated","Разбор 16.11: 3–4 в рейтинге, раунды 22–30 · атака выросла до 41%, размены упали до 25% · клатч Романа 1 на 4 · соперники в среднем Gold V · цели и карточки игроков обновлены"]]);
NEWS.unshift(["21 Nov","21 ноя",["Review 20.11: 4–0 (unranked), rounds 18–10 · best evening of the period · attack 57%, trades 36% (both goals met) · defence openings still the leak","Разбор 20.11: 4–0 (нерейтинг), раунды 18–10 · лучший вечер за период · атака 57%, размены 36% (обе цели выполнены) · начало в защите — по-прежнему дыра"]]);
