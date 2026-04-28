// Adeptus Astartes (Space Marines) — 10th Edition Detachments
// Sourced from Codex: Space Marines (2023)
// Army Rule: Oath of Moment — at the start of your Command phase, select one enemy unit.
// Until your next Command phase, you can re-roll Hit rolls for attacks targeting that unit.

export const smDetachments = {

  gladiusStrikeForce: {
    id: 'gladiusStrikeForce',
    name: 'Gladius Strike Force',
    subtitle: 'The textbook answer — and the answer is overwhelming force.',
    playstyle: 'Codex flexibility — cycle through Combat Doctrines to optimise every phase, use Stratagems at 0CP with Captain/Chapter Master, and reward tight mixed-arms lists.',
    detachmentRule: {
      name: 'Combat Doctrines',
      description: 'At the start of each battle round, select one Combat Doctrine to be active until the end of that battle round. Each doctrine may only be chosen once per battle: Devastator Doctrine — CORE and CHARACTER units get [HEAVY] on ranged weapons; Tactical Doctrine — CORE and CHARACTER units can re-roll one Hit roll per attack (shooting and melee); Assault Doctrine — CORE and CHARACTER melee weapons gain [LANCE].',
    },
    enhancements: [
      { name: 'Artificer Armour', cost: 15, description: 'ADEPTUS ASTARTES CHARACTER model only. The bearer has a Save characteristic of 2+ and a 4+ invulnerable save.' },
      { name: 'The Honour Vehement', cost: 20, description: 'ADEPTUS ASTARTES CHARACTER model only. Each time the bearer makes a melee attack, add 1 to the Wound roll.' },
      { name: 'Adept of the Codex', cost: 25, description: 'ADEPTUS ASTARTES OFFICER model only. Once per battle round, the bearer can use one Stratagem for 0CP, provided it targets an ADEPTUS ASTARTES unit within 12" of the bearer.' },
      { name: 'Fire Discipline', cost: 15, description: 'ADEPTUS ASTARTES CHARACTER model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.' },
    ],
    stratagems: [
      {
        id: 'armourOfContempt', name: 'Armour of Contempt', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase or Fight phase, just after an enemy unit selects its targets",
        effect: 'Select one ADEPTUS ASTARTES VEHICLE or TERMINATOR unit from your army that was selected as the target. Until the end of the phase, improve the Save characteristic of models in that unit by 1 (to a maximum of 2+).',
        keywords: ['Shooting', 'Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'adaptiveStrategy', name: 'Adaptive Strategy', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select a different Combat Doctrine to be active until the end of the battle round, replacing your current one. This does not count as selecting that Doctrine for the purposes of the once-per-battle restriction — the original selection remains used.',
        keywords: ['Command', 'Doctrine'],
      },
      {
        id: 'stormOfFire', name: 'Storm of Fire', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS ASTARTES unit from your army that has not been selected to shoot. Until the end of the phase, each time a model in that unit makes a ranged attack, on an unmodified Hit roll of 6, make one additional attack with the same weapon against the same target (this additional attack cannot trigger this effect again).',
        keywords: ['Shooting', 'Offence'],
      },
      {
        id: 'onlyInDeathDoesDutyEnd', name: 'Only in Death Does Duty End', cost: 2,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        timing: 'Any phase — when an ADEPTUS ASTARTES CHARACTER model from your army is destroyed',
        effect: 'Before removing that model, it can either shoot as if it were your Shooting phase or fight as if it were the Fight phase (your choice). It counts as having already been selected to shoot or fight this phase.',
        keywords: ['Reaction', 'Character'],
      },
      {
        id: 'squadTactics', name: 'Squad Tactics', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase or Charge phase',
        effect: 'Select one ADEPTUS ASTARTES unit from your army. Until the end of the turn, that unit can Fall Back and still shoot and charge this turn.',
        keywords: ['Movement', 'Charge', 'Mobility'],
      },
      {
        id: 'honourTheChapter', name: 'Honour the Chapter', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one ADEPTUS ASTARTES unit from your army that has not been selected to fight. Until the end of the phase, each time a model in that unit makes a melee attack, on an unmodified Hit roll of 6, that attack has the [DEVASTATING WOUNDS] ability.',
        keywords: ['Fight', 'Offence'],
      },
    ],
  },

  anvilSiegeForce: {
    id: 'anvilSiegeForce',
    name: 'Anvil Siege Force',
    subtitle: 'Dig in, aim true, and turn the battlefield into a kill-zone.',
    playstyle: 'Defensive shooting — fortify positions with SMOKESCREEN and HEAVY weapon bonuses, punish enemies who advance into your fire lanes, and grind them down from range.',
    detachmentRule: {
      name: 'Siege Masters',
      description: 'ADEPTUS ASTARTES CORE and CHARACTER units from your army have the Smokescreen ability. Each time a CORE or CHARACTER unit from your army makes a ranged attack with a HEAVY weapon, if the attacking model has not moved this turn, add 1 to the Hit roll.',
    },
    enhancements: [
      { name: 'Tigurian Iron Halo', cost: 20, description: 'ADEPTUS ASTARTES CHARACTER model only. The bearer has a 3+ invulnerable save.' },
      { name: 'Relentless Determination', cost: 15, description: 'ADEPTUS ASTARTES OFFICER model only. While the bearer is leading a unit, models in that unit can ignore the penalty for moving and shooting Heavy weapons.' },
      { name: 'Master of Defence', cost: 25, description: 'ADEPTUS ASTARTES CHARACTER model only. While the bearer is on the battlefield, friendly ADEPTUS ASTARTES units within 9" cannot be targeted by enemy Stratagems.' },
      { name: 'Siege Veteran', cost: 15, description: 'ADEPTUS ASTARTES CHARACTER model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [HEAVY] and [SUSTAINED HITS 1] abilities.' },
    ],
    stratagems: [
      {
        id: 'suppressingFire', name: 'Suppressing Fire', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS ASTARTES unit from your army that has not been selected to shoot. Until the end of the phase, each time a model in that unit makes a ranged attack, if the target is Battle-shocked, add 1 to the Wound roll.',
        keywords: ['Shooting', 'Anti-Battleshocked'],
      },
      {
        id: 'fortifyPosition', name: 'Fortify Position', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one ADEPTUS ASTARTES INFANTRY unit from your army. Until the start of your next Command phase, that unit has the Benefit of Cover against ranged attacks, regardless of terrain.',
        keywords: ['Command', 'Defence'],
      },
      {
        id: 'killShot', name: 'Kill Shot', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS ASTARTES VEHICLE unit from your army that has not been selected to shoot and has not moved this turn. Until the end of the phase, each time a model in that unit makes a ranged attack, you can re-roll the Hit roll and the Wound roll.',
        keywords: ['Shooting', 'Vehicle', 'Offence'],
      },
      {
        id: 'counterStrike', name: 'Counter-Strike', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase, just after an enemy unit selects its targets',
        effect: 'Select one ADEPTUS ASTARTES unit from your army that was selected as the target. Until the end of the phase, each time a model in that unit makes a melee attack, add 1 to the Hit roll.',
        keywords: ['Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'smokescreenBarrage', name: 'Smokescreen Barrage', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase, just after an enemy unit selects its targets",
        effect: "Select one ADEPTUS ASTARTES unit from your army that was selected as the target and has the Smokescreen ability. Until the end of the phase, subtract 1 from all Hit rolls made by the attacker against that unit.",
        keywords: ['Shooting', 'Reaction', 'Defence'],
      },
      {
        id: 'siegeBreakers', name: 'Siege Breakers', cost: 2,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS ASTARTES unit from your army that has not been selected to shoot. Until the end of the phase, ranged attacks made by models in that unit ignore the Benefit of Cover and the target\'s invulnerable saves are worsened by 1 (to a minimum of 5+).',
        keywords: ['Shooting', 'Anti-Cover', 'Offence'],
      },
    ],
  },

  ironstormSpearhead: {
    id: 'ironstormSpearhead',
    name: 'Ironstorm Spearhead',
    subtitle: 'Iron will, iron armour, unstoppable momentum.',
    playstyle: 'Mechanised assault — vehicles move fast and hit hard, transports deliver troops directly into objectives, and persistent re-rolls keep your armoured columns reliable even under fire.',
    detachmentRule: {
      name: 'Armoured Might',
      description: 'ADEPTUS ASTARTES VEHICLE units from your army have the Objective Secured ability (their OC characteristic counts as double while controlling an objective). Each time an ADEPTUS ASTARTES VEHICLE unit from your army makes an attack, you can re-roll a Hit roll of 1.',
    },
    enhancements: [
      { name: 'Ironclad Assault', cost: 20, description: 'ADEPTUS ASTARTES VEHICLE model only. The bearer can declare a charge even if it Advanced this turn. Add 3 to Charge rolls made for the bearer.' },
      { name: 'Blessed Hull', cost: 15, description: 'ADEPTUS ASTARTES CHARACTER model only. While the bearer is leading a unit in a VEHICLE, that VEHICLE has a 4+ invulnerable save.' },
      { name: 'Tank Commander', cost: 25, description: 'ADEPTUS ASTARTES OFFICER model only. At the start of your Shooting phase, select one friendly ADEPTUS ASTARTES VEHICLE unit within 9" of the bearer. Until the end of the phase, that unit can re-roll all Hit rolls.' },
      { name: 'Enhanced Cogitator', cost: 15, description: 'ADEPTUS ASTARTES VEHICLE model only. While the bearer has not moved this turn, ranged attacks made by the bearer have the [LETHAL HITS] ability.' },
    ],
    stratagems: [
      {
        id: 'fullThrottle', name: 'Full Throttle', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase',
        effect: 'Select one ADEPTUS ASTARTES VEHICLE unit from your army. Until the end of the phase, double the Move characteristic of that unit. It cannot charge this turn.',
        keywords: ['Movement', 'Vehicle'],
      },
      {
        id: 'disembarkUnderFire', name: 'Disembark Under Fire', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase — after a TRANSPORT disembarks passengers',
        effect: 'Select one ADEPTUS ASTARTES unit that just disembarked from a TRANSPORT this phase. That unit can immediately shoot as if it were your Shooting phase, even though it has already moved.',
        keywords: ['Shooting', 'Transport'],
      },
      {
        id: 'armouredRampage', name: 'Armoured Rampage', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one ADEPTUS ASTARTES VEHICLE unit from your army that has not been selected to fight. Until the end of the phase, each time a model in that unit makes a melee attack, on an unmodified Wound roll of 6, the target suffers 1 additional mortal wound.',
        keywords: ['Fight', 'Vehicle', 'Mortal Wounds'],
      },
      {
        id: 'repairUnderFire', name: 'Repair Under Fire', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one ADEPTUS ASTARTES VEHICLE unit from your army. That unit regains up to D3 lost wounds. If a TECHMARINE model is within 3", it regains up to D6 lost wounds instead.',
        keywords: ['Command', 'Repair'],
      },
      {
        id: 'tankShock', name: 'Tank Shock', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Charge phase',
        effect: 'Select one ADEPTUS ASTARTES VEHICLE unit from your army. Until the end of the phase, each time that unit makes a charge move, each enemy unit it moves within 1" of suffers D3 mortal wounds (max 6 mortal wounds per enemy unit).',
        keywords: ['Charge', 'Vehicle', 'Mortal Wounds'],
      },
      {
        id: 'pointBlankVolley', name: 'Point Blank Volley', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS ASTARTES VEHICLE unit from your army that has not been selected to shoot, that is within Engagement Range of an enemy unit. Until the end of the phase, that unit can make ranged attacks targeting enemy units within Engagement Range.',
        keywords: ['Shooting', 'Vehicle'],
      },
    ],
  },

}

export const smDetachmentList = Object.values(smDetachments)
