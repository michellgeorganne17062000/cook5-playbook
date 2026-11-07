from build import *

OUT = '/home/claude/pb/calypso'
MINT = 'https://www.youtube.com/watch?v=V7GoMe-ZUQ8'

def site_tab(sid, title, tag, lead, rows, reinforce, extra, shotpre, shotcaps, strat, note=''):
    pos = table(['#', 'Spot (Mint)', 'Ops (Mint)', 'Player · our pick'], rows)
    return f'''
<section id="v-{sid}" hidden>
  <div class="head"><h2>{title}</h2>{tag}</div>
  <p class="lead">{lead}</p>
  <div class="grid2">
    <div class="box d"><h3>Positions</h3>{pos}{note}</div>
    <div class="box"><h3>Reinforce &amp; holes</h3>{ul(reinforce)}</div>
  </div>
  {extra}
  {shots([(f"{shotpre}.jpg", "Mint's top-down · all 5")] + [(f"{shotpre}-p{i+1}.jpg", c) for i, c in enumerate(shotcaps)], 'strip s3 m2')}
  <div class="boardslot" data-strats="{strat}"></div>
</section>'''

def R(n, spot, ops, who, pick):
    return [f'<td class="n">{n}</td>', spot, f'<td class="op">{ops}</td>', f'{P(who)} <b>{pick}</b>']

overview = f'''
<!-- OVERVIEW -->
<section id="v-overview">
  <p class="lead">Calypso is our <b>best defence map</b> and a <b>Pick</b> in the rulebook. We don't know yet which sites won those rounds, so none of these setups is tested by us; two rounds on 30.10 were gifted by enemy team-kills. Core idea: <b>contest the edges, then layer back</b> through rotates and pocket walls. <b>Log the site of every Calypso defence round.</b></p>
  <div class="kpis">
    <div class="kpi"><b class="num">11/14</b><span>our defence rounds (79%)</span></div>
    <div class="kpi"><b class="num">7/14</b><span>our attack rounds (50%)</span></div>
    <div class="kpi"><b class="num">4–1</b><span>our games on Calypso (rounds 18–10)</span></div>
    <div class="kpi"><b class="num">#1</b><span>Basement: Mint's favourite site</span></div>
  </div>
  <div class="grid2">
    <div class="box">
      <h3>Who does what, on every site</h3>
      {table(['Player', 'Role', 'Defence job on Calypso'], [
        [P('dima'), 'Flex / IGL', 'Wall denial (Kaid) or traps / intel; calls the fall-back'],
        [P('renat'), 'Entry / roamer', 'Time waste on the edge (Azami); bridge on Betting'],
        [P('roman'), 'Trader', 'Denial: Mira / Smoke / Wamai, no first-angle peek'],
        [P('nikita'), 'Hard breach / anchor', 'Wall denial: Bandit (7/8); Warden on Janitor stairs'],
        [P('sanya'), 'Support / planter', 'Anchor: Server, Roulette Castle, vision (Maestro*)']])}
      <p class="note" style="margin-top:6px">* our idea, not in Mint's video. Wall-denial pair: Nikita Bandit + Dima Kaid (rulebook).</p>
    </div>
    <div class="box d">
      <h3>Which site to defend</h3>
      {table(['#', 'Site', 'Why'], [
        ['<td class="n">1</td>', '<a href="#basement">Basement</a>', "Mint's favourite: all 5 downstairs, spread out; attackers struggle to find vert"],
        ['<td class="n">2</td>', '<a href="#blackjack">1F Blackjack / Poker</a>', 'Horizontal hold; hard floor, no C4 from below'],
        ['<td class="n">3</td>', '<a href="#betting">1F Bar / Betting</a>', 'Needs Castle (Sanya); Mint has the least time on it'],
        ['<td class="n">4</td>', '<a href="#top">2F top floor</a>', 'Mint: not the best site, some pushes are easy']])}
      <p class="note" style="margin-top:6px">Order 2–4 is our inference: Mint only says the third site is undecided. No pro (r6tv) data for Calypso.</p>
    </div>
  </div>
  <div class="box"><h3>Core ideas (Mint)</h3>{ul([
    '<b>Contest the edges, then layer back.</b> Waste time in the outer rooms, fall back through rotates and pocket walls. Free space = attackers surround the site.',
    '<b>Fewer angles.</b> Close what we don\'t need, so each player has one clear job.',
    '<b>Rotates connect every site pair</b> and give a safe retreat without walking through a door they hold.',
    '<b>One denial player per site</b> (Smoke / Tachanka / Mira) sits back and stops the default plant.'])}</div>
</section>'''

maptab = f'''
<!-- MAP -->
<section id="v-map" hidden>
  <div class="head"><h2>Map &amp; callouts</h2></div>
  <div class="box">
    <h3>Mint's names (check them in game)</h3>
    <div class="callouts">
      <div><code>2F</code>Pool room (spawn) · Pool-table room · Lobby / top Lobby · Barista (Coffee) · Kitchen · Aqua + Aqua stairs · Cigar · Tequila · Ropes room · Mez</div>
      <div><code>Basement</code>Vault · Server · Yellow side (stairs, door, pillar, pipes) · Lockers / Green side · Manager · Break · Cash · Weapons · Janitor</div>
      <div><code>1F</code>Secret (= Supply) · Roulette · Bathroom · lower Tequila window · Lobby door · Wine · Bar hallway · Registration hall · Closet · Janitor stairs · Server door</div>
      <div><code>Spawns</code>North spawn (outside Wine windows) · outside spawn (next to Manager, can rappel to the wall)</div>
    </div>
    <p class="note" style="margin-top:8px">Mint says some names aren't official yet. Fix them here after a callout walk-through.</p>
  </div>
  <div>
    <h3>Blueprints (Stream Strats deck)</h3>
    {shots([('cal-map-b.jpg', 'Basement'), ('cal-map-1f.jpg', '1st floor'), ('cal-map-2f.jpg', '2nd floor')], 'strip s3', '1/1')}
  </div>
</section>'''

basement = site_tab('basement', 'Defence: Basement', '<span class="tag d">Defence · pick #1</span><span class="tag d">all 5 downstairs</span>',
  'Spread out horizontally: attackers struggle to find vert and many spots can\'t be hit from above. Keep the two Vault walls shut.',
  [R(1, 'Extended Yellow side (hallway, no vert)', 'Azami / Clash / Warden', 'renat', 'Azami'),
   R(2, 'Yellow stairs', 'Smoke / Thorn / Mira', 'roman', 'Mira'),
   R(3, 'Vault wall', 'Kaid / Bandit / Mira', 'nikita', 'Bandit'),
   R(4, 'Green stairs / Break → Weapons', 'Ela / Denari / wall denial', 'dima', 'Kaid'),
   R(5, 'Server', 'Mute / Ela / Warden', 'sanya', 'Warden')],
  ['<b>2 Vault walls</b>: the most important; wall denial on them. Shotgun, Tachanka fire or C4 over the top',
   'Server walls: head holes; rotate into the server-side wall + pocket wall',
   'Yellow wall: rotate + pocket wall (or double reinforce)',
   'Wall between the sites: rotate on the safe side, head holes on the other',
   '<b>Locker wall</b>: reinforce (easiest plant if it opens); head holes on the right',
   'Manager walls (2): wall denial, the outside spawn can rappel and breach at once',
   'Hatches: Break room + Weapons'],
  '<div class="box d"><h3>Notes</h3>' + ul([
   'Short a player: reinforce the Yellow wall shut and drop #1 (Mint)',
   'Kaid or Bandit banned: #3 goes Mira, #4 goes Ela / Denari',
   'Sanya on Server, not Mute (1/6); Roman on Mira matches his "no first-angle peek" rule']) + '</div>',
  'cal-b', ['1 · Yellow side · Renat', '2 · Yellow stairs · Roman', '3 · Vault wall · Nikita', '4 · Green / Break · Dima', '5 · Server · Sanya'], 'calB')

blackjack = site_tab('blackjack', 'Defence: 1F Blackjack / Poker', '<span class="tag d">Defence · pick #2</span><span class="tag d">horizontal</span>',
  'Hard floor, so no C4 from below. Weak spots: the default wall plant and the Lobby bar plant.',
  [R(1, 'Default wall', 'Kaid / Bandit / Mira', 'nikita', 'Bandit'),
   R(2, 'Secret / Supply → lower Aqua', 'Ela / Clash / Azami', 'renat', 'Azami'),
   R(3, 'Bathroom', 'Mira / Smoke / Tachanka', 'roman', 'Mira'),
   R(4, 'Roulette / Poker (eyes on Lobby)', 'Echo / Valkyrie / Tachanka', 'sanya', 'Maestro*'),
   R(5, 'Betting side, behind the bar rotate', 'Thorn / Ela / Denari / Pulse', 'dima', 'Thorn')],
  ['<b>Both outside walls</b> (the default wall)',
   'Secret / Supply: rotate, reinforce the other side',
   'Wall between the sites: high holes to C4 the deep bar plant',
   'Roulette: left wall with feet holes onto the Lobby door',
   'Right Roulette wall: rotate to extend (or double reinforce)',
   'Barricade the Betting-side door (basement lurk)',
   'Bathroom wall · Cigar hatch (2F floor) with feet holes',
   'Shotgun the Lobby bar so they can\'t plant behind it'],
  '<div class="box d"><h3>Vert variant (2–3 of us on 2F)</h3>' + ul([
   'Castle the outside window (contests Cigar), the Kitchen wall and the Lobby door; open the hatch',
   'One in Aqua, one on the vert by the Kitchen wall, one by the Lobby door; the other two in site',
   'Shotgun the floor along the bridge and next to the Lobby door to see the bar plant']) + '</div>',
  'cal-j', ['1 · Default wall · Nikita', '2 · Secret · Renat', '3 · Bathroom · Roman', '4 · Roulette · Sanya', '5 · Betting side · Dima'], 'calJ',
  '<p class="note" style="margin-top:6px">* Maestro is our idea (Sanya 7/8 prov.), not in the video.</p>')

betting = site_tab('betting', 'Defence: 1F Bar / Betting', '<span class="tag d">Defence · pick #3</span><span class="tag d">Castle</span>',
  'Built around Castle (Sanya). Hatch above and soft floor, so it can be played from below or above later. Hot plants: walking in the window and behind the bar.',
  [R(1, 'Wine closet / windows', 'Azami / Wamai / Jäger', 'roman', 'Wamai'),
   R(2, 'Roulette (Castles, Lobby + hatch drop)', 'Castle / Ela / Thorn', 'sanya', 'Castle'),
   R(3, 'Registration hall / Tequila window', 'Valkyrie / Mira / Pulse', 'dima', 'Valkyrie'),
   R(4, 'Janitor stairs', 'Smoke / Mute / Warden', 'nikita', 'Warden'),
   R(5, 'Site centre (bridge)', 'Pulse / Kaid / trap op', 'renat', 'Denari*')],
  ['<b>Two Janitor walls</b>: the most important',
   'Wine wall + rotate (north spawn is right outside)',
   'Kitchen hatch (2F, behind the bar)',
   'Rotate between the sites, anywhere',
   'Go horizontal into Roulette and Bathroom instead of reinforcing toward them',
   'Roulette: Castle the first door + second Lobby door; feet holes',
   'Registration hall: Castle both; one wall with feet holes',
   'Wall toward the green stairs (stops the Ace line); barricade the Server door'],
  '', 'cal-t', ['1 · Wine · Roman', '2 · Roulette · Sanya', '3 · Registration · Dima', '4 · Janitor stairs · Nikita', '5 · Site centre · Renat'], 'calT',
  '<p class="note" style="margin-top:6px">* Denari is our idea (Renat 4/7 prov.). Mint\'s drawing numbers these spots differently from his voice-over; we follow the drawing.</p>')

top = site_tab('top', 'Defence: 2F top floor', '<span class="tag d">Defence · last pick</span>',
  'Mint: not the best site. Double reinforce what we don\'t need, contest the edges, Smoke stops the bar plant from Aqua.',
  [R(1, 'Aqua side (time waste)', 'Smoke / Goyo / Tachanka + wire / prox on Aqua stairs', 'roman', 'Smoke'),
   R(2, 'Kitchen (wall denial)', 'Bandit / Kaid / Warden', 'nikita', 'Bandit'),
   R(3, 'Barista / Coffee', 'Azami / Clash / Denari', 'renat', 'Azami'),
   R(4, 'Mez / Lobby side', 'Thorn / Ela / Fenrir', 'dima', 'Thorn'),
   R(5, 'Pool-table room (bridge)', 'trap op / vision / Mira / roam', 'sanya', 'Maestro*')],
  ['<b>Pool room → Lobby double walls</b>: double reinforce',
   'Barista: rotate right, reinforce left (not double)',
   'Kitchen outside walls: double reinforce, head holes',
   'Pool wall: head holes across',
   'Wall between the sites: rotate right, head holes up top',
   'Aqua: rotate into the room, reinforce the wall next to it',
   'Aqua extension: right wall, rotate left, head holes in the Cigar wall, barbed wire on the Aqua stairs'],
  '', 'cal-2f', ['1 · Aqua · Roman', '2 · Kitchen · Nikita', '3 · Barista · Renat', '4 · Mez · Dima', '5 · Pool table · Sanya'], 'cal2',
  '<p class="note" style="margin-top:6px">* Maestro is our idea. Roman: not Goyo (0/3 prov.).</p>')

def play(n, name, pick, route, job, o, c, r):
    return f'''<div class="box a"><h3>{n} · {name} <span class="tag a" style="margin-left:6px">{pick}</span></h3>
      <p class="note" style="margin-bottom:6px"><b>Route:</b> {route}</p><p style="margin:0 0 6px;font-size:.9rem">{job}</p>
      {ul([f'<b>Opening:</b> “{o}”', f'<b>Commit:</b> “{c}”', f'<b>Reset:</b> “{r}”'])}</div>'''

attack = f'''
<!-- ATTACK -->
<section id="v-attack" hidden>
  <div class="head"><h2>Attack</h2><span class="tag a">our attack 7/14 (50%)</span><span class="tag a">no plan yet</span></div>
  <p class="lead">We have no Calypso attack plan in the docs yet. Two named plays from the <b>R6 Basic Calls</b> sheet fit this map; neither is tested by us. Call words: Press · Set · Hit · Collapse · Freeze · Reset. One route player works the route; the other four show pressure, stay in trade distance, and don't enter before the trigger.</p>
  <div class="grid2">
    {play('01', 'Blue Backstab', 'Finka · top floor', 'Poolside → Aqua → Blue stairs',
      'Route player stays quiet until Kitchen pressure has fixed the defenders. Team: show Kitchen and hold, drone Aqua and Blue, no commit before “Blue set”.',
      'Blue Backstab. Show Kitchen and hold. Keep Aqua and Blue droned. Wait for Blue set.',
      'Blue set. Hit Kitchen. Collapse from Blue.', 'Blue blocked. Freeze Kitchen and reset drones.')}
    {play('02', 'Vault Split', 'Zofia · basement', 'Exterior breach → Vault side',
      'Zofia makes the high and low openings on the Vault breach and takes the close Vault fight. Team: pressure the main lane and hold; commit after Vault is clear.',
      'Vault Split. Pressure main and hold. Get Vault open and check close. Commit when Vault is clear.',
      'Vault clear. Hit both sides and trade forward.', 'Vault denied. Hold pressure and rebuild the breach.')}
  </div>
  <div class="box a"><h3>Rules that apply here (rulebook)</h3>{ul([
    'First contact = Roman or Dima, partner within 2 s; after the first pick the IGL calls <b>collapse</b> or <b>hold</b>',
    'Plant by <b>0:45</b>; IGL calls the plant at 1:00 if the site isn\'t open',
    'Overtime: attack only the one site we practiced'])}</div>
</section>'''

bans = f'''
<!-- BANS -->
<section id="v-bans" hidden>
  <div class="head"><h2>Operator bans</h2></div>
  <p class="lead">No ban data yet (Tracker doesn't show bans). Everything here is provisional: log our bans and theirs every game.</p>
  <div class="box">{table(['Ban', '<span style="color:var(--def)">We defend</span>', '<span style="color:var(--atk)">We attack</span>'], [
    ['<td class="n">1</td>', '<td class="op">Ace</td>', '<td class="op">No basis yet — log what kills us</td>']])}</div>
  <div class="grid2">
    <div class="box"><h3>Why Ace</h3>{ul([
      'On Blackjack attackers take Ace, lurk up from the basement and open all the walls (Mint)',
      'On Betting the green-stairs wall is reinforced only to stop an Ace angle (Mint)',
      'If Ace is gone they bring Thermite: Tachanka fire over the Vault wall works against it',
      'Matches the rulebook default: ban Ace on defence'])}</div>
    <div class="box"><h3>Protect (have the backup ready)</h3>{ul([
      'Kaid / Bandit (Nikita Bandit 7/8, Dima Kaid 9/13) → Mira on the wall',
      'Castle on Betting (Sanya) → Ela / Thorn on Roulette',
      'Maestro (Sanya 7/8 prov.) → Castle / Echo'])}</div>
  </div>
</section>'''

practice = f'''
<!-- PRACTICE -->
<section id="v-practice" hidden>
  <div class="head"><h2>Practice &amp; tracking</h2></div>
  <div class="grid2">
    <div class="box"><h3>One custom session · ~1.5 h (our suggestion)</h3><ul class="chk">
      <li>Callout walk-through, fix Mint's unofficial names — 15 min</li>
      <li>Basement setup: Vault walls, rotates, everyone's fall-back — 30 min</li>
      <li>Blackjack setup + the vert variant — 20 min</li>
      <li>Betting with Sanya's four Castles — 15 min</li>
      <li>Try Maestro (Sanya) and Denari (Renat) on their spots — 10 min</li>
    </ul></div>
    <div class="box"><h3>Track every Calypso match</h3>{table(['What', 'Target'], [
      ['Site of every defence round + W/L', 'every round'],
      ['Who died first, where', 'every round'],
      ['Our bans and theirs', 'every game'],
      ['Defence round win %', '<td class="num">keep ≥ 70%</td>'],
      ['Which attack play was called', 'every attack round']])}</div>
  </div>
  <p class="note">Sources: <a href="{MINT}">Mint — Calypso Casino defence guide</a> and his top-down screenshots · R6 Basic Calls · [COOK5] rulebook (07.11) and reviews 30.10–06.11. Mint calls it an early-days meta and expects an update.</p>
</section>'''

sections = overview + maptab + basement + blackjack + betting + top + attack + bans + practice

# ---------- boards: Mint's top-downs, his 5 positions ----------
FL = lambda img, vb, lab: {"label": lab, "img": f"img/{img}", "w": 1280, "h": 720, "vb": vb, "mask": False}
floors = {"cb": FL("cal-b.jpg", [300, 90, 720, 560], "Basement"), "cj": FL("cal-j.jpg", [370, 80, 720, 640], "1F"),
          "ct": FL("cal-t.jpg", [260, 15, 720, 590], "1F"), "c2": FL("cal-2f.jpg", [320, 100, 720, 520], "2F")}
T = lambda f, who, op, x, y: {"k": "tok", "f": f, "ph": 1, "who": who, "op": op, "x": x, "y": y}
PH = ["Mint's five positions (his pink boxes). Our player + operator pick. Walls and holes: see the list above."]
strats = [
  {"id": "calB", "name": "Basement", "side": "d", "floor": "cb", "phases": PH, "items": [
    T("cb", "dima", "Kaid", 431, 185), T("cb", "sanya", "Warden", 710, 180), T("cb", "nikita", "Bandit", 835, 310),
    T("cb", "renat", "Azami", 560, 545), T("cb", "roman", "Mira", 835, 545)]},
  {"id": "calJ", "name": "Blackjack / Poker", "side": "d", "floor": "cj", "phases": PH, "items": [
    T("cj", "dima", "Thorn", 680, 165), T("cj", "roman", "Mira", 655, 275), T("cj", "sanya", "Maestro", 890, 420),
    T("cj", "renat", "Azami", 560, 470), T("cj", "nikita", "Bandit", 735, 605)]},
  {"id": "calT", "name": "Bar / Betting", "side": "d", "floor": "ct", "phases": PH, "items": [
    T("ct", "roman", "Wamai", 600, 80), T("ct", "nikita", "Warden", 805, 70), T("ct", "renat", "Denari", 435, 240),
    T("ct", "dima", "Valkyrie", 370, 365), T("ct", "sanya", "Castle", 560, 470)]},
  {"id": "cal2", "name": "2F top floor", "side": "d", "floor": "c2", "phases": PH, "items": [
    T("c2", "nikita", "Bandit", 595, 230), T("c2", "renat", "Azami", 705, 190), T("c2", "sanya", "Maestro", 700, 330),
    T("c2", "roman", "Smoke", 490, 520), T("c2", "dima", "Thorn", 900, 470)]}]
short = {"calB": "Mint setup", "calJ": "Mint setup", "calT": "Mint setup", "cal2": "Mint setup"}

tabs = [("overview", "Overview", ""), ("map", "Map", ""), ("basement", "Basement", "def"), ("blackjack", "Blackjack", "def"),
        ("betting", "Betting", "def"), ("top", "2F", "def"), ("attack", "Attack", "atk"), ("bans", "Bans", ""), ("practice", "Practice", "")]
legend_items = [('op', 'azami.png', 'Player token: operator icon in the player-colour ring'),
    ('raw', '', '<span class="note">Mint\'s top-downs show no walls, so reinforcements and holes stay in the list above each board (deck icons on boards drawn on a blueprint, e.g. Villa).</span>')]
html = page("Calypso Casino Playbook [COOK5]", "Calypso Casino <b>Playbook</b>",
            "[COOK5] · added 7 Nov 2026 · defence setups for all 4 sites · sources: Mint's Calypso defence guide + his top-down screenshots, R6 Basic Calls, our reviews 30.10–06.11",
            tabs, sections, legend_items,
            "Board = Mint's top-down with his five spots. Drag any player token to adjust; check in a custom game.",
            floors, strats, short, "cook5-cal-pos")
imgs = ['cal-map-b.jpg', 'cal-map-1f.jpg', 'cal-map-2f.jpg'] + [f'cal-{s}{p}.jpg' for s in ['b', 'j', 't', '2f'] for p in [''] + [f'-p{i}' for i in range(1, 6)]]
if os.path.exists(OUT): shutil.rmtree(OUT)
copy_assets(OUT, imgs)
open(f'{OUT}/index.html', 'w').write(html)
print('ok', len(html))
