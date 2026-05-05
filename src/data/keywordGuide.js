// Rich keyword/rule explanations for the Codex Lookup overlay.
// Each entry: name, icon, phase, category ('weapon'|'unit'), summary, explanation, example
// Keys are lowercase base form of the keyword (without numeric parameters).

export const KEYWORD_GUIDE = {

  // ── Weapon Traits ────────────────────────────────────────────────────────────
  assault: {
    name: 'Assault',
    icon: '⚡',
    phase: 'shooting',
    category: 'weapon',
    summary: "Fire after Advancing — no penalty",
    explanation:
      "You can fire this weapon even if the bearer's unit Advanced this turn. Normally, Advancing prevents shooting entirely — Assault lets you move fast and still shoot at full accuracy.",
    example:
      "Your unit Advanced 5\" to get into range. Their Assault Bolt Rifles still fire this turn with no penalty to hit.",
  },

  heavy: {
    name: 'Heavy',
    icon: '🔫',
    phase: 'shooting',
    category: 'weapon',
    summary: "+1 to hit if your unit didn't move this turn",
    explanation:
      "If the weapon's unit remained completely stationary this turn (no Normal Move, Advance, or Fall Back), add 1 to each Hit roll. Stay still for better accuracy.",
    example:
      "Your Devastator Squad didn't move. Their Lascannons now hit on 2+ instead of the normal 3+ — worth holding your ground.",
  },

  'rapid fire': {
    name: 'Rapid Fire X',
    icon: '💥',
    phase: 'shooting',
    category: 'weapon',
    summary: "Extra X attacks within half range",
    explanation:
      "When targeting a unit within half this weapon's Range, make X additional attacks. The closer you get, the more shots you fire — great for clearing infantry at short range.",
    example:
      "Rapid Fire 1 Bolters (Range 24\"): within 12\" each model fires twice as many shots. Close the gap for maximum firepower.",
  },

  blast: {
    name: 'Blast',
    icon: '💣',
    phase: 'shooting',
    category: 'weapon',
    summary: "More attacks against larger units",
    explanation:
      "Against units of 6–10 models: always make at least 3 attacks. Against units of 11+ models: always use the maximum dice value (e.g. D6 becomes 6 attacks). Perfect for destroying horde armies.",
    example:
      "A D6 Blast weapon vs 11 Gretchin always fires 6 attacks — no gambling with the dice against a mob.",
  },

  torrent: {
    name: 'Torrent',
    icon: '🌊',
    phase: 'shooting',
    category: 'weapon',
    summary: "Always hits — skip the hit roll entirely",
    explanation:
      "Attacks with this weapon automatically hit their target. Skip the Hit roll and go straight to Wound rolls. Ideal for spray weapons like flamers — you literally cannot miss.",
    example:
      "A Flamer with Torrent automatically hits every model in range. Great against units hiding in cover — no hit roll needed.",
  },

  melta: {
    name: 'Melta X',
    icon: '🔴',
    phase: 'shooting',
    category: 'weapon',
    summary: "+X Damage at half range — premier anti-tank rule",
    explanation:
      "Within half this weapon's Range, add X to the Damage characteristic of each attack. Melta weapons are the best tank-hunters in the game — get close and melt through armour.",
    example:
      "Multi-Melta 2 (Range 18\"): beyond 9\" it fires normally. Within 9\", each hit does +2 Damage — devastating to T12 vehicles.",
  },

  'twin-linked': {
    name: 'Twin-linked',
    icon: '🔗',
    phase: 'shooting',
    category: 'weapon',
    summary: "Re-roll all Wound rolls",
    explanation:
      "You can re-roll any or all Wound rolls for attacks made with this weapon. This dramatically improves reliability — you'll wound far more consistently every single turn.",
    example:
      "A Twin-linked Heavy Bolter rolling 6 Wound dice can re-roll every failure, turning bad luck into consistent, reliable damage.",
  },

  'lethal hits': {
    name: 'Lethal Hits',
    icon: '💀',
    phase: 'any',
    category: 'weapon',
    summary: "Critical hits (rolls of 6) auto-wound — no wound roll",
    explanation:
      "An unmodified Hit roll of 6 (a Critical Hit) automatically wounds the target — skip the Wound roll for that attack entirely. Invaluable against high-Toughness targets like tanks and monsters.",
    example:
      "Shooting a T10 vehicle with a Lethal Hits weapon. You roll a 6 to hit — that attack automatically wounds. No Toughness check required.",
  },

  'sustained hits': {
    name: 'Sustained Hits X',
    icon: '✨',
    phase: 'any',
    category: 'weapon',
    summary: "Critical hits (rolls of 6) generate X extra hits",
    explanation:
      "An unmodified Hit roll of 6 (a Critical Hit) scores X additional hits on top of the normal one. More hits mean more Wound rolls and more damage potential overall.",
    example:
      "Sustained Hits 1 with 4 attacks: you roll and get two 6s. Those two crits each generate 1 extra hit — you now resolve 6 hits total instead of 4.",
  },

  'devastating wounds': {
    name: 'Devastating Wounds',
    icon: '⚡',
    phase: 'any',
    category: 'weapon',
    summary: "Critical wounds (rolls of 6) deal Mortal Wounds = Damage",
    explanation:
      "An unmodified Wound roll of 6 (a Critical Wound) causes Mortal Wounds equal to the weapon's Damage value, then the attack sequence ends for that attack. Mortal Wounds bypass all saves — armour, invulnerable, everything.",
    example:
      "A Devastating Wounds D3+3 weapon scores a critical wound. The target takes D3+3 Mortal Wounds with absolutely no save possible.",
  },

  hazardous: {
    name: 'Hazardous',
    icon: '⚠️',
    phase: 'shooting',
    category: 'weapon',
    summary: "Risky to fire — can wound your own model on a 1",
    explanation:
      "After all attacks are resolved, roll one D6 for each Hazardous weapon used. On a 1, the bearer suffers 1 Mortal Wound (or 3 Mortal Wounds if a MONSTER or VEHICLE). Powerful weapons carry a price.",
    example:
      "Your Librarian fires his Hazardous force weapon and rolls a 1 on the check — he takes 1 Mortal Wound from the psychic backlash. Painful, but usually worth it.",
  },

  'indirect fire': {
    name: 'Indirect Fire',
    icon: '🪃',
    phase: 'shooting',
    category: 'weapon',
    summary: "Shoot targets out of line of sight (-1 to hit)",
    explanation:
      "You can target units not visible to the shooter. All attacks suffer -1 to Hit when firing indirectly. Great for lobbing shells over terrain without needing line of sight.",
    example:
      "A Whirlwind behind a forest fires at enemy units on the other side. Normally hits on 3+, but Indirect Fire drops this to 4+.",
  },

  precision: {
    name: 'Precision',
    icon: '🎯',
    phase: 'any',
    category: 'weapon',
    summary: "Target the Leader hidden inside a unit",
    explanation:
      "When a Precision attack wounds the target unit, you can allocate that wound to the Leader attached to the unit — even though Leaders are normally protected by their unit. Perfect for sniping out enemy characters.",
    example:
      "An enemy Captain is leading a squad of Intercessors. Your sniper's Precision weapon wounds — you allocate it to the Captain directly, bypassing all the regular marines.",
  },

  'ignores cover': {
    name: 'Ignores Cover',
    icon: '🚫',
    phase: 'any',
    category: 'weapon',
    summary: "Enemy gets no Cover bonus to their saves",
    explanation:
      "The target unit does not benefit from Cover Saving Throw bonuses against attacks made with this weapon. Normally cover grants +1 to saves — this cancels that advantage completely.",
    example:
      "Infantry in ruins normally save on 3+ instead of their base 4+. Your Ignores Cover weapon forces them back to 4+ — as if they're standing in the open.",
  },

  pistol: {
    name: 'Pistol',
    icon: '🔫',
    phase: 'shooting',
    category: 'weapon',
    summary: "Can shoot while in melee combat",
    explanation:
      "This weapon can be fired in the Shooting phase even when the bearer's unit is within Engagement Range of enemy models. You can only target the unit you're currently engaged with.",
    example:
      "Your unit is locked in melee. Normally shooting is forbidden, but a model's Plasma Pistol (Pistol) lets them fire at point-blank range into the enemy unit they're fighting.",
  },

  anti: {
    name: 'Anti-[Keyword] X+',
    icon: '🎯',
    phase: 'any',
    category: 'weapon',
    summary: "Critical wounds on X+ against specific unit types",
    explanation:
      "Against units with the listed Keyword (e.g. VEHICLE, MONSTER, INFANTRY), any unmodified Wound roll of X+ counts as a Critical Wound. This usually triggers Devastating Wounds if the weapon has that keyword too.",
    example:
      "Anti-VEHICLE 4+: Wounding a tank on a 4, 5, or 6 counts as a Critical Wound — dramatically more effective at destroying armour.",
  },

  'one shot': {
    name: 'One Shot',
    icon: '1️⃣',
    phase: 'shooting',
    category: 'weapon',
    summary: "Fires once — for the entire battle",
    explanation:
      "After this weapon has been fired, it cannot be used again for the rest of the battle. Choose your moment carefully and aim at the highest-value target.",
    example:
      "A missile launcher with One Shot. You fire Turn 2 at an enemy Monster worth 300pts — that is your only opportunity for the whole game, make it count.",
  },

  lance: {
    name: 'Lance',
    icon: '⚡',
    phase: 'fight',
    category: 'weapon',
    summary: "+1 to Wound rolls after charging",
    explanation:
      "If the bearer's unit made a Charge move this turn, add 1 to all Wound rolls made with this weapon. Charge in to unlock its full lethality.",
    example:
      "Your Bladeguard Veterans charge into Chaos Space Marines (T4). Their Lance swords wound on 2+ after charging instead of the normal 3+ — the momentum of the charge makes all the difference.",
  },

  // ── Unit Traits ──────────────────────────────────────────────────────────────
  fly: {
    name: 'Fly',
    icon: '🦅',
    phase: 'movement',
    category: 'unit',
    summary: "Move over terrain and other models freely",
    explanation:
      "This unit can move horizontally over terrain features and other models during the Movement phase without penalty. It ignores obstacles when moving, though it still can't end its move on top of another model.",
    example:
      "A Stormhawk Interceptor can fly directly over a building and a squad of Space Marines to reach a target on the far side — no detours needed.",
  },

  'deep strike': {
    name: 'Deep Strike',
    icon: '🚁',
    phase: 'movement',
    category: 'unit',
    summary: "Deploy from reserves anywhere (9\"+ from enemies)",
    explanation:
      "Instead of deploying at the start of the game, this unit can be held in Strategic Reserve. From Turn 2 onward, deploy it anywhere on the battlefield more than 9\" from any enemy models.",
    example:
      "You hold Terminators in reserve. On Turn 3, they Deep Strike 9.1\" directly behind enemy lines — appearing exactly where your opponent doesn't want them.",
  },

  scouts: {
    name: 'Scouts X"',
    icon: '👁️',
    phase: 'movement',
    category: 'unit',
    summary: "Free move before Turn 1 — seize early position",
    explanation:
      "Before the first battle round begins (after both armies are fully deployed), this unit can make a Normal Move of up to X inches. Use it to grab objectives or get into better firing positions before the game starts.",
    example:
      "Scouts 6\": Your Wolf Scout pack moves 6\" forward before Turn 1 — reaching a midfield objective they'd otherwise need 2 turns to reach.",
  },

  'lone operative': {
    name: 'Lone Operative',
    icon: '🕵️',
    phase: 'shooting',
    category: 'unit',
    summary: "Hard to snipe — enemies need to be within 12\"",
    explanation:
      "Enemy units cannot choose this unit as the target of ranged attacks unless the closest visible enemy model is within 12\" of the Lone Operative. A powerful protection against long-range sniping.",
    example:
      "An enemy sniper 30\" away wants to shoot your Lone Operative character. Since no enemy model is within 12\" of them, they simply cannot be selected as a target.",
  },

  stealth: {
    name: 'Stealth',
    icon: '🌑',
    phase: 'shooting',
    category: 'unit',
    summary: "Enemies 12\"+ away suffer -1 to hit",
    explanation:
      "Enemy units that are more than 12\" from this unit suffer -1 to their Hit rolls when targeting it. Forces enemies to close the distance before they can shoot at full effectiveness.",
    example:
      "Your Stealth unit is 18\" from an enemy bolter squad that normally hits on 3+. With the -1 penalty, they now need a 4+ — significantly fewer hits get through.",
  },

  leader: {
    name: 'Leader',
    icon: '⭐',
    phase: 'any',
    category: 'unit',
    summary: "Attaches to a unit and grants them special abilities",
    explanation:
      "Leader units attach to specific friendly units (listed on their datasheet). Once attached, they move and fight as one unit. The Leader grants their abilities to the whole unit, and enemies must kill all non-Leader models before they can wound the Leader.",
    example:
      "Your Wolf Lord (Leader) joins a Grey Hunters pack. They move together, the Wolf Lord's abilities boost the whole unit, and enemies must kill all the Hunters first before they can target the Wolf Lord.",
  },

  'feel no pain': {
    name: 'Feel No Pain X+',
    icon: '🛡️',
    phase: 'any',
    category: 'unit',
    summary: "Roll to ignore wounds — works on Mortal Wounds too",
    explanation:
      "Each time this unit would lose a wound (including Mortal Wounds), roll one D6. On a result of X+, that wound is ignored completely. This works even against attacks that 'ignore all saves.'",
    example:
      "Feel No Pain 5+: Your unit takes 4 wounds. Roll a D6 for each — any 5 or 6 ignores that wound. Even mortal wounds from Devastating Wounds can be negated this way.",
  },

  psychic: {
    name: 'Psychic',
    icon: '🧿',
    phase: 'any',
    category: 'unit',
    summary: "Has psychic abilities — used like regular abilities in 10th Ed",
    explanation:
      "Units with the PSYCHIC keyword can use psychic abilities listed on their datasheet. In 10th Edition, psychic powers work like normal abilities — no special psychic test dice are needed. The keyword mainly matters for specific rule interactions.",
    example:
      "Your Librarian has PSYCHIC and a smite-like ability. You activate it in the appropriate phase like any other ability — no psychic test, no rolling for the power itself.",
  },
}

// Look up a raw keyword string and return its guide entry, or null if unknown.
// Handles parameterized keywords: "Melta 2", "Sustained Hits 2", "Anti-VEHICLE 4+", etc.
export function lookupKeyword(rawKeyword) {
  if (!rawKeyword) return null
  const kw = String(rawKeyword).trim()
  const lower = kw.toLowerCase()

  // Direct key match
  if (KEYWORD_GUIDE[lower]) return { ...KEYWORD_GUIDE[lower], raw: kw }

  // Parameterized patterns — extract base key and override summary with specific value
  const paramPatterns = [
    {
      re: /^melta\s+(\d+)/i, base: 'melta',
      summary: (m) => `+${m[1]} Damage within half range`,
    },
    {
      re: /^sustained hits\s+(\d+)/i, base: 'sustained hits',
      summary: (m) => `Hit rolls of 6 generate ${m[1]} extra hit${m[1] === '1' ? '' : 's'}`,
    },
    {
      re: /^rapid fire\s+(\d+)/i, base: 'rapid fire',
      summary: (m) => `+${m[1]} attacks within half range`,
    },
    {
      re: /^anti-[\w-]+\s+(\d+\+?)/i, base: 'anti',
      summary: (m) => `Critical wounds on ${m[1]} vs the listed keyword`,
    },
    {
      re: /^scouts\s+(\d+"?)/i, base: 'scouts',
      summary: (m) => `Move ${m[1]} before Turn 1`,
    },
    {
      re: /^feel no pain\s+(\d+\+?)/i, base: 'feel no pain',
      summary: (m) => `Ignore wounds on ${m[1]}`,
    },
  ]

  for (const { re, base, summary } of paramPatterns) {
    const m = kw.match(re)
    if (m && KEYWORD_GUIDE[base]) {
      return { ...KEYWORD_GUIDE[base], raw: kw, summary: summary(m) }
    }
  }

  // Prefix fallback — "Lethal Hits" → "lethal hits" key
  for (const [key, entry] of Object.entries(KEYWORD_GUIDE)) {
    if (lower.startsWith(key)) return { ...entry, raw: kw }
  }

  return null
}
