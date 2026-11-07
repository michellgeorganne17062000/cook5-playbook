/* [COOK5] Playbook — Villa defence, 2F Aviator / Games. Every text is [English, Russian].
   Source: setup drawing found by the team in a Discord channel (07.11.2026); operators named by the team.
   Board floor plan: Villa 2F from the Stream Strats 4 Fun deck (img/r6/maps/villa.png, cropped ×3 → img/villa-2f.png).
   Board icons: deck icons (img/r6/icons) — the drawing uses the same icon set. Loaded after board.js. */
FLOORS.v2={label:"2F",img:"img/villa-2f.png",w:1125,h:1521,vb:[0,40,1125,1470],mask:false};
UI.floors.v2=["2F","2Э"];
Object.assign(UI,{p_villa:["Villa defence","Защита Villa"]});
MAPS.push({id:"villa",icon:"🏛️",name:"Villa",sub:["2F Aviator / Games · defence setup","2F Aviator / Games · сетап защиты"],rec:["def 2/7 · att 3/7","защ 2/7 · ат 3/7"]});
LEGEND.push(["rfi",["Reinforced wall (as in the drawing)","Укреплённая стена (как на схеме)"]],["hole",["Hole / rotate in a soft wall","Дыра / ротейт в мягкой стене"]]);

/* deck icon glyph: IC(phase, icon path under img/r6/icons, x, y, label, border colour) */
const IC=(ph,src,x,y,lab,c)=>({k:"g",f:"v2",ph,t:"IC",x,y,l:src+(lab?"|"+lab:""),c});
const VC={g:"#7c6f86",a:"#2b6fd6",b:"#0f8f86",s:"#4d7c0f",t:"#ea580c"};
STRATS.push({id:"vAG",name:"Aviator / Games",side:"d",floor:"v2",
 phases:["Setup (Discord drawing): 10 reinforcements, holes and rotates; Games + Aviator on site, Brown Stairs flank, two roams north (Statue, Trophy / Astro)",
         "Fall-back (our rule, untested): roams leave by 1:30 or once droned — Statue via Landing into Ninety, Trophy via Trophy Entrance into Skull"],
 items:[
  S("v2",250,1195,"1A"),S("v2",500,1082,"1B"),
  /* reinforcements — site */
  G("v2",1,"RV",250,840),G("v2",1,"RV",125,975),G("v2",1,"RV",125,1185),G("v2",1,"RV",375,1010),G("v2",1,"RV",375,1150),G("v2",1,"RV",375,1215),G("v2",1,"RH",485,1110),
  /* reinforcements — north */
  G("v2",1,"RV",810,350),G("v2",1,"RV",810,415),G("v2",1,"RH",515,270),
  /* holes / rotates */
  G("v2",1,"HH2",470,935,"rotate"),G("v2",1,"HV",375,1075),G("v2",1,"HH2",415,1110),G("v2",1,"HS",595,1110),G("v2",1,"HH2",250,1245),G("v2",1,"HS",30,1290),
  G("v2",1,"HV",810,292),G("v2",1,"HV",905,190),G("v2",1,"HH2",430,270),
  /* Games (Smoke): canisters */
  IC(1,"gadgets/gadget-27.png",610,935,"",VC.g),IC(1,"gadgets/gadget-27.png",75,1320,"",VC.g),
  /* Aviator: Kibas + panel */
  IC(1,"gadgets/gadget-12.png",640,965,"",VC.a),IC(1,"gadgets/gadget-12.png",640,1025,"",VC.a),IC(1,"gadgets/gadget-18.png",600,1065,"",VC.a),
  /* Brown Stairs: panels */
  IC(1,"gadgets/gadget-18.png",95,1300,"",VC.b),IC(1,"gadgets/gadget-18.png",210,1430,"",VC.b),
  /* Statue roam (Thorn / Ela / Denari) */
  IC(1,"gadgets/gadget-37.png",770,200,"",VC.s),IC(1,"gadgets/gadget-37.png",745,300,"",VC.s),IC(1,"gadgets/gadget-37.png",850,480,"",VC.s),IC(1,"gadgets/gadget-37.png",850,540,"",VC.s),
  IC(1,"gadgets/gadget-37.png",990,600,"",VC.s),IC(1,"gadgets/gadget-37.png",1080,600,"",VC.s),IC(1,"gadgets/gadget-37.png",1090,300,"",VC.s),
  IC(1,"utility/utility-11.png",840,150,"",VC.s),IC(1,"utility/utility-11.png",1035,600,"",VC.s),
  IC(1,"gadgets/gadget-19.png",395,135,"",VC.s),IC(1,"gadgets/gadget-19.png",990,140,"",VC.s),IC(1,"gadgets/gadget-19.png",1070,360,"",VC.s),
  IC(1,"gadgets/gadget-09.png",445,135,"",VC.s),IC(1,"gadgets/gadget-09.png",1040,140,"",VC.s),IC(1,"gadgets/gadget-09.png",1070,420,"",VC.s),
  /* Trophy roam (Sentry / Solis / Valkyrie) */
  IC(1,"utility/utility-11.png",500,60,"",VC.t),IC(1,"utility/utility-16.png",550,60,"",VC.t),
  IC(1,"utility/utility-11.png",720,150,"",VC.t),IC(1,"utility/utility-16.png",720,205,"",VC.t),
  IC(1,"utility/utility-11.png",395,600,"",VC.t),IC(1,"utility/utility-16.png",395,655,"",VC.t),
  /* phase 1 positions */
  T("v2",1,"sanya","Echo",230,1030),T("v2",1,"renat","Azami",545,955),T("v2",1,"roman","Wamai",240,1300),
  T("v2",1,"nikita","Ela",745,400),T("v2",1,"dima","Valkyrie",450,400),
  /* phase 2 fall-back */
  A("v2",2,"nikita",[[745,400],[745,600],[600,640],[520,730],[330,840]],1),T("v2",2,"nikita","Ela",330,840),
  A("v2",2,"dima",[[450,400],[430,620],[560,720],[600,790]],1),T("v2",2,"dima","Valkyrie",600,800)
 ]});

Object.assign(SHORT,{vAG:["Aviator / Games","Aviator / Games"]});
PH_RU.vAG=["Сетап (схема из Discord): 10 укреплений, дыры и ротейты; Games + Aviator на точке, фланг Brown Stairs, два роума на севере (Statue, Trophy / Astro)",
           "Отход (наше правило, не проверено): роумы уходят к 1:30 или сразу после дрона — Statue через Landing в Ninety, Trophy через Trophy Entrance в Skull"];
Object.assign(BOARD_RU,{"rotate":"ротейт","Games":"Games","Aviator":"Aviator"});

Object.assign(KPOS,{
 vag:[["sanya",["1 · Games (1A) — site anchor","1 · Games (1A) — якорь точки"],"Echo* / Tachanka / Smoke / Mute"],
      ["renat",["2 · Aviator (1B)","2 · Aviator (1B)"],"Azami / Warden / Clash"],
      ["roman",["3 · Bottom Ninety / Brown Stairs flank","3 · Низ Ninety / фланг Brown Stairs"],"Wamai / Ela / Clash"],
      ["nikita",["4 · Statue roam (traps)","4 · Роум Statue (ловушки)"],"Ela / Thorn / Denari"],
      ["dima",["5 · Trophy / Astro roam (info)","5 · Роум Trophy / Astro (инфо)"],"Valkyrie / Solis / Sentry"]]
});

const VILLA=[
{id:"v-plan",map:"villa",icon:"🧭",num:"00",title:["Overview","Обзор"],kind:"",blocks:[
 {kpis:[["0–2",["games on Villa","игр на Villa"]],["2/7",["our defence rounds","наши раунды защиты"]],["3/7",["our attack rounds","наши раунды атаки"]]]},
 {p:["Villa is **ban #3** in the rulebook and isn't in our pool. When ranked still puts us on it, defend **2F Aviator / Games** with the setup below. We have no per-site data yet. **Log the site of every Villa defence round.**","Villa — **бан №3** в своде правил, в нашем пуле её нет. Если рейтинг всё же даёт её, в защите играем **2F Aviator / Games** по сетапу ниже. Данных по точкам пока нет. **Записывайте точку каждого раунда защиты на Villa.**"]},
 {h:["Callouts (2F)","Коллауты (2F)"]},
 {list:[["**Site:** Games (1A, pool table + Bar) · Aviator (1B) · Study (south of Aviator, hatch) · Vault · Skull · Ninety / Ninety Corner (hatch) · Brown Stairs","**Точка:** Games (1A, бильярд + бар) · Aviator (1B) · Study (южнее Aviator, люк) · Vault · Skull · Ninety / Ninety Corner (люк) · Brown Stairs"],
  ["**Centre:** Landing · Red Stairs · Trophy Entrance","**Центр:** Landing · Red Stairs · Trophy Entrance"],
  ["**North:** Astro Stairs · Astro (hatch) · Trophy · Statue · Bathroom · Closet · Master (hatch)","**Север:** Astro Stairs · Astro (люк) · Trophy · Statue · Bathroom · Closet · Master (люк)"],
  ["**Outside:** Terrace (east) · Study Balcony · Ninety Balcony · Trophy / Bathroom / Master balconies","**Снаружи:** Terrace (восток) · Study Balcony · Ninety Balcony · балконы Trophy / Bathroom / Master"]]},
 {note:["The drawing names the 1A room \"Gaming\"; in game it's the Games Room.","На схеме комната 1A названа «Gaming»; в игре — Games Room."]}
]},
{id:"v-ag",map:"villa",icon:"✈️",num:"01",title:["2F Aviator / Games","2F Aviator / Games"],kind:"2F",strats:"vAG",blocks:[
 {h:["Defence: Aviator / Games","Защита: Aviator / Games"],tag:["Discord setup · untested","сетап из Discord · не проверен"],side:"d"},
 {kpos:"vag"},
 {note:["First op = our pick. * = our idea: Sanya on Echo or Tachanka because his Mute (1/6) and Smoke (5/12) numbers are weak. Option: Nikita's Bandit (7/8) instead of Mute on Games if he plays site.","Первый оперативник — наш выбор. * — наша идея: Саня на Echo или Tachanka, потому что у него слабые Mute (1/6) и Smoke (5/12). Вариант: Bandit Никиты (7/8) вместо Mute на Games, если он играет точку."]},
 {board:"vAG"},
 {h:["Reinforcements (10)","Укрепления (10)"]},
 {list:[["**Site (7):** Ninety ↔ Vault · both Games ↔ Ninety walls · middle of the Games ↔ Aviator divider · both Study ↔ Games walls · Aviator ↔ Study wall","**Точка (7):** Ninety ↔ Vault · обе стены Games ↔ Ninety · середина перегородки Games ↔ Aviator · обе стены Study ↔ Games · стена Aviator ↔ Study"],
  ["**North (3):** two Statue walls toward Master · Astro ↔ Trophy wall","**Север (3):** две стены Statue в сторону Master · стена Astro ↔ Trophy"],
  ["Hatches (Ninety Corner, Study, Astro, Master) aren't reinforced in the drawing.","Люки (Ninety Corner, Study, Astro, Master) на схеме не укреплены."]]},
 {h:["Holes and rotates","Дыры и ротейты"]},
 {list:[["**Rotate** at the top of the Games ↔ Aviator divider, by Vault; **vault / hole** in the soft lower part of the divider","**Ротейт** вверху перегородки Games ↔ Aviator, у Vault; **перелаз / дыра** в мягкой нижней части перегородки"],
  ["Holes in the soft part of the Aviator ↔ Study wall, a small hole by the 1B plant","Дыры в мягкой части стены Aviator ↔ Study, маленькая дыра у плента 1B"],
  ["Holes at the Bar onto the Brown Stairs room; a small hole low on Ninety's west wall","Дыры у бара на комнату Brown Stairs; маленькая дыра внизу западной стены Ninety"],
  ["North: rotate along Closet, hole above the Statue reinforcements, holes + vault in the Astro → Trophy wall","Север: ротейт вдоль Closet, дыра над укреплениями Statue, дыры + перелаз в стене Astro → Trophy"]]},
 {h:["Gadgets (as drawn)","Гаджеты (как на схеме)"]},
 {list:[["**Games:** Smoke canisters by the Skull door and at the bottom of Ninety","**Games:** канистры Smoke у двери Skull и внизу Ninety"],
  ["**Aviator:** two Kibas on the east windows, one panel gadget","**Aviator:** две Kiba на восточных окнах, один гаджет-панель"],
  ["**Brown Stairs:** panel gadgets in the Ninety doorway and on the stairs","**Brown Stairs:** гаджеты-панели в проходе Ninety и на лестнице"],
  ["**Statue roam:** Denari tethers on Bathroom, Statue, Master doors and windows; Ela mines + Thorn Razorblooms in Astro, Closet, Master; barbed wire in Bathroom and Master","**Роум Statue:** растяжки Denari на дверях и окнах Bathroom, Statue, Master; мины Ela + Razorbloom Thorn в Astro, Closet, Master; колючка в Bathroom и Master"],
  ["**Trophy roam:** barbed wire + proximity alarm at Astro Stairs, Bathroom door and Trophy Entrance","**Роум Trophy:** колючка + датчик движения в Astro Stairs, у двери Bathroom и у Trophy Entrance"]]},
 {h:["Rules (our inference)","Правила (наш вывод)"]},
 {list:[["**Roams = time and info, not frags.** Fall back once droned or after the first kill (rulebook rule 4).","**Роумы — время и информация, а не фраги.** Отходим после дрона или первого фрага (правило 4)."],
  ["**No first-angle peeks** from Aviator onto Study or Terrace before info (rule 5).","**Без пика первого угла** из Aviator на Study или Terrace до информации (правило 5)."],
  ["**Brown Stairs must live:** if he dies, Games is open from the Bar side. Games calls it; a roamer rotates in through Ninety.","**Brown Stairs должен жить:** если его убили, Games открыт со стороны бара. Games колит, роумер заходит через Ninety."],
  ["**Ban Ace** (provisional): Mute is the only anti-breach op here.","**Баним Ace** (предварительно): Mute здесь единственный против пролома."]]},
 {shots:[["villa-ag.jpg",["The Discord drawing: whole setup","Схема из Discord: весь сетап"]],["villa-ag-p1.jpg",["1 · Games","1 · Games"]],["villa-ag-p2.jpg",["2 · Aviator","2 · Aviator"]],["villa-ag-p3.jpg",["3 · Brown Stairs","3 · Brown Stairs"]],["villa-ag-p4.jpg",["4 · Statue roam","4 · Роум Statue"]],["villa-ag-p5.jpg",["5 · Trophy roam","5 · Роум Trophy"]]]},
 {note:["The board is drawn on the deck's Villa 2F plan, which is older than the current (modernized) Villa, so some walls and doors may sit a little differently in game. Check against the drawing above.","Борд нарисован на плане Villa 2F из презентации; он старше текущей (обновлённой) Villa, поэтому часть стен и дверей в игре может стоять чуть иначе. Сверяйтесь со схемой выше."]}
]}
];
SECTIONS.push(...VILLA);
NEWS.unshift(["07 Nov","07 ноя",["Villa: 2F Aviator / Games defence setup with a strat board (deck icons)","Villa: сетап защиты 2F Aviator / Games со страт-бордом (иконки из презентации)"]]);
