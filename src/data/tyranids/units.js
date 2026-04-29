export const tyranidUnits = {
  // ── EPIC HEROES ────────────────────────────────────────────────────
  swarmlord: {
    id: 'swarmlord', name: 'The Swarmlord', category: 'epicHero',
    powerRating: 12, points: 220,
    M: '8"', T: 10, Sv: '2+', W: 10, Ld: '7+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Bone Sabres', type: 'melee', A: 8, WS: '2+', S: 9, AP: -2, D: 3, keywords: ['TWIN-LINKED'] },
      { name: 'Synaptic Pulse', type: 'ranged', range: '18"', A: 'D6+3', BS: 'N/A', S: 5, AP: -1, D: 2, keywords: ['PSYCHIC', 'TORRENT'] },
    ],
    abilities: [
      { name: 'Hive Commander', phase: 'command', description: 'At the start of your Command phase, if this model is on the battlefield, you gain 1CP.' },
      { name: 'Malign Presence', phase: 'any', description: 'Aura: If this model is your WARLORD, each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12" of this model, increase the cost of that use of that Stratagem by 1CP.' },
      { name: 'Domination of the Hive Mind', phase: 'any', description: 'Aura: While a friendly TYRANIDS unit is within 9" of this model, that unit is within your army\'s Synapse Range.' },
    ],
    isLeader: true,
    leadsUnits: ['tyrantGuard'],
    keywords: ['MONSTER', 'CHARACTER', 'EPIC HERO', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'HIVE TYRANT', 'THE SWARMLORD', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  oldOneEye: {
    id: 'oldOneEye', name: 'Old One Eye', category: 'epicHero',
    powerRating: 9, points: 150,
    M: '8"', T: 9, Sv: '2+', W: 9, Ld: '8+', OC: 3,
    models: 1,
    weapons: [
      { name: "Old One Eye's claws and talons — strike", type: 'melee', A: 6, WS: '3+', S: 14, AP: -3, D: 'D6+1' },
      { name: "Old One Eye's claws and talons — sweep", type: 'melee', A: 12, WS: '3+', S: 6, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
      { name: 'Alpha Leader', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes an attack, you can re-roll the Hit roll.' },
      { name: 'Unstoppable Monster', phase: 'command', description: "At the start of each player's Command phase, this model regains up to D3 lost wounds." },
    ],
    isLeader: true,
    leadsUnits: ['carnifex'],
    keywords: ['MONSTER', 'CHARACTER', 'EPIC HERO', 'GREAT DEVOURER', 'OLD ONE EYE', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  deathleaper: {
    id: 'deathleaper', name: 'Deathleaper', category: 'epicHero',
    powerRating: 5, points: 80,
    M: '8"', T: 6, Sv: '3+', W: 7, Ld: '7+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Lictor claws and talons', type: 'melee', A: 6, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['PRECISION'] },
    ],
    abilities: [
      { name: 'Feeder Tendrils', phase: 'fight', description: 'Each time this model destroys an enemy CHARACTER model, you gain 1CP.' },
      { name: 'Fear of the Unseen', phase: 'any', description: 'Aura: While an enemy unit is within 6" of this model, subtract 1 from the Leadership characteristic of models in that unit. While an enemy unit that has lost one or more models is within 6" of this model, that unit must take a Battle-shock test at the start of your opponent\'s Command phase.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GREAT DEVOURER', 'VANGUARD INVADER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── CHARACTERS ─────────────────────────────────────────────────────
  hiveTyrant: {
    id: 'hiveTyrant', name: 'Hive Tyrant', category: 'character',
    powerRating: 10, points: 195,
    M: '8"', T: 10, Sv: '2+', W: 10, Ld: '7+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Monstrous Bonesword & Lash Whip', type: 'melee', A: 6, WS: '2+', S: 9, AP: -2, D: 3, keywords: ['TWIN-LINKED'] },
      { name: 'Monstrous Scything Talons', type: 'melee', A: 4, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['EXTRA ATTACKS'] },
      { name: 'Heavy Venom Cannon', type: 'ranged', range: '36"', A: 'D3', BS: '2+', S: 9, AP: -2, D: 3, keywords: ['BLAST'] },
      { name: 'Stranglethorn Cannon', type: 'ranged', range: '36"', A: 'D6+1', BS: '2+', S: 7, AP: -1, D: 2, keywords: ['BLAST'] },
    ],
    abilities: [
      { name: 'Will of the Hive Mind', phase: 'any', description: 'Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that Stratagem by 1CP.' },
      { name: 'Onslaught', phase: 'any', description: 'Aura, Psychic: While a friendly TYRANIDS unit is within 6" of this model, ranged weapons equipped by models in that unit have the [ASSAULT] and [LETHAL HITS] abilities.' },
    ],
    isLeader: true,
    leadsUnits: ['tyrantGuard'],
    keywords: ['MONSTER', 'CHARACTER', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'HIVE TYRANT', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  wingedHiveTyrant: {
    id: 'wingedHiveTyrant', name: 'Winged Hive Tyrant', category: 'character',
    powerRating: 10, points: 170,
    M: '12"', T: 9, Sv: '2+', W: 10, Ld: '7+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Monstrous Bonesword & Lash Whip', type: 'melee', A: 6, WS: '2+', S: 9, AP: -2, D: 3, keywords: ['TWIN-LINKED'] },
      { name: 'Monstrous Scything Talons', type: 'melee', A: 4, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['EXTRA ATTACKS'] },
      { name: 'Tyrant talons', type: 'melee', A: 5, WS: '2+', S: 7, AP: -2, D: 2 },
      { name: 'Heavy Venom Cannon', type: 'ranged', range: '36"', A: 'D3', BS: '2+', S: 9, AP: -2, D: 3, keywords: ['BLAST'] },
      { name: 'Stranglethorn Cannon', type: 'ranged', range: '36"', A: 'D6+1', BS: '2+', S: 7, AP: -1, D: 2, keywords: ['BLAST'] },
    ],
    abilities: [
      { name: 'Will of the Hive Mind', phase: 'any', description: 'Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that Stratagem by 1CP.' },
      { name: 'Paroxysm', phase: 'fight', description: 'Psychic: At the start of the Fight phase, select one visible enemy unit within 12" of this model. Roll one D6: on a 1, that unit suffers D3 mortal wounds; on a 2+, subtract 1 from the Attacks characteristic of models in that unit until the end of the phase.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['MONSTER', 'CHARACTER', 'PSYKER', 'FLY', 'GREAT DEVOURER', 'SYNAPSE', 'HIVE TYRANT', 'WINGED HIVE TYRANT', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  neurotyrant: {
    id: 'neurotyrant', name: 'Neurotyrant', category: 'character',
    powerRating: 6, points: 105,
    M: '6"', T: 8, Sv: '4+', W: 9, Ld: '7+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Neurotyrant Claws and Lashes', type: 'melee', A: 6, WS: '3+', S: 5, AP: 0, D: 1 },
      { name: 'Psychic Scream', type: 'ranged', range: '18"', A: '2D6', BS: 'N/A', S: 5, AP: -1, D: 2, keywords: ['IGNORES COVER', 'PSYCHIC', 'TORRENT'] },
    ],
    abilities: [
      { name: 'Node Lash', phase: 'any', description: 'Psychic: While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll. If the target unit is Battle-shocked, add 1 to the Wound roll as well.' },
      { name: 'Neuroloids', phase: 'command', description: 'In your Command phase, select up to two friendly TYRANIDS units within 18" of this model. Until the start of your next Command phase, those units are within your army\'s Synapse Range.' },
    ],
    isLeader: true,
    leadsUnits: ['neurogaunts', 'tyrantGuard', 'zoanthropes'],
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'NEUROTYRANT', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  broodlord: {
    id: 'broodlord', name: 'Broodlord', category: 'character',
    powerRating: 5, points: 80,
    M: '8"', T: 5, Sv: '4+', W: 6, Ld: '7+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Broodlord Claws and Talons', type: 'melee', A: 5, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Vicious Insight', phase: 'fight', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.' },
      { name: 'Hypnotic Gaze', phase: 'fight', description: 'Psychic: At the start of the Fight phase, select one enemy unit within Engagement Range of this model. Until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: true,
    leadsUnits: ['genestealers'],
    keywords: ['INFANTRY', 'CHARACTER', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'VANGUARD INVADER', 'BROODLORD', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  wingedTyranidPrime: {
    id: 'wingedTyranidPrime', name: 'Winged Tyranid Prime', category: 'character',
    powerRating: 4, points: 65,
    M: '12"', T: 5, Sv: '4+', W: 6, Ld: '7+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Prime talons', type: 'melee', A: 6, WS: '2+', S: 6, AP: -1, D: 2 },
    ],
    abilities: [
      { name: 'Alpha Warrior', phase: 'fight', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.' },
      { name: 'Death Blow', phase: 'fight', description: 'When this model is destroyed, roll one D6: on a 4+, this model can fight before it is removed from play.' },
    ],
    isLeader: true,
    leadsUnits: ['gargoyles', 'tyranidWarriorsRanged', 'tyranidWarriorsMelee'],
    keywords: ['INFANTRY', 'CHARACTER', 'FLY', 'GREAT DEVOURER', 'SYNAPSE', 'VANGUARD INVADER', 'WINGED TYRANID PRIME', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tervigon: {
    id: 'tervigon', name: 'Tervigon', category: 'character',
    powerRating: 11, points: 160,
    M: '8"', T: 11, Sv: '2+', W: 16, Ld: '7+', OC: 5,
    models: 1,
    weapons: [
      { name: 'Massive crushing claws', type: 'melee', A: 4, WS: '4+', S: 12, AP: -3, D: 'D6+1' },
      { name: 'Massive scything talons — strike', type: 'melee', A: 4, WS: '3+', S: 9, AP: -2, D: 'D6' },
      { name: 'Massive scything talons — sweep', type: 'melee', A: 8, WS: '3+', S: 7, AP: -1, D: 2 },
      { name: 'Stinger salvoes', type: 'ranged', range: '24"', A: 8, BS: '3+', S: 5, AP: 0, D: 1, keywords: ['HEAVY'] },
    ],
    abilities: [
      { name: 'Spawn Termagants', phase: 'command', description: 'In your Command phase, you can select one friendly TERMAGANTS unit within 6" of this model and return up to D3+3 destroyed TERMAGANT models to that unit.' },
      { name: 'Brood Progenitor', phase: 'any', description: 'Aura, Psychic: While a friendly TERMAGANTS unit is within 6" of this model, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: true,
    leadsUnits: ['termagants'],
    keywords: ['MONSTER', 'CHARACTER', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'TERVIGON', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  parasiteOfMortrex: {
    id: 'parasiteOfMortrex', name: 'Parasite of Mortrex', category: 'character',
    powerRating: 4, points: 80,
    M: '12"', T: 5, Sv: '4+', W: 5, Ld: '8+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Barbed Ovipositor', type: 'melee', A: 1, WS: '2+', S: 3, AP: -2, D: 3, keywords: ['ANTI-INFANTRY 3+', 'EXTRA ATTACKS'] },
      { name: 'Clawed Limbs', type: 'melee', A: 6, WS: '2+', S: 5, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Parasitic Infection', phase: 'fight', description: 'Each time an INFANTRY model is destroyed by an attack made with this model\'s Barbed Ovipositor, after this model has finished making its attacks, you can add one new Ripper Swarms unit consisting of D3 models to your army and set it up within 3" of this model.' },
      { name: 'It Itches!', phase: 'fight', description: 'At the start of the Fight phase, select one enemy unit within Engagement Range of this model. That enemy unit must take a Battle-shock test.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['INFANTRY', 'CHARACTER', 'FLY', 'SYNAPSE', 'GREAT DEVOURER', 'VANGUARD INVADER', 'PARASITE OF MORTREX', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── BATTLELINE ──────────────────────────────────────────────────────
  termagants: {
    id: 'termagants', name: 'Termagants', category: 'battleline',
    powerRating: 3, points: 60,
    M: '6"', T: 3, Sv: '5+', W: 1, Ld: '8+', OC: 2,
    models: 10, minModels: 10, maxModels: 20,
    weapons: [
      { name: 'Fleshborer', type: 'ranged', range: '18"', A: 1, BS: '4+', S: 5, AP: 0, D: 1, keywords: ['ASSAULT'] },
      { name: 'Termagant Devourer', type: 'ranged', range: '18"', A: 2, BS: '4+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT'] },
      { name: 'Termagant Spinefists', type: 'ranged', range: '12"', A: 2, BS: '4+', S: 3, AP: 0, D: 1, keywords: ['ASSAULT', 'PISTOL', 'TWIN-LINKED'] },
      { name: 'Shardlauncher', type: 'ranged', range: '18"', A: 'D3', BS: '4+', S: 5, AP: 0, D: 1, keywords: ['BLAST', 'HEAVY'] },
      { name: 'Spike Rifle', type: 'ranged', range: '24"', A: 1, BS: '4+', S: 4, AP: -1, D: 1, keywords: ['HEAVY'] },
      { name: 'Strangleweb', type: 'ranged', range: '18"', A: 'D6', BS: 'N/A', S: 2, AP: 0, D: 1, keywords: ['ASSAULT', 'DEVASTATING WOUNDS', 'TORRENT'] },
      { name: 'Chitinous claws and teeth', type: 'melee', A: 1, WS: '4+', S: 3, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Skulking Horrors', phase: 'movement', description: 'Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9" of this unit, if this unit is not within Engagement Range of any enemy units, it can make a Normal move of up to D6".' },
    ],
    isLeader: false,
    eligibleLeaders: ['tervigon'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GREAT DEVOURER', 'ENDLESS MULTITUDE', 'TERMAGANTS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  hormagaunts: {
    id: 'hormagaunts', name: 'Hormagaunts', category: 'battleline',
    powerRating: 3, points: 65,
    M: '10"', T: 3, Sv: '5+', W: 1, Ld: '8+', OC: 2,
    models: 10, minModels: 10, maxModels: 20,
    weapons: [
      { name: 'Hormagaunt talons', type: 'melee', A: 3, WS: '4+', S: 3, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Bounding Leap', phase: 'movement', description: 'This unit is eligible to declare a Charge in a turn in which it Advanced.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'BATTLELINE', 'GREAT DEVOURER', 'ENDLESS MULTITUDE', 'HORMAGAUNTS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  gargoyles: {
    id: 'gargoyles', name: 'Gargoyles', category: 'battleline',
    powerRating: 3, points: 85,
    M: '12"', T: 3, Sv: '6+', W: 1, Ld: '8+', OC: 2,
    models: 10, minModels: 10, maxModels: 20,
    weapons: [
      { name: 'Fleshborer', type: 'ranged', range: '18"', A: 1, BS: '4+', S: 5, AP: 0, D: 1, keywords: ['ASSAULT'] },
      { name: 'Blinding Venom', type: 'melee', A: 1, WS: '4+', S: 3, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Winged Swarm', phase: 'shooting', description: 'In your Shooting phase, after this unit has shot, if it is not within Engagement Range of any enemy units, it can make a Normal move of up to 6".' },
    ],
    isLeader: false,
    eligibleLeaders: ['wingedTyranidPrime'],
    keywords: ['INFANTRY', 'BATTLELINE', 'FLY', 'GREAT DEVOURER', 'ENDLESS MULTITUDE', 'VANGUARD INVADER', 'GARGOYLES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tyranidWarriorsRanged: {
    id: 'tyranidWarriorsRanged', name: 'Tyranid Warriors', category: 'battleline',
    nameDetail: '(Ranged Bio-weapons)',
    powerRating: 5, points: 65,
    M: '6"', T: 5, Sv: '4+', W: 3, Ld: '7+', OC: 2,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Devourer', type: 'ranged', range: '18"', A: 5, BS: '4+', S: 4, AP: 0, D: 1 },
      { name: 'Deathspitter', type: 'ranged', range: '24"', A: 3, BS: '4+', S: 5, AP: -1, D: 1 },
      { name: 'Spinefists', type: 'ranged', range: '12"', A: 2, BS: '4+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT', 'PISTOL', 'TWIN-LINKED'] },
      { name: 'Barbed Strangler', type: 'ranged', range: '36"', A: 'D6+1', BS: '4+', S: 6, AP: -1, D: 1, keywords: ['BLAST'] },
      { name: 'Venom Cannon', type: 'ranged', range: '36"', A: 'D3', BS: '4+', S: 9, AP: -2, D: 2, keywords: ['BLAST'] },
      { name: 'Tyranid Warrior Claws and Talons', type: 'melee', A: 5, WS: '3+', S: 5, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Synapse', phase: 'any', description: 'Friendly TYRANIDS units within 6" of this unit automatically pass Battleshock tests.' },
      { name: 'Adaptable Predators', phase: 'any', description: 'This unit is eligible to shoot and declare a Charge in a turn in which it Fell Back.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wingedTyranidPrime'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GREAT DEVOURER', 'SYNAPSE', 'TYRANID WARRIORS WITH RANGED BIO-WEAPONS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tyranidWarriorsMelee: {
    id: 'tyranidWarriorsMelee', name: 'Tyranid Warriors', category: 'battleline',
    nameDetail: '(Melee Bio-weapons)',
    powerRating: 5, points: 75,
    M: '6"', T: 5, Sv: '4+', W: 3, Ld: '7+', OC: 2,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Tyranid Warrior Claws and Talons', type: 'melee', A: 6, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Synapse', phase: 'any', description: 'Friendly TYRANIDS units within 6" of this unit automatically pass Battleshock tests.' },
      { name: 'Adaptive Instincts', phase: 'fight', description: 'At the start of the Fight phase, select one of the following to apply to this unit until the end of the phase — Aggression Imperative: re-roll Hit rolls of 1; or Bioregeneration: re-roll saving throws of 1.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wingedTyranidPrime'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GREAT DEVOURER', 'SYNAPSE', 'TYRANID WARRIORS WITH MELEE BIO-WEAPONS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── INFANTRY ────────────────────────────────────────────────────────
  tyrantGuard: {
    id: 'tyrantGuard', name: 'Tyrant Guard', category: 'infantry',
    powerRating: 5, points: 80,
    M: '6"', T: 8, Sv: '3+', W: 4, Ld: '8+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Scything talons and rending claws', type: 'melee', A: 5, WS: '3+', S: 5, AP: -1, D: 1 },
      { name: 'Bone cleaver, lash whip and rending claws', type: 'melee', A: 3, WS: '3+', S: 5, AP: -1, D: 2 },
      { name: 'Crushing claws and rending claws', type: 'melee', A: 2, WS: '4+', S: 8, AP: -2, D: 2, keywords: ['TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Guardian Organism', phase: 'any', description: 'While a CHARACTER model is leading this unit, that CHARACTER has the Feel No Pain 5+ ability.' },
    ],
    isLeader: false,
    eligibleLeaders: ['swarmlord', 'hiveTyrant', 'neurotyrant'],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'TYRANT GUARD', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  hiveGuard: {
    id: 'hiveGuard', name: 'Hive Guard', category: 'infantry',
    powerRating: 5, points: 90,
    M: '6"', T: 7, Sv: '3+', W: 4, Ld: '8+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Impaler Cannon', type: 'ranged', range: '36"', A: 4, BS: '4+', S: 5, AP: -1, D: 1, keywords: ['HEAVY', 'INDIRECT FIRE'] },
      { name: 'Shockcannon', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 7, AP: -1, D: 3, keywords: ['ANTI-VEHICLE 2+'] },
      { name: 'Chitinous claws and teeth', type: 'melee', A: 3, WS: '4+', S: 5, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Defensive Stance', phase: 'shooting', description: 'Each time this unit makes ranged attacks using the Fire Overwatch Stratagem, a Hit roll of unmodified 5+ scores a Critical Hit. If this unit is within range of an objective marker, a Hit roll of unmodified 4+ scores a Critical Hit instead.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'SYNAPSE', 'HIVE GUARD', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  genestealers: {
    id: 'genestealers', name: 'Genestealers', category: 'infantry',
    powerRating: 5, points: 75,
    M: '8"', T: 4, Sv: '5+', W: 2, Ld: '7+', OC: 1, InvSv: '5+',
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Genestealer Claws and Talons', type: 'melee', A: 4, WS: '2+', S: 4, AP: -2, D: 1, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Scouts 8"', phase: 'movement', description: 'Before the first battle round begins, this unit can make a Normal move of up to 8".' },
      { name: 'Vanguard Predator', phase: 'any', description: 'Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target is within range of one or more objective markers, re-roll a Wound roll of 1 as well.' },
    ],
    isLeader: false,
    eligibleLeaders: ['broodlord'],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'VANGUARD INVADER', 'GENESTEALERS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  vonRyansLeapers: {
    id: 'vonRyansLeapers', name: "Von Ryan's Leapers", category: 'infantry',
    powerRating: 4, points: 70,
    M: '10"', T: 5, Sv: '4+', W: 3, Ld: '8+', OC: 1, InvSv: '6+',
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: "Leaper's Talons", type: 'melee', A: 6, WS: '3+', S: 5, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Pouncing Leap', phase: 'fight', description: 'You can target this unit with the Heroic Intervention Stratagem for 0CP, and can do so even if you have already used that Stratagem on a different unit this phase.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'VANGUARD INVADER', "VON RYAN'S LEAPERS", 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  neurogaunts: {
    id: 'neurogaunts', name: 'Neurogaunts', category: 'infantry',
    powerRating: 2, points: 45,
    M: '6"', T: 3, Sv: '6+', W: 1, Ld: '8+', OC: 1,
    models: 11, minModels: 11, maxModels: 22,
    weapons: [
      { name: 'Chitinous claws and teeth', type: 'melee', A: 1, WS: '4+', S: 3, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Neurocytes', phase: 'any', description: 'While this unit is within Synapse Range of a friendly TYRANIDS unit (excluding NEUROGAUNT units), it has the SYNAPSE keyword.' },
    ],
    isLeader: false,
    eligibleLeaders: ['neurotyrant'],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'ENDLESS MULTITUDE', 'NEUROGAUNTS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  lictors: {
    id: 'lictors', name: 'Lictor', category: 'infantry',
    powerRating: 4, points: 60,
    M: '8"', T: 6, Sv: '4+', W: 6, Ld: '7+', OC: 1,
    models: 1, minModels: 1, maxModels: 1,
    weapons: [
      { name: 'Lictor Claws and Talons', type: 'melee', A: 6, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['PRECISION'] },
    ],
    abilities: [
      { name: 'Feeder Tendrils', phase: 'fight', description: 'Each time this model destroys an enemy CHARACTER model, you gain 1CP.' },
      { name: 'Pheromone Trail', phase: 'movement', description: 'Once per battle round, you can target this model with the Rapid Ingress Stratagem for 0CP.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'VANGUARD INVADER', 'LICTOR', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  zoanthropes: {
    id: 'zoanthropes', name: 'Zoanthropes', category: 'infantry',
    powerRating: 5, points: 100,
    M: '5"', T: 5, Sv: '5+', W: 3, Ld: '7+', OC: 1, InvSv: '4+',
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Witchfire Blast', type: 'ranged', range: '24"', A: 'D3', BS: '3+', S: 7, AP: -2, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Focused Witchfire', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['LETHAL HITS', 'PSYCHIC'] },
      { name: 'Chitinous claws and teeth', type: 'melee', A: 2, WS: '5+', S: 3, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Synapse', phase: 'any', description: 'Friendly TYRANIDS units within 6" of this unit automatically pass Battleshock tests.' },
      { name: 'Spirit Leech', phase: 'any', description: 'Aura, Psychic: While an enemy unit is within 6" of this unit, if this unit contains a Neurothrope, each time that enemy unit fails a Battle-shock test, it suffers D3 mortal wounds and one model in this unit regains up to D3 lost wounds.' },
      { name: 'Warp Field', phase: 'any', description: 'Aura, Psychic: While a friendly TYRANIDS unit is within 6" of this unit, models in that unit have a 6+ invulnerable save.' },
    ],
    isLeader: false,
    eligibleLeaders: ['neurotyrant'],
    keywords: ['INFANTRY', 'PSYKER', 'FLY', 'GREAT DEVOURER', 'SYNAPSE', 'ZOANTHROPES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  venomthropes: {
    id: 'venomthropes', name: 'Venomthropes', category: 'infantry',
    powerRating: 3, points: 70,
    M: '6"', T: 5, Sv: '4+', W: 3, Ld: '8+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Toxic Lashes', type: 'melee', A: 5, WS: '3+', S: 3, AP: 0, D: 1, keywords: ['ANTI-INFANTRY 2+'] },
    ],
    abilities: [
      { name: 'Foul Spores', phase: 'any', description: 'Aura: While a friendly TYRANIDS unit is within 6" of this unit, that unit has the Benefit of Cover ability against ranged attacks. While a friendly TYRANIDS unit (excluding MONSTERS) is within 6" of this unit, that unit also has the Stealth ability.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'FLY', 'GREAT DEVOURER', 'VENOMTHROPES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  raveners: {
    id: 'raveners', name: 'Raveners', category: 'infantry',
    powerRating: 4, points: 125,
    M: '10"', T: 5, Sv: '4+', W: 3, Ld: '8+', OC: 1,
    models: 5, minModels: 5, maxModels: 5,
    weapons: [
      { name: 'Ravener Claws and Talons', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 2, keywords: ['TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Death From Below', phase: 'movement', description: "At the end of your opponent's turn, if this unit is not within Engagement Range of any enemy units, remove it from the battlefield and place it into Strategic Reserves." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'VANGUARD INVADER', 'BURROWERS', 'RAVENERS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  ripperSwarms: {
    id: 'ripperSwarms', name: 'Ripper Swarms', category: 'infantry',
    powerRating: 2, points: 50,
    M: '6"', T: 2, Sv: '6+', W: 4, Ld: '8+', OC: 0,
    models: 3, minModels: 1, maxModels: 3,
    weapons: [
      { name: 'Spinemaws', type: 'ranged', range: '6"', A: 4, BS: '5+', S: 3, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Chitinous claws and teeth', type: 'melee', A: 6, WS: '5+', S: 2, AP: 0, D: 1, keywords: ['SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'Chitinous Horrors', phase: 'any', description: 'Aura: While an enemy unit is within Engagement Range of this unit, halve the Objective Control characteristic of models in that enemy unit (rounding up).' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['SWARM', 'GREAT DEVOURER', 'HARVESTER', 'RIPPER SWARMS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  pyrovores: {
    id: 'pyrovores', name: 'Pyrovores', category: 'infantry',
    powerRating: 3, points: 40,
    M: '5"', T: 6, Sv: '3+', W: 5, Ld: '8+', OC: 1,
    models: 1, minModels: 1, maxModels: 3,
    weapons: [
      { name: 'Flamespurt', type: 'ranged', range: '12"', A: 'D6+1', BS: 'N/A', S: 6, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT', 'TWIN-LINKED'] },
      { name: 'Chitin-barbed limbs', type: 'melee', A: 2, WS: '4+', S: 5, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Burning Spray', phase: 'shooting', description: 'After this unit has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, that enemy unit cannot have the Benefit of Cover.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'HARVESTER', 'PYROVORES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  biovores: {
    id: 'biovores', name: 'Biovores', category: 'infantry',
    powerRating: 4, points: 50,
    M: '5"', T: 6, Sv: '3+', W: 5, Ld: '8+', OC: 1,
    models: 1, minModels: 1, maxModels: 3,
    weapons: [
      { name: 'Spore Mine Launcher', type: 'ranged', range: '48"', A: 'D3', BS: '4+', S: 6, AP: -1, D: 2, keywords: ['BLAST', 'DEVASTATING WOUNDS', 'HEAVY', 'INDIRECT FIRE'] },
      { name: 'Chitin-barbed limbs', type: 'melee', A: 2, WS: '4+', S: 5, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Seed Spore Mines', phase: 'shooting', description: 'Once per turn, at the end of your Shooting phase, if this unit did not shoot this phase, set up one Spore Mines unit consisting of D3 models within 48" of this unit and more than 9" from all enemy units.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'BIOVORES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  barbgaunts: {
    id: 'barbgaunts', name: 'Barbgaunts', category: 'infantry',
    powerRating: 3, points: 55,
    M: '6"', T: 4, Sv: '4+', W: 2, Ld: '8+', OC: 1,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Barblauncher', type: 'ranged', range: '24"', A: 'D6', BS: '4+', S: 5, AP: 0, D: 1, keywords: ['BLAST', 'HEAVY', 'LETHAL HITS'] },
      { name: 'Chitinous claws and teeth', type: 'melee', A: 1, WS: '4+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Disruption Bombardment', phase: 'shooting', description: 'After this unit shoots, select one enemy INFANTRY unit that was hit by one or more of those attacks. Until the end of your opponent\'s next turn, subtract 2 from that unit\'s Move characteristic and subtract 2 from Advance and Charge rolls made for that unit.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GREAT DEVOURER', 'BARBGAUNTS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── MONSTERS ────────────────────────────────────────────────────────
  carnifex: {
    id: 'carnifex', name: 'Carnifexes', category: 'monster',
    powerRating: 8, points: 90,
    M: '8"', T: 9, Sv: '2+', W: 8, Ld: '8+', OC: 3,
    models: 1, minModels: 1, maxModels: 2,
    weapons: [
      { name: 'Carnifex crushing claws', type: 'melee', A: 4, WS: '4+', S: 12, AP: -3, D: 'D6+1' },
      { name: 'Carnifex scything talons', type: 'melee', A: 6, WS: '4+', S: 9, AP: -2, D: 3 },
      { name: 'Carnifex extra scything talons', type: 'melee', A: 2, WS: '4+', S: 9, AP: -2, D: 3, keywords: ['EXTRA ATTACKS'] },
      { name: 'Chitinous claws and teeth', type: 'melee', A: 4, WS: '4+', S: 6, AP: 0, D: 1 },
      { name: 'Heavy Venom Cannon', type: 'ranged', range: '36"', A: 'D3', BS: '4+', S: 9, AP: -2, D: 3, keywords: ['BLAST'] },
      { name: 'Stranglethorn Cannon', type: 'ranged', range: '36"', A: 'D6+1', BS: '4+', S: 7, AP: -1, D: 2, keywords: ['BLAST'] },
      { name: 'Bio-plasma', type: 'ranged', range: '12"', A: 'D3', BS: '4+', S: 7, AP: -2, D: 1, keywords: ['ASSAULT', 'BLAST'] },
      { name: 'Deathspitters with slimer maggots', type: 'ranged', range: '24"', A: 6, BS: '4+', S: 7, AP: -2, D: 1 },
      { name: 'Devourers with brainleech worms', type: 'ranged', range: '18"', A: 12, BS: '4+', S: 6, AP: 0, D: 1 },
      { name: 'Spine banks', type: 'ranged', range: '6"', A: 5, BS: '4+', S: 5, AP: 0, D: 1, keywords: ['ASSAULT'] },
    ],
    abilities: [
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Blistering Assault', phase: 'shooting', description: 'After this model has been hit by one or more ranged attacks, if it has not been destroyed, it can make a Normal move of up to 2D6+2".' },
    ],
    isLeader: false,
    eligibleLeaders: ['oldOneEye'],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'CARNIFEXES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  screamerKiller: {
    id: 'screamerKiller', name: 'Screamer-Killer', category: 'monster',
    powerRating: 7, points: 125,
    M: '8"', T: 9, Sv: '2+', W: 10, Ld: '8+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Bio-plasmic scream', type: 'ranged', range: '18"', A: 'D6+3', BS: '4+', S: 8, AP: -2, D: 1, keywords: ['ASSAULT', 'BLAST'] },
      { name: 'Screamer-Killer talons', type: 'melee', A: 10, WS: '3+', S: 10, AP: -2, D: 3 },
    ],
    abilities: [
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Death Scream', phase: 'shooting', description: 'After this unit has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test, subtracting 1 from that test.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'SCREAMER-KILLER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  exocrine: {
    id: 'exocrine', name: 'Exocrine', category: 'monster',
    powerRating: 9, points: 140,
    M: '8"', T: 10, Sv: '3+', W: 14, Ld: '8+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Bio-plasmic Cannon', type: 'ranged', range: '36"', A: 'D6+3', BS: '3+', S: 9, AP: -3, D: 3, keywords: ['BLAST', 'HEAVY'] },
      { name: 'Powerful Limbs', type: 'melee', A: 3, WS: '3+', S: 7, AP: 0, D: 2 },
    ],
    abilities: [
      { name: 'Symbiotic Targeting', phase: 'shooting', description: 'After this model shoots, select one enemy unit it hit. Until the end of the phase, each time a friendly TYRANIDS model makes an attack against that unit, re-roll a Hit roll of 1.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from the Hit rolls of this model's attacks." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'EXOCRINE', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  nornEmissary: {
    id: 'nornEmissary', name: 'Norn Emissary', category: 'monster',
    powerRating: 14, points: 260,
    M: '10"', T: 11, Sv: '2+', W: 16, Ld: '7+', OC: 5, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Psychic Tendril — Neuroparasite', type: 'ranged', range: '18"', A: 2, BS: '2+', S: 8, AP: -2, D: 'D3', keywords: ['PRECISION', 'PSYCHIC'] },
      { name: 'Psychic Tendril — Neuroblast', type: 'ranged', range: '18"', A: '2D6', BS: '2+', S: 6, AP: -2, D: 1, keywords: ['BLAST', 'PSYCHIC'] },
      { name: 'Psychic Tendril — Neurolance', type: 'ranged', range: '18"', A: 2, BS: '2+', S: 12, AP: -3, D: 'D6', keywords: ['MELTA 2', 'PSYCHIC'] },
      { name: 'Monstrous Scything Talons', type: 'melee', A: 6, WS: '2+', S: 9, AP: -2, D: 3 },
      { name: 'Monstrous Rending Claws', type: 'melee', A: 4, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['EXTRA ATTACKS'] },
    ],
    abilities: [
      { name: 'Singular Purpose', phase: 'command', description: 'At the start of the battle, select either one enemy unit — re-roll Hit and Wound rolls against it for the rest of the battle — or one objective marker — this model has OC 15 and Feel No Pain 5+ while within range of it.' },
      { name: 'Unnatural Resilience', phase: 'any', description: 'This model has the Feel No Pain 4+ ability against mortal wounds.' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'NORN EMISSARY', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  psychophage: {
    id: 'psychophage', name: 'Psychophage', category: 'monster',
    powerRating: 7, points: 110,
    M: '12"', T: 9, Sv: '3+', W: 10, Ld: '8+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Psychoclastic Torrent', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 6, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Talons and Betentacled Maw', type: 'melee', A: 6, WS: '3+', S: 6, AP: -2, D: 2, keywords: ['ANTI-PSYKER 4+', 'DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
      { name: 'Bio-stimulus', phase: 'shooting', description: 'After this model shoots, select one enemy unit hit. Until the end of the turn, friendly TYRANIDS units making melee attacks against that unit gain +1 to their Armour Penetration characteristic.' },
      { name: 'Feeding Frenzy', phase: 'any', description: 'Each time this model makes an attack, if the target unit has lost one or more models, add 1 to the Hit roll. If the target unit has lost half or more of its Starting Strength, add 1 to the Wound roll as well.' },
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers 1 mortal wound.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'HARVESTER', 'SMOKE', 'PSYCHOPHAGE', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tyrannofex: {
    id: 'tyrannofex', name: 'Tyrannofex', category: 'monster',
    powerRating: 11, points: 200,
    M: '9"', T: 12, Sv: '2+', W: 16, Ld: '8+', OC: 5,
    models: 1,
    weapons: [
      { name: 'Rupture Cannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 18, AP: -4, D: 'D6+6', keywords: ['HEAVY'] },
      { name: 'Fleshborer Hive', type: 'ranged', range: '24"', A: 20, BS: '3+', S: 5, AP: 0, D: 1, keywords: ['HEAVY', 'SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Acid Spray', type: 'ranged', range: '18"', A: 'D6+6', BS: 'N/A', S: 6, AP: -2, D: 2, keywords: ['TORRENT'] },
      { name: 'Stinger Salvoes', type: 'ranged', range: '24"', A: 8, BS: '3+', S: 5, AP: 0, D: 1 },
      { name: 'Powerful Limbs', type: 'melee', A: 4, WS: '3+', S: 8, AP: 0, D: 2 },
    ],
    abilities: [
      { name: 'Resilient Organism', phase: 'any', description: 'Once per battle, when an attack is allocated to this model, you can change the Damage characteristic of that attack to 0.' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from the Hit rolls of this model's attacks." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'TYRANNOFEX', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  trygon: {
    id: 'trygon', name: 'Trygon', category: 'monster',
    powerRating: 9, points: 140,
    M: '10"', T: 10, Sv: '3+', W: 14, Ld: '8+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Bio-electric Pulse', type: 'ranged', range: '12"', A: 6, BS: '3+', S: 5, AP: 0, D: 1, keywords: ['SUSTAINED HITS 2'] },
      { name: 'Trygon Scything Talons', type: 'melee', A: 12, WS: '3+', S: 9, AP: -2, D: 3 },
    ],
    abilities: [
      { name: 'Subterranean Tunnels', phase: 'movement', description: 'When this unit is set up on the battlefield using the Deep Strike ability, it can be set up more than 6" (rather than more than 9") horizontally away from all enemy units. If it is, it cannot declare a Charge this turn.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'VANGUARD INVADER', 'BURROWER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  toxicrene: {
    id: 'toxicrene', name: 'Toxicrene', category: 'monster',
    powerRating: 10, points: 150,
    M: '8"', T: 11, Sv: '3+', W: 14, Ld: '8+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Massive Toxic Lashes', type: 'ranged', range: '9"', A: '2D6', BS: '3+', S: 6, AP: -1, D: 2, keywords: ['ANTI-INFANTRY 2+'] },
      { name: 'Massive Toxic Lashes', type: 'melee', A: 12, WS: '3+', S: 6, AP: -1, D: 2, keywords: ['ANTI-INFANTRY 2+'] },
    ],
    abilities: [
      { name: 'Grasping Tendrils', phase: 'fight', description: 'Each time an enemy unit (excluding TITANIC units) within Engagement Range of this model is selected to Fall Back, roll one D6: on a 3+, that unit must Remain Stationary instead.' },
      { name: 'Hypertoxic Miasma', phase: 'movement', description: 'Aura: At the end of your Movement phase, roll one D6 for each enemy unit within 6" of this model: on a 2-3, that unit suffers 1 mortal wound; on a 4-5, that unit suffers D3 mortal wounds; on a 6, that unit suffers D6 mortal wounds.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'TOXICRENE', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  maleceptor: {
    id: 'maleceptor', name: 'Maleceptor', category: 'monster',
    powerRating: 10, points: 170,
    M: '8"', T: 11, Sv: '3+', W: 14, Ld: '7+', OC: 4, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Psychic Overload', type: 'ranged', range: '18"', A: 'D6+3', BS: '3+', S: 10, AP: -2, D: 3, keywords: ['BLAST', 'PSYCHIC'] },
      { name: 'Massive Scything Talons — strike', type: 'melee', A: 3, WS: '3+', S: 9, AP: -2, D: 'D6+1' },
      { name: 'Massive Scything Talons — sweep', type: 'melee', A: 6, WS: '3+', S: 7, AP: -1, D: 2 },
    ],
    abilities: [
      { name: 'Encephalic Diffusion', phase: 'any', description: 'Aura, Psychic: While an enemy unit is within 6" of this model, each time a model in that unit makes an attack, subtract 1 from the Hit roll.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'PSYKER', 'GREAT DEVOURER', 'SYNAPSE', 'MALECEPTOR', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  haruspex: {
    id: 'haruspex', name: 'Haruspex', category: 'monster',
    powerRating: 9, points: 125,
    M: '8"', T: 11, Sv: '3+', W: 14, Ld: '8+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Grasping Tongue', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 6, AP: -2, D: 'D6+1', keywords: ['PRECISION'] },
      { name: 'Ravenous Maw', type: 'melee', A: 14, WS: '3+', S: 7, AP: -1, D: 2 },
      { name: 'Shovelling Claws', type: 'melee', A: 4, WS: '3+', S: 14, AP: -2, D: 'D6+1', keywords: ['EXTRA ATTACKS'] },
    ],
    abilities: [
      { name: 'Grisly Spectacle', phase: 'fight', description: 'Each time this model is selected to fight, after resolving its attacks, if one or more enemy units were destroyed by those attacks, each enemy unit within 6" of this model must take a Battle-shock test.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'HARVESTER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  mawloc: {
    id: 'mawloc', name: 'Mawloc', category: 'monster',
    powerRating: 9, points: 135,
    M: '10"', T: 10, Sv: '3+', W: 14, Ld: '8+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Distensible Jaw', type: 'melee', A: 1, WS: '3+', S: 5, AP: 0, D: 3, keywords: ['DEVASTATING WOUNDS', 'EXTRA ATTACKS'] },
      { name: 'Mawloc Scything Talons', type: 'melee', A: 16, WS: '3+', S: 8, AP: -2, D: 1 },
    ],
    abilities: [
      { name: 'Terror From The Deep', phase: 'movement', description: 'When this unit is set up on the battlefield using the Deep Strike ability, roll one D6 for each enemy unit within 12" of it: on a 2-4, that unit suffers D3 mortal wounds; on a 5+, that unit suffers 3 mortal wounds and must take a Battle-shock test.' },
      { name: 'Damaged (1-5 wounds remaining)', phase: 'any', description: "While this model has 1-5 wounds remaining, subtract 1 from this model's Hit rolls." },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'GREAT DEVOURER', 'VANGUARD INVADER', 'BURROWER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tyrannocyte: {
    id: 'tyrannocyte', name: 'Tyrannocyte', category: 'monster',
    powerRating: 7, points: 105,
    M: '8"', T: 9, Sv: '3+', W: 10, Ld: '8+', OC: 2,
    models: 1,
    weapons: [
      { name: 'Tyrannocyte bio-weapons', type: 'ranged', range: '24"', A: 5, BS: '4+', S: 5, AP: -1, D: 2 },
      { name: 'Flensing Whips', type: 'melee', A: 6, WS: '4+', S: 7, AP: -1, D: 2 },
    ],
    abilities: [
      { name: 'Aerial Seeding', phase: 'movement', description: 'This model must start the battle in Reserves. When it arrives from Reserves, it can be set up anywhere on the battlefield more than 9" from all enemy units. Any units embarked within this model must immediately disembark.' },
      { name: 'Transport (20)', phase: 'any', description: 'This model can transport up to 20 TYRANIDS INFANTRY models, or 1 TYRANIDS MONSTER with 12 or fewer wounds. Each INFANTRY model with Wounds 2+ occupies 3 transport spaces.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 4+, each unit within 6" suffers D3 mortal wounds.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'FLY', 'TRANSPORT', 'DEDICATED TRANSPORT', 'GREAT DEVOURER', 'VANGUARD INVADER', 'TYRANNOCYTE', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },
}

export const tyranidUnitList = Object.values(tyranidUnits)

export const tyranidUnitsByCategory = {
  epicHero:   tyranidUnitList.filter(u => u.category === 'epicHero'),
  character:  tyranidUnitList.filter(u => u.category === 'character'),
  battleline: tyranidUnitList.filter(u => u.category === 'battleline'),
  infantry:   tyranidUnitList.filter(u => u.category === 'infantry'),
  monster:    tyranidUnitList.filter(u => u.category === 'monster'),
}
