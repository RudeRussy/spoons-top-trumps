# SPOONS TOP TRUMPS — ARCADE EDITION

A playable card-battle game using **the entire current Wetherspoons menu** — 201 items
with real prices and calories (Sep 2026 compilation), plus house-vibe stats.

**Play:** https://ruderussy.github.io/spoons-top-trumps/

Single file, no build step, no dependencies. Edit `index.html` → `git push` → live in ~30s.

## The game

- **9 stats per card**: kcal, price (low wins), grease, dodginess, hangover cure,
  regret (low wins), carpet match, messiness, speed (low wins — minutes to table).
- Real price + calories from the actual 2026 Spoons menu. Vibe stats are house opinion,
  rule-based per category with hand overrides (Gravy carpets at 10, Miner's Benedict
  dodgier than the classic, the Empire State is a 12-minute, 1,883-kcal monster).

## Modes

| Mode | What it is |
|---|---|
| **ARCADE** | You start with 6 cards, the Spoons sends waves. Waves get harder: Punter → Regular → **THE LANDLORD** (counters your favourite stats). Score, combo multipliers up to ×5, wave bonuses. |
| **CLASSIC 9V9** | The whole 201-card menu split in half. Winner of a round picks the next stat. Last one holding cards wins. |
| **ENDLESS** | You have 6 lives. Win = steal their card, lose = lose yours. How long can you last? |
| **PVP PASS & PLAY** | Two players, one device. Winner of each round picks the next stat. **First to 25 captures wins the match** (bounds the game — 201 cards is too big for a full sweep). |

## Arcade dressing

- CRT scanlines + flicker, screen shake on wins/losses, card deal/flip/defeat animations
- Synthesized chiptune audio (Web Audio, no files): win fanfares, coin, game-over sting
- Combo popups, pot hoovering, capture counters
- **Menu browser**: search + category chips across all 201 items, tap any for the full card
- Local leaderboards + 3-letter initials entry per mode
- Keyboard: `1–9` pick stat · `ENTER` next round · `M` mute · `P` pause

## Extending it

Everything in `index.html`, labelled sections:

| Section | What it's for |
|---|---|
| `1. DATA` | `CARDS` (the menu), `STATS`, category tables, `OVERRIDES` for per-item vibe fixes |
| `2. AUDIO` | Web Audio bleeps — `AudioFX.win()` etc. |
| `3. ENGINE` | `compareStat`, percentile tables, `aiChooseStat` (AI difficulty) |
| `4. STATE + MODES` | `MODES` config, `startGame`, `settle`, mode gates |
| `5. UI` | renders, banter lines, attract mode |
| `6. BROWSER` | menu browser |
| `7. WIRING` | listeners + keyboard |
| `8. DEBUG` | `window.__game` (poke state), `window.__autoplay(mode)` (headless full game) |

Debug hooks in devtools: `__autoplay("arcade")` runs a full game with no UI and returns
the score tally — if it returns something sane, the engine's fine.

## Honest caveats

- Prices vary per pub; the site compiled here is an unofficial aggregator. Good enough
  for a card game, not for tax purposes.
- Cold-drinks pints are representative (Spoons has no national pint price) —
  Carling/Stella/Guinness/guest ale at plausible 2026 prices.
- Vibe stats are subjective by design. Argue with your mates, not the README.
- Unofficial, unaffiliated, unbothered.