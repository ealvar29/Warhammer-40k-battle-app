// Dark Angels (Adeptus Astartes) — 10th Edition
// Stats sourced from Wahapedia, April 2026
// https://wahapedia.ru/wh40k10ed/factions/space-marines/ (Dark Angels datasheets)

export const daUnits = {

  // ── EPIC HEROES ────────────────────────────────────────────────────

  azrael: {
    id: 'azrael', name: 'Azrael', category: 'epicHero',
    points: 125,
    M: '6"', T: 4, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: "Lion's Wrath", type: 'ranged', range: '24"', A: 2, BS: '2+', S: 8, AP: -3, D: 2, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'] },
      { name: 'The Sword of Secrets', type: 'melee', A: 6, WS: '2+', S: 6, AP: -4, D: 2, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Supreme Grand Master', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.' },
      { name: 'Masterful Tactician', phase: 'command', description: 'At the start of your Command phase, if this model is on the battlefield, you gain 1CP.' },
      { name: 'The Lion Helm', phase: 'any', description: "Models in the bearer's unit have a 4+ invulnerable save. In addition, once per battle, in any phase, the bearer can summon a Watcher in the Dark. When it does, until the end of the phase, models in the bearer's unit have the Feel No Pain 4+ ability against mortal wounds." },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors', 'bladeguardVeterans', 'hellblasters', 'sternguardVeterans', 'tacticalSquad', 'innerCircleCompanions'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'DEATHWING', 'TACTICUS', 'CHAPTER MASTER', 'AZRAEL'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  belial: {
    id: 'belial', name: 'Belial', category: 'epicHero',
    points: 85,
    M: '5"', T: 5, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Master-crafted storm bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 2, keywords: ['PRECISION', 'RAPID FIRE 2'] },
      { name: 'The Sword of Silence', type: 'melee', A: 6, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['PRECISION'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Grand Master of the Deathwing', phase: 'any', description: 'While this model is leading a unit, each time a model in that unit makes an attack, if a Critical Hit is scored, that attack has the [PRECISION] ability.' },
      { name: 'Strikes of Retribution', phase: 'fight', description: 'Each time a melee attack is allocated to this model, after the attacking model\'s unit has finished making its attacks, roll one D6 (to a maximum of six D6 per attacking unit): for each 4+, the attacking unit suffers 1 mortal wound.' },
    ],
    isLeader: true,
    leadsUnits: ['deathwingKnights', 'deathwingTerminators'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'DEATHWING', 'TERMINATOR', 'CAPTAIN', 'BELIAL'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  sammael: {
    id: 'sammael', name: 'Sammael', category: 'epicHero',
    points: 115,
    M: '12"', T: 5, Sv: '3+', W: 7, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Master-crafted plasma cannon', type: 'ranged', range: '36"', A: 'D3', BS: '2+', S: 8, AP: -3, D: 2, keywords: ['BLAST'] },
      { name: 'Twin storm bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2', 'TWIN-LINKED'] },
      { name: 'The Raven Sword', type: 'melee', A: 6, WS: '2+', S: 6, AP: -3, D: 2, keywords: ['SUSTAINED HITS 2'] },
    ],
    abilities: [
      { name: 'Grand Master of the Ravenwing', phase: 'movement', description: 'While this model is leading a unit, that unit is eligible to shoot and declare a charge in a turn in which it Advanced. If that unit is already eligible, add 1 to its Advance and Charge rolls instead.' },
      { name: 'Cut Off Their Escape', phase: 'fight', description: 'Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of this model\'s unit attempts to Fall Back, models in that unit must take Desperate Escape tests as if they were Battle-shocked. Those tests subtract 1 from the result if the unit is already Battle-shocked.' },
    ],
    isLeader: true,
    leadsUnits: ['ravenwingBlackKnights', 'outriders'],
    eligibleLeaders: [],
    keywords: ['MOUNTED', 'CHARACTER', 'EPIC HERO', 'FLY', 'GRENADES', 'IMPERIUM', 'RAVENWING', 'CAPTAIN', 'SAMMAEL'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  asmodai: {
    id: 'asmodai', name: 'Asmodai', category: 'epicHero',
    points: 70,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Crozius arcanum — Strike', type: 'melee', A: 5, WS: '2+', S: 6, AP: -2, D: 2, keywords: [] },
      { name: 'Crozius arcanum — Sweep', type: 'melee', A: 8, WS: '2+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Exemplar of Hate', phase: 'fight', description: 'While this model is leading a unit, you can re-roll melee Hit rolls for models in that unit.' },
      { name: 'Feared Interrogator', phase: 'fight', description: 'At the start of the Fight phase, enemy CHARACTER units within 6" of this model must take a Battle-shock test, subtracting 1 from the result. Each time this model\'s unit destroys an enemy CHARACTER unit in melee, gain 1CP.' },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors', 'bladeguardVeterans', 'hellblasters', 'sternguardVeterans', 'tacticalSquad', 'innerCircleCompanions', 'deathwingKnights', 'deathwingTerminators'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'DEATHWING', 'CHAPLAIN', 'TACTICUS', 'ASMODAI'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  ezekiel: {
    id: 'ezekiel', name: 'Ezekiel', category: 'epicHero',
    points: 75,
    M: '6"', T: 4, Sv: '2+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'The Deliverer', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['PISTOL', 'PRECISION'] },
      { name: 'Mind Wipe — Witchfire', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 6, AP: -2, D: 6, keywords: ['DEVASTATING WOUNDS', 'PRECISION', 'PSYCHIC'] },
      { name: 'Mind Wipe — Focused Witchfire', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 6, AP: -2, D: 6, keywords: ['ANTI-CHARACTER 4+', 'DEVASTATING WOUNDS', 'HAZARDOUS', 'PRECISION', 'PSYCHIC'] },
      { name: "Traitor's Bane", type: 'melee', A: 4, WS: '2+', S: 6, AP: -2, D: 3, keywords: ['ANTI-CHAOS 2+', 'PSYCHIC'] },
    ],
    abilities: [
      { name: 'Psychic Hood', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic attacks.' },
      { name: 'Engulfing Fear (Psychic)', phase: 'shooting', description: 'In your Shooting phase, you can select one enemy unit within 18" of this model. That enemy unit must take a Battle-shock test.' },
      { name: 'Book of Salvation', phase: 'fight', description: 'Melee weapons equipped by models in the unit led by this model gain +1 Attack. When this model is destroyed, each friendly ADEPTUS ASTARTES unit within 6" must take a Battle-shock test.' },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors', 'bladeguardVeterans', 'hellblasters', 'sternguardVeterans', 'tacticalSquad', 'innerCircleCompanions'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'PSYKER', 'GRENADES', 'IMPERIUM', 'DEATHWING', 'LIBRARIAN', 'EZEKIEL'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  lazarus: {
    id: 'lazarus', name: 'Lazarus', category: 'epicHero',
    points: 70,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: "Enmity's Edge", type: 'melee', A: 6, WS: '2+', S: 6, AP: -3, D: 2, keywords: ['ANTI-PSYKER 2+'] },
    ],
    abilities: [
      { name: 'Intractable Will', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it until it has fought.' },
      { name: 'The Spiritshield Helm', phase: 'any', description: 'This model has the Feel No Pain 3+ ability against mortal wounds and Psychic attacks. While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability against mortal wounds and Psychic attacks.' },
    ],
    isLeader: true,
    leadsUnits: ['intercessors', 'assaultIntercessors', 'bladeguardVeterans', 'sternguardVeterans', 'tacticalSquad', 'innerCircleCompanions'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'DEATHWING', 'TACTICUS', 'CAPTAIN', 'LAZARUS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  // ── BATTLELINE ─────────────────────────────────────────────────────

  intercessors: {
    id: 'intercessors', name: 'Intercessor Squad', category: 'battleline',
    points: 80,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Bolt rifle', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['ASSAULT', 'HEAVY'] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Oath of Moment', phase: 'any', description: 'Faction ability. At the start of your Command phase, select one enemy unit. Until the start of your next Command phase, each time a friendly ADEPTUS ASTARTES model makes an attack that targets that unit, you can re-roll the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel', 'lazarus'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'INTERCESSOR SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  tacticalSquad: {
    id: 'tacticalSquad', name: 'Tactical Squad', category: 'battleline',
    points: 140,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 10,
    weapons: [
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Combat Squads', phase: 'deployment', description: 'At the start of the Declare Battle Formations step, before any units have been set up, this unit can be split into two units, each containing five models.' },
      { name: 'Oath of Moment', phase: 'any', description: 'Faction ability. At the start of your Command phase, select one enemy unit. Until the start of your next Command phase, each time a friendly ADEPTUS ASTARTES model makes an attack that targets that unit, you can re-roll the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel', 'lazarus'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICAL SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  // ── INFANTRY ───────────────────────────────────────────────────────

  deathwingKnights: {
    id: 'deathwingKnights', name: 'Deathwing Knights', category: 'infantry',
    points: 250,
    M: '5"', T: 5, Sv: '2+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Mace of Absolution', type: 'melee', A: 4, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['ANTI-MONSTER 4+', 'ANTI-VEHICLE 4+'] },
      { name: 'Great Weapon of the Unforgiven', type: 'melee', A: 5, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS', 'SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Inner Circle', phase: 'any', description: 'Each time an attack is allocated to a model in this unit, subtract 1 from the Damage characteristic of that attack (to a minimum of 1).' },
      { name: 'Teleport Homer', phase: 'movement', description: 'Once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, setting up within 3" of a pre-placed Teleport Homer token and not within 9" of any enemy models.' },
      { name: 'Watcher in the Dark', phase: 'any', description: 'Once per battle, just after a mortal wound is allocated to a model in this unit, the bearer can summon a Watcher in the Dark. If it does, until the end of the phase, models in this unit have the Feel No Pain 4+ ability against mortal wounds.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['belial', 'asmodai'],
    keywords: ['INFANTRY', 'IMPERIUM', 'DEATHWING', 'TERMINATOR', 'DEATHWING KNIGHTS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  deathwingTerminators: {
    id: 'deathwingTerminators', name: 'Deathwing Terminator Squad', category: 'infantry',
    points: 180,
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Heavy flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Plasma cannon (standard)', type: 'ranged', range: '36"', A: 'D3', BS: '3+', S: 7, AP: -2, D: 1, keywords: ['BLAST'] },
      { name: 'Plasma cannon (supercharge)', type: 'ranged', range: '36"', A: 'D3', BS: '3+', S: 8, AP: -3, D: 2, keywords: ['BLAST', 'HAZARDOUS'] },
      { name: 'Power fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
      { name: 'Chainfist', type: 'melee', A: 3, WS: '4+', S: 8, AP: -2, D: 2, keywords: ['ANTI-VEHICLE 3+'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Deathwing', phase: 'any', description: 'Each time a model in this unit makes an attack, ignore any or all modifiers to that attack\'s Ballistic Skill or Weapon Skill and/or to the Hit roll. Against the Oath of Moment target, add 1 to Hit rolls.' },
      { name: 'Teleport Homer', phase: 'movement', description: 'Once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, setting up within 3" of a pre-placed Teleport Homer token and not within 9" of any enemy models.' },
      { name: 'Watcher in the Dark', phase: 'any', description: 'Once per battle, just after a mortal wound is allocated to a model in this unit, the bearer can summon a Watcher in the Dark. If it does, until the end of the phase, models in this unit have the Feel No Pain 4+ ability against mortal wounds.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['belial'],
    keywords: ['INFANTRY', 'IMPERIUM', 'DEATHWING', 'TERMINATOR', 'DEATHWING TERMINATOR SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  innerCircleCompanions: {
    id: 'innerCircleCompanions', name: 'Inner Circle Companions', category: 'infantry',
    points: 90,
    M: '6"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 2,
    models: 3,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Calibanite Greatsword — Strike', type: 'melee', A: 4, WS: '3+', S: 6, AP: -2, D: 2, keywords: ['LETHAL HITS'] },
      { name: 'Calibanite Greatsword — Sweep', type: 'melee', A: 5, WS: '3+', S: 6, AP: -2, D: 1, keywords: ['SUSTAINED HITS 2'] },
    ],
    abilities: [
      { name: 'Braziers of Judgement', phase: 'any', description: 'While a CHARACTER model is leading this unit, each time an attack targets this unit, subtract 1 from the Hit roll.' },
      { name: 'Enmity for the Unworthy', phase: 'fight', description: 'Each time a model in this unit makes an attack that targets a CHARACTER unit, add 1 to the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel', 'lazarus'],
    keywords: ['INFANTRY', 'IMPERIUM', 'DEATHWING', 'TACTICUS', 'INNER CIRCLE COMPANIONS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  bladeguardVeterans: {
    id: 'bladeguardVeterans', name: 'Bladeguard Veteran Squad', category: 'infantry',
    points: 80,
    M: '6"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 3,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Bladeguard', phase: 'fight', description: "At the start of the Fight phase, select one: Swords of the Chapter — re-roll Hit rolls of 1 for models in this unit; or Shields of the Chapter — re-roll invulnerable saving throws of 1 for models in this unit." },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel', 'lazarus'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'DEATHWING', 'BLADEGUARD VETERAN SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  hellblasters: {
    id: 'hellblasters', name: 'Hellblaster Squad', category: 'infantry',
    points: 110,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Plasma incinerator (standard)', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['ASSAULT', 'HEAVY'] },
      { name: 'Plasma incinerator (supercharge)', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['ASSAULT', 'HAZARDOUS', 'HEAVY'] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'For the Chapter!', phase: 'shooting', description: 'Each time a model in this unit is destroyed, if that model has not shot this phase, roll one D6: on a 3+, do not remove it until it has shot. Any Hazardous tests taken for those attacks are automatically passed.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'HELLBLASTER SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  sternguardVeterans: {
    id: 'sternguardVeterans', name: 'Sternguard Veteran Squad', category: 'infantry',
    points: 100,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Sternguard bolt rifle', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Sternguard bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS', 'PISTOL'] },
      { name: 'Close combat weapon', type: 'melee', A: 4, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Sternguard Focus', phase: 'shooting', description: 'Each time a model in this unit makes an attack that targets your Oath of Moment target, you can re-roll the Wound roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel', 'lazarus'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'DEATHWING', 'STERNGUARD VETERAN SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  infiltrators: {
    id: 'infiltrators', name: 'Infiltrator Squad', category: 'infantry',
    points: 100,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Marksman bolt carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['HEAVY'] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Infiltrators', phase: 'deployment', description: 'During the Declare Battle Formations step, this unit can be set up anywhere on the battlefield that is more than 9" away from all enemy models and enemy deployment zones.' },
      { name: 'Omni-scramblers', phase: 'movement', description: 'Enemy units cannot be set up from Reserves within 12" of this unit.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GRENADES', 'SMOKE', 'IMPERIUM', 'PHOBOS', 'INFILTRATOR SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  scoutSquad: {
    id: 'scoutSquad', name: 'Scout Squad', category: 'infantry',
    points: 70,
    M: '6"', T: 4, Sv: '4+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Scout sniper rifle', type: 'ranged', range: '36"', A: 1, BS: '3+', S: 4, AP: -2, D: 2, keywords: ['HEAVY', 'PRECISION'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Infiltrators', phase: 'deployment', description: 'During the Declare Battle Formations step, this unit can be set up anywhere on the battlefield that is more than 9" away from all enemy models and enemy deployment zones.' },
      { name: 'Scouts 6"', phase: 'movement', description: 'Before the first turn begins, this unit can make a Normal move of up to 6". It cannot move within Engagement Range of any enemy models.' },
      { name: 'Guerrilla Tactics', phase: 'movement', description: 'At the end of your opponent\'s turn, if this unit is more than 6" away from all enemy models, you can remove this unit from the battlefield and place it into Strategic Reserves.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GRENADES', 'SMOKE', 'IMPERIUM', 'SCOUT SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  assaultIntercessors: {
    id: 'assaultIntercessors', name: 'Assault Intercessor Squad', category: 'infantry',
    points: 75,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 5, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Oath of Moment', phase: 'any', description: 'Faction ability. At the start of your Command phase, select one enemy unit. Until the start of your next Command phase, each time a friendly ADEPTUS ASTARTES model makes an attack that targets that unit, you can re-roll the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['azrael', 'asmodai', 'ezekiel', 'lazarus'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'ASSAULT INTERCESSOR SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  // ── CAVALRY ────────────────────────────────────────────────────────

  ravenwingBlackKnights: {
    id: 'ravenwingBlackKnights', name: 'Ravenwing Black Knights', category: 'cavalry',
    points: 80,
    M: '12"', T: 5, Sv: '3+', W: 3, Ld: '6+', OC: 2, InvSv: '5+',
    models: 3,
    weapons: [
      { name: 'Plasma talon (standard)', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Plasma talon (supercharge)', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'RAPID FIRE 1'] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Black Knight combat weapon', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Knights of Caliban', phase: 'fight', description: 'Each time this unit is selected to fight, if it made a Charge move this turn, until the end of the phase, melee weapons equipped by models in this unit have the [ANTI-MONSTER 4+] and [ANTI-VEHICLE 4+] abilities.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['sammael'],
    keywords: ['MOUNTED', 'GRENADES', 'IMPERIUM', 'RAVENWING', 'RAVENWING BLACK KNIGHTS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  outriders: {
    id: 'outriders', name: 'Outrider Squad', category: 'cavalry',
    points: 80,
    M: '12"', T: 5, Sv: '3+', W: 4, Ld: '6+', OC: 2,
    models: 3,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Twin bolt rifle', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Astartes chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Thunderous Impact', phase: 'fight', description: 'Each time a model in this unit makes a melee attack, if this unit made a Charge move this turn, improve the Strength and Damage characteristics of that attack by 1.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['sammael'],
    keywords: ['MOUNTED', 'GRENADES', 'IMPERIUM', 'RAVENWING', 'OUTRIDER SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  // ── VEHICLES ───────────────────────────────────────────────────────

  redemptorDreadnought: {
    id: 'redemptorDreadnought', name: 'Redemptor Dreadnought', category: 'vehicle',
    points: 205,
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 4,
    models: 1,
    weapons: [
      { name: 'Heavy onslaught gatling cannon', type: 'ranged', range: '24"', A: 12, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Macro plasma incinerator (standard)', type: 'ranged', range: '36"', A: 'D6+1', BS: '3+', S: 8, AP: -3, D: 2, keywords: ['BLAST'] },
      { name: 'Macro plasma incinerator (supercharge)', type: 'ranged', range: '36"', A: 'D6+1', BS: '3+', S: 9, AP: -4, D: 3, keywords: ['BLAST', 'HAZARDOUS'] },
      { name: 'Onslaught gatling cannon', type: 'ranged', range: '24"', A: 8, BS: '3+', S: 5, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Twin fragstorm grenade launcher', type: 'ranged', range: '18"', A: 'D6', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['BLAST', 'TWIN-LINKED'] },
      { name: 'Heavy flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Icarus rocket pod', type: 'ranged', range: '24"', A: 'D3', BS: '3+', S: 8, AP: -1, D: 2, keywords: ['ANTI-FLY 2+'] },
      { name: 'Redemptor fist', type: 'melee', A: 5, WS: '3+', S: 12, AP: -2, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Duty Eternal', phase: 'any', description: 'Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack (to a minimum of 1).' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'IMPERIUM', 'DEATHWING', 'DREADNOUGHT', 'REDEMPTOR DREADNOUGHT'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  darkTalon: {
    id: 'darkTalon', name: 'Ravenwing Dark Talon', category: 'vehicle',
    points: 210,
    M: '20"', T: 8, Sv: '3+', W: 11, Ld: '6+', OC: 0, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Hurricane bolter', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 6', 'TWIN-LINKED'] },
      { name: 'Rift cannon', type: 'ranged', range: '18"', A: 'D3+1', BS: '3+', S: 16, AP: -4, D: 3, keywords: ['BLAST', 'DEVASTATING WOUNDS', 'HAZARDOUS'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Hover', phase: 'movement', description: 'At the start of your Movement phase, this model can lose the FLY keyword and change its Move to 10" until the start of your next Movement phase.' },
      { name: 'Stasis Bomb', phase: 'movement', description: 'Once per turn, after this model makes a Normal move, select one enemy non-AIRCRAFT unit this model moved over. That unit suffers D3 mortal wounds. Roll one D6: on a 1-3, that unit cannot Advance or Fall Back until the end of the turn; on a 4-6, that unit must Remain Stationary until the end of the turn. Each model can use this ability once per battle.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-3 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'AIRCRAFT', 'FLY', 'IMPERIUM', 'RAVENWING', 'DARK TALON'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  nephilimJetfighter: {
    id: 'nephilimJetfighter', name: 'Nephilim Jetfighter', category: 'vehicle',
    points: 195,
    M: '20"', T: 8, Sv: '3+', W: 11, Ld: '6+', OC: 0, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Avenger mega bolter', type: 'ranged', range: '36"', A: 10, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Blacksword missiles', type: 'ranged', range: '36"', A: 2, BS: '3+', S: 8, AP: -2, D: 'D6', keywords: ['ANTI-FLY 2+'] },
      { name: 'Nephilim lascannons', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Twin heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Hover', phase: 'movement', description: 'At the start of your Movement phase, this model can lose the FLY keyword and change its Move to 10" until the start of your next Movement phase.' },
      { name: 'Lightning-fast Manoeuvres', phase: 'any', description: 'Each time a ranged attack targets this model, subtract 1 from the Hit roll. If that attack was made by a model that can Fly, subtract 1 from the Wound roll as well.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-3 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'AIRCRAFT', 'FLY', 'IMPERIUM', 'RAVENWING', 'NEPHILIM JETFIGHTER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  landRaider: {
    id: 'landRaider', name: 'Land Raider', category: 'vehicle',
    points: 220,
    M: '10"', T: 12, Sv: '2+', W: 16, Ld: '6+', OC: 5,
    models: 1,
    weapons: [
      { name: 'Godhammer lascannon (×2)', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Twin heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Armoured tracks', type: 'melee', A: 6, WS: '4+', S: 8, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Assault Ramp', phase: 'movement', description: 'Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'SMOKE', 'IMPERIUM', 'DEATHWING', 'LAND RAIDER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

  predatorAnnihilator: {
    id: 'predatorAnnihilator', name: 'Predator Annihilator', category: 'vehicle',
    points: 135,
    M: '10"', T: 10, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Predator twin lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 14, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Annihilator', phase: 'shooting', description: 'Each time this model makes a ranged attack that targets a MONSTER or VEHICLE unit, you can re-roll the Damage roll.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'PREDATOR ANNIHILATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DARK ANGELS'],
  },

}

export const daUnitList = Object.values(daUnits)

export const daUnitsByCategory = {
  epicHero:  daUnitList.filter(u => u.category === 'epicHero'),
  character: daUnitList.filter(u => u.category === 'character'),
  battleline: daUnitList.filter(u => u.category === 'battleline'),
  infantry:  daUnitList.filter(u => u.category === 'infantry'),
  cavalry:   daUnitList.filter(u => u.category === 'cavalry'),
  vehicle:   daUnitList.filter(u => u.category === 'vehicle'),
}
