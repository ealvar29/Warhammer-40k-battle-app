// Dark Angels (Adeptus Astartes) — 10th Edition
// Stats sourced from Dark Angels Index + Codex Supplement

// ── Epic Heroes ───────────────────────────────────────────────────────────────
const characters = [
  {
    id: 'azrael',
    name: 'Azrael',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['intercessors', 'tacticalSquad', 'innerCircleCompanions'],
    unitKey: 'azrael',
    M: '6"', T: 4, Sv: '3+', W: 7, Ld: '6+', OC: 1, InvSv: '4+',
    points: 110, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'OFFICER', 'EPIC HERO'],
    abilities: [
      { name: 'The Lion Helm', phase: 'any', description: 'While this model is leading a unit, models in that unit have a 4+ invulnerable save.' },
      { name: 'Rites of Battle', phase: 'shooting', description: 'While this model is leading a unit, you can re-roll hit rolls of 1 for ranged and melee attacks made by models in that unit.' },
    ],
    weapons: [
      { name: 'Master-crafted boltgun', range: '24"', BS: '2+', A: 3, S: 5, AP: -1, D: 2, abilities: [] },
      { name: "Lion's Wrath", WS: '2+', A: 5, S: 8, AP: -3, D: 3, abilities: [] },
    ],
  },
  {
    id: 'belial',
    name: 'Belial',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['deathwingKnights', 'deathwingTerminators'],
    unitKey: 'belial',
    M: '5"', T: 4, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    points: 100, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'TERMINATOR', 'DARK ANGELS', 'INNER CIRCLE', 'EPIC HERO'],
    abilities: [
      { name: 'The Unforgiven', phase: 'fight', description: 'While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Deathwing Teleportation', phase: 'movement', description: 'Once per battle, instead of making a Normal Move, this unit can be removed and placed anywhere on the battlefield more than 9" from all enemy models.' },
    ],
    weapons: [
      { name: 'Master-crafted storm bolter', range: '24"', BS: '2+', A: 2, S: 4, AP: -1, D: 2, abilities: ['RAPID FIRE 2'] },
      { name: 'Sword of Silence', WS: '2+', A: 6, S: 8, AP: -3, D: 2, abilities: [] },
    ],
  },
  {
    id: 'sammael',
    name: 'Sammael',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['ravenwingBlackKnights', 'infiltrators'],
    unitKey: 'sammael',
    M: '14"', T: 6, Sv: '3+', W: 9, Ld: '6+', OC: 2, InvSv: '4+',
    points: 145, models: 1,
    keywords: ['CHARACTER', 'MOUNTED', 'FLY', 'DARK ANGELS', 'RAVENWING', 'EPIC HERO'],
    abilities: [
      { name: 'Wings of Night', phase: 'movement', description: 'After this unit makes an Advance move, select one friendly RAVENWING unit within 6". That unit can make a Normal Move of up to 6" even if it has already moved this phase.' },
      { name: 'Master of the Ravenwing', phase: 'shooting', description: 'Friendly RAVENWING units within 6" of this model can target enemy units that are not visible to them, as long as this model has line of sight to those units.' },
    ],
    weapons: [
      { name: 'Twin assault cannon', range: '24"', BS: '2+', A: 6, S: 6, AP: -1, D: 2, abilities: ['TWIN-LINKED'] },
      { name: 'Raven Sword', WS: '2+', A: 5, S: 6, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'asmodai',
    name: 'Asmodai',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['deathwingKnights', 'deathwingTerminators', 'intercessors', 'tacticalSquad'],
    unitKey: 'asmodai',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '5+', OC: 1, InvSv: '4+',
    points: 75, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'DARK ANGELS', 'CHAPLAIN', 'EPIC HERO'],
    abilities: [
      { name: 'Litanies of Hate', phase: 'fight', description: 'While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Interrogation', phase: 'fight', description: 'At the end of the Fight phase, select one enemy unit within 3" of this model. Roll one D6 for each model in that unit: on a 5+, that unit suffers 1 mortal wound (max 6 mortal wounds).' },
    ],
    weapons: [
      { name: 'Crozius Arcanum', WS: '2+', A: 4, S: 6, AP: -2, D: 2, abilities: [] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },

  // ── Characters ─────────────────────────────────────────────────────────────
  {
    id: 'interrogatorChaplain',
    name: 'Interrogator-Chaplain',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['intercessors', 'tacticalSquad', 'innerCircleCompanions'],
    unitKey: 'interrogatorChaplain',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '5+', OC: 1, InvSv: '4+',
    points: 65, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'DARK ANGELS', 'CHAPLAIN'],
    abilities: [
      { name: 'Litanies of Hate', phase: 'fight', description: 'While this model is leading a unit, melee weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Spiritual Leader', phase: 'any', description: 'Friendly DARK ANGELS units within 6" of this model are never Battle-shocked.' },
    ],
    weapons: [
      { name: 'Crozius Arcanum', WS: '2+', A: 4, S: 6, AP: -2, D: 2, abilities: [] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'companyMaster',
    name: 'Company Master',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['intercessors', 'tacticalSquad', 'innerCircleCompanions'],
    unitKey: 'companyMaster',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    points: 75, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'DARK ANGELS', 'OFFICER'],
    abilities: [
      { name: 'Rites of Battle', phase: 'shooting', description: 'While this model is leading a unit, you can re-roll hit rolls of 1 for attacks made by models in that unit.' },
      { name: 'Inner Circle Secrets', phase: 'any', description: 'While this model is on the battlefield, friendly DARK ANGELS INNER CIRCLE units are never Battle-shocked.' },
    ],
    weapons: [
      { name: 'Master-crafted power sword', WS: '2+', A: 5, S: 5, AP: -3, D: 2, abilities: [] },
      { name: 'Plasma pistol', range: '12"', BS: '2+', A: 1, S: 8, AP: -3, D: 2, abilities: ['HAZARDOUS'] },
    ],
  },
  {
    id: 'darkAngelsLibrarian',
    name: 'Librarian',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['intercessors', 'innerCircleCompanions'],
    unitKey: 'darkAngelsLibrarian',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '5+',
    points: 75, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'DARK ANGELS', 'PSYKER', 'LIBRARIAN'],
    abilities: [
      { name: 'Interromancy', phase: 'shooting', description: 'Psychic ability: roll 2D6; if the result equals or exceeds 7, select one enemy unit within 18" and visible. That unit suffers D3 mortal wounds and until the start of your next Command phase, subtract 2 from its Leadership characteristic.' },
      { name: 'Force Barrier', phase: 'any', description: 'This model has a 5+ invulnerable save. While this model is leading a unit, models in that unit have a 5+ invulnerable save.' },
    ],
    weapons: [
      { name: 'Force weapon', WS: '2+', A: 4, S: 6, AP: -2, D: 'D3', abilities: ['PSYCHIC'] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Battleline ────────────────────────────────────────────────────────────────
const battleline = [
  {
    id: 'intercessors',
    name: 'Intercessors',
    category: 'battleline',
    isLeader: false,
    unitKey: 'intercessors',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 80, models: 5,
    keywords: ['INFANTRY', 'BATTLELINE', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'INTERCESSORS'],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling that objective even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
    ],
    weapons: [
      { name: 'Bolt rifle', range: '30"', BS: '3+', A: 2, S: 4, AP: -1, D: 1, abilities: ['ASSAULT'] },
      { name: 'Close combat weapon', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'tacticalSquad',
    name: 'Tactical Squad',
    category: 'battleline',
    isLeader: false,
    unitKey: 'tacticalSquad',
    M: '6"', T: 4, Sv: '3+', W: 1, Ld: '6+', OC: 2,
    points: 75, models: 5,
    keywords: ['INFANTRY', 'BATTLELINE', 'ADEPTUS ASTARTES', 'DARK ANGELS'],
    abilities: [
      { name: 'Combat Squads', phase: 'deployment', description: 'Before the battle, this unit can be divided into two units of 5 models.' },
    ],
    weapons: [
      { name: 'Boltgun', range: '24"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: ['RAPID FIRE 1'] },
      { name: 'Close combat weapon', WS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Infantry ──────────────────────────────────────────────────────────────────
const infantry = [
  {
    id: 'deathwingKnights',
    name: 'Deathwing Knights',
    category: 'infantry',
    isLeader: false,
    unitKey: 'deathwingKnights',
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    points: 220, models: 5,
    keywords: ['INFANTRY', 'TERMINATOR', 'DARK ANGELS', 'DEATHWING', 'INNER CIRCLE'],
    abilities: [
      { name: 'Inner Circle', phase: 'any', description: 'Models in this unit are never Battle-shocked.' },
      { name: 'Impervious', phase: 'fight', description: 'Each time an attack is made against this unit, subtract 1 from the Damage characteristic (min 1).' },
    ],
    weapons: [
      { name: 'Mace of Absolution', WS: '3+', A: 4, S: 8, AP: -2, D: 2, abilities: [] },
      { name: 'Storm shield', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: ['EXTRA ATTACKS'] },
    ],
  },
  {
    id: 'deathwingTerminators',
    name: 'Deathwing Terminators',
    category: 'infantry',
    isLeader: false,
    unitKey: 'deathwingTerminators',
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    points: 195, models: 5,
    keywords: ['INFANTRY', 'TERMINATOR', 'DARK ANGELS', 'DEATHWING'],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During deployment, you can set up this unit in Strategic Reserves instead of on the battlefield. At the start of the second or subsequent battle round, it can arrive anywhere on the battlefield more than 9" from all enemy models.' },
      { name: 'Crux Terminatus', phase: 'any', description: 'Each time an attack is allocated to a model in this unit, roll one D6 on a 6, that attack is ignored.' },
    ],
    weapons: [
      { name: 'Storm bolter', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: ['RAPID FIRE 2'] },
      { name: 'Power fist', WS: '4+', A: 3, S: 8, AP: -2, D: 2, abilities: [] },
      { name: 'Power sword', WS: '3+', A: 3, S: 5, AP: -2, D: 1, abilities: [] },
    ],
  },
  {
    id: 'innerCircleCompanions',
    name: 'Inner Circle Companions',
    category: 'infantry',
    isLeader: false,
    unitKey: 'innerCircleCompanions',
    M: '6"', T: 4, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    points: 135, models: 5,
    keywords: ['INFANTRY', 'DARK ANGELS', 'INNER CIRCLE'],
    abilities: [
      { name: 'Inner Circle', phase: 'any', description: 'Models in this unit are never Battle-shocked.' },
      { name: 'Blade of Caliban', phase: 'fight', description: 'Each time a model in this unit makes a melee attack, on an unmodified wound roll of 6, the Damage characteristic of that attack is increased by 1.' },
    ],
    weapons: [
      { name: 'Dark Wing Sword', WS: '2+', A: 4, S: 5, AP: -3, D: 2, abilities: [] },
    ],
  },
  {
    id: 'ravenwingBlackKnights',
    name: 'Ravenwing Black Knights',
    category: 'cavalry',
    isLeader: false,
    unitKey: 'ravenwingBlackKnights',
    M: '12"', T: 5, Sv: '3+', W: 2, Ld: '6+', OC: 2, InvSv: '5+',
    points: 145, models: 6,
    keywords: ['MOUNTED', 'FLY', 'DARK ANGELS', 'RAVENWING'],
    abilities: [
      { name: 'Ravenwing', phase: 'movement', description: 'Each time this unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in this unit.' },
      { name: 'Jink', phase: 'shooting', description: 'This unit has a 5+ invulnerable save against ranged attacks.' },
    ],
    weapons: [
      { name: 'Plasma talon', range: '18"', BS: '3+', A: 2, S: 8, AP: -3, D: 2, abilities: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Corvus Hammer', WS: '3+', A: 3, S: 6, AP: -1, D: 1, abilities: [] },
    ],
  },
  {
    id: 'hellblasters',
    name: 'Hellblasters',
    category: 'infantry',
    isLeader: false,
    unitKey: 'hellblasters',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 100, models: 5,
    keywords: ['INFANTRY', 'ADEPTUS ASTARTES', 'DARK ANGELS'],
    abilities: [
      { name: 'Plasmaburn Rounds', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack with a plasma weapon, you may choose the Supercharge mode (S9 AP-4 D3 HAZARDOUS) instead of normal mode.' },
    ],
    weapons: [
      { name: 'Plasma incinerator', range: '30"', BS: '3+', A: 2, S: 8, AP: -3, D: 2, abilities: ['HAZARDOUS'] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'infiltrators',
    name: 'Infiltrators',
    category: 'infantry',
    isLeader: false,
    unitKey: 'infiltrators',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 100, models: 5,
    keywords: ['INFANTRY', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'PHOBOS'],
    abilities: [
      { name: 'Concealed Positions', phase: 'deployment', description: 'During deployment, when you set up this unit, it can be set up anywhere on the battlefield that is more than 9" from the enemy deployment zone and all enemy models.' },
      { name: 'Smokescreen', phase: 'any', description: 'Once per battle, at the start of your opponent\'s Shooting phase, this unit can activate Smokescreen. Until the end of the phase, ranged attacks that target this unit suffer a -1 penalty to the Hit roll.' },
    ],
    weapons: [
      { name: 'Marksman bolt carbine', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: ['ASSAULT', 'PRECISION'] },
      { name: 'Close combat weapon', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'scoutSquad',
    name: 'Scout Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'scoutSquad',
    M: '6"', T: 4, Sv: '4+', W: 1, Ld: '6+', OC: 2,
    points: 65, models: 5,
    keywords: ['INFANTRY', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'SCOUTS'],
    abilities: [
      { name: 'Scouts', phase: 'deployment', description: 'After deployment but before the first battle round begins, this unit can make a Normal Move of up to 6".' },
      { name: 'Concealed Positions', phase: 'deployment', description: 'During deployment, when you set up this unit, it can be placed anywhere on the battlefield more than 9" from the enemy deployment zone and all enemy models.' },
    ],
    weapons: [
      { name: 'Scout sniper rifle', range: '36"', BS: '3+', A: 1, S: 5, AP: -1, D: 2, abilities: ['HEAVY', 'PRECISION'] },
      { name: 'Close combat weapon', WS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Vehicles ──────────────────────────────────────────────────────────────────
const vehicles = [
  {
    id: 'redemptorDreadnought',
    name: 'Redemptor Dreadnought',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'redemptorDreadnought',
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 3, InvSv: '4+',
    points: 210, models: 1,
    keywords: ['VEHICLE', 'WALKER', 'DARK ANGELS', 'SMOKE', 'DREADNOUGHT'],
    abilities: [
      { name: 'Smoke', phase: 'any', description: 'Once per battle, at the start of your opponent\'s Shooting phase, you can use this model\'s Smoke launchers. Until the end of the phase, your opponent must subtract 1 from all Hit rolls that target this model.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    weapons: [
      { name: 'Macro plasma incinerator', range: '36"', BS: '3+', A: 2, S: 9, AP: -4, D: 3, abilities: ['HAZARDOUS'] },
      { name: 'Redemptor fist', WS: '3+', A: 5, S: 12, AP: -3, D: 3, abilities: [] },
      { name: 'Fragstorm grenade launcher', range: '18"', BS: '3+', A: 4, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'darkTalon',
    name: 'Dark Talon',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'darkTalon',
    M: '20"', T: 9, Sv: '3+', W: 10, Ld: '6+', OC: 0, InvSv: '5+',
    points: 175, models: 1,
    keywords: ['VEHICLE', 'FLY', 'AIRCRAFT', 'DARK ANGELS', 'RAVENWING'],
    abilities: [
      { name: 'Stasis Bomb', phase: 'shooting', description: 'Once per battle, instead of shooting any other weapons, this model can drop a Stasis Bomb. Select one enemy unit this model flew over during the Movement phase: that unit is struck by the bomb (Str 4, AP -1, D 2, D6 automatic hits, unit cannot fall back this turn).' },
      { name: 'Supersonic', phase: 'movement', description: 'Each time this model makes a Normal Move, Advance or Falls Back, it must move a minimum of 20". It cannot end its move within the enemy deployment zone.' },
      { name: 'Hard to Hit', phase: 'shooting', description: 'Each time a ranged attack targets this model, subtract 1 from the Hit roll.' },
    ],
    weapons: [
      { name: 'Hurricane bolter (x2)', range: '24"', BS: '3+', A: 12, S: 4, AP: 0, D: 1, abilities: ['TWIN-LINKED'] },
      { name: 'Rift cannon', range: '24"', BS: '3+', A: 2, S: 8, AP: -4, D: 'D6', abilities: ['DEVASTATING WOUNDS'] },
    ],
  },
  {
    id: 'landRaider',
    name: 'Land Raider',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'landRaider',
    M: '10"', T: 13, Sv: '2+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    points: 265, models: 1,
    keywords: ['VEHICLE', 'TRANSPORT', 'DARK ANGELS', 'SMOKE', 'LAND RAIDER'],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    weapons: [
      { name: '2x Twin lascannon', range: '48"', BS: '3+', A: 2, S: 12, AP: -3, D: 'D6+1', abilities: ['TWIN-LINKED'] },
      { name: 'Twin heavy bolter', range: '36"', BS: '3+', A: 6, S: 5, AP: -1, D: 2, abilities: ['TWIN-LINKED', 'SUSTAINED HITS 1'] },
    ],
  },
  {
    id: 'predatorAnnihilator',
    name: 'Predator Annihilator',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'predatorAnnihilator',
    M: '10"', T: 11, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    points: 130, models: 1,
    keywords: ['VEHICLE', 'DARK ANGELS', 'SMOKE', 'PREDATOR'],
    abilities: [
      { name: 'Deadly Hunter', phase: 'shooting', description: 'Each time this model makes a ranged attack that targets a MONSTER or VEHICLE, add 1 to the Hit roll.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    weapons: [
      { name: 'Predator autocannon', range: '48"', BS: '3+', A: '2D3', S: 9, AP: -2, D: 3, abilities: ['HEAVY'] },
      { name: '2x Lascannon', range: '48"', BS: '3+', A: 1, S: 12, AP: -3, D: 'D6+1', abilities: ['HEAVY'] },
      { name: 'Twin lascannon', range: '48"', BS: '3+', A: 2, S: 12, AP: -3, D: 'D6+1', abilities: ['HEAVY', 'TWIN-LINKED'] },
    ],
  },
]

const daUnits = [...characters, ...battleline, ...infantry, ...vehicles]

export const daUnitList = daUnits

export const daUnitsByCategory = {
  epicHero:  daUnits.filter(u => u.category === 'epicHero'),
  character: daUnits.filter(u => u.category === 'character'),
  battleline: daUnits.filter(u => u.category === 'battleline'),
  infantry:  daUnits.filter(u => u.category === 'infantry'),
  cavalry:   daUnits.filter(u => u.category === 'cavalry'),
  vehicle:   daUnits.filter(u => u.category === 'vehicle'),
}
