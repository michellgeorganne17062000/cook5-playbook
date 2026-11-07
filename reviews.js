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
