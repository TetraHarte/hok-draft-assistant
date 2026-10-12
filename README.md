# HoK Solo Draft Assistant v0.17.4 — Wang Wei Roster Addition

Free browser-based draft assistant for Honor of Kings (HoK), with a separate Mobile Legends: Bang Bang (MLBB) workspace. Runs as a desktop web app or an installable iPhone PWA.

## Changes in v0.17.4

- Added **Wang Wei** (Mist Sage / 王维), released on the Honor of Kings Global server on **October 8, 2026**, as the **119th** HoK hero.
- Registered as **Mid Lane • Control Mage**, using the existing control-mage trait, composition analysis, and baseline mage build logic. His ultimate provides mist-based traversal and map-wide rotation potential; this is **not** a secondary Roam role assignment.
- Set a **provisional B-tier** drafting baseline, pending real matchup and post-release performance data. No unverified direct counters, individual synergies, or role-specific win rates were invented.
- Added searchable aliases: `Mist Sage`, `Wangwei`, `王维`, `王維`. Existing accounts can mark Wang Wei as owned under **Roster** to include him in draft recommendations; optional Hero Power remains account-specific.
- Preserved all 118 previous hero records, previous recommendations/builds, MLBB files, and saved-account schema. Updated the PWA asset version and service-worker cache to **v0.17.4**.

**Release reference:** [Honor of Kings official Season 16 patch note mirror](https://playaware.gg/games/honor-of-kings/wiki/article/9-23-season-16-flow-as-one-patch-notes) · [Liquipedia Wang Wei hero details](https://liquipedia.net/honorofkings/Wang_Wei)

**Regression test:** `node tests/wang-wei-roster.test.cjs`.

## Changes in v0.17.3

- The 15 secondary Roam heroes now have role-specific **editorial Roam-fit tiers**, separate base scoring stats, and support-oriented utility traits (frontline, initiation, lockdown, peel, sustain and poke). These replace their Clash/Mid scoring attributes **only when Roam is selected**.
- The Roster's Roam filter and the draft recommendations show the Roam-fit tier for these flex picks. All existing primary-lane tiers and item builds are preserved.
- Each flex hero now has a dedicated 6-slot Roam build, a battle spell, and a 30-slot Arcana template. Every Roam build includes roaming equipment and boots. The first displayed full roaming item is an eventual upgrade: start with the basic roaming-income component.
- Anti-heal, defensive/dive/CC and anti-frontline adaptations are available on Diamond+ when opponents are visible. Gold/Platinum blind picks retain the conservative baseline until threats become known.
- Roam build adaptation never replaces the roaming equipment in slot 1. Quick Decision and role-fit explanations also use the Roam-specific traits.
- When enemies have multiple possible lanes, direct same-lane counter labels conservatively use their primary lanes rather than assuming a secondary Roam pick is definitely supporting.
- Updated the offline PWA cache revision and script reference. **No saved account data schema changes or resets.**

### Data caveat and build references

Roam-fit tiers and numerical scores are **editorial drafting heuristics**, not live Roam win-rate estimates or guarantees. Item recommendations are starting templates; actual builds depend on the current in-game patch, team composition, and match conditions.

- [HoK Hub equipment reference — Guardian and Crimson Shadow roaming items](https://hub-game.com/hok/en/items)
- [Mozi sample support configuration](https://hub-game.com/hok/en/heroes/mozi)
- [Yuhuan sample support configuration](https://hub-game.com/hok/en/heroes/yang-yuhuan)
- [Liu Bang support configuration](https://hub-game.com/hok/en/heroes/liu-bang)

### Regression checks

Run `node tests/roam-flex.test.cjs` in the repository to check all 15 role profiles, build slot integrity, role switching, the owned Roam shortlist, and conditional item adjustments.

## Changes in v0.17.2

- Added **Roam as a secondary eligible lane** for Mozi, Lian Po, Xiang Yu, Ziya, Shi, Dun, Flowborn (Tank), Princess Frost (Wang Zhaojun), Guan Yu, Liang, Liu Bang, Yuhuan, Bai Qi, Dharma, and Ata.
- All 15 retain their **original primary lanes**; they are still available for Mid Lane / Clash Lane picks.
- Roam draft recommendations and the Roster and Hero Power lane filters now include those flex heroes when applicable, subject to ownership and draft exclusions.
- Multiple eligible lanes are displayed together; role-specific hero scoring tiers and build presets have **not** been rebalanced in this update.
- Refreshed the iPhone PWA cache and app.js asset revision to distribute the roster change without changing saved-data schema.

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
