"""Build Calypso and Villa playbook pages in the Nighthaven Labs page style.
Shared: CSS from the Nighthaven page, strat-board engine from the mini app's board.js (deck icons)."""
import json, os, re, shutil

NH = open('/home/claude/pb/nh.html').read().split('\n')
REPO = '/home/claude/cook5-playbook'
BJ = open(f'{REPO}/board.js').read().split('\n')

# ---------- shared head + CSS (Nighthaven page lines 1..109) ----------
def head(title):
    h = '\n'.join(NH[:109])
    h = h.replace('<title>Nighthaven Playbook D8</title>', f'<title>{title}</title>')
    h = h.replace('</style>', '.lgi{width:28px;height:22px;object-fit:contain;background:#fff;border:1px solid var(--line);border-radius:4px;flex:none}\n'
                  '.lgi.op{border-radius:50%;width:24px;height:24px}\n@media (max-width:700px){.strip.s3.m2{grid-template-columns:repeat(2,minmax(0,1fr))}}\n</style>')
    return h

# ---------- board engine from board.js ----------
def engine(floors, strats, short, poskey):
    top_end = next(i for i, l in enumerate(BJ) if l.startswith('const FLOORS='))
    lib = '\n'.join(BJ[1:top_end])                      # PC, PN, GC, OPF, GSRC, GI, TRAPG, gIcon, ELEC
    lib = lib.replace('const R6="img/r6/icons/"', 'const R6="icons/"')
    helpers = '\n'.join(l for l in BJ if re.match(r'const (T|G|A|S|L|X)=\(', l))
    st = next(i for i, l in enumerate(BJ) if l.startswith('let cur='))
    rest = '\n'.join(BJ[st:])                           # state, tr, TS, svg, el, visible, draw
    rest = rest.replace('"d8pos"', json.dumps(poskey))
    return ('/* ---------- Strat board (engine = [COOK5] mini app board.js, deck icons) ---------- */\n'
            + lib + '\nconst BOARD_RU={};\n'
            + f'const FLOORS={json.dumps(floors)};\nconst YEL={{}};\n' + helpers + '\n'
            + f'const STRATS={json.dumps(strats, ensure_ascii=False)};\n'
            + f'const SHORT={json.dumps(short, ensure_ascii=False)};\n' + rest)

UI_JS = r'''
function ui(){
  [["d","stratSelD","rowD"],["a","stratSelA","rowA"]].forEach(([side,id,row])=>{const ss=document.getElementById(id);ss.innerHTML="";
    const list=STRATS.filter(x=>allowed.includes(x.id)&&x.side===side);document.getElementById(row).hidden=!list.length;
    list.forEach(s=>{const b=document.createElement("button");b.textContent=SHORT[s.id]||s.name;b.className=(s===cur?"on ":"")+side;b.onclick=()=>{cur=s;floor=s.floor;phase=1;ui()};ss.appendChild(b)})});
  const fs=document.getElementById("floorSel");fs.innerHTML="";
  Object.keys(FLOORS).forEach(f=>{if(!cur.items.some(i=>i.f===f))return;const b=document.createElement("button");b.textContent=FLOORS[f].label;b.className=f===floor?"on":"";b.onclick=()=>{floor=f;ui()};fs.appendChild(b)});
  const ps=document.getElementById("phaseSel");ps.innerHTML="";
  cur.phases.forEach((p,i)=>{const b=document.createElement("button");b.textContent=i+1;b.className=(i+1===phase?"on ":"")+cur.side;b.onclick=()=>{phase=i+1;ui()};ps.appendChild(b)});
  const lu=document.getElementById("lineupList");lu.innerHTML="";
  document.getElementById("lineupTitle").textContent=(cur.side==="a"?"Attack":"Defence")+" lineup";
  ["dima","renat","roman","nikita","sanya"].forEach(w=>{const ops=[];cur.items.filter(i=>i.k==="tok"&&i.who===w&&!i.hide&&i.op).sort((x,y)=>x.ph-y.ph).forEach(i=>{if(!ops.includes(i.op))ops.push(i.op)});
    const row=document.createElement("div");row.style.cssText="display:flex;gap:8px;align-items:center";
    const pill=document.createElement("span");pill.className="p "+w;pill.textContent=PN[w];pill.style.minWidth="62px";pill.style.textAlign="center";
    const op=document.createElement("b");op.textContent=ops.length?ops.join(" / "):"—";if(!ops.length)op.style.color="var(--muted)";
    row.append(pill,op);lu.appendChild(row)});
  const pt=document.getElementById("phaseText");pt.innerHTML="";
  cur.phases.forEach((p,i)=>{const li=document.createElement("li");li.textContent=p;if(i+1===phase)li.className="cur";pt.appendChild(li)});
  draw();
}
let allowed=STRATS.map(x=>x.id);
function mountBoard(v){const sec=document.getElementById("v-"+v);const slot=sec&&sec.querySelector(".boardslot");const box=document.getElementById("boardBox");
  if(!slot){document.getElementById("boardHome").appendChild(box);return}
  slot.appendChild(box);allowed=slot.dataset.strats.split(",");
  if(!allowed.includes(cur.id)){cur=STRATS.find(x=>x.id===allowed[0]);floor=cur.floor;phase=1}
  ui();}
window.__boardReady=true;
document.getElementById("resetPos").onclick=()=>{Object.keys(pos).filter(k=>k.startsWith(cur.id+"|")).forEach(k=>delete pos[k]);try{localStorage.setItem(POSKEY,JSON.stringify(pos))}catch(e){}draw()};
addEventListener("resize",()=>{if(document.getElementById("boardBox").isConnected)draw()});
mountBoard((location.hash||"#overview").slice(1));
'''

def legend(items):
    rows = []
    for kind, src, txt in items:
        if kind == 'img': rows.append(f'<div><img class="lgi" src="icons/{src}" alt="">{txt}</div>')
        elif kind == 'op': rows.append(f'<div><img class="lgi op" src="icons/operators/{src}" alt="">{txt}</div>')
        else: rows.append(f'<div>{src}{txt}</div>')
    return '\n        '.join(rows)

def board_box(legend_items, note):
    return f'''
<!-- BOARD (mounted into each site tab) -->
<div id="boardHome" hidden><div id="boardBox" style="display:grid;gap:14px"><h3 style="margin:6px 0 -4px">Strat board</h3>
<div class="box" style="display:grid;gap:10px;padding:10px 12px">
    <div id="rowD" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><span class="tag d" style="min-width:72px;text-align:center">Defence</span><div class="seg" id="stratSelD"></div></div>
    <div id="rowA" style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><span class="tag a" style="min-width:72px;text-align:center">Attack</span><div class="seg" id="stratSelA"></div></div>
    <p class="note">{note}</p>
  </div>
  <div class="boardwrap">
    <div class="box" style="padding:10px;display:grid;gap:10px">
      <div class="seg" id="floorSel"></div>
      <div class="board"><svg id="bsvg" xmlns="http://www.w3.org/2000/svg"></svg></div>
    </div>
    <div style="display:grid;gap:12px">
      <div class="box" id="lineupBox"><h3 id="lineupTitle">Lineup</h3><div id="lineupList" style="display:grid;gap:6px;font-size:.9rem"></div></div>
      <div class="box" id="phaseBox"><h3>Phases</h3><div class="seg" id="phaseSel" style="margin-bottom:8px"></div><ol class="phaselist" id="phaseText"></ol></div>
      <div class="box"><h3>Legend · icons from the Stream Strats deck</h3><div class="legendg">
        {legend(legend_items)}
      </div><button id="resetPos" style="margin-top:10px;font:600 .85rem var(--body);padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--panel);color:var(--fg);cursor:pointer">Reset token positions</button></div>
    </div>
  </div>
</div></div>'''

def page(title, h1, sub, tabs, sections, legend_items, board_note, floors, strats, short, poskey):
    nav = '\n'.join(f'  <a href="#{k}"{(" class=" + chr(34) + c + chr(34)) if c else ""}>{n}</a>' for k, n, c in tabs)
    views = json.dumps([k for k, _, _ in tabs])
    return (head(title) + f'''

<div class="wrap">
<header>
  <h1>{h1}</h1>
  <span class="sub">{sub}</span>
</header>
<nav id="tabs">
{nav}
</nav>
''' + sections + board_box(legend_items, board_note) + '''
</div>

<dialog id="lb"><img alt=""><p></p></dialog>

<script>
const views=''' + views + f''';
const POSKEY={json.dumps(poskey)};
''' + r'''function show(){const h=(location.hash||"#overview").slice(1);const v=views.includes(h)?h:"overview";
  views.forEach(x=>{document.getElementById("v-"+x).hidden=x!==v});
  document.querySelectorAll("#tabs a").forEach(a=>{const on=a.getAttribute("href")==="#"+v;a.classList.toggle("on",on);if(on)a.scrollIntoView({block:"nearest",inline:"nearest"})});
  if(window.__boardReady)mountBoard(v);}
addEventListener("hashchange",()=>{show();scrollTo(0,0)});show();
const lb=document.getElementById("lb");
document.querySelectorAll(".shot").forEach(b=>b.addEventListener("click",()=>{const i=b.querySelector("img");lb.querySelector("img").src=i.src;lb.querySelector("img").alt=i.alt;lb.querySelector("p").textContent=b.querySelector("span").textContent;lb.showModal()}));
lb.addEventListener("click",()=>lb.close());
''' + engine(floors, strats, short, poskey) + UI_JS + '</script>\n')

P = lambda w: f'<span class="p {w}">{w.capitalize()}</span>'
def shots(items, cls='strip', ratio=None):
    st = f' style="aspect-ratio:{ratio}"' if ratio else ''
    return f'<div class="{cls}">' + ''.join(f'<button class="shot"><img{st} src="img/{f}" alt="{c}"><span>{c}</span></button>' for f, c in items) + '</div>'
def table(head, rows):
    return '<div class="tw"><table>\n      <tr>' + ''.join(f'<th>{h}</th>' for h in head) + '</tr>\n' + '\n'.join(
        '      <tr>' + ''.join(c if c.startswith('<td') else f'<td>{c}</td>' for c in r) + '</tr>' for r in rows) + '\n    </table></div>'
def ul(items): return '<ul class="tight">' + ''.join(f'<li>{x}</li>' for x in items) + '</ul>'

COMMON_LEGEND = [
    ('img', 'utility/reinforcement.png', 'Reinforced wall / hatch'),
    ('img', 'gadgets/shock-wire.png', 'Electrified (Bandit; Kaid claw if only Kaid)'),
    ('img', 'markers/hole.png', 'Rotate / hole in a soft wall'),
    ('img', 'markers/head-hole.png', 'Head holes'),
    ('img', 'markers/feet-hole.png', 'Feet holes'),
    ('img', 'markers/drop.png', 'Drop / vault'),
]

def copy_assets(out, imgs):
    os.makedirs(f'{out}/img', exist_ok=True)
    for f in imgs: shutil.copy(f'{REPO}/img/{f}', f'{out}/img/{f}')
    src = f'{REPO}/img/r6/icons'
    for sub in ['operators', 'gadgets', 'utility', 'markers']:
        os.makedirs(f'{out}/icons/{sub}', exist_ok=True)
        for f in os.listdir(f'{src}/{sub}'):
            if re.match(r'(gadget|utility|marker)-', f): continue   # only the named icons
            shutil.copy(f'{src}/{sub}/{f}', f'{out}/icons/{sub}/{f}')
