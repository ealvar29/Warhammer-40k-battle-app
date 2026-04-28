export const swUnits = {
  // ── CHARACTERS ───────────────────────────────────────────────────
  ragnar: {
    id: 'ragnar', name: 'Ragnar Blackmane', category: 'epicHero',
    powerRating: 5, points: 100,
    M: '7"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Frostfang', type: 'melee', A: 8, WS: '2+', S: 6, AP: -3, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Fury of Fenris', phase: 'fight', description: 'Each time this model is selected to fight, it fights first if it was charged this turn.' },
      { name: 'Warrior Born', phase: 'fight', description: 'Each time this model makes a melee attack, re-roll a Wound roll of 1.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'LEGENDARY', 'WOLF LORD', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
    lore: 'The youngest Wolf Lord in the history of the Space Wolves.',
  },

  runePriest: {
    id: 'runePriest', name: 'Rune Priest', category: 'character',
    powerRating: 4, points: 75,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Force Stave', type: 'melee', A: 3, WS: '3+', S: 6, AP: -1, D: 2, keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Storm Caller', phase: 'command', description: 'Once per battle, in your Command phase, select one friendly ADEPTUS ASTARTES unit within 18". Until the start of your next Command phase, that unit has the Benefit of Cover.' },
      { name: "Tempest's Wrath", phase: 'shooting', description: 'Once per battle. Select one enemy unit within 18". Roll one D6: on a 2+, that unit suffers D3 mortal wounds.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuard', 'greyHunters'],
    keywords: ['INFANTRY', 'CHARACTER', 'PSYKER', 'RUNE PRIEST', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  wolfGuardPackLeader: {
    id: 'wolfGuardPackLeader', name: 'Wolf Guard Pack Leader', category: 'character',
    powerRating: 3, points: 55,
    M: '6"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Power Sword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -2, D: 1 },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Saga of Majesty', phase: 'command', description: 'While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters', 'wolfGuard'],
    keywords: ['INFANTRY', 'CHARACTER', 'WOLF GUARD', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  ironPriest: {
    id: 'ironPriest', name: 'Iron Priest', category: 'character',
    powerRating: 4, points: 65,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Servo-arm', type: 'melee', A: 2, WS: '4+', S: 8, AP: -2, D: 3 },
      { name: 'Tempest Hammer', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Blessing of the Omnissiah', phase: 'command', description: 'In your Command phase, this model can repair one friendly VEHICLE model within 3". Restore up to D3 lost wounds to that model.' },
    ],
    isLeader: true,
    leadsUnits: ['thunderwolfCavalry'],
    keywords: ['INFANTRY', 'CHARACTER', 'IRON PRIEST', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  loganGrimnar: {
    id: 'loganGrimnar', name: 'Logan Grimnar', category: 'epicHero',
    powerRating: 9, points: 110,
    M: '6"', T: 4, Sv: '2+', W: 7, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Morkai', type: 'melee', A: 6, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Morkai', type: 'ranged', range: '24"', A: 3, BS: '2+', S: 6, AP: -1, D: 2, keywords: ['ASSAULT', 'TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'High King of Fenris', phase: 'command', description: 'Friendly SPACE WOLVES CORE units within 6" of this model can re-roll Hit rolls.' },
      { name: 'Saga of the Bear', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 4+, that wound is ignored.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuard', 'wolfGuardTerminators'],
    keywords: ['INFANTRY', 'CHARACTER', 'LEGENDARY', 'GREAT WOLF', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  wolfGuardBattleLeader: {
    id: 'wolfGuardBattleLeader', name: 'Wolf Guard Battle Leader', category: 'character',
    powerRating: 4, points: 60,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Power Sword', type: 'melee', A: 4, WS: '2+', S: 4, AP: -2, D: 1 },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Inspiring Presence', phase: 'command', description: 'While this model is leading a unit, friendly ADEPTUS ASTARTES units within 6" of its unit do not lose the Objective Secured ability while below Half-strength.' },
      { name: 'Target Priority', phase: 'shooting', description: 'In your Shooting phase, this model can re-roll one Hit roll and one Wound roll for attacks made by its unit.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuard', 'bloodClaws', 'greyHunters', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'WOLF GUARD', 'WOLF GUARD BATTLE LEADER', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  wolfPriest: {
    id: 'wolfPriest', name: 'Wolf Priest', category: 'character',
    powerRating: 4, points: 70,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Crozius Arcanum', type: 'melee', A: 4, WS: '2+', S: 6, AP: -1, D: 2 },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Litany of Hate', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, re-roll a Hit roll of 1.' },
      { name: "Warrior's Blessing", phase: 'command', description: 'In your Command phase, select one friendly SPACE WOLVES unit within 9". Until the start of your next Command phase, models in that unit have the Feel No Pain 6+ ability.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'wolfGuard', 'wulfen'],
    keywords: ['INFANTRY', 'CHARACTER', 'WOLF PRIEST', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  bjorn: {
    id: 'bjorn', name: 'Bjorn the Fell-Handed', category: 'epicHero',
    powerRating: 10, points: 160,
    M: '6"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Trueclaw', type: 'melee', A: 5, WS: '2+', S: 14, AP: -3, D: 'D6+1' },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '2+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Heavy Flamer', type: 'ranged', range: '12"', A: 'D6', BS: '2+', S: 5, AP: -1, D: 1, keywords: ['TORRENT', 'IGNORES COVER'] },
    ],
    abilities: [
      { name: 'Ancient Beyond Reckoning', phase: 'command', description: 'Once per battle, in your Command phase, this model can regain up to D3 lost wounds.' },
      { name: 'Venerable', phase: 'any', description: 'Each time an attack is allocated to this model, subtract 1 from that attack\'s Damage characteristic (to a minimum of 1).' },
    ],
    isLeader: true,
    leadsUnits: [],
    keywords: ['VEHICLE', 'CHARACTER', 'WALKER', 'LEGENDARY', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  njal: {
    id: 'njal', name: 'Njal Stormcaller', category: 'epicHero',
    powerRating: 7, points: 85,
    M: '6"', T: 4, Sv: '2+', W: 6, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Runic Stave', type: 'melee', A: 4, WS: '3+', S: 6, AP: -1, D: 2, keywords: ['PSYCHIC'] },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Stormcaller', phase: 'command', description: 'At the start of your Command phase, roll one D6 for each enemy unit within 12": on a 4+ that unit suffers D3 mortal wounds.' },
      { name: 'Lord of Tempests', phase: 'any', description: 'Each time a friendly SPACE WOLVES unit within 12" of this model would fail a Battleshock test, it automatically passes instead.' },
      { name: 'Living Tempest', phase: 'shooting', description: 'Once per battle, select one enemy unit within 18". Until the start of your next Command phase, that unit suffers -1 to all Hit rolls and cannot fire Overwatch.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuard', 'greyHunters', 'wolfGuardTerminators'],
    keywords: ['INFANTRY', 'CHARACTER', 'PSYKER', 'EPIC HERO', 'RUNE PRIEST', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  murderfang: {
    id: 'murderfang', name: 'Murderfang', category: 'epicHero',
    powerRating: 8, points: 130,
    M: '8"', T: 9, Sv: '3+', W: 10, Ld: '7+', OC: 3, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'The Murderclaw', type: 'melee', A: 6, WS: '2+', S: 14, AP: -3, D: 'D6+1', keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Blizzard Shield', type: 'melee', A: 3, WS: '2+', S: 8, AP: -1, D: 2 },
    ],
    abilities: [
      { name: 'Unstoppable Slaughter', phase: 'fight', description: 'Each time this model fights, it makes 2 additional attacks with The Murderclaw if it charged this turn.' },
      { name: 'Murder Frenzy', phase: 'fight', description: 'Each time an enemy model is destroyed by an attack made by this model, this model regains 1 lost wound (up to its starting wounds).' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['VEHICLE', 'CHARACTER', 'WALKER', 'EPIC HERO', 'DREADNOUGHT', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  arjacRockfist: {
    id: 'arjacRockfist', name: 'Arjac Rockfist', category: 'epicHero',
    powerRating: 7, points: 105,
    M: '5"', T: 4, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Foehammer', type: 'melee', A: 5, WS: '2+', S: 10, AP: -3, D: 3, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Foehammer (thrown)', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 10, AP: -3, D: 3, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: "The Grimnir's Champion", phase: 'fight', description: 'While this model is leading a unit, models in that unit have the Fights First ability.' },
      { name: 'Shield of the Grimnir', phase: 'any', description: 'Each time a ranged attack targets this model\'s unit, add 1 to the Armour Save roll made for models in this unit.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuardTerminators'],
    keywords: ['INFANTRY', 'CHARACTER', 'TERMINATOR', 'EPIC HERO', 'WOLF GUARD', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  ulrik: {
    id: 'ulrik', name: 'Ulrik the Slayer', category: 'epicHero',
    powerRating: 5, points: 70,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Crozius Arcanum', type: 'melee', A: 5, WS: '2+', S: 6, AP: -1, D: 2 },
      { name: 'Plasma Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 7, AP: -2, D: 1 },
    ],
    abilities: [
      { name: "Wolf's Eye", phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, on an unmodified hit roll of 6, that attack scores 1 additional hit.' },
      { name: 'Sagas of the Slayer', phase: 'command', description: 'In your Command phase, this model and its unit can make a free Advance move without affecting their ability to shoot or charge.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'wolfGuard', 'wulfen'],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'WOLF PRIEST', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  // ── BATTLELINE ────────────────────────────────────────────────────
  bloodClaws: {
    id: 'bloodClaws', name: 'Blood Claws', category: 'battleline',
    powerRating: 5, points: 135,
    M: '7"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 10, minModels: 10, maxModels: 20,
    weapons: [
      { name: 'Bolt Carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1 },
      { name: 'Astartes Chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Berserk Charge', phase: 'charge', description: 'Each time a model in this unit makes a melee attack on a turn it declared a Charge, re-roll a Hit roll of 1. If this unit charged a unit that contains 6+ models, re-roll all failed Hit rolls instead.' },
    ],
    isLeader: false,
    eligibleLeaders: ['ragnar', 'wolfGuardPackLeader', 'wolfLord', 'wolfGuardBattleLeader', 'wolfPriest'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'TACTICUS', 'BLOOD CLAWS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  greyHunters: {
    id: 'greyHunters', name: 'Grey Hunters', category: 'battleline',
    powerRating: 5, points: 165,
    M: '7"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 3,
    models: 10, minModels: 10, maxModels: 10,
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1 },
      { name: 'Bolt Carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Close Combat Weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Cunning Hunters', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack, if the target is an INFANTRY unit, that attack has the [LETHAL HITS] ability.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wolfGuardPackLeader', 'runePriest', 'wolfLord', 'wolfGuardBattleLeader'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'TACTICUS', 'GREY HUNTERS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  // ── OTHER INFANTRY ────────────────────────────────────────────────
  wolfGuard: {
    id: 'wolfGuard', name: 'Wolf Guard', category: 'infantry',
    powerRating: 4, points: 85,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '5+', OC: 1,
    models: 5, minModels: 5, maxModels: 10,
    legends: true,
    weapons: [
      { name: 'Combi-weapon', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1 },
      { name: 'Heirloom Weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Chosen Companions', phase: 'fight', description: 'While this unit contains 6+ models, add 1 to the Attacks characteristic of models in this unit.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wolfLord', 'wolfGuardPackLeader', 'loganGrimnar', 'runePriest', 'wolfPriest'],
    keywords: ['INFANTRY', 'WOLF GUARD', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  wolfGuardHeadtakers: {
    id: 'wolfGuardHeadtakers', name: 'Wolf Guard Headtakers', category: 'infantry',
    powerRating: 5, points: 85,
    M: '7"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Heavy Bolt Pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1 },
      { name: 'Master-crafted Power Weapon', type: 'melee', A: 3, WS: '2+', S: 5, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Headhunters', phase: 'fight', description: 'Each time a model in this unit makes a melee attack, if the target unit contains a CHARACTER, that attack has the [LETHAL HITS] ability.' },
      { name: 'Let Loose the Wolves', phase: 'charge', description: 'Each time this unit declares a Charge, you can re-roll the Charge roll.' },
      { name: 'Hunting Hounds', phase: 'fight', description: 'While this unit is within 6" of a friendly FENRISIAN WOLVES unit, add 1 to the Attacks characteristic of models in this unit.' },
    ],
    isLeader: false,
    eligibleLeaders: ['ragnar', 'wolfGuardBattleLeader'],
    keywords: ['INFANTRY', 'WOLF GUARD', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  wulfen: {
    id: 'wulfen', name: 'Wulfen', category: 'infantry',
    powerRating: 5, points: 85,
    M: '9"', T: 6, Sv: '4+', W: 2, Ld: '6+', OC: 0,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Wulfen Weapons', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Stormfrag Auto-launcher', type: 'ranged', range: '18"', A: 'D3', BS: '4+', S: 4, AP: 0, D: 1, keywords: ['BLAST'] },
    ],
    abilities: [
      { name: 'Savage Frenzy', phase: 'fight', description: 'Each time this unit fights, if it made a Charge move this turn, add 1 to the Attacks characteristic of models in this unit until the end of the phase.' },
      { name: 'Death Totem', phase: 'command', description: 'Friendly SPACE WOLVES units within 6" of this unit are eligible to declare a Charge in a turn they Advanced.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wolfPriest'],
    keywords: ['INFANTRY', 'WULFEN', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  wolfGuardTerminators: {
    id: 'wolfGuardTerminators', name: 'Wolf Guard Terminators', category: 'infantry',
    powerRating: 9, points: 170,
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Storm Bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Power Fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2 },
      { name: 'Master-crafted Power Weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Teleport Strike', phase: 'movement', description: 'During deployment, you can set up this unit in Reserves instead of placing it on the battlefield. If you do, in the Reinforcements step of one of your Movement phases, you can set it up anywhere on the battlefield that is more than 9" from all enemy models.' },
      { name: 'Crux Terminatus', phase: 'any', description: 'Models in this unit have a 4+ invulnerable save.' },
      { name: 'Rugged Resilience', phase: 'any', description: 'Each time an attack is allocated to a model in this unit, subtract 1 from that attack\'s Damage characteristic (to a minimum of 1).' },
    ],
    isLeader: false,
    eligibleLeaders: ['loganGrimnar'],
    keywords: ['INFANTRY', 'TERMINATOR', 'WOLF GUARD', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  longFangs: {
    id: 'longFangs', name: 'Long Fangs', category: 'infantry',
    powerRating: 6, points: 130,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 6, minModels: 5, maxModels: 6,
    legends: true,
    weapons: [
      { name: 'Missile Launcher (Frag)', type: 'ranged', range: '48"', A: 'D3', BS: '4+', S: 4, AP: 0, D: 1, keywords: ['BLAST', 'HEAVY'] },
      { name: 'Missile Launcher (Krak)', type: 'ranged', range: '48"', A: 1, BS: '4+', S: 9, AP: -2, D: 'D6', keywords: ['HEAVY'] },
      { name: 'Lascannon', type: 'ranged', range: '48"', A: 1, BS: '4+', S: 12, AP: -3, D: 'D6+1', keywords: ['HEAVY', 'ANTI-VEHICLE 2+'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '4+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Close Combat Weapon', type: 'melee', A: 2, WS: '4+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Wisdom of the Ancients', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack with a Heavy weapon, ignore the penalty for the unit having moved this turn.' },
      { name: 'Covering Fire', phase: 'shooting', description: 'Once per battle, when an enemy unit targets a friendly ADEPTUS ASTARTES unit within 12", this unit can fire Overwatch before resolving those attacks.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wolfGuardPackLeader'],
    keywords: ['INFANTRY', 'LONG FANGS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  skyclaws: {
    id: 'skyclaws', name: 'Skyclaws', category: 'infantry',
    powerRating: 5, points: 95,
    M: '12"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5, minModels: 5, maxModels: 15,
    legends: true,
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1 },
      { name: 'Flamer', type: 'ranged', range: '12"', A: 'D6', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['TORRENT', 'IGNORES COVER'] },
      { name: 'Astartes Chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Headstrong', phase: 'charge', description: 'This unit can re-roll Charge rolls. Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, add 1 to that attack\'s Hit roll.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During deployment, you can set up this unit in Reserves instead of placing it on the battlefield. If you do, at the end of your opponent\'s turn, you can set it up anywhere on the battlefield that is more than 9" from all enemy models.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wolfGuardPackLeader'],
    keywords: ['INFANTRY', 'JUMP PACK', 'FLY', 'SKYCLAWS', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  // ── CAVALRY ───────────────────────────────────────────────────────
  thunderwolfCavalry: {
    id: 'thunderwolfCavalry', name: 'Thunderwolf Cavalry', category: 'cavalry',
    powerRating: 6, points: 115,
    M: '12"', T: 6, Sv: '3+', W: 4, Ld: '6+', OC: 2,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Wolf Guard Weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2 },
      { name: 'Teeth and Claws', type: 'melee', A: 3, WS: '4+', S: 5, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Thunderous Charge', phase: 'fight', description: 'Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, add 1 to that attack\'s Wound roll.' },
    ],
    isLeader: false,
    eligibleLeaders: ['wolfLordOnThunderwolf', 'ironPriest'],
    keywords: ['MOUNTED', 'CAVALRY', 'THUNDERWOLF CAVALRY', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },

  fenrisianWolves: {
    id: 'fenrisianWolves', name: 'Fenrisian Wolves', category: 'cavalry',
    powerRating: 2, points: 40,
    M: '10"', T: 4, Sv: '6+', W: 1, Ld: '8+', OC: 0,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Teeth and Claws', type: 'melee', A: 3, WS: '4+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Predatory Instinct', phase: 'charge', description: 'Each time this unit declares a Charge, you can re-roll the Charge roll. In addition, this unit is eligible to declare a Charge even if it Advanced this turn.' },
      { name: 'Hunting Hounds', phase: 'fight', description: 'While this unit is within 6" of a friendly WOLF GUARD HEADTAKERS unit, add 1 to the Attacks characteristic of models in this unit.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MOUNTED', 'BEAST', 'FENRISIAN WOLVES', 'ADEPTUS ASTARTES'],
    factionKeywords: ['SPACE WOLVES'],
  },
}

export const swUnitList = Object.values(swUnits)

export const swUnitsByCategory = {
  epicHero: swUnitList.filter(u => u.category === 'epicHero'),
  character: swUnitList.filter(u => u.category === 'character'),
  battleline: swUnitList.filter(u => u.category === 'battleline'),
  infantry: swUnitList.filter(u => u.category === 'infantry'),
  cavalry: swUnitList.filter(u => u.category === 'cavalry'),
}
