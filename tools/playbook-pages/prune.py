import sys,os
from playwright.sync_api import sync_playwright
d=sys.argv[1];base=f"file:///home/claude/pb/{d}/index.html"
used=set()
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={"width":1100,"height":900})
    pg.goto(base);pg.wait_for_timeout(600)
    for v in pg.evaluate("views"):
        pg.evaluate(f"location.hash='#{v}'");pg.wait_for_timeout(200)
        if pg.evaluate("!!document.querySelector('section:not([hidden]) .boardslot')"):
            for sid in pg.evaluate("allowed"):
                n=pg.evaluate(f"STRATS.find(s=>s.id==='{sid}').phases.length")
                for f in pg.evaluate(f"[...new Set(STRATS.find(s=>s.id==='{sid}').items.map(i=>i.f))]"):
                    for ph in range(1,n+1):
                        pg.evaluate(f"cur=STRATS.find(s=>s.id==='{sid}');floor='{f}';phase={ph};draw()")
                        used|=set(pg.evaluate("[...document.querySelectorAll('#bsvg image')].map(i=>i.getAttribute('href'))"))
    used|=set(pg.evaluate("[...document.querySelectorAll('img')].map(i=>i.getAttribute('src')).filter(Boolean)"))
    b.close()
icons={u for u in used if u.startswith('icons/')}
removed=0
for root,_,fs in os.walk(f'{d}/icons'):
    for f in fs:
        rel=os.path.relpath(os.path.join(root,f),d)
        if rel not in icons: os.remove(os.path.join(root,f));removed+=1
missing=[u for u in used if not u.startswith('data:') and not os.path.exists(f'{d}/{u}')]
print(d,'icons kept',len(icons),'removed',removed,'missing',missing)
