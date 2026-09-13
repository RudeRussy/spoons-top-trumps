# LEGAL READINESS PACK — SPOONS TOP TRUMPS ARCADE

*Prepared for the owner to brief a UK IP / commercial lawyer before any approach to Winning Moves / J D Wetherspoon plc.*

*One-line disclaimer: this document is not legal advice, and you should not rely on it as such.*

---

## 1. WHAT EXISTS TODAY

### 1.1 Current assets

| Asset | What it is | Where it lives |
|---|---|---|
| **Code / game** | Single-file HTML/CSS/JS browser game, ~2,200 lines, no build step, no server-side logic. | `index.html` in repo `spoons-top-trumps` |
| **Data compilation method** | Menu data (item names, prices, kcal) compiled from publicly visible per-pub PDF menus on `wetherspoonsmenus.com`, then normalised into a single national fallback table and 819 per-pub price overlays. Vibe stats are hand-coded opinion, not from JDW. | Embedded in `index.html` as `CARDS`; per-pub overlays in `data/m0.json` … `data/m21.json` + `data/pubs.json` |
| **Name** | Public-facing title: **“SPOONS TOP TRUMPS ARCADE”**; HUD brand reads “SPOONS TOP TRUMPS”. | `<title>`, `<h1>`, README, OG tags |
| **Hosted URL** | GitHub Pages: `https://ruderussy.github.io/spoons-top-trumps/` |
| **Repository** | `https://github.com/RudeRussy/spoons-top-trumps` |
| **Other media** | Separate song/lyrics/images (`spoons_song.mp3`, `spoons_lyrics.txt`, `spoons_img_gen.png`) sitting in `/Users/russ/workspace/`, outside the repo. Not linked from the live site at present. |

### 1.2 Infringement exposure inventory

| # | Issue | Plain-English rating | Why it matters |
|---|---|---|---|
| 1 | **“TOP TRUMPS” mark use** | **HIGH** — likely the first shot fired | The name, title tag, OG description and on-screen heading all use **TOP TRUMPS** as the generic descriptor for a card-comparison game. Winning Moves / Top Trumps owner has a long history of enforcing the mark. Even if the game mechanic itself is not protectable, using the famous mark as the product name is the clearest UK trade-mark risk. |
| 2 | **“Wetherspoon / SPOONS” mark use** | **MEDIUM-HIGH** | The name, the opponent label (“THE SPOONS” / “THE LANDLORD”), the “CHOOSE YOUR SPOONS” pub browser, and the README all trade on J D Wetherspoon plc’s brand. JDW has trade marks for WETHERSPOON, WETHERSPOONS and the pub-name format. This is the second most likely C&D target after Top Trumps. |
| 3 | **Database rights in the menu compilation** | **MEDIUM** | The site reproduces a structured compilation of ~201 food/drink items with prices and kcal, plus 819 pub overlays. UK/EU database right protects a **substantial investment in obtaining, verifying or presenting** the contents. We did not create the menu; we compiled it from JDW’s public PDFs. If JDW can show that effort, they may argue the extraction/re-use of a substantial part infringes database right. Defence points: (a) data was already public and factual; (b) prices vary by pub and are labelled approximate; (c) no wholesale copying of their PDF layout. Risk is real but lower than the trade-mark exposure. |
| 4 | **Trade dress / get-up — pub carpet aesthetic** | **LOW-MEDIUM** | The game uses a dark, patterned background reminiscent of Wetherspoons’ famously garish carpets. No actual carpet image is copied. UK passing off / trade-dress protection is weak unless consumers are actually misled into thinking JDW endorsed the game. Helps that the footer says “unofficial, unaffiliated, unbothered”. Still, a lawyer may flag it if JDW is annoyed. |
| 5 | **Logos / branding** | **LOW** | Confirmed: no JDW logo, no “Wetherspoons” wordmark logo, no official crest, no official pub photos, no Top Trumps logo. Emojis and a generic retro-arcade style are used instead. This is the cleanest part of the picture. |

**Bottom line:** the top two risks are branding, not the game mechanic or the data. The mechanic is probably fine; the **names are not**.

---

## 2. ENFORCEMENT PLAYBOOK — MOST LIKELY C&D SCENARIOS

### 2.1 Scenario A: Winning Moves first (most likely)

| | Detail |
|---|---|
| **Why them first** | They are a dedicated brand-enforcement company with a famous, distinctive mark. They scan the web and send template C&Ds. |
| **What they will ask for** | Stop using TOP TRUMPS as a name / title / descriptor; take down or rebrand the site/repo; possibly ask for undertakings and costs. |
| **If ignored** | Court claim for trade-mark infringement and/or passing off. Potential outcomes: injunction, damages/account of profits, legal costs order, takedown order. Even if you win, defending costs real money and time. |
| **Cost of ignoring** | Low-end: £5k–£20k to settle after a C&D. High-end: £50k+ if it runs to a contested injunction and costs. Plus the project is offline while lawyers argue. |

### 2.2 Scenario B: J D Wetherspoon plc second

| | Detail |
|---|---|
| **Why them second** | JDW is more likely to act if (a) they notice the project, and (b) they think it competes with or tarnishes their brand. They have in-house legal and a record of defending the brand. |
| **What they will ask for** | Remove Wetherspoon / Wetherspoons / SPOONS references; stop using their pub names; stop using the menu compilation; rebrand; undertakings. |
| **If ignored** | Claim for trade-mark infringement, passing off, and possibly database right. Because the site literally uses 819 pub names and the menu, their complaint would be broader than Winning Moves’. |
| **Cost of ignoring** | Similar range, but more issues = more letters and higher settlement. Database-right arguments can drag out disclosure of how the data was gathered. |

### 2.3 What “promptly remove the name and rebrand” looks like operationally

If a C&D lands, the owner can rebrand the live site in **a few hours**, not days:

| Step | Work | Time |
|---|---|---|
| 1 | Pick new name (see §3.1). | 15 min |
| 2 | Replace in `index.html`: `<title>`, `<h1>`, HUD brand, OG tags, README, footer. | 30–60 min |
| 3 | Replace repo name / GitHub Pages path **or** keep the old path and redirect. | 30 min |
| 4 | Replace `spoons-top-trumps` strings in local storage keys and any WhatsApp/online PVP room prefix to avoid broken saved data. | 30 min |
| 5 | Update GitHub repo README and About section. | 15 min |
| 6 | `git push`; GitHub Pages redeploys in ~30–60 seconds. | 2 min |
| 7 | Flush/browser cache not strictly needed (file hashes do not change) but ask users to hard-refresh if OG previews are stale. | 0 min |
| 8 | If old URL is being shut down: add a tiny redirect page at the old GitHub Pages URL pointing to the new URL for 30 days. | 30 min |
| 9 | Update any social links / saved bookmarks you control. | 15 min |

**Total: roughly 3–4 hours of focused work to make the live site compliant on the name issue.** The deeper data and visual issues take longer if JDW complains about those too.

---

## 3. CLEAN-UP CHECKLIST BEFORE ANY APPROACH TO JDW

Do these **before** the lawyer sends a letter or asks for a licence. It makes you look organised and reduces the C&D ammunition.

### 3.1 Rebrand plan — recommended names with reasoning

| New name | Why it works | Remaining risk |
|---|---|---|
| **“PUB TOP TRUMPS”** | Removes the Wetherspoon/SPOONS reference entirely; keeps the mechanic description. | Still says “Top Trumps” — Winning Moves risk remains. |
| **“PUB TRUMPS ARCADE”** | Drops “Top” to soften the mark use; still descriptive of the genre. | Winning Moves may still argue likelihood of association. |
| **“PINT AND PIZZA TRUMPS”** | Generic, ownable, no third-party brands. | Very low trade-mark risk; loses some instant recognition. |
| **“THE PUB CARD GAME”** | Fully generic; no mark issues. | Hardest to market, but safest. |

**Recommendation to lawyer:** lead with a name that removes both Wetherspoon and Top Trumps references, e.g. **“Pint & Plate Trumps”** or **“The Pub Card Game”**, unless you are specifically seeking a licence for one of the marks.

### 3.2 Data-source posture

Stop saying: “scraped”, “ripped”, “pulled”, “stole”, “automated extraction”.  
Start saying: **“compiled by hand from publicly available per-pub PDF menus on wetherspoonsmenus.com, then normalised and fact-checked.”**

| Do this | Why |
|---|---|
| Update README and footer to say “compiled from publicly available menus” instead of any scraper language. | Words matter in a database-right defence. |
| Keep the data provenance note in `index.html` at line 599: `// (compiled from wetherspoonsmenus.com). Vibe stats are house opinion.` | Already factual; do not embellish. |
| Add a date stamp: “Menu data current as of September 2026; prices vary by pub and are approximate.” | Shows good faith and reduces accuracy / consumer-protection risk. |
| Do not publish the raw scraper code or scripts, even if they exist. | Discovery of a script can undermine the “manual compilation” narrative. |

### 3.3 Visual posture

| Do this | Why |
|---|---|
| Keep the current disclaimer: **“unofficial, unaffiliated, unbothered.”** | Helps against passing off / endorsement confusion. |
| Do not add JDW logos, official photos, or carpet photographs. | Those are the things that turn a low trade-dress risk into a high one. |
| Keep the abstract “pub carpet style” but consider muting it slightly if JDW complains. | It is currently a generated pattern, not a copy. |
| Add an explicit “not endorsed by J D Wetherspoon plc or Winning Moves” line in the footer or About. | More defensive armour. |

---

## 4. WHAT A LICENCE SHOULD COVER

If you decide to ask JDW (or Winning Moves) for permission, the licence should be in writing and cover at least:

| Clause | What to ask for |
|---|---|
| **Mark use** | Permission to use the relevant mark(s) in the game title, on-screen text, OG/social previews, README, and repo description, **only** in the form agreed. |
| **Data feeding** | Permission to use the current and future Wetherspoons menu item names, prices, kcal and pub names from publicly available sources, solely to populate the game cards. |
| **Attribution** | Any required wording, hyperlink, or “officially licensed” badge; who controls its placement. |
| **Term** | Fixed term (e.g. 1 year, rolling) or indefinite; when and how it renews. |
| **Territory** | Worldwide, or limited to UK/ROI (where the pubs are). |
| **Commercial status** | Is the project non-commercial / fan-made? If ads, donations or merchandise appear later, does the licence survive? |
| **Termination** | Either party can terminate on notice; what happens to the site/repo on termination (takedown vs grace period). |
| **Warranty / indemnity** | Licensor warrants it has rights to grant; licensee indemnifies for misuse beyond the scope. |
| **Costs** | Licence fee, if any, or royalty structure. For a fan project, aim for a nominal or zero fee with attribution. |
| **No endorsement / no affiliation** | Clarify the game is not endorsed; prevents implied-partnership claims. |
| **Audit / compliance** | Licensor can request changes if the use strays outside the agreed scope. |

**Practical tip:** do not send this as a shopping list to JDW. Let the lawyer convert it into a short, polite letter of request with a draft licence schedule attached.

---

## 5. RISK REGISTER

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | C&D from Winning Moves for using “TOP TRUMPS” | High | High (rebrand or defend) | Rebrand to a name without “Top Trumps” before any approach; keep rebrand under 4 hours. |
| 2 | C&D from JDW for using “Wetherspoon/s / SPOONS” | Medium-High | High | Remove all Wetherspoon references from name and branding; use generic pub-culture language. |
| 3 | Database-right claim over the menu compilation | Medium | Medium | Document hand compilation from public PDFs; add date/disclaimer; avoid “scraped” language. |
| 4 | Passing off / endorsement confusion | Medium | Medium | Keep “unofficial, unaffiliated” disclaimer; do not use logos or official imagery. |
| 5 | Trade-dress claim over carpet-style background | Low-Medium | Low-Medium | Ensure no actual carpet image is copied; keep pattern abstract and stylised. |
| 6 | Copyright in card layout / UI copied from Top Trumps | Low-Medium | Medium | Confirm no Top Trumps card back, logo, or distinctive layout is copied; current design is original arcade style. |
| 7 | Domain / GitHub Pages takedown if C&D escalates | Medium | Medium | Be ready to swap URLs and redirect; keep source control off any single provider if possible. |
| 8 | User-generated / PvP content liability | Low | Medium | PeerJS PvP is peer-to-peer; no central chat/moderation; keep it that way. |
| 9 | Consumer-protection / price-accuracy complaint | Low-Medium | Low | Footer already says prices vary and are approximate; keep that prominent. |
| 10 | Discovery of scraper scripts during litigation | Low | High | Do not publish or preserve any automation code in the public repo; maintain a clear “compiled from public sources” narrative. |
| 11 | Separate song/lyrics/media outside the repo attract JDW attention | Low | Low-Medium | Review lyrics for direct Wetherspoon mark use; decide whether to keep, rebrand, or delete those files. |
| 12 | Costs of defending even a weak claim | Medium | High | Brief a lawyer early; consider pre-emptive rebrand to avoid the fight entirely. |

---

*One-line disclaimer: this document is not legal advice.*
