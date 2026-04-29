// Thousand Sons units — 10th Edition (Wahapedia, April 2026)
// Sources: https://wahapedia.ru/wh40k10ed/factions/thousand-sons/

export const thousandSonsUnits = {

  // ── EPIC HEROES ────────────────────────────────────────────────────

  magnusTheRed: {
    id: 'magnusTheRed', name: 'Magnus the Red', category: 'epicHero',
    powerRating: 21, points: 435,
    M: '14"', T: 11, Sv: '2+', W: 16, Ld: '5+', OC: 6, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Gaze of Magnus', type: 'ranged', range: '24"', A: '3D3', BS: '2+', S: 11, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: "Tzeentch's Firestorm", type: 'ranged', range: '24"', A: 'D6+3', BS: '2+', S: 6, AP: -1, D: 2, keywords: ['BLAST', 'IGNORES COVER', 'PSYCHIC'] },
      { name: 'Blade of Magnus — Strike', type: 'melee', A: 7, WS: '2+', S: 16, AP: -3, D: 3, keywords: ['DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Blade of Magnus — Sweep', type: 'melee', A: 14, WS: '2+', S: 8, AP: -1, D: 2, keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Supreme Commander', phase: 'any', description: 'If this model is in your army, it must be your WARLORD.' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Impossible Form (Psychic)', phase: 'any', description: 'Each time an attack is made against this model (excluding Psychic Attacks), subtract 1 from the Damage characteristic of that attack.' },
      { name: 'Treason of Tzeentch (Psychic)', phase: 'shooting', description: "At the start of your opponent's Shooting phase, select one enemy unit within 24\" of this model. Until the end of that phase, ranged weapons equipped by models in that unit gain the [HAZARDOUS] ability." },
      { name: 'Time Flux (Aura, Psychic)', phase: 'movement', description: 'While a friendly THOUSAND SONS unit is within 6" of this model, add 2" to the Move characteristic of models in that unit.' },
      { name: 'Unearthly Power', phase: 'command', description: 'At the start of each battle round, select one Crimson King ability. This model has that ability until the start of the next battle round.' },
      { name: 'Lord of the Planet of the Sorcerers (Psychic)', phase: 'shooting', description: 'This model can attempt up to two Rituals per turn instead of one. Add 2 to Psychic test results for Rituals this model attempts.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['MONSTER', 'CHARACTER', 'EPIC HERO', 'FLY', 'DAEMON', 'PRIMARCH', 'PSYKER', 'CHAOS', 'TZEENTCH', 'MAGNUS THE RED'],
    factionKeywords: ['THOUSAND SONS'],
  },

  ahriman: {
    id: 'ahriman', name: 'Ahriman', category: 'epicHero',
    powerRating: 5, points: 100,
    M: '10"', T: 4, Sv: '3+', W: 6, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Inferno bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Transmogrifying Blast', type: 'ranged', range: '18"', A: 'D6+1', BS: '2+', S: 6, AP: -1, D: 'D3', keywords: ['BLAST', 'PSYCHIC'] },
      { name: 'Black Staff of Ahriman', type: 'melee', A: 5, WS: '2+', S: 7, AP: -1, D: 3, keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Scryer of Fates (Psychic)', phase: 'movement', description: 'After deployment, you can redeploy up to three THOUSAND SONS units; they may be placed into Strategic Reserves regardless of any limits on the number of units in Strategic Reserves.' },
      { name: 'Arch-Sorcerer of Tzeentch (Psychic)', phase: 'shooting', description: 'Add 1 to the Psychic test result for each Ritual this model attempts.' },
    ],
    isLeader: true,
    leadsUnits: ['rubricMarines', 'tzaangorEnlightened', 'tzaangorEnlightenedBows'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'MOUNTED', 'CHARACTER', 'EPIC HERO', 'FLY', 'PSYKER', 'CHAOS', 'TZEENTCH', 'AHRIMAN'],
    factionKeywords: ['THOUSAND SONS'],
  },

  // ── CHARACTERS ─────────────────────────────────────────────────────

  exaltedSorcerer: {
    id: 'exaltedSorcerer', name: 'Exalted Sorcerer', category: 'character',
    powerRating: 4, points: 80,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Inferno bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Astral Blast', type: 'ranged', range: '18"', A: 'D6', BS: '2+', S: 6, AP: -2, D: 'D3', keywords: ['BLAST', 'DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Force Weapon', type: 'melee', A: 5, WS: '2+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Prosperine Khopesh', type: 'melee', A: 4, WS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Arcane Shield (Psychic)', phase: 'any', description: 'While this model is leading a unit, models in that unit have a 4+ invulnerable save.' },
      { name: 'Rebind Rubricae (Psychic)', phase: 'command', description: 'In your Command phase, roll one D6: on a 3+, you can return one destroyed Bodyguard model to the unit this model is leading.' },
    ],
    isLeader: true,
    leadsUnits: ['rubricMarines'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'PSYKER', 'CHAOS', 'TZEENTCH', 'EXALTED SORCERER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  exaltedSorcererDisc: {
    id: 'exaltedSorcererDisc', name: 'Exalted Sorcerer on Disc of Tzeentch', category: 'character',
    powerRating: 5, points: 100,
    M: '10"', T: 4, Sv: '3+', W: 6, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Inferno bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Arcane Fire', type: 'ranged', range: '18"', A: 'D6', BS: 'N/A', S: 6, AP: -2, D: 'D3', keywords: ['IGNORES COVER', 'PSYCHIC', 'TORRENT'] },
      { name: 'Force Weapon', type: 'melee', A: 5, WS: '2+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Prosperine Khopesh', type: 'melee', A: 4, WS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Illusions of Tzeentch (Psychic)', phase: 'any', description: 'While this model is leading a unit, that unit can only be selected as the target of a ranged attack if the attacking model is within 18".' },
      { name: 'Binding Tendrils (Psychic)', phase: 'shooting', description: 'After this model has shot with Arcane Fire and hit an enemy INFANTRY unit, until the start of your next turn, subtract 2" from the Move characteristic of models in that unit and subtract 2 from Charge rolls made for that unit.' },
    ],
    isLeader: true,
    leadsUnits: ['rubricMarines', 'tzaangorEnlightened', 'tzaangorEnlightenedBows'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'MOUNTED', 'CHARACTER', 'FLY', 'GRENADES', 'PSYKER', 'CHAOS', 'TZEENTCH', 'EXALTED SORCERER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  infernalMaster: {
    id: 'infernalMaster', name: 'Infernal Master', category: 'character',
    powerRating: 4, points: 95,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Inferno bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Fires of the Abyss — Witchfire', type: 'ranged', range: '18"', A: 'D6', BS: 'N/A', S: 6, AP: -2, D: 1, keywords: ['PSYCHIC', 'TORRENT'] },
      { name: 'Fires of the Abyss — Focused Witchfire', type: 'ranged', range: '18"', A: '2D6', BS: 'N/A', S: 6, AP: -2, D: 1, keywords: ['HAZARDOUS', 'PSYCHIC', 'TORRENT'] },
      { name: 'Force Weapon', type: 'melee', A: 4, WS: '3+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Malefic Maelstrom (Psychic)', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.' },
      { name: 'Glimpse of Eternity (Psychic)', phase: 'any', description: 'Once per turn, you can change the result of one Hit roll, one Wound roll or one saving throw made for this model to an unmodified 6.' },
    ],
    isLeader: true,
    leadsUnits: ['rubricMarines'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'PSYKER', 'CHAOS', 'TZEENTCH', 'INFERNAL MASTER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  sorcerer: {
    id: 'sorcerer', name: 'Sorcerer', category: 'character',
    powerRating: 3, points: 80,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Inferno bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Pandaemonic Delusion', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 5, AP: -1, D: 1, keywords: ['PSYCHIC', 'SUSTAINED HITS 3'] },
      { name: 'Force Weapon', type: 'melee', A: 4, WS: '3+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Prosperine Khopesh', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Empyric Guidance (Psychic)', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Twisted Sorceries (Psychic)', phase: 'any', description: 'Once per battle, in your Shooting or Fight phase, until the end of that phase, add 3 to the Attacks and Strength characteristics of Psychic weapons equipped by models in this model\'s unit.' },
    ],
    isLeader: true,
    leadsUnits: ['rubricMarines'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'PSYKER', 'GRENADES', 'CHAOS', 'TZEENTCH', 'SORCERER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  sorcererInTerminatorArmour: {
    id: 'sorcererInTerminatorArmour', name: 'Sorcerer in Terminator Armour', category: 'character',
    powerRating: 4, points: 85,
    M: '5"', T: 5, Sv: '2+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Gaze of Hate', type: 'ranged', range: '18"', A: 3, BS: '3+', S: 4, AP: -3, D: 2, keywords: ['ANTI-MONSTER 4+', 'ANTI-VEHICLE 4+', 'DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Inferno Combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Inferno Combi-weapon', type: 'ranged', range: '24"', A: 1, BS: '4+', S: 4, AP: -2, D: 1, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'] },
      { name: 'Force Weapon', type: 'melee', A: 5, WS: '3+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Empyric Guidance (Psychic)', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Marked by Fate (Psychic)', phase: 'shooting', description: 'At the start of your Shooting phase, select one enemy unit that is visible to this model. Until the end of the phase, each time a model in this model\'s unit makes an attack that targets that enemy unit, add 1 to the Hit roll.' },
    ],
    isLeader: true,
    leadsUnits: ['scarabOccultTerminators'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'PSYKER', 'TERMINATOR', 'CHAOS', 'TZEENTCH', 'SORCERER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  tzaangorShaman: {
    id: 'tzaangorShaman', name: 'Tzaangor Shaman', category: 'character',
    powerRating: 3, points: 60,
    M: '10"', T: 4, Sv: '5+', W: 4, Ld: '7+', OC: 2, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Baleful Devolution', type: 'ranged', range: '18"', A: 'D6', BS: '3+', S: 9, AP: 0, D: 1, keywords: ['BLAST', 'DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Force Stave', type: 'melee', A: 3, WS: '3+', S: 5, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Bestial Prophet', phase: 'any', description: 'While this model is leading a unit, add 1 to Hit rolls for models in that unit.' },
      { name: 'Sacrificial Blessing', phase: 'any', description: 'In your Shooting or Fight phase, when this model is selected to shoot or fight, it can destroy one Bodyguard model in its unit to add D3 to the Attacks and Strength characteristics of Psychic weapons it is equipped with until the end of that phase.' },
    ],
    isLeader: true,
    leadsUnits: ['tzaangorEnlightened', 'tzaangorEnlightenedBows', 'tzaangors'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'MOUNTED', 'CHARACTER', 'FLY', 'PSYKER', 'CHAOS', 'TZEENTCH', 'MUTANT', 'TZAANGOR SHAMAN'],
    factionKeywords: ['THOUSAND SONS'],
  },

  daemonPrinceOfTzeentch: {
    id: 'daemonPrinceOfTzeentch', name: 'Daemon Prince of Tzeentch', category: 'character',
    powerRating: 9, points: 180,
    M: '9"', T: 10, Sv: '2+', W: 10, Ld: '6+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Dark Blessing', type: 'ranged', range: '24"', A: 9, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['IGNORES COVER', 'PSYCHIC', 'SUSTAINED HITS 1'] },
      { name: 'Infernal Cannon', type: 'ranged', range: '24"', A: 3, BS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
      { name: 'Hellforged Weapons — Strike', type: 'melee', A: 6, WS: '2+', S: 8, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Hellforged Weapons — Sweep', type: 'melee', A: 12, WS: '2+', S: 6, AP: -1, D: 1, keywords: ['DEVASTATING WOUNDS', 'PSYCHIC'] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Servile Pawns', phase: 'any', description: 'While this model is within 3" of friendly THOUSAND SONS INFANTRY units, it has the Lone Operative ability.' },
      { name: 'Spirit Snare', phase: 'any', description: 'Each time a friendly THOUSAND SONS PSYKER model with the Cabal of Sorcerers ability is destroyed within 9" of this model, add 1 to Ritual Psychic test results for this model until the end of the battle (to a maximum of +2).' },
      { name: 'Glamour of Tzeentch (Aura, Psychic)', phase: 'any', description: 'Friendly THOUSAND SONS INFANTRY units within 6" of this model have the Stealth ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['MONSTER', 'CHARACTER', 'DAEMON', 'PSYKER', 'CHAOS', 'TZEENTCH', 'DAEMON PRINCE'],
    factionKeywords: ['THOUSAND SONS'],
  },

  daemonPrinceOfTzeentchWithWings: {
    id: 'daemonPrinceOfTzeentchWithWings', name: 'Daemon Prince of Tzeentch with Wings', category: 'character',
    powerRating: 9, points: 170,
    M: '13"', T: 9, Sv: '2+', W: 10, Ld: '6+', OC: 3, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Dark Blessing', type: 'ranged', range: '24"', A: 9, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['IGNORES COVER', 'PSYCHIC', 'SUSTAINED HITS 1'] },
      { name: 'Infernal Cannon', type: 'ranged', range: '24"', A: 3, BS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
      { name: 'Hellforged Weapons — Strike', type: 'melee', A: 6, WS: '2+', S: 8, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Hellforged Weapons — Sweep', type: 'melee', A: 12, WS: '2+', S: 6, AP: -1, D: 1, keywords: ['DEVASTATING WOUNDS', 'PSYCHIC'] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Hunter of Souls', phase: 'any', description: 'Each time this model makes an attack that targets a CHARACTER unit, add 1 to the Hit roll and add 1 to the Wound roll. Each time this model destroys a PSYKER CHARACTER model, this model regains up to 3 lost wounds.' },
      { name: 'Aetherstride (Psychic)', phase: 'movement', description: 'When this model arrives via Deep Strike, it can enhance its Dark Blessing weapon so it has [SUSTAINED HITS D3] until the end of the turn, but it cannot declare a charge this turn.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['MONSTER', 'CHARACTER', 'DAEMON', 'FLY', 'PSYKER', 'CHAOS', 'TZEENTCH', 'DAEMON PRINCE WITH WINGS'],
    factionKeywords: ['THOUSAND SONS'],
  },

  // ── BATTLELINE ─────────────────────────────────────────────────────

  rubricMarines: {
    id: 'rubricMarines', name: 'Rubric Marines', category: 'battleline',
    powerRating: 5, points: 100,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '7+', OC: 2, InvSv: '5+',
    models: 5,
    weapons: [
      { name: 'Inferno bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Inferno boltgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: [] },
      { name: 'Malefic Curse', type: 'ranged', range: '24"', A: 3, BS: '3+', S: 4, AP: -3, D: 1, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Soulreaper cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: -2, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Warpflame pistol', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 3, AP: -1, D: 1, keywords: ['IGNORES COVER', 'PISTOL', 'TORRENT'] },
      { name: 'Warpflamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 4, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Force weapon', type: 'melee', A: 3, WS: '3+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Bringers of Change', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack, re-roll a Wound roll of 1. If that attack targets a unit within range of an objective marker you do not control, you can re-roll the Wound roll instead.' },
      { name: 'Icon of Flame', phase: 'shooting', description: 'If the unit has an Icon of Flame, ranged weapons equipped by models in this unit (excluding CHARACTERS) have the [IGNORES COVER] ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['ahriman', 'exaltedSorcerer', 'exaltedSorcererDisc', 'infernalMaster', 'sorcerer', 'sorcererInTerminatorArmour'],
    keywords: ['INFANTRY', 'BATTLELINE', 'CHAOS', 'TZEENTCH', 'RUBRICAE', 'RUBRIC MARINES'],
    factionKeywords: ['THOUSAND SONS'],
  },

  // ── INFANTRY ───────────────────────────────────────────────────────

  scarabOccultTerminators: {
    id: 'scarabOccultTerminators', name: 'Scarab Occult Terminators', category: 'infantry',
    powerRating: 9, points: 180,
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '7+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Heavy Warpflamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -2, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Hellfyre Missile Rack', type: 'ranged', range: '36"', A: 2, BS: '3+', S: 10, AP: -2, D: 3, keywords: [] },
      { name: 'Inferno Combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Malefic Curse', type: 'ranged', range: '24"', A: 3, BS: '3+', S: 4, AP: -3, D: 1, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'PSYCHIC'] },
      { name: 'Soulreaper Cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: -2, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Force Weapon', type: 'melee', A: 4, WS: '3+', S: 6, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Prosperine Khopesh', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Rites of Coalescence', phase: 'any', description: 'While this unit contains one or more PSYKER models, each time an attack targets this unit, subtract 1 from the Wound roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['sorcererInTerminatorArmour'],
    keywords: ['INFANTRY', 'TERMINATOR', 'CHAOS', 'TZEENTCH', 'RUBRICAE', 'SCARAB OCCULT'],
    factionKeywords: ['THOUSAND SONS'],
  },

  tzaangors: {
    id: 'tzaangors', name: 'Tzaangors', category: 'infantry',
    powerRating: 3, points: 70,
    M: '6"', T: 4, Sv: '6+', W: 1, Ld: '7+', OC: 1, InvSv: '6+',
    models: 10,
    weapons: [
      { name: 'Autopistol', type: 'ranged', range: '12"', A: 1, BS: '4+', S: 3, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Chainsword', type: 'melee', A: 3, WS: '4+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Tzaangor blades', type: 'melee', A: 2, WS: '4+', S: 5, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Scouts 6"', phase: 'movement', description: 'Before the first turn begins, this unit can make a Normal move of up to 6" (cannot move within Engagement Range of any enemy models).' },
      { name: 'Ambushing Hunters', phase: 'movement', description: "At the end of your opponent's turn, if this unit is more than 6\" from all enemy models, you can place it into Strategic Reserves." },
      { name: 'Brayhorn', phase: 'movement', description: 'If equipped, you can re-roll Advance rolls and Charge rolls for this unit.' },
      { name: 'Herd Banner', phase: 'any', description: 'If equipped, while this unit is within range of an objective marker, improve the Leadership characteristic of models in this unit by 1.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['tzaangorShaman'],
    keywords: ['INFANTRY', 'CHAOS', 'TZEENTCH', 'MUTANT', 'TZAANGORS'],
    factionKeywords: ['THOUSAND SONS'],
  },

  tzaangorEnlightened: {
    id: 'tzaangorEnlightened', name: 'Tzaangor Enlightened', category: 'infantry',
    powerRating: 2, points: 45,
    M: '10"', T: 4, Sv: '5+', W: 2, Ld: '7+', OC: 2, InvSv: '5+',
    models: 3,
    weapons: [
      { name: 'Autopistol', type: 'ranged', range: '12"', A: 1, BS: '4+', S: 3, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Chainsword', type: 'melee', A: 6, WS: '4+', S: 4, AP: 0, D: 1, keywords: ['PRECISION'] },
      { name: 'Divining spear', type: 'melee', A: 3, WS: '4+', S: 5, AP: -1, D: 2, keywords: ['LANCE', 'PRECISION'] },
    ],
    abilities: [
      { name: 'Prophesied Doom', phase: 'charge', description: 'Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it, then roll one D6 for each model in this unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['ahriman', 'exaltedSorcererDisc', 'tzaangorShaman'],
    keywords: ['MOUNTED', 'FLY', 'CHAOS', 'TZEENTCH', 'MUTANT', 'TZAANGOR ENLIGHTENED'],
    factionKeywords: ['THOUSAND SONS'],
  },

  tzaangorEnlightenedBows: {
    id: 'tzaangorEnlightenedBows', name: 'Tzaangor Enlightened with Fatecaster Greatbows', category: 'infantry',
    powerRating: 3, points: 55,
    M: '10"', T: 4, Sv: '5+', W: 2, Ld: '7+', OC: 2, InvSv: '5+',
    models: 3,
    weapons: [
      { name: 'Fatecaster Greatbow', type: 'ranged', range: '30"', A: 2, BS: '4+', S: 5, AP: -2, D: 2, keywords: ['IGNORES COVER', 'LETHAL HITS', 'PRECISION'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '4+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Malign Trickery', phase: 'movement', description: "Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9\" of this unit, if this unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to D6\"." },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['ahriman', 'exaltedSorcererDisc', 'tzaangorShaman'],
    keywords: ['MOUNTED', 'FLY', 'CHAOS', 'TZEENTCH', 'MUTANT', 'TZAANGOR ENLIGHTENED', 'TZAANGOR ENLIGHTENED WITH FATECASTER GREATBOWS'],
    factionKeywords: ['THOUSAND SONS'],
  },

  chaosSpawn: {
    id: 'chaosSpawn', name: 'Chaos Spawn', category: 'infantry',
    powerRating: 3, points: 65,
    M: '8"', T: 5, Sv: '4+', W: 4, Ld: '7+', OC: 1, InvSv: '5+',
    models: 2,
    weapons: [
      { name: 'Hideous Mutations', type: 'melee', A: 'D6+2', WS: '4+', S: 5, AP: -1, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time a model in this unit would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
      { name: 'Regenerating Monstrosities', phase: 'command', description: 'At the start of each Command phase, one model in this unit regains up to 3 lost wounds.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['BEAST', 'CHAOS', 'TZEENTCH', 'MUTANT', 'CHAOS SPAWN'],
    factionKeywords: ['THOUSAND SONS'],
  },

  // ── MONSTERS ───────────────────────────────────────────────────────

  mutalidhVortexBeast: {
    id: 'mutalidhVortexBeast', name: 'Mutalith Vortex Beast', category: 'monster',
    powerRating: 8, points: 170,
    M: '10"', T: 10, Sv: '4+', W: 13, Ld: '6+', OC: 4, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Warp vortex — blast', type: 'ranged', range: '24"', A: 'D6+3', BS: '3+', S: 9, AP: -2, D: 2, keywords: ['BLAST'] },
      { name: 'Warp vortex — beam', type: 'ranged', range: '36"', A: 1, BS: '3+', S: 18, AP: -3, D: 'D6+6', keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Warp vortex — torrent', type: 'ranged', range: '18"', A: '2D6', BS: 'N/A', S: 6, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Betentacled maw', type: 'melee', A: 15, WS: '3+', S: 7, AP: 0, D: 1, keywords: [] },
      { name: 'Mutalith claws', type: 'melee', A: 5, WS: '3+', S: 10, AP: -2, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
      { name: 'Mutating Vortex (Aura)', phase: 'movement', description: 'At the end of your Movement phase, roll one D6 for each enemy unit within 6" of this model: on a 2-3, that unit suffers 1 mortal wound; on a 4-5, that unit suffers D3 mortal wounds; on a 6, that unit suffers D6 mortal wounds. Each unit that suffers any mortal wounds as a result must take a Battle-shock test.' },
      { name: 'Immaterial Flare (Aura)', phase: 'shooting', description: 'While a friendly THOUSAND SONS PSYKER model is within 6" of this model, add 1 to their Psychic test results. This bonus is not cumulative with other modifiers.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['MONSTER', 'CHAOS', 'TZEENTCH', 'MUTANT', 'MUTALITH VORTEX BEAST'],
    factionKeywords: ['THOUSAND SONS'],
  },

  // ── VEHICLES ───────────────────────────────────────────────────────

  forgefiend: {
    id: 'forgefiend', name: 'Forgefiend', category: 'vehicle',
    powerRating: 7, points: 130,
    M: '8"', T: 10, Sv: '3+', W: 12, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Ectoplasma Cannon', type: 'ranged', range: '36"', A: 'D3', BS: '3+', S: 10, AP: -3, D: 3, keywords: ['BLAST'] },
      { name: 'Hades Autocannon', type: 'ranged', range: '36"', A: 6, BS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Forgefiend Claws', type: 'melee', A: 3, WS: '3+', S: 6, AP: 0, D: 1, keywords: [] },
      { name: 'Forgefiend Jaws', type: 'melee', A: 5, WS: '3+', S: 7, AP: 0, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Blazing Salvoes', phase: 'shooting', description: 'After this model has shot, select one enemy unit hit by one or more of those attacks. Until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DAEMON', 'CHAOS', 'TZEENTCH', 'FORGEFIEND'],
    factionKeywords: ['THOUSAND SONS'],
  },

  maulerfiend: {
    id: 'maulerfiend', name: 'Maulerfiend', category: 'vehicle',
    powerRating: 6, points: 120,
    M: '10"', T: 10, Sv: '3+', W: 12, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Magma cutter', type: 'ranged', range: '6"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Lasher tendrils', type: 'melee', A: 6, WS: '3+', S: 7, AP: -1, D: 1, keywords: [] },
      { name: 'Maulerfiend fists', type: 'melee', A: 6, WS: '3+', S: 14, AP: -2, D: 'D6+1', keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Snarling Protector', phase: 'charge', description: 'This model can use the Heroic Intervention Stratagem for 0CP without restriction. When declaring a charge against enemies within Engagement Range of friendly THOUSAND SONS PSYKER units, you can re-roll the Charge roll.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DAEMON', 'CHAOS', 'TZEENTCH', 'MAULERFIEND'],
    factionKeywords: ['THOUSAND SONS'],
  },

  heldrake: {
    id: 'heldrake', name: 'Heldrake', category: 'vehicle',
    powerRating: 11, points: 215,
    M: '20"+', T: 9, Sv: '3+', W: 12, Ld: '6+', OC: 0, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Baleflamer', type: 'ranged', range: '12"', A: 'D6+3', BS: 'N/A', S: 6, AP: -2, D: 2, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Hades Autocannon', type: 'ranged', range: '36"', A: 6, BS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Heldrake Claws', type: 'melee', A: 5, WS: '3+', S: 7, AP: -1, D: 2, keywords: ['ANTI-FLY 2+', 'DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Hover', phase: 'movement', description: 'At the start of the first battle round, before the first turn begins, you can change this model\'s base movement to 20" and remove the AIRCRAFT keyword from this model for the rest of the battle.' },
      { name: 'Flame-wreathed', phase: 'movement', description: 'Each time this model ends a Normal move, select one enemy unit it moved over during that move. Until the end of the turn, models in that unit cannot have the Benefit of Cover.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'AIRCRAFT', 'FLY', 'DAEMON', 'CHAOS', 'TZEENTCH', 'HELDRAKE'],
    factionKeywords: ['THOUSAND SONS'],
  },

  defiler: {
    id: 'defiler', name: 'Defiler', category: 'vehicle',
    powerRating: 12, points: 250,
    M: '12"', T: 11, Sv: '3+', W: 18, Ld: '6+', OC: 5, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Hades battle cannon', type: 'ranged', range: '48"', A: 'D6+3', BS: '3+', S: 10, AP: -1, D: 3, keywords: ['BLAST'] },
      { name: 'Ectoplasma destructor', type: 'ranged', range: '36"', A: 'D6', BS: '3+', S: 12, AP: -3, D: 3, keywords: ['BLAST'] },
      { name: 'Excruciator cannon', type: 'ranged', range: '36"', A: 6, BS: '3+', S: 6, AP: -2, D: 2, keywords: [] },
      { name: 'Hades lascannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Heavy baleflamer', type: 'ranged', range: '12"', A: 'D6+3', BS: 'N/A', S: 7, AP: -2, D: 2, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Heavy missile launcher — frag', type: 'ranged', range: '48"', A: '2D6', BS: '3+', S: 5, AP: -1, D: 1, keywords: ['BLAST'] },
      { name: 'Heavy missile launcher — krak', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 10, AP: -2, D: 'D6+1', keywords: [] },
      { name: 'Heavy reaper autocannon', type: 'ranged', range: '48"', A: 4, BS: '3+', S: 9, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS', 'SUSTAINED HITS 1'] },
      { name: 'Pyraflux magma cutters', type: 'ranged', range: '12"', A: 2, BS: '3+', S: 10, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Shearing claws — Strike', type: 'melee', A: 5, WS: '3+', S: 16, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Shearing claws — Sweep', type: 'melee', A: 10, WS: '3+', S: 6, AP: -2, D: 1, keywords: [] },
      { name: 'Electroscourge', type: 'melee', A: 5, WS: '3+', S: 12, AP: -2, D: 2, keywords: ['EXTRA ATTACKS', 'SUSTAINED HITS 2'] },
    ],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 6+, that wound is not lost.' },
      { name: 'Scuttling Walker', phase: 'movement', description: 'This model can move through other models (excluding TITANIC models) and terrain features without restriction. It can pass through Engagement Range without stopping there, and automatically passes Desperate Escape tests.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-6 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'DAEMON', 'CHAOS', 'TZEENTCH', 'DEFILER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  chaosRhino: {
    id: 'chaosRhino', name: 'Chaos Rhino', category: 'vehicle',
    powerRating: 4, points: 90,
    M: '12"', T: 9, Sv: '3+', W: 10, Ld: '6+', OC: 2,
    models: 1,
    weapons: [
      { name: 'Havoc launcher', type: 'ranged', range: '48"', A: 'D6', BS: '3+', S: 5, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Inferno combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Inferno combi-weapon', type: 'ranged', range: '24"', A: 1, BS: '4+', S: 4, AP: -2, D: 1, keywords: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Firing Deck 2', phase: 'shooting', description: 'Up to 2 models embarked on this transport can shoot from it in your Shooting phase as if they were not embarked. Measure range and visibility from any point on this model.' },
      { name: 'Sorcerous Support', phase: 'shooting', description: 'After this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly model that disembarked from this transport this turn makes a Psychic Attack that targets that unit, add 1 to the Hit roll and add 1 to the Wound roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'DEDICATED TRANSPORT', 'SMOKE', 'CHAOS', 'TZEENTCH'],
    factionKeywords: ['THOUSAND SONS'],
  },

  chaosLandRaider: {
    id: 'chaosLandRaider', name: 'Chaos Land Raider', category: 'vehicle',
    powerRating: 11, points: 220,
    M: '10"', T: 12, Sv: '2+', W: 16, Ld: '6+', OC: 5,
    models: 1,
    weapons: [
      { name: 'Soulshatter Lascannon (×2)', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Twin Inferno Heavy Bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Havoc launcher', type: 'ranged', range: '48"', A: 'D6', BS: '3+', S: 5, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Inferno combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: ['RAPID FIRE 2'] },
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
    keywords: ['VEHICLE', 'TRANSPORT', 'SMOKE', 'CHAOS', 'TZEENTCH', 'LAND RAIDER'],
    factionKeywords: ['THOUSAND SONS'],
  },

  chaosPredatorAnnihilator: {
    id: 'chaosPredatorAnnihilator', name: 'Chaos Predator Annihilator', category: 'vehicle',
    powerRating: 7, points: 130,
    M: '10"', T: 10, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Predator twin lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 14, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Inferno heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Havoc launcher', type: 'ranged', range: '48"', A: 'D6', BS: '3+', S: 5, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Inferno combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Ensorcelled Annihilation', phase: 'shooting', description: 'Each time this model makes a ranged attack that targets a MONSTER or VEHICLE unit that was hit by one or more Psychic Attacks made by a THOUSAND SONS PSYKER model from your army this phase (including the Doombolt Ritual), you can re-roll the Hit roll and you can re-roll the Damage roll.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'CHAOS', 'TZEENTCH', 'PREDATOR ANNIHILATOR'],
    factionKeywords: ['THOUSAND SONS'],
  },

  chaosPredatorDestructor: {
    id: 'chaosPredatorDestructor', name: 'Chaos Predator Destructor', category: 'vehicle',
    powerRating: 7, points: 130,
    M: '10"', T: 10, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    models: 1,
    weapons: [
      { name: 'Predator Autocannon', type: 'ranged', range: '48"', A: 4, BS: '3+', S: 9, AP: -1, D: 3, keywords: ['RAPID FIRE 2'] },
      { name: 'Lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Inferno heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Havoc launcher', type: 'ranged', range: '48"', A: 'D6', BS: '3+', S: 5, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Inferno combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: -2, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Ensorcelled Destruction', phase: 'shooting', description: 'Each time this model makes a ranged attack that targets a unit hit by one or more Psychic Attacks from a friendly THOUSAND SONS PSYKER this phase, add 1 to the Strength and AP characteristics of that attack.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'CHAOS', 'TZEENTCH', 'PREDATOR DESTRUCTOR'],
    factionKeywords: ['THOUSAND SONS'],
  },

}

export const thousandSonsUnitList = Object.values(thousandSonsUnits)

export const thousandSonsUnitsByCategory = {
  epicHero:  thousandSonsUnitList.filter(u => u.category === 'epicHero'),
  character: thousandSonsUnitList.filter(u => u.category === 'character'),
  battleline: thousandSonsUnitList.filter(u => u.category === 'battleline'),
  infantry:  thousandSonsUnitList.filter(u => u.category === 'infantry'),
  monster:   thousandSonsUnitList.filter(u => u.category === 'monster'),
  vehicle:   thousandSonsUnitList.filter(u => u.category === 'vehicle'),
}
