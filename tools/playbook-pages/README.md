# Playbook pages (Nighthaven-style HTML artifacts)

Builds the standalone playbook pages published as claude.ai artifacts:
- Calypso Casino Playbook [COOK5] — https://claude.ai/artifact/2xrh7KArmzGjBw6WiV1Cy3 (slug 0fe5ab64-a6ee-4c0d-bb1f-957c16cc955e)
- Villa Playbook [COOK5] — https://claude.ai/artifact/CFciV3j3A6AFSudrcehq8Y (slug 5b1ef2c6-1260-47a8-8d97-0c5b696da125)
- (older, not built here) Nighthaven Playbook D8, Kafe Dostoyevsky Playbook D8

How it works
- `nh.html` = the Nighthaven page; `build.py` takes its CSS (lines 1–109) and layout (header, sticky tabs, sections, lightbox, strat board box).
- The strat-board engine is copied from this repo's `board.js` at build time (deck icons for operators, gadgets, walls, holes, plant), with `R6="icons/"`.
- `<map>.py` holds the page content (from the project docs) and the board data; `villa.py` reads `villa-strat.json` (exported from villa.js).
- Run from a work dir (paths assume this repo at /home/claude/cook5-playbook and /home/claude/pb as work dir): `python3 calypso.py && python3 prune.py calypso && python3 check.py calypso overview,...`
- `prune.py` keeps only the icons the page shows (draws every strat/phase); `check.py` checks every tab at 390 and 1100 px for errors, overflow and broken images.
- Publish with the artifacts tool `publish_files` (index.html + img/ + icons/), republish with slug + base_version.
