// Deathwatch units — 10th Edition (Official Index, December 2024)
// Sources: https://wahapedia.ru/wh40k10ed/factions/space-marines/deathwatch
// Official PDF: eng_wh40k_grotmas_index_deathwatch_7_12_2024

export const deathwatchUnits = {

  // ── EPIC HEROES ────────────────────────────────────────────────────

  watchCaptainArtemis: {
    id: 'watchCaptainArtemis', name: 'Watch Captain Artemis', category: 'epicHero',
    points: 65,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Hellfire Extremis', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 4, AP: -1, D: 1, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'IGNORES COVER', 'TORRENT'] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 6, WS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time a wound would be allocated to this model, roll one D6: on a 6+, that wound is not lost.' },
      { name: 'Tactical Instinct', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Unstoppable Champion', phase: 'any', description: 'The first time this model is destroyed, roll one D6 at the end of the phase. On a 2+, set this model back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 1 wound remaining.' },
    ],
    isLeader: true,
    leadsUnits: ['deathwatchVeterans', 'fortisKillTeam'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'CAPTAIN', 'WATCH CAPTAIN ARTEMIS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  // ── CHARACTERS ─────────────────────────────────────────────────────

  watchMaster: {
    id: 'watchMaster', name: 'Watch Master', category: 'character',
    points: 95,
    M: '6"', T: 4, Sv: '2+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Vigil spear', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: [] },
      { name: 'Vigil spear', type: 'melee', A: 6, WS: '2+', S: 6, AP: -2, D: 'D3', keywords: ['LANCE'] },
    ],
    abilities: [
      { name: 'Strategic Knowledge', phase: 'any', description: 'While this model is leading a unit, that unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back.' },
      { name: 'Watch Master', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can use it when its unit is targeted with a Stratagem. If it does, reduce the CP cost of that use of that Stratagem by 1CP.' },
    ],
    isLeader: true,
    leadsUnits: ['deathwatchVeterans', 'fortisKillTeam'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'CAPTAIN', 'WATCH MASTER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  // ── BATTLELINE ─────────────────────────────────────────────────────

  deathwatchVeterans: {
    id: 'deathwatchVeterans', name: 'Deathwatch Veterans', category: 'battleline',
    points: 100,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2, InvSv: null,
    models: 5,
    weapons: [
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Combi-weapon', type: 'ranged', range: '24"', A: 1, BS: '4+', S: 4, AP: -1, D: 1, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'] },
      { name: 'Deathwatch shotgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 2, keywords: ['ASSAULT'] },
      { name: 'Frag cannon', type: 'ranged', range: '18"', A: 'D3', BS: '4+', S: 7, AP: -1, D: 2, keywords: ['BLAST', 'HEAVY', 'RAPID FIRE D3'] },
      { name: 'Infernus heavy bolter — heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '4+', S: 5, AP: -1, D: 2, keywords: ['HEAVY', 'SUSTAINED HITS 1'] },
      { name: 'Infernus heavy bolter — heavy flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Stalker-pattern boltgun', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 4, AP: -1, D: 2, keywords: ['HEAVY', 'PRECISION'] },
      { name: 'Black Shield blades', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['TWIN-LINKED'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Deathwatch thunder hammer', type: 'melee', A: 3, WS: '4+', S: 10, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Power weapon', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
      { name: 'Xenophase blade', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Death to the Alien', phase: 'shooting', description: 'Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target of that attack does not have the IMPERIUM or CHAOS keywords, you can re-roll the Hit roll instead.' },
      { name: 'Astartes Shield (Wargear)', phase: 'any', description: 'The bearer has a 4+ invulnerable save.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['watchMaster', 'watchCaptainArtemis'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'KILL TEAM', 'DEATHWATCH VETERANS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  decimusKillTeam: {
    id: 'decimusKillTeam', name: 'Decimus Kill Team', category: 'battleline',
    points: 100,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2, InvSv: null,
    models: 5,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['LETHAL HITS', 'PISTOL'] },
      { name: 'Deathwatch marksman bolt carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 5, AP: -1, D: 1, keywords: ['HEAVY', 'LETHAL HITS'] },
      { name: 'Frag cannon', type: 'ranged', range: '18"', A: 'D3', BS: '3+', S: 7, AP: -2, D: 2, keywords: ['BLAST', 'HEAVY', 'LETHAL HITS', 'RAPID FIRE D3'] },
      { name: 'Hellstorm bolt rifle', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['ASSAULT', 'HEAVY', 'LETHAL HITS'] },
      { name: 'Infernus heavy bolter — heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -2, D: 3, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Infernus heavy bolter — heavy flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Plasma incinerator — standard', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['ASSAULT', 'HEAVY'] },
      { name: 'Plasma incinerator — supercharge', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['ASSAULT', 'HAZARDOUS', 'HEAVY'] },
      { name: 'Plasma pistol — standard', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma pistol — supercharge', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Special-issue bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['LETHAL HITS', 'PISTOL', 'PRECISION'] },
      { name: 'Stalker bolt rifle', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['HEAVY', 'LETHAL HITS', 'PRECISION'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Combat knife', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: ['PRECISION'] },
      { name: 'Heavy thunder hammer', type: 'melee', A: 3, WS: '4+', S: 10, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Xenophase blade', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Death to the Alien', phase: 'shooting', description: 'Each time a model in this unit makes an attack, re-roll a Hit roll of 1. If the target of that attack does not have the IMPERIUM or CHAOS keywords, you can re-roll the Hit roll instead.' },
      { name: 'Astartes Shield (Wargear)', phase: 'any', description: 'The bearer has a 4+ invulnerable save.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'KILL TEAM', 'DECIMUS KILL TEAM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  // ── INFANTRY ───────────────────────────────────────────────────────

  deathwatchTerminatorSquad: {
    id: 'deathwatchTerminatorSquad', name: 'Deathwatch Terminator Squad', category: 'infantry',
    points: 190,
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Cyclone missile launcher — frag', type: 'ranged', range: '36"', A: '2D6', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Cyclone missile launcher — krak', type: 'ranged', range: '36"', A: 2, BS: '3+', S: 9, AP: -2, D: 'D6', keywords: [] },
      { name: 'Heavy flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Plasma cannon — standard', type: 'ranged', range: '36"', A: 'D3', BS: '3+', S: 7, AP: -2, D: 1, keywords: ['BLAST'] },
      { name: 'Plasma cannon — supercharge', type: 'ranged', range: '36"', A: 'D3', BS: '3+', S: 8, AP: -3, D: 2, keywords: ['BLAST', 'HAZARDOUS'] },
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Chainfist', type: 'melee', A: 3, WS: '4+', S: 8, AP: -2, D: 2, keywords: ['ANTI-VEHICLE 3+'] },
      { name: 'Power fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
      { name: 'Thunder hammer', type: 'melee', A: 3, WS: '4+', S: 8, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Twin lightning claws', type: 'melee', A: 5, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Terminatus Assault', phase: 'charge', description: 'You can re-roll Charge rolls made for this unit. Each time this unit ends a Charge move, each enemy unit within Engagement Range of this unit must take a Battle-shock test. If that enemy unit does not have the IMPERIUM or CHAOS keywords, subtract 1 from that test.' },
      { name: 'Teleport Homer', phase: 'any', description: 'At the start of the battle, you can set up one Teleport Homer token for this unit anywhere on the battlefield that is not within your opponent\'s deployment zone. If you do, once per battle, you can target this unit with the Rapid Ingress Stratagem for 0CP, but when resolving that Stratagem, you must set this unit up within 3" of that token and not within 9" horizontally of one or more enemy units. That token is then removed.' },
      { name: 'Storm Shield (Wargear)', phase: 'any', description: 'The bearer has a Wounds characteristic of 4.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'IMPERIUM', 'TERMINATOR', 'KILL TEAM', 'DEATHWATCH TERMINATOR SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  fortisKillTeam: {
    id: 'fortisKillTeam', name: 'Fortis Kill Team', category: 'infantry',
    points: 180,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2, InvSv: null,
    models: 10,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Castellan launcher', type: 'ranged', range: '36"', A: 'D3', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['BLAST', 'INDIRECT FIRE'] },
      { name: 'Deathwatch bolt rifle', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 5, AP: -2, D: 1, keywords: ['ASSAULT', 'HEAVY', 'LETHAL HITS'] },
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma incinerator — standard', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['ASSAULT', 'HEAVY'] },
      { name: 'Plasma incinerator — supercharge', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['ASSAULT', 'HAZARDOUS', 'HEAVY'] },
      { name: 'Pyreblaster', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: 0, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Superfrag rocket launcher', type: 'ranged', range: '48"', A: 'D6+1', BS: '4+', S: 5, AP: 0, D: 1, keywords: ['BLAST', 'HEAVY'] },
      { name: 'Astartes chainsword', type: 'melee', A: 4, WS: '4+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Power fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
      { name: 'Thunder hammer', type: 'melee', A: 3, WS: '4+', S: 8, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Fortis Doctrines', phase: 'shooting', description: 'Each time a model in this unit makes an attack that targets a unit that is below its Starting Strength, add 1 to the Hit roll. If that attack targets a unit that is Below Half-strength, add 1 to the Hit roll and add 1 to the Wound roll instead.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['watchMaster', 'watchCaptainArtemis'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'KILL TEAM', 'FORTIS KILL TEAM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  spectrusKillTeam: {
    id: 'spectrusKillTeam', name: 'Spectrus Kill Team', category: 'infantry',
    points: 180,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1, InvSv: null,
    models: 10,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Bolt sniper rifle', type: 'ranged', range: '36"', A: 1, BS: '3+', S: 5, AP: -2, D: 3, keywords: ['HEAVY', 'PRECISION'] },
      { name: 'Deathwatch occulus bolt carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 5, AP: -1, D: 1, keywords: ['ASSAULT', 'IGNORES COVER', 'LETHAL HITS'] },
      { name: 'Deathwatch marksman bolt carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 5, AP: -1, D: 1, keywords: ['HEAVY', 'LETHAL HITS'] },
      { name: 'Instigator bolt carbine', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 4, AP: -2, D: 2, keywords: ['HEAVY'] },
      { name: 'Las fusil', type: 'ranged', range: '36"', A: 1, BS: '3+', S: 9, AP: -3, D: 'D6', keywords: ['HEAVY'] },
      { name: 'Special-issue bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL', 'PRECISION'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Combat knife', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: ['PRECISION'] },
      { name: 'Paired combat blades', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1, keywords: ['SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'Infiltrators', phase: 'movement', description: 'During the Declare Battle Formations step, if every model in this unit has this ability, you can set up this unit anywhere on the battlefield that is more than 9" horizontally away from the enemy deployment zone and all enemy models.' },
      { name: 'Scouts 6"', phase: 'movement', description: 'Before the first turn begins, this unit can make a Normal move of up to 6" (cannot move within Engagement Range of any enemy models).' },
      { name: 'Spectrus Doctrines', phase: 'movement', description: "At the end of your opponent's turn, if this unit is more than 6\" away from all enemy units, you can remove this unit from the battlefield and place it into Strategic Reserves." },
      { name: 'Helix Gauntlet (Wargear)', phase: 'any', description: 'Models in the bearer\'s unit have the Feel No Pain 6+ ability.' },
      { name: 'Infiltrator Comms Array (Wargear)', phase: 'any', description: 'Each time you target the bearer\'s unit with a Stratagem, roll one D6: on a 5+, you gain 1CP.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'SMOKE', 'GRENADES', 'IMPERIUM', 'PHOBOS', 'KILL TEAM', 'SPECTRUS KILL TEAM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  indomitorKillTeam: {
    id: 'indomitorKillTeam', name: 'Indomitor Kill Team', category: 'infantry',
    points: 265,
    M: '5"', T: 6, Sv: '3+', W: 3, Ld: '6+', OC: 1, InvSv: null,
    models: 10,
    weapons: [
      { name: 'Auto boltstorm gauntlets', type: 'ranged', range: '18"', A: 3, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['TWIN-LINKED'] },
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Deathwatch heavy bolt rifle', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['ASSAULT', 'HEAVY', 'LETHAL HITS'] },
      { name: 'Deathwatch heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -2, D: 3, keywords: ['ASSAULT', 'HEAVY', 'LETHAL HITS', 'SUSTAINED HITS 1'] },
      { name: 'Flamestorm gauntlets', type: 'ranged', range: '12"', A: 'D6+1', BS: 'N/A', S: 4, AP: 0, D: 1, keywords: ['IGNORES COVER', 'TORRENT', 'TWIN-LINKED'] },
      { name: 'Fragstorm grenade launcher', type: 'ranged', range: '18"', A: 'D6', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Melta rifle', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '4+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Twin power fists', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Indomitor Doctrines', phase: 'shooting', description: 'Each time a model in this unit makes an attack against the closest eligible target, add 2 to the Strength characteristic of that attack. Each time a model in this unit makes a melee attack following a Charge move, add 2 to the Strength characteristic of that attack.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'GRAVIS', 'KILL TEAM', 'INDOMITOR KILL TEAM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  talonstrikeKillTeam: {
    id: 'talonstrikeKillTeam', name: 'Talonstrike Kill Team', category: 'infantry',
    points: 275,
    M: '12"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1, InvSv: null,
    models: 10,
    weapons: [
      { name: 'Assault bolters', type: 'ranged', range: '18"', A: 3, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['ASSAULT', 'PISTOL', 'SUSTAINED HITS 2', 'TWIN-LINKED'] },
      { name: 'Hand flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 3, AP: 0, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma exterminators — standard', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 7, AP: -2, D: 2, keywords: ['ASSAULT', 'PISTOL', 'TWIN-LINKED'] },
      { name: 'Plasma exterminators — supercharge', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 8, AP: -3, D: 3, keywords: ['ASSAULT', 'HAZARDOUS', 'PISTOL', 'TWIN-LINKED'] },
      { name: 'Plasma pistol — standard', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma pistol — supercharge', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Power fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Talonstrike Doctrines', phase: 'any', description: 'Each time this unit is set up on the battlefield, until the end of the turn: improve the Armour Penetration characteristic of weapons equipped by models in this unit by 1, and melee weapons equipped by models in this unit have the [LANCE] ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'FLY', 'JUMP PACK', 'GRENADES', 'IMPERIUM', 'KILL TEAM', 'TALONSTRIKE KILL TEAM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

  // ── VEHICLES ───────────────────────────────────────────────────────

  corvusBlackstar: {
    id: 'corvusBlackstar', name: 'Corvus Blackstar', category: 'vehicle',
    points: 180,
    M: '20"+"', T: 10, Sv: '3+', W: 14, Ld: '6+', OC: 0, InvSv: null,
    models: 1,
    weapons: [
      { name: 'Blackstar rocket launcher', type: 'ranged', range: '30"', A: 'D6+1', BS: '3+', S: 5, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Hurricane bolter', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 6', 'TWIN-LINKED'] },
      { name: 'Stormstrike missile launcher', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 10, AP: -2, D: 3, keywords: [] },
      { name: 'Twin assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Twin lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Hover', phase: 'movement', description: 'At the start of the first battle round, before the first turn begins, you can change this model\'s base movement to 20" and remove the AIRCRAFT keyword from this model for the rest of the battle.' },
      { name: 'Stealth', phase: 'shooting', description: 'Each time a ranged attack targets this unit, subtract 1 from the Hit roll.' },
      { name: 'Blackstar Cluster Launcher', phase: 'movement', description: 'Each time this model ends a Normal move, you can select one enemy unit it moved over during that move and roll six D6: for each 5+, that unit suffers 1 mortal wound.' },
      { name: 'Auspex Array (Wargear)', phase: 'shooting', description: 'Ranged weapons equipped by the bearer have the [IGNORES COVER] ability.' },
      { name: 'Infernum Halo-launcher (Wargear)', phase: 'any', description: 'The bearer has the SMOKE keyword.' },
      { name: 'Damaged: 1-5 Wounds Remaining', phase: 'any', description: 'While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'AIRCRAFT', 'FLY', 'IMPERIUM', 'TRANSPORT', 'CORVUS BLACKSTAR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'DEATHWATCH'],
  },

}

export const deathwatchUnitList = Object.values(deathwatchUnits)

export const deathwatchUnitsByCategory = {
  epicHero:  deathwatchUnitList.filter(u => u.category === 'epicHero'),
  character: deathwatchUnitList.filter(u => u.category === 'character'),
  battleline: deathwatchUnitList.filter(u => u.category === 'battleline'),
  infantry:  deathwatchUnitList.filter(u => u.category === 'infantry'),
  cavalry:   deathwatchUnitList.filter(u => u.category === 'cavalry'),
  monster:   deathwatchUnitList.filter(u => u.category === 'monster'),
  vehicle:   deathwatchUnitList.filter(u => u.category === 'vehicle'),
}
