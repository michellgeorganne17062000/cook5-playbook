# R6 icon & map assets

Extracted from *Stream Strats 4 Fun* (template page + map slides), 07.11.2026.

## icons/operators/
75 operator icons named by operator (`capitao.png`, `tubarao.png`, `solid-snake.png`, …; accents dropped, spaces → dashes).
Identified by matching against the `r6operators` icon set. `unknown-attacker.png` is one attacker icon that set doesn't have.

## icons/gadgets/
`gadget-01`–`gadget-75`: the two gadget blocks of the template page (they mix attacker and defender gadgets), numbered left block then right block, left→right, top→bottom.
Named copies used by the strat board: `hard-breach.png`, `capitao-bolt.png`, `castle-panel.png`.

## icons/utility/
`utility-01`–`utility-18`: general utility (frag, smoke, stun, impact, shield, wire, etc.).
Named copies used by the strat board: `smoke-grenade.png`, `bp-camera.png`.

## icons/markers/
Site A/B, footprint, arrow, rappel, unknown (?).

## maps/
One PNG per map (2015×864), all floors side by side as on the slides.

## Used by the strat board (board.js)
- Operator tokens show `operators/<op>.png` inside the player-colour ring (first op for "X / Y"; falls back to the initial if no icon, e.g. "Smokes op").
- Glyphs: HB → hard-breach, FL → capitao-bolt, CA → castle-panel, CAM → bp-camera, SM → smoke-grenade, AJ → Nomad, TR → the trap owner (from the label, else the strat's Thorn/Fenrir/Kapkan/Frost/Lesion/Ela/Melusi). RF/RFE, holes and plant keep their drawings.
