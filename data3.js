/* [COOK5] Playbook — Calypso Casino defence. Every text is [English, Russian].
   Source: Mint's Calypso Casino defence guide (youtube V7GoMe-ZUQ8) + his top-down screenshots for all 4 sites. */
Object.assign(UI,{p_cal:["Calypso defence","Защита Calypso"]});
MAPS.push({id:"cal",icon:"🎰",name:"Calypso Casino",sub:["4 sites · defence setups","4 точки · сетапы защиты"],rec:["def 11/14 · att 7/14","защ 11/14 · ат 7/14"]});

/* Calypso defence positions: [player, spot, ops] — first op = our pick */
Object.assign(KPOS,{
 cb:[["renat",["1 · Extended Yellow side (hallway, no vert)","1 · Вынесенный Yellow (коридор, вертикали нет)"],"Azami / Clash / Warden"],
     ["roman",["2 · Yellow stairs","2 · Yellow stairs"],"Mira / Smoke / Thorn"],
     ["nikita",["3 · Vault wall","3 · Стена Vault"],"Bandit / Kaid / Mira"],
     ["dima",["4 · Green stairs / Break → Weapons","4 · Green stairs / Break → Weapons"],"Kaid / Ela / Denari"],
     ["sanya",["5 · Server","5 · Server"],"Warden / Ela (not Mute)"]],
 cj:[["nikita",["1 · Default wall","1 · Дефолтная стена"],"Bandit / Kaid / Mira"],
     ["renat",["2 · Secret / Supply → lower Aqua","2 · Secret / Supply → низ Aqua"],"Azami / Ela / Clash"],
     ["roman",["3 · Bathroom","3 · Bathroom"],"Mira / Smoke / Tachanka"],
     ["sanya",["4 · Roulette / Poker (eyes on Lobby)","4 · Roulette / Poker (смотрит Lobby)"],"Maestro* / Echo / Valkyrie"],
     ["dima",["5 · Betting side, behind the bar rotate","5 · Сторона Betting, ротейт за баром"],"Thorn / Castle / Ela / Denari / Pulse"]],
 ct:[["roman",["1 · Wine closet / windows","1 · Wine / окна"],"Wamai / Azami / Jäger"],
     ["sanya",["2 · Roulette (Castles, holds Lobby + hatch drop)","2 · Roulette (Castle, держит Lobby и спуск через люк)"],"Castle / Ela / Thorn"],
     ["dima",["3 · Registration hall / Tequila window","3 · Registration hall / окно Tequila"],"Valkyrie / Mira / Pulse"],
     ["nikita",["4 · Janitor stairs","4 · Janitor stairs"],"Warden / Smoke / Mute"],
     ["renat",["5 · Site centre (bridge)","5 · Центр точки (связка)"],"Denari* / Pulse / Kaid"]],
 c2:[["roman",["1 · Aqua side (time waste)","1 · Сторона Aqua (тянет время)"],"Smoke / Tachanka (not Goyo)"],
     ["nikita",["2 · Kitchen (wall denial)","2 · Kitchen (денай стен)"],"Bandit / Kaid / Warden"],
     ["renat",["3 · Barista / Coffee","3 · Barista / Coffee"],"Azami / Clash / Denari"],
     ["dima",["4 · Mez / Lobby side","4 · Mez / сторона Lobby"],"Thorn / Ela / Fenrir"],
     ["sanya",["5 · Pool-table room (bridge)","5 · Комната с бильярдом (связка)"],"Maestro* / trap op"]]
});

const CAL=[
{id:"c-plan",map:"cal",icon:"🧭",num:"00",title:["Game plan & callouts","План и коллауты"],kind:"",blocks:[
 {kpis:[["11/14",["our defence rounds (79%)","наши раунды защиты (79%)"]],["7/14",["our attack rounds","наши раунды атаки"]],["4–1",["games on Calypso","игр на Calypso"]]]},
 {p:["Our **best defence map**. We don't know yet which sites won those rounds, so none of these setups is tested by us. Two rounds on 30.10 were gifted by enemy team-kills. **Log the site of every Calypso defence round.**","Наша **лучшая карта в защите**. Пока неизвестно, на каких точках мы выиграли эти раунды, так что ни один сетап нами ещё не проверен. Два раунда 30.10 подарили тимкиллы соперника. **Записываем точку в каждом раунде защиты на Calypso.**"]},
 {h:["Core idea","Главная идея"]},
 {list:[["**Contest the edges, then layer back.** Waste time in the outer rooms, fall back through rotates and pocket walls. Free space = attackers surround the site.","**Спорим за края, потом слоями отходим.** Тянем время во внешних комнатах, отходим через ротейты и запасные стены. Отдали пространство — атака окружит точку."],
  ["**Fewer angles.** Close what we don't need, so each player has one clear job.","**Меньше углов.** Закрываем лишнее, у каждого одна понятная задача."],
  ["**Rotates connect every site pair** and give a safe retreat without walking through a door they hold.","**Ротейт между точками всегда**, и он же безопасный отход, не через дверь, которую держит атака."],
  ["**One denial player per site** (Smoke / Tachanka / Mira) sits back and stops the default plant.","**Один игрок на денай** на каждой точке (Smoke / Tachanka / Mira) сидит сзади и срывает дефолт-плант."],
  ["**Wall denial pair:** @nikita Bandit (7/8) + @dima Kaid (9/13).","**Пара на денай стен:** @nikita Bandit (7/8) + @dima Kaid (9/13)."]]},
 {h:["Which site to defend","Какую точку защищать"]},
 {table:{head:["#",["Site","Точка"],["Why","Почему"]],rows:[
  ["1",["Basement","Подвал"],["Mint's favourite: all 5 downstairs, spread out; attackers struggle to find vert","Любимая у Mint: все 5 внизу, растягиваемся; атаке трудно найти вертикаль"]],
  ["2","Blackjack / Poker (1F)",["horizontal hold; hard floor, no C4 from below","горизонтальная оборона; пол твёрдый, C4 снизу нет"]],
  ["3","Bar / Betting (1F)",["needs Castle (@sanya); Mint has the least time on it","нужен Castle (@sanya); у Mint меньше всего опыта на ней"]],
  ["4",["2F (top floor)","2F (верхний этаж)"],["Mint: not the best site, some pushes are easy","Mint: не лучшая точка, часть заходов простые"]]]}},
 {note:["Order 2–4 is our inference: Mint only says the third site is undecided.","Порядок 2–4 — наш вывод: Mint говорит лишь, что третья точка под вопросом."]},
 {h:["Bans when we defend","Баны, когда мы в защите"]},
 {list:[["**Ban Ace.** On Blackjack attackers take Ace, lurk up from the basement and open all walls; on Betting a whole reinforcement exists only against an Ace angle.","**Баним Ace.** На Blackjack атака берёт Ace, лезет из подвала и вскрывает все стены; на Betting целое укрепление стоит только против угла с Ace."],
  ["Protect: Kaid / Bandit, Castle (Betting).","Не баним сами: Kaid / Bandit, Castle (Betting)."],
  ["Ace gone → they bring Thermite: Tachanka fire over the Vault wall works against it.","Нет Ace → берут Thermite: огонь Tachanka через стену Vault работает против него."]]},
 {h:["Callouts","Коллауты"]},
 {list:[["**2F:** Pool room (our spawn) · Pool-table room (centre) · Lobby / top Lobby · Barista (Coffee) · Kitchen · Aqua + Aqua stairs · Cigar · Tequila (door, stairs) · Ropes room · Mez (two outside windows) · Bar plant","**2F:** Pool room (наш респ) · комната с бильярдом (центр) · Lobby / верх Lobby · Barista (Coffee) · Kitchen · Aqua + Aqua stairs · Cigar · Tequila (дверь, лестница) · Ropes room · Mez (два внешних окна) · плант у бара"],
  ["**1F:** Secret (= Supply) · Roulette · Bathroom · lower Tequila window · Lobby door · Wine · Bar hallway · Registration hall (Reggie) · Closet · Janitor stairs · Server door","**1F:** Secret (= Supply) · Roulette · Bathroom · нижнее окно Tequila · дверь Lobby · Wine · коридор бара · Registration hall (Reggie) · Closet · Janitor stairs · дверь Server"],
  ["**Basement:** Vault (+ boost) · Server · Yellow (stairs, door, pillar, pipes) · Lockers / Green stairs · Manager · Break · Cash · Weapons · Janitor","**Подвал:** Vault (+ буст) · Server · Yellow (лестница, дверь, колонна, трубы) · Lockers / Green stairs · Manager · Break · Cash · Weapons · Janitor"],
  ["**Spawns:** north spawn (outside the Wine windows) · outside spawn (next to Manager, rappel straight to the wall)","**Респы:** северный (за окнами Wine) · внешний (у Manager, спуск прямо к стене)"]]},
 {shots:[["cal-map-b.jpg",["Basement","Подвал"]],["cal-map-1f.jpg",["1st floor","1-й этаж"]],["cal-map-2f.jpg",["2nd floor","2-й этаж"]]],square:true},
 {note:["Names are the video's; Mint says some aren't official yet — check in game. Source: Mint's Calypso defence guide (youtube V7GoMe-ZUQ8), 20 h of 10-mans, early meta.","Названия из видео; Mint говорит, что часть ещё не официальные — проверить в игре. Источник: гайд Mint по защите Calypso (youtube V7GoMe-ZUQ8), 20 ч 10-манов, ранняя мета."]}
]},
{id:"c-base",map:"cal",icon:"🗄️",num:"01",title:["Basement","Подвал"],kind:"B",blocks:[
 {h:["Defence: Basement","Защита: подвал"],tag:["pick #1 · all 5 downstairs","выбор №1 · все 5 внизу"],side:"d"},
 {p:["Spread out horizontally, help each other, layer back. Attackers split and hit Vault, Yellow and Lockers at once — keep every way in shut as long as possible.","Растягиваемся горизонтально, помогаем друг другу, отходим слоями. Атака делится и давит Vault, Yellow и Lockers одновременно — держим каждый вход закрытым как можно дольше."]},
 {kpos:"cb"},
 {shots:[["cal-b.jpg",["Mint's top-down: all 5 spots","Схема Mint: все 5 позиций"]],["cal-b-p1.jpg",["1 · Yellow side · Renat","1 · Yellow · Renat"]],["cal-b-p2.jpg",["2 · Yellow stairs · Roman","2 · Yellow stairs · Roman"]],["cal-b-p3.jpg",["3 · Vault wall · Nikita","3 · Стена Vault · Nikita"]],["cal-b-p4.jpg",["4 · Green side · Dima","4 · Green · Dima"]],["cal-b-p5.jpg",["5 · Server · Sanya","5 · Server · Sanya"]]]},
 {note:["Layout: 4 Green/Break top-left · 5 Server top-middle · 3 Vault right · 1 Yellow hallway bottom-left · 2 Yellow stairs bottom-middle. Mint's \"6\" on Server is spot 5.","Расположение: 4 Green/Break слева сверху · 5 Server сверху в центре · 3 Vault справа · 1 коридор Yellow слева снизу · 2 Yellow stairs снизу в центре. «6» у Mint на Server — это позиция 5."]},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**Vault walls (2)**: the most important walls → Bandit / Kaid. Shotgun above them, Tachanka fire and C4 over them","**Стены Vault (2)**: самые важные → Bandit / Kaid. Над ними можно стрелять из дробовика, кидать огонь Tachanka и C4"],
  ["**Server walls**: head holes + a rotate into the server-side wall, so Server isn't trapped when they take Vault and hold the boost. Pocket wall to close it later","**Стены Server**: дыры на уровне головы + ротейт в стене со стороны Server, чтобы Server не заперли, когда атака возьмёт Vault и встанет на буст. Запасная стена, чтобы закрыть позже"],
  ["**Yellow wall**: rotate + pocket wall. Stops a smoke-and-plant through the door once Vault and Server fall","**Стена Yellow**: ротейт + запасная стена. Срывает плант под дымом через дверь, когда Vault и Server уже потеряны"],
  ["**Wall between the sites**: rotate on the side safe from Vault, head holes on the other","**Стена между точками**: ротейт со стороны, безопасной от Vault, дыры с другой"],
  ["**Locker wall**: reinforce — opening it is the easiest plant. Head holes on the right: contest the outside walls and the green double door from deep","**Стена Lockers**: укрепить — вскрытая, она даёт самый простой плант. Дыры справа: контролим внешние стены и двойную дверь Green издалека"],
  ["**Manager walls (2)**: outside spawn can breach at once → wall denial. Break / Cash = time waste, not a place to die","**Стены Manager (2)**: с внешнего респа ломают сразу → денай. Break / Cash — тянуть время, а не умирать там"],
  ["**Hatches**: Break and Weapons (stall in Weapons after Break falls)","**Люки**: Break и Weapons (держимся в Weapons, когда Break потерян)"]]},
 {note:["Short a player: close the Yellow wall and drop spot 1. Kaid or Bandit banned: Vault → Mira, Green → Ela / Denari.","Не хватает игрока: закрываем стену Yellow и убираем позицию 1. Забанили Kaid или Bandit: Vault → Mira, Green → Ela / Denari."]}
]},
{id:"c-bj",map:"cal",icon:"🃏",num:"02",title:["Blackjack / Poker","Blackjack / Poker"],kind:"1F",blocks:[
 {h:["Defence: 1F Blackjack / Poker","Защита: 1F Blackjack / Poker"],tag:["pick #2 · horizontal","выбор №2 · горизонталь"],side:"d"},
 {p:["Hard floor, so no C4s from below. Two easy plants once they open up: the default wall and the Lobby bar. Hold horizontally and don't give Secret or the Betting side for free.","Пол твёрдый, C4 снизу нет. Два простых планта, если атака вскроет стены: дефолтная стена и бар в Lobby. Держим горизонтально, не отдаём даром Secret и сторону Betting."]},
 {kpos:"cj"},
 {shots:[["cal-j.jpg",["Mint's top-down: all 5 spots","Схема Mint: все 5 позиций"]],["cal-j-p1.jpg",["1 · Default wall · Nikita","1 · Дефолтная стена · Nikita"]],["cal-j-p2.jpg",["2 · Secret · Renat","2 · Secret · Renat"]],["cal-j-p3.jpg",["3 · Bathroom · Roman","3 · Bathroom · Roman"]],["cal-j-p4.jpg",["4 · Roulette / Poker · Sanya","4 · Roulette / Poker · Sanya"]],["cal-j-p5.jpg",["5 · Betting side · Dima","5 · Сторона Betting · Dima"]]]},
 {note:["Layout: 1 default wall bottom-centre (blackjack room) · 2 Secret left · 3 Bathroom top-middle · 5 Betting side top · 4 Roulette / Poker right (purple table). Spot 5: Mint writes Thorn / Ela / Denari / Pulse, his icons show Castle instead of Pulse.","Расположение: 1 дефолтная стена снизу в центре (комната с блэкджеком) · 2 Secret слева · 3 Bathroom сверху в центре · 5 сторона Betting сверху · 4 Roulette / Poker справа (фиолетовый стол). Позиция 5: Mint пишет Thorn / Ela / Denari / Pulse, а на иконках вместо Pulse — Castle."]},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**Both outside walls** (default wall)","**Обе внешние стены** (дефолтная стена)"],
  ["**Secret / Supply**: rotate + reinforce the other side. Like Ebox on Nighthaven: Grim or nade over the top → step out, step back in","**Secret / Supply**: ротейт + укрепить другую сторону. Как Ebox на Nighthaven: Grim или граната сверху → вышли через ротейт, вернулись"],
  ["**Between the sites**: high holes to C4 the deep bar plant","**Между точками**: высокие дыры, чтобы кинуть C4 на дальний плант у бара"],
  ["**Roulette**: left wall + feet holes onto the Lobby door. Right wall: double reinforce (Mint tests a rotate there)","**Roulette**: левая стена + дыры под ноги на дверь Lobby. Правая стена: укрепить двойной (Mint пробует там ротейт)"],
  ["Barricade the Betting-side door (lurks from the basement) · reinforce Bathroom wall · shotgun the Lobby bar","Баррикада на двери со стороны Betting (заход из подвала) · укрепить стену Bathroom · прострелить бар в Lobby"],
  ["**Cigar hatch** (2F floor) + feet holes on the Aqua stairs","**Люк Cigar** (пол 2F) + дыры под ноги на Aqua stairs"]]},
 {h:["Vert variant (2–3 of us on 2F)","Вертикальный вариант (2–3 человека на 2F)"]},
 {list:[["Castle the outside window (contests Cigar), the Kitchen wall and the Lobby door; open the hatch","Castle на внешнее окно (контроль Cigar), стену Kitchen и дверь Lobby; люк открываем"],
  ["One in Aqua, one on the vert by the Kitchen wall, one on the vert by the Lobby door; other two in site","Один в Aqua, один на вертикали у стены Kitchen, один на вертикали у двери Lobby; двое на точке"],
  ["Shotgun the floor along the bridge and by the Lobby door to see the bar plant","Прострелить пол вдоль моста и у двери Lobby, чтобы видеть плант у бара"]]},
 {note:["* Maestro for @sanya is our idea (his best defender, 7/8), not the video's.","* Maestro для @sanya — наша идея (его лучший защитник, 7/8), не из видео."]}
]},
{id:"c-bet",map:"cal",icon:"🍷",num:"03",title:["Bar / Betting","Bar / Betting"],kind:"1F",blocks:[
 {h:["Defence: 1F Bar / Betting","Защита: 1F Bar / Betting"],tag:["pick #3 · Castle","выбор №3 · Castle"],side:"d"},
 {p:["Horizontal hold built on Castle: we push into Roulette and Bathroom instead of walling them off, and stop every plant from two sides.","Горизонтальная оборона на Castle: заходим в Roulette и Bathroom вместо того, чтобы отгородиться стенами, и срываем каждый плант с двух сторон."]},
 {kpos:"ct"},
 {shots:[["cal-t.jpg",["Mint's top-down: all 5 spots","Схема Mint: все 5 позиций"]],["cal-t-p1.jpg",["1 · Wine · Roman","1 · Wine · Roman"]],["cal-t-p2.jpg",["2 · Roulette · Sanya","2 · Roulette · Sanya"]],["cal-t-p3.jpg",["3 · Registration · Dima","3 · Registration · Dima"]],["cal-t-p4.jpg",["4 · Janitor stairs · Nikita","4 · Janitor stairs · Nikita"]],["cal-t-p5.jpg",["5 · Site centre · Renat","5 · Центр точки · Renat"]]]},
 {note:["Layout: 1 Wine top (windows, north spawn outside) · 4 Janitor stairs top-right · 5 site centre left of the bar · 3 Registration hall left · 2 Roulette bottom-middle. Arrows from 5: drop the hatch and flank. Numbers follow Mint's drawing (his voice-over counts Roulette as 4 and the stairs as 2).","Расположение: 1 Wine сверху (окна, снаружи северный респ) · 4 Janitor stairs справа сверху · 5 центр точки слева от бара · 3 Registration hall слева · 2 Roulette снизу в центре. Стрелки от 5: спуск через люк и фланг. Номера как на схеме Mint (в голосе он называет Roulette четвёртой, а лестницу второй)."]},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**Two Janitor walls**: the most important","**Две стены Janitor**: самые важные"],
  ["**Wine wall** + rotate: hug the windows (north spawn outside), no wallbangs from Janitor","**Стена Wine** + ротейт: стоим у окон (северный респ снаружи), без прострелов из Janitor"],
  ["**Kitchen hatch** (2F, behind the bar) · rotate between the sites (anywhere)","**Люк Kitchen** (2F, за баром) · ротейт между точками (где угодно)"],
  ["**Roulette**: Castle both Lobby doors; feet holes hold Lobby and the hatch drop","**Roulette**: Castle на обе двери Lobby; дыры под ноги держат Lobby и спуск через люк"],
  ["**Bathroom**: reinforce shut; deep angles on the door, deep Tequila, bar plant","**Bathroom**: укрепить; дальние углы на дверь, дальний Tequila, плант у бара"],
  ["**Registration hall**: Castle both, one wall + feet holes","**Registration hall**: Castle на обе, одна стена + дыры под ноги"],
  ["**Green-stairs wall**: reinforce, or an Ace opens a line to the rotate and Closet · barricade the Server door","**Стена к Green stairs**: укрепить, иначе Ace откроет линию на ротейт и Closet · баррикада на двери Server"]]},
 {note:["Janitor stairs can shoot charges off the main breach, so Kaid / Bandit isn't strictly needed. * = our idea, not the video's.","С Janitor stairs можно сбивать заряды с главного пролома, так что Kaid / Bandit не обязательны. * — наша идея, не из видео."]}
]},
{id:"c-2f",map:"cal",icon:"🐠",num:"04",title:["2F (top floor)","2F (верхний этаж)"],kind:"2F",blocks:[
 {h:["Defence: 2F top floor","Защита: 2F, верхний этаж"],tag:["last pick","последний выбор"],side:"d"},
 {p:["Main default is the bar plant. Hold the edges (Aqua, Kitchen, Barista, Lobby side), Smoke stops the plant from Aqua.","Главный дефолт — плант у бара. Держим края (Aqua, Kitchen, Barista, сторона Lobby), Smoke срывает плант из Aqua."]},
 {kpos:"c2"},
 {shots:[["cal-2f.jpg",["Mint's top-down: all 5 spots","Схема Mint: все 5 позиций"]],["cal-2f-p1.jpg",["1 · Aqua · Roman","1 · Aqua · Roman"]],["cal-2f-p2.jpg",["2 · Kitchen · Nikita","2 · Kitchen · Nikita"]],["cal-2f-p3.jpg",["3 · Barista · Renat","3 · Barista · Renat"]],["cal-2f-p4.jpg",["4 · Mez / Lobby · Dima","4 · Mez / Lobby · Dima"]],["cal-2f-p5.jpg",["5 · Pool-table room · Sanya","5 · Бильярдная · Sanya"]]]},
 {note:["Layout: 2 Kitchen top-left · 3 Barista top-middle · 5 pool-table room centre · 1 Aqua bottom-left · 4 Mez / Lobby bottom-right (toward the red staircase).","Расположение: 2 Kitchen слева сверху · 3 Barista сверху в центре · 5 бильярдная в центре · 1 Aqua слева снизу · 4 Mez / Lobby справа снизу (к красной лестнице)."]},
 {h:["Reinforce & holes","Укрепления и дыры"]},
 {list:[["**Pool room → Lobby**: double walls, no extra angles","**Pool room → Lobby**: двойные стены, без лишних углов"],
  ["**Barista**: rotate right, reinforce left (don't double it)","**Barista**: ротейт справа, укрепить слева (не двойную)"],
  ["**Kitchen outside walls**: double reinforce, head holes. Optional pocket wall bar → Kitchen for an easier battery trick (drone hole + Dokkaebi)","**Внешние стены Kitchen**: двойные, дыры на уровне головы. Опционально запасная стена бар → Kitchen для батарейного трюка (дырка для дрона + Dokkaebi)"],
  ["**Between the sites**: rotate right, head holes up top; shotgun the bar so they can't plant behind it","**Между точками**: ротейт справа, дыры сверху; прострелить бар, чтобы за ним не плантили"],
  ["**Aqua**: rotate into the room, reinforce the wall beside it; extension: right wall, rotate left, head holes in the Cigar wall, barbed wire on the Aqua stairs","**Aqua**: ротейт в комнату, укрепить стену рядом; вынос: правая стена, ротейт слева, дыры в стене Cigar, колючка на Aqua stairs"],
  ["Pool wall: head holes across","Стена Pool: дыры на уровне головы насквозь"]]},
 {note:["* Maestro for @sanya is our idea. Roman: not Goyo (0/3).","* Maestro для @sanya — наша идея. Роману: не Goyo (0/3)."]}
]}
];
NEWS.unshift(["07 Nov","07 ноя",["Calypso Casino playbook: defence setups for all 4 sites, Mint's position screenshots for every site","Плейбук Calypso Casino: сетапы защиты на все 4 точки, скриншоты позиций Mint по каждой точке"]]);
SECTIONS.push(...CAL);
