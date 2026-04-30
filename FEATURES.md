# W40K Battle Companion — Feature Roadmap

## ✅ Already Built

### Battle
- HP tracking per unit with wound counters
- Command Points (CP) tracker
- Phase-by-phase turn flow (Command → Movement → Shooting → Charge → Fight)
- Phase hints (one-liner reminders per phase)
- VP scoring per turn (5-turn tracker, both sides)
- Stratagems browser — searchable, filterable by phase/source
- MathHammer — hit/wound/save probability calculator
- Detachment Rule Panel — interactive command-phase actions (pick_one, designate_target, passive)
- Phase ability panel
- Reactions bar (opponent's turn) + stratagems bar (your turn)
- Weapon & ability count chips above unit list
- Keyword tooltips
- Leader attachment system
- Warlord designation
- Opponent army import + matchup sheet
- Post-battle debrief (result + XP — crusade matches only)

### Army Builder
- All 27 factions with units + detachments
- Faction picker: Imperium / Chaos / Xenos tabs + 3-column grid
- Unit limits: Epic Heroes capped at 1, all others capped at 3
- Points tracker
- Import army list from text (Battlescribe / New Recruit format)

### Crusade
- Order of Battle — unit roster with XP, ranks, honours, scars, relics
- XP tracking + rank progression (Battle Ready → Legendary)
- Battle Honours (add/display per unit)
- Battle Scars (add/display per unit)
- Relics (display per unit)
- Record Battle (win/loss → auto +1 Requisition Point)
- Add unit manually to roster
- Cloud sync via Firebase Firestore (6-char sync code, cross-device)

### Factions (27 total)
Imperium: Space Wolves, Space Marines, Dark Angels, Blood Angels, Black Templars,
Grey Knights, Deathwatch, Adeptus Custodes, Adepta Sororitas, Adeptus Mechanicus,
Astra Militarum, Imperial Knights
Chaos: Chaos Space Marines, Death Guard, Emperor's Children, Thousand Sons,
World Eaters, Chaos Daemons, Chaos Knights
Xenos: Tyranids, Genestealer Cults, Necrons, Orks, Aeldari, Drukhari,
T'au Empire, Leagues of Votann

---

## 🔲 Crusade Features (Priority — active campaign)

### Roster Management
- [ ] Crusade roster creation flow — let user name their force, pick faction/detachment (currently hardcoded to Space Wolves)
- [ ] Multiple crusade rosters — create / switch between orders of battle
- [ ] Supply limit tracker — visual bar showing supply used vs supply limit (currently stored but not displayed)
- [ ] Remove / retire unit from roster
- [ ] Mark unit as Out of Action post-battle

### Post-Battle Flow
- [ ] Battle scars roller — randomized roll with dice animation, results from the faction's battle scars table
- [ ] Battle honours roller — dice animation + result from the honours table
- [ ] Agendas — set 1-3 agendas before battle, mark completed post-battle for bonus XP
- [ ] Crusade match toggle in Army Builder — explicit "this is a Crusade match" flag so post-battle flow knows

### Requisition Points
- [ ] RP spending log — record what you spent RP on (e.g. "Rearm and Resupply", "Repair and Recuperate")
- [ ] RP spend actions browser — list all standard Crusade RP actions with costs and effects

### Relics & Upgrades
- [ ] Crusade relics browser per faction — searchable list of relics available to that faction
- [ ] Assign relic to unit from browser (replaces manual text entry)
- [ ] Battle traits browser per unit type — available traits to assign when levelling up

### History & Export
- [ ] Battle history log — record of each game (date, opponent, result, key moments)
- [ ] Crusade Points auto-calculation from honours/scars/relics
- [ ] Roster export — shareable summary card (PNG or share sheet)

---

## 🔲 Battle Features

- [ ] Dice roller — tap to roll D6/2D6/D3 with animation, useful for random table results
- [ ] Morale / Battle-shock tracker per unit
- [ ] Objective marker tracker (place/hold/score)
- [ ] Turn timer — optional clock per player turn
- [ ] Sticky notes per unit — quick mid-battle reminders

---

## 🔲 Data & Polish

- [ ] Data accuracy audit for all 16 new factions (unit stats + detachment names vs Wahapedia)
- [ ] Admech, Space Marines, Death Guard, Emperor's Children in Army Builder (currently battle-only)
- [ ] Faction-specific stratagems for all 27 factions (currently only SW + a few others have full sets)
- [ ] Enhancements browser in Army Builder
- [ ] App onboarding / first-time tutorial
