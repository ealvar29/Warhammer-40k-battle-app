export const KEYWORD_GLOSSARY = {
  'LETHAL HITS': "Unmodified hit rolls of 6 automatically wound the target — skip the wound roll entirely.",
  'DEVASTATING WOUNDS': "Unmodified wound rolls of 6 cause mortal wounds equal to the weapon's Damage, bypassing all saves (armour and invulnerable).",
  'TWIN-LINKED': "Re-roll any or all failed wound rolls for attacks made with this weapon.",
  'TORRENT': "This weapon auto-hits — no hit roll is made. Impossible to miss.",
  'HAZARDOUS': "After resolving attacks, roll one D6 for each HAZARDOUS weapon used. On a 1, the bearer suffers 1 mortal wound (or 3 if CHARACTER, MONSTER, or VEHICLE).",
  'INDIRECT FIRE': "Can target units not visible to the bearer, but suffers -1 to hit rolls when doing so.",
  'BLAST': "Add 1 to Attacks for every 5 models in the target unit (rounded down), to a maximum of +10.",
  'HEAVY': "If the bearer remained stationary this turn, add 1 to hit rolls for attacks with this weapon.",
  'PISTOL': "Can be used in the Fight phase if the bearer is within Engagement Range. Can only target the engaged enemy unit.",
  'LANCE': "If the bearer made a Charge move this turn, improve the AP of this weapon by 1 for those attacks.",
  'PSYCHIC': "Can be affected by Perils of the Warp. Targets can attempt to Deny the Witch.",
  'PRECISION': "Wound rolls of 5+ on attacks with this weapon can target a CHARACTER in the target unit, even if not the closest model.",
  'ONE SHOT': "This weapon can only be used once per battle.",
  'ASSAULT': "Can be used even if the bearer Fell Back this turn.",
  'IGNORES COVER': "Targets do not benefit from the Cover save modifier against attacks with this weapon.",
  'STEALTH': "Enemies subtract 1 from hit rolls that target this unit.",
  'LONE OPERATIVE': "Unless a SCOUT unit, this unit cannot be targeted by ranged attacks if not the closest eligible target.",
  'DEEP STRIKE': "This unit can be placed into Strategic Reserves and deployed anywhere more than 9\" from enemy units.",
  'INFILTRATORS': "This unit can be deployed anywhere on the battlefield that is more than 9\" from the enemy deployment zone and more than 9\" from enemy units.",
  'SCOUTS': "Before the first battle round, this unit can make a Normal move of up to 6\".",
  'FEEL NO PAIN': "When this unit would lose a wound, roll a D6. On a 5+ the wound is not lost.",
}

export const KEYWORD_PATTERNS = [
  {
    pattern: /^SUSTAINED HITS (\d+)$/i,
    tip: (m) => `Unmodified hit rolls of 6 score ${m[1]} additional hit${m[1] === '1' ? '' : 's'} in addition to the original.`,
  },
  {
    pattern: /^RAPID FIRE (\d+)$/i,
    tip: (m) => `If the target is within half this weapon's range, add ${m[1]} to the Attacks characteristic.`,
  },
  {
    pattern: /^MELTA (\d+)$/i,
    tip: (m) => `If the target is within half this weapon's range, add ${m[1]} to the Damage characteristic.`,
  },
  {
    pattern: /^ANTI-(.+) (\d+)\+$/i,
    tip: (m) => `Wound rolls of ${m[2]}+ automatically succeed against targets with the ${m[1]} keyword.`,
  },
  {
    pattern: /^FEEL NO PAIN (\d)\+\+\+$/i,
    tip: (m) => `When this unit would lose a wound, roll one D6. On a ${m[1]}+ that wound is not lost.`,
  },
]

export function getKeywordTip(keyword) {
  const upper = String(keyword).toUpperCase().trim()
  if (KEYWORD_GLOSSARY[upper]) return KEYWORD_GLOSSARY[upper]
  for (const { pattern, tip } of KEYWORD_PATTERNS) {
    const m = upper.match(pattern)
    if (m) return tip(m)
  }
  return null
}

// All known fixed keyword strings for text parsing
export const ALL_KNOWN_KEYWORDS = Object.keys(KEYWORD_GLOSSARY)
