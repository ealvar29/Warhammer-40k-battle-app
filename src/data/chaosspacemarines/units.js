// Chaos Space Marines (Heretic Astartes) — 10th Edition
// Stats sourced from Heretic Astartes Index + MFM updates

// ── Characters ────────────────────────────────────────────────────────────────
const characters = [
  {
    id: 'abaddon',
    name: 'Abaddon the Despoiler',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['chosen', 'chaosTerminators'],
    unitKey: 'abaddon',
    M: '6"', T: 8, Sv: '2+', W: 9, OC: 2, InvSv: '4+',
    points: 285, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'CHAOS LORD', 'HERETIC ASTARTES', 'ABADDON'],
    abilities: [
      { name: 'Eternal Warmaster', phase: 'fight', description: 'Reroll hit and wound rolls of 1 for melee attacks made by this model and its unit.' },
      { name: 'Warmaster of Chaos', phase: 'command', description: 'Once per battle round, use one Stratagem for 0 CP.' },
    ],
    weapons: [
      { name: 'Talon of Horus', WS: '2+', A: 6, S: 8, AP: -3, D: 2, abilities: ['DEVASTATING WOUNDS'] },
      { name: 'Drach\'nyen', WS: '2+', A: 10, S: 8, AP: -4, D: 3, abilities: [] },
      { name: 'Combi-bolter', range: '24"', BS: '2+', A: 3, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'daemonPrince',
    name: 'Daemon Prince',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'daemonPrince',
    M: '8"', T: 7, Sv: '3+', W: 8, OC: 2, InvSv: '4+',
    points: 140, models: 1,
    keywords: ['CHARACTER', 'MONSTER', 'DAEMON', 'HERETIC ASTARTES', 'DAEMON PRINCE'],
    abilities: [
      { name: 'Daemonic', phase: 'any', description: 'This model has a 4+ invulnerable save.' },
      { name: 'Towering', phase: 'fight', description: 'Melee attacks targeting this model suffer -1 to wound rolls.' },
    ],
    weapons: [
      { name: 'Malefic talons', WS: '2+', A: 6, S: 7, AP: -2, D: 2, abilities: ['TWIN-LINKED'] },
    ],
  },
  {
    id: 'daemonPrinceWithWings',
    name: 'Daemon Prince with Wings',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'daemonPrinceWithWings',
    M: '12"', T: 7, Sv: '3+', W: 8, OC: 2, InvSv: '4+',
    points: 160, models: 1,
    keywords: ['CHARACTER', 'MONSTER', 'DAEMON', 'FLY', 'HERETIC ASTARTES', 'DAEMON PRINCE'],
    abilities: [
      { name: 'Daemonic', phase: 'any', description: 'This model has a 4+ invulnerable save.' },
      { name: 'Death from Above', phase: 'charge', description: 'After this model Advances, it can still charge this turn.' },
    ],
    weapons: [
      { name: 'Malefic talons', WS: '2+', A: 6, S: 7, AP: -2, D: 2, abilities: ['TWIN-LINKED'] },
    ],
  },
  {
    id: 'chaosLord',
    name: 'Chaos Lord',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'chaosLord',
    M: '6"', T: 4, Sv: '3+', W: 5, OC: 1, InvSv: '4+',
    points: 70, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'CHAOS LORD', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Eternal Hatred', phase: 'fight', description: 'Reroll wound rolls for this model and its unit in the Fight phase.' },
    ],
    weapons: [
      { name: 'Paired chainswords', WS: '2+', A: 6, S: 4, AP: 0, D: 1, abilities: ['SUSTAINED HITS 1'] },
      { name: 'Bolt pistol', range: '12"', BS: '2+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'chaosLordInTerminatorArmour',
    name: 'Chaos Lord in Terminator Armour',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosTerminators'],
    unitKey: 'chaosLordInTerminatorArmour',
    M: '5"', T: 4, Sv: '2+', W: 5, OC: 1, InvSv: '4+',
    points: 95, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'TERMINATOR', 'CHAOS LORD', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Eternal Hatred', phase: 'fight', description: 'Reroll wound rolls for this model and its unit in the Fight phase.' },
      { name: 'Deep Strike', phase: 'move', description: 'During deployment, set this unit aside. In your Reinforcements step, set it up anywhere 9"+ from enemies.' },
    ],
    weapons: [
      { name: 'Accursed weapon', WS: '2+', A: 5, S: 5, AP: -2, D: 2, abilities: [] },
      { name: 'Combi-bolter', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'darkApostle',
    name: 'Dark Apostle',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'cultistsMob'],
    unitKey: 'darkApostle',
    M: '6"', T: 4, Sv: '3+', W: 4, OC: 1, InvSv: '5+',
    points: 60, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES', 'DARK APOSTLE'],
    abilities: [
      { name: 'Dark Prayers', phase: 'command', description: 'Once per Command phase, pick one Dark Prayer. On a 3+, the effect lasts until your next Command phase.' },
    ],
    weapons: [
      { name: 'Accursed crozius', WS: '2+', A: 4, S: 6, AP: -1, D: 2, abilities: [] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'sorcerer',
    M: '6"', T: 4, Sv: '3+', W: 4, OC: 1, InvSv: '5+',
    points: 65, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'PSYKER', 'HERETIC ASTARTES', 'SORCERER'],
    abilities: [
      { name: 'Warp Sight', phase: 'shoot', description: 'Reroll one hit roll per phase for this model.' },
      { name: 'Diabolic Strength', phase: 'fight', description: 'Until end of Fight phase, this model\'s melee attacks gain +2 Strength and [LETHAL HITS].' },
    ],
    weapons: [
      { name: 'Force weapon', WS: '2+', A: 4, S: 5, AP: -2, D: 2, abilities: ['DEVASTATING WOUNDS'] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'warpsmith',
    name: 'Warpsmith',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'helbrute'],
    unitKey: 'warpsmith',
    M: '6"', T: 4, Sv: '3+', W: 4, OC: 1, InvSv: '5+',
    points: 65, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES', 'WARPSMITH'],
    abilities: [
      { name: 'Master of Mechanisms', phase: 'command', description: 'Once per Command phase, one friendly HERETIC ASTARTES VEHICLE within 6" regains up to D3 lost wounds.' },
    ],
    weapons: [
      { name: 'Mechadendrite claws', WS: '3+', A: 4, S: 5, AP: -1, D: 2, abilities: [] },
      { name: 'Boltgun', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'masterOfExecutions',
    name: 'Master of Executions',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'masterOfExecutions',
    M: '6"', T: 4, Sv: '3+', W: 5, OC: 1, InvSv: '4+',
    points: 65, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Death Sentence', phase: 'fight', description: 'Pick one visible enemy CHARACTER within 12". This model\'s melee attacks gain +1 to wound against that character.' },
    ],
    weapons: [
      { name: 'Axe of dismemberment', WS: '2+', A: 5, S: 7, AP: -2, D: 2, abilities: ['DEVASTATING WOUNDS'] },
      { name: 'Bolt pistol', range: '12"', BS: '2+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'exaltedChampion',
    name: 'Exalted Champion',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'exaltedChampion',
    M: '6"', T: 4, Sv: '3+', W: 5, OC: 1, InvSv: '4+',
    points: 65, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Champion of Chaos', phase: 'fight', description: 'Melee weapons equipped by models in this model\'s unit gain [LETHAL HITS].' },
    ],
    weapons: [
      { name: 'Power fist', WS: '2+', A: 4, S: 8, AP: -2, D: 2, abilities: [] },
      { name: 'Bolt pistol', range: '12"', BS: '2+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'fabiusBile',
    name: 'Fabius Bile',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['chaosSpaceMarines', 'chosen'],
    unitKey: 'fabiusBile',
    M: '6"', T: 4, Sv: '3+', W: 5, OC: 1, InvSv: '5+',
    points: 75, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES', 'FABIUS BILE'],
    abilities: [
      { name: 'Enhanced Warriors', phase: 'command', description: 'Models in this model\'s unit gain +1 Attack and +1 to wound rolls for melee attacks.' },
      { name: 'Chirurgeon', phase: 'command', description: 'Once per Command phase, one model in this unit regains 1 lost wound.' },
    ],
    weapons: [
      { name: 'Xyclos needler', range: '18"', BS: '2+', A: 2, S: 3, AP: -2, D: 1, abilities: ['LETHAL HITS'] },
      { name: 'Chirurgeon blades', WS: '2+', A: 3, S: 4, AP: -3, D: 2, abilities: ['LETHAL HITS'] },
    ],
  },
  {
    id: 'cypher',
    name: 'Cypher',
    category: 'epicHero',
    isLeader: false,
    eligibleUnits: [],
    unitKey: 'cypher',
    M: '6"', T: 4, Sv: '3+', W: 5, OC: 1, InvSv: '4+',
    points: 90, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'EPIC HERO', 'FALLEN', 'HERETIC ASTARTES', 'CYPHER'],
    abilities: [
      { name: 'Lone Operative', phase: 'any', description: 'While this model is not within Engagement Range of any enemy units, it cannot be selected as the target of a ranged attack.' },
      { name: 'Agent of Discord', phase: 'command', description: 'Each time your opponent targets a unit with a Stratagem, if that unit is within 12" of this model, increase the CP cost of that Stratagem by 1.' },
      { name: 'Guns Blazing', phase: 'shooting', description: 'Once per turn, after an enemy unit makes a ranged attack that targets a friendly HERETIC ASTARTES unit within 3" of this model, this model can shoot as if it were your Shooting phase.' },
    ],
    weapons: [
      { name: "Cypher's bolt pistols", range: '12"', BS: '2+', A: 6, S: 4, AP: -1, D: 1, abilities: ['ASSAULT', 'PISTOL', 'SUSTAINED HITS 1'] },
      { name: "Cypher's plasma pistol", range: '12"', BS: '2+', A: 3, S: 8, AP: -3, D: 2, abilities: ['ASSAULT', 'PISTOL', 'SUSTAINED HITS 1'] },
      { name: "Cypher's bolt pistols (melee)", WS: '2+', A: 6, S: 4, AP: -1, D: 1, abilities: [] },
    ],
  },
  {
    id: 'haarkenWorldclaimer',
    name: 'Haarken Worldclaimer',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['raptors'],
    unitKey: 'haarkenWorldclaimer',
    M: '12"', T: 4, Sv: '3+', W: 5, OC: 1, InvSv: '4+',
    points: 90, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'EPIC HERO', 'FLY', 'JUMP PACK', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Head Taker', phase: 'charge', description: 'After completing a Charge move, select one enemy unit within Engagement Range. Roll one D6 for each model in this unit in Engagement Range: on a 4+, that enemy unit suffers 1 mortal wound.' },
      { name: 'Herald of the Apocalypse', phase: 'command', description: 'Aura. Enemy units within 6" that are below starting strength must take an additional Battle-shock test at the start of your opponent\'s Command phase.' },
    ],
    weapons: [
      { name: 'Helspear', range: '12"', BS: '2+', A: 1, S: 8, AP: -3, D: 3, abilities: ['SUSTAINED HITS D3'] },
      { name: "Herald's talon", WS: '2+', A: 6, S: 5, AP: -2, D: 2, abilities: ['PRECISION'] },
      { name: 'Helspear (melee)', WS: '2+', A: 1, S: 8, AP: -3, D: 3, abilities: ['LANCE', 'SUSTAINED HITS D3'] },
    ],
  },
  {
    id: 'huronBlackheart',
    name: 'Huron Blackheart',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['chaosTerminators', 'chosen', 'chaosSpaceMarines'],
    unitKey: 'huronBlackheart',
    M: '6"', T: 5, Sv: '3+', W: 5, OC: 1, InvSv: '4+',
    points: 120, models: 1,
    keywords: ['CHARACTER', 'INFANTRY', 'EPIC HERO', 'CHAOS LORD', 'HERETIC ASTARTES', 'HURON BLACKHEART'],
    abilities: [
      { name: 'Lord of Badab', phase: 'any', description: 'Aura. Friendly HERETIC ASTARTES INFANTRY within 6" (excluding Battle-shocked units) gain +1 to their Objective Control characteristic.' },
      { name: "Hamadrya's Knowledge", phase: 'movement', description: 'Once per battle round, when an enemy unit ends a move within 9" of this model, if this model is not in Engagement Range of any enemy, it can make a move of up to D3+3".' },
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
    ],
    weapons: [
      { name: "Tyrant's claw — heavy flamer", range: '12"', BS: '2+', A: 'D6+2', S: 6, AP: -1, D: 1, abilities: ['TORRENT', 'IGNORES COVER', 'PISTOL'] },
      { name: "Tyrant's claw — exalted power weapon", WS: '2+', A: 6, S: 8, AP: -3, D: 3, abilities: [] },
    ],
  },
  {
    id: 'vashtorr',
    name: 'Vashtorr the Arkifane',
    category: 'epicHero',
    isLeader: false,
    eligibleUnits: [],
    unitKey: 'vashtorr',
    M: '12"', T: 10, Sv: '2+', W: 14, OC: 3, InvSv: '4+',
    points: 175, models: 1,
    keywords: ['CHARACTER', 'MONSTER', 'EPIC HERO', 'FLY', 'DAEMON', 'HERETIC ASTARTES', 'VASHTORR'],
    abilities: [
      { name: 'Unholy Mechanisms', phase: 'any', description: 'Aura. While a friendly DAEMON VEHICLE unit is within 6" of this model, add 2 to the Strength characteristic of weapons equipped by models in that unit.' },
      { name: 'Reorder Reality', phase: 'shooting', description: 'Each time an enemy unit within 18" targets this model, subtract 1 from that unit\'s Hit rolls for the rest of the phase, and those ranged weapons gain the [HAZARDOUS] ability.' },
      { name: 'Indentured Daemon Engines', phase: 'any', description: 'While this model is within 3" of one or more friendly DAEMON VEHICLE units, it has the Lone Operative ability.' },
      { name: 'Damaged (1-4 wounds remaining)', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls for attacks made by this model.' },
    ],
    weapons: [
      { name: "Vashtorr's claw", range: '12"', BS: '2+', A: 'D6', S: 5, AP: -2, D: 1, abilities: ['TORRENT'] },
      { name: "Vashtorr's hammer — strike", WS: '2+', A: 6, S: 14, AP: -3, D: 3, abilities: ['DEVASTATING WOUNDS'] },
      { name: "Vashtorr's hammer — sweep", WS: '2+', A: 12, S: 8, AP: -1, D: 2, abilities: ['DEVASTATING WOUNDS'] },
    ],
  },
]

// ── Battleline ────────────────────────────────────────────────────────────────
const battleline = [
  {
    id: 'chaosSpaceMarines',
    name: 'Chaos Space Marines',
    category: 'battleline',
    isLeader: false,
    eligibleLeaders: ['chaosLord', 'darkApostle', 'sorcerer', 'masterOfExecutions', 'exaltedChampion', 'fabiusBile', 'daemonPrince', 'daemonPrinceWithWings'],
    unitKey: 'chaosSpaceMarines',
    M: '6"', T: 4, Sv: '3+', W: 2, OC: 2,
    points: 170, models: 10, minModels: 10, maxModels: 20,
    keywords: ['BATTLELINE', 'INFANTRY', 'HERETIC ASTARTES', 'CHAOS SPACE MARINES'],
    abilities: [
      { name: 'Oaths of Moment', phase: 'fight', description: 'Reroll hit rolls of 1 for attacks made by this unit.' },
    ],
    weapons: [
      { name: 'Boltgun', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
      { name: 'Chainsword', WS: '3+', A: 3, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'cultistsMob',
    name: 'Cultists Mob',
    category: 'battleline',
    isLeader: false,
    eligibleLeaders: ['darkApostle'],
    unitKey: 'cultistsMob',
    M: '6"', T: 3, Sv: '6+', W: 1, OC: 2,
    points: 50, models: 10, minModels: 10, maxModels: 20,
    keywords: ['BATTLELINE', 'INFANTRY', 'CHAOS', 'CULTISTS MOB'],
    abilities: [
      { name: 'Fanatic Horde', phase: 'fight', description: 'While this unit contains 10+ models, improve its OC by 2.' },
    ],
    weapons: [
      { name: 'Autogun', range: '24"', BS: '4+', A: 1, S: 3, AP: 0, D: 1, abilities: [] },
      { name: 'Cultist knife', WS: '4+', A: 1, S: 3, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Infantry ──────────────────────────────────────────────────────────────────
const infantry = [
  {
    id: 'chosen',
    name: 'Chosen',
    category: 'infantry',
    isLeader: false,
    eligibleLeaders: ['chaosLord', 'sorcerer', 'masterOfExecutions', 'exaltedChampion', 'fabiusBile', 'abaddon', 'daemonPrince', 'daemonPrinceWithWings'],
    unitKey: 'chosen',
    M: '6"', T: 4, Sv: '3+', W: 2, OC: 2, InvSv: '5+',
    points: 105, models: 5, minModels: 5, maxModels: 10,
    keywords: ['INFANTRY', 'HERETIC ASTARTES', 'CHOSEN'],
    abilities: [
      { name: 'Chosen of the Gods', phase: 'fight', description: 'Melee weapons equipped by models in this unit gain [LETHAL HITS].' },
    ],
    weapons: [
      { name: 'Bolt pistol', range: '12"', BS: '2+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
      { name: 'Chainsword', WS: '2+', A: 3, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'chaosTerminators',
    name: 'Chaos Terminators',
    category: 'infantry',
    isLeader: false,
    eligibleLeaders: ['chaosLordInTerminatorArmour', 'abaddon'],
    unitKey: 'chaosTerminators',
    M: '5"', T: 5, Sv: '2+', W: 3, OC: 1, InvSv: '4+',
    points: 175, models: 5, minModels: 5, maxModels: 10,
    keywords: ['INFANTRY', 'TERMINATOR', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Deep Strike', phase: 'move', description: 'During deployment, set this unit aside. In your Reinforcements step, set it up anywhere 9"+ from enemies.' },
    ],
    weapons: [
      { name: 'Combi-bolter', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
      { name: 'Accursed weapon', WS: '3+', A: 3, S: 5, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'havocs',
    name: 'Havocs',
    category: 'infantry',
    isLeader: false,
    eligibleLeaders: [],
    unitKey: 'havocs',
    M: '6"', T: 4, Sv: '3+', W: 2, OC: 2,
    points: 100, models: 5, minModels: 5, maxModels: 10,
    keywords: ['INFANTRY', 'HERETIC ASTARTES', 'HAVOCS'],
    abilities: [
      { name: 'Fire Frenzy', phase: 'shoot', description: 'Unmodified hit rolls of 6 with ranged weapons score 1 additional hit.' },
    ],
    weapons: [
      { name: 'Reaper chaincannon', range: '36"', BS: '3+', A: 6, S: 5, AP: -1, D: 1, abilities: ['SUSTAINED HITS 1'] },
      { name: 'Lascannon', range: '48"', BS: '3+', A: 1, S: 9, AP: -3, D: 'D6', abilities: [] },
      { name: 'Chainsword', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'obliterators',
    name: 'Obliterators',
    category: 'infantry',
    isLeader: false,
    eligibleLeaders: [],
    unitKey: 'obliterators',
    M: '5"', T: 5, Sv: '2+', W: 4, OC: 1, InvSv: '4+',
    points: 115, models: 2, minModels: 1, maxModels: 3,
    keywords: ['INFANTRY', 'HERETIC ASTARTES', 'OBLITERATORS'],
    abilities: [
      { name: 'Fleshmetal Weapons', phase: 'shoot', description: 'Each shooting phase, choose one weapon profile for the Obliterator weapons (assault cannon, melta, or plasma mode).' },
    ],
    weapons: [
      { name: 'Obliterator weapons', range: '24"', BS: '3+', A: 4, S: 8, AP: -2, D: 2, abilities: ['TWIN-LINKED'] },
      { name: 'Crushing fists', WS: '3+', A: 4, S: 8, AP: -2, D: 2, abilities: [] },
    ],
  },
]

// ── Vehicles & Monsters ───────────────────────────────────────────────────────
const vehicles = [
  {
    id: 'helbrute',
    name: 'Helbrute',
    category: 'vehicle',
    isLeader: false,
    eligibleLeaders: ['warpsmith'],
    unitKey: 'helbrute',
    M: '8"', T: 10, Sv: '3+', W: 8, OC: 3, InvSv: '4+',
    points: 115, models: 1,
    keywords: ['VEHICLE', 'WALKER', 'HELBRUTE', 'HERETIC ASTARTES'],
    abilities: [
      { name: 'Crazed', phase: 'fight', description: 'Each time this model is selected to fight, if it has lost any wounds, it makes 2 additional attacks.' },
      { name: 'Siege Shield', phase: 'move', description: 'This model can move through terrain features without penalty.' },
    ],
    weapons: [
      { name: 'Multi-melta', range: '24"', BS: '3+', A: 2, S: 9, AP: -4, D: 'D6', abilities: ['MELTA 2'] },
      { name: 'Helbrute fist', WS: '3+', A: 4, S: 12, AP: -2, D: 3, abilities: ['DEVASTATING WOUNDS'] },
    ],
  },
  {
    id: 'maulerfiend',
    name: 'Maulerfiend',
    category: 'vehicle',
    isLeader: false,
    eligibleLeaders: [],
    unitKey: 'maulerfiend',
    M: '10"', T: 10, Sv: '3+', W: 12, OC: 4, InvSv: '5+',
    points: 145, models: 1,
    keywords: ['VEHICLE', 'DAEMON ENGINE', 'HERETIC ASTARTES', 'MAULERFIEND'],
    abilities: [
      { name: 'Predator Instincts', phase: 'charge', description: 'This model is eligible to declare a charge even if it Advanced this turn.' },
      { name: 'Infernal Regeneration', phase: 'command', description: 'At the start of each of your Command phases, this model regains 1 lost wound.' },
    ],
    weapons: [
      { name: 'Maulerfiend fists', WS: '3+', A: 6, S: 12, AP: -2, D: 3, abilities: [] },
      { name: 'Lasher tendrils', WS: '3+', A: 2, S: 8, AP: -3, D: 'D6', abilities: ['DEVASTATING WOUNDS'] },
    ],
  },
  {
    id: 'forgefiend',
    name: 'Forgefiend',
    category: 'vehicle',
    isLeader: false,
    eligibleLeaders: [],
    unitKey: 'forgefiend',
    M: '8"', T: 10, Sv: '3+', W: 12, OC: 3, InvSv: '5+',
    points: 150, models: 1,
    keywords: ['VEHICLE', 'DAEMON ENGINE', 'HERETIC ASTARTES', 'FORGEFIEND'],
    abilities: [
      { name: 'Infernal Aim', phase: 'shoot', description: 'This model does not suffer the penalty for remaining stationary when firing Heavy weapons.' },
      { name: 'Infernal Regeneration', phase: 'command', description: 'At the start of each of your Command phases, this model regains 1 lost wound.' },
    ],
    weapons: [
      { name: 'Hades autocannons', range: '36"', BS: '3+', A: 6, S: 7, AP: -1, D: 3, abilities: [] },
      { name: 'Ectoplasma cannons', range: '36"', BS: '3+', A: 3, S: 7, AP: -3, D: 3, abilities: ['BLAST'] },
      { name: 'Daemon jaws', WS: '3+', A: 4, S: 9, AP: -1, D: 2, abilities: [] },
    ],
  },
]

// ── Exports ───────────────────────────────────────────────────────────────────
export const csmUnitList = [...characters, ...battleline, ...infantry, ...vehicles]

export const csmUnitsByCategory = {
  epicHero: csmUnitList.filter(u => u.category === 'epicHero'),
  character: csmUnitList.filter(u => u.category === 'character'),
  battleline: csmUnitList.filter(u => u.category === 'battleline'),
  infantry: csmUnitList.filter(u => u.category === 'infantry'),
  vehicle: csmUnitList.filter(u => u.category === 'vehicle'),
}
