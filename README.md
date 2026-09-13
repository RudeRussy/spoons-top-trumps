# SPOONS TOP TRUMPS

A playable scaffold for the Wetherspoons menu battle game. Single file, no build step,
no dependencies. Open it and play:

```
open spoons-top-trumps/index.html
```

## The game (as scaffolded)

- 18 menu cards, dealt 9–9 against **THE SPOONS** (the house).
- You see your top card; theirs stays face-down. Pick a stat.
- Highest stat wins — **except PRICE and REGRET, where lower wins**.
- Winner takes both cards (plus the pot). Draws push cards into a pot;
  the next decisive round hoovers it.
- Whoever won the last round picks the stat next round (classic Top Trumps rule).
- Lose your last card and it's last orders.

## Where to extend it (the whole point)

Everything lives in `index.html`, in clearly labelled sections:

| Section | What it's for |
|---|---|
| `1. DATA` | `STATS` (add a stat — every card needs the key) and `CARDS` (add menu items) |
| `2. ENGINE` | `compareStat`, `aiChooseStat` (difficulty knob), `settle` |
| `3. GAME STATE` | `game` object + turn flow (`beginRound → resolveRound → endGame`) |
| `4. UI` | render functions — cards, verdict lines, buttons |
| `5. WIRING` | click handlers |
| `6. DEBUG` | `window.__game` (poke state), `window.__autoplay()` (headless full-game run) |

### Obvious next moves

- **AI difficulty**: swap `aiChooseStat` to pick the stat where the AI's card is strongest.
- **Animations**: round-award swipe between cards, pot counter bounce.
- **Sound**: one "bell" sample on round win is all it needs.
- **2-player pass-and-play**: reuse the engine; hide the picker's screen.
- **Real menu photos** instead of emoji card art.
- **Leaderboard** in `localStorage`.

## Honest caveats

- Prices and calories are **vibe data** — roughly right, absolutely not the real menu.
- Emoji card art is placeholder; fine for vibe-coding, swap for photos later.
- Scaffold rule: whoever wins the round picks the next stat. If you'd rather the
  player always picks, flip `game.turnOwner` handling in `settle()`.