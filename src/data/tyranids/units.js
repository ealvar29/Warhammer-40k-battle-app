export const tyranidUnits = {
  // ── CHARACTERS ─────────────────────────────────────────────────────
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
      { name: 'Hive Commander', phase: 'command', description: 'At the start of your Command phase, gain 1 CP.' },
      { name: 'Malign Presence', phase: 'any', description: 'Enemy Stratagems that target units within 12" of this model cost 1 additional CP.' },
      { name: 'Domination', phase: 'any', description: 'Friendly TYRANIDS units within 9" of this model are always in Synapse range.' },
      { name: 'Shadow in the Warp', phase: 'command', description: 'Friendly TYRANIDS units within 12" can re-roll Battleshock tests.' },
    ],
    isLeader: true,
    leadsUnits: ['tyranidWarriors'],
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'SYNAPSE', 'PSYKER', 'HIVE TYRANT', 'EPIC HERO', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

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
      { name: 'Shadow in the Warp', phase: 'command', description: 'Friendly TYRANIDS units within 12" can re-roll Battleshock tests.' },
      { name: 'Paroxysm', phase: 'shooting', description: 'Select one enemy unit within 12" visible to this model. Roll D6: 1 = this model suffers D3 mortal wounds; 2+ = until start of your next turn, subtract 1 from the Attacks characteristic of that enemy unit.' },
      { name: 'Synaptic Imperative', phase: 'command', description: 'At the start of your Command phase, select one: Instinctive Behaviour, Galvanic Feedback, or Death Frenzy.' },
    ],
    isLeader: true,
    leadsUnits: ['tyrantGuard', 'tyranidWarriors'],
    keywords: ['MONSTER', 'CHARACTER', 'SYNAPSE', 'HIVE TYRANT', 'TYRANIDS'],
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
      { name: 'Stranglethorn Cannon', type: 'ranged', range: '36"', A: 'D6+1', BS: '2+', S: 7, AP: -1, D: 2, keywords: ['BLAST'] },
    ],
    abilities: [
      { name: 'Shadow in the Warp', phase: 'command', description: 'Friendly TYRANIDS units within 12" can re-roll Battleshock tests.' },
      { name: 'Swooping Dive', phase: 'charge', description: 'Add 2 to Charge rolls. After this model ends a Charge move, roll D6 for each enemy unit in Engagement Range: on a 2+, that unit suffers D3 mortal wounds.' },
      { name: 'Synaptic Imperative', phase: 'command', description: 'At the start of your Command phase, select one: Instinctive Behaviour, Galvanic Feedback, or Death Frenzy.' },
    ],
    isLeader: true,
    leadsUnits: ['tyrantGuard', 'tyranidWarriors'],
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'SYNAPSE', 'HIVE TYRANT', 'TYRANIDS'],
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
      { name: 'Psychic Scream', phase: 'command', description: 'At the start of your Command phase, roll one D6 for each enemy unit within 12". On a 4+, that unit suffers 1 mortal wound. On a 6, it suffers D3 mortal wounds instead.' },
      { name: 'Hive Node', phase: 'any', description: 'The SYNAPSE range of all friendly SYNAPSE units within 6" of this model is increased by 6".' },
    ],
    isLeader: true,
    leadsUnits: ['tyranidWarriors', 'neurogaunts'],
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'SYNAPSE', 'PSYKER', 'NEUROTYRANT', 'TYRANIDS'],
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
      { name: 'Vicious Insight', phase: 'fight', description: 'While this model is leading a unit, melee weapons used by models in that unit gain the [DEVASTATING WOUNDS] ability.' },
      { name: 'Hypnotic Gaze', phase: 'fight', description: 'Enemy units within Engagement Range of this model subtract 1 from their Hit rolls.' },
    ],
    isLeader: true,
    leadsUnits: ['genestealers'],
    keywords: ['INFANTRY', 'CHARACTER', 'GENESTEALER', 'SYNAPSE', 'BROODLORD', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tyranidPrime: {
    id: 'tyranidPrime', name: 'Tyranid Prime', category: 'character',
    powerRating: 4, points: 65,
    M: '10"', T: 5, Sv: '3+', W: 6, Ld: '7+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Rending Claws', type: 'melee', A: 4, WS: '2+', S: 8, AP: -2, D: 3 },
      { name: 'Lash Whip', type: 'melee', A: 8, WS: '2+', S: 4, AP: -2, D: 1, keywords: ['EXTRA ATTACKS'] },
      { name: 'Scything Talons', type: 'melee', A: 6, WS: '2+', S: 6, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Alpha Warrior', phase: 'fight', description: 'While this model is leading a unit, melee weapons used by models in that unit gain [SUSTAINED HITS 1].' },
      { name: 'Death Blow', phase: 'fight', description: 'When this model is destroyed, roll D6: on a 4+ it can fight before being removed.' },
    ],
    isLeader: true,
    leadsUnits: ['tyranidWarriors'],
    keywords: ['INFANTRY', 'CHARACTER', 'TYRANID PRIME', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  oldOneEye: {
    id: 'oldOneEye', name: 'Old One Eye', category: 'epicHero',
    powerRating: 9, points: 145,
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '8+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Crushing Claws', type: 'melee', A: 3, WS: '3+', S: 14, AP: -3, D: 'D6+1' },
      { name: 'Monstrous Scything Talons', type: 'melee', A: 8, WS: '3+', S: 8, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Regeneration', phase: 'command', description: 'At the start of your Command phase, roll one D6: on a 2+, this model regains up to D3 lost wounds.' },
      { name: 'Living Battering Ram', phase: 'charge', description: 'After this model finishes a Charge move, roll one D6 for each enemy unit within Engagement Range: on a 2+, that unit suffers D3 mortal wounds.' },
      { name: 'Enraged', phase: 'fight', description: 'While this model has lost one or more wounds, add 2 to the Attacks characteristic of its Monstrous Scything Talons.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['MONSTER', 'CHARACTER', 'EPIC HERO', 'CARNIFEX', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  deathleaper: {
    id: 'deathleaper', name: 'Deathleaper', category: 'epicHero',
    powerRating: 5, points: 65,
    M: '8"', T: 5, Sv: '4+', W: 6, Ld: '7+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Flesh Hooks', type: 'ranged', range: '6"', A: 4, BS: '4+', S: 4, AP: 0, D: 1 },
      { name: 'Hooked Limbs', type: 'melee', A: 8, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['PRECISION'] },
    ],
    abilities: [
      { name: 'Chameleonic Skin', phase: 'any', description: 'This model has the Stealth and Lone Operative abilities.' },
      { name: 'It\'s Behind You!', phase: 'command', description: 'At the start of each Command phase, select one enemy CHARACTER within 12". Until the start of your next Command phase, subtract 1 from that model\'s Leadership and Objective Control characteristics.' },
      { name: 'Pheromone Trail', phase: 'movement', description: 'Once per battle, at the start of your Movement phase, you can select one friendly TYRANIDS unit in Strategic Reserves. That unit can immediately arrive as if it were the Reinforcements step.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'LICTOR', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── GUARD / ELITE ──────────────────────────────────────────────────
  tyrantGuard: {
    id: 'tyrantGuard', name: 'Tyrant Guard', category: 'infantry',
    powerRating: 5, points: 80,
    M: '8"', T: 5, Sv: '3+', W: 3, Ld: '8+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Rending Claws and Talons', type: 'melee', A: 3, WS: '2+', S: 6, AP: -2, D: 2 },
    ],
    abilities: [
      { name: 'Guardian Organism', phase: 'any', description: 'While a CHARACTER model is leading this unit, that model has the Feel No Pain 5+ ability.' },
      { name: 'Bodyguard', phase: 'any', description: 'While a CHARACTER model is leading this unit, each time an attack targets that CHARACTER, if a model in this unit is within 3" of it, roll one D6: on a 2+, redirect that attack to this unit instead.' },
    ],
    isLeader: false,
    eligibleLeaders: ['hiveTyrant', 'wingedHiveTyrant'],
    keywords: ['INFANTRY', 'TYRANT GUARD', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  hiveGuard: {
    id: 'hiveGuard', name: 'Hive Guard', category: 'infantry',
    powerRating: 5, points: 60,
    M: '6"', T: 7, Sv: '3+', W: 3, Ld: '8+', OC: 1,
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Impaler Cannon', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 8, AP: -2, D: 2, keywords: ['HEAVY'] },
      { name: 'Shieldgland Cannon', type: 'ranged', range: '18"', A: 'D6', BS: '4+', S: 6, AP: -1, D: 1, keywords: ['ASSAULT'] },
      { name: 'Rending Claws', type: 'melee', A: 1, WS: '3+', S: 5, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Synaptic Relay', phase: 'shooting', description: 'This unit does not require line of sight to shoot with Impaler Cannons while within Synapse range.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'HIVE GUARD', 'TYRANIDS'],
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
      { name: 'Chitinous Claws and Teeth', type: 'melee', A: 1, WS: '4+', S: 3, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Endless Swarm', phase: 'command', description: 'Once per battle, at the end of your opponent\'s Shooting phase, if this unit has been destroyed, you can set it back up at starting strength anywhere more than 9" from enemy models.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'BATTLELINE', 'TERMAGANTS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  hormagaunts: {
    id: 'hormagaunts', name: 'Hormagaunts', category: 'battleline',
    powerRating: 3, points: 65,
    M: '10"', T: 3, Sv: '5+', W: 1, Ld: '8+', OC: 2,
    models: 10, minModels: 10, maxModels: 20,
    weapons: [
      { name: 'Hormagaunt Talons', type: 'melee', A: 3, WS: '4+', S: 3, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Bounding Leap', phase: 'charge', description: 'Add 1 to Charge rolls made for this unit.' },
      { name: 'Metabolic Overdrive', phase: 'movement', description: 'This unit can Advance and still charge this turn.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'BATTLELINE', 'HORMAGAUNTS', 'TYRANIDS'],
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
      { name: 'Blinding Venom', phase: 'fight', description: 'Each time this unit fights, after it has resolved all of its attacks, roll D6 for each enemy unit in Engagement Range: on a 4+, until start of your next turn, that enemy unit cannot fire Overwatch.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'BATTLELINE', 'FLY', 'GARGOYLES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  tyranidWarriors: {
    id: 'tyranidWarriors', name: 'Tyranid Warriors', category: 'battleline',
    powerRating: 5, points: 90,
    M: '8"', T: 5, Sv: '3+', W: 4, Ld: '8+', OC: 1,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Devourer', type: 'ranged', range: '18"', A: 2, BS: '4+', S: 4, AP: 0, D: 1 },
      { name: 'Venom Cannon', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 7, AP: -1, D: 2 },
      { name: 'Bonesword', type: 'melee', A: 4, WS: '2+', S: 7, AP: -2, D: 2 },
      { name: 'Scything Talons', type: 'melee', A: 3, WS: '2+', S: 5, AP: -1, D: 1 },
      { name: 'Lash Whip', type: 'melee', A: 4, WS: '2+', S: 4, AP: -2, D: 1, keywords: ['EXTRA ATTACKS'] },
    ],
    abilities: [
      { name: 'Synapse', phase: 'any', description: 'Friendly TYRANIDS units within 6" of this unit automatically pass Battleshock tests.' },
    ],
    isLeader: false,
    eligibleLeaders: ['hiveTyrant', 'wingedHiveTyrant', 'neurotyrant', 'tyranidPrime', 'swarmlord'],
    keywords: ['INFANTRY', 'BATTLELINE', 'SYNAPSE', 'TYRANID WARRIORS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── OTHER INFANTRY ──────────────────────────────────────────────────
  genestealers: {
    id: 'genestealers', name: 'Genestealers', category: 'infantry',
    powerRating: 5, points: 80,
    M: '8"', T: 3, Sv: '5+', W: 1, Ld: '7+', OC: 1,
    models: 5, minModels: 5, maxModels: 20,
    weapons: [
      { name: 'Genestealer Claws and Talons', type: 'melee', A: 4, WS: '2+', S: 4, AP: -1, D: 1 },
    ],
    abilities: [
      { name: 'Lightning Reflexes', phase: 'any', description: 'Models in this unit have a 4+ invulnerable save.' },
      { name: 'Infiltrators', phase: 'movement', description: 'During deployment, you can set up this unit anywhere on the battlefield more than 9" from the enemy deployment zone and more than 9" from all enemy models.' },
    ],
    isLeader: false,
    eligibleLeaders: ['broodlord'],
    keywords: ['INFANTRY', 'GENESTEALER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  vonRyansLeapers: {
    id: 'vonRyansLeapers', name: "Von Ryan's Leapers", category: 'infantry',
    powerRating: 4, points: 65,
    M: '12"', T: 3, Sv: '4+', W: 1, Ld: '8+', OC: 2,
    models: 5, minModels: 5, maxModels: 10,
    weapons: [
      { name: 'Leaper Talons', type: 'melee', A: 2, WS: '4+', S: 3, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Pounce', phase: 'charge', description: 'Can declare a charge even if Advanced. Add 2 to Charge rolls if it Advanced.' },
      { name: 'Withdraw', phase: 'fight', description: 'After an enemy unit has fought, if this unit is within Engagement Range, it can make a Normal Move of up to 3" even though it is in Engagement Range.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', "VON RYAN'S LEAPERS", 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  neurogaunts: {
    id: 'neurogaunts', name: 'Neurogaunts', category: 'infantry',
    powerRating: 2, points: 50,
    M: '6"', T: 3, Sv: '5+', W: 1, Ld: '8+', OC: 2,
    models: 10, minModels: 10, maxModels: 20,
    weapons: [
      { name: 'Neurogaunt Claws and Teeth', type: 'melee', A: 1, WS: '4+', S: 3, AP: 0, D: 1, keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Synaptic Interlock', phase: 'any', description: 'While this unit is within 6" of a friendly SYNAPSE model, it has the Objective Secured ability.' },
    ],
    isLeader: false,
    eligibleLeaders: ['neurotyrant'],
    keywords: ['INFANTRY', 'NEUROGAUNTS', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  lictors: {
    id: 'lictors', name: 'Lictors', category: 'infantry',
    powerRating: 4, points: 60,
    M: '8"', T: 6, Sv: '3+', W: 6, Ld: '7+', OC: 1,
    models: 1, minModels: 1, maxModels: 3,
    weapons: [
      { name: 'Flesh Hooks', type: 'ranged', range: '6"', A: 4, BS: '4+', S: 4, AP: 0, D: 1 },
      { name: 'Lictor Claws and Talons', type: 'melee', A: 6, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['PRECISION'] },
    ],
    abilities: [
      { name: 'Chameleonic Skin', phase: 'any', description: 'This model has the Stealth and Lone Operative abilities.' },
      { name: 'Ambush Predator', phase: 'movement', description: 'During deployment, set up this unit anywhere on the battlefield more than 9" from all enemy models. In the first battle round, this unit is not visible to enemy units more than 12" away.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'LICTOR', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  zoanthropes: {
    id: 'zoanthropes', name: 'Zoanthropes', category: 'infantry',
    powerRating: 5, points: 80,
    M: '6"', T: 4, Sv: '4+', W: 2, Ld: '8+', OC: 1, InvSv: '4+',
    models: 3, minModels: 3, maxModels: 6,
    weapons: [
      { name: 'Warp Lance', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 8, AP: -2, D: 2, keywords: ['PSYCHIC'] },
      { name: 'Warp Blast', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -3, D: 'D3', keywords: ['PSYCHIC', 'BLAST'] },
      { name: 'Claws and Fangs', type: 'melee', A: 2, WS: '4+', S: 4, AP: 0, D: 1 },
    ],
    abilities: [
      { name: 'Synapse', phase: 'any', description: 'Friendly TYRANIDS units within 6" of this unit automatically pass Battleshock tests.' },
      { name: 'Warp Field', phase: 'any', description: 'Models in this unit have a 4+ invulnerable save.' },
      { name: 'Warp Surge', phase: 'shooting', description: 'Once per phase, after this unit makes ranged attacks, if it destroyed one or more enemy models, it can immediately make one additional ranged attack targeting the same unit.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'PSYKER', 'SYNAPSE', 'ZOANTHROPES', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  // ── MONSTERS ────────────────────────────────────────────────────────
  carnifex: {
    id: 'carnifex', name: 'Carnifex', category: 'monster',
    powerRating: 8, points: 130,
    M: '8"', T: 9, Sv: '2+', W: 9, Ld: '8+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Crushing Claws', type: 'melee', A: 3, WS: '3+', S: 14, AP: -3, D: 'D6+1' },
      { name: 'Monstrous Scything Talons', type: 'melee', A: 6, WS: '3+', S: 8, AP: -2, D: 2 },
      { name: 'Heavy Venom Cannon', type: 'ranged', range: '36"', A: 'D3', BS: '2+', S: 9, AP: -2, D: 3, keywords: ['BLAST'] },
      { name: 'Stranglethorn Cannon', type: 'ranged', range: '36"', A: 'D6+1', BS: '2+', S: 7, AP: -1, D: 2, keywords: ['BLAST'] },
    ],
    abilities: [
      { name: 'Death Throes', phase: 'any', description: 'When this model is destroyed, roll D6: on a 4+, the nearest enemy unit within 6" suffers D3 mortal wounds.' },
      { name: 'Living Battering Ram', phase: 'charge', description: 'After this model finishes a Charge move, roll one D6 for each enemy unit within Engagement Range: on a 2+, that unit suffers D3 mortal wounds.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'CARNIFEX', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  screamerKiller: {
    id: 'screamerKiller', name: 'Screamer-Killer', category: 'monster',
    powerRating: 7, points: 130,
    M: '8"', T: 9, Sv: '2+', W: 9, Ld: '8+', OC: 3, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Clawed Limbs', type: 'melee', A: 4, WS: '3+', S: 8, AP: -2, D: 3 },
      { name: 'Shrieker Cannon', type: 'ranged', range: '24"', A: '2D6', BS: 'N/A', S: 6, AP: -1, D: 2, keywords: ['IGNORES COVER', 'TORRENT'] },
    ],
    abilities: [
      { name: 'Spine Banks', phase: 'fight', description: 'Each time an enemy model within Engagement Range targets this model, roll D6: on a 4+, that model suffers 1 mortal wound after its attacks have been resolved.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'CARNIFEX', 'SCREAMER-KILLER', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },

  trygon: {
    id: 'trygon', name: 'Trygon', category: 'monster',
    powerRating: 9, points: 140,
    M: '8"', T: 9, Sv: '2+', W: 10, Ld: '8+', OC: 3, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Massive Scything Talons', type: 'melee', A: 6, WS: '3+', S: 8, AP: -2, D: 2 },
      { name: 'Monstrous Rending Claws', type: 'melee', A: 2, WS: '3+', S: 14, AP: -3, D: 'D6+1' },
    ],
    abilities: [
      { name: 'Subterranean Assault', phase: 'movement', description: 'This unit can be set up in Reserves underground. When it arrives, set it up anywhere more than 9" from enemy models. One friendly TYRANIDS unit in Reserves can emerge from the tunnel.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MONSTER', 'TRYGON', 'TYRANIDS'],
    factionKeywords: ['TYRANIDS'],
  },
}

export const tyranidUnitList = Object.values(tyranidUnits)

export const tyranidUnitsByCategory = {
  epicHero: tyranidUnitList.filter(u => u.category === 'epicHero'),
  character: tyranidUnitList.filter(u => u.category === 'character'),
  battleline: tyranidUnitList.filter(u => u.category === 'battleline'),
  infantry: tyranidUnitList.filter(u => u.category === 'infantry'),
  monster: tyranidUnitList.filter(u => u.category === 'monster'),
}
