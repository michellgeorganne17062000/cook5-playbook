from build import *

OUT = '/home/claude/pb/villa'
V = json.load(open('/home/claude/pb/villa-strat.json'))

def R(n, spot, ops, who, pick, why):
    return [f'<td class="n">{n}</td>', spot, f'<td class="op">{ops}</td>', f'{P(who)} <b>{pick}</b>', why]

overview = f'''
<!-- OVERVIEW -->
<section id="v-overview">
  <p class="lead">Villa is <b>ban #3</b> in the rulebook: 2 games, 0–2, rounds 5–9. If we have to play it, we defend <b>2F Aviator / Games</b> with one fixed setup from a drawing the team found on Discord. It's the first test: no per-site data yet. <b>Log the site and result of every Villa defence round.</b></p>
  <div class="kpis">
    <div class="kpi"><b class="num">0–2</b><span>our games on Villa (rounds 5–9)</span></div>
    <div class="kpi"><b class="num">2/7</b><span>our defence rounds (prov.)</span></div>
    <div class="kpi"><b class="num">3/7</b><span>our attack rounds (prov.)</span></div>
    <div class="kpi"><b class="num">#3</b><span>our map ban (after Border, Kanal)</span></div>
  </div>
  <div class="grid2">
    <div class="box">
      <h3>Who does what (2F Aviator / Games)</h3>
      {table(['Player', 'Role', 'Defence job on Villa'], [
        [P('dima'), 'Flex / IGL', 'Info roam Trophy / Astro: cams + scans, calls without first contact'],
        [P('renat'), 'Entry / roamer', 'Aviator (1B): Kibas on the windows and the Study door'],
        [P('roman'), 'Trader', 'Brown Stairs flank: discs + shield in the doorway, no first-angle peek'],
        [P('nikita'), 'Hard breach / anchor', 'Statue trap roam close to site, falls back via Landing'],
        [P('sanya'), 'Support / planter', 'Games (1A) site anchor, not first contact']])}
    </div>
    <div class="box d">
      <h3>Which site to defend</h3>
      {table(['#', 'Site', 'Status'], [
        ['<td class="n">1</td>', '<a href="#aviator">2F Aviator / Games</a>', 'Setup from the Discord drawing + strat board'],
        ['<td class="n">–</td>', 'Other sites', 'No setup yet']])}
      <p class="note" style="margin-top:6px">The drawing comes with no reasons or timings; everything under "Why" is our reasoning (inf.). The deck's Villa plan is older than the March 2026 rework, so check the board in game.</p>
    </div>
  </div>
</section>'''

maptab = f'''
<!-- MAP -->
<section id="v-map" hidden>
  <div class="head"><h2>Map &amp; callouts</h2></div>
  <div class="box">
    <h3>2F callouts used here</h3>
    <div class="callouts">
      <div><code>1A</code>Gaming (in game: Games Room) · pool table + Bar</div>
      <div><code>1B</code>Aviator</div>
      <div><code>Study</code>South of Aviator, hatch in the SE corner · Study Balcony</div>
      <div><code>Vault</code>North of Gaming</div>
      <div><code>Skull</code>Small room NE of Aviator</div>
      <div><code>Ninety</code>L-shaped hall west and north of Gaming · Ninety Corner (NW, hatch) · Ninety Balcony</div>
      <div><code>Stairs</code>Brown Stairs (SW) · Landing / Red Stairs (centre) · Astro Stairs</div>
      <div><code>North</code>Trophy + Trophy Entrance · Astro (hatch) · Statue (two rooms) · Bathroom · Closet · Master (hatch)</div>
      <div><code>Outside</code>Master / Bathroom / Trophy Balcony · Terrace (east)</div>
    </div>
  </div>
  <div>
    <h3>Blueprint &amp; the Discord drawing</h3>
    {shots([('villa-2f.png', '2F blueprint (deck, pre-rework)'), ('villa-ag.jpg', 'The Discord drawing: whole setup')], 'strip s3 m2', '1/1')}
  </div>
</section>'''

pos = table(['#', 'Spot', 'Ops (drawing)', 'Player · our pick', 'Why (inf.)'], [
  R(1, 'Games (1A) site anchor', 'Smoke / Tachanka / Mute / Echo', 'sanya', 'Echo*', 'Anchor, not first contact. Avoid Mute (1/6) and Smoke as default (5/12); Echo drones give the IGL late info'),
  R(2, 'Aviator (1B)', 'Azami / Warden / Clash', 'renat', 'Azami', 'His best defender (14/30). Kibas cut the two main entries'),
  R(3, 'Bottom Ninety / Brown Stairs flank', 'Wamai / Ela / Clash', 'roman', 'Wamai', 'His best defender (6/12); discs + shield = a "no first-angle peek" job'),
  R(4, 'Statue roam (traps)', 'Thorn / Ela / Denari', 'nikita', 'Ela', 'Trap roam close to site; falls back through Landing into Ninety'),
  R(5, 'Trophy / Astro roam (info)', 'Sentry / Solis / Valkyrie', 'dima', 'Valkyrie', 'Info roam fits the IGL: calls without taking first contact')])

aviator = f'''
<!-- AVIATOR / GAMES -->
<section id="v-aviator" hidden>
  <div class="head"><h2>Defence: 2F Aviator / Games</h2><span class="tag d">Defence · only setup</span><span class="tag d">untested</span></div>
  <p class="lead">Two on site (Games + Aviator), one on the Brown Stairs flank, two roams north (Statue, Trophy / Astro) that waste time and fall back. All 10 reinforcements go on walls; the hatches stay open.</p>
  <div class="grid2">
    <div class="box d"><h3>Positions</h3>{pos}<p class="note" style="margin-top:6px">* Echo is our pick from the drawing's list.</p></div>
    <div class="box"><h3>Walls, holes, gadgets (drawing)</h3>{ul([
      '<b>Reinforced:</b> Ninety ↔ Vault wall · both parts of the Gaming ↔ Ninety wall · middle of the Gaming ↔ Aviator divider · both Study ↔ Gaming walls',
      '<b>Rotate:</b> top of the Gaming ↔ Aviator divider, next to Vault; vault spot in the soft lower part',
      'Holes onto Study (Aviator ↔ Study wall), onto Brown Stairs (Gaming bottom wall, at the Bar); small holes by the 1B plant and at the bottom of Ninety',
      'Barbed wire on the Study → Aviator door; pre-set smokes by the Aviator / Skull door and at the bottom of Ninety',
      'North roam: two reinforced walls on the Statue ↔ Closet side, holes in Statue / Bathroom and Closet; barbed wire + holes on Astro → Trophy',
      'Hatches (Ninety Corner, Study, Astro, Master): not reinforced in the drawing'])}</div>
  </div>
  <div class="box d"><h3>Rules for this setup (rulebook, inf.)</h3>{ul([
    '<b>Roams are time waste and info, not frags.</b> Statue and Trophy fall back toward Landing / Ninety once droned or once the first attacker is down (rule 4: after the first pick, hold)',
    '<b>No first-angle peeks</b> from Aviator onto Study or Terrace before a drone or utility gives info (rule 5)',
    '<b>Brown Stairs must stay alive:</b> if he\'s lost, Gaming is open from the Bar side and Ninety; Gaming calls it and the north roamer rotates in through Ninety',
    'Fall-back timing (ours, untested): roamers leave by 1:30 at the latest, or as soon as they\'ve been droned'])}</div>
  {shots([('villa-ag.jpg', 'Whole setup')] + [(f'villa-ag-p{i}.jpg', c) for i, c in enumerate(['1 · Games · Sanya', '2 · Aviator · Renat', '3 · Brown Stairs · Roman', '4 · Statue roam · Nikita', '5 · Trophy roam · Dima'], 1)], 'strip s3 m2')}
  <div class="boardslot" data-strats="vAG"></div>
</section>'''

bans = f'''
<!-- BANS -->
<section id="v-bans" hidden>
  <div class="head"><h2>Operator bans</h2></div>
  <p class="lead">No ban data yet. Provisional, from the rulebook: log our bans and theirs every game.</p>
  <div class="box">{table(['Ban', '<span style="color:var(--def)">We defend Aviator / Games</span>', '<span style="color:var(--atk)">We attack</span>'], [
    ['<td class="n">1</td>', '<td class="op">Ace</td>', '<td class="op">No basis yet — log what kills us</td>']])}</div>
  <div class="grid2">
    <div class="box"><h3>Why</h3>{ul([
      'Rulebook default: ban Ace on defence',
      'Gaming\'s reinforced walls are the strength of this setup, and the drawing has only one anti-breach op option (Mute on Games)',
      'No Kaid / Bandit in the drawing'])}</div>
    <div class="box"><h3>Option</h3>{ul([
      'Nikita\'s <b>Bandit</b> (7/8) instead of Mute on Games, if he plays site instead of the Statue roam (not in the drawing)'])}</div>
  </div>
</section>'''

practice = f'''
<!-- PRACTICE -->
<section id="v-practice" hidden>
  <div class="head"><h2>Practice &amp; tracking</h2></div>
  <div class="grid2">
    <div class="box"><h3>One custom session · ~1 h (our suggestion)</h3><ul class="chk">
      <li>Walk the 2F callouts on the reworked map, check the board against the game — 15 min</li>
      <li>Build the setup: 10 walls, rotate, holes, wire, smokes — 20 min</li>
      <li>Roam fall-back routes (Statue → Landing → Ninety, Trophy → Skull) on a 1:30 timer — 15 min</li>
      <li>Check the white panels in the drawing (deployable shields?) — 10 min</li>
    </ul></div>
    <div class="box"><h3>Track every Villa match</h3>{table(['What', 'Target'], [
      ['Site of every defence round + W/L', 'every round'],
      ['Who died first, where', 'every round'],
      ['Roams back by 1:30', 'most rounds'],
      ['Our bans and theirs', 'every game']])}</div>
  </div>
  <p class="note">Sources: setup drawing from a Discord channel (6 screenshots, shared 07.11.2026, operators confirmed by the team) · [COOK5] rulebook (07.11) and reviews 30.10–06.11. Open questions: are the white panels deployable shields; which gadget is the Denari tether icon.</p>
</section>'''

sections = overview + maptab + aviator + bans + practice
floor = dict(V['floor']); floor['img'] = 'img/villa-2f.png'; floor['label'] = '2F'
strats = V['strats']
short = {s['id']: 'Discord setup' for s in strats}
tabs = [("overview", "Overview", ""), ("map", "Map", ""), ("aviator", "Aviator / Games", "def"), ("bans", "Bans", ""), ("practice", "Practice", "")]
legend_items = [('op', 'azami.png', 'Player token: operator icon in the player-colour ring'), COMMON_LEGEND[0], COMMON_LEGEND[2],
    ('img', 'utility/barbed-wire.png', 'Barbed wire'), ('img', 'utility/deployable-shield.png', 'Deployable shield (white panels, unconfirmed)'),
    ('img', 'gadgets/kiba-barrier.png', 'Kiba barrier (Azami)'), ('img', 'gadgets/remote-gas-grenade.png', 'Smoke canister'),
    ('img', 'gadgets/grzmot-mine.png', 'Grzmot mine (Ela)'), ('img', 'gadgets/razorbloom-shell.png', 'Razorbloom (Thorn)'),
    ('img', 'gadgets/denari-tether.png', 'Denari tether (unconfirmed icon)'), ('img', 'utility/proximity-alarm.png', 'Proximity alarm (Sentry)'),
    ('raw', '<span class="gl" style="background:#2563eb">S</span>', 'Bomb site')]
html = page("Villa Playbook [COOK5]", "Villa <b>Playbook</b>",
            "[COOK5] · added 7 Nov 2026 · 2F Aviator / Games defence + strat board · source: setup drawing from a Discord channel · untested · Villa is ban #3",
            tabs, sections, legend_items,
            "Board = the Discord drawing on the deck's Villa 2F plan. Drag any player token to adjust; check in a custom game.",
            {"v2": floor}, strats, short, "cook5-villa-pos")
if os.path.exists(OUT): shutil.rmtree(OUT)
copy_assets(OUT, ['villa-2f.png', 'villa-ag.jpg'] + [f'villa-ag-p{i}.jpg' for i in range(1, 6)])
shutil.copy(f'{REPO}/img/r6/icons/gadgets/gadget-37.png', f'{OUT}/icons/gadgets/denari-tether.png')
html = html.replace('gadgets/gadget-37.png', 'gadgets/denari-tether.png')
open(f'{OUT}/index.html', 'w').write(html)
print('ok', len(html), 'IC refs', html.count('"IC"'))
