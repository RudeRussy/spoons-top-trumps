# SPOONS TOP TRUMPS — Product Deck

---

## Slide 1 — SPOONS TOP TRUMPS: the entire menu as a phone game

- **One-line pitch:** a free, no-install card battle built from Wetherspoon's real menu, prices and calories.
- **Live demo:** https://ruderussy.github.io/spoons-top-trumps/ — opens in any phone browser in ~2 seconds.
- **Screenshot placeholder:** insert a phone mock of the title screen + the “CHOOSE YOUR SPOONS” picker here.

**Speaker notes** — Say: “This is what we are asking you to trial — a game customers already play on the bus and at the table.” Do NOT say it is an official Wetherspoon product or that it is inside the Wetherspoon app. **Single measurable point:** the demo loads on a 4G phone in under 2 seconds and needs no install.

---

## Slide 2 — The problem/opportunity: empty tables after 6pm

- Pubs need a low-friction reason for groups to stay at the table between rounds.
- Customers already stare at their phones; give them something to do that points back at the pub.
- Wetherspoon does almost no social media marketing — the game turns customers into the channel.

**Speaker notes** — Say: “After the first round, someone checks the football score; after the second, the group gets quiet. We give them a 90-second duel that makes them order again.” Do NOT promise viral growth or claim this replaces Wetherspoon's marketing. **Single measurable point:** a trial must show whether play sessions happen during dwell-time gaps, not just at home.

---

## Slide 3 — What it is: a card battle against the house

- Each card shows a real menu item with six stats: kcal, price, grease, messiness, hangover cure and regret.
- Lower wins on price and regret; higher wins on everything else — easy to learn in one round.
- Three modes: arcade survival, classic duel and pass-and-play PVP for two players on one phone.
- The **Landlord AI** escalates through waves and counters your favourite stats; menus are per-pub and use real local prices.

**Speaker notes** — Say: “The game feels like Top Trumps, but the cards are your actual breakfast, curry and pint. The Landlord is the house AI that gets harder as you win.” Do NOT say the AI is personalised or uses customer data. **Single measurable point:** 201 real menu items are already mapped across the estate.

---

## Slide 4 — Why it spreads: group-chat physics

- **Forfeit:** the loser of a round gets a daft on-screen dare, e.g. “buy the next round” or “read the menu aloud”.
- **Roast:** winner taps “roast the loser” and the game writes a shareable insult based on the cards played.
- **Screenshot:** the roast card is formatted for WhatsApp, Instagram Stories and pub group chats.
- **Rematch:** the link *is* the game — no install means the loser can challenge back in three taps.

**Speaker notes** — Say: “The loop is not in your app; it is in WhatsApp. The screenshot is the advert and the rematch is the retention.” Do NOT promise specific share counts or organic reach. **Single measurable point:** we measure rematch rate as the strongest signal that the loop is working.

---

## Slide 5 — The estate layer: 844 pubs, real menus, real price gaps

- The game already maps **844 distinct Wetherspoon pubs** from the public site structure and menu data.
- A “PLAYING AT [pub name]” line loads that pub's actual menu prices, so the cards feel local.
- Example: **Traditional Breakfast is £4.29 at The Tanners Hall, Darlington** and **£7.29 at some airport/central sites** — the card reflects the pub you pick.
- That local-price hook makes the group say “our Spoons is cheaper” and share the proof.

**Speaker notes** — Say: “We can show a card that says The Tanners Hall, Darlington: Traditional Breakfast £4.29 and another pub at £7.29. The estate itself becomes content.” Do NOT say we have a formal Wetherspoon data licence yet. **Single measurable point:** 844 pub slugs are already in the data files and 781 of them carry a Traditional Breakfast price.

---

## Slide 6 — Zero-stack architecture: nothing for Spoons IT to run

- One static HTML file, served from GitHub Pages, with no server, no database and no backend.
- No accounts, no sign-up, no cookies and no personal information beyond the pub the player picks.
- We already use Wetherspoon's public site structure and menu PDFs; nothing needs to change on jdwetherspoon.com.
- Update path is edit → git push → live in ~30 seconds; hosting is free and resilient.

**Speaker notes** — Say: “Your IT team does not host this, secure it or scale it. It is a webpage. If we need to fix a price, we push a commit.” Do NOT imply this has been through Wetherspoon security review. **Single measurable point:** the entire game is under 200KB compressed and has zero infrastructure cost to Wetherspoon.

---

## Slide 7 — What the trial looks like: one pub, one week, one QR card at tables

- Pick one pub. We generate a QR card and short link that land directly in that pub's version of the game.
- Place tent cards or beer mats on tables for one week; cost is roughly the paper they are printed on.
- Staff do not need training, tablets or tills integration — customers scan, tap and play.
- We collect link opens, play starts and rematch clicks from that pub's traffic only.

**Speaker notes** — Say: “This is the cheapest product trial you can run. One pub, one week, some printed cards. No app update, no till change, no staff brief beyond ‘if a customer asks, the QR is on the table’.” Do NOT promise measurable sales lift before the trial. **Single measurable point:** within seven days we will know link-opens, play starts and rematch rate for that single pub.

---

## Slide 8 — What national rollout looks like: three doors into the Wetherspoon ecosystem

- **Name licence:** permission to use the Wetherspoon marks in the game title and card dressing, subject to brand guidelines.
- **Data feed:** a weekly price/menu feed replaces our PDF scraping and keeps every pub accurate automatically.
- **App feature slot:** a “Play Top Trumps” tile inside the Wetherspoon app drives discovery without building the game twice.

**Speaker notes** — Say: “The lightest path is the name licence plus the public data we already use. The strongest path is a feature slot in the app that opens the same URL.” Do NOT promise app installs or suggest building a native game. **Single measurable point:** the game works identically from QR, app tile and shared link — one URL, three entry points.

---

## Slide 9 — KPIs we measure: what we will actually report back

- **Link opens** per pub per day — baseline attention from the QR and shared links.
- **Play sessions** per pub — sessions that reach the first dealt hand, not just the landing page.
- **Rematch rate** — percentage of finished games that start another game within five minutes.
- **Share rate** — percentage of sessions that use the roast/screenshot feature.
- **Dwell proxy** — average time from first play to last rematch in a single visit.
- **Incremental round orders** — measured via till proxy if a pub can tag a “game trial” period.

**Speaker notes** — Say: “We are not asking you to trust a vibe. We will report these six numbers weekly. The strongest signal is rematch rate, because a rematch means the game kept the group at the table.” Do NOT claim we can directly attribute every extra pint to the game. **Single measurable point:** rematch rate is the north-star KPI.

---

## Slide 10 — What we need from Wetherspoon — and what we need them NOT to change

- We need: a licence to use the Wetherspoon name and marks in the game, within brand guidelines.
- We need: either a simple menu/price feed or permission to continue using public menu PDFs and site data.
- We need: one pilot pub and one week to place QR cards on tables.
- We need them **NOT** to change: the current public site structure, pub URLs or PDF menu format — our parser relies on them and they are already public.

**Speaker notes** — Say: “The ask is tiny: a name licence and a pilot pub. We are already consuming your public site, so please do not break those URLs for us.” Do NOT ask for access to internal systems, customer data or tills. **Single measurable point:** no capex, no engineering and no operational change beyond printing table cards.

---

## Slide 11 — Team + contact

- Built by **Russ (RudeRussy)** — product, code and game design; live demo already shipped.
- Demo, source and data live at https://ruderussy.github.io/spoons-top-trumps/ and github.com/ruderussy/spoons-top-trumps.
- Contact: [insert phone] / [insert email] / [insert LinkedIn or X handle].

**Speaker notes** — Say: “I built the game, the parser and the hosting. I can be live in a pilot pub in days, not months.” Do NOT claim a larger team or agency behind the project. **Single measurable point:** a single point of contact can ship, measure and iterate the trial.

---

## Slide 12 — Next step CTA: pick one pub, we'll be live in days

- Choose the pilot pub and the week.
- We ship the branded QR cards and short link within 48 hours.
- After seven days we come back with the KPI report and a recommendation on wider rollout.

**Speaker notes** — Say: “The smallest yes gets the biggest proof. One pub, one week, then decide whether to go national.” Do NOT promise we can be in the Wetherspoon app in days — that depends on the Wetherspoon app team. **Single measurable point:** a branded, pub-specific QR landing page can be live within 48 hours of pub selection.

---

## Quick facts (for the room)

- Demo: https://ruderussy.github.io/spoons-top-trumps/
- Estate coverage: 844 pub slugs, 201 real menu items
- Price example: Traditional Breakfast £4.29 (The Tanners Hall, Darlington) vs £7.29 (airport/central sites)
- Hosting: static HTML on GitHub Pages, zero Wetherspoon infrastructure
