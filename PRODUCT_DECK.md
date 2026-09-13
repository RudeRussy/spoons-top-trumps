# SPOONS TOP TRUMPS — Product Deck

---

## Slide 1 — SPOONS TOP TRUMPS: the entire menu as a phone game

- **One-line pitch:** a free, no-install card-battle game where customers play real Wetherspoon menu items against each other — with real prices and kcal.
- **Live demo:** https://ruderussy.github.io/spoons-top-trumps/ — opens in any phone browser in under 2 seconds.
- **Screenshot placeholder:** insert a phone mock of the title screen + the "CHOOSE YOUR SPOONS" picker here.

**Speaker notes** — Say: "This is what we are asking you to trial — a game customers already play on the bus and at the table." Do NOT say it is an official Wetherspoon product or that it is inside the Wetherspoon app. **Single measurable point:** the demo loads on a 4G phone in under 2 seconds and needs no install.

---

## Slide 2 — The problem/opportunity: empty tables after 6pm

- Pubs need a reason for customers to stay after 6pm on quiet weekdays.
- Customers need a low-effort, group-friendly activity that doesn't require planning or equipment.
- Wetherspoon does zero organic social media and has no owned social mechanic inside its pubs.
- A lightweight, branded, order-linked game turns dead tables into active, longer-stay groups.

---

## Slide 3 — What it is: the game

- **Order to play.** The game unlocks when the customer orders via the Wetherspoon app — play is a reward for ordering, not a replacement for it.
- One deck of 201 real menu items — Full English to the Empire State — with real prices and kcal, split between two players.
- Each round shows a card stat (kcal, price, grease, hangover cure, regret, carpet match) — pick a stat, higher wins, winner takes the card.
- The Landlord AI plays the house side — it learns which stats you favour and counters you.
- Win rounds to build a combo; clear waves to beat the Spoons AI; win the match to take the whole menu.
- The loser sees the roast screen: their worst stat and a roast from the Landlord, ready to share.

---

## Slide 4 — Why it spreads: order-first + forfeit

- **Order to play:** customers must order via the app to unlock the game — play is a reward for an order, so basket is the entry ticket.
- **Loser forfeit:** the player who loses the match gets a forfeit — most often "buys the round" — which converts the loss into an order.
- **Screenshot:** the roast-the-loser screen travels to the group chat; the next group arrives to play.
- **Rematch:** loss creates demand, and one game almost always leads to one more round — "one more, but drinks first".

---

## Slide 5 — The estate layer: real prices at the pub you're in

- The game recognises 819 Wetherspoon pubs — the player picks their pub, and the menu and prices become that pub's.
- A "PLAYING AT [Pub Name]" line on the title screen ties every session to the venue.
- Example — Traditional Breakfast: £4.29 at the Red Lion vs £7.29 at a central London pub. Same item, different price, different game.
- This makes the game feel local every time, even when played by tourists or away fans.

---

## Slide 6 — Zero-stack architecture

- The game is a static web file hosted on GitHub Pages; it runs on any phone browser.
- Spoons IT has nothing to host, maintain, or secure — no servers, no databases, no backend.
- No user accounts, no emails, no payment data, no personal information collected.
- A QR code on the table is the entire technical footprint.

---

## Slide 7 — What the trial looks like

- One pub, one week, one QR card on tables and the bar.
- Cost to Spoons: roughly the price of the paper card.
- We measure link opens, play sessions per pub, rematch rate, share rate, and a dwell proxy.
- The pub manager gets a one-page weekly summary: sessions, games played, top item, rematch rate.

---

## Slide 8 — What the national rollout looks like

- A lightweight name licence lets Wetherspoon endorse the game without building it.
- Continued access to the public per-pub menu PDFs (or a simple data feed) keeps prices live across the estate.
- A feature slot in the Wetherspoon app can surface the game by pub location — order first, play after.
- New rounds, seasonal items, and tie-ins with food and drink promotions keep the estate fresh.

---

## Slide 9 — KPIs we measure

- Link opens per pub per day: top-of-funnel interest.
- Play sessions per pub: how many groups actually start a game.
- Rematch rate: percentage of sessions that start a second game in the same visit.
- Share rate: proxy for group-chat spread.
- Dwell proxy: time between first game open and last order signal.
- Incremental round orders: manager-reported uplift during trial week, plus order-linked play rate (how many orders unlock a game, how many games end in a forfeit order).

---

## Slide 10 — What we need from Wetherspoon

- Permission to use the Wetherspoon name and pub names in the game experience (name licence).
- Stable access to the public per-pub menu pages — we already read them, but explicit OK removes business risk.
- One trial pub and one week to put a QR card on tables.
- A single point of contact to review the weekly one-page summary and decide the next step.

---

## Slide 11 — Team and contact

- A small team that builds fast; the live game exists now, the trial can start this week.
- Contact: [name, email, phone]
- Materials: demo link, one-pager, and live game available on request.

---

## Slide 12 — Next step: pick one pub, we'll be live in days

- Choose the trial pub — any Spoons with manager buy-in.
- We generate the pub-specific QR card and short link within 24 hours.
- Print and place the cards; run for one week.
- Review the one-page summary together and decide whether to expand, tweak, or stop.

---

## Speaker notes on the order-link model

**The core mechanic:** The Wetherspoon app already supports order-and-pay with table delivery. The game plugs into that: a customer scans a QR at a table, orders drinks or food via the app, and the game unlocks *only after* the order confirms. The order is the arcade token. From the customer side this reads as "order first, get a game for free"; from Wetherspoon's side it reads as "every game session starts with a paid order". Starbucks' Starland and McDonald's Monopoly are the proven examples: purchase unlocks play, play unlocks a reward, the reward drives a second order. Greggs' "buy 9 get 10th free" is the UK proof that simple, app-native rewards stick. **What we don't do:** promise prizes without sign-off; promise till integration we don't control; imply customers can play without ordering.
