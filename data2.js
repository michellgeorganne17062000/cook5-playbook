/* [COOK5] Playbook — rulebook, Kafe, profiles. Every text is [English, Russian]. */
Object.assign(UI,{
  app:["[COOK5] Playbook","[COOK5] Плейбук"],
  sub:["Rulebook · maps · profiles","Правила · карты · профили"],
  g_rules:["Rulebook","Свод правил"], g_maps:["Maps","Карты"], g_prof:["Profiles","Профили"],
  soon:["More maps soon","Скоро новые карты"], soon2:["will be added later","добавим позже"],
  sections_n:["sections","разделов"], points:["points","пунктов"], open_map:["Open map","Открыть карту"],
  p_role:["Role","Роль"], p_rank:["Rank","Ранг"], p_ops:["Operators (rulebook)","Оперативники (свод правил)"],
  p_habit:["Habit to fix","Над чем работать"], p_last:["Last evening · 06.11","Последний вечер · 06.11"],
  p_trend:["K/D by evening","K/D по вечерам"], p_nh:["Nighthaven strats","Страты Nighthaven"], p_kafe:["Kafe defence","Защита Kafe"],
  att_main:["Attack main","Атака: основной"], att_back:["Attack backup","Атака: запасной"], def_main:["Defence main","Защита: основной"], def_back:["Defence backup","Защита: запасной"], stop:["Stop playing","Перестать играть"],
  spot:["Spot","Позиция"], ops:["Ops","Оперативники"], player:["Player","Игрок"], strat:["Strat","Страт"], op:["Op","Опер"]
});
const MAPS=[
 {id:"nh",icon:"🌃",name:"Nighthaven Labs",sub:["4 sites · strat boards","4 точки · страт-борды"],rec:["def 10/16 · att 3/15","защ 10/16 · ат 3/15"]},
 {id:"kafe",icon:"☕",name:"Kafe Dostoyevsky",sub:["4 sites · defence setups","4 точки · сетапы защиты"],rec:["def 6/11 · att 5/13","защ 6/11 · ат 5/13"]}
];
/* tag existing Nighthaven sections */
SECTIONS.forEach(s=>s.map="nh");

const RULES=[
{id:"r-check",group:"rules",icon:"🧾",num:"R1",title:["Evening checklist","Чек-лист на вечер"],blocks:[
 {p:["Read it in the lobby before the first game.","Прочитать в лобби перед первой игрой."]},
 {check:[
  ["Is everyone's connection stable? If not: Quick Match or unranked, no ranked.","У всех стабильное соединение? Если нет — Quick Match или нерейтинг, без рейтинга."],
  ["Maps: pick **Lair** or **Calypso**; ban **Border → Kanal → Villa**. No Nighthaven, Kafe, Bank, Consulate or Chalet in ranked until we've practiced their attack.","Карты: брать **Lair** или **Calypso**; банить **Border → Kanal → Villa**. Не брать в рейтинге Nighthaven, Kafe, Bank, Consulate и Chalet, пока не отработали атаку."],
  ["Ops: @roman no Sledge · @dima Rauora · @nikita Bandit on defence · @sanya Maestro, anchor. Snake round? Say it now so Roman takes Blackbeard.","Оперативники: @roman без Sledge · @dima Rauora · @nikita Bandit в защите · @sanya Maestro, якорь. Раунд на Snake? Скажи сейчас, чтобы Роман взял Blackbeard."],
  ["Attack: Roman or Dima open, partner within 2 s; after the first pick the IGL calls **collapse** or **hold**.","Атака: открывают Роман или Дима, партнёр в пределах 2 с; после первого фрага IGL командует **«сжимаемся»** или **«держим»**."],
  ["Defence: no first-angle peeks; after our first kill, **hold**.","Защита: не выглядывать на первый угол; после нашего первого фрага — **держим**."],
  ["Plant by **0:45**; at 1vX play time or the defuser. **Two ranked losses in a row = we stop.**","Плент до **0:45**; в 1vX играем на время или дефьюзер. **Два поражения в рейтинге подряд = заканчиваем.**"]]}
]},
{id:"r-round",group:"rules",icon:"⚔️",num:"R2",title:["In-round rules","Правила в раунде"],blocks:[
 {h:["Attack","Атака"],side:"a"},
 {steps:[
  ["**First contact = Roman or Dima**, a second player ready to trade. Renat's Snake/Blackbeard plays second. Dima opens only after his utility is out.","**Первый контакт берут Роман или Дима**, второй готов к размену. Snake/Blackbeard Рената идёт вторым. Дима открывает только после утилиты."],
  ["**Trading distance:** the second player can refrag within 2 seconds; roamers keep a partner within one room.","**Дистанция размена:** второй игрок может отомстить за 2 секунды; у роумеров партнёр не дальше одной комнаты."],
  ["**After the first pick** the IGL calls collapse or hold. Nobody takes the next fight alone.","**После первого фрага** IGL командует «сжимаемся» или «держим». Никто не берёт следующий бой в одиночку."],
  ["**Plant by 0:45.** The IGL calls the plant at 1:00 if the site isn't open. At 2v1 or 1v1, play for the plant, not kills.","**Плент до 0:45.** IGL объявляет плент на 1:00, если сайт не открыт. В 2v1 или 1v1 играем на установку, а не на фраги."]]},
 {h:["Defence","Защита"],side:"d"},
 {steps:[
  ["**Opening:** no first-angle peeks before a drone or utility call.","**Начало раунда:** не выглядывать на первый угол без информации с дрона или утилиты."],
  ["**After our first pick: hold.** No re-peeks, roamers fall back toward site, the IGL calls hold.","**После нашего первого фрага — держим.** Не перевыглядывать, роумеры отходят к сайту, IGL командует «держим»."]]},
 {h:["Late round & evening","Конец раунда и вечер"]},
 {steps:[
  ["**Clutch (1v2 or worse):** play for time or the defuser, one fight at a time, don't swing for kills.","**Клатч (1v2 и хуже):** играть на время или дефьюзер, бои по одному, не лезть за фрагами."],
  ["**Overtime:** attack only the one site we practiced for that map, same plant clock.","**Овертайм:** атаковать только отработанный сайт, тот же таймер установки."],
  ["**Stop rule:** after 2 ranked losses in a row, switch to unranked or customs for the rest of the evening.","**Правило остановки:** после 2 поражений в рейтинге подряд — до конца вечера нерейтинг или кастомки."],
  ["**Connection:** no competitive games on an unstable connection. Someone drops in R1–R2 → remake or Quick Match. **Call your utility** — 3 rounds opened with our own team-kill.","**Соединение:** никаких соревновательных игр при нестабильном соединении. Вылет в R1–R2 → пересоздать или Quick Match. **Объявляйте утилиту** — 3 раунда начались с нашего тимкилла."]]},
 {note:["Why: on 06.11 we lost 16 of 29 defence opening duels, 1v2 + 1v3 were 0 of 33, overtime 0–5 over two evenings, and 7 ranked losses in a row cost 121–185 RP each.","Почему: 06.11 мы проиграли 16 из 29 первых дуэлей в защите, 1v2 + 1v3 — 0 из 33, овертаймы 0–5 за два вечера, 7 поражений подряд стоили 121–185 RP каждому."]}
]},
{id:"r-pool",group:"rules",icon:"🗺️",num:"R3",title:["Map pool","Пул карт"],blocks:[
 {p:["All team games 19.10–06.11: 49 games, rounds 146–154, attack 42%, defence 55%. *prov.* = under ~10 rounds.","Все командные игры 19.10–06.11: 49 игр, раунды 146–154, атака 42%, защита 55%. *предв.* = меньше ~10 раундов."]},
 {table:{head:[["Call","Решение"],["Map","Карта"],["W–L","П–П"],["Attack","Атака"],["Defence","Защита"]],rows:[
  [["✅ Pick","✅ Брать"],"Lair","5–2","14/22 (64%)","14/23 (61%)"],
  [["✅ Pick","✅ Брать"],"Calypso","4–1","7/14 (50%)","11/14 (79%)"],
  [["Playable","Можно"],"Clubhouse","2–1",["5/9 prov.","5/9 предв."],["5/9 prov.","5/9 предв."]],
  [["Playable","Можно"],"Coastline","2–1",["7/9 prov.","7/9 предв."],["3/7 prov.","3/7 предв."]],
  [["Playable","Можно"],"Oregon","2–2","5/11 (45%)","8/13 (62%)"],
  [["Playable","Можно"],"Fortress","1–1",["3/7 prov.","3/7 предв."],["4/7 prov.","4/7 предв."]],
  [["🛠 Practice attack","🛠 Отработать атаку"],"Nighthaven","2–4","**3/15 (20%)**","10/16 (63%)"],
  [["🛠 Practice attack","🛠 Отработать атаку"],"Kafe","2–2","5/13 (38%)","6/11 (55%)"],
  [["🛠 Practice attack","🛠 Отработать атаку"],"Bank","0–2",["2/8 prov.","2/8 предв."],["5/9 prov.","5/9 предв."]],
  [["🛠 Practice attack","🛠 Отработать атаку"],"Consulate","0–2",["1/6 prov.","1/6 предв."],["2/5 prov.","2/5 предв."]],
  [["🛠 Practice attack","🛠 Отработать атаку"],"Chalet","0–1",["1/5 prov.","1/5 предв."],["3/4 prov.","3/4 предв."]],
  [["⛔ Ban #1","⛔ Бан №1"],"Border","0–3","2/8","0/6"],
  [["⛔ Ban #2","⛔ Бан №2"],"Kanal","0–3","3/12 (25%)","6/11"],
  [["⛔ Ban #3","⛔ Бан №3"],"Villa","0–2",["3/7 prov.","3/7 предв."],["2/7 prov.","2/7 предв."]]]}},
 {list:[["“Practice” = run that map's attack plan in a custom game before picking it in ranked.","«Отработать» = прогнать план атаки в кастомке, прежде чем брать карту в рейтинге."],["Off-pool one-offs: Outback 4:2 W, Stadium Alpha 2:4 L. Don't pick them.","Разовые игры вне пула: Outback 4:2 П, Stadium Alpha 2:4 П. Не выбирать."],["Lair: defence R7 on 06.11 was a 5–0 flawless with Bandit (Dima) + Castle (Nikita); the OT loss came against a Diamond III.","Lair: R7 в защите 06.11 — чистые 5–0 с Bandit (Дима) + Castle (Никита); поражение в OT — против Diamond III."],["Bank: build one attack plan (one site, fixed lineup) and run it in a custom before the next Bank game.","Bank: составить один план атаки (один сайт, фиксированный состав) и прогнать в кастомке до следующей игры."]]}
]},
{id:"r-ops",group:"rules",icon:"🎭",num:"R4",title:["Operators","Оперативники"],blocks:[
 {p:["Figures are rounds won / played (sessions 30.10–06.11). Full per-player cards are in **Profiles**.","Цифры — раунды выиграно/сыграно (разборы 30.10–06.11). Полные карточки игроков — в **Профилях**."]},
 {table:{head:[["Player","Игрок"],["Attack","Атака"],["Defence","Защита"],["Stop","Не играть"]],rows:[
  ["@dima","Rauora 9/18 · Grim backup",["Kaid / Bandit 9/13 · Thorn","Kaid / Bandit 9/13 · Thorn"],["Grim as default, Wamai","Grim по умолчанию, Wamai"]],
  ["@renat",["Blackbeard 30/61 · Snake situational","Blackbeard 30/61 · Snake ситуативно"],"Azami 14/30 · Denari","Dokkaebi, Sens, Ying"],
  ["@roman",["Glaz 21/43 (watch: 6/17 since 30.10) · Ace","Glaz 21/43 (следить: 6/17 с 30.10) · Ace"],"Wamai 6/12 · Mira 3/3",["**Sledge 5/20**, Osa as default, Goyo","**Sledge 5/20**, Osa по умолчанию, Goyo"]],
  ["@sanya","Fuze 6/9 · Gridlock · Nomad (NH)","**Maestro 7/8** · Castle / Kapkan",["Mute 1/6, Smoke as default","Mute 1/6, Smoke по умолчанию"]],
  ["@nikita",["Ace / Thermite (role) · Kali, Ying","Ace / Thermite (роль) · Kali, Ying"],"**Bandit 7/8** · Fenrir","Thatcher, Montagne, Hibana, Twitch"]]}},
 {list:[["**Kaid + Bandit** when both play: Nikita Bandit, Dima Kaid (Nighthaven 02.11, defence 3/3).","**Kaid + Bandit**, когда играют оба: Никита Bandit, Дима Kaid (Nighthaven 02.11, защита 3/3)."]]},
 {h:["Solid Snake rule (Renat)","Правило Solid Snake (Ренат)"]},
 {list:[["Situational pick for quick rush rounds without long droning. Blackbeard stays default.","Ситуативный пик для быстрых раш-раундов без долгого дронинга. По умолчанию — Blackbeard."],["Job: follow Roman on Blackbeard, call where the enemy is, trade “me → him” or “him → me”.","Задача: идти за Романом на Blackbeard, называть врага, размениваться «я → он» или «он → я»."],["**Call it in the lobby, before operator select**, so Roman takes Blackbeard. Paired only 1 of 7 times on 06.11.","**Объявлять в лобби до выбора оперативников**, чтобы Роман взял Blackbeard. 06.11 связка была 1 раз из 7."],["Keep it rare: **1–2 rounds per match**. Snake banned → Blackbeard.","Брать редко: **1–2 раунда за матч**. Snake в бане → Blackbeard."]]}
]},
{id:"r-sites",group:"rules",icon:"📍",num:"R5",title:["Map line-ups & sites","Расстановки и точки"],blocks:[
 {h:["Nighthaven · defence 10/16","Nighthaven · защита 10/16"],side:"d"},
 {list:[["Fight for **B Tank / basement with Kaid + Bandit** first, then **1F Kitchen**. Don't take 2F CC/Servers until the new setup is settled.","Сначала бороться за **B Tank / подвал с Kaid + Bandit**, затем **1F Kitchen**. 2F CC/Servers не брать, пока не устоится новая расстановка."],["The team's results (30.10) say basement and Kitchen worked, 2F needs fixing — newer than the playbook's 2F-first ranking.","Результаты команды (30.10): подвал и Kitchen сработали, 2F нужно исправлять — это свежее, чем рейтинг плейбука с 2F на первом месте."],["Evidence is thin: the basement win is likely one round (30.10 R2). On 06.11 defence went 1/3 without Kaid + Bandit.","Данных мало: победа в подвале — скорее всего один раунд (30.10 R2). 06.11 без Kaid + Bandit защита — 1/3."],["Kaid / Bandit banned → **Mira on the IT wall**.","Kaid / Bandit в бане → **Mira на стену IT**."]]},
 {h:["Nighthaven · attack 3/15","Nighthaven · атака 3/15"],side:"a"},
 {list:[["Run **one plan only** until attack reaches 50%: the **basement plan**.","Играть **только один план**, пока атака не дойдёт до 50%: **план на подвал**."],["@sanya Nomad (plants) · @roman Solid Snake (Cargo stairs) · @nikita Sledge/Buck (Control floor lines) · @renat Capitão (flames both doors) · @dima Grim (hatches, flank, post-plant).","@sanya Nomad (плент) · @roman Solid Snake (Cargo stairs) · @nikita Sledge/Buck (линии в полу Control) · @renat Capitão (поджигает обе двери) · @dima Grim (люки, фланг, пост-плант)."],["Minimum: Capitão + Sledge/Buck + Nomad. Comms: “lines open” → “flaming” → “dropping / planting”.","Минимум: Capitão + Sledge/Buck + Nomad. Комс: «линии открыты» → «поджигаю» → «прыгаю / ставлю»."]]},
 {h:["Kafe · defence 6/11","Kafe · защита 6/11"],side:"d"},
 {list:[["Site order: 1 Reading/Dining → 2 Mining/Dining → 3 Kitchen → 4 Bar/Cocktail (last).","Порядок точек: 1 Reading/Dining → 2 Mining/Dining → 3 Kitchen → 4 Bar/Cocktail (последняя)."],["Hold 3F ~1:30–2:00, then fall to 2F. Sanya on Maestro matches his best defender (7/8).","Держим 3F ~1:30–2:00, затем на 2F. Саня на Maestro — его лучший защитник (7/8)."]]},
 {h:["Kafe · attack 5/13","Kafe · атака 5/13"],side:"a"},
 {p:["No attack plan yet. Only winning lineup on record: Dima Rauora, Renat Lion, Nikita Ying (3/3 on 02.11, weakest lobby).","Плана атаки пока нет. Единственная выигравшая расстановка: Дима Rauora, Ренат Lion, Никита Ying (3/3 02.11, самое слабое лобби)."]}
]},
{id:"r-bans",group:"rules",icon:"🚫",num:"R6",title:["Bans","Баны"],blocks:[
 {note:["No ban data yet (Tracker doesn't show bans) — everything here is provisional. Log our bans and theirs every game.","Данных о банах нет (Tracker их не показывает) — всё предварительно. Записывайте наши и чужие баны каждую игру."]},
 {table:{head:[["Situation","Ситуация"],["Ban","Бан"],["Why","Почему"]],rows:[
  [["Nighthaven, we defend","Nighthaven, мы в защите"],"Ace / Thermite (Hibana next)",["the map is decided by breaches; our defence is wall denial","карта решается бричами; наша защита — денай стен"]],
  [["Nighthaven, we attack basement","Nighthaven, атакуем подвал"],"Kaid",["hatches open without a fight","люки открываются без боя"]],
  [["Kafe Kitchen, we defend","Kafe Kitchen, мы в защите"],"Ace",["setup relies on jammers on the Prep wall","сетап держится на глушилках на стене Prep"]],
  [["Other maps, we defend","Другие карты, мы в защите"],"Ace",["same logic, untested","та же логика, не проверено"]],
  [["Other maps, we attack","Другие карты, мы в атаке"],"—",["log what kills us","записывать, что нас убивает"]]]}},
 {h:["Never ban these ourselves","Самим никогда не банить"]},
 {table:{head:[["Op","Опер"],["Why","Почему"],["If banned","Если в бане"]],rows:[
  ["Kaid / Bandit",["Nighthaven defence; Nikita Bandit 7/8","защита Nighthaven; Bandit у Никиты 7/8"],["Mira on the IT wall","Mira на стену IT"]],
  ["Capitão",["essential for the basement attack","обязателен для атаки подвала"],["Dima pings the doors with Grim","Дима метит двери Grim'ом"]],
  ["Solid Snake",["often banned early (Renat, not verified)","часто банят рано (Ренат, не проверено)"],"Blackbeard"],
  ["Maestro",["Sanya 7/8","Саня 7/8"],"Castle / Kapkan"]]}}
]},
{id:"r-goals",group:"rules",icon:"📈",num:"R7",title:["Targets","Цели"],blocks:[
 {p:["Latest value from 06.11.","Последнее значение — 06.11."]},
 {table:{head:[["Objective","Цель"],["Latest","Сейчас"],["Target","Нужно"]],rows:[
  [["Attack round win","Победы в раундах атаки"],"34% (10/29)","≥45%"],
  [["Defence rounds where we lose the first duel","Раунды защиты с проигранной первой дуэлью"],"55% (16/29)","≤45%"],
  [["Deaths traded (proxy)","Разменянные смерти (прокси)"],"27%","≥35%"],
  [["5v4 conversion on defence","Реализация 5v4 в защите"],"69% (9/13)","≥80%"],
  [["Clutches won","Выигранные клатчи"],"7% (2/28)","≥15%"],
  [["Overtime games","Игры с овертаймом"],["0–4 (0–5 over two evenings)","0–4 (0–5 за два вечера)"],["win ≥1 of the next 3","выиграть ≥1 из следующих 3"]],
  [["Stop after 2 ranked losses / short-handed rounds","Стоп после 2 поражений / раунды в неполном составе"],["7 in a row / 1 round","7 подряд / 1 раунд"],["always / 0","всегда / 0"]]]}}
]}
];

/* Kafe defence positions: [player, spot, ops] */
const KPOS={
 kr:[["sanya",["Extended Train","Вынесенный Train"],"Melusi / Valkyrie / Maestro"],["nikita",["Site (Reading)","Точка (Reading)"],"Mute / Sentry / Goyo"],["renat",["Bathroom (3F, layer off)","Bathroom (3F, слой)"],"Azami / Mozzie / Warden"],["dima",["Storage / Stacks (3F) — calls the fall-back","Storage / Stacks (3F) — командует отход"],"Smoke / Goyo / Clash"],["roman",["C1 turret (3F Cocktail)","Турель C1 (3F Cocktail)"],"Aruni / Clash / Castle"]],
 km:[["sanya",["Site anchor, Train → Dining","Якорь точки, Train → Dining"],"Kaid / Goyo / Melusi"],["dima",["Reading / lower White","Reading / низ White"],"Fenrir / Melusi / Valkyrie"],["renat",["Bathroom / Piano (3F)","Bathroom / Piano (3F)"],"Azami / Mira / Echo"],["roman",["Close cat / Newbalk (3F)","Close cat / Newbalk (3F)"],"Mozzie / Mute / Vigil"],["nikita",["C1 turret (3F Cocktail)","Турель C1 (3F Cocktail)"],"Aruni / Castle / Ela"]],
 kk:[["renat",["Bakery extended (death spot)","Вынесенный Bakery (смертельная позиция)"],"Aruni / Wamai / Jäger"],["roman",["Prep Room / K1–K2","Prep Room / K1–K2"],"Mute / Clash / Melusi"],["dima",["Central: Coat Check / lower Red / mid site","Центр: Coat Check / низ Red / середина точки"],"Azami / Goyo / Wamai"],["sanya",["Whiskey (1F bar)","Whiskey (бар 1F)"],"Smoke / Goyo / Echo"],["nikita","VIP","Tubarão / Warden / Echo"]],
 kb:[["dima",["Bathroom / Pixel","Bathroom / Pixel"],"Azami / Mira / Echo"],["nikita",["C1 / Cocktail turret","Турель C1 / Cocktail"],"Aruni / Tubarão / Jäger"],["roman",["Bar Freezer (deep)","Bar Freezer (глубоко)"],"Warden / Wamai / Sentry"],["sanya",["Storage (Stacks)","Storage (Stacks)"],"Castle / Maestro / Mute"],["renat",["Free roam: Red Corridor → Reading bunker","Свободный роум: Red Corridor → бункер Reading"],"Valkyrie / Sentry / Mute"]]
};
const KAFE=[
{id:"k-plan",map:"kafe",icon:"🧭",num:"00",title:["Game plan & callouts","План и коллауты"],kind:"",blocks:[
 {kpis:[["6/11",["our defence rounds","наши раунды защиты"]],["5/13",["our attack rounds","наши раунды атаки"]]]},
 {h:["Core idea","Главная идея"]},
 {list:[["Kafe is a **time-waste map**: hold 3F, waste ~1:30–2:00, then fall down (break banisters, drop the Laundry hatch, jump White) and play horizontally on 2F.","Kafe — **карта на время**: держим 3F, тянем ~1:30–2:00, потом спускаемся (ломаем перила, прыгаем в люк Laundry, прыгаем White) и играем горизонтально на 2F."],["Cover the **Wood and White stair flanks** on every site except Kitchen: barbed wire, traps, Valk cams.","Закрываем **фланги Wood и White stairs** на всех точках, кроме Kitchen: колючка, ловушки, камеры Valk."],["Nobody likes window rappels: break the glass (not the barricade) to hear them, C4 the window sill.","Никто не любит раппели у окон: ломаем стекло (не баррикаду), чтобы слышать, C4 на подоконник."],["Roles: @dima flex/IGL calls the fall-back · @renat power spot · @nikita anchor · @roman close fights / vert · @sanya site anchor or traps.","Роли: @dima флекс/IGL командует отход · @renat пауэр-спот · @nikita анкер · @roman ближние бои / вертикаль · @sanya анкер точки или ловушки."]]},
 {h:["Which site to defend","Какую точку защищать"]},
 {table:{head:["#",["Site","Точка"],["Why","Почему"]],rows:[
  ["1","2F Reading / Dining",["attackers must clear all of 3F; no Laundry rotate for them","атаке нужно вычистить весь 3F; нет ротейта Laundry для них"]],
  ["2","2F Mining / Dining",["same theory, top-floor hold not directly above","та же логика, но верх не прямо над точкой"]],
  ["3","1F Kitchen",["all 5 downstairs, extend into Bakery","все 5 внизу, выход в Bakery"]],
  ["4","3F Bar / Cocktail",["weakest: Cigar + Piano take = site take","слабейшая: взяли Cigar + Piano = взяли точку"]]]}},
 {h:["Callouts","Коллауты"]},
 {list:[["**3F:** Red Stairs · Cigar Balcony (Skylight) · Wood Stairs · Cocktail Balcony (Heaven) · Cigar · Bar · Cocktail · Piano · Storage (Stacks / C3) · Bathroom · Bar Freezer · White Corridor · White Stairs","**3F:** Red Stairs · Cigar Balcony (Skylight) · Wood Stairs · Cocktail Balcony (Heaven) · Cigar · Bar · Cocktail · Piano · Storage (Stacks / C3) · Bathroom · Bar Freezer · White Corridor · White Stairs"],["**2F:** Red Stairs · Red Corridor · Mining · Train · Fireplace · Dining · Mining Corridor · Main · Wood Stairs · Pillar · Reading · Reading Corridor · Laundry · White Stairs","**2F:** Red Stairs · Red Corridor · Mining · Train · Fireplace · Dining · Mining Corridor · Main · Wood Stairs · Pillar · Reading · Reading Corridor · Laundry · White Stairs"],["**1F** (old blueprint): Bakery · Small Bakery · Prep · Coat Check · Reception · VIP · Freezer · Whiskey","**1F** (старый чертёж): Bakery · Small Bakery · Prep · Coat Check · Reception · VIP · Freezer · Whiskey"],["**Ticket walls** = Red Stairs ↔ Piano · **90 wall** = Dining corner at Mining/Reading Corridor · **Brown stairs** = Wood Stairs","**Ticket walls** = Red Stairs ↔ Piano · **90 wall** = угол Dining у Mining/Reading Corridor · **Brown stairs** = Wood Stairs"]]},
 {note:["Spawns: River Docks (north), Christmas Market (west), Park (south). Source: pro coach's Kafe defence guide (youtube oTqyiXOBTP0).","Респы: River Docks (север), Christmas Market (запад), Park (юг). Источник: гайд про-тренера по защите Kafe (youtube oTqyiXOBTP0)."]}
]},
{id:"k-read",map:"kafe",icon:"📖",num:"01",title:["Reading / Dining","Reading / Dining"],kind:"2F",blocks:[
 {h:["Defence: 2F Reading / Dining","Защита: 2F Reading / Dining"],tag:["pick #1","выбор №1"],side:"d"},
 {p:["Our default site. Layer off 3F (“Stacks hold”), then fall back to Reading. Attackers must walk into Reading to plant.","Наша основная точка. Слоями держим 3F («Stacks hold»), потом отходим в Reading. Атаке приходится заходить в Reading для планта."]},
 {kpos:"kr"},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**Both Reading walls**: no angles from the Cave window or Pillar","**Обе стены Reading**: нет углов с окна Cave и с Pillar"],["**No Laundry rotate** (they'd use it). High head holes on the default plant instead (stand on the washing machine)","**Без ротейта Laundry** (атака им воспользуется). Вместо этого высокие дыры на дефолт-плант (стоя на стиралке)"],["Feet holes on Reading Corridor; feet holes all through Dining","Дыры под ноги на Reading Corridor; дыры под ноги по всему Dining"],["**Rotate in the 90 wall**: second retake route","**Ротейт в стене 90**: второй маршрут ретейка"],["Train wall + head holes for window jumps; the dividing back wall","Стена Train + дыры на уровне головы на прыжки в окно; задняя разделительная стена"],["Bottom White: one wall, rotate on the left, feet holes by the fallen cabinet","Низ White: одна стена, ротейт слева, дыры под ноги у упавшего шкафа"],["3F: **double Storage (Stacks)**, C1 wall, C4 the Cocktail window sill","3F: **двойная Storage (Stacks)**, стена C1, C4 на подоконник Cocktail"]]}
]},
{id:"k-mine",map:"kafe",icon:"⛏️",num:"02",title:["Mining / Dining","Mining / Dining"],kind:"2F",blocks:[
 {h:["Defence: 2F Mining / Dining","Защита: 2F Mining / Dining"],tag:["pick #2","выбор №2"],side:"d"},
 {p:["Same theory as Reading. Late round fall back to Dining and hold the Mining window with a DMR.","Та же логика, что и Reading. В конце раунда отходим в Dining и держим окно Mining с DMR."]},
 {kpos:"km"},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**Main Train wall** + head holes for the Mining window jump","**Главная стена Train** + дыры на прыжок в окно Mining"],["No rotate on the window side: feet holes only, funnel them through the door","Без ротейта со стороны окна: только дыры под ноги, гоним через дверь"],["Rotate into Dining (connects the sites); head holes in the Fireplace wall","Ротейт в Dining (связывает точки); дыры в стене Fireplace"],["“Snowball” wall · White-side wall: just double reinforce it","Стена «Snowball» · стена со стороны White: просто двойное укрепление"],["Rotate into Reading + feet holes to contest Red Corridor late","Ротейт в Reading + дыры под ноги, чтобы оспаривать Red Corridor поздно"],["3F as on Bar: C1 wall + rotate, break the banister, reinforce the site hatch, both Ticket walls","3F как на Bar: стена C1 + ротейт, сломать перила, укрепить люк точки, обе Ticket walls"]]}
]},
{id:"k-kit",map:"kafe",icon:"🍳",num:"03",title:["Kitchen","Kitchen"],kind:"1F",blocks:[
 {h:["Defence: 1F Kitchen Service / Cooking","Защита: 1F Kitchen Service / Cooking"],tag:["pick #3 · all 5 downstairs","выбор №3 · все 5 внизу"],side:"d"},
 {p:["All five downstairs, extend horizontally into Bakery. **We ban Ace** — the setup lives on jammers on the Prep wall. Room names come from the old 1F blueprint; confirm in game.","Все пятеро внизу, выходим горизонтально в Bakery. **Баним Ace** — сетап держится на глушилках на стене Prep. Названия комнат по старому чертежу 1F; проверить в игре."]},
 {kpos:"kk"},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["Bakery: left wall (no wallbangs into site), rotate on the right","Bakery: левая стена (нет прострелов в точку), ротейт справа"],["Prep Room wall + feet holes; wall to Small Bakery, rotate by the Bakery door (Castle it)","Стена Prep Room + дыры под ноги; стена к Small Bakery, ротейт у двери Bakery (под Castle)"],["Red hall right side · Whiskey rotate · one mid-site pillar wall with head holes","Правая сторона Red hall · ротейт Whiskey · стена-колонна в центре точки с дырами"],["Freezer: **don't double** it; low, high and feet holes; reinforce the Freezer hatch","Freezer: **не двойное**; дыры низко, высоко и под ноги; укрепить люк Freezer"],["Double reinforce Garage · 2F Red Corridor wall toward Cave","Двойная Garage · стена 2F Red Corridor к Cave"]]}
]},
{id:"k-bar",map:"kafe",icon:"🍸",num:"04",title:["Bar / Cocktail","Bar / Cocktail"],kind:"3F",blocks:[
 {h:["Defence: 3F Bar / Cocktail","Защита: 3F Bar / Cocktail"],tag:["last pick","последний выбор"],side:"d"},
 {p:["Weakest site: the normal Cigar + Piano take is basically the whole site take — two steps and they plant.","Слабейшая точка: обычный захват Cigar + Piano — это почти вся точка, два шага и плант."]},
 {kpos:"kb"},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**C1 wall** (Cocktail → Bar): the key wall; rotate next to it","**Стена C1** (Cocktail → Bar): ключевая; ротейт рядом"],["Head holes on the Cocktail side (see the Cigar door and Skylight drop)","Дыры со стороны Cocktail (видно дверь Cigar и прыжок со Skylight)"],["Storage right wall · Piano door left side · one Piano wall with head holes","Правая стена Storage · левая сторона двери Piano · одна стена Piano с дырами"],["Bathroom: with Mira right side + Mira (bunker), without Mira left side","Bathroom: с Mira — правая сторона + Mira (бункер), без Mira — левая"],["**Both Ticket walls** (force a hard breach; Ace open = tell for Pixel)","**Обе Ticket walls** (заставляем хард-брич; открыл Ace = сигнал для Pixel)"],["Spare walls: the 2 Reading walls below for the roamer's bunker","Запасные: 2 стены Reading снизу под бункер роумера"]]},
 {note:["Echo drone spot: on top of the humidor in Cigar. Alternative for the roamer: Mute in Cigar + Castle double on Cigar.","Место дрона Echo: на хьюмидоре в Cigar. Вариант для роумера: Mute в Cigar + двойной Castle на Cigar."]}
]}
];

const PROFILES={
 dima:{nick:"peacedim",alt:"dimadetected",role:["Flex / IGL","Флекс / IGL"],rank:["Gold IV (was Gold II before 06.11)","Gold IV (до 06.11 — Gold II)"],
  ops:[["Rauora 9/18 (50%)",["Grim 14/35 (backup only) · Blitz 6/9 prov.","Grim 14/35 (только запасной) · Blitz 6/9 предв."],"Kaid / Bandit 9/13 (69%)","Thorn 5/12",["Grim as default · Wamai 1/4","Grim по умолчанию · Wamai 1/4"]]],
  habit:["No first contact before your utility is out. Target: first of the team to die ≤20% (14% on 02.11, 22% on 06.11).","Никакого первого контакта, пока не потрачена утилита. Цель: умирать первым ≤20% (14% 02.11, 22% 06.11)."],
  last:[["8","28–49","0.57","5–5","22%"]],trend:[1.21,0.93,1.18,0.76,1.41,0.57]},
 renat:{nick:"rena1ss4nce_",alt:"JohnnyMarlison",role:["Entry / roamer","Энтри / роумер"],rank:["Gold IV (was Gold II before 06.11)","Gold IV (до 06.11 — Gold II)"],
  ops:[["Blackbeard 30/61 (49%)",["Solid Snake 16/32 (situational) · Lion 3/3","Solid Snake 16/32 (ситуативно) · Lion 3/3"],"Azami 14/30 (47%)","Denari 4/7",["Dokkaebi · Sens 0/2 · Ying 0/3","Dokkaebi · Sens 0/2 · Ying 0/3"]]],
  habit:["Snake only 1–2 rounds per match, called in the lobby so Roman takes Blackbeard. You were the bright spot on 06.11 — if you lead openings again, you join the entry pair.","Snake — только 1–2 раунда за матч и объявлять в лобби, чтобы Роман взял Blackbeard. 06.11 ты был лучшим — если снова выиграешь больше всех первых дуэлей, встаёшь в пару открывающих."],
  last:[["8","55–42","1.31","5–2","10%"]],trend:[1.54,1.13,1.24,1.63,0.79,1.31]},
 roman:{nick:"D8_gRom",alt:"D8_Ramirez",role:["Trader / shallow roam","Трейдер / ближний роум"],rank:["Gold III (was Gold I before 06.11)","Gold III (до 06.11 — Gold I)"],
  ops:[[["Glaz 21/43 (49%) — 6/17 since 30.10, watch it","Glaz 21/43 (49%) — с 30.10 6/17, следить"],["Ace 4/5 · Blackbeard in Snake rounds","Ace 4/5 · Blackbeard в раундах Snake"],"Wamai 6/12 (50%)","Mira 3/3",["**Sledge 5/20 (25%)** · Osa as default · Goyo 0/3","**Sledge 5/20 (25%)** · Osa по умолчанию · Goyo 0/3"]]],
  habit:["On defence, no first-angle peek before info: 6 of your 8 first deaths on 06.11 were on defence. On attack you open with Dima.","В защите не выглядывать на первый угол без информации: 6 из 8 первых смертей 06.11 — в защите. В атаке ты открываешь вместе с Димой."],
  last:[["8","32–37","0.86","3–8","22%"]],trend:[1.71,0.93,0.81,0.97,2.18,0.86]},
 nikita:{nick:"D8_Mr.White",alt:"",role:["Hard breach / anchor","Хард-брич / анкер"],rank:["Silver III (was Silver II before 06.11)","Silver III (до 06.11 — Silver II)"],
  ops:[[["Ace / Thermite 6/18 — kept for the role","Ace / Thermite 6/18 — ради роли"],"Kali 4/7 · Ying 3/3","**Bandit 7/8 (88%)**","Fenrir 3/5",["Thatcher 5/14 · Montagne · Hibana + Twitch 0/7 · Kapkan 1/5","Thatcher 5/14 · Montagne · Hibana + Twitch 0/7 · Kapkan 1/5"]]],
  habit:["Your Bandit is our best defender stat — play it every Nighthaven / Lair defence. Call your utility (Villa R1 team-kill).","Твой Bandit — лучшая цифра команды в защите, бери его на каждой защите Nighthaven / Lair. Объявляй утилиту (тимкилл на Villa R1)."],
  last:[["6","32–34","0.94","3–4","11%"]],trend:[1.06,0.97,0.70,1.10,1.00,0.94]},
 sanya:{nick:"D8_StereoSanya",alt:"",role:["Support / anchor / planter","Саппорт / анкер / плантер"],rank:["Copper IV (29.10 baseline)","Copper IV (срез 29.10)"],
  ops:[["Fuze 6/9 prov.",["Gridlock 3/6 · Nomad on the Nighthaven plans","Gridlock 3/6 · Nomad в планах Nighthaven"],"**Maestro 7/8**","Castle 1/1 · Kapkan 1/1",["Mute 1/6 · Smoke as default 5/12","Mute 1/6 · Smoke по умолчанию 5/12"]]],
  habit:["Anchor, not first contact (first to die in 37% of rounds on 02.11). Call your utility (team-killed Renat on Coastline R3).","Анкер, а не первый контакт (умирал первым в 37% раундов 02.11). Объявляй утилиту (тимкилл Рената на Coastline R3)."],
  last:null,lastNote:["Didn't play on 06.11. Baseline 29.10: ranked K/D 0.41, ESR 0.22 — target K/D 0.60, ≤4 deaths per match.","06.11 не играл. Срез 29.10: K/D в рейтинге 0.41, ESR 0.22 — цель K/D 0.60, ≤4 смертей за матч."],trend:null}
};
const EVENINGS=["19.10","23.10","26.10","30.10","02.11","06.11"];
NEWS.unshift(["07 Nov","07 ноя",["[COOK5] Playbook: rulebook (7 sections), Kafe defence for all 4 sites, player profiles","[COOK5] Плейбук: свод правил (7 разделов), защита Kafe на все 4 точки, профили игроков"]]);
SECTIONS.push(...RULES,...KAFE);
