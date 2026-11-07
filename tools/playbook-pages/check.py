import sys
from playwright.sync_api import sync_playwright
d=sys.argv[1];tabs=sys.argv[2].split(',');shots=sys.argv[3].split(',') if len(sys.argv)>3 else []
base=f"file:///home/claude/pb/{d}/index.html"
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (390,1100):
        pg=b.new_page(viewport={"width":w,"height":900},device_scale_factor=1.5)
        errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        bad=[];pg.on("requestfailed",lambda r:bad.append(r.url) if 'googleapis' not in r.url and 'gstatic' not in r.url else None)
        pg.goto(base);pg.wait_for_timeout(800)
        for t in tabs:
            pg.evaluate(f"location.hash='#{t}'");pg.wait_for_timeout(350)
            sw=pg.evaluate("document.documentElement.scrollWidth")
            imgs=pg.evaluate("[...document.querySelectorAll('#bsvg image')].length")
            broken=pg.evaluate("[...document.querySelectorAll('section:not([hidden]) img')].filter(i=>i.src&&!(i.complete&&i.naturalWidth)).map(i=>i.src.split('/').pop())")
            if sw>w or broken: print(w,t,"scrollWidth",sw,"broken",broken)
            if t in shots: pg.screenshot(path=f"/home/claude/pb/s-{d}-{t}-{w}.png",full_page=True)
        print(w,"errors",errs[:3],"failed",bad[:3])
        pg.close()
    b.close()
