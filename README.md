# HoK Solo Draft Assistant v0.18.0 — Conservative Draft Safety & Dunshan

Free browser-based Honor of Kings drafting tool for desktop and iPhone PWA; Mobile Legends remains a separate, unchanged workspace.

## v0.18.0 review branch (not merged)

- **Dunshan:** added as the 120th unique hero, primary **Roam**, provisional **C-tier** Vanguard Tank. Search aliases: Shield Eternal / 盾山. His six-item Roam template is provisional and includes a Roam support item; it is not a verified optimal build. Existing account ownership is **not** automatically changed.
- **October 21, 2026 Global patch:** new Dunshan; patch-review flags for confirmed buffs **Sun Ce, Yuhuan, Lady Sun, Arke** and stat adjustments **Zilong, Lian Po, Dun**. No quantitative draft-score offsets are applied until the changes are independently assessed. Profiles for the seven are flagged for reassessment; the game update did not establish new positions, reliable matchup data, or exact 99% win probabilities.
- **Non-tank Roam composition-safety gate:** verify Clash/Jungle/Mid/Farm lane coverage, distinguish primary-role feasibility from unconfirmed flex-lane assignments, and assess visible frontline anchors, initiation, CC, damage distribution, carry peel, and enemy dive. Explicit rejected, conditional, frontline, and future approved states. With blind enemy picks or incomplete ally data, a non-tank option cannot receive matchup-approved status. Severe weaknesses cause rejection.
- **No fabricated confidence:** the hand-authored evaluator is not statistically validated; no pick is designated '99% safe.' The gate currently withholds non-tank Roam heroes from automatic Ranked recommendations until independently validated. In Normal mode it can show conditional alternatives only when all four teammates plausibly occupy distinct primary lanes and the structural safety screen passes. Unconfirmed flex-lane teams receive manual-review warnings, not automatic non-tank choices. Eligible conditional alternatives are labeled UNVERIFIED SUPPORT in Quick Choice.
- **Per-account Ranked versus Normal choice:** controls the recommendation behavior without changing the account's existing Rank or rewriting saved Hero Power. Use Normal for informed practice; Ranked uses conservative auto-picks.
- **Inspect all owned, role-eligible heroes:** new Hero Explorer lists options that did not make the top three/five. A rejected or conditional hero stays inspectable, with reasons. Existing Jungle, Clash and Farm eligibility is unaffected.
- **Account/PWA safety:** no storage-schema migration, no automatic ownership changes, no MLBB changes. Updated app/service-worker cache to version 0180-dunshan.
- **Regression and CI:** `.github/workflows/draft-safety-v0180.yml` runs syntax checks and `node --test tests/*.test.cjs` on the feature branch and pull requests. Historical hero-count/cache expectations were updated; await a passing GitHub Actions run before merge.

**Primary patch source:** [Official October 21 Global server announcement](https://www.honorofkings.com/global-en/news-detail.html?content_id=aca43154a906da4284abe1ea47fe9521f856&father_content_id=aca43154a906da4284abe1ea47fe9521f856&sid=576). The global server announcement was published October 20. Only draft-relevant updates were coded; anniversary cosmetics/events do not influence recommendations.

**Release gate:** Do not merge until the user has reviewed the interface, regression tests have been run in a local Node/browser environment, and high-confidence non-tank recommendations have been validated against representative real-match evidence. The 99% precision target is a future statistical validation objective, not an existing capability.

---
# HoK Solo Draft Assistant v0.17.5 — Multi-Lane Roster Expansion

Free browser-based draft assistant for Honor of Kings (HoK), with a separate Mobile Legends: Bang Bang (MLBB) workspace. Runs as a desktop web app or an installable iPhone PWA.

## Changes in v0.17.5 — Secondary and tertiary lanes

- Added **31 assignments across 30 existing heroes** to the Global roster. Now **42 of 119 heroes have multiple eligible roles** (46 secondary/tertiary lane entries). Example: **Chicha — Clash/Jungle/Farm**; **Diaochan — Mid/Clash**.
- Existing 15 secondary Roam entries, Roam-specific scoring/builds, all single-lane primaries and existing account data are preserved.
- Non-Roam flex draft scoring and tiers are deliberately **conservative/provisional**. Their role-based confidence is capped at Medium; off-role primary S/A ratings are capped at B pending matchup evidence. A flex pick is *eligible*, not automatically meta-optimal.
- Flex preview uses a **provisional role-appropriate six-item template** rather than a mismatched primary preset: Jungle includes a jungle item and Smite; Chicha's Farm and all secondary Clash/Mid entries have positional fallback loadouts. Actual hero-specific builds should be developed and verified separately.
- No account-save schema changes, no Hero Power resets and no MLBB changes. The v0.17.5 service-worker cache forces a clean PWA refresh.
- Sources: [HoKStats Global heroes/positions](https://hokstats.gg/heroes/), [Liquipedia Chicha](https://liquipedia.net/honorofkings/Chicha), [Liquipedia Diaochan](https://liquipedia.net/honorofkings/Diaochan_%28Honor_of_Kings%29), [Liquipedia Da Qiao](https://liquipedia.net/honorofkings/Da_Qiao), [Liquipedia Lapulapu](https://liquipedia.net/honorofkings/Lapulapu). These describe documented role eligibility, not verified position-specific win rates. The less conventional flexes still need playtesting.
- Regression: `node tests/flex-lanes.test.cjs`.

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
