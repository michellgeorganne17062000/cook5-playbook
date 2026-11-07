/* D8 Nighthaven mini app — content. Every text is [English, Russian]; a plain string is the same in both. */
const UI={
  app:["Nighthaven playbook","Плейбук Nighthaven"],
  sub:["D8 · strats, setups, lineups","D8 · страты, сетапы, составы"],
  search:["What are we looking for?","Что ищем?"],
  swipe:["Swipe up to open the sections","Проведите вверх, чтобы открыть разделы"],
  open:["Open sections","Открыть разделы"],
  sections:["Sections","Разделы"], fav:["Favourites","Избранное"], news:["New","Новое"], lineups:["Lineups","Составы"],
  toc:["Contents","Оглавление"], top:["Top","Наверх"], back:["Back","Назад"],
  strats:["strats","страт"], blocks:["blocks","блоков"],
  board:["Strat board","Страт-борд"], defence:["Defence","Защита"], attack:["Attack","Атака"],
  phases:["Phases","Фазы"], legend:["Legend","Легенда"], lineup_d:["Defence lineup","Состав в защите"], lineup_a:["Attack lineup","Состав в атаке"],
  reset:["Reset token positions","Сбросить фишки"], drag:["Drag a player token to adjust. Positions are approximate — check in a custom game.","Фишки игроков можно двигать. Позиции примерные — проверьте в кастомке."],
  nofav:["No favourites yet. Tap ☆ next to a strat or a section to save it here.","Пока пусто. Нажмите ☆ у страта или раздела, чтобы сохранить его сюда."],
  noresults:["Nothing found","Ничего не найдено"], results:["Results","Результаты"],
  enlarge:["Tap to enlarge","Нажмите, чтобы увеличить"], site:["SITE","ТОЧКА"],
  floors:{t:["2F","2Э"],g:["1F","1Э"],b:["Basement","Подвал"]}
};
const LEGEND=[
  ["redwall",["Reinforced wall (hatch = red square)","Укреплённая стена (люк — красный квадрат)"]],
  ["elec",["Electrified (Kaid / Bandit)","Под током (Kaid / Bandit)"]],
  ["🔄",["Rotate hole","Ротейт"]],["👣",["Feet holes","Дыры под ноги"]],["👀",["Head holes","Дыры на уровне головы"]],
  ["AJ",["Nomad Airjab","Эйрджеб Nomad"],"#7c3aed"],["HB",["Hard breach","Хард-брич"],"#dc2626"],["🔥",["Capitão flame","Огонь Capitão"]],
  ["TR",["Traps","Ловушки"],"#a16207"],["📷",["Camera (BP cam)","Камера (BP)"]],["💨",["Smoke grenade","Дымовая граната"]],["CA",["Castle barricade","Баррикада Castle"],"#9a3412"],
  ["defuser",["Plant spot (defuser)","Точка планта (дефузер)"]],["site",["Bomb site","Бомб-точка"]],
  ["move",["Move · dashed = fall-back","Движение · пунктир = отход"]],["floor",["Floor opened (vertical)","Открытый пол (вертикаль)"]]
];
const SHORT={ccA:["Setup A","Сетап A"],ccB:["Setup B","Сетап B"],cA:["Attack A (draft)","Атака A (черновик)"],cA2:["Attack B (video)","Атака B (видео)"],cA3:["Attack C (W7M)","Атака C (W7M)"],
  bD1:["Option 1 · Kaid + Bandit","Вариант 1 · Kaid + Bandit"],bD2:["Option 2 · one banned","Вариант 2 · один в бане"],bD3:["Option 3 · W7M roam","Вариант 3 · роум W7M"],bA:["Basement attack","Атака подвала"],
  sD:["Storage defence","Защита Storage"],sA:["Attack A (draft)","Атака A (черновик)"],sA2:["Attack B (W7M)","Атака B (W7M)"],
  kD:["Kitchen defence","Защита Kitchen"],kA:["Attack A (draft)","Атака A (черновик)"],kA2:["Attack B (video)","Атака B (видео)"],kA3:["Attack C (W7M)","Атака C (W7M)"]};
const PH_RU={
 ccA:["Сетап: укрепления, денай стен IT, каждый на своём слое","~1:30: отход в CC / Servers, карманное укрепление, играем на размены"],
 ccB:["Сетап: удержание Connector «как Elbow», Warden держит дальние углы с кэтвока","Roman отходит и укрепляет запасную стену; Dima перекидывается на кроссы"],
 bD1:["Вариант 1 — атака не забанила Kaid и Bandit: Nikita (Bandit) и Sanya (Kaid) держат внешние стены; Dima держит Vending Stairs; Renat (Solis) играет через дыры в полу Storage; Roman (Fenrir) ставит ловушки на Cargo / fork"],
 bD2:["Вариант 2 — Kaid или Bandit в бане: Nikita берёт оставшегося; Sanya (Mute) глушит стену Animus и дроны; Renat (Warden) держит дыры в полу Storage"],
 bD3:["Вариант 3 (роум W7M 2-2-1): двое на 2Э, двое на 1Э, игрок точки — в Exo. Стена Animus мягкая, обе двери под Castle — килбокс; Castle на окне 90 делит карту","Поздний раунд: Nikita (Warden) стопит плант через дыры в Storage; Roman прыгает в люк на помощь; Sanya откатывается из Exo на точку"],
 sD:["Сетап: верх держим как на CC; Sanya и Roman на точке; вертикаль из Servers на Storage","~1:30: верхние игроки спускаются на 1Э; Renat занимает угол Tetris на окно Storage"],
 kD:["Сетап: Sanya анкер в Kitchen, Nikita держит Break, Roman мобильный в Games; верх держим с Mezz и Connector","Ретейк / поздний раунд: Roman давит по коридору к Cafeteria; Dima помогает вертикалью из Connector"],
 cA:["ЧЕРНОВИК. Контроль карты: Renat и Roman по Warehouse Stairs в Rafters; Nikita и Dima снаружи у стен IT; Sanya ставит эйрджебы на дверь Connector и верх Lobby Stairs","Открытие: Nikita (Ace) открывает обе стены IT; Renat пчёлами чистит IT и коридор CC; Roman (Zofia) — контузии в Servers","Захват IT → Servers: Dima поджигает двери Connector и Ebox против ретейка; Sanya плантит у стены IT","Пост-плант: Nikita и Dima держат из IT, Renat — сторону Rafters / CC, Roman — кэтвок, Sanya — фланг Ebox"],
 sA:["ЧЕРНОВИК. Берём 2Э: Renat и Nikita через Rafters, Roman и Dima на CC / IT; Sanya ставит эйрджебы на низ CC Stairs и коридор Cafeteria на 1Э","Открываем полы: Nikita (Ram) открывает пол Servers над Storage и пол CC над Control; Roman (Dokkaebi) вычисляет защиту; Renat пчёлами через дыры","Захват: Dima сверху поджигает дверь Lounge → Storage и ротейт Control; Sanya и Renat заходят через 1Э Warehouse и плантят в Storage","Держим сверху через дыры; Renat смотрит фланг Warehouse"],
 sA2:["Приманка W7M. Давление, похожее на зачистку верха: Nikita (Hibana) открывает IT, Dima (Ace) — стену garden и нижний garage. Roman и Sanya тихо уходят в подвал; Renat лурчит со стороны Lobby","Защита стекает по Aqua на помощь точке. Roman (Sledge) и Sanya (Blackbeard) поднимаются по Cargo Stairs; Renat давит 90; Dima держит отсечку из западного окна","Через ротейт защиты Cargo → Control; плант в «тук-споте» (обычно без вертикали). Nikita забирает Aqua с дробовиком Hibana","Держим: Sanya — щит за спиной против Clash; Dima и Renat смотрят ротейты; Nikita держит Aqua"],
 kA:["ЧЕРНОВИК. Контроль карты: Renat и Nikita берут Lobby и Mezz на 2Э; Roman поднимается по Vending Stairs из подвала; Sanya ставит эйрджеб в коридор Cafeteria","Открытие: Nikita (Ram) открывает пол Meeting над Cafeteria; Renat пчёлами вниз через дыры; Roman давит Break / Vending","Захват: Dima поджигает двери Pantry и Cafeteria; Sanya плантит у окна кухни","Держим: Nikita и Renat на дырах, Roman на Vending, Dima снаружи у окна кухни"],
 cA2:["Из видео. Контроль с северо-востока: заходим через Meeting Room и верх Lobby Stairs, берём Connector и Electrical. Dima оставляет фланговые дроны у лестниц","Открытие: Nikita (Thermite) открывает стену Servers–Connector, или плантим за Stacks; Roman (Buck) открывает мягкие стены/пол; Sanya дымит два прохода в Servers","Режем ротейт из Rafters: Renat открывает внешнюю стену IT (если денай — открываем снизу с 1Э гранатами); Sanya плантит за Stacks","Пост-плант: Renat и Dima держат брич IT и окно Rafters; Nikita и Roman держат Connector и Electrical"],
 kA2:["Из видео. Берём верх Lobby Stairs и Meeting Room на 2Э; Sanya ждёт снаружи у окна кухни; фланговые дроны у ящиков Warehouse и у Vending","Два софт-бричера (Nikita, Roman) открывают пол Meeting / Meeting Hall над Cafeteria; Renat и Dima чистят и держат через дыры","Sanya открывает окно кухни и плантит у стойки, пока команда держит вертикаль","Пост-плант: держим вертикаль на обе двери Cafeteria и стойку кухни, чтобы никто не дошёл до дефузера"],
 cA3:["Захват через garage, как в разборе W7M. Давление: Nikita (Hibana) открывает стену IT, Dima (Ace) — стену garden; Renat и Sanya запрыгивают в верхний garage (Rafters) через окно; Roman (Buck) идёт снизу по 1Э","Берём верхний garage. Roman стреляет в пол с 1Э под ротейтом garage → точка, чтобы защита не отошла этим путём; Nikita заходит в IT","Берём Aqua и зажимаем точку: Renat и Sanya давят CC Hall / Aqua, Nikita из IT, Dima из Meeting. Плант в CC у твёрдой стены","Пост-плант: Renat на Aqua, Sanya в CC, Nikita и Dima держат IT и Servers"],
 kA3:["Прямой захват Lobby, как в разборе W7M. Dima (Ace) открывает стену garden на 2Э, чтобы никто не помог стороне Meeting; Renat берёт верх Lobby Stairs","Sanya и Roman берут нижний Lobby через окна; Renat флешит (Ying) игрока на Lobby Stairs; чистим Harry Potter","Nikita (Thermite) открывает стену Cafe → Lobby; Sanya плантит в Cafeteria, пока Roman делает вертикаль из Meeting","Держим Lobby, открытую стену и дыры в полу"],
 bA:["Вход: Roman сканирует; Sanya заходит через окно Rafters, эйрджебы на двери IT, Storage и Cargo","Dima открывает оба люка хард-бричем; Nikita режет 3 линии в полу Control; Roman спускается по Cargo Stairs","Дроним место прыжка. Renat поджигает обе двери Tank; Sanya прыгает в люк Animus и плантит в углу","Держим: Renat и Nikita на дырах, Roman на Cargo Stairs, Dima на люке / фланге"]
};

const NEWS=[
 ["30 Oct","30 окт",["Attack C (W7M) on CC and Kitchen; Storage attack B; Basement option 3","Атака C (W7M) на CC и Kitchen; атака B на Storage; вариант 3 в подвале"]],
 ["30 Oct","30 окт",["Bans: double hard-breach ban on defence (Ace + Thermite / Hibana)","Баны: в защите баним двух хард-бричеров (Ace + Thermite / Hibana)"]],
 ["30 Oct","30 окт",["Basement attack: Renat on Capitão, Dima on Grim, Nikita on Sledge / Buck","Атака подвала: Renat на Capitão, Dima на Grim, Nikita на Sledge / Buck"]],
 ["30 Oct","30 окт",["Basement defence options 1 and 2 with electrified walls and new floor holes in Storage","Варианты защиты подвала 1 и 2: стены под током и новые дыры в полу Storage"]],
 ["30 Oct","30 окт",["Community callouts (Tetris, Harry Potter, Mud, 90, Proto)","Коммьюнити-коллауты (Tetris, Harry Potter, Mud, 90, Proto)"]],
 ["29 Oct","29 окт",["First version: Mint setups for all four sites, basement attack, r6tv pro data","Первая версия: сетапы Mint на все четыре точки, атака подвала, про-статистика r6tv"]]
];

/* blocks: h (heading, optional tag), p, list, table, shots, board */
const SECTIONS=[
{id:"plan",icon:"🎯",num:"00",title:["Game plan","Игровой план"],kind:"",
 blocks:[
  {p:["Nighthaven is a weak map for us (44.6% squad aggregate, 0-2 and 3-8 rounds on Oct 23–26), so we play one fixed plan per site. Core idea: **battle for IT**. Keep the outer IT walls shut, buy time in the top-floor rooms for about 1:30, then fall back into site and play for trades.","Nighthaven — слабая карта для нас (44.6% по команде, 0-2 и 3-8 по раундам 23–26 октября), поэтому на каждую точку у нас один фиксированный план. Главная идея — **битва за IT**: держим внешние стены IT закрытыми, около 1:30 тянем время в комнатах верхнего этажа, потом отходим на точку и играем на размены."]},
  {kpis:[["62%",["pro attack round wins after taking the first kill","раундов атака выигрывает у про, взяв первый фраг"]],["22%",["pro attack round wins after dying first","раундов атака выигрывает, если умерла первой"]],["55.3%",["pro defence round win on Nighthaven","про-винрейт защиты на Nighthaven"]],["0.35",["our average ESR, target 0.45","наш средний ESR, цель 0.45"]]]},
  {h:["Who does what","Кто что делает"]},
  {table:{head:[["Player","Игрок"],["Role","Роль"],["Defence job","Задача в защите"]],rows:[
   ["@dima",["Flex / IGL","Флекс / IGL"],["Wall denial, bridge, calls the fall-back","Денай стен, связка, командует отход"]],
   ["@renat",["Entry / roamer","Энтри / роумер"],["Power spot, time waste","Пауэр-спот, тянет время"]],
   ["@roman",["Trader","Трейдер"],["Close fights, vertical holes","Ближние бои, вертикаль"]],
   ["@nikita",["Hard breach / anchor","Хард-брич / анкер"],["Door anchor","Держит дверь"]],
   ["@sanya",["Support / planter","Саппорт / плантер"],["Site anchor or traps","Анкер точки или ловушки"]]]}},
  {h:["Which site to defend","Какую точку защищать"]},
  {table:{head:["#",["Site","Точка"],["Pro def win","Про-винрейт защиты"]],rows:[
   ["1","2F CC / Servers","56.6%"],["2","1F Storage / Control","57.2%"],["3","B Tank / Assembly","53.2%"],["4",["1F Kitchen (3% of pro rounds)","1F Kitchen (3% про-раундов)"],"46.8%"]]}},
  {note:["r6tv, 1,730 pro rounds on Nighthaven.","r6tv, 1 730 про-раундов на Nighthaven."]}
 ]},
{id:"cc",icon:"🖥️",num:"01",title:["CC / Servers","CC / Servers"],kind:"2F",strats:"ccA,ccB,cA,cA2,cA3",
 blocks:[
  {h:["Defence: 2F Command Center / Servers","Защита: 2F Command Center / Servers"],tag:["pick #1 · pro 56.6%","выбор №1 · про 56.6%"],side:"d"},
  {p:["Keep IT shut, buy time in Rafters, Water, Ebox and Garden, then fall into CC/Servers by 1:30.","Держим IT закрытым, тянем время в Rafters, Water, Ebox и Garden, к 1:30 отходим в CC/Servers."]},
  {table:{head:["#",["Spot","Позиция"],["Ops","Оперативники"],["Player","Игрок"]],rows:[
   ["1","Water (CC Stairs)",["Warden / Smoke (Clash last)","Warden / Smoke (Clash — в крайнем случае)"],"@nikita"],
   ["2",["Rafters — power spot","Rafters — пауэр-спот"],"Azami / Ela / Fenrir","@renat"],
   ["3","Ebox (Electrical)","Mute / Warden / Smoke","@roman"],
   ["4",["IT → flex inside","IT → флекс внутри"],"Bandit / Kaid / Mira","@dima"],
   ["5","Garden (Connector)","Tubarão / Wamai / Lesion / Mozzie","@sanya"]]}},
  {note:["Dima on Kaid → Sanya on Tubarão to freeze and claw the IT wall. Otherwise Wamai: pros run him in 70% of CC rounds.","Dima на Kaid → Sanya на Tubarão, чтобы морозить и бить током стену IT. Иначе Wamai: у про он в 70% раундов на CC."]},
  {h:["Reinforce","Укрепления"]},
  {list:[["**2 outer IT walls** — top priority","**2 внешние стены IT** — главный приоритет"],["Rafters: 2 far-left walls, rotate on the right","Rafters: 2 дальние левые стены, ротейт справа"],["Wall by the Rafters rotate + head holes","Стена у ротейта Rafters + дыры на уровне головы"],["Wall facing Ebox (safe rotate)","Стена к Ebox (безопасный ротейт)"],["Water hallway wall + feet holes","Стена коридора Water + дыры под ноги"],["Outside Connector walls; head hole on Meeting hallway","Внешние стены Connector; дыра на коридор Meeting"],["Servers right wall; rotate into Connector","Правая стена Servers; ротейт в Connector"],["**Keep 1 in reserve** for the fall-back wall","**1 укрепление в запасе** под стену отхода"]]},
  {shots:[["cc-p1.jpg",["1 · Water · Nikita","1 · Water · Nikita"]],["cc-p2.jpg",["2 · Rafters · Renat","2 · Rafters · Renat"]],["cc-p3.jpg",["3 · Ebox · Roman","3 · Ebox · Roman"]],["cc-p4.jpg",["4 · IT · Dima","4 · IT · Dima"]],["cc-p5.jpg",["5 · Garden · Sanya","5 · Garden · Sanya"]]]},
  {h:["Setup B — Connector hold","Сетап B — удержание Connector"],tag:["alternate","запасной"],side:"d"},
  {p:["Anchor-heavy variant (Reddit, MisfitMidas). Use it when we defend CC a second time in a half. Weak spot: the CC Stairs side is thin, so Renat must not roam away early.","Анкерный вариант (Reddit, MisfitMidas). Играем, когда защищаем CC второй раз за половину. Слабое место — сторона CC Stairs, поэтому Renat не уходит в роум рано."]},
  {table:{head:[["Spot","Позиция"],["Op","Опер"],["Player","Игрок"],["Job","Задача"]],rows:[
   [["Connector extension","Выход в Connector"],"Smoke","@roman",["Hold behind a shield like Oregon elbow; canisters stall ~45 s; fall back and reinforce","Держит за щитом как Elbow на Oregon; канистры тянут ~45 с; отходит и укрепляет"]],
   ["Electrical","Fenrir / Melusi","@sanya",["Traps on Connector door/wall and the Electrical jump-in","Ловушки на двери/стене Connector и окне Electrical"]],
   ["Servers","Kaid","@dima",["Claws on Connector and IT walls; cams; flex to crossfires","Когти на стенах Connector и IT; камеры; флекс на кроссы"]],
   [["Catwalk (Rafters side)","Кэтвок (сторона Rafters)"],"Warden 1.5×","@nikita",["Long angles into IT and Warehouse","Дальние углы на IT и Warehouse"]],
   [["CC Stairs side","Сторона CC Stairs"],"Wamai","@renat",["Discs on catwalk door + CC Hallway; late flanks from below","Диски на двери кэтвока и CC Hallway; поздние фланги снизу"]]]}},
  {shots:[["cc-b.jpg",["Setup B · operator map","Сетап B · карта оперативников"]]]},
  {h:["Pro tweaks (W7M)","Про-фишки (W7M)"],side:"d"},
  {list:[["**Castle the bottom Aqua door** so nobody lurks up behind the Water player","**Castle на нижнюю дверь Aqua**, чтобы никто не залурчил за спину игроку Water"],["**Ebox is the key anchor**: close shotgun or Mute. Ebox + pillar side = crossfire on the garden entry","**Ebox — ключевой анкер**: дробовик вплотную или Mute. Ebox + сторона pillar = кросс на вход garden"],["**Kaid / Bandit banned → Mira on the IT wall**","**Kaid / Bandit в бане → Mira на стену IT**"],["**Read the take**: IT + Rafters = garage take (hold Water); Meeting → garden breach = split take, a Buck will make vert from 1F — Renat drops a hatch and flanks him","**Читаем заход**: IT + Rafters = через garage (держим Water); Meeting → брич garden = сплит, Buck будет делать вертикаль с 1Э — Renat прыгает в люк и фланкует его"]]},
  {h:["Attack: 2F CC / Servers","Атака: 2F CC / Servers"],tag:["Attack B · video · pro 43.4%","Атака B · видео · про 43.4%"],side:"a"},
  {p:["Take the north-east first (Meeting Room, top of Lobby Stairs), then Connector and Electrical. Open Servers from Connector, smoke the two doorways, open the IT outside wall only once you have map control.","Сначала берём северо-восток (Meeting Room, верх Lobby Stairs), потом Connector и Electrical. Открываем Servers из Connector, дымим два прохода, внешнюю стену IT открываем только при контроле карты."]},
  {table:{head:[["Role","Роль"],["Op","Опер"],["Player","Игрок"]],rows:[
   [["Hard breacher","Хард-бричер"],"Thermite / Ace / Hibana","@nikita"],[["Soft destruction + 2nd hard breach","Софт-брич + второй хард-брич"],"Buck","@roman"],[["Frags, opens IT from 1F if denied","Гранаты, открывает IT снизу при денае"],"Zofia / Ash","@renat"],[["Smokes, planter","Дымы, плантер"],["op with smoke grenades","опер с дымами"],"@sanya"],[["Flex, flank drones","Флекс, фланговые дроны"],"Twitch","@dima"]]}},
  {list:[["Defenders don't extend early here, so the north-east is usually free","Защита здесь рано не выходит, северо-восток обычно свободен"],["Plant behind Stacks if the wall stays shut","Если стена закрыта — плант за Stacks"],["Flank drones by the staircases","Фланговые дроны у лестниц"]]},
  {board:"ccA,ccB,cA,cA2,cA3"}
 ]},
{id:"basement",icon:"⚙️",num:"02",title:["Basement","Подвал"],kind:"B",strats:"bD1,bD2,bD3,bA",
 blocks:[
  {h:["Defence: B Tank / Assembly","Защита: B Tank / Assembly"],tag:["pick #3 · pro 53.2%","выбор №3 · про 53.2%"],side:"d"},
  {p:["Keep the outside walls shut and hold Storage above site: attackers must clear Renat before they can plant on the default and pillar spots.","Держим внешние стены закрытыми и Storage над точкой: атаке нужно убрать Renat, прежде чем плантить на дефолте и у pillar."]},
  {table:{head:["#",["Spot","Позиция"],["Player","Игрок"],["Option 1 · Kaid + Bandit open","Вариант 1 · Kaid и Bandit открыты"],["Option 2 · one banned","Вариант 2 · один в бане"]],rows:[
   ["1",["Assembly, by the 2 RF walls","Assembly, у 2 укреплённых стен"],"@nikita","Bandit","Kaid / Bandit"],
   ["2",["Animus, by the RF wall","Animus, у укреплённой стены"],"@sanya","Kaid","Mute"],
   ["3","Vending Stairs","@dima","Thorn / Goyo","Thorn / Goyo"],
   ["4",["Storage (1F, floor holes)","Storage (1Э, дыры в полу)"],"@renat","Solis","Warden"],
   ["5",["Cargo (1F)","Cargo (1Э)"],"@roman","Fenrir","Fenrir"]]}},
  {h:["Reinforce & holes","Укрепления и дыры"]},
  {list:[["2 outside walls + Animus wall","2 внешние стены + стена Animus"],["Assembly notch wall: left reinforced, rotate on the right","Стена ниши Assembly: слева укрепление, справа ротейт"],["All hatches (Cargo, Garage → Animus, Exo)","Все люки (Cargo, Garage → Animus, Exo)"],["Feet holes: Cargo stairs, Nano Hall end wall, Nano → Exo wall","Дыры под ноги: Cargo Stairs, торцевая стена Nano Hall, стена Nano → Exo"],["Storage floor holes over the plants (3 rows + Vending)","Дыры в полу Storage над плантом (3 ряда + Vending)"],["Thorn trap on Vending Stairs","Ловушка Thorn на Vending Stairs"],["Rotates: Control ↔ Cargo, Control ↔ Storage","Ротейты: Control ↔ Cargo, Control ↔ Storage"]]},
  {shots:[["b-p1.jpg",["1 · Site · Nikita + Sanya","1 · Точка · Nikita + Sanya"]],["b-p2.jpg",["2 · Vending stairs · Dima","2 · Vending Stairs · Dima"]],["b-p3.jpg",["3 · Storage · Renat","3 · Storage · Renat"]],["b-p4.jpg",["4 · Control / Cargo · Roman","4 · Control / Cargo · Roman"]]]},
  {h:["Option 3 · W7M 2-2-1 roam","Вариант 3 · роум W7M 2-2-1"],side:"d"},
  {list:[["**2F:** @renat Azami in top garage (Rafters), @roman Lesion by Ebox, drops the hatch late","**2Э:** @renat Azami в верхнем garage (Rafters), @roman Lesion у Ebox, поздно прыгает в люк"],["**1F:** @nikita Warden on the Storage holes, @dima Castle: castles the **90 window** and both **Animus doors**","**1Э:** @nikita Warden на дырах Storage, @dima Castle: баррикады на **окно 90** и обе **двери Animus**"],["**Basement:** @sanya plays Exo, not site — the vert from Storage covers the plants","**Подвал:** @sanya играет Exo, а не точку — вертикаль из Storage закрывает плант"],["Animus wall left soft, hatch open: Animus becomes a killbox","Стена Animus мягкая, люк открыт: Animus — килбокс"]]},
  {h:["Attack: B Tank / Animus","Атака: B Tank / Animus"],tag:["pro 46.8% · best attack site","про 46.8% · лучшая точка для атаки"],side:"a"},
  {p:["Clear Tank from above through the soft Control floor, flame the two doors, drop the hatch and tuck-plant in the corner while Roman denies Cargo stairs.","Чистим Tank сверху через мягкий пол Control, поджигаем две двери, прыгаем в люк и плантим в углу, пока Roman держит Cargo Stairs."]},
  {steps:[["Prep: drone on an IT shelf; drone Storage + Cargo; shoot default cams.","Подготовка: дрон на полку в IT; дроним Storage и Cargo; сбиваем камеры."],["@roman scans outside rooms so Sanya enters safely.","@roman сканирует внешние комнаты, чтобы Sanya зашла безопасно."],["@sanya in through the Rafters window; Airjab 1 high on the far IT door.","@sanya заходит через окно Rafters; эйрджеб 1 высоко на дальнюю дверь IT."],["Down Warehouse Stairs: Airjab 2 far Storage door, Airjab 3 above Cargo door.","Вниз по Warehouse Stairs: эйрджеб 2 на дальнюю дверь Storage, эйрджеб 3 над дверью Cargo."],["@dima hard-breaches the 1F Warehouse hatch + top of Cargo stairs hatch.","@dima открывает люк 1Э Warehouse и люк над Cargo Stairs."],["@nikita cuts long lines in the Control floor: window line, along the wall, middle.","@nikita режет длинные линии в полу Control: по окну, вдоль стены, посередине."],["Roman works down Cargo stairs; no over-extending.","Roman спускается по Cargo Stairs; не перетягивает."],["**Drone the drop zone** — defenders hide behind the tank and swing late.","**Дроним место прыжка** — защита прячется за танком и выходит поздно."],["@renat flames both door frames; Sanya drops and plants in the corner.","@renat поджигает обе двери; Sanya прыгает и плантит в углу."],["Hold: Renat + Nikita on the holes, Roman on Cargo stairs, Dima on the hatch / flank.","Держим: Renat и Nikita на дырах, Roman на Cargo Stairs, Dima на люке / фланге."]]},
  {table:{head:[["Op","Опер"],["Backup","Запасной"],["Player","Игрок"]],rows:[["Nomad","Gridlock","@sanya"],["Solid Snake","Deimos","@roman"],["Sledge / Buck","Ram","@nikita"],["Capitão",["— essential","— обязателен"],"@renat"],["Grim","Ying","@dima"]]}},
  {note:["Comms: Nikita “lines open” → Renat “flaming” → Sanya “dropping”. Renat dead → Dima pings the doors with Grim.","Комс: Nikita «линии открыты» → Renat «поджигаю» → Sanya «прыгаю». Renat умер → Dima метит двери пчёлами Grim."]},
  {board:"bD1,bD2,bD3,bA"}
 ]},
{id:"storage",icon:"📦",num:"03",title:["Storage / Control","Storage / Control"],kind:"1F",strats:"sD,sA,sA2",
 blocks:[
  {h:["Defence: 1F Storage / Control","Защита: 1F Storage / Control"],tag:["pick #2 · pro 57.2%","выбор №2 · про 57.2%"],side:"d"},
  {p:["Top floor is set up exactly like CC. Hold it for about 1:30, then drop to site and make attackers open the floor themselves.","Верх ставим так же, как на CC. Держим около 1:30, потом спускаемся на точку и заставляем атаку самой открывать пол."]},
  {table:{head:["#",["Spot","Позиция"],["Ops","Оперативники"],["Player","Игрок"]],rows:[
   ["1",["Storage (site)","Storage (точка)"],"Mute / Smoke","@sanya"],["2",["Control bridge, Tetris angle","Связка Control, угол Tetris"],"Lesion / Fenrir / Mozzie","@roman"],["3","Water (CC Stairs)",["Warden / Smoke (Clash last)","Warden / Smoke (Clash — в крайнем случае)"],"@nikita"],["4","Rafters (2F Warehouse)","Azami / Ela / Fenrir","@renat"],["5","IT / Ebox",["Bandit or Mute / Warden / Smoke","Bandit или Mute / Warden / Smoke"],"@dima"]]}},
  {list:[["2 outside Garage walls","2 внешние стены Garage"],["Rotate Control → Cargo (right side); Control ↔ Storage","Ротейт Control → Cargo (справа); Control ↔ Storage"],["Head holes: pillar plant (C4/smoke), into Games","Дыры на уровне головы: на плант у pillar (C4/дым), в Games"],["Board the mud door","Забаррикадировать дверь Mud"],["Top floor as CC; double Servers → Connector; hatch open","Верх как на CC; двойная Servers → Connector; люк открыт"]]},
  {h:["Attack: 1F Storage / Control","Атака: 1F Storage / Control"],tag:["Attack B · W7M · pro 42.8%","Атака B · W7M · про 42.8%"],side:"a"},
  {p:["Bait and switch: open walls on 2F so defenders think it's a top-floor clear, then come up from the basement through Cargo Stairs and plant in the tuck spot by the defenders' own rotate.","Приманка: открываем стены на 2Э, чтобы защита решила, что мы чистим верх, потом поднимаемся из подвала по Cargo Stairs и плантим в «тук-споте» у ротейта самой защиты."]},
  {table:{head:[["Job","Задача"],["Op","Опер"],["Player","Игрок"]],rows:[
   [["Opens IT, then shotguns Aqua","Открывает IT, потом с дробовиком на Aqua"],"Hibana","@nikita"],[["Opens garden + bottom garage, holds the cut from a window","Открывает garden и нижний garage, держит отсечку из окна"],"Ace","@dima"],[["Up Cargo Stairs, opens the way","По Cargo Stairs наверх, открывает путь"],"Sledge","@roman"],[["Up Cargo Stairs, planter","По Cargo Stairs наверх, плантер"],"Blackbeard","@sanya"],[["Lurk from Lobby toward 90","Лурк из Lobby к 90"],"Deimos","@renat"]]}},
  {list:[["Open everything early (“soft pressure”): defenders lose mobility","Открываем всё рано («мягкое давление»): защита теряет мобильность"],["The lurk takes free space slowly","Лурк забирает свободное место медленно"],["Blackbeard puts the shield on his back so a Clash can't knock it","Blackbeard вешает щит на спину, чтобы Clash его не сбила"]]},
  {board:"sD,sA,sA2"}
 ]},
{id:"kitchen",icon:"🍳",num:"04",title:["Kitchen / Cafeteria","Kitchen / Cafeteria"],kind:"1F",strats:"kD,kA,kA2,kA3",
 blocks:[
  {h:["Defence: 1F Kitchen / Cafeteria","Защита: 1F Kitchen / Cafeteria"],tag:["last resort · pro 46.8%","на крайний случай · про 46.8%"],side:"d"},
  {p:["Only when coordinated: we must keep the top floor, or attackers clear almost every spot vertically.","Только при хорошей координации: нужно держать верх, иначе атака вычистит почти все позиции вертикалью."]},
  {table:{head:["#",["Spot","Позиция"],["Ops","Оперативники"],["Player","Игрок"]],rows:[
   ["1","Kitchen + Cafeteria","Mute / Wamai / Warden","@sanya"],["2","Break","Warden / Maestro / Echo","@nikita"],["3",["Games / 90, mobile","Games / 90, мобильный"],"Castle / Fenrir / Pulse","@roman"],["4",["Mezz — power spot","Mezz — пауэр-спот"],"Azami / Ela / Frost","@renat"],["5","Connector","Bandit / Fenrir / Solis","@dima"]]}},
  {list:[["Cafe → Lobby walls (Cafe desk = power spot)","Стены Cafe → Lobby (стол в Cafe — пауэр-спот)"],["Head holes into Games","Дыры на уровне головы в Games"],["Knee-high holes in the freezer wall (kitchen window)","Дыры на уровне колена в стене freezer (окно кухни)"],["2F: two Meeting walls by Mezz; outside Connector walls","2Э: две стены Meeting у Mezz; внешние стены Connector"]]},
  {shots:[["k-p1.jpg",["1 · Kitchen · Sanya","1 · Kitchen · Sanya"]],["k-p2.jpg",["2 · Break · Nikita","2 · Break · Nikita"]],["k-p3.jpg",["3 · Games · Roman","3 · Games · Roman"]],["k-p4.jpg",["4 · Mezz · Renat","4 · Mezz · Renat"]],["k-p5.jpg",["5 · Connector · Dima","5 · Connector · Dima"]]]},
  {h:["Attack: 1F Kitchen","Атака: 1F Kitchen"],tag:["Attack B · video · pro 53.2%","Атака B · видео · про 53.2%"],side:"a"},
  {p:["Almost the whole Cafeteria ceiling is soft. Take the top of Lobby Stairs and Meeting Room, open the floor over Cafeteria with two soft breachers, and plant from the kitchen window.","Почти весь потолок Cafeteria мягкий. Берём верх Lobby Stairs и Meeting Room, двумя софт-бричерами открываем пол над Cafeteria и плантим со стороны окна кухни."]},
  {table:{head:[["Role","Роль"],["Op","Опер"],["Player","Игрок"]],rows:[[["Soft breacher","Софт-бричер"],"Sledge","@nikita"],[["Soft breacher","Софт-бричер"],"Buck","@roman"],[["Clear + hold the holes","Чистит и держит дыры"],"Grim","@renat"],[["Clear + hold, flank drones","Чистит, держит, фланговые дроны"],"Twitch","@dima"],[["Planter at the kitchen window","Плантер у окна кухни"],"Nomad","@sanya"]]}},
  {list:[["Don't open the kitchen window early: defenders huddle there","Не открываем окно кухни рано: защита соберётся там"],["Post-plant: vertical on both Cafeteria doors and the kitchen counter","Пост-плант: вертикаль на обе двери Cafeteria и стойку кухни"]]},
  {board:"kD,kA,kA2,kA3"}
 ]},
{id:"map",icon:"🗺️",num:"05",title:["Map & callouts","Карта и коллауты"],kind:"",
 blocks:[
  {h:["Slang → official room","Сленг → официальная комната"]},
  {table:{head:[["Callout","Коллаут"],["Where","Где"]],rows:[
   ["Rafters",["2F Warehouse (R1, R2, R3)","2Э Warehouse (R1, R2, R3)"]],["Water / Aqua",["Blue Stairs (CC Stairs) + CC Hall","Blue Stairs (CC Stairs) + CC Hall"]],["Ebox",["Electrical (Tools, Buzz)","Electrical (Tools, Buzz)"]],["Garden",["Connector side (Ivy, Horseshoe, J spot)","Сторона Connector (Ivy, Horseshoe, J spot)"]],["Mezz",["Top of Lobby Stairs / Meeting Hall","Верх Lobby Stairs / Meeting Hall"]],["CCTV",["Command Center (Monitors, Fiji, Fern)","Command Center (Monitors, Fiji, Fern)"]],["Games",["Lounge (Foosball, Pool, TV)","Lounge (Foosball, Pool, TV)"]],["90",["Corner of Lounge Hall and Caf Hall","Угол Lounge Hall и Caf Hall"]],["Fork",["Yellow Fork = top of Control Hall; Blue Fork = Warehouse → Storage door","Yellow Fork — верх Control Hall; Blue Fork — дверь Warehouse → Storage"]],["Tetris",["Crates in 1F Warehouse","Ящики в 1Э Warehouse"]],["Harry Potter",["Lobby, under Lobby Stairs","Lobby, под Lobby Stairs"]],["Mud",["Warehouse Entrance (mud door)","Warehouse Entrance (дверь Mud)"]],["Garage",["Warehouse (top garage = Rafters)","Warehouse (верхний garage = Rafters)"]],["Break",["Top of Vending Stairs","Верх Vending Stairs"]],["Exo stairs","Vending Stairs"],["Nano",["Nanotech (Micro, Map); Nano Hall above it","Nanotech (Micro, Map); над ним Nano Hall"]],["Proto",["Basement room by Exo Stairs (P1–P4)","Комната подвала у Exo Stairs (P1–P4)"]],["Exo",["Exosuit (Pillar, Cave)","Exosuit (Pillar, Cave)"]],["Halo",["Cafeteria site corner","Угол точки Cafeteria"]]]}},
  {h:["Community callouts","Коммьюнити-коллауты"]},
  {shots:[["cmap-b.jpg",["Basement","Подвал"]],["cmap-1f.jpg",["1st floor","1-й этаж"]],["cmap-2f.jpg",["2nd floor","2-й этаж"]]],square:true},
  {h:["Official callouts","Официальные коллауты"]},
  {shots:[["callouts-b.jpg",["Basement","Подвал"]],["callouts-1f.jpg",["1st floor","1-й этаж"]],["callouts-2f.jpg",["2nd floor","2-й этаж"]]]},
  {h:["Blueprints","Чертежи"]},
  {note:["Red hatching = destructible floor, yellow checks = hatches, yellow dashes = breakable walls.","Красная штриховка — разрушаемый пол, жёлтая клетка — люки, жёлтый пунктир — разрушаемые стены."]},
  {shots:[["bp-b.jpg",["Basement","Подвал"]],["bp-1f.jpg",["1st floor","1-й этаж"]],["bp-2f.jpg",["2nd floor","2-й этаж"]],["bp-roof.jpg",["Roof","Крыша"]]]}
 ]},
{id:"bans",icon:"🚫",num:"06",title:["Operator bans","Баны оперативников"],kind:"",
 blocks:[
  {p:["We ban only the opponent's side. Bans stay until sides switch, then reset. Use the slots in order.","Баним только сторону соперника. Баны держатся до смены сторон, потом сбрасываются. Используем слоты по порядку."]},
  {table:{head:[["Ban","Бан"],["We attack","Мы в атаке"],["We defend CC","Защищаем CC"],["We defend B / Storage","Защищаем B / Storage"]],rows:[
   ["1","Kaid","Ace","Ace"],["2","Bandit","Thermite / Hibana","Thermite / Hibana"],["3",["Azami (B) / Mira (CC, Storage)","Azami (B) / Mira (CC, Storage)"],"Grim","Ram"]]}},
  {h:["Why","Почему"]},
  {list:[["**Kaid, Bandit**: hold hatches and walls our B execute needs open; pros' top opening bans here","**Kaid, Bandit**: держат люки и стены, которые нам нужно открыть на B; самые частые первые баны у про"],["**Azami**: barriers plug Nikita's holes and Sanya's hatch","**Azami**: барьеры закрывают дыры Nikita и люк Sanya"],["**Ace + Thermite / Hibana**: double hard-breach ban, like W7M — the map is decided by breaches","**Ace + Thermite / Hibana**: двойной бан хард-бричеров, как у W7M — карта решается бричами"],["**Ram**: 54% of pro B attack rounds, opens Storage/Control from above","**Ram**: 54% про-раундов атаки на B, открывает Storage/Control сверху"],["**Grim**: most banned attacker, flushes Rafters and Mezz","**Grim**: самый частый бан в атаке, выкуривает Rafters и Mezz"],["**Montagne**: ban instead of Grim if shields keep taking Water/Rafters","**Montagne**: баним вместо Grim, если щиты забирают Water/Rafters"]]},
  {h:["Adapt ban 3","Меняем бан 3"]},
  {list:[["Plant denied by fire → **Goyo**","Плант режут огнём → **Goyo**"],["Floor holes blocked → **Azami**","Дыры в полу закрывают → **Azami**"],["Roamer scanned out → **Solid Snake**","Роумера находят сканом → **Solid Snake**"],["Our backups: Sledge ↔ Buck → Ram · Grim → Ying · Azami → Ela · Kaid → Bandit","Наши замены: Sledge ↔ Buck → Ram · Grim → Ying · Azami → Ela · Kaid → Bandit"]]}
 ]},
{id:"pro",icon:"🏆",num:"07",title:["Pro notes · W7M","Про-заметки · W7M"],kind:"",
 blocks:[
  {p:["How W7M went 7-1 on Nighthaven against Space Station. Garage = Warehouse, Aqua = CC Stairs, Ebox = Electrical, Garden = Connector side.","Как W7M обыграли Space Station 7-1 на Nighthaven. Garage = Warehouse, Aqua = CC Stairs, Ebox = Electrical, Garden = сторона Connector."]},
  {h:["Defence, general","Защита, общее"],side:"d"},
  {list:[["Ban **two hard breachers** (Ace / Thermite / Hibana)","Баним **двух хард-бричеров** (Ace / Thermite / Hibana)"],["Kaid / Bandit banned → **Mira on the IT wall**: a Thermite on it breaks when the Mira pops","Kaid / Bandit в бане → **Mira на стену IT**: термит на ней ломается, когда Mira выбивают"],["Read the attack type (“triggers”) and move bodies","Читаем тип захода («триггеры») и перекидываем людей"]]},
  {h:["2F CC / Servers · 5-man top extension","2F CC / Servers · 5 человек на верхнем расширении"],side:"d"},
  {list:[["Smoke holds Aqua; Castle on the bottom Aqua door","Smoke держит Aqua; Castle на нижней двери Aqua"],["Azami in top garage, Clash around Ebox / pillar, Mozzie notifications","Azami в верхнем garage, Clash у Ebox / pillar, Mozzie на оповещения"],["Two takes: **garage** (IT + top garage → Aqua) or **garden / split** (Meeting → garden → Ebox, Buck underneath)","Два захода: **garage** (IT + верхний garage → Aqua) или **garden / сплит** (Meeting → garden → Ebox, Buck снизу)"],["Vs garden take: the garage player drops the hatch and flanks the Buck on 1F","Против garden: игрок garage прыгает в люк и фланкует Buck на 1Э"]]},
  {h:["Basement · 2-2-1 roam","Подвал · роум 2-2-1"],side:"d"},
  {list:[["Site player in **Exo, not site**: vert over site covers the plants","Игрок точки в **Exo, а не на точке**: вертикаль закрывает плант"],["Animus wall soft, **both doors castled** = killbox","Стена Animus мягкая, **обе двери под Castle** = килбокс"],["**Castle the 90 window**: splits the map in half","**Castle на окно 90**: делит карту пополам"]]},
  {h:["1F Kitchen · scrappy","1F Kitchen · «рваная» защита"],side:"d"},
  {list:[["Warden on Lobby Stairs holds top + bottom Lobby; one player at Harry Potter","Warden на Lobby Stairs держит верх и низ Lobby; один игрок на Harry Potter"],["Frost shield on 90; Fenrir on the back; reinforce the Freezer hatch from outside early","Frost со щитом на 90; Fenrir сзади; рано укрепить люк Freezer снаружи"]]},
  {h:["Attack ideas","Идеи для атаки"],side:"a"},
  {list:[["**Soft pressure**: open IT, garden and bottom garage early","**Мягкое давление**: рано открываем IT, garden и нижний garage"],["**Basement roam clear**: Ace via garage door, Blackbeard hops Ebox, hard breacher fast through Aqua, one player in bottom garage","**Зачистка роума перед подвалом**: Ace через дверь garage, Blackbeard в окно Ebox, хард-бричер быстро через Aqua, один в нижнем garage"],["**Storage bait and switch** — see Storage → Attack B","**Приманка на Storage** — см. Storage → Атака B"],["Keep one **lurk** who takes free space slowly","Держим одного **лурка**, который медленно забирает место"]]}
 ]},
{id:"practice",icon:"🏋️",num:"08",title:["Practice","Тренировка"],kind:"",
 blocks:[
  {h:["One custom session · ~1.5 h","Одна кастомка · ~1,5 ч"]},
  {check:[["Callout walk-through — 15 min","Пробежка по коллаутам — 15 мин"],["CC/Servers setup + everyone's fall-back route — 30 min","Сетап CC/Servers + маршрут отхода у каждого — 30 мин"],["Basement defence: Storage holes, Control rotates — 15 min","Защита подвала: дыры в Storage, ротейты Control — 15 мин"],["Basement attack ×5–6 with the comms order — 30 min","Атака подвала ×5–6 с порядком комсов — 30 мин"]]},
  {h:["Track every Nighthaven match","Отмечаем в каждом матче на Nighthaven"]},
  {table:{head:[["What","Что"],["Target","Цель"]],rows:[[["IT walls shut at 1:30","Стены IT закрыты на 1:30"],["most rounds","в большинстве раундов"]],[["Defence win %, by site","% побед в защите по точкам"],["note site each round","отмечать точку каждый раунд"]],[["Plants with the B execute","Планты с захода на B"],["count per try","считаем на каждую попытку"]],[["Attack round win %","% побед в атаке"],"≥ 40%"],[["First kill on attack","Первый фраг в атаке"],["traded or with utility","с разменом или с утилитой"]]]}}
 ]}
];
const BOARD_RU={"Ace: bottom garage":"Ace: нижний garage","Animus wall left soft = killbox":"стена Animus мягкая = килбокс","Buck vert from 1F":"Buck: вертикаль с 1Э","CC floor over Control":"пол CC над Control","Cafe → Lobby walls":"стены Cafe → Lobby","IT walls":"стены IT","Meeting floor over Cafeteria":"пол Meeting над Cafeteria","Meeting walls":"стены Meeting","Servers floor over Storage":"пол Servers над Storage","behind Stacks":"за Stacks","bottom CC Stairs":"низ CC Stairs","clear Harry Potter":"чистим Harry Potter","come up through the basement":"поднимаемся из подвала","double":"двойная","down CC Stairs":"вниз по CC Stairs","down Warehouse Stairs":"вниз по Warehouse Stairs","drop hatch":"прыжок в люк","drops hatch":"прыгает в люк","flank drone on stairs":"фланговый дрон на лестнице","floor holes":"дыры в полу","floor over Cafeteria":"пол над Cafeteria","garage walls (double)":"стены garage (двойные)","hatch open":"люк открыт","holds the cut":"держит отсечку","knee holes (freezer)":"дыры у колена (freezer)","lurk from Lobby":"лурк из Lobby","outside Garage walls":"внешние стены Garage","outside Lobby windows":"у окон Lobby снаружи","outside kitchen window":"снаружи у окна кухни","takes Aqua":"забирает Aqua","tuck spot":"тук-спот","under top garage":"под верхним garage","vert holds both Cafe doors + counter":"вертикаль на обе двери Cafe + стойку","vert onto Storage":"вертикаль на Storage","vert onto site":"вертикаль на точку","90 window":"окно 90","Animus door":"дверь Animus","BP cam":"BP-камера","bottom Aqua door":"нижняя дверь Aqua","fork":"fork","hatch":"люк","reserve":"запас","Smokes op":"опер с дымами"};
