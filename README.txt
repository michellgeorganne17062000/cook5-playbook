[COOK5] Playbook — Telegram Mini App
============================================
1) HOST THE FOLDER (pick one)
   GitHub Pages: repo Settings → Pages → Deploy from a branch → main / (root).
   You get a link like https://michellgeorganne17062000.github.io/cook5-playbook/
   Netlify Drop: open https://app.netlify.com/drop, drag this whole folder in.
   You get a link like https://something.netlify.app — copy it.
   (Create a free Netlify account so the link doesn't expire; to update, open the
   site > Deploys and drag the new folder in again — the link stays the same.)
2) CREATE THE BOT
   In Telegram open @BotFather → /newbot → name it (e.g. D8 Playbook) → get the bot.
3) ATTACH THE APP
   @BotFather → /mybots → your bot → Bot Settings → Menu Button → Configure menu button
   → paste the https link → button text: Playbook
   (Optional: /newapp to also get a t.me/yourbot/playbook direct link.)
4) SHARE
   Teammates open the bot and tap "Playbook". Language: RU/EN button top right.
   Favourites sync per Telegram account; checklists and dragged tokens save per device.

MATCH TRACKER ("Матчи" tab)
   Log every match: map, mode, score, rounds by side, per-player K/D and operator,
   plus mistakes, takeaways and goals for the next matches. Stats tab aggregates
   win rate, records by map and per-player K/D; Goals tab holds the team's targets.
   The log saves on the device (localStorage + Telegram CloudStorage per account).
   To share the log with the team: Log tab → Export → send the text to the chat —
   teammates paste it and tap Import (entries merge, no duplicates).
