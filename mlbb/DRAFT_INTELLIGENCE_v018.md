# MLBB v0.18 — draft intelligence (testing branch)

This update extends v0.17 without changing the HoK draft engine, the Chrome extension, MLBB account storage, or JSON backup schema.

## Simplified Hero Power entry

- The MLBB **Power** tab accepts the whole-number **Hero Power shown in MLBB** directly (for example, 2,500). No separate 0–100 confidence rating.
- Existing v0.17 `power` familiarity records remain in the JSON/local data unchanged. They are **not** converted to Hero Power or used in v0.18 scoring.
- New account-specific MLBB Hero Power records live under `heroPower` and stay independent of HoK's data; the existing MLBB backup format (`schemaVersion:1`) remains backward-compatible.
- Current scoring gives a small, capped tie-breaker: +1 point per 1,000 recorded Hero Power, at most +5. This is a simple heuristic, **not** a published Moonton conversion or a win-rate probability.
- No account sync was added. Users manually enter the number visible in MLBB.
- Tested: legacy backup restoration, preserving legacy ratings, validation of Hero Power, and scoring at 0 / 2,500 / 5,000 / 500,000.

## New behavior

- **Mechanic-specific counter opportunities** when an enemy pick is visible: anti-dash (Khufra, Minsitthar, Phoveus), anti-CC (Diggie), projectile defense (Lolita), anti-sustain (Baxia), anti-frontline damage (Karrie), anti-dive (Valir, Kaja, Franco, Akai), basic-attack deterrence (Belerick), shield absorption (Esmeralda), and isolated backline pressure (Natalia, Saber).
- **Candidate exposure warnings** when enemy heroes threaten the pick's own mechanism (e.g., Fanny vs Khufra or ranged projectiles vs Lolita).
- **Complementary ally synergies** for area CC + AoE follow-up, durable frontline + healing, and protection of an allied diver.
- **Draft Intelligence panel** summarizing the number of visible allies/enemies and relevant threat types.
- **Incomplete drafts:** When few allies are visible, potential gaps are not presented as proof that the final team lacks those roles.
- New service worker cache version precaches the engine for offline PWA operation.

## Important limits

- All labels and scoring weights are **manual gameplay heuristics**, not actual ranked matchup percentages, proprietary opponent win rates, or live match intelligence.
- A score is a relative *draft shortlist* metric, not a probability of victory.
- Tags are **curated**, not exhaustive or champion-patch-perfect. Ability effects, interactions and rank meta must be periodically reviewed. In particular, Floryn can have anti-heal-cleansing windows; healing reduction is not a guaranteed answer to her.
- **No hidden enemy is guessed.** The MLBB assistant only evaluates enemies entered into the visible draft.
- Original MLBB saves use `mlbb_solo_draft_state_v1`; the app's existing 0–100 familiarity values and separate HoK backups are preserved.

## Examples tested on this branch

| Selected hero | Visible enemy / ally | Expected outcome |
| --- | --- | --- |
| Khufra | Enemy Fanny | Bouncing Ball anti-dash opportunity |
| Diggie | Enemy Tigreal | Time Journey counter-control opportunity |
| Lolita | Enemy Chang'e | Projectile defense opportunity |
| Karrie | Enemy Hylos | Durable-frontline damage opportunity |
| Baxia | Enemy Estes | Healing reduction opportunity |
| Esmeralda | Enemy Harith | Shield absorption opportunity |
| Phoveus | Enemy Fanny | Punish frequent dashes |
| Fanny | Enemy Khufra | Dash-interruption risk |
| Lancelot | Enemy Minsitthar | Dash-restriction risk |
| Odette | Allied Tigreal | Area-control + AoE synergy |
| Layla | Enemy Nolan | Limited-escape risk |
| Layla | No enemies | No invented matchup counter |

The hero-data load, intelligence JavaScript, and inline application script compiled successfully. All 133 by 133 = 17,689 candidate/enemy evaluations ran without exceptions. Browser UI testing after deployment is still required.

## Reference material used to justify representative mechanisms

- Khufra's Bouncing Ball: https://www.mlbbguides.com/heroes/khufra/ and https://mlbb.tools/heroes/khufra
- Diggie's Time Journey: https://www.mlbbguides.com/heroes/diggie/
- Lolita's Guardian's Reflection: https://www.mlbbguides.com/heroes/lolita/
- Baxia's shield/HP-regen reduction: https://www.mlbbguides.com/heroes/baxia/
- Phoveus reactive anti-dash kit: https://www.mlbbguides.com/heroes/phoveus/
- Broad team composition concepts: https://www.ludo.guide/guide/mobile-legends-bang-bang/tips-secrets/counter-picking-draft-strategy/team-composition-synergy

## Approval workflow

Keep this on `staging/mlbb-draft-intelligence-v0.18` until user reviews. Merge only after approval. Do not update Chrome extension until MLBB functionality is refined and approved.
