// Generic Adeptus Astartes units that Space Wolves can include in their army.
// Chapter-specific characters (Dark Angels, Blood Angels, etc.) are excluded.

export const smGenericUnits = {

  // ── CHARACTERS ────────────────────────────────────────────────────
  smCaptain: {
    id: 'smCaptain', name: 'Captain', category: 'character',
    powerRating: 5, points: 80,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Master-crafted Bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2 },
      { name: 'Power Sword', type: 'melee', A: 5, WS: '2+', S: 4, AP: -2, D: 1 },
    ],
    abilities: [
      { name: 'Rites of Battle', phase: 'command', description: 'Friendly ADEPTUS ASTARTES CORE units within 6" of this model can re-roll Hit rolls of 1.' },
      { name: 'Iron Resolve', phase: 'any', description: 'Once per battle, this model can use this ability. Until the end of the phase, this model has a 4+ invulnerable save and ignores the effects of all modifiers to its characteristics.' },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors', 'heavyIntercessors', 'hellblasters'],
    keywords: ['INFANTRY', 'CHARACTER', 'CAPTAIN', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  smLibrarian: {
    id: 'smLibrarian', name: 'Librarian', category: 'character',
    powerRating: 5, points: 80,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Force Weapon', type: 'melee', A: 4, WS: '3+', S: 6, AP: -1, D: 2, keywords: ['PSYCHIC'] },
      { name: 'Smite', type: 'ranged', range: '18"', A: 'D3', BS: '3+', S: 5, AP: -1, D: 1, keywords: ['PSYCHIC', 'DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Psychic Hood', phase: 'any', description: 'This model has a 4+ invulnerable save against mortal wounds.' },
      { name: 'Mind Worm', phase: 'shooting', description: 'Select one enemy unit visible to this model. Roll one D6: on a 3+, that unit suffers D3 mortal wounds.' },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors'],
    keywords: ['INFANTRY', 'CHARACTER', 'PSYKER', 'LIBRARIAN', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  smChaplain: {
    id: 'smChaplain', name: 'Chaplain', category: 'character',
    powerRating: 4, points: 75,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1 },
      { name: 'Crozius Arcanum', type: 'melee', A: 4, WS: '2+', S: 6, AP: -1, D: 2 },
    ],
    abilities: [
      { name: 'Litany of Hate', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, re-roll a Hit roll of 1.' },
      { name: 'Spiritual Leader', phase: 'command', description: 'Friendly ADEPTUS ASTARTES units within 6" of this model can use this model\'s Leadership for Morale tests.' },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors', 'hellblasters'],
    keywords: ['INFANTRY', 'CHARACTER', 'CHAPLAIN', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  // ── BATTLELINE ────────────────────────────────────────────────────
  intercessors: {
    id: 'intercessors', name: 'Intercessors', category: 'battleline',
    powerRating: 4, points: 80,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Bolt Rifle', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['ASSAULT'] },
      { name: 'Close Combat Weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it controls that objective marker even if there are more enemy models within range.' },
    ],
    isLeader: false,
    eligibleLeaders: ['smCaptain', 'smLibrarian', 'smChaplain'],
    keywords: ['INFANTRY', 'BATTLELINE', 'INTERCESSORS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  assaultIntercessors: {
    id: 'assaultIntercessors', name: 'Assault Intercessors', category: 'battleline',
    powerRating: 4, points: 75,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Heavy Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: -1, D: 1 },
      { name: 'Astartes Chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it controls that objective marker even if there are more enemy models within range.' },
      { name: 'Shock Assault', phase: 'charge', description: 'Each time this unit ends a Charge move, until the end of the battle round, add 1 to the Attacks characteristic of models in this unit.' },
    ],
    isLeader: false,
    eligibleLeaders: ['smCaptain', 'smLibrarian', 'smChaplain'],
    keywords: ['INFANTRY', 'BATTLELINE', 'ASSAULT INTERCESSORS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  // ── INFANTRY ──────────────────────────────────────────────────────
  hellblasters: {
    id: 'hellblasters', name: 'Hellblasters', category: 'infantry',
    powerRating: 6, points: 95,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Plasma Incinerator', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 7, AP: -3, D: 1 },
      { name: 'Plasma Incinerator (Supercharge)', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS'] },
      { name: 'Close Combat Weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Plasma Annihilator', phase: 'shooting', description: 'Each time this unit is selected to shoot, all models in this unit must shoot with the same profile — standard or supercharged.' },
    ],
    isLeader: false,
    eligibleLeaders: ['smCaptain', 'smChaplain'],
    keywords: ['INFANTRY', 'HELLBLASTERS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  eradicators: {
    id: 'eradicators', name: 'Eradicators', category: 'infantry',
    powerRating: 5, points: 90,
    M: '5"', T: 6, Sv: '3+', W: 3, Ld: '6+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Melta Rifle', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '4+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Close Combat Weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Total Obliteration', phase: 'shooting', description: 'Each time a ranged attack made by a model in this unit targets a MONSTER or VEHICLE unit, you can re-roll the Hit roll, you can re-roll the Wound roll, and you can re-roll the Damage roll.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'ERADICATORS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  heavyIntercessors: {
    id: 'heavyIntercessors', name: 'Heavy Intercessors', category: 'infantry',
    powerRating: 5, points: 100,
    M: '5"', T: 5, Sv: '3+', W: 3, Ld: '6+', OC: 2,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Heavy Bolt Rifle', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 5, AP: -1, D: 1, keywords: ['HEAVY'] },
      { name: 'Close Combat Weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Signum Array', phase: 'shooting', description: 'Each time this unit is selected to shoot, one model in this unit can use the Signum Array. Until the end of the phase, that model\'s BS improves to 2+ for Heavy weapons.' },
    ],
    isLeader: false,
    eligibleLeaders: ['smCaptain'],
    keywords: ['INFANTRY', 'HEAVY INTERCESSORS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  aggressors: {
    id: 'aggressors', name: 'Aggressors', category: 'infantry',
    powerRating: 6, points: 90,
    M: '5"', T: 5, Sv: '3+', W: 3, Ld: '6+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Boltstorm Gauntlets', type: 'ranged', range: '12"', A: 6, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Boltstorm Gauntlets (melee)', type: 'melee', A: 3, WS: '3+', S: 9, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Bodyguard', phase: 'any', description: 'Each time a friendly CHARACTER model within 3" of this unit would lose a wound, roll one D6: on a 2+, this unit suffers that wound instead.' },
      { name: 'Covering Fire', phase: 'shooting', description: 'Each time an enemy unit declares a charge that targets a friendly unit within 6" of this unit, this unit can shoot that enemy unit as if it were your Shooting phase.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GRAVIS', 'AGGRESSORS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  // ── VEHICLES / MONSTERS ──────────────────────────────────────────
  redemptorDreadnought: {
    id: 'redemptorDreadnought', name: 'Redemptor Dreadnought', category: 'vehicle',
    powerRating: 9, points: 190,
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Onslaught Gatling Cannon', type: 'ranged', range: '24"', A: 12, BS: '3+', S: 6, AP: -1, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Macro Plasma Incinerator', type: 'ranged', range: '36"', A: 'D3+3', BS: '3+', S: 8, AP: -3, D: 3, keywords: ['BLAST', 'HAZARDOUS'] },
      { name: 'Redemptor Fist', type: 'melee', A: 5, WS: '3+', S: 12, AP: -3, D: 3 },
      { name: 'Icarus Rocket Pod', type: 'ranged', range: '24"', A: 'D3', BS: '3+', S: 8, AP: -1, D: 2, keywords: ['ANTI-FLY 2+'] },
    ],
    abilities: [
      { name: 'Explodes', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Duty Eternal', phase: 'any', description: 'Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack (to a minimum of 1).' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DREADNOUGHT', 'REDEMPTOR DREADNOUGHT', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  brutalisDreadnought: {
    id: 'brutalisDreadnought', name: 'Brutalis Dreadnought', category: 'vehicle',
    powerRating: 9, points: 160,
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Twin Bolt Rifle', type: 'ranged', range: '24"', A: 4, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['TWIN-LINKED'] },
      { name: 'Brutalis Fists', type: 'melee', A: 6, WS: '3+', S: 14, AP: -3, D: 3 },
      { name: 'Brutalis Talons', type: 'melee', A: 12, WS: '3+', S: 7, AP: -2, D: 1 },
    ],
    abilities: [
      { name: 'Battering Charge', phase: 'charge', description: 'Each time this model ends a Charge move, select one enemy unit within Engagement Range: that unit suffers D3 mortal wounds.' },
      { name: 'Explodes', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers D3 mortal wounds.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DREADNOUGHT', 'BRUTALIS DREADNOUGHT', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  venerableDreadnought: {
    id: 'venerableDreadnought', name: 'Venerable Dreadnought', category: 'vehicle',
    powerRating: 8, points: 160,
    M: '6"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Twin Lascannon', type: 'ranged', range: '48"', A: 2, BS: '2+', S: 12, AP: -3, D: 'D6+1', keywords: ['HEAVY', 'TWIN-LINKED'] },
      { name: 'Twin Autocannons', type: 'ranged', range: '48"', A: 4, BS: '2+', S: 9, AP: -1, D: 3, keywords: ['HEAVY', 'TWIN-LINKED'] },
      { name: 'Dreadnought Combat Weapon', type: 'melee', A: 4, WS: '2+', S: 12, AP: -3, D: 3 },
    ],
    abilities: [
      { name: 'Venerable', phase: 'any', description: 'Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack (to a minimum of 1).' },
      { name: 'Explodes', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers D3 mortal wounds.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DREADNOUGHT', 'VENERABLE DREADNOUGHT', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  ballistusDreadnought: {
    id: 'ballistusDreadnought', name: 'Ballistus Dreadnought', category: 'vehicle',
    powerRating: 8, points: 150,
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Ballistus Lascannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['HEAVY'] },
      { name: 'Ballistus Missile Launcher (Frag)', type: 'ranged', range: '48"', A: 'D6', BS: '3+', S: 5, AP: 0, D: 1, keywords: ['BLAST', 'HEAVY'] },
      { name: 'Ballistus Missile Launcher (Krak)', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 10, AP: -2, D: 'D6+2', keywords: ['HEAVY'] },
      { name: 'Twin Storm Bolter', type: 'ranged', range: '24"', A: 4, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 4', 'TWIN-LINKED'] },
      { name: 'Armoured Feet', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Duty Eternal', phase: 'any', description: 'Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack (to a minimum of 1).' },
      { name: 'Explodes', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers D3 mortal wounds.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DREADNOUGHT', 'BALLISTUS DREADNOUGHT', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },

  rhino: {
    id: 'rhino', name: 'Rhino', category: 'vehicle',
    powerRating: 4, points: 75,
    M: '12"', T: 9, Sv: '3+', W: 10, Ld: '6+', OC: 2,
    models: 1,
    weapons: [
      { name: 'Storm Bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
    ],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport after it has made a Normal Move can still declare charges this turn.' },
      { name: 'Self-repair', phase: 'command', description: 'In your Command phase, roll one D6: on a 4+, this model regains 1 lost wound.' },
      { name: 'Transport', phase: 'movement', description: 'This model has a transport capacity of 10 ADEPTUS ASTARTES INFANTRY models.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'DEDICATED TRANSPORT', 'RHINO', 'ADEPTUS ASTARTES'],
    factionKeywords: ['ADEPTUS ASTARTES'],
  },
}

export const smGenericUnitList = Object.values(smGenericUnits)

export const smGenericsByCategory = {
  character: smGenericUnitList.filter(u => u.category === 'character'),
  battleline: smGenericUnitList.filter(u => u.category === 'battleline'),
  infantry:   smGenericUnitList.filter(u => u.category === 'infantry'),
  cavalry:    smGenericUnitList.filter(u => u.category === 'cavalry'),
  monster:    smGenericUnitList.filter(u => u.category === 'monster'),
  vehicle:    smGenericUnitList.filter(u => u.category === 'vehicle'),
}
