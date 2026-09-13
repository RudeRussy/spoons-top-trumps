# Commercial + Technical Proposal — Spoons Top Trumps

> Trial posture: internal trial only. No public launch without JD Wetherspoon approval.

**Prepared for: J D Wetherspoon plc — digital and marketing leadership**
**Prepared by: [Name, contact]**
**Date: September 2026**

---

## 1. Executive summary

Spoons Top Trumps is a live, playable arcade card game built from the real Wetherspoon menu — per-pub prices, real items, real kcal, played between customers at a table. The mechanic is order-linked: today a customer taps "I HAVE ORDERED" to unlock play; on rollout, a receipt QR from the Wetherspoon Order and Pay app unlocks play, so every session begins with a paid order. We are asking for a single-pub, single-week trial with a QR poster at tables — cost to Wetherspoon: roughly the printing. The game is live today at [demo link] and requires no build from Wetherspoon.

## 2. Product description

Customers scan a QR code at their table, select their pub from 819 supported across the estate, and play Top Trumps-style rounds against the house AI or against each other. Cards are real menu items — Full English to the Empire State — with real per-pub prices and kcal pulled from that pub's own published menu. The house Landlord AI learns the player's preferred stats and counters them. Wins stack into combos; losses trigger a roast screen, shared by WhatsApp to the group. Today the game unlocks via an honour-system "I HAVE ORDERED" tap; on rollout, a receipt QR from the Wetherspoon app unlocks play. The "loser buys the round" forfeit turns the loss into an order.

**Scale:**

| Metric | Value |
|---|---|
| Pubs supported | 819 (all with published menu PDFs) |
| Menu items in play | 201 across 14 categories |
| Per-pub matched cards | 41 median |
| Play modes | Arcade, hotseat duel, online PvP |
| Install required | None |

## 3. Technical architecture

The game is a single static web file hosted on GitHub Pages. No servers, no user accounts, no database, no PI collected, no backend operations for Wetherspoon. Customers open a URL; the game loads in under 2 seconds on 4G. Menu data is compiled nightly from Wetherspoon's own publicly posted per-pub PDF menus — no access to any private system, EPOS, or internal API. The pipeline: public sitemap – per-pub menu page – menu PDF – parsed to per-pub JSON – merged into static data files – deployed with the game.

| Component | Today | On deal |
|---|---|---|
| Game code and hosting | Ours, on GitHub Pages | Ours, or handed over on licence |
| Per-pub menu data | Compiled from public menu PDFs | Feed or explicit permission on the same public documents |
| Name usage | "Spoons" is descriptive pub slang; no logo, no trade dress | Licence for the JD Wetherspoon mark in title and cards |
| Ordering integration | QR to Wetherspoon app | Game-link placement in the app (optional) |

## 4. Data and legal readiness (not legal advice)

Menu facts (item names, prices, kcal) are public information; we do not scrape private systems. We avoid every logo and do not mimic carpet trade dress beyond a generic pub pattern. The current game name **"Spoons Top Trumps"** uses marks owned by Winning Moves (TOP TRUMPS) and JD Wetherspoon plc — both require licences before any public commercial use; we do not approach either without a signed licence. Fallback names if the marks stay with their owners: **Pub Stat Wars**, **Card Carpet**, **The Spooning Game**. A licence from Wetherspoon would formally clear in-game name use, per-pub menu data use, and any co-marketing.

## 5. Trial design — single-pub pilot

**What we ship:** QR posters and table cards for one nominated pub; the live game; a one-page manager guide. Staff do nothing except display the card. Customers scan, order via the app, and play.

**What we do not do during the trial:** no public marketing, no social posts, no in-app feature slot, no press, no brand push — the game is not promoted as a Wetherspoon product anywhere during the pilot.

**What we measure:** link opens per pub per day; play sessions per pub; rematch rate; share rate via in-game share events; order-linked play rate (how many orders unlock a game); manager-reported dwell and round uplift.

**Success threshold:** 30+ sessions in the trial week, >60% round completion, positive staff feedback, and measurable incremental round orders. If the thresholds aren't hit, the trial ends with the data.

**Cost to Wetherspoon:** printing the QR cards and poster (under £30). Nothing else.

**Timeline:** Day 0: pub nominated. Day 1–3: materials printed, pub live. Day 4–17: live trial. Day 18: read-out and decision.

## 6. National rollout sketch

At national scale all items sit behind a signed name licence: use of the Wetherspoon mark, pub names in-game, any in-app feature slot, and any co-marketing. Data route: (a) a daily or weekly feed of per-pub menu PDFs or JSON, or (b) continued access to the publicly posted menu PDFs with explicit written permission. No national rollout, brand push, or public marketing without JDW approval. Optional: a feature slot inside the Order and Pay app — "order, then play" — to reinforce the order-linked loop. Our support model: automated pipeline monitoring, a shared channel for pub managers, 48-hour SLA on data or gameplay issues during rollout.

## 7. Commercial model

**Reward model layer**

- A reward code is a short alphanumeric string shown when a customer wins a match. The customer shows the code at the bar when they place their next order.
- First-tier trial reward: a free hot drink with the next order. Codes redeem only against a future order, not against current stock, so the trial bar cost is zero.
- Escalation tiers: hot-drink stamp (buy 4, get the 5th free), club-night discount, or a free side with a main.
- Codes are sight-checked by bar staff in the trial; no till integration or stock write-off is required.

**Licensing options, to be negotiated after the trial:**

- **A) Sponsored licence.** Wetherspoon pays for estate-wide availability — an annual platform fee or a per-pub fee (indicative £15–£30 per pub per year). Includes sponsored rounds and seasonal menu tie-ins.
- **B) White-label.** We hand over the code, the data pipeline, and the documentation; Wetherspoon or its agency operates it under the Wetherspoon brand. One-time transfer fee plus a smaller annual support retainer.
- **C) Co-marketing.** Free licence, attribution, both sides promote. No direct fee; we monetise through premium rounds or third-party brand tie-ins, with JDW retaining veto rights.

We will not pitch a price list before the trial — numbers follow evidence.

## 8. Next step

Nominate one pilot pub and a single point of contact, and we will have the trial live within **72 hours**. A one-page overview is in `SPONSORSHIP-ONE-PAGER.md`. Questions and trial approvals: **[Name, role, email, phone]**.

---

## Appendix — evidence record

All of this is verifiable live today:

- Game: https://ruderussy.github.io/spoons-top-trumps/
- Menu data source: public Wetherspoon per-pub PDF menus (e.g. `https://www.jdwetherspoon.com/pub-menus/the-black-horse-birmingham/` → menu PDF)
- Estate: 819 pubs indexed from the public JDW site (`pub-menus-sitemap.xml`)
- Per-pub variance proof: Traditional Breakfast £4.29 (Red Lion Crawley) vs £7.29 (central London pubs); Eggs Benedict £13.10 at The Piazza, Birmingham
- Repo: `RudeRussy/spoons-top-trumps` on GitHub
