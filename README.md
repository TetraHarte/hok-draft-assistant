# HoK Solo Draft Assistant v0.17.1 — Clean Draft Layout

Free browser-based draft assistant for Honor of Kings (HoK), with a separate Mobile Legends: Bang Bang (MLBB) workspace. Runs as a desktop web app or an installable iPhone PWA.

## Changes in v0.17.1

- Removed the full **Hero Picker** panel from the HoK Draft tab.
- **Solo Queue Recommendations** now follows **Quick Decision** directly.
- **Clear Draft** remains accessible in the Allies / Teammates section.
- Gold–Platinum: use **Fast Teammate Entry** to record up to four visible allies. Quick Decision works even before all allies are known.
- Diamond+: tap an ally, enemy, or ban slot to open a small contextual hero search; select a hero to fill that slot.
- Updated the service-worker cache identifier to `solo-draft-v0171-clean-layout` for the public PWA update.
- Preserved existing account, roster, Hero Power, draft timer, MLBB workspace, and recommendation-scoring behavior and saved-data schema.

## Basic usage

1. Select the correct account, rank, and preferred lane.
2. For Gold–Platinum, consult the immediate Quick Decision shortlist and add known teammates using Fast Teammate Entry.
3. For Diamond+, tap draft slots to enter observed allies, enemies, and bans; recommendations update as your draft develops.
4. Use **Clear** beside Allies / Teammates to reset the draft.
5. The app does not control the game, automatically read the in-game screen, or automatically start an in-game draft clock.

## Persistence and backups

Data is stored in the browser/PWA's local storage on each origin. Desktop, local staging (`localhost` or a LAN IP), and the published HTTPS site may have separate saved data. Refreshing a local preview does not prove that the published PWA has migrated correctly.

Before publishing, **export a JSON backup from the currently published app** and keep it somewhere safe. Do not delete the installed PWA or clear Safari website data just to force an update: that may remove locally stored profiles and Hero Power. Keep existing backups until the published update is verified.

## Publishing

GitHub Pages is intended to serve the repository's `main` branch from its root. After reviewing and merging the staging pull request, allow GitHub Pages to deploy, then open the published HTTPS page while online. Close and reopen the installed iPhone PWA, and refresh/reopen again if needed so the service worker can activate its new cache. Verify the on-screen version, Hero Picker removal, recommendations, accounts, roster, Hero Power, and offline availability.

This change updates the web/PWA files in the repository root. It does **not** bundle or update a separate Chrome extension; any installed extension requires its own update procedure.
