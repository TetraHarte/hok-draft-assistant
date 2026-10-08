# HoK Solo Draft Assistant v0.16.2 — 30s Blind Pick Quick Decision

Free desktop Chrome extension and iPhone PWA. This update retains the v0.16.1 data schema and JSON backup/restore compatibility.

## Changes
- Gold–Platinum quick shortlist **above** Hero Picker, immediately visible even with no teammates entered.
- Three differentiated choices: best current, frontline backup, damage alternative (depending on roster).
- 30-second *manual* selection clock. Start it when the in-game selection starts; it cannot detect the game's clock automatically.
- At 10 seconds the shortlist is held to prevent distracting late switches; at 5 seconds only the primary choice is emphasized. Use **Re-evaluate picks** to override.
- Missing teammate intentions remain unknown, not immediately treated as missing frontline/CC. Composition repair weighting builds from 3/4 to 4/4 known allies.
- Fast teammate entry by typing 2 letters and tapping the matching hero; all four ally slots are optional.
- Dun has hero-specific engage recognition, fixing a classification issue identified during the 3-game trial.
- Existing detailed draft advice, power, adaptive builds, accounts and backups remain available.

## Usage
1. Set the correct account, Clash Lane and Gold/Platinum rank environment.
2. Check the immediately displayed shortlist before the timer begins.
3. Optionally type known teammate heroes; **you do not need to enter all four**.
4. Start the 30-second clock when your selection window begins. At 10 seconds, commit to one of the held picks and select it in HoK.
5. The tool does not lock your hero in-game and does not read the HoK screen.

## Compatibility and backup
Desktop: load the `chrome-extension-v0161` folder unpacked (folder name kept so existing extension installations can be upgraded without changing the load path). For an already installed extension, replace its files in place, then Reload under chrome://extensions so stored local data remains available.

iPhone: publish the *contents* of `iphone-pwa-v0161` to HTTPS/GitHub Pages root; service-worker cache version v0162 ensures a clean offline update. You may have to fully close/reopen the installed PWA after deployment.

The iPhone and desktop versions retain independent browser storage; export/import JSON to transfer accounts. Back up both sides before replacing existing app files. This update does not use paid APIs or services.

GitHub Pages: Settings → Pages → Deploy from main / root.
