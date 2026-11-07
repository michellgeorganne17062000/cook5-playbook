/* ---------- Strat board ---------- */
const PC={dima:"#b8860b",renat:"#0f8f86",roman:"#7a4fd1",nikita:"#c43b3b",sanya:"#2f8a3e"};
const PN={dima:"Dima",renat:"Renat",roman:"Roman",nikita:"Nikita",sanya:"Sanya"};
const GC={CA:"#9a3412",SM:"#78716c",CAM:"#0e7490",RF:"#4b5563",RT:"#0f8f86",FH:"#64748b",HH:"#0369a1",AJ:"#7c3aed",HB:"#dc2626",FL:"#ea580c",TR:"#a16207",PL:"#be123c"};
const R6="img/r6/icons/",OPS=new Set(["ace","alibi","amaru","aruni","azami","bandit","blackbeard","blitz","brava","buck","capitao","castle","caveira","clash","deimos","denari","doc","dokkaebi","echo","ela","fenrir","finka","flores","frost","fuze","glaz","goyo","gridlock","grim","hibana","iana","iq","jackal","jager","kaid","kali","kapkan","lesion","lion","maestro","melusi","mira","montagne","mozzie","mute","nokk","nomad","oryx","osa","pulse","ram","rauora","rook","sens","sentry","skopos","sledge","smoke","solid-snake","solis","striker","tachanka","thatcher","thermite","thorn","thunderbird","tubarao","twitch","valkyrie","vigil","wamai","warden","ying","zero","zofia"]);
const OPF=s=>{if(!s)return null;const k=s.split("/")[0].trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-");return OPS.has(k)?R6+"operators/"+k+".png":null};
const GN=new Set(["active-defense-system","adrenal-surge","airjab-launcher","argus-launcher","armor-pack","armor-panel","banshee-sonic-defense","black-eye","black-mirror","breaching-rounds","breaching-torch","bu-gi-auto-breacher","candela","cce-shield","cluster-charge","deathmark-tracker","ee-one-d","electronics-detector","entry-denial-device","erc-7","evil-eye","eyenox-model-iii","f-natt-dread-mine","flash-shield","flip-sight","garra-hook","gemini-replicator","glance-smart-glasses","grzmot-mine","gu-mines","heartbeat-sensor","kawan-hive-launcher","kiba-barrier","kludge-drone","kona-station","ks79-lifeline","lv-explosive-lance","mag-net-system","pest-launcher","prisma","razorbloom-shell","rce-ratero-charge","remah-dash","remote-gas-grenade","rou-projector-system","rtila-electroclaw","selma-aqua-breacher","shock-wire","shumikha-launcher","signal-disruptor","silent-step","spec-io-electro-sensor","stim-pistol","surya-gate","tactical-crossbow","talon-8-clear-shield","volcan-shield","welcome-mat","zoto-canister"]),UN=new Set(["barbed-wire","barricade","breach-charge","bulletproof-camera","claymore","deployable-shield","frag-grenade","hard-breach-charge","impact-emp-grenade","impact-grenade","observation-blocker","proximity-alarm","rappel","smoke-grenade","stun-grenade"]);
/* deck gadget icon by name ("kiba-barrier", "barbed-wire"…) */
const GSRC=n=>GN.has(n)?R6+"gadgets/"+n+".png":UN.has(n)?R6+"utility/"+n+".png":null;
const GI={HB:"hard-breach-charge",FL:"tactical-crossbow",CA:"armor-panel",CAM:"bulletproof-camera",SM:"smoke-grenade",AJ:"airjab-launcher",
  BW:"barbed-wire",DS:"deployable-shield",PA:"proximity-alarm",CL:"claymore",BC:"breach-charge",IG:"impact-grenade",EMP:"impact-emp-grenade",FR:"frag-grenade",ST:"stun-grenade",OB:"observation-blocker"};
const TRAPG={thorn:"razorbloom-shell",fenrir:"f-natt-dread-mine",kapkan:"entry-denial-device",frost:"welcome-mat",lesion:"gu-mines",ela:"grzmot-mine",melusi:"banshee-sonic-defense"};
const TRAPPERS=Object.keys(TRAPG);
function gIcon(i){if(GI[i.t])return{src:GSRC(GI[i.t]),op:0};
  if(i.t&&i.t[0]==="@"){const s=GSRC(i.t.slice(1));return s?{src:s,op:0}:null}
  if(i.t==="TR"){const own=o=>o&&TRAPG[o.split("/")[0].trim().toLowerCase()];let g=own(i.l);
    if(!g){const tk=cur.items.find(x=>x.k==="tok"&&x.op&&x.op.toLowerCase().split("/").some(o=>TRAPPERS.includes(o.trim())));
      if(tk)g=TRAPG[tk.op.toLowerCase().split("/").map(o=>o.trim()).find(o=>TRAPPERS.includes(o))]}
    return g?{src:GSRC(g),op:0}:null}
  return null}
/* electrified walls: Bandit's shock wire, or Kaid's claw if only Kaid is in the strat */
const ELEC=()=>{const ops=cur.items.filter(x=>x.k==="tok"&&x.op).map(x=>x.op.toLowerCase());return GSRC(ops.some(o=>o.includes("bandit"))||!ops.some(o=>o.includes("kaid"))?"shock-wire":"rtila-electroclaw")};
const FLOORS={t:{label:"2F",img:"img/fp-top.png",w:2200,h:1651,vb:[430,100,1290,1460]},
              g:{label:"1F",img:"img/fp-ground.png",w:2200,h:1651,vb:[460,80,1370,1490]},
              b:{label:"Basement",img:"img/fp-base.png",w:2203,h:1638,vb:[410,350,1320,1080]}};
const YEL={"t":[[1515,518,54,6],[1576,518,55,6],[1197,743,59,6],[1265,743,58,6],[1441,772,5,67],[1055,862,45,46],[1162,862,6,54],[751,897,6,59],[1162,923,6,55],[1613,924,45,46],[751,962,6,58],[945,1122,6,46],[945,1177,6,46],[788,1228,46,6],[841,1228,45,6],[894,1228,45,6],[1242,1261,6,54],[1242,1325,6,54]],"g":[[1433,475,50,6],[1495,475,50,6],[1617,632,41,6],[1667,632,41,6],[1323,698,59,6],[752,787,45,46],[1295,795,6,24],[1295,822,6,23],[1047,839,46,46],[778,898,86,6],[869,898,85,6],[1578,908,6,41],[1610,923,45,46],[1578,958,6,42],[1308,1028,46,46],[1007,1041,59,6],[920,1062,6,41],[920,1108,6,41],[772,1254,46,46],[756,1391,77,6],[838,1391,76,6]],"b":[[557,494,55,55],[925,507,6,57],[925,573,6,56],[1242,645,6,59],[653,690,86,6],[744,690,85,6],[832,699,6,55],[1242,709,6,59],[832,762,6,54],[1332,852,54,55],[843,975,54,6],[905,975,55,6],[978,1041,58,6],[1043,1041,59,6],[601,1132,45,46],[755,1183,59,6],[645,1372,89,6],[940,1372,96,6],[1044,1372,96,6]]};
const T=(f,ph,who,op,x,y)=>({k:"tok",f,ph,who,op,x,y});
const G=(f,ph,t,x,y,l)=>({k:"g",f,ph,t,x,y,l});
const A=(f,ph,who,pts,dash)=>({k:"arr",f,ph,who,pts,dash});
const S=(f,x,y,l)=>({k:"site",f,ph:1,x,y,l});
const L=(f,ph,pts)=>({k:"line",f,ph,pts});
const X=(f,ph,x,y,s)=>({k:"txt",f,ph,x,y,s});
const STRATS=[
 {id:"ccA",name:"CC / Servers — A",side:"d",floor:"t",phases:["Setup: reinforce, wall denial on IT, everyone in their layer","~1:30: fall back into CC / Servers, pocket-reinforce, play trades"],items:[
  S("t",800,1195,"CC"),G("g",1,"CA",805,705,"bottom Aqua door"),S("t",1090,1195,"Servers"),
  G("t",1,"RF",1245,1285),G("t",1,"RF",1245,1350),X("t",1,1275,1325,"IT walls"),
  G("t",1,"RF",815,1232),G("t",1,"RF",865,1232),G("t",1,"RT",915,1232),G("t",1,"RF",947,1145),G("t",1,"HH",947,1197),
  G("t",1,"RF",754,926),G("t",1,"FH",754,991),
  G("t",1,"RF",1225,745),G("t",1,"RF",1290,745),
  G("t",1,"RT",1165,889),G("t",1,"RF",1165,950),
  T("t",1,"nikita","Warden",700,890),T("t",1,"renat","Azami",700,1390),T("t",1,"roman","Mute",1335,1110),T("t",1,"dima","Bandit",1100,1345),T("t",1,"sanya","Tubarão",1300,880),
  A("t",2,"nikita",[[700,890],[800,945]],1),A("t",2,"renat",[[700,1390],[915,1260],[845,1075]],1),A("t",2,"roman",[[1335,1110],[1250,1100],[1180,1085]],1),A("t",2,"dima",[[1100,1345],[985,1250],[1000,1090]],1),A("t",2,"sanya",[[1300,880],[1167,870],[1060,915]],1),
  T("t",2,"nikita","Warden",800,945),T("t",2,"renat","Azami",845,1075),T("t",2,"roman","Mute",1180,1085),T("t",2,"dima","Bandit",1000,1090),T("t",2,"sanya","Tubarão",1060,915)]},
 {id:"ccB",name:"CC / Servers — B",side:"d",floor:"t",phases:["Setup: Connector elbow hold, Warden long angles from catwalk","Roman falls back and reinforces the reserve wall; Dima flexes to crossfires"],items:[
  S("t",800,1195,"CC"),S("t",1090,1195,"Servers"),
  G("t",1,"RF",815,1232),G("t",1,"RF",865,1232),G("t",1,"RF",1245,1285),G("t",1,"RF",1245,1350),
  G("t",1,"HH",947,1145),G("t",1,"HH",947,1197),G("t",1,"RF",1225,745),G("t",1,"RF",1290,745),G("t",1,"RF",1165,889),
  G("t",1,"TR",1240,960),G("t",1,"TR",1445,1110),
  T("t",1,"roman","Smoke",1245,870),T("t",1,"sanya","Fenrir",1345,1110),T("t",1,"dima","Kaid",1060,1050),T("t",1,"nikita","Warden",700,1275),T("t",1,"renat","Wamai",700,880),
  A("t",2,"roman",[[1245,870],[1167,945],[1090,960]],1),G("t",2,"RF",1167,945,"reserve"),T("t",2,"roman","Smoke",1090,960),
  A("t",2,"dima",[[1060,1050],[1160,1000]])]},
 {id:"bD1",name:"Basement 1",side:"d",floor:"b",phases:["Option 1 — attackers left Kaid and Bandit open: Nikita Bandit + Sanya Kaid deny the outside walls; Dima holds Vending Stairs; Renat (Solis) plays the Storage floor holes; Roman (Fenrir) traps Cargo / fork"],items:[
  S("b",594,953,"Tank"),S("b",1050,1170,"Assembly"),
  G("b",1,"RFE",988,1375),G("b",1,"RFE",1092,1375),G("b",1,"RFE",690,1375),G("b",1,"FH",784,1186),
  G("b",1,"RF",1007,1044),G("b",1,"RT",1072,1044),G("b",1,"HH",870,978),G("b",1,"FH",1245,675),G("b",1,"RF",1245,738),G("b",1,"RF",585,520,"hatch"),G("b",1,"RFE",620,1155,"hatch"),
  G("b",1,"FH",696,693),G("b",1,"HH",786,693),G("b",1,"HH",835,727),G("b",1,"FH",928,535),G("b",1,"FH",928,601),G("b",1,"RFE",1359,880,"hatch"),G("b",1,"TR",1625,898,"Thorn"),G("g",1,"TR",1520,1105,"Thorn"),
  G("g",1,"TR",540,745),G("g",1,"TR",645,1365),G("g",1,"RF",1331,1051,"hatch"),G("g",1,"RF",795,1277,"hatch"),G("g",1,"RT",821,901),G("g",1,"RT",911,901),G("g",1,"RT",923,1128),G("g",1,"CAM",1100,742,"BP cam"),
  L("g",1,[[1126,1209],[1194,1209]]),L("g",1,[[1140,1293],[1190,1293]]),L("g",1,[[1142,1374],[1194,1374]]),L("g",1,[[1310,1086],[1310,1150]]),X("g",1,1210,1255,"floor holes"),
  T("b",1,"nikita","Bandit",1060,1245),T("b",1,"sanya","Kaid",690,1255),T("b",1,"dima","Thorn / Goyo",1475,780),
  T("g",1,"renat","Solis",1030,1160),T("g",1,"roman","Fenrir",900,800)]},
 {id:"bD3",name:"Basement 3",side:"d",floor:"b",phases:["Option 3 (W7M 2-2-1 roam): two on 2F, two on 1F, the site player in Exo. Animus wall left soft and both doors castled into a killbox; Castle on the 90 window splits the map","Late: Nikita (Warden) stops plants through the Storage holes; Roman drops the hatch to help; Sanya falls from Exo into site"],items:[
  
  S("b",594,953,"Tank"),S("b",1050,1170,"Assembly"),
  G("b",1,"RF",988,1375),G("b",1,"RF",1092,1375),G("b",1,"FH",784,1186),
  G("b",1,"RF",1007,1044),G("b",1,"RT",1072,1044),G("b",1,"HH",870,978),G("b",1,"FH",1245,675),G("b",1,"RF",1245,738),G("b",1,"RF",585,520,"hatch"),X("b",1,560,1160,"hatch open"),
  G("b",1,"FH",696,693),G("b",1,"HH",786,693),G("b",1,"HH",835,727),G("b",1,"FH",928,535),G("b",1,"FH",928,601),G("b",1,"RF",1359,880,"hatch"),G("b",1,"TR",1625,898,"Thorn"),G("g",1,"TR",1520,1105,"Thorn"),
  G("g",1,"TR",540,745),G("g",1,"TR",645,1365),G("g",1,"RF",1331,1051,"hatch"),G("g",1,"RF",795,1277,"hatch"),G("g",1,"RF",795,1395),G("g",1,"RF",875,1395),X("g",1,700,1455,"garage walls (double)"),G("g",1,"CA",1185,770,"90 window"),G("g",1,"RT",821,901),G("g",1,"RT",911,901),G("g",1,"RT",923,1128),G("g",1,"CAM",1100,742,"BP cam"),
  L("g",1,[[1126,1209],[1194,1209]]),L("g",1,[[1140,1293],[1190,1293]]),L("g",1,[[1142,1374],[1194,1374]]),L("g",1,[[1310,1086],[1310,1150]]),X("g",1,1210,1255,"floor holes"),
G("b",1,"CA",760,1095,"Animus door"),G("b",1,"CA",700,1010),X("b",1,560,1420,"Animus wall left soft = killbox"),
  T("b",1,"sanya","Smoke",1420,600),
  T("g",1,"nikita","Warden",1030,1160),T("g",1,"dima","Castle",770,1030),
  T("t",1,"renat","Azami",700,1390),T("t",1,"roman","Lesion",1330,1110),
  A("b",2,"sanya",[[1420,600],[1180,980],[1050,1150]],1),T("b",2,"sanya","Smoke",1050,1150),
  A("t",2,"roman",[[1330,1110],[1077,910]],1),X("t",2,1095,880,"drops hatch")]},
 {id:"bD2",name:"Basement 2",side:"d",floor:"b",phases:["Option 2 — Kaid or Bandit banned: Nikita plays whichever is left; Sanya (Mute) jams the Animus wall and drones; Renat (Warden) holds the Storage floor holes"],items:[
  S("b",594,953,"Tank"),S("b",1050,1170,"Assembly"),
  G("b",1,"RFE",988,1375),G("b",1,"RFE",1092,1375),G("b",1,"RF",690,1375),G("b",1,"FH",784,1186),
  G("b",1,"RF",1007,1044),G("b",1,"RT",1072,1044),G("b",1,"HH",870,978),G("b",1,"FH",1245,675),G("b",1,"RF",1245,738),G("b",1,"RF",585,520,"hatch"),G("b",1,"RF",620,1155,"hatch"),
  G("b",1,"FH",696,693),G("b",1,"HH",786,693),G("b",1,"HH",835,727),G("b",1,"FH",928,535),G("b",1,"FH",928,601),G("b",1,"RF",1359,880,"hatch"),G("b",1,"TR",1625,898,"Thorn"),G("g",1,"TR",1520,1105,"Thorn"),
  G("g",1,"TR",540,745),G("g",1,"TR",645,1365),G("g",1,"RF",1331,1051,"hatch"),G("g",1,"RF",795,1277,"hatch"),G("g",1,"RT",821,901),G("g",1,"RT",911,901),G("g",1,"RT",923,1128),G("g",1,"CAM",1100,742,"BP cam"),
  L("g",1,[[1126,1209],[1194,1209]]),L("g",1,[[1140,1293],[1190,1293]]),L("g",1,[[1142,1374],[1194,1374]]),L("g",1,[[1310,1086],[1310,1150]]),X("g",1,1210,1255,"floor holes"),
  T("b",1,"nikita","Kaid / Bandit",1060,1245),T("b",1,"sanya","Mute",690,1255),T("b",1,"dima","Thorn / Goyo",1475,780),
  T("g",1,"renat","Warden",1030,1160),T("g",1,"roman","Fenrir",900,800)]},
 {id:"sD",name:"Storage / Control",side:"d",floor:"g",phases:["Setup: top floor held like CC; Sanya + Roman on site; vert holes from Servers onto Storage","~1:30: top players fall to 1F; Renat takes the Tetris angle on the storage window"],items:[
  S("g",1062,1340,"Storage"),S("g",690,1110,"Control"),
  G("g",1,"RF",795,1395),G("g",1,"RF",875,1395),X("g",1,700,1455,"outside Garage walls"),
  G("g",1,"RF",820,900),G("g",1,"RT",910,900),
  G("g",1,"RT",923,1080),G("g",1,"HH",923,1130),
  G("g",1,"HH",1036,1043),G("g",1,"TR",560,960,"fork"),
  T("g",1,"sanya","Mute",1090,1200),T("g",1,"roman","Lesion",770,1010),
  G("t",1,"RF",1245,1285),G("t",1,"RF",1245,1350),X("t",1,1275,1325,"IT walls"),
  G("t",1,"RF",815,1232),G("t",1,"RF",865,1232),G("t",1,"RT",915,1232),
  G("t",1,"RF",754,926),G("t",1,"FH",754,991),
  G("t",1,"RF",1165,889),G("t",1,"RF",1165,950),X("t",1,1190,1010,"double"),
  G("t",1,"RF",1225,745),G("t",1,"RF",1290,745),
  L("t",1,[[960,1170],[1110,1170]]),X("t",1,930,1215,"vert onto Storage"),
  T("t",1,"nikita","Warden",700,890),T("t",1,"renat","Azami",700,1390),T("t",1,"dima","Bandit",1100,1345),
  A("t",2,"nikita",[[700,890],[790,720]],1),X("t",2,810,700,"down CC Stairs"),
  A("t",2,"renat",[[700,1390],[560,1440]],1),X("t",2,470,1490,"down Warehouse Stairs"),
  A("t",2,"dima",[[1100,1345],[1077,1010],[1077,910]],1),X("t",2,1100,890,"drop hatch"),
  {k:"tok",f:"t",ph:2,who:"nikita",hide:1},{k:"tok",f:"t",ph:2,who:"renat",hide:1},{k:"tok",f:"t",ph:2,who:"dima",hide:1},
  T("g",2,"nikita","Warden",930,800),T("g",2,"renat","Azami",660,1210),T("g",2,"dima","Bandit",1130,1080)]},
 {id:"kD",name:"Kitchen",side:"d",floor:"g",phases:["Setup: Sanya anchors Kitchen, Nikita holds Break, Roman mobile in Games; top floor held from Mezz + Connector","Retake / late: Roman pushes the hall toward Cafeteria; Dima gives vert support from Connector"],items:[
  S("g",1670,560,"Cafeteria"),S("g",1675,870,"Kitchen"),
  G("g",1,"RF",1460,477),G("g",1,"RF",1520,477),X("g",1,1400,440,"Cafe → Lobby walls"),
  G("g",1,"HH",1298,820),
  G("g",1,"FH",1580,950),X("g",1,1600,1060,"knee holes (freezer)"),
  T("g",1,"sanya","Mute",1690,740),T("g",1,"nikita","Warden",1420,1000),T("g",1,"roman","Castle",1110,960),
  G("t",1,"RF",1545,520),G("t",1,"RF",1600,520),X("t",1,1500,485,"Meeting walls"),
  G("t",1,"RF",1225,745),G("t",1,"RF",1290,745),G("t",1,"RF",1165,889),G("t",1,"RF",1165,950),
  T("t",1,"renat","Azami",1395,580),T("t",1,"dima","Bandit",1260,880),
  A("g",2,"roman",[[1110,960],[1050,770],[1150,745]]),T("g",2,"roman","Castle",1150,745),
  A("t",2,"dima",[[1260,880],[1330,820]]),X("t",2,1300,1000,"vert onto site")]},
 {id:"cA",name:"CC attack",side:"a",floor:"t",phases:["DRAFT. Map control: Renat + Roman up Warehouse Stairs into Rafters; Nikita + Dima outside the IT walls; Sanya Airjabs the Connector door and the top of Lobby Stairs","Open: Nikita (Ace) breaches both IT walls; Renat bees IT and the CC hallway; Roman (Zofia) concussions into Servers","Execute IT → Servers: Dima flames the Connector and Ebox doors against retakes; Sanya plants by the IT wall","Post-plant: Nikita + Dima hold from IT, Renat the Rafters / CC side, Roman the catwalk, Sanya the Ebox flank"],items:[
  S("t",800,1195,"CC"),S("t",1090,1195,"Servers"),
  A("t",1,"renat",[[510,1450],[640,1400]]),T("t",1,"renat","Grim",640,1400),T("t",1,"roman","Zofia",800,1440),
  T("t",1,"nikita","Ace",1330,1300),T("t",1,"dima","Capitão",1330,1430),
  T("t",1,"sanya","Nomad",1395,600),G("t",1,"AJ",1300,760),G("t",1,"AJ",1440,440),
  G("t",2,"HB",1245,1285),G("t",2,"HB",1245,1350),
  A("t",2,"renat",[[640,1400],[880,1330]]),T("t",2,"renat","Grim",880,1330),A("t",2,"roman",[[800,1440],[700,1290]]),T("t",2,"roman","Zofia",700,1290),
  A("t",2,"sanya",[[1395,600],[1500,900],[1520,1330]]),T("t",2,"sanya","Nomad",1520,1330),
  A("t",3,"nikita",[[1330,1300],[1150,1320],[1050,1150]]),T("t",3,"nikita","Ace",1050,1100),
  A("t",3,"sanya",[[1520,1330],[1150,1350],[1150,1200]]),T("t",3,"sanya","Nomad",1170,1170),
  A("t",3,"dima",[[1330,1430],[1060,1340]]),T("t",3,"dima","Capitão",1000,1340),
  G("t",3,"FL",1167,905),G("t",3,"FL",1245,1100),G("t",3,"PL",1205,1200),
  T("t",4,"nikita","Ace",1000,1300),T("t",4,"dima","Capitão",1170,1330),T("t",4,"renat","Grim",700,1300),T("t",4,"roman","Zofia",560,1300),T("t",4,"sanya","Nomad",1330,1150)]},
 {id:"sA",name:"Storage attack",side:"a",floor:"t",phases:["DRAFT. Take 2F: Renat + Nikita in through Rafters, Roman + Dima to CC / IT; Sanya Airjabs the bottom of CC Stairs and the Cafeteria hallway on 1F","Open floors: Nikita (Ram) opens the Servers floor over Storage and the CC floor over Control; Roman (Dokkaebi) calls defenders; Renat bees through the holes","Execute: Dima flames the Lounge → Storage door and the Control rotate from above; Sanya + Renat enter 1F Warehouse and plant in Storage","Hold from above through the holes; Renat watches the Warehouse flank"],items:[
  S("t",800,1195,"CC"),S("t",1090,1195,"Servers"),S("g",1062,1340,"Storage"),
  T("t",1,"renat","Grim",640,1400),T("t",1,"nikita","Ram",820,1440),T("t",1,"roman","Dokkaebi",780,1000),T("t",1,"dima","Capitão",1050,1330),T("t",1,"sanya","Nomad",1100,980),
  G("g",1,"AJ",810,690),X("g",1,830,660,"bottom CC Stairs"),G("g",1,"AJ",1180,745),
  L("t",2,[[960,1150],[1120,1150]]),X("t",2,960,1110,"Servers floor over Storage"),L("t",2,[[780,1060],[930,1060]]),X("t",2,640,1120,"CC floor over Control"),
  T("t",2,"nikita","Ram",1170,1000),
  G("g",3,"FL",1036,1043),G("g",3,"FL",923,1080),
  {k:"tok",f:"t",ph:3,who:"sanya",hide:1},{k:"tok",f:"t",ph:3,who:"renat",hide:1},
  A("g",3,"sanya",[[600,1470],[700,1300],[980,1210]]),T("g",3,"sanya","Nomad",980,1210),A("g",3,"renat",[[560,1320],[720,1240]]),T("g",3,"renat","Grim",720,1240),
  G("g",3,"PL",1150,1250),
  T("t",4,"nikita","Ram",1000,1220),T("t",4,"dima","Capitão",1120,1250)]},
 {id:"sA2",name:"Storage attack B",side:"a",floor:"t",phases:["W7M bait and switch. Soft pressure that looks like a top-floor clear: Nikita (Hibana) opens IT, Dima (Ace) opens the garden wall and bottom garage. Roman + Sanya sneak into the basement; Renat lurks in from Lobby","Defenders flow down Aqua to help site. Roman (Sledge) + Sanya (Blackbeard) come up Cargo Stairs; Renat pushes 90; Dima holds the cut from the west window","Through the defenders' Cargo → Control rotate; plant in the tuck spot (usually no vert there). Nikita takes Aqua with Hibana's shotgun","Hold: Sanya shield on her back against Clash; Dima and Renat watch the rotates; Nikita holds Aqua"],items:[
  S("g",690,1110,"Control"),S("g",1062,1340,"Storage"),
  G("t",1,"HB",1245,1288),G("t",1,"HB",1245,1352),T("t",1,"nikita","Hibana",1340,1320),
  G("t",1,"HB",1225,745),G("t",1,"HB",1290,745),T("t",1,"dima","Ace",1260,640),
  G("g",1,"HB",795,1395),G("g",1,"HB",875,1395),X("g",1,700,1455,"Ace: bottom garage"),
  T("g",1,"renat","Deimos",1390,300),X("g",1,1300,240,"lurk from Lobby"),
  T("b",1,"roman","Sledge",620,560),T("b",1,"sanya","Blackbeard",760,560),X("b",1,520,470,"come up through the basement"),
  A("g",2,"renat",[[1390,300],[1250,600],[1210,745]]),T("g",2,"renat","Deimos",1210,745),
  A("g",2,"roman",[[790,700],[740,800]]),T("g",2,"roman","Sledge",740,820),A("g",2,"sanya",[[840,700],[975,800]]),T("g",2,"sanya","Blackbeard",975,820),
  T("g",2,"dima","Ace",520,760),X("g",2,500,700,"holds the cut"),
  G("g",2,"RT",821,901),G("g",2,"RT",911,901),
  A("g",3,"sanya",[[975,820],[911,901],[890,980]]),T("g",3,"sanya","Blackbeard",890,1000),G("g",3,"PL",880,940),X("g",3,910,960,"tuck spot"),
  A("g",3,"roman",[[740,820],[821,901],[710,960]]),T("g",3,"roman","Sledge",690,975),
  A("t",3,"nikita",[[1340,1320],[1100,1330],[880,1300],[700,950]]),T("t",3,"nikita","Hibana",700,950),X("t",3,720,1010,"takes Aqua"),
  T("g",4,"renat","Deimos",1100,950)]},
 {id:"kA",name:"Kitchen attack",side:"a",floor:"g",phases:["DRAFT. Map control: Renat + Nikita take Lobby and Mezz on 2F; Roman comes up Vending Stairs from the basement; Sanya Airjabs the Cafeteria hallway","Open: Nikita (Ram) opens the Meeting floor over Cafeteria; Renat bees down the holes; Roman pressures Break / Vending","Execute: Dima flames the Pantry and Cafeteria doors; Sanya plants by the kitchen window","Hold: Nikita + Renat on the holes, Roman on Vending, Dima outside the kitchen window"],items:[
  S("g",1670,560,"Cafeteria"),S("g",1675,870,"Kitchen"),
  A("g",1,"roman",[[1520,1170],[1420,1060]]),T("g",1,"roman","Solid Snake",1400,1050),T("g",1,"sanya","Nomad",1100,740),G("g",1,"AJ",1250,745),
  T("g",1,"dima","Capitão",1740,1070),
  T("t",1,"renat","Grim",1395,420),T("t",1,"nikita","Ram",1395,620),
  L("t",2,[[1470,600],[1620,600]]),L("t",2,[[1470,760],[1620,760]]),X("t",2,1470,700,"Meeting floor over Cafeteria"),
  T("t",2,"nikita","Ram",1540,680),T("t",2,"renat","Grim",1380,560),
  G("g",3,"FL",1580,950),G("g",3,"FL",1420,700),
  A("g",3,"sanya",[[1100,740],[1250,745],[1450,740],[1720,760]]),T("g",3,"sanya","Nomad",1720,760),G("g",3,"PL",1770,680),
  T("g",4,"dima","Capitão",1740,1070)]},
 {id:"cA2",name:"CC attack B",side:"a",floor:"t",phases:["From the video. Map control from the north-east: enter through Meeting Room and the top of Lobby Stairs, take Connector and Electrical. Dima leaves flank drones near the stairs","Open: Nikita (Thermite) opens the Servers–Connector wall, or the team plants behind Stacks; Roman (Buck) opens soft walls/floor; Sanya smokes the two doorways into Servers","Cut the rotate from Rafters: Renat opens the IT outside wall (if it is denied, open it from 1F below with nades); Sanya plants behind Stacks","Post-plant: Renat + Dima float on the IT breach and the Rafters window; Nikita + Roman hold Connector and Electrical"],items:[
  S("t",800,1195,"CC"),S("t",1090,1195,"Servers"),
  T("t",1,"nikita","Thermite",1400,440),T("t",1,"sanya","Smokes op",1540,620),T("t",1,"roman","Buck",1560,770),T("t",1,"renat","Zofia",1395,640),T("t",1,"dima","Twitch",1480,330),X("t",1,1360,290,"flank drone on stairs"),
  A("t",2,"renat",[[1395,640],[1310,790]]),T("t",2,"renat","Zofia",1310,790),A("t",2,"roman",[[1560,770],[1400,1100]]),T("t",2,"roman","Buck",1380,1120),
  A("t",2,"nikita",[[1400,440],[1395,700],[1250,960]]),T("t",2,"nikita","Thermite",1250,960),G("t",2,"HB",1165,889),G("t",2,"HB",1165,950),
  A("t",2,"sanya",[[1540,620],[1400,950]]),T("t",2,"sanya","Smokes op",1400,950),G("t",2,"SM",1200,1040),G("t",2,"SM",1245,1150),
  G("t",3,"HB",1245,1288),G("t",3,"HB",1245,1352),A("t",3,"renat",[[1310,790],[1520,1000],[1330,1300]]),T("t",3,"renat","Zofia",1330,1300),
  A("t",3,"dima",[[1480,330],[1690,500],[1690,1350],[1360,1430]]),T("t",3,"dima","Twitch",1360,1430),
  A("t",3,"sanya",[[1400,950],[1190,920],[1020,960]]),T("t",3,"sanya","Smokes op",1020,960),G("t",3,"PL",1000,890),X("t",3,1035,880,"behind Stacks"),
  T("t",4,"renat","Zofia",1300,1330),T("t",4,"dima","Twitch",900,1450)]},
 {id:"kA2",name:"Kitchen attack B",side:"a",floor:"t",phases:["From the video. Take the top of Lobby Stairs and Meeting Room on 2F; Sanya waits outside the kitchen window; flank drones near Warehouse crates and Vending","Two soft breachers (Nikita, Roman) open the Meeting / Meeting Hall floor over Cafeteria; Renat and Dima clear and hold through the holes","Sanya opens the kitchen window and plants by the counter while the team holds vertical","Post-plant: hold vertical on both Cafeteria doors and the kitchen counter so no one reaches the defuser"],items:[
  S("g",1670,560,"Cafeteria"),S("g",1675,870,"Kitchen"),
  T("t",1,"nikita","Sledge",1400,420),T("t",1,"roman","Buck",1560,640),T("t",1,"renat","Grim",1395,620),T("t",1,"dima","Twitch",1490,330),
  T("g",1,"sanya","Nomad",1745,1075),X("g",1,1540,1160,"outside kitchen window"),
  L("t",2,[[1360,600],[1430,600]]),L("t",2,[[1360,760],[1430,760]]),L("t",2,[[1470,600],[1620,600]]),L("t",2,[[1470,760],[1620,760]]),X("t",2,1470,570,"floor over Cafeteria"),
  T("t",2,"nikita","Sledge",1395,520),T("t",2,"roman","Buck",1545,690),T("t",2,"renat","Grim",1390,830),
  A("g",3,"sanya",[[1745,1075],[1780,800],[1700,730]]),T("g",3,"sanya","Nomad",1700,730),G("g",3,"PL",1630,720),
  X("g",4,1330,650,"vert holds both Cafe doors + counter")]},
 {id:"cA3",name:"CC attack C",side:"a",floor:"t",phases:["Garage take, as described in the W7M video. Soft pressure: Nikita (Hibana) opens the IT wall, Dima (Ace) opens the garden wall; Renat + Sanya hop into top garage (Rafters) through the window; Roman (Buck) goes under on 1F","Take top garage. Roman shoots the floor from 1F under the garage → site rotate so defenders can't fall back that way; Nikita enters IT","Take Aqua to sandwich the site: Renat + Sanya push CC Hall / Aqua, Nikita pressures from IT, Dima from Meeting. Plant in CC on the hard wall","Post-plant: Renat on Aqua, Sanya in CC, Nikita + Dima hold IT and Servers"],items:[
  S("t",800,1195,"CC"),S("t",1090,1195,"Servers"),
  G("t",1,"HB",1245,1288),G("t",1,"HB",1245,1352),T("t",1,"nikita","Hibana",1340,1320),
  G("t",1,"HB",1225,745),G("t",1,"HB",1290,745),T("t",1,"dima","Ace",1260,640),
  A("t",1,"renat",[[450,1440],[600,1420]]),T("t",1,"renat","Blackbeard",600,1420),A("t",1,"sanya",[[450,1480],[760,1460]]),T("t",1,"sanya","Montagne",760,1460),
  T("g",1,"roman","Buck",820,1260),X("g",1,700,1210,"under top garage"),
  L("t",2,[[900,1300],[900,1420]]),X("t",2,880,1475,"Buck vert from 1F"),
  A("t",2,"nikita",[[1340,1320],[1100,1330]]),T("t",2,"nikita","Hibana",1100,1330),A("t",2,"renat",[[600,1420],[850,1300]]),T("t",2,"renat","Blackbeard",850,1300),
  A("t",2,"dima",[[1260,640],[1395,700]]),T("t",2,"dima","Ace",1395,700),
  A("t",3,"renat",[[850,1300],[700,1120],[700,900]]),T("t",3,"renat","Blackbeard",700,900),A("t",3,"sanya",[[760,1460],[880,1260],[860,1010]]),T("t",3,"sanya","Montagne",860,1000),
  A("t",3,"nikita",[[1100,1330],[1080,1050]]),T("t",3,"nikita","Hibana",1080,1040),A("t",3,"dima",[[1395,700],[1250,900]]),T("t",3,"dima","Ace",1250,900),G("t",3,"PL",780,1110),
  T("t",4,"dima","Ace",1180,1240)]},
 {id:"kA3",name:"Kitchen attack C",side:"a",floor:"g",phases:["Direct Lobby take, as described in the W7M video. Dima (Ace) opens the garden wall on 2F so nobody can help the Meeting side; Renat takes top of Lobby Stairs","Sanya + Roman take lower Lobby through the windows; Renat flashes (Ying) the Lobby Stairs player; clear Harry Potter","Nikita (Thermite) opens the Cafe → Lobby wall; Sanya plants in Cafeteria while Roman makes vert from Meeting","Hold Lobby, the opened wall and the vert holes"],items:[
  S("g",1670,560,"Cafeteria"),S("g",1675,870,"Kitchen"),
  G("t",1,"HB",1225,745),G("t",1,"HB",1290,745),T("t",1,"dima","Ace",1260,640),T("t",1,"renat","Ying",1400,420),
  T("g",1,"sanya","Montagne",1300,160),T("g",1,"roman","Buck",1500,160),T("g",1,"nikita","Thermite",1630,420),X("g",1,1300,100,"outside Lobby windows"),
  A("g",2,"sanya",[[1300,160],[1300,450]]),T("g",2,"sanya","Montagne",1300,450),A("g",2,"roman",[[1500,160],[1440,240]]),T("g",2,"roman","Buck",1440,240),X("g",2,1340,580,"clear Harry Potter"),
  G("g",3,"HB",1460,477),G("g",3,"HB",1520,477),A("g",3,"nikita",[[1630,420],[1580,370]]),T("g",3,"nikita","Thermite",1580,360),
  A("g",3,"sanya",[[1300,450],[1490,500],[1480,620]]),T("g",3,"sanya","Montagne",1430,660),G("g",3,"PL",1500,620),
  L("t",3,[[1470,600],[1620,600]]),T("t",3,"roman","Buck",1540,690),{k:"tok",f:"g",ph:3,who:"roman",hide:1}]},
 {id:"bA",name:"Basement — attack",side:"a",floor:"g",phases:["Entry: Roman scans; Sanya in through the Rafters window, Airjabs on IT, Storage and Cargo doors","Dima hard-breaches both hatches; Nikita cuts 3 lines in the Control floor; Roman goes down Cargo stairs","Drone the drop. Renat flames both Tank doors; Sanya drops through the Animus hatch and tuck-plants","Hold: Renat + Nikita on the holes, Roman on Cargo stairs, Dima on the hatch / flank"],items:[
  A("t",1,"sanya",[[380,1430],[620,1400],[975,1265]]),G("t",1,"AJ",985,1238),A("t",1,"sanya",[[975,1265],[560,1450]],1),T("t",1,"sanya","Nomad",620,1400),
  T("g",1,"roman","Solid Snake",440,900),A("g",1,"sanya",[[560,1330],[900,1250],[1190,1130]]),G("g",1,"AJ",1203,1120),G("g",1,"AJ",985,760),T("g",1,"sanya","Nomad",900,1250),
  T("g",2,"dima","Grim",840,1330),G("g",2,"HB",795,1285,"hatch"),G("g",2,"HB",775,820,"hatch"),
  T("g",2,"nikita","Sledge / Buck",720,1050),L("g",2,[[650,925],[650,1160]]),L("g",2,[[770,925],[770,1160]]),L("g",2,[[885,925],[885,1160]]),
  T("g",2,"renat","Capitão",880,1030),T("g",2,"roman","Solid Snake",440,900,),
  A("b",2,"roman",[[700,420],[690,600]]),T("b",2,"roman","Solid Snake",690,610),S("b",520,955,"Tank"),
  {k:"tok",f:"g",ph:3,who:"sanya",hide:1},G("b",3,"FL",525,810),G("b",3,"FL",737,1050),A("b",3,"sanya",[[620,1155],[480,1060]]),T("b",3,"sanya","Nomad",620,1185),G("b",3,"PL",470,1060),
  {k:"tok",f:"g",ph:2,who:"roman",hide:1},
  T("g",4,"dima","Grim",800,1250)]}
];
const SLOTS={d:[["CC / Servers A","ccA"],["CC / Servers B","ccB"],["Basement · opt 1","bD1"],["Basement · opt 2","bD2"],["Storage / Control","sD"],["Kitchen","kD"]],
             a:[["CC / Servers","cA"],["Basement","bA"],["Storage / Control","sA"],["Kitchen","kA"]]};
let cur=STRATS[0],floor=cur.floor,phase=1,pos={};
try{pos=JSON.parse(localStorage.getItem("d8pos")||"{}")}catch(e){pos={}}
const tr=s=>(window.LANG==="ru"&&BOARD_RU[s])||s;const SITEW=()=>window.LANG==="ru"?"ТОЧКА":"SITE";
const TS=()=>{const w=svg.getBoundingClientRect().width||800;return w<520?1.45:w<760?1.2:1};
const svg=document.getElementById("bsvg"),NS="http://www.w3.org/2000/svg";
const el=(n,a,p)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
function visible(){
  const it=cur.items.filter(i=>i.f===floor&&i.ph<=phase);
  const toks={};it.filter(i=>i.k==="tok").forEach(i=>{const prev=toks[i.who];if(!prev||i.ph>=prev.ph)toks[i.who]=i});
  return {other:it.filter(i=>i.k!=="tok"&&!(i.k==="arr"&&i.ph<phase-1)),toks:Object.values(toks).filter(t=>!t.hide)};
}
function draw(){
  const F=FLOORS[floor];svg.setAttribute("viewBox",F.vb.join(" "));svg.innerHTML="";
  const defs=el("defs",{},svg);
  Object.entries(PC).forEach(([k,c])=>{const m=el("marker",{id:"ah-"+k,viewBox:"0 0 10 10",refX:"7",refY:"5",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse"},defs);el("path",{d:"M0,0 L10,5 L0,10 z",fill:c},m)});
  const cp=el("clipPath",{id:"tokclip"},defs);el("circle",{r:27},cp);
  el("image",{href:F.img,x:0,y:0,width:F.w,height:F.h},svg);
  if(F.mask!==false)el("rect",{x:0,y:0,width:900,height:250,fill:"#fff"},svg);
  const {other,toks}=visible();
  other.filter(i=>i.k==="line").forEach(i=>el("polyline",{points:i.pts.join(" "),fill:"none",stroke:"#dc2626","stroke-width":10,"stroke-dasharray":"4 10","stroke-linecap":"round"},svg));
  other.filter(i=>i.k==="site").forEach(i=>{const sw=(SITEW()+" · "+i.l).length*15+30;el("rect",{x:i.x-sw/2,y:i.y-26,width:sw,height:52,rx:10,fill:"#2563eb",opacity:.9},svg);const t=el("text",{x:i.x,y:i.y+10,"text-anchor":"middle",fill:"#fff","font-size":30,"font-weight":700,"font-family":"Barlow Condensed,Arial Narrow,sans-serif"},svg);t.textContent=SITEW()+" · "+i.l});
  other.filter(i=>i.k==="arr").forEach(i=>el("polyline",{points:i.pts.join(" "),fill:"none",stroke:PC[i.who],"stroke-width":9,"stroke-linejoin":"round","stroke-dasharray":i.dash?"22 14":"none","marker-end":`url(#ah-${i.who})`,opacity:.9},svg));
  other.filter(i=>i.k==="g").forEach(i=>{const g=el("g",{},svg);
    /* deck icons for walls, holes and the plant (Stream Strats template) */
    const DK=(src,x,y,w,h,rot,tile)=>{const q=el("g",{transform:`translate(${x},${y})${rot?" rotate(90)":""}`},g);
      if(tile)el("rect",{x:-w/2-3,y:-h/2-3,width:w+6,height:h+6,rx:6,fill:"#fff",stroke:"#9ca3af","stroke-width":1.5},q);
      el("image",{href:src,x:-w/2,y:-h/2,width:w,height:h,preserveAspectRatio:"xMidYMid meet"},q)};
    const RFI=R6+"utility/reinforcement.png",HOLE=R6+"markers/hole.png";
    if(i.t==="RF"||i.t==="RFE"){let LY=48;
      let best=null,bd=1e9;(YEL[floor]||[]).forEach(r=>{const cx=Math.max(r[0],Math.min(i.x,r[0]+r[2])),cy=Math.max(r[1],Math.min(i.y,r[1]+r[3]));const d=Math.hypot(cx-i.x,cy-i.y);if(d<bd){bd=d;best=r}});
      let cx=i.x,cy=i.y,sz=40,rot=false;
      if(best&&bd<45){const hatch=best[2]>30&&best[3]>30;cx=best[0]+best[2]/2;cy=best[1]+best[3]/2;
        if(hatch)sz=Math.max(best[2],best[3])+6;else{rot=best[3]>best[2];sz=Math.min(46,Math.max(best[2],best[3])+6)}}
      DK(RFI,cx,cy,sz,sz,rot,true);var bx=cx+sz/2,by=cy-sz/2;
      if(i.t==="RFE"){el("circle",{cx:bx+6,cy:by-6,r:17,fill:"#facc15",stroke:"#111","stroke-width":2},g);el("image",{href:ELEC(),x:bx-6,y:by-18,width:24,height:24,preserveAspectRatio:"xMidYMid meet"},g)}
      if(i.l){const s2=el("text",{x:i.x,y:i.y+LY,"text-anchor":"middle",fill:"#111","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}
      return}
    if(i.t==="RV"||i.t==="RH"){const LY=40;DK(RFI,i.x,i.y,44,44,i.t==="RV",true);if(i.l){const s2=el("text",{x:i.x,y:i.y+LY,"text-anchor":"middle",fill:"#111","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}return}
    if(i.t==="HV"||i.t==="HH2"||i.t==="HS"||i.t==="RT"){const sm=i.t==="HS",LY=sm?30:i.t==="HV"?46:34;
      DK(HOLE,i.x,i.y,sm?34:58,sm?24:41,i.t==="HV",false);if(i.l){const s2=el("text",{x:i.x,y:i.y+LY,"text-anchor":"middle",fill:"#111","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}return}
    if(i.t==="HH"||i.t==="FH"){const LY=40;DK(R6+"markers/"+(i.t==="HH"?"head-hole":"feet-hole")+".png",i.x,i.y,34,34,false,true);if(i.l){const s2=el("text",{x:i.x,y:i.y+LY,"text-anchor":"middle",fill:"#111","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}return}
    if(i.t==="DR"||i.t==="SB"){const LY=40;DK(R6+"markers/"+(i.t==="DR"?"drop":"breach")+".png",i.x,i.y,40,40,false,i.t==="DR");if(i.l){const s2=el("text",{x:i.x,y:i.y+LY,"text-anchor":"middle",fill:"#111","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}return}
    if(i.t==="IC"){const [src,lab]=i.l.split("|");
      el("rect",{x:i.x-24,y:i.y-24,width:48,height:48,rx:8,fill:"#fff",stroke:i.c||"#111","stroke-width":4},g);
      el("image",{href:R6+src,x:i.x-19,y:i.y-19,width:38,height:38,preserveAspectRatio:"xMidYMid meet"},g);
      if(lab){const s2=el("text",{x:i.x,y:i.y+44,"text-anchor":"middle",fill:"#111","font-size":19,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(lab)}
      return}
    if(i.t==="PL"){const LY=46;el("rect",{x:i.x-27,y:i.y-27,width:54,height:54,rx:8,fill:"#b45309",stroke:"#facc15","stroke-width":4},g);
      el("image",{href:R6+"utility/defuser.png",x:i.x-24,y:i.y-24,width:48,height:48,preserveAspectRatio:"xMidYMid slice"},g);if(i.l){const s2=el("text",{x:i.x,y:i.y+LY,"text-anchor":"middle",fill:"#111","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}
      return}
    const ic=gIcon(i);
    if(ic){el("rect",{x:i.x-31,y:i.y-31,width:62,height:62,rx:10,fill:"#fff",stroke:GC[i.t]||"#111","stroke-width":5},g);
      el("image",{href:ic.src,x:i.x-(ic.op?27:24),y:i.y-(ic.op?27:24),width:ic.op?54:48,height:ic.op?54:48,preserveAspectRatio:"xMidYMid meet"},g);
      if(i.l&&!(i.t==="TR"&&OPF(i.l))){const s2=el("text",{x:i.x,y:i.y+56,"text-anchor":"middle",fill:"#111","font-size":22,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}
      return}
    const EMO={FL:"🔥",CAM:"📷",SM:"💨"};
    if(EMO[i.t]){const e=el("text",{x:i.x,y:i.y+12,"text-anchor":"middle","font-size":34},g);e.textContent=EMO[i.t];
      if(i.l){const s2=el("text",{x:i.x,y:i.y+46,"text-anchor":"middle",fill:"#111","font-size":22,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}
      return}
    const tt=i.t;el("rect",{x:i.x-27,y:i.y-19,width:54,height:38,rx:8,fill:GC[tt],stroke:"#fff","stroke-width":3},g);const t=el("text",{x:i.x,y:i.y+9,"text-anchor":"middle",fill:"#fff","font-size":24,"font-weight":700,"font-family":"JetBrains Mono,monospace"},g);t.textContent=tt;
    if(i.l){const s2=el("text",{x:i.x,y:i.y+46,"text-anchor":"middle",fill:"#111","font-size":22,"font-weight":600,"font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},g);s2.textContent=tr(i.l)}});
  other.filter(i=>i.k==="txt").forEach(i=>{const t=el("text",{x:i.x,y:i.y,fill:"#111","font-size":24,"font-style":"italic","font-family":"Source Sans 3,sans-serif",stroke:"#fff","stroke-width":5,"paint-order":"stroke"},svg);t.textContent=tr(i.s)});
  toks.forEach(i=>{const key=cur.id+"|"+floor+"|"+i.who+"|"+i.ph;const p=pos[key]||[i.x,i.y];
    const g=el("g",{class:"tok",transform:`translate(${p[0]},${p[1]}) scale(${TS()})`,tabindex:0,"aria-label":PN[i.who]+" "+i.op},svg);
    el("circle",{r:34,fill:PC[i.who],stroke:"#fff","stroke-width":5},g);
    const oi=OPF(i.op);
    if(oi){el("circle",{r:28,fill:"#fff"},g);el("image",{href:oi,x:-31,y:-31,width:62,height:62,"clip-path":"url(#tokclip)",preserveAspectRatio:"xMidYMid slice"},g)}
    else{const t=el("text",{y:12,"text-anchor":"middle",fill:"#fff","font-size":34,"font-weight":700,"font-family":"Barlow Condensed,sans-serif"},g);t.textContent=PN[i.who][0]}
    const w=Math.max(70,(PN[i.who]+" · "+tr(i.op)).length*12.5);
    el("rect",{x:-w/2,y:40,width:w,height:30,rx:15,fill:"#111",opacity:.85},g);
    const l=el("text",{y:62,"text-anchor":"middle",fill:"#fff","font-size":20,"font-weight":600,"font-family":"Source Sans 3,sans-serif"},g);l.textContent=PN[i.who]+" · "+tr(i.op);
    g.addEventListener("pointerdown",ev=>{ev.preventDefault();g.setPointerCapture(ev.pointerId);
      const mv=e=>{const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const q=pt.matrixTransform(svg.getScreenCTM().inverse());pos[key]=[Math.round(q.x),Math.round(q.y)];g.setAttribute("transform",`translate(${q.x},${q.y}) scale(${TS()})`)};
      const up=()=>{g.removeEventListener("pointermove",mv);g.removeEventListener("pointerup",up);try{localStorage.setItem("d8pos",JSON.stringify(pos))}catch(e){}};
      g.addEventListener("pointermove",mv);g.addEventListener("pointerup",up)});
  });
}
