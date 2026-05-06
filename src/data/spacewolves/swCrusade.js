// ── Space Wolves — Oathsworn Campaigns Crusade Data ──────────────────────────

// ── Oathsworn Campaign Paths ─────────────────────────────────────────────────
// Your force follows one campaign path for the duration of the crusade.
export const SW_CAMPAIGN_PATHS = [
  {
    id: 'worthy-of-a-saga',
    name: 'Worthy of a Saga',
    icon: '📜',
    description: 'Your warriors seek to forge their own legendary deeds. Units undertake personal Sagas — epic oaths of accomplishment. When a Saga is completed, the unit earns a permanent reward and is celebrated by the Greatpack.',
    bonus: 'Units can undertake Sagas. Each completed Saga grants a permanent buff and +1 bonus XP.',
  },
  {
    id: 'glory-seekers',
    name: 'Glory Seekers',
    icon: '🏆',
    description: 'Your warriors hurl themselves into the fiercest fighting, each seeking to out-deed the last. The more the battle demands, the stronger they become.',
    bonus: 'Units that destroy 3+ enemy models in a single Fight phase earn a Glory Token. Spend tokens to re-roll Battle Traits or reduce RP costs.',
  },
  {
    id: 'hunters-unleashed',
    name: 'Hunters Unleashed',
    icon: '🐺',
    description: 'Your pack circles its prey with predatory patience. The hunt is everything — lure the enemy in, then strike before they can react.',
    bonus: 'At the start of each battle, nominate one enemy unit as Quarry. Your units have +1 to hit and wound against the Quarry.',
  },
]

// ── SW Agendas ────────────────────────────────────────────────────────────────
export const SW_AGENDAS = [
  {
    id: 'sw-show-them-how',
    name: 'Show Them How We Fight',
    category: 'Destroy',
    description: 'At the end of the battle, each unit earns 1 XP for each enemy unit it destroyed in the Fight phase. The first friendly unit to destroy an enemy in the Fight phase earns 1 additional bonus XP.',
    xpReward: 1,
    unitReward: 'Each unit that destroyed an enemy unit in the Fight phase',
    swExclusive: true,
  },
  {
    id: 'sw-damage-foes',
    name: 'Damage Foes',
    category: 'Destroy',
    description: 'At the end of the battle, each unit that destroyed one or more enemy units in melee combat earns 2 XP. Units that destroyed enemy units only at range earn 1 XP instead.',
    xpReward: 2,
    unitReward: 'Units that destroyed enemy units in melee combat',
    swExclusive: true,
  },
  {
    id: 'sw-worlds-of-vengeance',
    name: 'Worlds of Vengeance',
    category: 'Hold',
    description: 'At the end of the battle, each unit earns 1 XP for each objective marker it controls that was controlled by the enemy at the start of the battle.',
    xpReward: 1,
    unitReward: 'Units controlling objectives that were taken from the enemy',
    swExclusive: true,
  },
  {
    id: 'sw-lead-by-example',
    name: 'Lead by Example',
    category: 'Achieve',
    description: "At the end of the battle, if your Warlord destroyed at least one enemy unit this battle, all friendly SPACE WOLVES units that were within 6\" of your Warlord when it made kills each earn 1 bonus XP.",
    xpReward: 1,
    unitReward: "Friendly SPACE WOLVES units within 6\" of the Warlord when it made kills",
    swExclusive: true,
  },
]

// ── SW Battle Traits (replace generic table for SW faction) ──────────────────
export const SW_BATTLE_TRAITS = [
  {
    roll: 1,
    id: 'savage-hunter',
    name: 'Savage Hunter',
    effect: "Add 1 to wound rolls made for this unit's melee attacks.",
  },
  {
    roll: 2,
    id: 'runic-tactics',
    name: 'Runic Tactics',
    effect: 'Once per battle, this unit can Fall Back and still shoot and/or charge in the same turn.',
  },
  {
    roll: 3,
    id: 'mark-of-the-wulfen',
    name: 'Mark of the Wulfen',
    effect: 'Add 1 to the Attacks characteristic of all melee weapons models in this unit are equipped with.',
  },
  {
    roll: 4,
    id: 'wolf-packs',
    name: 'Wolf Packs',
    effect: "While within 6\" of one or more other friendly SPACE WOLVES units, models in this unit add 1 to their Leadership and Objective Control characteristics.",
  },
  {
    roll: 5,
    id: 'cunning-hunters',
    name: 'Cunning Hunters',
    effect: "Each time this unit makes a ranged attack, if it is not within Engagement Range of any enemy models, that attack gains the [LETHAL HITS] ability.",
  },
  {
    roll: 6,
    id: 'living-stone',
    name: 'Living Stone',
    effect: "Models in this unit have a 6+ Feel No Pain save. If this unit already has a Feel No Pain save, improve it by 1 instead (to a minimum of 4+).",
  },
]

// Heroic traits are awarded at specific high-rank milestones
export const SW_HEROIC_TRAITS = [
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    effect: "This unit gains the SCOUTS 6\" ability. If this unit already has the SCOUTS ability, increase the distance by 3\" instead.",
  },
  {
    id: 'counterattack',
    name: 'Counterattack',
    effect: "Each time this unit is selected to fight, if it was charged this turn, add 1 to the Attacks characteristic of all melee weapons models in this unit are equipped with until the end of the phase.",
  },
  {
    id: 'acute-senses',
    name: 'Acute Senses',
    effect: "Each time an enemy unit targets this unit with an attack from more than 12\" away, subtract 1 from that attack's Hit roll.",
  },
]

// ── SW Requisitions ───────────────────────────────────────────────────────────
export const SW_REQUISITIONS = [
  {
    id: 'sw-honour-wolf-guard',
    name: 'Honour of the Wolf Guard',
    cost: 2,
    category: 'Unit',
    sw: true,
    description: 'Use after the battle. Upgrade one BLOOD CLAWS or GREY HUNTERS unit in your Crusade force to WOLF GUARD. That unit retains all XP, Battle Honours, and Battle Scars. Its Power Rating increases by 2.',
  },
  {
    id: 'sw-glorious-death',
    name: 'Glorious Death',
    cost: 1,
    category: 'Recovery',
    sw: true,
    description: "Use immediately after a unit in your Crusade force is destroyed in battle. Each other friendly SPACE WOLVES unit that was within 6\" of that unit when it was destroyed gains 1 XP.",
  },
  {
    id: 'sw-tempered-by-furies',
    name: 'Tempered by the Furies',
    cost: 1,
    category: 'Unit',
    sw: true,
    description: 'Use after the battle. Select one unit that survived the battle at half strength or above. That unit gains 1 bonus XP in addition to any other XP earned this battle.',
  },
  {
    id: 'sw-pack-reinforced',
    name: 'Pack Reinforced',
    cost: 1,
    category: 'Roster',
    sw: true,
    description: "Use before the battle. Add up to 5 models to one INFANTRY unit in your Crusade force for this battle only. These reinforcements are removed after the battle and do not count towards Supply Limit.",
  },
]

// ── Crusade Relics ────────────────────────────────────────────────────────────
export const SW_CRUSADE_RELICS = [
  {
    id: 'sw-relic-talisman',
    name: "Asger's Talisman",
    tier: 'relic',
    rpCost: 1,
    bearer: 'CHARACTER',
    description: "The bearer has a 4+ invulnerable save against mortal wounds. Once per battle, the bearer can attempt to Deny the Witch as if they were a PSYKER, using their Leadership characteristic as their Deny roll.",
  },
  {
    id: 'sw-relic-helm',
    name: "Wychnaught's Helm",
    tier: 'relic',
    rpCost: 1,
    bearer: 'CHARACTER',
    description: "The bearer's Leadership characteristic is increased by 2. Friendly SPACE WOLVES units within 6\" of the bearer do not need to take Battleshock tests.",
  },
  {
    id: 'sw-relic-frost-weapon',
    name: 'Frost Weapon',
    tier: 'relic',
    rpCost: 1,
    bearer: 'Any',
    description: "Replace one of the bearer's melee weapons with a Frost Weapon: Attacks +2, Strength +2, AP -3, Damage 2. This weapon has the [DEVASTATING WOUNDS] ability.",
  },
  {
    id: 'sw-relic-wolfstone',
    name: 'The Wolfstone',
    tier: 'legendary',
    rpCost: 3,
    bearer: 'CHARACTER',
    description: "At the start of your Command phase, roll one D6 for each enemy unit within 12\" of the bearer: on a 4+, that enemy unit is struck with the Wolfstone Curse until the end of the battle round — subtract 1 from their Leadership and they cannot benefit from Stratagems that cost 2 or more CP.",
  },
]

// ── Crusade Badges ────────────────────────────────────────────────────────────
// Chosen for the whole force before the crusade begins.
export const SW_CRUSADE_BADGES = [
  {
    id: 'restless-greatpack',
    name: 'Restless Greatpack',
    icon: '🐾',
    thematic: 'Always moving, always hunting — they are never where the enemy expects.',
    description: "All units in this Crusade force have the SCOUTS 6\" ability. In addition, at the start of the first battle round, before the first turn begins, every unit in this force can make a Normal move of up to 6\".",
    bonus: "SCOUTS 6\" + free 6\" Normal move at battle start",
  },
  {
    id: 'savage-slayers',
    name: 'Savage Slayers',
    icon: '🩸',
    thematic: 'They finish what the first charge begins — no mercy, no retreat.',
    description: "Units in this force add 1 to wound rolls when targeting enemy units that have already lost one or more wounds this battle. Once per battle, when a unit in this force makes a Charge move, it can re-roll the charge roll.",
    bonus: "+1 wound vs wounded targets; once per battle re-roll charge",
  },
  {
    id: 'sagabound-companions',
    name: 'Sagabound Companions',
    icon: '📜',
    thematic: 'Every warrior carries an oath — the Saga drives their blades.',
    description: "While a unit in this force has an active Saga, add 1 to the Attacks characteristic of all melee weapons models in that unit are equipped with. When a unit completes its Saga, it immediately gains 1 bonus XP in addition to the Saga reward.",
    bonus: "+1 Attacks while Saga active; +1 bonus XP on Saga completion",
  },
]

// ── Sagas (Deeds of Making) ───────────────────────────────────────────────────
// Each unit can undertake one Saga at a time. When the condition is met,
// mark it complete to permanently apply the reward.
export const SW_SAGAS = [
  {
    id: 'saga-warrior-born',
    name: 'Saga of the Warrior Born',
    category: 'Glory',
    icon: '⚔️',
    target: 10,
    conditionShort: 'Destroy 10+ enemy models total',
    condition: "This unit must destroy 10 or more enemy models in total across the course of the campaign. Track the kill tally cumulatively after each battle.",
    rewardShort: '+1 Attacks on all melee weapons',
    reward: "Add 1 to the Attacks characteristic of all melee weapons models in this unit are equipped with. This improvement is permanent.",
  },
  {
    id: 'saga-the-bear',
    name: 'Saga of the Bear',
    category: 'Endurance',
    icon: '🐻',
    target: 3,
    conditionShort: 'Survive 3 charges made against this unit without being destroyed',
    condition: "This unit must survive three or more Charge moves made against it over the course of the campaign, without being destroyed in any of those combats.",
    rewardShort: '5+ Feel No Pain save (or improve existing by 1)',
    reward: "Models in this unit gain a 5+ Feel No Pain save against any damage. If this unit already has a Feel No Pain save, improve it by 1 instead.",
  },
  {
    id: 'saga-hunter',
    name: 'Saga of the Hunter',
    category: 'Hunt',
    icon: '🎯',
    target: 5,
    conditionShort: 'Destroy 5+ enemy units of the same Battlefield Role',
    condition: "This unit must destroy 5 or more enemy units that share the same Battlefield Role (e.g. five Infantry units, or five Characters) across the course of the campaign.",
    rewardShort: '+1 AP on all attacks vs units of the chosen Battlefield Role',
    reward: "Improve the Armour Penetration of all this unit's attacks targeting units of the Battlefield Role the Saga was completed against by 1.",
  },
  {
    id: 'saga-iron-wolf',
    name: 'Saga of the Iron Wolf',
    category: 'Hold',
    icon: '🔩',
    target: 3,
    conditionShort: 'Control an objective at end of your turn in 3 separate battles',
    condition: "This unit must control one or more objective markers at the end of your turn in three or more separate battles across the campaign.",
    rewardShort: '+2 Objective Control characteristic',
    reward: "Add 2 to the Objective Control (OC) characteristic of all models in this unit.",
  },
  {
    id: 'saga-beastslayer',
    name: 'Saga of the Beastslayer',
    category: 'Hunt',
    icon: '🦁',
    target: 3,
    conditionShort: 'Destroy 3+ enemy MONSTERS or VEHICLES',
    condition: "This unit must destroy 3 or more enemy MONSTER or VEHICLE units across the course of the campaign.",
    rewardShort: 'Melee attacks vs MONSTER / VEHICLE gain [DEVASTATING WOUNDS]',
    reward: "Each time this unit makes a melee attack that targets a MONSTER or VEHICLE, that attack gains the [DEVASTATING WOUNDS] ability.",
  },
  {
    id: 'saga-wolfkin',
    name: 'Saga of the Wolfkin',
    category: 'Brotherhood',
    icon: '🐾',
    target: 3,
    conditionShort: 'Fight within 6" of 3+ other SW units in 3 separate battles',
    condition: "This unit must end its Movement phase within 6\" of 3 or more other friendly SPACE WOLVES units in three or more separate battles across the campaign.",
    rewardShort: 'Once per battle (Command phase): FIGHTS FIRST for the battle round',
    reward: "Once per battle, in your Command phase, this unit may call on the pack. Until the end of the battle round, models in this unit have the FIGHTS FIRST ability.",
  },
  {
    id: 'saga-storm',
    name: 'Saga of the Storm',
    category: 'Assault',
    icon: '⚡',
    target: 4,
    conditionShort: 'Make a successful Charge move in 4 separate battles',
    condition: "This unit must make a successful Charge move in four or more separate battles across the campaign.",
    rewardShort: 'After charging: +3" Move and +1 wound roll until end of turn',
    reward: "Each time this unit makes a Charge move, until the end of that turn, add 3\" to its Move characteristic and add 1 to wound rolls for its melee attacks.",
  },
  {
    id: 'saga-morkai',
    name: 'Saga of Morkai',
    category: 'Fear',
    icon: '💀',
    target: 3,
    conditionShort: 'Cause 3 enemy Battleshock failures while within 6"',
    condition: "This unit must be within 6\" of three or more enemy units when those units fail Battleshock tests, across the course of the campaign.",
    rewardShort: '-2 Leadership aura (6"); failed Battleshock within 6" = D3 mortal wounds',
    reward: "Enemy units within 6\" of this unit subtract 2 from their Leadership. Enemy units that fail a Battleshock test while within 6\" each suffer D3 mortal wounds.",
  },
  {
    id: 'saga-cunning-fighter',
    name: 'Saga of the Cunning Fighter',
    category: 'Tactics',
    icon: '🧠',
    target: 3,
    conditionShort: 'Destroy an enemy unit while outnumbered (fewer models than target)',
    condition: "This unit must destroy an enemy unit in the Fight phase while having fewer models than the enemy unit at the start of that fight. This condition must be met 3 times across the campaign.",
    rewardShort: 'Can Fall Back and still charge; +1 to charge rolls',
    reward: "This unit can Fall Back and still declare a Charge move in the same turn. In addition, add 1 to Charge rolls made for this unit.",
  },
  {
    id: 'saga-void-sailor',
    name: 'Saga of the Void Sailor',
    category: 'Endurance',
    icon: '🚀',
    target: 3,
    conditionShort: 'Deep Strike or arrive from Strategic Reserves in 3 separate battles',
    condition: "This unit must arrive from Strategic Reserves or via Deep Strike in three or more separate battles across the campaign.",
    rewardShort: 'Can arrive from reserves on turn 1; +2" to deepstrike/reserves range',
    reward: "This unit can be placed into Strategic Reserves and arrive on the first battle round. In addition, this unit can be set up anywhere that is more than 3\" horizontally from all enemy models (instead of the normal 9\").",
  },
]
